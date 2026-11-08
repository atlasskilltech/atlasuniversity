import { requireAdminPage } from '@/lib/news/auth/admin';
import { listMedia } from '@/lib/news/cms/media';
import DbUnavailable from '@/components/News/Admin/DbUnavailable';
import MediaLibrary from '@/components/News/Admin/MediaLibrary';
import { PageHeader } from '@/components/News/Admin/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Media — ATLAS News Admin', robots: { index: false, follow: false } };

export default async function MediaPage() {
  await requireAdminPage();
  let initial;
  try {
    initial = await listMedia({ page: 1, pageSize: 36 });
  } catch (e) {
    return <DbUnavailable title="Media library" code={e?.code} />;
  }
  return (
    <div>
      <PageHeader title="Media library" description="Images stored for ATLAS News (Amazon S3)." />
      <MediaLibrary initial={initial} />
    </div>
  );
}
