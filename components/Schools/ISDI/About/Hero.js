import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';
import BrochureButton from '@/components/Schools/ISDI/ProgramDetail/BrochureButton';
import InViewVideo from '../Home/InViewVideo';
import { CONTAINER } from '../Home/ui';

/**
 * The ISDI background-video hero — `.inner-header-wrapper` over a
 * `.w-background-video` — port of reference/schools/isdi/about-us/index.php:12-22 and
 * reused by /programs/pre-university-summer-school.
 *
 *   .inner-header-wrapper(.full-ht) > (.inner-header-cover > .container.btm-flext >
 *     ((.hd-wrap >) h1.h1-tag(, .buttons-wrapper), .inner-cover-text),
 *     .w-background-video)
 *
 * `.inner-header-wrapper` is **658px** tall; `.full-ht` is the modifier that makes it 100vh,
 * so the height travels as `data.fullHeight` rather than being baked in — the About page
 * carries the modifier and the Summer School page does not. That page also puts the heading
 * and a `.btn-primary` row in a `.hd-wrap`, which is an unstyled div: it exists only to keep
 * the two together as one flex child beside `.inner-cover-text`.
 *
 * Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                            <=767px
 *   wrapper           100vh with `.full-ht`, else 658, clipped
 *   cover             bottom 50%, transparent -> #000    the whole frame
 *                     at 90%, pb56, content at the bottom
 *   container         row, space-between, bottom-        column, top-aligned,
 *                     aligned, gap 100                   gap 22
 *   h1                56px/1.2 400 white (44px <=991)    28px/1.5 600
 *   text              430 wide, 18px/1.6 300 white       full width; it SHRINKS below its
 *                     declared width where the heading is wide (299px at 1440 on the
 *                     Summer School page), because it is a flex item with a 430 basis
 *   buttons-wrapper   row, centred, gap 16, pt30          (Summer School only)
 *   media             a `.w-background-video` on the About and Summer School pages;
 *                     The ISDI Advantage authors `img.header-image-inner` in the same
 *                     frame instead, so `data.image` selects it and `data.video` the clip
 *   video             fills the frame, cover             `aspect-ratio: 2/3` on the
 *                                                        box, which `height: 100%`
 *                                                        overrides — no change
 *
 * The video autoplays muted and looped as authored; it starts once it is on
 * screen (it always is on load) with the poster painted until then.
 *
 * `data.id` is the wrapper's own id. Only The ISDI Advantage authors one
 * (`id="overview"`), and its sticky menu's first link points at it. Its sibling
 * /atlas-isdi-advantage/internationalisation authors the SAME id on the
 * `img.header-image-inner` instead — hence `data.imageId`, which keeps the anchor
 * where the reference puts it.
 *
 * `widget` is an optional third flex child of that row — see the comment at its
 * call site. Only /schools/isdi/success-stories/success-snapshot has one.
 *
 * `.inner-cover-text` is CONDITIONAL. That page authors no lead beside the heading
 * at all, and the box is not inert: it is a 430px flex item in a `gap: 100` row, so
 * rendering it empty would push the heading 530px left of where the reference puts it.
 */
/*
 * ref .inner-header-wrapper's height modifiers. The base is 658px and `.full-ht`
 * is 100vh — but `._100vh`, which
 * /atlas-isdi-advantage/industry-centric-approach carries, is **78vh** despite its
 * name. `data.height` names the modifier; `data.fullHeight` stays the older flag.
 */
const HEIGHT = { '78vh': 'h-[78vh]', '658': 'h-[658px]', '100vh': 'h-screen' };

export default function Hero({ data, brochure, widget }) {
  return (
    /* ref .inner-header-wrapper(.full-ht) */
    <div
      id={data.id || undefined}
      data-block="hero"
      className={cx(
        'relative w-full overflow-hidden',
        HEIGHT[data.height] ?? (data.fullHeight === false ? 'h-[658px]' : 'h-screen')
      )}
    >
      {/* ref .inner-header-cover */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-end bg-[linear-gradient(#0000,#000000e6)] pb-14 max-md:h-full">
        {/* ref .container.btm-flext */}
        <div
          className={`${CONTAINER} flex w-full flex-1 items-end justify-between gap-[100px] max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-[22px]`}
        >
          {/* ref .hd-wrap — an unstyled div, authored only where the hero has buttons;
              The ISDI Advantage puts its h1 straight in the container */}
          <div>
            {data.eyebrow && (
              /* ref .top-sub-text — 18px/1.5 white with 12px of bottom padding, on
                 the industry-centric-approach hero only */
              <div className="pb-3 text-[18px] leading-[1.5] text-white">{data.eyebrow}</div>
            )}
            {/* ref h1.h1-tag.
               The 44px step at <=991 is the shared About/Programs sheet's rule. One
               page — /schools/isdi/thought-leaderships — reuses that sheet but its own
               inline <style> redefines .h1-tag (56px, no 44px) and, being later in the
               document, wins: production holds 56px from 992 down to 767, then 28px.
               `data.midHeading === false` drops the 44px step for it; every other hero
               keeps the ladder, so the flag is a no-op where it is absent. (The heading
               box is a fixed-height hero, so this never shows in a block-height diff.) */}
            <h1
              className={cx(
                'm-0 text-[56px] font-normal leading-[1.2] text-white',
                data.midHeading === false ? '' : 'max-lg:text-[44px]',
                'max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]'
              )}
            >
              {withBreaks(data.title)}
            </h1>
            {data.buttons?.length > 0 && (
              /*
               * ref .buttons-wrapper — gap 16 / padding-top 30, gap 8 from 991, and at
               * <=767 it turns into a left-aligned COLUMN with padding-top 24, then 14 at
               * <=479. Only the Admissions Summer School hero has two buttons, so the
               * column never showed on the About or programme-page heroes — but their
               * padding-top was wrong at every width below 768, invisibly, because the
               * hero is a fixed-height box and nothing inside it changes that height.
               */
              <div className="flex items-center gap-4 pt-[30px] max-lg:gap-2 max-md:flex-col max-md:items-start max-md:justify-start max-md:pt-6 max-sm:pt-[14px]">
                {data.buttons.map((button) =>
                  /* a button authored `href="#"` with a `data-id` is a popup trigger, not
                     a link — the Admissions Summer School hero's "Download Brochure". It
                     renders through `BrochureButton`, which owns the dialog; every other
                     hero on the site has links only, so `brochure` is optional. */
                  button.brochureKey && brochure ? (
                    <BrochureButton
                      key={button.label}
                      brochure={brochure}
                      label={button.label}
                      variant={button.variant}
                    />
                  ) : (
                    <PrimaryButton key={button.label} href={button.href} variant={button.variant}>
                      {button.label}
                    </PrimaryButton>
                  )
                )}
              </div>
            )}
          </div>
          {/* a third flex child between the heading and the lead — the Success
              Snapshot hero's CRM widget drops its button there, so it is a SIBLING
              of the `h1`, not part of its wrapper: the row is `space-between` with a
              100px gap, and folding the button into the heading's div would spread
              two children where the reference spreads three. */}
          {widget}
          {data.text && (
            /* ref .inner-cover-text */
            <div className="w-[430px] text-[18px] font-light leading-[1.6] text-white max-md:w-full">
              {data.text}
            </div>
          )}
        </div>
      </div>

      {data.video ? (
        /* ref .backgorund-header.w-background-video */
        <div className="relative h-full w-full overflow-hidden text-white">
          <InViewVideo
            sources={data.video.sources}
            poster={data.video.poster}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : (
        /* ref img.header-image-inner — The ISDI Advantage fills the same frame with a
           photograph rather than a looping clip; measured 1440x900 / 390x900, i.e. the
           wrapper's own box, so it is `object-cover` over `h-full w-full`.
           The class declares `display: block`, where `globals.css` restores Webflow's
           `img { display: inline-block }` for every other image — so it is restated
           here. Inert (the frame has a declared height and clips), but the computed
           value was wrong on all three pages that render this form. */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          id={data.imageId || undefined}
          src={data.image.src}
          srcSet={data.image.srcSet}
          sizes={data.image.sizes}
          alt={data.image.alt}
          className="block h-full w-full max-w-full object-cover align-middle"
        />
      )}
    </div>
  );
}
