import { headers } from 'next/headers';

/**
 * /robots.txt, decided per host.
 *
 * The live domain (atlasuniversity.edu.in, with or without www) allows crawling, as it did before this
 * file existed (no robots.txt means everything is allowed). Every other host — test and preview
 * deployments, localhost — disallows everything, so search engines stay off the test site.
 * next.config.mjs sends `X-Robots-Tag: noindex, nofollow` on those hosts too.
 */
const LIVE_HOST = /^(www\.)?atlasuniversity\.edu\.in$/i;

export default async function robots() {
  const host = ((await headers()).get('host') || '').split(':')[0];
  if (LIVE_HOST.test(host)) return { rules: { userAgent: '*', allow: '/' } };
  return { rules: { userAgent: '*', disallow: '/' } };
}
