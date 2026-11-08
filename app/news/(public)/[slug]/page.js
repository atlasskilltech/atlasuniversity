import { notFound, permanentRedirect } from 'next/navigation';
import ArticleView from '@/components/News/Public/ArticleView';
import { findRedirect, getArticleBySlug, getIndexingEnabled, getRelatedArticles } from '@/lib/news/public/repository';
import { rememberGood } from '@/lib/news/public/health';
import { articleMetadata, NOINDEX } from '@/lib/news/public/seo';

/* Rendered on request from MySQL. Only LIVE articles (published or scheduled, time passed, not in Trash)
   are ever found; a draft or future article is a 404 here exactly like an unknown slug. */
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const [article, indexing] = await Promise.all([getArticleBySlug(slug), getIndexingEnabled()]);
    return article ? articleMetadata(article, indexing) : { robots: NOINDEX };
  } catch {
    return { robots: NOINDEX };
  }
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    /* an old WordPress slug or a renamed article: follow its stored redirect (permanent) */
    const encoded = /[^\x20-\x7e]/.test(slug) ? `/news/${encodeURIComponent(slug).toLowerCase()}` : null;
    const r = (await findRedirect(`/news/${slug}`)) || (encoded ? await findRedirect(encoded) : null);
    if (r && r.to !== `/news/${slug}`) permanentRedirect(r.to);
    notFound();
  }
  const related = await getRelatedArticles(article);
  rememberGood(`/news/${slug}`); /* last-known-good during a database outage (proxy.js) */
  return <ArticleView article={article} related={related} />;
}
