import { fail, json, requireAdminApi } from '@/lib/news/auth/admin';
import { BodyError, parseMultipart, readBodyLimited } from '@/lib/news/http/body';
import { LimiterBusy, mediaLimiter } from '@/lib/news/http/limiter';
import { ImageRejected, MAX_UPLOAD_BYTES } from '@/lib/news/media/images';
import { uploadImage } from '@/lib/news/media/service';
import { StorageError } from '@/lib/news/storage/s3';
import { cmsRoute } from '@/lib/news/cms/http';
import { listMedia } from '@/lib/news/cms/media';
import { listParams } from '@/lib/news/cms/validate';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/* multipart overhead allowance on top of the file limit */
const MAX_REQUEST = MAX_UPLOAD_BYTES + 256 * 1024;
const TOO_LARGE = `Images must be ${MAX_UPLOAD_BYTES / 1024 / 1024} MB or smaller.`;

/** GET ?q&page&pageSize — the library, newest first (images removed from the library are excluded). */
export const GET = cmsRoute(async (request) => {
  const { page, pageSize, q } = listParams(new URL(request.url).searchParams, { maxPageSize: 60, defaultPageSize: 30 });
  return json(await listMedia({ page, pageSize, q }));
});

/**
 * POST multipart/form-data { file, alt?, caption? } → the stored media record (admin only).
 *
 * Resource limits, in order — nothing large is buffered before all of them pass:
 *   1. session + same-origin check;
 *   2. Content-Length must be present and ≤ MAX_REQUEST (chunked uploads are refused with 411);
 *   3. a slot in the process-wide media limiter (2 running, 4 queued; otherwise 503 + Retry-After) —
 *      taken BEFORE the body is read, so concurrent uploads cannot multiply buffered bytes;
 *   4. the body is streamed with a hard byte cap (whatever the header claimed);
 * then the file is validated by its bytes, re-encoded to WebP renditions (EXIF/GPS stripped) and stored
 * in S3 under assets/news/media/; only keys and metadata are written to atlasnews_media.
 */
export async function POST(request) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().startsWith('multipart/form-data')) {
    return fail(415, 'unsupported_media_type', 'Send the image as multipart/form-data.');
  }
  const declared = request.headers.get('content-length');
  if (declared === null || declared === '') return fail(411, 'length_required', 'The upload must declare its size (Content-Length).');
  if (!(Number(declared) <= MAX_REQUEST)) return fail(413, 'too_large', TOO_LARGE);

  let release;
  try {
    release = await mediaLimiter().acquire();
  } catch (e) {
    if (e instanceof LimiterBusy) return fail(503, 'busy', 'Too many uploads in progress. Please try again shortly.', { 'Retry-After': String(e.retryAfter) });
    throw e;
  }

  try {
    let form;
    try {
      const body = await readBodyLimited(request, MAX_REQUEST, { requireLength: true });
      form = await parseMultipart(body, contentType);
    } catch (e) {
      if (e instanceof BodyError) return fail(e.status, e.code, e.status === 413 ? TOO_LARGE : e.message);
      return fail(400, 'bad_request', 'Could not read the upload.');
    }
    const file = form.get('file');
    if (!file || typeof file === 'string') return fail(400, 'bad_request', 'No file was sent.');
    if (file.size > MAX_UPLOAD_BYTES) return fail(413, 'too_large', TOO_LARGE);

    try {
      const result = await uploadImage({
        buffer: Buffer.from(await file.arrayBuffer()),
        filename: file.name,
        declaredMime: file.type || undefined,
        alt: form.get('alt'),
        caption: form.get('caption'),
      });
      return json(result, result.deduplicated ? 200 : 201);
    } catch (e) {
      if (e instanceof ImageRejected) return fail(422, e.code, e.message);
      if (e instanceof StorageError) return fail(502, 'storage_error', 'The image could not be stored.', { 'X-News-Error': String(e.code) });
      return fail(503, 'unavailable', 'The upload could not be completed.', { 'X-News-Error': String(e.code || 'error') });
    }
  } finally {
    release();
  }
}
