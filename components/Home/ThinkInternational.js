import { thinkInternational } from '@/lib/homeContent';
import SmartLink from '@/components/SmartLink';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION, H2, SUB, SUB_INNER } from '@/components/Home/SectionHead';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';

/**
 * "Think International. Opportunities Across Continents" — port of
 * reference/index.php:2836-2903
 * (`section.section > .container > (.head-wrap, .swiper.common-swiper-full)`).
 *
 * The head-wrap here is plain `.head-wrap` — **no** `mrgbtm32` — so it has no
 * bottom margin, and it carries an "Explore Internationalisation"
 * `.button-regular` beside the copy (54px tall, 27px radius, `#02b3c3` on black
 * from its `58b88113…` variant, 18px label dropping to 14px at <=767).
 *
 * Five `.square-card.atlas`: 612px wide with a `32px 0` radius, clipped, the
 * photo sized purely by its own srcset (`.sq-image` has no CSS), and a
 * `.sq-content` overlay across the bottom half with a
 * `transparent -> #00000080` gradient and the title.
 *
 * The reference also embeds a `<script>` that copies a `data-font-size`
 * attribute onto `.button-text`; the attribute is empty on this page, so it
 * would set `font-size: "px"` and be discarded — not reproduced.
 */
function OpportunityCard({ item, ugdx }) {
  return (
    /* ref .square-card.atlas */
    <div className={cx('relative w-[612px] overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-mcm:w-[calc(100vw-44px)]', !ugdx && 'max-md:w-screen')}>
      {/* ref .sq-image — unstyled upstream, so the srcset drives its size */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        srcSet={item.srcSet}
        sizes="100vw"
        alt={item.alt}
        loading="lazy"
        decoding="async"
      />

      {item.logo && (
        /* ref img.comp-image — the uGDX homepage's cards carry the partner's mark top-right (absolute,
           20 from the top, 24 from the right, at its own size); the ATLAS homepage's author none */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={item.logo} alt="" loading="lazy" className="absolute right-6 top-5 z-[1] max-w-full" />
      )}

      {/* ref .sq-content */}
      <div className="absolute inset-x-0 bottom-0 flex h-1/2 w-full items-end justify-between bg-[linear-gradient(#fff0,#00000080)] px-8 pb-10">
        {/* ref .sq-title */}
        <div className="text-[40px] leading-[1.2] text-white max-md:text-2xl max-md:leading-[1.2]">
          {item.title.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* `data` — defaults to the ATLAS homepage's; the uGDX homepage's "Global Exposure, Real-World Insight" is
   the same section with its own copy, partner marks and the red `.button-regular` (`buttonTone`). */
const BUTTON_TONE = { atlas: 'bg-atlas-teal text-black', ugdx: 'bg-[#eb1f3c] text-white' };

/* `variant="ugdx"` — the uGDX sheet differs in three measured ways: `.sub-heading` keeps its 20px
   vertical padding below 480 (SUB_INNER) and carries an authored <br>; `.swiper.common-swiper-full`
   has 56px of top padding (20 at <=767); and the card holds its 612px down to 568, where header.php
   makes the slide full width. Bullets are Swiper's own, absolutely placed. */
export default function ThinkInternational({ data = thinkInternational, buttonTone = 'atlas', block, variant = 'atlas' }) {
  const ugdx = variant === 'ugdx';
  const { heading, subheading, button, items } = data;

  return (
    /* ref section.section */
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .head-wrap — no `mrgbtm32`, so no bottom margin */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>
              {heading.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <div className={ugdx ? SUB_INNER : SUB}>{ugdx ? withBreaks(subheading) : subheading}</div>
          </div>

          {/* ref a.button-regular + its `58b88113…` variant */}
          <SmartLink
            href={button.href}
            className={cx('flex h-[54px] flex-none items-center justify-center gap-2.5 rounded-[27px] px-5 no-underline max-md:h-11', !ugdx && 'max-sm:my-[18px]', BUTTON_TONE[buttonTone])}
          >
            {/* ref .extra-space */}
            <div className="flex flex-none items-center justify-start gap-2.5 text-sm">
              {/* ref .button-text */}
              <div className="text-lg max-md:text-sm">{button.label}</div>
            </div>
          </SmartLink>
        </div>
      </div>

      {ugdx ? (
        <div className="pt-14 max-md:pt-5">
          <Carousel bullets="isdi-overlay">
            {items.map((item) => (
              <OpportunityCard key={item.title.join(' ')} item={item} ugdx />
            ))}
          </Carousel>
        </div>
      ) : (
        <Carousel>
          {items.map((item) => (
            <OpportunityCard key={item.title.join(' ')} item={item} />
          ))}
        </Carousel>
      )}
    </section>
  );
}
