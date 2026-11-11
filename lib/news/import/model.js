/**
 * ATLAS News — WordPress import, step 1: turn the parsed dump tables into the import model.
 *
 *   posts       type 'post', status publish|draft (private and everything else is skipped and counted)
 *   categories  every `category` term, with its parent (the CMS keeps the hierarchy since migration 0003)
 *   tags        `post_tag` terms used by an imported post
 *   attachments id → file, alt, caption, size variants (for resolving inline <img> to its original)
 *
 * Pure data; no database, no files. Decisions (approved 2026-11-11, Phase F §3–§9):
 *   - author → ATLAS News Desk (no WordPress user data is read)
 *   - title entities decoded once; Yoast title/description kept (description cut at a word boundary to the
 *     500-character column, reported)
 *   - primary category: Yoast's primary if it is one of the post's categories, else the deepest category
 *     that is not "Homepage", ties broken by WordPress term order
 *   - old slugs (`_wp_old_slug`) → redirects to the current slug
 */
import { decodeHTML } from 'entities';
import { phpUnserialize } from './wpdump.js';

export const SEO_DESCRIPTION_MAX = 500;
export const SEO_TITLE_MAX = 255;
const IMPORT_STATUSES = { publish: 'published', draft: 'draft' };

const decode = (s) => decodeHTML(String(s ?? '')).trim();

/** WordPress stores UTC 'YYYY-MM-DD HH:MM:SS'; '0000-00-00 00:00:00' means "not set". */
export function wpUtc(s) {
  if (!s || s.startsWith('0000-00-00')) return null;
  const d = new Date(`${s.replace(' ', 'T')}Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Cut at a word boundary to `max` characters (adds an ellipsis only when something was cut). */
export function clipWords(s, max) {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return { text: t, cut: false };
  const room = t.slice(0, max - 1);
  const sp = room.lastIndexOf(' ');
  return { text: `${(sp > max * 0.6 ? room.slice(0, sp) : room).replace(/[\s,;:.-]+$/, '')}…`, cut: true };
}

export function buildModel(tables) {
  const meta = new Map();
  for (const m of tables.postmeta) {
    if (!meta.has(m.post_id)) meta.set(m.post_id, new Map());
    const pm = meta.get(m.post_id);
    if (!pm.has(m.meta_key)) pm.set(m.meta_key, []);
    pm.get(m.meta_key).push(m.meta_value);
  }
  const m1 = (id, k) => meta.get(id)?.get(k)?.[0] ?? null;

  /* ---- taxonomy */
  const termById = new Map(tables.terms.map((t) => [t.term_id, t]));
  const ttById = new Map();
  const categories = [];
  const tagsByTerm = new Map();
  for (const tt of tables.term_taxonomy) {
    ttById.set(tt.term_taxonomy_id, tt);
    const term = termById.get(tt.term_id);
    if (!term) continue;
    const base = { termId: Number(tt.term_id), name: decode(term.name), slug: term.slug, description: decode(tt.description), order: Number(term.term_order || 0) };
    if (tt.taxonomy === 'category') categories.push({ ...base, parentTermId: Number(tt.parent) || null });
    else if (tt.taxonomy === 'post_tag') tagsByTerm.set(base.termId, base);
  }
  const catByTerm = new Map(categories.map((c) => [c.termId, c]));
  const depthOf = (termId) => {
    let d = 0;
    let c = catByTerm.get(termId);
    const seen = new Set();
    while (c?.parentTermId && catByTerm.has(c.parentTermId) && !seen.has(c.termId)) {
      seen.add(c.termId);
      d += 1;
      c = catByTerm.get(c.parentTermId);
    }
    return d;
  };
  /* parents before children, so an importer can insert in this order */
  categories.sort((a, b) => depthOf(a.termId) - depthOf(b.termId) || a.termId - b.termId);
  for (const c of categories) c.depth = depthOf(c.termId);
  const homepage = categories.find((c) => c.slug === 'homepage');

  const relByPost = new Map();
  for (const r of tables.term_relationships) {
    const tt = ttById.get(r.term_taxonomy_id);
    if (!tt) continue;
    if (!relByPost.has(r.object_id)) relByPost.set(r.object_id, { cats: [], tags: [] });
    const e = relByPost.get(r.object_id);
    if (tt.taxonomy === 'category') e.cats.push(Number(tt.term_id));
    else if (tt.taxonomy === 'post_tag') e.tags.push(Number(tt.term_id));
  }

  /* ---- attachments */
  const attachments = new Map();
  const attachmentByFile = new Map();
  for (const p of tables.posts) {
    if (p.post_type !== 'attachment') continue;
    const file = m1(p.ID, '_wp_attached_file');
    let md = {};
    const raw = m1(p.ID, '_wp_attachment_metadata');
    if (raw) {
      try {
        md = phpUnserialize(raw) || {};
      } catch {
        md = {};
      }
    }
    const dir = file && file.includes('/') ? file.slice(0, file.lastIndexOf('/') + 1) : '';
    const sizes = Object.values(md.sizes || {})
      .filter((s) => s && typeof s === 'object' && s.file)
      .map((s) => ({ file: dir + s.file, width: Number(s.width) || null, height: Number(s.height) || null }));
    const a = {
      id: Number(p.ID), file, mime: p.post_mime_type, width: Number(md.width) || null, height: Number(md.height) || null,
      /* WordPress keeps the pre-"-scaled" upload as original_image */
      originalFile: md.original_image ? dir + md.original_image : null,
      sizes, alt: decode(m1(p.ID, '_wp_attachment_image_alt')), caption: decode(p.post_excerpt),
    };
    attachments.set(a.id, a);
    for (const f of [file, a.originalFile, ...sizes.map((s) => s.file)]) if (f && !attachmentByFile.has(f)) attachmentByFile.set(f, a.id);
  }

  /* ---- posts */
  const posts = [];
  const skipped = { private: 0, other: 0 };
  for (const p of tables.posts) {
    if (p.post_type !== 'post') continue;
    const status = IMPORT_STATUSES[p.post_status];
    if (!status) {
      if (p.post_status === 'private') skipped.private += 1;
      else if (!['auto-draft', 'inherit', 'trash'].includes(p.post_status)) skipped.other += 1;
      continue;
    }
    const rel = relByPost.get(p.ID) || { cats: [], tags: [] };
    const cats = rel.cats.filter((t) => catByTerm.has(t));
    const yoastPrimary = Number(m1(p.ID, '_yoast_wpseo_primary_category')) || null;
    let primary = yoastPrimary && cats.includes(yoastPrimary) ? yoastPrimary : null;
    if (!primary) {
      const pool = cats.filter((t) => t !== homepage?.termId);
      const ranked = (pool.length ? pool : cats).slice().sort((a, b) => depthOf(b) - depthOf(a) || catByTerm.get(a).order - catByTerm.get(b).order || a - b);
      primary = ranked[0] ?? null;
    }
    const seoTitle = clipWords(decode(m1(p.ID, '_yoast_wpseo_title')), SEO_TITLE_MAX);
    const seoDesc = clipWords(decode(m1(p.ID, '_yoast_wpseo_metadesc')), SEO_DESCRIPTION_MAX);
    posts.push({
      wpId: Number(p.ID),
      status,
      title: decode(p.post_title),
      slug: p.post_name || '',
      contentRaw: p.post_content || '',
      excerptRaw: decode(p.post_excerpt),
      publishedAt: status === 'published' ? wpUtc(p.post_date_gmt) || wpUtc(p.post_date) : null,
      draftDate: wpUtc(p.post_date_gmt) || wpUtc(p.post_date),
      modifiedAt: wpUtc(p.post_modified_gmt) || wpUtc(p.post_modified),
      featuredAttachmentId: Number(m1(p.ID, '_thumbnail_id')) || null,
      categoryTermIds: cats,
      primaryTermId: primary,
      primaryFrom: yoastPrimary && primary === yoastPrimary ? 'yoast' : primary ? 'rule' : null,
      tagTermIds: rel.tags.filter((t) => tagsByTerm.has(t)),
      seoTitle: seoTitle.text || null,
      seoTitleCut: seoTitle.cut,
      seoDescription: seoDesc.text || null,
      seoDescriptionCut: seoDesc.cut,
      oldSlugs: [...new Set(meta.get(p.ID)?.get('_wp_old_slug') || [])].filter((s) => s && s !== p.post_name),
    });
  }
  posts.sort((a, b) => a.wpId - b.wpId);

  const usedTags = new Set(posts.flatMap((p) => p.tagTermIds));
  const tags = [...tagsByTerm.values()].filter((t) => usedTags.has(t.termId)).sort((a, b) => a.termId - b.termId);
  const site = (tables.options.find((o) => o.option_name === 'home')?.option_value || 'https://atlasuniversity.edu.in/news/').replace(/\/+$/, '');

  return { site, posts, categories, tags, attachments, attachmentByFile, skipped, homepageTermId: homepage?.termId ?? null };
}
