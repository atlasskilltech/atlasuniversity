import {
  hero,
  findYourPath,
  keyDates,
  standOut,
  scholarships,
  testimonials,
  banner,
  faq,
} from '@/lib/ugAdmissionsContent';

import InnerPageHero from '@/components/ui/InnerPageHero';
import OurSchools from '@/components/About/OurSchools';
import KeyDates from '@/components/Admissions/KeyDates';
import StandOut from '@/components/Admissions/StandOut';
import Scholarships from '@/components/Admissions/Scholarships';
import Testimonials from '@/components/Home/Testimonials';
import InfoBanner from '@/components/ui/InfoBanner';
import FAQ from '@/components/Home/FAQ';

/**
 * /admissions/ug-admissions — port of `reference/admissions/ug-admissions.php`,
 * the last of the three Admissions pages. `$css =
 * "…690dcdd80d8269c1849947a1-532aa6888.css"`, a twelfth distinct sheet;
 * `$body = "body atlas-page"`.
 *
 * The same eight sections, in the same order, as the other two:
 *    1  hero .main-cover-section-isme            InnerPageHero        152
 *    2  Find Your Path within ATLAS SkillTech    OurSchools           180
 *    3  Key Dates & Deadlines                    KeyDates             230
 *    4  What Makes You Stand Out                 StandOut             522
 *    5  Empowering Ambition Through              Scholarships         600
 *       Scholarships
 *    6  In their own words: Why ATLAS feels      Testimonials         616
 *       right
 *    7  Experience the ATLAS Campus in Person    InfoBanner          1027
 *    8  Questions? We can read your mind         FAQ         faq include
 *
 * No new component, and **no new asset** — all 54 it needs were already local
 * and byte-identical by SHA-1. It fatals locally the same way the other two do
 * (`new mysqli(…)`, here on line 57, before any body output), so it was
 * measured against production.
 *
 * ── This page has its own `<style>` block, ahead of the markup ────────────
 * `ug-admissions.php:11-54`, and it is the only thing that makes the hero
 * differ from the other two Admissions heroes. It re-declares
 * `.buttons-wrapper` — the gap stays 16 at every width rather than dropping to
 * 8 at 991, and the alignment and padding change at **576** — and it declares
 * `.btn-ca`, a fourth button shape. Both are recorded on the components that
 * carry them (`InnerPageHero`'s `row-576`, `PrimaryButton`'s `atlas-576`), and
 * the 576px breakpoint is `max-576` in `tailwind.config.js`.
 *
 * ── What differs from the other two Admissions pages ─────────────────────
 *   hero          four buttons, not three. The extra one is "Continue
 *                 Application", a `.btn-ca` linking off-site to
 *                 `atlasuniversity.edu.in/admissions`.
 *   Find Your Path four cards — ISDI, ISME, uGDX and Law — where
 *                 integrated-admissions has two and /about-us has its own four.
 *   Key Dates     **four tabs, and only one of them is database-driven.** The
 *                 page comments out the live include above each calendar and
 *                 calls a hand-authored `keydates-static/` file instead; only
 *                 uGDX still runs `btech.php`. The ISME tab stacks two tables.
 *                 All four tables sit in a `.df-container-atlas` carrying an
 *                 inline `border: none`, so they have no indigo frame — unlike
 *                 integrated-admissions' law table, which keeps it.
 *   Scholarships  `.btn-normal-wrap`, as on /admissions/pg-admissions.
 *   Testimonials  byte-for-byte the same 26 cards as
 *                 /admissions/integrated-admissions (diffed card by card), so
 *                 the export is re-used rather than duplicated. Same for the
 *                 closing banner.
 *
 * ── Reference notes ───────────────────────────────────────────────────────
 *  - `$arrow = "law-down-arrow.svg"` is assigned a third time and never read.
 *  - Each static calendar carries commented-out rows and a commented-out "Next
 *    Cycle" column, which is why `colspan="3"` (4 on the law table) sits over a
 *    two-column body. Transcribed as authored.
 *  - The B.Sc table's "Applications Opened" reads **Sep 2026** where the other
 *    three read Sep 2025.
 *  - "Schedule a Visit" carries `id="campus-visit"` while the NoPaperForms
 *    popup binds to `[data-id]`, so it is the plain link it is ported as.
 */
export const metadata = {
  title: 'Admissions Guidance  – ATLAS SkillTech University',
  description:
    'Planning UG admissions? Explore eligibility, courses, application steps and get guidance to apply today.',
};

export default function UgAdmissionsPage() {
  return (
    <>
      <InnerPageHero hero={hero} buttonWrap="row-576" />
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
