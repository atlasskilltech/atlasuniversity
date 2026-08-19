/**
 * `.testimonial-card.bgc1.atlas` — a portrait beside an indigo panel carrying a
 * quote and its attribution, over a vector wash.
 *
 * Three instances, measured identical in every property:
 *   /success-stories-atlas             "Industry Testimonials"   4 cards
 *   /advantages/atlas-career-services  "Industry Testimonials"   7 cards
 *   /advantages/atlas-career-services  "Student Testimonials"    3 cards
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                  <=767px
 *   .testimonial-card        620 x 440, row,          column, height auto
 *     .bgc1.atlas            #41418e, radius 32px 0,
 *                            clipped
 *   .student-image           50% wide, full height,   100% x 320
 *                            cover
 *   .student-text            flex 1, padding 40 32    height 280, padding
 *                                                     20 12, and `flex: none`
 *                                                     at <=479 — so between
 *                                                     480 and 767 it still
 *                                                     shrinks below its 280
 *   .st-quote                padding 24, z 1          width 100%
 *   .st-text                 20px                     16px
 *   .quote                   absolute 5 / 5, 16px
 *   .st-details              padding-left 24, z 1     width 100%
 *   .st-course.isdi          14px, #fff
 *   .bg-image                absolute 0 0, cover, z 0
 *
 * ── One reference defect, not reproduced ──────────────────────────────────
 * The card is `width: 100%` below 768px inside a `slidesPerView: 'auto'` slide,
 * so between 568 and 767px the percentage resolves against an auto width and it
 * measures over 1100px at a 700px viewport — the same blow-up the homepage
 * testimonials carry a fix for. Below 568px an inline rule in `header.php`
 * gives the slide `width: 100%` and it comes out right again. The container
 * width is used throughout instead, which is what the reference renders
 * everywhere the bug does not bite.
 *
 * `.st-course.st-name.isdi` holds the name and the company in one div split by
 * a `<br>`, the company in a `<strong>`.
 */
export default function TestimonialCard({ card }) {
  return (
    /* ref .testimonial-card.bgc1.atlas */
    <div
      className="flex h-[440px] w-[620px] overflow-hidden rounded-tl-[32px] rounded-br-[32px] bg-[#41418e]
                 max-md:h-auto max-md:w-[calc(100vw-44px)] max-md:flex-col"
    >
      {/* ref img.student-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        srcSet={card.image.srcSet}
        sizes={card.image.sizes}
        alt={card.image.alt}
        loading="lazy"
        className="block w-1/2 object-cover object-center max-md:h-[320px] max-md:w-full"
      />

      {/* ref .student-text */}
      <div className="relative h-full flex-1 px-8 py-10 text-white max-md:h-[280px] max-md:px-3 max-md:py-5 max-sm:flex-none">
        {/* ref .st-quote */}
        <div className="relative z-[1] p-6 max-md:w-full">
          {/* ref .st-text */}
          <div className="text-xl max-md:text-[16px] max-md:leading-6">{card.text}</div>

          {/* ref img.quote */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.quoteIcon} alt="" loading="lazy" className="absolute left-[5px] top-[5px]" />
        </div>

        {/* ref .st-details */}
        <div className="relative z-[1] pl-6 max-md:w-full">
          {/* ref .stname.isdi — empty on all fourteen cards across the two
              pages, but a real box: `padding-bottom: 5px` makes the block 5px
              taller than its visible content, and the card is content-sized
              between 480 and 767px, so leaving it out shortens the card */}
          <div className="pb-[5px] text-[14px] font-semibold text-white" />

          {/* ref .st-course.st-name.isdi */}
          <div className="text-[14px] text-white">
            {card.name}
            <br />
            <strong>{card.company}</strong>
          </div>
        </div>

        {/* ref img.bg-image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.bgImage}
          alt=""
          loading="lazy"
          className="absolute left-0 top-0 z-0 block h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
