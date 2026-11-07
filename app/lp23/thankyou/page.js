import ThankYou from '@/components/LandingPages/Lp2x/ThankYou';

/*
 * ref lp23/thankyou.php — production 301s that URL to https://atlasuniversity.edu.in/lp23/thankyou and
 * serves the page there. <title> "Thank You"; no meta description, robots or canonical upstream.
 */
export const metadata = {
  title: 'Thank You',
  description: null,
  alternates: { canonical: 'https://atlasuniversity.edu.in/lp23/thankyou' },
};

export default function Page() {
  return <ThankYou />;
}
