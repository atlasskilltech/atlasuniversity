import { aboutContent } from '@/lib/aboutContent';
import SecondaryButton from '@/components/ui/SecondaryButton';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Our Schools" — port of `about-us.php:62-111`
 * (`div.section > .container > (h2.h2-tag.mrg16, .sub-heading,
 *   .atlas-cards-wrapper > .atlas-cards-grid > 4x .atlas-square-card-a)`).
 *
 * Four square cards, two per row, each a full-bleed photograph with a scrim
 * carrying the school logo, its name and an "Apply Now" pill.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .atlas-cards-grid        flex wrap, mt 42, mb 12,    same, one card per
 *                            radius 36px 0, clipped      row
 *   .atlas-square-card-a     621 x 499 (exactly half     100% x 499
 *                            of the 1242 container)
 *   .atlas-sq-image-a        fills the card, cover       same
 *   .atlas-sq-content-a      bottom 80%, transparent ->  padding 0 18 20
 *                            #261f5c, padding 0 32 40
 *   .common-flex.btm-justify row, space-between,         column-reverse,
 *                            align-end, gap 24           align-start, gap 24
 *   .atlas-sq-logo           intrinsic (110x51), mb 14   same
 *   .atlas-sq-title-a        24px/1.2                    32px/1.2, 400
 *
 * The grid's `border-radius: 36px 0` with `overflow: hidden` rounds only the
 * outer corners of the whole 2x2 block, not the individual cards; the wrapper
 * around it carries its own 32px radius but `overflow: visible`, so that one
 * never paints. Both are reproduced as declared.
 */
export default function OurSchools() {
  const { schools } = aboutContent;

  return (
    /* ref div.section */
    <div className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{schools.heading}</h2>
        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{schools.subheading}</div>

        {/* ref .atlas-cards-wrapper */}
        <div className="rounded-[32px]">
          {/* ref .atlas-cards-grid */}
          <div className="mb-3 mt-[42px] flex flex-wrap items-start justify-start overflow-hidden rounded-tl-[36px] rounded-br-[36px]">
            {schools.cards.map((card) => (
              /* ref .atlas-square-card-a */
              <div key={card.title} className="relative h-[499px] w-1/2 max-md:w-full">
                {/* ref .atlas-sq-image-a */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image.src}
                  srcSet={card.image.srcSet}
                  sizes="(max-width: 767px) 100vw, 621px"
                  alt={card.image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />

                {/* ref .atlas-sq-content-a */}
                <div className="absolute inset-x-0 bottom-0 top-[20%] flex items-end justify-between bg-gradient-to-b from-[#261f5c00] to-[#261f5c] px-8 pb-10 max-md:px-[18px] max-md:pb-5">
                  {/* ref .common-flex.btm-justify */}
                  <div className="flex w-full flex-row items-end justify-between gap-6 text-white max-md:flex-col-reverse max-md:items-start">
                    {/* ref .atlas-sq-cont-wrp-a */}
                    <div>
                      {/* ref .atlas-sq-logo */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.logo.src}
                        alt={card.logo.alt}
                        loading="lazy"
                        className="mb-3.5 block"
                      />
                      {/* ref .atlas-sq-title-a */}
                      <div className="text-2xl leading-[1.2] max-md:text-[32px] max-md:font-normal">
                        {card.title}
                      </div>
                    </div>

                    {/* ref .atlas-sq-btn > .secondary-btn */}
                    <SecondaryButton href={card.button.href}>{card.button.label}</SecondaryButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
