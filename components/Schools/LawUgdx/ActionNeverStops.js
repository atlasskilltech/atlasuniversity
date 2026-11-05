import { getInstagramFeed } from '@/lib/instagram/posts';
import { instagramConfig, profileUrl } from '@/lib/instagram/config';
import InstagramFeed from '@/components/Home/InstagramFeed';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';
import { HeadPair } from './Sections';

/**
 * "The action never stops!" on the School of Law / uGDX homepages.
 *
 * ── Deviation, the same one every school homepage in this rebuild makes ──
 * Production fills this slot with a third-party EmbedSocial hashtag iframe (`embedsocial.com/cdn/ht.js`,
 * `.embedsocial-hashtag`); its hidden `.grid-gallery.hide` and `.instagram-wrapper.none` fallbacks paint
 * nothing. The port renders the project's own Instagram grid instead — `components/Home/InstagramFeed`
 * over `lib/instagram`, exactly as the ATLAS, ISDI and ISME homepages do — so no third-party script
 * loads and nothing about the feed is duplicated. Without a token the section shows its heading and a
 * real profile link, never an invented post.
 */
export default async function ActionNeverStops({ heading, sub, button, block = 'action' }) {
  const { posts, hasMore } = await getInstagramFeed();
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <HeadPair heading={heading} sub={sub} button={button} />
        <div className="mt-8 max-md:mt-6">
          {posts.length > 0 ? (
            <InstagramFeed initialPosts={posts} initialHasMore={hasMore} profileUrl={profileUrl} handle={instagramConfig.handle} />
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
