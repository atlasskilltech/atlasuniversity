import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { cx, FOCUS } from './ui';

/** Page links for a category. Real URLs (/news/category/x/page/2), so every page is static and crawlable. */
export default function Pagination({ page, totalPages, hrefFor, label }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const step = 'inline-flex h-11 items-center gap-2 rounded-full border border-news-line px-5 font-sans text-[14px] font-semibold text-news-ink transition-colors hover:border-news-ink';
  return (
    <nav aria-label={label} className="mt-16 flex flex-wrap items-center justify-center gap-3 border-t border-news-line pt-10">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} rel="prev" className={cx(step, FOCUS)}>
          <ArrowLeftIcon className="h-4 w-4" /> Newer
        </Link>
      ) : null}
      <ul className="flex items-center gap-1.5">
        {pages.map((n) => (
          <li key={n}>
            <Link
              href={hrefFor(n)}
              aria-current={n === page ? 'page' : undefined}
              aria-label={`Page ${n}`}
              className={cx(
                'grid h-11 w-11 place-items-center rounded-full font-sans text-[14px] font-semibold transition-colors',
                n === page ? 'bg-news-ink text-news-paper' : 'text-news-ink hover:bg-news-ink/5',
                FOCUS,
              )}
            >
              {n}
            </Link>
          </li>
        ))}
      </ul>
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} rel="next" className={cx(step, FOCUS)}>
          Older <ArrowRightIcon className="h-4 w-4" />
        </Link>
      ) : null}
    </nav>
  );
}
