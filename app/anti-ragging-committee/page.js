import StatutoryPage from '@/components/Statutory/StatutoryPage';
import { antiRagging as data } from '@/lib/statutoryContent';

/* ref reference/anti-ragging-committee/index.html — `<title>`, meta description and canonical as production serves them */
const { title, description, canonical } = data.meta;

export const metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title, url: 'https://atlasuniversity.edu.in/', type: 'website', description },
  twitter: { card: 'summary_large_image', title, description },
};

/** /anti-ragging-committee — reference/anti-ragging-committee/index.html (production view-source + full-page screenshot). */
export default function Page() {
  return <StatutoryPage data={data} />;
}
