import 'server-only';

/**
 * ATLAS News CMS — the glue every admin CMS route uses.
 *
 *   cmsRoute(handler, { write })  — authentication (requireAdminApi: session, HTTPS, same-origin on
 *                                   writes), then the handler; a CmsError becomes its status + message +
 *                                   field errors; ANY other error becomes a 503 carrying only an error code.
 *   readJson(request)             — a JSON body read with a hard byte cap (the article body allows 2 MB).
 *   revalidateNews()              — refresh every public News page after a change (immediate updates;
 *                                   the public pages also re-check on their own at least every 60 s).
 */
import { revalidatePath, revalidateTag } from 'next/cache';
import { NEWS_PUBLIC_TAG } from '../public/repository.js';
import { fail, json, requireAdminApi } from '../auth/admin.js';
import { BodyError, readBodyLimited } from '../http/body.js';
import { CmsError } from './errors.js';
import { MAX_CONTENT_BYTES, toId } from './validate.js';

/* the article body plus every other field, with room to spare */
export const MAX_JSON_BYTES = MAX_CONTENT_BYTES + 256 * 1024;

export async function readJson(request, maxBytes = MAX_JSON_BYTES) {
  const type = (request.headers.get('content-type') || '').toLowerCase();
  if (!type.startsWith('application/json')) throw new CmsError(415, 'unsupported_media_type', 'Send JSON (Content-Type: application/json).');
  let buf;
  try {
    buf = await readBodyLimited(request, maxBytes);
  } catch (e) {
    if (e instanceof BodyError) throw new CmsError(e.status, e.code, e.status === 413 ? 'The request is too large.' : 'Could not read the request.');
    throw new CmsError(400, 'bad_request', 'Could not read the request.');
  }
  try {
    return JSON.parse(buf.toString('utf8'));
  } catch {
    throw new CmsError(400, 'bad_json', 'The request is not valid JSON.');
  }
}

/** Route param → positive integer id, or a 404 (an id that cannot exist is simply not found). */
export function idParam(raw) {
  const id = toId(raw);
  if (!id || Number.isNaN(id)) throw new CmsError(404, 'not_found', 'Not found.');
  return id;
}

/**
 * After any admin write: expire every cached public News query NOW (`expire: 0` — the next request reads
 * MySQL, it is not served stale first), then the rendered /news routes. One tag covers the whole public
 * read model, so a change can never leave a dependent page (homepage, category, related stories) stale.
 */
export function revalidateNews() {
  try {
    revalidateTag(NEWS_PUBLIC_TAG, { expire: 0 });
    revalidatePath('/news', 'layout');
  } catch {
    /* outside a request (tests) there is nothing to revalidate */
  }
}

/**
 * Wrap a route handler: `export const GET = cmsRoute(async (request, ctx) => json(...))`.
 * Writes (`write: true`, the default for non-GET) also call revalidateNews() after a 2xx response.
 */
export function cmsRoute(handler) {
  return async (request, ctx) => {
    const auth = await requireAdminApi(request);
    if (auth.response) return auth.response;
    try {
      const params = ctx?.params ? await ctx.params : {};
      const res = await handler(request, { params, session: auth.session });
      if (!['GET', 'HEAD'].includes(request.method) && res.status < 300) revalidateNews();
      return res;
    } catch (e) {
      if (e instanceof CmsError) {
        const body = { error: e.message, code: e.code };
        if (e.fields) body.fields = e.fields;
        if (e.usage) body.usage = e.usage;
        return json(body, e.status);
      }
      /* never echo SQL, a stack or server detail: only the error code, for the server log and support */
      console.error(`[news] cms ${request.method} ${new URL(request.url).pathname} failed: ${e?.code || e?.name || 'error'}`);
      return fail(503, 'unavailable', 'The request could not be completed. Please try again.', { 'X-News-Error': String(e?.code || 'error') });
    }
  };
}

export { json };
