import PrimaryButton from '@/components/ui/PrimaryButton';
import ApplicationPanel, { APPLICATION_SECTION, APPLICATION_TEXT } from '../ApplicationPanel';
import { CONTAINER, SECTION } from './ui';

/**
 * The two stacked call-to-action panels before the FAQ — port of
 * reference/schools/isdi/index.php:4039-4071.
 *
 *   div.section > .container > .application-section > 2 x .isdi-application-wrap
 *     > .isdi-application(.isdi-pink) > .isdi-application-content
 *       > (.isdi-application-text, .button-wrap > 2 x .btn-primary)
 *
 * The panel itself is `../ApplicationPanel`, shared with the Pre-University Summer School
 * page, which fills it with a list instead of buttons. What is this section's own:
 *
 *   buttons           column, start-aligned, gap 16, mt32; `.btn-primary` pills — pink
 *                     (#d20158) on the blue panel, blue (#1f4aa0, 600 label) on the pink one
 */
export default function GuideBanners({ data }) {
  return (
    <div data-block="guides" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .application-section */}
        <div className={APPLICATION_SECTION}>
          {data.panels.map((panel) => (
            <ApplicationPanel key={panel.heading} tone={panel.tone}>
              {/* ref .isdi-application-text */}
              <div className={APPLICATION_TEXT}>{panel.heading}</div>
              {/* ref .button-wrap */}
              <div className="mt-8 flex max-w-full flex-col items-start justify-center gap-4">
                {panel.buttons.map((button) => (
                  <PrimaryButton key={button.label} href={button.href} variant={button.variant}>
                    {button.label}
                  </PrimaryButton>
                ))}
              </div>
            </ApplicationPanel>
          ))}
        </div>
      </div>
    </div>
  );
}
