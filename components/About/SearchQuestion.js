import { fourSchools } from '@/lib/homeContent';

/**
 * The "ask our AI assistant" panel — port of
 * reference/assets/include/more-questions.php, which the four-schools section
 * includes with `$chatBxVariant = "w-variant-35db4856-…"` and
 * `$chatBxText = "What program are you looking for?"` (index.php:2043-2048).
 *
 * A real GET form to `<?php echo $edudomain ?>search` (i.e. `/search`) with a
 * `query` field — no JavaScript is bound to it anywhere in the reference, so it
 * is reproduced as a plain form rather than faked as a static block.
 *
 * ── Measured off the reference ────────────────────────────────────────────
 *                      >=768px                       <=767px
 *   .search-question   padding 56 / 300 / 56 / 56    40px 24px
 *                      #41418e + right-pinned PNG,
 *                      border-radius 32px 0,
 *                      1px bottom border
 *   .hd-label          40px, weight 500, lh 1        20px
 *   .sr-sub-text       24px, pt 10, pb 55            14px
 *   .search-bar-btm    24px, transparent, white,     14px
 *                      1px white bottom rule,
 *                      padding 0 40 16 0
 *   .search-button     absolute, top -10 / right 0,
 *                      padding 10 / 18, icon at 60%
 *
 * The huge 300px right padding is what keeps the input clear of the decorative
 * artwork on desktop; it collapses to 24px on mobile.
 */
export default function SearchQuestion() {
  const { search } = fourSchools;

  return (
    /* ref .search-question.w-variant-35db4856-34de-b71f-0f4d-3a27b78fcc63 */
    <div className="rounded-tl-[32px] rounded-br-[32px] border-b border-white bg-[#41418e] bg-[url(/assets/images/schools/search-panel-bg.png)] bg-auto bg-[position:100%] bg-no-repeat py-14 pl-14 pr-[300px] text-white max-md:p-[40px_24px] max-sm:bg-contain">
      {/* ref .label-text */}
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/icons/flower.svg"
          alt=""
          width={32}
          height={32}
          loading="lazy"
          decoding="async"
        />

        {/* ref .hd-label — `line-height: 1` at both sizes, so `leading-none`
            is repeated at max-md where `text-xl` brings its own 1.5 */}
        <div className="text-[40px] font-medium leading-none text-white max-md:text-xl max-md:leading-none">
          {search.label}
        </div>
      </div>

      {/* ref .sr-sub-text */}
      <div className="pb-[55px] pt-[10px] text-2xl max-md:text-sm">
        {search.subText}
      </div>

      {/* ref form.search-cont.w-form */}
      <form action={search.action} className="relative mb-0 block pr-0">
        {/* ref input.search-bar-btm.w-input */}
        <input
          type="search"
          name={search.name}
          maxLength={256}
          placeholder={search.placeholder}
          required
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          /* `h-[38px]` is Webflow's `.w-input` height, which the reference's
             own padding override leaves in place — without it the 24px text
             makes the field 53px tall instead of 38px. */
          className="mb-0 block h-[38px] w-full appearance-none border-0 border-b border-white bg-transparent pb-4 pr-10 text-2xl text-white placeholder:text-white placeholder:opacity-50 focus:outline-none max-md:text-sm"
        />

        {/* ref input.search-button.w-button */}
        <input
          type="submit"
          value=""
          aria-label="Search"
          className="absolute -top-[10px] right-0 block cursor-pointer border-0 bg-transparent bg-[url(/assets/icons/search-white.svg)] bg-[length:60%] bg-center bg-no-repeat px-[18px] py-[10px]"
        />
      </form>
    </div>
  );
}
