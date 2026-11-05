import { scholarships } from '@/lib/integratedAdmissionsContent';
import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Empowering Ambition Through Scholarships" — port of
 * `integrated-admissions.php:392-400`
 * (`section.section > .w-layout-blockcontainer.container.w-container >
 *   (.head-wrap.top > (h2.h2-tag.mrg16, a.btn-primary),
 *    .about-story-wrapper-ugdx > (.abt-cont-ugdx-1 > .abt-text,
 *                                 .about-image-wrap-ugdx > img.about-image-atlas))`).
 *
 * A heading with a "Know More" pill opposite it, then a 50/50 split of copy and
 * photograph, vertically centred.
 *
 * ── Not `Advantages/ResearchCulture`, which looks like the same section ───
 * That one is also `.about-story-wrapper-ugdx` over `.abt-cont-ugdx-1`, but it
 * differs in the two things that matter: its head is a heading over a lead with
 * no button, and its photograph sits in a bare `<div>`, so it is square on
 * desktop and only rounds at <=767. Here the photograph sits in
 * `.about-image-wrap-ugdx` — `border-radius: 32px 0` with `overflow: hidden` —
 * so it is clipped at every width. Two genuinely different boxes.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                              >=768px                    <=767px
 *   .head-wrap.top             row, space-between,        column, gap 16,
 *                              align-start                stretch, mb 16
 *                                                         (space-around <=479)
 *   .btn-primary               auto width, h56            full width, h40
 *   .about-story-wrapper-ugdx  row, space-between,        wrap, gap 0, 18px
 *                              align-centre, gap 32
 *   .abt-cont-ugdx-1           width 50%, flex none, 18px width 100%, 16px
 *   .about-image-wrap-ugdx     radius 32px 0, clipped,    width 100%, flex
 *                              width auto, relative       centred
 *   .about-image-atlas         100% x 100%, cover,        width auto,
 *                              inline-block, align-super  margin-top 40,
 *                                                         own radius 32px 0
 *
 * Below 768px the wrapper's own radius is joined by one on the image itself —
 * both declared, both reproduced; they coincide, so nothing double-rounds.
 */

/* ref .head-wrap.top */
const HEAD_WRAP =
  'flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch '
  + 'max-md:gap-4 max-sm:justify-around';

export default function Scholarships({ data = scholarships }) {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .w-layout-blockcontainer.container.w-container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        <div className={HEAD_WRAP}>
          {/* ref h2.h2-tag.mrg16 — the authored <br /> is in the copy */}
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{withBreaks(data.heading)}</h2>

          {/*
            ref a.btn-primary, wrapped in `.btn-normal-wrap` on
            /admissions/pg-admissions and a direct child of `.head-wrap.top` on
            /admissions/integrated-admissions. It matters below 768px, where the
            head wrap is `align-items: stretch`: a direct child anchor is pulled
            to the full container width, while one inside the wrapper keeps its
            natural width. `.btn-normal-wrap` is `display: flex` at <=767 and a
            plain block above.
          */}
          {data.buttonWrap ? (
            <div className="max-md:flex">
              <PrimaryButton href={data.button.href}>{data.button.label}</PrimaryButton>
            </div>
          ) : (
            <PrimaryButton href={data.button.href}>{data.button.label}</PrimaryButton>
          )}
        </div>

        {/* ref .about-story-wrapper-ugdx */}
        <div className="flex items-center justify-between gap-8 overflow-visible max-md:flex-wrap max-md:gap-0 max-md:text-[18px]">
          {/* ref .abt-cont-ugdx-1 */}
          <div className="w-1/2 flex-none text-[18px] max-md:w-full max-md:text-base">
            {/* ref .abt-text — the reference's own blank line between the two
                paragraphs is an authored double <br /> */}
            <div>{withBreaks(data.text)}</div>
          </div>

          {/* ref .about-image-wrap-ugdx */}
          <div className="relative w-auto flex-[0_auto] overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:flex max-md:w-full max-md:items-center max-md:justify-center">
            {/* ref img.about-image-atlas */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image.src}
              srcSet={data.image.srcSet}
              sizes={data.image.sizes}
              alt={data.image.alt}
              loading="lazy"
              className="inline-block h-full w-full flex-none align-super object-cover
                         max-md:mt-10 max-md:block max-md:w-auto max-md:overflow-hidden
                         max-md:rounded-tl-[32px] max-md:rounded-br-[32px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
