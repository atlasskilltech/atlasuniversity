/*
 * ATLAS website map — page-health audit.
 *
 *   npm run map:audit                                   # this site's own build (http://localhost:3000)
 *   npm run map:audit -- --base=https://atlasuniversity.edu.in --max=120 --out=audit-production.json
 *   npm run map:audit -- --urls=/library,/examination      # just these (and the homepage)
 *
 * Reads the URL list from data/map/graph.json (written by discover.mjs) — it never discovers URLs
 * by spidering, so it can only ever request pages the map already knows about plus, with --links,
 * the internal links those pages contain, up to --max in total.
 *
 * Per URL: HTTP status and every redirect hop (redirect: 'manual'), final status, <title>,
 * canonical, robots noindex, <h1> count, visible word count, soft-404 detection, internal links and
 * which of them are broken. Each extracted fee / date / eligibility value is also looked for in its
 * source page's text, so "Verified on page" means the value was actually found there.
 *
 * Politeness is enforced, not optional: bounded concurrency, a delay between requests, a timeout
 * per request, a hard URL cap, and production gets one request at a time with >= 1.5s between them.
 * Writes data/map/audit.json. Nothing here runs when someone visits /map.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normPath, clean } from './lib/text.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, 'data', 'map');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? 'true'];
  }),
);
const BASE = (args.base || 'http://localhost:3000').replace(/\/+$/, '');
const PRODUCTION = /(^|\.)atlasuniversity\.edu\.in$/i.test(new URL(BASE).hostname);
const ENV = PRODUCTION ? 'production' : /^(localhost|127\.0\.0\.1)$/.test(new URL(BASE).hostname) ? 'local-build' : 'other';
const MAX = Math.min(Number(args.max || (PRODUCTION ? 150 : 600)), PRODUCTION ? 300 : 2000);
const CONCURRENCY = PRODUCTION ? 1 : Math.max(1, Math.min(Number(args.concurrency || 3), 6));
const DELAY = PRODUCTION ? Math.max(1500, Number(args.delay || 1500)) : Number(args.delay || 100);
const TIMEOUT = Number(args.timeout || 15000);
const FOLLOW_LINKS = args.links !== 'false';
const UA = 'ATLAS-website-map-audit/1.0 (+bounded page-health check)';
/* --out=audit-production.json keeps a live-site check apart from the snapshot the page reads */
const OUT_FILE = path.basename(args.out || 'audit.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function textOf(html) {
  return clean(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&rsquo;/g, '’')
      .replace(/&#8377;|&#x20b9;/gi, '₹'),
  );
}
const attr = (tag, name) => (tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, 'i')) || [])[1] || null;

function parse(html) {
  const title = clean(((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').replace(/&amp;/g, '&').replace(/&#x27;/g, "'"));
  const canonTag = (html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i) || [])[0];
  const robotsTag = (html.match(/<meta[^>]+name=["']robots["'][^>]*>/i) || [])[0];
  const descTag = (html.match(/<meta[^>]+name=["']description["'][^>]*>/i) || [])[0];
  /* the page's own content — header/footer chrome excluded where it is marked up as such */
  const mainEl = html.match(/<main[\s\S]*<\/main>/i);
  const body = (mainEl ? mainEl[0] : html).replace(/<header[\s\S]*?<\/header>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ');
  const text = textOf(body);
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((m) => m[1].replace(/&amp;/g, '&'));
  return {
    title,
    canonical: canonTag ? attr(canonTag, 'href') : null,
    noindex: robotsTag ? /noindex/i.test(attr(robotsTag, 'content') || '') : false,
    description: descTag ? attr(descTag, 'content') : null,
    h1: (body.match(/<h1\b/gi) || []).length,
    words: text ? text.split(/\s+/).length : 0,
    text,
    fullText: textOf(html),
    links,
  };
}

async function request(url) {
  const res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': UA, accept: 'text/html,*/*' }, signal: AbortSignal.timeout(TIMEOUT) });
  return res;
}

/* one URL: follow redirects by hand so every hop is recorded */
async function check(p) {
  const hops = [];
  let url = BASE + encodeURI(p);
  for (let i = 0; i < 6; i++) {
    let res;
    try {
      res = await request(url);
    } catch (e) {
      return { status: null, error: e.name === 'TimeoutError' ? 'timeout' : 'unreachable', hops };
    }
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      const next = new URL(res.headers.get('location'), url);
      /* the raw path: a slash-only redirect (/x -> /x/) must not read as a loop */
      let to = next.href;
      if (next.origin === new URL(BASE).origin) {
        try {
          to = decodeURI(next.pathname);
        } catch {
          to = next.pathname;
        }
      }
      hops.push({ status: res.status, to });
      await res.body?.cancel();
      if (next.origin !== new URL(BASE).origin) return { status: hops[0].status, finalStatus: null, hops, offsite: true };
      url = next.href;
      continue;
    }
    const type = res.headers.get('content-type') || '';
    const result = { status: hops.length ? hops[0].status : res.status, finalStatus: res.status, hops, finalPath: normPath(new URL(url).pathname), contentType: type.split(';')[0] };
    if (/text\/html/i.test(type)) Object.assign(result, parse(await res.text()));
    else await res.body?.cancel();
    return result;
  }
  return { status: hops[0]?.status ?? null, error: 'too-many-redirects', hops };
}

async function main() {
  const graph = JSON.parse(fs.readFileSync(path.join(OUT, 'graph.json'), 'utf8'));
  const factsFile = JSON.parse(fs.readFileSync(path.join(OUT, 'facts.json'), 'utf8'));
  const queue = [];
  const known = new Set();
  const enqueue = (p) => {
    if (!p || known.has(p) || known.size >= MAX) return;
    known.add(p);
    queue.push(p);
  };
  if (args.urls) {
    /* an explicit, bounded list (plus the homepage, the soft-404 reference) — e.g. to re-check
       a handful of pages after an edit without auditing the whole map */
    enqueue('/');
    for (const u of args.urls.split(',')) enqueue(normPath(u));
  } else {
    /* a local build only serves the pages built here: a node that opens on the live site is not requested */
    for (const n of graph.nodes) if (n.path && (PRODUCTION || n.built !== false)) enqueue(n.path);
    for (const r of graph.redirects) enqueue(normPath(r.source));
  }

  console.log(`[audit] ${ENV} · ${queue.length} URLs queued (cap ${MAX}) · concurrency ${CONCURRENCY} · ${DELAY}ms between requests`);
  const pages = {};
  const started = new Date().toISOString();
  let homeText = null;

  async function visit(p) {
    const r = await check(p);
    r.checkedAt = new Date().toISOString();
    if (p === '/' && r.text) homeText = r.text;
    pages[p] = r;
    if (FOLLOW_LINKS && r.links) {
      for (const l of r.links) {
        /* absolute links are followed only on production (on a local build they leave the site) */
        const lp = /^(https?:)?\/\//i.test(l) ? (PRODUCTION ? normPath(l) : null) : l.startsWith('/') ? normPath(l) : null;
        if (lp && !/\.(png|jpe?g|webp|svg|gif|mp4|webm|css|js|ico|woff2?)$/i.test(lp) && !lp.startsWith('/_next') && !lp.startsWith('/api/')) enqueue(lp);
      }
    }
    process.stdout.write('.');
    await sleep(DELAY);
  }
  async function worker() {
    while (queue.length) await visit(queue.shift());
  }
  /* the homepage alone first, so soft-404 detection has its reference text; then the pool */
  if (queue.includes('/')) {
    queue.splice(queue.indexOf('/'), 1);
    await visit('/');
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  process.stdout.write('\n');

  /* chrome links: a link on most pages of one site (ATLAS, or ISDI with its own header/footer) is
     navigation, not page content — reported once, site-wide, not against every page */
  const siteOf = (p) => (p.startsWith('/schools/isdi') ? 'isdi' : 'atlas');
  const freq = {};
  const htmlPages = {};
  for (const [p, r] of Object.entries(pages)) {
    if (!r.links) continue;
    const s = siteOf(p);
    htmlPages[s] = (htmlPages[s] || 0) + 1;
    for (const l of new Set(r.links.map((x) => normPath(x)).filter(Boolean))) {
      freq[s] ||= {};
      freq[s][l] = (freq[s][l] || 0) + 1;
    }
  }
  const isChrome = (s, l) => htmlPages[s] >= 5 && (freq[s]?.[l] || 0) >= htmlPages[s] * 0.6;
  const brokenTarget = (lp) => pages[lp] && (pages[lp].error || (pages[lp].finalStatus ?? 0) >= 400 || pages[lp].soft404);
  const sitewide = {};

  for (const [p, r] of Object.entries(pages)) {
    const ok = r.finalStatus === 200;
    const finalPath = r.finalPath || p;
    /* soft 404: a 200 that says "not found", or a URL that quietly serves the homepage */
    r.soft404 = Boolean(
      ok && r.text != null &&
        (/(404|page not found|not found)/i.test(r.title || '') || (finalPath !== '/' && homeText && r.text === homeText)),
    );
    const canonPath = r.canonical ? normPath(r.canonical) : null;
    r.canonicalPath = canonPath;
    r.indexable = ok && !r.soft404 && !r.noindex && (!canonPath || canonPath === finalPath);
    /* an absolute atlasuniversity.edu.in link is internal only when auditing production itself; on a
       local build it is a deliberate link out to a page this site does not serve (yet) */
    const internal = [...new Set((r.links || [])
      .map((l) => (l.startsWith('/') || (PRODUCTION && /^https?:\/\/(www\.)?atlasuniversity\.edu\.in/i.test(l)) ? normPath(l) : null))
      .filter(Boolean))];
    const site = siteOf(p);
    r.brokenLinks = internal.filter((lp) => !isChrome(site, lp) && brokenTarget(lp));
    for (const lp of internal) if (isChrome(site, lp) && brokenTarget(lp)) (sitewide[site] ||= new Set()).add(lp);
    const missing = [];
    if (!r.title) missing.push('title');
    if (!r.description) missing.push('description');
    if (!r.canonical) missing.push('canonical');
    if (!r.h1) missing.push('main heading');
    if (r.words < 80) missing.push('text content');
    r.missing = missing;
    r.completeness = !ok ? 'unavailable' : r.soft404 ? 'empty' : missing.length === 0 && !r.brokenLinks.length ? 'complete' : 'partial';
    r.linkCount = internal.length;
    delete r.links;
  }

  /* is each extracted value really on its source page? */
  const norm = (s) => clean(s).toLowerCase().replace(/[₹,()]/g, '').replace(/\s+/g, '');
  const facts = {};
  for (const f of factsFile.facts) {
    const pg = pages[f.route];
    if (!pg || pg.text == null) continue;
    const value = f.kind === 'document' ? null : norm(f.value);
    if (!value) continue;
    facts[f.id] = { found: norm(pg.fullText || pg.text).includes(value), checkedAt: pg.checkedAt };
  }
  for (const r of Object.values(pages)) {
    delete r.text;
    delete r.fullText;
  }

  const out = {
    checkedAt: started,
    finishedAt: new Date().toISOString(),
    environment: ENV,
    capped: known.size >= MAX,
    sitewideBrokenLinks: Object.fromEntries(Object.entries(sitewide).map(([k, v]) => [k, [...v].sort()])),
    pages,
    facts,
  };
  fs.writeFileSync(path.join(OUT, OUT_FILE), JSON.stringify(out, null, 1));
  const vals = Object.values(pages);
  const by = (f) => vals.filter(f).length;
  console.log(
    `[audit] ${vals.length} URLs · 200: ${by((r) => r.finalStatus === 200 && !r.soft404)} · redirects: ${by((r) => r.hops?.length)} · ` +
      `4xx: ${by((r) => r.finalStatus >= 400 && r.finalStatus < 500)} · 5xx: ${by((r) => r.finalStatus >= 500)} · ` +
      `unreachable: ${by((r) => r.error)} · soft-404: ${by((r) => r.soft404)} · pages with broken content links: ${by((r) => r.brokenLinks.length)} · ` +
      `site-wide broken nav links: ${Object.values(sitewide).reduce((a, v) => a + v.size, 0)} · ` +
      `facts found ${Object.values(facts).filter((x) => x.found).length}/${Object.keys(facts).length}`,
  );
}

main().catch((e) => {
  console.error(`[audit] failed: ${e.stack || e}`);
  process.exitCode = 1;
});
