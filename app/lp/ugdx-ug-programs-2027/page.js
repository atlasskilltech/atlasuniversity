import UgdxUgPrograms2027 from '@/components/LandingPages/Lp2027/pages/UgdxUgPrograms2027';

/* https://atlasuniversity.edu.in/lp/ugdx-ug-programs-2027/ — <head> transcribed as production serves it */
export const metadata = {
  title: "B.Tech Admissions 2027 | ATLAS uGDX School of Technology, Mumbai",
  description: "Admissions open for the 2027 intake of the Bachelor of Technology (B.Tech) at ATLAS uGDX, Mumbai. Six B.Tech programs across AI, Computer Science, Robotics, Data, Cybersecurity, Quantum and Semiconductor Technology, on a campus in BKC.",
  robots: "index, follow, max-image-preview:large",
  alternates: { canonical: "https://www.example.com/landing-pages/ugdx-btech/" },
  openGraph: { type: "website", siteName: "ATLAS uGDX School of Technology", title: "Empowering the Next Generation of Tech Innovators | B.Tech Admissions 2027", description: "Future-ready programs connecting Computer Science, Artificial Intelligence and Emerging Technology at ATLAS uGDX, Mumbai.", url: "https://www.example.com/landing-pages/ugdx-btech/", locale: "en_IN", images: [{ url: "/assets/lp/ugdx-ug-programs-2027v2/assets/hero/atlas-campus.jpg", width: 1440, height: 810, alt: "The ATLAS SkillTech University campus in Bandra Kurla Complex, Mumbai" }] },
  twitter: { card: "summary_large_image", title: "Empowering the Next Generation of Tech Innovators | B.Tech Admissions 2027", description: "Future-ready programs connecting Computer Science, Artificial Intelligence and Emerging Technology at ATLAS uGDX, Mumbai.", images: ["/assets/lp/ugdx-ug-programs-2027v2/assets/hero/atlas-campus.jpg"] },
  icons: { icon: "/assets/brand/logos/ugdx/ugdx-circle.svg", apple: "/assets/brand/logos/ugdx/ugdx-circle.svg" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"CollegeOrUniversity\", \"name\": \"ATLAS uGDX School of Technology\", \"parentOrganization\": {\"@type\": \"CollegeOrUniversity\", \"name\": \"ATLAS SkillTech University\"}, \"address\": {\"@type\": \"PostalAddress\", \"streetAddress\": \"Equinox Business Park, Tower 1, Off Bandra-Kurla Complex (BKC), Kurla West\", \"addressLocality\": \"Mumbai\", \"addressRegion\": \"Maharashtra\", \"postalCode\": \"400070\", \"addressCountry\": \"IN\"}}" }} />
      <UgdxUgPrograms2027 />
    </>
  );
}
