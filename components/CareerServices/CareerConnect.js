import { careerServicesContent } from '@/lib/careerServicesContent';
import ZoomSlider from '@/components/Life/ZoomSlider';
import CardTypeF from '@/components/ui/CardTypeF';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Career Connect" — port of `atlas-career-services.php:361-457`
 * (`section.section > .container > (h2.h2-tag.mrg24, .sub-heading.mrgbtm,
 *   .center-image-full-wrap-atlas, .swiper.zoom-slider.mrg56 >
 *   12 x .card-type-f)`).
 *
 * A heading, a lead, a full-width video and a scale-ladder carousel of twelve
 * event cards — each a photograph with a partner's logo laid over its foot.
 * The reference authors six distinct cards and repeats them, so six of the
 * twelve images (and logos) recur verbatim; the repeats are reproduced.
 *
 * The carousel is the shared `components/Life/ZoomSlider` (`.swiper.zoom-slider`:
 * `slidesPerView: 'auto'`, loop, 2s autoplay, `centeredSlides`, and the
 * 0.8 / 0.88 / 1 scale ladder from `min-width: 568px`). `.mrg56` is this
 * section's only addition: `margin-top: 56px`, 40 below 768px.
 *
 * The card is `components/ui/CardTypeF`, shared with
 * /advantages/atlas-industry-centric-approach, which uses 55 of them; it
 * carries the measurements. Here the slider scales it 0.8 unless it is the
 * current slide, from `min-width: 568px`.
 */
export default function CareerConnect() {
  const { careerConnect } = careerServicesContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg24 — a compound selector, so its 24px survives
            the `@media … .h2-tag { margin-bottom: 32px }` below 768px */}
        <h2 className={`mb-6 ${H2}`}>{careerConnect.heading}</h2>

        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{careerConnect.subheading}</div>

        {/* ref .center-image-full-wrap-atlas > .w-embed-youtubevideo */}
        <div className="relative overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
          <div className="relative pt-[56.17021276595745%]">
            <iframe
              src={careerConnect.embed}
              title={careerConnect.heading}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        </div>
      </div>

      {/* ref .swiper.zoom-slider.mrg56 */}
      <div className="mt-14 max-md:mt-10">
        <ZoomSlider label={careerConnect.heading}>
          {careerConnect.cards.map((card, i) => (
            /* the reference authors the same six cards twice, so the image path
               is not an identity — the key is the card's position in the strip */
            <CardTypeF key={`${i}-${card.image.src}`} card={card} />
          ))}
        </ZoomSlider>
      </div>
    </section>
  );
}
