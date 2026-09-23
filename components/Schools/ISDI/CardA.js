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
};

export default function CardA({ card, cta, variant = 'isdi', sizes }) {
  return (
    /* ref .card */
    <div className={cx('relative flex w-[295px] flex-col overflow-hidden rounded-2xl text-black', VARIANT[variant])}>
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
        <div className="absolute inset-x-0 bottom-0 h-1/2" />
      </div>
      {/* ref .content-box */}
      <div className="p-4">
        <div className="h-[50px] overflow-hidden text-ellipsis font-semibold">{withBreaks(card.title)}</div>
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
          className="flex h-11 max-w-full items-center justify-center gap-[5px] rounded-3xl bg-[#ec1376] px-6 text-left text-[14px] leading-[1.5] text-white no-underline"
        >
          <div className="leading-[1.2]">{cta ?? card.cta}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/icons/arrow-downward.svg"
            width={27}
            height={27}
            alt=""
            loading="lazy"
            className="max-w-full align-middle"
          />
        </SmartLink>
      </div>
    </div>
  );
}
