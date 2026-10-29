import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import IconSection from '../About/IconSection';
import TransferCard from '../TransferCard';
import { CONTAINER, H2, H2_MB, SUB } from '../Home/ui';
import { COMMON_WRAPPER, HEAD_WRAP_MRGBTM, Runs, TT_WRAP } from './ui';

/**
 * "Master's Progression Support" / "From ISDI to the World"
 * (`atlas-isdi-advantage/internationalisation/index.php:842-946`).
 *
 *   section#isdi-master-prog.section >
 *     .icon-heading
 *     .container > .common-wrapper >
 *       (.head-wrap.mrgbtm > .tt-wrap > (h2.h2-tag.mrg16.isdi, .sub-heading),
 *        .transfer-card-wrapper > 5 x .transfer-card.isdi)
 *     .strip-container.isdi > .strip-content > 4 x .strip-text
 *
 * Another `tone="none"` section: the container and the full-bleed strip are direct
 * siblings of `.icon-heading`.
 *
 * ── Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390 ─────────
 *   .head-wrap.mrgbtm        row, space-between, bottom-aligned, mb56; a stretched
 *                            column with mb20 at <=479
 *   .transfer-card-wrapper   wrapping centred flex row, gap 32, weight 500
 *   .transfer-card.isdi      `../TransferCard`, shared with
 *                            /atlas-isdi-advantage/industry-centric-approach
 *   .strip-container.isdi    #0a46ca under `vector-banner.png` at 0 0 (centred and
 *                            `cover` at <=767), mt56, py48, centred flex row
 *   .strip-content           a column with a 20px gap from 991 down
 *   .strip-text              centred, px56, 24px/1.5 500; mb32 at <=767
 *   .str-txt-mint.isdi       white (the mint variable is overridden)
 *   .str-txt-1.isdi          white, weight 400
 *
 * The card's 1px rule is `border-bottom` only, so the three other sides paint
 * nothing — and the colour is the inherited `currentColor`, white.
 */
export default function Masters({ data }) {
  return (
    <IconSection
      id="isdi-master-prog"
      block="masters"
      icon={data.icon.image}
      title={data.icon.title}
      tone="none"
    >
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className={COMMON_WRAPPER}>
          {/* ref .head-wrap.mrgbtm */}
          <div className={HEAD_WRAP_MRGBTM}>
            {/* ref .tt-wrap */}
            <div className={TT_WRAP}>
              <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
              <div className={SUB}>
                <Runs value={data.sub} />
              </div>
            </div>
          </div>

          {/* ref .transfer-card-wrapper */}
          <div className="flex flex-wrap items-center justify-center gap-8 font-medium">
            {data.people.map((person) => (
              /*
               * The logo kind travels per card. Two of the five author
               * `img.transf-un-logo`, which THIS page's sheet fixes at 140x36;
               * the other three author a bare `<img>` with no class, so they
               * paint at their intrinsic size (118x42 / 119x37 / 119x37).
               * Those three had been rendering no logo at all — the extractor
               * read `img.transf-un-logo` rather than the element that owns the
               * mark, and the card is a declared 282x388, so the gap cost no
               * block height and no measurement on this page could see it.
               */
              <TransferCard
                key={person.name}
                person={person}
                logoKind={person.logoKind}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ref .strip-container.isdi */}
      <div
        className="mt-14 flex items-center justify-center bg-[#0a46ca] bg-auto bg-[position:0_0] bg-no-repeat py-12 max-md:bg-cover max-md:bg-center"
        style={{ backgroundImage: `url(${data.stripBackground})` }}
      >
        {/* ref .strip-content */}
        <div className="flex items-center justify-center max-lg:flex-col max-lg:gap-5">
          {data.strip.map((item) => (
            /* ref .strip-text */
            <div
              key={item.value}
              className="px-14 text-center text-[24px] font-medium leading-[1.5] text-white max-md:mb-8"
            >
              {/* ref .str-txt-mint.isdi */}
              <div className="text-white">{item.value}</div>
              {/* ref .str-txt-1.isdi */}
              <div className="font-normal text-white">{withBreaks(item.label)}</div>
            </div>
          ))}
        </div>
      </div>
    </IconSection>
  );
}
