import BbaPage from '@/components/Schools/ISME/Bba/BbaPage';
import { bbaMetadata } from '@/lib/schools/isme/bba/load';

/*
 * reference/schools/isme/programs/undergraduate/bba-hons-major/index.php — "BBA / BBA(Hons.) Major
 * & Minor", the overview of the major/minor template, rendered from its production markup.
 */
export function generateMetadata() {
  return bbaMetadata('bba-hons-major');
}

export default function Page() {
  return <BbaPage pageKey="bba-hons-major" />;
}
