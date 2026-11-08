import { createCategory, listCategories } from '@/lib/news/cms/categories';
import { cmsRoute, json, readJson } from '@/lib/news/cms/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = cmsRoute(async () => json({ items: await listCategories() }));
export const POST = cmsRoute(async (request) => json(await createCategory(await readJson(request, 64 * 1024)), 201));
