import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION, SUB_H2, SUB_H2_MRGBTM32 } from '@/components/Home/SectionHead';
import RichText from '@/components/Statutory/RichText';
import withBreaks from '@/lib/withBreaks';
import { H2_MRG16 } from '@/components/Schools/LawUgdx/Sections';

/*
 * The page-specific blocks of /schools/ugdx/nextgen-women-in-stem-scholarship
 * (reference/ugdx/nextgen-women-in-stem-scholarship.php). The page ships its own <style> ahead of the
 * markup, re-declaring the story pair and the card, and turning several of them at **576**, not 767 —
 * hence `max-lp` (the width-ordered twin of `max-576`, which is emitted before `max-md` and loses to it). Measured on production at 1440 / 991 / 767 / 479 / 390.
 */

/* ---- the story — `.about-story-wrapper-ugdx`: a centred space-between row, gap 32; `.abt-cont-ugdx-1`
 * 50%, 24px/42 (the page's <style>); `.about-image-wrap-ugdx` 32px 0, clipped, its image `width: 100%;
 * height: 100%` cover (500px natural). At <=767 the row wraps and the image takes the sheet's 40px top
 * margin inside a centred flex wrap; at <=576 the text column goes full width at 16px / normal and the
 * image's margin is reset. */
export function StemStory({ data, block = 'story' }) {
  return (
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <div className="flex items-center justify-between gap-8 max-md:flex-wrap max-md:text-lg">
          <div className="w-1/2 flex-none text-2xl leading-[42px] max-lp:w-full max-lp:text-base max-lp:[line-height:normal]">
            <RichText runs={data.text} />
          </div>
          <div className="relative w-auto flex-[0_1_auto] overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:flex max-md:items-center max-md:justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.image.src} srcSet={data.image.srcSet} sizes={data.image.sizes} alt="" loading="lazy" className="inline-block h-full w-full flex-none object-cover align-super max-md:mt-10 max-lp:mt-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- `.card-type-el-ugdx` under `h2.h2-tag.mrg16` + `h2.sub-heading.mrgbtm32`, in a `.common-swiper.mrgtp0`.
 * `.card-type-el-ugdxv2` (the page's <style>) is 328 tall and square; the plain card keeps 232 / 32px 0.
 * The caption is the lower half, `#fff0 -> #000`, padding 0 32 32, 20px/1.2 500 white. */
function Card({ card, tall }) {
  return (
    <div className={tall ? 'relative h-[328px] w-[298px] flex-none overflow-hidden' : 'relative h-[232px] w-[298px] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px]'}>
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-end justify-start bg-[linear-gradient(#fff0,#000)] px-8 pb-8">
        <div className="text-[20px] font-medium leading-[1.2] text-white">{withBreaks(card.title)}</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt="" loading="lazy" className="block h-full w-full object-cover" />
    </div>
  );
}

export function StemCards({ data, block, tall = false }) {
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2_MRG16}>{withBreaks(data.heading)}</h2>
        <div className={SUB_H2_MRGBTM32}>{withBreaks(data.sub)}</div>
      </div>
      <Carousel bullets="inline">
        {data.cards.map((card, i) => <Card key={`${i}-${card.title}`} card={card} tall={tall} />)}
      </Carousel>
    </div>
  );
}

/* ---- "Eligibility Criteria" — a `.section` holding only `h2.h2-tag.mrg16`; its 16px (8 at <=767) stays
 * inside the section, which is `overflow: hidden` */
export function StemHeading({ data, block = 'criteria' }) {
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2_MRG16}>{data.heading}</h2>
      </div>
    </div>
  );
}

/* ---- the eligibility band — `section.section.ugdx-bg > .el-wrapper`: a row (column at <=767).
 * `.elig-cont` pr 56 (0 at <=479) holds two `.el-title-wt` / `.el-desc` pairs with two authored <br>s
 * between them; `.el-title-wt` is 24px/normal 700 pb 16 (the page's <style> sets `line-height: normal`;
 * 18px at <=767), `.el-desc` 16/24 (14/21 at <=767). `.appl-cont` 1px #ffffff4d left rule and pl 56 (a
 * 1px white top rule, 40 above, at <=767 — transparent at <=576) holding one `.application-points.mrgbt-32`:
 * the title over a full-width `img.about-image-atlas` (inline-block, super-aligned; 40px above at <=767
 * from the sheet, reset to 0 at <=576). */
export function StemEligibility({ data, block = 'eligibility' }) {
  const title = 'pb-4 text-2xl font-bold [line-height:normal] max-md:text-lg max-md:[line-height:normal]';
  return (
    <section data-block={block} className={`${SECTION} bg-[#011627] text-white`}>
      <div className={CONTAINER}>
        <div className="flex max-md:flex-col">
          <div className="flex-none pr-14 max-sm:pr-0">
            {data.groups.map((g, i) => (
              <div key={g.title}>
                {i > 0 && Array.from({ length: data.gapBreaks ?? 0 }, (unused, k) => <br key={k} />)}
                <div className={title}>{g.title}</div>
                <div className="max-md:text-[14px] max-md:leading-[1.5]">{withBreaks(g.text)}</div>
              </div>
            ))}
          </div>
          <div className="border-0 border-l border-solid border-white/30 pl-14 max-md:border-l-0 max-md:border-t max-md:border-white max-md:pl-0 max-md:pt-10 max-lp:border-t-transparent">
            <div className="mb-8">
              <div className={title}>{data.point.title}</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.point.image.src} srcSet={data.point.image.srcSet} sizes={data.point.image.sizes} alt={data.point.image.alt} loading="lazy" className="inline-block h-full w-full flex-none object-cover align-super max-md:mt-10 max-lp:mt-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- "Disclaimer:" — `div.section.py-0`: the h2 and a bare `h2.sub-heading` (Webflow's h2 margin
 * 20 0 10 applies), no vertical section padding */
export function StemDisclaimer({ data, block = 'disclaimer' }) {
  return (
    <div data-block={block} className="block overflow-hidden">
      <div className={CONTAINER}>
        <h2 className={H2_MRG16}>{data.heading}</h2>
        <div className={SUB_H2}>{withBreaks(data.text)}</div>
      </div>
    </div>
  );
}
