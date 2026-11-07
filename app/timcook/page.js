import TimCookMotion from '@/components/TimCook/TimCookMotion';
import { SkipLink, Loader, GlLayer, Header, Grain, Lightbox } from '@/components/TimCook/Chrome';
import Hero from '@/components/TimCook/Hero';
import { Visit, Journey, Vision, Voices, Film, Gallery, Finale } from '@/components/TimCook/Sections';
import { SANS } from '@/components/TimCook/ui';
import * as C from '@/lib/timcook/content';

/* Production https://atlasuniversity.edu.in/timcook/ (byte-identical to the reference index.html):
   <title>, meta description, og:type/title/description, theme-color. It declares no canonical, no
   robots, no og:image and no Twitter tags; the canonical is the URL production serves it at, and the
   Twitter card repeats the page's own og title/description so the site-wide defaults from
   app/layout.js are not inherited. */
export const metadata = {
  title: 'Tim Cook at ATLAS SkillTech University',
  description:
    'Apple CEO Tim Cook visits ATLAS SkillTech University, Mumbai — the story of the day, the moments, and a shared vision to educate, innovate and inspire.',
  alternates: { canonical: 'https://atlasuniversity.edu.in/timcook/' },
  icons: { icon: '/assets/logos/favicon-32x32.png', apple: '/assets/timcook/icons/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    title: 'Tim Cook at ATLAS SkillTech University',
    description: "Apple CEO Tim Cook's visit to ATLAS SkillTech University, Mumbai.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tim Cook at ATLAS SkillTech University',
    description: "Apple CEO Tim Cook's visit to ATLAS SkillTech University, Mumbai.",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#07080a',
};

/**
 * /timcook — "Tim Cook at ATLAS SkillTech University" (reference/new pages/timcook.zip).
 * Markup is server-rendered here; TimCookMotion (client) runs the reference's GSAP / ScrollTrigger /
 * SplitText / Lenis script and the Three.js particle layer against it.
 */
export default function TimCookPage() {
  return (
    <TimCookMotion
      className={`group/tc relative min-h-screen overflow-x-clip bg-[#07080a] ${SANS} text-[16px] leading-[1.5] text-[#f3f1ec] antialiased [--gutter:clamp(1.25rem,3vw,3rem)] selection:bg-[#f4cf4a] selection:text-[#07080a] [&_:focus-visible]:rounded-[4px] [&_:focus-visible]:outline [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-[3px] [&_:focus-visible]:outline-[#f4cf4a] motion-reduce:[&_*]:![animation-duration:.001ms] motion-reduce:[&_*]:![animation-iteration-count:1] motion-reduce:[&_*]:![transition-duration:.001ms] motion-reduce:[&_*]:after:![transition-duration:.001ms] motion-reduce:[&_*]:before:![transition-duration:.001ms]`}
    >
      <SkipLink />
      <Loader loader={C.loader} />
      <GlLayer />
      <Header nav={C.nav} mobileNav={C.mobileNav} brandLogo={C.brandLogo} siteUrl={C.siteUrl} siteLabel={C.siteLabel} />

      <main id="main">
        <Hero hero={C.hero} />
        <Visit visit={C.visit} />
        <Journey journey={C.journey} />
        <Vision vision={C.vision} />
        <Voices voices={C.voices} />
        <Film film={C.film} />
        <Gallery gallery={C.gallery} />
        <Finale finale={C.finale} />
      </main>

      <Lightbox />
      <Grain />
    </TimCookMotion>
  );
}
