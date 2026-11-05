import Hero from '@/components/Hero/Hero';
import Awards from '@/components/Schools/ISDI/Home/Awards';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import GridGallery from '@/components/ui/GridGallery';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import SpeakerSlideCard from '@/components/ui/SpeakerSlideCard';
import ThinkInternational from '@/components/Home/ThinkInternational';
import Electives from '@/components/Advantages/Electives';
import { CONTAINER, H2, SECTION, SUB_H2_MRGBTM32 } from '@/components/Home/SectionHead';
import { AboutStory, EdgeCards, HallsCarousel, H2_MRG16 } from '@/components/Schools/LawUgdx/Sections';
import { StoryPair, Voices } from '@/components/Schools/LawUgdx/Program';
import CareerPathways from '@/components/Schools/LawUgdx/CareerPathways';
import ActionNeverStops from '@/components/Schools/LawUgdx/ActionNeverStops';
import SchoolBanner from '@/components/Schools/LawUgdx/SchoolBanner';
import ProgramGrid from '@/components/Schools/Ugdx/ProgramGrid';
import { moreQuestions } from '@/lib/schools/lawUgdxCommon';
import {
  meta, hero, awards, stem, about, why, nasa, gallery, week, programs, innovators, masterclasses, careers, electives,
  globalExposure, halls, voices, banner, faq,
} from '@/lib/schools/ugdx/homeContent';

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/ugdx/' },
};

/* the Instagram grid reads a live feed — the same revalidation window as the ATLAS homepage */
export const revalidate = 900;

/**
 * /schools/ugdx — reference/ugdx/index.php, under the ATLAS header and footer as production serves it
 * (components/Schools/MainSiteOnly). Seventeen blocks in the reference's order, almost all of them
 * existing components driven by this page's data (lib/schools/ugdx/homeContent.js):
 * the ATLAS homepage's video `Hero`, the ISDI/ISME awards band (`base` cards, uGDX navy), the Law/uGDX
 * story pairs, career cards, career-pathway tabs and banners, `GridGallery`, `ZoomSliderLg` +
 * `SpeakerSlideCard`, `Advantages/Electives`, the homepage's `ThinkInternational` and the shared
 * `TestimonialCard`. Only the programme grid is uGDX's own (components/Schools/Ugdx/ProgramGrid).
 *
 * "This Week @ uGDX" is an iframe to the ATLAS Instagram page on production; the port renders the
 * project's own Instagram grid there, as every school homepage does.
 */
export default function UgdxHome() {
  return (
    <>
      <div data-block="hero">
        <Hero data={hero} />
      </div>
      <div data-block="awards">
        <Awards data={awards} variant="base" tone="ugdx" />
      </div>

      {/*
        reference/ugdx/index.php's own <style> sets `.section { padding-top: 25px }` from 1024px up (the
        sheet says 60; 768-1023 keeps 60, <=767 the sheet's 40). Every block below is a `.section`, so a
        page wrapper restates it for the section roots (a block's own element, or the section directly
        inside a block wrapper) rather than changing the shared SECTION constant.
      */}
      <div className="n1024:[&_[data-block].overflow-hidden]:pt-[25px] n1024:[&_[data-block]>.overflow-hidden]:pt-[25px]">
      {/* ref section.section > .container.px-0.pb-4 (the NextGen Women in STEM banner, Bootstrap's
          d-block d-lg-none / d-none d-lg-block pair) + the About story */}
      <AboutStory data={about} block="about">
        <div className="mx-auto max-w-[1366px] px-0 pb-6">
          <a href={stem.href} className="block lg:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={stem.mobile} alt={stem.alt} className="block h-auto w-full max-w-full" />
          </a>
          <a href={stem.href} className="hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={stem.desktop} alt={stem.alt} className="block h-auto w-full max-w-full" />
          </a>
        </div>
      </AboutStory>

      {/* ref section.section > (section.section "Why Choose ATLAS uGDX?", .container "Making Our Mark at NASA") */}
      <section data-block="why" className={SECTION}>
        <EdgeCards data={why} block="why-cards" titleVariant="manrope" descVariant="gap" />
        <StoryPair data={nasa} block="nasa" bare />
      </section>

      {/* ref div.section > .container > (h2.h2-tag.mrgbtm0, .grid-gallery of .grid-card-atlas) */}
      <div data-block="gallery" className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={H2}>{gallery.heading}</h2>
          <GridGallery cards={gallery.cards} variant="atlas" />
        </div>
      </div>

      <ActionNeverStops heading={week.heading} sub={week.sub} button={week.button} block="week" />
      <ProgramGrid data={programs} />
      <AboutStory data={innovators} block="innovators" />

      {/* ref div.section > .container > (h2.mrg16, h2.sub-heading.mrgbtm32, .swiper.zoom-slider-lg.mrg-lft) */}
      <div data-block="masterclasses" className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={H2_MRG16}>{masterclasses.heading}</h2>
          <div className={SUB_H2_MRGBTM32}>{masterclasses.sub}</div>
          <ZoomSliderLg className="ml-[20%] max-md:ml-0" label={masterclasses.heading} dots="swiper">
            {masterclasses.slides.map((slide) => (
              <SpeakerSlideCard key={slide.title} slide={slide} />
            ))}
          </ZoomSliderLg>
        </div>
      </div>

      <CareerPathways data={careers} tone="ugdx" />
      <Electives data={electives} idPrefix="ugdx-electives" tone="ugdx" block="electives" />
      <ThinkInternational data={globalExposure} buttonTone="ugdx" block="global" variant="ugdx" />
      <HallsCarousel data={halls} variant="atlas" />
      <Voices data={voices} tone="ugdx" block="voices" />
      <SchoolBanner block="banner" banner={banner} tone="ugdx" />
      <div data-block="search" className={SECTION}>
        <div className={CONTAINER}>
          <div className="pt-10">
            <SearchQuestion data={moreQuestions} variant="ugdx" />
          </div>
        </div>
      </div>
      <div data-block="faq">
        <FAQ data={faq} />
      </div>
      </div>
    </>
  );
}
