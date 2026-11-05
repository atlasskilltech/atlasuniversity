import { Fragment } from 'react';
import ModuleSlider from '@/components/Schools/Ugdx/SummerTech/ModuleSlider';
import InlineEnquiry from '@/components/Schools/Ugdx/SummerTech/InlineEnquiry';
import { cx } from '@/lib/cx';
import * as data from '@/lib/schools/ugdx/ugdxSummerSchoolContent';

export const metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: data.url },
};

/*
 * reference/ugdx/ugdxsummerschool.php is not a Webflow page: under the ATLAS header and footer it loads
 * Bootstrap 5.3.2 (grid, cards, spacing utilities, reboot), Swiper 11 and Figtree, and styles everything
 * in its own <style>. The classes below restate that cascade, measured on production at 1440 / 767 / 390:
 *
 *   - Bootstrap's `sm` is 576 up (`n576`); the page's own <style> turns at `max-width: 576px` (`max-lp`).
 *   - `.row` is a wrapping flex row with -12px side margins; `.row > *` is `flex-shrink: 0`, full width,
 *     12px side padding — the `.handle-card`s are row children too, but carry `px-0`.
 *   - Webflow's sheet is still loaded and its `@media (max-width: 767px) .card { width: 295px }` beats
 *     Bootstrap's card, so every card is 295px wide (left-aligned in its column) below 768.
 *   - at <=576 each `.handle-card` is `display: initial` — an inline box around block columns — which
 *     lays out as a full-width block keeping its 16px of vertical padding.
 *   - headings take Bootstrap's `h2` size, `calc(1.325rem + .9vw)` capped at 2rem from 1200.
 */
const ROW = '-mx-3 flex flex-wrap';
const COL = 'w-full max-w-full flex-none px-3';
const H2 = 'mt-0 font-figtree text-[calc(1.325rem+.9vw)] font-extrabold leading-[1.2] [@media(min-width:1200px)]:text-[2rem]';
/* the heading column above a `.handle-card` — `.col-12.pt-5.pb-0.pt-sm-5.pb-sm-2.px-sm-5` */
const HEAD_COL = `${COL} pt-12 pb-0 n576:px-12 n576:pb-2`;
/* a `.handle-card` — `row > *` (full width) with px-0, its own max-width and centring, inline at <=576 */
const HANDLE = 'mx-auto flex w-full flex-none justify-center px-0 max-lp:block max-lp:max-w-none';
/* `.card` with the page's override: no radius, border or fill; Webflow's 295px below 768 */
const CARD = 'relative flex min-w-0 flex-col break-words rounded-none border-0 bg-transparent max-md:w-[295px]';

function Runs({ runs }) {
  return runs.map((r, i) => (typeof r === 'string' ? <Fragment key={i}>{r}</Fragment> : <sup key={i}>{r.sup}</sup>));
}

/**
 * /schools/ugdx/ugdxsummerschool — the "Young Tech Innovators Program" summer-school landing page.
 * Not linked from the header menu (that links /schools/ugdx/summerschool); reachable by URL, as upstream.
 *
 * Reference notes, not reproduced: the Bootstrap JS bundle is loaded and never used; the page links
 * Swiper's CDN stylesheet for one carousel that is reproduced in `ModuleSlider`.
 */
export default function UgdxSummerTechPage() {
  const { hero, intro, batches, skills, modules, arrows, videos, typicalDay, applyTab } = data;
  return (
    <div id="body" className="mx-auto max-w-[1920px] pt-[140px] text-[#212529] max-lp:pt-20">
      {/* ref .container-fluid.main-container */}
      <div data-block="hero" className="relative mx-auto w-full px-3">
        <div className={ROW}>
          {/* `.col-12.p-0` — no gutter (written out: `p-0` beside COL's `px-3` would lose on stylesheet order) */}
          <div className="w-full max-w-full flex-none p-0">
            {/* inline-block on the baseline (Webflow's normalize): the 6px under the clip is the line box's descender */}
            <video autoPlay muted playsInline loop src={hero.video} className="inline-block w-full align-baseline" />
          </div>
        </div>
        {/* ref .row.section-two — centred over the clip from 577 up; static and stacked at <=576 */}
        <div
          className={cx(
            ROW,
            'absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center px-24',
            'max-lp:static max-lp:block max-lp:w-auto max-lp:translate-x-0 max-lp:translate-y-0 max-lp:px-0',
          )}
        >
          <div className={cx(COL, 'py-4 n576:py-6')}>
            <p className="m-0 text-center font-figtree text-[4rem] font-extrabold leading-[1.5] text-white [text-shadow:3px_3px_3px_#ed1a3b] max-lp:text-[2.5rem] max-lp:text-[#ed1a3b] max-lp:[line-height:normal] max-lp:[text-shadow:none]">
              {hero.kicker}
            </p>
          </div>
          <div className={cx(COL, 'py-4 n576:w-1/2 n576:py-0')}>
            <h1 className="m-0 font-figtree text-[3rem] font-extrabold leading-[1.2] text-white [text-shadow:3px_3px_3px_#ed1a3b] [@media(min-width:577px)_and_(max-width:1500px)]:[text-shadow:2px_2px_2px_#ed1a3b] max-lp:text-[2.3rem] max-lp:text-[#ed1a3b] max-lp:[text-shadow:none]">
              {hero.heading}
            </h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.stripe} alt="" className="h-auto w-[85%] max-w-full align-middle max-lp:w-full" />
          </div>
          <div className={cx(COL, 'flex justify-end py-4 n576:w-1/2 n576:py-0')}>
            <div className="w-[70%] rounded-none border-[5px] border-solid border-white bg-[#ed1a3b] backdrop-blur-[10px] max-lp:w-full max-lp:px-4 max-lp:py-8">
              <InlineEnquiry id={hero.widget.id} height={hero.widget.height} />
            </div>
          </div>
        </div>
      </div>

      {/* ref .container-fluid.text-center.second-container */}
      <div className="mx-auto w-full px-3 text-center">
        <div data-block="intro" className={ROW}>
          <div className={cx(COL, 'py-4 n576:p-12')}>
            <h2 className={cx(H2, 'mb-6 text-[#ed1a3b]')}>{intro.heading}</h2>
            <p className="mb-4 mt-0 font-figtree text-[#222]">{intro.text}</p>
          </div>
        </div>

        <div data-block="batches" className={cx(ROW, 'bg-[#ed1a3b]')}>
          <div className={HEAD_COL}>
            <h2 className={cx(H2, 'mb-6 text-white max-lp:mb-0')}>{batches.heading}</h2>
          </div>
          <div className={cx(HANDLE, 'max-w-[850px] py-4 n576:pb-12 n576:pt-0')}>
            {batches.cards.map((c, i) => (
              <div key={i} className="w-full flex-none n576:w-1/3">
                <div className={cx(CARD, 'p-2')}>
                  <div className="flex-auto bg-[#f2f2f2] px-0 py-4">
                    <h5 className="mb-2 mt-0 font-figtree text-[2.5rem] font-extrabold leading-[1.2] text-[#342b7c]"><Runs runs={c.title} /></h5>
                    <p className="m-0 font-figtree text-[1.9rem] font-bold leading-[1.5] text-[#11a5b3]"><Runs runs={c.text} /></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-block="skills" className={ROW}>
          <div className={HEAD_COL}>
            <h2 className={cx(H2, 'mb-6 text-[#ed1a3b] max-lp:mb-0')}>{skills.heading}</h2>
          </div>
          <div className={cx(HANDLE, 'max-w-[1100px] gap-5 py-4 n576:pb-12 n576:pt-0')}>
            {skills.cards.map((c) => (
              <div key={c.title} className="w-full flex-none p-4 n576:w-1/4 n576:p-0">
                <div className={cx(CARD, 'shadow-[0_.125rem_.25rem_rgba(0,0,0,.075)]')}>
                  <div className="h-[32rem] flex-auto border border-solid border-[#00000014] bg-[#ed1a3b] p-4 max-lp:h-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt="..." loading="lazy" className="block h-auto w-full max-w-full" />
                    <h5 className="my-6 font-figtree text-[1.3rem] font-extrabold uppercase leading-[1.2] text-white">{c.title}</h5>
                    <p className="m-0 font-figtree text-base font-normal uppercase leading-[1.5] text-white">{c.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-block="modules" className={ROW}>
          <div className="w-full max-w-full flex-none px-0 pb-0 pt-12 n576:px-2 n576:pb-2">
            <ModuleSlider slides={modules} arrows={arrows} />
          </div>
        </div>

        <div data-block="videos" className={ROW}>
          <div className={cx(HANDLE, 'max-w-[1300px] gap-5 py-4 n576:py-12')}>
            {videos.map((id) => (
              <div key={id} className="w-full flex-none p-4 n576:w-1/3 n576:p-0">
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video player"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="inline h-[185px] w-full border-0 align-baseline"
                />
              </div>
            ))}
          </div>
        </div>

        <div data-block="typical-day" className={cx(ROW, 'bg-[#ed1a3b]')}>
          <div className={HEAD_COL}>
            <h2 className={cx(H2, 'mb-6 text-white max-lp:mb-0')}>{typicalDay.heading}</h2>
          </div>
          <div className={cx(HANDLE, 'max-w-[1300px] pb-4 pt-4 n576:pt-0')}>
            {typicalDay.cards.map((c) => (
              <div key={c.title} className="w-full flex-none n576:w-1/3">
                <div className={cx(CARD, 'p-2')}>
                  <div className="flex-auto bg-[#f2f2f2] px-0 py-4">
                    <h5 className="mb-2 mt-0 font-figtree text-[1.7rem] font-extrabold leading-[1.2] text-[#342b7c] max-lp:text-[1.2rem] max-lp:[text-shadow:1px_1px_0px_#F48128]">{c.title}</h5>
                    <p className="m-0 font-figtree text-base font-bold leading-[1.5] text-[#11a5b3]">{c.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={cx(COL, 'n576:px-12 n576:pb-12')}>
            {typicalDay.paragraphs.map((p, i) => (
              <p key={i} className="mb-6 mt-0 font-figtree text-white">{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* ref .apply-fix — fixed to the left edge at 30% of the viewport, turned 180deg */}
      <div className="fixed left-0 top-[30%] z-[999] block rotate-180 rounded-[22px_5px_5px_22px] bg-[#ff1e26] p-[3px] text-[12px] font-bold text-white [writing-mode:vertical-rl]">
        <a href={applyTab.href} target="_blank" rel="noopener">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={applyTab.image} alt="Apply now" />
        </a>
      </div>
    </div>
  );
}
