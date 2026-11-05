import PrimaryButton from '@/components/ui/PrimaryButton';
import BrochureModal from '@/components/Programs/BrochureModal';
import OutcomesBook from '@/components/Schools/ISDI/Success/OutcomesBook';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';

/**
 * `section.main-cover-section-isme` — the Advantages pages' hero: a
 * full-viewport photograph with a scrim over its lower three quarters, the
 * title and lead bottom-left inside it, and optionally a row of buttons.
 *
 * Two instances so far, measured identical in every property of the section,
 * the scrim, the text box, the heading and the lead:
 *   /advantages/atlas-advantages       `atlas-advantages.php:14`      3 buttons
 *   /advantages/atlas-career-services  `atlas-career-services.php:14` none
 *
 * Three instances now, the third being
 *   /advantages/atlas-enterprenurship  `atlas-enterprenurship.php:14`  1 button
 *
 * A fourth, /admissions/integrated-admissions (`integrated-admissions.php:107`,
 * 3 buttons), adds the optional `.course-duration-isme.atlas` eyebrow above the
 * title — 24px/500 white, `padding-top: 4px`, constant at every width. The
 * three Advantages heroes author no such element, so `hero.eyebrow` is omitted
 * there and nothing renders.
 *
 * The photograph's class differs between them — `.header-image-inner` vs
 * `.inner-cover-image` — but both are `object-fit: cover; width: 100%;
 * height: 100%`, so it makes no difference.
 *
 * ── Two button wrappers ───────────────────────────────────────────────────
 * The pages do not agree on which one they use, and the two are genuinely
 * different boxes, so `buttonWrap` selects between them:
 *
 *   row     `.buttons-wrapper` — row, gap 16 (8 at <=991), padding-top 30;
 *           becomes a column at <=767 with padding-top 24 (14 at <=479).
 *           /advantages/atlas-advantages.
 *   column  `.button-wrap` — column at every width, gap 16, justify-center,
 *           align-start, max-width 100%, margin-top 32.
 *           /advantages/atlas-enterprenurship.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                              >=992px           768-991px        <=767px
 *   .main-cover-section-isme   100% x 100%, relative
 *   .header-image-inner        100% x 100%, cover
 *   .hero-cont-wrapper-isme    bottom 75%, transparent -> #000c at 84%,
 *                              flex align-end
 *                              padding 0 0 64 64                  padding
 *                                                                 0 22 40 22
 *   .hero-text                 max-width 840                      max-width
 *                                                                 704 (<=479)
 *   .h1-tag                    56px/1.2, 400     44px             28px/1.5,
 *                                                                 600
 *   .course-desc-isme.big-txt  24px/300, pt 16   same             20px
 *                                                                 (16 <=479)
 *   .buttons-wrapper           row, gap 16,      gap 8            column,
 *                              padding-top 30                     start,
 *                                                                 pt 24
 *                                                                 (pt 14,
 *                                                                 <=479)
 *
 * The section is `height: 100%` on a `html, body { height: 100% }` page, which
 * measures exactly the 1000px viewport — reproduced as `h-screen`, the same
 * thing the other four inner-page heroes use.
 *
 * "Schedule a Visit" opens a NoPaperForms widget in the reference, via a script
 * that binds to `[data-id="campus-visit"]`. That attribute is on none of the
 * three buttons here — the anchor carries `id="campus-visit"` instead — so the
 * listener matches nothing and the link simply follows its href. It is ported
 * as the plain link it behaves as, the same decision /campus-atlas made.
 */
/* ref .buttons-wrapper / .button-wrap — whole literal strings, because the
   Tailwind scanner reads source text */
/* ref .hero-cont-wrapper-isme's gradient. Every other Advantages page takes
   the stylesheet's `transparent -> #000c at 84%`;
   /advantages/atlas-internationalisation's own inline `<style>` re-declares the
   same rule with the stop at 120%, which lightens the whole scrim. */
const SCRIM = {
  default: 'bg-[linear-gradient(#00000000,#000000cc_84%)]',
  soft: 'bg-[linear-gradient(#00000000,#000000cc_120%)]',
};

const BUTTON_WRAP = {
  row: 'flex items-center gap-4 pt-[30px] max-lg:gap-2 max-md:flex-col '
     + 'max-md:items-start max-md:justify-start max-md:pt-6 max-sm:pt-[14px]',
  /*
   * /admissions/ug-admissions re-declares `.buttons-wrapper` in its own
   * `<style>`: the gap stays 16 at every width (no drop to 8 at 991), and the
   * row's alignment and padding change at **576** rather than 767 — though the
   * stylesheet's own `flex-flow: column` at 767 still applies, so it stacks
   * first and only then left-aligns. Measured, not assumed.
   *
   * ── Deviation: `flex-wrap` ────────────────────────────────────────────
   * That hero has four buttons rather than three, and at exactly 768px the row
   * is still a row while `.hero-text` is only 704px wide, so the fourth button
   * runs 112px past the viewport and the reference really does scroll
   * horizontally there (measured: `document.scrollWidth` 880 against a 768
   * client width, on production as well as here). Nothing above it clips.
   * `flex-wrap` lets the row break instead; it engages only when the buttons
   * do not fit, so every other width is byte-identical to the reference.
   */
  'row-576': 'flex flex-wrap items-center gap-4 pt-[30px] max-md:flex-col '
     + 'max-md:justify-start max-576:items-start max-576:pt-6',
  column: 'mt-8 flex max-w-full flex-col items-start justify-center gap-4',
};

export default function InnerPageHero({ hero, buttonWrap = 'row', scrim = 'default' }) {
  return (
    /* ref section.main-cover-section-isme */
    <section className="relative h-screen w-full">
      {/* ref img.header-image-inner */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.image.src}
        srcSet={hero.image.srcSet}
        sizes={hero.image.sizes}
        alt={hero.image.alt}
        className={cx('block h-full w-full object-cover', hero.mobileImage && 'max-md:hidden')}
      />
      {/* ref img.hero-img-mobile — /advantages/partnership/master-progression swaps in a separate
          portrait image below 768 (its own <style>: `.hero-img-desktop { display: none !important }`) */}
      {hero.mobileImage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={hero.mobileImage} alt="" className="hidden h-full w-full object-cover max-md:block" />
      )}

      {/* ref .hero-cont-wrapper-isme */}
      <div
        className={cx(
          'absolute inset-x-0 bottom-0 z-[1] flex h-3/4 items-end',
          SCRIM[scrim],
          'pb-16 pl-16 max-md:px-[22px] max-md:pb-10',
        )}
      >
        {/* ref .hero-text */}
        <div className="max-w-[840px] max-sm:max-w-[704px]">
          {/* ref .course-duration-isme.atlas — an eyebrow above the title, so
              far only on the Admissions heroes; 24px/500 white at every width,
              with the class's own 4px top padding */}
          {hero.eyebrow && (
            <div className="block pt-1 text-[24px] font-medium leading-[1.5] text-white">
              {hero.eyebrow}
            </div>
          )}

          {/* ref h1.h1-tag */}
          <h1 className="m-0 text-[56px] font-normal leading-[1.2] text-white max-lg:text-[44px] max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
            {withBreaks(hero.title)}
          </h1>

          {/* ref .course-duration — /centre_for_research's tagline under the title: 24px/1.5 300
              white, padding 16 0 10, unchanged at every width (measured 1440 / 767 / 390) */}
          {hero.duration && (
            <div className="pb-2.5 pt-4 text-[24px] font-light leading-[1.5] text-white">{hero.duration}</div>
          )}

          {/* ref .course-desc-isme.big-txt — omitted when the hero has no lead (e.g. the
              partnership pages, whose cover is just the title), as the five Advantages/Admissions
              heroes all author one */}
          {hero.text && (
            /* `hero.textTone` "law" — `.course-desc-isme.big-txt.law` (/schools/law/program-page-law): #cb5827 */
            <div className={cx('block pt-4 text-[24px] font-light max-md:text-[20px] max-sm:text-[16px]', hero.textTone === 'law' ? 'text-[#cb5827]' : 'text-white')}>
              {hero.text}
            </div>
          )}

          {/* ref a.hero-banner-btn — master-progression's in-page link under the lead: #02b3c3 pill,
              18px/1 600, 16 32 padding, shadow, 24px above; 16px / 14 26 / 20px at <=991;
              13px / 11 18 / 16px, wrapping, max 90% wide at <=767 */}
          {hero.cta && (
            <a
              href={hero.cta.href}
              className="mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-[36px] bg-[#02b3c3] px-8 py-4 text-[18px] font-semibold leading-none text-black no-underline shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#029eac] max-lg:mt-5 max-lg:px-[26px] max-lg:py-[14px] max-lg:text-[16px] max-md:mt-4 max-md:max-w-[90%] max-md:whitespace-normal max-md:px-[18px] max-md:py-[11px] max-md:text-[13px]"
            >
              {hero.cta.label}
            </a>
          )}

          {/* ref .buttons-wrapper / .button-wrap — omitted entirely when the
              page has none, which is what the reference does rather than
              rendering an empty wrapper with its top padding */}
          {hero.buttons?.length > 0 && (
          <div className={BUTTON_WRAP[buttonWrap]}>
            {hero.buttons.map((button) => (button.widget ? (
              /* a CRM `data-atlas-mode="popup"` embed in the button row (/schools/ugdx/nextgen-women-in-stem-
                 scholarship): its injected launch pill and dialog, through the shared OutcomesBook */
              <OutcomesBook key={button.label} label={button.label} src={button.widget.src} tone={button.widget.tone} width={button.widget.width} height={button.widget.height} />
            ) : button.brochure ? (
              /* a button authored `href="#"` with a `data-id` that opens a CRM brochure popup
                 (/schools/law/program-page-law's "View Brochure") — a dialog trigger, not a link */
              <BrochureModal key={button.label} brochure={{ ...button.brochure, label: button.label }} variant={button.variant} />
            ) : (
              <PrimaryButton
                key={button.label}
                href={button.href}
                variant={button.variant}
                newTab={button.newTab}
                external={button.newTab}
              >
                {button.label}
              </PrimaryButton>
            )))}
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
