import { voices } from '@/lib/internationalisationContent';
import Carousel from '@/components/Carousel/Carousel';
import VideoTestimonialCard from '@/components/ui/VideoTestimonialCard';
import { CONTAINER, SECTION, H2, SUB_H2 } from '@/components/Home/SectionHead';

/**
 * "Voices Around the World" — port of
 * `atlas-internationalisation.php:1036-1289`
 * (`section.section > .container > (h2.h2-tag.mrgbtm0, h2.sub-heading,
 *   .swiper.common-swiper-full.mrgtp0 > 8 x .testimonial-card.bgc1.atlas,
 *   .swiper-button-next.voices-next, .swiper-button-prev.voices-prev)`).
 *
 * Eight looping video testimonials from partner-university faculty, on the
 * shared `VideoTestimonialCard`, which carries the measurements.
 *
 * ── The lead is an empty `<h2>` ───────────────────────────────────────────
 * `<h2 class="sub-heading"></h2>` has no text, and it is still a real box:
 * Webflow's base sheet gives every `h2` `margin: 20px 0 10px` and
 * `.sub-heading` adds 20px of vertical padding below 768px, so leaving it out
 * moves the carousel up by 30px. It is rendered empty, the same call
 * `GridGallery` and `TestimonialCard` already make for their empty elements.
 *
 * ── The card width ────────────────────────────────────────────────────────
 * `.testimonial-card` is `width: 100%; height: auto` here (this page's inline
 * `<style>`), inside a `slidesPerView: 'auto'` slide — so the slide takes the
 * video's own intrinsic width under `max-height: 560px`, which measures 373px
 * for all eight. That is passed as an explicit width rather than left to
 * resolve, because `width: 100%` in an auto-width slide is exactly the
 * construction that blows a card up to 1127px elsewhere in this rebuild.
 *
 * Autoplay is stopped by the page's own trailing script; the two circular
 * arrows are wired to `slideNext()` / `slidePrev()` by it as well.
 */
export default function Voices() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrgbtm0 */}
        <h2 className={`mb-0 ${H2}`}>{voices.heading}</h2>

        {/* ref h2.sub-heading — empty upstream, but a real box */}
        <div className={SUB_H2}>{voices.subheading}</div>
      </div>

      {/* ref .swiper.common-swiper-full.mrgtp0 + its two navigation buttons */}
      <Carousel
        autoplay={false}
        arrows={{ prev: 'Previous testimonial', next: 'Next testimonial' }}
      >
        {voices.cards.map((card) => (
          <VideoTestimonialCard key={card.poster} card={card} width={373.328} />
        ))}
      </Carousel>
    </section>
  );
}
