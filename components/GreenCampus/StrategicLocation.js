import GreenCard from './GreenCard';
import { SHAPING_WRAPPER } from '@/components/ui/ContentCardB';

/**
 * "Strategic Location" — `.shaping-wrapper > .card-content-b`, full-bleed (outside `.container`) as
 * /about-us renders its "Shaping a Viksit Bharat" rows: padding-top 56, 40 at <=767, 20 at <=479.
 * One card on a #1E226B panel, three paragraphs beside the campus map, the title at the page's own
 * 60px `.map-header-title`.
 *
 * ── One reference defect, not reproduced ──────────────────────────────────
 * The reference authors `src="location.svg"` with `srcset="…shaping-img-1-p-500.webp 500w,
 * location.svg 683w" sizes="100vw"` — the first candidate is not the map at all but /about-us's
 * classroom photograph. Any device that needs no more than 500 device pixels for the row (a phone at
 * 1x, measured at 390) therefore shows that unrelated photograph instead of the map. Only the map is
 * shipped here, at every width; on desktop, where the reference already picks the SVG, nothing
 * changes.
 */
export default function StrategicLocation({ location }) {
  return (
    /* ref .shaping-wrapper */
    <div className={SHAPING_WRAPPER}>
      <GreenCard item={location} map />
    </div>
  );
}
