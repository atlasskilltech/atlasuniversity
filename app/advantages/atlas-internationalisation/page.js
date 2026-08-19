import { internationalisationContent } from '@/lib/internationalisationContent';

import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import ThinkInternational from '@/components/International/ThinkInternational';
import WorldMap from '@/components/International/WorldMap';
import GlobalPartnerships from '@/components/International/GlobalPartnerships';
import WorldClassLearning from '@/components/International/WorldClassLearning';
import Voices from '@/components/International/Voices';
import StudentExperiences from '@/components/International/StudentExperiences';
import InternationalAffairs from '@/components/International/InternationalAffairs';
import FAQ from '@/components/Home/FAQ';

/**
 * /advantages/atlas-internationalisation — port of
 * `reference/advantages/atlas-internationalisation.php`, the fifth page of the
 * Advantages set and the eighth distinct Webflow stylesheet
 * (`…690c95c2ccf14f412c38ce03-20206b81f.css`, `$body = "body body-ugdx"`).
 *
 * Sections in the reference's own order:
 *    1  hero .main-cover-section-isme            InnerPageHero          315
 *    2  six figures .top-cards-wrapper           StatBand               323
 *    3  Think International. Learn International ThinkInternational     355
 *    4  With ATLAS, the world is within…         WorldMap               464
 *    5  Our Global Partnerships                  GlobalPartnerships     470
 *    6  World-Class Learning. Right Here…        WorldClassLearning     995
 *    7  Voices Around the World                  Voices                1036
 *    8  Our Student Experiences                  StudentExperiences    1290
 *    9  Office of International Affairs          InternationalAffairs  1589
 *   10  Questions? We can read your mind         FAQ                   1636
 *
 * The reference renders end to end — its FAQ include is a live `include`, not
 * a commented-out one — so webflow.js, Swiper and Bootstrap are all running and
 * every interaction was measured directly.
 *
 * ── This page is defined by its own inline `<style>` block ────────────────
 * 300 lines of it, ahead of the markup, and it is where most of the page's
 * design actually lives: `.square-card` (width 100%, no radius, 22px title),
 * `.sm-text-isme`/`.large-text` (36/20 rather than 24/32), `.head-top-card`
 * (centred, 10px inset), `.grid-img-wrap` (265x100), `.testimonial-card`
 * (100% / auto), `.testimonial-custom-card` (320x500 white), the video
 * play/pause button and the two circular slider arrows. Reading only the
 * `$css` sheet gets this page wrong in six places.
 *
 * ── Five blocks are commented out upstream ────────────────────────────────
 * The "Explore More" button, the eight-card `.grid-gallery-flex` wall, the
 * text half of every "Voices" card, the "Our Student Experiences" lead and a
 * fourth `.card-type-e`. None is ported and none of their assets downloaded.
 *
 * ── Reuse ─────────────────────────────────────────────────────────────────
 * `InnerPageHero` (a new `scrim` variant — this page re-declares
 * `.hero-cont-wrapper-isme`'s gradient with its stop at 120% rather than 84%),
 * `StatBand` (a new `figure` variant), `PillTabs` +
 * `LogoGrid` (a new `wide` cell size), `PeopleCarousel`, `Carousel` (new
 * `autoplay` and `arrows` props), `SmartLink`, `FAQ` and the `SectionHead`
 * constants. `components/ui/VideoTestimonialCard` is new and serves both video
 * sections. The square card is deliberately **not** shared with
 * `components/Home/ThinkInternational`: same class name, different card.
 *
 * ── One reference defect, not reproduced ──────────────────────────────────
 * At exactly 768px the six-card stat band overflows the viewport by 63px —
 * `flex: 1 1 0` cards floored by `min-width: auto`. `StatBand` adds `min-w-0`
 * so the declared flex can shrink; nothing moves at any other width.
 *
 * (The local mirror also appears to overflow below 568px. That is not the page:
 * `assets/include/dynamic.php` is included twice and emits its "missing
 * connection.php" warning a second time *after* the doctype, as a ~380px block
 * of text in the footer.)
 */
export const metadata = {
  title: internationalisationContent.meta.title,
  description: internationalisationContent.meta.description,
};

export default function AtlasInternationalisationPage() {
  const c = internationalisationContent;

  return (
    <>
      <InnerPageHero hero={c.hero} scrim="soft" />
      <StatBand data={c.stats} variant="figure" />
      <ThinkInternational />
      <WorldMap />
      <GlobalPartnerships />
      <WorldClassLearning />
      <Voices />
      <StudentExperiences />
      <InternationalAffairs />
      <FAQ data={c.faq} />
    </>
  );
}
