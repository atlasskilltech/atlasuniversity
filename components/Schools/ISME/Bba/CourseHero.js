import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';
import BrochureButton from '@/components/Schools/ISDI/ProgramDetail/BrochureButton';

/**
 * The ISME BBA hero — `section.course-cover-section > (.course-hero-wrapper > .hero-text.extra >
 * (h1.h1-tag, .buttons-wrapper), img.header-image-inner)`.
 *
 * The ISDI Admissions hero's shape (a 100vh photograph under a half-height scrim ending
 * `#0006`), with three differences that are this page's: `.hero-text.extra` is 1020 wide
 * (704 at <=479) rather than 840, the button row turns into a column at <=767, and one of its
 * buttons opens the brochure popup rather than navigating.
 *
 * Rules, from the page's sheet:
 *   .hero-text(.extra)    840 (1020 with .extra), 704 at <=479
 *   .course-hero-wrapper  absolute bottom, h 50%, pb64 pl64 -> pb32 pl32 (<=991) -> px22 (<=767)
 *   h1.h1-tag             56px/1.2 400 white -> 44 (<=991) -> 28px/1.5 600 (<=767)
 *   .buttons-wrapper      row, centred, gap 16, pt30 -> gap 8 (<=991) -> column, start, pt24
 *                         (<=767) -> pt14 (<=479)
 *   .btn-primary          the mint pill and the outline-white pill, h56 -> h40 (<=767)
 */
export default function CourseHero({ data, brochure }) {
  return (
    /* ref .course-cover-section */
    <section data-block="hero" className="relative block h-screen w-full">
      {/* ref .course-hero-wrapper */}
      <div className="absolute inset-x-0 bottom-0 flex h-1/2 flex-none items-end bg-[linear-gradient(#0000,#0006)] pb-16 pl-16 max-lg:pb-8 max-lg:pl-8 max-md:px-[22px]">
        {/* ref .hero-text.extra (1020) — or the plain `.hero-text` (840) the MBA, bba-hons and
            B.Sc pages author (`data.narrow`); both 704 at <=479 */}
        <div className={data.narrow ? 'max-w-[840px] max-sm:max-w-[704px]' : 'max-w-[1020px] max-sm:max-w-[704px]'}>
          {/* ref h1.h1-tag */}
          <h1 className="m-0 text-[56px] font-normal leading-[1.2] text-white max-lg:text-[44px] max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
            {withBreaks(data.title)}
          </h1>
          {data.eyebrow != null && (
            /* ref .course-duration-isme — the Admissions heroes: pt4, 24px/1.5 300 mint, every width */
            <div className="block pt-1 text-[24px] font-light leading-[1.5] text-atlas-mint">{withBreaks(data.eyebrow)}</div>
          )}
          {data.desc != null && (
            /* ref .course-desc-isme (no `.big-txt`) — 16px 300 white, 18px at <=767 (sic) */
            <div className="block text-[16px] font-light text-white max-md:text-[18px]">{withBreaks(data.desc)}</div>
          )}
          {data.lead != null && (
            /* ref .course-desc-isme.big-txt — pt16, 24px 300 white; 20 at <=767, 16 at <=479 */
            <div className="block pt-4 text-[24px] font-light text-white max-md:text-[20px] max-sm:text-[16px]">{withBreaks(data.lead)}</div>
          )}
          {/* ref .buttons-wrapper */}
          <div className="flex items-center gap-4 pt-[30px] max-lg:gap-2 max-md:flex-col max-md:items-start max-md:justify-start max-md:pt-6 max-sm:pt-[14px]">
            {data.buttons.map((b) =>
              b.brochure && brochure ? (
                <BrochureButton key={b.label} brochure={brochure} label={b.label} variant={b.variant} />
              ) : (
                <PrimaryButton key={b.label} href={b.href ?? '#'} variant={b.variant}>
                  {b.label}
                </PrimaryButton>
              )
            )}
          </div>
        </div>
      </div>

      {/* ref img.header-image-inner — `display: block`, cover. The B.Sc pages author
          `img.backgorund-header` (sic) instead: 100% x 100% with no object-fit above 767, so the
          photograph is stretched to the frame; cover at <=767 (`data.imageFill`) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.image.src}
        srcSet={data.image.srcSet}
        sizes={data.image.sizes}
        alt={data.image.alt}
        fetchPriority="high"
        decoding="async"
        className={
          data.imageFill
            ? 'block h-full w-full max-w-full object-fill align-middle max-md:object-cover'
            : 'block h-full w-full max-w-full object-cover align-middle'
        }
      />
    </section>
  );
}
