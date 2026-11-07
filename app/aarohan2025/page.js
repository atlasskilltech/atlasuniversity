/* /aarohan2025 - generated route over components/Aarohan + lib/aarohan/2025. Metadata is production's own
   (<title>, empty description, `noindex, follow`). */
import HomePage from '@/components/Aarohan/Pages/HomePage';
import { site } from '@/lib/aarohan/2025/site';
import { home } from '@/lib/aarohan/2025/home';

export const metadata = {
  title: "Aarohan",
  description: "",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://atlasuniversity.edu.in/aarohan2025/" },
  openGraph: { title: "Aarohan", description: "", url: "https://atlasuniversity.edu.in/aarohan2025/", type: 'website' },
  twitter: { card: 'summary_large_image', title: "Aarohan", description: "" },
};

export default function Page() {
  return <HomePage site={site} home={home} year={2025} />;
}
