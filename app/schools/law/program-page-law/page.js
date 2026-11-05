import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';
import CareerPathways from '@/components/Schools/LawUgdx/CareerPathways';
import Curriculum from '@/components/Schools/LawUgdx/Curriculum';
import { StoryPair, FiveWays, Voices, RdCarousel, GuideSteps, EligibilityFees } from '@/components/Schools/LawUgdx/Program';
import StandApart from '@/components/Schools/Law/StandApart';
import { moreQuestions } from '@/lib/schools/lawUgdxCommon';

import {
  meta, hero, stats, story, ways, voices, ladder, curriculum, standApart, outcomes, careers, guide, eligibility, faq,
} from '@/lib/schools/law/bbaLlbContent';

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/law/program-page-law' },
};

/**
 * /schools/law/program-page-law — reference/law/program-page-law.php, the Integrated BBA LL.B. (Hons.)
 * programme page. Fourteen blocks in the reference's order, under the ATLAS header and footer as
 * production serves them. "Career Pathways" is the homepage's component but NOT the homepage's data:
 * this page's first tab authors six cards where the homepage's has seven, so it carries its own.
 * "View Brochure" opens the CRM widget popup through the shared Programs/BrochureModal (see
 * lib/schools/law/bbaLlbContent.js).
 */
export default function BbaLlbPage() {
  return (
    <>
      <div data-block="hero">
        <InnerPageHero hero={hero} />
      </div>
      <div data-block="stats">
        <StatBand data={stats} />
      </div>
      <StoryPair data={story} />
      <FiveWays data={ways} tone="law" />
      <Voices data={voices} tone="law" />
      <RdCarousel data={ladder} tone="law" block="ladder" />
      <Curriculum data={curriculum} tone="law" />
      <StandApart data={standApart} />
      <RdCarousel data={outcomes} tone="law" block="outcomes" />
      <CareerPathways data={careers} tone="lawOrange" />
      <GuideSteps data={guide} tone="law" />
      <EligibilityFees data={eligibility} tone="law" />
      <div data-block="search" className={SECTION}>
        <div className={CONTAINER}>
          <div className="pt-10">
            <SearchQuestion data={moreQuestions} variant="law" />
          </div>
        </div>
      </div>
      <div data-block="faq">
        <FAQ data={faq} />
      </div>
    </>
  );
}
