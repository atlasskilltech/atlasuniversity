import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import CardTypeF from '@/components/ui/CardTypeF';
import Carousel from '@/components/Carousel/Carousel';
import AboutStory from '@/components/Partnership/AboutStory';
import VideoBlock from '@/components/Partnership/VideoBlock';
import MediaCarousel from '@/components/Partnership/MediaCarousel';
import PartnershipTestimonials from '@/components/Partnership/PartnershipTestimonials';
import { MPProcess, MPStudents, MPRegions } from '@/components/Partnership/Master';
import { TW_CONTAINER, WF_SECTION, HEAD_WRAP, TT_WRAP, H2_MRG16 } from '@/components/Partnership/ui';
import { SUB_INNER } from '@/components/Home/SectionHead';
import {
  hero,
  stats,
  story,
  process,
  destinations,
  regions,
  testimonialsLead,
  testimonials,
  fair,
  world,
  video,
  start,
  alumni,
} from '@/lib/partnership/masterProgression';

/* ref master-progression.php `$title` / `$description` — the generic "ATLAS Advantage" pair the
   partnership pages share (the source's dash is mis-encoded; the intended en dash is used). */
const TITLE = 'ATLAS Advantage: Industry-Led Learning  – ATLAS SkillTech University';
const DESCRIPTION =
  'Discover the ATLAS Advantage industry mentorship, experiential projects, global pathways and skills-focused curriculum that prepare you for future careers.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/advantages/partnership/master-progression' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /advantages/partnership/master-progression — partnership page 6/6, a Tailwind-CDN hybrid, in
 * production's order: hero (lead + "Click to View Master Acceptance's" → #region-acceptance, mobile
 * image swap) · StatBand `figure` · About · the 5-step process carousel · two rows of 40 student
 * cards · region-wise acceptances (6 tabs over 209 logo cells, all dead upstream) · student video
 * testimonials · Global Education Fair (19 `.card-type-f` cards) · "From ATLAS To The World" (6
 * photographs) · "Master Progression at ATLAS" (YouTube) · "Start your Master's Application" ·
 * "ATLAS Alumni & Master's Progression" (photograph first).
 */
export default function MasterProgressionPage() {
  const heroData = {
    title: hero.title,
    text: hero.text,
    cta: hero.cta,
    mobileImage: hero.mobileImage,
    image: { src: hero.src, srcSet: hero.srcSet, sizes: '(max-width: 1366px) 100vw, 1366px', alt: hero.alt },
  };
  return (
    <>
      <InnerPageHero hero={heroData} />
      <StatBand data={stats} variant="figure" />
      <AboutStory story={story} mobileReverse />
      <MPProcess {...process} />
      <MPStudents {...destinations} />
      <MPRegions {...regions} />
      <PartnershipTestimonials heading="Student Testimonials" lead={testimonialsLead} testimonials={testimonials} variant="carouselFull" />

      {/* ref `section.section > .container > (.head-wrap > .tt-wrap > (h2.h2-tag.mrg16, .sub-heading),
          .swiper.common-swiper)` of `.card-type-f` (atlas variant) cards */}
      <section className={WF_SECTION}>
        <div className={TW_CONTAINER}>
          <div className={HEAD_WRAP}>
            <div className={TT_WRAP}>
              <h2 className={H2_MRG16}>{fair.heading}</h2>
              <div className={SUB_INNER}>{fair.sub}</div>
            </div>
          </div>
          {/* `.swiper.common-swiper` — padding-top 56 (40 at <=767), overflow visible */}
          <Carousel bleed={false} bullets="inline" className="pt-14 max-md:pt-10">
            {fair.cards.map((c, i) => <CardTypeF key={i} card={c} variant="mp" />)}
          </Carousel>
        </div>
      </section>

      {/* ref "From ATLAS To The World" — `section.py-20.bg-gray-100 > .max-w-7xl.mx-auto.px-6 > (h2,
          .swiper.mySwiperWorld)`: one photograph per view, loop, autoplay 2.5s, bullets + arrows. The
          slider is as tall as its TALLEST photograph (941px at 1440), so all six load eagerly — a lazy
          slide that is off-screen sideways never loads and would leave the row at the first one's height. */}
      <section className="bg-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="relative mb-[16px] mt-0 text-[44px] font-medium leading-[1.2] text-[#1a1a1a]">{world.heading}</h2>
          <MediaCarousel slideClassName="w-full flex-none snap-start">
            {world.images.map((src) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img key={src} src={src} alt="" className="h-auto w-full object-cover" />
            ))}
          </MediaCarousel>
        </div>
      </section>

      <VideoBlock heading={video.heading} text={video.text} youtubeId={video.youtubeId} />
      <AboutStory story={start} mobileReverse />
      <AboutStory story={alumni} reverse mobileReverse />
    </>
  );
}
