import { campusContent } from '@/lib/campusContent';
import ContentCardB, { SHAPING_WRAPPER } from '@/components/ui/ContentCardB';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Purpose-Built for Holistic Learning" — port of
 * `campus-atlas.php:118-221` (`section#campus-spaces.section > .container >
 * (.h2-tag.mrg16, .sub-heading, .shaping-wrapper > 4x .card-content-b)`).
 *
 * Four alternating 50/50 rows: two carry a muted, looping YouTube embed, two a
 * photograph. Unlike the About page's identical rows, these sit **inside**
 * `.container`, so they stop at the 1242px content width instead of bleeding to
 * the viewport edge — which is why the section wrapper stays with the caller
 * and only the row itself is shared.
 *
 * The page's own <style> block adds `@media (max-width:767px){
 * .cd-cont-b-imgwrap{height:220px} }`, so the media frame is a fixed 220px once
 * the row stacks; that is the one thing this page passes the shared row.
 */
export default function HolisticLearning() {
  const { spaces } = campusContent;

  return (
    /* ref section#campus-spaces.section */
    <section id="campus-spaces" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{spaces.heading}</h2>
        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{spaces.subheading}</div>

        {/* ref .shaping-wrapper */}
        <div className={SHAPING_WRAPPER}>
          {spaces.cards.map((card) => (
            <ContentCardB key={card.title} item={card} mediaClassName="max-md:h-[220px]" />
          ))}
        </div>
      </div>
    </section>
  );
}
