import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import Hero from '@/components/Schools/ISDI/Events/Hero';
import { MotionWall, PhotoWall } from '@/components/Schools/ISDI/Events/Sections';
import {
  graduateShowcase, hero, menu, sensorium, studioDay,
} from '@/lib/schools/isdi/eventsCreativeShowcasesContent';
import { CONTAINER } from '@/components/Schools/ISDI/Home/ui';

/*
 * ref events/creative-showcases.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description,
 * Open Graph and Twitter tags. Both are the ISDI template's unedited
 * placeholders. Transcribed as authored.
 *
 * The canonical is the SLASHLESS url: this is a flat `.php`, so production
 * serves it there and answers 500 on the trailing slash.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/events/creative-showcases';

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
 * /schools/isdi/events/creative-showcases — the third of the ISDI header's six
 * Events pages, the same template as the first two with only THREE sections and
 * no trailing empty wrapper.
 *
 * The two grids (Studio Day, Graduate Showcase) are authored as the bare
 * `.duplicate-grid-wrapper > .grid-gallery-flex` — no `.instagram-wrapper`
 * scroller — so they use `PhotoWall`'s `galleryVariant="plain"`. Sensorium is a
 * `.zoom-slider` MotionWall (11 cards). Every id is on its SECTION.
 */
export default function CreativeShowcasesPage() {
  return (
    /* `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24,
       #333), as every ISDI page root does */
    <main id="isdi-events-creative-showcases" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 */}
      <Hero data={hero} label="Creative Showcases" />
      {/* 2 — ref .sticky-menus.center */}
      <AnchorMenu links={menu.links} />
      {/* 3 — ref .white-wrapper */}
      <div data-block="white-wrapper" className="overflow-hidden text-black">
        <div className={CONTAINER}>
          <PhotoWall data={studioDay} id="studio-day" galleryVariant="plain" />
          <MotionWall data={sensorium} id="sensorium" />
          <PhotoWall data={graduateShowcase} id="graduate-showcase" galleryVariant="plain" />
        </div>
      </div>
    </main>
  );
}
