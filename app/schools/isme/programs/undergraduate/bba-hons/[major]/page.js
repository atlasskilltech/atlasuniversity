import BbaPage from '@/components/Schools/ISME/Bba/BbaPage';
import { bbaKeys, bbaMetadata } from '@/lib/schools/isme/bba/load';

/*
 * reference/schools/isme/programs/undergraduate/bba-hons/<major>/index.php — one page per major,
 * rendered from the data extracted from its production markup (see lib/schools/isme/bba).
 * Only the majors that exist upstream are built; anything else is a 404.
 */
const FAMILY = 'bba-hons';

export const dynamicParams = false;

export function generateStaticParams() {
  return bbaKeys(FAMILY)
    .map((k) => k.slice(FAMILY.length + 1).split('/'))
    .filter((parts) => parts.length === 1)
    .map(([major]) => ({ major }));
}

export async function generateMetadata({ params }) {
  const { major } = await params;
  return bbaMetadata(`${FAMILY}/${major}`);
}

export default async function Page({ params }) {
  const { major } = await params;
  return <BbaPage pageKey={`${FAMILY}/${major}`} />;
}
