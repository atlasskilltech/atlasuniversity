import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import SmartLink from '@/components/SmartLink';

/**
 * `.card` (Webflow component "card-a") as the ISDI sheet draws it — shared by the
 * ISDI homepage's "Research & Reflections" and the About page's "Thought
 * Leadership" (both the `isdi` variant) and "ATLAS Times" (`type-a`).
 *
 * Measured identical at every width:
 *   card        295 wide, r16, clipped, black text, column; its height is its
 *               content (298 photo + 200 content box, + the border)
 *   photo       298 tall on #8facec, cover
 *   content     p16; title 16px/1.5 600, clipped to 50px (two lines);
 *               date row pt12 pb44, gap 6, 17x18 calendar + 12px date;
 *               "Read now" pill 44 tall, #ec1376, r24, px24, 14px label
 *               (line-height 1.2) + the 27px arrow, gap 5
 *
 *   variant     isdi                         type-a
 *   background  #fff                         #f2f2f2 (its `bg-color` attribute,
 *                                            painted by the card's inline script)
 *   border      1px #d9d9d9 -> 295 x 500     none -> 295 x 498
 */
const VARIANT = {
  isdi: 'border border-solid border-[#d9d9d9] bg-white',
  'type-a': 'bg-[#f2f2f2]',
  /* ref .card(type-b) on the ISME sheet — the ISME homepage's "Thought Leadership": square,
     #f2f2f2, 517 tall, the photo under a #002637 gradient, a 52px title and a mint pill whose
     arrow is inverted to black. Measured at 1440 and 390. */
  isme: 'h-[517px] bg-[#f2f2f2]',
};

export default function CardA({ card, cta, variant = 'isdi', sizes }) {
  return (
    /* ref .card */
    <div className={cx('relative flex w-[295px] flex-col overflow-hidden text-black', variant !== 'isme' && 'rounded-2xl', VARIANT[variant])}>
      {/* ref .c-image */}
      <div className="relative h-[298px] bg-[#8facec]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.image.src}
          srcSet={card.image.srcSet}
          sizes={card.image.srcSet ? sizes : undefined}
          width={card.image.width}
          height={card.image.height}
          alt={card.image.alt}
          loading="lazy"
          decoding="async"
          className="inline-block h-full w-full max-w-full object-cover align-middle"
        />
        {/* ref .card-a-gradient */}
        <div
          className={cx(
            'absolute inset-x-0 bottom-0 h-1/2',
            variant === 'isme' && 'bg-[linear-gradient(0deg,#002637bf,#00263780_17%,#00263700)]',
          )}
        />
      </div>
      {/* ref .content-box */}
      <div className="p-4">
        <div className={cx('overflow-hidden text-ellipsis font-semibold', variant === 'isme' ? 'h-[52px]' : 'h-[50px]')}>{withBreaks(card.title)}</div>
        <div className="flex items-center justify-start gap-1.5 pb-11 pt-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/atlas-news/calendar-icon.svg"
            width={17}
            height={18}
            alt=""
            loading="lazy"
            className="max-w-full align-middle"
          />
          <div className="text-[12px] leading-[1.5]">{card.date}</div>
        </div>
        {/* ref a.button-tertiary */}
        <SmartLink
          href={card.href}
          className={cx(
            'flex h-11 max-w-full items-center justify-center gap-[5px] rounded-3xl px-6 text-left text-[14px] leading-[1.5] no-underline',
            variant === 'isme' ? 'bg-atlas-mint text-black' : 'bg-[#ec1376] text-white',
          )}
        >
          <div className="leading-[1.2]">{cta ?? card.cta}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/icons/arrow-downward.svg"
            width={27}
            height={27}
            alt=""
            loading="lazy"
            className={cx('max-w-full align-middle', variant === 'isme' && 'invert')}
          />
        </SmartLink>
      </div>
    </div>
  );
}
