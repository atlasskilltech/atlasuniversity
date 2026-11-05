import { permanentRedirect, redirect } from 'next/navigation';

/*
 * /schools/isme/blog — reference/schools/isme/blog/index.php's SEO guard, as on
 * /schools/isdi/blog: an old `?slug=X` URL is sent permanently to the clean
 * /schools/isme/blog/X (the reference's 301), and the bare path, which upstream renders
 * nothing useful for, goes to the Thought Leadership listing that holds the posts.
 */
export default async function ISMEBlogIndex({ searchParams }) {
  const sp = (await searchParams) || {};
  const slug = typeof sp.slug === 'string' ? sp.slug.trim() : '';
  if (slug) permanentRedirect(`/schools/isme/blog/${encodeURIComponent(slug)}`);
  redirect('/schools/isme/thought-leaderships');
}
