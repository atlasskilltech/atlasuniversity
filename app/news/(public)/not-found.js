import Link from 'next/link';
import { cx, FOCUS, KICKER, NEWS_CONTAINER } from '@/components/News/Public/ui';

export const metadata = { title: 'Story not found', robots: { index: false, follow: false } };

/** News-styled 404 for an unknown article, category or page, inside the News header and footer. */
export default function NewsNotFound() {
  return (
    <section className={cx(NEWS_CONTAINER, 'py-24 text-center md:py-36')}>
      <p className={cx(KICKER, 'text-news-accent')}>404</p>
      <h1 className="mt-5 font-news-serif text-[40px] font-medium leading-[1.05] tracking-[-0.015em] text-news-ink md:text-[60px]">
        This story isn’t here.
      </h1>
      <p className="mx-auto mt-5 max-w-[520px] font-news-serif text-[19px] leading-[1.55] text-news-muted">
        The link may be out of date, or the story may have moved. The latest from ATLAS News is a click away.
      </p>
      <Link
        href="/news"
        className={cx('mt-10 inline-flex h-12 items-center rounded-full bg-news-ink px-7 font-sans text-[14px] font-semibold text-news-paper transition-opacity hover:opacity-85', FOCUS)}
      >
        Go to ATLAS News
      </Link>
    </section>
  );
}
