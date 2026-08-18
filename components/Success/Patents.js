import { successContent } from '@/lib/successContent';
import Carousel from '@/components/Carousel/Carousel';
import StatBand from '@/components/ui/StatBand';
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
 *   .patent-card.atlas       801 x 478, row,          column, width 100%,
 *                            space-between, px 30,    height auto,
 *                            #41418e, radius 32px 0   padding-bottom 30
 *   .patent-card-content     352 x 377, #464397,      width 280
 *                            padding 36 27
 *   .patent-holder           24px/32, 700, #07f6a0    inner <strong> 18px/1.5
 *   .patent-year             14px/20, 1px white       12px
 *                            rule, pt 10, pb 22,
 *                            margin-bottom 25
 *   .patent-name-1           18px/1.4, margin-        14px
 *                            bottom 25
 *   .patent-img              343 x 420, self-centre   280 x 250
 *
 * `.patent-card.atlas` cancels the base class's `vector-patent.png` wash
 * (`background-image: none`), so that file is not downloaded.
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
          /* ref .patent-card.atlas */
          <div
            key={card.number}
            className="flex h-[478px] w-[801px] items-stretch justify-between rounded-tl-[32px] rounded-br-[32px] bg-[#41418e] px-[30px]
                       max-md:h-auto max-md:w-auto max-md:flex-col max-md:pb-[30px]"
          >
            {/* ref .patent-card-content */}
            <div className="h-[377px] w-[352px] bg-[#464397] px-[27px] py-9 text-white max-md:h-auto max-md:w-[280px]">
              {/* ref .patent-holder > strong.bold-text-3.isdi — the div is
                  mint, the <strong> inside it overrides that to white, so the
                  title never paints mint anywhere on the card */}
              <div className="text-[24px] font-bold leading-8 text-[#07f6a0]">
                <strong className="font-bold text-white max-md:text-[18px] max-md:leading-[1.5]">
                  {card.title}
                </strong>
                <br />
              </div>

              {/* ref .patent-year */}
              <div className="mb-[25px] border-b border-white pb-[22px] pt-2.5 text-[14px] leading-5 no-underline max-md:text-[12px]">
                {card.number}
              </div>

              {/* ref .patent-name-1 */}
              <div className="mb-[25px] text-[18px] leading-[1.4] max-md:text-[14px]">
                {card.holder}
              </div>
            </div>

            {/* ref img.patent-img */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image.src}
              alt={card.image.alt}
              loading="lazy"
              className="h-[420px] w-[343px] self-center max-md:h-[250px] max-md:w-[280px]"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
