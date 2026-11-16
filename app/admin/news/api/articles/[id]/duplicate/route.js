import { duplicateArticle } from '@/lib/news/cms/articles';
import { cmsRoute, idParam, json } from '@/lib/news/cms/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** POST → a new draft copy: 201 { id, slug } */
export const POST = cmsRoute(async (_request, { params }) => json(await duplicateArticle(idParam(params.id)), 201));
