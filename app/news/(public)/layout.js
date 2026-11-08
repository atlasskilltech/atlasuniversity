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
import { getIndexingEnabled, getNavigation } from '@/lib/news/public/repository';
import { NEWS_DESCRIPTION, NEWS_NAME, newsRobots, NOINDEX } from '@/lib/news/public/seo';

/* Every public News page renders on request from MySQL (never at build time — `next build` needs no database);
   the data itself is cached and refreshed by lib/news/public/repository.js. */
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  let robots = NOINDEX;
  try {
    robots = newsRobots(await getIndexingEnabled());
  } catch {
    /* database unavailable: stay noindex */
  }
  return {
    title: { default: `${NEWS_NAME} — Stories from ATLAS SkillTech University`, template: `%s — ${NEWS_NAME}` },
    description: NEWS_DESCRIPTION,
    robots,
    openGraph: { siteName: NEWS_NAME, locale: 'en_IN', type: 'website' },
  };
}

export default async function NewsPublicLayout({ children }) {
  /* the serif carries every headline: fetch it with the document so the swap lands before first paint */
  preload('/assets/fonts/newsreader-latin.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  /* the navigation must never take the whole publication down: without the database it is simply empty,
     and the page below shows the News "temporarily unavailable" message */
  let nav = [];
  try {
    nav = await getNavigation();
  } catch {
    nav = [];
  }
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
