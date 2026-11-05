import PrimaryButton from '@/components/ui/PrimaryButton';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER } from '@/components/Home/SectionHead';
import { cx } from '@/lib/cx';

/**
 * `.inner-header-wrapper.full-ht` — the Programs pages' hero.
 *
 * Not `components/ui/InnerPageHero`. Both are a full-viewport photograph with a
 * scrim and a title over it, but every measured property of the scrim differs
 * and so does what sits inside it:
 *
 *                       InnerPageHero                 ProgramHero
 *   section             `.main-cover-section-isme`    `.inner-header-wrapper.full-ht`
 *   scrim height        top 25% (h-3/4)               top **50%**, and the full
 *                                                     height at <=767
 *   gradient            transparent -> #000c at 84%   transparent -> #000e at 100%
 *   scrim padding       0 0 64 64                     0 0 56 0
 *   content box         `.hero-text`, max-width 840   a full `.container`
 *   content             eyebrow + h1 + lead + buttons h1 + buttons
 *
 * Two genuinely different boxes, so this is its own component rather than a
 * fifth variant of the other one.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                                >=768px                    <=767px
 *   .inner-header-wrapper        100% x 100vh, relative, clipped
 *   .header-image-inner          100% x 100%, object-cover
 *   .inner-header-cover          absolute, top 50%,         top 0 (full height)
 *                                flex, align-end,
 *                                padding-bottom 56,
 *                                transparent -> #000e
 *   .container.grow              the standard container inset
 *   h1.h1-tag                    56px/400  (44 at <=991)    28px/600
 *   .buttons-wrapper             row, gap 16, padding-top 30           padding-top 24
 *                                                                      at <=576
 *
 * The wrapper is `height: 100%` on a `html, body { height: 100% }` page, which
 * measures exactly the 1000px viewport — `h-screen`, the same call every other
 * inner-page hero makes.
 */

/*
 * ref .buttons-wrapper. Both Programs pages re-declare it in their own `<style>`
 * exactly as /admissions/ug-admissions does: the gap stays 16 at every width
 * rather than dropping to 8 at 991, and the alignment and padding turn at
 * **576** rather than 767/479. The stylesheet's own `flex-flow: column` at 767
 * still applies underneath, so the row stacks first and only then left-aligns —
 * measured `column` at 700 and `align-items: flex-start` only from 568.
 */
const BUTTONS =
  'flex items-center gap-4 pt-[30px] max-md:flex-col max-md:justify-start '
  + 'max-576:items-start max-576:pt-6';

export default function ProgramHero({ hero }) {
  return (
    /* ref .inner-header-wrapper.full-ht */
    <div className="relative h-screen w-full overflow-hidden">
      {/* ref img.header-image-inner */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.image.src}
        srcSet={hero.image.srcSet}
        sizes={hero.image.sizes}
        alt={hero.image.alt}
        className="block h-full w-full object-cover"
      />

      {/* ref .inner-header-cover — the bottom half above 767px, the whole
          frame below it */}
      <div
        className={cx(
          'absolute inset-x-0 bottom-0 top-1/2 flex items-end pb-14',
          'bg-[linear-gradient(#00000000,#000000e6)]',
          'max-md:top-0',
        )}
      >
        {/* ref .container.grow — a flex child of the cover, so it takes
            Webflow's own `width: 100%` explicitly; without it the box shrinks
            to fit the heading and the whole column drifts to the centre */}
        <div className={`w-full ${CONTAINER}`}>
          {/* ref h1.h1-tag */}
          {/* `title` may carry the reference's own `<br>` as a newline —
              /programs/ug/ug-design-and-innovation breaks its heading in two
              and the three pages above it do not, so this is a no-op there */}
          <h1 className="m-0 text-[56px] font-normal leading-[1.2] text-white max-lg:text-[44px] max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
            {withBreaks(hero.title)}
          </h1>

          {/* ref .buttons-wrapper */}
          {hero.buttons?.length > 0 && (
            <div className={BUTTONS}>
              {hero.buttons.map((button) => (
                <PrimaryButton
                  key={button.label}
                  href={button.href}
                  variant={button.variant}
                  textSize={button.textSize}
                  external={button.external}
                  newTab={button.newTab}
                >
                  {button.label}
                </PrimaryButton>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
