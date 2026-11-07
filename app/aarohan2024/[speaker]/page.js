/* /aarohan2024 - generated route (one per speaker page; slug = the PHP file name) over components/Aarohan + lib/aarohan/2024. Metadata is production's own
   (<title>, empty description, `noindex, follow`). */
import { notFound } from 'next/navigation';
import { SpeakerPage } from '@/components/Aarohan/Pages/InnerPages';
import { site } from '@/lib/aarohan/2024/site';
import { speakers } from '@/lib/aarohan/2024/speakers';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(speakers).map((speaker) => ({ speaker }));
}

export async function generateMetadata({ params }) {
  const { speaker } = await params;
  const url = `https://atlasuniversity.edu.in/aarohan2024/${speaker}.php`;
  return {
    title: "Aarohan",
    description: "",
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: { title: "Aarohan", description: "", url, type: 'website' },
    twitter: { card: 'summary_large_image', title: "Aarohan", description: "" },
  };
}

export default async function Page({ params }) {
  const { speaker } = await params;
  const sp = speakers[decodeURIComponent(speaker)];
  if (!sp) notFound();
  return <SpeakerPage site={site} sp={sp} year={2024} />;
}
