import { cx } from '@/lib/cx';
import { CONTAINER, SECTION } from '../Home/ui';

/**
 * Our Mission / Our Vision — port of about-us/index.php:39-59
 * (`section.section > .container > .application-section > 2 x .isdi-application-wrap
 *   > .isdi-belief(.isdi-pink-belief) > .isdi-belief-container`).
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                 <=767px          <=479px
 *   stack             column, gap 32                           gap 16
 *   card              r16, contained artwork  p40              h350, p 40/20
 *                     at 100% 50%, luminosity
 *                     blend; blue #0a46ca
 *                     h311 p 30/47/110/47,
 *                     pink #d71e7b h310
 *                     p 30/47/30/47
 *   inner             max-w 765
 *   label             28px/56px 600 white,    20px, pb20       700, pb0
 *                     pb24
 *   statement         32px/52px white         24px/32px
 *
 * The blue card's 110px bottom padding is larger than the space its 311px height
 * leaves, so its content simply runs into the padding; both cards measure their
 * declared heights.
 */
const CARD = {
  blue: 'h-[311px] bg-[#0a46ca] pb-[110px]',
  pink: 'h-[310px] bg-[#d71e7b] pb-[30px]',
};

export default function MissionVision({ data }) {
  return (
    <section data-block="beliefs" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .application-section */}
        <div className="flex flex-col gap-8 max-sm:gap-4">
          {data.map((item) => (
            /* ref .isdi-application-wrap */
            <div key={item.label}>
              {/* ref .isdi-belief */}
              <div
                className={cx(
                  'max-w-full rounded-2xl bg-contain bg-[position:100%_50%] bg-no-repeat px-[47px] pt-[30px] bg-blend-luminosity',
                  CARD[item.tone],
                  'max-md:p-10 max-sm:h-[350px] max-sm:px-5'
                )}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {/* ref .isdi-belief-container */}
                <div className="max-w-[765px]">
                  <div className="pb-6 text-[28px] font-semibold leading-[56px] text-white max-md:pb-5 max-md:text-[20px] max-md:leading-[56px] max-sm:pb-0 max-sm:font-bold">
                    {item.label}
                  </div>
                  <div className="text-[32px] leading-[52px] text-white max-md:text-[24px] max-md:leading-[32px]">
                    {item.text}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
