import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogArticle from '@/components/Schools/ISDI/Blog/BlogArticle';
import { getBlogBySlug } from '@/lib/schools/isdi/blog/api';

/*
 * /atlas-blog/[slug] — the ATLAS main blog DETAIL page. The reference blog template
 * (reference/schools/isdi/blog/index.php) is school-agnostic: it validates the fetched blog
 * against the URL's school context, serving ATLAS posts when `$parts[0] === 'atlas-blog'`. This
 * route reuses the same live integration the ISDI blog uses — `getBlogBySlug(slug, 'atlas')` hits
 * `api/atlas-blogs/by-slug/{slug}` and requires `school === 'atlas'` + `status === 'published'` —
 * and the same `BlogArticle`, tinted with the ATLAS teal accent (ref $schoolConfig['atlas'] =
 * #6EC1C2). The listing is `/thought-leaderships`.
 */

const SITE = 'ATLAS SKILLTECH UNIVERSITY';
const ACCENT = '#6EC1C2';
const SCHOOL = 'atlas';
const LISTING = '/thought-leaderships';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug, SCHOOL);
  if (result.status !== 'ok') {
    return { title: 'Blog not found', robots: { index: false } };
  }
  const meta = result.blog.meta || {};
  const title = meta.title || result.blog.title || 'ATLAS Blog';
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

export default async function ATLASBlogDetailPage({ params }) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug, SCHOOL);

  if (result.status === 'error') {
    return (
      <main className="bg-white">
        <StateScreen heading="Something went wrong">
          <p className="mb-6">
            We couldn&apos;t load this article right now. Please try again in a moment.
          </p>
          <Link href={LISTING} className="font-bold text-[#6EC1C2] hover:underline">
            Back to Thought Leadership
          </Link>
        </StateScreen>
      </main>
    );
  }

  // Unknown / unpublished / deleted / other-school slug -> HTTP 404 (./not-found.js).
  if (result.status !== 'ok') notFound();

  const schema = result.blog.schema_data || {};
  const ld = ['article', 'faq', 'howto'].map((k) => schema[k]).filter(Boolean);

  return (
    <main>
      {ld.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
      <BlogArticle blog={result.blog} accent={ACCENT} breadcrumbHref={LISTING} />
    </main>
  );
}
