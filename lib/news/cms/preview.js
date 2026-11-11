/**
 * ATLAS News CMS — an editor's article (lib/news/cms/articles.js getArticle) mapped to the PUBLIC read
 * model's Article shape (see lib/news/public/repository.js), so the admin preview renders through the very
 * same component as the live page (components/News/Public/ArticleView.js).
 */
import { DEFAULT_AUTHOR_NAME } from '../config.js';
import { articleUrl, categoryUrl, readingMinutes } from '../public/queries.js';

/** The rendition to show as the featured image, with its own dimensions. */
function featured(media) {
  if (!media) return null;
  const v = media.variants?.find((x) => x.name === 'article') || media.variants?.find((x) => x.name === 'full');
  return {
    src: v?.url || media.url,
    width: v?.width || media.width || 1600,
    height: v?.height || media.height || 900,
    alt: media.alt || '',
    caption: media.caption || '',
  };
}

/** article: from getArticle(); categories: [{ id, name, slug, description }]. */
export function toPublicArticle(article, categories) {
  const byId = new Map(categories.map((c) => [c.id, c]));
  const cat = (c) => ({ slug: c.slug, name: c.name, description: c.description || '', url: categoryUrl(c.slug), seoTitle: null, seoDescription: null });
  const cats = article.categoryIds.map((id) => byId.get(id)).filter(Boolean).map(cat);
  const primary = article.primaryCategoryId ? byId.get(article.primaryCategoryId) : null;
  /* breadcrumb: the primary category's ancestors, root first (categories carry parentId) */
  const path = [];
  for (let x = primary || null, guard = 0; x && guard <= categories.length; x = x.parentId ? byId.get(x.parentId) : null, guard++) path.unshift(x);
  const publishedAt = article.publishedAt || article.updatedAt;
  return {
    slug: article.slug,
    url: articleUrl(article.slug),
    title: article.title,
    excerpt: article.excerpt || '',
    contentHtml: article.contentHtml || '',
    publishedAt,
    updatedAt: article.updatedAt,
    authorName: article.authorName || DEFAULT_AUTHOR_NAME,
    readingMinutes: readingMinutes(article.contentHtml),
    image: featured(article.featuredMedia),
    category: primary ? cat(primary) : cats[0] || null,
    categoryPath: path.map(cat),
    categories: cats,
    seoTitle: article.seoTitle || null,
    seoDescription: article.seoDescription || null,
  };
}
