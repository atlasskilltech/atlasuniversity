/**
 * The `alt` for one Instagram post's image — its caption, whitespace collapsed
 * and shortened, or a fallback naming the account.
 *
 * Shared by `InstagramPostTile` and `InstagramPostModal` so the two can never
 * describe the same image differently. **No `server-only` here**: both callers
 * are client components.
 *
 * ── Why this truncates by code point ──────────────────────────────────────
 * `String.prototype.slice` counts UTF-16 code units, and Instagram captions are
 * full of characters outside the BMP — this account writes its headlines in
 * Mathematical Bold (𝗔 is U+1D5D4), and every one of those is a surrogate pair.
 * Cutting at a fixed code-unit index therefore lands mid-pair every so often and
 * leaves a **lone high surrogate** at the end of the string.
 *
 * That is not merely ugly, it breaks hydration. React serialises the lone
 * surrogate into the server HTML; the browser's parser replaces it with U+FFFD;
 * the client still holds the original surrogate, so the attribute React reads
 * back off the DOM differs from the one it rendered and it reports "some
 * attributes of the server rendered HTML didn't match the client properties".
 * Measured on the homepage: the second tile's `alt` ended in U+FFFD in the DOM.
 *
 * `Array.from` iterates by code point, so a pair is never split. The limit is
 * therefore 150 characters rather than 150 code units, which is what the cap was
 * meant to express anyway.
 */

const MAX_CHARS = 150;

export default function altText(post) {
  if (!post.caption) return `Instagram post from @${post.username}`;
  return Array.from(post.caption.replace(/\s+/g, ' ')).slice(0, MAX_CHARS).join('');
}
