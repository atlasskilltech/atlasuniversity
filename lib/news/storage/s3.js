/**
 * ATLAS News — S3 storage for uploaded media.
 *
 * Reuses the project's existing asset-storage configuration (scripts/assets/lib.mjs, docs/assets-s3.md)
 * rather than introducing a new one: the SAME environment variables, resolved in the SAME order —
 *   bucket   ASSETS_S3_BUCKET → AWS_S3_BUCKET
 *   region   ASSETS_S3_REGION → AWS_S3_REGION → AWS_REGION
 *   prefix   ASSETS_S3_PREFIX            endpoint  ASSETS_S3_ENDPOINT
 *   public   NEXT_PUBLIC_ASSET_BASE_URL, else https://<bucket>.s3.<region>.amazonaws.com
 * — the same `[prefix/]assets/...` key layout (so the bucket policy that makes `assets/*` public, and
 * next/image's remotePatterns for `/assets/**`, both already cover News media), and credentials from the
 * AWS SDK's default chain (env keys or an instance role). It is a separate module only because
 * scripts/assets/lib.mjs is a CLI library (it calls process.exit and reads .env files itself); a test in
 * scripts/news/tests asserts the two resolve identically.
 *
 * SAFETY — this module can never modify or delete an existing object:
 *   - there is no DeleteObject call anywhere in it;
 *   - every key must live under `assets/news/` (NEWS_S3_ROOT), checked before each request;
 *   - every PutObject is conditional (`If-None-Match: *`): S3 rejects it with 412 if the key already
 *     exists. News keys are content-addressed (they contain the SHA-256 of the source), so an existing
 *     key already holds the right bytes; a 412 is treated as "already uploaded" after a HEAD confirms
 *     the stored checksum.
 */
import { createHash } from 'node:crypto';
import { NEWS_S3_ROOT } from '../config.js';

export function s3Config(env = process.env) {
  const prefix = (env.ASSETS_S3_PREFIX || '').trim().replace(/^\/+|\/+$/g, '');
  const cfg = {
    bucket: (env.ASSETS_S3_BUCKET || env.AWS_S3_BUCKET || '').trim(),
    region: (env.ASSETS_S3_REGION || env.AWS_S3_REGION || env.AWS_REGION || '').trim(),
    prefix,
    endpoint: (env.ASSETS_S3_ENDPOINT || '').trim(),
    cdnBase: (env.NEXT_PUBLIC_ASSET_BASE_URL || '').trim().replace(/\/+$/, ''),
  };
  cfg.publicBase = cfg.cdnBase || (cfg.bucket && cfg.region && !cfg.endpoint ? `https://${cfg.bucket}.s3.${cfg.region}.amazonaws.com` : '');
  cfg.configured = Boolean(cfg.bucket && cfg.region);
  return cfg;
}

/** Content-addressed objects never change, so they may be cached for a year. */
export const IMMUTABLE_CACHE = 'public, max-age=31536000, immutable';

/** `rel` is the path below the bucket's prefix, always starting with `assets/news/`. */
export function assertNewsKey(rel) {
  if (typeof rel !== 'string' || !rel.startsWith(`${NEWS_S3_ROOT}/`) || rel.includes('..') || /[\\\s?#]/.test(rel)) {
    throw new Error(`refusing a storage key outside ${NEWS_S3_ROOT}/`);
  }
  return rel;
}

export const objectKey = (cfg, rel) => (cfg.prefix ? `${cfg.prefix}/${assertNewsKey(rel)}` : assertNewsKey(rel));

/** The public URL of a stored object — percent-encoded per segment, like scripts/assets/lib.mjs. */
export function publicUrl(cfg, rel) {
  return `${cfg.publicBase}/${objectKey(cfg, rel).split('/').map(encodeURIComponent).join('/')}`;
}

/* ------------------------------------------------------------------------------------ client */

const CLIENT = Symbol.for('atlasnews.s3.client');

async function client(cfg) {
  const g = globalThis;
  if (!g[CLIENT]) {
    const { S3Client } = await import('@aws-sdk/client-s3');
    g[CLIENT] = new S3Client({
      region: cfg.region,
      ...(cfg.endpoint ? { endpoint: cfg.endpoint, forcePathStyle: true } : {}),
      maxAttempts: 3,
    });
  }
  return g[CLIENT];
}

export class StorageError extends Error {
  constructor(message, code, status) {
    super(message);
    this.name = 'StorageError';
    this.code = code;
    this.status = status;
  }
}

/** Reduce an SDK error to name + HTTP status (no request ids, no signed URLs, no credentials). */
function storageError(e, what) {
  const status = e?.$metadata?.httpStatusCode;
  const code = e?.name || e?.Code || 'S3Error';
  return new StorageError(`${what} failed: ${code}${status ? ` (HTTP ${status})` : ''}`, code, status);
}

/**
 * Upload `body` to `rel` unless it already exists. Returns { key, url, created }.
 * `created: false` means the identical object was already there (verified by its sha256 metadata).
 */
export async function putIfAbsent(rel, body, { contentType, cacheControl = IMMUTABLE_CACHE } = {}) {
  const cfg = s3Config();
  if (!cfg.configured) throw new StorageError('S3 is not configured (ASSETS_S3_BUCKET / ASSETS_S3_REGION)', 'NotConfigured');
  const Key = objectKey(cfg, rel);
  const sha = createHash('sha256').update(body).digest('hex');
  const { PutObjectCommand, HeadObjectCommand } = await import('@aws-sdk/client-s3');
  const s3 = await client(cfg);
  try {
    await s3.send(new PutObjectCommand({
      Bucket: cfg.bucket,
      Key,
      Body: body,
      ContentLength: body.length,
      ContentType: contentType,
      CacheControl: cacheControl,
      ChecksumSHA256: Buffer.from(sha, 'hex').toString('base64'),
      Metadata: { sha256: sha },
      IfNoneMatch: '*',
    }));
    return { key: Key, url: publicUrl(cfg, rel), created: true, sha256: sha };
  } catch (e) {
    const status = e?.$metadata?.httpStatusCode;
    if (status === 412 || e?.name === 'PreconditionFailed') {
      /* already there — confirm it is the same content rather than silently trusting the key */
      try {
        const head = await s3.send(new HeadObjectCommand({ Bucket: cfg.bucket, Key }));
        if (head.Metadata?.sha256 === sha) return { key: Key, url: publicUrl(cfg, rel), created: false, sha256: sha };
      } catch (h) {
        throw storageError(h, 'HeadObject');
      }
      throw new StorageError(`an object with different content already exists at ${Key}; nothing was overwritten`, 'KeyConflict', 409);
    }
    throw storageError(e, 'PutObject');
  }
}

/** Fetch a stored object over its PUBLIC URL (what visitors use) and confirm size + checksum. */
export async function verifyPublic(rel, expectedSha256) {
  const cfg = s3Config();
  const url = publicUrl(cfg, rel);
  const res = await fetch(url, { cache: 'no-store' });
  const buf = Buffer.from(await res.arrayBuffer());
  const sha = createHash('sha256').update(buf).digest('hex');
  return {
    url,
    status: res.status,
    contentType: res.headers.get('content-type'),
    cacheControl: res.headers.get('cache-control'),
    bytes: buf.length,
    checksumMatches: expectedSha256 ? sha === expectedSha256 : null,
  };
}
