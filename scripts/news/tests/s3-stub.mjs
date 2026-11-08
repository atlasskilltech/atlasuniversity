/**
 * ATLAS News — minimal local S3 stand-in for the end-to-end tests. No AWS involved.
 *
 * Path-style (`/<bucket>/<key>`). Implements exactly what lib/news/storage/s3.js relies on:
 *   PUT  with `If-None-Match: *` → 412 PreconditionFailed when the key exists (never overwrites)
 *   HEAD → 200 with x-amz-meta-* metadata, 404 when missing
 *   GET  → the stored bytes with Content-Type / Cache-Control (the "public URL")
 *   DELETE / POST → refused (403) and recorded, so a test can prove none was ever sent.
 * `X-Stub-Seed: 1` on a PUT bypasses the precondition — used only by the test harness to plant a
 * conflicting object.
 */
import http from 'node:http';

function decodeAwsChunked(buf) {
  const out = [];
  let i = 0;
  while (i < buf.length) {
    const nl = buf.indexOf('\r\n', i);
    const size = parseInt(buf.subarray(i, nl).toString().split(';')[0], 16);
    i = nl + 2;
    if (!size) break;
    out.push(buf.subarray(i, i + size));
    i += size + 2;
  }
  return Buffer.concat(out);
}

export function startS3Stub({ port = 0 } = {}) {
  const store = new Map();
  const log = [];
  const server = http.createServer((req, res) => {
    const key = req.url.split('?')[0];
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      let body = Buffer.concat(chunks);
      const send = (status, payload = '', headers = {}) => {
        const buf = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
        res.writeHead(status, { 'Content-Length': req.method === 'HEAD' ? headers['Content-Length'] ?? 0 : buf.length, ...headers });
        res.end(req.method === 'HEAD' ? undefined : buf);
      };
      if (req.method === 'PUT') {
        if (String(req.headers['content-encoding'] || '').includes('aws-chunked')) body = decodeAwsChunked(body);
        const exists = store.has(key);
        const seed = req.headers['x-stub-seed'] === '1';
        const cond = req.headers['if-none-match'] || null;
        log.push({ method: 'PUT', key, ifNoneMatch: cond, exists, seed, bytes: body.length });
        if (exists && cond === '*' && !seed) {
          return send(412, '<?xml version="1.0"?><Error><Code>PreconditionFailed</Code><Message>At least one of the pre-conditions you specified did not hold</Message></Error>', { 'Content-Type': 'application/xml' });
        }
        const meta = Object.fromEntries(Object.entries(req.headers).filter(([h]) => h.startsWith('x-amz-meta-')));
        store.set(key, { body, type: req.headers['content-type'] || 'application/octet-stream', cache: req.headers['cache-control'] || '', meta });
        return send(200, '', { ETag: '"stub"' });
      }
      if (req.method === 'HEAD') {
        log.push({ method: 'HEAD', key });
        const o = store.get(key);
        if (!o) return send(404);
        return send(200, '', { 'Content-Type': o.type, 'Cache-Control': o.cache, ETag: '"stub"', 'Content-Length': o.body.length, ...o.meta });
      }
      if (req.method === 'GET') {
        log.push({ method: 'GET', key });
        const o = store.get(key);
        if (!o) return send(404, 'NoSuchKey');
        return send(200, o.body, { 'Content-Type': o.type, 'Cache-Control': o.cache });
      }
      log.push({ method: req.method, key });
      return send(403, 'deletes and posts are not allowed in this stub');
    });
  });
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => resolve({ port: server.address().port, log, store, close: () => new Promise((r) => server.close(r)) }));
  });
}
