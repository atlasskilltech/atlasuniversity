import { successContent } from '@/lib/successContent';
import Carousel from '@/components/Carousel/Carousel';
import StatBand from '@/components/ui/StatBand';
import PatentCard from '@/components/ui/PatentCard';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Patents & Copyrights" — port of `success-stories-atlas.php:1066-1139`
 * (`section#patent.section > (.container > .head-wrap.mrgbtm > .tt-wrap >
 *   (h2.h2-tag.mrg16, .sub-heading), .wrap-patent.nobg >
 *   .top-cards-wrapper.mrgbtm0 > 2 x .head-top-card,
 *   .container > .swiper.common-swiper > 5 x .patent-card.atlas)`).
 *
 * A heading, the two-card figure band (the shared `StatBand` — the same
 * `.top-cards-wrapper` as the one under the hero, with `.wrap-patent.nobg`
 * adding nothing but a transparent wrapper), then five wide cards each pairing
 * an indigo text plate with a photograph.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                  <=767px
 * The card is `components/ui/PatentCard`, which carries the measured cascade for
 * both references that use it. `.patent-card.atlas` cancels the base class's
 * `vector-patent.png` wash (`background-image: none`), so that file is not
 * downloaded for this page.
 *
 * ── The one place the local reference cannot be measured ──────────────────
 * `.patent-holder` is `24px/32`, and everything inside it is the `<strong>`
 * (18px/27) plus a `<br>` — the div owns no text of its own. Below 768px the
 * local reference lays that out at a 27px pitch and this port at 32px, from
 * identical computed styles and identical font metrics, because the local
 * reference is in **quirks mode**: `assets/include/dynamic.php` emits a PHP
 * warning about a missing `connection.php` before `<!DOCTYPE html>`, so
 * `document.compatMode` is `BackCompat` and Chrome drops the line-box strut on
 * lines with no directly-contained text. Standards mode keeps the strut, which
 * is what this port and the live site both render. Verified by probe: adding a
 * single text node to the reference's own div restores the 32px line.
 */
export default function Patents() {
  const { patents } = successContent;

  return (
    /* ref section#patent.section */
    <section id="patent" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.mrgbtm > .tt-wrap */}
        <div className="mb-14 flex items-end justify-between max-md:mb-5 max-md:flex-col max-md:items-stretch">
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref h2.h2-tag.mrg16 */}
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{patents.heading}</h2>

            {/* ref .sub-heading */}
            <div className={SUB_INNER}>{patents.subheading}</div>
          </div>
        </div>
      </div>

      {/* ref .wrap-patent.nobg > .top-cards-wrapper.mrgbtm0 */}
      <StatBand data={patents.stats} />

      {/* ref .container > .swiper.common-swiper */}
      <Carousel className="pt-14 max-md:pt-10">
        {patents.cards.map((card) => (
          /* ref .patent-card.atlas — the card itself is `components/ui/PatentCard`,
             extracted when /schools/isdi/atlas-isdi-advantage turned out to use the
             same chassis in its `.isdi` colours; every inner part measured identical */
          <PatentCard key={card.number} card={card} variant="atlas" />
        ))}
      </Carousel>
    </section>
  );
}
