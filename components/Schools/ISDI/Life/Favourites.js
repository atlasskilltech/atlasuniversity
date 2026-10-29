import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';

/**
 * Block 16 — "Student favourites".
 *
 *   div.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading,
 *     .swiper.common-swiper > 5 x .port-card-h-wrap.isdi)
 *
 * ── Why not `ui/PortCardH` ────────────────────────────────────────────────
 * That component is the `.atlas` variant: `border-radius: 32px 0`, a `#072058`
 * plate and a mint `.port-card-h-distance`. This page authors `.isdi`, which is a
 * plain 16px radius over a plate that ALTERNATES `#173a87` and `#ec1376` per card,
 * with the distance line in white (`.port-card-h-distance.white`). Same skeleton,
 * every painted value different and a per-card tone the ATLAS one has no concept
 * of — so the card is authored here rather than bolting a second skin onto a
 * finished page's component.
 *
 * Measured on production at 1440 / 768 / 390:
 *   .port-card-h-wrap.isdi    295 x 519, `flex: none`, clipped, r16, white text
 *   img.port-card-h-image     `width: 100%; height: auto`, cover, centred
 *   .port-card-h-txt-wrap     absolute bottom, full width, padding 24, row,
 *     .isdi / .isdi-pink      bottom-aligned; #173a87 / #ec1376
 *   .port-card-h-detail       `flex: none`, width 100%, relative
 *   .port-card-h-text         24px/1.2 400 white
 *   .port-card-h-distance     18px/1.2 700, pt10 — mint on the base class, and
 *     .white                  WHITE here
 *   .port-card-h-arrow        the notch: absolute, top -20 left 30, plate-coloured
 */
const TONE = { blue: 'bg-[#173a87]', pink: 'bg-[#ec1376]' };
const ARROW = { blue: 'text-[#173a87]', pink: 'text-[#ec1376]' };

export default function Favourites({ data, carouselClassName = 'pt-14 max-md:pt-10' }) {
  return (
    <div data-block="favourites" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={SUB}>{withBreaks(data.lead)}</div>
      </div>

      <Carousel label={data.heading} autoplay={false} bullets="isdi"
        className={carouselClassName}>
        {data.cards.map((card, i) => (
          /* ref .port-card-h-wrap.isdi */
          <div
            key={`${i}-${card.title}`}
            className="relative block h-[519px] w-[295px] flex-none items-end justify-center overflow-hidden rounded-2xl text-white"
          >
            {/* ref img.port-card-h-image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image.src}
              alt={card.image.alt}
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full object-cover"
            />
            {/* ref .port-card-h-txt-wrap.<tone> */}
            <div className={cx('absolute inset-x-0 bottom-0 flex w-full items-end p-6',
              TONE[card.tone] ?? TONE.blue)}
            >
              {/* ref .port-card-h-detail */}
              <div className="relative w-full flex-none">
                {/* ref .port-card-h-text */}
                <div className="text-2xl font-normal leading-[1.2] text-white">
                  {withBreaks(card.title)}
                </div>
                {/* ref .port-card-h-distance.white */}
                <div className="pt-2.5 text-[18px] font-bold leading-[1.2] text-white">
                  {withBreaks(card.note)}
                </div>
              </div>
              {/* ref .port-card-h-arrow.<tone> */}
              <div className={cx('absolute -top-5 left-[30px] w-full',
                ARROW[card.tone] ?? ARROW.blue)}
              >
                {/* ref .svg-icon-triangle */}
                <div className="inline-block w-full leading-none">
                  <svg width="29" height="21" viewBox="0 0 29 21" fill="none" aria-hidden="true">
                    <path d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
