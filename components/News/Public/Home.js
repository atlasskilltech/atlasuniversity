import Link from 'next/link';
import { socialLinks } from '@/lib/footerContent';
import NewsImage from './NewsImage';
import { HeroSideStory, Headline, Kicker, LeadStory, StoryCard, StoryMeta, StoryRow, StoryWide } from './StoryCard';
import { ArrowRightIcon } from './Icons';
import { cx, DISPLAY_L, FOCUS, HEAD_S, KICKER, NEWS_CONTAINER } from './ui';

/** Section heading: a rule, a label and an optional "view all" link. */
export function SectionHeading({ title, id, href, linkLabel = 'View all', description, as: H = 'h2' }) {
  return (
    <div className="mb-8 border-t-2 border-news-ink pt-4 md:mb-10">
      <div className="flex items-baseline justify-between gap-6">
        <H id={id} className="font-news-serif text-[28px] font-medium leading-[1.1] tracking-[-0.01em] text-news-ink md:text-[34px]">
          {title}
        </H>
        {href ? (
          <Link href={href} className={cx('group inline-flex shrink-0 items-center gap-1.5 font-sans text-[13px] font-semibold text-news-ink', FOCUS)}>
            {linkLabel}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
            {linkLabel === 'View all' && title ? <span className="sr-only"> in {title}</span> : null}
          </Link>
        ) : null}
      </div>
      {description ? <p className="mt-2 max-w-[720px] font-sans text-[14.5px] leading-[1.55] text-news-muted">{description}</p> : null}
    </div>
  );
}

/**
 * The hero: three editorial columns, after the WordPress News homepage — side stories stacked on the
 * left and right of one dominant lead.
 *   >= 992px  3 | 6 | 3 columns with hairline rules between them; the lead is first in the DOM (and in
 *             reading order) and placed in the centre column.
 *   768-991   the lead full width, then the two side columns as a pair.
 *   < 768     the lead, then the side stories as compact rows.
 */
export function HomeHero({ lead, companions }) {
  const half = Math.ceil(companions.length / 2);
  const columns = [
    { stories: companions.slice(0, half), place: 'lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:pr-8 xl:pr-10' },
    { stories: companions.slice(half), place: 'lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:pl-8 xl:pl-10' },
  ];
  return (
    <section aria-labelledby="top-stories" className={cx(NEWS_CONTAINER, 'pt-8 md:pt-12')}>
      <h2 id="top-stories" className="sr-only">
        Top stories
      </h2>
      <div className="grid gap-x-8 gap-y-8 md:grid-cols-2 md:gap-y-12 lg:grid-cols-12 lg:gap-x-0">
        <div className="md:col-span-2 lg:col-span-6 lg:col-start-4 lg:row-start-1 lg:border-x lg:border-news-line lg:px-8 xl:px-10">
          {lead ? <LeadStory article={lead} /> : null}
        </div>
        {columns.map(({ stories, place }, c) => (
          <ul key={c} className={cx('grid content-start gap-8 max-md:border-t max-md:border-news-line max-md:pt-8 md:gap-10', place)}>
            {stories.map((a, i) => (
              <li key={a.slug} className={cx(i > 0 && 'border-t border-news-line pt-8 md:pt-10')}>
                <HeroSideStory article={a} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

/** Four newest stories. */
export function LatestStrip({ articles }) {
  if (!articles.length) return null;
  return (
    <section aria-labelledby="latest" className={cx(NEWS_CONTAINER, 'mt-20 md:mt-28')}>
      <SectionHeading id="latest" title="Latest" />
      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((a) => (
          <li key={a.slug}>
            <StoryCard article={a} size="s" sizes="(min-width: 1320px) 300px, (min-width: 992px) 23vw, (min-width: 480px) 45vw, 100vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Full-bleed feature band on the night colour. */
export function Spotlight({ article }) {
  if (!article) return null;
  return (
    <section aria-labelledby="spotlight" className="mt-20 bg-news-night text-white md:mt-28">
      <div className={cx(NEWS_CONTAINER, 'grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16')}>
        <div className="group relative order-2 lg:order-1 lg:col-span-5">
          <p id="spotlight" className={cx(KICKER, 'text-white/60')}>
            The big read
          </p>
          <span className="mt-6 block h-px w-16 bg-white/40" aria-hidden="true" />
          <div className="mt-6">
            <Kicker category={article.category} tone="light" />
          </div>
          <Headline article={article} as="h3" tone="light" className={cx(DISPLAY_L, 'mt-3 font-medium md:text-[46px] xl:text-[52px]')} />
          <p className="mt-5 font-news-serif text-[19px] leading-[1.55] text-white/75 md:text-[21px]">{article.excerpt}</p>
          <StoryMeta article={article} className="mt-6" tone="light" />
          <span aria-hidden="true" className="pointer-events-none mt-8 inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-white">
            Read the story <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
          </span>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <NewsImage image={article.image} ratio="aspect-[4/3]" sizes="(min-width: 1320px) 720px, (min-width: 992px) 56vw, 100vw" zoom={false} />
        </div>
      </div>
    </section>
  );
}

/**
 * One category block. The layout follows how many stories the section has, so it never leaves a hole:
 *   4+  a large story beside three rows (alternate blocks mirror it);
 *   3   three even cards;
 *   2   two large cards side by side;
 *   1   one wide feature.
 */
export function CategorySection({ category, articles, flip = false }) {
  const [first, ...rest] = articles;
  if (!first) return null;
  const headingId = `section-${category.slug}`;
  let body;
  if (articles.length >= 4) {
    body = (
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className={cx('lg:col-span-7', flip && 'lg:order-2')}>
          <StoryCard article={first} size="l" showExcerpt sizes="(min-width: 1320px) 720px, (min-width: 992px) 56vw, 100vw" />
        </div>
        <ul className={cx('grid content-start gap-8 lg:col-span-5', flip && 'lg:order-1')}>
          {rest.slice(0, 3).map((a, i) => (
            <li key={a.slug} className={cx(i > 0 && 'border-t border-news-line pt-8')}>
              <StoryRow article={a} kicker={false} />
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (articles.length === 1) {
    body = <StoryWide article={first} as="h3" />;
  } else {
    const three = articles.length === 3;
    body = (
      <ul className={cx('grid gap-x-8 gap-y-12', three ? 'md:grid-cols-3 md:gap-x-6 lg:gap-x-8' : 'md:grid-cols-2 md:gap-x-10')}>
        {articles.map((a) => (
          <li key={a.slug}>
            <StoryCard
              article={a}
              size={three ? 'm' : 'l'}
              showExcerpt
              sizes={three ? '(min-width: 1320px) 400px, (min-width: 768px) 31vw, 100vw' : '(min-width: 1320px) 620px, (min-width: 768px) 47vw, 100vw'}
            />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <section aria-labelledby={headingId} className={cx(NEWS_CONTAINER, 'mt-20 md:mt-28')}>
      <SectionHeading id={headingId} title={category.name} href={category.url} description={category.description} />
      {body}
    </section>
  );
}

/** Numbered "most read" list. */
export function Trending({ articles }) {
  if (!articles.length) return null;
  return (
    <section aria-labelledby="most-read">
      <SectionHeading id="most-read" title="Most read" />
      <ol className="grid gap-x-10 md:grid-cols-2 lg:grid-cols-1">
        {articles.map((a, i) => (
          <li key={a.slug} className="group relative flex gap-5 border-b border-news-line py-5">
            <span aria-hidden="true" className="w-10 shrink-0 font-news-serif text-[40px] font-light leading-[0.9] text-news-accent">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <Headline article={a} as="h3" className={cx(HEAD_S, 'font-medium')} />
              <StoryMeta article={a} className="mt-2" short />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Newsletter placeholder. There is no newsletter integration in this project, so this is a visual
 * announcement with links to the university's real social channels — deliberately no form.
 */
export function BriefPanel() {
  const follow = socialLinks.filter((s) => /LinkedIn|Instagram/.test(s.label));
  return (
    <aside aria-labelledby="the-brief" className="relative overflow-hidden rounded-sm border border-news-line bg-news-surface p-8 md:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(var(--n-accent)/0.18),transparent_70%)]"
      />
      <p className={cx(KICKER, 'text-news-accent')}>Coming soon</p>
      <h2 id="the-brief" className="mt-4 font-news-serif text-[34px] font-medium leading-[1.05] tracking-[-0.01em] text-news-ink md:text-[40px]">
        The ATLAS Brief
      </h2>
      <p className="mt-4 max-w-[420px] font-news-serif text-[18px] leading-[1.55] text-news-muted">
        A fortnightly edit of the best stories from campus, studio and industry — delivered to your inbox. Subscriptions open soon.
      </p>
      <p className="mt-8 font-sans text-[13px] font-semibold text-news-ink">Until then, follow along:</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {follow.map((s) => {
          const name = s.label.includes('LinkedIn') ? 'LinkedIn' : 'Instagram';
          return (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cx('inline-flex h-10 items-center rounded-full border border-news-ink/20 px-5 font-sans text-[13px] font-semibold text-news-ink transition-colors hover:border-news-ink hover:bg-news-ink hover:text-news-paper', FOCUS)}
              >
                {name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
