import Header from '@/components/Sensorium/Header';
import Home from '@/components/Sensorium/Home';
import { home } from '@/lib/sensorium/home';

/* Production: https://atlasuniversity.edu.in/sensorium/ (WordPress page 203, Yoast). Yoast prints no
   meta description; its og:description is the homepage's own opening paragraph, used here for both. */
const DESCRIPTION =
  'Centered in the heart of India’s Fashion Capital – Mumbai, ATLAS | ISDI School Fashion is where the future of fashion is imagined today. Bringing together the power of Fashion, Technology and Entrepreneurship, the School builds leaders who can use the power of fashion to fuel political, social, cultural and individual transformation to redesign the future of the world. Beyond the sartorial sensibilities, Inclusivity, Identity and Sustainability are at the core of our every expression, emotion and element.';

export const metadata = {
  title: 'Main Home - Sensorium',
  description: DESCRIPTION,
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  alternates: { canonical: 'https://atlasuniversity.edu.in/sensorium/' },
  openGraph: {
    siteName: 'Sensorium',
    title: 'Main Home - Sensorium',
    description: DESCRIPTION,
    url: 'https://atlasuniversity.edu.in/sensorium/',
    type: 'website',
    locale: 'en_US',
    images: ['/assets/sensorium/2022-12-1.webp'],
  },
  twitter: { card: 'summary_large_image', title: 'Main Home - Sensorium', description: DESCRIPTION },
};

export default function SensoriumHome() {
  return (
    <>
      <Header nav={home.nav} logos={home.logos} isHome stickyAmount={1150} />
      {/* #qodef-page-outer: margin-top -130px (-70px <=1024) pulls the content up under the header */}
      <main className="-mt-[130px] [@media(max-width:1024px)]:-mt-[70px]">
        <Home />
      </main>
    </>
  );
}
