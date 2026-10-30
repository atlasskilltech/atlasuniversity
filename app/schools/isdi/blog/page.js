import { redirect, permanentRedirect } from 'next/navigation';

/*
 * /schools/isdi/blog (no slug) — ref reference/schools/isdi/blog/index.php's SEO guard.
 *
 * The reference does two things here: (1) if the legacy `?slug=` query is present it 301s to
 * the clean URL `/schools/isdi/blog/{slug}`, and (2) with no slug it prints "No blog selected".
 * Reproduced as: `?slug=` → a permanent (308) redirect to the clean detail URL, matching the
 * reference's permanent 301 intent; and a bare visit → the blog index, which in this port is
 * the Thought Leadership listing at /schools/isdi/thought-leaderships (a more useful landing
 * than the reference's bare message, and the page that actually lists the blogs).
 */
export default async function ISDIBlogIndex({ searchParams }) {
  const sp = (await searchParams) || {};
  const slug = typeof sp.slug === 'string' ? sp.slug.trim() : '';
  if (slug) {
    permanentRedirect(`/schools/isdi/blog/${encodeURIComponent(slug)}`);
  }
  redirect('/schools/isdi/thought-leaderships');
}
