import Btechv2 from '@/components/LandingPages/Lp2027/pages/Btechv2';

/* https://atlasuniversity.edu.in/lp/btechv2/ — <head> transcribed as production serves it */
export const metadata = {
  title: "B.Tech in Design Engineering & AI Engineering, Mumbai | ISDI – ATLAS SkillTech University",
  description: "Admissions open for the 2027 intake of ISDI's Bachelor of Technology (B.Tech) programmes in Design Engineering and AI Engineering & Intelligent Products at BKC, Mumbai.",
  robots: "index, follow",
  alternates: { canonical: "https://www.example.com/btech/" },
  openGraph: { type: "website", siteName: "ISDI – School of Design & Innovation", title: "The Next-Era of Technology Starts at ISDI | B.Tech Admissions 2027", description: "Combine engineering rigour, design judgement and applied AI to build products and systems that work in the real world. B.Tech at ISDI, BKC Mumbai.", url: "https://www.example.com/btech/", locale: "en_IN", images: [{ url: "/assets/lp/btechv2/assets/campus/atlas-isdi-campus-bkc.webp", alt: "ATLAS ISDI campus building in Bandra Kurla Complex, Mumbai" }] },
  twitter: { card: "summary_large_image", title: "The Next-Era of Technology Starts at ISDI | B.Tech Admissions 2027", description: "B.Tech in Design Engineering and AI Engineering & Intelligent Products at ISDI, BKC Mumbai.", images: ["/assets/lp/btechv2/assets/campus/atlas-isdi-campus-bkc.webp"] },
  icons: { icon: "/assets/lp/btechv2/assets/common/favicon.webp", apple: "/assets/lp/btechv2/assets/common/favicon.webp" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"CollegeOrUniversity\", \"name\": \"ISDI – School of Design & Innovation, ATLAS SkillTech University\", \"address\": {\"@type\": \"PostalAddress\", \"streetAddress\": \"Building 2, BKC 51, Next to Equinox Business Park, Bandra Kurla Complex Junction\", \"addressLocality\": \"Mumbai\", \"postalCode\": \"400070\", \"addressCountry\": \"IN\"}}" }} />
      <Btechv2 />
    </>
  );
}
