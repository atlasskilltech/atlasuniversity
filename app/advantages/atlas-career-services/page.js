import { careerServicesContent } from '@/lib/careerServicesContent';

import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import Brands from '@/components/CareerServices/Brands';
import Testimonials from '@/components/CareerServices/Testimonials';
import CareerConnect from '@/components/CareerServices/CareerConnect';
import PrePlacement from '@/components/CareerServices/PrePlacement';
import CareerSupport from '@/components/CareerServices/CareerSupport';
import StudentsAtWork from '@/components/CareerServices/StudentsAtWork';
import Team from '@/components/CareerServices/Team';
import Collaborate from '@/components/CareerServices/Collaborate';
import FAQ from '@/components/Home/FAQ';

/**
 * /advantages/atlas-career-services — port of
 * `reference/advantages/atlas-career-services.php`, the second page of the
 * Advantages set.
 *
 * Sections in the reference's own order:
 *    1  hero .main-cover-section-isme            InnerPageHero         14
 *    2  three figures .top-cards-wrapper         StatBand              22
 *    3  Brands That Back Our Students            Brands                36
 *    4  Industry Testimonials                    Testimonials         260
 *    5  Career Connect                           CareerConnect        361
 *    6  Pre-Placement Talks                      PrePlacement         458
 *    7  Student Testimonials                     Testimonials         552
 *    8  Our Career Support Services              CareerSupport        600
 *    9  Our Students at Work                     StudentsAtWork       675
 *   10  Office of Career Services & Corporate    Team                 730
 *       Relations Team
 *   11  Collaborate with us                      Collaborate          823
 *   12  Questions? We can read your mind         FAQ                  840
 *
 * ── This page renders ─────────────────────────────────────────────────────
 * Unlike /advantages/atlas-advantages, /about-us and /life-at-atlas, this
 * reference has no fatal PHP error, so footer.php loads and its own Swiper,
 * Bootstrap and Webflow tab widget all run. Every slider, tab set and the
 * accordion could therefore be measured live rather than reconstructed.
 *
 * ── What is shared, and why ───────────────────────────────────────────────
 * This page is almost entirely reuse; every candidate was measured on both
 * pages before being shared.
 *
 *   InnerPageHero      `.main-cover-section-isme`, identical to
 *                      /advantages/atlas-advantages' apart from having no
 *                      buttons — so the button row is now optional.
 *   StatBand           `.top-cards-wrapper > .head-top-card`.
 *   PillTabs           the recruiter tab set, on `wide` spacing.
 *   LogoGrid           `.logos-grid`, and 41 of its logos were already local
 *                      from /success-stories' "Our Recruitment Partners".
 *   TestimonialCard    `.testimonial-card.bgc1.atlas`, extracted from
 *                      Success/IndustryTestimonials for this page's two
 *                      carousels.
 *   ZoomSlider         `.swiper.zoom-slider`, the /life-at-atlas carousel.
 *   ZoomSliderLg       `.swiper.zoom-slider-lg.mrg-lft`, exactly as
 *                      /campus-atlas "Studios, Labs, and Classrooms" uses it.
 *   CareerSupportCard  `.career-sup-card.ugdx` on its `poppins` title variant.
 *   GridGallery        `.grid-gallery` on the `atlas` card.
 *   PeopleCarousel     `.card-type-e` on the `atlas-blue` tone.
 *   InfoBanner         `.info-banner-atlas`, extracted from
 *                      Life/LifeBanner + Campus/CampusVisitBanner, with an
 *                      optional contact line this page is the only one to use.
 *   Carousel, FAQ, PrimaryButton, SectionHead constants.
 *
 * Only two card shapes are this page's own: `.card-type-f` (Career Connect)
 * and this variant of `.slider-card-e-ugdx` (Pre-Placement Talks), whose
 * caption differs from /campus-atlas'.
 *
 * ── Reference notes ───────────────────────────────────────────────────────
 *  - The "Collaborate with us" button's href is `#`; transcribed as authored.
 *  - `.card-type-f.swiper-slide { width: 282px }` never applies: the card sits
 *    inside a `.swiper-slide` rather than being one, so it keeps its 272px.
 *  - Every `.slide-cd-e-desc` in Pre-Placement Talks is empty, but it is a real
 *    box with a 10px top padding, so it is rendered.
 */
export const metadata = {
  title: careerServicesContent.meta.title,
  description: careerServicesContent.meta.description,
};

export default function AtlasCareerServicesPage() {
  return (
    <>
      <InnerPageHero hero={careerServicesContent.hero} />
      <StatBand data={careerServicesContent.stats} />
      <Brands />
      <Testimonials data={careerServicesContent.industryTestimonials} />
      <CareerConnect />
      <PrePlacement />
      <Testimonials data={careerServicesContent.studentTestimonials} />
      <CareerSupport />
      <StudentsAtWork />
      <Team />
      <Collaborate />
      <FAQ data={careerServicesContent.faq} />
    </>
  );
}
