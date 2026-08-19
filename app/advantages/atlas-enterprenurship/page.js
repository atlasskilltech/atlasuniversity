import { entrepreneurshipContent } from '@/lib/entrepreneurshipContent';

import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import PortCardSection from '@/components/Entrepreneurship/PortCardSection';
import ChipSliderSection from '@/components/Entrepreneurship/ChipSliderSection';
import FourYearJourney from '@/components/Advantages/FourYearJourney';
import Backing from '@/components/Entrepreneurship/Backing';
import Founders from '@/components/Entrepreneurship/Founders';
import InfoBanner from '@/components/ui/InfoBanner';
import FAQ from '@/components/Home/FAQ';

/**
 * /advantages/atlas-enterprenurship — port of
 * `reference/advantages/atlas-enterprenurship.php`, the third page of the
 * Advantages set. (The reference misspells "entrepreneurship" in the filename
 * and therefore in the URL; the route matches it, because the site's own
 * navigation links there.)
 *
 * Sections in the reference's own order:
 *    1  hero .main-cover-section-isme            InnerPageHero         14
 *    2  two figures .top-cards-wrapper           StatBand              25
 *    3  More Than a Degree                       PortCardSection       35
 *    4  Our Teaching Pedagogy: The 3H Approach   ChipSliderSection    147
 *    5  The 4 Year Journey to Success            FourYearJourney      250
 *    6  Learning Through Entrepreneurial Action  ChipSliderSection    321
 *    7  8 Steps of IPR Enablement Flow           PortCardSection      375
 *    8  All the backing you need                 Backing              547
 *    9  From Campus to Company                   Founders             591
 *   10  Your Future Begins Here.                 InfoBanner           649
 *   11  Questions? We can read your mind         FAQ                  668
 *
 * ── This page is entirely reuse ───────────────────────────────────────────
 * Not one card shape here is new. Every candidate was measured on both pages
 * before being shared:
 *
 *   InnerPageHero      `.main-cover-section-isme`; this hero wraps its single
 *                      button in `.button-wrap` rather than `.buttons-wrapper`,
 *                      which is a genuinely different box, so the shared hero
 *                      gained a `buttonWrap` variant.
 *   StatBand           twice — under the hero (two cards) and, unusually,
 *                      mid-section inside "The 3H Approach" (three cards).
 *   PortCardM          `.port-card-m-wrap-atlas`, extracted from
 *                      Home/IndustryOnCampus; these two carousels are the same
 *                      card without its logo strip.
 *   ChipSlideCard      `.slider-card-e-atlas-2`, extracted from
 *                      Campus/StudiosLabs; used twice here.
 *   ZoomSliderLg       the 0.6/0.65/1 scale ladder, with `.mrg-lft`.
 *   FourYearJourney    the identical section from
 *                      /advantages/atlas-advantages, reused whole — same four
 *                      cards, same copy, same `.size-big` hover reveal.
 *   PhotoColumns       `.grid-gallery-flex.sm.atlas`, extracted from
 *                      Campus/CampusOverview.
 *   GridGallery        `.grid-gallery` on the `atlas` card.
 *   InfoBanner         `.info-banner-atlas` with two buttons.
 *   Carousel, FAQ, PrimaryButton, SectionHead constants.
 *
 * ── Reference notes ───────────────────────────────────────────────────────
 *  - "From Campus to Company - Student Startup Founders" is printed twice, as
 *    both the heading and its lead. Transcribed as authored.
 *  - Two of the six "All the backing you need" captions are empty, painting
 *    only the scrim over those photographs.
 *  - This page loads a newer webflow bundle than the others
 *    (`webflow.ee913841…` rather than `webflow.1ba7f46b…`); nothing on the page
 *    depends on the difference, since no IX2 interaction is used here.
 */
export const metadata = {
  title: entrepreneurshipContent.meta.title,
  description: entrepreneurshipContent.meta.description,
};

export default function AtlasEntrepreneurshipPage() {
  const c = entrepreneurshipContent;

  return (
    <>
      <InnerPageHero hero={c.hero} buttonWrap="column" />
      <StatBand data={c.stats} />
      <PortCardSection data={c.venture} />
      <ChipSliderSection data={c.pedagogy} stats={c.pedagogy.stats} spacedTop />
      <FourYearJourney data={c.journey} />
      <ChipSliderSection data={c.action} />
      <PortCardSection data={c.ipr} lead="mrgbtm32" />
      <Backing />
      <Founders />
      <InfoBanner banner={c.banner} titleClassName="max-md:mb-4 max-sm:mb-[14px]" />
      <FAQ data={c.faq} />
    </>
  );
}
