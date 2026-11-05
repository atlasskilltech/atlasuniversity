'use client';

import { aboutContent } from '@/lib/aboutContent';
import PillTabs from '@/components/ui/PillTabs';
import { cx } from '@/lib/cx';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Recognition that Reflects Our Commitment" — port of `about-us.php:354-400`
 * (`section#recognition.section > .container > (h2.h2-tag.mrg32,
 *   .rounded-tabs-mint > (.tabs-menu-mint.less-space, .tab-content-mint.atlas))`).
 *
 * Four tabs — NAAC Accreditation / MoUs / UGC Recognition / Member of AIU —
 * over the same Webflow tab widget the homepage testimonials use, so the strip
 * itself comes from the shared `PillTabs`.
 *
 * Every panel is the same object: a 575px-tall photograph filling a
 * `32px 0` rounded, clipped frame, with an absolutely positioned copy block
 * pinned to the bottom over a diagonal scrim. They differ only in
 *   - `kind`       — NAAC lays its badge and text out in a row, the others in
 *                    a column
 *   - `imageFirst` — UGC puts the photo before the copy in the DOM
 *   - `badge`      — an accreditation mark above/next to the text
 *   - `logos`      — the MoU panel adds a 5000px-wide row of partner logos that
 *                    the frame clips
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   panel frame              1242 x 575                  346 x 575
 *   .mou-image.flip          100% x 575, cover,          same
 *                            rotateY(180deg)
 *   .mou-text-wrap           inset 0, column, end,       same, gap 56
 *                            gap 56, padding-bottom 60
 *   .mou-text                494 wide, 18px/1.5, 300,    100%, 16px/1.5,
 *                            padding 0 60                padding 0 22
 *   .naac-text-wrap          row, align-end, gap 56,     column, gap 20,
 *                            padding 0 40 60            padding 0 20 60
 *   .naac-text               24px/1.5, 700               18px/1.5, padding 0 20
 *   .slide-wrap              5000px row, padding         same
 *                            40 40 20
 *
 * The scrim is `linear-gradient(14deg, rgba(0,0,0,.7) 31%, transparent)` on
 * desktop and the same at 8% below 768px. `.slide-wrap` has no animation in the
 * reference — it is a fixed 5000px row that simply runs out of the frame.
 */

function Panel({ panel }) {
  const naac = panel.kind === 'naac';

  const copy = (
    /* ref .naac-text-wrap / .mou-text-wrap */
    <div
      className={cx(
        'absolute inset-0 z-[1] flex pb-[60px] text-white',
        /* NAAC lays the badge beside the text and pins the pair to the bottom
           left; the other three stack and fill the width */
        naac
          ? 'flex-row items-end justify-start gap-14 px-10 max-md:flex-col max-md:items-start max-md:justify-end max-md:gap-5 max-md:px-5'
          : 'flex-col items-start justify-end gap-14',
        /* the scrim's gradient stop moves from 31% to 8% below 768px, so it
           rides on a custom property rather than an inline style */
        naac &&
          'bg-[image:var(--scrim)] [--scrim:linear-gradient(14deg,rgba(0,0,0,0.7)_31%,rgba(255,255,255,0))] max-md:[--scrim:linear-gradient(14deg,rgba(0,0,0,0.7)_8%,rgba(255,255,255,0))]',
      )}
    >
      {panel.badge && (
        /* ref img.image-27 (NAAC) / img.mou-img */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={panel.badge.src}
          alt={panel.badge.alt}
          loading="lazy"
          className={naac ? 'block max-w-full max-md:w-[153px]' : 'ml-[60px] block max-w-full max-md:ml-[22px]'}
        />
      )}

      {panel.text.length > 0 && (
        /* ref .naac-text / .mou-text */
        <div
          className={cx(
            naac
              ? 'text-2xl font-bold leading-[1.5] max-md:px-5 max-md:text-lg'
              : 'w-[494px] px-[60px] text-lg font-light leading-[1.5] max-md:w-full max-md:px-[22px] max-md:text-base',
          )}
        >
          {panel.text.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </div>
      )}

      {panel.logos.length > 0 && (
        /* ref .slide-wrap — a fixed 5000px row, clipped by the frame */
        <div className="flex w-[5000px] items-center px-10 pb-5 pt-10">
          {panel.logos.map((logo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={logo.src} src={logo.src} alt={logo.alt} loading="lazy" className="block" />
          ))}
        </div>
      )}
    </div>
  );

  const image = panel.image && (
    /* ref img.mou-image.flip */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={panel.image.src}
      srcSet={panel.image.srcSet}
      sizes="100vw"
      alt={panel.image.alt}
      loading="lazy"
      className="h-[575px] w-full object-cover [transform:rotateY(180deg)]"
    />
  );

  return (
    /* ref .naac-wrap-atlas / .mou-wrapper-atlas */
    <div className="relative h-[575px] overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
      {panel.imageFirst ? (
        <>
          {image}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {image}
        </>
      )}
    </div>
  );
}

export default function Recognition() {
  const { recognition } = aboutContent;

  return (
    /* ref section#recognition.section */
    <section id="recognition" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg32 */}
        <h2 className={`mb-8 ${H2}`}>{recognition.heading}</h2>

        <PillTabs
          idPrefix="recognition"
          label={recognition.heading}
          tabs={recognition.panels.map((panel) => ({
            label: panel.label,
            render: () => <Panel panel={panel} />,
          }))}
        />
      </div>
    </section>
  );
}
