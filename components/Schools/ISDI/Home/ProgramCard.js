import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import SmartLink from '@/components/SmartLink';

/**
 * `.program-card` — one programme in "Our Programs" (both tabs). Port of the
 * card markup in reference/schools/isdi/assets/include/pathfinder.php and
 * index.php:1679-1778.
 *
 *                     >=1440        992-1439      768-991       <=767         <=479
 *   card              pt40 pl40, r24, content-sized in a stretched row  pt20 pl20
 *   h3                24px/1.2      20px/1.2 (`.h3-tag.space` beats the 767 rule's 22px)
 *   .program-cont     flex: 1       content-sized                 hidden (0x0)
 *   title + list      24px/600 @ .5; list 16px/2, ul pl26 mb10    display: none
 *   image             h240, width from its own ratio, luminosity   h110 (h150 on
 *                                                                  `-11`)      h155
 *   icon button       54, 40px glyph, 40/40 from the corner        44, 20px glyph, 15/15
 *
 * The per-card differences are the reference's own modifier classes, carried as
 * flags on the data: `padRight` (`.bg-2`: pr40 at <=767), `detailsPad`
 * (`.prog-details.vertical-space1-7`: pt40, pt16 at <=479), `wrapCont`
 * (`.program-cont.vertical-space1-8` flex-wrap + the h150 image), `padLeft479`
 * (`.vertical-space1.bg-5` / `.bg-1.isdi`: pl25 at <=479), `noTitlePad` (the
 * `.vertical-space1-2` heading, which has no <=479 right padding) and `isdi`
 * (`.bg-1.isdi`: the generic `.isdi { border-radius: 16px }` wins).
 *
 * The card colour and the button colour are painted inline by the reference's
 * own scripts from `data-bg-color` / `data-btn-bg`, so they travel as data.
 * `pathways` is either a `<ul>` (Undergraduate) or one `<br>`-separated text
 * block (Postgraduate), exactly as authored.
 */

const CARD =
  'relative flex w-full flex-col items-start justify-between overflow-hidden pl-10 pt-10 text-white max-md:pl-5 max-md:pt-5';

export default function ProgramCard({ card }) {
  const listed = Array.isArray(card.pathways);

  return (
    <div
      className={cx(
        CARD,
        card.isdi ? 'rounded-2xl' : 'rounded-3xl',
        card.padRight && 'max-md:pr-10',
        (card.padLeft479 || card.isdi) && 'max-sm:pl-[25px]'
      )}
      style={{ backgroundColor: card.bg }}
    >
      {/* ref h3.h3-tag.space / .vertical-space1-2 */}
      <h3
        className={cx(
          'm-0 mb-3 text-[20px] font-medium leading-[1.2] text-white 2xl:text-[24px] 2xl:leading-[1.2]',
          !card.noTitlePad && 'max-md:break-words max-sm:pr-[35px]'
        )}
      >
        {withBreaks(card.title)}
      </h3>

      {/* ref .duration-wrap */}
      <div className="flex items-center gap-2">
        {card.duration.map((text, i) => (
          <div key={i} className="font-normal text-white max-md:text-[12px] max-md:leading-[1.5]">
            {text}
          </div>
        ))}
      </div>

      {/* ref .prog-details */}
      <div
        className={cx(
          'flex w-full flex-1 items-end justify-between',
          card.detailsPad && 'pt-10 max-sm:pt-4'
        )}
      >
        {/* ref .program-cont */}
        <div className={cx('2xl:flex-1', card.wrapCont && 'flex flex-wrap')}>
          <div className="text-[24px] font-semibold leading-[1.2] text-white opacity-50 max-md:hidden">
            Career Pathways
          </div>
          <div className="pb-6 pt-2 leading-[2] max-md:hidden">
            {listed ? (
              <ul className="mb-2.5 list-disc pl-[26px]">
                {card.pathways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              withBreaks(card.pathways)
            )}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.image.src}
          width={card.image.width}
          height={card.image.height}
          alt={card.image.alt}
          loading="lazy"
          decoding="async"
          className={cx(
            'h-[240px] w-auto max-w-full font-semibold mix-blend-luminosity max-sm:h-[155px]',
            card.wrapCont ? 'max-md:h-[150px]' : 'max-md:h-[110px]'
          )}
        />
      </div>

      {/* ref .icon-slot > a.icon-button */}
      <div className="absolute right-10 top-10 max-md:right-[15px] max-md:top-[15px]">
        <SmartLink
          href={card.href}
          aria-label={card.ariaLabel || 'View Undergraduate Program Details'}
          className="flex h-[54px] w-[54px] items-center justify-center rounded-[30px] max-md:h-11 max-md:w-11"
          style={{ backgroundColor: card.button }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/icons/arrow-downward.svg"
            width={27}
            height={27}
            alt=""
            loading="lazy"
            className="w-10 leading-[0] max-md:w-5"
          />
        </SmartLink>
      </div>
    </div>
  );
}
