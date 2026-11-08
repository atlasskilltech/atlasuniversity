import { requireAdminPage } from '@/lib/news/auth/admin';
import { foundationHealth } from '@/lib/news/health';
import FoundationTools from '@/components/News/Admin/FoundationTools';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Foundation status — ATLAS News Admin', robots: { index: false, follow: false } };

const Badge = ({ ok, children }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${ok ? 'bg-[#e7f6ec] text-[#11733b]' : 'bg-[#fdecea] text-[#b42318]'}`}>
    {children}
  </span>
);

function Row({ label, children }) {
  return (
    <div className="flex flex-col gap-1 border-t border-[#eef0f3] py-3 first:border-t-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <dt className="text-[14px] text-[#5b6170]">{label}</dt>
      <dd className="text-[14px] font-medium break-words sm:text-right">{children}</dd>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:p-6">
      <h2 className="text-[16px] font-semibold">{title}</h2>
      <dl className="mt-3">{children}</dl>
    </section>
  );
}

/*
 * Stage 1 dashboard: the state of the foundation — database + schema, admin password, S3 storage and the
 * upload pipeline — plus two tools to prove them end to end on whichever server this runs on. The
 * editorial dashboard replaces this page in Stage 3.
 */
export default async function NewsAdminHome() {
  /* The page checks the session itself: a layout's check is not re-run on client navigation (Next.js
     partial rendering), so the parent layout alone must never be what protects this page's data. */
  await requireAdminPage();
  const h = await foundationHealth();
  const db = h.database;
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-[22px] font-semibold leading-[1.3] sm:text-[26px]">Foundation status</h1>
        <p className="mt-1 text-[14px] leading-[1.5] text-[#5b6170]">
          Stage 1 of the ATLAS News platform. Editorial tools arrive in Stage 3.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Database">
          <Row label="Connection">{db.error ? <Badge ok={false}>unavailable ({db.error})</Badge> : <Badge ok>connected</Badge>}</Row>
          {!db.error ? (
            <>
              <Row label="Database">{db.name}</Row>
              <Row label="Server">{db.serverVersion}</Row>
              <Row label="Table prefix">{h.prefix}</Row>
              <Row label="News tables">{db.tables}</Row>
              <Row label="Migrations applied">{db.applied.join(', ') || 'none'}</Row>
              <Row label="Pending">{db.pending.length ? <Badge ok={false}>{db.pending.join(', ')}</Badge> : <Badge ok>none</Badge>}</Row>
              {db.problems.map((p) => (
                <Row key={p} label="Problem">
                  <Badge ok={false}>{p}</Badge>
                </Row>
              ))}
            </>
          ) : null}
        </Card>

        <Card title="Admin access">
          <Row label="Password source">
            <Badge ok={h.password === 'database' || h.password === 'env'}>{h.password}</Badge>
          </Row>
          <Row label="Session">active (database-backed, 12 h idle / 7 days max)</Row>
          <Row label="Rate limit">5 failed attempts per IP per 15 min</Row>
        </Card>

        <Card title="S3 storage">
          <Row label="Configured">{h.storage.configured ? <Badge ok>yes</Badge> : <Badge ok={false}>no</Badge>}</Row>
          <Row label="Public host">{h.storage.publicHost || '—'}</Row>
          <Row label="Key root">{h.storage.keyRoot}</Row>
          <Row label="Static credentials in env">{h.storage.credentialsInEnv ? 'yes' : 'no (SDK default chain / instance role)'}</Row>
        </Card>

        <Card title="Upload rules">
          <Row label="Max file size">{Math.round(h.uploads.maxBytes / 1024 / 1024)} MB</Row>
          <Row label="Accepted">JPEG, PNG, WebP, AVIF</Row>
          <Row label="Renditions (WebP)">{h.uploads.renditions.join(' · ')}</Row>
          <Row label="Metadata">EXIF/GPS stripped</Row>
        </Card>
      </div>

      <FoundationTools />
    </div>
  );
}
