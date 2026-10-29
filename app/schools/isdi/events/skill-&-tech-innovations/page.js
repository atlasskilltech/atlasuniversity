import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import Hero from '@/components/Schools/ISDI/Events/Hero';
import {
  MotionWall, PhotoWall, WideSlider,
} from '@/components/Schools/ISDI/Events/Sections';
import {
  abcd, designHackathon, handsOfHeritage, handsOnWorkshop, hero, inkImagination, menu,
  techExploratorium,
} from '@/lib/schools/isdi/eventsSkillTechContent';
import { CONTAINER } from '@/components/Schools/ISDI/Home/ui';

/*
 * ref events/skill-&-tech-innovations.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description,
 * Open Graph and Twitter tags. Both are the ISDI template's unedited
 * placeholders. Transcribed as authored.
 *
 * The canonical is the SLASHLESS url: this is a flat `.php`, so production
 * serves it there and answers 500 on the trailing slash.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/events/skill-&-tech-innovations';

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
 * /schools/isdi/events/skill-&-tech-innovations — the second of the ISDI
 * header's six Events pages, and the same template as the first
 * (events/immersions-&-experiences) with the Global-Immersions tab set dropped.
 *
 * THREE top-level blocks: the `.swiperprogress` hero, the sticky anchor menu,
 * and a single `.white-wrapper` whose `.container` holds six content sections as
 * `.common-wrapper-lg` children plus a trailing empty `.common-wrapper`. The
 * sections alternate MotionWall / PhotoWall / WideSlider — every one an existing
 * component; no tabs here.
 *
 * Unlike immersions (which puts `#animate` on its WideSlider's H2),
 * `#tech-exploratorium` is authored on the SECTION, so WideSlider takes `id`.
 */
export default function SkillTechPage() {
  return (
    /* `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24,
       #333), as every ISDI page root does */
    <main id="isdi-events-skill-tech" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 */}
      <Hero data={hero} label="Skill & Tech Innovation" />
      {/* 2 — ref .sticky-menus.center */}
      <AnchorMenu links={menu.links} />
      {/* 3 — ref .white-wrapper */}
      <div data-block="white-wrapper" className="overflow-hidden text-black">
        <div className={CONTAINER}>
          <MotionWall data={handsOnWorkshop} id="hands-on-workshop" />
          <PhotoWall data={designHackathon} id="design-hackathon" />
          <WideSlider data={techExploratorium} id="tech-exploratorium" />
          <PhotoWall data={handsOfHeritage} id="hands-of-heritage" />
          <MotionWall data={abcd} id="abcd" />
          <PhotoWall data={inkImagination} id="ink---imagination" />
          {/* ref the trailing EMPTY `.common-wrapper` — 50px of top padding */}
          <div className="pt-[50px]" />
        </div>
      </div>
    </main>
  );
}
