import BdesUgPrograms2027 from '@/components/LandingPages/Lp2027/pages/BdesUgPrograms2027';

/* https://atlasuniversity.edu.in/lp/bdes-ug-programs-2027/ — <head> transcribed as production serves it */
export const metadata = {
  title: "B.Des Admissions 2027 | ISDI School of Design & Innovation, Mumbai",
  description: "Admissions open for the 2027 intake of the Bachelor of Design (B.Des) at ISDI, Mumbai. 12 B.Des programmes, studio + industry learning and a campus in BKC.",
  robots: "index, follow, max-image-preview:large",
  alternates: { canonical: "https://atlasuniversity.edu.in/lp/bdes-ug-programs-2027/" },
  openGraph: { type: "website", siteName: "ISDI School of Design & Innovation", title: "The Next-Era of Design Starts at ISDI | B.Des Admissions 2027", description: "Build the judgement, craft and AI fluency to shape products, brands, spaces, services and systems that matter.", url: "https://www.example.com/landing-pages/btech/", locale: "en_IN", images: [{ url: "/assets/lp/bdes-ug-programs-2027/assets/campus/campus-photo-1.webp", width: 760, height: 612, alt: "ATLAS ISDI campus building in BKC, Mumbai" }] },
  twitter: { card: "summary_large_image", title: "The Next-Era of Design Starts at ISDI | B.Des Admissions 2027", description: "Build the judgement, craft and AI fluency to shape products, brands, spaces, services and systems that matter.", images: ["/assets/lp/bdes-ug-programs-2027/assets/campus/campus-photo-1.webp"] },
  icons: { icon: "/assets/lp/bdes-ug-programs-2027/assets/common/favicon.webp", apple: "/assets/lp/bdes-ug-programs-2027/assets/common/favicon.webp" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"CollegeOrUniversity\", \"name\": \"ISDI School of Design & Innovation\", \"parentOrganization\": {\"@type\": \"CollegeOrUniversity\", \"name\": \"ATLAS SkillTech University\"}, \"address\": {\"@type\": \"PostalAddress\", \"streetAddress\": \"Building 2, BKC 51, Next to Equinox Business Park, Bandra Kurla Complex Junction\", \"addressLocality\": \"Mumbai\", \"postalCode\": \"400070\", \"addressCountry\": \"IN\"}}" }} />
      <BdesUgPrograms2027 />
    </>
  );
}
