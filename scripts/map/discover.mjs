/*
 * ATLAS website map — discovery.
 *
 *   npm run map:discover          (also runs automatically before `next build`)
 *
 * Reads the project itself — `app/` routes, `next.config.mjs` redirects, the navigation models and
 * every page's `lib/` content modules — and writes a snapshot the /map page renders:
 *
 *   data/map/graph.json         nodes + relationships
 *   data/map/facts.json         fees, dates, eligibility, durations, documents — each with its source —
 *                               plus `crm`: every page embedding the CRM widget (reference vs this site)
 *   data/map/history.json       what changed between runs (pages added/removed, values changed)
 *
 * No network access, no crawling, nothing executed from page code. Deterministic: the same project
 * produces the same snapshot (apart from timestamps). If discovery fails, the previous snapshot is
 * kept and the build carries on with it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { discoverRoutes, discoverRedirects, discoverDataRoutes } from './lib/routes.mjs';
import { crmInventory } from './lib/crm.mjs';
import { extractFacts } from './lib/extract.mjs';
import { buildGraph } from './lib/graph.mjs';
import { flat, clean, normPath, degreeOf, parseAmount } from './lib/text.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, 'data', 'map');
const now = new Date().toISOString();

const load = (rel) => import(pathToFileURL(path.join(ROOT, `${rel}.js`)).href);
const readJson = (f, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
  } catch {
    return fallback;
  }
};

/* every internal href written anywhere in a page's content modules */
function collectLinks(modules) {
  const out = new Set();
  const seen = new WeakSet();
  const visit = (v, depth) => {
    if (!v || typeof v !== 'object' || depth > 14 || seen.has(v)) return;
    seen.add(v);
    if (!Array.isArray(v) && typeof v.href === 'string') {
      const p = normPath(v.href);
      if (p) out.add(p);
    }
    for (const x of Array.isArray(v) ? v : Object.values(v)) visit(x, depth + 1);
  };
  modules.forEach((m) => Object.values(m).forEach((v) => visit(v, 0)));
  return [...out];
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const fileRoutes = discoverRoutes(ROOT);
  /* the pages a catch-all serves from a registry of generated page data (ISME) are routes too */
  const routes = [...fileRoutes, ...discoverDataRoutes(ROOT, fileRoutes)].sort((a, b) => a.route.localeCompare(b.route));
  const redirects = await discoverRedirects(ROOT);
  const nav = await load('lib/navigation');
  const isdiNavMod = await load('lib/schools/isdi/navigation');
  const footer = await load('lib/footerContent');

  const facts = [];
  const contentLinks = {};
  const lists = [];
  const landings = [];
  const posts = [];
  const moduleErrors = [];

  for (const r of routes) {
    /* a registry page's data is its one content module */
    const mods = r.data ? [{ page: r.data }] : [];
    for (const m of r.modules) {
      try {
        mods.push(await load(m));
      } catch (e) {
        moduleErrors.push({ route: r.route, module: m, error: String(e.message || e).slice(0, 200) });
      }
    }
    /* title fallback: a page whose metadata reads `content.meta.title` */
    if (!r.meta.title) {
      for (const m of mods) {
        for (const v of Object.values(m)) {
          if (v && typeof v === 'object' && v.meta && typeof v.meta.title === 'string') r.meta.title ||= clean(v.meta.title);
          if (v && typeof v === 'object' && typeof v.title === 'string' && typeof v.description === 'string' && !Array.isArray(v)) r.meta.title ||= clean(v.title);
        }
      }
    }
    /* the page's own heading: a `hero` export (`hero`, `isdiBdesAccessoryHero`, …) */
    for (const m of mods) {
      for (const [k, v] of Object.entries(m)) {
        if (r.heroTitle || !/hero$/i.test(k) || !v || typeof v !== 'object') continue;
        r.heroTitle = flat(v.title || v.heading || v.slides?.[0]?.title || '') || null;
      }
    }
    if (r.data && !r.heroTitle) {
      const h = (Array.isArray(r.data.blocks) ? r.data.blocks : Object.values(r.data.blocks || {})).find((b) => b && (b.kind === 'hero' || b.title || b.heading));
      r.heroTitle = h ? flat(h.title || h.heading || h.slides?.[0]?.title || '') || null : null;
    }
    if (r.dynamic) continue;
    facts.push(...extractFacts(r.route, mods));
    contentLinks[r.route] = collectLinks(mods);

    for (const m of mods) {
      if (m.programList?.entries) {
        const lvl = r.route.startsWith('/programs/ug/') ? 'ug' : r.route.startsWith('/programs/pg/') ? 'pg' : /integrated/.test(r.route) ? 'integrated' : null;
        const sectionRows = m.programList.eligibilityRows || [];
        lists.push({
          route: r.route,
          level: lvl,
          entries: m.programList.entries
            .filter((e) => e.explore?.href)
            .map((e) => ({
              title: flat(e.title),
              href: e.explore.href,
              eligibility: (e.eligibilityRows || sectionRows).map((x) => ({
                label: flat(x.label),
                value: Array.isArray(x.values) ? x.values.map(flat).join(' · ') : flat(x.value),
              })),
            })),
        });
      }
      if (r.route.startsWith('/programs/') && m.programs?.cards) {
        landings.push({ route: r.route, cards: m.programs.cards.filter((c) => c.button?.href).map((c) => ({ title: flat(c.title), href: c.button.href })) });
      }
      if (Array.isArray(m.cards) && m.cards.length && m.cards.every((c) => c && c.title && c.href && c.date)) {
        posts.push({ route: r.route, cards: m.cards.map((c) => ({ title: flat(c.title), href: c.href, date: flat(c.date) })) });
      }
    }
  }

  const nodes = buildGraph({
    routes,
    redirects,
    nav,
    isdiNav: { megaMenu: isdiNavMod.isdiMegaMenu, utilityLinks: isdiNavMod.isdiUtilityLinks },
    footer,
    lists,
    landings,
    posts,
    contentLinks,
  });

  /* ---- programme ↔ facts: own page, listing pages, the school's admissions pages ------------ */
  const admissionsBy = {};
  for (const r of routes) {
    const m = r.route.match(/^\/schools\/(\w+)\/admissions\//);
    /* only an admissions page that names a degree (not e.g. a summer school's) answers for programmes */
    const deg = degreeOf(r.route);
    if (m && deg) admissionsBy[`${m[1]}|${deg}`] = r.route;
  }
  const conflicts = [];
  for (const n of nodes) {
    if (n.type !== 'programme') continue;
    const adm = n.degree ? admissionsBy[`${n.school}|${n.degree}`] : null;
    n.related = { admissions: adm || null };
    /* the same fee / duration published on two pages must agree */
    const pool = facts.filter((f) => f.route === n.path || f.route === adm);
    for (const key of ['applicationFee', 'enrolmentFee', 'duration']) {
      const vals = pool.filter((f) => f.key === key);
      const norm = (f) => (key === 'duration' ? (f.value.match(/(\d+)\s*-?\s*year/i) || [])[1] || clean(f.value).toLowerCase() : parseAmount(f.value));
      const distinct = [...new Set(vals.map(norm))];
      if (distinct.length > 1) {
        conflicts.push({ programme: n.id, key, values: vals.map((f) => ({ route: f.route, value: f.value })) });
      }
    }
  }

  /* ---- history: compare with the previous snapshot ----------------------------------------- */
  const prevGraph = readJson('graph.json', null);
  const prevFacts = readJson('facts.json', null);
  const history = readJson('history.json', { runs: [] });
  const change = { at: now, pagesAdded: [], pagesRemoved: [], valuesChanged: [] };
  if (prevGraph) {
    const before = new Set(prevGraph.routes.map((r) => r.route));
    const after = new Set(routes.map((r) => r.route));
    change.pagesAdded = [...after].filter((r) => !before.has(r));
    change.pagesRemoved = [...before].filter((r) => !after.has(r));
  }
  if (prevFacts) {
    const k = (f) => [f.route, f.kind, f.key, f.group || '', f.label].join('|');
    const old = new Map(prevFacts.facts.map((f) => [k(f), f.value]));
    for (const f of facts) {
      if (old.has(k(f)) && old.get(k(f)) !== f.value) {
        change.valuesChanged.push({ route: f.route, kind: f.kind, label: f.label, group: f.group || null, from: old.get(k(f)), to: f.value });
      }
    }
  }
  if (change.pagesAdded.length || change.pagesRemoved.length || change.valuesChanged.length || !history.runs.length) {
    history.runs.unshift(change);
    history.runs = history.runs.slice(0, 50);
  }

  const graph = {
    generatedAt: now,
    routes: routes.map(({ route, dynamic, meta, modules, heroTitle }) => ({ route, dynamic, meta, heroTitle: heroTitle || null, contentModules: modules.length })),
    redirects: Array.isArray(redirects) ? redirects : [],
    moduleErrors,
    nodes,
  };
  fs.writeFileSync(path.join(OUT, 'graph.json'), JSON.stringify(graph, null, 1));
  const crm = crmInventory(ROOT, routes, redirects);
  fs.writeFileSync(path.join(OUT, 'facts.json'), JSON.stringify({ generatedAt: now, facts, conflicts, crm }, null, 1));
  fs.writeFileSync(path.join(OUT, 'history.json'), JSON.stringify(history, null, 1));
  if (!fs.existsSync(path.join(OUT, 'audit.json'))) {
    fs.writeFileSync(path.join(OUT, 'audit.json'), JSON.stringify({ checkedAt: null, environment: null, pages: {} }, null, 1));
  }

  const count = (t) => nodes.filter((n) => n.type === t).length;
  console.log(
    `[map] ${routes.length} routes · ${nodes.length} nodes (${count('school')} schools, ${count('programme')} programmes, ${count('page')} pages, ${count('post')} posts) · ` +
      `${facts.length} facts · ${conflicts.length} conflicts · ${crm.length} CRM pages (${crm.filter((c) => c.integrated).length} integrated) · ${moduleErrors.length} module errors`,
  );
}

main().catch((e) => {
  /* never break a build over the map: keep the last good snapshot */
  console.warn(`[map] discovery failed, keeping the previous snapshot: ${e.stack || e}`);
  process.exitCode = 0;
});
