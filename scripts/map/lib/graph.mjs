/*
 * Graph builder — turns what discovery found into one tree.
 *
 * Every relationship comes from the site itself, in this order of authority:
 *   1. the navigation models (ATLAS header, ISDI header, footer) — the site's own hierarchy;
 *   2. the programme-list pages — which programme belongs to which school and level;
 *   3. internal links written in a page's content — a page reached only from another page's body;
 *   4. the URL path — a page under /schools/isdi/… belongs to ISDI;
 *   5. anything still unplaced goes into "Other pages", never silently dropped.
 *
 * A page has ONE primary parent (its first placement in that order). Every later mention becomes a
 * `ref` node — a pointer that jumps to the page — so the tree never duplicates a page and never
 * loses a relationship.
 */
import { flat, clean, normPath, degreeOf, schoolOfPath, SCHOOLS, hashOf } from './text.mjs';

const LEVELS = {
  ug: 'Undergraduate',
  pg: 'Postgraduate',
  integrated: 'Integrated',
  diploma: 'Postgraduate Diploma',
  summer: 'Summer School',
};

function levelOfLabel(label) {
  const l = clean(label).toLowerCase();
  if (l.startsWith('undergraduate')) return 'ug';
  if (l.startsWith('postgraduate diploma')) return 'diploma';
  if (l.startsWith('postgraduate')) return 'pg';
  if (l.startsWith('integrated')) return 'integrated';
  if (/summer/.test(l)) return 'summer';
  return null;
}

function levelOfPath(p) {
  if (/summer/i.test(p)) return 'summer';
  if (/postgraduate-diploma/.test(p)) return 'diploma';
  if (/\/integrated\//.test(p)) return 'integrated';
  if (/\/postgraduate\b|\/pg\//.test(p)) return 'pg';
  if (/\/undergraduate\b|\/ug\//.test(p)) return 'ug';
  return null;
}

/* page paths that are a programme rather than an overview / information page */
function isProgrammePath(p) {
  if (!p) return false;
  if (/\/programs\/(undergraduate|postgraduate)\/?$/.test(p)) return false;
  return (
    /^\/schools\/[^/]+\/(programs\/|undergraduate\/|integrated\/|program-page)/.test(p) ||
    /^\/schools\/[^/]+\/(summerschool|programs\/summer-school-management)$/.test(p)
  );
}

/* a readable name for a page — its own <title> when that is specific, otherwise its heading:
   several upstream <title>s are placeholders or copies of another page's */
const GENERIC_TITLE = /^(atlas skilltech university|atlas advantage: industry-led learning)\b/i;
function pageName(r, titleCounts) {
  const t = r?.meta?.title || '';
  const usable = t && !GENERIC_TITLE.test(t) && (titleCounts.get(t) || 0) < 3;
  /* a specific <title> first (minus the site suffix), then the page's own heading */
  if (usable) return t.replace(/\s*[–|-]\s*atlas.*$/i, '').trim() || t;
  if (r?.heroTitle) return r.heroTitle;
  const last = (r?.route || '').split('/').filter(Boolean).pop() || '';
  return decodeURIComponent(last).replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || r?.route;
}

export function buildGraph({ routes, redirects, nav, isdiNav, footer, lists, landings, posts, contentLinks }) {
  const nodes = new Map();
  const routeSet = new Map(routes.map((r) => [r.route, r]));
  const redirectMap = new Map((Array.isArray(redirects) ? redirects : []).map((r) => [normPath(r.source), normPath(r.destination)]));
  let order = 0;
  const titleCounts = new Map();
  for (const r of routes) if (r.meta.title) titleCounts.set(r.meta.title, (titleCounts.get(r.meta.title) || 0) + 1);

  const resolvePath = (p) => {
    let cur = p;
    for (let i = 0; i < 5 && redirectMap.has(cur); i++) cur = redirectMap.get(cur);
    return cur;
  };

  function make(id, props) {
    const n = { id, children: [], refs: [], listedOn: [], aliases: [], order: order++, ...props };
    nodes.set(id, n);
    if (n.parent && nodes.has(n.parent)) nodes.get(n.parent).children.push(id);
    return n;
  }

  function group(parent, label, extra = {}) {
    const id = `g:${hashOf(`${parent}>${label}`)}`;
    if (nodes.has(id)) return nodes.get(id);
    return make(id, { type: 'group', label: clean(label), parent, ...extra });
  }

  function ref(parent, target, label) {
    const id = `r:${hashOf(`${parent}>${target}`)}`;
    if (nodes.has(id) || !nodes.has(parent)) return;
    make(id, { type: 'ref', label: clean(label) || nodes.get(target)?.label, parent, target });
    nodes.get(target)?.refs.push(parent);
  }

  /**
   * Place a link. Internal → a page node (created once, referenced afterwards); external → an
   * external node; `#` or empty → nothing (the site links nowhere).
   */
  function place(parent, label, href, extra = {}) {
    if (!href || href === '#') return null;
    const internal = normPath(href);
    if (!internal) {
      if (!/^https?:/i.test(href)) return null;
      const id = `x:${href}`;
      if (nodes.has(id)) {
        ref(parent, id, label);
        return nodes.get(id);
      }
      return make(id, { type: 'external', label: clean(label), parent, url: href, ...extra });
    }
    const hash = href.includes('#') ? href.split('#')[1] : '';
    const target = resolvePath(internal);
    const pageId = `p:${target}`;
    if (hash) {
      /* a menu entry pointing at a section of a page: the page first, the section under it */
      const page = nodes.get(pageId) || place(parent, label, target, extra);
      const sid = `s:${target}#${hash}`;
      if (!nodes.has(sid) && page) make(sid, { type: 'section', label: clean(label), parent: page.id, path: target, hash });
      return page;
    }
    if (nodes.has(pageId)) {
      const n = nodes.get(pageId);
      if (clean(label) && clean(label) !== n.label && !n.aliases.includes(clean(label))) n.aliases.push(clean(label));
      if (n.parent !== parent && n.id !== parent) ref(parent, pageId, label);
      return n;
    }
    const r = routeSet.get(target);
    const school = schoolOfPath(target);
    return make(pageId, {
      type: /\.pdf$/i.test(target) ? 'document' : isProgrammePath(target) ? 'programme' : 'page',
      label: clean(label) || r?.meta?.title || target,
      /* the page's own name, for citing it as a source (a menu label such as "B.Des" or
         "Overview" only makes sense inside its menu) */
      title: r ? pageName(r, titleCounts) : null,
      parent,
      path: target,
      requested: internal !== target ? internal : undefined,
      built: Boolean(r) || [...routeSet.values()].some((x) => x.dynamic && dynamicMatch(x.route, target)),
      school,
      ...extra,
    });
  }

  /* ---- root ------------------------------------------------------------------------------- */
  const root = make('p:/', { type: 'university', label: 'ATLAS SkillTech University', path: '/', parent: null, built: routeSet.has('/') });

  /* ---- 1. Schools ------------------------------------------------------------------------- */
  const schoolsMenu = nav.megaMenu.find((m) => m.id === 'schools');
  const schoolsGroup = group(root.id, schoolsMenu.label, { category: 'schools' });
  const schoolNodes = {};
  for (const item of schoolsMenu.items) {
    if (item.spacer) continue;
    const id = schoolOfPath(normPath(item.href));
    if (id) {
      const p = normPath(item.href);
      schoolNodes[id] = make(`p:${p}`, {
        type: 'school', label: SCHOOLS[id].name, short: SCHOOLS[id].short, menuLabel: clean(item.label), parent: schoolsGroup.id,
        path: p, school: id, built: routeSet.has(p),
      });
    } else {
      place(schoolsGroup.id, item.label, item.href, { category: 'schools' });
    }
  }

  /* ISDI's own site: its header menus, in order */
  const isdi = schoolNodes.isdi;
  function walkMenu(parent, items, ctx) {
    for (const it of items || []) {
      if (it.spacer) continue;
      const kids = it.children || it.items;
      const lvl = levelOfLabel(it.label) || ctx.level;
      if (kids && kids.length) {
        const g = it.href ? place(parent, it.label, it.href) : group(parent, it.label, { school: ctx.school, level: lvl });
        if (g) walkMenu(g.id, kids, { ...ctx, level: lvl });
      } else {
        const n = place(parent, it.label, it.href, { school: ctx.school });
        if (n && n.type === 'programme') {
          n.level ??= lvl || levelOfPath(n.path);
          n.degree ??= lvl === 'diploma' ? 'Postgraduate Diploma' : degreeOf(n.path, it.label);
        }
      }
    }
  }
  if (isdi) {
    for (const menu of isdiNav.megaMenu) {
      const g = group(isdi.id, menu.label, { school: 'isdi' });
      walkMenu(g.id, menu.items, { school: 'isdi', level: null });
    }
    const quick = group(isdi.id, 'ISDI quick links', { school: 'isdi' });
    for (const l of isdiNav.utilityLinks) place(quick.id, l.label, l.href, { school: 'isdi' });
  }

  /* the other schools: their programmes are listed on the ATLAS programme-list pages */
  for (const list of lists) {
    for (const e of list.entries) {
      const p = resolvePath(normPath(e.href));
      const sid = schoolOfPath(p);
      if (!sid || !schoolNodes[sid]) continue;
      const lvl = levelOfPath(p) || list.level;
      const parent = sid === 'isdi'
        ? group(group(isdi.id, 'Programs', { school: 'isdi' }).id, 'Also listed on ATLAS programme pages', { school: 'isdi' })
        : group(schoolNodes[sid].id, LEVELS[lvl] ? `${LEVELS[lvl]} programmes` : 'Programmes', { school: sid, level: lvl });
      const n = place(parent.id, e.title, e.href, { school: sid });
      if (!n) continue;
      if (n.type !== 'programme') n.type = 'programme';
      n.level ??= lvl;
      n.degree ??= degreeOf(e.title, p);
      n.listedOn.push({ route: list.route, title: e.title, eligibility: e.eligibility });
    }
  }

  /* ---- 2. Programs menu -------------------------------------------------------------------- */
  const progMenu = nav.megaMenu.find((m) => m.id === 'programs');
  const progGroup = group(root.id, progMenu.label, { category: 'programs' });
  for (const it of progMenu.items) {
    if (it.children) {
      const g = group(progGroup.id, it.label, { category: 'programs' });
      for (const c of it.children) {
        const p = resolvePath(normPath(c.href));
        const sid = schoolOfPath(p);
        /* a school's summer school belongs to that school; the menu keeps a pointer to it */
        if (sid && schoolNodes[sid] && !nodes.has(`p:${p}`)) {
          const sg = group(schoolNodes[sid].id, 'Summer School', { school: sid, level: 'summer' });
          const n = place(sg.id, c.label, c.href, { school: sid });
          if (n) {
            n.type = 'programme';
            n.level = 'summer';
            n.degree = 'Summer School';
          }
        }
        place(g.id, c.label, c.href);
      }
      continue;
    }
    const landing = place(progGroup.id, it.label, it.href, { category: 'programs' });
    const l = landing && landings.find((x) => x.route === landing.path);
    if (l) for (const c of l.cards) place(landing.id, c.title, c.href, { category: 'programs' });
  }

  /* ---- 3. Admissions, 4. Advantages ------------------------------------------------------- */
  for (const id of ['admissions', 'advantages']) {
    const menu = nav.megaMenu.find((m) => m.id === id);
    const g = group(root.id, menu.label, { category: id });
    for (const it of menu.items) place(g.id, it.label, it.href, { category: id });
  }

  /* ---- 5. Header links, top bar, footer --------------------------------------------------- */
  for (const it of nav.primaryLinks) place(root.id, it.label, it.href);
  const util = group(root.id, 'Useful links', { category: 'resources' });
  for (const it of nav.utilityLinks) place(util.id, it.label, it.href, { category: 'resources' });
  const comp = group(root.id, 'Statutory & compliance', { category: 'compliance' });
  for (const it of footer.complianceColumns.flat()) place(comp.id, it.label, it.href, { category: 'compliance' });

  /* ---- 6. Pages reached from another page's content -------------------------------------- */
  const unplaced = () => routes.filter((r) => !r.dynamic && !nodes.has(`p:${r.route}`) && r.route !== '/map');
  for (let pass = 0; pass < 4; pass++) {
    let added = 0;
    for (const r of unplaced()) {
      /* the first already-placed page (in tree order) whose content links here */
      const from = [...nodes.values()]
        .filter((n) => n.path && (contentLinks[n.path] || []).includes(r.route))
        .sort((a, b) => a.order - b.order)[0];
      if (from) {
        place(from.id, pageName(r, titleCounts), r.route, { via: 'content' });
        added++;
      }
    }
    if (!added) break;
  }

  /* ---- 7. URL path, then "Other pages" ---------------------------------------------------- */
  for (const r of unplaced()) {
    const segs = r.route.split('/').filter(Boolean);
    let parent = null;
    for (let i = segs.length - 1; i > 0 && !parent; i--) {
      const anc = nodes.get(`p:/${segs.slice(0, i).join('/')}`);
      if (anc) parent = anc.id;
    }
    const sid = schoolOfPath(r.route);
    if (!parent && sid && schoolNodes[sid]) parent = group(schoolNodes[sid].id, 'More pages', { school: sid }).id;
    if (!parent) parent = group(root.id, 'Other pages', { category: 'other' }).id;
    place(parent, pageName(r, titleCounts), r.route, { via: 'path' });
  }

  /* ---- 8. Dynamic routes: their real records (snapshotted blog posts) --------------------- */
  for (const feed of posts) {
    const parent = nodes.get(`p:${feed.route}`);
    if (!parent) continue;
    for (const c of feed.cards) {
      const p = normPath(c.href);
      if (!p || nodes.has(`p:${p}`)) continue;
      make(`p:${p}`, {
        type: 'post', label: clean(c.title), parent: parent.id, path: p, date: c.date || null, school: schoolOfPath(p),
        built: routes.some((x) => x.dynamic && dynamicMatch(x.route, p)),
      });
    }
  }

  /* a programme reached through content or its URL still has a degree and a level in its URL */
  for (const n of nodes.values()) {
    if (n.type !== 'programme') continue;
    n.level ??= levelOfPath(n.path) || null;
    n.degree ??= n.level === 'diploma' ? 'Postgraduate Diploma' : degreeOf(n.path, n.label);
  }

  /* inherit school / category down the tree */
  const visit = (id, school, category) => {
    const n = nodes.get(id);
    n.school ??= school ?? null;
    n.category ??= category ?? null;
    if (n.type === 'school') n.category = 'schools';
    for (const c of n.children) visit(c, n.school, n.category);
  };
  visit(root.id, null, null);

  return [...nodes.values()];
}

/* '/atlas-blog/[slug]' matches '/atlas-blog/anything' — segment by segment */
function dynamicMatch(pattern, p) {
  const a = pattern.split('/');
  const b = p.split('/');
  return a.length === b.length && a.every((seg, i) => (/^\[.+\]$/.test(seg) ? Boolean(b[i]) : seg === b[i]));
}

export { LEVELS, flat };
