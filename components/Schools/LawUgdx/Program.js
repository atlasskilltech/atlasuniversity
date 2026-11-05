import { CONTAINER, H2, SECTION, SUB_H2, SUB_H2_MRGBTM32, SUB_INNER } from '@/components/Home/SectionHead';
import Carousel from '@/components/Carousel/Carousel';
import ButtonRegular from '@/components/ui/ButtonRegular';
import PrimaryButton from '@/components/ui/PrimaryButton';
import TestimonialCard from '@/components/ui/TestimonialCard';
import RichText from '@/components/Statutory/RichText';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';
import { H2_MB, H2_MRG16, H2_MRG32 } from './Sections';

/*
 * Programme-page sections shared by the School of Law's BBA LL.B. page and the uGDX B.Tech pages
 * (reference/law/program-page-law.php, reference/ugdx/undergraduate/*.php). Values read off the pages'
 * own sheets and measured on production at 1440 / 991 / 767 / 479 / 390. Each school's colours travel
 * as a `tone`, so the markup is shared and no two utilities of one kind meet in a class list.
 */
const TONES = {
  law: {
    accent: 'text-[#d7a579]', panel: 'bg-[#271f30]', deep: 'bg-[#1a1222]', num: 'bg-[#d7a579] text-[#271f30]',
    stepA: 'bg-[#322a3b]', stepB: 'bg-[#150c1e]', band: 'bg-[#271f30]', elTitle: 'text-[#d7a579]',
  },
  ugdx: {
    accent: 'text-white', panel: 'bg-[#011627]', deep: 'bg-[#011627]', num: 'bg-[#eb1f3c] text-white',
    stepA: 'bg-[#011627]', stepB: 'bg-[#eb1f3c]', band: 'bg-[#011627]', elTitle: 'text-white',
  },
};

/* ---- `.about-story-wrapper` under an `h2.h2-tag` ---------------------------------------------
 * a stretch row, gap 32 (no gap and wrapping at <=767): `.abt-cont` 30% (18px, 16 at <=767) holding
 * `.abt-text.mrgbtm` (mb 56) and the CTA in `.text-centet` (a flex row, so the pill sits left);
 * `.about-image-wrap-atlas` calc(70% - 40px), radius 32px 0, clipped (100% at <=767), its photograph
 * `.ht90` — 100% wide, 90% tall, cover. */
/* `bare` — the container alone, for the uGDX homepage, where the NASA story is a second `.container`
   inside the same outer `section.section` as "Why Choose ATLAS uGDX?" */
export function StoryPair({ data, block = 'story', bare = false }) {
  const Shell = bare ? 'div' : 'section';
  return (
    <Shell data-block={bare ? undefined : block} className={bare ? undefined : SECTION}>
      <div className={CONTAINER}>
        {/* `bare` is uGDX's "Making Our Mark at NASA": `h2.mrg32` (32 at every width), no button, so the
            text keeps no bottom margin and the photograph fills the stretched row from 768 up */}
        <h2 className={bare ? H2_MRG32 : H2_MB}>{withBreaks(data.heading)}</h2>
        <div className="flex items-stretch justify-between gap-8 max-md:flex-wrap max-md:gap-0 max-md:text-lg">
          <div className="w-[30%] flex-none text-left text-lg max-md:w-full max-md:text-base">
            <div className={bare && !data.button ? undefined : 'mb-14'}>
              <RichText runs={data.text} />
            </div>
            {data.button && (
              <div className="flex text-center">
                {data.button.primary ? (
                  <PrimaryButton href={data.button.href} variant={data.button.variant}>{data.button.label}</PrimaryButton>
                ) : (
                  <ButtonRegular href={data.button.href} variant={data.button.variant}>{data.button.label}</ButtonRegular>
                )}
              </div>
            )}
          </div>
          <div className="relative w-[calc(70%-40px)] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.image.src} srcSet={data.image.srcSet} sizes={data.image.sizes} alt="" loading="lazy" className={cx('inline-block w-full object-cover align-super max-md:mt-10', bare ? 'h-full max-md:h-[90%]' : 'h-[90%]', ' max-md:rounded-tl-[32px] max-md:rounded-br-[32px]')} />
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ---- "5 ways it gives you the edge" — `.card-ways` ----------------------------------------------
 * a stretch row, min-height 480, alternate cards `row-reverse` (`card.flip`); from 991 down
 * `wrap-reverse` with both halves full width, so the photograph stacks above its text. `.cw-cont-wrap`
 * 50%, padding 64 96 0 (48 48 32 at <=767), the tone's panel; `.h3-cw` 32px/1.2 500, mb 24 (24px at
 * <=767), the tone's accent; `.cw-text` 18px (16 at <=767) white; `.num-box` 56 x 56 (40 at <=767),
 * absolute top-left, 24px/1 (14px 500 at <=767). The `.cw-image` is cover, full height of the row.
 * The cards' `.card-way-code` script writes an empty `data-cardw-bg` as `url()`, which paints nothing. */
export function FiveWays({ data, tone = 'law', block = 'ways' }) {
  const t = TONES[tone];
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2_MRG32}>{withBreaks(data.heading)}</h2>
        {data.cards.map((card) => (
          <div key={card.num} className={cx('flex min-h-[480px] items-stretch justify-start max-lg:flex-wrap-reverse', card.flip && 'flex-row-reverse')}>
            <div className={cx('relative w-1/2 flex-[0_1_auto] px-24 pt-16 max-lg:w-full max-md:px-12 max-md:pb-8 max-md:pt-12', t.panel)}>
              <h3 className={cx('mb-6 mt-0 text-[32px] font-medium leading-[1.2] max-md:text-2xl max-md:leading-[1.2]', t.accent)}>{withBreaks(card.title)}</h3>
              <div className="text-lg text-white max-md:text-base">{withBreaks(card.text)}</div>
              <div className={cx('absolute left-0 top-0 flex h-14 w-14 items-center justify-center text-2xl font-normal leading-none max-md:h-10 max-md:w-10 max-md:text-[14px] max-md:font-medium max-md:leading-none', t.num)}>
                {card.num}
              </div>
            </div>
            <div className="block w-1/2 flex-[0_1_auto] max-lg:w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt="" loading="lazy" className="block h-full w-full object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- "What it's like being at ATLAS" — `.head-wrap.mrgbtm32` over `.swiper.common-swiper-full.mrgtp0`
 * of `ui/TestimonialCard`s in the school's tone. The heading row is a space-between, bottom-aligned
 * flex (a stretched column at <=767), mb 32; `.top-btn` holds a `.button-regular`. */
export function Voices({ data, tone = 'law', block = 'voices' }) {
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        {/* a bare `h2.h2-tag` (mb 56 / 32) when the section authors no lead or button — the uGDX homepage's
            "Perspectives That Define Us" */}
        {!data.sub && !data.button ? (
          <h2 className={H2_MB}>{withBreaks(data.heading)}</h2>
        ) : (
        <div className="mb-8 flex items-end justify-between max-md:flex-col max-md:items-stretch max-md:justify-start">
          <div className="flex-[0_1_auto] max-md:mb-5 max-sm:mr-5">
            <h2 className={H2_MRG16}>{withBreaks(data.heading)}</h2>
            <div className={SUB_INNER}>{withBreaks(data.sub)}</div>
          </div>
          {data.button && (
            <div className="self-start">
              <ButtonRegular href={data.button.href} variant={data.button.variant}>{data.button.label}</ButtonRegular>
            </div>
          )}
        </div>
        )}
      </div>
      {/* `.common-swiper-full` places its dots absolutely, 30px under the slider, so they add no height */}
      <Carousel bullets="inline-overlay">
        {data.cards.map((card, i) => (
          <TestimonialCard key={`${i}-${card.stname}`} card={card} tone={tone} />
        ))}
      </Carousel>
    </div>
  );
}

/* ---- `.career-sup-card.ugdx-rd` ----------------------------------------------------------------
 * 398 x 622 (360 wide, content height at <=767), radius 32px 0, clipped; either a text head
 * (`.career-sup-content.law-bg`: 340 tall, 240 at <=767, the tone's deep panel, padding 42 24 0 —
 * `.cr-sup-tx-1` 32px/1, `-2` 62px/1 500 with 16px above and below, both in the accent; `-3` 16px/1.5
 * white) or a photograph (`.career-sup-img`, 340 / 240, cover at 101%). Below either, the
 * `.css-content-wrapper` (flex 1, padding 20|32 35 8, 20 at <=767): a 32px/1.3 500 title (24px at
 * <=767) in the accent and an 18px copy, line-height 1.4 on the laddering cards. */
/* uGDX programme pages name the caption panel per card: `.ugdx-bg-orange` #eb1f3c, `.ugdx-bg-black` #011627 */
const WASH = { 'ugdx-bg-orange': 'bg-[#eb1f3c]', 'ugdx-bg-black': 'bg-[#011627]' };

export function RdCard({ card, tone = 'law' }) {
  const t = TONES[tone];
  return (
    <div className="flex h-[622px] w-[398px] flex-[0_1_auto] flex-col items-stretch overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:h-auto max-md:w-[360px]">
      {card.year ? (
        <div className={cx('h-[340px] px-6 pt-[42px] text-white max-md:h-[240px]', t.deep)}>
          <div className={cx('text-[32px] leading-none', t.accent)}>{card.year}</div>
          <div className={cx('py-4 text-[62px] font-medium leading-none', t.accent)}>{card.stage}</div>
          <div className="text-base font-normal leading-[1.5] text-white">{withBreaks(card.points)}</div>
        </div>
      ) : (
        <div className="h-[340px] max-md:h-[240px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt="" loading="lazy" className="block h-[101%] w-full max-w-none object-cover max-md:object-[50%_76%]" />
        </div>
      )}
      <div className={cx('flex-1 px-[35px] pb-2 max-md:pb-5', card.year ? 'pt-5' : 'pt-8', WASH[card.wash] ?? t.panel)}>
        <div className={cx('text-[32px] font-medium leading-[1.3] max-md:text-2xl max-md:leading-[1.3]', t.accent)}>{withBreaks(card.title)}</div>
        <div className={cx('mt-4 text-lg text-white', card.year && 'leading-[1.4]')}>{withBreaks(card.text)}</div>
      </div>
    </div>
  );
}

/* `pad` — `.swiper.common-swiper` without `.mrgtp0` keeps its 56px of top padding (40 at <=767): the uGDX
   programme pages' "The ATLAS uGDX B.Tech Experience" */
export function RdCarousel({ data, tone = 'law', block, pad = false }) {
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        {data.sub ? (
          <>
            <h2 className={H2_MRG16}>{withBreaks(data.heading)}</h2>
            {/* six of the eight uGDX programme pages author a bare `h2.sub-heading` here (weight 300, no
                bottom padding); `.mrgbtm32` is weight 400 with 32 / 20 / 16 of padding — `data.subPlain` */}
            <div className={data.subPlain ? SUB_H2 : SUB_H2_MRGBTM32}>{withBreaks(data.sub)}</div>
          </>
        ) : (
          <h2 className={H2_MB}>{withBreaks(data.heading)}</h2>
        )}
      </div>
      <div className={pad ? 'pt-14 max-md:pt-10' : undefined}>
        <Carousel bullets="inline">
          {data.cards.map((card, i) => (
            <RdCard key={`${i}-${card.title}`} card={card} tone={tone} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

/* ---- "Program Outcomes" on the uGDX programme pages — `h2.h2-tag.mrgbtm0` over a `.career-sup-wrapper`
 * (centred wrapping row, gap 22, padding-top 56 / 40 at <=767) of the same `.career-sup-card.ugdx-rd`. */
export function RdGrid({ data, tone = 'ugdx', block = 'outcomes' }) {
  return (
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2}>{withBreaks(data.heading)}</h2>
        <div className="flex flex-wrap items-start justify-center gap-[22px] pt-14 max-md:pt-10">
          {data.cards.map((card, i) => (
            <RdCard key={`${i}-${card.title}`} card={card} tone={tone} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- "Your guide to joining …" — `.guide-wrapper-main` ------------------------------------------
 * radius 32px 0, clipped, holding rows of three `.gd-steps` (`.guide-steps-wrapper-law`, a flex row;
 * at <=767 a 32px-gap column, 40px down, over a 16px `.mob-vert-line` at 49.5% behind the cards).
 * `.gd-steps` flex 1 1 0, 394 tall, padding 32, 24px white, the tone's two step colours; the step
 * image sits absolute bottom-right behind `.gd-cont-wrap` (z 1, a start-aligned column):
 * `.tb-num-mt` 600 in the accent, `.tb-title-mt` 600/1.5 pb 16 (18px 300 at <=767), `.tb-desc-mt`
 * 18px, mb 24, and an optional `.button-regular`. */
/* `extraspace` — the admissions pages' `section.section.extraspace#how-to-apply`: padding-top 120
   (40 at <=767) and a bare `h2.h2-tag.mrg32`, where the programme pages wrap the heading in a
   `.head-wrap.top > .tt-wrap` */
export function GuideSteps({ data, tone = 'law', block = 'guide', extraspace = false, id }) {
  const t = TONES[tone];
  return (
    <section data-block={block} id={id} className={extraspace ? 'block overflow-hidden pb-[60px] pt-[120px] max-md:pb-10 max-md:pt-10' : SECTION}>
      <div className={CONTAINER}>
        {extraspace ? (
          <h2 className={H2_MRG32}>{withBreaks(data.heading)}</h2>
        ) : (
          <div className="flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:items-stretch max-sm:justify-around">
            <div className="flex-[0_1_auto] max-md:mb-5 max-sm:mr-5">
              <h2 className={H2_MRG32}>{withBreaks(data.heading)}</h2>
            </div>
          </div>
        )}
        <div className="overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
          {data.rows.map((row, r) => (
            <div key={r} className="relative flex overflow-hidden max-md:mt-10 max-md:flex-col max-md:gap-8">
              {row.map((step) => (
                <div key={step.num} className={cx('relative h-[394px] flex-[1_1_0] overflow-hidden p-8 text-2xl text-white max-md:flex-none', step.alt ? t.stepB : t.stepA)}>
                  <div className="relative z-[1] flex flex-col items-start">
                    <div className={cx('font-semibold', t.accent)}>{step.num}</div>
                    <div className="pb-4 font-semibold leading-[1.5] max-md:text-lg max-md:font-light">{withBreaks(step.title)}</div>
                    <div className="mb-6 text-lg">{withBreaks(step.text)}</div>
                    {step.button && (
                      <ButtonRegular href={step.button.href} newTab external variant={step.button.variant}>{step.button.label}</ButtonRegular>
                    )}
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={step.image} alt="" loading="lazy" className="absolute bottom-0 right-0 z-0 m-0 block" />
                </div>
              ))}
              <div className="absolute left-[49.5%] top-0 z-[-1] hidden h-full w-4 bg-[#193e90] max-md:block" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Eligibility / fees band — `section.section.law-bg > .container > .el-wrapper` -------------
 * the band is the tone's panel with white text. `.el-wrapper` a flex row (a column at <=767):
 * `.elig-cont` flex none, padding-right 56 (0 at <=479) — the reference nests a second `.elig-cont`
 * inside the first for the first two groups only, so the IB groups sit outside it; `.appl-cont` has a
 * 1px #ffffff4d left rule and 56px of left padding (at <=767 a 1px white top rule, 40px above, none at
 * the side). `.el-title-law` 24px/1 700 pb 16 (18px at <=767) in the accent; `.elig-point-wrap` mb 20;
 * `.el-sub-title` 500 (14px at <=767) wrapping a <strong>; `.list` a 5px-gap column, pt 12 pr 56
 * (px 20 at <=479), disc markers from 1440 only, each `.ugdx-list` max 300 wide (500 from 1440);
 * `.application-points.mrgbt-32` mb 32; `.el-desc` 14px at <=767; `.el-btn-wrap` 16px-gap row, pt 16
 * (a 10px-gap column at <=479) of `.button-regular` outline-square pills. */
function ElList({ list }) {
  const L = list.ordered ? 'ol' : 'ul';
  return (
    <L className="mb-2.5 mt-0 flex list-none flex-col items-start gap-[5px] pb-0 pl-10 pr-14 pt-3 2xl:list-disc max-sm:px-5">
      {list.items.map((item, i) => (
        <li key={i} className={cx('w-auto max-w-[300px] 2xl:w-[500px]', list.ordered ? '2xl:list-decimal' : '2xl:list-disc')}>{withBreaks(item)}</li>
      ))}
    </L>
  );
}

export function EligibilityFees({ data, tone = 'law', block = 'eligibility' }) {
  const t = TONES[tone];
  const groups = (gs) => gs.map((g, i) => (
    <div key={i} className={g.wrapped ? 'mb-5' : ''}>
      <div className="font-medium max-md:text-[14px]"><strong className="font-bold">{withBreaks(g.title)}</strong></div>
      {g.list && <ElList list={g.list} />}
    </div>
  ));
  return (
    <section data-block={block} className={cx(SECTION, 'text-white', t.band)}>
      <div className={CONTAINER}>
        <div className="flex max-md:flex-col">
          {/* the Law reference nests a second `.elig-cont` (each pr 56); uGDX's `.el-desc` form has one */}
          <div className={cx('flex-none', !data.desc && 'pr-14 max-sm:pr-0')}>
            <div className="flex-none pr-14 max-sm:pr-0">
              <div className={cx('pb-4 text-2xl font-bold leading-none max-md:text-lg max-md:leading-none', t.elTitle)}>{data.title}</div>
              {/* three uGDX pages author an EMPTY `ol.list` between the title and the copy — still pt 12 + mb 10 */}
              {data.emptyList && <ElList list={{ ordered: true, items: [] }} />}
              {data.desc ? (
                /* uGDX: one `.el-desc` (14px at <=767) of <strong> labels and <br>s rather than grouped lists */
                <div className="max-md:text-[14px]"><RichText runs={data.desc} /></div>
              ) : groups(data.groups)}
            </div>
            {data.outerGroups && groups(data.outerGroups)}
          </div>
          <div className="border-0 border-l border-solid border-white/30 pl-14 max-md:border-l-0 max-md:border-t max-md:border-white max-md:pl-0 max-md:pt-10">
            {data.points.map((pt, i) => (
              /* `.mrgbt-32` (mb 32) sits on every point but the last — except on the uGDX summer school,
                 whose only point carries it too (`pt.mrgbt32`) */
              <div key={i} className={i < data.points.length - 1 || pt.mrgbt32 ? 'mb-8' : ''}>
                <div className={cx('pb-4 text-2xl font-bold leading-none max-md:text-lg max-md:leading-none', t.elTitle)}>{pt.title}</div>
                <div className="max-md:text-[14px]">{withBreaks(pt.text)}</div>
                {pt.buttons && (
                  <div className="flex items-start gap-4 pt-4 max-sm:flex-col max-sm:gap-2.5">
                    {pt.buttons.map((b) => (
                      <ButtonRegular key={b.label} href={b.href} newTab={b.newTab} external={b.external} variant="isme-outline-square" labelSize={b.labelSize}>{b.label}</ButtonRegular>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
