import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB, SUB_MRGBTM } from '../Home/ui';

/**
 * "Our Vision & Approach" — the second `.section` inside `#Isdi-adv-overview`
 * (`atlas-isdi-advantage/the-isdi-advantage/index.php:85-121`).
 *
 *   .section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading.mrgbtm,
 *     .vision-wrapper > 3 x .isdi-vision-card(.bg-2|.bg-3),
 *     .vision-wrap-2 > (.vision-2-header, .vison-2-subs,
 *       .vision-wrapper-2 > 3 x .isdi-vision-card-2(.bg-2|.bg-3)))
 *
 * Measured on production at 1440 / 768 / 390:
 *                        >=768px                      <=767px
 *   .vision-wrapper      flex, wrap, gap 32           (wraps to one per row)
 *   .isdi-vision-card    391 x 215, r16, p32          346 (the container width)
 *   .vision-title        24px/1.1 500 white, mb12     same
 *   .vision-subs         16px/1.5 white               same
 *   .vision-wrap-2       mt68, p 40/38, #2a60d9, r16  same
 *   .vision-2-header     24px/1.5 500 white           same
 *   .vison-2-subs        16px/1.5, mt7 mb32           same
 *   .vision-wrapper-2    flex, wrap, gap 16           (wraps)
 *   .isdi-vision-card-2  376 x 215, r16, p32          270
 *
 * Each card carries its own colour AND its own stylesheet-painted vector, and the
 * two rows do not agree on either — `.isdi-vision-card` is #2a60d9 / #0038b1 /
 * #0038b1 while `.isdi-vision-card-2` starts at #0038b1 — so both travel as data
 * rather than being derived from the index.
 *
 * **The copy is upstream placeholder text.** All six cards read "Transformative
 * Learning" over the same sentence, and the reference really does ship it that way;
 * transcribed as authored rather than invented.
 */
function Card({ card, size }) {
  return (
    /* ref .isdi-vision-card / .isdi-vision-card-2 */
    <div
      className={cx(
        'overflow-hidden rounded-2xl bg-no-repeat p-8 text-white',
        size === 'lg' ? 'h-[215px] w-[391px] max-md:w-full' : 'h-[215px] w-[376px] max-md:w-full'
      )}
      style={{ backgroundColor: card.background, backgroundImage: `url(${card.image})`,
               backgroundSize: 'auto', backgroundPosition: card.position }}
    >
      {/* ref .vision-title */}
      <div className="mb-3 text-[24px] font-medium leading-[1.1] text-white">{withBreaks(card.title)}</div>
      {/* ref .vision-subs */}
      <div className="text-base font-normal leading-[1.5] text-white">{withBreaks(card.text)}</div>
    </div>
  );
}

export default function Vision({ data }) {
  return (
    /* ref .section (the second one inside #Isdi-adv-overview) */
    <div className="block overflow-hidden py-[50px]">
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16.isdi */}
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_MRGBTM}>{withBreaks(data.sub)}</div>

        {/* ref .vision-wrapper */}
        <div className="flex flex-wrap gap-8">
          {data.cards.map((card, i) => (
            <Card key={`${i}-${card.title}`} card={card} size="lg" />
          ))}
        </div>

        {/* ref .vision-wrap-2 */}
        <div className="mt-[68px] rounded-2xl bg-[#2a60d9] px-[38px] py-10">
          {/* ref .vision-2-header */}
          <div className="text-[24px] font-medium leading-[1.5] text-white">
            {withBreaks(data.wrap2.heading)}
          </div>
          {/* ref .vison-2-subs */}
          <div className="mb-8 mt-[7px] text-base font-normal leading-[1.5] text-white">
            {withBreaks(data.wrap2.sub)}
          </div>
          {/* ref .vision-wrapper-2 */}
          <div className="flex flex-wrap gap-4">
            {data.wrap2.cards.map((card, i) => (
              <Card key={`${i}-${card.title}`} card={card} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
