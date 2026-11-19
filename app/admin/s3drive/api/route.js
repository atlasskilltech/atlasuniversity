import { fail, json, requireAdminApi } from '@/lib/news/auth/admin';
import { BodyError, readBodyLimited } from '@/lib/news/http/body';
import { logActivity } from '@/lib/admin/activity';
import { newsClientIp } from '@/lib/news/http/clientIp';
import {
  DriveError, createFolder, deleteFile, deleteFolder, folderStats, headFile, listFolder, presignUpload,
} from '@/lib/s3drive/drive';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const fmt = (n) => (n >= 1 << 30 ? `${(n / (1 << 30)).toFixed(2)} GB` : n >= 1 << 20 ? `${(n / (1 << 20)).toFixed(1)} MB` : n >= 1024 ? `${Math.ceil(n / 1024)} KB` : `${n} B`);

function driveFail(e) {
  if (e instanceof DriveError) return fail(e.status, e.code, e.message);
  console.error(`[s3drive] ${e?.name || 'error'}: ${e?.message || ''}`);
  return fail(500, 'error', 'Something went wrong.');
}

/** GET ?prefix=a/b/&token=… — one folder level. Anyone who may open the S3 Drive tab. */
export async function GET(request) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;
  const u = new URL(request.url);
  try {
    return json(await listFolder(u.searchParams.get('prefix') || '', u.searchParams.get('token') || ''));
  } catch (e) {
    return driveFail(e);
  }
}

/**
 * POST, JSON body — every action is admin-only (users with the tab can only look and copy links):
 *   { action: 'presign', key, type, size }   a presigned PUT for the browser to upload one file
 *   { action: 'uploaded', key }              after the PUT: confirms it in S3 and writes the log
 *   { action: 'mkdir', prefix }              new empty folder
 *   { action: 'delete', key }                delete one file
 *   { action: 'stats', prefix }              files and size inside a folder (shown before deleting it)
 *   { action: 'rmdir', prefix }              delete a folder and everything in it
 */
export async function POST(request) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;
  if (auth.session.user?.role !== 'admin') return fail(403, 'forbidden', 'Only an admin can change files. You can view files and copy their links.');
  let body;
  try {
    body = JSON.parse((await readBodyLimited(request, 20_000)).toString('utf8') || '{}');
  } catch (e) {
    if (e instanceof BodyError) return fail(e.status, e.code, e.message);
    return fail(400, 'bad_request', 'Invalid request.');
  }
  const log = (action, summary, target, note = null) =>
    logActivity({
      user: auth.session.user, tab: 's3drive', action, summary, target,
      targetUrl: `/admin/s3drive?prefix=${encodeURIComponent(target.endsWith('/') ? target : target.slice(0, target.lastIndexOf('/') + 1))}`,
      details: note ? { note } : null, ip: newsClientIp(request),
    });
  try {
    switch (body?.action) {
      case 'presign':
        return json(await presignUpload(body.key, body.type));

      case 'uploaded': {
        const f = await headFile(body.key);
        if (!f) return fail(404, 'not_found', 'The upload did not reach S3. Please try again.');
        await log('file.upload', 'Uploaded a file', f.key, fmt(f.size));
        return json({ ok: true, ...f });
      }

      case 'mkdir': {
        const prefix = await createFolder(body.prefix);
        await log('folder.create', 'Created a folder', prefix);
        return json({ ok: true, prefix });
      }

      case 'delete': {
        const key = await deleteFile(body.key);
        await log('file.delete', 'Deleted a file', key);
        return json({ ok: true, key });
      }

      case 'stats':
        return json(await folderStats(body.prefix));

      case 'rmdir': {
        const r = await deleteFolder(body.prefix);
        await log('folder.delete', 'Deleted a folder', r.prefix, `${r.removed} object(s) removed`);
        return json({ ok: true, ...r });
      }

      default:
        return fail(400, 'bad_request', 'Unknown action.');
    }
  } catch (e) {
    return driveFail(e);
  }
}
