import { cx } from '@/lib/cx';
import ApplicationPanel, { APPLICATION_SECTION, APPLICATION_TEXT } from '../ApplicationPanel';
import { CONTAINER, H2, H2_MB, SECTION, SUB_MRGBTM } from '../Home/ui';

/**
 * "Why Join ISDI-Parson Summer School?" —
 *
 *   div.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading.mrgbtm,
 *     .application-section > 2 x .isdi-application-wrap > .isdi-application(.isdi-pink) >
 *       .isdi-application-content > (.isdi-application-text, ul.summer-school-list >
 *         li.summer-s-lists))
 *
 * The panel is `../ApplicationPanel`, the same box the ISDI homepage's closing banners use —
 * this section fills it with a bulleted list where the homepage puts two buttons. The one
 * thing that differs from that section is its wrapper: this is a `div.section` inside a
 * `.container`, under a heading.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   list              mt42, pl30, mb10 (Webflow's own      20px
 *                     `ul` margin), 24px/1.5 white, disc
 *   item              `display: list-item`, inheriting the list's size
 *
 * Preflight zeroes list padding, the marker and the `ul` margin, so all four are restated.
 */
export default function WhyJoin({ data }) {
  return (
    <div data-block="why-join" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB_MRGBTM}>{data.sub}</div>

        {/* ref .application-section */}
        <div className={APPLICATION_SECTION}>
          {data.panels.map((panel) => (
            <ApplicationPanel key={panel.heading} tone={panel.tone}>
              {/* ref .isdi-application-text */}
              <div className={APPLICATION_TEXT}>{panel.heading}</div>
              {/* ref ul.summer-school-list */}
              <ul className="mb-2.5 mt-[42px] list-disc pl-[30px] text-[24px] text-white max-md:text-[20px]">
                {panel.items.map((item) => (
                  /* ref li.summer-s-lists */
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ApplicationPanel>
          ))}
        </div>
      </div>
    </div>
  );
}
