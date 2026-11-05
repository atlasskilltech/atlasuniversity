import { think } from '@/lib/internationalisationContent';
import Carousel from '@/components/Carousel/Carousel';
import SmartLink from '@/components/SmartLink';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Think International. Learn International." — port of
 * `atlas-internationalisation.php:355-463`
 * (`section.section > .container > (.head-wrap.mobile-gap > .tt-wrap >
 *   (h2.h2-tag.mrg16, .sub-heading), .swiper.common-swiper-full >
 *   6 x .square-card)`).
 *
 * ── Not the homepage's square card ────────────────────────────────────────
 * `components/Home/ThinkInternational` renders `.square-card.atlas`: 612px
 * wide, a `32px 0` radius, a 40px title and no link. This page's inline
 * `<style>` block redefines the bare `.square-card` — `width: 100%`, no radius,
 * a 22px title, `.sq-content` padded `0 20 22` — and every card carries a mint
 * circular arrow linking to a partnership page. Two genuinely different cards,
 * so this section keeps its own.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                          >=569px                    <=568px
 *   .swiper-slide          611 wide — the photograph's own intrinsic width,
 *                          which is what `slidesPerView: 'auto'` measures
 *                                                     100% of the container
 *   .square-card           100% of the slide, no radius
 *   .sq-image              100%, its srcset drives the height
 *   .sq-content            bottom half, #fff0 -> #00000080, padding 0 20 22,
 *                          space-between, align-end
 *   .sq-title              22px/1.2, #fff
 *   .circular-button-prev  48px circle #07f6a0, `position: static`
 *   .sl-arrow-lt           12px, and the mint variant drops the sheet's filter
 *
 * `.head-wrap.mobile-gap` is the plain head-wrap plus `margin-bottom: 20px`
 * below 480px. The "Explore More" `.button-regular` beside it is commented out
 * upstream — 15 lines — and is therefore absent here too.
 *
 * The reference nests the arrow `<a>` inside another `<a>` with the same href;
 * an HTML parser closes the outer one at the inner tag, so it renders as an
 * empty anchor followed by the real button. Only the button is ported. Its
 * `id="prevBtn"` is repeated on all six cards upstream and is not transcribed.
 * Their hrefs are absolute `https://atlasuniversity.edu.in/advantages/partnership/…`
 * upstream rather than written through `$domain`; they are this site's own
 * routes, so they are stored root-relative like every other internal link.
 *
 * `.common-swiper-full`'s autoplay is stopped by the page's own trailing
 * script, on all three of its sliders — hence `autoplay={false}`.
 */
function SquareCard({ card }) {
  return (
    /* ref .square-card */
    <div className="relative w-[611px] max-mcm:w-[calc(100vw-44px)]">
      {/* ref img.sq-image — unstyled upstream, so the srcset drives its size */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        srcSet={card.image.srcSet}
        sizes={card.image.sizes}
        alt={card.image.alt}
        loading="lazy"
        className="block w-full"
      />

      {/* ref .sq-content */}
      <div className="absolute inset-x-0 bottom-0 flex h-1/2 w-full items-end justify-between bg-[linear-gradient(#fff0,#00000080)] px-5 pb-[22px]">
        {/* ref .sq-title */}
        <div className="text-[22px] leading-[1.2] text-white">{card.title}</div>

        {/* ref a.circular-button-prev on its `41d28c60…` (mint) variant */}
        <SmartLink
          href={card.href}
          aria-label={card.title}
          className="flex h-12 w-12 max-w-full flex-none items-center justify-center rounded-3xl bg-atlas-mint"
        >
          {/* ref img.sl-arrow-lt */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.arrow.src} alt="" loading="lazy" className="h-3 w-3" />
        </SmartLink>
      </div>
    </div>
  );
}

export default function ThinkInternational() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.mobile-gap */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch max-sm:mb-5">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{think.heading}</h2>
            <div className={SUB_INNER}>{think.subheading}</div>
          </div>
        </div>
      </div>

      {/* ref .swiper.common-swiper-full — a sibling of .container so the track
          bleeds to the viewport edge */}
      <Carousel className="pt-14 max-md:pt-5" autoplay={false}>
        {think.cards.map((card) => (
          <SquareCard key={card.title} card={card} />
        ))}
      </Carousel>
    </section>
  );
}
