import HackathonIcons from '@/components/Hackathon/Icons';

/*
 * /atlas-hackathon-2026 — ATLAS Hackathon 2026: Prompt to Product (reference: index.html, register.php,
 * success.php). Its own dark site: the ATLAS header and footer step aside here
 * (components/Schools/MainSiteOnly), and every page under this route mounts the hackathon's own header
 * and footer. This wrapper is the reference's <body>: night background, Saira, slate text, the icon
 * sprite, and smooth in-page scrolling (`scroll-smooth` on <html> upstream).
 */
export const metadata = {
  icons: {
    icon: [{ url: '/assets/atlas-hackathon-2026/favicon-48.png', sizes: '48x48', type: 'image/png' }],
    apple: '/assets/atlas-hackathon-2026/favicon-180.png',
  },
};

export const viewport = { themeColor: '#070816' };

export default function HackathonLayout({ children }) {
  return (
    <div className="min-h-screen bg-hk-night font-hk text-[16px]/[24px] text-slate-300 antialiased selection:bg-cyan-300 selection:text-hk-night [html:has(&)]:scroll-smooth">
      <HackathonIcons />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-yellow-300 focus:px-4 focus:py-2 focus:font-semibold focus:text-hk-night"
      >
        Skip to content
      </a>
      {children}
    </div>
  );
}
