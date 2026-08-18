import ProgramSlider from '@/components/Programs/ProgramSlider';

/**
 * The shell shared by all four programme carousels on the homepage — port of
 * `section.section > .container > (.head-wrap.mrgbtm32, .swiper.common-swiper)`
 * (reference/index.php:248, 623, 952, 1146; the four blocks are byte-identical
 * apart from their copy, accent and cards).
 *
 * ── The responsive cascade, measured off the reference ────────────────────
 *              >=768px            480-767px           <=479px
 *   section    60px  padding      40px                40px
 *   container  62 / 30px inset    22px                22px      (30px <=991)
 *   head-wrap  row, items-end     column, stretch     same, margin-bottom 0
 *   .tt-wrap   -                  margin-bottom 20    + margin-right 20
 *   h2         44px/1.2, mb 16    36px/1.2, mb 8      same
 *   sub-head   24px/1.4, pr 50    16px/1.5, py 20     16px/1.5, no padding
 *   bullets    hidden             hidden (>568px)     shown (<=568px)
 *
 * The card itself never changes size (295 x 367 at every width) — only how many
 * of them fit on screen does, so each section is one carousel everywhere rather
 * than a grid that collapses.
 *
 * `children` render after the slider, still inside the section: the
 * industry-integrated block is the only one that has anything there.
 *
 * ── One deliberate deviation ──────────────────────────────────────────────
 * Upstream, Swiper's `.swiper-slide {height: 100%}` resolves against a <body>
 * that Webflow gives `height: 100%`, so every slide inherits the *viewport*
 * height and each of these sections ends up ~500px taller than its content — a
 * band of dead space under the cards whose size changes with the browser
 * window. That is a layout bug, not a design, and it is not reproduced here:
 * a section is as tall as its heading plus one row of cards (621px at
 * 1440x900 for the career block, versus the reference's 1157px).
 */
export default function ProgramsSection({ section, children }) {
  const { heading, subheading, accent, buttons, applyHref, programs } = section;

  return (
    /* ref .section */
    <section className="block overflow-hidden py-[60px] max-md:py-10">
      {/* ref .container */}
      <div className="relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]">
        {/* ref .head-wrap.mrgbtm32 */}
        <div className="mb-8 flex items-end justify-between max-md:flex-col max-md:items-stretch max-sm:mb-0">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref .h2-tag.mrg16 */}
            <h2 className="mb-4 text-6xl font-medium text-[#1a1a1a] max-md:mb-2 max-md:text-5xl max-md:leading-[1.2]">
              {heading}
            </h2>

            {/* ref .sub-heading */}
            <div className="pr-[50px] text-2xl font-light leading-[1.4] max-md:py-5 max-md:pr-0 max-md:text-base max-md:leading-[1.5] max-sm:py-0">
              {subheading}
            </div>
          </div>
        </div>
      </div>

      {/*
        Outside `.container` on purpose — see ProgramSlider: the reference
        slider is `overflow: visible` and bleeds past the container's right
        inset to the viewport edge, which a scroll container can only reproduce
        by spanning the full width and re-applying that inset to its track.
      */}
      <ProgramSlider
        programs={programs}
        applyHref={applyHref}
        accent={accent}
        buttons={buttons}
      />

      {children}
    </section>
  );
}
