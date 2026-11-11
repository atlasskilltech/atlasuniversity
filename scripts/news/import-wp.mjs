#!/usr/bin/env node
/**
 * npm run news:import-wp -- --dump=<file.sql> --media-root=<dir> [--media-root=<dir> …] [options]
 *
 * Imports the WordPress News posts into the ATLAS News tables (lib/news/import/*). DRY RUN BY DEFAULT:
 * the dump is parsed, every post converted and every image/video located and validated, and the report
 * written — nothing is written to the database or to S3.
 *
 *   --execute            write: upload media to S3 (content-addressed, never overwriting) and upsert
 *                        categories, tags, media rows, posts and old-slug redirects
 *   --allow-remote-db    required with --execute when DB_HOST is not localhost (i.e. a real server)
 *   --report-dir=<dir>   where report.json and the CSV lists go (default ./wp-import-report-<time>)
 *   --only=<id,id,…>     limit to these WordPress post ids (testing)
 *   --phase=<p>          all (default) | images | videos | posts — see below
 *   --batch=<n>          with images/videos: store at most n NEW media, then exit
 *
 * Large imports run in phases, one short process per batch, so memory stays bounded and an interruption
 * loses at most the medium in flight (the database rows ARE the progress; nothing is held in memory
 * between batches, and a rerun never re-processes what is stored):
 *   --phase=images --batch=150   repeat until "waiting" is 0
 *   --phase=videos --batch=5     repeat until "waiting" is 0
 *   --phase=posts                writes posts; refuses while any locally available medium is not stored
 * After every run <report-dir>/progress.json holds the cumulative counts.
 *
 * Media roots are directories laid out like wp-content/uploads (<yyyy>/<mm>/<file>); they are tried in
 * the order given. Connection: DB_* from the environment, else the git-ignored .env.local / .env (a value
 * already set in the shell always wins). S3: the same ASSETS_S3_* settings the CMS uses.
 * Search indexing is never touched. Drafts stay drafts.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { loadEnv, parseArgs } from '../assets/lib.mjs';
import { closePool, dbConfig } from '../../lib/news/db/pool.js';
import { s3Config } from '../../lib/news/storage/s3.js';
import { parseWordPressDump } from '../../lib/news/import/wpdump.js';
import { buildModel } from '../../lib/news/import/model.js';
import { runImport } from '../../lib/news/import/importer.js';

loadEnv();
/* bounded image memory: no libvips operation cache, one worker thread */
sharp.cache(false);
sharp.concurrency(1);
let peakRss = 0;
setInterval(() => {
  peakRss = Math.max(peakRss, process.memoryUsage().rss);
}, 250).unref();
const args = parseArgs();
const log = (m) => console.log(`[wp-import] ${m}`);

function csv(rows, cols) {
  const esc = (v) => {
    const s = Array.isArray(v) ? v.join(' ') : v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n') + '\n';
}

async function main() {
  const dump = args.dump;
  /* --media-root may be repeated (parseArgs keeps only the last), so read every occurrence */
  const roots = process.argv.slice(2).filter((x) => x.startsWith('--media-root=')).map((x) => path.resolve(x.slice(13)));
  const execute = Boolean(args.execute);
  if (!dump || !fs.existsSync(dump)) throw new Error('--dump=<WordPress SQL dump> is required');
  if (!roots.length) throw new Error('at least one --media-root=<uploads directory> is required');
  for (const r of roots) if (!fs.statSync(r).isDirectory()) throw new Error(`media root is not a directory: ${r}`);

  const db = dbConfig();
  const local = /^(127\.0\.0\.1|localhost|::1)$/i.test(db.host);
  log(`database: ${db.database} (${local ? 'local' : 'REMOTE'})   mode: ${execute ? 'EXECUTE' : 'dry run'}`);
  if (execute && !local && !args['allow-remote-db']) throw new Error('refusing to write to a remote database without --allow-remote-db');
  const s3 = s3Config();
  if (execute && !s3.configured) throw new Error('S3 is not configured (ASSETS_S3_BUCKET / ASSETS_S3_REGION)');
  if (execute) log(`media storage: ${s3.endpoint ? `endpoint ${new URL(s3.endpoint).host}` : `bucket ${s3.bucket}`}, public base ${s3.publicBase ? new URL(s3.publicBase).host : '(none)'}`);

  const t0 = Date.now();
  const tables = parseWordPressDump(fs.readFileSync(dump, 'utf8'));
  const model = buildModel(tables);
  if (args.only) {
    const only = new Set(String(args.only).split(',').map(Number));
    model.posts = model.posts.filter((p) => only.has(p.wpId));
  }
  log(`dump: ${model.posts.filter((p) => p.status === 'published').length} published, ${model.posts.filter((p) => p.status === 'draft').length} drafts, ${model.skipped.private} private skipped; ${model.categories.length} categories, ${model.tags.length} tags`);

  const phase = String(args.phase || 'all');
  if (!['all', 'images', 'videos', 'posts'].includes(phase)) throw new Error(`unknown --phase=${phase}`);
  const batch = args.batch ? Math.max(1, Number(args.batch)) : Infinity;
  delete tables.postmeta;
  const report = await runImport({ model, mediaRoots: roots, dryRun: !execute, log, phase, batch });
  report.source = { dump: path.basename(dump), mediaRoots: roots.length, durationSeconds: Math.round((Date.now() - t0) / 1000) };

  const dir = path.resolve(args['report-dir'] || `wp-import-report-${new Date().toISOString().replace(/[:.]/g, '-')}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'progress.json'), JSON.stringify({ at: report.finishedAt, phase, batch: Number.isFinite(batch) ? batch : null, ...report.progress }, null, 2));
  if (phase === 'images' || phase === 'videos') {
    fs.writeFileSync(path.join(dir, `${phase}-report.json`), JSON.stringify(report, null, 2));
    log(`report: ${dir}`);
    return;
  }
  fs.writeFileSync(path.join(dir, 'report.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(dir, 'missing-media.csv'), csv([
    ...report.missingImages.map((m) => ({ kind: 'image', ...m, reason: 'no local copy' })),
    ...report.failedMedia.map((m) => ({ kind: m.key.startsWith('video:') ? 'video' : 'image', ...m, reason: m.error })),
    ...report.missingVideos.map((m) => ({ kind: 'video', wanted: m.path, posts: m.posts, reason: 'no local copy' })),
  ], ['kind', 'attachmentId', 'wanted', 'posts', 'reason']));
  fs.writeFileSync(path.join(dir, 'posts-not-imported.csv'), csv([
    ...report.skippedPosts.map((s) => ({ ...s, kind: 'skipped' })),
    ...report.protectedPosts.map((s) => ({ ...s, kind: 'protected' })),
  ], ['kind', 'wpId', 'slug', 'status', 'reason']));

  const P = report.posts;
  log(`posts published: +${P.published.created} created, ${P.published.updated} updated, ${P.published.unchanged} unchanged`);
  log(`posts draft:     +${P.draft.created} created, ${P.draft.updated} updated, ${P.draft.unchanged} unchanged`);
  log(`categories: +${report.categories.created} (${report.categories.existing} existing, ${report.categories.adopted} adopted, ${report.categories.errors.length} errors)   tags: +${report.tags.created} (${report.tags.existing} existing, ${report.tags.adopted} adopted, ${report.tags.errors.length} errors)`);
  log(`media: images +${report.media.imagesCreated} (${report.media.imagesReused} reused), videos +${report.media.videosCreated} (${report.media.videosReused} reused); sources ${JSON.stringify(report.media.sourceKinds)}`);
  log(`featured linked: ${report.featured.linked}, featured missing: ${report.featured.missing.length}; images missing: ${report.missingImages.length}, failed: ${report.failedMedia.length}, videos missing: ${report.missingVideos.length}`);
  log(`skipped: ${report.skippedPosts.length}, protected (edited in CMS): ${report.protectedPosts.length}, slugs adjusted: ${report.slugAdjusted.length}, redirects +${report.redirects.created}`);
  log(`duplicates by WordPress id: ${JSON.stringify(report.duplicates)}`);
  log(`report: ${dir}`);
}

main()
  .catch((e) => {
    log(`ERROR: ${e.message}`);
    process.exitCode = 1;
  })
  .finally(() => {
    log(`peak memory: ${Math.round(Math.max(peakRss, process.memoryUsage().rss) / 1048576)} MB`);
    return closePool().catch(() => {});
  });
