import IconSection from '../About/IconSection';
import PhotoGallery from '../PhotoGallery';
import { CONTAINER } from '../Home/ui';

/**
 * "Big Names. Bigger Learnings. All on campus."
 * (`industry-centric-approach.php`, block 7).
 *
 *   div.section > (.icon-heading,
 *                  .container > .instagram-wrapper.mobile-vert-scroll.mar-0 >
 *                    .grid-gallery-flex.mrgtp > 4 x .grid-column > 4 x .img-wrap)
 *
 * `tone="none"`: the gallery is a direct sibling of the icon heading, with no
 * `.blue-wrapper` or `.white-wrapper` between them.
 *
 * `.instagram-wrapper.mar-0` zeroes the wrapper's 56px top margin, and
 * `.grid-gallery-flex.mrgtp` puts 56 back (0 at <=767) — so the wall sits 56px
 * below the heading above 768 and flush with it below.
 *
 * Eight of the sixteen cards carry a `.grid-details` caption and eight are bare
 * photographs, which is `PhotoGallery`'s new `details` form.
 */
export default function BigNames({ data }) {
  return (
    <IconSection
      block="big-names"
      icon={data.icon.image}
      title={data.icon.title}
      tone="none"
    >
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .instagram-wrapper.mobile-vert-scroll.mar-0 > .grid-gallery-flex.mrgtp */}
        <PhotoGallery columns={data.columns} className="mt-14 max-md:mt-0" />
      </div>
    </IconSection>
  );
}
