/**
 * ATLAS News — bounded concurrency for expensive work (image decoding/encoding + S3 uploads).
 *
 * A 15 MB JPEG can decode to ~200 MB of pixels (the 50-megapixel cap in lib/news/media/images.js bounds
 * a single job, not many at once), and every upload is held in memory while it is processed. On the one
 * long-lived `next start` process that serves the whole site, a handful of parallel uploads could
 * otherwise starve or crash it. So:
 *   - at most `max` jobs run at once;
 *   - at most `queue` more wait for a slot (FIFO), each for at most `waitMs`;
 *   - anything beyond that is refused immediately with LimiterBusy (the route answers 503 + Retry-After)
 *     instead of piling up.
 * The route acquires the slot BEFORE reading the request body, so the limit bounds buffered request
 * bytes too, not only image work. Per process — the deployment runs one Next.js process (pm2).
 */
export class LimiterBusy extends Error {
  constructor(retryAfter = 5) {
    super('busy');
    this.name = 'LimiterBusy';
    this.code = 'busy';
    this.retryAfter = retryAfter;
  }
}

export function createLimiter({ max = 2, queue = 4, waitMs = 30_000 } = {}) {
  let active = 0;
  const waiting = [];

  function release() {
    active -= 1;
    while (waiting.length) {
      const next = waiting.shift();
      if (next.settled) continue;
      next.settled = true;
      clearTimeout(next.timer);
      active += 1;
      next.resolve(once());
      return;
    }
  }

  function once() {
    let done = false;
    return () => {
      if (done) return;
      done = true;
      release();
    };
  }

  /** Resolves to a release function; rejects with LimiterBusy when no slot can be had. */
  function acquire() {
    if (active < max) {
      active += 1;
      return Promise.resolve(once());
    }
    if (waiting.length >= queue) return Promise.reject(new LimiterBusy());
    return new Promise((resolve, reject) => {
      const entry = { resolve, settled: false, timer: null };
      entry.timer = setTimeout(() => {
        if (entry.settled) return;
        entry.settled = true;
        const i = waiting.indexOf(entry);
        if (i >= 0) waiting.splice(i, 1);
        reject(new LimiterBusy());
      }, waitMs);
      entry.timer.unref?.();
      waiting.push(entry);
    });
  }

  /** Run `fn` inside a slot; the slot is always released. */
  async function run(fn) {
    const done = await acquire();
    try {
      return await fn();
    } finally {
      done();
    }
  }

  return { acquire, run, stats: () => ({ active, waiting: waiting.filter((w) => !w.settled).length, max, queue }) };
}

/* One process-wide limiter for media work, kept on globalThis so dev hot-reloads share it. */
const KEY = Symbol.for('atlasnews.media.limiter');
export function mediaLimiter() {
  const g = globalThis;
  if (!g[KEY]) g[KEY] = createLimiter({ max: 2, queue: 4, waitMs: 30_000 });
  return g[KEY];
}
