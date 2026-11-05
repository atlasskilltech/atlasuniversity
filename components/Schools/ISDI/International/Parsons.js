import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';
import { Runs, YouTubeFrame } from './ui';

/**
 * "13+ Years of Collaboration with Parsons School of Design, New York"
 * (`atlas-isdi-advantage/internationalisation/index.php:135-143`).
 *
 *   section.section > .container-15 >
 *     (h2#animate.h2-tag.mrg16.isdi, .sub-heading,
 *      .center-image-full-wrap.mrgtp.isdi > .w-embed-youtubevideo > iframe)
 *
 * The lead is one `<strong>` sentence followed by a plain one, so it travels as runs.
 *
 * **`id="animate"` is not rendered.** Three of this page's `h2`s carry it — the same
 * DOM id three times — and nothing on the page reads it: there is no trailing
 * `<script>`, and webflow.js drives IX2 off `data-w-id`, not off this. Dropping it is
 * the call every duplicate id in this rebuild has had.
 */
export default function Parsons({ data }) {
  return (
    /* ref section.section */
    <section data-block="parsons" className={SECTION}>
      {/* ref .container-15 */}
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={SUB}>
          <Runs value={data.sub} />
        </div>
        <YouTubeFrame video={data.video} />
      </div>
    </section>
  );
}
