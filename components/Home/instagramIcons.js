/**
 * Icons shared by the Instagram grid card and the post viewer. Plain inline SVG
 * — no icon dependency, and no remote asset for something this small.
 */

export const InstagramGlyph = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.335 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.585 2.163 15.205 2.163 12s.012-3.584.07-4.85c.062-1.366.335-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.417 2.175 8.797 2.163 12 2.163Zm0 1.802c-3.148 0-3.5.012-4.735.068-.94.043-1.575.19-2.02.635-.446.446-.592 1.08-.635 2.02-.056 1.235-.068 1.587-.068 4.735s.012 3.5.068 4.735c.043.94.19 1.575.635 2.02.445.446 1.08.592 2.02.635 1.235.056 1.587.068 4.735.068s3.5-.012 4.735-.068c.94-.043 1.575-.19 2.02-.635.446-.445.592-1.08.635-2.02.056-1.235.068-1.587.068-4.735s-.012-3.5-.068-4.735c-.043-.94-.19-1.575-.635-2.02-.445-.446-1.08-.592-2.02-.635-1.235-.056-1.587-.068-4.735-.068Zm0 3.064a4.971 4.971 0 1 1 0 9.942 4.971 4.971 0 0 1 0-9.942Zm0 1.802a3.169 3.169 0 1 0 0 6.338 3.169 3.169 0 0 0 0-6.338Zm5.192-2.048a1.162 1.162 0 1 1 0 2.324 1.162 1.162 0 0 1 0-2.324Z" />
  </svg>
);

export const HeartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8Z" />
  </svg>
);

export const CommentIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.9 9.9 0 0 1-2.8-.4L3 21l1.4-4.2A8.4 8.4 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
  </svg>
);

export const ShareIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 2 11 13" />
    <path d="M22 2l-7 20-4-9-9-4 20-7Z" />
  </svg>
);

export const SaveIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21l-7-5-7 5V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17Z" />
  </svg>
);

export const PlayIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M4 3.5l13 6.5-13 6.5v-13Z" />
  </svg>
);

export const CarouselGlyph = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="8" y="3" width="13" height="13" rx="2" />
    <path d="M3 8v11a2 2 0 0 0 2 2h11" />
  </svg>
);

export const Chevron = ({ className, back }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={back ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);
