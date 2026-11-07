import { notFound } from 'next/navigation';
import Header from '@/components/Sensorium/Header';
import PortfolioCategory from '@/components/Sensorium/PortfolioCategory';
import { home } from '@/lib/sensorium/home';
import { categories } from '@/lib/sensorium/categories';

/* The 16 portfolio-category archives production links from the homepage
   (https://atlasuniversity.edu.in/sensorium/portfolio-category/<slug>/). */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

/* Yoast on production: "<Category> Archives - Sensorium", index/follow, canonical = the archive URL,
   no description. */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = categories[slug];
  if (!c) return {};
  const m = c.meta;
  return {
    title: m.title,
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    alternates: { canonical: m.canonical },
    openGraph: { siteName: 'Sensorium', title: m.title, url: m.canonical, type: 'article', locale: 'en_US' },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function SensoriumPortfolioCategory({ params }) {
  const { slug } = await params;
  const cat = categories[slug];
  if (!cat) notFound();
  return (
    <>
      <Header nav={home.nav} logos={home.logos} stickyAmount={350} />
      <main>
        <PortfolioCategory cat={cat} />
      </main>
    </>
  );
}
