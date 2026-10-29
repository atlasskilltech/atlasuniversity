import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import ZoomSlider from '@/components/Life/ZoomSlider';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import PhotoMosaic from '@/components/ui/PhotoMosaic';
import { WeekStrip } from '../SummerSchool/WeekGrid';
import IconSection from '../About/IconSection';
import CardTypeE from '../CardTypeE';
import SliderCardD from '../SliderCardD';
import MotionCard from '../MotionCard';
import StoryPair from '../StoryPair';
import {
  CONTAINER, H2, H2_MB, SECTION, SUB, SUB_1, SUB_MRGBTM,
} from '../Home/ui';
import {
  BLACK_DESC, BLUE_DESC, BLUE_DESC_F18, BLUE_DESC_WRAP, PortCardF, SquareCardA,
  WHITE_DESC_WRAP, WHITE_DESC_WRAP_MB,
} from './ui';

/*
 * The sections of /schools/isdi/life@atlas-isdi, in the reference's order. Nine of
 * them open with an `.icon-heading`, which is the shared `About/IconSection`; the
 * wrappers inside it are this page's own.
 *
 * Measured on production at 1440 / 768 / 390 throughout.
 *
 *   .blue-wrapper.isdi-blue-5   #173a87, pb56 (40 at <=767) — IconSection's
 *                               `tone="blue"`
 *   .white-wrapper              no background — `tone="white"`
 *   .common-wrapper             padding-top 50 at EVERY width, from ISDI's
 *                               header.php (`.isdi-page .common-wrapper`), which
 *                               beats the sheet's 56 / 40
 */

/* ref .common-wrapper — `.isdi-page` pins it to 50px at every width */
const COMMON_WRAPPER = 'pt-[50px]';

/* ---- 3  Student Clubs --------------------------------------------------- */
export function Clubs({ data }) {
  return (
    <IconSection id="student-clubs" block="clubs" icon={data.icon.image.src}
      title={data.icon.title} tone="blue">
      <div className={CONTAINER}>
        <div className={COMMON_WRAPPER}>
          {/* ref h3.h3-tag.isdi — 32px/1.2, `.isdi` takes the weight from 500 to
              400, and the SIZE drops to 22 at <=767 (not 24). The 32px gap under
              it is the h3's own margin-bottom, which collapses out of the
              `.common-wrapper` — it is not padding on the lead. */}
          <h3 className="mb-8 mt-0 text-[32px] font-normal leading-[1.2] text-white max-md:text-[22px]">
            {data.heading}
          </h3>
        </div>
        {/* ref .blue-desc-text — authored bare here, not in a `.blue-desc-wrap` */}
        <div className={BLUE_DESC}>{withBreaks(data.lead)}</div>
        {/* ref .swiper.common-swiper-full */}
      </div>
      {/* ref .swiper.common-swiper-full — padding-top 56, and **20** at <=767,
          where the plain `.common-swiper` the page's four other carousels use
          drops to 40 instead */}
      <Carousel label={data.heading} autoplay={false} bullets="isdi-overlay"
        className="pt-14 max-md:pt-5">
        {data.cards.map((card, i) => (
          <SquareCardA key={`${i}-${card.title}`} card={card} />
        ))}
      </Carousel>
    </IconSection>
  );
}

/* ---- 4 & 13  the two motion bands --------------------------------------- */
export function MotionBand({ data, id, block }) {
  return (
    <IconSection
      id={id} block={block} icon={data.icon.image.src} title={data.icon.title} tone="white"
      /* ref .motion-card-wrapper — a SIBLING of `.white-wrapper`, not a child of
         it, so it goes through `after`. margin-top 56 (20 at <=767). */
      after={(
        <div className="mt-14 max-md:mt-5">
          <ZoomSlider label={data.icon.title}>
            {data.cards.map((card, i) => <MotionCard key={i} card={card} />)}
          </ZoomSlider>
        </div>
      )}
    >
      <div className={CONTAINER}>
        <div className={WHITE_DESC_WRAP_MB}>
          <div className={BLACK_DESC}>{withBreaks(data.lead)}</div>
        </div>
      </div>
    </IconSection>
  );
}

/* ---- 5  Intercollegiate events ------------------------------------------ */
export function Intercollegiate({ data }) {
  return (
    <IconSection id="intercollegiate-events" block="intercollegiate"
      icon={data.icon.image.src} title={data.icon.title} tone="blue">
      <div className={CONTAINER}>
        {/* ref .blue-desc-wrap > .blue-desc-text */}
        <div className={BLUE_DESC_WRAP}>
          <div className={BLUE_DESC}>{withBreaks(data.lead)}</div>
        </div>
        {/* ref .swiper.zoom-slider-lg.mrgtp — `.mrgtp` is margin-top 20 from 991 down */}
        <ZoomSliderLg label={data.icon.title} className="mt-14 max-lg:mt-5">
          {data.cards.map((card, i) => (
            /* `SliderCardD` names the two plates `name` / `role` (it was extracted
               from a people carousel); this block's are the event and the college,
               so the card's own fields are adapted here rather than renaming the
               shared contract under the two pages that already use it. */
            <SliderCardD
              key={`${i}-${card.title}`}
              slide={{ image: card.image, name: card.title, role: card.subtitle }}
            />
          ))}
        </ZoomSliderLg>
      </div>
    </IconSection>
  );
}

/* ---- 6  Sports ----------------------------------------------------------- */
export function Sports({ data }) {
  return (
    <IconSection id="sports" block="sports" icon={data.icon.image.src}
      title={data.icon.title} tone="none">
      <div className={CONTAINER}>
        {/* ref .white-desc-wrap (no `.mrgbtm` here) > .black-desc-text */}
        <div className={WHITE_DESC_WRAP}>
          <div className={BLACK_DESC}>{withBreaks(data.lead)}</div>
        </div>
      </div>
      <Carousel label={data.icon.title} autoplay={false} bullets="isdi"
        className="pt-14 max-md:pt-10">
        {data.cards.map((card, i) => (
          <PortCardF key={`${i}-${card.title}`} card={card} />
        ))}
      </Carousel>
    </IconSection>
  );
}

/* ---- 7  Student Council -------------------------------------------------- */
export function Council({ data }) {
  return (
    <IconSection id="student-council" block="council" icon={data.icon.image.src}
      title={data.icon.title} tone="blue">
      <div className={CONTAINER}>
        {/* ref .blue-desc-wrap > .blue-desc-text.f18 — 18px/1.8, not the usual 24/1.5 */}
        <div className={BLUE_DESC_WRAP}>
          <div className={BLUE_DESC_F18}>{withBreaks(data.lead)}</div>
        </div>
        {/* ref .center-image-full-wrap.mrgtp.isdi — margin-top 56 (40 at <=767)
            and a margin-bottom of 5px at every width */}
        <div className="relative mb-[5px] mt-14 overflow-hidden rounded-2xl max-md:mt-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image.src}
            srcSet={data.image.srcSet}
            sizes={data.image.sizes}
            alt={data.image.alt}
            loading="lazy"
            decoding="async"
            className="relative block w-full align-middle max-md:h-auto max-md:object-contain"
          />
        </div>
      </div>
    </IconSection>
  );
}

/* ---- 8 & 12  the two `.card-type-e` carousels ---------------------------- */
export function People({ data, block, headWrap = false }) {
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        {headWrap ? (
          /* ref .head-wrap.top > .tt-wrap — a column with a 16px gap and a
             16px bottom margin at <=767 */
          <div className="flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:justify-around max-md:gap-4">
            <div className="max-md:mb-5 max-md:mr-5">
              <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
              <div className={SUB}>{withBreaks(data.lead)}</div>
            </div>
          </div>
        ) : (
          <>
            <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
            <div className={SUB}>{withBreaks(data.lead)}</div>
          </>
        )}
      </div>
      <Carousel label={data.heading} autoplay={false} bullets="isdi"
        className="pt-14 max-md:pt-10">
        {data.people.map((person, i) => (
          <CardTypeE key={`${i}-${person.name}`} person={person} />
        ))}
      </Carousel>
    </div>
  );
}

/*
 * ref `.port-card-el-txt-wrap.<tone>` — the plate under each card.
 *   base         #193e90
 *   .sdi-bg-1    the base colour under `faq-vector.png`, pinned right-centre
 *                (the class really is spelt without its leading `i` upstream)
 *   .isdi-2      #ec1376, and `.isdi-bg-2` adds `Vector.png` at 50% 100%
 * Both vectors are files earlier ISDI pages already downloaded.
 */
const EL_TONE = {
  '1': "bg-[#193e90] bg-[url('/assets/images/schools/isdi/about/search/faq-vector.png')] bg-[position:100%] bg-no-repeat",
  '2': "bg-[#ec1376] bg-[url('/assets/images/schools/isdi/programs/pss/summer-school/highlights/vector.png')] bg-[position:50%_100%] bg-no-repeat",
};

/* ---- 9  By students, for students ---------------------------------------- */
export function ByStudents({ data }) {
  return (
    <div data-block="by-students" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={SUB}>{withBreaks(data.lead)}</div>
        {/* ref .coll-fest-cards-wrap — gap 24, `align-items: stretch`, and its
            56px is PADDING-top (40 at <=767), where it turns into a column */}
        <div className="flex items-stretch gap-6 pt-14 max-md:flex-col max-md:pt-10">
          {data.cards.map((card, i) => (
            /* ref .port-card-el-wrap.isdi — a declared 398 x 622 flex column
               (`flex: 0 auto`), going fluid and content-height at <=767 */
            <div key={`${i}-${card.title}`}
              className="relative flex h-[622px] w-[398px] flex-initial flex-col items-stretch justify-start overflow-hidden rounded-2xl text-white max-md:h-auto max-md:w-full">
              {/* ref img.port-card-el-image — it declares `overflow: visible`,
                  where Chrome's UA sheet gives a replaced element `clip` */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image.src}
                alt={card.image.alt}
                loading="lazy"
                decoding="async"
                className="mx-auto block h-auto w-full overflow-visible object-cover align-middle"
              />
              {/* ref .port-card-el-txt-wrap.<tone> — padding 22/32, and `flex: 1`
                  is what makes the plate fill the rest of the fixed card. Its
                  `flex-flow`/`justify-content`/`align-items` are inert: the same
                  rule ends in `display: block`. */}
              <div className={cx('relative inset-0 block h-auto w-full flex-1 px-8 py-[22px]',
                EL_TONE[card.tone] ?? EL_TONE['1'])}>
                {/* ref .port-card-el-text.isdi — 32px/1.2, and `.isdi` takes the
                    weight to 300 and the colour from mint to white */}
                {/* a NAMED size carries a line-height and cancels an arbitrary one — the
                    project pins its scale to 1.5, so `max-md:text-2xl` would
                    replace the 1.2 and cost 7.2px a line */}
                <div className="text-[32px] font-light leading-[1.2] text-white max-md:text-2xl max-md:leading-[1.2]">
                  {withBreaks(card.title)}
                </div>
                {/* ref .port-card-el-desc — weight 400 (no `.isdi` here), 18px/1.6
                    with its own 14px of top padding; `max-md:text-base` would set
                    1.5 as well, so the ratio is restated at the breakpoint */}
                <div className="pt-3.5 text-[18px] font-normal leading-[1.6] text-white max-md:text-base max-md:leading-[1.6]">
                  {withBreaks(card.text)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- 10  Student welfare ------------------------------------------------- */
export function Welfare({ data }) {
  return (
    <IconSection id="student-welfare" block="welfare" icon={data.icon.image.src}
      title={data.icon.title} tone="blue">
      <div className={CONTAINER}>
        {/* ref .blue-desc-wrap > .blue-desc-text */}
        <div className={BLUE_DESC_WRAP}>
          <div className={BLUE_DESC}>{withBreaks(data.lead)}</div>
        </div>
        {/* ref .zoom-slider-wrap > .swiper.zoom-slider-lg */}
        <div className="pt-14">
          <ZoomSliderLg label={data.icon.title}>
            {data.cards.map((card, i) => (
              /* ref .slider-card-wrapper — 800 x 475 (fluid at <=767), `flex:
                 none`, and a 24px radius rather than the page's usual 16 */
              <div key={`${i}-${card.title}`}
                className="relative h-[475px] w-[800px] flex-none overflow-hidden rounded-3xl max-md:w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image.src}
                  srcSet={card.image.srcSet}
                  sizes={card.image.sizes}
                  alt={card.image.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full object-cover align-middle"
                />
                {/* ref .slide-content-a — the scrim covers the WHOLE card
                    (`inset: 0`), not just its foot, and it is what the card's two
                    lines sit over */}
                <div className="absolute inset-0 z-[1] flex flex-col items-start justify-end bg-[linear-gradient(#00263700,#040404cc)] pb-[50px] pl-10 max-md:px-5 max-md:pb-5">
                  {/* ref .slide-title-a — 32px/0.5 500 over a 12px #ec1376 rule,
                      and the class declares no margin of its own */}
                  <div className="border-0 border-b-[12px] border-solid border-[#ec1376] pb-0 text-[32px] font-medium leading-[0.5] text-white max-md:text-2xl max-md:leading-[0.5]">
                    {withBreaks(card.title)}
                  </div>
                  {/* ref .slide-description-a */}
                  <div className="max-w-[70%] pt-4 text-[18px] font-normal leading-[1.5] text-white max-md:pt-2 max-md:text-sm">
                    {withBreaks(card.text)}
                  </div>
                </div>
              </div>
            ))}
          </ZoomSliderLg>
        </div>
      </div>
    </IconSection>
  );
}

/* ---- 14  Student housing ------------------------------------------------- */
export function Housing({ data, id = 'student-housing', block = 'housing' }) {
  return (
    <IconSection id={id} block={block} icon={data.icon.image.src}
      title={data.icon.title} tone="blue">
      <div className={CONTAINER}>
        {/* ref the FIRST `.common-wrapper`, which the reference authors EMPTY — it
            is a 50px-top-padding box and still moves what follows */}
        <div className={COMMON_WRAPPER} />
        <div className={BLUE_DESC}>{withBreaks(data.lead)}</div>
        {/* ref .center-image-full-wrap.mrgtp.isdi > .w-embed-youtubevideo — the
            embed paints Webflow's own `youtube-placeholder.svg` (cover, centred)
            behind the iframe while it loads, as the About page's does */}
        <div className="relative mb-[5px] mt-14 overflow-hidden rounded-2xl max-md:mt-10">
          <div
            className="relative w-full bg-[url('/assets/images/schools/isdi/about/story/youtube-placeholder.svg')] bg-cover bg-center"
            style={{ paddingTop: data.video.pad }}
          >
            <iframe
              src={data.video.src}
              title={data.video.title}
              loading="lazy"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        </div>
        <div className={COMMON_WRAPPER}>
          {/* ref h3.h3-tag-mint.isdi — the base class is the mint
              `--primary-color-isme`, and `.isdi` recolours it to WHITE. Weight
              stays 500, the size drops to 22 at <=767, and the 32px below it is
              the heading's own margin. */}
          <h3 className="mb-8 mt-0 text-[32px] font-medium leading-[1.2] text-white max-md:text-[22px]">
            {data.heading}
          </h3>
          {/* ref .bl-card-wrapper-isme.isdi — the eight-cell mosaic, rounded 16px
              on all four corners by ISDI's generic `.isdi` rather than the
              `32px 0` the `.atlas` skin draws */}
          <PhotoMosaic cells={data.mosaic} rounded="wrapper-16" />
        </div>
      </div>
    </IconSection>
  );
}

/* ---- 18  Our moto -------------------------------------------------------- */
export function Moto({ data }) {
  return (
    <IconSection id="our-moto" block="moto" icon={data.icon.image.src}
      title={data.icon.title} tone="none">
      <div className={COMMON_WRAPPER}>
        <div className={CONTAINER}>
          {/* ref .sub-heading-1 — the BARE class here, with no `.mrgbtm`,
              so it carries no bottom padding */}
          <div className={SUB_1}>{withBreaks(data.lead)}</div>
          {/* ref .center-image-full-wrap.mrgtp — this wrapper has NO `.isdi` (so
              `border-radius: 0`), but the `<img>` inside it is
              `.center-image-full.isdi`, which is where the 16px corners live. */}
          <div className="relative mb-[5px] mt-14 overflow-hidden max-md:mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image.src}
              srcSet={data.image.srcSet}
              sizes={data.image.sizes}
              alt={data.image.alt}
              loading="lazy"
              decoding="async"
              className="relative block w-full overflow-hidden rounded-2xl max-md:h-auto max-md:object-contain"
            />
          </div>
        </div>
      </div>
    </IconSection>
  );
}

/* ---- 17  A week in the life of an ISDI-ian ------------------------------- */
export function Week({ data }) {
  return (
    <IconSection id="campus-week" block="week" icon={data.icon.image.src}
      title={data.icon.title} tone="none">
      <div className={COMMON_WRAPPER}>
        <div className={CONTAINER}>
          {/* ref .sub-heading.mrgbtm */}
          <div className={SUB_MRGBTM}>{withBreaks(data.sub)}</div>
          {/* ref .main-week-wrapper — the shared strip out of
              `SummerSchool/WeekGrid`, which is the same grid under different
              heading furniture */}
          <WeekStrip days={data.days} />
        </div>
      </div>
    </IconSection>
  );
}
