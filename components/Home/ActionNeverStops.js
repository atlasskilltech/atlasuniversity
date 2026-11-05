import { getInstagramFeed } from '@/lib/instagram/posts';
import { instagramConfig, profileUrl } from '@/lib/instagram/config';
import InstagramFeed from '@/components/Home/InstagramFeed';
import { CONTAINER, SECTION, H2, SUB } from '@/components/Home/SectionHead';

/**
 * "The Action never stops!" — port of reference/index.php:3061-3114.
 *
 * ── What the reference actually does ──────────────────────────────────────
 *   div.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading, <iframe>)
 *
 * The static `.scroll-insta` grid and the EmbedSocial hashtag widget are both
 * commented out. What ships is a single iframe, 100% wide and 600px tall with no
 * border, pointing at `https://atlasuniversity.edu.in/instagram-post/social` — a
 * separate PHP page holding a grid of ~50 mixed Facebook + Instagram tiles.
 *
 * The chrome is taken from index.php, measured:
 *   section       60px padding (40px at <=767)
 *   container     1366 max-w, 62 / 30 / 22 inset
 *   h2 .isdi      Poppins 400, 44px -> 36px at <=991, mb 16 -> 8 at <=767
 *   .sub-heading  24px -> 16px at <=767
 *
 * ── Where this departs from the reference, deliberately ───────────────────
 * The cross-origin iframe is not reproduced. The section renders its own grid of
 * real posts from the Meta Graph API — 9 to begin with, more via Load More — each
 * opening the Instagram-style viewer in `InstagramPostModal`. What is kept from
 * the reference's own feed page is its card vocabulary (square tiles, badge,
 * video/carousel indicator, hover overlay with real counts) and its
 * local-URL-only rule for media: every `src` is `/api/instagram/media/<id>` on
 * this origin, never an expiring fbcdn URL. That route resolves the current CDN
 * URL server-side per request, so nothing has to be written to a filesystem the
 * host may not let us keep.
 *
 * ── Fallback ──────────────────────────────────────────────────────────────
 * If no posts can be resolved — no `META_ACCESS_TOKEN`, or a Graph error with no
 * cached feed behind it — the section renders its heading and the real profile
 * CTA. Nothing is fabricated.
 */
export default async function ActionNeverStops() {
  const { posts, hasMore } = await getInstagramFeed();

  return (
    /* ref div.section */
    <div className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16.isdi — Poppins, 36px from 991px down */}
        <h2
          className={`mb-4 font-poppins font-normal max-lg:text-5xl max-lg:leading-[1.2] max-md:mb-2 ${H2}`}
        >
          The Action never stops!
        </h2>

        {/* ref .sub-heading */}
        <div className={SUB}>This week at ATLAS</div>

        {/* the reference's iframe slot */}
        <div className="mt-8 max-md:mt-6">
          {posts.length > 0 ? (
            <InstagramFeed
              initialPosts={posts}
              initialHasMore={hasMore}
              profileUrl={profileUrl}
              handle={instagramConfig.handle}
            />
          ) : (
            /* No posts to show and nothing invented — just the real profile. */
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-3xl bg-atlas-cyan px-6 text-sm font-bold text-black no-underline transition-opacity hover:opacity-90"
            >
              {`Follow @${instagramConfig.handle} on Instagram`}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
