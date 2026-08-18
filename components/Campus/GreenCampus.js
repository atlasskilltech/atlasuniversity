import { campusContent } from '@/lib/campusContent';
import ContentCardB, { COMMON_WRAPPER } from '@/components/ui/ContentCardB';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Live where you learn. Grow where you stay." — port of
 * `campus-atlas.php:617-714` (`section#campus-green.section > .container >
 * (h2.h2-tag.mrg16, .black-desc-text, .common-wrapper > 4x .card-content-b)`).
 *
 * Four sustainability rows: two photographs, one muted YouTube embed and one
 * self-hosted `<video>` — the only two video files on the page, copied
 * byte-for-byte out of `reference/assets/images/videos/`.
 *
 * The lead paragraph here is `.black-desc-text`, NOT the `.sub-heading` every
 * other section on this page uses: 24px/1.5 in black (18px below 768px) with no
 * right inset and no vertical padding. Measured, not assumed — the two look
 * alike at a glance and are different elements.
 */
export default function GreenCampus() {
  const { green } = campusContent;

  return (
    /* ref section#campus-green.section */
    <section id="campus-green" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{green.heading}</h2>
        {/* ref .black-desc-text */}
        <div className="max-w-full text-2xl text-black max-md:text-lg">{green.subheading}</div>

        {/* ref .common-wrapper */}
        <div className={COMMON_WRAPPER}>
          {green.cards.map((card) => (
            <ContentCardB key={card.title} item={card} mediaClassName="max-md:h-[220px]" />
          ))}
        </div>
      </div>
    </section>
  );
}
