import { CmsError } from '@/lib/news/cms/errors';
import { cmsRoute, idParam, json, readJson } from '@/lib/news/cms/http';
import { deleteMedia, getMediaItem, mediaUsage, updateMediaMeta } from '@/lib/news/cms/media';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** GET → { media, usage } */
export const GET = cmsRoute(async (_request, { params }) => {
  const id = idParam(params.id);
  const media = await getMediaItem(id);
  if (!media || media.deletedAt) throw new CmsError(404, 'not_found', 'Image not found.');
  return json({ media, usage: await mediaUsage(id) });
});

/** PATCH { alt, caption } */
export const PATCH = cmsRoute(async (request, { params }) => json({ media: await updateMediaMeta(idParam(params.id), await readJson(request, 16 * 1024)) }));

/** DELETE — removes an UNUSED image from the library (409 + usage otherwise). S3 objects are kept. */
export const DELETE = cmsRoute(async (_request, { params }) => json(await deleteMedia(idParam(params.id))));
