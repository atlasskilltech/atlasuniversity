'use client';

import { useCallback, useRef, useState } from 'react';
import InstagramPostTile from '@/components/Home/InstagramPostTile';
import InstagramPostModal from '@/components/Home/InstagramPostModal';
import { loadMorePosts } from '@/lib/instagram/actions';

/**
 * The Instagram grid for "The Action never stops!" — the posts, Load More, and
 * the single viewer they all open.
 *
 * ── One viewer, the clicked post ──────────────────────────────────────────
 * `active` holds the post object of the card that was clicked, so card 7 opens
 * post 7. `key={active.id}` remounts the viewer between posts, which resets
 * carousel paging. There is exactly one `InstagramPostModal` in the tree and it
 * is the same verified component as before, now controlled from here.
 *
 * ── Load More ─────────────────────────────────────────────────────────────
 * Calls a server action with nothing but the number of posts already on screen.
 * Meta's pagination cursor stays on the server, so the browser never sees a
 * cursor, a Graph URL or a token, and cannot ask for arbitrary pages. Results are
 * appended, never replacing what is already rendered, and deduplicated by media
 * id a second time here — the server dedupes too, but a shifted feed must never
 * be able to show one post twice. On failure the posts already displayed stay
 * exactly as they are and the button comes back for a retry.
 */
export default function InstagramFeed({ initialPosts, initialHasMore, profileUrl, handle }) {
  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(null);
  const openerRef = useRef(null);

  const open = useCallback((post, element) => {
    openerRef.current = element;
    setActive(post);
  }, []);

  /* focus goes back to the card that opened the viewer */
  const close = useCallback(() => {
    setActive(null);
    openerRef.current?.focus();
  }, []);

  const loadMore = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      const result = await loadMorePosts(posts.length);
      if (!result?.ok) {
        setFailed(true);
      } else {
        setPosts((current) => {
          const seen = new Set(current.map((post) => post.id));
          return [...current, ...result.posts.filter((post) => !seen.has(post.id))];
        });
        setHasMore(Boolean(result.hasMore));
      }
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [posts.length]);

  return (
    <>
      {/* Instagram-style media grid: 3 up on desktop, 2 from 991 down */}
      <ul className="grid list-none grid-cols-3 gap-6 pl-0 max-lg:grid-cols-2 max-md:gap-4 max-sm:gap-3">
        {posts.map((post) => (
          <li key={post.id}>
            <InstagramPostTile post={post} onOpen={open} />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-center gap-4 max-md:mt-6">
        {failed && (
          <p role="status" className="m-0 text-sm text-[#c0392b]">
            Unable to load more posts. Please try again.
          </p>
        )}

        {hasMore && (
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            aria-busy={loading}
            className="inline-flex h-11 items-center justify-center rounded-3xl border border-black/15 px-7 text-sm font-bold text-black transition-colors hover:bg-black/5 disabled:cursor-default disabled:opacity-60"
          >
            {loading ? 'Loading…' : failed ? 'Try again' : 'Load More'}
          </button>
        )}

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-3xl bg-atlas-cyan px-6 text-sm font-bold text-black no-underline transition-opacity hover:opacity-90"
        >
          {`Follow @${handle} on Instagram`}
        </a>
      </div>

      {active && (
        <InstagramPostModal
          key={active.id}
          post={active}
          profileUrl={profileUrl}
          onClose={close}
        />
      )}
    </>
  );
}
