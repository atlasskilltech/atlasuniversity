import Link from 'next/link';
import BlogArticle from '@/components/Schools/ISDI/Blog/BlogArticle';
import { getBlogBySlug } from '@/lib/schools/isdi/blog/api';

/*
 * The School of Law / uGDX blog DETAIL pages — reference/law/blog/index.php and
 * reference/ugdx/blog/index.php, which are byte-identical to the ISDI template
 * (reference/schools/isdi/blog/index.php): read the slug from the URL, curl
 * `api/atlas-blogs/by-slug/{slug}`, and render it only when `school` matches the URL's school and
 * `status === 'published'`. The same live integration and the same `BlogArticle` as /atlas-blog and
 * /schools/isdi/blog, tinted with the school's `$schoolConfig` colour (law #CB5827, ugdx #EB1F3C).
 * The listings are /schools/<school>/thought-leaderships.
 *
 * As on the other blog routes, the article's own hero and inline images are the CMS's public, stable
 * URLs returned by the API — the one documented runtime-remote-image exception in the port.
 */
export const SCHOOL_BLOG = {
  law: { accent: '#CB5827', listing: '/schools/law/thought-leaderships', name: 'ATLAS School of Law' },
  ugdx: { accent: '#EB1F3C', listing: '/schools/ugdx/thought-leaderships', name: 'ATLAS uGDX' },
};

export async function blogMetadata(school, slug) {
  const result = await getBlogBySlug(slug, school);
  if (result.status !== 'ok') return { title: 'Blog not found', robots: { index: false } };
  const meta = result.blog.meta || {};
  const title = meta.title || result.blog.title || `${SCHOOL_BLOG[school].name} Blog`;
  const description = meta.description || '';
  return {
    title,
    description,
    keywords: meta.keywords || undefined,
    alternates: { canonical: result.blog.link || undefined },
    openGraph: {
      siteName: 'ATLAS SKILLTECH UNIVERSITY',
      title,
      description,
      type: 'article',
      images: result.blog.hero?.desktop ? [result.blog.hero.desktop] : undefined,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function StateScreen({ heading, children }) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 text-center">
      <h1 className="mb-4 text-[38px] font-semibold leading-tight text-gray-800 max-md:text-[28px]">{heading}</h1>
      <div className="text-[18px] font-light text-gray-500">{children}</div>
    </section>
  );
}

export default async function BlogDetail({ school, slug }) {
  const cfg = SCHOOL_BLOG[school];
  const result = await getBlogBySlug(slug, school);
  if (result.status !== 'ok') {
    const error = result.status === 'error';
    return (
      <main className="bg-white">
        <StateScreen heading={error ? 'Something went wrong' : 'Blog not found'}>
          <p className="mb-6">
            {error
              ? "We couldn't load this article right now. Please try again in a moment."
              : "This article doesn't exist or isn't published yet."}
          </p>
          <Link href={cfg.listing} className="font-bold hover:underline" style={{ color: cfg.accent }}>
            {error ? 'Back to Thought Leadership' : 'Browse Thought Leadership'}
          </Link>
        </StateScreen>
      </main>
    );
  }
  const schema = result.blog.schema_data || {};
  const ld = ['article', 'faq', 'howto'].map((k) => schema[k]).filter(Boolean);
  return (
    <main>
      {ld.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <BlogArticle blog={result.blog} accent={cfg.accent} breadcrumbHref={cfg.listing} />
    </main>
  );
}
