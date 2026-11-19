import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminShell from '@/components/Admin/AdminShell';
import AdminNav from '@/components/News/Admin/AdminNav';

export const dynamic = 'force-dynamic';

/* Every page in this group requires an admin session; without one the visitor is sent to the login.
   (Each page ALSO checks the session itself — a layout is not re-run on client navigation.)
   The News admin sits in the shared admin frame, with its own sub-tabs under the top bar. */
export default async function NewsAdminPanelLayout({ children }) {
  await requireAdminPage({ tab: 'news' });
  return (
    <AdminShell active="news" viewHref="/news" subnav={<AdminNav />}>
      {children}
    </AdminShell>
  );
}
