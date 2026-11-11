import { notFound, permanentRedirect } from 'next/navigation';
import { resolveLegacyCategoryPath } from '@/lib/news/public/repository';

/**
 * Old WordPress nested category URLs (approved 2026-11-11):
 *   /news/category/<root>/…/<child>            → /news/category/<child>
 *   /news/category/<root>/…/<child>/page/<n>   → /news/category/<child>/page/<n>
 * Only when the segments are that category's COMPLETE ancestor chain from the root, in order. Anything
 * else — an unknown slug, a wrong or partial ancestor chain, junk after the path — is the News 404.
 *
 * Next.js resolves the static routes first, so this never sees /news/category/<slug> or
 * /news/category/<slug>/page/<n>; it only receives paths with at least two segments that are not a
 * pagination path. The target is always a flat URL, which this route cannot match: no loops, no chains.
 */
export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

export default async function LegacyNestedCategory({ params }) {
  const { slug, rest } = await params;
  const hit = await resolveLegacyCategoryPath([slug, ...(rest || [])]);
  if (!hit) notFound();
  permanentRedirect(hit.to);
}
