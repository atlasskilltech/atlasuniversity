import { NextResponse } from 'next/server';

/**
 * TEMPORARY SITE LOCKDOWN (2026-11-20).
 *
 * While ON, every page except the admin and the ATLAS Hackathon 2026 site is
 * redirected to /atlas-hackathon-2026. Nothing is deleted — every route is still
 * built and will come back exactly as it was.
 *
 * TO UNDO: set HACKATHON_ONLY to false (or delete this file, proxy.js) and redeploy.
 */
const HACKATHON_ONLY = true;

const TARGET = '/atlas-hackathon-2026';

/* Path prefixes that keep working while the lockdown is on. */
const ALLOWED = [
  TARGET, //            the hackathon site, its register / success pages and form action
  '/admin', //          every admin tool and its APIs
  '/auth/callback', //  Google sign-in for the admin
  '/assets', //         images, fonts and icons the two allowed sites use
  '/wordpress-custom-image', // legacy uploads rewritten to S3
];

function allowed(pathname) {
  return ALLOWED.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function proxy(request) {
  if (!HACKATHON_ONLY) return NextResponse.next();
  const { pathname } = request.nextUrl;
  if (allowed(pathname)) return NextResponse.next();
  // Static files (favicon.ico, robots.txt, images…) pass; old .php / .html page URLs do not.
  if (/\.[a-z0-9]+$/i.test(pathname) && !/\.(php|html?)$/i.test(pathname)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = TARGET;
  url.search = '';
  // 307 (temporary) so browsers and search engines do not cache it as permanent.
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Skip Next's own files.
  matcher: ['/((?!_next/).*)'],
};
