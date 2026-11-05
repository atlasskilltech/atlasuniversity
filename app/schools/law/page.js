import InnerPageHero from '@/components/ui/InnerPageHero';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';
import SchoolBanner from '@/components/Schools/LawUgdx/SchoolBanner';
import CareerPathways from '@/components/Schools/LawUgdx/CareerPathways';
import ActionNeverStops from '@/components/Schools/LawUgdx/ActionNeverStops';
import { AboutStory, EdgeCards, HallsCarousel, H2_MB } from '@/components/Schools/LawUgdx/Sections';
import MeetTheDean from '@/components/Schools/Law/MeetTheDean';
import {
  meta, hero, about, edges, dean, programs, careers, faqBanner, action, halls, shape, faq,
} from '@/lib/schools/law/homeContent';
import { moreQuestions } from '@/lib/schools/lawUgdxCommon';

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/law/' },
};

/* the Instagram grid reads a live feed — the same revalidation window as the ATLAS homepage */
export const revalidate = 900;

/**
 * /schools/law — reference/law/index.php. Production serves the School of Law under the ATLAS header
 * and footer (its header.php is an older copy of the ATLAS one, and the rendered nav and footer are
 * link-for-link identical to the ATLAS homepage's), so the root layout's chrome stays on here — see
 * components/Schools/MainSiteOnly. Twelve blocks, in the reference's order.
 *
 * A commented-out LL.M. programme banner sits between "Our Programs" and "Career Pathways" in the
 * reference; it is dead markup and is not ported (its target, removed/program-page-llm.php, is itself
 * retired and broken on production).
 */
export default function LawHome() {
  return (
    <>
      <div data-block="hero">
        <InnerPageHero hero={hero} />
      </div>
      <AboutStory data={about} />
      <EdgeCards data={edges} />
      <MeetTheDean data={dean} />

      {/* ref div.section > .container > (h2.h2-tag, .info-banner-law) */}
      <div data-block="programs" className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={H2_MB}>{programs.heading}</h2>
          <SchoolBannerInline banner={programs.banner} />
        </div>
      </div>

      <CareerPathways data={careers} tone="lawOrange" />
      <SchoolBanner block="faq-banner" banner={faqBanner} tone="sand" title="black" fullBleed />
      <ActionNeverStops heading={action.heading} sub={action.sub} />
      <HallsCarousel data={halls} />
      <SchoolBanner block="shape" banner={shape} />

      {/* ref section#faq.section > .container > .search-ques-wrap > more-questions.php */}
      <div data-block="search" className={SECTION}>
        <div className={CONTAINER}>
          {/* ref .search-ques-wrap — padding-top 40 at every width */}
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

/* "Our Programs" puts the band straight inside its own section's container, under the heading */
function SchoolBannerInline({ banner }) {
  return <SchoolBanner banner={banner} image="sm" inline />;
}
