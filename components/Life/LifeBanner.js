import { lifeContent } from '@/lib/lifeContent';
import InfoBanner from '@/components/ui/InfoBanner';

/**
 * "Ready to live the ATLAS life?" — port of `life-at-atlas.php:1061-1077`
 * (`div.section > .container > .info-banner-atlas`).
 *
 * The band is `components/ui/InfoBanner`, shared with /campus-atlas and
 * /advantages/atlas-career-services. This instance has three buttons — one
 * `atlas` fill and two `outline-white` — and no contact line.
 */
export default function LifeBanner() {
  return <InfoBanner banner={lifeContent.banner} />;
}
