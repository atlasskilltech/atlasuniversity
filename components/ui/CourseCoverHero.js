import PrimaryButton from '@/components/ui/PrimaryButton';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';

/**
 * `.course-hero-wrapper` over a cover photograph — `section.inner-cover-section` on /job-openings and
 * `section.course-cover-section` on /schools/law/law-admissions and /schools/ugdx/admissions/
 * ugdx-admissions. Not `ui/InnerPageHero`: that wash covers the lower three quarters and ends `#000c`;
 * this one covers the lower HALF with a much lighter `transparent -> #0006`. Measured on production at
 * 1440 / 991 / 767 / 479 / 390:
 *
 *   section                      relative; `.inner-cover-section` is `height: 85%` of a 100%-tall
 *                                body (85vh — 765 at a 900px viewport), `.course-cover-section` the
 *                                full viewport. `size` selects between them.
 *   img.inner-cover-image        100% x 100%, cover
 *   .course-hero-wrapper         absolute, top 50% / right 0 / bottom 0 / left 0, flex align-end,
 *                                padding 0 0 64 64; 0 0 32 32 at <=991; 0 22 32 22 at <=767
 *   .hero-text                   max-width 840 (704 at <=479)
 *   h1.h1-tag                    56px/1.2 400 white; 44px at <=991; 28px/1.5 600 at <=767
 *   .course-duration-isme.isdi   (the admissions pages only) 24px/1.5 300 white, padding-top 4,
 *                                unchanged at every width
 *   .buttons-wrapper             InnerPageHero's `row` wrapper exactly (pt 30, gap 16 -> 8 at 991,
 *                                a column at <=767 with pt 24, 14 at <=479)
 *   .btn-primary                 PrimaryButton, in the button's own variant (atlas by default)
 */
const SIZE = { '85vh': 'h-[85vh]', screen: 'h-screen' };

export default function CourseCoverHero({ hero, size = '85vh' }) {
  const buttons = hero.buttons ?? (hero.button ? [hero.button] : []);
  return (
    <section className={cx('relative w-full', SIZE[size])}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.image.src}
        srcSet={hero.image.srcSet}
        sizes={hero.image.sizes}
        alt={hero.image.alt}
        className="block h-full w-full max-w-full object-cover"
      />
      {/* ref .course-hero-wrapper */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 flex items-end bg-[linear-gradient(#0000,#0006)] pb-16 pl-16 max-lg:pb-8 max-lg:pl-8 max-md:px-[22px]">
        {/* ref .hero-text */}
        <div className="max-w-[840px] max-sm:max-w-[704px]">
          <h1 className="m-0 text-[56px] font-normal leading-[1.2] text-white max-lg:text-[44px] max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
            {withBreaks(hero.title)}
          </h1>
          {hero.sub && (
            /* ref .course-duration-isme.isdi */
            <div className="pt-1 text-2xl font-light leading-[1.5] text-white">{withBreaks(hero.sub)}</div>
          )}
          {/* ref .buttons-wrapper */}
          <div className="flex items-center gap-4 pt-[30px] max-lg:gap-2 max-md:flex-col max-md:items-start max-md:justify-start max-md:pt-6 max-sm:pt-[14px]">
            {buttons.map((b) => (
              <PrimaryButton key={b.label} href={b.href} variant={b.variant} icon={b.icon}>{b.label}</PrimaryButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
