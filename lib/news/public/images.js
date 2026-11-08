/**
 * ATLAS News — image URLs for the public pages.
 *
 * Featured and card images render through `next/image` (components/News/Public/NewsImage.js), which
 * builds its own responsive `srcset`. Images INSIDE an article body are plain `<img>` elements in
 * sanitised HTML — the same shape `atlasnews_posts.content_html` will hold — so the body builder asks
 * this module for a `srcset` pointing at the same Next.js image optimiser. Widths are a subset of
 * Next's default `deviceSizes`, and 75 is its default (and only allowed) quality.
 */
import { asset } from '@/lib/asset';

export const BODY_IMAGE_WIDTHS = [640, 828, 1200, 1920];

/** A media record with its `src` resolved to where the file is actually served (local or S3). */
export function resolveMedia(media) {
  if (!media) return null;
  return { ...media, src: asset(media.src) };
}

/** `/_next/image` URL for one width. Same-origin and relative, so it passes the body sanitiser. */
export function optimizedImageUrl(src, width) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

/** `srcset` over the optimiser, never wider than the file itself. */
export function optimizedSrcSet(src, naturalWidth) {
  const widths = BODY_IMAGE_WIDTHS.filter((w) => w <= naturalWidth);
  if (!widths.length) widths.push(BODY_IMAGE_WIDTHS[0]);
  return widths.map((w) => `${optimizedImageUrl(src, w)} ${w}w`).join(', ');
}
