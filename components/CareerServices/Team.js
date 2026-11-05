import { careerServicesContent } from '@/lib/careerServicesContent';
import PeopleCarousel from '@/components/Life/PeopleCarousel';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Office of Career Services & Corporate Relations Team" — port of
 * `atlas-career-services.php:730-822` (`section.section > .container >
 * (.head-wrap > .tt-wrap > h2.h2-tag.mrg16, .swiper.common-swiper >
 *  10 x .card-type-e)`).
 *
 * The shared `PeopleCarousel` on the `atlas-blue` variant (a #5cbdca portrait
 * ring, name at weight 600) — the same one /advantages/atlas-advantages uses.
 * The `.head-wrap` holds only a heading here; there is no lead.
 */
export default function Team() {
  const { team } = careerServicesContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container > .head-wrap > .tt-wrap */}
      <div className={CONTAINER}>
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref h2.h2-tag.mrg16 */}
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{team.heading}</h2>
          </div>
        </div>
      </div>

      {/* ref .swiper.common-swiper */}
      <PeopleCarousel people={team.people} tone="atlas-blue" />
    </section>
  );
}
