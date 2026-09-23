/**
 * Class strings shared by the ISDI homepage sections — the pieces of the ISDI
 * sheet (`…68d4dca95082c6a97b179ab5-a50c4f6d4.css`) that nearly every section
 * repeats. Each was measured on https://atlasuniversity.edu.in/schools/isdi/ at
 * 1440 / 1280 / 991 / 767 / 479 / 390.
 *
 *   section    50px top/bottom at EVERY width. The sheet says 60 / 40 (<=767),
 *              but header.php's inline `.isdi-page .section { padding: 50px 0 }`
 *              comes later and wins.
 *   container  1366 max-w, 62 / 30 (<=991) / 22 (<=767) — the ATLAS
 *              `CONTAINER`, identical in every measured property.
 *   h2.isdi    Poppins 44px / 1.2, weight 400 (renders as the Medium face, see
 *              'Poppins ISDI' in globals.css), #1a1a1a; 36px from 991 down.
 *              The bottom margin depends on the modifier class — see H2_MB.
 *   sub        `.sub-heading` — the ATLAS `SUB_INNER`, identical here: this
 *              sheet keeps the 20px vertical padding at <=479.
 */

export {
  CONTAINER,
  SUB_INNER as SUB,
  SUB_INNER_MRGBTM as SUB_MRGBTM,
  SUB_INNER_MRGBTM32 as SUB_MRGBTM32,
} from '@/components/Home/SectionHead';

/* ref .section (+ .isdi-page .section) */
export const SECTION = 'block overflow-hidden py-[50px]';

/* ref .h2-tag.isdi */
export const H2 = 'relative m-0 text-[44px] font-normal leading-[1.2] text-[#1a1a1a] max-lg:text-[36px]';

/* ref .h2-tag without `.isdi` — weight 500, and it waits until 767 to drop to 36px */
export const H2_PLAIN = 'relative m-0 text-[44px] font-medium leading-[1.2] text-[#1a1a1a] max-md:text-[36px]';

/*
 * The h2's bottom margin, by modifier:
 *   (none)   56 -> 32 at <=767
 *   mrg16    16 ->  8 at <=767
 *   mrg32    32 at every width
 *   mrgtbm0   0 -> 20 at <=767 (`.h2-tag.mrgtbm0.isdi`)
 */
export const H2_MB = {
  base: 'mb-14 max-md:mb-8',
  mrg16: 'mb-4 max-md:mb-2',
  mrg32: 'mb-8',
  mrgtbm0: 'mb-0 max-md:mb-5',
};
