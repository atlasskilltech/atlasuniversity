import InnerPageHero from '@/components/ui/InnerPageHero';
import TermsDocument from '@/components/Legal/TermsDocument';
import { termsAndConditions as data } from '@/lib/termsContent';

/* ref terms-and-conditions/index.php `$title` / `$description` / `$keywords`; canonical as production serves it */
export const metadata = {
  title: 'Terms and Conditions | Atlas University Mumbai',
  description:
    "Review Atlas University's terms and conditions — the rules, policies, and guidelines governing the use of our website and university services in Mumbai",
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/terms-and-conditions/' },
  openGraph: {
    siteName: 'ATLAS SKILLTECH UNIVERSITY',
    title: 'Terms and Conditions | Atlas University Mumbai',
    url: 'https://atlasuniversity.edu.in/',
    type: 'website',
    description:
      "Review Atlas University's terms and conditions — the rules, policies, and guidelines governing the use of our website and university services in Mumbai",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms and Conditions | Atlas University Mumbai',
    description:
      "Review Atlas University's terms and conditions — the rules, policies, and guidelines governing the use of our website and university services in Mumbai",
  },
};

/** /terms-and-conditions — reference/new pages/terms-and-conditions.zip: the /examination cover over the clauses. */
export default function TermsAndConditionsPage() {
  return (
    <>
      <InnerPageHero hero={data.hero} />
      <TermsDocument data={data} />
    </>
  );
}
