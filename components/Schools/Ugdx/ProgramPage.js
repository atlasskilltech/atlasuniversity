import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';
import CareerPathways from '@/components/Schools/LawUgdx/CareerPathways';
import Curriculum from '@/components/Schools/LawUgdx/Curriculum';
import SchoolBanner from '@/components/Schools/LawUgdx/SchoolBanner';
import { FiveWays, Voices, RdCarousel, RdGrid, EligibilityFees } from '@/components/Schools/LawUgdx/Program';
import { UgdxSteps } from '@/components/Schools/LawUgdx/Admission';
import { moreQuestions } from '@/lib/schools/lawUgdxCommon';

/**
 * One uGDX B.Tech programme page — the template shared by the seven reference/ugdx/undergraduate/*.php
 * pages and reference/ugdx/integrated/integrated-b-tech-in-cs-ai-ml-&-mba.php, driven by that page's
 * lib/schools/ugdx/programs/<slug>.js (read off production by the scratchpad's lu/gen_ugdx_prog.py).
 *
 * Twelve blocks in the reference's order: hero, the two figures, "The ATLAS uGDX B.Tech Experience"
 * (a carousel of `.career-sup-card.ugdx-rd`), "Why Choose …" (five `.card-ways`), the curriculum tabs,
 * "Program Outcomes" (the same card, as a grid), the red "Ready to Build What’s Next?" band, "Career
 * Pathways" (one carousel, no tabs), "Student Voices" (absent on two pages), "Your guide to joining …"
 * (uGDX's five-step band), the eligibility / fees band, then `section#faq` holding only the
 * "More questions?" panel and the page's FAQ include. Every piece is a Law / uGDX component already
 * measured on /schools/law/program-page-law, /schools/ugdx and the uGDX admissions page.
 */
export default function UgdxProgramPage({ data }) {
  return (
    <>
      <div data-block="hero">
        <InnerPageHero hero={data.hero} />
      </div>
      <div data-block="stats">
        <StatBand data={data.stats} />
      </div>
      <RdCarousel data={data.experience} tone="ugdx" block="experience" pad />
      <FiveWays data={data.ways} tone="ugdx" />
      <Curriculum data={data.curriculum} tone="ugdx" />
      <RdGrid data={data.outcomes} tone="ugdx" />
      <SchoolBanner block="banner" banner={data.banner} tone="ugdxRed" title="lightBar" fullBleed />
      <CareerPathways data={data.careers} tone="ugdx" />
      {data.voices && <Voices data={data.voices} tone="ugdx" block="voices" />}
      <UgdxSteps data={data.guide} block="guide" id={undefined} extraspace={false} />
      <EligibilityFees data={data.eligibility} tone="ugdx" />
      <section data-block="search" id="faq" className={SECTION}>
        <div className={CONTAINER}>
          <div className="pt-10">
            <SearchQuestion data={moreQuestions} variant="ugdx" />
          </div>
        </div>
      </section>
      <div data-block="faq">
        <FAQ data={data.faq} />
      </div>
    </>
  );
}
