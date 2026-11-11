/**
 * ATLAS News admin — category hierarchy helpers shared by the Category Manager and the article form.
 * Pure functions over [{ id, parentId, name, menuOrder }]; safe on the server and in the browser.
 */

const bySibling = (a, b) => (a.menuOrder ?? 1e9) - (b.menuOrder ?? 1e9) || a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });

/**
 * Depth-first tree order: each category followed by its sub-categories. Returns
 * [{ ...item, depth (0 = root), path: [names root→item], label }], where `label` is the plain name, or the
 * full path ("Industry › Masterclass") when another category has the same name.
 * A category whose parent is missing is shown as a root; a loop (impossible through the CMS) is cut.
 */
export function treeOrder(items) {
  const ids = new Set(items.map((c) => c.id));
  const kids = new Map();
  for (const c of items) {
    const p = c.parentId && ids.has(c.parentId) ? c.parentId : null;
    if (!kids.has(p)) kids.set(p, []);
    kids.get(p).push(c);
  }
  for (const list of kids.values()) list.sort(bySibling);
  const counts = new Map();
  for (const c of items) counts.set(c.name.toLowerCase(), (counts.get(c.name.toLowerCase()) || 0) + 1);
  const out = [];
  const seen = new Set();
  const walk = (parent, depth, path) => {
    for (const c of kids.get(parent) || []) {
      if (seen.has(c.id)) continue;
      seen.add(c.id);
      const p = [...path, c.name];
      out.push({ ...c, depth, path: p, label: counts.get(c.name.toLowerCase()) > 1 ? p.join(' › ') : c.name });
      walk(c.id, depth + 1, p);
    }
  };
  walk(null, 0, []);
  for (const c of items) if (!seen.has(c.id)) out.push({ ...c, depth: 0, path: [c.name], label: c.name });
  return out;
}

/** The category itself and all its descendants (ids) — never valid as its new parent. */
export function selfAndDescendants(items, id) {
  const out = new Set([id]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const c of items) {
      if (c.parentId && out.has(c.parentId) && !out.has(c.id)) {
        out.add(c.id);
        grew = true;
      }
    }
  }
  return out;
}

/** Tailwind left padding for an indentation level (capped so deep trees still fit on a phone). */
export function indent(depth) {
  return ['pl-0', 'pl-5', 'pl-10', 'pl-14', 'pl-[72px]', 'pl-[88px]'][Math.min(depth, 5)];
}
