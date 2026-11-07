import BdesThankyou from '@/components/LandingPages/Lp2027/pages/BdesThankyou';

/* https://atlasuniversity.edu.in/lp/bdes/thankyou — <head> transcribed as production serves it */
export const metadata = {
  title: "Thank You",
  alternates: { canonical: "https://atlasuniversity.edu.in/lp/bdes/thankyou" },
  openGraph: { title: "Thank You", url: "https://atlasuniversity.edu.in/lp/bdes/thankyou" },
  twitter: { card: "summary_large_image", title: "Thank You" },
};

export default function Page() {
  return <BdesThankyou />;
}
