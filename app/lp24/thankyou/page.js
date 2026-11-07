import ThankYou from '@/components/LandingPages/Lp2x/ThankYou';

/*
 * ref lp24/thankyou.php — production 301s that URL to https://atlasuniversity.edu.in/lp24/thankyou and
 * serves the page there. <title> "Thank You"; no meta description, robots or canonical upstream.
 */
export const metadata = {
  title: 'Thank You',
  description: null,
  alternates: { canonical: 'https://atlasuniversity.edu.in/lp24/thankyou' },
};

export default function Page() {
  return <ThankYou />;
}
