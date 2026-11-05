import { getInstagramFeed } from '@/lib/instagram/posts';
import { instagramConfig, profileUrl } from '@/lib/instagram/config';
import InstagramFeed from '@/components/Home/InstagramFeed';
import HeadWrap from '@/components/Schools/ISME/HeadWrap';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * ISME "This Week @ ISME" — `div.section > .container > (.head-wrap, <iframe>)` in
 * reference/schools/isme/index.php. The iframe is the same
 * `https://atlasuniversity.edu.in/instagram-post/social` embed the ATLAS and ISDI homepages carry,
 * so it gets the same treatment (components/Home/ActionNeverStops,
 * components/Schools/ISDI/Home/ActionNeverStops): the cross-origin iframe is not reproduced and the
 * existing `InstagramFeed` renders the real posts server-side from the Meta Graph API, falling back
 * to the real profile link when no token or no posts are available. Only the chrome is ISME's —
 * the heading row with its mint "View More on Instagram" pill (the reference's own Instagram link,
 * `target="_blank"`). The iframe follows the heading row directly, with no gap above it.
 *
 * Deviation, shared with both homepages: the block's height is the feed's, not the iframe's 600px.
 */
export default async function ThisWeek({ data, block = 'this-week' }) {
  const { posts, hasMore } = await getInstagramFeed();
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <HeadWrap heading={data.heading} sub={data.sub} button={data.button} align="base" />
        {posts.length > 0 ? (
          <InstagramFeed
            initialPosts={posts}
            initialHasMore={hasMore}
            profileUrl={profileUrl}
            handle={instagramConfig.handle}
          />
        ) : (
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
  );
}
