import { cx } from '@/lib/cx';
import SmartLink from '@/components/SmartLink';

/*
 * ref reference/thought-leaderships/thought-leaderships/index.php `#blog-section` — the ATLAS
 * main Thought-Leadership listing. The page's own inline <style> defines every class here; it is
 * the same `.card.type-b-responsive` grid + five-school `.blog-tab` strip the ISDI TL page uses,
 * re-skinned for the ATLAS page: the active tab and the "Read now" button are the ATLAS teal
 * `#6EC1C2` (ISDI's are pink). The accent is a prop (default teal) carried as a CSS custom
 * property so the hover and active states theme without a dynamic JIT class.
 *
 *   .container        max-w 1366, px 62 -> 22 (<=767).
 *   .section          pt 0 / pb 60 (40 <=767); overflow hidden.
 *   .blog-tabs-container  margin 40px 0.
 *   .blog-tabs        gap 12 wrap; horizontal scroller at <=767 (scrollbars hidden).
 *   .blog-tab         px20 py10, r25, 1px #ccc, weight 500; active/hover -> accent (black text? no:
 *                     the tab keeps #000 text, only its background changes to the teal accent).
 *   .common-flex-16-wrap  flex wrap, gap 16, justify start (center <=767).
 *   .card (type-b-responsive)  #f2f2f2, radius 0, 285 x 517 (w-full / h-auto <=767), clipped;
 *                     image 298 on #8facec; title clamped to 50px/600; date row (12px) pt12 pb44;
 *                     "Read now" tertiary pill = accent with BLACK text and an inverted arrow.
 */

const CONTAINER = 'relative z-[1] mx-auto w-full max-w-[1366px] px-[62px] max-md:px-[22px]';
const DEFAULT_ACCENT = '#6EC1C2';

/* ref .card:where(.w-variant…type-b-responsive) */
function BlogCard({ card }) {
  return (
    <div className="flex w-[285px] flex-none flex-col overflow-hidden bg-[#f2f2f2] text-black max-md:h-auto max-md:w-full md:h-[517px]">
      {/* ref .c-image */}
      <div className="relative h-[298px] bg-[#8facec]">
        {card.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={card.image}
            alt={card.alt}
            loading="lazy"
            decoding="async"
            className="inline-block h-full w-full max-w-full object-cover align-middle"
          />
        )}
        {/* ref .card-a-gradient — height 50% absolute, no background declared: inert */}
        <div className="absolute inset-x-0 bottom-0 h-1/2" />
      </div>
      {/* ref .content-box */}
      <div className="p-4">
        {/* ref .c-title — inherits the body's 16px; clamped to 50px, weight 600 */}
        <div className="h-[50px] overflow-hidden text-ellipsis font-semibold">{card.title}</div>
        {/* ref .c-date */}
        <div className="flex items-center justify-start gap-1.5 pb-11 pt-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/atlas-news/calendar-icon.svg"
            width={17}
            height={18}
            alt=""
            loading="lazy"
            className="max-w-full align-middle"
          />
          <div className="text-[12px] leading-[1.5]">{card.date}</div>
        </div>
        {/* ref a.button-tertiary (variant mint) — accent bg, BLACK text */}
        <SmartLink
          href={card.href}
          className="flex h-11 max-w-full items-center justify-center gap-[5px] rounded-3xl bg-[var(--tl-accent)] px-6 text-left text-[14px] leading-[1.5] text-black no-underline"
        >
          <div className="leading-[1.2]">Read now</div>
          {/* ref img.icon-t — filter: invert() */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/icons/arrow-downward.svg"
            width={27}
            height={27}
            alt=""
            loading="lazy"
            className="max-w-full align-middle [filter:invert(1)]"
          />
        </SmartLink>
      </div>
    </div>
  );
}

/* `accentText` — the active / hovered tab's text colour. Black on ATLAS (and every page before the
   School of Law); the Law (#CB5827) and uGDX (#EB1F3C) listings turn it white (their own <style>). */
export default function BlogSection({ tabs, cards, accent = DEFAULT_ACCENT, accentText = '#000', source }) {
  return (
    /* ref .section#blog-section — the hero's `.mrgbtm` 56/40 gap is this section's top margin */
    /* ref .section#blog-section — padding-bottom 60 (40 at <=767), measured on production /thought-leaderships/
       and both school listings; it was missing here, which left the page 60px short from 768 up (below 768
       the tab strip's doubled 40px margins happened to make up the same 40) */
    <section id="blog-section" data-blog-source={source} className="block overflow-hidden pb-[60px] max-md:pb-10" style={{ '--tl-accent': accent, '--tl-accent-text': accentText }}>
      <div className={CONTAINER}>
        {/* ref .blog-tabs-container > .blog-tabs */}
        <div className="my-10 flex w-full max-md:my-5">
          <div className="flex flex-wrap gap-3 max-md:flex-nowrap max-md:justify-start max-md:overflow-x-auto max-md:pb-[5px] max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => (
              /* ref a.blog-tab(.active) */
              <SmartLink
                key={tab.label}
                href={tab.href}
                className={cx(
                  'rounded-[25px] border border-solid px-5 py-2.5 font-medium no-underline transition-all duration-300 max-md:flex-none max-md:px-4 max-md:py-2 max-md:text-[14px]',
                  tab.active
                    ? 'border-transparent bg-[var(--tl-accent)] text-[color:var(--tl-accent-text)]'
                    : 'border-[#ccc] text-black hover:border-transparent hover:bg-[var(--tl-accent)] hover:text-[color:var(--tl-accent-text)]'
                )}
              >
                {tab.label}
              </SmartLink>
            ))}
          </div>
        </div>

        {/* ref .w-dyn-list > .common-flex-16-wrap */}
        <div className="flex flex-wrap items-start justify-start gap-4 max-md:items-center max-md:justify-center">
          {cards.map((card, i) => (
            <BlogCard key={card.id ?? `${i}-${card.href}`} card={card} />
          ))}
          {cards.length === 0 && (
            <p className="w-full py-10 text-center">No articles have been published here yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
