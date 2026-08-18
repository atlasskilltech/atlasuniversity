'use server';

import { getMoreInstagramPosts } from '@/lib/instagram/posts';

/**
 * Load More, server-side.
 *
 * The client sends only how many posts it is already showing; the pagination
 * state — Meta's opaque `after` cursor — stays on the server in the feed cache,
 * so the browser never sees a cursor, a Graph URL or a token. The reply carries
 * nothing but already-localised post data.
 *
 * Failure is reported as a flag, never as a message from Meta: Graph errors
 * quote the failing request, token included. `hasMore` stays true on failure so
 * the button comes back and the user can retry.
 */
export async function loadMorePosts(offset) {
  try {
    const { posts, hasMore } = await getMoreInstagramPosts(offset);
    return { ok: true, posts, hasMore };
  } catch {
    return { ok: false, posts: [], hasMore: true };
  }
}
