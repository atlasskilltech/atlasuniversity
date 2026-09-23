import { cx } from '@/lib/cx';
import { getInstagramFeed } from '@/lib/instagram/posts';
import { instagramConfig, profileUrl } from '@/lib/instagram/config';
import InstagramFeed from '@/components/Home/InstagramFeed';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from './ui';

/**
 * "The Action never stops!" — port of reference/schools/isdi/index.php:1504-1540.
 *
 *   div.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading, <iframe>)
 *
 * The iframe is the same one the ATLAS homepage embeds —
 * `https://atlasuniversity.edu.in/instagram-post/social`, 100% x 600px — so it
 * gets the same treatment the ATLAS port settled on (see
 * components/Home/ActionNeverStops): the cross-origin iframe is not reproduced,
 * and the existing `InstagramFeed` renders the real posts from the Meta Graph API
 * server-side, with the same fallback to the real profile link when no token or
 * no posts are available. Only the chrome is ISDI's: 50px section padding and
 * the "This week at ATLAS ISDI" lead.
 */
export default async function ActionNeverStops({ data }) {
  const { posts, hasMore } = await getInstagramFeed();

  return (
    <div data-block="action" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB}>{data.subheading}</div>

        {/* the reference's iframe slot — spaced as on the ATLAS homepage */}
        <div className="mt-8 max-md:mt-6">
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
    </div>
  );
}
