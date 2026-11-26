import 'server-only';
import { s3Config } from '@/lib/news/storage/s3';

/**
 * ATLAS Admin — S3 Drive: browse, upload to, and delete from the site's S3 bucket (atlas-web-cdn).
 *
 * Same bucket, region and credentials as `npm run assets:sync` and the News media library
 * (AWS_S3_BUCKET / AWS_S3_REGION, credentials from the AWS SDK's default chain — AWS_ACCESS_KEY_ID /
 * AWS_SECRET_ACCESS_KEY in the server's .env).
 *
 * Uploads never pass through this server: the API hands the browser a presigned PUT URL valid for a few
 * minutes, and the browser sends the file straight to S3 (so large videos are not limited by nginx or
 * held in memory here). That needs a CORS rule on the bucket allowing PUT from the admin's origin.
 *
 * Paths here are bucket keys, without any ASSETS_S3_PREFIX: this is a view of the whole bucket.
 */

export const MAX_KEY = 1024;

/**
 * Deleting is switched OFF for everyone, admins included (owner's decision, 2026-11-19). While false:
 * the API refuses delete / delete-folder, the UI shows no Delete buttons, and an upload may not replace
 * an existing file (overwriting is deleting the old version). Set to true to bring all three back.
 */
export const ALLOW_DELETE = false;

/** A file key ('a/b.png') or a folder prefix ('a/b/', '' for the root). Throws on anything unsafe. */
export function cleanKey(raw, { folder = false } = {}) {
  let k = String(raw ?? '').replace(/\\/g, '/').replace(/^\/+/, '');
  if (folder && k && !k.endsWith('/')) k += '/';
  if (k.length > MAX_KEY) throw new DriveError('That name is too long.', 'bad_key');
  const parts = k.split('/');
  const body = folder ? parts.slice(0, -1) : parts;
  if (!folder && !k) throw new DriveError('Missing file name.', 'bad_key');
  for (const p of body) {
    if (!p || p === '.' || p === '..') throw new DriveError('Names cannot be empty or "." / "..".', 'bad_key');
    if (/[\x00-\x1f\x7f]/.test(p)) throw new DriveError('Names cannot contain control characters.', 'bad_key');
  }
  return k;
}

export class DriveError extends Error {
  constructor(message, code, status = 400) {
    super(message);
    this.name = 'DriveError';
    this.code = code;
    this.status = status;
  }
}

export function driveConfig() {
  const cfg = s3Config();
  return {
    ...cfg,
    /* always the bucket's own public endpoint, so the "S3 link" really is S3 */
    s3Base: cfg.bucket && cfg.region && !cfg.endpoint ? `https://${cfg.bucket}.s3.${cfg.region}.amazonaws.com` : cfg.publicBase,
  };
}

const enc = (key) => key.split('/').map(encodeURIComponent).join('/');
export const s3Url = (cfg, key) => `${cfg.s3Base}/${enc(key)}`;

/**
 * The same file on the website's own domain, where the site serves that folder from S3
 * (next.config.mjs rewrites /wordpress-custom-image/* to the bucket). null elsewhere.
 */
export const DOMAIN_PREFIXES = ['wordpress-custom-image/'];
export const domainPath = (key) => (DOMAIN_PREFIXES.some((p) => key.startsWith(p)) ? `/${enc(key)}` : null);

const CLIENT = Symbol.for('atlas.s3drive.client');
async function client(cfg) {
  if (!globalThis[CLIENT]) {
    const { S3Client } = await import('@aws-sdk/client-s3');
    globalThis[CLIENT] = new S3Client({
      region: cfg.region,
      ...(cfg.endpoint ? { endpoint: cfg.endpoint, forcePathStyle: true } : {}),
      maxAttempts: 3,
    });
  }
  return globalThis[CLIENT];
}

function ready() {
  const cfg = driveConfig();
  if (!cfg.configured) throw new DriveError('S3 is not configured on this server (AWS_S3_BUCKET / AWS_S3_REGION).', 'not_configured', 503);
  return cfg;
}

/** Turn an AWS SDK error into a DriveError with a message an editor can act on. */
function awsError(e) {
  if (e instanceof DriveError) return e;
  const name = e?.name || e?.Code || '';
  if (name === 'AccessDenied' || e?.$metadata?.httpStatusCode === 403) {
    return new DriveError('AWS refused this action. The server\'s AWS key needs permission for it (s3:ListBucket, s3:PutObject, s3:DeleteObject).', 'access_denied', 502);
  }
  if (name === 'CredentialsProviderError' || /credential/i.test(e?.message || '')) {
    return new DriveError('The server has no AWS credentials (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY).', 'no_credentials', 503);
  }
  return new DriveError('S3 could not be reached. Please try again.', 'storage_error', 502);
}

/** One folder level: { folders: [prefix], files: [{ key, size, modified }], next } */
export async function listFolder(rawPrefix, token) {
  const cfg = ready();
  const prefix = cleanKey(rawPrefix, { folder: true });
  try {
    const { ListObjectsV2Command } = await import('@aws-sdk/client-s3');
    const r = await (await client(cfg)).send(new ListObjectsV2Command({
      Bucket: cfg.bucket, Prefix: prefix, Delimiter: '/', MaxKeys: 500, ContinuationToken: token || undefined,
    }));
    return {
      prefix,
      folders: (r.CommonPrefixes || []).map((p) => p.Prefix),
      /* the zero-byte "folder marker" a New Folder creates is the prefix itself — not a file */
      files: (r.Contents || []).filter((o) => o.Key !== prefix).map((o) => ({
        key: o.Key, size: o.Size, modified: o.LastModified ? new Date(o.LastModified).toISOString() : null,
      })),
      next: r.IsTruncated ? r.NextContinuationToken : null,
    };
  } catch (e) {
    throw awsError(e);
  }
}

/** A presigned PUT the browser uses to send one file straight to S3 (15 minutes). `overwrite: false`
 *  refuses a key that already exists (replacing a file deletes its old version). */
export async function presignUpload(rawKey, contentType, { overwrite = ALLOW_DELETE } = {}) {
  const cfg = ready();
  const key = cleanKey(rawKey);
  const type = /^[\w.+-]+\/[\w.+-]+$/.test(contentType || '') ? contentType : 'application/octet-stream';
  if (!overwrite && (await headFile(key))) {
    throw new DriveError(`"${key.split('/').pop()}" already exists in this folder. Rename the file and upload it again.`, 'exists', 409);
  }
  try {
    const { PutObjectCommand } = await import('@aws-sdk/client-s3');
    const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');
    const url = await getSignedUrl(await client(cfg), new PutObjectCommand({ Bucket: cfg.bucket, Key: key, ContentType: type }), { expiresIn: 900 });
    return { key, url, headers: { 'Content-Type': type } };
  } catch (e) {
    throw awsError(e);
  }
}

/** Size of a stored object, or null when it does not exist. */
export async function headFile(rawKey) {
  const cfg = ready();
  const key = cleanKey(rawKey);
  try {
    const { HeadObjectCommand } = await import('@aws-sdk/client-s3');
    const r = await (await client(cfg)).send(new HeadObjectCommand({ Bucket: cfg.bucket, Key: key }));
    return { key, size: r.ContentLength ?? 0 };
  } catch (e) {
    if (e?.$metadata?.httpStatusCode === 404 || e?.name === 'NotFound') return null;
    throw awsError(e);
  }
}

/** Create an empty folder (S3 has no folders: a zero-byte object named 'folder/' makes it show). */
export async function createFolder(rawPrefix) {
  const cfg = ready();
  const prefix = cleanKey(rawPrefix, { folder: true });
  if (!prefix) throw new DriveError('Give the folder a name.', 'bad_key');
  try {
    const { PutObjectCommand } = await import('@aws-sdk/client-s3');
    await (await client(cfg)).send(new PutObjectCommand({ Bucket: cfg.bucket, Key: prefix, Body: '' }));
    return prefix;
  } catch (e) {
    throw awsError(e);
  }
}

export async function deleteFile(rawKey) {
  const cfg = ready();
  const key = cleanKey(rawKey);
  try {
    const { DeleteObjectCommand } = await import('@aws-sdk/client-s3');
    await (await client(cfg)).send(new DeleteObjectCommand({ Bucket: cfg.bucket, Key: key }));
    return key;
  } catch (e) {
    throw awsError(e);
  }
}

/** Every key under a folder (for counting before a delete, and for the delete itself). */
async function allKeys(cfg, prefix) {
  const { ListObjectsV2Command } = await import('@aws-sdk/client-s3');
  const c = await client(cfg);
  const keys = [];
  let token;
  do {
    const r = await c.send(new ListObjectsV2Command({ Bucket: cfg.bucket, Prefix: prefix, ContinuationToken: token }));
    for (const o of r.Contents || []) keys.push({ key: o.Key, size: o.Size || 0 });
    token = r.IsTruncated ? r.NextContinuationToken : undefined;
  } while (token);
  return keys;
}

/** { files, bytes } inside a folder, all levels. */
export async function folderStats(rawPrefix) {
  const cfg = ready();
  const prefix = cleanKey(rawPrefix, { folder: true });
  if (!prefix) throw new DriveError('The bucket root cannot be measured or deleted.', 'bad_key');
  try {
    const keys = await allKeys(cfg, prefix);
    return { prefix, files: keys.filter((k) => k.key !== prefix).length, bytes: keys.reduce((n, k) => n + k.size, 0) };
  } catch (e) {
    throw awsError(e);
  }
}

/** Delete a folder and everything in it. Returns how many objects were removed. */
export async function deleteFolder(rawPrefix) {
  const cfg = ready();
  const prefix = cleanKey(rawPrefix, { folder: true });
  if (!prefix) throw new DriveError('The bucket root cannot be deleted.', 'bad_key');
  try {
    const { DeleteObjectsCommand } = await import('@aws-sdk/client-s3');
    const c = await client(cfg);
    const keys = await allKeys(cfg, prefix);
    let removed = 0;
    for (let i = 0; i < keys.length; i += 1000) {
      const batch = keys.slice(i, i + 1000);
      const r = await c.send(new DeleteObjectsCommand({
        Bucket: cfg.bucket, Delete: { Objects: batch.map((k) => ({ Key: k.key })), Quiet: true },
      }));
      if (r.Errors?.length) throw Object.assign(new Error('partial delete'), { name: r.Errors[0].Code });
      removed += batch.length;
    }
    return { prefix, removed };
  } catch (e) {
    throw awsError(e);
  }
}
