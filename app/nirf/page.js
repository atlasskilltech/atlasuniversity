import InnerPageHero from '@/components/ui/InnerPageHero';
import DocumentLinks from '@/components/Statutory/DocumentLinks';
import { nirf as data } from '@/lib/statutoryContent';

/* ref reference/nirf/index.html — `<title>`, meta description and canonical as production serves them */
const { title, description, canonical } = data.meta;

export const metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title, url: 'https://atlasuniversity.edu.in/', type: 'website', description },
  twitter: { card: 'summary_large_image', title, description },
};

/** /nirf — reference/nirf/index.html (production view-source + full-page screenshot). */
export default function Page() {
  return (
    <>
      <InnerPageHero hero={data.hero} />
      <DocumentLinks links={data.links} />
    </>
  );
}
