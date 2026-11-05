import { redirect, permanentRedirect } from 'next/navigation';

/*
 * /atlas-blog (no slug) — ref reference/schools/isdi/blog/index.php's SEO guard, ATLAS side.
 *
 * The reference 301s a legacy `?slug=` query to the clean URL `/atlas-blog/{slug}`, and with no
 * slug prints "No blog selected". Reproduced as: `?slug=` → a permanent (308) redirect to the clean
 * detail URL; a bare visit → the ATLAS Thought-Leadership listing `/thought-leaderships` (the blog
 * index, more useful than the reference's bare message).
 */
export default async function ATLASBlogIndex({ searchParams }) {
  const sp = (await searchParams) || {};
  const slug = typeof sp.slug === 'string' ? sp.slug.trim() : '';
  if (slug) {
    permanentRedirect(`/atlas-blog/${encodeURIComponent(slug)}`);
  }
  redirect('/thought-leaderships');
}
