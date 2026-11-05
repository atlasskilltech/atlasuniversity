import { Fragment } from 'react';
import ButtonRegular from '@/components/ui/ButtonRegular';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';

/**
 * ISME `.pg-card > .program-card-a` — the programme card of the ISME homepage's "Build Your
 * Degree" tabs (reference/schools/isme/index.php). Measured on production at 1440 / 767 / 390:
 *
 *   card          400 wide at every width (the slider is `.common-swiper`, so it does not go
 *                 full-width at <=568 and the card runs past a phone's viewport, as upstream),
 *                 820 tall (720 at <=767); `.pg-mba-card` 980 (800); #2c57b7, clipped, column
 *   image         400 x 350, cover
 *   details       column, padding 32 (24 at <=767), #0b2b73, white, fills the rest
 *   title         24/28.8 700 #07f6a0, mb 8; 20/24 at <=767 — sized to its content
 *   text          16/24, mb 32; mb 20 at <=767; 14/21 at <=479
 *   lists         `.pg-cont` mb 32 / `.pg-el-wrap` (flex, gap 32) mb 46, 10 at <=767, 14 at <=479;
 *                 `.pg-title-sm.green` 16/19.2 600 pb 14 (14/16.8, pb 10 at <=767; 700 at <=479);
 *                 `.pg-list` 16/24 (12/18 at <=767, 14/21 at <=479); the specialisation row wraps
 *                 with an 8px gap and 6px mint squares between entries
 *   button        `.btn-wraper` pushed to the bottom (`margin-top: auto`); `mint-medium` pill
 *
 * `card.size === 'lg'` — the box the sheet itself declares, which the PG overview
 * (programs/postgraduate/postgraduate-programs.php) keeps because, unlike the homepage and the UG
 * overview, its own <style> does not restate `.pg-card`: 544 x 745 over a 200px image; 400 x 580 over
 * 150 at <=767; 350 x 690 at <=479. Every type value is the same.
 *
 * `card.size === 'lgFixed'` — department-of-finance restates `.pg-card`, `.pg-image`, `.pg-details`,
 * `.pg-title`, `.course-txt` and `.pg-el-wrap` in its own <style>, after the sheet and with no media
 * query, so the 544 x 745 box, the 200px image, p32, the 24px title and the 32 / 46 gaps hold at every
 * width (measured at 1440 / 768 / 390); only the lead and list sizes still follow the sheet.
 */
const LIST = 'text-base leading-6 max-md:text-[12px] max-md:leading-[18px] max-sm:text-[14px] max-sm:leading-[21px]';
const SM_TITLE =
  'pb-[14px] text-base font-semibold leading-[1.2] text-atlas-mint max-md:pb-2.5 max-md:text-[14px] max-sm:font-bold';

export default function ProgramCard({ card }) {
  const img = card.image;
  const fixed = card.size === 'lgFixed';
  return (
    /* ref .pg-card(.pg-mba-card) > .program-card-a */
    <div
      className={cx(
        'relative flex flex-col items-start justify-start overflow-hidden bg-[#2c57b7] text-white',
        card.size === 'lgFixed'
          ? 'h-[745px] w-[544px]'
          : card.size === 'lg'
          ? 'h-[745px] w-[544px] max-md:h-[580px] max-md:w-[400px] max-sm:h-[690px] max-sm:w-[350px]'
          : cx('w-[400px]', card.mba ? 'h-[980px] max-md:h-[800px]' : 'h-[820px] max-md:h-[720px]'),
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- the reference's own srcset */}
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes={img.sizes}
        width={img.width}
        height={img.height}
        alt=""
        loading="lazy"
        className={cx('block w-full flex-none object-cover', card.size === 'lgFixed' ? 'h-[200px]' : card.size === 'lg' ? 'h-[200px] max-md:h-[150px]' : 'h-[350px]')}
      />
      {/* ref .pg-details */}
      <div className={cx('flex w-full flex-1 flex-col items-start justify-start bg-[#0b2b73] p-8', fixed ? '' : 'max-md:p-6')}>
        <h3 className={cx('mb-2 text-[24px] font-bold leading-[1.2] text-atlas-mint', !fixed && 'max-md:text-[20px]')}>
          {withBreaks(card.title)}
        </h3>
        {card.text && (
          <div className={cx('mb-8 text-base leading-6 max-sm:text-[14px] max-sm:leading-[21px]', !fixed && 'max-md:mb-5')}>
            {withBreaks(card.text)}
          </div>
        )}
        {card.specialisation && (
          /* ref .pg-cont */
          <div className="mb-8 w-full">
            <div className={SM_TITLE}>{card.specialisation.title}</div>
            {/* ref .pg-list-wrap */}
            <div className="flex flex-wrap items-center gap-2">
              {card.specialisation.items.map((it, i) =>
                it === '|' ? (
                  /* ref .rect-mint */
                  <div key={i} className="h-1.5 w-1.5 bg-atlas-mint" />
                ) : (
                  <div key={i} className={LIST}>
                    {it}
                  </div>
                ),
              )}
            </div>
          </div>
        )}
        {/* ref .pg-el-wrap */}
        <div className={cx('mb-[46px] flex items-start justify-start gap-8', !fixed && 'max-md:mb-2.5 max-sm:mb-[14px]')}>
          {card.eligibility.map((e, i) => (
            /* ref .pg-eligible */
            <div key={i}>
              <div className={SM_TITLE}>{e.title}</div>
              {e.items.map((it, j) => (
                <Fragment key={j}>
                  <div className={LIST}>{withBreaks(it)}</div>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
        {/* ref .btn-wraper */}
        <div className="mt-auto">
          <ButtonRegular href={card.button.href} variant="mint-medium">
            {card.button.label}
          </ButtonRegular>
        </div>
      </div>
    </div>
  );
}
