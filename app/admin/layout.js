/*
 * /admin — the ATLAS admin area: sign-in at /admin/login, the hub at /admin, and each tool under it
 * (ATLAS News at /admin/news). Never indexed, never cached; security headers for the whole area are
 * set in next.config.mjs (headers()), and the ATLAS site chrome is hidden (components/Schools/MainSiteOnly).
 */
export const metadata = {
  title: 'ATLAS Admin',
  description: 'ATLAS SkillTech University administration.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-dvh bg-[#f4f5f7] text-[#14161a] antialiased">{children}</div>;
}
