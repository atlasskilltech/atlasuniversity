/**
 * ATLAS News — WordPress import, step 2: one Gutenberg `post_content` → the CMS's sanitised HTML.
 *
 * WordPress stores the rendered block HTML between `<!-- wp:… -->` comments, so the converter works on
 * that HTML (the comments are dropped) and maps each block to the editorial vocabulary the sanitiser
 * (lib/news/content/sanitize.js) and the public article styles understand:
 *
 *   gallery (both markups)  → div.news-gallery.is-cols-N > figure.news-gallery-item (+ caption → p)
 *   image                   → figure(.align-*) > img [+ figcaption]; a link around the image is kept
 *   columns / column        → div.news-columns.is-cols-N > div.news-column
 *   media-text              → div.news-columns.is-cols-2 (media and text in their authored order)
 *   pullquote               → blockquote.news-pullquote; quote → blockquote; table → figure.news-table
 *   verse                   → pre; group / mark / span → unwrapped; spacer → removed
 *   YouTube embed / iframe  → figure.news-embed.news-embed-youtube > iframe (youtube-nocookie)
 *   video                   → figure.news-video > video[controls] > source
 *
 * Images and videos are resolved through callbacks (the importer maps them to atlasnews_media). NOTHING
 * is dropped silently: an image or video that cannot be resolved keeps its original WordPress URL and is
 * reported; an embed the sanitiser cannot carry becomes a plain link and is reported. Decoration
 * (inline styles, colours, font sizes, background boxes) is not carried: the sanitiser allows no style.
 */
import { parseDocument } from 'htmlparser2';
import { Element, Text } from 'domhandler';
import render from 'dom-serializer';
import { sanitizeArticleHtml, sanitizePlainText } from '../content/sanitize.js';

const ALIGN = { aligncenter: 'align-center', alignleft: 'align-left', alignright: 'align-right', alignwide: 'align-wide', alignfull: 'align-full' };
const YT = /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,20})/;

const classes = (el) => (el.attribs?.class || '').split(/\s+/).filter(Boolean);
const has = (el, c) => classes(el).includes(c);
const isEl = (n) => n && n.type === 'tag';
const kids = (el) => (el.children || []).filter((n) => n.type !== 'comment');
const elKids = (el) => kids(el).filter(isEl);
const text = (n) => (n.type === 'text' ? n.data : (n.children || []).map(text).join(''));
const mk = (name, attribs = {}, children = []) => {
  const el = new Element(name, attribs, children);
  for (const c of children) c.parent = el;
  return el;
};
const find = (el, pred) => {
  for (const c of el.children || []) {
    if (isEl(c) && pred(c)) return c;
    const d = isEl(c) ? find(c, pred) : null;
    if (d) return d;
  }
  return null;
};
const findAll = (el, pred, out = []) => {
  for (const c of el.children || []) {
    if (!isEl(c)) continue;
    if (pred(c)) out.push(c);
    else findAll(c, pred, out);
  }
  return out;
};
const alignOf = (el) => classes(el).map((c) => ALIGN[c]).find(Boolean);

/** WordPress upload path ("2023/05/x-1024x683.jpg") from an absolute or relative uploads URL. */
export function uploadsPath(src) {
  const m = /\/wp-content\/uploads\/(.+)$/.exec(String(src || '').split(/[?#]/)[0]);
  if (!m) return null;
  try {
    return decodeURIComponent(m[1]);
  } catch {
    return m[1];
  }
}

export function youtubeId(url) {
  return YT.exec(String(url || ''))?.[1] || null;
}

const youtubeFigure = (id) =>
  mk('figure', { class: 'news-embed news-embed-youtube' }, [
    mk('iframe', {
      src: `https://www.youtube-nocookie.com/embed/${id}`,
      title: 'YouTube video',
      width: '560',
      height: '315',
      allow: 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      allowfullscreen: '',
    }),
  ]);

/**
 * @param {string} raw              WordPress post_content
 * @param {object} o
 * @param {(ref:{attachmentId:number|null, path:string|null, src:string}) => ({src,width,height,alt}|null)} o.image
 * @param {(ref:{attachmentId:number|null, path:string|null, src:string}) => ({src, type}|null)} o.video
 * @param {string} o.site            WordPress home URL, e.g. https://atlasuniversity.edu.in/news
 * @returns {{ html, excerpt, report: { images, imagesMissing:[], videos, videosMissing:[], embeds, embedsAsLinks:[], uploadLinks:[], emptyInSource:[] } }}
 */
export function convertPost(raw, { image, video, site }) {
  const report = { images: 0, imagesMissing: [], videos: 0, videosMissing: [], embeds: 0, embedsAsLinks: [], uploadLinks: [], internalLinks: 0, emptyInSource: [], droppedBySanitizer: {} };
  const doc = parseDocument(String(raw || ''), { decodeEntities: true });
  const siteHost = site.replace(/\/+$/, '');

  const imgNode = (img) => {
    const id = Number((classes(img).find((c) => /^wp-image-\d+$/.test(c)) || '').slice(9)) || null;
    const src = img.attribs.src || '';
    if (!src.trim() && !id) {
      /* `<img src="">` in the source: WordPress itself renders a broken image; nothing to carry */
      report.emptyInSource.push('img');
      return new Text('');
    }
    const ref = { attachmentId: id, path: uploadsPath(src), src };
    const hit = image(ref);
    report.images += 1;
    if (!hit) {
      report.imagesMissing.push(ref);
      return mk('img', { src, alt: img.attribs.alt || '' });
    }
    return mk('img', { src: hit.src, alt: img.attribs.alt || hit.alt || '', ...(hit.width ? { width: String(hit.width), height: String(hit.height) } : {}) });
  };

  /* an <img>, optionally inside its <a>, from inside a WordPress image figure */
  const mediaOf = (fig) => {
    const a = find(fig, (e) => e.name === 'a' && !!find(e, (x) => x.name === 'img'));
    const img = find(fig, (e) => e.name === 'img');
    if (!img) return null;
    const node = imgNode(img);
    if (node.type === 'text') return null;
    return a ? mk('a', { href: a.attribs.href || '' }, [node]) : node;
  };
  const captionOf = (fig) => find(fig, (e) => e.name === 'figcaption');

  const imageFigure = (fig, extraClass) => {
    const m = mediaOf(fig);
    if (!m) return [];
    const cap = captionOf(fig);
    const cls = [extraClass, alignOf(fig)].filter(Boolean).join(' ');
    const out = mk('figure', cls ? { class: cls } : {}, [m]);
    if (cap && text(cap).trim()) {
      const fc = mk('figcaption', {}, walkAll(kids(cap)));
      fc.parent = out;
      out.children.push(fc);
    }
    return [out];
  };

  const gallery = (el) => {
    const items = findAll(el, (e) => (e.name === 'figure' && (has(e, 'wp-block-image') || has(e, 'blocks-gallery-item__figure'))) || (e.name === 'li' && has(e, 'blocks-gallery-item')));
    const figs = [];
    for (const it of items) figs.push(...imageFigure(it, 'news-gallery-item'));
    let n = Number((classes(el).find((c) => /^columns-\d$/.test(c)) || '').slice(8)) || (figs.length >= 3 ? 3 : 2);
    n = Math.min(Math.max(n, 2), 4);
    const children = [...figs];
    const cap = elKids(el).find((e) => e.name === 'figcaption' && has(e, 'blocks-gallery-caption'));
    if (cap && text(cap).trim()) children.push(mk('p', {}, walkAll(kids(cap))));
    if (!figs.length) {
      report.emptyInSource.push('gallery');
      return [];
    }
    return [mk('div', { class: `news-gallery is-cols-${n}` }, children)];
  };

  const embed = (el) => {
    const wrap = find(el, (e) => has(e, 'wp-block-embed__wrapper'));
    const url = (wrap ? text(wrap) : text(el)).trim();
    const id = youtubeId(url);
    report.embeds += 1;
    if (id) return [youtubeFigure(id)];
    report.embedsAsLinks.push(url);
    return url ? [mk('p', {}, [mk('a', { href: url }, [new Text(url)])])] : [];
  };

  const videoBlock = (el) => {
    const v = el.name === 'video' ? el : find(el, (e) => e.name === 'video');
    const src = v?.attribs.src || find(v || el, (e) => e.name === 'source')?.attribs.src || '';
    if (!src) return [];
    report.videos += 1;
    const ref = { attachmentId: null, path: uploadsPath(src), src };
    const hit = video(ref);
    if (!hit) {
      report.videosMissing.push(ref);
      return [mk('p', {}, [mk('a', { href: src }, [new Text('Watch the video')])])];
    }
    const cap = captionOf(el);
    const children = [mk('video', { controls: '', preload: 'metadata', playsinline: '' }, [mk('source', { src: hit.src, type: hit.type })])];
    if (cap && text(cap).trim()) children.push(mk('figcaption', {}, walkAll(kids(cap))));
    return [mk('figure', { class: 'news-video' }, children)];
  };

  const columnsBlock = (el) => {
    const cols = elKids(el).filter((c) => has(c, 'wp-block-column'));
    const n = Math.min(Math.max(cols.length, 2), 4);
    return [mk('div', { class: `news-columns is-cols-${n}` }, cols.map((c) => mk('div', { class: 'news-column' }, walkAll(kids(c)))))];
  };

  const mediaText = (el) => {
    const mediaFig = elKids(el).find((c) => has(c, 'wp-block-media-text__media'));
    const content = elKids(el).find((c) => has(c, 'wp-block-media-text__content'));
    const mediaCol = mk('div', { class: 'news-column' }, mediaFig ? (find(mediaFig, (e) => e.name === 'video') ? videoBlock(mediaFig) : imageFigure(mediaFig)) : []);
    const textCol = mk('div', { class: 'news-column' }, content ? walkAll(kids(content)) : []);
    return [mk('div', { class: 'news-columns is-cols-2' }, has(el, 'has-media-on-the-right') ? [textCol, mediaCol] : [mediaCol, textCol])];
  };

  /* element → replacement nodes */
  const walk = (n) => {
    if (n.type === 'comment' || n.type === 'directive') return [];
    if (n.type === 'text') return [n];
    if (!isEl(n)) return [];
    const name = n.name;
    if (has(n, 'wp-block-spacer')) return [];
    if (has(n, 'wp-block-gallery') || (name === 'ul' && has(n, 'blocks-gallery-grid'))) return gallery(n);
    if (has(n, 'wp-block-embed')) return embed(n);
    if (has(n, 'wp-block-video') || name === 'video') return videoBlock(n);
    if (has(n, 'wp-block-media-text')) return mediaText(n);
    if (has(n, 'wp-block-columns')) return columnsBlock(n);
    if (has(n, 'wp-block-image') && name !== 'img') {
      const fig = name === 'figure' ? n : find(n, (e) => e.name === 'figure') || n;
      return imageFigure(fig);
    }
    if (name === 'img') return [imgNode(n)];
    if (has(n, 'wp-block-pullquote')) {
      const bq = find(n, (e) => e.name === 'blockquote') || n;
      return [mk('blockquote', { class: 'news-pullquote' }, walkAll(kids(bq)))];
    }
    if (has(n, 'wp-block-table') && name === 'figure') {
      const t = find(n, (e) => e.name === 'table');
      const cap = captionOf(n);
      const out = t ? [mk('table', {}, walkAll(kids(t)))] : [];
      if (cap && text(cap).trim()) out.push(mk('figcaption', {}, walkAll(kids(cap))));
      return out.length ? [mk('figure', { class: 'news-table' }, out)] : [];
    }
    if (name === 'iframe') {
      const id = youtubeId(n.attribs.src);
      report.embeds += 1;
      if (id) return [youtubeFigure(id)];
      report.embedsAsLinks.push(n.attribs.src || '');
      return n.attribs.src ? [mk('p', {}, [mk('a', { href: n.attribs.src }, [new Text(n.attribs.src)])])] : [];
    }
    if (has(n, 'wp-block-group') || has(n, 'wp-block-group__inner-container') || ['mark', 'span', 'font'].includes(name)) return walkAll(kids(n));

    /* plain element: keep the tag, drop style/class (the sanitiser would anyway), rewrite links */
    const attribs = {};
    if (name === 'a') {
      let href = n.attribs.href || '';
      const up = uploadsPath(href);
      if (up) report.uploadLinks.push(href);
      else if (href.startsWith(`${siteHost}/`) && !href.includes('/wp-content/')) {
        href = href.slice(siteHost.length).replace(/^\/?/, '/news/').replace(/\/+$/, '') || '/news';
        report.internalLinks += 1;
      }
      attribs.href = href;
      if (n.attribs.target) attribs.target = n.attribs.target;
      if (n.attribs.rel) attribs.rel = n.attribs.rel;
      if (n.attribs.title) attribs.title = n.attribs.title;
    }
    for (const k of ['colspan', 'rowspan', 'scope', 'start', 'reversed', 'cite']) if (n.attribs[k] !== undefined) attribs[k] = n.attribs[k];
    return [mk(name, attribs, walkAll(kids(n)))];
  };
  function walkAll(nodes) {
    return nodes.flatMap(walk);
  }

  const out = walkAll(doc.children);
  const rendered = render(out, { encodeEntities: 'utf8' });
  const html = sanitizeArticleHtml(rendered)
    /* empty paragraphs and headings WordPress leaves behind (spacers, deleted text) */
    .replace(/<(p|h[2-6])>(?:\s|&nbsp;| |<br \/>)*<\/\1>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  /* the sanitiser has the last word: anything it removed (an http:// image, a non-YouTube iframe) is
     counted here, never lost silently */
  const tally = (h) => ({ img: (h.match(/<img\b/g) || []).length, source: (h.match(/<source\b/g) || []).length, iframe: (h.match(/<iframe\b/g) || []).length });
  const pre = tally(rendered);
  const post = tally(html);
  report.droppedBySanitizer = Object.fromEntries(Object.keys(pre).map((k) => [k, pre[k] - post[k]]).filter(([, n]) => n > 0));

  /* WordPress's automatic excerpt: the opening paragraph's text, ≤160 characters at a word boundary */
  const firstP = /<p>([\s\S]*?)<\/p>/.exec(html);
  let excerpt = firstP ? sanitizePlainText(firstP[1], 2000) : '';
  if (excerpt.length > 160) {
    const cut = excerpt.slice(0, 159);
    excerpt = `${cut.slice(0, cut.lastIndexOf(' ') > 100 ? cut.lastIndexOf(' ') : 159).replace(/[\s,;:.-]+$/, '')}…`;
  }
  return { html, excerpt, report };
}
