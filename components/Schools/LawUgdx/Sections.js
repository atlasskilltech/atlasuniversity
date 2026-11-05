import { CONTAINER, H2, SECTION, SUB_INNER } from '@/components/Home/SectionHead';
import CareerSupportCard from '@/components/ui/CareerSupportCard';
import PortCardM from '@/components/ui/PortCardM';
import Carousel from '@/components/Carousel/Carousel';
import RichText from '@/components/Statutory/RichText';
import PrimaryButton from '@/components/ui/PrimaryButton';
import ButtonRegular from '@/components/ui/ButtonRegular';
import withBreaks from '@/lib/withBreaks';

/*
 * Section shells shared by the School of Law and uGDX homepages (reference/law/index.php,
 * reference/ugdx/index.php). Both schools are served under the ATLAS header and footer and over the
 * same Webflow chassis, so every value here was measured on production at 1440 / 991 / 767 / 479 / 390
 * and read off the page's own sheet. Every root carries `data-block` for the comparison harness.
 *
 *   .h2-tag          44px/1.2 500 #1a1a1a, mb 56 (32 at <=767; 36px) — SectionHead's H2
 *   .h2-tag.mrg32    mb 32 at every width (a compound selector, so it survives the <=767 rule)
 *   .h2-tag.mrg16    mb 16 (8 at <=767)
 */
export const H2_MB = `mb-14 max-md:mb-8 ${H2}`;
export const H2_MRG32 = `mb-8 ${H2}`;
export const H2_MRG16 = `mb-4 max-md:mb-2 ${H2}`;

/* ---- `.about-story-wrapper-ugdx` -------------------------------------------------------------
 * flex, space-between, centred, gap 32; at <=767 it wraps with no gap and the type steps to 18px.
 * `.abt-cont-ugdx-1` is `flex: none` at 50% (100% at <=767), 18px/1.5 (16px at <=767), holding the
 * `.h2-tag.mrg32` and the `.abt-text` copy (bold runs and authored <br><br>). `.about-image-wrap-ugdx`
 * is `flex: 0 auto`, radius 32px 0, clipped; its photograph is `vertical-align: super`, which is why
 * the wrap stands 12px taller than the image. At <=767 the wrap is a centred flex row and the image
 * takes the radius and a 40px top margin at its own width. */
/* `data.headingAbove` — the uGDX homepage's "At uGDX, students don't just learn to code…" puts its
   `h2.h2-tag.mrg32` above the row rather than in the text column. `data.button` — a CTA in
   `.common-wrapper` (padding-top 56, 40 at <=767) > `.btn-wraper` under the copy. */
export function AboutStory({ data, block = 'about', children }) {
  return (
    <section data-block={block} className={SECTION}>
      {children}
      <div className={CONTAINER}>
        {data.headingAbove && <h2 className={H2_MRG32}>{withBreaks(data.heading)}</h2>}
        <div className="flex items-center justify-between gap-8 max-md:flex-wrap max-md:gap-0 max-md:text-lg">
          <div className="w-1/2 flex-none text-lg max-md:w-full max-md:text-base">
            {!data.headingAbove && <h2 className={H2_MRG32}>{withBreaks(data.heading)}</h2>}
            <div>
              <RichText runs={data.text} />
            </div>
            {data.button && (
              <div className="pt-14 max-md:pt-10">
                <div className="mt-auto inline-block">
                  <PrimaryButton href={data.button.href} variant={data.button.variant}>{data.button.label}</PrimaryButton>
                </div>
              </div>
            )}
          </div>
          <div className="relative flex-[0_1_auto] overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:flex max-md:w-full max-md:items-center max-md:justify-center">
            {/* the authored srcset matters below 768, where the image is `width: auto`: with `sizes="100vw"`
                its intrinsic width is the viewport, so it fills the row (uGDX); Law authors none */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image.src}
              srcSet={data.image.srcSet}
              sizes={data.image.sizes}
              alt=""
              loading="lazy"
              className="inline-block h-full w-full flex-none object-cover align-super max-md:mt-10 max-md:w-auto max-md:overflow-hidden max-md:rounded-tl-[32px] max-md:rounded-br-[32px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- "Distinctive Edges of Excellence" — `.career-sup-wrapper` of `.career-sup-card.ugdx` ------
 * `components/ui/CareerSupportCard` with its Poppins `.cr-title.isdi` titles; the wrapper is a
 * centred wrapping row, gap 22 (not `.common-flex-26-wrap`'s 24), padding-top 56 (40 at <=767).
 * A card may carry its own `descVariant` (uGDX's last card has no `.cr-sub-desc.gap`). */
export function EdgeCards({ data, block = 'edges', titleVariant = 'poppins', descVariant }) {
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2}>{data.heading}</h2>
        <div className="flex flex-wrap items-start justify-center gap-[22px] pt-14 max-md:pt-10">
          {data.cards.map((card) => (
            <CareerSupportCard key={card.title} card={card} titleVariant={titleVariant} descVariant={card.descVariant ?? descVariant} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- "Our Halls attract the Remarkable" — `.swiper.common-swiper.mrgtp32` of
 * `.port-card-m-wrap-ugdx` cards (`ui/PortCardM` variant "ugdx", here with the company logo and the
 * bar colour each card carries). The slider is a sibling of `.container` (see Carousel's bleed), and
 * `.mrgtp32` is its 32px of top padding. */
/* `variant` — the Law homepage's cards are `.port-card-m-wrap-ugdx` (480 tall); the uGDX homepage's are
   `.port-card-m-wrap-atlas` (520) with the uGDX bar colour */
export function HallsCarousel({ data, block = 'halls', variant = 'ugdx' }) {
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2_MRG16}>{withBreaks(data.heading)}</h2>
      </div>
      <div className="pt-8">
        <Carousel bullets="inline">
          {data.cards.map((card) => (
            <PortCardM key={card.name} item={card} variant={variant} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

/* the `.head-wrap > .tt-wrap > h2.h2-tag.mrg16 + .sub-heading` heading pair */
export function HeadPair({ heading, sub, button }) {
  const pair = (
    <>
      <h2 className={H2_MRG16}>{withBreaks(heading)}</h2>
      {sub && <div className={SUB_INNER}>{withBreaks(sub)}</div>}
    </>
  );
  if (!button) return pair;
  /* ref .head-wrap (space-between, bottom-aligned; a stretched column at <=767) > .tt-wrap + a.button-regular */
  return (
    <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
      <div className="flex-[0_1_auto] max-md:mb-5 max-sm:mr-5">{pair}</div>
      <ButtonRegular href={button.href} variant={button.variant} newTab={button.newTab} external={button.external}>{button.label}</ButtonRegular>
    </div>
  );
}
