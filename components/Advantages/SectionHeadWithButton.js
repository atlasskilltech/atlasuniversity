import ButtonRegular from '@/components/ui/ButtonRegular';
import withBreaks from '@/lib/withBreaks';
import { H2 } from '@/components/Home/SectionHead';

/**
 * `.head-wrap.top > (h2.h2-tag.mrg16, a.button-regular)` — a heading with a
 * call-to-action on the same row, used by four sections of
 * /advantages/atlas-advantages (`:237`, `:608`, `:664`, `:950`), each linking
 * to the Advantages page it summarises.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                     >=768px                  <=767px            <=479px
 *   .head-wrap.top    row, space-between,      column-flow from   justify
 *                     align-start              `.head-wrap`,      space-around
 *                                              gap 16, stretch,
 *                                              margin-bottom 16
 *   .h2-tag.mrg16     44px/1.2, 500, mb 16     36px, mb 8
 *
 * `.head-wrap.top` overrides only justify/align, so it inherits
 * `.head-wrap`'s `flex-flow: column` at <=767 and the button drops below the
 * heading — the same arithmetic /success-stories' "Our Global Partnerships"
 * carries.
 *
 * The button's `.extra-space` also holds a `<script>` that sets
 * `style.fontSize = getAttribute('data-font-size') + 'px'` on every
 * `.button-text`. The attribute is empty on all four, so the assignment is the
 * invalid string "px" and the size never moves off the stylesheet's — nothing
 * to port, the same dead script /life-at-atlas already documents.
 */
export default function SectionHeadWithButton({ heading, button }) {
  return (
    /* ref .head-wrap.top */
    <div className="flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:justify-around">
      {/* ref h2.h2-tag.mrg16 */}
      <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{withBreaks(heading)}</h2>

      {/* ref a.button-regular */}
      <ButtonRegular href={button.href}>{button.label}</ButtonRegular>
    </div>
  );
}
