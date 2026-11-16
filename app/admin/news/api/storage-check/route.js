import { randomBytes } from 'node:crypto';
import sharp from 'sharp';
import { fail, json, requireAdminApi } from '@/lib/news/auth/admin';
import { NEWS_S3_ROOT } from '@/lib/news/config';
import { LimiterBusy, mediaLimiter } from '@/lib/news/http/limiter';
import { putIfAbsent, s3Config, StorageError, verifyPublic } from '@/lib/news/storage/s3';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST → proves THIS server can write to S3 and that what it writes is publicly readable (admin only).
 *
 * Generates a unique 32×32 WebP (random pixels, so the key is always new), writes it under
 * assets/news/_healthcheck/<yyyy-mm-dd>/ with a conditional put (it cannot overwrite anything), then
 * downloads it over the public URL and compares the checksum. Nothing else in the bucket is read or
 * touched, and nothing is deleted.
 */
export async function POST(request) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const cfg = s3Config();
  if (!cfg.configured) return fail(503, 'storage_not_configured', 'S3 is not configured on this server.');

  /* shares the media limiter with uploads, so the check cannot be used to flood S3 */
  let release;
  try {
    release = await mediaLimiter().acquire();
  } catch (e) {
    if (e instanceof LimiterBusy) return fail(503, 'busy', 'The server is busy. Please try again shortly.', { 'Retry-After': String(e.retryAfter) });
    throw e;
  }
  try {
    return await runCheck();
  } finally {
    release();
  }
}

async function runCheck() {
  const pixels = randomBytes(32 * 32 * 3);
  const body = await sharp(pixels, { raw: { width: 32, height: 32, channels: 3 } }).webp({ quality: 80 }).toBuffer();
  const day = new Date().toISOString().slice(0, 10);
  const rel = `${NEWS_S3_ROOT}/_healthcheck/${day}/${Date.now()}-${randomBytes(6).toString('hex')}.webp`;

  try {
    const put = await putIfAbsent(rel, body, { contentType: 'image/webp', cacheControl: 'no-store' });
    const read = await verifyPublic(rel, put.sha256);
    const ok = put.created && read.status === 200 && read.checksumMatches === true;
    return json({ ok, write: { created: put.created, key: put.key, bytes: body.length }, publicRead: read }, ok ? 200 : 502);
  } catch (e) {
    if (e instanceof StorageError) return json({ ok: false, error: e.message, code: e.code }, 502);
    return json({ ok: false, error: 'storage check failed', code: e.code || 'error' }, 502);
  }
}
