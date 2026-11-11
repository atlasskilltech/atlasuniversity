/**
 * ATLAS News — WordPress import: the database writes shared by the importer (from the dump, locally) and
 * the bundle apply (on the production server). One implementation, so both paths keep the same rules:
 *
 *   terms     matched on legacy_wp_term_id; a CMS term with the same slug is linked, never duplicated;
 *             an existing term is never renamed or moved
 *   posts     matched on legacy_wp_id; a post changed in the CMS since the last import (its updated_at
 *             differs from the import ledger) is never touched; a slug owned by a CMS article is never
 *             taken; categories, tags and old-slug redirects are replaced with the post, in one transaction
 *   ledger    setting `wp_import_ledger`: { wpId: updated_at written }
 */
import { T } from '../config.js';
import { slugify, validateSlug } from '../content/sanitize.js';

export const LEDGER_KEY = 'wp_import_ledger';
export const iso = (d) => (d instanceof Date ? d.toISOString() : d ? new Date(d).toISOString() : null);
/* DATETIME(3): a JS Date with its microseconds dropped, so what is written is what is read back */
export const ms = (d) => (d ? new Date(Math.floor(new Date(d).getTime())) : null);

/**
 * Categories (parents listed before children) or tags. `section` is the report counter object
 * ({ created, existing, adopted, errors }). Returns Map(termId → row id; negative in a dry run for new rows).
 */
export async function upsertTerms(q, { table, items, dryRun, section, label }) {
  const ids = new Map();
  for (const c of items) {
    const prev = await q(`SELECT id FROM ${table} WHERE legacy_wp_term_id = ?`, [c.termId]);
    if (prev.length) {
      ids.set(c.termId, Number(prev[0].id));
      section.existing += 1;
      continue;
    }
    const sameSlug = await q(`SELECT id, legacy_wp_term_id FROM ${table} WHERE slug = ?`, [c.slug]);
    if (sameSlug.length && !sameSlug[0].legacy_wp_term_id) {
      /* the CMS already has it under the same slug: link it, don't duplicate it */
      if (!dryRun) await q(`UPDATE ${table} SET legacy_wp_term_id = ? WHERE id = ?`, [c.termId, sameSlug[0].id]);
      ids.set(c.termId, Number(sameSlug[0].id));
      section.adopted += 1;
      continue;
    }
    if (sameSlug.length) {
      section.errors.push({ termId: c.termId, slug: c.slug, reason: `slug used by another imported ${label} (collation-equal)` });
      continue;
    }
    if (dryRun) ids.set(c.termId, -c.termId);
    else if (table === T.categories) {
      const parent = c.parentTermId ? ids.get(c.parentTermId) ?? null : null;
      const r = await q(`INSERT INTO ${table} (slug, name, description, parent_id, legacy_wp_term_id) VALUES (?, ?, ?, ?, ?)`, [
        c.slug, c.name.slice(0, 200), c.description || null, parent && parent > 0 ? parent : null, c.termId,
      ]);
      ids.set(c.termId, Number(r.insertId));
    } else {
      const r = await q(`INSERT INTO ${table} (slug, name, legacy_wp_term_id) VALUES (?, ?, ?)`, [c.slug, c.name.slice(0, 200), c.termId]);
      ids.set(c.termId, Number(r.insertId));
    }
    section.created += 1;
  }
  return ids;
}

export async function readLedger(q) {
  const rows = await q(`SELECT setting_value FROM ${T.settings} WHERE setting_key = ?`, [LEDGER_KEY]);
  return rows.length ? JSON.parse(rows[0].setting_value) : {};
}

/** Make a slug from the title when WordPress left it empty or unusable; never collides. */
async function freeSlug(q, wanted, wpId) {
  let base = wanted;
  if (!validateSlug(base, { legacy: true }).ok) base = `${slugify(base) || 'post'}-${wpId}`;
  for (let n = 1; n < 50; n += 1) {
    const s = n === 1 ? base : `${base}-${n}`;
    const taken = await q(`SELECT legacy_wp_id FROM ${T.posts} WHERE slug = ?`, [s]);
    if (!taken.length || Number(taken[0].legacy_wp_id) === wpId) return s;
  }
  return `${base}-${wpId}`;
}

/**
 * The old-slug redirects of one post (`/news/<old>` → `/news/<slug>`, 301, source `wp_old_slug`), each one
 * classified into `report.redirects`:
 *   existing   a wp_old_slug redirect from that path already points at this post
 *   created    none exists: inserted when `write`, otherwise counted as "would create" (dry run)
 *   conflicts  a wp_old_slug redirect from that path points somewhere ELSE — reported, never overwritten
 *   skipped    an article uses the old slug, or a manual/import redirect already uses the path
 * Nothing is ever updated or deleted here. `run(sql, params)` is the post's transaction when the post is
 * written, otherwise the pool. With `write` false this only reads.
 */
async function syncRedirects(run, rec, slug, report, write) {
  const to = `/news/${slug}`;
  for (const old of rec.oldSlugs) {
    const from = `/news/${old}`;
    const live = await run(`SELECT id FROM ${T.posts} WHERE slug = ?`, [old]);
    if (live.length) {
      report.redirects.skipped.push({ wpId: rec.wpId, from, reason: 'an article uses that slug' });
      continue;
    }
    const prev = await run(`SELECT to_path, source FROM ${T.redirects} WHERE from_path = ?`, [from]);
    if (prev.length) {
      if (prev[0].source !== 'wp_old_slug') report.redirects.skipped.push({ wpId: rec.wpId, from, reason: `a ${prev[0].source} redirect already uses that path` });
      else if (prev[0].to_path === to) report.redirects.existing += 1;
      else report.redirects.conflicts.push({ wpId: rec.wpId, from, current: prev[0].to_path, expected: to, reason: 'points to a different article; left unchanged' });
      continue;
    }
    if (write) await run(`INSERT INTO ${T.redirects} (from_path, to_path, status_code, source) VALUES (?, ?, 301, 'wp_old_slug')`, [from, to]);
    report.redirects.created += 1;
  }
}

/**
 * Write one post. `rec`:
 *   { wpId, status, slug, title, excerpt, html, publishedAt, updatedAt, createdAt, featuredMediaId,
 *     primaryTermId, categoryTermIds, tagTermIds, seoTitle, seoDescription, legacyUrl, oldSlugs }
 * `ctx`: { pool, q, dryRun, report, ledger, catId, tagId }. Returns 'created' | 'updated' | 'unchanged' |
 * 'protected' | 'skipped' (the reason is in the report).
 */
export async function writePost(rec, ctx) {
  const { pool, q, dryRun, report, ledger, catId, tagId } = ctx;
  const existing = await q(`SELECT id, slug, updated_at FROM ${T.posts} WHERE legacy_wp_id = ?`, [rec.wpId]);
  if (existing.length) {
    const was = ledger[rec.wpId];
    if (!was || iso(existing[0].updated_at) !== was) {
      report.protectedPosts.push({ wpId: rec.wpId, id: Number(existing[0].id), slug: existing[0].slug, reason: was ? 'changed in the CMS after the last import' : 'exists without an import record' });
      return 'protected';
    }
  }

  let slug = rec.slug;
  const v = slug ? validateSlug(slug, { legacy: true }) : { ok: false };
  if (!v.ok || !slug) {
    const fresh = await freeSlug(q, slugify(rec.title) || `post-${rec.wpId}`, rec.wpId);
    report.slugAdjusted.push({ wpId: rec.wpId, from: rec.slug, to: fresh, reason: slug ? v.reason || 'invalid' : 'empty in WordPress' });
    slug = fresh;
  }
  const clash = await q(`SELECT id, legacy_wp_id FROM ${T.posts} WHERE slug = ?`, [slug]);
  if (clash.length && Number(clash[0].legacy_wp_id) !== rec.wpId) {
    report.skippedPosts.push({ wpId: rec.wpId, slug, status: rec.status, reason: clash[0].legacy_wp_id ? 'slug used by another imported post' : 'slug used by an article created in the CMS (not overwritten)' });
    return 'skipped';
  }

  const primary = rec.primaryTermId ? catId.get(rec.primaryTermId) : null;
  const cats = [...new Set(rec.categoryTermIds.map((t) => catId.get(t)).filter(Boolean))];
  const tags = [...new Set(rec.tagTermIds.map((t) => tagId.get(t)).filter(Boolean))];
  const values = {
    slug, title: rec.title.slice(0, 500), excerpt: rec.excerpt || null, content_html: rec.html,
    status: rec.status, published_at: ms(rec.publishedAt), featured_media_id: rec.featuredMediaId || null,
    primary_category_id: primary && primary > 0 ? primary : null, author_name: 'ATLAS News Desk',
    seo_title: rec.seoTitle || null, seo_description: rec.seoDescription || null, legacy_url: rec.legacyUrl,
  };
  const updatedAt = ms(rec.updatedAt);
  const createdAt = ms(rec.createdAt || rec.updatedAt);

  if (existing.length) {
    const cur = (await q(`SELECT slug, title, excerpt, content_html, status, published_at, featured_media_id, primary_category_id, seo_title, seo_description FROM ${T.posts} WHERE id = ?`, [existing[0].id]))[0];
    const curCats = (await q(`SELECT category_id FROM ${T.postCategories} WHERE post_id = ? ORDER BY category_id`, [existing[0].id])).map((r) => Number(r.category_id));
    const curTags = (await q(`SELECT tag_id FROM ${T.postTags} WHERE post_id = ? ORDER BY tag_id`, [existing[0].id])).map((r) => Number(r.tag_id));
    const same = Object.keys(values).filter((k) => k !== 'author_name' && k !== 'legacy_url').every((k) => (cur[k] instanceof Date ? iso(cur[k]) === iso(values[k]) : String(cur[k] ?? '') === String(values[k] ?? '')))
      && curCats.join() === [...cats].sort((a, b) => a - b).join() && curTags.join() === [...tags].sort((a, b) => a - b).join();
    if (same) {
      /* an unchanged post still has its old-slug redirects checked: reported in a dry run, and a genuinely
         missing one is recreated in a real import (nothing else about the post is touched) */
      await syncRedirects(q, rec, slug, report, !dryRun);
      return 'unchanged';
    }
  }
  const outcome = existing.length ? 'updated' : 'created';
  if (dryRun) {
    await syncRedirects(q, rec, slug, report, false);
    return outcome;
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const run = async (sql, params) => (await conn.execute(sql, params))[0];
    let postId;
    if (existing.length) {
      postId = Number(existing[0].id);
      await run(
        `UPDATE ${T.posts} SET slug = ?, title = ?, excerpt = ?, content_html = ?, status = ?, published_at = ?, featured_media_id = ?,
           primary_category_id = ?, author_name = ?, seo_title = ?, seo_description = ?, legacy_url = ?, updated_at = ? WHERE id = ?`,
        [values.slug, values.title, values.excerpt, values.content_html, values.status, values.published_at, values.featured_media_id,
          values.primary_category_id, values.author_name, values.seo_title, values.seo_description, values.legacy_url, updatedAt, postId],
      );
    } else {
      const r = await run(
        `INSERT INTO ${T.posts} (slug, title, excerpt, content_html, status, published_at, featured_media_id, primary_category_id,
           author_name, seo_title, seo_description, legacy_wp_id, legacy_url, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [values.slug, values.title, values.excerpt, values.content_html, values.status, values.published_at, values.featured_media_id,
          values.primary_category_id, values.author_name, values.seo_title, values.seo_description, rec.wpId, values.legacy_url, createdAt, updatedAt],
      );
      postId = Number(r.insertId);
    }
    await run(`DELETE FROM ${T.postCategories} WHERE post_id = ?`, [postId]);
    for (const c of cats) await run(`INSERT INTO ${T.postCategories} (post_id, category_id) VALUES (?, ?)`, [postId, c]);
    await run(`DELETE FROM ${T.postTags} WHERE post_id = ?`, [postId]);
    for (const t of tags) await run(`INSERT INTO ${T.postTags} (post_id, tag_id) VALUES (?, ?)`, [postId, t]);

    /* the post owns /news/<slug>: drop an import redirect that would shadow it (never a manual one) */
    await run(`DELETE FROM ${T.redirects} WHERE from_path = ? AND source IN ('wp_old_slug','import')`, [`/news/${slug}`]);
    await syncRedirects(run, rec, slug, report, true);

    const [[row]] = await conn.execute(`SELECT updated_at FROM ${T.posts} WHERE id = ?`, [postId]);
    ledger[rec.wpId] = iso(row.updated_at);
    await run(
      `INSERT INTO ${T.settings} (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      [LEDGER_KEY, JSON.stringify(ledger)],
    );
    await conn.commit();
    return outcome;
  } catch (e) {
    await conn.rollback().catch(() => {});
    report.skippedPosts.push({ wpId: rec.wpId, slug, status: rec.status, reason: `database error ${e.code || e.message}` });
    return 'skipped';
  } finally {
    conn.release();
  }
}

export const MENU_LEDGER_KEY = 'wp_import_menu';
export const HOMEPAGE_LEDGER_KEY = 'wp_import_homepage';
const SETTINGS_UPSERT = `INSERT INTO ${T.settings} (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`;
const readSetting = async (q, key) => {
  const rows = await q(`SELECT setting_value FROM ${T.settings} WHERE setting_key = ?`, [key]);
  return rows.length ? rows[0].setting_value : null;
};

/**
 * The old site's navigation, as CMS data: `show_in_menu` + `menu_order` on the imported categories.
 * `items` = [{ termId, order }] (everything else imported is left out of the menu). Editor protection, per
 * category: a category whose menu values were changed in the CMS after the import set them (they differ
 * from the ledger `wp_import_menu`), or that was already in the menu before any import, is never touched —
 * it is reported in `section.protected`. Returns nothing; counts go to `section`
 * ({ set, unchanged, protected: [], topLevel }).
 */
export async function applyMenu(q, { items, catId, dryRun, section }) {
  const ledger = JSON.parse((await readSetting(q, MENU_LEDGER_KEY)) || '{}');
  const want = new Map(items.map((i) => [i.termId, i.order]));
  for (const [termId, id] of catId) {
    if (!id || id < 0) {
      if (want.has(termId)) section.set += 1; /* a category this (dry) run creates */
      continue;
    }
    const desired = want.has(termId) ? [1, want.get(termId)] : [0, null];
    const [row] = await q(`SELECT show_in_menu, menu_order FROM ${T.categories} WHERE id = ?`, [id]);
    if (!row) continue;
    const current = [Number(row.show_in_menu), row.menu_order === null ? null : Number(row.menu_order)];
    const same = (a, b) => a && b && a[0] === b[0] && a[1] === b[1];
    if (same(current, desired)) {
      section.unchanged += 1;
      ledger[termId] = desired;
      continue;
    }
    const untouched = ledger[termId] ? same(current, ledger[termId]) : current[0] === 0 && current[1] === null;
    if (!untouched) {
      section.protected.push({ termId, reason: ledger[termId] ? 'menu settings changed in the CMS after the import' : 'already in the navigation before the import' });
      continue;
    }
    if (!dryRun) await q(`UPDATE ${T.categories} SET show_in_menu = ?, menu_order = ? WHERE id = ?`, [desired[0], desired[1], id]);
    ledger[termId] = desired;
    if (desired[0]) section.set += 1;
    else section.removed = (section.removed || 0) + 1;
  }
  if (!dryRun) {
    await q(SETTINGS_UPSERT, [MENU_LEDGER_KEY, JSON.stringify(ledger)]);
    section.topLevel = Number((await q(`SELECT COUNT(*) n FROM ${T.categories} WHERE show_in_menu = 1 AND parent_id IS NULL`))[0].n);
  }
}

/**
 * The old homepage's sections, as the CMS setting `homepage_sections` (lib/news/cms/homepageSections.js).
 * `sections` carry WordPress term ids; they are mapped to this database's category ids here. Written when
 * the setting does not exist yet, or still holds exactly what the import wrote last time (ledger
 * `wp_import_homepage`); sections an editor has changed are never overwritten. `section` gets
 * { result: 'written' | 'would write' (dry run) | 'unchanged' | 'protected' | 'nothing to import', count }.
 */
export async function applyHomepageSections(q, { sections, catId, dryRun, section }) {
  const map = (ids) => (ids || []).map((t) => catId.get(t)).filter((id) => id && id > 0);
  const value = {
    version: 1,
    sections: sections.map((s) => ({
      id: s.id, layout: s.layout, title: s.title || '', width: s.width === 'half' ? 'half' : 'full',
      categoryIds: s.layout === 'tabs' || s.layout === 'heading' ? [] : map(s.termIds),
      count: s.layout === 'heading' ? 0 : s.count, offset: s.layout === 'heading' ? 0 : s.offset || 0,
      tabs: (s.tabs || []).map((t) => ({ label: t.label, categoryIds: map(t.termIds) })),
    })),
  };
  section.count = value.sections.length;
  if (!value.sections.length) {
    section.result = 'nothing to import';
    return;
  }
  const json = JSON.stringify(value);
  const current = await readSetting(q, 'homepage_sections');
  const last = await readSetting(q, HOMEPAGE_LEDGER_KEY);
  if (current === json) {
    section.result = 'unchanged';
    return;
  }
  if (current !== null && current !== last) {
    section.result = 'protected';
    return;
  }
  /* a dry run only PLANS the write: it is reported as such and nothing is stored */
  section.result = dryRun ? 'would write' : 'written';
  if (dryRun) return;
  await q(SETTINGS_UPSERT, ['homepage_sections', json]);
  await q(SETTINGS_UPSERT, [HOMEPAGE_LEDGER_KEY, json]);
}

/** Rows sharing a WordPress id (must all be 0). */
export async function countDuplicates(q) {
  const dup = async (t, col) => Number((await q(`SELECT COUNT(*) n FROM (SELECT ${col} FROM ${t} WHERE ${col} IS NOT NULL GROUP BY ${col} HAVING COUNT(*) > 1) d`))[0].n);
  return {
    posts: await dup(T.posts, 'legacy_wp_id'),
    categories: await dup(T.categories, 'legacy_wp_term_id'),
    tags: await dup(T.tags, 'legacy_wp_term_id'),
    media: await dup(T.media, 'legacy_wp_id'),
    redirects: await dup(T.redirects, 'from_path'),
  };
}
