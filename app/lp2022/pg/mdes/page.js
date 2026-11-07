import PgMdes from '@/components/LandingPages/Lp2022/PgMdes';

/*
 * ref reference/new pages/lp2022.zip → lp2022/pg/mdes/index.php, live at
 * https://atlasuniversity.edu.in/lp2022/pg/mdes/. Production's <head>: <title> "ATLAS Landing Page",
 * no meta description, robots, canonical or Open Graph tags.
 */
export const metadata = {
  title: 'ATLAS Landing Page',
  description: null,
  alternates: { canonical: 'https://atlasuniversity.edu.in/lp2022/pg/mdes/' },
};

export default function Page() {
  return <PgMdes />;
}
