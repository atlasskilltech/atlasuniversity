import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * `.port-card-m-wrap.isdi` — a portrait with a coloured name bar across its foot and a
 * triangular notch over the bar's top edge.
 *
 * It is NOT the ATLAS `components/ui/PortCardM` (`.port-card-m-wrap-atlas`, 295x520 with
 * `32px 0` corners and an indigo bar). Extracted from `ProgramsUg/WhyDesign` when
 * /atlas-isdi-advantage's "Strongly Industry Oriented" tabs turned out to use the same
 * card; measured identical on both references at 1440 / 768 / 390, and it does not move
 * with width:
 *
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

export default function FacultyCard({ card }) {
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

