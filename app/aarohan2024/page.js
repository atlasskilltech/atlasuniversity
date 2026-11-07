/* /aarohan2024 - generated route over components/Aarohan + lib/aarohan/2024. Metadata is production's own
   (<title>, empty description, `noindex, follow`). */
import HomePage from '@/components/Aarohan/Pages/HomePage';
import { site } from '@/lib/aarohan/2024/site';
import { home } from '@/lib/aarohan/2024/home';

export const metadata = {
  title: "Aarohan",
  description: "",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://atlasuniversity.edu.in/aarohan2024/" },
  openGraph: { title: "Aarohan", description: "", url: "https://atlasuniversity.edu.in/aarohan2024/", type: 'website' },
  twitter: { card: 'summary_large_image', title: "Aarohan", description: "" },
};

export default function Page() {
  return <HomePage site={site} home={home} year={2024} />;
}
