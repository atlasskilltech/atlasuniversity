import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import PersonCard from '../PersonCard';
import MarqueeTrack from './MarqueeTrack';
import { CONTAINER, H2, H2_MB, SECTION } from './ui';

/**
 * "Steering Excellence, Guiding ISDI - Our Advisory Board" — port of
 * reference/schools/isdi/index.php:3260-3586.
 *
 *   div.section > .testimonial-wrap > .container > h2.h2-tag.isdi
 *                                   > .swiper.marquee-swiper > 20 x .card-type-d
 *
 * The same `.card-type-d` markup as ATLAS's advisory board, but on ISDI's
 * variant, so it is not `components/ui/AdvisorCard`: 324 wide (not 272), 16px
 * corners (not `32px 0`), and the portrait keeps its natural 324 x 393 height
 * inside the 350px card rather than filling it. The card itself is
 * `components/Schools/ISDI/PersonCard` — the B.Des programme pages render the
 * same one in a carousel — and its measurements live there.
 *
 * Card, measured at every width:
 *   card            324 x 350 (min = max height), r16, clipped, white text
 *   scrim           from 70px down: transparent -> #002637 at 90%, p24,
 *                   content at the bottom
 *   name            20px/1.5, 600, pb4
 *   role            14px/1.5
 *   rule            40% x 1px white, my16
 *   logo            intrinsic size
 *   play button     56px, 24/24 from the top-right corner — on the four cards
 *                   that put the icon inside their `a.play-icon`; it opens the
 *                   footer's VideoModal through `data-video`
 *
 * The strip is a `MarqueeTrack` (Swiper `speed: 4000, delay: 0`, linear, pauses
 * on hover).
 *
 * The About page (about-us/index.php:276-620) runs two boards through this: "The
 * ATLAS Advisory Board" on this same `isdi` card, and "The ISDI Advisory Board" on
 * the `isdi-black` card variant (`w-variant-84b36011…`), which changes three things:
 *   scrim           `overlay-blk.png`, cover, anchored 50% 100% (no gradient)
 *   name            an inline-block #ec1376 label, padding 1/5, 8px below
 *   portrait        grayscale, `position: relative; z-index: -1` (the card is
 *                   isolated so that stays inside it)
 * `block` names the root's `data-block`; `data.playAlt` / `data.playLabel` are the
 * play icon's alt text and the button's accessible name where a page authors
 * different ones. All default to the homepage's.
 */
export default function AdvisoryBoard({ data, variant = 'isdi', block = 'advisory' }) {
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.base)}>{withBreaks(data.heading)}</h2>
      </div>

      <MarqueeTrack>
        {data.people.map((person, i) => (
          <PersonCard
            key={`${i}-${person.name}`}
            person={person}
            variant={variant}
            playLabel={data.playLabel}
            playAlt={data.playAlt}
          />
        ))}
      </MarqueeTrack>
    </div>
  );
}
