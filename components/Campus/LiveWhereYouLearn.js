import { campusContent } from '@/lib/campusContent';
import SupportCard, { SUPPORT_CARD_ROW } from '@/components/ui/SupportCard';
import { COMMON_WRAPPER } from '@/components/ui/ContentCardB';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Live Where You Learn" — port of `campus-atlas.php:250-328`
 * (`section#campus-housing.section > .container > (.h2-tag.mrg16,
 *   .sub-heading.mrgbtm, .center-image-full-wrap-atlas, .common-wrapper >
 *   .common-flex-26-wrap, .bl-card-wrapper-isme.atlas)`).
 *
 * /life-at-atlas repeats this section verbatim (`life-at-atlas.php:878-952`) —
 * same copy, same three residence cards, same eight mosaic cells and the same
 * image files — differing only in its `id` and in the YouTube video it embeds,
 * so both take it as `data` + `id` and neither passes it any styling.
 *
 * Three blocks under one heading: a 16:9-ish video, three residence cards, and
 * an eight-cell photo mosaic.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                               >=768px                 <=767px
 *   .center-image-full-wrap-    radius 32/0, clipped,   same
 *     atlas                     aspect from the
 *                               reference's own inline
 *                               padding-top 56.17021%
 *   .common-wrapper             padding-top 56          40 (also <=479)
 *   .bl-card-wrapper-isme       margin-top 56,          margin-top 40
 *     .atlas                    radius 32/0, clipped
 *   .belief-cards-camp          grid 2fr/1fr x 312/252  flex wrap, cells
 *                               (564 tall)              full width x 250
 *   .belief-cards-1-camp        grid 1fr/2fr x 252/312  grid 1fr/1fr x 250/250
 *   .card-title.sp-1            32px/1.2, 500,          16px/1.2, 600
 *                               padding 0 24, mb 32
 *
 * The mosaic's eight photographs are painted by `.cards-inner-camp.img-N` /
 * `.bl-cards-camp.img-N` in the stylesheet, so they travel as data. Seven use
 * `background-size: cover`; `img-3` declares `auto` above 768px (its file is
 * authored at exactly the 414x564 cell, so at the 1366px container it lands
 * 1:1) and switches to `cover` below — reproduced as declared.
 */
export default function LiveWhereYouLearn({ data = campusContent.housing, id = 'campus-housing' }) {
  const housing = data;
  const [ac, security, meals, lounges, gym, study, coffee, housekeeping] = housing.mosaic;

  return (
    /* ref section#campus-housing.section */
    <section id={id} className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{housing.heading}</h2>
        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{housing.subheading}</div>

        {/* ref .center-image-full-wrap-atlas > .w-embed-youtubevideo */}
        <div className="relative overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
          <div className="relative pt-[56.17021276595745%]">
            <iframe
              src={housing.embed}
              title={housing.heading}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        </div>

        {/* ref .common-wrapper > .common-flex-26-wrap */}
        <div className={COMMON_WRAPPER}>
          <div className={SUPPORT_CARD_ROW}>
            {housing.cards.map((card) => (
              <SupportCard key={card.title.join(' ')} item={card} />
            ))}
          </div>
        </div>

        {/* ref .bl-card-wrapper-isme.atlas */}
        <div className="mt-14 overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:mt-10">
          {/* ref .belief-cards-camp — 2fr/1fr, rows 312/252 */}
          <div
            className="grid h-[564px] grid-cols-[2fr_1fr] grid-rows-[312px_252px] justify-center text-white
                       max-md:flex max-md:h-auto max-md:w-full max-md:flex-wrap"
          >
            {/* ref .cards-cols-camp > .inside-cards-camp */}
            <PairColumn cells={[ac, security]} className="col-start-1 row-start-1" />
            <MosaicCell cell={meals} className="col-start-2 row-start-1 row-span-2" />
            <MosaicCell cell={lounges} className="col-start-1 row-start-2" />
          </div>

          {/* ref .belief-cards-1-camp — 1fr/2fr, rows 252/312 */}
          <div
            className="grid h-[564px] grid-cols-[1fr_2fr] grid-rows-[252px_312px] justify-center text-white
                       max-md:h-auto max-md:grid-cols-[1fr_1fr] max-md:grid-rows-[250px_250px]"
          >
            <MosaicCell
              cell={gym}
              className="col-start-1 row-start-1 row-span-2 max-md:row-span-1"
            />
            <MosaicCell cell={study} className="col-start-2 row-start-1" />
            <PairColumn
              cells={[coffee, housekeeping]}
              className="col-start-2 row-start-2 max-md:col-span-2 max-md:col-start-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ref .cards-cols-camp > .inside-cards-camp — two square cells side by side */
function PairColumn({ cells, className }) {
  return (
    <div
      className={`flex flex-col items-start justify-center max-md:block max-md:h-[250px] max-md:w-full ${className}`}
    >
      <div className="grid h-full w-full grid-cols-2 grid-rows-1 justify-center max-md:grid-rows-[250px]">
        {cells.map((cell) => (
          <MosaicCell key={cell.label} cell={cell} />
        ))}
      </div>
    </div>
  );
}

/* ref .cards-inner-camp.img-N / .bl-cards-camp.img-N */
function MosaicCell({ cell, className = '' }) {
  return (
    <div
      /*
       * `background-size` is per-cell AND per-breakpoint (img-3 is `auto` above
       * 768px, `cover` below), and an inline style would outlive the media
       * query — so the value travels as a custom property that a class reads,
       * and `max-md:bg-cover` overrides it where the reference does.
       */
      className={`flex flex-col items-start justify-end bg-[length:var(--cell-size)] bg-[position:0_0] bg-no-repeat text-white max-md:bg-cover max-md:h-[250px] max-md:w-full ${className}`}
      style={{
        backgroundImage: `url(${cell.image})`,
        '--cell-size': cell.bgSize ?? 'cover',
      }}
    >
      {/* ref .card-title.sp-1 */}
      <div className="mb-8 px-6 text-[32px] font-medium leading-[1.2] max-md:text-[16px] max-md:font-semibold">
        {cell.label.split('\n').map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
