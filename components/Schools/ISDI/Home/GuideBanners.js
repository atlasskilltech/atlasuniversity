import { cx } from '@/lib/cx';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { CONTAINER, SECTION } from './ui';

/**
 * The two stacked call-to-action panels before the FAQ — port of
 * reference/schools/isdi/index.php:4039-4071.
 *
 *   div.section > .container > .application-section > 2 x .isdi-application-wrap
 *     > .isdi-application(.isdi-pink) > .isdi-application-content
 *       > (.isdi-application-text, .button-wrap > 2 x .btn-primary)
 *
 * Measured:
 *                     >=768px                              <=767px       <=479px
 *   stack             column, gap 32                                     gap 16
 *   panel             r16, p64/47; #0a46ca (pink: #d71e7b)  p24, flat colour,
 *                     with its illustration contained at    no illustration
 *                     the bottom-right, luminosity-blended
 *   content           max-width 517
 *   heading           40px/56px white, weight 400          24px/1.4
 *   buttons           column, start-aligned, gap 16, mt32; `.btn-primary`
 *                     pills — pink (#d20158) on the blue panel, blue (#1f4aa0,
 *                     600 label) on the pink one
 */

const PANEL = {
  blue: "bg-[#0a46ca] bg-[url('/assets/images/schools/isdi/home/guides/application-img-new.webp')]",
  pink: "bg-[#d71e7b] bg-[url('/assets/images/schools/isdi/home/guides/application-img-new-2.webp')]",
};

export default function GuideBanners({ data }) {
  return (
    <div data-block="guides" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .application-section */}
        <div className="flex flex-col gap-8 max-sm:gap-4">
          {data.panels.map((panel) => (
            /* ref .isdi-application-wrap > .isdi-application */
            <div key={panel.heading}>
              <div
                className={cx(
                  'max-w-full rounded-2xl bg-contain bg-[position:100%_100%] bg-no-repeat bg-blend-luminosity px-[47px] py-16',
                  'max-md:bg-none max-md:p-6',
                  PANEL[panel.tone]
                )}
              >
                {/* ref .isdi-application-content */}
                <div className="max-w-[517px]">
                  <div className="text-[40px] leading-[56px] text-white max-md:text-[24px] max-md:leading-[1.4]">
                    {panel.heading}
                  </div>
                  {/* ref .button-wrap */}
                  <div className="mt-8 flex max-w-full flex-col items-start justify-center gap-4">
                    {panel.buttons.map((button) => (
                      <PrimaryButton key={button.label} href={button.href} variant={button.variant}>
                        {button.label}
                      </PrimaryButton>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
