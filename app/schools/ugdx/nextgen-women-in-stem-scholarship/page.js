import InnerPageHero from '@/components/ui/InnerPageHero';
import SchoolBanner from '@/components/Schools/LawUgdx/SchoolBanner';
import { StemStory, StemCards, StemHeading, StemEligibility, StemDisclaimer } from '@/components/Schools/Ugdx/StemScholarship';
import { meta, hero, story, why, criteria, eligibility, disciplines, banner, disclaimer } from '@/lib/schools/ugdx/nextgenWomenInStemContent';

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/ugdx/nextgen-women-in-stem-scholarship' },
};

/**
 * /schools/ugdx/nextgen-women-in-stem-scholarship — reference/ugdx/nextgen-women-in-stem-scholarship.php,
 * under the ATLAS header and footer as production serves it. Eight blocks in the reference's order. Both
 * "Apply Now" buttons are the reference's CRM popup embeds, rendered through the shared OutcomesBook.
 */
export default function NextgenWomenInStemPage() {
  return (
    <>
      <div data-block="hero">
        <InnerPageHero hero={hero} />
      </div>
      <StemStory data={story} />
      <StemCards data={why} block="why" tall />
      <StemHeading data={criteria} />
      <StemEligibility data={eligibility} />
      <StemCards data={disciplines} block="disciplines" />
      <SchoolBanner block="banner" banner={banner} tone="ugdxRed" title="lightBar" fullBleed />
      <StemDisclaimer data={disclaimer} />
    </>
  );
}
