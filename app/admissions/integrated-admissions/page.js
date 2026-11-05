import {
  hero,
  findYourPath,
  testimonials,
  banner,
  faq,
} from '@/lib/integratedAdmissionsContent';

import InnerPageHero from '@/components/ui/InnerPageHero';
import OurSchools from '@/components/About/OurSchools';
import KeyDates from '@/components/Admissions/KeyDates';
import StandOut from '@/components/Admissions/StandOut';
import Scholarships from '@/components/Admissions/Scholarships';
import Testimonials from '@/components/Home/Testimonials';
import InfoBanner from '@/components/ui/InfoBanner';
import FAQ from '@/components/Home/FAQ';

/**
 * /admissions/integrated-admissions — port of
 * `reference/admissions/integrated-admissions.php`, the first of the three
 * Admissions pages. `$css = "…6915ca0b61d85144edd1d44e-e809c9c17.css"`, a tenth
 * distinct sheet; `$body = "body atlas-page"`.
 *
 * Sections in the reference's own order:
 *    1  hero .main-cover-section-isme            InnerPageHero        107
 *    2  Find Your Path within ATLAS SkillTech    OurSchools           119
 *    3  Key Dates & Deadlines                    KeyDates             161
 *    4  What Makes You Stand Out                 StandOut             311
 *    5  Empowering Ambition Through              Scholarships         392
 *       Scholarships
 *    6  In their own words: Why ATLAS feels      Testimonials         401
 *       right
 *    7  Experience the ATLAS Campus in Person    InfoBanner           816
 *    8  Questions? We can read your mind         FAQ         faq include
 *
 * ── The local reference cannot be rendered at all ─────────────────────────
 * Every earlier page that fatals (about-us, life-at-atlas, atlas-advantages,
 * atlas-multidisciplinary) does so at a commented-out `faq.php` include near
 * the *end*, so everything above it still renders. This one fatals at line 16:
 * the page's first statement is `new mysqli("localhost", "diceapp_dice", …)`
 * and that database is not reachable from this checkout, so PHP throws
 * `mysqli_sql_exception: Access denied` before a single byte of the body is
 * emitted. `curl` returns header.php's output and the exception, nothing else.
 *
 * So this page was measured against **production**,
 * `https://atlasuniversity.edu.in/admissions/integrated-admissions`, which
 * serves the same `$css`, starts with a doctype (`document.compatMode` is
 * `CSS1Compat`, so none of the quirks-mode artefacts the mirror produces apply)
 * and runs the real Swiper, Bootstrap and Webflow tab widget. All twelve widths
 * from 1920 down to 360 were measured there, and the B.Tech key dates — the one
 * piece of this page that is database-driven — are snapshotted from it. See the
 * header of `lib/integratedAdmissionsContent.js`.
 *
 * ── What is shared, and what is new ───────────────────────────────────────
 * Five of the eight sections are existing components; each was measured on this
 * reference before being reused, and each change to a shared component is
 * additive and defaulted, so the pages that already use them are untouched.
 *
 *   InnerPageHero   `.main-cover-section-isme`, identical to the three
 *                   Advantages heroes apart from the
 *                   `.course-duration-isme.atlas` eyebrow above the title,
 *                   which is now an optional `hero.eyebrow`.
 *   OurSchools      `.atlas-cards-wrapper > .atlas-cards-grid`, the /about-us
 *                   block, here with two of the same four cards. Now takes
 *                   `data`, defaulting to the About page's.
 *   Testimonials    the homepage's four-tab set — same 26 cards, diffed quote
 *                   by quote, one card's `.st-course` differs. Now takes `data`
 *                   and a `headingVariant`, because this page's heading is
 *                   `.h2-tag.isdi` (Poppins 400, turning at 991) rather than
 *                   the homepage's plain `.h2-tag` (Manrope 500, turning at
 *                   767).
 *   InfoBanner      `.info-banner-atlas`, here with `.no-radius` and as a
 *                   direct child of `.section` rather than nested in a
 *                   `.container` — so it spans the viewport and drops the 32px
 *                   corners. That is the new `fullBleed` prop.
 *   FAQ             already `data`-driven; four questions from
 *                   `assets/include/faq/atlas/admissions/integrated-admissions.php`.
 *   PillTabStrip    `.rounded-tabs-mint > .tabs-menu-mint.less-space`, used by
 *                   KeyDates, measured identical to the homepage's.
 *   Carousel        `.swiper.common-swiper`, used by StandOut.
 *
 * Three sections are new, and all three are `data`-driven because
 * `pg-admissions.php` and `ug-admissions.php` carry the same shapes:
 * `KeyDates`, `StandOut` and `Scholarships` in `components/Admissions/`.
 *
 * ── Reference notes ───────────────────────────────────────────────────────
 *  - `$arrow = "law-down-arrow.svg"` is assigned immediately before the FAQ
 *    include, which never reads it — the include hard-codes
 *    `atlas-down-arrow.svg` in its own `<style>`. Dead assignment, not ported.
 *  - The Law tab is the one that opens (`data-current="Tab 5"`), not uGDX.
 *  - "Schedule a Visit" carries `id="campus-visit"`, and the NoPaperForms popup
 *    binds to `[data-id="campus-visit"]`, so it matches nothing and the anchor
 *    behaves as the plain link it is ported as — the same call /campus-atlas
 *    and the Advantages pages already made.
 *  - The `.df-container-atlas` nested inside itself on the uGDX tab, and the
 *    law table's `<style>` embedded twice, are both recorded on `KeyDates`.
 */
export const metadata = {
  title: 'Integrated Program Admissions in Mumbai  – ATLAS SkillTech University',
  description:
    'Apply for integrated UG+PG programs, dual degrees and combined pathways that fast-track academic progression and professional readiness.',
};

export default function IntegratedAdmissionsPage() {
  return (
    <>
      <InnerPageHero hero={hero} />
      <OurSchools data={findYourPath} />
      <KeyDates />
      <StandOut />
      <Scholarships />
      <Testimonials data={testimonials} headingVariant="isdi" videoVariant="plain" />
      {/* `.info-banner-title.no-bar` — margin-bottom 0 above 767, then 16 and
          14 below 479, against the plain title's 32 */}
      <InfoBanner
        banner={banner}
        fullBleed
        titleClassName="max-md:mb-4 max-sm:mb-[14px]"
      />
      <FAQ data={faq} />
    </>
  );
}
