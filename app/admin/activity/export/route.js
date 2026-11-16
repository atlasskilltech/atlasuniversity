import { fail, requireAdminApi, NO_STORE_HEADERS } from '@/lib/news/auth/admin';
import { listActivity } from '@/lib/admin/activity';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_ROWS = 20000;

/* a cell that a spreadsheet will not run as a formula, quoted for CSV */
function cell(v) {
  let s = v == null ? '' : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

const ist = (iso) => (iso ? new Date(new Date(iso).getTime() + 5.5 * 3600 * 1000).toISOString().replace('T', ' ').slice(0, 19) : '');

/**
 * GET /admin/activity/export?user=&tab=&from=&to=&q= — the filtered log as CSV (opens in Excel), one row
 * per change. Admins only: requireAdminApi reads the 'activity' tab from this URL.
 */
export async function GET(request) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;
  const sp = new URL(request.url).searchParams;
  const filters = Object.fromEntries(['user', 'tab', 'from', 'to', 'q'].map((k) => [k, (sp.get(k) || '').slice(0, 200)]));
  let rows = [];
  try {
    for (let page = 1; rows.length < MAX_ROWS; page += 1) {
      const r = await listActivity(filters, { page, pageSize: 500 });
      rows = rows.concat(r.items);
      if (r.items.length < 500) break;
    }
  } catch {
    return fail(503, 'unavailable', 'The activity log could not be read.');
  }
  const out = [['Time (IST)', 'Name', 'Email', 'Tab', 'Action', 'On', 'What changed', 'Before', 'After', 'Note', 'IP'].map(cell).join(',')];
  for (const e of rows) {
    const base = [ist(e.at), e.userName, e.userEmail, e.tab, e.summary, e.target];
    const tail = [[e.details?.note, e.details?.pages?.length ? `Pages: ${e.details.pages.join('; ')}` : null].filter(Boolean).join(' · '), e.ip];
    const changes = e.details?.changes || [];
    if (!changes.length) out.push([...base, '', '', '', ...tail].map(cell).join(','));
    for (const c of changes) out.push([...base, c.field, c.from, c.to, ...tail].map(cell).join(','));
  }
  const day = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
  return new Response(`﻿${out.join('\r\n')}\r\n`, {
    status: 200,
    headers: { ...NO_STORE_HEADERS, 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="atlas-admin-activity-${day}.csv"` },
  });
}
