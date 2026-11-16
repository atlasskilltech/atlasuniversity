import { revalidatePath, revalidateTag } from 'next/cache';
import { fail, json, requireAdminApi } from '@/lib/news/auth/admin';
import { BodyError, readBodyLimited } from '@/lib/news/http/body';
import { KEYDATES_TAG, KeyDatesError, addTable, hideTable, resetTable, saveTable, showTable } from '@/lib/keydates/store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_BODY = 256 * 1024;
const SLOT = /^(t\d{1,2}b\d{1,2}|b\d{1,2}|j\d{1,3}|main|second|c-[0-9a-f]{12})$/;

/**
 * POST /admin/keydates/api/<page> — every Key Dates change for one page:
 *   { action: 'save',  slot, table }   save an edited table (a page's own block or an added one)
 *   { action: 'hide',  slot }          stop showing one of the page's own blocks
 *   { action: 'show',  slot }          show a hidden block again
 *   { action: 'reset', slot }          back to how the page was built / delete an added table
 *   { action: 'add',   tab, table }    add a new table (to tab `tab` on a tabbed page)
 * Admin session + same-origin required (requireAdminApi). The page's public route is refreshed at once.
 */
export async function POST(request, ctx) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;
  const { page: pageId } = await ctx.params;

  let body;
  try {
    if (!(request.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) return fail(415, 'unsupported_media_type', 'Send JSON.');
    body = JSON.parse((await readBodyLimited(request, MAX_BODY)).toString('utf8'));
  } catch (e) {
    if (e instanceof BodyError) return fail(e.status, e.code, e.status === 413 ? 'The table is too large.' : 'Could not read the request.');
    return fail(400, 'bad_json', 'The request is not valid JSON.');
  }

  const { action, slot } = body || {};
  if (action !== 'add' && !SLOT.test(String(slot || ''))) return fail(400, 'bad_request', 'Unknown table.');
  try {
    let page;
    let out = {};
    if (action === 'save') page = await saveTable(pageId, slot, body.table);
    else if (action === 'hide') page = await hideTable(pageId, slot);
    else if (action === 'show') page = await showTable(pageId, slot);
    else if (action === 'reset') page = await resetTable(pageId, slot);
    else if (action === 'add') {
      const r = await addTable(pageId, Number.isInteger(body.tab) ? body.tab : null, body.table);
      page = r.page;
      out = { slot: r.slotId };
    } else return fail(400, 'bad_request', 'Unknown action.');
    try {
      revalidateTag(KEYDATES_TAG, { expire: 0 });
      revalidatePath(page.route);
    } catch {
      /* outside a request there is nothing to refresh */
    }
    return json({ ok: true, ...out });
  } catch (e) {
    if (e instanceof KeyDatesError) return fail(e.status, 'keydates', e.message);
    console.error(`[keydates] ${action} ${pageId}:${slot ?? ''} failed: ${e?.code || e?.name || 'error'}`);
    return fail(503, 'unavailable', 'The change could not be saved. Please try again.', { 'X-News-Error': String(e?.code || 'error') });
  }
}
