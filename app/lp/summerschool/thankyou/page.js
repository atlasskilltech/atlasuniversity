import SummerschoolThankyou from '@/components/LandingPages/Lp2027/pages/SummerschoolThankyou';

/* https://atlasuniversity.edu.in/lp/summerschool/thankyou/ — <head> transcribed as production serves it */
export const metadata = {
  title: "Thank You",
  alternates: { canonical: "https://atlasuniversity.edu.in/lp/summerschool/thankyou/" },
  openGraph: { title: "Thank You", url: "https://atlasuniversity.edu.in/lp/summerschool/thankyou/" },
  twitter: { card: "summary_large_image", title: "Thank You" },
};

export default function Page() {
  return <SummerschoolThankyou />;
}
