import Lp2xPage from '@/components/LandingPages/Lp2x/Lp2xPage';
import { VARIANTS } from '@/lib/landing/lp2x/variants';

/*
 * ref reference/new pages/lp24.zip → lp24/index.php — live at
 * https://atlasuniversity.edu.in/lp24/. Production's <head>: <title> "ATLAS University", no meta
 * description, no robots tag (indexable), no canonical, and the Open Graph / Twitter tags below
 * (its og:image points at a WordPress upload and is not carried over).
 */
export const metadata = {
  title: 'ATLAS University',
  description: null,
  alternates: { canonical: 'https://atlasuniversity.edu.in/lp24/' },
  openGraph: {
    locale: 'en_US',
    siteName: 'ATLAS SKILLTECH UNIVERSITY',
    title: "ATLAS SkillTech University: India's 1st Urban Multidisciplinary University",
    url: 'https://atlasuniversity.edu.in/',
    type: 'website',
    description:
      'Degree Courses: Improve your knowledge & multidisciplinary skills with #1 university ATLAS SkillTech University in India. Check out our various specialisation courses. Enroll Now!',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ATLAS SkillTech University: India's 1st Urban Multidisciplinary University",
    description:
      'Degree Courses: Improve your knowledge & multidisciplinary skills with #1 university ATLAS SkillTech University in India. Check out our various specialisation courses. Enroll Now!',
  },
};

export default function Page() {
  return <Lp2xPage variant={VARIANTS.lp24} />;
}
