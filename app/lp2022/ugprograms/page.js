import UgPrograms from '@/components/LandingPages/Lp2022/UgPrograms';

/*
 * ref reference/new pages/lp2022.zip → lp2022/ugprograms/index.php, live at
 * https://atlasuniversity.edu.in/lp2022/ugprograms/. Production's <head>: <title> "Atlas Landing Page",
 * no meta description, robots, canonical or Open Graph tags.
 */
export const metadata = {
  title: 'Atlas Landing Page',
  description: null,
  alternates: { canonical: 'https://atlasuniversity.edu.in/lp2022/ugprograms/' },
};

export default function Page() {
  return <UgPrograms />;
}
