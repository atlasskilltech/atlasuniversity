/**
 * ATLAS News — bounded request-body reading.
 *
 * `request.formData()` / `request.text()` buffer the WHOLE body before anyone can check its size, and a
 * chunked request (no Content-Length) gives no size to check up front. Every News route that accepts a
 * body reads it through `readBodyLimited()` instead:
 *   1. a declared Content-Length larger than the limit is refused before a byte is read;
 *   2. when `requireLength` is set, a request without Content-Length is refused (411) — uploads must
 *      declare their size;
 *   3. the body is then streamed and every chunk counted against the limit regardless of what the header
 *      claimed, and reading stops (the stream is cancelled) the moment the limit is passed.
 */
export class BodyError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = 'BodyError';
    this.status = status;
    this.code = code;
  }
}

export async function readBodyLimited(request, maxBytes, { requireLength = false } = {}) {
  const raw = request.headers.get('content-length');
  if (raw === null || raw === '') {
    if (requireLength) throw new BodyError(411, 'length_required', 'The upload must declare its size (Content-Length).');
  } else {
    const declared = Number(raw);
    if (!Number.isFinite(declared) || declared < 0) throw new BodyError(400, 'bad_request', 'Invalid Content-Length.');
    if (declared > maxBytes) throw new BodyError(413, 'too_large', 'Request too large.');
  }
  if (!request.body) return Buffer.alloc(0);

  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        try {
          await reader.cancel();
        } catch {
          /* already closed */
        }
        throw new BodyError(413, 'too_large', 'Request too large.');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock?.();
  }
  return Buffer.concat(chunks.map((c) => Buffer.from(c.buffer, c.byteOffset, c.byteLength)), total);
}

/** Parse a multipart body already read (and size-checked) by readBodyLimited. */
export async function parseMultipart(buffer, contentType) {
  return new Response(buffer, { headers: { 'content-type': contentType } }).formData();
}
