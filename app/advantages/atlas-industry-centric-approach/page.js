import { industryContent } from '@/lib/industryContent';

import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import AdvisoryBoard from '@/components/Industry/AdvisoryBoard';
import RecruitmentPartners from '@/components/Industry/RecruitmentPartners';
import Masterclasses from '@/components/Industry/Masterclasses';
import PartnerCardSection from '@/components/Industry/PartnerCardSection';
import IndustryEvents from '@/components/Industry/IndustryEvents';
import SuccessStories from '@/components/Industry/SuccessStories';
import StudentsAtWork from '@/components/Industry/StudentsAtWork';
import Testimonials from '@/components/Industry/Testimonials';
import FAQ from '@/components/Home/FAQ';

/**
 * /advantages/atlas-industry-centric-approach — port of
 * `reference/advantages/atlas-industry-centric-approach.php`, the fourth page
 * of the Advantages set and the seventh distinct Webflow stylesheet
 * (`…690c70a02322c69cf63510da-73be19199.css`, `$body = "body body-ugdx"`).
 *
 * Sections in the reference's own order:
 *    1  hero .main-cover-section-isme            InnerPageHero          14
 *    2  three figures .top-cards-wrapper         StatBand               22
 *    3  Steering Excellence, Guiding ATLAS       AdvisoryBoard          36
 *    4  Our Recruitment Partners                 RecruitmentPartners   106
 *    5  Industry Expert-Led Masterclasses        Masterclasses         330
 *    6  Industry Projects & Capstones            PartnerCardSection    460
 *    7  Industry Visits                          PartnerCardSection    512
 *    8  Bootcamp                                 PartnerCardSection    571
 *    9  Industry Mentorship Program              PartnerCardSection    623
 *   10  Industry Led Events on Campus            IndustryEvents        675
 *   11  Leadership Series                        PartnerCardSection    838
 *   12  Future Skills                            PartnerCardSection    890
 *   13  Student Success Stories                  SuccessStories        942
 *   14  Students at Work                         StudentsAtWork       1007
 *   15  Industry Testimonials                    Testimonials         1022
 *   16  Questions? We can read your mind         FAQ                  1110
 *
 * Unlike about-us.php and life-at-atlas.php, this page renders end to end —
 * nothing fatals before its footer — so webflow.js, Swiper and Bootstrap are
 * all live in the reference and every interaction was measured directly.
 *
 * ── Reuse ─────────────────────────────────────────────────────────────────
 * Four card shapes turned out to already exist, and three of the four moved
 * into `components/ui/` for this page (each verified against its origin page
 * afterwards):
 *
 *   AdvisorCard       `.card-type-d` — already shared with the homepage and
 *                     /about-us. Six of the same fourteen people.
 *   CardTypeF         `.card-type-f` — extracted from
 *                     /advantages/atlas-career-services "Career Connect".
 *                     55 of them on this page.
 *   SpeakerSlideCard  `.slider-card-e-ugdx > .slider-card-e-cont` — extracted
 *                     from that page's "Pre-Placement Talks"; this page adds
 *                     the employer logo (`img.comp-image`).
 *   PlacementCard     `.placement-card-atlas` — extracted from
 *                     /success-stories-atlas "Placements"; this page paints
 *                     the card indigo and narrows the logo to 20%.
 *
 * plus `InnerPageHero`, `StatBand` (the same three washes /campus-atlas uses),
 * `PillTabs` + `LogoGrid`, `GridGallery`, `TestimonialCard`, `Carousel`,
 * `ZoomSliderLg`, `FAQ` and the `SectionHead` constants. `TertiaryTabStrip`
 * was split out of `TertiaryTabs` so this page's year tabs can carry
 * carousels instead of a photo panel.
 *
 * `PartnerCardSection` is local rather than shared: it is six repeats of the
 * same section *on this page*, and nothing else on the site has that shape.
 *
 * ── One deliberate deviation ──────────────────────────────────────────────
 * `.testimonial-card` is `width: 100%` inside a `slidesPerView: 'auto'` slide,
 * so between 568 and 767px the percentage resolves against an auto width and
 * the card measures 1127px at a 700px viewport — the reference's page really
 * does scroll horizontally there (scrollWidth 569 at 360-568px). The shared
 * `TestimonialCard` uses the container width instead, which is what the
 * reference renders everywhere the bug does not bite.
 *
 * ── Two ids the reference authors and this port keeps ─────────────────────
 * None. Unlike /campus-atlas and /success-stories-atlas, no id is duplicated
 * here; only the FAQ carries one (`#faq`), from the shared component.
 */
export const metadata = {
  title: industryContent.meta.title,
  description: industryContent.meta.description,
};

export default function AtlasIndustryCentricApproachPage() {
  const c = industryContent;

  return (
    <>
      <InnerPageHero hero={c.hero} />
      <StatBand data={c.stats} />
      <AdvisoryBoard />
      <RecruitmentPartners />
      <Masterclasses />
      <PartnerCardSection data={c.projects} />
      <PartnerCardSection data={c.visits} />
      <PartnerCardSection data={c.bootcamp} wide />
      <PartnerCardSection data={c.mentorship} />
      <IndustryEvents />
      <PartnerCardSection data={c.leadership} />
      <PartnerCardSection data={c.futureSkills} />
      <SuccessStories />
      <StudentsAtWork />
      <Testimonials />
      <FAQ data={c.faq} />
    </>
  );
}
