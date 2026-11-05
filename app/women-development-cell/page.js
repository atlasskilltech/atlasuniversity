import StatutoryPage from '@/components/Statutory/StatutoryPage';
import { womenDevelopment as data } from '@/lib/statutoryContent';

/* ref reference/women-development-cell/index.html — `<title>`, meta description and canonical as production serves them */
const { title, description, canonical } = data.meta;

export const metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title, url: 'https://atlasuniversity.edu.in/', type: 'website', description },
  twitter: { card: 'summary_large_image', title, description },
};

/** /women-development-cell — reference/women-development-cell/index.html (production view-source + full-page screenshot). */
export default function Page() {
  return <StatutoryPage data={data} />;
}
