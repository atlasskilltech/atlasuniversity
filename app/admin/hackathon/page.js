import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminShell from '@/components/Admin/AdminShell';
import { PageHeader } from '@/components/News/Admin/ui';
import HackathonManager from '@/components/Admin/Hackathon/Manager';
import { NewsDbConfigError } from '@/lib/news/db/pool';
import { isRegistrationOpen, listRegistrations } from '@/lib/hackathon/store';
import { mailConfig } from '@/lib/hackathon/mail';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'ATLAS Hackathon Registrations — ATLAS Admin' };

/*
 * /admin/hackathon — every team registered for ATLAS Hackathon 2026 (the public form at
 * /atlas-hackathon-2026/register, plus the rows imported from the old PHP site). Admins see it; other
 * users only when the "ATLAS Hackathon Registrations" tab is ticked for them in Users.
 */
export default async function HackathonAdminPage() {
  await requireAdminPage({ tab: 'hackathon' });
  let rows = [];
  let open = true;
  let dbError = null;
  try {
    [rows, open] = await Promise.all([listRegistrations(), isRegistrationOpen()]);
  } catch (e) {
    dbError = e instanceof NewsDbConfigError ? 'not_configured' : 'unavailable';
  }
  const plain = rows.map((r) => ({
    ...r,
    id: Number(r.id),
    created_at: r.created_at ? new Date(r.created_at).toISOString() : null,
    updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : null,
    mailed_at: r.mailed_at ? new Date(r.mailed_at).toISOString() : null,
  }));
  return (
    <AdminShell active="hackathon">
      <PageHeader
        title="ATLAS Hackathon Registrations"
        description="Teams registered for ATLAS Hackathon 2026 — Prompt to Product. Search, view, edit, delete and download them, re-send a team's confirmation email, and open or close the registration form."
      />
      {dbError ? (
        <div role="status" className="mb-5 rounded-xl border border-[#f5d48a] bg-[#fff8e6] px-4 py-3 text-[14px] text-[#6b4e00]">
          {dbError === 'not_configured'
            ? 'The database is not configured on this server, so registrations cannot be shown or changed here.'
            : 'The database could not be reached. Registrations will show again once it is back.'}
        </div>
      ) : null}
      <HackathonManager rows={plain} open={open} mailReady={Boolean(mailConfig().apiKey)} disabled={Boolean(dbError)} />
    </AdminShell>
  );
}
