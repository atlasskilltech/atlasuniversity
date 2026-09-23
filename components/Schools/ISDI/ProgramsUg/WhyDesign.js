import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, H2, SECTION } from '../Home/ui';
import IconHeading from './IconHeading';

/**
 * "Why Design At ISDI?" and, in the same `section.section`, #1 "ATLAS Students Learn
 * from Industry Leaders, not Just Lecturers" — port of
 * reference/schools/isdi/programs/undergraduate/index.php:197-370.
 *
 *   section.section > .container > .top-txt-wrapper (h2 + lead)
 *                   > .icon-heading (#1)
 *                   > .container > .white-desc-wrap > .black-desc-text.isdi
 *                                > .swiper.common-swiper.mrgtp32 > 8 x .port-card-m-wrap.isdi
 *
 * Measured:
 *                        >=768px                       <=767px
 *   h2.h2-tag.mrg32      44px/1.2 400 #1a1a1a, mb32    36px from 991 down
 *   .black-desc-text     24px/32px 300 black           18px/32px — but the first
 *                        lead keeps 24px at every width (see below)
 *   .white-desc-wrap     row, space-between, pt56      column, gap 10, pt20
 *                                                      (gap 8 at <=479)
 *   .common-swiper.mrgtp32  pt32, 24px between cards
 *
 * Card (`.port-card-m-wrap.isdi`, never changes with width — it is NOT the ATLAS
 * `.port-card-m-wrap-atlas` of `components/ui/PortCardM`, which is 295x520 with
 * `32px 0` corners and an indigo bar):
 *   card        295 x 480, r16, clipped
 *   photo       fills the card, cover
 *   logo strip  absolute top, p20/20/0, the company mark at its natural size
 *   bar         absolute bottom 137px tall, p24, #df287b (`isdi-pink-2`) or
 *               #1a53ef (`isdi-blue-5`)
 *   name        24px/1.2 600; role 14px/1.4, pt10
 *   notch       29x21 triangle, 20px above the bar, 30px in, in the bar's colour
 */
const BAR = { pink: 'bg-[#df287b]', blue: 'bg-[#1a53ef]' };
const NOTCH = { pink: 'text-[#df287b]', blue: 'text-[#1a53ef]' };

function FacultyCard({ card }) {
  return (
    /* ref .port-card-m-wrap.isdi */
    <div className="relative flex h-[480px] w-[295px] flex-none items-end justify-center overflow-hidden rounded-2xl text-white">
      {/* ref .pcm-tp-wrap */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.logo.src}
          width={card.logo.width}
          height={card.logo.height}
          alt={card.logo.alt}
          loading="lazy"
          decoding="async"
          className="max-w-full flex-none align-middle"
        />
      </div>

      {/* ref .port-card-m-txt-wrap.isdi-pink-2 / .isdi-blue-5 */}
      <div className={cx('absolute inset-x-0 bottom-0 flex h-[137px] items-end p-6', BAR[card.tone])}>
        {/* ref .port-card-m-detail */}
        <div className="relative w-full flex-none">
          {/* ref .port-card-m-text.isdi */}
          <div className="text-[24px] font-semibold leading-[1.2]">{withBreaks(card.name)}</div>
          {/* ref .port-card-m-posi */}
          <div className="pt-2.5 text-[14px] leading-[1.4]">{withBreaks(card.role)}</div>
        </div>

        {/* ref .port-card-m-arrow — the notch over the bar's top edge */}
        <div className={cx('absolute -top-5 left-[30px] h-6 w-[29px]', NOTCH[card.tone])}>
          <svg
            width="29"
            height="21"
            viewBox="0 0 29 21"
            fill="none"
            aria-hidden="true"
            className="inline-block leading-none"
          >
            <path d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* ref img.port-card-m-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.photo.src}
        width={card.photo.width}
        height={card.photo.height}
        alt={card.photo.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full max-w-full object-cover align-middle"
      />
    </div>
  );
}

export default function WhyDesign({ data }) {
  return (
    <section data-block="why" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .top-txt-wrapper */}
        <div>
          <div className={cx(H2, 'mb-8')}>{data.heading}</div>
          {/* ref .black-desc-text.mrgbtm.isdi — a compound selector (0,3,0), so its
              24px survives the <=767 media query that takes the plain
              `.black-desc-text` to 18px (as the lead under #1 below does) */}
          <div className="mb-14 max-w-full flex-1 text-[24px] font-light leading-[32px] text-black">{data.text}</div>
        </div>
      </div>

      <IconHeading num={data.num} title={data.title} />

      <div className={CONTAINER}>
        {/* ref .white-desc-wrap */}
        <div className="flex items-start justify-between pt-14 text-black max-md:flex-col max-md:gap-2.5 max-md:pt-5 max-sm:gap-2">
          <div className="max-w-full flex-1 text-[24px] font-light leading-[32px] max-md:text-[18px]">
            {withBreaks(data.lead)}
          </div>
        </div>
      </div>

      {/* ref .swiper.common-swiper.mrgtp32 */}
      <div className="pt-8">
        <Carousel autoplay={false} bullets="isdi">
          {data.cards.map((card) => (
            <FacultyCard key={card.name} card={card} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
