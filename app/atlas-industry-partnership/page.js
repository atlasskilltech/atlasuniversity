import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import ContentCardB, { SHAPING_WRAPPER } from '@/components/ui/ContentCardB';
import CardTypeF from '@/components/ui/CardTypeF';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import SliderCardA from '@/components/ui/SliderCardA';
import InfoBanner from '@/components/ui/InfoBanner';
import DropdownFaq from '@/components/ui/DropdownFaq';
import Carousel from '@/components/Carousel/Carousel';
import RecruitmentPartners from '@/components/Industry/RecruitmentPartners';
import Testimonials from '@/components/Industry/Testimonials';
import ScopeCards from '@/components/Hei/ScopeCards';
import { CONTAINER, SECTION, H2, SUB_INNER, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';
import {
  hero, stats, why, recruiters, relations, scope, viksit, banner, faq,
} from '@/lib/industryPartnershipContent';

/* ref atlas-industry-partnership.php `$title` / `$description` / `$keywords` */
const TITLE = 'Corporate Collaborations & Partnerships  – ATLAS SkillTech University';
const DESCRIPTION =
  'Explore corporate partnerships, industry mentorship, live projects and collaboration programs that bring real-world experience into the curriculum.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/atlas-industry-partnership' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /atlas-industry-partnership — reference/atlas-industry-partnership.php (`$css =
 * "…6911faaa601a99793bb57339-1a954c314.css"`, `$body = "body atlas-page"`), in its order: hero ·
 * three figures · "Why Industry Leaders Choose ATLAS" (3 `.card-content-b`) · "Our Recruitment
 * Partners" (/advantages/atlas-industry-centric-approach's six tabs and marks, with this page's alt
 * text) · "Strengthening Global Industry Relations" (`.card-type-f` carousel) · "Industry
 * Testimonials" (that page's section, byte-for-byte the same copy and cards) · "Scope of
 * Partnerships" (6 cards) · "Driving India's Vision of Viksit Bharat Together" (zoom slider of
 * `.slider-card-wrapper`s) · the closing banner with its contact line · FAQ.
 */
export default function IndustryPartnershipPage() {
  return (
    <>
      <InnerPageHero hero={hero} />

      {/* ref .top-cards-wrapper.padbtm0 */}
      <StatBand data={stats} />

      {/* ref section.section.extraspace > (.container > (h2.h2-tag.mrg16, .sub-heading), .shaping-wrapper)
          — `.extraspace` is padding 120 0 60 from 768 up (measured), and the plain 40 below */}
      <section className="block overflow-hidden pb-[60px] pt-[120px] max-md:py-10">
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{why.heading}</h2>
          <div className={SUB_INNER}>{why.subheading}</div>
        </div>
        <div className={SHAPING_WRAPPER}>
          {why.items.map((item, i) => (
            <ContentCardB key={i} item={item} />
          ))}
        </div>
      </section>

      <RecruitmentPartners data={recruiters} />

      {/* ref section.section > .container > (h2.h2-tag.mrg16, .sub-heading, .swiper.common-swiper) */}
      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{relations.heading}</h2>
          <div className={SUB_INNER}>{relations.subheading}</div>
        </div>
        <Carousel className="pt-14 max-md:pt-10" bullets="inline">
          {relations.cards.map((card) => (
            <CardTypeF key={card.image.src} card={card} />
          ))}
        </Carousel>
      </section>

      <Testimonials bullets="inline-overlay" />

      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{scope.heading}</h2>
          <div className={SUB_INNER_MRGBTM}>{scope.subheading}</div>
          <ScopeCards cards={scope.cards} />
        </div>
      </section>

      {/* ref section.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading.mrgbtm.isdi,
          .swiper.zoom-slider-lg) — `.h2-tag.isdi` is Poppins 400, 36px from 991 down */}
      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 font-poppins font-normal max-lg:text-5xl max-lg:leading-[1.2] max-md:mb-2 ${H2}`}>{viksit.heading}</h2>
          {/* `.sub-heading.mrgbtm.isdi` — the `.isdi` modifier sets Poppins (300, measured) */}
          <div className={`font-poppins ${SUB_INNER_MRGBTM}`}>{viksit.subheading}</div>
          <ZoomSliderLg label={viksit.heading} dots="swiper">
            {viksit.cards.map((card, i) => (
              <SliderCardA key={i} card={card} />
            ))}
          </ZoomSliderLg>
        </div>
      </section>

      <InfoBanner
        banner={{
          ...banner,
          /* ref `.info-banner-sub-contact` — `<strong>Get in touch:</strong> …`; the line is 300, so
             Preflight's relative `bolder` would paint the label 400 where Webflow paints 700 */
          contact: (
            <>
              <strong className="font-bold">{banner.contact.split(':')[0]}:</strong>
              {banner.contact.slice(banner.contact.indexOf(':') + 1)}
            </>
          ),
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
