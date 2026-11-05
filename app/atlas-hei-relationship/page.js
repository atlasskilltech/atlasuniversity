import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import ContentCardB, { SHAPING_WRAPPER } from '@/components/ui/ContentCardB';
import CareerSupportCard, { CAREER_CARD_ROW } from '@/components/ui/CareerSupportCard';
import CardTypeF from '@/components/ui/CardTypeF';
import InfoBanner from '@/components/ui/InfoBanner';
import DropdownFaq from '@/components/ui/DropdownFaq';
import Carousel from '@/components/Carousel/Carousel';
import PeopleCarousel from '@/components/Life/PeopleCarousel';
import { Card as TestimonialSlide } from '@/components/Home/Testimonials';
import ScopeCards from '@/components/Hei/ScopeCards';
import PartnerTabs from '@/components/Hei/PartnerTabs';
import { CONTAINER, SECTION, H2, SUB_INNER, SUB_INNER_MRGBTM, SUB_H2 } from '@/components/Home/SectionHead';
import { testimonials as homeTestimonials } from '@/lib/homeContent';
import {
  hero, stats, why, partners, pillars, collaborators, voices, scope, recognition, team, banner, faq,
} from '@/lib/heiContent';

/* ref atlas-hei-relationship.php `$title` / `$description` / `$keywords` */
const TITLE = 'HEI Partnerships & Alliances  – ATLAS SkillTech University';
const DESCRIPTION =
  'Discover HEI partnerships, academic collaborations, exchange programs and partner institutions that broaden learning and research opportunities.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/atlas-hei-relationship' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/* The homepage's Global tab: the same nine cards this page authors (verified card for card), with
   this page's `vector-atlas-2.png` watermark */
const GLOBAL = homeTestimonials.tabs.find((t) => t.label === 'Global');

/**
 * /atlas-hei-relationship — reference/atlas-hei-relationship.php (`$css =
 * "…6910963725624091365dfdb2-3997b3547.css"`, `$body = "body atlas-page"`), in its order: hero ·
 * three figures · "Why Global Institutions Choose ATLAS" (`.card-content-b` ×3) · the partner tabs
 * (5 regions over `.logos-grid`) · "ATLAS & The 6 Pillars of Internationalisation" · "From Our
 * International Collaborators" (6 `.card-type-f`) · "Hear from our Global University Partners" ·
 * "Scope of Partnerships" (7 cards) · "Recognition & Accreditation" · "Meet the Team" · the closing
 * banner · FAQ (Webflow dropdowns, orange icon, the homepage's search panel).
 */
export default function HeiRelationshipPage() {
  return (
    <>
      <InnerPageHero hero={hero} />

      {/* ref .top-cards-wrapper.padbtm0 */}
      <StatBand data={stats} />

      {/* ref section.section > (.container > (h2.h2-tag.mrg16, .sub-heading), .shaping-wrapper) */}
      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{why.heading}</h2>
          <div className={SUB_INNER}>{why.subheading}</div>
        </div>
        <div className={SHAPING_WRAPPER}>
          {why.items.map((item) => (
            <ContentCardB key={item.title} item={item} />
          ))}
        </div>
      </section>

      {/* ref section.section > .container > (.sub-heading.mrgbtm, .rounded-tabs-mint) — no heading */}
      <section className={SECTION}>
        <div className={CONTAINER}>
          <div className={SUB_INNER_MRGBTM}>{partners.subheading}</div>
          <PartnerTabs tabs={partners.tabs} />
        </div>
      </section>

      {/* ref section.section > .container > (h2.h2-tag.mrg16, .sub-heading.mrgbtm, .common-flex-26-wrap) */}
      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{pillars.heading}</h2>
          <div className={SUB_INNER_MRGBTM}>{pillars.subheading}</div>
          <div className={CAREER_CARD_ROW}>
            {pillars.cards.map((card) => (
              <CareerSupportCard key={card.title} card={card} titleVariant="atlasSmall" />
            ))}
          </div>
        </div>
      </section>

      {/* ref section.section > .container > (h2.h2-tag.mrg16, .sub-heading, .swiper.common-swiper) */}
      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{collaborators.heading}</h2>
          <div className={SUB_INNER}>{collaborators.subheading}</div>
        </div>
        <Carousel className="pt-14 max-md:pt-10" bullets="inline">
          {collaborators.cards.map((card) => (
            <CardTypeF key={card.image.src} card={card} />
          ))}
        </Carousel>
      </section>

      {/* ref section.section > .container > (h2.h2-tag.mrgbtm0, h2.sub-heading (empty),
          .swiper.common-swiper-full.mrgtp0) — the empty `<h2>` lead is still a box: Webflow's
          20/10 margins, plus the 20px top/bottom padding `.sub-heading` takes at <=767 */}
      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-0 ${H2}`}>{voices.heading}</h2>
          <div className={SUB_H2} aria-hidden="true" />
        </div>
        <div className="text-lg">
          <Carousel bullets="inline-overlay">
            {GLOBAL.items.map((item) => (
              <TestimonialSlide
                key={item.quote}
                item={item}
                icons={homeTestimonials.quoteIcons}
                watermark="/assets/images/campus/stats/vector-atlas-2.png"
                watermarkAlt=""
                videoVariant="plain"
              />
            ))}
          </Carousel>
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{scope.heading}</h2>
          <div className={SUB_INNER_MRGBTM}>{scope.subheading}</div>
          <ScopeCards cards={scope.cards} />
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{recognition.heading}</h2>
          <div className={SUB_INNER_MRGBTM}>{recognition.subheading}</div>
          <div className={CAREER_CARD_ROW}>
            {recognition.cards.map((card) => (
              <CareerSupportCard key={card.title} card={card} titleVariant="poppins" />
            ))}
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{team.heading}</h2>
          <div className={SUB_INNER}>{team.subheading}</div>
        </div>
        <PeopleCarousel people={team.people} tone="atlas-blue" bullets="inline" />
      </section>

      <InfoBanner
        banner={{
          heading: banner.heading,
          text: banner.text,
          buttons: banner.buttons.map((b) => ({ ...b, variant: 'atlas', icon: '/assets/images/future-begins/arrow-rt-black.svg' })),
          image: { src: banner.image, alt: '' },
        }}
        titleClassName="max-md:mb-4 max-sm:mb-[14px]"
      />

      <DropdownFaq data={faq} searchVariant="atlas" icon="ugdx-org" search={{
        label: 'More questions?',
        subText: 'Let our AI Assistant answer your queries',
        action: '/search',
        name: 'query',
        placeholder: 'Ask me anything...courses, people, or campus secrets',
      }}
      />
    </>
  );
}
