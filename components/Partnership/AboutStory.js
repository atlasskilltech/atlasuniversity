import { TW_CONTAINER, WF_SECTION } from './ui';
import { CONTAINER as WF_CONTAINER } from '@/components/Home/SectionHead';
import { cx } from '@/lib/cx';

/*
 * ref global-pathways.php / collaborative-projects.php / global-immersions.php "About" —
 * `.section > .container > .about-story-wrapper-ugdx`: a text column (`.abt-cont-ugdx-1`:
 * h2.h2-tag.mrg42 + `.abt-text` with an authored `<br><br>` paragraph break + a trailing
 * `.common-wrapper`) beside the story photograph. A Webflow (not Tailwind-CDN) block, so no `.lp-bs`.
 *
 * Measured on production at twelve widths (corrected 2026-10-31 — the first port fixed the columns
 * at 578 / 546px and stacked at 992, which only coincides with production at 1440):
 *   .container              Tailwind's `.container` ladder, not 1366 (see ./ui TW_CONTAINER)
 *   .about-story-wrapper    flex, space-between, items-center, gap 32, nowrap — wraps (gap 0)
 *                           only at <=767, where its font-size is 18px
 *   .abt-cont-ugdx-1        flex none, width 50%, 18px/27 → 100%, 16px/24 at <=767
 *   image wrapper           a bare <div> (flex 0 1 auto) that takes the remaining width
 *   img.about-image-atlas   inline-block, vertical-align super (that is the ~12px under it),
 *                           cover, square corners → at <=767 width auto, margin-top 40 and
 *                           32px top-left / bottom-right corners
 *   h2.h2-tag.mrg42         44px/1.2, mb 42 → 36px at <=767 (the mrg42 margin holds)
 *   .common-wrapper         padding-top 56 → 40 at <=767. It holds a `.btn-wraper.hide` button
 *                           that is display:none on every page's production, so only the padding
 *                           is reproduced.
 */
/*
 * Options (all default to the measured behaviour of collaborative-projects / global-pathways /
 * global-immersions / international-faculty):
 *   container  'tw' — Webflow's `.container` under the Tailwind CDN ladder; 'webflow' — the plain
 *              1366px Webflow container (international-summerschool loads no Tailwind CDN)
 *   spacer     the trailing `.common-wrapper` (56 / 40px); international-summerschool has none
 *   align      'center' | 'stretch' — international-summerschool's own <style> comments out the
 *              row's `align-items: center`, so its columns stretch
 *   imgAlign   'super' | 'middle' — the photograph's `vertical-align` (middle on that page's sheet,
 *              which removes the ~12px super-script gap under it)
 */
/*
 * Also (master-progression): `story.text` may be an array of runs — a string, or `{ b }` for an
 * authored <b>; `story.cta` `{ label, href }` — the #02b3c3 pill after the copy (h56, 0 24, r36,
 * 18px/1 500 black), with the copy's Bootstrap `mb-4` (24px) above it; `reverse` — the photograph
 * authored first (left) and the copy second; `mobileReverse` — flex-direction column-reverse at <=767.
 */
function Copy({ text }) {
  if (!Array.isArray(text)) return text;
  return text.map((r, i) => (typeof r === 'string' ? r : <b key={i} className="font-bold">{r.b}</b>));
}

/*
 * Also (/centre_for_research): `headingMargin` — that page's `h2.h2-tag.mrg32` (32px, not 42);
 * `photoClip` — its `.about-image-wrap-ugdx` is radius 32px 0 and clipped at every width, and below
 * 768 a flex box that centres the photograph.
 */
export default function AboutStory({ story, container = 'tw', spacer = true, align = 'center', imgAlign = 'super', reverse = false, mobileReverse = false, headingMargin = 42, photoClip = false }) {
  const copy = (
    <div key="copy" className="w-1/2 flex-none text-[18px] leading-[27px] max-md:w-full max-md:text-[16px] max-md:leading-[24px]">
      <h2 className={cx('relative mt-0 text-[44px] font-medium leading-[1.2] text-[#1a1a1a] max-md:text-[36px]', headingMargin === 32 ? 'mb-8' : 'mb-[42px]')}>
        {story.heading}
      </h2>
      {/* ref `.abt-text` — one block with an inline `<br><br>`, reproduced with
          `whitespace-pre-line` over the `

`-separated copy */}
      <div className={cx('whitespace-pre-line text-[#333]', story.cta && 'mb-6')}><Copy text={story.text} /></div>
      {story.cta && (
        <a
          href={story.cta.href}
          className="inline-flex h-[56px] items-center justify-center rounded-[36px] bg-[#02b3c3] px-6 text-black no-underline"
        >
          <span className="block text-[18px] font-medium leading-none">{story.cta.label}</span>
        </a>
      )}
      {spacer && <div className="pt-[56px] max-md:pt-10" aria-hidden="true" />}
    </div>
  );
  const photo = story.image && (
    <div key="photo" className={photoClip ? 'relative overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:flex max-md:items-center max-md:justify-center' : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={story.image}
        alt=""
        loading="lazy"
        className={cx(
          'inline-block h-full w-full object-cover max-md:mt-10 max-md:w-auto max-md:rounded-br-[32px] max-md:rounded-tl-[32px]',
          imgAlign === 'middle' ? 'align-middle' : 'align-super',
        )}
      />
    </div>
  );
  return (
    <section className={WF_SECTION}>
      <div className={container === 'webflow' ? WF_CONTAINER : TW_CONTAINER}>
        {/* `reverse` renders the photograph first, as authored; `mobileReverse` is master-progression's
            own <=767 rule `.about-story-wrapper-ugdx { flex-direction: column-reverse }` */}
        <div
          className={cx(
            'flex justify-between gap-8 max-md:flex-wrap max-md:gap-0 max-md:text-[18px] max-md:leading-[27px]',
            align === 'stretch' ? 'items-stretch' : 'items-center',
            mobileReverse && 'max-md:flex-col-reverse',
          )}
        >
          {reverse ? [photo, copy] : [copy, photo]}
        </div>
      </div>
    </section>
  );
}
