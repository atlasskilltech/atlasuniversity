import { successContent } from '@/lib/successContent';

import SuccessHero from '@/components/Success/SuccessHero';
import StatBand from '@/components/ui/StatBand';
import Beliefs from '@/components/Success/Beliefs';
import Startups from '@/components/Success/Startups';
import StartupsFounded from '@/components/Success/StartupsFounded';
import Placements from '@/components/Success/Placements';
import StudentsAtWork from '@/components/Success/StudentsAtWork';
import RecruitmentPartners from '@/components/Success/RecruitmentPartners';
import IndustryTestimonials from '@/components/Success/IndustryTestimonials';
import CareerSupport from '@/components/Success/CareerSupport';
import MastersProgressions from '@/components/Success/MastersProgressions';
import GlobalPartnerships from '@/components/Success/GlobalPartnerships';
import Patents from '@/components/Success/Patents';
import ResearchPapers from '@/components/Success/ResearchPapers';
import AwardsRecognitions from '@/components/Success/AwardsRecognitions';
import FAQ from '@/components/Home/FAQ';

/**
 * /success-stories-atlas — port of `reference/success-stories-atlas.php`.
 *
 * Sections in the reference's own order:
 *    1  hero .inner-header-wrapper.full-ht         SuccessHero           14
 *    2  three figures .top-cards-wrapper           StatBand              22
 *    3  Beliefs that power our success             Beliefs               36
 *    4  Startups                                   Startups             101
 *    5  Startups founded by ATLAS ISME Alumni      StartupsFounded      110
 *    6  Placements                                 Placements           167
 *    7  Students at work                           StudentsAtWork       309
 *    8  Our Recruitment Partners                   RecruitmentPartners  358
 *    9  Industry Testimonials                      IndustryTestimonials 582
 *   10  Our Career Support Services                CareerSupport        644
 *   11  Master's Progressions                      MastersProgressions  719
 *   12  Our Global Partnerships                    GlobalPartnerships   832
 *   13  Patents & Copyrights                       Patents             1066
 *   14  Research Papers                            ResearchPapers      1140
 *   15  Awards & Recognitions                      AwardsRecognitions  1286
 *   16  Questions? We can read your mind           FAQ                 1347
 *
 * ── What is shared, and why ───────────────────────────────────────────────
 *   StatBand        `.top-cards-wrapper > .head-top-card` — the band under the
 *                   hero and the two-card band inside "Patents & Copyrights",
 *                   both measured identical to /campus-atlas's. Generalised
 *                   out of `components/Campus/CampusStats` for this page.
 *   Carousel        four `.common-swiper` sliders plus one
 *                   `.common-swiper-full`, all on the same initialiser.
 *   PillTabs        the two logo tab sets, on the new `wide` spacing —
 *                   this page uses the plain `.tabs-menu-mint`, not the
 *                   `.less-space` modifier the earlier pages use.
 *   PrimaryButton   `.btn-primary`, on "Our Global Partnerships".
 *   ButtonRegular   `.button-regular`, on "Research Papers".
 *   FAQ             this page's include carries a `<style>` block that is
 *                   byte-identical to the homepage's, so it is the site-wide
 *                   accordion with eight different questions.
 *   GridGallery     new here: `.grid-gallery`, used by three sections.
 *   LogoGrid        new here: `.logos-grid`, used by both tab sets.
 *
 * The remaining sections are this page's alone and stay in
 * `components/Success/`.
 *
 * ── Reference defects not reproduced (each recorded where it applies) ──────
 *  - `id="our-beliefs"` is authored on two consecutive sections; kept on the
 *    first only, because duplicate ids are invalid.
 *  - Every `.swiper-slide` is a full viewport tall while the cards inside are
 *    388-622px, so the reference leaves hundreds of pixels of dead space under
 *    five sliders. Same stray full-height rule skipped elsewhere in this
 *    rebuild.
 *  - `.testimonial-card` is `width: 100%` inside a `slidesPerView: 'auto'`
 *    slide, so between 568 and 767px it measures 1127px at a 700px viewport
 *    and overflows its own section. The container width is used instead —
 *    which is what the reference itself renders at every other width.
 *  - The reference's document is 569px wide below 568px regardless of content;
 *    that overflow comes from the shared header markup and predates this page.
 *  - The reference's `<h1>` appears three times (hero, "Beliefs that power our
 *    success", "Startups"). Only the hero keeps it; the other two are `<h2>`,
 *    which changes nothing visually — no stylesheet rule keys off the tag.
 */
export const metadata = {
  title: successContent.meta.title,
  description: successContent.meta.description,
};

export default function SuccessStoriesPage() {
  return (
    <>
      <SuccessHero />
      <StatBand data={successContent.stats} />
      <Beliefs />
      <Startups />
      <StartupsFounded />
      <Placements />
      <StudentsAtWork />
      <RecruitmentPartners />
      <IndustryTestimonials />
      <CareerSupport />
      <MastersProgressions />
      <GlobalPartnerships />
      <Patents />
      <ResearchPapers />
      <AwardsRecognitions />
      <FAQ data={successContent.faq} />
    </>
  );
}
