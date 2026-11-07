/* /aarohan2025 - generated route over components/Aarohan + lib/aarohan/2025. Metadata is production's own
   (<title>, empty description, `noindex, follow`). */
import { GuidelinePage } from '@/components/Aarohan/Pages/InnerPages';
import { site } from '@/lib/aarohan/2025/site';
import { guidelines } from '@/lib/aarohan/2025/guidelines';

export const metadata = {
  title: "Aarohan",
  description: "",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://atlasuniversity.edu.in/aarohan2025/information-for-authors.php" },
  openGraph: { title: "Aarohan", description: "", url: "https://atlasuniversity.edu.in/aarohan2025/information-for-authors.php", type: 'website' },
  twitter: { card: 'summary_large_image', title: "Aarohan", description: "" },
};

export default function Page() {
  return <GuidelinePage site={site} page={guidelines['information-for-authors']} year={2025} />;
}
