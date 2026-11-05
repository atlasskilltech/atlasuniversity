import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import Hero from '@/components/Schools/ISDI/Events/Hero';
import { MotionWall, PhotoWall } from '@/components/Schools/ISDI/Events/Sections';
import {
  communityCultural, culturalFestivals, hero, menu, parentMeetups,
} from '@/lib/schools/isdi/eventsCommunityCultureContent';
import { CONTAINER } from '@/components/Schools/ISDI/Home/ui';

/*
 * ref events/community-and-culture.php `$title` / `$description` — the ISDI
 * template's unedited placeholders, transcribed as authored. The canonical is the
 * SLASHLESS url: a flat `.php`, served there, 500 on the trailing slash.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/events/community-and-culture';

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
 * /schools/isdi/events/community-and-culture — the fifth of the ISDI header's six
 * Events pages, the same template and nesting as creative-showcases with THREE
 * sections (grid, motion, grid) and no trailing empty wrapper. The two grids are the
 * `.instagram-wrapper.mobile-vert-scroll` nested variant (default). Every id is on
 * its SECTION. Hero slide 1 and the Cultural Festivals grid reuse creative-showcases
 * assets already on disk.
 */
export default function CommunityCulturePage() {
  return (
    /* `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) */
    <main id="isdi-events-community-culture" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 */}
      <Hero data={hero} label="Community & Culture" />
      {/* 2 — ref .sticky-menus.center */}
      <AnchorMenu links={menu.links} />
      {/* 3 — ref .white-wrapper */}
      <div data-block="white-wrapper" className="overflow-hidden text-black">
        <div className={CONTAINER}>
          <PhotoWall data={communityCultural} id="Community--and-Cultural" />
          <MotionWall data={parentMeetups} id="parent-meetups" />
          <PhotoWall data={culturalFestivals} id="Cultural-festivals" />
        </div>
      </div>
    </main>
  );
}
