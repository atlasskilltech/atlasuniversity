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
 * (`id="overview"`), and its sticky menu's first link points at it.
 */
export default function Hero({ data, brochure }) {
  return (
    /* ref .inner-header-wrapper(.full-ht) */
    <div
      id={data.id || undefined}
      data-block="hero"
      className={cx(
        'relative w-full overflow-hidden',
        data.fullHeight === false ? 'h-[658px]' : 'h-screen'
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
            {/* ref h1.h1-tag */}
            <h1 className="m-0 text-[56px] font-normal leading-[1.2] text-white max-lg:text-[44px] max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
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
          {/* ref .inner-cover-text */}
          <div className="w-[430px] text-[18px] font-light leading-[1.6] text-white max-md:w-full">{data.text}</div>
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
           wrapper's own box, so it is `object-cover` over `h-full w-full` */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={data.image.src}
          srcSet={data.image.srcSet}
          sizes={data.image.sizes}
          alt={data.image.alt}
          className="h-full w-full max-w-full object-cover align-middle"
        />
      )}
    </div>
  );
}
