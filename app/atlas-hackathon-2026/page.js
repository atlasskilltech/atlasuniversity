import HackathonHeader from '@/components/Hackathon/Header';
import HackathonFooter from '@/components/Hackathon/Footer';
import HackathonLanding from '@/components/Hackathon/Landing';

const DESCRIPTION =
  'ATLAS Hackathon 2026: Prompt to Product. A 90-minute online challenge for Grade 11 & 12 students in teams of two. The top 15 teams win a spot at the Grand Finale at ATLAS SkillTech University, Mumbai.';

export const metadata = {
  title: 'ATLAS Hackathon 2026 — Prompt to Product | ATLAS SkillTech University × uGDX',
  description: DESCRIPTION,
  alternates: { canonical: '/atlas-hackathon-2026' },
  openGraph: {
    title: 'ATLAS Hackathon 2026 — Prompt to Product',
    description: DESCRIPTION,
    images: ['/assets/atlas-hackathon-2026/hero-1.jpg'],
  },
};

export default function AtlasHackathonPage() {
  return (
    <>
      <link rel="preload" as="image" href="/assets/atlas-hackathon-2026/hero-1.webp" />
      <HackathonHeader />
      <main id="main">
        <HackathonLanding />
      </main>
      <HackathonFooter />
    </>
  );
}
