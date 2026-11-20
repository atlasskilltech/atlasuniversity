import { NextResponse } from 'next/server';
import { COLD_TTL, dbAvailable, isGood } from './lib/news/public/health.js';
import { OUTAGE_HTML, outageResponseInit } from './lib/news/public/outage.js';

/**
 * Request proxy (Next.js 16; always the Node.js runtime). It touches ONLY the public ATLAS News pages
 * (the matcher below); the admin (/admin, News admin at /admin/news) and every other route of the site
 * pass straight through. The old /news/admin paths are 308-redirected to /admin/news by next.config.mjs.
 *
 * Purpose: a proper HTTP 503 when the News database is unavailable. An App Router page cannot choose
 * its status (an error becomes a 500, and its error boundary is drawn only in the browser), so the
 * decision is taken here, before rendering:
 *   database up (the normal case)         → continue; the cost is one cached health lookup (a fresh
 *                                            `SELECT 1` only for a page this process has not served yet)
 *   database down, page served before     → continue: the page renders from the data cache
 *                                            (last-known-good), HTTP 200
 *   database down, nothing cached         → HTTP 503 + Retry-After with a self-contained, server-rendered
 *                                            News page (no JavaScript needed, no cause disclosed)
 */
/*
 * TEMPORARY HACKATHON-ONLY MODE (2026-11-20). While ON, every page except the admin and the ATLAS
 * Hackathon 2026 site is 307-redirected to /atlas-hackathon-2026. Nothing is deleted — every route is
 * still built. TO UNDO: set HACKATHON_ONLY to false and redeploy.
 */
const HACKATHON_ONLY = true;
const HACKATHON = '/atlas-hackathon-2026';
const HACKATHON_ALLOWED = [HACKATHON, '/admin', '/auth/callback', '/assets', '/wordpress-custom-image'];

function hackathonRedirect(request) {
  const { pathname } = request.nextUrl;
  if (HACKATHON_ALLOWED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  // Static files (favicon.ico, robots.txt, images…) pass; old .php / .html page URLs do not.
  if (/\.[a-z0-9]+$/i.test(pathname) && !/\.(php|html?)$/i.test(pathname)) return null;
  const url = request.nextUrl.clone();
  url.pathname = HACKATHON;
  url.search = '';
  return NextResponse.redirect(url, 307);
}

function isNews(pathname) {
  return pathname === '/news' || (pathname.startsWith('/news/') && !/^\/news\/admin(\/|$)/.test(pathname));
}

export async function proxy(request) {
  if (HACKATHON_ONLY) {
    const redirect = hackathonRedirect(request);
    if (redirect) return redirect;
  }
  const { pathname } = request.nextUrl;
  if (!isNews(pathname)) return NextResponse.next();
  if (pathname === '/news/admin' || pathname.startsWith('/news/admin/')) return NextResponse.next();
  if (request.method !== 'GET' && request.method !== 'HEAD') return NextResponse.next();
  /* a page served before can always fall back to its cached copy, so a cached health result is enough;
     a page never served needs the database, so it gets a fresh check (at most COLD_TTL old) */
  const good = isGood(pathname);
  if (await dbAvailable(Date.now(), good ? null : COLD_TTL)) return NextResponse.next();
  if (good) return NextResponse.next();
  return new NextResponse(request.method === 'HEAD' ? null : OUTAGE_HTML, outageResponseInit());
}

/*
 * The admin (pages AND APIs, now at /admin/news) must never be matched: whenever a proxy matches a
 * request, Next.js prepares that request's body for it, which would defeat the upload route's "refuse an
 * oversized upload before reading the body" protection. /admin is outside this matcher; the legacy
 * /news/admin paths stay excluded too, so a stale request is only ever redirected, never body-buffered.
 */
export const config = {
  /* With HACKATHON_ONLY on, every path except /admin (see above) and Next's own files is matched; the
     News logic still runs only for the paths isNews() accepts. With it off, put back
     ['/news', '/news/((?!admin(?:/|$)).*)'] to match only the News pages again. */
  matcher: ['/((?!_next/|admin(?:/|$)).*)'],
};
