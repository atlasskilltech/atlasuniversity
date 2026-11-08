import Link from 'next/link';
import NewsImage from './NewsImage';
import { formatDate, formatDateShort } from '@/lib/news/public/seo';
import { cx, DISPLAY_L, FOCUS, HEAD_M, HEAD_S, HEAD_XS, HOVER_LINE, KICKER, META } from './ui';

/**
 * Article cards. The headline link is stretched over the whole card (after:inset-0), so the card is one
 * click target, while the category kicker stays its own link above it — no nested <a>. The heading level
 * is chosen by the section that renders the card.
 */

export function Kicker({ category, className, tone = 'accent' }) {
  if (!category) return null;
  return (
    <Link
      href={category.url}
      className={cx(
        KICKER,
        'relative z-10 inline-block transition-opacity hover:opacity-70',
        tone === 'light' ? 'text-white' : 'text-news-accent',
        FOCUS,
        className,
      )}
    >
      {category.name}
    </Link>
  );
}

export function StoryMeta({ article, className, short = false, tone }) {
  return (
    <p className={cx(META, tone === 'light' && 'text-white/70', 'flex flex-wrap items-center gap-x-2 gap-y-1', className)}>
      <time dateTime={article.publishedAt}>{short ? formatDateShort(article.publishedAt) : formatDate(article.publishedAt)}</time>
      <span aria-hidden="true">·</span>
      <span>{article.readingMinutes} min read</span>
    </p>
  );
}

function Headline({ article, as: H = 'h3', className, tone }) {
  return (
    <H className={cx('text-balance', tone === 'light' ? 'text-white' : 'text-news-ink', className)}>
      <Link href={article.url} className={cx('after:absolute after:inset-0', FOCUS, 'rounded-sm')}>
        <span className={HOVER_LINE}>{article.title}</span>
      </Link>
    </H>
  );
}

/** The homepage lead: the centre of the hero — a large photograph over a centred display headline. */
export function LeadStory({ article, priority = true }) {
  return (
    <article className="group relative">
      <NewsImage image={article.image} priority={priority} ratio="aspect-[4/3]" sizes="(min-width: 1320px) 640px, (min-width: 992px) 50vw, 100vw" />
      <div className="mt-6 text-center md:mt-8">
        <Kicker category={article.category} />
        <Headline article={article} as="h2" className="mx-auto mt-3 max-w-[640px] font-news-serif text-[34px] font-medium leading-[1.06] tracking-[-0.015em] sm:text-[42px] md:text-[50px] xl:text-[54px]" />
        <p className="mx-auto mt-4 max-w-[560px] font-news-serif text-[18px] leading-[1.5] text-news-muted md:text-[20px]">{article.excerpt}</p>
        <StoryMeta article={article} className="mt-5 justify-center" />
      </div>
    </article>
  );
}

/**
 * A hero side story. From 768px an image card (3:2 photograph over a compact headline); below 768px a
 * text row with a square thumbnail, so the stack stays short on a phone. One element in both layouts.
 */
export function HeroSideStory({ article }) {
  return (
    <article className="group relative flex items-start gap-4 md:flex-col md:gap-0">
      <NewsImage
        image={article.image}
        ratio="aspect-square md:aspect-[3/2]"
        className="w-[96px] shrink-0 max-md:order-last md:w-full"
        sizes="(min-width: 1320px) 300px, (min-width: 992px) 23vw, (min-width: 768px) 45vw, 96px"
      />
      <div className="min-w-0 flex-1 md:mt-4">
        <Kicker category={article.category} />
        <Headline article={article} as="h3" className={cx(HEAD_S, 'mt-2 font-medium')} />
        <StoryMeta article={article} className="mt-2.5" short />
      </div>
    </article>
  );
}

/** A standard image-led card. */
export function StoryCard({ article, as = 'h3', size = 'm', showExcerpt = false, sizes = '(min-width: 1320px) 400px, (min-width: 768px) 45vw, 100vw', ratio = 'aspect-[3/2]', priority = false }) {
  const head = size === 'l' ? DISPLAY_L : size === 's' ? HEAD_S : HEAD_M;
  return (
    <article className="group relative flex flex-col">
      <NewsImage image={article.image} sizes={sizes} ratio={ratio} priority={priority} />
      <div className="mt-5">
        <Kicker category={article.category} />
        <Headline article={article} as={as} className={cx(head, 'mt-2.5 font-medium')} />
        {showExcerpt ? <p className="mt-3 font-news-serif text-[17px] leading-[1.55] text-news-muted">{article.excerpt}</p> : null}
        <StoryMeta article={article} className="mt-3.5" short={size === 's'} />
      </div>
    </article>
  );
}

/** A text-led row with a small square thumbnail — used in stacked lists. */
export function StoryRow({ article, as = 'h3', thumb = true, kicker = true }) {
  return (
    <article className="group relative flex items-start gap-4">
      <div className="min-w-0 flex-1">
        {kicker ? <Kicker category={article.category} /> : null}
        <Headline article={article} as={as} className={cx(HEAD_S, kicker && 'mt-2', 'font-medium')} />
        <StoryMeta article={article} className="mt-2.5" short />
      </div>
      {thumb ? <NewsImage image={article.image} ratio="aspect-square" className="w-[88px] shrink-0 md:w-[104px]" sizes="104px" /> : null}
    </article>
  );
}

/** A wide horizontal card: image beside the text from 768px. */
export function StoryWide({ article, as = 'h2', priority = false }) {
  return (
    <article className="group relative grid items-center gap-6 md:grid-cols-12 md:gap-10">
      <NewsImage image={article.image} priority={priority} ratio="aspect-[3/2]" className="md:col-span-7" sizes="(min-width: 1320px) 720px, (min-width: 768px) 56vw, 100vw" />
      <div className="md:col-span-5">
        <Kicker category={article.category} />
        <Headline article={article} as={as} className={cx(DISPLAY_L, 'mt-3 font-medium')} />
        <p className="mt-4 font-news-serif text-[18px] leading-[1.55] text-news-muted md:text-[19px]">{article.excerpt}</p>
        <StoryMeta article={article} className="mt-5" />
      </div>
    </article>
  );
}

/** A compact text card (no image) for dense lists. */
export function StoryText({ article, as = 'h3' }) {
  return (
    <article className="group relative">
      <Kicker category={article.category} />
      <Headline article={article} as={as} className={cx(HEAD_XS, 'mt-2 font-medium')} />
    </article>
  );
}

export { Headline };
