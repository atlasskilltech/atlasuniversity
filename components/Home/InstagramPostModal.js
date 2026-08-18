'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '@/lib/cx';
import {
  Chevron,
  CommentIcon,
  HeartIcon,
  PlayIcon,
  SaveIcon,
  ShareIcon,
} from '@/components/Home/instagramIcons';

/**
 * The Instagram-desktop-style post viewer.
 *
 * Controlled: the grid decides which post is open and passes it in, so ONE
 * viewer serves every card in the feed and clicking card 7 shows post 7. Render
 * it with `key={post.id}` so slide state resets between posts.
 *
 * ── A viewer, not a clone ─────────────────────────────────────────────────
 * The layout follows Instagram's desktop post view — media on the left sized to
 * the post's real aspect ratio, a fixed-width details column on the right with
 * header / caption / scrolling comments / actions — but nothing in it pretends to
 * work. Like, Comment, Share, Save, the avatar, the handle and "View on
 * Instagram" are all plain links to the post's real `permalink` (or the real
 * profile), opened in a new tab. There are no local counters, no comment box and
 * no optimistic state: every number shown is the number Meta returned, and it is
 * a label, not a control. The only real buttons are close and carousel paging,
 * which move between real slides of the real post.
 *
 * Everything arrives already resolved and already localised — local image paths,
 * plain numbers, plain strings. No token, Graph URL or remote CDN URL ever
 * reaches the client.
 */

/* Instagram's own clamp: portrait stops at 4:5, landscape at 1.91:1. Reels are
   allowed to stay 9:16 since that is how Instagram itself shows them. */
const MIN_ASPECT = 0.5;
const MAX_ASPECT = 1.91;

const nf = new Intl.NumberFormat('en-US');

function aspectOf(slide) {
  if (!slide?.width || !slide?.height) return 1;
  const ratio = slide.width / slide.height;
  if (!Number.isFinite(ratio) || ratio <= 0) return 1;
  return Math.min(MAX_ASPECT, Math.max(MIN_ASPECT, ratio));
}

function timeAgo(timestamp) {
  if (!timestamp) return null;
  const then = new Date(timestamp);
  if (Number.isNaN(then.getTime())) return null;
  const seconds = Math.floor((Date.now() - then.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  if (days < 56) return `${Math.floor(days / 7)}w`;
  return then.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function postedOn(timestamp) {
  if (!timestamp) return null;
  const then = new Date(timestamp);
  if (Number.isNaN(then.getTime())) return null;
  return then.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

const external = { target: '_blank', rel: 'noopener noreferrer' };

function Avatar({ src, username, className }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" className={cx('rounded-full object-cover', className)} />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cx(
        'flex items-center justify-center rounded-full bg-gradient-to-br from-[#833ab4] via-[#e1306c] to-[#f77737] font-semibold uppercase text-white',
        className,
      )}
    >
      {(username || 'ig').slice(0, 2)}
    </span>
  );
}

/** One real comment from the Graph API, plus its real replies. */
function Comment({ comment, profileUrl, depth = 0 }) {
  const when = timeAgo(comment.timestamp);
  return (
    <li className={cx(depth > 0 && 'ml-9 max-md:ml-8')}>
      <div className="flex gap-3 py-2">
        <Avatar username={comment.username} className="h-8 w-8 shrink-0 text-[10px]" />
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug text-[#262626]">
            {comment.username && (
              <a
                href={`https://www.instagram.com/${comment.username}/`}
                {...external}
                className="mr-1.5 font-semibold text-[#262626] no-underline hover:underline"
              >
                {comment.username}
              </a>
            )}
            <span className="whitespace-pre-line break-words">{comment.text}</span>
          </p>
          <div className="mt-1 flex items-center gap-3 text-[11px] text-[#8e8e8e]">
            {when && <span>{when}</span>}
            {comment.likeCount ? (
              <span>
                {nf.format(comment.likeCount)} {comment.likeCount === 1 ? 'like' : 'likes'}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {comment.replies?.length > 0 && (
        <ul className="list-none pl-0">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} profileUrl={profileUrl} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function InstagramPostModal({ post, profileUrl, onClose }) {
  const [index, setIndex] = useState(0);
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const titleId = useId();

  const slides = post.media;
  const isCarousel = slides.length > 1;

  /* The frame is sized once, from the first slide, so paging a carousel does not
     make the whole viewer jump about — same as Instagram. */
  const aspect = useMemo(() => aspectOf(slides[0]), [slides]);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const previous = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    [slides.length],
  );

  /* Escape closes, arrows page the carousel, Tab stays inside the dialog, and
     the page behind must not scroll. */
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'ArrowRight' && isCarousel) next();
      if (event.key === 'ArrowLeft' && isCarousel) previous();
      if (event.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      /* focus goes back to the card that opened this — the grid owns that ref */
    };
  }, [onClose, next, previous, isCarousel]);

  const slide = slides[Math.min(index, slides.length - 1)];
  const alt = post.caption
    ? post.caption.replace(/\s+/g, ' ').slice(0, 150)
    : `Instagram post from @${post.username}`;
  const relative = timeAgo(post.timestamp);
  const absolute = postedOn(post.timestamp);

  const actionClass =
    'flex items-center gap-1.5 text-[#262626] no-underline transition-opacity hover:opacity-55';

  /*
    Portalled to <body>. It has to be: the section's container is
    `relative z-[1]`, a stacking context, so a dialog rendered in place can never
    rise above the reference's fixed header bars at z-1100 whatever z-index it
    carries. The grid only renders this component after a click, so there is no
    SSR pass and `document` is always there.
  */
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-2000 flex items-center justify-center p-6 max-lg:p-4 max-md:p-0"
    >
      {/* backdrop — clicking it closes; clicking the panel does not */}
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/85"
      />

      {/* × in the overlay corner, Instagram-style */}
      <button
        type="button"
        ref={closeRef}
        onClick={onClose}
        aria-label="Close post"
        className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-2xl leading-none text-white transition-colors hover:bg-black/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white max-md:right-3 max-md:top-3 max-md:bg-black/60"
      >
        <span aria-hidden="true" className="-mt-0.5">
          &times;
        </span>
      </button>

      <div
        ref={panelRef}
        className={cx(
          /* the details column, at Instagram's own widths */
          '[--ig-side:320px] lg:[--ig-side:360px] xl:[--ig-side:405px]',
          'relative z-10 flex h-[min(86vh,860px)] max-w-[95vw] overflow-hidden rounded-xl bg-white',
          'max-md:h-full max-md:w-full max-md:max-w-none max-md:flex-col max-md:rounded-none',
        )}
      >
        {/* ── media ─────────────────────────────────────────────────────── */}
        <div
          className={cx(
            /* side-by-side: the frame takes the post's own aspect ratio, so
               the media fills it edge to edge with no letterboxing */
            'relative h-full shrink-0 bg-black md:aspect-[var(--ig-aspect)]',
            'max-w-[calc(95vw-var(--ig-side))]',
            /* stacked: the image's own height drives the frame instead, or a
               tall post would leave a black gap under it */
            'max-md:h-auto max-md:w-full max-md:max-w-none max-md:shrink',
          )}
          style={{ '--ig-aspect': String(aspect) }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={slide.image}
            src={slide.image}
            alt={isCarousel ? `${alt} — image ${index + 1} of ${slides.length}` : alt}
            className="h-full w-full object-contain max-md:max-h-[45vh]"
          />

          {/* a video post shows its real poster frame; the video itself plays on
              Instagram, which is where the link goes */}
          {slide.type === 'VIDEO' && (
            <a
              href={post.permalink || profileUrl}
              {...external}
              aria-label="Play this video on Instagram"
              className="absolute inset-0 flex items-center justify-center no-underline"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm transition-transform hover:scale-105">
                <PlayIcon className="ml-1 h-7 w-7 text-white" />
              </span>
            </a>
          )}

          {isCarousel && (
            <>
              {index > 0 && (
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#262626] shadow transition hover:bg-white"
                >
                  <Chevron back className="h-4 w-4" />
                </button>
              )}
              {index < slides.length - 1 && (
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#262626] shadow transition hover:bg-white"
                >
                  <Chevron className="h-4 w-4" />
                </button>
              )}

              <div className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white max-md:right-14">
                {index + 1}/{slides.length}
              </div>

              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
                {slides.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show image ${i + 1} of ${slides.length}`}
                    aria-current={i === index}
                    className={cx(
                      'h-1.5 w-1.5 rounded-full transition',
                      i === index ? 'bg-white' : 'bg-white/45 hover:bg-white/70',
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── details column ────────────────────────────────────────────── */}
        <div className="flex w-[var(--ig-side)] min-w-0 flex-col max-md:min-h-0 max-md:w-full max-md:flex-1">
          {/* header — avatar and handle both open the real profile */}
          <div className="flex shrink-0 items-center gap-3 border-b border-[#efefef] px-4 py-3">
            <a
              href={profileUrl}
              {...external}
              aria-label={`Open @${post.username} on Instagram`}
              className="shrink-0"
            >
              <Avatar src={post.avatar} username={post.username} className="h-8 w-8 text-[11px]" />
            </a>
            <div className="min-w-0 flex-1">
              <a
                href={profileUrl}
                {...external}
                id={titleId}
                className="block truncate text-sm font-semibold text-[#262626] no-underline hover:underline"
              >
                {post.username}
              </a>
              {post.fullName && (
                <span className="block truncate text-xs text-[#8e8e8e]">{post.fullName}</span>
              )}
            </div>
            <a
              href={profileUrl}
              {...external}
              className="shrink-0 text-xs font-semibold text-[#0095f6] no-underline hover:text-[#00376b]"
            >
              View profile
            </a>
          </div>

          {/* caption + real comments — this column scrolls on its own */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3">
            {post.caption ? (
              <div className="flex gap-3 pb-3">
                <a
                  href={profileUrl}
                  {...external}
                  className="shrink-0"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Avatar
                    src={post.avatar}
                    username={post.username}
                    className="h-8 w-8 text-[11px]"
                  />
                </a>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug text-[#262626]">
                    <a
                      href={profileUrl}
                      {...external}
                      className="mr-1.5 font-semibold text-[#262626] no-underline hover:underline"
                    >
                      {post.username}
                    </a>
                    <span className="whitespace-pre-line break-words">{post.caption}</span>
                  </p>
                  {relative && <div className="mt-1.5 text-[11px] text-[#8e8e8e]">{relative}</div>}
                </div>
              </div>
            ) : (
              <p className="pb-3 text-sm text-[#8e8e8e]">This post has no caption.</p>
            )}

            <div className="border-t border-[#efefef] pt-2">
              {post.commentsStatus === 'ok' && (
                <ul className="list-none pl-0">
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} profileUrl={profileUrl} />
                  ))}
                </ul>
              )}

              {/* Meta really returned zero comments — say so, and only then */}
              {post.commentsStatus === 'empty' && (
                <p className="py-4 text-center text-sm text-[#8e8e8e]">No comments yet.</p>
              )}

              {/* the edge could not be read: never claim there are none */}
              {post.commentsStatus === 'unavailable' && (
                <p className="py-4 text-center text-sm text-[#8e8e8e]">
                  Comments for this post can be read on Instagram.
                  {post.permalink && (
                    <>
                      {' '}
                      <a
                        href={post.permalink}
                        {...external}
                        className="font-semibold text-[#0095f6] no-underline hover:underline"
                      >
                        Open the post
                      </a>
                    </>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* actions — every one of them a link to the real post */}
          <div className="shrink-0 border-t border-[#efefef] px-4 py-3">
            <div className="flex items-center gap-4">
              <a
                href={post.permalink || profileUrl}
                {...external}
                className={actionClass}
                aria-label="Like this post on Instagram"
                title="Opens the post on Instagram"
              >
                <HeartIcon className="h-6 w-6" />
              </a>
              <a
                href={post.permalink || profileUrl}
                {...external}
                className={actionClass}
                aria-label="Comment on this post on Instagram"
                title="Opens the post on Instagram"
              >
                <CommentIcon className="h-6 w-6" />
              </a>
              <a
                href={post.permalink || profileUrl}
                {...external}
                className={actionClass}
                aria-label="Share this post on Instagram"
                title="Opens the post on Instagram"
              >
                <ShareIcon className="h-6 w-6" />
              </a>
              <a
                href={post.permalink || profileUrl}
                {...external}
                className={cx(actionClass, 'ml-auto')}
                aria-label="Save this post on Instagram"
                title="Opens the post on Instagram"
              >
                <SaveIcon className="h-6 w-6" />
              </a>
            </div>

            {/* real counts, straight from Meta — labels, not controls */}
            {post.likeCount !== null && (
              <div className="mt-2.5 text-sm font-semibold text-[#262626]">
                {nf.format(post.likeCount)} {post.likeCount === 1 ? 'like' : 'likes'}
              </div>
            )}

            {post.commentCount !== null && post.commentCount > 0 && (
              <a
                href={post.permalink || profileUrl}
                {...external}
                className="mt-1 block text-sm text-[#8e8e8e] no-underline hover:underline"
              >
                {post.commentCount === 1
                  ? 'View 1 comment on Instagram'
                  : `View all ${nf.format(post.commentCount)} comments on Instagram`}
              </a>
            )}

            {absolute && (
              <div className="mt-1 text-[11px] uppercase tracking-wide text-[#8e8e8e]">
                {absolute}
              </div>
            )}

            <a
              href={post.permalink || profileUrl}
              {...external}
              className="mt-3 flex h-11 w-full items-center justify-center rounded-3xl bg-atlas-cyan text-sm font-bold text-black no-underline transition-opacity hover:opacity-90"
            >
              View on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
