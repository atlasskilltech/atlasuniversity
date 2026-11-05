import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, H2, H2_MB, SECTION, SUB_MRGBTM } from './ui';

/**
 * "Choose your Electives" — port of reference/schools/isdi/index.php:2517-2544.
 *
 *   section.section > .container > h2.h2-tag.mrg16.isdi + .sub-heading.mrgbtm
 *     + .why-isdi-wrapper > .swiper.common-swiper-full.mrgtp0 > 2 x .isdi-elective
 *
 * The slider bleeds past `.container` like every `.common-swiper-full`, so it is a
 * `Carousel` beside the container, without autoplay (ISDI's `initCommonSwiper`
 * sets none), with its bullets absolutely placed 30px under the slider below 569.
 *
 * Card, measured:
 *                    >=768px                 568-767           <=479
 *   box              600 x 295 (x 300 for    content width,     max-width 360,
 *                    `.bg-2`), r24,          x 500              x 430
 *                    p40/42/0/42             p22/22/40/22
 *   paint            the photo pinned bottom-right, `background-blend-mode:
 *                    luminosity` over #1a53ef (`.bg-2`: #0a46ca)
 *   title            32px/600, line-height .5, 12px #ec1376 underline, mb24
 *                                            24px/1
 *   text             18px/1.5 white          16px/1.5
 *
 * `.common-swiper-full .swiper-slide` is 100% of the slider below 569
 * (header.php), which a content-sized carousel item cannot express, so the slide
 * wrapper takes the container width there explicitly. The slides are vertically
 * centred in the track (`.swiper-wrapper { align-items: center }`), which is what
 * puts the 295px card 2.5px below the 300px one.
 */

/* ref .isdi-elective (+ .bg-2) */
const CARD =
  'w-full rounded-3xl bg-no-repeat bg-[position:100%_100%] bg-blend-luminosity pl-[42px] pr-[42px] pt-10 ' +
  'min-w-[600px] max-w-[600px] ' +
  'max-md:min-h-[500px] max-md:max-h-[500px] max-md:min-w-full max-md:max-w-full max-md:px-[22px] max-md:pb-10 max-md:pt-[22px] ' +
  'max-sm:w-auto max-sm:min-w-0 max-sm:max-w-[360px] max-sm:min-h-[430px]';

const VARIANT = {
  default:
    "bg-[#1a53ef] bg-[url('/assets/images/schools/isdi/home/electives/ATLAS-Electives-1.png')] min-h-[295px] max-h-[295px] max-sm:max-h-[4430px]",
  'bg-2':
    "bg-[#0a46ca] bg-[url('/assets/images/schools/isdi/home/electives/program-electives.png')] min-h-[300px] max-h-[300px] max-sm:max-h-[430px]",
};

/* also rendered by /programs/undergraduate's "#5 Multidisciplinary" section, whose
   two cards are this same `.isdi-elective` pair */
export function ElectiveCard({ card }) {
  return (
    <div className="flex h-full flex-col justify-center max-mcm:w-[calc(100vw-44px)]">
      <div className={cx(CARD, VARIANT[card.bg || 'default'])}>
        {/* ref .elective-title */}
        <div className="mb-6 inline-block border-0 border-b-[12px] border-solid border-[#ec1376] text-[32px] font-semibold leading-[.5] text-white max-md:text-[24px] max-md:leading-none">
          {card.title}
        </div>
        {/* ref .elective-content > .text-elective */}
        <div className="flex flex-col gap-5 text-[18px] leading-[1.5] text-white">
          <div className="max-md:text-base">
            {card.text.map((run, i) =>
              typeof run === 'string' ? (
                <span key={i}>{withBreaks(run)}</span>
              ) : (
                <strong key={i} className="font-bold">
                  {withBreaks(run.strong)}
                </strong>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Electives({ data }) {
  return (
    <section data-block="electives" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB_MRGBTM}>{data.sub}</div>
      </div>
      {/* ref .why-isdi-wrapper > .swiper.common-swiper-full.mrgtp0 */}
      <Carousel autoplay={false} bullets="isdi-overlay">
        {data.cards.map((card) => (
          <ElectiveCard key={card.title} card={card} />
        ))}
      </Carousel>
    </section>
  );
}
