import Btech from '@/components/LandingPages/Lp2027/pages/Btech';

/* https://atlasuniversity.edu.in/lp/btech/ — <head> transcribed as production serves it */
export const metadata = {
  title: "B.Tech in Computer Science, AI, Robotics | ATLAS SkillTech University Mumbai",
  description: "ATLAS uGDX, the front-runner of ATLAS SkillTech University, is one of the best colleges in Mumbai for B.Tech programs in Computer Science, Artificial Intelligence, DataScience, Cybersecurity, Machine Learning, and Robotics. ATLAS stands out for its multidisciplinary, new-age approach to engineering education, with a strong focus on innovation, technology, and entrepreneurship.",
  keywords: "Empowering future tech leaders with ATLAS uGDX B.Tech program. Explore cutting-edge curriculum, industry partnerships, and hands-on learning for a successful tech career. Apply now!",
  authors: [{ name: "ATLAS B.TECH Landing Page" }],
  robots: "index, follow",
  alternates: { canonical: "https://atlasuniversity.edu.in/lp/btech/" },
  openGraph: { type: "website", siteName: "ATLAS SkillTech University", title: "ATLAS uGDX B.Tech Program Highlights", description: "ATLAS uGDX, the front-runner of ATLAS SkillTech University, is one of the best colleges in Mumbai for B.Tech programs in Computer Science, Artificial Intelligence, DataScience, Cybersecurity, Machine Learning, and Robotics. ATLAS stands out for its multidisciplinary, new-age approach to engineering education, with a strong focus on innovation, technology, and entrepreneurship.", url: "https://atlasuniversity.edu.in/lp/btech/", images: [{ url: "/assets/lp/btech/assets/images/og-image-meta/1.webp", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "ATLAS uGDX B.Tech Program Highlights", description: "ATLAS uGDX, the front-runner of ATLAS SkillTech University, is one of the best colleges in Mumbai for B.Tech programs in Computer Science, Artificial Intelligence, DataScience, Cybersecurity, Machine Learning, and Robotics. ATLAS stands out for its multidisciplinary, new-age approach to engineering education, with a strong focus on innovation, technology, and entrepreneurship.", images: ["/assets/lp/btech/assets/images/og-image-meta/1.webp"] },
  icons: { icon: "/assets/lp/bdes/assets/images/icon/favicon.png", apple: "/assets/lp/bdes/assets/images/icon/favicon.png" },
};

export default function Page() {
  return <Btech />;
}
