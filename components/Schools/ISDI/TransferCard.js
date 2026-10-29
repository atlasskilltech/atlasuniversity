import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * `.transfer-card.isdi` — a portrait under a dark scrim with a name, a line of
 * detail under a 1px rule, and a partner logo.
 *
 * Extracted from `International/Masters` when /atlas-isdi-advantage's
 * industry-centric-approach page turned out to close its Career Services section
 * with the same wall. Measured identical on both references at 1440 / 768 / 390:
 *
 *   .transfer-card.isdi      282 x 388 at EVERY width, r17, clipped
 *   img.transfer-card-img    100% x 100% cover; `object-position: 50% 30%` at <=767.
 *                            Where the card ALSO authors `.isdi` on the image it
 *                            takes `border-radius: 16px` — not from a
 *                            `.transfer-card-img.isdi` rule, which does not exist,
 *                            but from ISDI's generic `.isdi { border-radius: 16px }`.
 *                            That is `person.imageRounded`, and it is a PER-CARD
 *                            flag because the references author it per card: all 23
 *                            on masters-progression, none of the 21 on placements,
 *                            5 of 12 on success-snapshot, 2 of 5 on
 *                            internationalisation and none of the 8 on
 *                            industry-centric-approach. (The card clips at r17, so
 *                            the image's own corners barely show — but the computed
 *                            value was wrong, which is how this was found.)
 *   .overlay                 the bottom 55% (90% at <=767) under
 *                            `linear-gradient(#00263700, #00263700 6%, #000000e6 86%)`
 *   .transfer-card-content   absolute, 26px up, 25px in on both sides, z20
 *   .transt-cd-name          24px/1 500 white
 *   .transf-cd-degre         14px/1.1 white, pt10 pb16 mb19, 1px white bottom rule
 *                            (`border-bottom` only, so the other three sides paint
 *                            nothing)
 *
 * **The logo is the one thing these pages do not share**, and it is three things
 * rather than two — hence `logoKind`, which names the class the card authors:
 *
 *   sized   `img.transf-un-logo`, which /atlas-isdi-advantage/internationalisation's
 *           sheet fixes at 140x36. **Its own page decides that**: the Success
 *           Snapshot sheets declare no `.transf-un-logo` rule at all, so the same
 *           class paints at its intrinsic size there (58x56 measured on the first
 *           of the five) and those cards take `bare`.
 *   big     `img.big-logo` — `width: 100%; max-width: 60%`, the Industry
 *           Internships wall
 *   bare    an `<img>` with no class, so intrinsic — the Career Services wall, one
 *           of the seven Internships cards, all 21 on
 *           /schools/isdi/success-stories/placements (104x50 / 175x50 / 50x50) and
 *           three of internationalisation's five (118x42 / 119x37 / 119x37)
 *
 * The logo stays OPTIONAL, but no page in the port leaves it out: the three cards
 * on internationalisation that looked as though they did were a 2026-10-26 defect —
 * their mark is a bare `<img>` and that page's extractor matched
 * `img.transf-un-logo` only. Read the element that owns the mark, not the class you
 * expect. `logoSized` stays as the older boolean spelling of `sized` / `bare`.
 */
export default function TransferCard({ person, logoSized = true, logoKind }) {
  const kind = logoKind ?? (logoSized ? 'sized' : 'bare');
  return (
    /* ref .transfer-card.isdi */
    <div className="relative h-[388px] w-[282px] flex-none overflow-hidden rounded-[17px]">
      {/* ref img.transfer-card-img */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={person.image.src}
        alt={person.image.alt}
        loading="lazy"
        decoding="async"
        className={cx(
          'h-full w-full object-cover align-middle max-md:object-[50%_30%]',
          /* `person.imageRounded` is the `.isdi` token on `img.transfer-card-img`,
             which has no rule of its own — it picks up ISDI's GENERIC
             `.isdi { border-radius: 16px }`. It travels per CARD because the
             references author it per card. */
          person.imageRounded && 'rounded-2xl'
        )}
      />

      {/* ref .overlay */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[55%] bg-[linear-gradient(#00263700,#00263700_6%,#000000e6_86%)] max-md:h-[90%]" />

      {/*
       * ref .transfer-card-content — it declares NO colour of its own, so it
       * inherits the page's #333; the white is on the two lines, each of which
       * declares `color: #fff`. Holding it on the wrapper instead paints the
       * same (nothing else in the box is text, and the rule under the detail
       * line is an explicit `1px solid #fff`) but reads back wrong, and it makes
       * the logo `<img>` inherit white where the reference leaves it at #333.
       */}
      <div className="absolute inset-x-0 bottom-[26px] z-20 mx-[25px]">
        {/* ref .transt-cd-name */}
        <div className="text-[24px] font-medium leading-none text-white">{person.name}</div>
        {/* ref .transf-cd-degre */}
        <div className="mb-[19px] border-0 border-b border-solid border-white pb-4 pt-2.5 text-[14px] font-normal leading-[1.1] text-white">
          {withBreaks(person.degree)}
        </div>
        {person.logo && (
          /* ref img.transf-un-logo, or a bare <img> on the Career Services wall */
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={person.logo.src}
            width={kind === 'sized' ? 140 : undefined}
            height={kind === 'sized' ? 36 : undefined}
            alt={person.logo.alt}
            loading="lazy"
            decoding="async"
            className={cx(
              /* the max-width is kept OUT of the shared string: `max-w-full` and
                 `max-w-[60%]` in one class list are resolved by STYLESHEET order,
                 not by the order they are written, and `max-w-full` wins — which
                 rendered the Industry Internships logos at 232px against the
                 reference's 139 */
              'inline-block align-middle',
              kind === 'big' ? 'w-full max-w-[60%]' : 'max-w-full',
              kind === 'sized' && 'h-9 w-[140px]'
            )}
          />
        )}
      </div>
    </div>
  );
}
