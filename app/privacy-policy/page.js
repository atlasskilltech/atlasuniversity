import InnerPageHero from '@/components/ui/InnerPageHero';
import PrivacyDocument from '@/components/Legal/PrivacyDocument';
import { privacyPolicy as data } from '@/lib/privacyPolicyContent';

/* ref privacy-policy/index.php `$title` / `$description` / `$keywords`; canonical as production serves it */
export const metadata = {
  title: 'Privacy Policy | Atlas SkillTech University Mumbai',
  description:
    "Atlas SkillTech University's privacy policy outlines how we collect, use, and protect your personal data across all our digital platforms and services.",
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/privacy-policy/' },
  openGraph: {
    siteName: 'ATLAS SKILLTECH UNIVERSITY',
    title: 'Privacy Policy | Atlas SkillTech University Mumbai',
    url: 'https://atlasuniversity.edu.in/',
    type: 'website',
    description:
      "Atlas SkillTech University's privacy policy outlines how we collect, use, and protect your personal data across all our digital platforms and services.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Atlas SkillTech University Mumbai',
    description:
      "Atlas SkillTech University's privacy policy outlines how we collect, use, and protect your personal data across all our digital platforms and services.",
  },
};

/**
 * /privacy-policy — reference/new pages/privacy-policy.zip: the /examination cover over the policy.
 * Upstream's footer include is a broken relative path (production prints two PHP warnings in its
 * place); the shared ATLAS footer from app/layout.js stands in, as intended.
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <InnerPageHero hero={data.hero} />
      <PrivacyDocument data={data} />
    </>
  );
}
