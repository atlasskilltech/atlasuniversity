import Bdes from '@/components/LandingPages/Lp2027/pages/Bdes';

/* https://atlasuniversity.edu.in/lp/bdes/ — <head> transcribed as production serves it */
export const metadata = {
  title: "B.Des in Design, Interior, Communication, Animation etc | ATLAS SkillTech University Mumbai",
  description: "ATLAS ISDI, At ISDI you get the opportunity to immerse yourself in a truly world-class design school experience. With our curricular collaboration with Parsons School of Design, ranked among the top 3 Art & Design institutions globally, we bring to you the best in global standards of design techniques, practices, and innovation.",
  keywords: "India's Global Design School, B.Des Programs, Design Education Mumbai, Interior Design College, Communication Design, Animation Design, Fashion Design, Product Design, UX/UI Design, Creative Careers India",
  authors: [{ name: "ATLAS B.DES Landing Page" }],
  robots: "index, follow",
  alternates: { canonical: "https://atlasuniversity.edu.in/lp/bdes/" },
  openGraph: { type: "website", siteName: "ATLAS SkillTech University", title: "ATLAS ISDI B.DES Program Highlights", description: "ATLAS ISDI, At ISDI you get the opportunity to immerse yourself in a truly world-class design school experience. With our curricular collaboration with Parsons School of Design, ranked among the top 3 Art & Design institutions globally, we bring to you the best in global standards of design techniques, practices, and innovation.", url: "https://atlasuniversity.edu.in/lp/bdes/", images: [{ url: "/assets/lp/bdes/assets/images/og-image-meta/1.webp", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "ATLAS ISDI B.DES Program Highlights", description: "ATLAS ISDI, At ISDI you get the opportunity to immerse yourself in a truly world-class design school experience. With our curricular collaboration with Parsons School of Design, ranked among the top 3 Art & Design institutions globally, we bring to you the best in global standards of design techniques, practices, and innovation.", images: ["/assets/lp/bdes/assets/images/og-image-meta/1.webp"] },
  icons: { icon: "/assets/lp/bdes/assets/images/icon/favicon.png", apple: "/assets/lp/bdes/assets/images/icon/favicon.png" },
};

export default function Page() {
  return <Bdes />;
}
