import FilmAnimation from '@/components/LandingPages/Lp2022/FilmAnimation';

/*
 * ref reference/new pages/lp2022.zip → lp2022/film-animation_26/index.php, live at
 * https://atlasuniversity.edu.in/lp2022/film-animation_26/. Production's <head>: <title> "Welcome to
 * Atlas Skilltech University", an empty `<meta name="description" content="">`, no robots,
 * canonical or Open Graph tags.
 */
export const metadata = {
  title: 'Welcome to Atlas Skilltech University',
  description: null,
  alternates: { canonical: 'https://atlasuniversity.edu.in/lp2022/film-animation_26/' },
};

export default function Page() {
  return <FilmAnimation />;
}
