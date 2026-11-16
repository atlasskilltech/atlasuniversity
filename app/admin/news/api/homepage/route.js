import { getHomepageCuration, saveHomepageCuration } from '@/lib/news/cms/homepage';
import { cmsRoute, json, readJson } from '@/lib/news/cms/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = cmsRoute(async () => json(await getHomepageCuration()));

/** PUT { zones: { hero_centre: [id], hero_left: [id, id], hero_right: [...], featured: [...], picks: [...] } } */
export const PUT = cmsRoute(async (request) => {
  await saveHomepageCuration(await readJson(request, 16 * 1024));
  return json(await getHomepageCuration());
});
