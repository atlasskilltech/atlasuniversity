import { campusContent } from '@/lib/campusContent';
import InfoBanner from '@/components/ui/InfoBanner';

/**
 * "Experience the ATLAS Campus in Person" — port of
 * `campus-atlas.php:719-735` (`div.section > .container > .info-banner-atlas`).
 *
 * The band is `components/ui/InfoBanner`, shared with /life-at-atlas and
 * /advantages/atlas-career-services. This instance has two buttons and no
 * contact line.
 *
 * ── One reference deviation, documented ───────────────────────────────────
 * "Schedule a visit" opens a NoPaperForms widget from
 * `widgets.in5.nopaperforms.com` in the reference; it links to /campusvisit
 * here, the route its twin in the hero already uses.
 */
export default function CampusVisitBanner() {
  return <InfoBanner banner={campusContent.banner} />;
}
