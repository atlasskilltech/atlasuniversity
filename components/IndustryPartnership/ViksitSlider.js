import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import SliderCardA from '@/components/ui/SliderCardA';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';
import { viksit } from '@/lib/industryPartnershipContent';

/* ref section.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading.mrgbtm.isdi,
   .swiper.zoom-slider-lg) — /atlas-industry-partnership's "Driving India's Vision of Viksit Bharat
   Together"; `.h2-tag.isdi` is Poppins 400, 36px from 991 down. Also /centre-for-research/viksit-bharat. */
export default function ViksitSlider() {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={`mb-4 font-poppins font-normal max-lg:text-5xl max-lg:leading-[1.2] max-md:mb-2 ${H2}`}>{viksit.heading}</h2>
        {/* `.sub-heading.mrgbtm.isdi` — the `.isdi` modifier sets Poppins (300, measured) */}
        <div className={`font-poppins ${SUB_INNER_MRGBTM}`}>{viksit.subheading}</div>
        <ZoomSliderLg label={viksit.heading} dots="swiper">
          {viksit.cards.map((card, i) => (
            <SliderCardA key={i} card={card} />
          ))}
        </ZoomSliderLg>
      </div>
    </section>
  );
}
