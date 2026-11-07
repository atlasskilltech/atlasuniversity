import ConvocationMotion from '@/components/Convocation/ConvocationMotion';
import { Preloader, SkipLink, Header, Footer, Dialogs } from '@/components/Convocation/Chrome';
import Hero from '@/components/Convocation/Hero';
import {
  Ceremony,
  TheDay,
  Moments,
  Gallery,
  Venue,
  Dignitaries,
  Fellows,
  Spotlight,
  Relive,
} from '@/components/Convocation/Sections';
import Films from '@/components/Convocation/Films';
import { SANS } from '@/components/Convocation/ui';
import * as C from '@/lib/convocation/content';

/* Production https://atlasuniversity.edu.in/convocation/ (byte-identical to the reference
   index.html): <title>, description, theme-color and the Open Graph / Twitter set "carried over from
   the original site". No canonical and no robots are declared; the canonical is the URL production
   serves it at. og:image / twitter:image point at /wp-content/uploads/2022/05/atlas-skillset-university.jpeg,
   a 1200x627 PNG served under a .jpeg name — copied locally (as a real JPEG) so no remote URL ships. */
export const metadata = {
  title: 'Convocation | ATLAS SkillTech University',
  description:
    'Relive the moments of achievement and success at the ATLAS SkillTech University Convocation. Explore the highlights, memories, and milestones from our convocation ceremony at Jio Convention Center.',
  alternates: { canonical: 'https://atlasuniversity.edu.in/convocation/' },
  icons: { icon: '/assets/convocation/icons/favicon-64.png', apple: '/assets/convocation/icons/apple-touch-icon.png' },
  openGraph: {
    locale: 'en_US',
    siteName: 'ATLAS SKILLTECH UNIVERSITY',
    title: 'Convocation | ATLAS SkillTech University',
    type: 'website',
    description:
      'Relive the moments of achievement and success at the ATLAS University Convocation. Explore the highlights, memories, and milestones from our convocation ceremonies.',
    images: [{ url: '/assets/convocation/og/atlas-skillset-university.jpg', width: 1200, height: 627 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convocation | ATLAS SkillTech University',
    description: 'Relive the moments of achievement and success at the ATLAS University Convocation.',
    images: ['/assets/convocation/og/atlas-skillset-university.jpg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0e0e33',
};

/**
 * /convocation — "Convocation | ATLAS SkillTech University" (reference/new pages/convocation.zip;
 * its `ref/` folder — the obsolete Bootstrap/Owl page — is not used). Markup is server-rendered here;
 * ConvocationMotion (client) runs the reference's GSAP / ScrollTrigger / SplitText / Lenis script and
 * the Three.js confetti layer against it.
 */
export default function ConvocationPage() {
  return (
    <ConvocationMotion
      className={`group/cv relative overflow-x-clip bg-[#0e0e33] ${SANS} text-[16px] leading-[1.5] text-[#f5f6fc] antialiased [text-rendering:optimizeLegibility] selection:bg-[#d6ae55] selection:text-[#0e0e33] [&_:focus-visible]:rounded-[2px] [&_:focus-visible]:outline [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-[3px] [&_:focus-visible]:outline-[#10a8b6] [&_img]:select-none [&_img]:[-webkit-user-drag:none] motion-reduce:[&_*]:![animation-duration:.01ms] motion-reduce:[&_*]:![animation-iteration-count:1] motion-reduce:[&_*]:![transition-duration:.01ms] motion-reduce:[&_*]:![scroll-behavior:auto]`}
    >
      <Preloader preloader={C.preloader} />
      <SkipLink />
      <Header logo={C.logo} nav={C.nav} menu={C.menu} photosUrl={C.photosUrl} playlistUrl={C.playlistUrl} />

      <main id="main">
        <Hero hero={C.hero} />
        <Ceremony ceremony={C.ceremony} />
        <TheDay day={C.day} />
        <Moments moments={C.moments} />
        <Gallery gallery={C.gallery} photosUrl={C.photosUrl} playlistUrl={C.playlistUrl} />
        <Venue venue={C.venue} />
        <Dignitaries dignitaries={C.dignitaries} />
        <Films films={C.films} playlistUrl={C.playlistUrl} />
        <Fellows fellows={C.fellows} />
        <Spotlight spotlight={C.spotlight} />
        <Relive relive={C.relive} photosUrl={C.photosUrl} playlistUrl={C.playlistUrl} />
      </main>

      <Footer footer={C.footer} logo={C.logo} />
      <Dialogs />
    </ConvocationMotion>
  );
}
