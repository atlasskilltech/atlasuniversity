import IsmeUg from '@/components/LandingPages/Lp2027/pages/IsmeUg';

/* https://atlasuniversity.edu.in/lp/isme-ug/ — <head> transcribed as production serves it */
export const metadata = {
  title: "ISME School of Management & Entrepreneurship | ATLAS SkillTech University Mumbai",
  description: "ATLAS SkillTech University’s ISME School of Management & Entrepreneurship stands out for its innovation-driven learning, strong industry integration, and experiential approach.",
  keywords: "India's Industry Driven Business School",
  authors: [{ name: "ATLAS ISME UG Landing Page" }],
  robots: "index, follow",
  alternates: { canonical: "https://atlasuniversity.edu.in/lp/isme-ug/" },
  openGraph: { type: "website", siteName: "ATLAS SkillTech University", title: "India's Industry Driven Business School", description: "ATLAS SkillTech University’s ISME School of Management & Entrepreneurship stands out for its innovation-driven learning, strong industry integration, and experiential approach.", url: "https://atlasuniversity.edu.in/lp/isme-ug/", images: [{ url: "/assets/lp/isme-ug/assets/images/og-image-meta/1.webp", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "India's Industry Driven Business School", description: "ATLAS SkillTech University’s ISME School of Management & Entrepreneurship stands out for its innovation-driven learning, strong industry integration, and experiential approach.", images: ["/assets/lp/isme-ug/assets/images/og-image-meta/1.webp"] },
  icons: { icon: "/assets/lp/bdes/assets/images/icon/favicon.png", apple: "/assets/lp/bdes/assets/images/icon/favicon.png" },
};

export default function Page() {
  return <IsmeUg />;
}
