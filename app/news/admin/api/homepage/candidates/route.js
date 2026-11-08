import { searchPlaceableArticles } from '@/lib/news/cms/articles';
import { cmsRoute, json } from '@/lib/news/cms/http';
import { sanitizePlainText } from '@/lib/news/content/sanitize';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** GET ?q — published/scheduled articles that may be placed on the homepage, with their current slot. */
export const GET = cmsRoute(async (request) => {
  const q = sanitizePlainText(new URL(request.url).searchParams.get('q') || '', 200);
  return json({ items: await searchPlaceableArticles(q, 20) });
});
