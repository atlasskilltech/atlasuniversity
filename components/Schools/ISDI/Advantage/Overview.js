import { CONTAINER, H2, H2_MB } from '../Home/ui';
import withBreaks from '@/lib/withBreaks';
import CoreCards from '../CoreCards';
import Vision from './Vision';

/**
 * `#Isdi-adv-overview` — the block under the sticky menu, and the one place on this
 * page where a single `data-block` holds **two** `.section`s
 * (`atlas-isdi-advantage/the-isdi-advantage/index.php:22-122`):
 *
 *   div#Isdi-adv-overview.isdi-adv-overview >
 *     .section > .container > (h2.h2-tag.isdi, .common-flex > 9 x .new-core-card)
 *     .section > .container > ("Our Vision & Approach", see ./Vision)
 *
 * `.isdi-adv-overview` itself declares nothing — it is the grouping div, and it is
 * kept because it carries the id. The heading is a bare `.h2-tag.isdi`, so it takes
 * the base bottom margin (56, 32 at <=767) rather than `mrg16`.
 *
 * The nine cards are the shared `../CoreCards` row; cards **#8 and #9 are authored
 * with the same photograph**, which is transcribed as the reference has it.
 */
export default function Overview({ data, vision }) {
  return (
    /* ref div#Isdi-adv-overview.isdi-adv-overview */
    <div id="Isdi-adv-overview" data-block="overview">
      {/* ref .section */}
      <div className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          {/* ref h2.h2-tag.isdi */}
          <h2 className={`${H2} ${H2_MB.base}`}>{withBreaks(data.heading)}</h2>
          <CoreCards cards={data.cards} />
        </div>
      </div>

      <Vision data={vision} />
    </div>
  );
}
