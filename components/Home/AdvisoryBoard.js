import { advisoryBoard } from '@/lib/homeContent';
import Carousel from '@/components/Carousel/Carousel';
import AdvisorCard from '@/components/ui/AdvisorCard';
import SectionHead, { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * "Steering Excellence, Guiding ATLAS" — port of reference/index.php:2099-2255
 * (`div.section > .container > (.head-wrap.mrgbtm32, .swiper.common-swiper.mrgtp0)`).
 *
 * Fourteen `.card-type-d` cards on `components/ui/AdvisorCard`, shared with
 * /advantages/atlas-industry-centric-approach, which repeats this section with
 * the same people. The card carries the measurements and the note on the
 * play buttons.
 */
/**
 * `action` renders in the head-wrap's second slot — /about-us puts a "View all"
 * button there, the homepage has none.
 */
export default function AdvisoryBoard({ data = advisoryBoard, action }) {
  const { heading, subheading, people, playIcon } = data;

  return (
    /* ref div.section */
    <div className={SECTION}>
      <div className={CONTAINER}>
        <SectionHead heading={heading} subheading={subheading}>
          {action}
        </SectionHead>
      </div>

      <Carousel>
        {people.map((person) => (
          <AdvisorCard key={person.name} person={person} playIcon={playIcon} />
        ))}
      </Carousel>
    </div>
  );
}
