import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import Hero from '@/components/Schools/ISDI/Events/Hero';
import {
  GlobalImmersions, MotionWall, PhotoWall, WideSlider,
} from '@/components/Schools/ISDI/Events/Sections';
import {
  animate, cultureImmersions, fieldVisits, globalImmersions, hero, localImmersions, menu,
} from '@/lib/schools/isdi/eventsImmersionsContent';
import { CONTAINER } from '@/components/Schools/ISDI/Home/ui';

/*
 * ref events/immersions-&-experiences.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description,
 * Open Graph and Twitter tags. Both are the ISDI template's unedited
 * placeholders. Transcribed as authored.
 *
 * The canonical is the SLASHLESS url: this is a flat `.php`, so production
 * serves it there and answers 500 on the trailing slash.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/events/immersions-&-experiences';

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
 * /schools/isdi/events/immersions-&-experiences — the first of the ISDI header's
 * six Events pages.
 *
 * THREE top-level blocks, not the usual one-per-section: the `.swiperprogress`
 * hero, the sticky anchor menu, and a single `.white-wrapper` whose `.container`
 * holds all five content sections as `.common-wrapper-lg` children plus a sixth,
 * empty one.
 */
export default function ImmersionsPage() {
  return (
    /* `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24,
       #333), as every ISDI page root does */
    <main id="isdi-events-immersions" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 */}
      <Hero data={hero} />
      {/* 2 — ref .sticky-menus.center */}
      <AnchorMenu links={menu.links} />
      {/* 3 — ref .white-wrapper */}
      <div data-block="white-wrapper" className="overflow-hidden text-black">
        <div className={CONTAINER}>
          <GlobalImmersions data={globalImmersions} />
          <MotionWall data={cultureImmersions} id="culture-immersions" />
          <PhotoWall data={localImmersions} id="local-immersion" />
          <MotionWall data={fieldVisits} id="field-visit" />
          <WideSlider data={animate} headingId={animate.id} />
          {/* ref the trailing EMPTY `.common-wrapper` — 50px of top padding and
              nothing in it, and still the last thing on the page */}
          <div className="pt-[50px]" />
        </div>
      </div>
    </main>
  );
}
