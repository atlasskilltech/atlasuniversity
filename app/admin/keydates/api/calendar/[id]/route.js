import { revalidatePath, revalidateTag } from 'next/cache';
import { fail, json, requireAdminApi } from '@/lib/news/auth/admin';
import { BodyError, readBodyLimited } from '@/lib/news/http/body';
import { KEYDATES_TAG, KeyDatesError, adoptCalendarVersion, calendarAction, saveCalendar } from '@/lib/keydates/store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_BODY = 256 * 1024;

/**
 * POST /admin/keydates/api/calendar/<id> — a change to a shared calendar, applied to every page showing it:
 *   { action: 'save',  table }          save the edited calendar on all its pages
 *   { action: 'adopt', page, slot }     give every page the dates of one page's copy
 *   { action: 'hide' | 'show' | 'reset' }
 * Admin session + same-origin required. Every affected page is refreshed at once.
 */
export async function POST(request, ctx) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;
  const { id } = await ctx.params;
  let body;
  try {
    if (!(request.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) return fail(415, 'unsupported_media_type', 'Send JSON.');
    body = JSON.parse((await readBodyLimited(request, MAX_BODY)).toString('utf8'));
  } catch (e) {
    if (e instanceof BodyError) return fail(e.status, e.code, e.status === 413 ? 'The table is too large.' : 'Could not read the request.');
    return fail(400, 'bad_json', 'The request is not valid JSON.');
  }
  const action = body?.action;
  try {
    let pages;
    if (action === 'save') pages = await saveCalendar(id, body.table);
    else if (action === 'adopt') pages = await adoptCalendarVersion(id, String(body.page || ''), String(body.slot || ''));
    else if (['hide', 'show', 'reset'].includes(action)) pages = await calendarAction(id, action);
    else return fail(400, 'bad_request', 'Unknown action.');
    try {
      revalidateTag(KEYDATES_TAG, { expire: 0 });
      for (const p of pages) revalidatePath(p.route);
    } catch {
      /* outside a request there is nothing to refresh */
    }
    return json({ ok: true, pages: pages.length });
  } catch (e) {
    if (e instanceof KeyDatesError) return fail(e.status, 'keydates', e.message);
    console.error(`[keydates] calendar ${action} ${id} failed: ${e?.code || e?.name || 'error'}`);
    return fail(503, 'unavailable', 'The change could not be saved. Please try again.', { 'X-News-Error': String(e?.code || 'error') });
  }
}
