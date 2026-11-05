/*
 * Tidy left-to-right tree layout for the /map roadmap.
 *
 * Only expanded branches are laid out. Leaves take the next free row; a parent sits centred on its
 * first and last child. Deterministic and O(visible nodes), so it reruns on every expand/collapse.
 */
export const NODE_W = 236;
export const NODE_H = 52;
export const ROOT_W = 268;
export const COL_GAP = 72;
export const ROW_GAP = 12;

export function layoutTree(byId, rootId, expanded) {
  const pos = new Map();
  const edges = [];
  let row = 0;

  function place(id, depth) {
    const n = byId.get(id);
    const kids = expanded.has(id) ? n.children.filter((c) => byId.has(c)) : [];
    const x = depth === 0 ? 0 : ROOT_W + COL_GAP + (depth - 1) * (NODE_W + COL_GAP);
    const w = depth === 0 ? ROOT_W : NODE_W;
    let y;
    if (!kids.length) {
      y = row * (NODE_H + ROW_GAP);
      row += 1;
    } else {
      const ys = kids.map((k) => place(k, depth + 1));
      y = (ys[0] + ys[ys.length - 1]) / 2;
      for (const k of kids) edges.push([id, k]);
    }
    pos.set(id, { x, y, w, h: NODE_H, depth });
    return y;
  }

  place(rootId, 0);
  let width = 0;
  let height = 0;
  for (const p of pos.values()) {
    width = Math.max(width, p.x + p.w);
    height = Math.max(height, p.y + p.h);
  }
  return { pos, edges, width, height };
}

/** ancestors of a node, root first */
export function ancestorsOf(byId, id) {
  const out = [];
  let cur = byId.get(id)?.parent;
  while (cur && byId.has(cur)) {
    out.unshift(cur);
    cur = byId.get(cur).parent;
  }
  return out;
}
