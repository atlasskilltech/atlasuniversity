import { coreAdvantages } from '@/lib/homeContent';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "ATLAS’s Core Advantages" — port of reference/index.php:2470-2534
 * (`div.section > .container > (h2.h2-tag.mrg42, .swiper.common-swiper-full.mrgtp0)`).
 *
 * Eight `.atlas-card-type-b`: the same 396x500, `32px 0`, clipped card as the
 * leadership slider, but its overlay differs in three ways —
 * `background-image: none` (no gradient), `height: 100%` rather than 80%, and
 * `padding: 24px 50px 24px 24px` (the extra 50px on the right is what keeps
 * the copy off the card's edge). Copy sits bottom-left over the photo.
 *
 * ── Measured responsive cascade ───────────────────────────────────────────
 *                        >=768px                <=767px
 *   .atlas-card-type-b   396x500                width 100%
 *   .at-cd-ty-b-wrap     24px 50px 24px 24px    24px
 *   .at-cd-ty-b-text     28px/500               20px
 *
 * Two upstream copy quirks are reproduced verbatim: "MultidisciplinaryLearning
 * Approach" is missing its space, and several lines carry hard <br /> breaks.
 */
function AdvantageCard({ item }) {
  return (
    /* ref .atlas-card-type-b */
    <div className="relative h-[500px] w-[396px] flex-[0_auto] overflow-hidden rounded-tl-[32px] rounded-br-[32px] text-white max-mcm:w-[calc(100vw-44px)]">
      {/* ref .at-cd-ty-b-wrap — full height, no gradient */}
      <div className="absolute inset-x-0 bottom-0 z-11 flex h-full w-full flex-col items-start justify-end py-6 pl-6 pr-[50px] max-md:p-6">
        {/* ref .at-cd-ty-b-text */}
        <div className="text-3xl font-medium max-md:text-xl">
          {item.text.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* ref .at-cd-ty-b-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function CoreAdvantages() {
  const { heading, items } = coreAdvantages;

  return (
    /* ref div.section */
    <div className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg42 */}
        <h2 className={`mb-[42px] ${H2}`}>{heading}</h2>
      </div>

      <Carousel>
        {items.map((item) => (
          <AdvantageCard key={item.text.join(' ')} item={item} />
        ))}
      </Carousel>
    </div>
  );
}
