import Studio from '@/components/PdfStudio/studio/Studio';
import StudioShell from '@/components/PdfStudio/StudioShell';
import { PRODUCT } from '@/lib/pdf-studio/product';
import { requireAdminPage } from '@/lib/news/auth/admin';

export const metadata = { title: `${PRODUCT.name} — ATLAS Admin` };

/*
 * /admin/pdf-studio — the ATLAS Tech PDF Studio (components/PdfStudio), admins only
 * (requireAdminPage({ tab: 'pdf-studio' }); 'pdf-studio' is in ADMIN_ONLY_TABS, so a `user` account
 * never sees it whatever its ticks say). It moved here from the public /pdf-studio, which now redirects
 * to this page (next.config.mjs) and therefore to the admin sign-in.
 *
 * Only the studio moved. The documents it embeds and prints are still served publicly at
 * /pdf-studio/flipbook/<id> and /pdf-studio/print/<id>, so existing embed codes keep working.
 * The page is dynamic because the session check needs the request.
 */
export const dynamic = 'force-dynamic';

export default async function AdminPdfStudioPage() {
  const session = await requireAdminPage({ tab: 'pdf-studio' });
  return (
    <StudioShell>
      <Studio admin={{ email: session.user.email }} />
    </StudioShell>
  );
}
