import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import IconSection from '../About/IconSection';
import CareerCard from '../CareerCard';
import TransferCard from '../TransferCard';
import { CONTAINER, H2, H2_MB, SUB } from '../Home/ui';
import { COMMON_WRAPPER, COMMON_WRAPPER_LG, HEAD_WRAP_MRGBTM, Runs, SUB_1, TT_WRAP } from './ui';

/**
 * "From Campus To Career - Seamlessly." (`industry-centric-approach.php`,
 * block 13).
 *
 *   section.section > (.icon-heading > (plate, title, a.button-regular),
 *     .container > (.common-wrapper > (.sub-heading-1,
 *                     .career-sup-wrapper > 6 x .career-sup-card.isdi),
 *                   .common-wrapper-lg > (.head-wrap.mrgbtm,
 *                     .transfer-card-wrapper > 8 x .transfer-card.isdi)))
 *
 * **The icon heading carries a button.** It is `a.button-regular` on the variant
 * `fae6c071…`, which `ui/ButtonRegular` already draws, so `IconSection` takes an
 * optional `after` slot inside the heading row rather than a new shape.
 *
 * `.career-sup-wrapper` is a centred wrapping flex row, gap 22, pt56 (40 at <=767).
 * Its card is the shared `../CareerCard`; the eight closing portraits are the
 * shared `../TransferCard`, whose logo here is a bare `<img>` with no class.
 */
export default function Career({ data, button }) {
  return (
    <IconSection
      block="career"
      icon={data.icon.image}
      title={data.icon.title}
      tone="none"
      headingAfter={button}
    >
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className={COMMON_WRAPPER}>
          <div className={SUB_1}>
            <Runs value={data.lead} />
          </div>

          {/* ref .career-sup-wrapper */}
          <div className="flex flex-wrap items-start justify-center gap-[22px] pt-14 max-md:pt-10">
            {data.cards.map((card, i) => (
              <CareerCard key={`${i}-${card.title}`} card={card} narrowPad={false} rounded />
            ))}
          </div>
        </div>

        {/* ref .common-wrapper-lg */}
        <div className={COMMON_WRAPPER_LG}>
          {/* ref .head-wrap.mrgbtm */}
          <div className={HEAD_WRAP_MRGBTM}>
            {/* ref .tt-wrap */}
            <div className={TT_WRAP}>
              <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.tail.heading)}</h2>
              <div className={SUB}>
                <Runs value={data.tail.sub} />
              </div>
            </div>
          </div>

          {/* ref .transfer-card-wrapper */}
          <div className="flex flex-wrap items-center justify-center gap-8 font-medium">
            {data.tail.people.map((person) => (
              <TransferCard key={person.name} person={person} logoSized={false} />
            ))}
          </div>
        </div>
      </div>
    </IconSection>
  );
}
