/* /aarohan23 - generated route over components/Aarohan + lib/aarohan/2023. Metadata is production's own
   (<title>, empty description, `noindex, follow`). */
import { AboutPage } from '@/components/Aarohan/Pages/InnerPages';
import { site } from '@/lib/aarohan/2023/site';
import { about } from '@/lib/aarohan/2023/about';

export const metadata = {
  title: "Aarohan",
  description: "",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://atlasuniversity.edu.in/aarohan23/about" },
  openGraph: { title: "Aarohan", description: "", url: "https://atlasuniversity.edu.in/aarohan23/about", type: 'website' },
  twitter: { card: 'summary_large_image', title: "Aarohan", description: "" },
};

export default function Page() {
  return <AboutPage site={site} about={about} year={2023} />;
}
