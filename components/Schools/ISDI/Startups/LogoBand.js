import LogoStrip from '../LogoStrip';

/**
 * The startup logo marquee (`success-stories/startups.php:220-247`).
 *
 *   div.section.nopad > .slide-wrap > 18 x img.logo-img._50-r-m
 *
 * `.section.nopad` zeroes the ISDI section's 50px of vertical padding and keeps the
 * base `.section`'s `overflow: hidden`, so the block is exactly the track's own
 * 110px (40 + 50 + 20) at every width — measured 110 at 1440, 768 and 390.
 *
 * The track is the shared `../LogoStrip`: the bare `.slide-wrap`, 5000px wide with
 * `padding: 40px 40px 20px`, driven by Webflow interaction `a-22` — which is the
 * project's `animate-slide-wrap` keyframe.
 *
 * **Nothing here shrinks.** `LogoStrip`'s header records the Industry page's marks
 * being squeezed to 186x43 by the flex row; on this page all eighteen paint at their
 * intrinsic width (50 / 104 / 175), because a replaced flex item's automatic minimum
 * size is its own intrinsic width and nothing clamps it — so the 2136px of marks plus
 * 3600px of margin overflow the 5000px track and are clipped. That falls out of the
 * same markup, which is why the component pins no size.
 *
 * All eighteen carry `._50-r-m` (200px of right margin, 80 at <=767); none carries
 * `.sm`. They are the SAME eighteen files the gallery above cites, in alphabetical
 * order rather than the gallery's.
 */
export default function LogoBand({ data }) {
  return (
    /* ref div.section.nopad */
    <div data-block="marquee" className="block overflow-hidden py-0">
      <LogoStrip logos={data.logos} />
    </div>
  );
}
