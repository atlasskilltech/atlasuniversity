import LibrarySearch from '@/components/Library/LibrarySearch';
import {
  LibraryHero,
  SearchShell,
  LibraryAbout,
  LibraryServices,
  LibraryResources,
  LibraryEResources,
  LibraryRules,
  LibraryEContent,
  LibraryAwards,
} from '@/components/Library/Sections';
import { hero, search, about, services, resources, eResources, rules, eContent, awards } from '@/lib/libraryContent';

/* ref library.php `$title` / `$description` / `$keywords` */
const TITLE = 'Library | Atlas SkillTech University Mumbai';
const DESCRIPTION =
  'Access the Atlas SkillTech University library in Mumbai — research journals, digital databases, and study spaces to support every stage of your degree.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/library/' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /library — reference/library.php (production serves it at /library/). Nine sections inside the
 * page's own `#body` wrapper: hero · the five-tab search widget · Library · Service & Facilities
 * (23 hover cards) · Resources · E-Resources (11 logo tiles) · Rules and Regulations · ATLAS
 * E-Content · the reading awards. `#body` caps the page at 1920px and sets Poppins over
 * Bootstrap's body type (16px/1.5, #212529), which every section inherits.
 */
export default function LibraryPage() {
  return (
    <div data-lib-root className="mx-auto max-w-[1920px] font-poppins-library text-[16px] leading-[1.5] text-[#212529]">
      <LibraryHero data={hero} />
      <SearchShell data={search}>
        <LibrarySearch data={search} />
      </SearchShell>
      <LibraryAbout data={about} />
      <LibraryServices data={services} />
      <LibraryResources data={resources} />
      <LibraryEResources data={eResources} />
      <LibraryRules data={rules} />
      <LibraryEContent data={eContent} />
      <LibraryAwards data={awards} />
    </div>
  );
}
