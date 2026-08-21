import {
  hero,
  findYourPath,
  keyDates,
  standOut,
  scholarships,
  testimonials,
  banner,
  faq,
} from '@/lib/pgAdmissionsContent';

import InnerPageHero from '@/components/ui/InnerPageHero';
import OurSchools from '@/components/About/OurSchools';
import KeyDates from '@/components/Admissions/KeyDates';
import StandOut from '@/components/Admissions/StandOut';
import Scholarships from '@/components/Admissions/Scholarships';
import Testimonials from '@/components/Home/Testimonials';
import InfoBanner from '@/components/ui/InfoBanner';
import FAQ from '@/components/Home/FAQ';

/**
 * /admissions/pg-admissions — port of `reference/admissions/pg-admissions.php`,
 * the second of the three Admissions pages. `$css =
 * "…690de083898469d22c882cab-0c046c29c.css"`, an eleventh distinct sheet;
 * `$body = "body atlas-page"`.
 *
 * The same eight sections, in the same order, as
 * /admissions/integrated-admissions:
 *    1  hero .main-cover-section-isme            InnerPageHero        103
 *    2  Find Your Path within ATLAS SkillTech    OurSchools           123
 *    3  Key Dates & Deadlines                    KeyDates             153
 *    4  What Makes You Stand Out                 StandOut             210
 *    5  Empowering Ambition Through              Scholarships         288
 *       Scholarships
 *    6  In their own words: Why ATLAS feels      Testimonials         304
 *       right
 *    7  Experience the ATLAS Campus in Person    InfoBanner           619
 *    8  Questions? We can read your mind         FAQ         faq include
 *
 * Every component is one this page shares; nothing new was written for it. It
 * fatals locally exactly as integrated-admissions does — `new mysqli(…)` on
 * line 14, before any body output — so it was measured against production,
 * `https://atlasuniversity.edu.in/admissions/pg-admissions`.
 *
 * Lines 649-1057 are a commented-out earlier FAQ block, line by line. Dead
 * markup, not ported.
 *
 * ── What differs from /admissions/integrated-admissions ───────────────────
 *   Key Dates    two tabs, both `strip` (no static table), and the ISDI tab
 *                holds **two** strips — M.Des and MBA DMST, each with its own
 *                button, the second in `.dates-fees-container-atlas.mrgtp`.
 *                Hence `tab.blocks[]`, which integrated-admissions now uses too
 *                with a single entry. Every cell but "Application(s) Start"
 *                resolves to `showDateCon()`'s literal `<b>Closed</b>`.
 *   Stand Out    the same eight cards under a longer lead, and the carousel
 *                carries `.mrg-mob-tp-0`, which zeroes its 40px top padding
 *                below 768px.
 *   Scholarships the "Know More" button sits in a `.btn-normal-wrap`, so below
 *                768px it keeps its natural width instead of being stretched to
 *                the container by `.head-wrap.top`'s `align-items: stretch`.
 *   Testimonials four tabs holding the identical four video cards (see
 *                `lib/pgAdmissionsContent.js`), a third quote icon, a second
 *                watermark, a play button on two cards per copied tab, and a
 *                square-cornered video rather than the homepage's `56px 0`.
 *   Banner       the same band, with an authored `<br />` in the heading.
 *
 * ── Reference notes ───────────────────────────────────────────────────────
 *  - The Varsha Sharma testimonial authors an `.mp4` and a `.webm`; the mp4 is
 *    **dead upstream** (S3 answers `403 AccessDenied`) and production itself
 *    plays the webm. The webm is what ships.
 *  - `$arrow = "law-down-arrow.svg"` is again assigned and never read.
 *  - The hero's policy button links to the internal `/flipbook/pg-policy/`; the
 *    fliphtml5 URL integrated-admissions uses is commented out above it.
 *  - "Schedule a Visit" carries no `data-id`, so the NoPaperForms popup binds
 *    to nothing and the anchor is the plain link it is ported as.
 */
export const metadata = {
  title: 'Postgraduate Admissions & Programs in Mumbai – ATLAS ISME',
  description:
    'Find postgraduate admission details, course lists, eligibility, application process and career outcomes for masters and specialized programs.',
};

export default function PgAdmissionsPage() {
  return (
    <>
      <InnerPageHero hero={hero} />
      <OurSchools data={findYourPath} />
      <KeyDates data={keyDates} />
      <StandOut data={standOut} />
      <Scholarships data={scholarships} />
      <Testimonials data={testimonials} headingVariant="isdi" videoVariant="plain" />
      {/* `.info-banner-title.no-bar` — see /admissions/integrated-admissions */}
      <InfoBanner banner={banner} fullBleed titleClassName="max-md:mb-4 max-sm:mb-[14px]" />
      <FAQ data={faq} />
    </>
  );
}
