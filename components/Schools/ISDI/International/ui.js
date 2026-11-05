import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * The small shapes /schools/isdi/atlas-isdi-advantage/internationalisation repeats.
 * Each measured on production at 1440 / 1280 / 991 / 767 / 479 / 390.
 */

/* ref .container-15 — identical in every measured property to the ATLAS `CONTAINER`
   (`.container`): 1366 max-width, 62 / 30 (<=991) / 22 (<=767) of inset, z-index 1.
   The page uses both class names for the same box, so one string serves both. */
export { CONTAINER } from '../Home/ui';

/* ref .common-wrapper — pt50 */
export const COMMON_WRAPPER = 'pt-[50px]';

/* ref .common-wrapper-lg — pt100 */
export const COMMON_WRAPPER_LG = 'pt-[100px]';

/* ref .blue-desc-wrap(.mrgbtm) — row, space-between, top-aligned, pt56 (40 at <=767);
   a column with an 8px gap at <=479. `.mrgbtm` adds 42px of bottom padding. */
export const BLUE_DESC_WRAP =
  'flex items-start justify-between pt-14 max-md:pt-10 max-sm:flex-col max-sm:gap-2';
export const BLUE_DESC_WRAP_MRGBTM = cx(BLUE_DESC_WRAP, 'pb-[42px]');

/* ref .blue-desc-text — `flex: 1 1 0`, 24px/1.5 white; 18px at <=767. It is the
   wrap's only child, so the grow is what makes it the full 1242px: `basis-0` alone
   collapsed it to its min-content and made the block 576px taller. */
export const BLUE_DESC_TEXT = 'flex-1 basis-0 text-[24px] leading-[1.5] max-md:text-[18px]';

/* ref .head-wrap(.mrgbtm) — row, space-between, bottom-aligned; a stretched column
   at **<=767** (`.mrgbtm` adds `justify-content: flex-start` there). `.mrgbtm` is
   56px of bottom margin, 20px at <=767. */
export const HEAD_WRAP = 'flex items-end justify-between max-md:flex-col max-md:items-stretch';
export const HEAD_WRAP_MRGBTM =
  'mb-14 flex items-end justify-between max-md:mb-5 max-md:flex-col max-md:items-stretch max-md:justify-start';

/* ref .tt-wrap — `flex: 0 1 auto` (the flex default) above 767, `margin-bottom: 20px` from 767 down and
   `margin-right: 20px` only from **479** down. The two margins turn at different
   widths: missing the bottom one cost 20px of block height everywhere below 768, and
   carrying the right one up to 767 narrowed the lead by 20px between 480 and 767,
   which was +24 of wrapped text on the Masters block at 568. */
export const TT_WRAP = 'flex-initial max-md:mb-5 max-sm:mr-5';

/**
 * `.center-image-full-wrap.mrgtp(.isdi) > .w-embed-youtubevideo > iframe` — the
 * page's three YouTube embeds. The frame's height is its own inline
 * `padding-top` percentage, which is **56.17021276595745%** on all three rather
 * than a round 16:9, so it is transcribed rather than rounded. `.mrgtp` is
 * mt56 (40 at <=767) / mb5 and clips; `.isdi` adds the 16px radius.
 *
 * Unlike /atlas-isdi-advantage's Parsons embed, these are bare
 * `youtube.com/embed/…` URLs, not embedly wrappers.
 */
export function YouTubeFrame({ video, rounded = true }) {
  return (
    /* ref .center-image-full-wrap.mrgtp(.isdi) */
    <div className={cx('relative mb-[5px] mt-14 overflow-hidden max-md:mt-10', rounded && 'rounded-2xl')}>
      {/* ref .w-embed-youtubevideo */}
      <div className="relative w-full" style={{ paddingTop: `${video.paddingTop}%` }}>
        <iframe
          src={video.src}
          title={video.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="lazy"
          frameBorder="0"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}

/**
 * A `.sub-heading` whose copy mixes plain text and `<strong>` — the Parsons lead is
 * one bold sentence followed by a plain one. A string stays a string.
 *
 * The `<strong>` carries an explicit `font-bold`: the parent is `font-weight: 300`,
 * Webflow's normalize gives `strong` a flat `bold`, and Preflight's relative
 * `bolder` would resolve 300 to 700 as well — the same value here, but stated so
 * the weight does not depend on the parent.
 */
export function Runs({ value }) {
  if (typeof value === 'string') return withBreaks(value);
  return value.map((run, i) =>
    run === null ? (
      <br key={i} />
    ) : typeof run === 'string' ? (
      <span key={i}>{run}</span>
    ) : (
      <strong key={i} className="font-bold">
        {run.strong}
      </strong>
    )
  );
}
