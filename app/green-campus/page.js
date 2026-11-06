import { greenCampus as data } from '@/lib/greenCampusContent';
import { campusContent } from '@/lib/campusContent';
import Hero from '@/components/GreenCampus/Hero';
import Story from '@/components/GreenCampus/Story';
import StrategicLocation from '@/components/GreenCampus/StrategicLocation';
import Sustainability from '@/components/GreenCampus/Sustainability';
import Housing from '@/components/GreenCampus/Housing';
import HealthFacilities from '@/components/GreenCampus/HealthFacilities';
import CampusVisitBanner from '@/components/Campus/CampusVisitBanner';

const { title, description, canonical } = data.meta;

export const metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title, url: canonical, type: 'website', description },
  twitter: { card: 'summary_large_image', title, description },
};

/**
 * /green-campus — port of `reference/green-campus.php`, measured against production.
 *
 *   1  .inner-header-wrapper.full-ht      Hero               two background videos, no copy
 *   2  section.section                    Story              The Story Behind ATLAS
 *   3  .shaping-wrapper                   StrategicLocation  full-bleed map card
 *   4  section#campus-green               Sustainability     four cards
 *   5  section#campus-housing             Housing            video, residence cards, accessibility
 *   6  section#health-facility            HealthFacilities   four photographs
 *   7  div.section > .info-banner-atlas   CampusVisitBanner  /campus-atlas's banner, unchanged
 *
 * ── Shared with /campus-atlas, verified rather than assumed ────────────────
 *   - the three residence cards: same copy, and their photographs are byte-identical (SHA-256) to
 *     lib/campusContent's, so they are taken from there;
 *   - the closing banner: same heading, lead, buttons and image, so `CampusVisitBanner` is rendered
 *     as is — including its one documented deviation ("Schedule a visit" goes to /campusvisit rather
 *     than opening the reference's NoPaperForms widget, which this page also wires).
 */
export default function GreenCampusPage() {
  return (
    <>
      <Hero hero={data.hero} />
      <Story story={data.story} />
      <StrategicLocation location={data.location} />
      <Sustainability green={data.green} />
      <Housing housing={data.housing} cards={campusContent.housing.cards} />
      <HealthFacilities health={data.health} />
      <CampusVisitBanner />
    </>
  );
}
