import { experiences } from '@/lib/internationalisationContent';
import Carousel from '@/components/Carousel/Carousel';
import VideoTestimonialCard from '@/components/ui/VideoTestimonialCard';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Our Student Experiences" — port of
 * `atlas-internationalisation.php:1290-1588`
 * (`section.section > .container > (.head-wrap.top > h2.h2-tag.mrg16,
 *   .swiper.common-swiper-full.mrgtp0 > 9 x .swiper-slide.customSlideItem_X91 >
 *   .testimonial-custom-card.bgc1.atlas, .swiper-button-next.experiences-next,
 *   .swiper-button-prev.experiences-prev)`).
 *
 * Nine student reels on the shared `VideoTestimonialCard`, on its `custom`
 * variant: a fixed 320x500 white card rather than the auto-width indigo one
 * "Voices Around the World" uses. Both come from this page's own inline
 * `<style>` block.
 *
 * The `.sub-heading.mrgbtm` between the heading and the carousel is commented
 * out upstream, so there is no lead.
 *
 * Three of the nine reels (poster-img-9 / -6 / -7) author the same mp4 as both
 * of their two `<source>`s where every other post pairs an mp4 with a webm.
 * Transcribed as authored — a repeated `<source>` is inert, the browser takes
 * the first playable one — which is why `VideoTestimonialCard` keys them by
 * position rather than by `src`.
 *
 * `.customSlideItem_X91` carries no rule in any stylesheet — it is a hook the
 * page never uses. Autoplay is stopped by the page's own trailing script, and
 * the two circular arrows are wired to `slideNext()` / `slidePrev()` by it.
 */
export default function StudentExperiences() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        <div className="flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:justify-around">
          {/* ref h2.h2-tag.mrg16 */}
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{experiences.heading}</h2>
        </div>
      </div>

      {/* ref .swiper.common-swiper-full.mrgtp0 + its two navigation buttons */}
      <Carousel
        autoplay={false}
        arrows={{ prev: 'Previous story', next: 'Next story' }}
      >
        {experiences.cards.map((card) => (
          <VideoTestimonialCard key={card.poster} card={card} variant="custom" />
        ))}
      </Carousel>
    </section>
  );
}
