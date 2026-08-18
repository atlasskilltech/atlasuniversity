import 'server-only';

import { get } from 'node:https';

/**
 * A plain HTTPS GET — deliberately NOT the global `fetch`.
 *
 * Two reasons, both of which matter here:
 *
 * 1. **The homepage must stay static.** Next patches global `fetch`, and a
 *    `cache: 'no-store'` fetch inside a server component opts the whole route
 *    out of static rendering — the build flips `/` from `○ Static, Revalidate
 *    15m` to `ƒ Dynamic` and every visitor re-renders all 18 sections. This call
 *    is invisible to that machinery, so the page is prerendered and refreshed by
 *    ISR on the 900s window instead.
 * 2. **The token must not be written to disk by the framework.** The alternative
 *    fix — letting Next cache the fetch — would store the request URL and the
 *    response in `.next/cache`, and both carry the access token (Graph puts it in
 *    the query string, and `paging.next` echoes it back). Staying out of the Data
 *    Cache keeps `.next` free of credentials.
 *
 * Returns the raw body so the caller can parse JSON or write image bytes.
 * Never throws with the URL in the message — that URL contains the token.
 */
export function httpGet(url, { timeoutMs = 20000, redirects = 3 } = {}) {
  return new Promise((resolve, reject) => {
    const request = get(String(url), (response) => {
      const status = response.statusCode ?? 0;

      /* Meta's CDN sometimes 302s to a regional host. */
      if (status >= 300 && status < 400 && response.headers.location && redirects > 0) {
        response.resume();
        httpGet(new URL(response.headers.location, url), { timeoutMs, redirects: redirects - 1 })
          .then(resolve, reject);
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve({ status, body: Buffer.concat(chunks) }));
      response.on('error', () => reject(new Error('response-error')));
    });

    request.on('error', () => reject(new Error('request-error')));
    request.setTimeout(timeoutMs, () => request.destroy(new Error('timeout')));
  });
}
