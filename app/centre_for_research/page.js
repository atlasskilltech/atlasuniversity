import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import CareerSupportCard from '@/components/ui/CareerSupportCard';
import PortCardM from '@/components/ui/PortCardM';
import FAQ from '@/components/Home/FAQ';
import Carousel from '@/components/Carousel/Carousel';
import AboutStory from '@/components/Partnership/AboutStory';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';
import { hero, stats, about, research, objectives, faq } from '@/lib/centreForResearchContent';

/* ref centre_for_research/index.php `$title` / `$description` / `$keywords` */
const TITLE = 'Research & Publications – ATLAS ISME';
const DESCRIPTION =
  'Explore research papers, thought leadership, academic insights, industry studies, publications and knowledge-driven work.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre_for_research/' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/* ref `.abt-text` used as a lead under `h2.h2-tag` — outside `.abt-cont` it is the page's own
   16px/24 at every width (measured 1440 / 768 / 390) */
const LEAD = 'text-base leading-6';

/**
 * /centre_for_research — reference/centre_for_research/index.php (`$css = "coe.css"`, `$body = "body
 * body-ugdx"`; the route keeps production's own slug, which the nav already used). In its order:
 * hero (title, the "RESEARCH. INNOVATE. EXCEL." line, three buttons) · five figures (this page's
 * own <style>: the band stacks at 992, inclusive) · "About Center for research" · "Research and
 * Innovation" (14 `.career-sup-card.ugdx` over three washes) · "Our Objectives"
 * (`.port-card-m-wrap-ugdx` carousel) · FAQ (the Bootstrap accordion include, 24 questions).
 */
export default function CentreForResearchPage() {
  return (
    <>
      <InnerPageHero hero={hero} />

      {/* ref .top-cards-wrapper.padbtm0 */}
      <StatBand data={stats} variant="stack992" />

      <AboutStory
        story={{ heading: about.heading, text: about.text, image: about.image }}
        container="webflow"
        spacer={false}
        headingMargin={32}
        photoClip
      />

      {/* ref div.section > .container > (h2.h2-tag.mrgbtm0, .abt-text, .career-sup-wrapper) */}
      <div className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-0 ${H2}`}>{research.heading}</h2>
          <div className={LEAD}>{research.sub}</div>
          {/* ref .career-sup-wrapper — centred wrapping row, gap 22, padding-top 56 (40 at <=767) */}
          <div className="flex flex-wrap items-start justify-center gap-[22px] pt-14 max-md:pt-10">
            {research.cards.map((card) => (
              <CareerSupportCard key={card.title} card={card} titleVariant="poppins" />
            ))}
          </div>
        </div>
      </div>

      {/* ref div.section > .container > (h2.h2-tag.mrg16, .abt-text, .swiper.common-swiper.mrgtp32) */}
      <div className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{objectives.heading}</h2>
          <div className={LEAD}>{objectives.sub}</div>
        </div>
        <Carousel className="pt-8" bullets="inline">
          {objectives.items.map((item) => (
            <PortCardM key={item.name} item={item} variant="ugdx" />
          ))}
        </Carousel>
      </div>

      <FAQ data={faq} />
    </>
  );
}
