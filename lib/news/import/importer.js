/**
 * ATLAS News — WordPress import, step 3: write the model into the `atlasnews_*` tables.
 *
 * Idempotent: every row is matched on its WordPress id (`legacy_wp_term_id`, `legacy_wp_id`), media on
 * the attachment id / uploads path / content hash, redirects on `from_path`. A rerun creates nothing new
 * and re-uploads nothing (S3 keys are content-addressed, and an already-imported medium is found in the
 * database before its file is even read).
 *
 * Editor protection: the importer records, per WordPress post, the `updated_at` it wrote (setting
 * `wp_import_ledger`). On a rerun a post whose `updated_at` no longer equals that value — it was edited,
 * trashed or otherwise changed in the CMS — is NOT touched, and is listed in the report. Categories and
 * tags that already exist are never renamed or moved by a rerun either.
 *
 * Nothing is dropped silently: every skipped post, unresolved image/video, embed carried as a link,
 * adjusted slug and shortened SEO field is in the report.
 *
 * Drafts stay drafts (never public; preview only). Search indexing is never touched.
 */
import { T } from '../config.js';
import { getPool } from '../db/pool.js';
import { convertPost } from './convert.js';
import { applyHomepageSections, applyMenu, countDuplicates, readLedger, upsertTerms, writePost } from './write.js';
import { baseUploadPath, bodyImage, candidates, makeLocator, storeImage, storeVideo, videoUrl } from './media.js';

export { LEDGER_KEY } from './write.js';
const LOCK = 'atlasnews_wp_import';

function newReport() {
  return {
    startedAt: new Date().toISOString(),
    dryRun: true,
    posts: { published: { created: 0, updated: 0, unchanged: 0 }, draft: { created: 0, updated: 0, unchanged: 0 } },
    skippedPosts: [],
    protectedPosts: [],
    slugAdjusted: [],
    categories: { created: 0, existing: 0, adopted: 0, errors: [] },
    tags: { created: 0, existing: 0, adopted: 0, errors: [] },
    media: { imagesCreated: 0, imagesReused: 0, sameBytesAsAnother: 0, videosCreated: 0, videosReused: 0, sourceKinds: { original: 0, 'wp-scaled': 0, resized: 0 } },
    featured: { linked: 0, missing: [] },
    missingImages: [],
    missingVideos: [],
    failedMedia: [],
    embedsAsLinks: [],
    emptyInSource: [],
    seoShortened: [],
    redirects: { created: 0, existing: 0, conflicts: [], skipped: [] },
    menu: { set: 0, unchanged: 0, protected: [], topLevel: null },
    homepage: { result: null, count: 0, skipped: [] },
    privateSkipped: 0,
    duplicates: { posts: 0, categories: 0, tags: 0, media: 0, redirects: 0 },
  };
}

/** Every image and video the posts reference, keyed by attachment (or uploads path), with the posts using it. */
export function planMedia(model) {
  const attFor = (ref) => {
    if (ref.attachmentId && model.attachments.has(ref.attachmentId)) return model.attachments.get(ref.attachmentId);
    const id = model.attachmentByFile.get(ref.path) ?? model.attachmentByFile.get(baseUploadPath(ref.path));
    return id ? model.attachments.get(id) : null;
  };
  const keyOf = (ref) => {
    const a = attFor(ref);
    return a ? `att:${a.id}` : ref.path ? `path:${ref.path}` : null;
  };
  const needImages = new Map();
  const needVideos = new Map();
  for (const p of model.posts) {
    if (p.featuredAttachmentId) {
      const k = `att:${p.featuredAttachmentId}`;
      (needImages.get(k) || needImages.set(k, { attachmentId: p.featuredAttachmentId, path: null, posts: new Set() }).get(k)).posts.add(p.wpId);
    }
    convertPost(p.contentRaw, {
      site: model.site,
      image: (ref) => {
        const k = keyOf(ref);
        if (k) (needImages.get(k) || needImages.set(k, { ...ref, posts: new Set() }).get(k)).posts.add(p.wpId);
        return null;
      },
      video: (ref) => {
        if (ref.path) (needVideos.get(ref.path) || needVideos.set(ref.path, { ...ref, posts: new Set() }).get(ref.path)).posts.add(p.wpId);
        return null;
      },
    });
  }
  return { attFor, keyOf, needImages, needVideos };
}

/**
 * @param {object} o
 * @param {ReturnType<import('./model.js').buildModel>} o.model
 * @param {string[]} o.mediaRoots   directories laid out like wp-content/uploads
 * @param {boolean} [o.dryRun=true] resolve and convert everything, write nothing
 * @param {(msg:string)=>void} [o.log]
 * @param {'all'|'images'|'videos'|'posts'} [o.phase='all']
 *   images / videos: store at most `batch` NEW media and stop (one short process per batch keeps memory
 *   bounded; the database rows are the persisted progress, so an interrupted batch simply resumes).
 *   posts: write posts using media that is already stored — it stores no media, and refuses to start
 *   while an image or video that has a local copy is still waiting to be stored.
 * @param {number} [o.batch=Infinity]
 */
export async function runImport({ model, mediaRoots, dryRun = true, log = () => {}, phase = 'all', batch = Infinity }) {
  const report = newReport();
  report.dryRun = dryRun;
  report.phase = phase;
  report.progress = { imagesStored: 0, imagesPending: 0, imagesNoLocalCopy: 0, imagesFailed: 0, videosStored: 0, videosPending: 0, videosNoLocalCopy: 0, newThisRun: 0 };
  const storeImages = phase === 'all' || phase === 'images';
  const storeVideos = phase === 'all' || phase === 'videos';
  const writePosts = phase === 'all' || phase === 'posts';
  let budget = batch;
  report.privateSkipped = model.skipped.private;
  const locate = makeLocator(mediaRoots);
  const pool = getPool();
  const q = async (sql, params = []) => (await pool.execute(sql, params))[0];
  const db = { q };

  /* one import per database at a time. A named lock belongs to the CONNECTION that took it, so it is
     taken and released on one dedicated connection, never on whichever pool connection is free. */
  const lockConn = await pool.getConnection();
  const [[{ db: dbName }]] = await lockConn.query('SELECT DATABASE() AS db');
  const lockName = `${LOCK}:${dbName}`;
  const [[lock]] = await lockConn.query('SELECT GET_LOCK(?, 5) AS ok', [lockName]);
  if (Number(lock.ok) !== 1) {
    lockConn.release();
    throw new Error('another WordPress import is running against this database');
  }
  try {
    /* ---------------------------------------------------------------- categories (parents first), tags */
    const catId = await upsertTerms(q, { table: T.categories, items: model.categories, dryRun, section: report.categories, label: 'category' });
    const tagId = await upsertTerms(q, { table: T.tags, items: model.tags, dryRun, section: report.tags, label: 'tag' });

    /* ---------------------------------------------------------------- media: what the posts need */
    const { attFor, keyOf, needImages, needVideos } = planMedia(model);
    log(`media needed: ${needImages.size} images, ${needVideos.size} videos`);

    const imageRow = new Map();
    let done = 0;
    for (const [k, ref] of needImages) {
      done += 1;
      if (done % 200 === 0) log(`images ${done}/${needImages.size}`);
      const att = attFor(ref);
      const cands = candidates(att, ref.path);
      let stored = null;
      let lastErr = null;
      let pending = false;
      let hadFile = false;
      for (const c of cands) {
        const file = locate(c.path);
        if (!file) continue;
        hadFile = true;
        try {
          /* over this run's budget (or not an image phase): look up only — no decoding, no upload */
          const lookupOnly = writePosts && !storeImages ? 'full' : !storeImages || budget <= 0 ? 'fast' : false;
          const r = await storeImage(db, { file, rel: c.path, attachment: att, dryRun, lookupOnly });
          if (r.pending) {
            pending = true;
            break;
          }
          if (r.created) budget -= 1;
          /* the source kind is the file actually stored, which a rerun reads back from the row */
          const storedPath = r.storedPath || c.path;
          stored = { ...r, why: cands.find((x) => x.path === storedPath)?.why || c.why, rel: storedPath };
          break;
        } catch (e) {
          lastErr = `${c.path}: ${e.code || e.name}: ${e.message}`;
        }
      }
      if (pending) {
        report.progress.imagesPending += 1;
        continue;
      }
      if (!stored) {
        report.progress[hadFile ? 'imagesFailed' : 'imagesNoLocalCopy'] += 1;
        const entry = { key: k, attachmentId: att?.id ?? null, wanted: cands[0]?.path ?? ref.path, posts: [...ref.posts] };
        if (lastErr) report.failedMedia.push({ ...entry, error: lastErr });
        else report.missingImages.push(entry);
        continue;
      }
      report.media.sourceKinds[stored.why] += 1;
      report.progress.imagesStored += 1;
      if (stored.created) {
        report.media.imagesCreated += 1;
        report.progress.newThisRun += 1;
      }
      else {
        report.media.imagesReused += 1;
        if (stored.reused === 'sha256') report.media.sameBytesAsAnother += 1;
      }
      imageRow.set(k, stored);
    }

    const videoRow = new Map();
    for (const [p, ref] of needVideos) {
      const file = locate(p);
      if (!file) {
        report.missingVideos.push({ path: p, posts: [...ref.posts] });
        report.progress.videosNoLocalCopy += 1;
        continue;
      }
      try {
        const r = await storeVideo(db, { file, rel: p, dryRun, lookupOnly: !storeVideos || budget <= 0 });
        if (r.pending) {
          report.progress.videosPending += 1;
          continue;
        }
        if (r.created) {
          budget -= 1;
          report.progress.newThisRun += 1;
          log(`video stored: ${p}`);
        }
        report.progress.videosStored += 1;
        videoRow.set(p, r);
        report.media[r.created ? 'videosCreated' : 'videosReused'] += 1;
      } catch (e) {
        report.failedMedia.push({ key: `video:${p}`, posts: [...ref.posts], error: `${e.code || e.name}: ${e.message}` });
      }
    }

    log(`progress: images ${report.progress.imagesStored} stored, ${report.progress.imagesPending} waiting, ${report.progress.imagesNoLocalCopy} no local copy, ${report.progress.imagesFailed} failed; videos ${report.progress.videosStored} stored, ${report.progress.videosPending} waiting; new this run ${report.progress.newThisRun}`);
    if (!writePosts) {
      report.finishedAt = new Date().toISOString();
      return report;
    }
    if (report.progress.imagesPending || report.progress.videosPending) {
      throw new Error(`refusing to write posts: ${report.progress.imagesPending} images and ${report.progress.videosPending} videos with a local copy are not stored yet (run the images/videos phases first)`);
    }

    /* rows for URL building */
    const rowCache = new Map();
    const loadRows = async (ids) => {
      const want = [...new Set(ids)].filter((id) => id && id > 0 && !rowCache.has(id));
      for (let i = 0; i < want.length; i += 500) {
        const chunk = want.slice(i, i + 500);
        const rows = await q(`SELECT id, kind, storage_key, mime_type, width, height, variants, alt_text FROM ${T.media} WHERE id IN (${chunk.map(() => '?').join(',')})`, chunk);
        for (const r of rows) rowCache.set(Number(r.id), r);
      }
    };
    await loadRows([...imageRow.values(), ...videoRow.values()].map((r) => r.mediaId));

    /* ---------------------------------------------------------------- posts */
    const ledger = await readLedger(q);

    for (const p of model.posts) {
      const conv = convertPost(p.contentRaw, {
        site: model.site,
        image: (ref) => {
          const s = imageRow.get(keyOf(ref));
          if (!s) return null;
          if (dryRun || !s.mediaId) return { src: `https://dry-run.invalid/${s.rel}`, width: s.width, height: s.height };
          return bodyImage(rowCache.get(s.mediaId));
        },
        video: (ref) => {
          const s = videoRow.get(ref.path);
          if (!s) return null;
          if (dryRun || !s.mediaId) return { src: `https://dry-run.invalid/${ref.path}`, type: s.type };
          return videoUrl(rowCache.get(s.mediaId));
        },
      });
      for (const e of conv.report.embedsAsLinks) report.embedsAsLinks.push({ wpId: p.wpId, url: e });
      for (const e of conv.report.emptyInSource) report.emptyInSource.push({ wpId: p.wpId, what: e });
      if (Object.keys(conv.report.droppedBySanitizer).length) {
        /* never store a body that lost media on the way in */
        report.skippedPosts.push({ wpId: p.wpId, slug: p.slug, status: p.status, reason: `the sanitiser would remove ${JSON.stringify(conv.report.droppedBySanitizer)} (media URL not https?)` });
        continue;
      }
      if (p.seoDescriptionCut || p.seoTitleCut) report.seoShortened.push({ wpId: p.wpId, title: p.seoTitleCut, description: p.seoDescriptionCut });

      const featured = p.featuredAttachmentId ? imageRow.get(`att:${p.featuredAttachmentId}`) : null;
      if (p.featuredAttachmentId && !featured) report.featured.missing.push({ wpId: p.wpId, attachmentId: p.featuredAttachmentId, status: p.status });

      if (featured) report.featured.linked += 1;
      const outcome = await writePost({
        wpId: p.wpId, status: p.status, slug: p.slug, title: p.title, excerpt: p.excerptRaw || conv.excerpt || null, html: conv.html,
        publishedAt: p.publishedAt, updatedAt: p.modifiedAt || p.publishedAt || p.draftDate || new Date(), createdAt: p.draftDate || p.publishedAt,
        featuredMediaId: featured?.mediaId || null, primaryTermId: p.primaryTermId, categoryTermIds: p.categoryTermIds, tagTermIds: p.tagTermIds,
        seoTitle: p.seoTitle, seoDescription: p.seoDescription, legacyUrl: `${model.site}/${p.slug}/`, oldSlugs: p.oldSlugs,
      }, { pool, q, dryRun, report, ledger, catId, tagId });
      if (report.posts[p.status][outcome] !== undefined) report.posts[p.status][outcome] += 1;
    }

    /* the old site's navigation and homepage sections, as CMS data */
    report.menu = { ...report.menu, name: model.menu?.name || null, ignored: model.menu?.ignored || [], mismatches: model.menu?.mismatches || [] };
    if (model.menu?.items?.length) await applyMenu(q, { items: model.menu.items, catId, dryRun, section: report.menu });
    report.homepage.skipped = model.homepage?.skipped || [];
    await applyHomepageSections(q, { sections: model.homepage?.sections || [], catId, dryRun, section: report.homepage });

    /* duplicates in the result: rows sharing a WordPress id (must be 0) */
    if (!dryRun) report.duplicates = await countDuplicates(q);
  } finally {
    await lockConn.query('SELECT RELEASE_LOCK(?)', [lockName]).catch(() => {});
    lockConn.release();
  }
  report.finishedAt = new Date().toISOString();
  return report;
}
