/*
 * /schools/isdi/celebrating-13-years-isdi-and-parsons —
 * reference/schools/isdi/celebrating-13-years-isdi-and-parsons/index.php.
 *
 * A bare standalone page: the reference is its own `<!doctype html>` document that loads only Bootstrap
 * and renders ONE full-width SVG (`img-fluid w-100`) — no ISDI header/footer (it does not include
 * header.php). Production serves it exactly that way, so the ISDI chrome is stepped aside for this route
 * by `components/Schools/ISDI/ISDIChromeOnly` (mounted in app/schools/isdi/layout.js). The SVG
 * (`isdi-the-new-school-parsons.svg`, a tall ISDI × The New School / Parsons "13 years" celebration
 * poster, 540×2625 with 75 embedded rasters, ~38MB) is copied byte-for-byte per the asset rule; its size
 * is a hosting consideration, like the project's testimonial videos.
 *
 * Not linked from the header menu, the pathfinder or any page body; built on the user's scope decision to
 * complete every remaining ISDI reference page.
 */
const SVG = '/assets/images/schools/isdi/celebrating-13-years-isdi-and-parsons/isdi-the-new-school-parsons.svg';

export const metadata = {
  title: 'Celebrating 13 years ISDI and Parsons',
};

export default function Celebrating13YearsPage() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={SVG} alt="..." className="block h-auto w-full" />
  );
}
