/**
 * ATLAS News — dates, metadata and structured data for the public pages.
 */

export const NEWS_NAME = 'ATLAS News';
export const NEWS_TAGLINE = 'Stories, ideas and achievements from ATLAS SkillTech University';
export const NEWS_DESCRIPTION =
  'ATLAS News is the newsroom of ATLAS SkillTech University, Mumbai — campus stories, academic ideas, industry collaborations, global partnerships and student achievements.';
/* Same origin the root layout's metadataBase declares; structured data needs absolute URLs. */
export const SITE_ORIGIN = 'https://atlasuniversity.edu.in';
export const absoluteUrl = (path) => new URL(path, SITE_ORIGIN).toString();

/** Dates are formatted for India and pinned to IST, so a static build and a visitor agree. */
const DATE = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
const DATE_SHORT = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' });
export const formatDate = (iso) => DATE.format(new Date(iso));
export const formatDateShort = (iso) => DATE_SHORT.format(new Date(iso));

/**
 * robots for every public News page, from the `indexing_enabled` setting (atlasnews_settings).
 * NOINDEX UNLESS THAT SETTING IS EXPLICITLY true — it defaults to false and is changed only on the server
 * with `npm run news:admin -- indexing --on --confirm`. Nothing turns it on automatically (an import of
 * real content included).
 */
export const NOINDEX = Object.freeze({ index: false, follow: false, googleBot: { index: false, follow: false } });
export const newsRobots = (indexingEnabled) => (indexingEnabled === true ? { index: true, follow: true } : NOINDEX);

/** Article metadata. The canonical is the editor's override when set, else the article's own URL; the
 *  social image is the dedicated sharing image when set, else the featured image. */
export function articleMetadata(article, indexingEnabled = false) {
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const share = article.ogImage || article.image;
  const images = share ? [{ url: share.src, width: share.width, height: share.height, alt: share.alt }] : [];
  return {
    title,
    description,
    alternates: { canonical: article.canonicalUrl || article.url },
    robots: newsRobots(indexingEnabled),
    openGraph: {
      type: 'article',
      siteName: NEWS_NAME,
      title,
      description,
      url: article.url,
      locale: 'en_IN',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.authorName],
      section: article.category?.name,
      images,
    },
    twitter: { card: 'summary_large_image', title, description, images: images.map((i) => i.url) },
  };
}

export function categoryMetadata(category, page = 1, url, indexingEnabled = false) {
  const title = `${category.seoTitle || category.name}${page > 1 ? ` — Page ${page}` : ''}`;
  const description = category.seoDescription || category.description;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: newsRobots(indexingEnabled),
    openGraph: { type: 'website', siteName: NEWS_NAME, title: `${title} — ${NEWS_NAME}`, description, url, locale: 'en_IN' },
    twitter: { card: 'summary', title: `${title} — ${NEWS_NAME}`, description },
  };
}

/* ------------------------------------------------------------------------------------ JSON-LD */

const publisher = {
  '@type': 'Organization',
  name: 'ATLAS SkillTech University',
  url: SITE_ORIGIN,
  logo: { '@type': 'ImageObject', url: absoluteUrl('/assets/brand/logos/atlas/atlas-skilltech-brand-mark.svg') },
};

export function articleJsonLd(article) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      description: article.excerpt,
      mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(article.url) },
      url: absoluteUrl(article.url),
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      articleSection: article.category?.name,
      author: { '@type': 'Organization', name: article.authorName },
      publisher,
      ...(article.image ? { image: [absoluteUrl(article.image.src)] } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: NEWS_NAME, item: absoluteUrl('/news') },
        ...(article.category ? [{ '@type': 'ListItem', position: 2, name: article.category.name, item: absoluteUrl(article.category.url) }] : []),
        { '@type': 'ListItem', position: article.category ? 3 : 2, name: article.title, item: absoluteUrl(article.url) },
      ],
    },
  ];
}

export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: NEWS_NAME,
    url: absoluteUrl('/news'),
    description: NEWS_DESCRIPTION,
    publisher,
  };
}
