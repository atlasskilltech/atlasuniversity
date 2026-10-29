import { cx } from '@/lib/cx';
import CareerCard from '../CareerCard';
import { CONTAINER, H2, H2_MB, SECTION, SUB_1 } from './ui';

/**
 * "Our Career Support Services" (`success-snapshot/index.php`, block 16).
 *
 *   section.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading-1,
 *     .career-sup-wrapper > 6 x .career-sup-card.isdi)
 *
 * **The six cards are /atlas-isdi-advantage/industry-centric-approach's own**, word
 * for word and file for file — same titles, same copy, same photographs and the same
 * three `.css-content-wrapper.isdi-bg1/2/3` washes — so the data re-exports that
 * page's module rather than transcribing a second copy. Only the head differs: this
 * page gives the row a plain `h2` + `.sub-heading-1` where that one gives it an
 * `.icon-heading` with a "Know more" button.
 *
 * `.career-sup-wrapper` is a centred wrapping flex row, gap 22, pt56 (40 at <=767);
 * all six cards carry `.isdi`, so they are `rounded`, and the `<=479` 20px inset is
 * declared on the B.Des classes, which these do not match — hence `narrowPad={false}`.
 */
export default function Career({ data }) {
  return (
    <section data-block="career" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB_1}>{data.lead}</div>

        {/* ref .career-sup-wrapper */}
        <div className="flex flex-wrap items-start justify-center gap-[22px] pt-14 max-md:pt-10">
          {data.cards.map((card, i) => (
            <CareerCard key={`${i}-${card.title}`} card={card} narrowPad={false} rounded />
          ))}
        </div>
      </div>
    </section>
  );
}
