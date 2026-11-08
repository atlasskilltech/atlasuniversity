import Link from 'next/link';
import NewsLogo from './NewsLogo';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';
import { NEWS_TAGLINE } from '@/lib/news/public/seo';
import { cx, FOCUS, KICKER, NEWS_CONTAINER } from './ui';

const UNIVERSITY_URL = '/';

/**
 * The ATLAS News header — independent of the university site's chrome.
 *   < 992px  one sticky bar: logo, theme switch (from 480px), menu button.
 *   ≥ 992px  a slim utility strip, a centred masthead with the tagline, and a sticky section bar.
 */
export default function Header({ nav }) {
  return (
    <>
      <a
        href="#news-main"
        className="sr-only z-50 rounded bg-news-ink px-4 py-2 font-sans text-[14px] font-semibold text-news-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      {/* mobile + tablet */}
      <div className="sticky top-0 z-40 border-b border-news-line bg-news-paper lg:hidden">
        <div className={cx(NEWS_CONTAINER, 'flex h-16 items-center justify-between gap-3')}>
          <Link href="/news" aria-label="ATLAS News — home" className={cx('rounded', FOCUS)}>
            <NewsLogo markClassName="h-[22px]" nameClassName="text-[23px]" className="gap-2.5" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle className="max-sm:hidden" />
            <MobileMenu items={nav} universityUrl={UNIVERSITY_URL} />
          </div>
        </div>
      </div>

      {/* desktop */}
      <header className="max-lg:hidden">
        <div className="bg-news-night text-white">
          <div className={cx(NEWS_CONTAINER, 'flex h-9 items-center justify-between')}>
            <a href={UNIVERSITY_URL} className={cx('font-sans text-[12px] font-medium tracking-[0.02em] text-white/75 transition-colors hover:text-white', FOCUS)}>
              ATLAS SkillTech University <span aria-hidden="true">↗</span>
            </a>
            <ThemeToggle tone="night" />
          </div>
        </div>
        <div className={cx(NEWS_CONTAINER, 'flex flex-col items-center py-8 text-center')}>
          <Link href="/news" aria-label="ATLAS News — home" className={cx('rounded', FOCUS)}>
            <NewsLogo markClassName="h-[40px]" nameClassName="text-[44px]" className="gap-4" />
          </Link>
          <p className={cx(KICKER, 'mt-4 text-news-muted')}>{NEWS_TAGLINE}</p>
        </div>
      </header>
      <nav
        aria-label="Sections"
        className="sticky top-0 z-40 border-y border-news-line bg-news-paper/90 backdrop-blur-md max-lg:hidden"
      >
        <div className={cx(NEWS_CONTAINER, 'flex justify-center')}>
          <NavLinks items={nav} />
        </div>
      </nav>
    </>
  );
}
