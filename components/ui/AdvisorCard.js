/**
 * `.card-type-d` on its `a36b0748…` variant — a portrait under a dark gradient
 * carrying a name, a role, a hairline rule and a company logo.
 *
 * Two instances, measured identical in every property:
 *   homepage / about-us                "Steering Excellence, Guiding ATLAS"  14
 *   /advantages/atlas-industry-…       the same section, same people          14
 *
 * The card is 324px wide with **no height** of its own. Two rules that only
 * apply because the card *is* the swiper slide upstream then pin it:
 *   .card-type-d.swiper-slide       min-height = max-height = 350px
 *   …:where(.w-variant-a36b0748…)   width 272px, radius `32px 0`
 * so it is a fixed 272x350. The portrait inside is *not* — see `.cd-tyd-image`
 * below.
 *
 * `.cd-tyd-txt-wrap` covers the bottom 80% with a `transparent -> #002637 90%`
 * gradient. `.cd-tyd-posi` is an empty div used purely as a 40%-wide 1px rule.
 *
 * ── The play buttons ──────────────────────────────────────────────────────
 * Only some cards have one. On the homepage and /about-us the rest are
 * commented out upstream and are therefore absent here too; on
 * /advantages/atlas-industry-centric-approach three of the six author an
 * `a.play-icon` with **no `<img>` inside it**, which the stylesheet leaves at
 * 0x0 — invisible and unclickable — even on the one that still carries a
 * `data-video`. So the button is rendered only where the reference authors its
 * icon, and `playIcon` may be a per-card value rather than a section-level one.
 *
 * The anchor carries `data-video`, which the project's existing VideoModal
 * picks up via a delegated listener on `document` — so no section using this
 * card needs JavaScript of its own.
 */
export default function AdvisorCard({ person, playIcon }) {
  /* the icon is a section-level prop where every card shares one (the homepage
     and /about-us) and a per-card value where they do not */
  const icon = person.playIcon === undefined ? playIcon : person.playIcon;

  return (
    /* ref .card-type-d, plus the two rules that only apply because the card is
       itself the swiper slide upstream:
         .card-type-d.swiper-slide            min-height = max-height = 350px
         …:where(.w-variant-a36b0748…)        width 272px, radius `32px 0` */
    <div className="relative h-[350px] w-[272px] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px] text-white">
      {/* ref .play-icon — absolute, top/right 24px. `data-video` is read by
          the shared VideoModal listener. */}
      {person.video && icon && (
        <a
          href={person.href}
          data-video={person.video}
          aria-label="Play video"
          className="absolute right-6 top-6 z-10 inline-block cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} alt="play button" loading="lazy" decoding="async" />
        </a>
      )}

      {/* ref .cd-tyd-txt-wrap + its `a36b0748…` variant */}
      <div className="absolute inset-x-0 bottom-0 flex h-[80%] w-full flex-row items-end bg-[linear-gradient(#0000,#002637_90%,#002637)] p-6">
        {/* ref .cd-tyd-detail */}
        <div className="w-full flex-none">
          {/* ref .cd-tyd-text */}
          <div className="pb-1 text-xl font-semibold text-white">
            {person.name}
          </div>

          {/* ref .cd-tyd-tx */}
          <div className="text-sm text-white">{person.role}</div>

          {/* ref .cd-tyd-posi — an empty 40% x 1px divider */}
          <div className="my-4 flex h-px w-[40%] items-start justify-between border-t border-white bg-white" />

          {/* ref .cd-tyd-logo-img — no CSS size, so intrinsic */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={person.logo}
            alt={person.logoAlt}
            loading="lazy"
            decoding="async"
            className="block"
          />
        </div>
      </div>

      {/* ref .cd-tyd-image — `width: 100%; height: 100%`. The card's height
          comes from `min-height`/`max-height`, not `height`, so its own height
          computes `auto` and the percentage resolves to `auto` too: the
          portrait keeps its natural ratio and ends ~15px above the card's
          bottom edge, under the gradient. Verified on the live site (272x335
          and 272x336 inside a 272x350 card, on all three pages that use it) —
          the local reference reads 350 only because a stray PHP warning ahead
          of its doctype puts it in quirks mode, where a percentage height
          resolves against an auto-height ancestor. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={person.image}
        alt={person.alt}
        loading="lazy"
        decoding="async"
        className="h-auto w-full object-cover"
      />
    </div>
  );
}
