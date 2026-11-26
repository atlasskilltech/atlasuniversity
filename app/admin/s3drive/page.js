import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminShell from '@/components/Admin/AdminShell';
import { PageHeader } from '@/components/News/Admin/ui';
import S3Drive from '@/components/Admin/S3Drive/Drive';
import { ALLOW_DELETE, DOMAIN_PREFIXES, driveConfig } from '@/lib/s3drive/drive';
import { insideScope, s3Scope } from '@/lib/admin/access';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'S3 Drive — ATLAS Admin' };

/*
 * /admin/s3drive — the atlas-web-cdn S3 bucket as a file browser. Admins see the whole bucket; for
 * them deleting (and replacing a file, which deletes its old version) is off while ALLOW_DELETE is
 * false. A normal user given S3 Drive in the Users tab sees ONLY their own folder and can upload,
 * replace, create folders and delete inside it — nothing outside (enforced by the API, not just here).
 * Every change is written to the Activity log.
 */
export default async function S3DrivePage({ searchParams }) {
  const session = await requireAdminPage({ tab: 's3drive' });
  const isAdmin = session.user?.role === 'admin';
  const scope = s3Scope(session.user) ?? '';
  const canDelete = isAdmin ? ALLOW_DELETE : true;
  const { prefix } = (await searchParams) || {};
  const asked = typeof prefix === 'string' ? prefix.replace(/^\/+/, '') : '';
  const start = asked && insideScope(scope, asked.endsWith('/') ? asked : `${asked}/`) ? asked : scope;
  const cfg = driveConfig();
  return (
    <AdminShell active="s3drive">
      <PageHeader
        title="S3 Drive"
        description={isAdmin
          ? `Files in the ${cfg.bucket || 'S3'} bucket. Open folders, upload files (any size), create folders, and copy each file's S3 and website links.${ALLOW_DELETE ? ' Admins can also delete.' : ' Deleting and replacing files is turned off.'}`
          : `Your folder: /${scope}. Upload files (any size), create folders, delete, and copy each file's S3 and website links. You can only work inside this folder.`}
      />
      {cfg.configured ? (
        <S3Drive
          isAdmin={isAdmin}
          canWrite
          canDelete={canDelete}
          root={scope}
          bucket={cfg.bucket}
          s3Base={cfg.s3Base}
          domainPrefixes={DOMAIN_PREFIXES}
          initialPrefix={start}
        />
      ) : (
        <div role="status" className="rounded-xl border border-[#f5d48a] bg-[#fff8e6] px-4 py-3 text-[14px] text-[#6b4e00]">
          S3 is not configured on this server. Set AWS_S3_BUCKET, AWS_S3_REGION, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in the server&apos;s .env and restart it.
        </div>
      )}
    </AdminShell>
  );
}
