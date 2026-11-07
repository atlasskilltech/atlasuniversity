import { notFound } from 'next/navigation';
import Header from '@/components/Sensorium/Header';
import PortfolioItem from '@/components/Sensorium/PortfolioItem';
import { home } from '@/lib/sensorium/home';
import { items } from '@/lib/sensorium/items';

/* The 67 portfolio items production links from the homepage and the 16 category archives
   (https://atlasuniversity.edu.in/sensorium/portfolio-item/<slug>/). */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(items).map((slug) => ({ slug }));
}

/* Yoast on production: "<title> - Sensorium", noindex/nofollow, no canonical, og:description from the
   item's text and og:image the featured image. */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const it = items[slug];
  if (!it) return {};
  const m = it.meta;
  return {
    title: m.title,
    description: m.description || undefined,
    robots: { index: false, follow: false },
    openGraph: {
      siteName: 'Sensorium',
      title: m.title,
      description: m.description || undefined,
      url: `https://atlasuniversity.edu.in/sensorium/portfolio-item/${slug}/`,
      type: 'article',
      locale: 'en_US',
      images: m.ogImage ? [{ url: m.ogImage.src, width: m.ogImage.w, height: m.ogImage.h }] : undefined,
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function SensoriumPortfolioItem({ params }) {
  const { slug } = await params;
  const item = items[slug];
  if (!item) notFound();
  return (
    <>
      <Header nav={home.nav} logos={home.logos} stickyAmount={350} />
      <main>
        <PortfolioItem item={item} />
      </main>
    </>
  );
}
