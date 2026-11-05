import { CONTAINER, H2 } from '@/components/Home/SectionHead';

/**
 * ISME homepage "ISME Outcomes" heading — `div.common-wrapper > .container > h2.h2-tag.mrg32.mrgtp`
 * (reference/schools/isme/index.php). Measured: the wrapper pads 56 above (40 at <=767); the
 * heading carries `margin: 64px 0 32px`, and its bottom margin collapses out of the wrapper into
 * the stack below. The `.outcome-wrap` beside it is `display: none` on production and not ported.
 */
export default function OutcomesHeading({ heading, block = 'outcomes-heading' }) {
  return (
    <div data-block={block} className="pt-14 max-md:pt-10">
      <div className={CONTAINER}>
        <h2 className={`${H2} mb-8 mt-16`}>{heading}</h2>
      </div>
    </div>
  );
}
