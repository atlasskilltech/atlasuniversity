import { multidisciplinaryContent } from '@/lib/multidisciplinaryContent';

import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import AtlasAdvantage from '@/components/Multidisciplinary/AtlasAdvantage';
import Electives from '@/components/Advantages/Electives';
import Collaborate from '@/components/Multidisciplinary/Collaborate';
import CollaborativeSpaces from '@/components/Multidisciplinary/CollaborativeSpaces';
import InfoBanner from '@/components/ui/InfoBanner';
import FAQ from '@/components/Home/FAQ';

/**
 * /advantages/atlas-multidisciplinary — port of
 * `reference/advantages/atlas-multidisciplinary.php`, the sixth page of the
 * Advantages set and the ninth distinct Webflow stylesheet
 * (`…690da3f19d4bbf0f28096449-f8f617445.css`, `$body = "body body-ugdx"`).
 *
 * Sections in the reference's own order:
 *   1  hero .main-cover-section-isme            InnerPageHero          15
 *   2  three figures .top-cards-wrapper         StatBand               23
 *   3  The ATLAS Advantage                      AtlasAdvantage         37
 *   4  ATLAS Electives                          Electives              70
 *   5  Collaborate. Co-Create. Cross Boundaries Collaborate           311
 *   6  Collaborative Spaces                     CollaborativeSpaces   329
 *   7  One University. Infinite Possibilities.  InfoBanner            422
 *   8  Questions? We can read your mind         FAQ                   444
 *
 * ── This page fatals before its footer ────────────────────────────────────
 * Line 439 is `<!--<?php include "assets/include/faq.php" ?>-->`. An HTML
 * comment does not stop PHP, so the include runs, dies on a missing database
 * handle, and everything after it is lost: the real FAQ include, footer.php,
 * and with it Swiper's JS, Bootstrap and webflow.js. The same defect
 * about-us.php, life-at-atlas.php and atlas-advantages.php carry.
 *
 * So the reference's own carousel and tab widget do not work, and its FAQ never
 * renders. Measuring it means restoring the doctype, stripping *both* copies of
 * the PHP warning, injecting swiper-bundle and re-running footer.php's
 * initialisers verbatim (`scratchpad/mu_measure.py`). The FAQ is transcribed
 * from the include the page names but never reaches.
 *
 * ── Almost entirely reuse ─────────────────────────────────────────────────
 * Not one card shape here is new. `InnerPageHero`, `StatBand`,
 * `CareerSupportCard` (its `manrope` title, which is what `.cr-title.atlas`
 * renders), `PillTabs` via `Electives`, `ZoomSliderLg` + `ChipSlideCard`,
 * `PrimaryButton`, `InfoBanner`, `FAQ` and the `SectionHead` constants.
 * `Electives` became `data`-driven for this page: the same five tab labels as
 * /advantages/atlas-advantages, but 8 cards in every tab rather than 8/8/8/4/4.
 *
 * Only two sections are local, and both are shapes nothing else on the site
 * has: `AtlasAdvantage` (a plain `.head-wrap` over three career-support cards)
 * and `Collaborate` (two titled `.common-wrapper` embeds stacked).
 *
 * ── Assets ────────────────────────────────────────────────────────────────
 * 61, all from the Webflow CDN. Only 10 are new; every elective photograph and
 * the closing banner's image were already downloaded for
 * /advantages/atlas-advantages and /advantages/atlas-career-services, and each
 * reuse was proven byte-identical by SHA-1.
 *
 * ── One dead script, not ported ───────────────────────────────────────────
 * The trailing `.code-embed-6` block wires a NoPaperForms popup to
 * `[data-id="campus-visit"]`. The banner's second button carries `id=`, not
 * `data-id=`, so the listener matches nothing and "Schedule a Visit" is the
 * plain link it behaves as — the same call /campus-atlas and
 * /advantages/atlas-advantages already make. (That block sits after the fatal
 * anyway, so the reference never even parses it.)
 */
export const metadata = {
  title: multidisciplinaryContent.meta.title,
  description: multidisciplinaryContent.meta.description,
};

export default function AtlasMultidisciplinaryPage() {
  const c = multidisciplinaryContent;

  return (
    <>
      <InnerPageHero hero={c.hero} />
      <StatBand data={c.stats} />
      <AtlasAdvantage />
      <Electives data={c.electives} idPrefix="multidisciplinary-electives" />
      <Collaborate />
      <CollaborativeSpaces />
      <InfoBanner banner={c.banner} titleClassName="max-md:mb-4 max-sm:mb-[14px]" />
      <FAQ data={c.faq} />
    </>
  );
}
