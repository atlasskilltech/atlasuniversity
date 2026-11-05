import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';
import CareerPathways from '@/components/Schools/LawUgdx/CareerPathways';
import Curriculum from '@/components/Schools/LawUgdx/Curriculum';
import { FiveWays, EligibilityFees } from '@/components/Schools/LawUgdx/Program';
import { SummerStory, SummerIntro } from '@/components/Schools/Ugdx/SummerSchool';
import { moreQuestions } from '@/lib/schools/lawUgdxCommon';
import * as data from '@/lib/schools/ugdx/summerSchoolContent';

export const metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: data.url },
};

/*
 * The page's own <style> comes after the sheet and re-declares two things without the sheet's
 * breakpoints, which every component here inherits:
 *   .section    padding 60 / 60 at EVERY width (the shared SECTION drops to 40 at <=767)
 *   .container  padding 62 down to 768, then 22 — no 30px step at <=991, so the carousel's mirrored
 *               track inset and snap padding stay at 62 there too
 * Mirrored as page-scoped descendant rules (0,2,0) on the page root rather than variants on shared
 * components. String.raw so the Tailwind scanner reads exactly the class React renders.
 */
const PAGE_STYLE = [
  String.raw`max-md:[&_.py-\[60px\]]:py-[60px]`,
  String.raw`max-lg:[&_.max-lg\:px-\[30px\]]:px-[62px] max-md:[&_.max-lg\:px-\[30px\]]:px-[22px]`,
  String.raw`max-lg:[&_.max-lg\:pl-\[30px\]]:pl-[62px] max-md:[&_.max-lg\:pl-\[30px\]]:pl-[22px]`,
  String.raw`max-lg:[&_.max-lg\:pr-\[30px\]]:pr-[62px] max-md:[&_.max-lg\:pr-\[30px\]]:pr-[22px]`,
  String.raw`max-lg:[&_.max-lg\:scroll-pl-\[30px\]]:scroll-pl-[62px] max-md:[&_.max-lg\:scroll-pl-\[30px\]]:scroll-pl-[22px]`,
].join(' ');

/**
 * /schools/ugdx/summerschool — reference/ugdx/summerschool.php, under the ATLAS header and footer as
 * production serves it (the header's "Apply Now" already swaps to /summertech on this path). Twelve
 * blocks in the reference's order, every one of them a uGDX programme-page component taking this page's
 * data except the two story pairs and the closing paragraphs.
 *
 * Reference defects, recorded rather than reproduced:
 * - the eligibility copy is authored `<strong>Students of Grade 9th - 12th</div>` and the <strong> is
 *   never closed, so the HTML parser keeps reopening it: production renders the fee description and
 *   the search panel's "Let our AI Assistant answer your queries" in bold, and wraps everything from
 *   there to the FAQ in a stray <strong>. Only the authored bold label is kept.
 * - the tab panel is authored `<d  iv class="quaternary-tabs-content-ugdx …">` — an unknown `<d>`
 *   element that the class still styles as a block, so it renders as intended.
 * - the page's NoPaperForms brochure popup binds to `[data-id='btech']`, and the only such trigger
 *   ("Download Brochure" in the hero) is commented out, so the popup is unreachable and not ported.
 */
export default function UgdxSummerSchoolPage() {
  return (
    <div className={PAGE_STYLE}>
      <div data-block="hero">
        <InnerPageHero hero={data.hero} />
      </div>
      <div data-block="stats">
        <StatBand data={data.stats} />
      </div>
      <SummerStory data={data.about} block="about" />
      <FiveWays data={data.ways} tone="ugdx" />
      <Curriculum data={data.curriculum} tone="ugdx" />
      <CareerPathways data={data.careers} tone="ugdx" />
      <SummerStory data={data.typicalDay} block="typical-day" />
      <EligibilityFees data={data.eligibility} tone="ugdx" />
      <SummerIntro paragraphs={data.intro} />
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
    </div>
  );
}
