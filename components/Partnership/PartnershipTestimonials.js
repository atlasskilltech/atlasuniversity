/*
 * ref global-pathways.php "Student Testimonials" — a Tailwind-CDN section: a heading row (a navy
 * `#011136` icon box with the notification glyph + an h2) above a navy `#011136` block holding a
 * horizontal-scroll row of a lead paragraph and the student-testimonial videos. Play-CDN `sm:` =
 * 640 → `n640:`.
 */
import TestimonialTrack from './TestimonialTrack';

const ICON = '/assets/images/advantages/partnership/cdn/notification.png';

/*
 * `variant` — global-pathways is a fixed horizontal-scroll row of 300x400 (3:4) cards (`fixed`,
 * the default). global-immersions is a responsive Swiper (`.myGuideSlider3`): slidesPerView
 * 1 / 2 / 4 / 5 at 0 / 640 / 768 / 1024, spaceBetween 20, 9:16 portrait cards (`carousel`).
 * Each card is the poster's 9:16 box CAPPED at `max-height: 600px` (`.myGuideSlider3 .videoEl`), so
 * at one per view (<640) the card is the slide's width by 600 (524x600 at 568) — measured.
 *
 * The scroller authors both `max-w-[1536px]` and `max-w-[1366px]`; under the Play CDN 1536 wins
 * (the lead is 1316px wide at 1440 on both pages' production), so 1536 it is.
 */
const CARD = {
  /* global-pathways: 300x400 above 767; at <=767 its own <style> forces every `.swiper-slide` to
     `width: 100% !important`, so a card is the scroller's full width at the poster's 3:4 */
  fixed: 'aspect-[3/4] w-[300px] flex-none snap-start max-md:w-full',
  carousel:
    'aspect-[9/16] max-h-[600px] flex-none snap-start w-full '
    + 'n640:w-[calc((100%-20px)/2)] md:w-[calc((100%-60px)/4)] n1024:w-[calc((100%-80px)/5)]',
  /* international-faculty: the same slider with NO max-height on the video — at one per view the
     card is the full 9:16 (524x931 at 568) */
  carouselFull:
    'aspect-[9/16] flex-none snap-start w-full '
    + 'n640:w-[calc((100%-20px)/2)] md:w-[calc((100%-60px)/4)] n1024:w-[calc((100%-80px)/5)]',
};

/* `loop` — global-immersions / global-pathways author `loop: true`; international-faculty `false`, so
   there the arrows stop (Swiper's `.swiper-button-disabled`) at either end */
export default function PartnershipTestimonials({ heading, lead, testimonials, variant = 'fixed', loop = true }) {
  const cards = testimonials.map((t, i) => (
    /* ref each testimonial video card (fixed 3:4 / responsive 9:16) */
    <div key={i} className={CARD[variant]}>
      {/* every source as a <source>, in the reference's order (WebM, then MP4), so a browser that cannot
          play the first falls through to the next — a single `src` gave it nothing to fall back to */}
      <video
        className="h-full w-full rounded-[16px] object-cover"
        poster={t.poster || undefined}
        controls
        playsInline
        preload="metadata"
      >
        {(t.sources || []).map((s) => (
          <source key={s} src={s} type={/\.webm(\?|$)/i.test(s) ? 'video/webm' : /\.mp4(\?|$)/i.test(s) ? 'video/mp4' : undefined} />
        ))}
      </video>
    </div>
  ));
  return (
    <section className="lp-bs bg-gray-100 py-20">
      {/* heading row */}
      <div className="flex h-auto items-center pr-[40px]">
        <div className="relative flex h-[74px] w-[68px] max-w-none flex-none items-center justify-center self-end bg-[#011136] n640:h-[122px] n640:w-[174px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ICON} alt="" className="static top-[28px] left-[55px] right-0 w-[40px] align-baseline n640:absolute n640:w-auto" />
        </div>
        <div className="flex max-w-full flex-1 items-center justify-between self-center">
          <h2 className="ml-[18px] text-[22px] font-medium leading-[1.2] text-[#072058] n640:ml-[48px] n640:text-[44px]">
            {heading}
          </h2>
        </div>
      </div>
      {/* navy body — ref: the scroller (overflow-x) stacks a full-width lead block
          (`pt-[40px] sm:pt-[56px] pb-[20px] text-[18px] sm:text-[24px]`, ~256px) ABOVE a horizontal
          row of the fixed 300x400 portrait video cards; navy pb-56 */}
      <div className="bg-[#011136] pb-[56px] text-white">
        <div className="relative mx-auto w-full max-w-[1536px] overflow-x-auto px-[22px] [-ms-overflow-style:none] [scrollbar-width:none] n640:px-[62px] [&::-webkit-scrollbar]:hidden">
          <div className="max-w-full pb-[20px] pt-[40px] text-[18px] leading-[1.5] n640:pt-[56px] n640:text-[24px]">
            {lead}
          </div>
          {/* spaceBetween 20 on both pages — written in px: inside `.lp-bs` a bare `gap-5` is
              Bootstrap's 48px */}
          <TestimonialTrack loop={loop} className="flex snap-x snap-mandatory items-stretch gap-[20px]">{cards}</TestimonialTrack>
        </div>
      </div>
    </section>
  );
}
