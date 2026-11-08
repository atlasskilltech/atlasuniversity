/**
 * ATLAS News — the client IP used for login rate limiting.
 *
 * TRUST MODEL — read before changing the proxy setup in front of the app.
 *
 * Next.js route handlers do not expose the TCP peer address, so the client IP can only come from a
 * header that a proxy in front of Next sets. `X-Forwarded-For` is a list: "client, proxy1, proxy2, …".
 * The LEFTMOST entries are whatever the client sent and can be forged freely; an entry is trustworthy
 * only if one of OUR proxies appended it. Each proxy that appends (nginx `proxy_add_x_forwarded_for`,
 * AWS ALB, …) adds the address it received the connection from at the RIGHT-hand end.
 *
 * So the client is taken as the entry NEWS_TRUSTED_PROXY_HOPS positions from the right (default 1 = the
 * last entry, i.e. the address our nearest proxy saw), never the leftmost one. (The shared helper in
 * lib/search/rateLimit.js takes the leftmost entry; it is left unchanged for /api/search, which does not
 * guard credentials.)
 *
 * Required proxy behaviour for this to be correct (documented, NOT configured by this code):
 *   - exactly NEWS_TRUSTED_PROXY_HOPS proxies, each APPENDING to X-Forwarded-For (or overwriting it with
 *     the real peer address), sit between the internet and `next start`;
 *   - `next start` is not reachable directly from the internet (otherwise a client can send any header);
 *   - with Cloudflare in front of nginx, either set NEWS_TRUSTED_PROXY_HOPS=2, or have nginx restore the
 *     visitor address (real_ip module from CF-Connecting-IP) — otherwise every visitor appears as a
 *     Cloudflare edge IP and the per-IP limit becomes per-edge (the global limit still applies).
 * If no proxy appends at all, the header is entirely client-controlled: the per-IP limit can then be
 * evaded, but the GLOBAL failed-login ceiling (lib/news/auth/rateLimit.js) still caps guessing.
 * `X-Real-IP` is used only when X-Forwarded-For is absent.
 */
const IP_RE = /^[0-9a-fA-F:.]{2,45}$/;

export function trustedHops(env = process.env) {
  const n = Number.parseInt(String(env.NEWS_TRUSTED_PROXY_HOPS ?? ''), 10);
  return Number.isFinite(n) && n >= 1 && n <= 5 ? n : 1;
}

export function newsClientIp(request, env = process.env) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean);
    const hops = trustedHops(env);
    /* fewer entries than trusted hops: use the leftmost we have (the best available) */
    const pick = parts.length >= hops ? parts[parts.length - hops] : parts[0];
    if (pick && IP_RE.test(pick)) return pick;
    return 'invalid';
  }
  const real = (request.headers.get('x-real-ip') || '').trim();
  return real && IP_RE.test(real) ? real : 'unknown';
}
