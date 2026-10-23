import { cx } from '@/lib/cx';

/**
 * `.isdi-application-wrap > .isdi-application(.isdi-pink) > .isdi-application-content` — the
 * wide call-to-action panel, extracted from `Home/GuideBanners` so the Pre-University Summer
 * School page can render the same box with a different payload.
 *
 * The two pages agree on every measured value; only what sits inside the content box differs
 * (the homepage stacks a heading and two `.btn-primary` pills, the Summer School page a heading
 * and a bulleted list), so the panel takes its contents as `children`.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390, identical on both references:
 *                     >=768px                              <=767px
 *   panel             r16, p64/47, max-width 100%;         p24, flat colour and NO
 *                     #0a46ca (pink: #d71e7b) under its    illustration
 *                     illustration, contained at 100% 100%,
 *                     luminosity-blended
 *   content           max-width 517
 *
 * The stack around it is the caller's: `.application-section` is a column with a 32px gap,
 * 16 at <=479.
 */
const TONE = {
  blue: "bg-[#0a46ca] bg-[url('/assets/images/schools/isdi/home/guides/application-img-new.webp')]",
  pink: "bg-[#d71e7b] bg-[url('/assets/images/schools/isdi/home/guides/application-img-new-2.webp')]",
};

export default function ApplicationPanel({ tone = 'blue', children }) {
  return (
    /* ref .isdi-application-wrap */
    <div>
      {/* ref .isdi-application */}
      <div
        className={cx(
          'max-w-full rounded-2xl bg-contain bg-[position:100%_100%] bg-no-repeat bg-blend-luminosity px-[47px] py-16',
          'max-md:bg-none max-md:p-6',
          TONE[tone] ?? TONE.blue
        )}
      >
        {/* ref .isdi-application-content */}
        <div className="max-w-[517px]">{children}</div>
      </div>
    </div>
  );
}

/* ref .isdi-application-text — the panel's heading, shared by both pages */
export const APPLICATION_TEXT = 'text-[40px] leading-[56px] text-white max-md:text-[24px] max-md:leading-[1.4]';

/* ref .application-section — the column the panels stack in */
export const APPLICATION_SECTION = 'flex flex-col gap-8 max-sm:gap-4';
