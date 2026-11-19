import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminShell from '@/components/Admin/AdminShell';
import { PageHeader } from '@/components/News/Admin/ui';
import S3Drive from '@/components/Admin/S3Drive/Drive';
import { DOMAIN_PREFIXES, driveConfig } from '@/lib/s3drive/drive';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'S3 Drive — ATLAS Admin' };

/*
 * /admin/s3drive — the atlas-web-cdn S3 bucket as a file browser. Admins browse, upload, create folders
 * and delete; users with the "S3 Drive" tab ticked browse and copy links only (the API enforces the
 * same). Every change is written to the Activity log.
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
        description={
          isAdmin
            ? `Files in the ${cfg.bucket || 'S3'} bucket. Open folders, upload files (any size), create folders, delete, and copy each file's S3 and website links.`
            : `Files in the ${cfg.bucket || 'S3'} bucket. Open folders and copy each file's S3 and website links. Only an admin can upload or delete.`
        }
      />
      {cfg.configured ? (
        <S3Drive
          isAdmin={isAdmin}
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
