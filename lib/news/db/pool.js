/**
 * ATLAS News — MySQL/MariaDB connection pool.
 *
 * LAZY BY DESIGN. Importing this module opens nothing: the pool is created on the first `query()` /
 * `getPool()` call. That matters because `next build` and the site-map discovery (`npm run
 * map:discover`, run as `prebuild`) import modules without a database being reachable — the build must
 * never try to connect. (scripts/map/lib/routes.mjs also excludes lib/news from discovery outright.)
 *
 * Credentials come from the environment the deployment already provides — DB_HOST, DB_PORT, DB_USER,
 * DB_PASSWORD, DB_NAME, plus the optional pool limits DB_CONNECTION_LIMIT, DB_QUEUE_LIMIT and
 * DB_CONNECT_TIMEOUT_MS. Nothing here prints or returns a credential: configuration errors name the
 * missing VARIABLE, never a value, and driver errors are reduced to their code.
 *
 * Not `server-only`: the CLI scripts (scripts/news/*) use it too. The app reaches it only from
 * server-only modules (lib/news/auth/*, lib/news/media/service.js) and route handlers.
 */
import mysql from 'mysql2/promise';

const REQUIRED = ['DB_HOST', 'DB_USER', 'DB_NAME'];

export class NewsDbConfigError extends Error {
  constructor(missing) {
    super(`News database is not configured: missing ${missing.join(', ')}`);
    this.name = 'NewsDbConfigError';
    this.code = 'NEWS_DB_NOT_CONFIGURED';
  }
}

const int = (v, d) => {
  const n = Number.parseInt(String(v ?? ''), 10);
  return Number.isFinite(n) && n >= 0 ? n : d;
};

/** Pool options from the environment. Exported for the CLI's status output (it prints only host
 *  presence and the database NAME, never the user or password). */
export function dbConfig(env = process.env) {
  const missing = REQUIRED.filter((k) => !String(env[k] ?? '').trim());
  if (env.DB_PASSWORD === undefined) missing.push('DB_PASSWORD');
  if (missing.length) throw new NewsDbConfigError(missing);
  return {
    host: env.DB_HOST.trim(),
    port: int(env.DB_PORT, 3306),
    user: env.DB_USER.trim(),
    password: env.DB_PASSWORD,
    database: env.DB_NAME.trim(),
    connectionLimit: Math.max(1, int(env.DB_CONNECTION_LIMIT, 5)),
    queueLimit: int(env.DB_QUEUE_LIMIT, 0),
    connectTimeout: Math.max(1000, int(env.DB_CONNECT_TIMEOUT_MS, 10000)),
    waitForConnections: true,
    charset: 'utf8mb4_unicode_ci',
    /* every DATETIME is written and read as UTC */
    timezone: 'Z',
    dateStrings: false,
    supportBigNumbers: true,
    bigNumberStrings: false,
    /* one statement per call — never multipleStatements, so a crafted value can never chain a second
       statement even if a query were ever built wrongly */
    multipleStatements: false,
    enableKeepAlive: true,
  };
}

/* Survive dev-server hot reloads: one pool per process, kept on globalThis. */
const KEY = Symbol.for('atlasnews.mysql.pool');

/**
 * Runs once for every NEW physical connection the pool opens. mysql2 hands this event the underlying
 * callback-style connection (not the promise wrapper), so the query takes a callback.
 *
 * Every connection must run in UTC: the schema's DEFAULT CURRENT_TIMESTAMP(3) columns use the SESSION
 * time zone, while the driver reads and writes JS Dates as UTC (`timezone: 'Z'`). If the SET fails, the
 * connection is destroyed rather than left in the pool on the server's local time zone — the pool then
 * opens a fresh one for the next query, and the query that was waiting on this connection fails with a
 * NewsDbError instead of silently writing shifted timestamps. Only the error CODE is logged.
 */
export function onNewConnection(conn, log = console.error) {
  try {
    conn.query("SET time_zone = '+00:00'", (err) => {
      if (!err) return;
      log(`[news] could not set the session time zone (${err.code || 'error'}); discarding the connection`);
      try {
        conn.destroy();
      } catch {
        /* already closed */
      }
    });
  } catch (e) {
    log(`[news] could not set the session time zone (${e?.code || 'error'}); discarding the connection`);
    try {
      conn.destroy();
    } catch {
      /* already closed */
    }
  }
}

export function getPool() {
  const g = globalThis;
  if (!g[KEY]) {
    const pool = mysql.createPool(dbConfig());
    pool.on('connection', (conn) => onNewConnection(conn));
    g[KEY] = pool;
  }
  return g[KEY];
}

export async function closePool() {
  const g = globalThis;
  if (g[KEY]) {
    const p = g[KEY];
    g[KEY] = undefined;
    await p.end();
  }
}

/** A database error with everything but its code stripped, so nothing about the server or the
 *  credentials reaches a response or a log line by accident. */
export class NewsDbError extends Error {
  constructor(cause) {
    super(`News database error${cause?.code ? ` (${cause.code})` : ''}`);
    this.name = 'NewsDbError';
    this.code = cause?.code || 'NEWS_DB_ERROR';
    this.errno = cause?.errno;
  }
}

/** Parameterised query. Values are always bound (`?`), never interpolated. Returns rows. */
export async function query(sql, params = []) {
  try {
    const [rows] = await getPool().execute(sql, params);
    return rows;
  } catch (e) {
    if (e instanceof NewsDbConfigError) throw e;
    throw new NewsDbError(e);
  }
}

/** `query` for statements the binary protocol cannot prepare (DDL, GET_LOCK, SHOW). Still bound. */
export async function rawQuery(sql, params = []) {
  try {
    const [rows] = await getPool().query(sql, params);
    return rows;
  } catch (e) {
    if (e instanceof NewsDbConfigError) throw e;
    throw new NewsDbError(e);
  }
}

/** Run `fn(conn)` in a transaction on one connection; commits on success, rolls back on any error. */
export async function withTransaction(fn) {
  let conn;
  try {
    conn = await getPool().getConnection();
  } catch (e) {
    if (e instanceof NewsDbConfigError) throw e;
    throw new NewsDbError(e);
  }
  try {
    await conn.beginTransaction();
    const out = await fn(conn);
    await conn.commit();
    return out;
  } catch (e) {
    try {
      await conn.rollback();
    } catch {
      /* the original error is the one that matters */
    }
    throw e instanceof NewsDbConfigError || e instanceof NewsDbError ? e : e?.sqlState ? new NewsDbError(e) : e;
  } finally {
    conn.release();
  }
}
