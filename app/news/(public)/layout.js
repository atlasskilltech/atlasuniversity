/*
 * ATLAS News — the public publication (/news, /news/[slug], /news/category/[slug]).
 *
 * A route group, so this layout wraps ONLY the public pages: /news/admin keeps its own layout, headers
 * and authentication untouched. The university header and footer are already hidden on /news
 * (components/Schools/MainSiteOnly); News renders its own chrome and visual identity.
 *
 * Theme: the root element carries the palette variables (components/News/Public/theme.js). Its first
 * child is a tiny inline script that applies a stored light/dark choice before paint; the attribute it may
 * add is why the root opts out of the hydration attribute check.
 */
import { preload } from 'react-dom';
import Header from '@/components/News/Public/Header';
import Footer from '@/components/News/Public/Footer';
import { THEME_CLASSES, THEME_SCRIPT } from '@/components/News/Public/theme';
import { getNavigation } from '@/lib/news/public/repository';
import { NEWS_DESCRIPTION, NEWS_NAME, NEWS_ROBOTS } from '@/lib/news/public/seo';

export const metadata = {
  title: { default: `${NEWS_NAME} — Stories from ATLAS SkillTech University`, template: `%s — ${NEWS_NAME}` },
  description: NEWS_DESCRIPTION,
  robots: NEWS_ROBOTS,
  openGraph: { siteName: NEWS_NAME, locale: 'en_IN', type: 'website' },
};

export default async function NewsPublicLayout({ children }) {
  /* the serif carries every headline: fetch it with the document so the swap lands before first paint */
  preload('/assets/fonts/newsreader-latin.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  const nav = await getNavigation();
  return (
    <div data-news-root="" suppressHydrationWarning className={`${THEME_CLASSES} min-h-dvh bg-news-paper font-sans text-news-ink antialiased`}>
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      <Header nav={nav} />
      <main id="news-main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer nav={nav} />
    </div>
  );
}
