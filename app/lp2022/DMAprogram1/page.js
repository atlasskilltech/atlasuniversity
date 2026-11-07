import DmaProgram from '@/components/LandingPages/Lp2022/DmaProgram';

/*
 * ref reference/new pages/lp2022.zip → lp2022/DMAprogram1/index.php, live at
 * https://atlasuniversity.edu.in/lp2022/DMAprogram1/. Production's <head>: <title> "Atlas Landing Page",
 * no meta description, robots, canonical or Open Graph tags.
 */
export const metadata = {
  title: 'Atlas Landing Page',
  description: null,
  alternates: { canonical: 'https://atlasuniversity.edu.in/lp2022/DMAprogram1/' },
};

export default function Page() {
  return <DmaProgram />;
}
