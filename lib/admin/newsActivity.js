import 'server-only';

/**
 * ATLAS Admin — activity logging for every News write. `cmsRoute` (lib/news/cms/http.js) calls
 * `newsBefore` before the handler and `newsAfter` after a 2xx write, so every article, category,
 * homepage and image change is recorded in one place with its before/after values. Logging never
 * fails the request (logActivity swallows its own errors, and so does everything here).
 */
import { getArticle } from '../news/cms/articles.js';
import { getCategory, listCategories } from '../news/cms/categories.js';
import { getHomepageCuration } from '../news/cms/homepage.js';
import { getHomepageSections } from '../news/cms/homepageSections.js';
import { getMediaItem } from '../news/cms/media.js';
import { newsClientIp } from '../news/http/clientIp.js';
import { diffFields, logActivity } from './activity.js';

/** /admin/news/api/<a>/<b>/<c> → [a, b, c] */
function segs(request) {
  try {
    return new URL(request.url).pathname.replace(/^\/admin\/news\/api\/?/, '').split('/').filter(Boolean);
  } catch {
    return [];
  }
}

const words = (html) => {
  const n = String(html || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return n ? `${n} words` : '(empty)';
};
const dateIst = (iso) =>
  iso ? new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(iso)) : '';
const STATUS = { draft: 'Draft', published: 'Published', scheduled: 'Scheduled' };

async function categoryNames() {
  try {
    const all = await listCategories();
    return new Map(all.map((c) => [c.id, c.name]));
  } catch {
    return new Map();
  }
}

async function articleFields() {
  const names = await categoryNames();
  return [
    ['title', 'Title'],
    ['slug', 'URL slug'],
    ['status', 'Status', (s) => STATUS[s] || s],
    ['publishedAt', 'Publish date', dateIst],
    ['excerpt', 'Excerpt'],
    ['categoryIds', 'Categories', (ids) => (ids || []).map((id) => names.get(id) || `#${id}`)],
    ['featuredMedia', 'Featured image', (m) => m?.filename || (m ? `image #${m.id}` : '')],
    ['ogMedia', 'Social image', (m) => m?.filename || (m ? `image #${m.id}` : '')],
    ['contentHtml', 'Body', words],
    ['seoTitle', 'SEO title'],
    ['seoDescription', 'SEO description'],
    ['canonicalUrl', 'Canonical URL'],
  ];
}

const CATEGORY_FIELDS = [
  ['name', 'Name'],
  ['slug', 'URL slug'],
  ['description', 'Description'],
  ['parentId', 'Parent category', (id) => (id ? `#${id}` : 'top level')],
  ['showInMenu', 'In menu'],
  ['menuOrder', 'Menu order'],
  ['isFeatured', 'Featured'],
  ['image', 'Image', (m) => m?.filename || ''],
  ['seoTitle', 'SEO title'],
  ['seoDescription', 'SEO description'],
];
const MEDIA_FIELDS = [
  ['alt', 'Alt text'],
  ['caption', 'Caption'],
];

const homepageView = (h) => {
  const out = {};
  for (const z of h?.zones || []) out[z.zone] = { label: z.label, titles: z.items.map((i) => i.title) };
  return out;
};
const sectionsView = (s) => (s?.sections || []).map((x) => x.title || x.heading || x.label || x.id || 'section');

async function safe(fn) {
  try {
    return await fn();
  } catch {
    return null;
  }
}

/** What the thing about to change looks like now. */
export async function newsBefore(request, params) {
  if (['GET', 'HEAD'].includes(request.method)) return null;
  const [a, , c] = segs(request);
  const id = Number(params?.id);
  if (a === 'articles' && id && !c) return safe(() => getArticle(id));
  if (a === 'articles' && id && c) return safe(() => getArticle(id));
  if (a === 'categories' && id) return safe(() => getCategory(id));
  if (a === 'media' && id) return safe(() => getMediaItem(id));
  if (a === 'homepage' && !segs(request)[1]) return safe(async () => homepageView(await getHomepageCuration()));
  if (a === 'homepage') return safe(async () => sectionsView(await getHomepageSections()));
  return null;
}

/** Record the write that just succeeded. */
export async function newsAfter(request, params, before, res, user) {
  try {
    const [a, , c] = segs(request);
    const m = request.method;
    let body = {};
    try {
      body = await res.clone().json();
    } catch {
      body = {};
    }
    const id = Number(params?.id) || Number(body?.id) || null;
    const log = (action, summary, target, targetUrl, details) =>
      logActivity({ user, tab: 'news', action, summary, target, targetUrl, details, ip: newsClientIp(request) });

    if (a === 'articles') {
      const after = id ? await safe(() => getArticle(id)) : null;
      const url = id ? `/admin/news/articles/${id}` : '/admin/news/articles';
      const name = after?.title || before?.title || `Article #${id}`;
      if (m === 'POST' && !params?.id) return log('article.create', 'Created article', name, url, { changes: diffFields({}, after, await articleFields()) });
      if (m === 'POST' && c === 'duplicate') return log('article.duplicate', 'Duplicated article', `${before?.title || ''} → ${after?.title || ''}`, url, null);
      if (m === 'POST' && c === 'restore') return log('article.restore', 'Restored article from Trash (as draft)', name, url, null);
      if (m === 'DELETE') return log('article.trash', 'Moved article to Trash', name, url, body?.removedFromHomepage ? { note: 'Also removed from the News homepage' } : null);
      if (m === 'PUT') {
        const changes = diffFields(before, after, await articleFields());
        const was = before?.status;
        const now = after?.status;
        let action = 'article.edit';
        let summary = 'Edited article';
        if (was !== 'published' && now === 'published') [action, summary] = ['article.publish', 'Published article'];
        else if (was === 'published' && now !== 'published') [action, summary] = ['article.unpublish', 'Unpublished article'];
        else if (was !== 'scheduled' && now === 'scheduled') [action, summary] = ['article.schedule', 'Scheduled article'];
        const notes = [body?.redirectFrom ? `Old URL ${body.redirectFrom} now redirects` : null, body?.removedFromHomepage ? 'Removed from the News homepage' : null].filter(Boolean);
        return log(action, summary, name, url, { changes, note: notes.join(' · ') || null });
      }
    }
    if (a === 'categories') {
      const after = id && m !== 'DELETE' ? await safe(() => getCategory(id)) : null;
      const name = after?.name || before?.name || `Category #${id}`;
      if (m === 'POST') return log('category.create', 'Created category', name, '/admin/news/categories', { changes: diffFields({}, after, CATEGORY_FIELDS) });
      if (m === 'PUT') return log('category.edit', 'Edited category', name, '/admin/news/categories', { changes: diffFields(before, after, CATEGORY_FIELDS) });
      if (m === 'DELETE') return log('category.delete', 'Deleted category', name, '/admin/news/categories', null);
    }
    if (a === 'media') {
      const name = before?.filename || `Image #${id}`;
      if (m === 'PATCH') return log('media.edit', 'Edited image details', name, '/admin/news/media', { changes: diffFields(before, body?.media, MEDIA_FIELDS) });
      if (m === 'DELETE') return log('media.delete', 'Deleted image', name, '/admin/news/media', null);
    }
    if (a === 'homepage' && !segs(request)[1]) {
      const after = homepageView(body);
      const changes = [];
      for (const [zone, v] of Object.entries({ ...before, ...after })) {
        const x = before?.[zone]?.titles || [];
        const y = after?.[zone]?.titles || [];
        if (x.join('|') !== y.join('|')) changes.push({ field: (after[zone] || before[zone]).label || zone, from: x.join(', ') || '(empty)', to: y.join(', ') || '(empty)' });
      }
      return log('homepage.edit', 'Updated the News homepage', 'News homepage', '/admin/news/homepage', { changes });
    }
    if (a === 'homepage') {
      const after = sectionsView(body);
      return log('homepage.sections', 'Updated News homepage sections', 'News homepage sections', '/admin/news/homepage', {
        changes: (before || []).join(', ') !== after.join(', ') ? [{ field: 'Sections', from: (before || []).join(', ') || '(none)', to: after.join(', ') || '(none)' }] : [],
      });
    }
    return null;
  } catch (e) {
    console.error(`[activity] news log failed: ${e?.code || e?.name || 'error'}`);
    return null;
  }
}

/** An image upload (the media POST route is not a cmsRoute). */
export async function logMediaUpload(request, user, result) {
  await logActivity({
    user,
    tab: 'news',
    action: 'media.upload',
    summary: result?.deduplicated ? 'Uploaded image (already in library)' : 'Uploaded image',
    target: result?.media?.filename || result?.filename || `Image #${result?.media?.id ?? result?.id ?? ''}`,
    targetUrl: '/admin/news/media',
    ip: newsClientIp(request),
  });
}
