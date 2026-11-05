import Hero from '@/components/Schools/ISDI/About/Hero';
import StatsBand from '@/components/Schools/ISDI/StatsBand';
import Story from '@/components/Schools/ISDI/StoryPair';
import Spotlight from '@/components/Schools/ISDI/Startups/Spotlight';
import LogoBand from '@/components/Schools/ISDI/Startups/LogoBand';
import FAQ from '@/components/Home/FAQ';
import {
  faq, gallery, hero, marquee, stats, story,
} from '@/lib/schools/isdi/startupsContent';

/*
 * ref startups.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description,
 * Open Graph and Twitter tags. Both are the ISDI template's **unedited
 * placeholders** — the bare university name and the contact page's "Get in touch
 * with Atlas Skilltech." Neither mentions the page. Transcribed as authored, the
 * same pair placements and the two ATLAS ISDI Advantage pages carry.
 *
 * The canonical is the SLASHLESS url, which is what production serves and what it
 * prints in its own `<link rel="canonical">`; the trailing slash answers 500 there.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/success-stories/startups';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    siteName: 'ATLAS SKILLTECH UNIVERSITY',
    title: TITLE,
    url: 'https://atlasuniversity.edu.in/',
    type: 'website',
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /schools/isdi/success-stories/startups — the third entry in the ISDI menu's
 * "Success Stories" column, and the second-smallest page of the ISDI port: SIX
 * blocks from 252 lines of PHP.
 *
 *   1  `.inner-header-wrapper.full-ht`  photographic hero, 100vh
 *   2  `.top-cards-wrapper`             three figures — bare, so it keeps its own
 *                                       `padding-bottom: 60px`; its label is
 *                                       `.sm-text-isme-2.isdi`, 24px at EVERY width
 *   3  `section.section`                "Startups that shape the future" — the 30 /
 *                                       calc(70% - 40px) story pair
 *   4  `div.section`                    "Spotlighting student startups", an 18-card
 *                                       `.grid-gallery`
 *   5  `div.section.nopad`              the 18-mark `.slide-wrap` marquee
 *   6  `section#faq.section`            three questions
 *
 * No sticky anchor menu, no carousel, no tab set, no "More questions?" panel and no
 * brochure popup. Every block root carries `data-block`.
 *
 * It is a flat `.php` upstream, so production serves it at the slashless path and
 * 500s on the trailing slash; the header menu links the slashless form.
 */
export default function StartupsPage() {
  return (
    <main id="isdi-startups" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 — ref .inner-header-wrapper.full-ht */}
      <Hero data={hero} />

      {/* 2 — ref .top-cards-wrapper, with NO `.padbtm0` / `.mrgbtm0`, so the band's
          own 60px of bottom padding stands */}
      <StatsBand data={stats} label="isme-2" padBottom />

      {/* 3 — ref section.section > .container > .about-story-wrapper */}
      <Story data={story} />

      {/* 4 — ref div.section > .container */}
      <Spotlight data={gallery} />

      {/* 5 — ref div.section.nopad > .slide-wrap */}
      <LogoBand data={marquee} />

      {/* 6 — ref assets/include/faq/isdi/startup.php */}
      <FAQ data={faq} />
    </main>
  );
}
