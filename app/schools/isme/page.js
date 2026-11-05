import Hero from '@/components/Hero/Hero';
import Awards from '@/components/Schools/ISDI/Home/Awards';
import ExploreDropdown from '@/components/Schools/ISME/Home/ExploreDropdown';
import OutcomesHeading from '@/components/Schools/ISME/Home/OutcomesHeading';
import OutcomesStack from '@/components/Schools/ISME/Home/OutcomesStack';
import CoreCards from '@/components/Schools/ISME/Home/CoreCards';
import AdvisoryBoard from '@/components/Schools/ISME/Home/AdvisoryBoard';
import Programs from '@/components/Schools/ISME/Home/Programs';
import Electives from '@/components/Schools/ISME/Home/Electives';
import ThisWeek from '@/components/Schools/ISME/Home/ThisWeek';
import Motion from '@/components/Schools/ISME/Home/Motion';
import FutureInAction from '@/components/Schools/ISME/Home/FutureInAction';
import International from '@/components/Schools/ISME/Home/International';
import PeopleVoices from '@/components/Schools/ISME/Home/PeopleVoices';
import ThoughtLeadership from '@/components/Schools/ISME/Home/ThoughtLeadership';
import Industry from '@/components/Schools/ISME/Home/Industry';
import ReadyToBuild from '@/components/Schools/ISDI/Home/ReadyToBuild';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { ismeFaq } from '@/lib/schools/isme/home/faq';
import PinkBanner from '@/components/Schools/ISDI/Home/PinkBanner';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';
import {
  ismeHero,
  ismeExplore,
  ismeAwards,
  ismeOutcomesHeading,
  ismeThisWeek,
  ismeFaqBanner,
  ismeReadyToBuild,
  ismeSearch,
} from '@/lib/schools/isme/home/hero';
import { ismeOutcomesStack } from '@/lib/schools/isme/home/outcomesStack';
import { ismeDifferent } from '@/lib/schools/isme/home/different';
import { ismeAdvisory } from '@/lib/schools/isme/home/advisory';
import { ismePrograms } from '@/lib/schools/isme/home/programs';
import { ismeElectives } from '@/lib/schools/isme/home/electives';
import { ismeMotion } from '@/lib/schools/isme/home/motion';
import { ismeFuture } from '@/lib/schools/isme/home/future';
import { ismeInternational } from '@/lib/schools/isme/home/international';
import { ismePeople } from '@/lib/schools/isme/home/people';
import { ismeThoughtLeadership } from '@/lib/schools/isme/home/thoughtLeadership';
import { ismeIndustry } from '@/lib/schools/isme/home/industry';

/*
 * ISME homepage — reference/schools/isme/index.php, block by block. Each block root carries
 * `data-block` for the height harness. Metadata comes from app/schools/isme/layout.js
 * (the page's own $title / $description).
 */
export const revalidate = 900;

export default function ISMEHome() {
  return (
    <main>
      <div data-block="hero">
        <Hero data={ismeHero} extra={<ExploreDropdown label={ismeExplore.label} links={ismeExplore.links} />} />
      </div>
      <Awards data={ismeAwards} variant="base" />
      <OutcomesHeading heading={ismeOutcomesHeading} />
      <OutcomesStack cards={ismeOutcomesStack} />
      <CoreCards data={ismeDifferent} />
      <AdvisoryBoard data={ismeAdvisory} />
      <Programs data={ismePrograms} />
      <Electives data={ismeElectives} />
      <ThisWeek data={ismeThisWeek} />
      <PinkBanner data={ismeFaqBanner} block="faq-banner" tone="blue" sectionClass={SECTION} />
      <Motion data={ismeMotion} />
      <FutureInAction data={ismeFuture} />
      <International data={ismeInternational} />
      <PeopleVoices data={ismePeople} />
      <ThoughtLeadership data={ismeThoughtLeadership} />
      <Industry data={ismeIndustry} />
      <ReadyToBuild data={ismeReadyToBuild} tone="blue" variant="isme" sectionClass={SECTION} />
      {/* ref section#faq > .container > .search-ques-wrap (pt 40) > more-questions.php. The
          reference gives this section AND the FAQ below `id="faq"`; only the FAQ keeps it, so the
          banner's "#faq" link lands on the questions rather than on a duplicate id. */}
      <section data-block="search" className={SECTION}>
        <div className={CONTAINER}>
          <div className="pt-10">
            <SearchQuestion data={ismeSearch} variant="blue" />
          </div>
        </div>
      </section>
      <div data-block="faq">
        <FAQ data={ismeFaq} />
      </div>
    </main>
  );
}
