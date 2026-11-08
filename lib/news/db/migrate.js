/**
 * ATLAS News — migration runner (used by `npm run news:migrate` and the admin health check).
 *
 * Safety rules, all enforced here:
 *   1. STRICT STATEMENT VALIDATION (`validateMigrations`) — before anything runs, every statement of
 *      every migration must match an allow-listed shape, and EVERY table it names must be a bare
 *      `atlasnews_…` identifier:
 *        CREATE TABLE [IF NOT EXISTS] atlasnews_x ( … ) [table options]
 *        ALTER TABLE atlasnews_x <alterations>
 *        DROP TABLE [IF EXISTS] atlasnews_x            (exactly one table)
 *      Outside quoted literals, a statement may not contain: a second statement (`;`), a qualified name
 *      (`db.table`, `` `a`.`b` ``), a comment, or any keyword that reads, writes, renames or swaps data —
 *      SELECT, INSERT, UPDATE … SET, DELETE, REPLACE, TRUNCATE, RENAME, LIKE, UNION, INTO, LOAD, HANDLER,
 *      CALL, PREPARE, EXECUTE, LOCK, GRANT, REVOKE, PARTITION, TABLESPACE, DISCARD, IMPORT, DROP of any
 *      object other than a column/index/key/constraint. FOREIGN KEY … REFERENCES must name a News table.
 *      So the Employee Survey tables in the same database can be neither read, changed nor dropped.
 *   2. OWNERSHIP — a migration's `down` may drop only tables its own `up` creates, and `up` may drop only
 *      tables an EARLIER migration created. Before a migration runs, none of the tables it creates may
 *      already exist (they would belong to someone else); and if it fails part-way, only the tables
 *      created by THIS run are dropped — never a table that existed before.
 *   3. FOREIGN-TABLE GUARD — if `atlasnews_*` tables exist but the bookkeeping table does not, the runner
 *      refuses to start and lists them: it will not overwrite or adopt them.
 *   4. ONE RUNNER AT A TIME — a named lock (GET_LOCK) serialises concurrent runs.
 *   5. IMMUTABLE HISTORY — each applied migration's SHA-256 checksum is recorded; an edited applied
 *      migration stops the runner.
 *   6. `down` is never run without an explicit confirmation flag, one migration at a time.
 *
 * The bookkeeping statements (create/insert/delete on atlasnews_schema_migrations) are fixed strings in
 * this file, not migration content.
 */
import { createHash } from 'node:crypto';
import { NEWS_TABLE_PREFIX, T } from '../config.js';
import { MIGRATIONS } from './migrations.js';
import { rawQuery } from './pool.js';

const LOCK_NAME = 'atlasnews_schema_migrate';

export const checksum = (m) => createHash('sha256').update(JSON.stringify({ up: m.up, down: m.down })).digest('hex');

/* ------------------------------------------------------------------------------------ validation */

const NAME = new RegExp(`^${NEWS_TABLE_PREFIX}[a-z0-9_]+$`);
const ID = '`?([A-Za-z0-9_$]+)`?';

/* the three permitted statement shapes, anchored to the WHOLE statement */
const SHAPES = [
  { kind: 'create', re: new RegExp(`^CREATE\\s+TABLE\\s+(?:IF\\s+NOT\\s+EXISTS\\s+)?${ID}\\s*\\(`, 'i') },
  { kind: 'alter', re: new RegExp(`^ALTER\\s+TABLE\\s+${ID}\\s+\\S`, 'i') },
  { kind: 'drop', re: new RegExp(`^DROP\\s+TABLE\\s+(?:IF\\s+EXISTS\\s+)?${ID}$`, 'i') },
];

/* Keywords that read or change data or move/swap tables — never legitimate in a News schema migration.
   `ON UPDATE CASCADE`, `ON UPDATE CURRENT_TIMESTAMP`, `ON DELETE …` and `CHARACTER SET` / `CHARSET` are
   column/constraint syntax and are deliberately not matched. */
const FORBIDDEN = [
  /\bSELECT\b/i, /\bINSERT\b/i, /\bREPLACE\b/i, /\bDELETE\s+FROM\b/i, /\bUPDATE\s+`?[A-Za-z0-9_$]+`?\s+SET\b/i,
  /\bTRUNCATE\b/i, /\bRENAME\b/i, /\bLIKE\b/i, /\bUNION\b/i, /\bINTO\b/i, /\bLOAD\b/i, /\bHANDLER\b/i,
  /\bCALL\b/i, /\bPREPARE\b/i, /\bEXECUTE\b/i, /\bLOCK\b/i, /\bGRANT\b/i, /\bREVOKE\b/i, /\bPARTITION\b/i,
  /\bTABLESPACE\b/i, /\bDISCARD\b/i, /\bIMPORT\b/i, /\bEXCHANGE\b/i, /\bDATABASE\b/i, /\bSCHEMA\b/i,
  /\bTRIGGER\b/i, /\bPROCEDURE\b/i, /\bFUNCTION\b/i, /\bVIEW\b/i, /\bEVENT\b/i, /\bUSER\b/i, /\bSERVER\b/i,
];
/* inside ALTER TABLE, DROP may only remove a column/index/key/constraint/check/foreign key */
const ALTER_DROP = /\bDROP\s+(?!(?:COLUMN|INDEX|KEY|PRIMARY\s+KEY|FOREIGN\s+KEY|CONSTRAINT|CHECK|DEFAULT)\b)/i;
const ALTER_DROP_BARE = /\bDROP\s+`?(?!COLUMN|INDEX|KEY|PRIMARY|FOREIGN|CONSTRAINT|CHECK|DEFAULT)[A-Za-z0-9_$]+`?\s*(,|$)/i;

/** SQL with string literals blanked, so a COMMENT 'any; text' can never hide or fake syntax. */
export function stripLiterals(sql) {
  return sql.replace(/'(?:[^'\\]|\\.|'')*'/g, "''").replace(/"(?:[^"\\]|\\.|"")*"/g, '""');
}

/**
 * Parse one statement. Returns { kind, table, refs: [every table it names] } or throws with the reason.
 * Pure; exported for tests.
 */
export function analyseStatement(sql) {
  if (typeof sql !== 'string' || !sql.trim()) throw new Error('empty statement');
  const bare = stripLiterals(sql).trim();
  if (/--|#|\/\*/.test(bare)) throw new Error('comments are not allowed in migration statements');
  if (bare.includes(';')) throw new Error('only one statement per entry (no ";")');
  /* qualified names: db.table, `db`.`table`, db.`table` … — a dot between identifiers anywhere */
  if (/[A-Za-z0-9_$`]\s*\.\s*[A-Za-z_$`]/.test(bare)) throw new Error('qualified (database.table) names are not allowed');
  for (const re of FORBIDDEN) if (re.test(bare)) throw new Error(`forbidden keyword ${String(re).replace(/\\b|\/i|\//g, '')}`);

  const shape = SHAPES.map((s) => ({ ...s, m: bare.match(s.re) })).find((s) => s.m);
  if (!shape) throw new Error('only CREATE TABLE (…), ALTER TABLE and single-table DROP TABLE statements are allowed');
  const table = shape.m[1];

  if (shape.kind === 'alter' && (ALTER_DROP.test(bare) || ALTER_DROP_BARE.test(bare))) {
    throw new Error('ALTER TABLE may only drop a column, index, key, constraint or check');
  }

  const refs = [table];
  for (const r of bare.matchAll(new RegExp(`\\bREFERENCES\\s+${ID}`, 'gi'))) refs.push(r[1]);
  /* any other place a table could be named in DDL */
  for (const r of bare.matchAll(new RegExp(`\\b(?:TABLE|JOIN|FROM|WITH)\\s+(?:IF\\s+(?:NOT\\s+)?EXISTS\\s+)?${ID}`, 'gi'))) refs.push(r[1]);
  for (const name of refs) {
    if (!NAME.test(name)) throw new Error(`table "${name}" is outside the ${NEWS_TABLE_PREFIX} namespace`);
  }
  return { kind: shape.kind, table, refs: [...new Set(refs)] };
}

/**
 * Validate a migration list (default: the shipped one). Throws on the first problem, naming the
 * migration and the statement. Pure; exported for tests. Returns { created: Map(id → [tables]) }.
 */
export function validateMigrations(migrations = MIGRATIONS) {
  const ids = new Set();
  const createdSoFar = new Set();
  const created = new Map();
  for (const m of migrations) {
    if (!m || !/^\d{4}_[a-z0-9_]+$/.test(m.id) || ids.has(m.id)) throw new Error(`bad or duplicate migration id: ${m?.id}`);
    ids.add(m.id);
    if (!Array.isArray(m.up) || !m.up.length || !Array.isArray(m.down)) throw new Error(`${m.id}: up/down must be arrays`);
    const own = [];
    for (const [phase, list] of [['up', m.up], ['down', m.down]]) {
      for (const sql of list) {
        let a;
        try {
          a = analyseStatement(sql);
        } catch (e) {
          throw new Error(`${m.id} (${phase}): ${e.message}: ${String(sql).trim().slice(0, 80)}`);
        }
        if (phase === 'up' && a.kind === 'create') {
          if (own.includes(a.table) || createdSoFar.has(a.table)) throw new Error(`${m.id}: creates ${a.table} twice`);
          own.push(a.table);
        }
        if (phase === 'up' && a.kind === 'drop' && !createdSoFar.has(a.table)) {
          throw new Error(`${m.id} (up): may only drop a table an earlier migration created, not ${a.table}`);
        }
        if (phase === 'down' && a.kind === 'drop' && !own.includes(a.table)) {
          throw new Error(`${m.id} (down): may only drop tables its own up creates, not ${a.table}`);
        }
        if (phase === 'down' && a.kind === 'create') throw new Error(`${m.id} (down): must not create tables`);
      }
    }
    created.set(m.id, own);
    for (const t of own) createdSoFar.add(t);
  }
  return { created };
}

/** Back-compatible name used by earlier code and tests. */
export const assertStatementsSafe = (migrations) => {
  validateMigrations(migrations);
};

/* ------------------------------------------------------------------------------------ inspection */

/** Every table in the connected database whose name starts with the News prefix. */
export async function existingNewsTables() {
  const rows = await rawQuery(
    'SELECT table_name AS name FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name LIKE ? ORDER BY table_name',
    [`${NEWS_TABLE_PREFIX.replace(/_/g, '\\_')}%`],
  );
  return rows.map((r) => r.name ?? r.NAME ?? r.TABLE_NAME);
}

async function appliedMigrations() {
  const rows = await rawQuery(`SELECT id, checksum, applied_at FROM ${T.migrations} ORDER BY id`);
  return new Map(rows.map((r) => [r.id, r]));
}

/** Read-only status: database/server identity, the News tables present, applied and pending
 *  migrations, and anything that would stop `up`. Never creates or changes anything. */
export async function migrationStatus({ migrations = MIGRATIONS } = {}) {
  const { created } = validateMigrations(migrations);
  const [info] = await rawQuery('SELECT DATABASE() AS db, VERSION() AS version');
  const tables = await existingNewsTables();
  const problems = [];
  let applied = new Map();
  if (tables.includes(T.migrations)) {
    applied = await appliedMigrations();
    for (const m of migrations) {
      const a = applied.get(m.id);
      if (a && a.checksum !== checksum(m)) problems.push(`applied migration ${m.id} has been edited (checksum mismatch)`);
    }
    for (const id of applied.keys()) {
      if (!migrations.some((m) => m.id === id)) problems.push(`database has migration ${id} that this code does not know`);
    }
  } else if (tables.length) {
    problems.push(`atlasnews_* tables already exist without migration bookkeeping: ${tables.join(', ')}`);
  }
  /* ownership: a pending migration may not create a table that already exists */
  const pending = migrations.filter((m) => !applied.has(m.id));
  for (const m of pending) {
    const clash = (created.get(m.id) || []).filter((t) => tables.includes(t));
    if (clash.length) problems.push(`pending migration ${m.id} would create tables that already exist (not created by it): ${clash.join(', ')}`);
  }
  return {
    database: info.db,
    serverVersion: info.version,
    tables,
    applied: [...applied.values()].map((a) => ({ id: a.id, appliedAt: a.applied_at })),
    pending: pending.map((m) => m.id),
    problems,
  };
}

/* ------------------------------------------------------------------------------------ lock */

async function withLock(fn) {
  const [r] = await rawQuery('SELECT GET_LOCK(?, 10) AS ok', [LOCK_NAME]);
  if (Number(r.ok) !== 1) throw new Error('another News migration is running (lock not acquired)');
  try {
    return await fn();
  } finally {
    await rawQuery('SELECT RELEASE_LOCK(?)', [LOCK_NAME]);
  }
}

/* ------------------------------------------------------------------------------------ up / down */

const BOOKKEEPING = `CREATE TABLE IF NOT EXISTS ${T.migrations} (
  id VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL DEFAULT '',
  checksum CHAR(64) NOT NULL,
  applied_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;

/**
 * Apply every pending migration. `log` receives progress lines (no credentials ever pass through it).
 * With `dryRun`, prints what would run and changes nothing.
 */
export async function migrateUp({ dryRun = false, log = () => {}, migrations = MIGRATIONS } = {}) {
  validateMigrations(migrations);
  return withLock(async () => {
    const status = await migrationStatus({ migrations });
    if (status.problems.length) throw new Error(`refusing to migrate:\n  - ${status.problems.join('\n  - ')}`);
    const pending = migrations.filter((m) => status.pending.includes(m.id));
    if (!pending.length) {
      log('nothing to apply — schema is up to date');
      return { applied: [] };
    }
    if (dryRun) {
      if (!status.tables.includes(T.migrations)) log(`[dry-run] ${BOOKKEEPING.split('\n')[0]} …`);
      for (const m of pending) {
        log(`[dry-run] ${m.id}: ${m.description}`);
        for (const sql of m.up) log(`  ${sql.split('\n')[0].trim()} …`);
      }
      return { applied: [], dryRun: true, pending: pending.map((m) => m.id) };
    }
    await rawQuery(BOOKKEEPING);
    const applied = [];
    for (const m of pending) {
      log(`applying ${m.id} …`);
      /* tables THIS run has created — the only ones a failure may remove */
      const createdNow = [];
      try {
        for (const sql of m.up) {
          const a = analyseStatement(sql);
          await rawQuery(sql);
          if (a.kind === 'create') createdNow.push(a.table);
        }
        await rawQuery(`INSERT INTO ${T.migrations} (id, description, checksum) VALUES (?, ?, ?)`, [m.id, String(m.description || '').slice(0, 255), checksum(m)]);
      } catch (e) {
        log(`  ${m.id} failed (${e.code || e.message}); removing only the tables this run created: ${createdNow.join(', ') || 'none'}`);
        for (const t of [...createdNow].reverse()) {
          try {
            /* t is a validated atlasnews_ name created moments ago by this very run */
            await rawQuery(`DROP TABLE IF EXISTS \`${t}\``);
          } catch {
            /* report the original failure */
          }
        }
        if (m.up.some((sql) => analyseStatement(sql).kind !== 'create')) {
          log(`  note: ${m.id} also contains ALTER/DROP steps; those are not reversed automatically — inspect before re-running`);
        }
        throw e;
      }
      applied.push(m.id);
      log(`  ${m.id} applied`);
    }
    return { applied };
  });
}

/** Reverse the most recent applied migration. Requires `confirm: true`. Drops only that migration's
 *  own `atlasnews_*` tables (validated: `down` may drop nothing its `up` did not create) — and every row
 *  in them — so it is meant for a fresh install, not for a database holding real content. */
export async function migrateDown({ confirm = false, log = () => {}, migrations = MIGRATIONS } = {}) {
  validateMigrations(migrations);
  if (!confirm) throw new Error('migrate down needs explicit confirmation (--confirm)');
  return withLock(async () => {
    const status = await migrationStatus({ migrations });
    const blocking = status.problems.filter((p) => !p.startsWith('pending migration'));
    if (blocking.length) throw new Error(`refusing to roll back:\n  - ${blocking.join('\n  - ')}`);
    const last = status.applied.at(-1);
    if (!last) {
      log('nothing to roll back');
      return { reverted: null };
    }
    const m = migrations.find((x) => x.id === last.id);
    log(`reverting ${m.id} …`);
    for (const sql of m.down) await rawQuery(sql);
    await rawQuery(`DELETE FROM ${T.migrations} WHERE id = ?`, [m.id]);
    /* once nothing is applied, remove the bookkeeping table too, leaving the database exactly as found */
    const [{ n }] = await rawQuery(`SELECT COUNT(*) AS n FROM ${T.migrations}`);
    if (Number(n) === 0) await rawQuery(`DROP TABLE IF EXISTS ${T.migrations}`);
    log(`  ${m.id} reverted`);
    return { reverted: m.id };
  });
}
