import { fail, requireAdminApi, NO_STORE_HEADERS } from '@/lib/news/auth/admin';
import { toCsv } from '@/lib/hackathon/csv';
import { listRegistrations } from '@/lib/hackathon/store';
import { formatIst } from '@/lib/hackathon/mail';
import { MEMBERS, rowMembers } from '@/lib/hackathon/validate';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAIL = { pending: 'Pending', sent: 'Sent', failed: 'Failed', not_sent: 'Not sent (imported)' };
const SOURCE = { form: 'Website form', import: 'Old site (imported)', admin: 'Added in admin' };

/** GET — every registration as a CSV file Excel opens directly (UTF-8 with BOM), newest first. */
export async function GET(request) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;
  let rows;
  try {
    rows = await listRegistrations();
  } catch (e) {
    return fail(503, 'database_unavailable', 'The admin database is unavailable.', { 'X-News-Error': String(e?.code || 'error') });
  }
  const header = [
    'ID', 'Registered on (IST)', 'Team name', 'Team size',
    ...MEMBERS.flatMap((m) => ['name', 'school / college', 'location', 'stream', 'grade', 'mobile', 'email'].map((p) => `${m.label} ${p}`)),
    'Confirmation email', 'Source', 'Old site ID',
  ];
  const data = rows.map((r) => {
    const members = rowMembers(r);
    const cells = MEMBERS.flatMap((m) => {
      const x = members.find((y) => y.prefix === m.prefix);
      return x ? [x.name, x.school, x.location, x.stream, x.grade, x.mobile, x.email] : ['', '', '', '', '', '', ''];
    });
    return [
      r.id, formatIst(r.created_at).replace(/ IST$/, ''), r.team_name, members.length,
      ...cells,
      MAIL[r.mail_status] || r.mail_status, SOURCE[r.source] || r.source, r.legacy_id ?? '',
    ];
  });
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(`﻿${toCsv([header, ...data])}`, {
    headers: {
      ...NO_STORE_HEADERS,
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="atlas-hackathon-2026-registrations-${stamp}.csv"`,
    },
  });
}
