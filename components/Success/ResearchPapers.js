import { successContent } from '@/lib/successContent';
import ButtonRegular from '@/components/ui/ButtonRegular';
import SmartLink from '@/components/SmartLink';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Research Papers" — port of `success-stories-atlas.php:1140-1285`
 * (`.section > .container > (.head-wrap.mrgbtm > (.tt-wrap >
 *   (h2.h2-tag.mrg16, .sub-heading), a.button-regular),
 *   .publication-wrapper > 3 x .res-pub-card)`).
 *
 * Three publication cards, each a light grey panel with the journal's mark and
 * its impact factor on top, the title and authors in the middle, and the
 * issue metadata plus a link to the paper along the bottom.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                    <=767px
 *   .publication-wrapper     wrap, flex-start, gap 24   justify centre
 *   .res-pub-card            398 wide, #f0f0f0, 1px     shrinks with the
 *                            #c6c6c6, radius 32px 0,    container below 422
 *                            padding 21 35 24 25,
 *                            space-around
 *   .res-top                 space-between, centre,
 *                            margin-bottom 26
 *   .research-logo           88 wide, flex none
 *   .impact-wrapper          gap 4, centre              gap 10
 *   .impact-factor           14px, #000
 *   .impact-point            #07f6a0 on #193e90,        10px/500, padding 8
 *                            circle, padding 10
 *   .res-title               32px/1.2, 500, #000,       24px
 *                            margin-bottom 24
 *   .res-author-wrp          gap 5, padding-bottom 8
 *   .res-author(-head)       16px, 600
 *   .res-bottom              margin-top 100
 *   .res-subtitle            14px
 *   .issue-detail-wrapper    1px black bottom rule,
 *                            margin 10 0 20, pb 20
 *   .tx-* / .separator       14px/1.2, #9c9c9c rule
 *   .icon-button.mint-small  32 circle on #5cbdca       28
 *   .bt-icon.mint-small-11   25px, inverted             25px (its own rule
 *                                                       outweighs the 20px
 *                                                       `.bt-icon` default)
 *
 * `.icon-button.mint-small` and `.icon-button.mint-small:where(.w-variant-…)`
 * have the same specificity — `:where()` contributes none — so the later rule
 * wins and the button is `#5cbdca`, not the mint `--primary-color-isme`.
 *
 * The `.res-pub-card`'s own `w-variant-…` class supplies the 32px corner
 * radius, again through a zero-specificity `:where()`; nothing later overrides
 * it, so it applies.
 */
export default function ResearchPapers() {
  const { research } = successContent;

  return (
    /* ref .section */
    <div className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.mrgbtm */}
        <div className="mb-14 flex items-end justify-between max-md:mb-5 max-md:flex-col max-md:items-stretch max-md:justify-start">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref h2.h2-tag.mrg16 */}
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{research.heading}</h2>

            {/* ref .sub-heading */}
            <div className={SUB_INNER}>{research.subheading}</div>
          </div>

          {/* ref a.button-regular */}
          <ButtonRegular href={research.action.href} newTab>
            {research.action.label}
          </ButtonRegular>
        </div>

        {/* ref .publication-wrapper */}
        <div className="flex flex-wrap items-stretch justify-start gap-6 max-md:justify-center">
          {research.papers.map((paper) => (
            /* ref .res-pub-card */
            <div
              key={paper.title}
              className="flex w-[398px] flex-col justify-around overflow-hidden rounded-tl-[32px] rounded-br-[32px]
                         border border-[#c6c6c6] bg-[#f0f0f0] pb-6 pl-[25px] pr-[35px] pt-[21px]"
            >
              {/* ref .res-top */}
              <div className="mb-[26px] flex items-center justify-between">
                {/* ref img.research-logo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={paper.logo.src}
                  alt={paper.logo.alt}
                  loading="lazy"
                  className="w-[88px] flex-none"
                />

                {/* ref .impact-wrapper */}
                <div className="flex items-center justify-start gap-1 max-md:gap-2.5">
                  {/* ref .impact-factor */}
                  <div className="text-[14px] text-black">{paper.impactFactorLabel}</div>

                  {/* ref .impact-point */}
                  <div className="rounded-[50%] bg-[#193e90] p-2.5 text-[#07f6a0] max-md:p-2 max-md:text-[10px] max-md:font-medium max-md:leading-[1.5]">
                    {paper.impactPoint}
                  </div>
                </div>
              </div>

              {/* ref .res-title */}
              <div className="mb-6 text-[32px] font-medium leading-[1.2] text-black max-md:text-[24px]">
                <strong>{paper.title}</strong>
              </div>

              {/* ref .res-author-wrp */}
              <div className="flex items-start justify-start gap-[5px] pb-2">
                <div className="flex-none font-semibold">{paper.authorLabel}</div>
                <div className="font-semibold">{paper.author}</div>
              </div>
              <div className="flex items-start justify-start gap-[5px] pb-2">
                <div className="flex-none font-semibold">{paper.coAuthorLabel}</div>
                <div className="font-semibold">{paper.coAuthors}</div>
              </div>

              {/* ref .res-bottom */}
              <div className="mt-[100px]">
                {/* ref .res-subtitle */}
                <div className="text-[14px]">{paper.subtitle}</div>

                {/* ref .issue-detail-wrapper */}
                {/* each label and value is its own flex item, so the space the
                    reference writes inside them is stripped and the pairs read
                    "Volume:7" — transcribed as-is */}
                <div className="mb-5 mt-2.5 flex items-start border-b border-black pb-5 text-[14px] leading-[1.2]">
                  <div>{paper.volumeLabel}</div>
                  <div>{paper.volume}</div>
                  <div className="flex-none px-2 text-[#9c9c9c]">|</div>
                  <div>{paper.issueLabel}</div>
                  <div>{paper.issue}</div>
                  <div className="flex-none px-2 text-[#9c9c9c]">|</div>
                  <div>{paper.pagesLabel}</div>
                  <div>{paper.pages}</div>
                </div>

                {/* ref .research-date-wrapper */}
                <div className="flex items-center justify-between">
                  {/* ref .issue-date */}
                  <div className="flex flex-none text-[14px] leading-[1.2]">
                    <div>{paper.date}</div>
                    <div className="flex-none px-2 text-[#9c9c9c]">|</div>
                    <div>{paper.issnLabel}</div>
                    <div>{paper.issn}</div>
                  </div>

                  {/* ref a.icon-button.mint-small */}
                  <SmartLink
                    href={paper.href}
                    external
                    newTab
                    aria-label={paper.title}
                    className="flex h-8 w-8 items-center justify-center rounded-[30px] bg-atlas-cyan max-md:h-7 max-md:w-7"
                  >
                    {/* ref img.bt-icon.mint-small-11 */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/icons/arrow-downward.svg"
                      alt=""
                      loading="lazy"
                      className="w-[25px] leading-none invert"
                    />
                  </SmartLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
