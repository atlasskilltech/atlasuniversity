import { CONTAINER, SECTION, SUB_INNER } from '@/components/Home/SectionHead';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';
import { H2_MRG32 } from '@/components/Schools/LawUgdx/Sections';

/*
 * The page-specific blocks of /schools/ugdx/summerschool (reference/ugdx/summerschool.php). The page
 * ships its own <style> ahead of the markup that re-declares `.section`, `.container`,
 * `.about-story-wrapper-ugdx`, `.abt-cont-ugdx-1` and `.about-image-*`; values below are that block's,
 * checked on production at 1440 / 991 / 767 / 479 / 390.
 */

/* ---- "About uGDX Summer School" / "Typical Day at the Summer Tech School" ----------------------
 * `.about-story-wrapper-ugdx`: a centred space-between row, gap 32 (wrapping at <=767, from the sheet).
 * `.abt-cont-ugdx-1` flex none, 50%, 18px (100% and 16px at <=767) holding `h2.h2-tag.mrg32` and a bare
 * `.abt-text`. `.about-image-wrap-ugdx` radius 32px 0, flex 0 auto, clipped; its `img.about-image-atlas`
 * 100% x 100% cover, inline-block, super-aligned, with the sheet's 40px top margin at <=767, where the wrap also goes full width (so a photograph narrower
 * than the column — "Typical Day" — is stretched, not centred). */
export function SummerStory({ data, block }) {
  return (
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <div className="flex items-center justify-between gap-8 max-md:flex-wrap max-md:text-lg">
          <div className="w-1/2 flex-none text-lg max-md:w-full max-md:text-base">
            <h2 className={H2_MRG32}>{withBreaks(data.heading)}</h2>
            <div>{withBreaks(data.text)}</div>
          </div>
          <div className="relative w-auto flex-[0_1_auto] overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:flex max-md:w-full max-md:items-center max-md:justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.image.src} sizes={data.image.sizes} alt={data.image.alt} loading="lazy" className="inline-block h-full w-full flex-none object-cover align-super max-md:mt-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- the two closing `.sub-heading`s — the second `.custom-margin-top` (24px, 0 at <=767) ------- */
export function SummerIntro({ paragraphs, block = 'intro' }) {
  return (
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        {paragraphs.map((p, i) => (
          <div key={i} className={cx(SUB_INNER, i > 0 && 'mt-6 max-md:mt-0')}>{withBreaks(p)}</div>
        ))}
      </div>
    </section>
  );
}
