import { careerServicesContent } from '@/lib/careerServicesContent';
import InfoBanner from '@/components/ui/InfoBanner';

/**
 * "Collaborate with us" — port of `atlas-career-services.php:823-838`
 * (`section.section > .container > .info-banner-atlas`).
 *
 * The band is `components/ui/InfoBanner`, shared with /campus-atlas and
 * /life-at-atlas. This instance is the only one of the three with a
 * `.info-banner-sub-contact` line, and its heading carries `.no-bar`, which
 * changes only the bottom margin below 768px (16px rather than 32, and 14 at
 * <=479).
 *
 * The button's href is `#` in the reference — it goes nowhere — so it is
 * transcribed as authored rather than invented.
 */
export default function Collaborate() {
  return (
    <InfoBanner
      banner={careerServicesContent.banner}
      titleClassName="max-md:mb-4 max-sm:mb-[14px]"
    />
  );
}
