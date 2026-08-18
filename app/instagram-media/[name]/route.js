import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Serves the locally cached Instagram media.
 *
 * ── Why this exists ───────────────────────────────────────────────────────
 * The files live in `public/assets/images/instagram/`, but they cannot be served
 * as ordinary public assets: `next start` snapshots the contents of `public/` at
 * boot and 404s anything added later. The initial page of media is downloaded
 * during the build, so it works — but everything Load More or a 900s ISR refresh
 * downloads afterwards would be a broken image until the server restarted.
 * Verified directly: file present on disk, 404 before a restart, 200 after.
 *
 * Reading the file per request removes that dependency entirely, and the media
 * still sits in the documented cache directory.
 *
 * Filenames are keyed on the Instagram media id, whose bytes never change, so
 * they are immutable and cached hard. The profile picture is the one thing that
 * can change under a stable name, so it gets a short TTL instead.
 */

const CACHE_DIR = path.join(process.cwd(), 'public', 'assets', 'images', 'instagram');

/* No slashes, no dots-dots, no surprises — the name is the whole allowlist. */
const SAFE_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]{0,120}\.jpg$/;

/**
 * Everything is written with a `.jpg` name, but Meta occasionally serves PNG or
 * WebP bytes, so the type comes from the bytes rather than the extension.
 */
function contentType(buffer) {
  if (buffer.length > 12) {
    if (buffer.readUInt16BE(0) === 0xffd8) return 'image/jpeg';
    if (buffer.readUInt32BE(0) === 0x89504e47) return 'image/png';
    if (buffer.toString('latin1', 0, 4) === 'RIFF' && buffer.toString('latin1', 8, 12) === 'WEBP') {
      return 'image/webp';
    }
  }
  return 'application/octet-stream';
}

const notFound = () => new Response('Not found', { status: 404 });

export async function GET(request, { params }) {
  const { name } = await params;
  if (!SAFE_NAME.test(name) || name.includes('..')) return notFound();

  try {
    const buffer = await readFile(path.join(CACHE_DIR, name));
    return new Response(buffer, {
      headers: {
        'Content-Type': contentType(buffer),
        'Content-Length': String(buffer.length),
        'Cache-Control': name.startsWith('profile-')
          ? 'public, max-age=3600, stale-while-revalidate=86400'
          : 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return notFound();
  }
}
