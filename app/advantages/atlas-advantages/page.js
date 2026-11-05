import { advantagesContent } from '@/lib/advantagesContent';

import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import CoreAdvantages from '@/components/Advantages/CoreAdvantages';
import MumbaiTabs from '@/components/Advantages/MumbaiTabs';
import CampusSpaces from '@/components/Advantages/CampusSpaces';
import Multidisciplinary from '@/components/Advantages/Multidisciplinary';
import Electives from '@/components/Advantages/Electives';
import SupportingYou from '@/components/Advantages/SupportingYou';
import YourDost from '@/components/Life/YourDost';
import SupportSystem from '@/components/Advantages/SupportSystem';
import GlobalLearning from '@/components/Advantages/GlobalLearning';
import IndustryOriented from '@/components/Advantages/IndustryOriented';
import Entrepreneurship from '@/components/Advantages/Entrepreneurship';
import FourYearJourney from '@/components/Advantages/FourYearJourney';
import ResearchCulture from '@/components/Advantages/ResearchCulture';
import FAQ from '@/components/Home/FAQ';

/**
 * /advantages/atlas-advantages — port of
 * `reference/advantages/atlas-advantages.php`, the first page of the
 * Advantages set.
 *
 * Sections in the reference's own order:
 *    1  hero .main-cover-section-isme            InnerPageHero         14
 *    2  three figures .top-cards-wrapper         StatBand              29
 *    3  ATLAS's Core Advantages                  CoreAdvantages        44
 *    4  Be in the Middle of Mumbai               MumbaiTabs           170
 *    5  A Place to Learn, Grow, Create, Belong   CampusSpaces         193
 *    6  Learn Across Disciplines                 Multidisciplinary    237
 *    7  ATLAS Electives                          Electives            279
 *    8  Supporting You Every Step of the Way     SupportingYou        480
 *    9  YourDOST - For your wellness             YourDost             521
 *   10  Your Support System, Away from Home      SupportSystem        550
 *   11  Learning Without Borders                 GlobalLearning       608
 *   12  Strongly Industry Oriented               IndustryOriented     664
 *   13  Entrepreneurship at ATLAS                Entrepreneurship     950
 *   14  The 4 Year Journey to Success            FourYearJourney      975
 *   15  A Culture of Inquiry and Innovation      ResearchCulture     1046
 *   16  Questions? We can read your mind         FAQ                 1067
 *
 * ── What is shared, and why ───────────────────────────────────────────────
 * Every candidate was measured on both pages before being shared; anything
 * that differed in more than content length got a prop rather than a fork.
 *
 *   StatBand           `.top-cards-wrapper > .head-top-card`, identical to
 *                      /campus-atlas' and /success-stories'. Only the label
 *                      colour differs and that already travels as data.
 *   Carousel           the two `.common-swiper-full` and one `.common-swiper`.
 *   PillTabs           three tab sets — two on `less` spacing, the industry
 *                      one on `wide`.
 *   LogoGrid           `.logos-grid`, identical to /success-stories'.
 *   GridGallery        `.grid-gallery`, identical to /success-stories'.
 *   PeopleCarousel     `.card-type-e`, the same six people as /life-at-atlas.
 *   YourDost           the same section as /life-at-atlas with byte-identical
 *                      copy and a different photograph, so it now takes `data`.
 *   PrimaryButton      `.btn-primary`, the hero's three buttons.
 *   ButtonRegular      `.button-regular`, the four section CTAs.
 *   FAQ                the include's `<style>` is the homepage's, so it is the
 *                      site-wide accordion with nine different questions.
 *
 * Three components were extracted for this page, each now used on two pages
 * and each verified against its original after the move:
 *   PhotoMosaic        the eight-cell mosaic (← Campus/LiveWhereYouLearn),
 *                      with `rounded` for wrapper-vs-cell corners.
 *   TertiaryTabs       the underlined tab widget (← Life/WellnessTabs), with
 *                      `rounded` for the panel's corners.
 *   CareerSupportCard  `.career-sup-card.ugdx` (← Success/CareerSupport), with
 *                      a title-font variant and an optional circular badge.
 *
 * The rest is this page's alone and stays in `components/Advantages/`.
 * `SectionHeadWithButton` and `VideoSection` are shapes that repeat four and
 * two times *within* this page.
 *
 * ── Reference defects and dead code, none reproduced ───────────────────────
 *  - The page fatals at line 1063: `<!--<?php include "assets/include/faq.php" ?>-->`
 *    is an HTML comment, which does not stop PHP, and the include dies on a
 *    missing database handle. So the reference itself never loads footer.php —
 *    no Swiper, no Bootstrap, no webflow.js — and its own carousels, tabs and
 *    accordion do not work. Measuring it needs the panes forced open; the
 *    working components the markup intends are what is built here.
 *  - `.btn-wraper.hide` in the last section wraps an "Explore Center of
 *    Research" button that `display: none` hides and whose href is `#`.
 *  - Both `<style>` blocks that drive the core-card hover are embedded twice,
 *    identically; one copy is enough.
 *  - The `.code-button` script sets `fontSize = getAttribute('data-font-size')
 *    + 'px'` from an empty attribute, i.e. the invalid string "px".
 *  - The NoPaperForms popup binds to `[data-id="campus-visit"]`, which matches
 *    nothing on this page (the anchor carries `id=`, not `data-id=`), so
 *    "Schedule a Visit" is the plain link it behaves as.
 */
export const metadata = {
  title: advantagesContent.meta.title,
  description: advantagesContent.meta.description,
};

export default function AtlasAdvantagesPage() {
  return (
    <>
      <InnerPageHero hero={advantagesContent.hero} />
      <StatBand data={advantagesContent.stats} />
      <CoreAdvantages />
      <MumbaiTabs />
      <CampusSpaces />
      <Multidisciplinary />
      <Electives />
      <SupportingYou />
      <YourDost data={advantagesContent.yourdost} />
      <SupportSystem />
      <GlobalLearning />
      <IndustryOriented />
      <Entrepreneurship />
      <FourYearJourney />
      <ResearchCulture />
      <FAQ data={advantagesContent.faq} />
    </>
  );
}
