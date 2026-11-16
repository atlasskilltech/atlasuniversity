import { fail, requireAdminApi, NO_STORE_HEADERS } from '@/lib/news/auth/admin';
import { toCsv } from '@/lib/hackathon/csv';
import { listRegistrations } from '@/lib/hackathon/store';
import { formatIst } from '@/lib/hackathon/mail';

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
    'ID', 'Registered on (IST)', 'Team name', 'School / college', 'Location',
    'Team lead name', 'Team lead stream', 'Team lead grade', 'Team lead mobile', 'Team lead email',
    'Member 2 name', 'Member 2 stream', 'Member 2 grade', 'Member 2 mobile', 'Member 2 email',
    'Confirmation email', 'Source', 'Old site ID',
  ];
  const data = rows.map((r) => [
    r.id, formatIst(r.created_at).replace(/ IST$/, ''), r.team_name, r.school_college_name, r.school_college_location,
    r.team_lead_name, r.team_lead_stream, r.team_lead_grade, r.team_lead_mobile, r.team_lead_email,
    r.member2_name, r.member2_stream, r.member2_grade, r.member2_mobile, r.member2_email,
    MAIL[r.mail_status] || r.mail_status, SOURCE[r.source] || r.source, r.legacy_id ?? '',
  ]);
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(`﻿${toCsv([header, ...data])}`, {
    headers: {
      ...NO_STORE_HEADERS,
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="atlas-hackathon-2026-registrations-${stamp}.csv"`,
    },
  });
}
