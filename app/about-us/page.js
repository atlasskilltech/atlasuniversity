import { aboutContent } from '@/lib/aboutContent';
import { leadershipTeam } from '@/lib/homeContent';

import AboutHero from '@/components/About/AboutHero';
import OurSchools from '@/components/About/OurSchools';
import StoryBehindAtlas from '@/components/About/StoryBehindAtlas';
import MissionVision from '@/components/About/MissionVision';
import ChancellorNote from '@/components/About/ChancellorNote';
import LeadershipTeam from '@/components/Home/LeadershipTeam';
import AdvisoryBoard from '@/components/Home/AdvisoryBoard';
import Recognition from '@/components/About/Recognition';
import AtlasSpotlight from '@/components/Home/AtlasSpotlight';
import ShapingViksitBharat from '@/components/About/ShapingViksitBharat';
import AtlasInTheNews from '@/components/About/AtlasInTheNews';
import FAQ from '@/components/Home/FAQ';
import SecondaryButton from '@/components/ui/SecondaryButton';

/**
 * /about-us — port of `reference/about-us.php`.
 *
 * Sections in the reference's own order:
 *   1  hero .inner-header-wrapper.full-ht        AboutHero
 *   2  Our Schools                               OurSchools
 *   3  The Story Behind ATLAS                    StoryBehindAtlas
 *   4  Our Mission / Our Vision                  MissionVision      (reused)
 *   5  Chancellor's note                         ChancellorNote
 *   6  Leadership Team                           LeadershipTeam     (reused)
 *   7  Steering Excellence, Guiding ATLAS        AdvisoryBoard      (reused)
 *   8  Recognition that Reflects Our Commitment  Recognition
 *   9  ATLAS Spotlight                           AtlasSpotlight     (reused)
 *   10 Shaping a Viksit Bharat, Together         ShapingViksitBharat
 *   11 ATLAS in the News                         AtlasInTheNews
 *   12 Questions? We can read your mind          FAQ                (reused)
 *
 * Four sections are the homepage's components driven by this page's data:
 *   - MissionVision  is byte-identical on both pages, so it takes no props.
 *   - LeadershipTeam shows the same three people; this page renders them
 *     without the homepage's "Read more" button, so the buttons are stripped.
 *   - AdvisoryBoard  is the same fourteen people; this page adds a "View all"
 *     button in the head-wrap.
 *   - AtlasSpotlight is the same grid with eight different achievements.
 *
 * None of them takes styling from this page — only content. The shared
 * components own their own type, colour, spacing and interaction states.
 *
 * ── Reference defect worth recording ──────────────────────────────────────
 * `about-us.php:896` is `<!--<?php include "assets/include/faq.php" ?>-->`.
 * An HTML comment does not stop PHP, so the include still runs, and faq.php
 * needs a database handle this copy has no connection for — the page fatals
 * there. Everything after it is therefore missing locally: the footer, the
 * Bootstrap bundle and the Swiper initialiser. That is why the reference's own
 * accordion cannot be opened and its three sliders never initialise. Both are
 * implemented here as the working components the markup clearly intends — and
 * the FAQ is the site-wide `components/Home/FAQ`, so its look and behaviour are
 * the homepage's, with only the questions differing.
 */
export const metadata = {
  title: aboutContent.meta.title,
  description: aboutContent.meta.description,
};

/* the page renders the same three leaders as the homepage, but with no button */
const leadership = {
  ...leadershipTeam,
  heading: aboutContent.leadership.heading,
  people: leadershipTeam.people.map((person) => ({ ...person, button: null })),
};

export default function AboutUsPage() {
  return (
    <>
      <AboutHero />
      <OurSchools />
      <StoryBehindAtlas />
      <MissionVision />
      <ChancellorNote />
      <LeadershipTeam data={leadership} />
      <AdvisoryBoard
        action={
          <SecondaryButton href={aboutContent.advisoryAction.href}>
            {aboutContent.advisoryAction.label}
          </SecondaryButton>
        }
      />
      <Recognition />
      <AtlasSpotlight data={aboutContent.spotlight} />
      <ShapingViksitBharat />
      <AtlasInTheNews />
      <FAQ data={aboutContent.faq} />
    </>
  );
}
