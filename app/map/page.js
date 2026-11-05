import MapExplorer from '@/components/Map/MapExplorer';
import { getMapData } from '@/lib/map/publicView';

const TITLE = 'Explore ATLAS University – Interactive Website Map';
const DESCRIPTION =
  'An interactive map of ATLAS SkillTech University: its four schools, every programme with fees, eligibility and admission dates from the website, and every page of the site.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/map' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/map', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/* The map renders from the discovery snapshot in data/map/ (scripts/map/). Re-rendering once a day
   keeps "upcoming / date passed" correct between snapshots; nothing is crawled on a visit. */
export const revalidate = 86400;

export default function MapPage() {
  return (
    <main>
      <MapExplorer data={getMapData()} />
    </main>
  );
}
