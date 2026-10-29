import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import Hero from '@/components/Schools/ISDI/Events/Hero';
import {
  Heading, MentorMarquee, MotionWall, PhotoWall, WideSlider,
} from '@/components/Schools/ISDI/Events/Sections';
import {
  aidc, alumniTalks, atlasRtc, coElev8, conserv, creativeCatalyst, friendsOfFigma,
  globalMasterclasses, guestLectures, hero, masterclasses, menu, mentors, parsonsWeek,
  snapAr, wdcd,
} from '@/lib/schools/isdi/eventsIndustryMentorshipContent';
import { CONTAINER } from '@/components/Schools/ISDI/Home/ui';

/*
 * ref events/industry-and-mentorship.php `$title` / `$description` — the ISDI
 * template's unedited placeholders, transcribed as authored. The canonical is the
 * SLASHLESS url: a flat `.php`, served there, 500 on the trailing slash.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/events/industry-and-mentorship';

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
 * /schools/isdi/events/industry-and-mentorship — the fourth of the ISDI header's
 * six Events pages and the largest, the same fifth template with fourteen sections.
 *
 * The AIDC mentors marquee is a DIRECT child of `.white-wrapper` (full-bleed), so
 * the container is split around it: the first group holds Creative Catalyst, ATLAS
 * RTC and the AIDC heading, then the bleed `MentorMarquee`, then the second group
 * holds the remaining ten sections, with the trailing empty `.common-wrapper`
 * (pt-50) last. Creative Catalyst's anchor id is on its H2 (`headingId`); WDCD is
 * the bare `.duplicate-grid-wrapper` (`galleryVariant="plain"`).
 */
export default function IndustryMentorshipPage() {
  return (
    /* `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) */
    <main id="isdi-events-industry-mentorship" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 */}
      <Hero data={hero} label="Industry & Mentorship" />
      {/* 2 — ref .sticky-menus (bare, left-aligned) */}
      <AnchorMenu links={menu.links} centered={false} />
      {/* 3 — ref .white-wrapper */}
      <div data-block="white-wrapper" className="overflow-hidden text-black">
        <div className={CONTAINER}>
          <PhotoWall data={creativeCatalyst} headingId="Creative-catalyst" />
          <PhotoWall data={atlasRtc} id="atlas-rtl" />
          <Heading data={aidc} id="AIDC" />
        </div>

        {/* ref .swiper.marquee-swiper — a bleed sibling of the container */}
        <MentorMarquee people={mentors.people} />

        <div className={CONTAINER}>
          <PhotoWall data={alumniTalks} id="Alumni-talks" />
          <WideSlider data={guestLectures} id="Guest-lectures" />
          <PhotoWall data={masterclasses} id="Masterclasses" />
          <PhotoWall data={globalMasterclasses} id="Global-masterclasses" />
          <MotionWall data={coElev8} id="Elev8" />
          <PhotoWall data={conserv} id="Conserv" />
          <WideSlider data={snapAr} id="snap-ar" />
          <PhotoWall data={friendsOfFigma} id="fof" />
          <PhotoWall data={wdcd} id="WDCD" galleryVariant="plain" />
          <MotionWall data={parsonsWeek} id="parsons-week" />
        </div>

        {/* ref trailing empty .common-wrapper (pt-50 on ISDI) */}
        <div className="pt-[50px]" />
      </div>
    </main>
  );
}
