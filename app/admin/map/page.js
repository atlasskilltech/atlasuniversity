import MapExplorer from '@/components/Map/MapExplorer';
import { getMapData } from '@/lib/map/publicView';
import { requireAdminPage } from '@/lib/news/auth/admin';

export const metadata = { title: 'University Map — ATLAS Admin' };

/*
 * /admin/map — the interactive website map (components/Map/MapExplorer), admins only
 * (requireAdminPage({ tab: 'map' }); 'map' is in ADMIN_ONLY_TABS, so a `user` account never sees it
 * whatever its ticks say). It moved here from the public /map, which now redirects to this page
 * (next.config.mjs) and therefore to the admin sign-in.
 *
 * It renders from the discovery snapshot in data/map/ (scripts/map/, refreshed by `prebuild` on every
 * deploy). The page is dynamic because the session check needs the request; the snapshot itself is
 * read from disk, nothing is crawled on a visit, and date status (upcoming / passed) is computed now.
 */
export const dynamic = 'force-dynamic';

export default async function AdminMapPage() {
  const session = await requireAdminPage({ tab: 'map' });
  return (
    <main>
      <MapExplorer data={getMapData()} admin={{ email: session.user.email }} />
    </main>
  );
}
