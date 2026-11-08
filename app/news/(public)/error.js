'use client';

import Link from 'next/link';
import { cx, FOCUS, KICKER, NEWS_CONTAINER } from '@/components/News/Public/ui';

/**
 * LAST-RESORT fallback, drawn in the browser (Next.js answers 500). The normal outage path is proxy.js,
 * which answers HTTP 503 with a server-rendered page before rendering starts; this only appears if a
 * failure slips past it (e.g. the database drops mid-request). It names no cause: no error text, code or stack reaches a
 * reader.
 */
export default function NewsError({ reset }) {
  return (
    <section className={cx(NEWS_CONTAINER, 'py-24 text-center md:py-36')}>
      <p className={cx(KICKER, 'text-news-accent')}>Temporarily unavailable</p>
      <h1 className="mt-5 font-news-serif text-[36px] font-medium leading-[1.08] tracking-[-0.015em] text-news-ink md:text-[52px]">
        ATLAS News will be back in a moment.
      </h1>
      <p className="mx-auto mt-5 max-w-[520px] font-news-serif text-[19px] leading-[1.55] text-news-muted">Please try again shortly.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className={cx('inline-flex h-12 items-center rounded-full bg-news-ink px-7 font-sans text-[14px] font-semibold text-news-paper transition-opacity hover:opacity-85', FOCUS)}
        >
          Try again
        </button>
        <Link href="/" className={cx('inline-flex h-12 items-center rounded-full border border-news-ink/20 px-7 font-sans text-[14px] font-semibold text-news-ink', FOCUS)}>
          ATLAS SkillTech University
        </Link>
      </div>
    </section>
  );
}
