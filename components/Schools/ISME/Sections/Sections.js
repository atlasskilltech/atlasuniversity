import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import ZoomSlider from '@/components/Life/ZoomSlider';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import IconSection from '@/components/Schools/ISDI/About/IconSection';
import PhotoGallery from '@/components/Schools/ISDI/PhotoGallery';
import { CONTAINER, SUB_INNER, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';
import Runs from '@/components/Schools/ISME/Bba/Runs';
import { Card as CareerCard } from '@/components/Schools/ISME/Bba/Execution';
import ZoneCard from '@/components/Schools/ISDI/ZoneCard';
import { H2, SECTION } from '@/components/Home/SectionHead';
import { StoryX } from './Pathway';
import { LogoTabs, TabPanes, YearSwipers } from './IndustryTabs';
import AdvisorCard from '@/components/ui/AdvisorCard';
import CardTypeF from '@/components/ui/CardTypeF';
import PlacementCard from '@/components/ui/PlacementCard';
import SpeakerSlideCard from '@/components/ui/SpeakerSlideCard';
import PortCardH from '@/components/ui/PortCardH';
import GridGallery from '@/components/ui/GridGallery';
import CareerSupportCard, { CAREER_CARD_ROW } from '@/components/ui/CareerSupportCard';
import ButtonRegular from '@/components/ui/ButtonRegular';
import TransferCard from '@/components/Schools/ISDI/TransferCard';
import PhotoMosaic from '@/components/ui/PhotoMosaic';
import { SHAPING_WRAPPER } from '@/components/ui/ContentCardB';
import PortCardJ from '@/components/Schools/ISDI/ParentsCorner/PortCardJ';
import MotionCard from '@/components/Schools/ISDI/MotionCard';
import { SquareCardA, PortCardF } from '@/components/Schools/ISDI/Life/ui';
import { WeekStrip } from '@/components/Schools/ISDI/SummerSchool/WeekGrid';
import ProgramCard from '@/components/Schools/ISME/ProgramCard';
import MarqueeTrack from '@/components/Schools/ISDI/Home/MarqueeTrack';
import PrimaryButton from '@/components/ui/PrimaryButton';
import CardTypeE from '@/components/Schools/ISDI/CardTypeE';
import { MobileIcoButton } from '@/components/Schools/ISME/Bba/Guide';
import NpfPopupButton from '@/components/Schools/ISME/NpfPopupButton';
import CardA from '@/components/Schools/ISDI/CardA';
import { LeaderRow } from '@/components/Schools/ISDI/About/Leadership';
import SmartLink from '@/components/SmartLink';
import SecondaryButton from '@/components/ui/SecondaryButton';
import TertiaryTabs from '@/components/ui/TertiaryTabs';
import LogoGrid from '@/components/ui/LogoGrid';
import PatentCard from '@/components/ui/PatentCard';
import IsmeStats from './Stats';
import MinorCard from '@/components/Schools/ISDI/MinorCard';
import InViewVideo from '@/components/Schools/ISDI/Home/InViewVideo';
import { PortCardI } from '@/components/Schools/ISDI/Advantage/ui';
import { ShapingCard } from '@/components/Schools/ISDI/About/ShapingViksitBharat';
import { PaperCard } from '@/components/Success/ResearchPapers';
import HeadWrap from '@/components/Schools/ISME/HeadWrap';
import LogoStrip from '@/components/Schools/ISDI/LogoStrip';
import PhotoColumns from '@/components/ui/PhotoColumns';

/**
 * The ISME one-off pages' banded sections — `section.section > (.icon-heading, .blue-wrapper |
 * .white-wrapper | .container | .white-wrapper > div > .blue-wrapper)` — rendered from the data the
 * page extractor took out of each page's production markup (lib/schools/isme/pages/*.json).
 *
 * The band is ISDI's `About/IconSection` on its `isme` skin (#011136 plate and wrapper, 500 Manrope
 * title, the ISME 60/40 section rhythm). Each item is drawn with the rules the ISME sheet gives it:
 *
 *   .blue-desc-wrap(.mrgbtm)   flex, pt56 (40 at <=767), pb42 with .mrgbtm; a column (gap 8) at <=479
 *     .blue-desc-text          24px (18 at <=767), flex 1
 *   .white-desc-wrap(.mrgbtm32)  pt56 (20 + a 10px-gap column at <=767), mb32 with .mrgbtm32
 *     .black-desc-text         24px black (18 at <=767)
 *   .sub-heading(.mrgbtm32)    the shared lead; .mrgbtm32 is pb32 400 (pb20 at <=767, 16 at <=479)
 *   .common-wrapper            pt56 (40 at <=767)
 *   .swiper.zoom-slider(.mrg56)  the 0.8 / 0.88 / 1 zoom carousel of `.graduate-card`s; mt56 / 40
 *     .graduate-card           340 x 480 r24, photo cover; caption plate 75% wide, mint, #072058
 *                              18px/35px 700 pl12, 32px above the bottom (`.gd-text-wrap`)
 *   .swiper.zoom-slider-lg     the 0.6 / 0.65 / 1 carousel of `.slider-card-d` (800 x 478, 100% at
 *                              <=767): mint title 18px/1 600 p10/18 on #072058-text, then a #072058
 *                              14px/1.2 500 white line, min-width 350, 32px above the bottom
 *   .swiper.common-swiper-full `.slider-card-c-sm` 620 x 360 (100% at <=767), the mint title plate
 *                              44px above the bottom
 *   .swiper.common-swiper      `.port-card-m-wrap` 295 x 480: #072058 panel p24 over the photo, name
 *                              24px/1.2 600 mint, role 14px/1.4 white under a 0.5px #e8e8e8 rule (mt10
 *                              pt10), a #072058 triangle at -20 / 30
 *   .center-image-full-wrap.mrgtp  mt56 (40 at <=767) mb5, clipped; the YouTube embed sized by its
 *                              own `padding-top` ratio
 */

const COMMON = 'pt-14 max-md:pt-10';
/* `.common-wrapper-lg` — pt120 (80 at <=767) */
const COMMON_LG = 'pt-[120px] max-md:pt-20';

function GraduateCard({ card }) {
  return (
    /* ref .graduate-card */
    <div className="relative h-[480px] w-[340px] overflow-hidden rounded-3xl leading-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt} loading="lazy" decoding="async" className="block h-full w-full max-w-full object-cover" />
      {(card.caption || card.sub) && (
        /* ref .gd-text-wrap > .gd-card-text (+ .gd-card-sub-text: 85% #072058, white 14px/1.5 300,
           py10 pl12). An authored-empty caption is a zero-height box, so it is skipped. */
        <div className="absolute inset-x-0 bottom-0 flex h-[70%] flex-col items-start justify-end py-8">
          {card.caption && <div className="w-3/4 bg-atlas-mint pl-3 text-[18px] font-bold leading-[35px] text-[#072058]">{withBreaks(card.caption)}</div>}
          {card.sub && <div className="w-[85%] bg-[#072058] py-2.5 pl-3 text-[14px] font-light leading-[1.5] text-white">{withBreaks(card.sub)}</div>}
        </div>
      )}
    </div>
  );
}

function SliderCardD({ card }) {
  return (
    /* ref .slider-card-d */
    <div className="relative block h-[478px] w-[800px] max-w-full overflow-hidden max-md:w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt} loading="lazy" decoding="async" className="block h-full w-full max-w-full object-cover" />
      {(card.title || card.sub) && (
        /* ref .slider-content-d */
        <div className="absolute bottom-0 left-0 z-[1] flex flex-col items-start justify-start pb-8">
          {card.title && <div className="block flex-[0_1_auto] bg-atlas-mint px-[18px] py-2.5 text-[18px] font-semibold leading-none text-[#072058]">{withBreaks(card.title)}</div>}
          {card.sub && <div className="block min-w-[350px] flex-[0_1_auto] bg-[#072058] px-[18px] py-2.5 text-[14px] font-medium leading-[1.2] text-white">{withBreaks(card.sub)}</div>}
        </div>
      )}
    </div>
  );
}

function SliderCardB({ card }) {
  return (
    /* ref .slider-card-b — 800 x 478 (100% at <=767); the caption sits over a #00263700 -> #040404bf
       wash, pb50 pl40: title 44px/1 500 white (34 at <=767), desc mint 32px pt10 (22 at <=767) */
    <div className="relative block h-[478px] w-[800px] max-w-full overflow-hidden max-md:w-full">
      <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col items-start justify-end bg-[linear-gradient(rgba(0,38,55,0),rgba(4,4,4,0.75))] pb-[50px] pl-10">
        {card.title && <div className="text-[44px] font-medium leading-none text-white max-md:text-[34px]">{withBreaks(card.title)}</div>}
        {card.sub && <div className="pt-2.5 text-[32px] font-normal text-atlas-mint max-md:text-[22px]">{withBreaks(card.sub)}</div>}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt} loading="lazy" decoding="async" className="block h-full w-full max-w-full object-cover" />
    </div>
  );
}

/*
 * `.slider-card-c` (Summer School "Build essential business skills"): 800 x 478 (100% at <=767),
 * square, clipped, photo cover; one mint plate 32px above the bottom-left — 16px/1 400 #072058,
 * p 10/18 (`.slider-title-c`).
 */
function SliderCardC({ card }) {
  return (
    <div className="relative block h-[478px] w-[800px] max-w-full overflow-hidden max-md:w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt} loading="lazy" decoding="async" className="block h-full w-full max-w-full object-cover" />
      {card.title && (
        /* ref .slider-content-c */
        <div className="absolute bottom-0 left-0 z-[1] flex flex-row items-end justify-start pb-8 pl-0">
          <div className="block flex-[0_1_auto] bg-atlas-mint px-[18px] py-2.5 text-[16px] font-normal leading-none text-[#072058]">{withBreaks(card.title)}</div>
        </div>
      )}
    </div>
  );
}

/*
 * `.port-card-o-wrap` (Summer School "How you'll learn with us"): the BBA minor-track card without
 * its link or active state — 295 x 520, a clipped column; photo 300 tall, cover; `.port-card-o-txt-wrap`
 * #072058, min-height 290, p22, title 24px/1.4 mint, desc 15px/1.6 white pt14; the 29 x 21 navy notch
 * at -20 / 30 against the CARD (the panel is `position: static`), so it is clipped away.
 */
function OCard({ card }) {
  return (
    <div className="relative flex h-[520px] w-[295px] flex-[0_1_auto] flex-col items-stretch justify-start overflow-hidden text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt} loading="lazy" decoding="async" className="mx-auto mb-0 block h-[300px] w-full flex-[0_1_auto] self-start object-cover" />
      <div className="block min-h-[290px] w-full flex-none bg-[#072058] p-[22px]">
        <div className="relative z-[2] text-[24px] font-normal leading-[1.4] text-atlas-mint">{withBreaks(card.title)}</div>
        <div className="pt-3.5 text-[15px] font-normal leading-[1.6] text-white">{withBreaks(card.text)}</div>
        <div aria-hidden className="absolute left-[30px] top-[-20px] text-[#072058]">
          <svg width="29" height="21" viewBox="0 0 29 21" fill="none" className="block">
            <path d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CardCsm({ card }) {
  return (
    /* ref .slider-card-c-sm */
    <div className="relative block h-[360px] w-[620px] max-w-full overflow-hidden max-md:w-[calc(100vw-44px)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt} loading="lazy" decoding="async" className="block h-full w-full max-w-full object-cover" />
      {card.title && (
        /* ref .slide-content-c-sm */
        <div className="absolute bottom-0 left-0 z-[1] flex items-end justify-start pb-11">
          <div className="block flex-[0_1_auto] bg-atlas-mint px-[18px] py-2.5 text-[18px] font-semibold leading-none text-[#072058]">{withBreaks(card.title)}</div>
        </div>
      )}
    </div>
  );
}

function PortCardM({ card }) {
  return (
    /* ref .port-card-m-wrap */
    <div className="relative block h-[480px] w-[295px] overflow-hidden text-white">
      {card.logo && (
        /* ref .pcm-tp-wrap > img.port-card-m-comp-logo — the company logo, top-left at p20 (industry visits) */
        <div className="absolute inset-x-0 top-0 z-[1] flex items-center justify-between px-5 pt-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.logo.src} srcSet={card.logo.srcSet} sizes={card.logo.sizes} alt={card.logo.alt} loading="lazy" className="block flex-none" />
        </div>
      )}
      {/* ref .port-card-m-txt-wrap */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex w-full items-end bg-[#072058] p-6">
        <div className="relative w-full flex-none">
          <div className="mb-0 text-[24px] font-semibold leading-[1.2] text-atlas-mint">{withBreaks(card.name)}</div>
          {card.role && (
            <div className="mt-2.5 border-0 border-t-[0.5px] border-solid border-[#e8e8e8] pt-2.5 text-[14px] font-normal leading-[1.4] text-white">
              {withBreaks(card.role)}
            </div>
          )}
        </div>
        {/* ref .port-card-m-arrow */}
        <div aria-hidden className="absolute left-[30px] top-[-20px] w-auto text-[#072058]">
          <svg width="29" height="21" viewBox="0 0 29 21" fill="none" className="block">
            <path d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z" fill="currentColor" />
          </svg>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt} loading="lazy" decoding="async" className="mx-auto mb-0 block h-full w-full max-w-full object-cover" />
    </div>
  );
}

function Lead({ item }) {
  const m = item.mods ?? [];
  if (item.tone === 'sub4') {
    /* `.sub-heading-4(.mrgbtm32)` (Non-Mumbai) — 24px/1.4 300, pr50; 16px/1.5 and pr0 at <=767;
       `.mrgbtm32` adds 32px of bottom padding at every width */
    return (
      <div className={cx('pr-[50px] text-[24px] font-light leading-[1.4] max-md:pr-0 max-md:text-[16px] max-md:leading-[1.5]', m.includes('mrgbtm32') && 'pb-8')}>
        <Runs runs={item.text} />
      </div>
    );
  }
  if (item.tone === 'blueText') {
    /* a bare `.blue-desc-text` (Campus' housing lead) — 24px/1.5 white, 18px at <=767 (<=768 where the page
       restates it, imarticus29012026) */
    return (
      <div className={item.at768 ? 'text-[24px] text-white max-768:text-[18px]' : 'text-[24px] text-white max-md:text-[18px]'}>
        <Runs runs={item.text} />
      </div>
    );
  }
  if (item.tone === 'black') {
    return (
      /* ref .black-desc-text.mrgbtm (Internationalisation) — 24px/1.5 black, 18px at <=767, 56px below
         at every width */
      <div className={cx('max-w-full text-[24px] text-black max-md:text-[18px]', m.includes('mrgbtm') && 'mb-14')}>
        <Runs runs={item.text} />
      </div>
    );
  }
  if (item.tone === 'blue') {
    return (
      /* ref .blue-desc-wrap(.mrgbtm) — `.bottom` aligns the copy and its button to the end; the row
         becomes an 8px-gap column at <=479 */
      <div className={cx('flex justify-between pt-14 text-white max-md:pt-10 max-sm:flex-col max-sm:gap-2', m.includes('bottom') ? 'items-end' : 'items-start', m.includes('mrgbtm') ? 'pb-[42px]' : 'pb-0')}>
        <div
          className={cx(
            /* `.blue-desc-text.f18` — 18px/1.8 at every width (career services) */
            (item.textMods || []).includes('f18') ? 'min-w-0 flex-1 basis-0 text-[18px] leading-[1.8]' : 'min-w-0 flex-1 basis-0 text-[24px] max-md:text-[18px]',
            /* the cap and the full width are exclusive: two max-w utilities in one list resolve by
               stylesheet order, which let `max-w-full` beat the 80% */
            (item.textMods || []).includes('wid80') ? 'max-w-[80%] max-md:max-w-full' : 'max-w-full'
          )}
        >
          <Runs runs={item.text} />
        </div>
        {item.button && (
          /* `a.button-regular` — the ISME mint pill (h54, 44 at <=767) */
          <ButtonRegular href={item.button.href} variant="mint">
            {item.button.label}
          </ButtonRegular>
        )}
      </div>
    );
  }
  if (item.tone === 'white') {
    return (
      /* ref .white-desc-wrap(.mrgbtm32) */
      <div className={cx('flex items-start justify-between pt-14 text-black max-md:flex-col max-md:gap-2.5 max-md:pt-5 max-sm:gap-2', m.includes('mrgbtm32') && 'mb-8', m.includes('mrgbtm') && 'mb-14')}>
        <div
          className={cx(
            'min-w-0 flex-1 basis-0 text-[24px] text-black max-md:text-[18px]',
            /* ref .black-desc-text.wid80 — 80% wide and 300 (full width at <=767) */
            (item.textMods || []).includes('wid80') ? 'max-w-[80%] font-light max-md:max-w-full' : 'max-w-full'
          )}
        >
          <Runs runs={item.text} />
        </div>
        {item.button && (
          /* `a.button-regular` closing the row — the ISME mint pill */
          <ButtonRegular href={item.button.href} variant="mint">
            {item.button.label}
          </ButtonRegular>
        )}
      </div>
    );
  }
  if (item.tone === 'sub1') {
    return (
      /* ref .sub-heading-1 — 18px/1.8 300, pr50 pb0; pr0 and 1.5 at <=767 */
      /* `.sub-heading-1.mrgbtm` — 56px below at every width */
      <div className={cx('pr-[50px] text-[18px] font-light leading-[1.8] max-md:pr-0 max-md:leading-[1.5]', m.includes('mrgbtm') ? 'pb-14' : 'pb-0')}>
        <Runs runs={item.text} />
      </div>
    );
  }
  return (
    /* ref .sub-heading(.mrgbtm32|.mrgbtm) — `.mrgbtm` is pb56 (20 at <=991), the shared SUB_INNER_MRGBTM */
    <div className={m.includes('mrgbtm') ? SUB_INNER_MRGBTM : cx(SUB_INNER, m.includes('mrgbtm32') && 'pb-8 font-normal max-md:pb-5 max-sm:pb-4')}>
      <Runs runs={item.text} />
    </div>
  );
}

/*
 * `.testimonial-card.bgc1` (career services' two testimonial carousels), 620 x 440 #193e90, a row;
 * at <=767 a column of auto height. Two panel shapes share it:
 *   `img.testimonial-image` + `.testimonial-text`   photo 50% (z10, cover; full width at its own
 *       ratio at <=767); panel `width: 70%` that shrinks to the rest, p40/32 at every width; the name
 *       `.stname-1` 14px 600 mint (its authored <strong> resolves to 900), `.st-course-1` 14px mint
 *   `img.student-image` + `.student-text`          photo 50% (100% x 320 at <=767); panel flex 1,
 *       p40/32 (280 tall, p20/12 at <=767, flex none at <=479); `.stname` 14px 600 pb5, `.st-course`
 *   `.st-text` 20px (16 at <=767), the quote glyph 16px at 5/5, the vector wash covering the panel.
 * Between 568 and 767 the card is `width: 100%` inside an auto-width slide and blows out upstream;
 * the container width is used instead, as every other ISME / ISDI testimonial carousel does.
 */
function VoiceCard({ card }) {
  const t = card.variant === 'testimonial';
  return (
    <div className="flex h-[440px] w-[620px] flex-none cursor-pointer bg-[#193e90] max-md:h-auto max-md:w-[calc(100vw-44px)] max-md:flex-col">
      {card.video ? (
        /* `.testimonial-video.w-background-video` (9 Core Advantages) — 325 x 440, full width at <=767 */
        <div className="relative z-10 h-[440px] w-[325px] max-w-full flex-none overflow-clip text-white max-md:w-full">
          <InViewVideo sources={card.video.sources} poster={card.video.poster} className="absolute inset-0 h-full w-full" />
        </div>
      ) : (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={card.image.src}
        srcSet={card.image.srcSet}
        sizes={card.image.sizes}
        alt={card.image.alt || ''}
        loading="lazy"
        className={
          t
            ? 'relative z-10 w-1/2 max-w-full shrink-0 object-cover max-md:w-full'
            : 'w-1/2 max-w-full flex-[0_1_auto] object-cover object-center max-md:block max-md:h-[320px] max-md:w-full max-md:max-w-none'
        }
      />
      )}
      <div
        className={
          t
            ? 'relative block w-[70%] px-8 py-10 text-white max-md:w-full'
            : 'relative block h-full flex-1 px-8 py-10 text-white max-md:h-[280px] max-md:px-3 max-md:py-5 max-sm:flex-none'
        }
      >
        <div className="relative z-[1] p-6 max-md:w-full">
          <div className="text-[20px] max-md:text-[16px]">{withBreaks(card.text)}</div>
          {card.quoteIcon && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={card.quoteIcon} width={16} height={16} alt="" loading="lazy" className="absolute left-[5px] top-[5px] max-w-full" />
          )}
        </div>
        {card.lines ? (
          /* `.st-details` holding an (often empty) `.stname` and then its own lines (Internationalisation):
             `.st-course.st-name` 16px/24 700 mint, `.st-at-pos` 14px/21 mint */
          <div className="relative z-[1] pl-6 text-[14px] text-atlas-mint max-md:w-full">
            <div className={cx('font-semibold', !t && 'pb-[5px]')}>
              <Runs runs={card.name} />
            </div>
            {card.lines.map((l, i) => (
              <div key={i} className={l.cls.includes('st-name') ? 'text-base font-bold [&_strong]:font-bold' : 'text-[14px] leading-[1.5]'}>
                <Runs runs={l.runs} />
              </div>
            ))}
          </div>
        ) : (
        <div className="relative z-[1] pl-6 text-[14px] text-atlas-mint max-md:w-full">
          <div className={cx('font-semibold', !t && 'pb-[5px]')}>
            <Runs runs={card.name} />
          </div>
          <div>
            <Runs runs={card.role} />
          </div>
        </div>
        )}
        {card.bgImage && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={card.bgImage} alt="" loading="lazy" className="absolute left-0 top-0 h-full w-full max-w-full object-cover" />
        )}
      </div>
    </div>
  );
}

/*
 * `.scroll-insta > .instagram-wrapper.mobile-vert-scroll > .grid-gallery-flex > .grid-column >
 * .small-card-a(-big)` — career services' "Our Career Support Framework": a 600px box (pb32, mt20;
 * mt0 at <=767) holding a scroller (mt56 / 32) with its scrollbars hidden by the ISME header.
 *   row      flex, gap 24, start; wraps space-between, gap 0 at <=767; at <=540 one nowrap row,
 *            stretched, 24px apart
 *   column   flex column, space-between, gap 24; 48% wide at <=767 (no column gap), mt24 at <=479,
 *            a row of its own at <=540
 *   card     #193e90, py24, white: `.small-card-a` 180 tall under sm-cad-bg-1 at 50% 0;
 *            `.small-card-a-big` 300 tall, sm-cad-bg-2 cover; both 300 tall, min 280 wide at <=540
 *   title    inline-block mint plate, #1e48a7 700, p8/22, mr22;  desc  pt22 px20
 */
function CardWall({ item }) {
  return (
    <div className="mt-5 h-[600px] overflow-hidden scroll-smooth pb-8 [scrollbar-width:none] max-md:mt-0">
      <div className="mt-14 h-full overflow-scroll [scrollbar-width:none] max-md:mt-8 [&::-webkit-scrollbar]:hidden">
        <div className="flex items-start gap-6 max-md:flex-wrap max-md:justify-between max-md:gap-0 max-vsm:flex-nowrap max-vsm:items-stretch max-vsm:gap-x-6">
          {item.columns.map((col, ci) => (
            <div key={ci} className="flex flex-col items-start justify-between gap-6 max-md:w-[48%] max-md:gap-x-0 max-sm:mt-6 max-vsm:w-auto max-vsm:flex-row">
              {col.map((c, i) => (
                <div
                  key={i}
                  className={cx(
                    'w-full flex-[0_1_auto] bg-[#193e90] bg-no-repeat py-6 text-white max-vsm:h-[300px] max-vsm:min-w-[280px]',
                    c.size === 'big' ? 'h-[300px] bg-cover bg-[position:0_0]' : 'h-[180px] bg-auto bg-[position:50%_0]'
                  )}
                  style={{ backgroundImage: `url('${c.size === 'big' ? item.bgBig : item.bgA}')` }}
                >
                  <div className="mr-[22px] inline-block bg-atlas-mint px-[22px] py-2 font-bold text-[#1e48a7]">{withBreaks(c.title)}</div>
                  <div className="px-5 pt-[22px]">{withBreaks(c.text)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/*
 * `.applicantion-wrapper > .appicant-card` (career services' closing pair, variant `c836fdcd`): a row
 * of two panels, space-between, top-aligned; a 16px-gap column at <=767.
 *   card    #193e90 (square — the variant cancels the base's 24px radius), the panel's own
 *           `data-bg-applicant` wash at 50% 100% (0 0, cover at <=767), max 600 wide, min 695 tall
 *           (358, full width at <=767), pt68 pl48 (30 / 20)
 *   h3      Poppins 32px/1.2 400, mb32 (20px at <=767)
 *   buttons a 16px-gap column of mint `.btn-primary` pills; the second panel authors an empty slot
 *   image   pinned bottom-centre, natural size up to 100%; half the panel tall at <=767
 */
function Applicants({ item }) {
  return (
    <div className="flex items-start justify-between pt-0 max-md:flex-col max-md:gap-4">
      {item.cards.map((c, i) => (
        <div
          key={i}
          className="relative min-h-[695px] max-w-[600px] overflow-hidden bg-[#193e90] bg-auto bg-[position:50%_100%] bg-no-repeat pl-12 pt-[68px] text-white max-md:min-h-[358px] max-md:w-full max-md:bg-cover max-md:bg-[position:0_0] max-md:pl-5 max-md:pt-[30px]"
          style={c.bg ? { backgroundImage: `url('${c.bg}')` } : undefined}
        >
          <h3 className="mb-8 mt-0 font-poppins-isdi text-[32px] font-normal leading-[1.2] max-md:text-[20px]">{withBreaks(c.title)}</h3>
          <div className="flex flex-col items-start gap-4">
            {c.buttons.map((b, j) => (
              <div key={j}>
                <PrimaryButton href={b.href} newTab={b.newTab} variant="mint" textSize="default-light" icon={b.icon}>
                  {b.label}
                </PrimaryButton>
              </div>
            ))}
            {Array.from({ length: c.emptySlots || 0 }, (_, j) => (
              <div key={`e${j}`} />
            ))}
          </div>
          {c.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={c.image.src}
              srcSet={c.image.srcSet}
              sizes={c.image.sizes}
              alt={c.image.alt || ''}
              loading="lazy"
              className="absolute bottom-0 left-1/2 max-w-full -translate-x-1/2 max-md:h-1/2"
            />
          )}
        </div>
      ))}
    </div>
  );
}

/*
 * `.center-image-full-wrap(.mrgtp) > img.center-image-full + .text-strip` (Career Connect): the photo
 * full width (contained, auto height at <=767) with a mint caption plate 56px above its bottom-left —
 * #072058 24px/1.4 600, p12/26. The frame is mt56 (40 at <=767) mb5 with `.mrgtp`, clipped.
 */
function ImageStrip({ item }) {
  return (
    <div className={cx('relative overflow-hidden text-white', (item.mods || []).includes('mrgtp') && 'mb-[5px] mt-14 max-md:mt-10')}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image.src}
        srcSet={item.image.srcSet}
        sizes={item.image.sizes}
        alt={item.image.alt || ''}
        loading="lazy"
        /* a classless photo keeps its intrinsic width (Entrepreneurship's closing image: 1238px in a 1412 frame at 1920) */
        className={cx('relative block max-w-full max-md:h-auto max-md:object-contain', !item.bare && 'w-full')}
      />
      {item.strip && (
        <div className="absolute bottom-14 left-0 bg-atlas-mint px-[26px] py-3 text-[24px] font-semibold leading-[1.4] text-[#072058]">{withBreaks(item.strip)}</div>
      )}
    </div>
  );
}

/*
 * `.instagram-wrapper.mobile-vert-scroll > .grid-gallery.h2-tag` (career services' "Outcomes" wall):
 * the shared masonry gallery inside a scroller (mt56 / 32). On this sheet `.grid-gallery` keeps its
 * own mt56 (40 at <=767) over the `.h2-tag` it also carries, and picks up that class's 32px bottom
 * margin at <=767. The scroller is a block formatting context (`overflow: scroll` upstream, hidden
 * scrollbars), so the gallery's margin stays inside it.
 */
function GalleryInline({ item }) {
  if (item.bare)
    return (
      /* `.grid-gallery.h2-tag` authored straight in the section (Internationalisation's universities):
         no scroller around it; each caption a `.grid-txt-wrapper2` row with its location pin */
      <GridGallery
        cards={item.cards}
        wrap="row"
        caption="text-[18px] font-bold leading-[1.5] text-white"
        /* the 32px bottom margin at <=767 comes from `.h2-tag`, which only Internationalisation's wall
           carries; the programme overviews' and Success Snapshot's walls are a bare `.grid-gallery` */
        margin={(item.galleryMods || []).includes('h2-tag') ? 'mt-14 max-md:mb-8 max-md:mt-10' : 'mt-14 max-md:mt-10'}
      />
    );
  return (
    <div className={cx('overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', (item.wrapMods || []).includes('mar-0') ? 'mt-0' : 'mt-14 max-md:mt-8')}>
      <GridGallery
        cards={item.cards}
        name="text-[20px] font-bold leading-6 text-atlas-mint"
        caption="text-[18px] font-normal leading-8 text-white"
        margin={(item.galleryMods || []).includes('h2-tag') ? 'mt-14 max-md:mb-8 max-md:mt-10' : undefined}
      />
    </div>
  );
}

/*
 * An h2 inside the section's content. `.head-wrap.top.mrg-tp > .tt-wrap > h2.h2-tag.mrg16` (career
 * services' "Our Management Team") carries the wrapper: mt54, mb16 + a 16px-gap stretched column at
 * <=767; the `.tt-wrap` mb20 (<=767) mr20 (<=479); the h2 mb16 (8 at <=767).
 */
function ContentH2({ item }) {
  const m = item.mods || [];
  const Tag = item.tag === 'h3' ? 'h3' : 'h2';
  const h = <Tag className={cx(H2, 'mt-0', H2_MB[m.find((x) => H2_MB[x])] ?? 'mb-14 max-md:mb-8')}>{withBreaks(item.text)}</Tag>;
  if (!item.headWrap) return h;
  return (
    <div className={cx('flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:justify-around', item.headWrap.includes('mrg-tp') && 'mt-[54px]')}>
      <div className="flex-[0_1_auto] max-md:mb-5 max-sm:mr-5">{h}</div>
    </div>
  );
}

/*
 * `.card-news` on the ISME sheet (About's Press Coverage): ISDI's 272 x 400 #f2f2f2 tile, but square,
 * with no side padding (the photo runs the card's full width) and a 32px #07f6a0 arrow button
 * (25px icon). Measured at 1440 / 390; the card never changes size.
 */
function NewsCard({ card }) {
  return (
    <div className="relative flex h-[400px] w-[272px] flex-none flex-col justify-between overflow-hidden bg-[#f2f2f2] py-2 text-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.logo.src} alt={card.logo.alt || ''} loading="lazy" decoding="async" className="mx-auto mb-2 block h-8 w-auto max-w-full" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} alt={card.image.alt || ''} loading="lazy" decoding="async" className="h-[156px] w-full max-w-full object-cover align-middle" />
      <div className="px-3">
        <div className="h-[110px] overflow-hidden px-[23px] py-3.5 font-medium">{card.title}</div>
      </div>
      <div className="mx-[23px] mt-3 flex items-center justify-between border-0 border-t border-solid border-black py-3">
        <div className="text-[12px] leading-[1.5]">{card.date}</div>
        <SmartLink
          href={card.href || '#'}
          aria-label={card.title}
          {...(card.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="flex h-8 w-8 max-w-full flex-none items-center justify-center rounded-[30px] bg-atlas-mint"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icons/arrow-downward.svg" width={27} height={27} alt="" loading="lazy" className="w-[25px] max-w-full align-middle leading-none" />
        </SmartLink>
      </div>
    </div>
  );
}

/*
 * `.experience-wrapper > .exp-card` (9 Core Advantages, "Entrepreneurial DNA"): mt56, a 500px Webflow
 * quick-stack — two columns 1.5fr / 1fr, two 250 rows, the third panel spanning both — that becomes
 * one column of auto rows at <=767 (still 500 tall, so the rows share the height). Measured at
 * 1440 / 768 / 390.
 *   .e-card   column, pt44 pl64 pr44 (22 / 32 / 22 at <=767); bg1 #193e90, bg2 #072058, bg3 #0b2b73,
 *             each under its own artwork at 100% (100% 100% for bg3), contain
 *   .ex-text  40px/1.2 300 (22 at <=767, 20 at <=479);  .ex-desc  pt16, 16px/1.6 (14 at <=479)
 */
const EXP_TONE = { bg1: 'bg-[#193e90] bg-[position:100%]', bg2: 'bg-[#072058] bg-[position:100%]', bg3: 'bg-[#0b2b73] bg-[position:100%_100%]' };
function ExpCards({ item }) {
  return (
    <div className="mt-14">
      <div className="grid h-[500px] w-full grid-cols-[1.5fr_1fr] grid-rows-2 justify-center text-white max-md:grid-cols-1 max-md:grid-rows-none">
        {item.cards.map((c, i) => (
          <div
            key={i}
            className={cx(
              'flex flex-col bg-contain bg-no-repeat pl-16 pr-11 pt-11 max-md:pl-8 max-md:pr-[22px] max-md:pt-[22px]',
              EXP_TONE[c.tone],
              c.tone === 'bg3' && 'row-span-2'
            )}
            style={{ backgroundImage: `url('${c.bg}')` }}
          >
            <div className="text-[40px] font-light leading-[1.2] max-md:text-[22px] max-sm:text-[20px]">{withBreaks(c.title)}</div>
            <div className="pt-4 leading-[1.6] max-sm:text-[14px] max-sm:leading-[1.6]">
              <Runs runs={c.text} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/*
 * `.photo-collage-wrapper` (9 Core Advantages, "Labs that Spark Breakthroughs"): mt56, clipped, two
 * 450px quick-stacks 5px apart, 2px gaps. The first is 2fr / 1fr — a `.photo-cols` pair over a
 * full-width cell, the third cell spanning both rows; the second mirrors it at 1fr / 2fr. Every cell
 * is a stylesheet-painted photograph with a 32px/1.2 300 white caption (22px at <=767), mb24 px24,
 * pushed to the bottom; the paddings are the reference's own utility classes (Tailwind / Bootstrap
 * `pt-N` on one page). Below 768 the grid keeps its two columns on min-content tracks and overflows
 * the wrapper, which clips it — as upstream.
 */
const COLLAGE_PT = { 'pt-1': 'pt-1', 'pt-2': 'pt-2', 'pt-3': 'pt-4', 'pt-4': 'pt-6', 'pt-5': 'pt-12', 'pt-6': 'pt-6', 'pt-7': 'pt-7', 'pt-8': 'pt-8' };
const COLLAGE_BG = {
  'pt-1': 'bg-[position:0_0] border-r-2 border-white',
  'pt-2': 'bg-[position:0_0]',
  'pt-3': 'bg-[position:0_0]',
  'pt-4': 'bg-cover bg-[position:0_0] bg-no-repeat',
  'pt-5': 'bg-[position:0_0]',
  'pt-6': 'bg-cover bg-[position:0_0] bg-no-repeat',
  'pt-7': 'bg-cover bg-[position:0_0]',
  'pt-8': 'bg-cover bg-[position:0_0] bg-no-repeat',
};
function CollageCell({ c, images, className }) {
  const pt = c.cls.find((x) => /^pt-\d$/.test(x));
  return (
    <div
      /* `.pt-6` is a ROW, bottom-aligned; every other cell a column pushed to the bottom */
      className={cx('flex text-white', pt === 'pt-6' ? 'flex-row items-end justify-start' : 'flex-col items-start justify-end', COLLAGE_PT[pt], COLLAGE_BG[pt], className)}
      style={{ backgroundImage: `url('${images[pt]}')` }}
    >
      <div className="mb-6 px-6 text-[32px] font-light leading-[1.2] max-md:text-[22px] max-md:leading-[1.2]">{withBreaks(c.title)}</div>
    </div>
  );
}
function Collage({ item }) {
  return (
    <div className="mt-14 overflow-hidden">
      {item.grids.map((cells, g) => (
        <div key={g} className={cx('grid h-[450px] justify-center gap-0.5 text-white', g ? 'mt-[5px] grid-cols-[1fr_2fr]' : 'grid-cols-[2fr_1fr]')}>
          {cells.map((cell, i) =>
            cell.inner.length ? (
              /* `.photo-cols > .inside-cards` — two cells side by side, 2px apart (none at <=767) */
              <div key={i} className="flex flex-col items-start justify-center">
                <div className="grid h-full w-full flex-none grid-cols-2 gap-0.5 max-md:gap-0">
                  {cell.inner.map((x, j) => (
                    <CollageCell key={j} c={x} images={item.images} />
                  ))}
                </div>
              </div>
            ) : (
              <CollageCell key={i} c={cell} images={item.images} className={i === (g ? 0 : 1) ? 'row-span-2' : undefined} />
            )
          )}
        </div>
      ))}
    </div>
  );
}

/*
 * `.process-wrap > .process-card` (YourDOST steps): three `.pro-card`s in a 36px-gap stretched row
 * over a 20px #193e90 `.top-line` behind them; each #193e90 under its own artwork, p 32/42/64/24;
 * `.proc-no` 24px/1 700 mint, `.proc-ttile` 24px/1.5 white mt24 pb16, `.proc-desc` 16/24 white.
 * The ATLAS /life-at-atlas YourDOST steps, on the ISME sheet. A column at <=767.
 */
function ProcessCards({ item }) {
  return (
    <div className="relative">
      {/* `.process-card` — the 36px gap holds in the <=767 column too */}
      <div className="relative z-[1] flex items-stretch justify-start gap-9 max-md:flex-col">
        {item.cards.map((c, i) => (
          <div
            key={i}
            /* `.pro-card` is a declared 390px at `flex: 0 1 auto` (measured on Scholarships, Life and 9 Core
               Advantages): it shrinks when the row is narrower (212 at 768) but never grows, so at 1920 the
               row ends short of the container; stacked below 768 it stretches */
            className="w-[390px] flex-[0_1_auto] bg-[#193e90] bg-cover bg-no-repeat pb-16 pl-6 pr-[42px] pt-8 text-white max-md:w-auto"
            style={{ backgroundImage: `url('${item.bgs[c.tone ?? 'null'] ?? item.bgs.null}')` }}
          >
            <div className="text-[24px] font-bold leading-none text-atlas-mint">{c.no}</div>
            {/* `.proc-ttile` 24px, `.proc-desc` 16px — 20 and 14 at <=479 */}
            <div className="mt-6 pb-4 text-[24px] leading-[1.5] max-sm:text-[20px]">{withBreaks(c.title)}</div>
            {c.text != null && (
              <div className="max-sm:text-[14px]">
                <Runs runs={c.text} />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* `.top-line` — a 20px rule behind the cards at 10% from the top; at <=767 a 20px-wide vertical
          rule the full height of the column, 49% in */}
      <div className="absolute inset-x-0 top-[10%] z-0 h-5 bg-[#193e90] max-md:bottom-auto max-md:left-[49%] max-md:right-auto max-md:top-0 max-md:h-full max-md:w-5" />
    </div>
  );
}

/*
 * `.slider-card-wrapper` on the ISME sheet (Student Welfare's "Academic & Career Support"): 800 x 475,
 * square, the photograph under a #0026370 -> #040404e6 scrim over the lower half (pb50 pl40); title
 * 32px/1 500 #07f6a0, description 18px/1.5 300 white, pt16, max 600 wide. Full width at <=767.
 */
function SlideCardA({ card }) {
  return (
    <div className="relative flex h-[475px] w-[800px] flex-none items-end overflow-hidden max-md:w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt || ''} loading="lazy" className="absolute inset-0 h-full w-full max-w-full object-cover" />
      <div className="relative z-[1] flex h-1/2 w-full flex-col justify-end bg-[linear-gradient(#00263700,#040404e6)] pb-[50px] pl-10 max-md:p-5">
        <div className="text-[32px] font-medium leading-none text-atlas-mint max-md:text-[22px]">{withBreaks(card.title)}</div>
        <div className="max-w-[600px] pt-4 text-[18px] font-light leading-[1.5] text-white max-md:text-base">{withBreaks(card.text)}</div>
      </div>
    </div>
  );
}

/*
 * `.port-card-m-wrap` with `.port-card-m-title` + `.port-card-m-nor` (Entrepreneurship's journey and IPR
 * cards; measured at 1440 / 390): the 295 x 480 card and #072058 plate of `PortCardM`, but a 24px/1.2
 * 500 #07f6a0 title (mb8; mb14 at <=767) over a 14px/1.4 white description — which picks up a 1px
 * #e8e8e8 rule and pt10 at <=767.
 */
function PortCardMT({ card }) {
  return (
    <div className="relative flex h-[480px] w-[295px] flex-none items-end justify-center overflow-hidden text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt || ''} loading="lazy" className="absolute inset-0 h-full w-full max-w-full object-cover" />
      <div className="relative z-[1] flex w-full items-end bg-[#072058] p-6">
        <div className="relative w-full flex-none">
          <div className="mb-2 text-[24px] font-medium leading-[1.2] text-atlas-mint max-md:mb-[14px]">{withBreaks(card.title)}</div>
          <div className="text-[14px] leading-[1.4] text-white max-md:border-t max-md:border-[#e8e8e8] max-md:pt-2.5">{withBreaks(card.text)}</div>
        </div>
        <div className="absolute -top-5 left-[30px] h-[21px] w-[29px] text-[#072058]">
          <svg width="29" height="21" viewBox="0 0 29 21" fill="none" aria-hidden="true" className="block">
            <path d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/*
 * `.small-card-b` (Entrepreneurship's curriculum carousel): #193e90 under sm-cad-bg-1 at 50% 0, py24,
 * 300 x 180, and 295 x 265 from 1440 (the sheet's `min-width: 1440px` rule); the `.sm-card-title` mint chip and a
 * 24px/1.5 600 white `.sm-card-b-desc`, pt22 px20.
 */
function SmallCardB({ card }) {
  return (
    <div className="h-[180px] w-[300px] max-w-[300px] flex-none bg-[#193e90] bg-[url('/assets/images/schools/isme/pages/sm-cad-bg-1.png')] bg-[position:50%_0] bg-no-repeat py-6 text-white 2xl:h-[265px] 2xl:w-[295px] 2xl:min-w-[295px]">
      <div className="mr-[22px] inline-block bg-atlas-mint px-[22px] py-2 font-bold text-[#1e48a7]">
        <Runs runs={card.title} />
      </div>
      <div className="px-5 pt-[22px] text-[24px] font-semibold leading-[1.5]">{withBreaks(card.text)}</div>
    </div>
  );
}

/*
 * `.slider-card-e` holding only a `.slide-title-white` (Entrepreneurship's "You'll Never Build Alone"):
 * 800 x 478 (full width at <=767), the photograph under a #0026370 14% -> #040404e6 scrim on the lower
 * half, pb50 px40 (pb24 px16 at <=767); title 40px/1 500 white (24px at <=767), in a 50% column.
 */
function SliderCardEWhite({ card }) {
  return (
    <div className="relative flex h-[478px] w-[800px] flex-none items-end overflow-hidden max-md:w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt || ''} loading="lazy" className="absolute inset-0 h-full w-full max-w-full object-cover" />
      <div className="relative z-[1] flex h-1/2 w-full items-end bg-[linear-gradient(#00263700_14%,#040404e6)] px-10 pb-[50px] max-md:px-4 max-md:pb-6">
        <div className="flex w-full items-center justify-between">
          <div className="max-w-[50%] text-[40px] font-medium leading-none text-white max-md:max-w-none max-md:text-[24px]">{withBreaks(card.title)}</div>
        </div>
      </div>
    </div>
  );
}

/* one item, inside or outside the section's container */
function Item({ item }) {
  const m = item.mods ?? [];
  switch (item.kind) {
    case 'zoom':
      return (
        /* `.graduate-cards-wrap` — mt56 at every width */
        <div className={cx(m.includes('mrg56') && 'mt-14 max-md:mt-10', item.gradWrapMt && 'mt-14')}>
          <ZoomSlider label="Gallery">
            {item.cards.map((c, i) => (
              <GraduateCard key={i} card={c} />
            ))}
          </ZoomSlider>
        </div>
      );
    case 'zoomLg':
      return (
        /* `.zoom-slider-wrap` (Student Welfare) — pt56 around the slider */
        <ZoomSliderLg label="Gallery" dots="isdi" className={cx(m.includes('mrgtp') && 'mt-14 max-lg:mt-5', m.includes('mrg-lft') && 'ml-[20%] max-md:ml-0', item.zoomWrapPt && 'pt-14')}>
          {item.cards.map((c, i) =>
            c.kind === 'slider-card-e-white' ? (
              <SliderCardEWhite key={i} card={c} />
            ) : c.kind === 'slider-card-wrapper' ? (
              <SlideCardA key={i} card={c} />
            ) : c.kind === 'slider-card-e' ? (
              /* ref .slider-card-e (industry masterclasses) — square on the ISME sheet */
              <SpeakerSlideCard key={i} slide={c} radius="isme" />
            ) : c.kind === 'slider-card-b' ? (
              <SliderCardB key={i} card={c} />
            ) : c.kind === 'slider-card-c' ? (
              <SliderCardC key={i} card={c} />
            ) : (
              <SliderCardD key={i} card={c} />
            )
          )}
        </ZoomSliderLg>
      );
    case 'swiperFull':
      return (
        <Carousel
          autoplay={false}
          arrowStyle="isme"
          bullets="inline-overlay"
          align={item.cards[0]?.kind === 'career' ? 'center' : 'stretch'}
          className={cx(m.includes('mrgtp0') ? '' : 'pt-14 max-md:pt-5')}
        >
          {item.cards.map((c, i) =>
            c.kind === 'career' ? (
              <CareerCard key={i} card={c} />
            ) : c.kind === 'voice' ? (
              <VoiceCard key={i} card={c} />
            ) : c.kind === 'squareA' ? (
              <SquareCardA key={i} card={c} skin="isme" />
            ) : (
              <CardCsm key={i} card={c} />
            )
          )}
        </Carousel>
      );
    case 'swiper':
      return (
        /* `.mrgtp32` — 32px of top padding at every width (measured, industry-networking-and-conferences) */
        /* `.mrgtp-0` (a different class from `.mrgtp0`) — no top padding either */
        <Carousel autoplay={false} arrowStyle="isme" bullets="inline" className={cx(m.includes('mrgtp0') || m.includes('mrgtp-0') ? '' : m.includes('mrgtp32') ? 'pt-8' : m.includes('mrgtp-little') ? 'mt-[3px]' : 'pt-14 max-md:pt-10')}>
          {item.cards.map((c, i) =>
            c.kind === 'o' ? (
              <OCard key={i} card={c} />
            ) : c.kind === 'd' ? (
              <AdvisorCard key={i} person={c} skin="isme" />
            ) : c.kind === 'f' ? (
              <CardTypeF key={i} card={c} variant="isme" />
            ) : c.kind === 'placement' ? (
              <PlacementCard key={i} card={c} skin="isme" />
            ) : c.kind === 'h' ? (
              <PortCardH key={i} item={{ ...c, title: c.name }} skin={c.variant === 'wrap2' ? 'isme2' : 'isme'} />
            ) : c.kind === 'e' ? (
              <CardTypeE key={i} person={c} skin="isme" />
            ) : c.kind === 'a' ? (
              <CardA key={i} card={c} cta={c.cta} variant="isme" sizes="100vw" />
            ) : c.kind === 'news' ? (
              <NewsCard key={i} card={c} />
            ) : c.kind === 'mt' ? (
              <PortCardMT key={i} card={c} />
            ) : c.kind === 'b' ? (
              <SmallCardB key={i} card={c} />
            ) : c.kind === 'i' ? (
              <PortCardI key={i} card={{ ...c, text: c.title ?? c.text }} />
            ) : c.kind === 'patent' ? (
              <PatentCard key={i} card={c} variant="isme" wash={c.wash} />
            ) : c.kind === 'master' ? (
              /* `.master-card` — the 292 x 520 photograph and a 56px play glyph pinned at 50% / 50% (no
                 transform, so its corner sits at the centre); decorative upstream: no link, no video */
              <div key={i} className="relative h-[520px] w-[292px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image.src} alt={c.image.alt || ''} loading="lazy" className="block h-[520px] w-[292px] max-w-full" />
                {c.play && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={c.play.src} alt="" width={56} height={56} loading="lazy" className="absolute left-1/2 top-1/2 block max-w-full" />
                )}
              </div>
            ) : c.kind === 'pg' ? (
              <ProgramCard key={i} card={c} />
            ) : c.kind === 'elig' ? (
              /* `.elegibility-card` (Scholarships): a 242px #193e90 circle holding its icon at natural size,
                 over an 18px/1.5 700 black label 23px below, centred */
              <div key={i} className="w-[242px]">
                <div className="flex h-[242px] w-[242px] items-center justify-center rounded-full bg-[#193e90]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.icon.src} alt={c.icon.alt || ''} loading="lazy" className="max-w-full" />
                </div>
                <div className="mt-[23px] text-center text-[18px] font-bold leading-[1.5] text-black">{c.text}</div>
              </div>
            ) : c.kind === 'portF' ? (
              <PortCardF key={i} card={c} skin="isme" />
            ) : c.kind === 'transfer' ? (
              <TransferCard key={i} person={c} logoKind={c.logoKind} skin="isme" />
            ) : (
              <PortCardM key={i} card={c} />
            )
          )}
        </Carousel>
      );
    case 'yearSwipers':
      return (
        <YearSwipers
          item={item}
          label={item.tabs.some((t) => t.cards.some((c) => c.kind === 'f')) ? 'Industry Led Events on Campus' : 'Industry'}
          panes={
            item.tabs.every((t) => t.cards.every((c) => c.kind === 'f'))
              ? undefined
              : item.tabs.map((t, j) => (
                  /* `.swiper.common-swiper.mrgtp-little` — 3px down, no top padding */
                  <Carousel key={j} autoplay={false} arrowStyle="isme" bullets="inline" className={(t.mods || []).includes('mrgtp-little') ? 'mt-[3px]' : 'pt-14 max-md:pt-10'}>
                    {t.cards.map((c, i) => (c.kind === 'f' ? <CardTypeF key={i} card={c} variant="isme" /> : <PortCardM key={i} card={c} />))}
                  </Carousel>
                ))
          }
        />
      );
    case 'tabSliders':
      return (
        /* `.rounded-tabs-mint` whose panes each hold a `.zoom-slider-lg` (Global Immersions) — the strip
           in the container, each pane's slider bleeding past it */
        <TabPanes
          idPrefix="isme-immersions"
          label="Global Immersions"
          contentClassName={cx('relative text-lg', (item.contentMods || []).includes('padtp32') ? 'pt-8' : 'pt-14 max-md:pt-10')}
          tabs={item.tabs.map((t) => ({
            label: t.label,
            content: (
              <ZoomSliderLg label={t.label} dots="isdi">
                {t.cards.map((c, i) => (c.kind === 'slider-card-c' ? <SliderCardC key={i} card={c} /> : <SliderCardD key={i} card={c} />))}
              </ZoomSliderLg>
            ),
          }))}
        />
      );
    default:
      return null;
  }
}

/*
 * `.instagram-wrapper > .grid-gallery-flex > .grid-column > img.insta-image-rect(-2)` — the bare
 * photo wall (no caption cards), ISDI Outstation's `Community` grid without the ISDI radius:
 *   wrapper  mt56 (32 at <=767)
 *   row      flex, gap 24; wraps space-between with gap 0 at <=767
 *   column   flex column `0 1 auto` — sized by its photographs' natural widths, then shrunk to fit —
 *            gap 24, start-aligned; 48% wide at <=767, mt24 at <=479
 *   image    natural aspect; `.insta-image-rect` becomes 300 wide, cover, pinned top-left at <=767
 *            (`-rect-2` declares no breakpoint rule)
 */
/* `.mobile-vert-scroll` (the ISME header's <=540 block): the wall becomes one nowrap row of columns
   24px apart, each column a row, every `.img-wrap` 400 tall and at least 320 wide — a horizontal
   scroller with its scrollbar hidden */
function RectWall({ item }) {
  const rect1 = item.imgClass.split(' ').includes('insta-image-rect');
  const mvs = (item.wrapClass || '').split(' ').includes('mobile-vert-scroll');
  return (
    <div className={cx('mt-14 max-md:mt-8', mvs && 'max-vsm:overflow-auto max-vsm:[scrollbar-width:none]')}>
      <div className={cx('flex gap-6 max-md:flex-wrap max-md:justify-between max-md:gap-0', mvs && 'max-vsm:flex-nowrap max-vsm:items-stretch max-vsm:gap-x-6')}>
        {item.columns.map((col, ci) => (
          /* `.grid-column-2` (Non-Mumbai) carries no <=479 top margin: its rows sit flush; its photos are
             300px wide at <=767 (capped by the 48% column) at their own ratio (measured at 700 / 390) */
          <div key={ci} className={cx('flex flex-[0_1_auto] flex-col items-start justify-between gap-6 max-md:w-[48%]', !item.col2 && 'max-sm:mt-6', mvs && 'max-vsm:w-auto max-vsm:flex-row')}>
            {col.map((card, i) => {
              const photo = (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={card.image.src}
                  srcSet={card.image.srcSet}
                  sizes={card.image.sizes}
                  alt={card.image.alt || ''}
                  loading="lazy"
                  decoding="async"
                  className={cx('h-auto max-w-full overflow-hidden align-middle', rect1 && !item.col2 && 'object-cover max-md:h-full max-md:w-[300px] max-md:object-left-top', item.col2 && 'object-cover max-md:w-[300px]')}
                />
              );
              /* ref .img-wrap — relative, and 320 wide at <=479 (the global rule), so its 300px photo
                 keeps its width there and overflows the 48% column, as upstream */
              return card.imgWrap ? (
                <div key={i} className={cx('relative max-sm:w-[320px]', mvs && 'max-vsm:h-[400px] max-vsm:min-w-[320px]')}>
                  {photo}
                  {card.text && (
                    /* ref .insta-text — mint plate 32px above the bottom-left, 18px 700 #072058 p 8/16;
                       14px/1.2, py4, 8px from the bottom at <=767 */
                    <div className="absolute bottom-8 left-0 inline-block bg-atlas-mint px-4 py-2 text-[18px] font-bold text-[#072058] max-md:bottom-2 max-md:py-1 max-md:text-[14px] max-md:leading-[1.2]">
                      {withBreaks(card.text)}
                    </div>
                  )}
                </div>
              ) : (
                photo
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/*
 * `.bl-card-wrapper-isme` with a second `.belief-cards-2-common` band (Non-Mumbai's "Survive and
 * Thrive"), measured at 1440 / 991 / 767 / 390. mt56 (40 at <=767); every cell a centred column of a
 * `.number` (24/1 600 #07f6a0, pb8 pl24) over a `.card-title` (32px/1.2 500, px24 mb8; 16px/1.2 600 at
 * <=767), painted by the stylesheet (colour + wash travel as data).
 *   band 1  grid `2fr minmax(200px,1fr)` x 282/282 (564): cells 1+2 side by side in col 1 row 1,
 *           cell 3 col 2 rows 1-2, cell 4 col 1 row 2; at <=767 a wrapping row of 250px rows
 *   band 2  grid `2fr 3fr` x 282/282: cell 5 col 1 rows 1-2 (pt30 pb40 at <=767, one row), cell 6
 *           col 2 row 1, cells 7+8 side by side in col 2 row 2 (both columns at <=767, `1fr 1fr`)
 * A bare `1fr` is `minmax(auto, 1fr)`, so the `minmax` is transcribed. The empty `.card-ico-btn`s are
 * 0 x 0 and paint nothing.
 */
function NumberCell({ cell, className }) {
  return (
    <div
      className={cx(
        'relative flex flex-col justify-center bg-no-repeat text-white bg-[color:var(--nc-bg)] max-sm:bg-[color:var(--nc-bg-sm)]',
        className
      )}
      style={{
        '--nc-bg': cell.bg,
        '--nc-bg-sm': cell.bgSm ?? cell.bg,
        backgroundImage: cell.image ? `url(${cell.image})` : undefined,
        backgroundSize: cell.size,
        backgroundPosition: cell.position,
      }}
    >
      <div className="pb-2 pl-6 text-[24px] font-semibold leading-none text-atlas-mint">{cell.num}</div>
      <div className="mb-2 px-6 text-[32px] font-medium leading-[1.2] max-md:text-[16px] max-md:font-semibold">{withBreaks(cell.title)}</div>
    </div>
  );
}

function NumberGrid({ item }) {
  const [a, b, c, d, e, f, g, h] = item.cells;
  return (
    <div className="mt-14 max-md:mt-10">
      <div className="grid h-[564px] grid-rows-[282px_282px] justify-center [grid-template-columns:2fr_minmax(200px,1fr)] max-md:flex max-md:h-auto max-md:flex-wrap">
        <div className="grid grid-cols-2 max-md:h-[250px] max-md:w-full">
          <NumberCell cell={a} className="items-start" />
          <NumberCell cell={b} className="items-start" />
        </div>
        <NumberCell cell={c} className="row-span-2 items-start max-md:h-[250px] max-md:w-full" />
        <NumberCell cell={d} className="items-stretch max-md:h-[250px] max-md:w-full" />
      </div>
      <div className="grid h-[564px] grid-rows-[282px_282px] justify-center [grid-template-columns:2fr_3fr] max-md:grid-cols-2">
        <NumberCell cell={e} className="row-span-2 items-stretch max-md:row-span-1 max-md:pb-10 max-md:pt-[30px]" />
        <NumberCell cell={f} className="items-stretch" />
        <div className="grid grid-cols-2 max-md:col-span-2">
          <NumberCell cell={g} className="items-start" />
          <NumberCell cell={h} className="items-start" />
        </div>
      </div>
    </div>
  );
}

/*
 * `.port-card-b` on the ISME sheet (Life's "Vibes that go viral"): 340 x 480 at every width (the card
 * sits inside its slide, so `.port-card-b.swiper-slide` never matches), r24, clipped, line-height 0;
 * the photo cover; a p32 plate pinned to the bottom holding a 24px/1.2 500 #07f6a0 title.
 */
function PortCardB({ card }) {
  return (
    <div className="relative h-[480px] w-[340px] overflow-hidden rounded-3xl leading-[0]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt || ''} loading="lazy" className="h-full w-full max-w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 p-8">
        <div className="text-[24px] font-medium leading-[1.2] text-atlas-mint">{withBreaks(card.title)}</div>
      </div>
    </div>
  );
}

/*
 * `.grid-gallery-flex > .grid-column > .grid-card-atlas` (Internationalisation's summer schools), measured
 * at 1440 / 390: four columns (gap 24, start; wrapping 48% columns, space-between, mt24 at <=767), each a
 * space-between column of cards 24px apart. A card is fit-content, `32px 0` corners, clipped, mb24 (16 at
 * <=767): the photo at its own ratio (300 wide at <=767, overflowing its column as upstream) with a 20px
 * logo pinned 20/20 from the bottom-left. `.container.bdrtp` around it is a container of its own with a
 * 1px black top rule and pt56.
 */
function AtlasWall({ item }) {
  const wall = (
    <div className="flex items-start gap-6 max-md:flex-wrap max-md:justify-between max-md:gap-0">
      {item.columns.map((col, ci) => (
        <div key={ci} className="flex flex-[0_1_auto] flex-col items-start justify-between gap-6 max-md:mt-6 max-md:w-[48%]">
          {col.map((card, i) => (
            <div key={i} className="relative mb-6 max-w-full overflow-hidden rounded-br-[32px] rounded-tl-[32px] max-md:mb-4 max-md:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt || ''} loading="lazy" className="block h-auto max-w-full object-cover max-md:w-[300px] max-md:max-w-none" />
              {card.logo && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={card.logo.src} alt="" loading="lazy" className="absolute bottom-5 left-5 max-w-full" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  return item.bdrtp ? <div className={cx(CONTAINER, 'border-0 border-t border-solid border-black pt-14')}>{wall}</div> : wall;
}

const CAROUSELS = new Set(['zoom', 'zoomLg', 'swiperFull', 'swiper', 'yearSwipers', 'tabSliders']);

function InContainer({ item }) {
  if (item.kind === 'lead') return <Lead item={item} />;
  if (item.kind === 'wall') {
    if ((item.imgClass || '').startsWith('insta-image-rect')) return <RectWall item={item} />;
    return <PhotoGallery columns={item.columns} skin="isme" />;
  }
  if (item.kind === 'video') {
    return (
      /* ref .center-image-full-wrap.mrgtp > .w-embed-youtubevideo */
      /* the frame's margins come with `.mrgtp`; the bare `.center-image-full-wrap` (industry-centric) has none */
      <div className={cx('relative overflow-hidden', (item.frame || []).includes('mrgtp') && (item.at768 ? 'mb-[5px] mt-14 max-768:mt-10' : 'mb-[5px] mt-14 max-md:mt-10'))}>
        <div className="relative w-full bg-cover bg-center" style={{ paddingTop: `${item.ratio}%` }}>
          <iframe
            src={item.src}
            title={item.title || 'Video'}
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
            className="absolute left-0 top-0 h-full w-full border-0"
          />
        </div>
      </div>
    );
  }
  if (item.kind === 'strip') {
    const m = item.mods || [];
    const mb = m.includes('mgr-btm');
    return (
      /* ref .strip-container(.mgr-btm) — #193e90 under strip-cont-bg at 100% 50% (centred cover at
         <=767), py48, centred row; mt56 / mb56 (32 / 32 at <=767), a column at <=479 */
      <div
        className={cx(
          "mt-14 flex items-center justify-center bg-[#193e90] bg-[url('/assets/images/schools/isme/pages/strip-cont-bg.png')] bg-[position:100%_50%] bg-no-repeat py-12 max-md:bg-cover max-md:bg-center",
          mb && 'mb-14 max-md:my-8 max-sm:flex-col'
        )}
      >
        {/* the cells are the container's own children upstream (no `.strip-content`), so its <=479
            column has to reach this row too — without it the row ran 845px wide at 390, clipped */}
        <div className={cx('flex items-center justify-center', item.content && 'max-lg:flex-col max-lg:gap-5', mb && !item.content && 'max-sm:flex-col')}>
        {item.cells.map((cell, i) => (
          /* ref .strip-text — 24px 500 centred, px56; mb32 at <=767 */
          /* `.strip-text.border` — 1px white rules either side (career services' middle cell) */
          <div key={i} className={cx('px-14 text-center text-[24px] font-medium max-md:mb-8', (item.cellCls?.[i] || []).includes('border') && 'border-x border-white')}>
            {cell.map((t, j) => (
              <div key={j} className={t.cls.includes('str-txt-mint') ? 'text-atlas-mint' : t.cls.includes('str-txt-white') ? 'text-white' : undefined}>
                {withBreaks(t.text)}
              </div>
            ))}
          </div>
        ))}
        </div>
      </div>
    );
  }
  if (item.kind === 'elCards') {
    return (
      /* ref .coll-fest-cards-wrap — flex, gap 24, stretch, pt56; a column (pt40) at <=767 */
      <div className="flex items-stretch gap-6 pt-14 max-md:flex-col max-md:pt-10">
        {item.cards.map((c, i) => (
          /* ref .port-card-el-wrap — 398 x 622 column (full width, auto height at <=767) */
          <div key={i} className="relative flex h-[622px] w-[398px] flex-[0_1_auto] flex-col items-stretch justify-start overflow-hidden text-white max-md:h-auto max-md:w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image.src} srcSet={c.image.srcSet} sizes={c.image.sizes} alt={c.image.alt} loading="lazy" decoding="async" className="mx-auto mb-0 block h-auto w-full max-w-full object-cover" />
            {/* ref .port-card-el-txt-wrap — #193e90, p22/32, flex 1 */}
            <div className="relative block w-full flex-1 basis-0 bg-[#193e90] px-8 py-[22px]">
              <div className="text-[32px] font-normal leading-[1.2] text-atlas-mint max-md:text-[24px]">{withBreaks(c.title)}</div>
              <div className="pt-3.5 text-[18px] font-normal leading-[1.6] text-white max-md:text-[16px] max-md:leading-[1.6]">{withBreaks(c.text)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (item.kind === 'storyRow') return <StoryX data={item} />;
  if (item.kind === 'journey') {
    return (
      /* ref .common-flex-32-stretch — flex, gap 32, space-between, relative; a column at <=767 */
      <div className="relative flex justify-between gap-8 pb-0 max-md:flex-col">
        {item.cards.map((c, i) => (
          <ZoneCard key={i} zone={c} skin="isme" />
        ))}
      </div>
    );
  }
  if (item.kind === 'h3') {
    /* `.mrgbm-16` — 16px below (the industry events' "ATLAS HR Conclave"); `.h3-tag-mint` is #07f6a0 */
    return (
      <h3
        className={cx(
          'mt-0 text-[32px] font-medium leading-[1.2] max-md:text-[22px]',
          (item.mods || []).includes('h3-tag-mint') || (item.mods || []).includes('mint') ? 'text-atlas-mint' : 'text-[#2b2b2b]',
          (item.mods || []).includes('mrgbm-16') ? 'mb-4' : 'mb-8'
        )}
      >
        {item.text}
      </h3>
    );
  }
  if (item.kind === 'spacer') return null;
  if (item.kind === 'atlasWall') return <AtlasWall item={item} />;
  if (item.kind === 'week') return <WeekStrip days={item.days} skin="isme" />;
  if (item.kind === 'thCards')
    return (
      /* `.things-card-wrapper` (Job Openings) — a 24px-gap row (a column at <=767) of `.th-card`s: 564 tall,
         up to 396 wide (full width at <=767), p 56/40/0, the stylesheet's colour + artwork at 50% 100%;
         `.th-number` 32px/1.5 500 mb16, `.th-title` 32px/1.4 500 mb15, white */
      <div className="flex gap-6 max-md:flex-col">
        {item.cards.map((c, i) => (
          <div
            key={i}
            className="h-[564px] w-full max-w-[396px] bg-[length:auto] bg-[position:50%_100%] bg-no-repeat px-10 pt-14 text-white max-md:max-w-none"
            style={{ backgroundColor: c.bg, backgroundImage: c.image ? `url(${c.image})` : undefined }}
          >
            <div className="mb-4 text-[32px] font-medium leading-[1.5]">{c.num}</div>
            <div className="mb-[15px] text-[32px] font-medium leading-[1.4]">{withBreaks(c.title)}</div>
          </div>
        ))}
      </div>
    );
  if (item.kind === 'spotlightImage')
    return (
      /* `.spotlight-image` — the photograph at its own size (its 1366w `sizes` slot), never stretched; max-width 100%, mt56 at every width */
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={item.image.src} srcSet={item.image.srcSet} sizes={item.image.sizes} alt={item.image.alt || ''} loading="lazy" className="relative mt-14 block max-w-full" />
    );
  if (item.kind === 'careerVideo')
    return (
      /* `.career-video` (Job Openings) — the photograph full-bleed at its own ratio */
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={item.image.src} srcSet={item.image.srcSet} sizes={item.image.sizes} alt={item.image.alt || ''} loading="lazy" className="block h-auto w-full max-w-full" />
    );
  if (item.kind === 'openings')
    return (
      /* `.opening-wrapper` (Job Openings) — the heading row and "No jobs currently" (16px/1.5 700 black,
         mt24), pb53. The search form and the three `.opening-card`s are `display: none` upstream and are
         not rendered. */
      <div className="pb-[53px]">
        <div className="flex items-center justify-between">
          <h2 className={cx(H2, 'm-0')}>{item.heading}</h2>
        </div>
        <div className="mt-6 text-base font-bold leading-[1.5] text-black">{item.empty}</div>
      </div>
    );
  if (item.kind === 'transferMarquee')
    return (
      /* `.swiper.marquee-swiper` of `.transfer-card`s (Success Snapshot) — 282 x 388, 20px apart, linear */
      <div className="overflow-hidden">
        <MarqueeTrack>
          {item.cards.map((c, i) => (
            <div key={i} className="mr-5 flex-none">
              <TransferCard person={c} logoKind={c.logoKind} skin="isme" />
            </div>
          ))}
        </MarqueeTrack>
      </div>
    );
  if (item.kind === 'tabSwipers')
    return (
      /* `.rounded-tabs-mint` whose panes are each one carousel; `.mrgtp32` is 32px of top padding, 16 at
         <=479 */
      <TabPanes
        bare
        idPrefix="isme-learning"
        label="Learning"
        contentClassName={cx('relative text-lg', (item.contentMods || []).includes('mrgtp32') ? 'pt-8 max-sm:pt-4' : 'pt-14 max-md:pt-10')}
        tabs={item.tabs.map((t) => ({ label: t.label, content: t.items.map((it, j) => <Item key={j} item={it} />) }))}
      />
    );
  if (item.kind === 'numberGrid') return <NumberGrid item={item} />;
  if (item.kind === 'motionBand')
    return (
      /* `.motion-card-wrapper` (Life) — a full-bleed `.zoom-slider`, mt56 (20 at <=767), of `.port-card-b`
         cards (inside their slides) or `.motion-card` slides */
      <div className="mt-14 max-md:mt-5">
        <ZoomSlider label="Gallery">
          {item.cards.map((c, i) => (c.kind === 'motion' ? <MotionCard key={i} card={c} variant="isme" /> : <PortCardB key={i} card={c} />))}
        </ZoomSlider>
      </div>
    );
  if (item.kind === 'shapingWrap')
    return (
      /* `.shaping-wrapper` — pt56 (40 at <=767, 20 at <=479) over the stacked `.card-content-b`s */
      <div className={SHAPING_WRAPPER}>
        {item.items.map((it, i) => (
          <InContainer key={i} item={it} />
        ))}
      </div>
    );
  if (item.kind === 'portJ')
    return (
      /* `.social-act-wrapper` (Parents Corner's Upgrad) — flex, gap 24, start, pt56; a column at <=767 —
         of the square `.port-card-j-wrap` (ISDI PortCardJ's `atlas` form) */
      <div className="flex items-start justify-start gap-6 pt-14 max-md:flex-col">
        {item.cards.map((c, i) => (
          /* the ISME sheet colours `.port-card-j-text-1(-2)` #07f6a0 (Parents Corner and Non-Mumbai, measured) */
          <PortCardJ key={i} card={c} variant="atlas" subtitleTone="mint" />
        ))}
      </div>
    );
  if (item.kind === 'mosaic') return <PhotoMosaic cells={item.cells} rounded="none" />;
  if (item.kind === 'mapTabs')
    return (
      /* `.rounded-tabs-mint` whose panes are single photographs (Campus' map); `.padtp32` is 32 at every width */
      <TabPanes
        bare
        tone="mintWhite"
        idPrefix="isme-map"
        label="Beyond campus"
        contentClassName={cx('relative text-lg', (item.contentMods || []).includes('padtp32') ? 'pt-8' : 'pt-14 max-md:pt-10')}
        tabs={item.tabs.map((t) => ({
          label: t.label,
          content: (
            /* the photographs keep their natural 1239px width (no `w-full`): from 1536 up the frame is wider */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={t.image.src} srcSet={t.image.srcSet} sizes={t.image.sizes} alt={t.image.alt || ''} loading="lazy" className="block max-w-full" />
          ),
        }))}
      />
    );
  if (item.kind === 'logoTabs') return <LogoTabs item={item} label="Our Recruitment Partners" />;
  if (item.kind === 'imageStrip') return <ImageStrip item={item} />;
  if (item.kind === 'cardWall') return <CardWall item={item} />;
  if (item.kind === 'galleryInline') return <GalleryInline item={item} />;
  if (item.kind === 'careerGrid' && item.law)
    return (
      /* department-of-finance's `.career-sup-wrapper` — its own <style>: gap 22, pt56 at every width */
      <div className="flex flex-wrap items-start justify-center gap-[22px] pt-14">
        {item.cards.map((c, i) => (
          <CareerSupportCard key={i} skin="law" card={{ ...c, background: '#193e90', backgroundPosition: '50% 100%' }} />
        ))}
      </div>
    );
  if (item.kind === 'careerGrid' && item.isme)
    return (
      /* `.career-sup-wrapper` (Success Snapshot) — a centred wrapping row, gap 22, pt56 (40 at <=767) */
      <div className="flex flex-wrap items-start justify-center gap-[22px] pt-14 max-md:pt-10">
        {item.cards.map((c, i) => (
          <CareerSupportCard key={i} skin="isme" card={{ ...c, background: '#0b2b73' }} />
        ))}
      </div>
    );
  if (item.kind === 'startupBlock')
    return (
      /* `.startup-bg-block` (Success Snapshot) — 602 tall over startup-bg.png at 0 0 (auto); 400 tall,
         centred and `cover` at <=767; the `.startup-hd-text` plate 46px above the bottom-left: #07f6a0,
         #072058 24px/32 700, p 16/26/18 (18px/1.5 at <=767) */
      <div
        className="relative mt-14 h-[602px] bg-[length:auto] bg-[position:0_0] max-md:h-[400px] max-md:bg-cover max-md:bg-center max-md:bg-no-repeat"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <div className="absolute bottom-[46px] left-0 bg-atlas-mint px-[26px] pb-[18px] pt-4 text-[24px] font-bold leading-8 text-[#072058] max-md:text-[18px] max-md:leading-[1.5]">
          {withBreaks(item.text)}
        </div>
      </div>
    );
  if (item.kind === 'journeyLarge')
    return (
      /* `.jpurney-card-large` (Success Snapshot) — #072058, mt32: `.journey-year` 28px/1.2 700 pt32 px24
         (22 / pt22 at <=767), the mint `.green-bg-blue-txt-long` chip (#072058 24px/32 700, p 8/24, mt18
         mb10; 18px at <=767), `.journey-desc-large` 14px/1.5 500 pt8 px24, then the photographs in a row
         48px below (`flex: 0 auto`, sharing the width), a centred column at <=767 */
      <div className="mt-8 bg-[#072058] text-white">
        <div className="px-6 pt-8 text-[28px] font-bold leading-[1.2] max-md:pt-[22px] max-md:text-[22px]">{item.year}</div>
        <div className="mb-2.5 mt-[18px] inline-block bg-atlas-mint px-6 py-2 text-[24px] font-bold leading-8 text-[#072058] max-md:text-[18px]">{item.chip}</div>
        <div className="px-6 pt-2 text-[14px] font-medium leading-[1.5]">{withBreaks(item.desc)}</div>
        <div className="mt-12 flex max-md:flex-col max-md:items-center max-md:justify-center">
          {item.images.map((im, i) => (
            <div key={i} className="flex-initial">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} srcSet={im.srcSet} sizes={im.sizes} alt={im.alt || ''} loading="lazy" className="block max-w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  if (item.kind === 'careerGrid')
    return (
      /* `.common-flex-26-wrap` of `.career-sup-card.ugdx` (Internationalisation) — the ATLAS card; the
         two washes `.atlas-bg-1/2` are #41418e under incub-bg-1 / Vector (2) at 50% 100% */
      <div className={CAREER_CARD_ROW}>
        {item.cards.map((c, i) => (
          <CareerSupportCard
            key={i}
            titleVariant="poppins"
            card={{
              ...c,
              background: '#41418e',
              backgroundImage: c.tone === 'atlas-bg-2' ? '/assets/images/campus/cards/vector-2-.png' : '/assets/images/campus/cards/incub-bg-1.png',
              backgroundPosition: '50% 100%',
              badge: c.link ? { src: '/assets/icons/arrow-downward.svg', alt: '' } : null,
            }}
          />
        ))}
      </div>
    );
  if (item.kind === 'h2') return <ContentH2 item={item} />;
  if (item.kind === 'applicants') return <Applicants item={item} />;
  if (item.kind === 'expCards') return <ExpCards item={item} />;
  /* `.slide-wrap` inside a section — the IX2 marquee, clipped by the section */
  if (item.kind === 'logoStrip') return <LogoStrip logos={item.logos} />;
  /* `.grid-gallery-flex.sm > .inst-img-wrap` (Entrepreneurship's "All the backing you need") — square on ISME */
  if (item.kind === 'photoColumns') return <PhotoColumns columns={item.columns} rounded="none" />;
  if (item.kind === 'collage') return <Collage item={item} />;
  if (item.kind === 'process') return <ProcessCards item={item} />;
  if (item.kind === 'contentB') return <ShapingCard card={item.card} />;
  if (item.kind === 'logoGrid') return <div className="mt-0"><LogoGrid logos={item.logos} /></div>;
  if (item.kind === 'pubs')
    return (
      /* `.publication-wrapper` — wrap, gap 24 (centred at <=767) */
      <div className="flex flex-wrap items-stretch justify-start gap-6 max-md:justify-center">
        {item.cards.map((c, i) => (
          <PaperCard key={i} paper={c} skin="isme" />
        ))}
      </div>
    );
  if (item.kind === 'headRow')
    return (
      <HeadWrap
        heading={item.heading}
        sub={item.sub}
        button={item.button}
        align={(item.mods || []).includes('top') ? 'top' : 'base'}
        margin={(item.mods || []).includes('mrgbtm') ? 'mrgbtm' : undefined}
        headingMb={(item.headingMods || []).includes('mrg16') ? 'mb-4 max-md:mb-2' : undefined}
        /* `.sub-heading.mrgbtm` (Internationalisation's "Your Global Journey"): pb56, 20 from 991, … */
        subClass={
          (item.subMods || []).includes('sub-heading-1')
            ? /* `.sub-heading-1` (Parents Corner's Upgrad) — 18px/1.8 300, pr50; pr0 and 1.5 at <=767 */
              'pr-[50px] text-[18px] font-light leading-[1.8] max-md:pr-0 max-md:leading-[1.5]'
            : (item.subMods || []).includes('mrgbtm')
              ? SUB_INNER_MRGBTM
              : undefined
        }
      />
    );
  if (item.kind === 'bgVideo')
    return (
      /* `.center-image-full-wrap.mrgtp > .bg-banner-video` — a 500px Webflow background video */
      <div className="relative mb-[5px] mt-14 h-[500px] overflow-hidden max-md:mt-10">
        <InViewVideo sources={item.video.sources} poster={item.video.poster} className="absolute inset-0 h-full w-full" />
      </div>
    );
  if (item.kind === 'electiveGrid') {
    /* `.skills-electives-wrapper` around the tab set (the programme overviews): pt56, 24 at <=767,
       0 with `.padtp0` */
    const wrap = item.wrapMods ? (item.wrapMods.includes('padtp0') ? '' : 'pt-14 max-md:pt-6') : null;
    const grid = (
      <TabPanes
        bare
        idPrefix="isme-electives"
        label="Electives"
        contentClassName={cx('relative text-lg', (item.contentMods || []).includes('padtp32') ? 'pt-8' : 'pt-14 max-md:pt-10')}
        tabs={item.tabs.map((t) => ({
          label: t.label,
          content: (
            /* `.electives-card-wrapper` — wrap, gap 16; two columns at <=767 */
            <div className="flex flex-wrap gap-4 max-md:grid max-md:grid-cols-2">
              {t.cards.map((c, i) => (
                <MinorCard key={i} card={c} variant="isme" />
              ))}
            </div>
          ),
        }))}
      />
    );
    return wrap == null ? grid : <div className={wrap}>{grid}</div>;
  }
  if (item.kind === 'trTabs')
    return (
      <div className="mt-14">
        <TertiaryTabs idPrefix="isme-welfare" label="Student Welfare" rounded={false} tabs={item.tabs.map((t) => ({ label: t.label, image: t.image, title: t.title, text: Array.isArray(t.text) ? t.text.map((r) => (typeof r === 'string' ? r : r.strong)).join('') : t.text }))} />
      </div>
    );
  /* `.people-details` (About's Leadership Team) — ISDI's row on the ISME skin */
  if (item.kind === 'people') return <LeaderRow person={item} last={(item.mods || []).includes('padbtm0')} skin="isme" />;
  return null;
}

/* Group consecutive non-carousel items into one container; carousels sit beside it so they bleed. */
/* `.container-16` (Non-Mumbai) — a Webflow `.w-container`: 1366px with the sheet's padding, NOT the
   Tailwind ladder that `.container` follows on ISME pages */
const WIDE_CONTAINER = 'relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]';

function Body({ items, container = CONTAINER }) {
  const out = [];
  let run = [];
  let common = false;
  let runCw;
  const flush = (key) => {
    if (!run.length) return;
    out.push(
      <div key={key} className={container}>
        {/* `.tailor-wrapper` — pt56 with no breakpoint rule */}
        {/* `md40` — department-of-finance's sheet declares no base `.common-wrapper`, only the <=767 pt40 */}
        <div className={cx(common === 'lg' ? COMMON_LG : common === 'tailor' ? 'pt-14' : common === 'md40' ? 'max-md:pt-10' : common && COMMON)}>
          {run.map((it, i) => (
            <InContainer key={i} item={it} />
          ))}
        </div>
      </div>
    );
    run = [];
  };
  items.forEach((it, i) => {
    if (it.kind === 'stats') {
      /* `.top-cards-wrapper` authored inside a section, outside its container (full width) */
      flush(`t${i}`);
      out.push(
        <IsmeStats key={`i${i}`} b={it} />
      );
    } else if (it.kind === 'subsection') {
      /* a `section.section` nested in a band keeps its own 60 / 40 padding */
      flush(`s${i}`);
      out.push(
        <section key={`i${i}`} className={SECTION}>
          <Body items={it.items} />
        </section>
      );
    } else if (it.bleed) {
      /* an item authored outside the band's `.container` (career services' strip) */
      flush(`b${i}`);
      out.push(<InContainer key={`i${i}`} item={it} />);
    } else if (CAROUSELS.has(it.kind)) {
      flush(`c${i}`);
      /* a carousel that opens its own `.common-wrapper` (nothing before it in that wrapper) takes the
         wrapper's padding — career services' "Brands that Back our Students" */
      const prev = i > 0 ? items[i - 1] : null;
      const opens = it.common && !(prev && prev.common && (it.cw === undefined || prev.cw === it.cw));
      out.push(
        opens ? (
          <div key={`i${i}`} className={it.common === 'lg' ? COMMON_LG : it.common === 'md40' ? 'max-md:pt-10' : COMMON}>
            <Item item={it} />
          </div>
        ) : (
          <Item key={`i${i}`} item={it} />
        )
      );
    } else {
      /* a new `.common-wrapper` (its own `cw` id) starts a new group, so each keeps its padding */
      if (run.length && it.cw !== undefined && it.cw !== runCw) flush(`w${i}`);
      if (!run.length) {
        common = it.common === 'lg' || it.common === 'tailor' || it.common === 'md40' ? it.common : !!it.common;
        runCw = it.cw;
      }
      run.push(it);
    }
  });
  flush('end');
  return out;
}

/*
 * A plain `section(.extraspace) > .container > (h2.h2-tag(.mrg16|.mrgtbm0), …items)` — the Summer
 * School's four middle sections. `.extraspace` is pt120 (40 at <=767); the h2's margin follows its
 * modifier (56 -> 32 at <=767 bare; 16 -> 8 `.mrg16`; 0 `.mrgtbm0`).
 */
/* `.mrg24` is a compound selector, so its 24px survives the <=767 `.h2-tag` rule */
const H2_MB = { mrg16: 'mb-4 max-md:mb-2', mrgtbm0: 'mb-0', mrgbtm0: 'mb-0', mrg32: 'mb-8', mrg24: 'mb-6' };

export function PlainSection({ data, block }) {
  const mb = H2_MB[(data.headingMods ?? []).find((m) => H2_MB[m])] ?? 'mb-14 max-md:mb-8';
  return (
    <section
      data-block={block}
      id={data.id || undefined}
      className={
        data.extraspace
          ? 'block overflow-hidden pb-[60px] pt-[120px] max-md:py-10'
          : data.sectionMods?.includes('padtp0')
            ? 'block overflow-hidden pb-[60px] pt-0' /* `.section.padtp0` — beats the <=767 rule */
            : SECTION
      }
    >
      {/* PG overview: `section > .common-wrapper > .container` — the wrapper's pt56 (40) sits outside
          the heading and the content alike */}
      <div className={data.commonOuter ? COMMON : undefined}>
        {data.heading && (
          <div className={data.wide ? WIDE_CONTAINER : CONTAINER}>
            <h2 className={cx(H2, mb)}>{withBreaks(data.heading)}</h2>
          </div>
        )}
        <Body items={data.items} container={data.wide ? WIDE_CONTAINER : CONTAINER} />
      </div>
    </section>
  );
}

export function IsmeIconSection({ data, block }) {
  const tone = data.wrap === 'blue' || data.wrap === 'white>blue' ? 'blue' : data.wrap === 'white' ? 'white' : 'none';
  return (
    <IconSection
      id={data.id || undefined}
      block={block}
      icon={data.icon}
      num={data.num}
      title={withBreaks(data.title)}
      iconHd={!!data.iconHd}
      numSm={!!data.numSm}
      wrapPad={!data.wrapPad0}
      bp768={!!data.mobile768}
      before={data.before?.length ? <Body items={data.before} /> : null}
      tone={tone}
      skin="isme"
      /* `.section.extraspace` — pt120 (40 at <=767) */
      sectionClassName={data.extraspace ? 'block overflow-hidden pb-[60px] pt-[120px] max-md:py-10' : undefined}
      headingAfter={
        data.button?.shape === 'secondary' ? (
          /* `.mobile-ico-button > a.secondary-btn` — the ISME header's circle rule targets
             `.button-regular` only, so this pill keeps its label at every width */
          <div>
            <SecondaryButton href={data.button.href} variant="isme-mint">
              {data.button.label}
            </SecondaryButton>
          </div>
        ) : data.button?.mobileIco ? (
          <MobileIcoButton button={data.button} circleAt={data.mobile768 ? '768' : undefined} />
        ) : data.button?.npf ? (
          <NpfPopupButton widget={data.button.npf} />
        ) : null
      }
      after={data.after ? <Body items={data.after} /> : null}
    >
      <Body items={data.items} />
    </IconSection>
  );
}
