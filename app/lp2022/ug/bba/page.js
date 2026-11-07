import UgBba from '@/components/LandingPages/Lp2022/UgBba';

/*
 * ref reference/new pages/lp2022.zip → lp2022/ug/bba/index.php, live at
 * https://atlasuniversity.edu.in/lp2022/ug/bba/. Production's <head>: <title> "BACHELOR OF BUSINESS
 * ADMINISTRATION", no meta description, robots, canonical or Open Graph tags.
 */
export const metadata = {
  title: 'BACHELOR OF BUSINESS ADMINISTRATION',
  description: null,
  alternates: { canonical: 'https://atlasuniversity.edu.in/lp2022/ug/bba/' },
};

export default function Page() {
  return <UgBba />;
}
