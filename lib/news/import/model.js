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

  const menu = buildMenu(tables, categories);
  const homepageLayout = buildHomepage(tables, categories);
  return { site, posts, categories, tags, attachments, attachmentByFile, skipped, homepageTermId: homepage?.termId ?? null, menu, homepage: homepageLayout };
}

/* ------------------------------------------------------------------------------------------------------
 * The old site's navigation and homepage, as data (approved 2026-11-11). Nothing about them is hard-coded:
 * both are read from the dump and stored in the CMS by the import, which editors then own.
 * ---------------------------------------------------------------------------------------------------- */

/** An ALL-CAPS heading (a theme style, not the words) becomes Title Case; anything else is kept. */
function titleCase(s) {
  const t = decode(String(s || '').replace(/<[^>]*>/g, ''));
  return /[a-z]/.test(t) ? t : t.toLowerCase().replace(/(^|[\s/(-])([a-z])/g, (_, a, b) => a + b.toUpperCase());
}

/**
 * The header menu: of the dump's navigation menus, the one with the most CATEGORY items (on this site
 * "Student Newsletter"; the others are the theme's demo menus). Every category item becomes
 * { termId, order } — its position among its siblings in the menu, x10 so editors can insert between.
 * Items that are not categories (the "Home" page link) are listed in `ignored`; a category whose menu
 * parent differs from its category parent is listed in `mismatches` (the CMS follows the category tree).
 */
export function buildMenu(tables, categories) {
  const meta = new Map();
  for (const m of tables.postmeta) {
    if (!m.meta_key.startsWith('_menu_item_')) continue;
    if (!meta.has(m.post_id)) meta.set(m.post_id, {});
    meta.get(m.post_id)[m.meta_key] = m.meta_value;
  }
  const termName = new Map(tables.terms.map((t) => [t.term_id, t.name]));
  const navMenus = tables.term_taxonomy.filter((t) => t.taxonomy === 'nav_menu').map((t) => [t.term_taxonomy_id, termName.get(t.term_id) || '']);
  const items = new Map(tables.posts.filter((p) => p.post_type === 'nav_menu_item' && p.post_status === 'publish').map((p) => [p.ID, p]));
  const catByTerm = new Map(categories.map((c) => [c.termId, c]));
  const isCat = (id) => meta.get(id)?._menu_item_type === 'taxonomy' && meta.get(id)?._menu_item_object === 'category';
  let best = null;
  for (const [ttId, name] of navMenus) {
    const ids = tables.term_relationships.filter((r) => r.term_taxonomy_id === ttId && items.has(r.object_id)).map((r) => r.object_id);
    const cats = ids.filter(isCat);
    if (!best || cats.length > best.cats.length) best = { name, ids, cats };
  }
  if (!best || !best.cats.length) return { name: null, items: [], ignored: [], mismatches: [] };
  const termOf = (itemId) => (isCat(itemId) ? Number(meta.get(itemId)._menu_item_object_id) : null);
  /* the nearest ancestor ITEM that is a category (a non-category parent item is skipped over) */
  const parentTerm = (itemId) => {
    let p = meta.get(itemId)?._menu_item_menu_item_parent;
    const seen = new Set();
    while (p && p !== '0' && !seen.has(p)) {
      seen.add(p);
      const t = termOf(p);
      if (t) return t;
      p = meta.get(p)?._menu_item_menu_item_parent;
    }
    return null;
  };
  const rows = best.cats
    .map((id) => ({ termId: termOf(id), parentTermId: parentTerm(id), menuOrder: Number(items.get(id).menu_order) || 0 }))
    .filter((r) => catByTerm.has(r.termId))
    .sort((a, b) => a.menuOrder - b.menuOrder);
  const siblings = new Map();
  for (const r of rows) {
    const k = r.parentTermId ?? 0;
    if (!siblings.has(k)) siblings.set(k, []);
    siblings.get(k).push(r);
  }
  const out = [];
  for (const list of siblings.values()) list.forEach((r, i) => out.push({ termId: r.termId, order: (i + 1) * 10 }));
  return {
    name: decode(best.name),
    items: out.sort((a, b) => a.termId - b.termId),
    ignored: best.ids.filter((id) => !isCat(id)).map((id) => decode(items.get(id).post_title) || meta.get(id)?._menu_item_type || 'item'),
    mismatches: rows
      .filter((r) => (catByTerm.get(r.termId).parentTermId || null) !== (r.parentTermId || null))
      .map((r) => ({ termId: r.termId, menuParent: r.parentTermId, categoryParent: catByTerm.get(r.termId).parentTermId || null })),
  };
}

const WIDGET_LAYOUT = {
  'posts-blocklist': 'headlines',
  'posts-block-item-latest': 'headlines',
  'posts-block-item-three': 'feature',
  'posts-grid-two': 'grid',
  'posts-video-block': 'grid',
};

/**
 * The homepage sections, from the front page's Elementor layout (`page_on_front` → `_elementor_data`), in
 * order. Each post widget becomes a section in the publication's own layouts (WIDGET_LAYOUT; tabs →
 * tabs; an Elementor section holding only a heading → heading). A widget title is kept only where the
 * old site showed it (its own "show title" switch). A widget whose categories do not exist rendered empty
 * on the old site and is skipped, as are the blocks the new hero and Latest already cover (newest stories,
 * the "Homepage" pick) and image banners — each with a reason. Two widgets in one Elementor section
 * become two `half` sections that share a row.
 */
export function buildHomepage(tables, categories) {
  const front = tables.options.find((o) => o.option_name === 'page_on_front')?.option_value;
  const raw = front && tables.postmeta.find((m) => m.post_id === front && m.meta_key === '_elementor_data')?.meta_value;
  if (!raw) return { sections: [], skipped: [{ widget: 'front page', reason: 'no Elementor layout in the dump' }] };
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return { sections: [], skipped: [{ widget: 'front page', reason: 'unreadable Elementor layout' }] };
  }
  const bySlug = new Map(categories.map((c) => [c.slug, c.termId]));
  const terms = (slugs) => (Array.isArray(slugs) ? slugs : []).map((s) => bySlug.get(s)).filter(Boolean);
  const widgets = (el, out = []) => {
    for (const e of el?.elements || []) {
      if (e?.elType === 'widget') out.push(e);
      else widgets(e, out);
    }
    return out;
  };
  const sections = [];
  const skipped = [];
  for (const top of Array.isArray(data) ? data : []) {
    const ws = widgets(top).filter((w) => w.widgetType !== 'spacer');
    const built = [];
    for (const w of ws) {
      const st = w.settings || {};
      const hidden = (k) => Object.hasOwn(st, k) && st[k] === '';
      const count = Number(st.post_number) || 4;
      const offset = st.enable_offset_post === 'yes' ? Number(st.post_offset_count) || 0 : 0;
      if (w.widgetType === 'heading') {
        built.push({ layout: 'heading', title: titleCase(st.title) });
      } else if (WIDGET_LAYOUT[w.widgetType]) {
        const slugs = w.widgetType === 'posts-grid-two' ? st.post_cat : st.post_categories;
        let title = st.post_block_title;
        if (w.widgetType === 'posts-blocklist') title = hidden('post_list_title_enable') ? '' : st.post_list_sec_title;
        else if (w.widgetType === 'posts-grid-two') title = hidden('display_top_title') ? '' : st.post_gridsone_block_title;
        else if (w.widgetType === 'posts-video-block') title = st.video_post_block_title;
        else if (hidden('display_top_title')) title = '';
        const termIds = terms(slugs);
        if (!termIds.length) skipped.push({ widget: w.widgetType, title: titleCase(title), categories: slugs || [], reason: 'its categories do not exist, so it rendered empty on the old site' });
        else built.push({ layout: WIDGET_LAYOUT[w.widgetType], title: titleCase(title), termIds, count, offset });
      } else if (w.widgetType === 'posts-tab-one') {
        const tabs = (st.tabs || []).map((t) => ({ label: decode(t.tab_menu_name || ''), termIds: terms(t.post_categories) }));
        for (const t of tabs.filter((x) => !x.termIds.length)) skipped.push({ widget: 'posts-tab-one tab', title: t.label, reason: 'its category does not exist, so the tab was empty on the old site' });
        const kept = tabs.filter((x) => x.termIds.length && x.label);
        if (kept.length >= 2) built.push({ layout: 'tabs', title: titleCase(st.tab_title_text), tabs: kept, count: Number(st.post_number) || 6, offset: 0 });
        else skipped.push({ widget: 'posts-tab-one', title: titleCase(st.tab_title_text), reason: 'fewer than two tabs have categories' });
      } else if (w.widgetType === 'posts-block-item-two' || w.widgetType === 'posts-block-item') {
        skipped.push({ widget: w.widgetType, title: titleCase(st.post_block_title), categories: st.post_categories || [], reason: 'covered by the new hero and Latest (newest stories / the homepage pick)' });
      } else if (w.widgetType === 'image') {
        skipped.push({ widget: 'image', title: st.image?.url || '', reason: 'promotional image banner, not imported (approved)' });
      } else {
        skipped.push({ widget: w.widgetType, reason: 'not a story block' });
      }
    }
    const stories = built.filter((b) => b.layout !== 'heading');
    const headings = built.filter((b) => b.layout === 'heading');
    if (!stories.length) {
      /* an Elementor section holding only a heading titles what follows; a heading beside skipped blocks titles nothing */
      if (headings.length && ws.every((w) => w.widgetType === 'heading')) sections.push(...headings);
      else for (const h of headings) skipped.push({ widget: 'heading', title: h.title, reason: 'it titled only blocks that were skipped' });
      continue;
    }
    for (const h of headings) skipped.push({ widget: 'heading', title: h.title, reason: 'inside a story block, which keeps its own title' });
    for (const b of stories) sections.push({ ...b, width: stories.length > 1 ? 'half' : 'full' });
  }
  return { sections: sections.map((s, i) => ({ id: `wp${i + 1}`, ...s })), skipped };
}
