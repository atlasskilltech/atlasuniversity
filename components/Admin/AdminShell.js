import AdminFrame from '@/components/Admin/AdminFrame';
import { canOpen } from '@/lib/admin/access';
import { getAdminSession } from '@/lib/news/auth/admin';

/**
 * The ATLAS admin's chrome, cPanel-style (components/Admin/AdminFrame): a grouped tool sidebar, a slim
 * top bar with who is signed in, "View site" and "Sign out", and full-width content. The News admin
 * uses it too, with its own sub-tabs passed as `subnav`. Add a tool to TOOLS
 * (and its key to lib/admin/access.js TABS) and it appears here and on the /admin home page. Each user
 * sees only the tabs they may open; admins also see Users.
 */
export const TOOLS = [
  {
    key: 'news',
    group: 'Website content',
    href: '/admin/news',
    label: 'News',
    title: 'ATLAS News',
    description: 'Articles, categories, the News homepage and the media library.',
    cta: 'Open News dashboard',
  },
  {
    key: 'keydates',
    group: 'Website content',
    href: '/admin/keydates',
    label: 'Key Dates',
    title: 'Key Dates',
    description: 'Every admissions key-dates table on the website: see where they are, edit dates, add rows, columns and tables.',
    cta: 'Open Key Dates',
  },
  {
    key: 'hackathon',
    group: 'Events',
    href: '/admin/hackathon',
    label: 'ATLAS Hackathon',
    title: 'ATLAS Hackathon Registrations',
    description: 'Teams registered for ATLAS Hackathon 2026: view, search, edit, delete, download, re-send the confirmation email, and open or close the form.',
    cta: 'Open registrations',
  },
  {
    key: 's3drive',
    group: 'Website content',
    href: '/admin/s3drive',
    label: 'S3 Drive',
    title: 'S3 Drive',
    description: 'The files in the atlas-web-cdn S3 bucket: browse folders, upload files, create folders, and copy S3 and website links. Admins only.',
    cta: 'Open S3 Drive',
  },
  {
    key: 'map',
    group: 'Site tools',
    href: '/admin/map',
    label: 'University Map',
    title: 'University Map',
    description: 'The interactive map of the whole website: every school, programme and page, with fees, eligibility, key dates, CRM widgets and page health. Admins only.',
    cta: 'Open the map',
  },
  {
    key: 'pdf-studio',
    group: 'Site tools',
    href: '/admin/pdf-studio',
    label: 'PDF Studio',
    title: 'ATLAS Tech PDF Studio',
    description: 'Fee structures and policy documents: preview, download as PDF, and copy flipbook embed codes. Admins only.',
    cta: 'Open PDF Studio',
  },
  {
    key: 'users',
    group: 'Administration',
    href: '/admin/users',
    label: 'Users',
    title: 'Users & access',
    description: 'Who can sign in with Google, whether they are an admin, and which tabs each user can open.',
    cta: 'Manage users',
  },
  {
    key: 'activity',
    group: 'Administration',
    href: '/admin/activity',
    label: 'Activity',
    title: 'Activity log',
    description: 'Who did what, and when: every sign-in, News change, Key Dates edit and user change, with before and after values.',
    cta: 'View activity',
  },
];

/** The tools `user` may open. */
export const toolsFor = (user) => TOOLS.filter((t) => canOpen(user, t.key));

export default async function AdminShell({ active, viewHref = '/', subnav = null, children }) {
  const session = await getAdminSession();
  const user = session?.user || null;
  const tools = toolsFor(user).map(({ key, href, label, group }) => ({ key, href, label, group }));
  return (
    <AdminFrame
      tools={tools}
      active={active || 'home'}
      user={user ? { email: user.email, name: user.name || '', role: user.role } : null}
      viewHref={viewHref}
      subnav={subnav}
    >
      {children}
    </AdminFrame>
  );
}
