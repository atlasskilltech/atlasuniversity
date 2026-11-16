/*
 * /admin/news — the ATLAS News admin (the News tab of the ATLAS admin at /admin). Sign-in is the shared
 * /admin/login; the page background, noindex and the hidden site chrome come from app/admin/layout.js,
 * and the security headers from next.config.mjs (headers()).
 */
export const metadata = {
  title: 'ATLAS News — Admin',
  description: 'ATLAS News administration.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function NewsAdminLayout({ children }) {
  return children;
}
