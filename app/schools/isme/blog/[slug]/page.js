import Link from 'next/link';
import BlogArticle from '@/components/Schools/ISDI/Blog/BlogArticle';
import { getBlogBySlug } from '@/lib/schools/isdi/blog/api';

/*
 * /schools/isme/blog/[slug] — reference/schools/isme/blog/index.php, the ISME blog DETAIL page. That
 * template is byte-for-byte the ISDI one with the school key swapped: it reads the slug from the clean
 * URL, curls `atlas-blogs/by-slug/{slug}`, and renders the blog only when `school === 'isme'` and
 * `status === 'published'`, tinted with ISME's colour ($schoolConfig['isme'] = #07F6A0). So this route
 * reuses the same live integration and component as /schools/isdi/blog/[slug] and /atlas-blog/[slug]:
 * `getBlogBySlug(slug, 'isme')` and `BlogArticle` with the ISME accent. Four states — article, not
 * found, error, loading (loading.js). The listing is /schools/isme/thought-leaderships, whose cards
 * link here.
 */

const SITE = 'ATLAS SKILLTECH UNIVERSITY';
const ACCENT = '#07F6A0'; // ref $schoolConfig['isme']['color']
const SCHOOL = 'isme';
const LISTING = '/schools/isme/thought-leaderships';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug, SCHOOL);
  if (result.status !== 'ok') {
    return { title: 'Blog not found', robots: { index: false } };
  }
  const meta = result.blog.meta || {};
  const title = meta.title || result.blog.title || 'ISME Blog';
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

export default async function ISMEBlogDetailPage({ params }) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug, SCHOOL);

  if (result.status === 'error') {
    return (
      <main className="bg-white font-sans [--font-manrope:'Manrope']">
        <StateScreen heading="Something went wrong">
          <p className="mb-6">
            We couldn&apos;t load this article right now. Please try again in a moment.
          </p>
          <Link href={LISTING} className="font-bold text-[#07F6A0] hover:underline">
            Back to Thought Leadership
          </Link>
        </StateScreen>
      </main>
    );
  }

  if (result.status !== 'ok') {
    return (
      <main className="bg-white font-sans [--font-manrope:'Manrope']">
        <StateScreen heading="Blog not found">
          <p className="mb-6">This article doesn&apos;t exist or isn&apos;t published yet.</p>
          <Link href={LISTING} className="font-bold text-[#07F6A0] hover:underline">
            Browse Thought Leadership
          </Link>
        </StateScreen>
      </main>
    );
  }

  const schema = result.blog.schema_data || {};
  const ld = ['article', 'faq', 'howto'].map((k) => schema[k]).filter(Boolean);

  return (
    /* The template includes the ROOT assets/include/header.php, whose font loader has no Manrope 400 face,
       so production renders the article copy with the 500 face — the ATLAS `Manrope` family, not the ISME
       one this layout sets (measured: a body paragraph 440px tall on production, 400 with 'Manrope ISME') */
    <main className="font-sans [--font-manrope:'Manrope']">
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
