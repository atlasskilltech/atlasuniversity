import { managementTeam as data } from '@/lib/managementTeamContent';
import ProgramHero from '@/components/Programs/ProgramHero';
import TeamGrid from '@/components/ManagementTeam/TeamGrid';

const { title, description, canonical } = data.meta;

export const metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title, url: canonical, type: 'website', description },
  twitter: { card: 'summary_large_image', title, description },
};

/**
 * /management-team — port of `reference/management-team.php`, measured against production.
 *
 *   1  .inner-header-wrapper.full-ht   ProgramHero — the same 100vh cover with a half-height scrim
 *                                      (the whole frame below 768) the Programs pages use; one h1
 *   2  .top-cards-wrapper              EMPTY upstream, but it carries padding-bottom 60, so it is
 *                                      60px of page at every width and is rendered as such
 *   3  section.section                 TeamGrid — heading, lead, sixteen people
 */
export default function ManagementTeamPage() {
  return (
    <>
      <ProgramHero hero={data.hero} />
      {/* ref .top-cards-wrapper — no children, padding-bottom 60 */}
      <div className="pb-[60px]" aria-hidden="true" />
      <TeamGrid team={data.team} />
    </>
  );
}
