import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleBody from '@/components/News/Public/ArticleBody';
import JsonLd from '@/components/News/Public/JsonLd';
import ShareLinks from '@/components/News/Public/ShareLinks';
import { SectionHeading } from '@/components/News/Public/Home';
import { Kicker, StoryCard } from '@/components/News/Public/StoryCard';
import { ClockIcon } from '@/components/News/Public/Icons';
import { cx, DECK, FOCUS, META, NEWS_CONTAINER } from '@/components/News/Public/ui';
import { getArticleBySlug, getRelatedArticles, listArticleSlugs } from '@/lib/news/public/repository';
import { articleJsonLd, articleMetadata, formatDate } from '@/lib/news/public/seo';

/* Known slugs are prerendered; an unknown one renders the News 404 (not-found.js) on demand. */
export async function generateStaticParams() {
  return (await listArticleSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return article ? articleMetadata(article) : {};
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const related = await getRelatedArticles(article, 3);

  return (
    <article>
      <JsonLd data={articleJsonLd(article)} />

      <header className={cx(NEWS_CONTAINER, 'pt-8 md:pt-14')}>
        <div className="mx-auto max-w-[860px]">
          <nav aria-label="Breadcrumb" className={cx(META, 'mb-8 md:mb-10')}>
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/news" className={cx('hover:text-news-ink', FOCUS)}>
                  News
                </Link>
              </li>
              {article.category ? (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href={article.category.url} className={cx('hover:text-news-ink', FOCUS)}>
                      {article.category.name}
                    </Link>
                  </li>
                </>
              ) : null}
            </ol>
          </nav>
          <Kicker category={article.category} />
          <h1 className="mt-4 text-balance font-news-serif text-[36px] font-medium leading-[1.06] tracking-[-0.018em] text-news-ink sm:text-[44px] md:text-[56px] xl:text-[64px]">
            {article.title}
          </h1>
          <p className={cx(DECK, 'mt-6 max-w-[760px]')}>{article.excerpt}</p>

          <div className="mt-8 flex flex-col gap-6 border-y border-news-line py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-news-brand font-news-serif text-[17px] font-semibold italic text-white">
                A
              </span>
              <div>
                <p className="font-sans text-[14px] font-semibold text-news-ink">
                  By <span>{article.authorName}</span>
                </p>
                <p className={cx(META, 'mt-0.5 flex flex-wrap items-center gap-x-2')}>
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="h-3.5 w-3.5" /> {article.readingMinutes} min read
                  </span>
                </p>
              </div>
            </div>
            <ShareLinks article={article} />
          </div>
        </div>
      </header>

      {article.image ? (
        <figure className={cx(NEWS_CONTAINER, 'mt-10 md:mt-14')}>
          <div className="mx-auto max-w-[1180px]">
            <Image
              src={article.image.src}
              alt={article.image.alt || ''}
              width={article.image.width}
              height={article.image.height}
              priority
              sizes="(min-width: 1260px) 1180px, 100vw"
              className="h-auto w-full bg-news-ink/[0.06]"
            />
            {article.image.caption ? (
              <figcaption className="mt-3 font-sans text-[13px] leading-[1.55] text-news-muted">{article.image.caption}</figcaption>
            ) : null}
          </div>
        </figure>
      ) : null}

      <div className={cx(NEWS_CONTAINER, 'mt-12 md:mt-16')}>
        <div className="mx-auto max-w-[720px]">
          <ArticleBody html={article.contentHtml} />

          <footer className="mt-14 border-t border-news-line pt-8">
            {article.categories.length ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className={cx(META, 'mr-1')}>Filed under</span>
                {article.categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={c.url}
                    className={cx('rounded-full border border-news-line px-3.5 py-1.5 font-sans text-[12.5px] font-semibold text-news-ink transition-colors hover:border-news-ink', FOCUS)}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            ) : null}
            <ShareLinks article={article} className="mt-6" />
          </footer>
        </div>
      </div>

      {related.length ? (
        <aside aria-labelledby="related" className={cx(NEWS_CONTAINER, 'mt-24')}>
          <SectionHeading id="related" title="More from ATLAS News" href={article.category?.url} linkLabel={article.category ? `More in ${article.category.name}` : undefined} />
          <ul className="grid gap-x-8 gap-y-12 md:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <StoryCard article={a} size="s" sizes="(min-width: 1320px) 400px, (min-width: 768px) 31vw, 100vw" />
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </article>
  );
}
