import 'server-only';

/**
 * ATLAS News — foundation health snapshot for the admin status panel and GET /news/admin/api/health.
 * Reports PRESENCE of configuration and the state of the schema; never a credential, hash or host name
 * beyond the public asset host.
 */
import { NEWS_S3_ROOT, NEWS_TABLE_PREFIX } from './config.js';
import { migrationStatus } from './db/migrate.js';
import { passwordSource } from './auth/admin.js';
import { s3Config } from './storage/s3.js';
import { ACCEPTED_MIME, MAX_UPLOAD_BYTES, RENDITIONS } from './media/images.js';

export async function foundationHealth() {
  const out = { prefix: NEWS_TABLE_PREFIX };

  try {
    const s = await migrationStatus();
    out.database = { ok: s.problems.length === 0, name: s.database, serverVersion: s.serverVersion, tables: s.tables.length, applied: s.applied.map((a) => a.id), pending: s.pending, problems: s.problems };
  } catch (e) {
    out.database = { ok: false, error: e.code || 'error' };
  }

  try {
    out.password = await passwordSource();
  } catch {
    out.password = 'unknown';
  }

  const cfg = s3Config();
  let publicHost = null;
  try {
    publicHost = cfg.publicBase ? new URL(cfg.publicBase).host : null;
  } catch {
    publicHost = null;
  }
  out.storage = {
    configured: cfg.configured,
    bucketSet: Boolean(cfg.bucket),
    regionSet: Boolean(cfg.region),
    publicHost,
    keyRoot: `${cfg.prefix ? `${cfg.prefix}/` : ''}${NEWS_S3_ROOT}/`,
    credentialsInEnv: Boolean(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY),
  };

  out.uploads = { maxBytes: MAX_UPLOAD_BYTES, accepted: ACCEPTED_MIME, renditions: [...RENDITIONS.map((r) => `${r.name} ${r.width}w`), 'full ≤2400'] };
  return out;
}
