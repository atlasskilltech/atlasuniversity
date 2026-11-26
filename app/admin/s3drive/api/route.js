import { fail, json, requireAdminApi } from '@/lib/news/auth/admin';
import { BodyError, readBodyLimited } from '@/lib/news/http/body';
import { logActivity } from '@/lib/admin/activity';
import { newsClientIp } from '@/lib/news/http/clientIp';
import { insideScope, s3Scope } from '@/lib/admin/access';
import {
  ALLOW_DELETE, DriveError, cleanKey, createFolder, deleteFile, deleteFolder, folderStats, headFile, listFolder, presignUpload,
} from '@/lib/s3drive/drive';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const fmt = (n) => (n >= 1 << 30 ? `${(n / (1 << 30)).toFixed(2)} GB` : n >= 1 << 20 ? `${(n / (1 << 20)).toFixed(1)} MB` : n >= 1024 ? `${Math.ceil(n / 1024)} KB` : `${n} B`);

function driveFail(e) {
  if (e instanceof DriveError) return fail(e.status, e.code, e.message);
  console.error(`[s3drive] ${e?.name || 'error'}: ${e?.message || ''}`);
  return fail(500, 'error', 'Something went wrong.');
}

const OUTSIDE = () => fail(403, 'outside_folder', 'You can only work inside the folder you were given.');

/**
 * Who may do what. An admin works on the whole bucket and may delete only while ALLOW_DELETE is true.
 * A normal user with S3 Drive is held to their own folder (`scope`), and inside it may upload, replace,
 * create folders and delete — but never delete or rename the folder itself.
 */
function access(user) {
  const scope = s3Scope(user);
  const isAdmin = user?.role === 'admin';
  return { scope, isAdmin, canDelete: isAdmin ? ALLOW_DELETE : scope != null };
}

/** GET ?prefix=a/b/&token=… — one folder level, inside the caller's scope ('' opens their own folder). */
export async function GET(request) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;
  const { scope } = access(auth.session.user);
  if (scope == null) return fail(403, 'forbidden_tab', 'You do not have access to S3 Drive.');
  const u = new URL(request.url);
  try {
    const prefix = cleanKey(u.searchParams.get('prefix') || scope, { folder: true });
    if (!insideScope(scope, prefix)) return OUTSIDE();
    return json(await listFolder(prefix, u.searchParams.get('token') || ''));
  } catch (e) {
    return driveFail(e);
  }
}

/**
 * POST, JSON body — admins anywhere; a normal user only inside their own folder:
 *   { action: 'presign', key, type, size }   a presigned PUT for the browser to upload one file
 *   { action: 'uploaded', key }              after the PUT: confirms it in S3 and writes the log
 *   { action: 'mkdir', prefix }              new empty folder
 *   { action: 'delete', key }                delete one file
 *   { action: 'stats', prefix }              files and size inside a folder (shown before deleting it)
 *   { action: 'rmdir', prefix }              delete a folder and everything in it
 * For admins, delete / stats / rmdir (and replacing a file) are refused while ALLOW_DELETE is false
 * (lib/s3drive/drive.js). A normal user may always do them inside their folder.
 */
export async function POST(request) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;
  const { scope, canDelete } = access(auth.session.user);
  if (scope == null) return fail(403, 'forbidden_tab', 'You do not have access to S3 Drive.');
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
  if (!canDelete && ['delete', 'stats', 'rmdir'].includes(body?.action)) {
    return fail(403, 'delete_disabled', 'Deleting files from S3 is turned off.');
  }
  try {
    /* the target of every action must sit inside the caller's folder; a folder action may not be the
       folder itself (a normal user cannot delete or re-create their own root) */
    if (scope !== '') {
      const isFolder = ['mkdir', 'stats', 'rmdir'].includes(body?.action);
      const target = cleanKey(isFolder ? body?.prefix : body?.key, { folder: isFolder });
      if (!insideScope(scope, target) || target === scope) return OUTSIDE();
    }
    switch (body?.action) {
      case 'presign':
        return json(await presignUpload(body.key, body.type, { overwrite: canDelete }));

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
