import CourseCoverHero from '@/components/ui/CourseCoverHero';
import { CareerVideo, FacultyLife, PerksMosaic, ThingsCards } from '@/components/Careers/CareersSections';
import Openings from '@/components/Careers/Openings';
import StatBand from '@/components/ui/StatBand';
import { jobOpenings as data } from '@/lib/jobOpeningsContent';

const { title, description } = data.meta;

export const metadata = {
  title,
  description,
  alternates: { canonical: 'https://atlasuniversity.edu.in/job-openings' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title, url: 'https://atlasuniversity.edu.in/', type: 'website', description },
  twitter: { card: 'summary_large_image', title, description },
};

/**
 * /job-openings — reference/job-openings.php. Seven blocks in the reference's order: cover, the
 * three-figure band (`.top-cards-wrapper.padbtm0`), "3 Things That Set Us Apart", "Faculty
 * Life@ISME", "Perks & Benefits", the video, and the vacancy list. A "What it's like" testimonial
 * section is commented out in the reference and is not ported. The vacancies are a dated snapshot
 * of the live page — see lib/jobOpeningsContent.js.
 */
export default function Page() {
  return (
    <>
      <CourseCoverHero hero={data.hero} />
      <StatBand data={data.stats} />
      <ThingsCards data={data.things} />
      <FacultyLife data={data.life} />
      <PerksMosaic data={data.perks} />
      <CareerVideo data={data.video} />
      <Openings data={data.openings} />
    </>
  );
}
