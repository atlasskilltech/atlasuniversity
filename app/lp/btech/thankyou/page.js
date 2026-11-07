import BtechThankyou from '@/components/LandingPages/Lp2027/pages/BtechThankyou';

/* https://atlasuniversity.edu.in/lp/btech/thankyou — <head> transcribed as production serves it */
export const metadata = {
  title: "Thank You",
  alternates: { canonical: "https://atlasuniversity.edu.in/lp/btech/thankyou" },
  openGraph: { title: "Thank You", url: "https://atlasuniversity.edu.in/lp/btech/thankyou" },
  twitter: { card: "summary_large_image", title: "Thank You" },
};

export default function Page() {
  return <BtechThankyou />;
}
