/*
 * Route discovery: every `page.js` under `app/` becomes a route, read from the filesystem, so a
 * page added to the project is a node on the next run and a page removed is gone from it.
 *
 * Each page's source is read as text (never executed — pages contain JSX) for three things:
 *   - its static metadata (title / description / canonical / robots), when written as literals;
 *   - the `@/lib/…` content modules it imports, directly or through the components it renders;
 *   - whether it is dynamic (`[slug]`) and therefore has no single URL of its own.
 */
import fs from 'node:fs';
import path from 'node:path';
import { clean } from './text.mjs';

/* modules that hold no page content: chrome, helpers and the server-only integrations */
const NOT_CONTENT = [
  /^lib\/navigation$/,
  /^lib\/footerContent$/,
  /^lib\/schools\/isdi\/navigation$/,
  /^lib\/schools\/isdi\/footerContent$/,
  /^lib\/(withBreaks|cx|useMediaQuery|videoEmbed)$/,
  /^lib\/instagram\//,
  /^lib\/schools\/isdi\/blog\//,
  /^lib\/map\//,
  /* `next/font/local` registrations (e.g. lib/landing/lp2022/fonts): build-time only, no copy, and Node cannot import them */
  /\/fonts$/,
];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'page.js' || e.name === 'page.jsx') out.push(p);
  }
  return out;
}

function routeOf(appDir, file) {
  const rel = path.relative(appDir, path.dirname(file)).split(path.sep).filter(Boolean);
  const segs = [];
  let dynamic = false;
  for (const s of rel) {
    if (/^\(.*\)$/.test(s)) continue; // route group
    if (s.startsWith('@')) return null; // parallel-route slot, not a URL
    if (/^\[.*\]$/.test(s)) dynamic = true;
    segs.push(s);
  }
  return { route: `/${segs.join('/')}`, dynamic };
}

function stringLiteral(src, re) {
  const m = src.match(re);
  if (!m) return null;
  /* concatenated literals: 'a' + 'b' */
  const parts = [...m[1].matchAll(/(['"`])((?:\\.|(?!\1)[\s\S])*?)\1/g)].map((x) => x[2]);
  return parts.length ? clean(parts.join('').replace(/\\(['"`])/g, '$1')) : null;
}

function staticMetadata(src) {
  const consts = {};
  for (const name of ['TITLE', 'DESCRIPTION', 'CANONICAL']) {
    consts[name] = stringLiteral(src, new RegExp(`const\\s+${name}\\s*=\\s*((?:\\s*(?:['"\`][^]*?['"\`])\\s*\\+?)+);`));
  }
  const block = src.match(/export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\n\};/);
  const body = block ? block[1] : '';
  const field = (k) => {
    const lit = body.match(new RegExp(`\\b${k}\\s*:\\s*(['"\`])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1`));
    if (lit) return clean(lit[2]);
    const ref = body.match(new RegExp(`\\b${k}\\s*:\\s*([A-Z_]+)\\b`));
    return ref ? consts[ref[1]] ?? null : null;
  };
  return {
    title: field('title') || consts.TITLE,
    description: field('description') || consts.DESCRIPTION,
    canonical: field('canonical') || consts.CANONICAL,
    noindex: /index\s*:\s*false/.test(body),
    hasMetadata: Boolean(block) || /generateMetadata/.test(src),
  };
}

const IMPORT_RE = /from\s+['"](@\/[^'"]+)['"]/g;

function resolveSource(root, spec) {
  const base = path.join(root, spec.slice(2));
  for (const c of [`${base}.js`, `${base}.jsx`, path.join(base, 'index.js'), base]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

function libImports(src) {
  return [...src.matchAll(IMPORT_RE)].map((m) => m[1]).filter((s) => s.startsWith('@/lib/'));
}

export function discoverRoutes(root) {
  const appDir = path.join(root, 'app');
  const routes = [];
  for (const file of walk(appDir)) {
    const r = routeOf(appDir, file);
    if (!r) continue;
    const src = fs.readFileSync(file, 'utf8');
    const direct = libImports(src);
    /* A page that imports no content module directly (the homepage) reads its data through the
       sections it renders — one level of components is followed for those pages only, so a shared
       section's default data is never attributed to a page that passes its own. */
    let viaComponents = [];
    if (!direct.length) {
      for (const m of src.matchAll(IMPORT_RE)) {
        if (!m[1].startsWith('@/components/')) continue;
        const f = resolveSource(root, m[1]);
        if (f) viaComponents.push(...libImports(fs.readFileSync(f, 'utf8')));
      }
    }
    const modules = [...new Set([...direct, ...viaComponents])]
      .map((s) => s.slice(2))
      .filter((s) => !NOT_CONTENT.some((re) => re.test(s)));
    routes.push({
      route: r.route,
      dynamic: r.dynamic,
      file: path.relative(root, file).split(path.sep).join('/'),
      modules,
      meta: staticMetadata(src),
    });
  }
  return routes.sort((a, b) => a.route.localeCompare(b.route));
}

/** `next.config.mjs` redirects — imported, not parsed, so the list is exactly what Next serves */
export async function discoverRedirects(root) {
  try {
    const cfg = (await import(pathToUrl(path.join(root, 'next.config.mjs')))).default;
    const list = typeof cfg.redirects === 'function' ? await cfg.redirects() : [];
    return list.map((r) => ({ source: r.source, destination: r.destination, permanent: Boolean(r.permanent) }));
  } catch (e) {
    return { error: String(e.message || e) };
  }
}

function pathToUrl(p) {
  return `file:///${p.replace(/\\/g, '/').replace(/^\/+/, '')}`;
}

/*
 * Data-driven routes: pages served by a catch-all / `[slug]` route from a generated registry of
 * per-page JSON (the ISME one-off pages, the BBA/B.Sc family and the MBA family). Their `page.js` is
 * dynamic, so the file walk above sees one pattern rather than ~160 pages; each registry entry is
 * expanded into its own route here. The registry is read as TEXT (its `import()` calls name the JSON
 * file) and the JSON is parsed — nothing is executed.
 */
const DATA_REGISTRIES = [
  /* registry file, how a key becomes a URL */
  ['lib/schools/isme/pages/registry.js', (k) => k],
  ['lib/schools/isme/bba/registry.js', (k) => `/schools/isme/programs/undergraduate/${k}`],
  ['lib/schools/isme/mba/registry.js', (k) => `/schools/isme/programs/postgraduate/${k}`],
];

/* `export const NAME = { "key": () => import('./file.json'), … }` -> { key: file } */
function registryEntries(src, name) {
  const start = src.indexOf(`export const ${name} = {`);
  if (start < 0) return {};
  const end = src.indexOf('\n};', start);
  const body = src.slice(start, end < 0 ? undefined : end);
  const out = {};
  for (const m of body.matchAll(/"([^"]+)":\s*\(\)\s*=>\s*import\('([^']+\.json)'\)/g)) out[m[1]] = m[2];
  return out;
}

export function discoverDataRoutes(root, existing) {
  const have = new Set(existing.map((r) => r.route));
  const out = [];
  const readJson = (f) => {
    try {
      return JSON.parse(fs.readFileSync(f, 'utf8'));
    } catch {
      return null;
    }
  };
  for (const [reg, toRoute] of DATA_REGISTRIES) {
    const file = path.join(root, reg);
    if (!fs.existsSync(file)) continue;
    const src = fs.readFileSync(file, 'utf8');
    const dir = path.dirname(file);
    const pages = { ...registryEntries(src, 'ISME_PAGES'), ...registryEntries(src, 'BBA_PAGES') };
    const blocks = registryEntries(src, 'BBA_BLOCKS');
    for (const [key, rel] of Object.entries(pages)) {
      const route = toRoute(key);
      const data = readJson(path.join(dir, rel));
      if (!data) continue;
      /* shared, content-addressed blocks (admissions, eligibility, banner, …) are this page's too */
      for (const [name, ref] of Object.entries(data.refs || {})) {
        const b = blocks[ref] ? readJson(path.join(dir, blocks[ref])) : null;
        if (b) data.blocks = { ...(data.blocks || {}), [name]: b };
      }
      /* a page with a folder of its own (bba-hons-major, life@atlas-isme/…) is already a route; it
         renders this data, so the data is attached to it rather than added a second time */
      const own = existing.find((r) => r.route === route);
      if (own) {
        own.data ||= data;
        continue;
      }
      if (have.has(route)) continue;
      have.add(route);
      out.push({
        route,
        dynamic: false,
        file: path.relative(root, path.join(dir, rel)).split(path.sep).join('/'),
        modules: [],
        data,
        meta: {
          title: clean(data.meta?.title || '') || null,
          description: clean(data.meta?.description || '') || null,
          canonical: null,
          noindex: false,
          hasMetadata: true,
        },
      });
    }
  }
  return out;
}
