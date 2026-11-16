import { getArticle, trashArticle, updateArticle } from '@/lib/news/cms/articles';
import { CmsError } from '@/lib/news/cms/errors';
import { cmsRoute, idParam, json, readJson } from '@/lib/news/cms/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = cmsRoute(async (_request, { params }) => {
  const article = await getArticle(idParam(params.id));
  if (!article) throw new CmsError(404, 'not_found', 'Article not found.');
  return json({ article });
});

/** PUT { article: {...}, updatedAt } — `updatedAt` is the version the editor loaded (optimistic lock). */
export const PUT = cmsRoute(async (request, { params }) => {
  const body = await readJson(request);
  return json(await updateArticle(idParam(params.id), body?.article, { expectedUpdatedAt: body?.updatedAt }));
});

/** DELETE → move to Trash (never a hard delete). */
export const DELETE = cmsRoute(async (_request, { params }) => json(await trashArticle(idParam(params.id))));
