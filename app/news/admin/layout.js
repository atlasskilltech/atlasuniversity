/*
 * /news/admin — the ATLAS News admin area (Stage 1: sign-in and the foundation status panel).
 * Never indexed, never cached; the ATLAS site chrome is hidden on /news (components/Schools/MainSiteOnly).
 * Security headers for the whole area are set in next.config.mjs (headers()).
 */
export const metadata = {
  title: 'ATLAS News — Admin',
  description: 'ATLAS News administration.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function NewsAdminLayout({ children }) {
  return <div className="min-h-dvh bg-[#f4f5f7] text-[#14161a] antialiased">{children}</div>;
}
