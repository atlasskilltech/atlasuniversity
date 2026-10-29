import IconSection from '../About/IconSection';
import { CONTAINER, SUB } from '../Home/ui';
import { COMMON_WRAPPER, Runs, YouTubeFrame } from './ui';

/**
 * "Meet the World's Best Universities On Our Campus"
 * (`atlas-isdi-advantage/internationalisation/index.php:947-964`).
 *
 *   section#global-education-fair.section >
 *     .icon-heading
 *     .blue-wrapper.isdi-blue-5 > .common-wrapper > .container >
 *       (.sub-heading, .center-image-full-wrap.mrgtp.isdi)
 *
 * The only one of the five banded sections whose lead is a plain `.sub-heading`
 * rather than a `.blue-desc-wrap` — so it is 24px/1.4 (16px at <=767) with the
 * `.sub-heading` padding, not the 24px/1.5 the other two use. Its `.common-wrapper`
 * sits OUTSIDE the container here and inside it elsewhere; the 50px of top padding
 * is the same either way.
 *
 * Its `.icon-image` plate holds `location.png`, not the `location.svg` the three
 * sections above it share.
 */
export default function GedFair({ data }) {
  return (
    <IconSection
      id="global-education-fair"
      block="ged-fair"
      icon={data.icon.image}
      title={data.icon.title}
    >
      {/* ref .common-wrapper */}
      <div className={COMMON_WRAPPER}>
        {/* ref .container */}
        <div className={CONTAINER}>
          <div className={SUB}>
            <Runs value={data.sub} />
          </div>
          <YouTubeFrame video={data.video} />
        </div>
      </div>
    </IconSection>
  );
}
