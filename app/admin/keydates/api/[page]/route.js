import { revalidatePath, revalidateTag } from 'next/cache';
import { fail, json, requireAdminApi } from '@/lib/news/auth/admin';
import { BodyError, readBodyLimited } from '@/lib/news/http/body';
import { KEYDATES_TAG, KeyDatesError, addTable, hideTable, resetTable, saveTable, showTable } from '@/lib/keydates/store';
import { loadPageDetail } from '@/lib/keydates/admin';
import { tableChanges } from '@/lib/keydates/diff';
import { logActivity } from '@/lib/admin/activity';
import { newsClientIp } from '@/lib/news/http/clientIp';

const SUMMARY = {
  save: 'Edited key dates table',
  hide: 'Hid key dates table',
  show: 'Showed key dates table again',
  reset: 'Reset key dates table to original',
  add: 'Added key dates table',
};

/** The table as the admin sees it now (null when the page or table is unknown or unreadable). */
async function snapshot(pageId, slot) {
  try {
    const d = await loadPageDetail(pageId);
    return { detail: d, table: d?.tables.find((t) => t.slot === slot) || null };
  } catch {
    return { detail: null, table: null };
  }
}

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
  const before = action === 'add' ? await snapshot(pageId, null) : await snapshot(pageId, slot);
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
    const after = await snapshot(pageId, out.slot || slot);
    const pageName = `${page.school} · ${page.title}`;
    const label = after.table?.label || before.table?.label || 'table';
    const diff = tableChanges(before.table?.table || null, after.table?.table || null);
    const summary = action === 'reset' && before.table?.status === 'added' ? 'Deleted added key dates table' : SUMMARY[action];
    await logActivity({
      user: auth.session.user,
      tab: 'keydates',
      action: `keydates.${action}`,
      summary,
      target: `${pageName} — ${label}`,
      targetUrl: `/admin/keydates/${pageId}`,
      details: action === 'hide' || action === 'show' ? { note: `Page: ${page.route}` } : { ...diff, note: [diff.note, `Page: ${page.route}`].filter(Boolean).join(' · ') },
      ip: newsClientIp(request),
    });
    return json({ ok: true, ...out });
  } catch (e) {
    if (e instanceof KeyDatesError) return fail(e.status, 'keydates', e.message);
    console.error(`[keydates] ${action} ${pageId}:${slot ?? ''} failed: ${e?.code || e?.name || 'error'}`);
    return fail(503, 'unavailable', 'The change could not be saved. Please try again.', { 'X-News-Error': String(e?.code || 'error') });
  }
}
