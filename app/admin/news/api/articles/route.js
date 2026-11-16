import { createArticle, listArticles } from '@/lib/news/cms/articles';
import { cmsRoute, json, readJson } from '@/lib/news/cms/http';
import { listParams } from '@/lib/news/cms/validate';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** GET ?q&filter=all|live|scheduled|draft|trash&sort=updated|published|created|title&category&page&pageSize */
export const GET = cmsRoute(async (request) => json(await listArticles(listParams(new URL(request.url).searchParams))));

/** POST { title, slug?, excerpt, contentHtml, status, publishedAt, … } → 201 { id, slug } */
export const POST = cmsRoute(async (request) => json(await createArticle(await readJson(request)), 201));
