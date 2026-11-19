import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminShell from '@/components/Admin/AdminShell';
import { PageHeader } from '@/components/News/Admin/ui';
import S3Drive from '@/components/Admin/S3Drive/Drive';
import { ALLOW_DELETE, DOMAIN_PREFIXES, driveConfig } from '@/lib/s3drive/drive';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'S3 Drive — ATLAS Admin' };

/*
 * /admin/s3drive — the atlas-web-cdn S3 bucket as a file browser. ADMINS ONLY ('s3drive' is in
 * ADMIN_ONLY_TABS). Browse, upload, create folders and copy links. Deleting — and replacing a file,
 * which deletes its old version — is off for everyone while ALLOW_DELETE is false. Every change is
 * written to the Activity log.
 */
export default async function S3DrivePage({ searchParams }) {
  const session = await requireAdminPage({ tab: 's3drive' });
  const isAdmin = session.user?.role === 'admin';
  const { prefix } = (await searchParams) || {};
  const cfg = driveConfig();
  return (
    <AdminShell active="s3drive">
      <PageHeader
        title="S3 Drive"
        description={`Files in the ${cfg.bucket || 'S3'} bucket. Open folders, upload files (any size), create folders, and copy each file's S3 and website links.${ALLOW_DELETE ? ' Admins can also delete.' : ' Deleting and replacing files is turned off.'}`}
      />
      {cfg.configured ? (
        <S3Drive
          isAdmin={isAdmin}
          canDelete={ALLOW_DELETE}
          bucket={cfg.bucket}
          s3Base={cfg.s3Base}
          domainPrefixes={DOMAIN_PREFIXES}
          initialPrefix={typeof prefix === 'string' ? prefix : ''}
        />
      ) : (
        <div role="status" className="rounded-xl border border-[#f5d48a] bg-[#fff8e6] px-4 py-3 text-[14px] text-[#6b4e00]">
          S3 is not configured on this server. Set AWS_S3_BUCKET, AWS_S3_REGION, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in the server&apos;s .env and restart it.
        </div>
      )}
    </AdminShell>
  );
}
