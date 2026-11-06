/**
 * /green-campus hero — `.inner-header-wrapper.full-ht` holding two Webflow background videos, the
 * desktop cut (`.campus-video-player`) above 767px and the mobile cut (`.campus-video-player-mob`)
 * at and below it, swapped by the page's own `<style>`. Each fills the 100vh frame, muted, looping,
 * `object-fit: cover`, over the shared hero poster.
 *
 * ── What the reference also authors, and why it is not rendered ──────────
 * `.inner-hero-wrapper` is still in the markup with its `.hero-text` commented out. It keeps its
 * scrim (`#0000 → #000000fc 92% → #000 99%`, top 40%), but it comes BEFORE the video wrappers, and
 * those are `position: relative` — so they paint over it and the scrim is never visible (measured:
 * the frame is the bare video at every width). An empty, fully covered box is not ported.
 */
export default function Hero({ hero }) {
  return (
    /* ref .inner-header-wrapper.full-ht */
    <div className="relative h-screen w-full overflow-hidden">
      {/* ref .campus-video-player (desktop) / .campus-video-player-mob (<=767) */}
      <HeroVideo sources={hero.desktop} poster={hero.poster} className="max-md:hidden" />
      <HeroVideo sources={hero.mobile} poster={hero.poster} className="hidden max-md:block" />
    </div>
  );
}

function HeroVideo({ sources, poster, className }) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full bg-cover bg-center object-cover"
      >
        {sources.map((src) => (
          <source key={src} src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
        ))}
      </video>
    </div>
  );
}
