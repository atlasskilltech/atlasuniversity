import Link from 'next/link';
import Pagination from './Pagination';
import { StoryCard, StoryWide } from './StoryCard';
import { categoryUrl } from '@/lib/news/public/repository';
import { cx, FOCUS, KICKER, META, NEWS_CONTAINER } from './ui';

/** A category page: masthead, the other sections, a featured story (page 1), the grid and page links. */
export default function CategoryListing({ data, nav }) {
  const { category, featured, items, page, totalPages, total } = data;
  return (
    <>
      <header className="border-b border-news-line">
        <div className={cx(NEWS_CONTAINER, 'pb-10 pt-10 md:pb-14 md:pt-16')}>
          <p className={cx(KICKER, 'text-news-accent')}>Section</p>
          <h1 className="mt-4 font-news-serif text-[46px] font-medium leading-[1] tracking-[-0.02em] text-news-ink md:text-[72px] xl:text-[88px]">
            {category.name}
          </h1>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[640px] font-news-serif text-[19px] leading-[1.5] text-news-muted md:text-[21px]">{category.description}</p>
            <p className={cx(META, 'shrink-0')}>
              {total} {total === 1 ? 'story' : 'stories'}
              {totalPages > 1 ? ` · Page ${page} of ${totalPages}` : ''}
            </p>
          </div>
          <nav aria-label="Other sections" className="mt-10 -mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
            <ul className="flex w-max gap-2 md:w-auto md:flex-wrap">
              {nav.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.url}
                    aria-current={c.slug === category.slug ? 'page' : undefined}
                    className={cx(
                      'inline-flex h-9 items-center whitespace-nowrap rounded-full border px-4 font-sans text-[13px] font-semibold transition-colors',
                      c.slug === category.slug ? 'border-news-ink bg-news-ink text-news-paper' : 'border-news-line text-news-ink hover:border-news-ink',
                      FOCUS,
                    )}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className={cx(NEWS_CONTAINER, 'pt-12 md:pt-16')}>
        {featured ? (
          <div className="mb-16 border-b border-news-line pb-16 md:mb-20 md:pb-20">
            <StoryWide article={featured} priority />
          </div>
        ) : null}

        {items.length ? (
          <>
            <h2 className="sr-only">{page > 1 ? `${category.name}, page ${page}` : `More from ${category.name}`}</h2>
            <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a, i) => (
                <li key={a.slug}>
                  <StoryCard
                    article={a}
                    showExcerpt
                    priority={!featured && i < 3}
                    sizes="(min-width: 1320px) 400px, (min-width: 992px) 31vw, (min-width: 480px) 46vw, 100vw"
                  />
                </li>
              ))}
            </ul>
          </>
        ) : !featured ? (
          <p className="py-16 text-center font-news-serif text-[20px] text-news-muted">No stories in this section yet.</p>
        ) : null}

        <Pagination page={page} totalPages={totalPages} hrefFor={(n) => categoryUrl(category.slug, n)} label={`${category.name} pages`} />
      </div>
    </>
  );
}
