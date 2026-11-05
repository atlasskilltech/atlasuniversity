import { spaces } from '@/lib/multidisciplinaryContent';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import ChipSlideCard from '@/components/ui/ChipSlideCard';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { CONTAINER, SECTION, H2, SUB_H2_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Collaborative Spaces" — port of `atlas-multidisciplinary.php:329-421`
 * (`section.section > .container > (.head-wrap.top >
 *   (.tt-wrap > (h2.h2-tag.mrg16, h2.sub-heading.mrgbtm), a.btn-primary),
 *   .swiper.zoom-slider-lg.mrg-lft > 7 x .slider-card-e-ugdx)`).
 *
 * Seven campus spaces on the shared `ChipSlideCard` — the cyan chip label over
 * a full-bleed photograph — carried by the shared `ZoomSliderLg`, exactly as
 * /campus-atlas "Studios, Labs, and Classrooms" and
 * /advantages/atlas-enterprenurship use them. `.mrg-lft` is `margin-left: 20%`,
 * cancelled below 768px.
 *
 * None of the seven chips wraps its label in `<strong>`, which matches
 * /campus-atlas and not /advantages/atlas-enterprenurship.
 *
 * `.head-wrap.top` puts a `.btn-primary` beside the copy — "Explore Campus",
 * linking to `<?php echo $domain ?>campus-atlas`, a route this rebuild already
 * has.
 *
 * Every card carries `data-slider-card-a-bg="Paste image url"`, read by a
 * script that targets `.slider-card-a` — a class none of them has. The same
 * dead script /life-at-atlas already documents; not ported.
 */
export default function CollaborativeSpaces() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        <div className="flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:justify-around">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{spaces.heading}</h2>
            <div className={SUB_H2_MRGBTM}>{spaces.subheading}</div>
          </div>

          {/* ref a.btn-primary on its `9df390f6…` (atlas) variant */}
          <PrimaryButton href={spaces.button.href}>{spaces.button.label}</PrimaryButton>
        </div>

        {/* ref .swiper.zoom-slider-lg.mrg-lft */}
        <ZoomSliderLg className="ml-[20%] max-md:ml-0" label={spaces.heading}>
          {spaces.slides.map((slide) => (
            <ChipSlideCard key={slide.title} slide={slide} />
          ))}
        </ZoomSliderLg>
      </div>
    </section>
  );
}
