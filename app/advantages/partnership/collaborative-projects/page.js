import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import AboutStory from '@/components/Partnership/AboutStory';
import CareerSupportCard from '@/components/ui/CareerSupportCard';
import MediaCarousel from '@/components/Partnership/MediaCarousel';
import MediaSection from '@/components/Partnership/MediaSection';
import { TW_CONTAINER, WF_SECTION, HEAD_WRAP, TT_WRAP, H2_MRG16 } from '@/components/Partnership/ui';
import VideoBlock from '@/components/Partnership/VideoBlock';
import { SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';
import withBreaks from '@/lib/withBreaks';
import {
  hero,
  stats,
  story,
  s1Cards,
  mediaSections,
  research,
  closing,
} from '@/lib/partnership/collaborativeProjects';

/* ref collaborative-projects.php `$title` / `$description` — the generic "ATLAS Advantage" pair. */
const TITLE = 'ATLAS Advantage: Industry-Led Learning  – ATLAS SkillTech University';
const DESCRIPTION =
  'Discover the ATLAS Advantage industry mentorship, experiential projects, global pathways and skills-focused curriculum that prepare you for future careers.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/advantages/partnership/collaborative-projects' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const WASH = {
  'atlas-bg-1': '/assets/images/advantages/partnership/cdn/incub-bg-1.png',
  'atlas-bg-2': '/assets/images/advantages/partnership/cdn/vector-paren-2.png',
  'atlas-bg-3': '/assets/images/advantages/partnership/cdn/incub-bg-1.png',
};

/**
 * /advantages/partnership/collaborative-projects — partnership page 2/6. A Tailwind-CDN hybrid:
 * InnerPageHero + StatBand + About story + a 5-card CareerSupportCard carousel + four media
 * carousels (Study In India, COIL Projects, International Collaborative Projects, Visiting Student
 * Delegations) + a Research Partnerships text block + a closing text block. The Tailwind media
 * sections carry `.lp-bs` (via their components). The 11 Research-partner logos are
 * `atlas-global/wp-content` refs broken on production (403) and are omitted.
 */
export default function CollaborativeProjectsPage() {
  const heroData = {
    title: hero.title,
    text: hero.text,
    image: { src: hero.src, srcSet: hero.srcSet, sizes: '(max-width: 1366px) 100vw, 1366px', alt: hero.alt },
  };
  return (
    <>
      <InnerPageHero hero={heroData} />
      {/* ref `.top-cards-wrapper` — the partnership pages put the FIGURE (`.sm-text-isme`, 36px via
          the page's own <style>) first and a centred 20px `.large-text` caption second: StatBand's
          `figure` variant, whose first slot is `label` */}
      <StatBand data={stats.map((s) => ({ ...s, label: s.value, value: s.label }))} variant="figure" />
      <AboutStory story={story} />

      {/* ref S1 `section.section > .container > .head-wrap > .tt-wrap > (h2.h2-tag.mrg16,
          .sub-heading.mrgbtm)` over a `.swiper.mySwiperWorld.mrgtp0` of 5 `.career-sup-card.ugdx`.
          The swiper is 1 / 2 (>=640) / 3 (>=1024) per view with spaceBetween 10 — MediaCarousel's
          default slide widths. Above 767 the card is a fixed 398x622, so it overflows its narrower
          slide and the next card paints over the overhang, exactly as on production. */}
      <section className={WF_SECTION}>
        <div className={TW_CONTAINER}>
          <div className={HEAD_WRAP}>
            <div className={TT_WRAP}>
              <h2 className={H2_MRG16}>Collaborate Globally. Learn Differently. Create Impact.</h2>
              <div className={SUB_INNER_MRGBTM}>
                ATLAS empowers students and faculty to engage with leading institutions across the world
                through transformative academic, research, and cross-cultural collaborations.
              </div>
            </div>
          </div>
          <MediaCarousel pagination={false}>
            {s1Cards.map((c, i) => (
              <CareerSupportCard
                key={i}
                titleVariant="manrope30"
                card={{
                  image: { src: c.image, alt: '' },
                  background: '#41418e',
                  backgroundImage: WASH[c.bg] || WASH['atlas-bg-1'],
                  backgroundPosition: '50% 100%',
                  title: withBreaks(c.title || ''),
                  text: c.desc,
                }}
              />
            ))}
          </MediaCarousel>
        </div>
      </section>

      {/* ref S2-S5 — the four coloured media carousels */}
      <MediaSection heading={mediaSections[0].heading} lead={mediaSections[0].lead} images={mediaSections[0].images.map((s) => ({ src: s }))} bg="#342b7c" dark />
      <MediaSection heading={mediaSections[1].heading} lead={mediaSections[1].lead} images={mediaSections[1].images.map((s) => ({ src: s }))} bg="#D3D3D3" />
      <MediaSection heading={mediaSections[2].heading} lead={mediaSections[2].lead} images={mediaSections[2].images.map((s) => ({ src: s }))} bg="#342b7c" dark />
      <MediaSection heading={mediaSections[3].heading} lead={mediaSections[3].lead} images={mediaSections[3].images.map((s) => ({ src: s }))} bg="#D3D3D3" />

      {/* ref S6 "Research Partnerships & Collaborations" — an intro paragraph over 11 two-column
          items (each a `.grid gap-6` of a partner logo + a sub-heading & description). The 11 logos
          are `atlas-global/wp-content` refs broken on production (403, naturalWidth 0), so their
          column is reserved but empty — matching production's effective display; no logo invented. */}
      <section className="bg-white py-10 n1024:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-[16px] mt-0 text-[36px] font-medium leading-[1.2] text-black n1024:text-[44px]">
            {research.heading}
          </h2>
          {/* ref `<p class="pb-0 pr-[50px] …">` — no bottom margin: the carousel sits directly under it */}
          <p className="pb-0 pr-[50px] text-[16px] font-light leading-[1.4] text-black n1024:text-[24px]">{research.paragraphs[0]}</p>
          {/* ref `.mySwiperWorld2` — a 1-per-view autoplay carousel of 11 research-collaboration
              slides, each `div.lg:py-16.lg:px-16 > .grid.gap-6` of a heading, a partner image and a
              centred description. Measured on production, per slide:
              - the wrapper pads 64px on all four sides from 1024 only (no padding below);
              - the heading is 22px/36px (Webflow's base `h2 { line-height: 36px }`) and
                36px/40px from 1024 (Play CDN `text-4xl`), NOT the project's 1.5 pin;
              - `mb-2 lg:mb-6` on the heading and the description resolves to 8px at EVERY width,
                because the ISDI/ATLAS header loads Bootstrap, whose `.mb-2 { margin-bottom: .5rem
                !important }` beats the responsive `lg:mb-6`.
              The image is an `atlas-global/wp-content` ref that 403s for every visitor (the whole
              `/atlas-global/` path answers 403 with the homepage as its body), so production paints
              a broken-image placeholder: the alt text (the title again) in a shadowed box. That
              dead asset is not reproduced — it is the only residual height (24px alt line + its
              `lg:mb-6` 24px from 1024; the wrapped alt text below 1024). */}
          <MediaCarousel slideClassName="w-full flex-none snap-start">
            {Array.from({ length: Math.floor((research.paragraphs.length - 1) / 2) }).map((_, k) => (
              <div key={k} className="n1024:p-16">
                <div className="mx-auto grid gap-6">
                  <h3 className="mb-2 text-[22px] font-semibold leading-[36px] text-gray-900 n1024:text-[36px] n1024:leading-[40px]">
                    {research.paragraphs[1 + k * 2]}
                  </h3>
                  <p className="mb-2 text-center text-[20px] leading-relaxed text-gray-600">
                    {research.paragraphs[2 + k * 2]}
                  </p>
                </div>
              </div>
            ))}
          </MediaCarousel>
        </div>
      </section>

      {/* ref S7 closing — "Collaborative Projects at ATLAS" (shared VideoBlock) */}
      <VideoBlock heading={closing.heading} text={closing.text} youtubeId="zzX0vtHhOg8" />
    </>
  );
}
