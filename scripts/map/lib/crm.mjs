/*
 * CRM widget inventory — where the site embeds the ATLAS CRM (`crm.atlasskilltech.app/widgets/<id>/…`).
 *
 * Two independent, deterministic readings, compared per route:
 *   reference  every `reference/**.php` page (the original site) that authors a LIVE widget — markup in
 *              an HTML comment, a block comment or a `//` line does not count — mapped to the route that
 *              page has here (`/x/y.php` and `/x/y/index.php` -> `/x/y`);
 *   port       every built route whose own sources name a widget id: its `page.js`, the content modules
 *              it imports, or its generated page data.
 * A widget is "integrated" on a route when the port carries every id the reference authors there. A
 * page that exists only on production (the reference has no file for it) is recorded from the port
 * alone, with `reference: null`. Only public widget ids are read; nothing is fetched.
 */
import fs from 'node:fs';
import path from 'node:path';

const WIDGET = /crm\.atlasskilltech\.app\/widgets\/([0-9a-f]{24})\/(embed(?:\.js)?)/g;

/* linear-time comment stripping (a lazy regex over a 2MB page with an unclosed `<!--` is quadratic) */
function stripBetween(s, open, close) {
  let out = '';
  let i = 0;
  for (;;) {
    const a = s.indexOf(open, i);
    if (a < 0) return out + s.slice(i);
    out += s.slice(i, a);
    const b = s.indexOf(close, a + open.length);
    if (b < 0) return out;
    i = b + close.length;
  }
}

function liveWidgets(src) {
  let s = stripBetween(src, '<!--', '-->');
  s = stripBetween(s, '/*', '*/');
  s = s.replace(/^[ \t]*\/\/.*$/gm, '');
  const out = new Map();
  for (const m of s.matchAll(WIDGET)) {
    if (!out.has(m[1])) out.set(m[1], new Set());
    out.get(m[1]).add(m[2] === 'embed.js' ? 'script' : 'iframe');
  }
  return out;
}

function walkPhp(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'assets' || e.name === 'node_modules') continue;
      walkPhp(p, out);
    } else if (e.name.endsWith('.php')) out.push(p);
  }
  return out;
}

const refRoute = (root, file) => {
  const rel = path.relative(path.join(root, 'reference'), file).split(path.sep).join('/');
  const r = `/${rel.replace(/(\/|^)index\.php$/, '').replace(/\.php$/, '')}`.replace(/\/$/, '');
  return r || '/';
};

/**
 * @param routes    discovery routes ({ route, file, modules, data? })
 * @param redirects next.config redirects
 */
export function crmInventory(root, routes, redirects) {
  /* port: ids named by each route's own sources */
  const read = (f) => {
    try {
      return fs.readFileSync(path.join(root, f), 'utf8');
    } catch {
      return '';
    }
  };
  /* a module's text plus everything it imports or re-exports (barrels: `export * from './hero'`) */
  const isFile = (rel) => {
    try {
      return fs.statSync(path.join(root, rel)).isFile();
    } catch {
      return false;
    }
  };
  const resolve = (from, spec) => {
    const base = spec.startsWith('@/') ? spec.slice(2) : path.posix.join(path.posix.dirname(from), spec);
    return [base, `${base}.js`, `${base}.json`, `${base}/index.js`].find(isFile) || null;
  };
  const textCache = new Map();
  const deepText = (rel, seen = new Set()) => {
    if (!rel || seen.has(rel)) return '';
    seen.add(rel);
    if (textCache.has(rel)) return textCache.get(rel);
    const own = read(rel);
    const kids = [...own.matchAll(/from\s+['"]((?:\.{1,2}\/|@\/lib\/)[^'"]+)['"]/g)].map((m) => deepText(resolve(rel, m[1]), seen));
    const all = [own, ...kids].join('\n');
    textCache.set(rel, all);
    return all;
  };
  const portIds = new Map();
  /* pages with no reference file: only a widget named in the page's own source counts — a shared
     module can re-export another page's brochure data, which that page never renders */
  const ownIds = new Map();
  for (const r of routes) {
    if (r.dynamic) continue;
    const ids = new Set([...(r.data ? JSON.stringify(r.data) : read(r.file)).matchAll(WIDGET)].map((m) => m[1]));
    if (ids.size) ownIds.set(r.route, ids);
  }
  for (const r of routes) {
    if (r.dynamic) continue;
    const text = [r.data ? JSON.stringify(r.data) : read(r.file), ...r.modules.map((m) => deepText(resolve('', `@/${m}`)))].join('\n');
    const ids = new Set([...text.matchAll(WIDGET)].map((m) => m[1]));
    if (ids.size) portIds.set(r.route, ids);
  }
  const built = new Set(routes.filter((r) => !r.dynamic).map((r) => r.route));
  const redirectTo = new Map((Array.isArray(redirects) ? redirects : []).map((x) => [x.source, x.destination]));

  const rows = new Map();
  for (const file of walkPhp(path.join(root, 'reference'))) {
    const src = fs.readFileSync(file, 'utf8');
    if (!src.includes('crm.atlasskilltech.app')) continue;
    const live = liveWidgets(src);
    if (!live.size) continue;
    const route = refRoute(root, file);
    const title = (src.match(/\$title\s*=\s*["']([^"']*)["']/) || [])[1] || null;
    const target = built.has(route) ? route : redirectTo.get(route) || null;
    const have = portIds.get(target) || new Set();
    const ids = [...live.keys()];
    rows.set(route, {
      route,
      servedAt: target && target !== route ? target : null,
      reference: path.relative(root, file).split(path.sep).join('/'),
      referenceTitle: title,
      widgets: ids.map((id) => ({ id, forms: [...live.get(id)].sort() })),
      inReference: true,
      integrated: Boolean(target) && ids.every((id) => have.has(id)),
      status: !target ? 'not-built' : ids.every((id) => have.has(id)) ? 'integrated' : ids.some((id) => have.has(id)) ? 'partial' : 'missing',
    });
  }
  /* production-only pages (no reference file) that the port renders with a widget */
  for (const [route, ids] of ownIds) {
    if (rows.has(route) || [...rows.values()].some((x) => x.servedAt === route)) continue;
    rows.set(route, {
      route,
      servedAt: null,
      reference: null,
      referenceTitle: null,
      widgets: [...ids].map((id) => ({ id, forms: [] })),
      inReference: false,
      integrated: true,
      status: 'integrated',
    });
  }
  return [...rows.values()].sort((a, b) => a.route.localeCompare(b.route));
}
