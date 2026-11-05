import { redirect, permanentRedirect } from 'next/navigation';

/*
 * /schools/ugdx/blog (no slug) — ref reference/ugdx/blog/index.php's SEO guard.
 *
 * The reference does two things here: (1) if the legacy `?slug=` query is present it 301s to
 * the clean URL `/schools/ugdx/blog/{slug}`, and (2) with no slug it prints "No blog selected".
 * Reproduced as: `?slug=` → a permanent (308) redirect to the clean detail URL, matching the
 * reference's permanent 301 intent; and a bare visit → the blog index, which in this port is
 * the Thought Leadership listing at /schools/ugdx/thought-leaderships (a more useful landing
 * than the reference's bare message, and the page that actually lists the blogs).
 */
export default async function BlogIndex({ searchParams }) {
  const sp = (await searchParams) || {};
  const slug = typeof sp.slug === 'string' ? sp.slug.trim() : '';
  if (slug) {
    permanentRedirect(`/schools/ugdx/blog/${encodeURIComponent(slug)}`);
  }
  redirect('/schools/ugdx/thought-leaderships');
}
