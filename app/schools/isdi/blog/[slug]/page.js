import Link from 'next/link';
import BlogArticle from '@/components/Schools/ISDI/Blog/BlogArticle';
import { getBlogBySlug } from '@/lib/schools/isdi/blog/api';

/*
 * /schools/isdi/blog/[slug] — reference/schools/isdi/blog/index.php, the blog DETAIL page.
 *
 * Live, API-driven: it fetches the published ISDI blog for the slug from the same
 * `atlas-blogs/by-slug` endpoint the reference curls (see lib/schools/isdi/blog/api.js),
 * and renders four states — valid (the article), not found (unknown / unpublished /
 * wrong-school slug, the reference's "Blog not found"), error (API unreachable / malformed),
 * and loading (loading.js, shown while the server component streams). The listing lives at
 * /schools/isdi/thought-leaderships; the `?slug=` → clean-URL redirect lives on the bare
 * /schools/isdi/blog route.
 *
 * The route is dynamic (open-ended slugs), and the fetch revalidates every 15 min, so the
 * detail stays fresh without being frozen into the build.
 */

const SITE = 'ATLAS SKILLTECH UNIVERSITY';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);
  if (result.status !== 'ok') {
    return { title: 'Blog not found', robots: { index: false } };
  }
  const meta = result.blog.meta || {};
  const title = meta.title || result.blog.title || 'ISDI Blog';
  const description = meta.description || '';
  return {
    title,
    description,
    keywords: meta.keywords || undefined,
    alternates: { canonical: result.blog.link || undefined },
    openGraph: {
      siteName: SITE,
      title,
      description,
      type: 'article',
      images: result.blog.hero?.desktop ? [result.blog.hero.desktop] : undefined,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/* ref the per-school <style>: title 38/28, article-details 20/16 — reused by the state screens */
function StateScreen({ heading, children }) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 text-center">
      <h1 className="mb-4 text-[38px] font-semibold leading-tight text-gray-800 max-md:text-[28px]">
        {heading}
      </h1>
      <div className="text-[18px] font-light text-gray-500">{children}</div>
    </section>
  );
}

export default async function ISDIBlogDetailPage({ params }) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);

  if (result.status === 'error') {
    return (
      <main className="bg-white">
        <StateScreen heading="Something went wrong">
          <p className="mb-6">
            We couldn&apos;t load this article right now. Please try again in a moment.
          </p>
          <Link
            href="/schools/isdi/thought-leaderships"
            className="font-bold text-[#EC1376] hover:underline"
          >
            Back to Thought Leadership
          </Link>
        </StateScreen>
      </main>
    );
  }

  if (result.status !== 'ok') {
    return (
      <main className="bg-white">
        <StateScreen heading="Blog not found">
          <p className="mb-6">
            This article doesn&apos;t exist or isn&apos;t published yet.
          </p>
          <Link
            href="/schools/isdi/thought-leaderships"
            className="font-bold text-[#EC1376] hover:underline"
          >
            Browse Thought Leadership
          </Link>
        </StateScreen>
      </main>
    );
  }

  const schema = result.blog.schema_data || {};
  const ld = ['article', 'faq', 'howto']
    .map((k) => schema[k])
    .filter(Boolean);

  return (
    <main>
      {ld.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
      <BlogArticle blog={result.blog} />
    </main>
  );
}
