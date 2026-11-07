import IsmeUgPrograms2027 from '@/components/LandingPages/Lp2027/pages/IsmeUgPrograms2027';

/* https://atlasuniversity.edu.in/lp/isme-ug-programs-2027v2/ — <head> transcribed as production serves it */
export const metadata = {
  title: "BBA & B.Sc (Hons.) Admissions 2027, Mumbai | ATLAS ISME – School of Management & Entrepreneurship",
  description: "Admissions open for the 2027 intake of ATLAS ISME's UG business programs – BBA / BBA (Hons.) and B.Sc (Hons.) in BKC, Mumbai. Major in Marketing, Finance, Business Analytics, AI & Emerging Technologies and more.",
  robots: "index, follow",
  alternates: { canonical: "https://atlasuniversity.edu.in/lp/isme-ug-programs-2027/" },
  openGraph: { type: "website", siteName: "ATLAS ISME – School of Management & Entrepreneurship", title: "Shaping the Future of Business at ATLAS ISME | BBA & B.Sc Admissions 2027", description: "Future-ready BBA / BBA (Hons.) and B.Sc (Hons.) programs connecting Business, Finance, Industry and Entrepreneurship – in the heart of Mumbai's BKC.", url: "https://www.example.com/isme-bba/", locale: "en_IN", images: [{ url: "/assets/lp/isme-ug-programs-2027/assets/common/og-image.jpg", width: 1200, height: 630, alt: "ATLAS ISME campus building at Bandra Kurla Complex, Mumbai" }] },
  twitter: { card: "summary_large_image", title: "Shaping the Future of Business at ATLAS ISME | BBA & B.Sc Admissions 2027", description: "BBA / BBA (Hons.) and B.Sc (Hons.) programs at ATLAS ISME, BKC Mumbai. Admissions open for the 2027 intake.", images: ["/assets/lp/isme-ug-programs-2027/assets/common/og-image.jpg"] },
  icons: { icon: "/assets/brand/logos/isme/isme-square.svg", apple: "/assets/brand/logos/isme/isme-square.svg" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"CollegeOrUniversity\", \"name\": \"ATLAS ISME – School of Management & Entrepreneurship, ATLAS SkillTech University\", \"address\": {\"@type\": \"PostalAddress\", \"streetAddress\": \"Equinox Business Park, Tower 1, Off Bandra-Kurla Complex (BKC), Kurla West\", \"addressLocality\": \"Mumbai\", \"addressRegion\": \"Maharashtra\", \"postalCode\": \"400070\", \"addressCountry\": \"IN\"}}" }} />
      <IsmeUgPrograms2027 />
    </>
  );
}
