import { restoreArticle } from '@/lib/news/cms/articles';
import { cmsRoute, idParam, json } from '@/lib/news/cms/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** POST → out of Trash, as a draft. */
export const POST = cmsRoute(async (_request, { params }) => json(await restoreArticle(idParam(params.id))));
