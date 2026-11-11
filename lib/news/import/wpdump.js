/**
 * ATLAS News — WordPress import, step 0: read ONLY the tables the News import needs out of a phpMyAdmin
 * SQL dump. Users, comments, WooCommerce, Wordfence and every other table are never parsed; options are
 * filtered to a short allow-list (wp-config.php is never read).
 *
 * The parser understands the dump format phpMyAdmin writes: `CREATE TABLE` column lists and multi-row
 * `INSERT INTO … VALUES (…),(…);` with MySQL string escapes. Every row's value count is checked against
 * its columns, so a parser/dump mismatch fails loudly instead of shifting fields.
 */

const ESC = { n: '\n', r: '\r', t: '\t', 0: '\0', Z: '\x1a', '\\': '\\', "'": "'", '"': '"', b: '\b' };
export const WANT_TABLES = ['posts', 'postmeta', 'terms', 'term_taxonomy', 'term_relationships', 'termmeta', 'yoast_primary_term', 'options'];
const STOP = /[\\']/g;
const OPTION_ALLOW = new Set(['siteurl', 'home', 'permalink_structure', 'category_base', 'tag_base', 'uploads_use_yearmonth_folders', 'show_on_front', 'page_on_front']);

/** The table prefix, from the first `CREATE TABLE `<prefix>posts``. */
export function detectPrefix(sql) {
  /* plugins add their own `<prefix><plugin>_posts` tables: the core prefix is the one that also has
     `postmeta`, `term_taxonomy` and `options` */
  for (const m of sql.matchAll(/CREATE TABLE `([A-Za-z0-9_]*?)posts` \(/g)) {
    const p = m[1];
    if (['postmeta', 'term_taxonomy', 'options'].every((t) => sql.includes(`CREATE TABLE \`${p}${t}\` (`))) return p;
  }
  throw new Error('no WordPress core tables in the dump');
}

function columns(sql, table) {
  const start = sql.indexOf(`CREATE TABLE \`${table}\` (`);
  if (start < 0) return null;
  const end = sql.indexOf('\n) ENGINE', start);
  return [...sql.slice(start, end).matchAll(/^\s*`(\w+)`/gm)].map((m) => m[1]);
}

function* rows(sql, table) {
  const head = `INSERT INTO \`${table}\``;
  let from = 0;
  for (;;) {
    const at = sql.indexOf(head, from);
    if (at < 0) return;
    let i = sql.indexOf('VALUES', at) + 6;
    const n = sql.length;
    while (i < n) {
      const c = sql[i];
      if (c === ';') break;
      if (c !== '(') {
        i += 1;
        continue;
      }
      i += 1;
      const vals = [];
      let cur = '';
      let quoted = false;
      for (;;) {
        const ch = sql[i];
        if (ch === "'") {
          /* copy whole runs between escapes (slices, never one character at a time) */
          quoted = true;
          i += 1;
          const parts = [];
          for (;;) {
            STOP.lastIndex = i;
            const m = STOP.exec(sql);
            const at = m.index;
            if (at > i) parts.push(sql.slice(i, at));
            if (m[0] === '\\') {
              const e = sql[at + 1];
              parts.push(ESC[e] ?? e);
              i = at + 2;
              continue;
            }
            if (sql[at + 1] === "'") {
              parts.push("'");
              i = at + 2;
              continue;
            }
            i = at + 1;
            break;
          }
          cur = parts.length === 1 ? parts[0] : parts.join('');
          continue;
        }
        if (ch === ',' || ch === ')') {
          vals.push(quoted ? cur : cur.trim() === 'NULL' ? null : cur.trim());
          cur = '';
          quoted = false;
          i += 1;
          if (ch === ')') break;
          continue;
        }
        cur += ch;
        i += 1;
      }
      yield vals;
    }
    from = i;
  }
}

/** { prefix, posts:[…], postmeta:[…], … } — plain objects keyed by column name, all values strings/null. */
export function parseWordPressDump(sql) {
  const prefix = detectPrefix(sql);
  const out = { prefix };
  for (const t of WANT_TABLES) {
    const cols = columns(sql, prefix + t);
    out[t] = [];
    if (!cols) continue;
    for (const v of rows(sql, prefix + t)) {
      if (v.length !== cols.length) throw new Error(`${t}: a row has ${v.length} values for ${cols.length} columns — dump/parser mismatch`);
      const r = Object.fromEntries(cols.map((c, k) => [c, v[k]]));
      if (t === 'options' && !OPTION_ALLOW.has(r.option_name)) continue;
      /* only posts, attachments and navigation-menu items are used: revisions, pages, templates and
         products are never kept (the front page's layout is read from its postmeta) */
      if (t === 'posts' && r.post_type !== 'post' && r.post_type !== 'attachment' && r.post_type !== 'nav_menu_item') continue;
      if (t === 'posts' && r.post_type === 'attachment') r.post_content = '';
      out[t].push(r);
    }
  }
  return out;
}

/** Minimal PHP unserialize (attachment metadata): strings are counted in UTF-8 BYTES, as PHP writes them. */
export function phpUnserialize(str) {
  const buf = Buffer.from(str, 'utf8');
  let i = 0;
  const readUntil = (ch) => {
    const j = buf.indexOf(ch, i);
    const s = buf.toString('utf8', i, j);
    i = j + 1;
    return s;
  };
  const val = () => {
    const t = String.fromCharCode(buf[i]);
    if (t === 'N') {
      i += 2;
      return null;
    }
    i += 2;
    if (t === 'i' || t === 'd' || t === 'b') {
      const raw = readUntil(0x3b);
      return t === 'b' ? raw === '1' : Number(raw);
    }
    if (t === 's') {
      const n = Number(readUntil(0x3a));
      const s = buf.toString('utf8', i + 1, i + 1 + n);
      i += n + 3;
      return s;
    }
    if (t === 'a') {
      const n = Number(readUntil(0x3a));
      i += 1;
      const o = {};
      for (let k = 0; k < n; k += 1) {
        const key = val();
        o[key] = val();
      }
      i += 1;
      return o;
    }
    throw new Error(`unsupported PHP type ${t}`);
  };
  return val();
}
