import { careerServicesContent } from '@/lib/careerServicesContent';
import GridGallery from '@/components/ui/GridGallery';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Our Students at Work" — port of `atlas-career-services.php:675-729`
 * (`section.section > .container > (h2.h2-tag.mrgbtm0, .grid-gallery >
 *   8 x .grid-card-atlas)`).
 *
 * The shared `GridGallery` on its `atlas` card, measured identical to
 * /success-stories-atlas "Awards & Recognitions" and /advantages/atlas-advantages
 * "Strongly Industry Oriented".
 */
export default function StudentsAtWork() {
  const { students } = careerServicesContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrgbtm0 */}
        <h2 className={`mb-0 ${H2}`}>{students.heading}</h2>

        {/* ref .grid-gallery */}
        <GridGallery
          cards={students.gallery}
          variant="atlas"
          name="z-[3] text-[24px] font-bold leading-6 text-atlas-cyan max-md:text-[20px]"
          caption="z-[3] text-[18px] font-medium leading-8 text-white max-md:text-[16px] max-md:leading-6"
        />
      </div>
    </section>
  );
}
