import { deleteCategory, getCategory, updateCategory } from '@/lib/news/cms/categories';
import { CmsError } from '@/lib/news/cms/errors';
import { cmsRoute, idParam, json, readJson } from '@/lib/news/cms/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = cmsRoute(async (_request, { params }) => {
  const category = await getCategory(idParam(params.id));
  if (!category) throw new CmsError(404, 'not_found', 'Category not found.');
  return json({ category });
});
export const PUT = cmsRoute(async (request, { params }) => json(await updateCategory(idParam(params.id), await readJson(request, 64 * 1024))));
/** DELETE — refused (409) while any article uses the category. */
export const DELETE = cmsRoute(async (_request, { params }) => json(await deleteCategory(idParam(params.id))));
