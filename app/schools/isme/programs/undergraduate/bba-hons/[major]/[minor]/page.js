import BbaPage from '@/components/Schools/ISME/Bba/BbaPage';
import { bbaKeys, bbaMetadata } from '@/lib/schools/isme/bba/load';

/*
 * reference/schools/isme/programs/undergraduate/bba-hons/<major>/<minor>.php — the major + minor
 * combination pages, rendered from the data extracted from their production markup (see
 * lib/schools/isme/bba). Only the combinations that exist upstream are built; anything else 404s.
 */
const FAMILY = 'bba-hons';

export const dynamicParams = false;

export function generateStaticParams() {
  return bbaKeys(FAMILY)
    .map((k) => k.slice(FAMILY.length + 1).split('/'))
    .filter((parts) => parts.length === 2)
    .map(([major, minor]) => ({ major, minor }));
}

export async function generateMetadata({ params }) {
  const { major, minor } = await params;
  return bbaMetadata(`${FAMILY}/${major}/${minor}`);
}

export default async function Page({ params }) {
  const { major, minor } = await params;
  return <BbaPage pageKey={`${FAMILY}/${major}/${minor}`} />;
}
