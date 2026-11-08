'use client';

/**
 * Stage 1 verification tools:
 *   - "Check S3 write access": the server generates a tiny unique test image, writes it under
 *     assets/news/_healthcheck/ (never anywhere else, never overwriting), then fetches it back over its
 *     public URL and compares the checksum. This is how the production server's S3 permissions are proven.
 *   - "Test image upload": the full pipeline (validation → WebP renditions → S3 → atlasnews_media).
 */
import { useState } from 'react';

const fmt = (n) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);

function Result({ value }) {
  if (!value) return null;
  return (
    <pre className="mt-3 max-h-[320px] overflow-auto whitespace-pre-wrap break-all rounded-xl bg-[#0f1115] p-3 text-[12px] leading-[1.5] text-[#e8eaee]">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

export default function FoundationTools() {
  const [check, setCheck] = useState(null);
  const [checking, setChecking] = useState(false);
  const [upload, setUpload] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function runCheck() {
    setChecking(true);
    setCheck(null);
    try {
      const res = await fetch('/news/admin/api/storage-check', { method: 'POST', credentials: 'same-origin' });
      setCheck({ status: res.status, ...(await res.json().catch(() => ({}))) });
    } catch {
      setCheck({ error: 'network error' });
    } finally {
      setChecking(false);
    }
  }

  async function onUpload(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const file = form.file.files?.[0];
    if (!file) return;
    setUploading(true);
    setUpload(null);
    try {
      const fd = new FormData(form);
      const res = await fetch('/news/admin/api/media', { method: 'POST', body: fd, credentials: 'same-origin' });
      const body = await res.json().catch(() => ({}));
      setUpload({ status: res.status, ...body });
      if (res.ok) form.reset();
    } catch {
      setUpload({ error: 'network error' });
    } finally {
      setUploading(false);
    }
  }

  const media = upload?.media;
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:p-6">
        <h2 className="text-[16px] font-semibold">S3 write access</h2>
        <p className="mt-1 text-[14px] leading-[1.5] text-[#5b6170]">
          Writes one small test image under <code className="text-[13px]">assets/news/_healthcheck/</code> and reads it back over its public URL.
        </p>
        <button
          type="button"
          onClick={runCheck}
          disabled={checking}
          className="mt-4 h-11 w-full rounded-xl bg-[#1f4aa0] px-4 text-[15px] font-semibold text-white transition hover:bg-[#183c85] disabled:opacity-60 sm:w-auto"
        >
          {checking ? 'Checking…' : 'Check S3 write access'}
        </button>
        <Result value={check} />
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:p-6">
        <h2 className="text-[16px] font-semibold">Test image upload</h2>
        <p className="mt-1 text-[14px] leading-[1.5] text-[#5b6170]">JPEG, PNG, WebP or AVIF, up to 15 MB. Stored in the media library.</p>
        <form onSubmit={onUpload} className="mt-4 flex flex-col gap-3">
          <input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" required className="block w-full text-[14px] file:mr-3 file:h-10 file:rounded-lg file:border-0 file:bg-[#eef1f7] file:px-4 file:text-[14px] file:font-medium" />
          <input name="alt" type="text" maxLength={500} placeholder="Alt text (describe the image)" className="h-11 rounded-xl border border-[#d6d9e0] px-3 text-[16px] outline-none focus:border-[#1f4aa0]" />
          <input name="caption" type="text" maxLength={2000} placeholder="Caption (optional)" className="h-11 rounded-xl border border-[#d6d9e0] px-3 text-[16px] outline-none focus:border-[#1f4aa0]" />
          <button type="submit" disabled={uploading} className="h-11 rounded-xl bg-[#1f4aa0] px-4 text-[15px] font-semibold text-white transition hover:bg-[#183c85] disabled:opacity-60 sm:self-start">
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
        </form>
        {media ? (
          <div className="mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- a just-uploaded S3 object, shown as-is */}
            <img src={media.variants.find((v) => v.name === 'card')?.url || media.url} alt={media.alt || ''} className="max-h-[240px] w-auto rounded-xl" />
            <ul className="mt-2 text-[13px] text-[#5b6170]">
              {media.variants.map((v) => (
                <li key={v.name}>
                  {v.name}: {v.width}×{v.height}, {fmt(v.bytes)}
                </li>
              ))}
              {upload.deduplicated ? <li>(already in the library — the existing record was reused)</li> : null}
            </ul>
          </div>
        ) : null}
        <Result value={upload && !media ? upload : null} />
      </section>
    </div>
  );
}
