'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import SmartLink from '@/components/SmartLink';

/**
 * ISDI's PathFinder — `.program-tags > .new-pathfinder > #pathfinder-wrapper`
 * (reference/schools/isdi/assets/include/pathfinder.php, its `<style>` block, and
 * the jQuery quiz at the foot of assets/include/footer.php).
 *
 * Behaviour, as the reference scripts it:
 *   step 1  pick 3 of 16 interests; at 3 the rest disable (opacity .6) and the
 *           circular next button enables (it is .6 and inert until then)
 *   step 2  pick 3 of 10 dreams the same way; the back arrow returns to step 1
 *           with the picks kept; "Hit me with the results!" enables at 3
 *   loading "Drumroll in progress…" with the drum animation, for 2500ms
 *   step 3  the top three of seven courses by interest + dream score (a stable
 *           sort, so ties keep the course order), each a card linking to its
 *           programme; "Start Over" clears everything and returns to step 1
 *
 *                      >=701px                     <=700px
 *   option             18px/1, p16/18, r24,        10px, p10
 *                      #193e90 1px border; checked
 *                      #193e90 fill, white text
 *   option lists       gap 20, px40                px10
 *   step heading       24px/700, mb24              mx10
 *   result row         centred, gap 20             top-left aligned horizontal
 *                                                  scroller, px20, no scrollbar
 *   result card        370x335, p24, r24; 30px     250x240; 20px title
 *                      title
 *
 * `.program-tags` draws the frame that joins this panel to the PathFinder card
 * above it: a 3px #df287b border (top-right corner square), a white strip that
 * erases the top border under the card (`::before`, gone at <=580) and a 3px
 * pink stub that bridges the 24px gap on the right (`::after`). Below 768 the top
 * border is dropped and the corners become 0 0 16 16.
 *
 * Deviation: the reference's options are hidden checkboxes inside labels; they
 * are the same here, but state lives in React rather than being read back out
 * of the DOM.
 */

const OPTION =
  'block cursor-pointer rounded-3xl border border-solid border-[#193e90] px-[18px] py-4 text-[18px] font-normal leading-none text-[#193e90] ' +
  'transition-[background-color,color] duration-300 ease-[ease] peer-checked:bg-[#193e90] peer-checked:text-white peer-disabled:opacity-60 ' +
  '[@media(max-width:700px)]:p-2.5 [@media(max-width:700px)]:text-[10px]';

const HEADING = 'm-0 mb-6 text-[24px] font-bold leading-[1.5] [@media(max-width:700px)]:mx-2.5';
const LIST = 'flex flex-wrap justify-center gap-5 px-10 [@media(max-width:700px)]:px-2.5';
const BTN_WRAP = 'mt-10 flex items-center justify-center gap-5';
/* ref #pathfinder-wrapper .btn over Bootstrap's .btn */
const BTN =
  'm-0 block h-12 cursor-pointer select-none rounded-3xl p-0 text-center align-middle ' +
  'transition-[color,background-color,border-color,box-shadow] duration-150 ease-in-out disabled:pointer-events-none disabled:opacity-60';
const BTN_TEXT = 'w-auto px-6 text-[18px] font-bold leading-[1.5]';

function Options({ name, items, picked, pick, onToggle }) {
  return (
    <div className={LIST}>
      {items.map((text, i) => {
        const checked = picked.includes(i);
        return (
          <label key={text} className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              name={name}
              className="peer hidden"
              checked={checked}
              disabled={!checked && picked.length >= pick}
              onChange={() => onToggle(i)}
            />
            <span className={OPTION}>{text}</span>
          </label>
        );
      })}
    </div>
  );
}

export default function PathFinder({ data }) {
  const [step, setStep] = useState(1); // 1 | 2 | 'loading' | 3
  const [interests, setInterests] = useState([]);
  const [dreams, setDreams] = useState([]);
  const [results, setResults] = useState([]);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  /*
   * The reference ships the drum animation in the page (inside a hidden box, so
   * it downloads on load). Here it is fetched once a visitor reaches step 2 —
   * early enough to be decoded before the 2.5s loading screen, without costing
   * every page view the download.
   */
  useEffect(() => {
    if (step !== 2) return;
    const img = new Image();
    img.src = data.loadingImage.src;
  }, [step, data.loadingImage.src]);

  const toggle = (setter) => (i) => setter((list) => (list.includes(i) ? list.filter((x) => x !== i) : [...list, i]));

  const showResults = () => {
    const totals = data.courses.map(() => 0);
    interests.forEach((i) => data.interestScores[i].forEach((v, c) => (totals[c] += v)));
    dreams.forEach((i) => data.dreamScores[i].forEach((v, c) => (totals[c] += v)));
    const ranked = data.courses.map((course, c) => ({ ...course, score: totals[c] })).sort((a, b) => b.score - a.score);
    setResults(ranked.slice(0, 3));
    setStep('loading');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStep(3), data.loadingMs);
  };

  const startOver = () => {
    setInterests([]);
    setDreams([]);
    setResults([]);
    setStep(1);
  };

  return (
    /* ref .program-tags */
    <div
      className={cx(
        'relative mt-6 rounded-[24px_0_24px_24px] border-[3px] border-solid border-[#df287b] pb-10 pt-[60px] text-center',
        'max-md:mt-0 max-md:rounded-[0_0_16px_16px] max-md:border-t-0 max-md:pt-20',
        "before:absolute before:-top-[3px] before:right-0 before:z-[1] before:block before:h-[3px] before:w-[calc(50%+12px)] before:bg-white before:content-['']",
        '[@media(max-width:580px)]:before:content-none',
        "after:absolute after:-right-[3px] after:-top-[28px] after:z-[1] after:block after:h-[28px] after:w-[3px] after:bg-[#df287b] after:content-['']"
      )}
    >
      {/* ref .new-pathfinder > #pathfinder-wrapper — `.w-embed`'s clearfix keeps
          the loading screen's 20px margins inside it, as `flow-root` does here */}
      <div className="flow-root">
        <div>
          {step === 1 && (
            <div>
              <h2 className={HEADING}>{data.steps.interests}</h2>
              <Options
                name="interest"
                items={data.interests}
                picked={interests}
                pick={data.pick}
                onToggle={toggle(setInterests)}
              />
              <div className={BTN_WRAP}>
                <button
                  type="button"
                  className={cx(BTN, 'w-12 border-0 bg-transparent text-[#212529]')}
                  disabled={interests.length < data.pick}
                  aria-label="Get Interest Result"
                  onClick={() => setStep(2)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.nextIcon}
                    width={48}
                    height={48}
                    alt="Get Interest Result"
                    className="inline-block align-middle"
                  />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className={HEADING}>{data.steps.dreams}</h2>
              <Options name="dream" items={data.dreams} picked={dreams} pick={data.pick} onToggle={toggle(setDreams)} />
              <div className={BTN_WRAP}>
                <button
                  type="button"
                  className={cx(BTN, 'w-12 rotate-180 border-0 bg-transparent text-[#212529]')}
                  aria-label="Back"
                  onClick={() => setStep(1)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.nextIcon} width={48} height={48} alt="" className="inline-block align-middle" />
                </button>
                <button
                  type="button"
                  className={cx(BTN, BTN_TEXT, 'border-0 bg-[#df287b] text-white')}
                  disabled={dreams.length < data.pick}
                  onClick={showResults}
                >
                  {data.finalButton}
                </button>
              </div>
            </div>
          )}

          {step === 'loading' && (
            /* ref #loadingCourse */
            <div className="my-5 text-center text-[20px] leading-[1.5]" role="status">
              {data.loading}
              <br />
              <br />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.loadingImage.src}
                width={data.loadingImage.width}
                height={data.loadingImage.height}
                alt=""
                className="inline-block aspect-square w-[450px] max-w-full object-contain align-middle"
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className={HEADING}>{data.steps.results}</h2>
              {/* ref #course-results.course-grid */}
              <div
                className={cx(
                  'flex items-center justify-center gap-5',
                  '[@media(max-width:700px)]:items-start [@media(max-width:700px)]:justify-start [@media(max-width:700px)]:overflow-scroll [@media(max-width:700px)]:px-5 [&::-webkit-scrollbar]:hidden'
                )}
              >
                {results.map((course) => (
                  <SmartLink key={course.course} href={course.href} className="no-underline">
                    <div
                      className="relative flex h-[335px] w-[370px] items-center rounded-3xl p-6 text-white [@media(max-width:700px)]:h-[240px] [@media(max-width:700px)]:w-[250px]"
                      style={{ background: course.bg }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={data.resultArrow}
                        width={26}
                        height={26}
                        alt=""
                        className="absolute right-5 top-5 z-0 max-w-full"
                      />
                      <h3 className="relative z-[1] m-0 p-0 text-[30px] font-bold leading-[30px] [@media(max-width:700px)]:text-[20px] [@media(max-width:700px)]:leading-[30px]">
                        BDes {course.course}
                      </h3>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={course.image.src}
                        width={course.image.width}
                        height={course.image.height}
                        alt=""
                        className="absolute bottom-0 right-5 z-0 max-w-full mix-blend-luminosity"
                      />
                    </div>
                  </SmartLink>
                ))}
              </div>
              <div className={BTN_WRAP}>
                <button
                  type="button"
                  className={cx(BTN, BTN_TEXT, 'border-2 border-solid border-[#df287b] bg-transparent text-[#df287b]')}
                  onClick={startOver}
                >
                  {data.startOver}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
