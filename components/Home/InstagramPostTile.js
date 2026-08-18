'use client';

import {
  CarouselGlyph,
  CommentIcon,
  HeartIcon,
  InstagramGlyph,
  PlayIcon,
} from '@/components/Home/instagramIcons';

/**
 * One grid card = one Instagram post. Media only, Instagram-grid style: a square
 * crop, a platform badge, a video / carousel indicator, and a hover overlay with
 * the real caption and the real counts. Everything else belongs in the viewer.
 *
 * A CAROUSEL_ALBUM is never flattened into several cards — it is one post, so it
 * is one card showing its first frame, and the viewer pages the rest.
 */

const nf = new Intl.NumberFormat('en-US');

export default function InstagramPostTile({ post, onOpen }) {
  const cover = post.media[0];
  const isCarousel = post.media.length > 1;
  const alt = post.caption
    ? post.caption.replace(/\s+/g, ' ').slice(0, 150)
    : `Instagram post from @${post.username}`;

  return (
    <button
      type="button"
      onClick={(event) => onOpen(post, event.currentTarget)}
      aria-haspopup="dialog"
      aria-label={`Open this Instagram post from @${post.username}`}
      className="group relative block aspect-square w-full overflow-hidden rounded-lg bg-slate-100 text-left"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cover.image}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <span className="absolute left-2 top-2 z-10 rounded-full bg-white/90 p-1 shadow-sm">
        <InstagramGlyph className="h-3.5 w-3.5 text-[#E1306C]" />
      </span>

      {(post.mediaType === 'VIDEO' || isCarousel) && (
        <span className="absolute right-2 top-2 z-10 rounded-full bg-black/70 p-1.5 shadow-lg">
          {post.mediaType === 'VIDEO' ? (
            <PlayIcon className="h-3 w-3 text-white" />
          ) : (
            <CarouselGlyph className="h-3 w-3 text-white" />
          )}
        </span>
      )}

      {/* hover overlay — real caption, real counts, no invented numbers */}
      <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/25 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:opacity-100 max-lg:from-black/70 max-lg:via-transparent">
        <span className="mb-2 line-clamp-3 text-xs leading-snug text-white max-lg:hidden">
          {post.caption}
        </span>
        <span className="flex items-center gap-3 text-[11px] text-white">
          {post.likeCount !== null && (
            <span className="flex items-center gap-1">
              <HeartIcon className="h-3.5 w-3.5" />
              {nf.format(post.likeCount)}
            </span>
          )}
          {post.commentCount !== null && (
            <span className="flex items-center gap-1">
              <CommentIcon className="h-3.5 w-3.5" />
              {nf.format(post.commentCount)}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}
