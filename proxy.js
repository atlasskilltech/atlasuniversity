import { NextResponse } from 'next/server';
import { COLD_TTL, dbAvailable, isGood } from './lib/news/public/health.js';
import { OUTAGE_HTML, outageResponseInit } from './lib/news/public/outage.js';

/**
 * Request proxy (Next.js 16; always the Node.js runtime). It touches ONLY the public ATLAS News pages
 * (the matcher below); /news/admin and every other route of the site pass straight through.
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
export async function proxy(request) {
  const { pathname } = request.nextUrl;
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
 * /news/admin (pages AND APIs) is excluded HERE, not only by the early return above: whenever a proxy
 * matches a request, Next.js prepares that request's body for it, which would defeat the upload route's
 * "refuse an oversized upload before reading the body" protection. Admin requests must never reach it.
 */
export const config = {
  matcher: ['/news', '/news/((?!admin(?:/|$)).*)'],
};
