import { getHomepageSections, saveHomepageSections } from '@/lib/news/cms/homepageSections';
import { cmsRoute, json, readJson } from '@/lib/news/cms/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = cmsRoute(async () => json(await getHomepageSections()));

/** PUT { sections: [{ id, layout, title, width, categoryIds, count, offset, tabs }] } — replaces the list */
export const PUT = cmsRoute(async (request) => json(await saveHomepageSections(await readJson(request, 64 * 1024))));
