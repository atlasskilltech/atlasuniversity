import { campusContent } from '@/lib/campusContent';
import SupportCard, { SUPPORT_CARD_ROW } from '@/components/ui/SupportCard';
import PhotoMosaic from '@/components/ui/PhotoMosaic';
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
 *
 * The eight-cell mosaic is `components/ui/PhotoMosaic`, shared with
 * /advantages/atlas-advantages. Its photographs are painted by
 * `.cards-inner-camp.img-N` / `.bl-cards-camp.img-N` in the stylesheet, so
 * they travel as data: seven use `background-size: cover`, and `img-3`
 * declares `auto` above 768px (its file is authored at exactly the 414x564
 * cell, so at the 1366px container it lands 1:1) and `cover` below.
 */
export default function LiveWhereYouLearn({ data = campusContent.housing, id = 'campus-housing' }) {
  const housing = data;

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
        <PhotoMosaic cells={housing.mosaic} />
      </div>
    </section>
  );
}
