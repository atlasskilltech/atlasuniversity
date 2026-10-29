import { cx } from '@/lib/cx';
import SmartLink from '@/components/SmartLink';

/*
 * ref reference/schools/isdi/thought-leaderships/index.php `#blog-section` — the page's
 * own inline <style> defines every class here, so these are local rather than the shared
 * ISDI helpers:
 *
 *   .container        max-w 1366, px 62 -> 22 (<=767). NO 30 step at 991 (the inline
 *                     `.container` beats the sheet's responsive rule), so this is a local
 *                     container, not `Home/ui`'s CONTAINER.
 *   .section          padding 0 — the `.isdi-page .section { padding: 0 0 }` rule (0,2,0)
 *                     beats `.section { padding-bottom: 60px }` AND its <=767 40 at every
 *                     width (measured 0/0 on production); overflow hidden. The 56px gap above
 *                     it is the hero's `.mrgbtm` margin-bottom (40 <=767), carried here as the
 *                     section's top margin.
 *   .blog-tabs        gap 12 wrap; a horizontal scroller at <=767 (scrollbars hidden).
 *   .blog-tab         px20 py10, r25, 1px #ccc, weight 500; active/hover -> #EC1376 white.
 *   .common-flex-16-wrap  flex wrap, gap 16, justify start (center <=767).
 *   .card (type-b-responsive)  #f2f2f2, radius 0, 285 x 517 (w-full / h-auto <=767),
 *                     clipped; image 298 on #8facec; title clamped to 50px/600; date row
 *                     (12px) pt12 pb44; "Read now" tertiary pill #EC1376 with BLACK text
 *                     and an inverted arrow (`.icon-t` filter: invert()).
 */

const CONTAINER = 'relative z-[1] mx-auto w-full max-w-[1366px] px-[62px] max-md:px-[22px]';

/* ref .card:where(.w-variant…type-b-responsive) */
function BlogCard({ card }) {
  return (
    <div className="flex w-[285px] flex-none flex-col overflow-hidden bg-[#f2f2f2] text-black max-md:h-auto max-md:w-full md:h-[517px]">
      {/* ref .c-image */}
      <div className="relative h-[298px] bg-[#8facec]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.image.src}
          alt={card.image.alt}
          loading="lazy"
          decoding="async"
          className="inline-block h-full w-full max-w-full object-cover align-middle"
        />
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
        {/* ref a.button-tertiary (variant mint) — #EC1376, BLACK text */}
        <SmartLink
          href={card.href}
          className="flex h-11 max-w-full items-center justify-center gap-[5px] rounded-3xl bg-[#ec1376] px-6 text-left text-[14px] leading-[1.5] text-black no-underline"
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

export default function BlogSection({ tabs, cards }) {
  return (
    /* ref .section#blog-section — the hero's `.mrgbtm` 56/40 gap is this section's top margin */
    <section id="blog-section" className="mt-14 block overflow-hidden max-md:mt-10">
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
                    ? 'border-transparent bg-[#EC1376] text-white'
                    : 'border-[#ccc] text-black hover:border-transparent hover:bg-[#EC1376] hover:text-white'
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
            <BlogCard key={`${i}-${card.href}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
