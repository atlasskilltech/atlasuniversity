'use client';

import { useState, useRef, useCallback } from 'react';
import {
  worlds,
  interests,
  dreams,
  interestMatrix,
  dreamMatrix,
  programmeScoreProfiles,
  REQUIRED_SELECTIONS,
  DRUMROLL_DURATION,
} from '@/lib/schools/isdi/home/programmesV2Data';

/*
 * The ISDI homepage "19 programmes. Five worlds." section + its PathFinder quiz —
 * reference/schools/isdi/assets/include/19-programmesv2.php (the include that upstream substituted for the
 * old "Our Programs" tab section). The reference is a self-contained vanilla-JS widget; this is its React
 * port. It renders the reference's own `.isdi-*` markup so the lifted, scoped CSS in app/globals.css
 * (#isdi-programmes-section) styles it unchanged. All copy, worlds, quiz options and the two-step scoring
 * (3 interests + 3 dreams -> weighted score -> top 3 programmes) are transcribed verbatim from the
 * reference. The drumroll GIF is the homepage's already-local WebP.
 */
const DRUM = '/assets/images/schools/isdi/home/programs/drum-animation.webp';

const ArrowSm = () => (
  <svg className="isdi-arrow-sm" viewBox="0 0 12 8" fill="none" aria-hidden="true" focusable="false">
    <path d="M0 4h11M8 1l3 3-3 3" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);
const ArrowLg = ({ back }) => (
  <svg className={`isdi-arrow-lg${back ? ' isdi-arrow-lg--back' : ''}`} viewBox="0 0 18 12" fill="none" aria-hidden="true" focusable="false">
    <path d="M0 6h16.5M11.5 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
const Dot = () => <span className="isdi-dot" aria-hidden="true">&bull;</span>;

const allProgrammes = worlds.flatMap((w) => w.programmes.map((p) => ({ ...p, world: w })));

function calculateProgrammeScores(selectedInterests, selectedDreams) {
  const totals = { fashionDesign: 0, fashionComm: 0, commDesign: 0, productDesign: 0, interiorDesign: 0, strategicDesign: 0, animationVFX: 0 };
  const addRow = (row) => { if (row) Object.keys(row).forEach((k) => { totals[k] += row[k]; }); };
  selectedInterests.forEach((id) => addRow(interestMatrix[id]));
  selectedDreams.forEach((id) => addRow(dreamMatrix[id]));
  const results = allProgrammes.map((p) => {
    const profile = programmeScoreProfiles[p.id] || {};
    let weightedTotal = 0;
    let weightSum = 0;
    Object.keys(profile).forEach((k) => { weightedTotal += totals[k] * profile[k]; weightSum += profile[k]; });
    return { ...p, score: weightSum ? weightedTotal / weightSum : 0 };
  });
  results.sort((a, b) => b.score - a.score);
  return results;
}

function Meta({ p }) {
  return <>{p.degree}<Dot />{p.duration}</>;
}

function ProgrammeItem({ p }) {
  return (
    <li className="isdi-programme-item">
      <a className="isdi-programme-link" href={p.url}>
        <span className="isdi-programme-top">
          <span className="isdi-programme-name">{p.name}</span>
          <span className="isdi-programme-arrow"><ArrowSm /></span>
        </span>
        <span className="isdi-programme-detail"><Meta p={p} /></span>
      </a>
    </li>
  );
}

function ProgrammeList({ world }) {
  if (world.columns === 1) {
    return (
      <div className="isdi-programme-columns">
        <ul className="isdi-programme-list isdi-programme-list--first">
          {world.programmes.map((p) => <ProgrammeItem key={p.id} p={p} />)}
        </ul>
      </div>
    );
  }
  const half = Math.ceil(world.programmes.length / 2);
  const first = world.programmes.slice(0, half);
  const second = world.programmes.slice(half);
  return (
    <div className="isdi-programme-columns isdi-programme-columns--split">
      <ul className="isdi-programme-list isdi-programme-list--first">{first.map((p) => <ProgrammeItem key={p.id} p={p} />)}</ul>
      <ul className="isdi-programme-list isdi-programme-list--second">{second.map((p) => <ProgrammeItem key={p.id} p={p} />)}</ul>
    </div>
  );
}

function WorldCard({ world }) {
  const count = world.programmes.length;
  return (
    <article className={`isdi-world-card${world.wide ? ' isdi-world-card--wide' : ''}`} style={{ '--isdi-card-color': world.color }}>
      <span className="isdi-world-number" aria-hidden="true">{world.number}</span>
      <div className="isdi-world-body">
        <p className="isdi-world-meta">World {world.number}<Dot />{count} {count === 1 ? 'Programme' : 'Programmes'}</p>
        <h3 className="isdi-world-title">{world.title}</h3>
        <p className={`isdi-world-description${world.descriptionNarrow ? ' isdi-world-description--narrow' : ''}`}>{world.description}</p>
        <ProgrammeList world={world} />
      </div>
    </article>
  );
}

function OptionPill({ option, group, checked, disabled, onChange }) {
  return (
    <label className="isdi-quiz-option">
      <input type="checkbox" className={`isdi-quiz-option-input isdi-quiz-${group}`} value={option.id} checked={checked} disabled={disabled} onChange={onChange} />
      <span className="isdi-quiz-option-label">{option.text}</span>
    </label>
  );
}

export default function ProgrammesV2() {
  const [step, setStep] = useState(1); // 1 | 2 | 'loading' | 3
  const [sel1, setSel1] = useState([]); // interest ids
  const [sel2, setSel2] = useState([]); // dream ids
  const [results, setResults] = useState([]);
  const timer = useRef(null);

  const toggle = useCallback((setter, list, id) => {
    if (list.includes(id)) setter(list.filter((x) => x !== id));
    else if (list.length < REQUIRED_SELECTIONS) setter([...list, id]);
  }, []);

  const step1Ready = sel1.length === REQUIRED_SELECTIONS;
  const step2Ready = sel2.length === REQUIRED_SELECTIONS;

  const showResults = () => {
    if (!step1Ready || !step2Ready) return;
    setResults(calculateProgrammeScores(sel1, sel2).slice(0, 3));
    setStep('loading');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStep(3), DRUMROLL_DURATION);
  };

  const startOver = () => {
    clearTimeout(timer.current);
    setSel1([]); setSel2([]); setResults([]); setStep(1);
  };

  const row1 = worlds.filter((w) => w.row === 1);
  const row2 = worlds.filter((w) => w.row === 2);

  return (
    <section id="isdi-programmes-section">
      <div className="isdi-container">
        <p className="isdi-eyebrow">Our Programmes</p>
        <h2 className="isdi-title">19 programmes.<br />Five worlds.<br />Choose your path.</h2>
        <p className="isdi-description">Build products. Shape fashion. Create stories. Reimagine spaces. Launch ventures.</p>

        <div className="isdi-worlds">
          <div className="isdi-worlds-row isdi-worlds-row--one">{row1.map((w) => <WorldCard key={w.number} world={w} />)}</div>
          <div className="isdi-worlds-row isdi-worlds-row--two">{row2.map((w) => <WorldCard key={w.number} world={w} />)}</div>
        </div>

        <div className="isdi-pathfinder" id="isdi-path-finder">
          <div className="isdi-pathfinder-head">
            <h3 className="isdi-pathfinder-title">Can&apos;t decide which program is best for you?</h3>
            <div className="isdi-pathfinder-intro">
              <p className="isdi-pathfinder-intro-title">Check out ISDI&apos;s PathFinder</p>
              <p className="isdi-pathfinder-intro-text">No complicated quizzes, just two steps!</p>
            </div>
          </div>

          {/* STEP 1 — interests */}
          <div className={`isdi-quiz-step${step === 1 ? '' : ' isdi-is-hidden'}`} id="isdi-quiz-step-1">
            <h4 className="isdi-quiz-question">What are 3 things that light you up?</h4>
            <div className="isdi-quiz-options" id="isdi-interest-list">
              {interests.map((o) => (
                <OptionPill key={o.id} option={o} group="interest" checked={sel1.includes(o.id)} disabled={!sel1.includes(o.id) && step1Ready} onChange={() => toggle(setSel1, sel1, o.id)} />
              ))}
            </div>
            <div className="isdi-quiz-actions">
              <button type="button" className="isdi-quiz-icon-button" disabled={!step1Ready} aria-label="Next step" onClick={() => step1Ready && setStep(2)}>
                <ArrowLg />
              </button>
            </div>
          </div>

          {/* STEP 2 — dreams */}
          <div className={`isdi-quiz-step${step === 2 ? '' : ' isdi-is-hidden'}`} id="isdi-quiz-step-2">
            <h4 className="isdi-quiz-question">Share 3 big dreams you are chasing</h4>
            <div className="isdi-quiz-options" id="isdi-dream-list">
              {dreams.map((o) => (
                <OptionPill key={o.id} option={o} group="dream" checked={sel2.includes(o.id)} disabled={!sel2.includes(o.id) && step2Ready} onChange={() => toggle(setSel2, sel2, o.id)} />
              ))}
            </div>
            <div className="isdi-quiz-actions">
              <button type="button" className="isdi-quiz-icon-button isdi-quiz-icon-button--ghost" aria-label="Back to previous step" onClick={() => setStep(1)}>
                <ArrowLg back />
              </button>
              <button type="button" className="isdi-quiz-button" disabled={!step2Ready} onClick={showResults}>Hit me with the results!</button>
            </div>
          </div>

          {/* LOADING — drumroll */}
          <div className={`isdi-quiz-loading${step === 'loading' ? '' : ' isdi-is-hidden'}`} id="isdi-quiz-loading" role="status">
            <p className="isdi-quiz-loading-text">Drumroll in progress... your future is loading</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="isdi-quiz-loading-image" src={DRUM} alt="" width="450" height="450" loading="lazy" />
          </div>

          {/* STEP 3 — results */}
          <div className={`isdi-quiz-step${step === 3 ? '' : ' isdi-is-hidden'}`} id="isdi-quiz-step-3">
            <h4 className="isdi-quiz-question">Here&apos;s where we think you will shine!</h4>
            <div className="isdi-quiz-results" id="isdi-quiz-results">
              {results.map((p) => (
                <a key={p.id} className="isdi-result-card" href={p.url} style={{ '--isdi-card-color': p.world.color }}>
                  <span className="isdi-result-top">
                    <span className="isdi-result-meta">World {p.world.number}<Dot /><Meta p={p} /></span>
                    <span className="isdi-result-arrow"><ArrowSm /></span>
                  </span>
                  <span className="isdi-result-name">{p.name}</span>
                </a>
              ))}
            </div>
            <div className="isdi-quiz-actions">
              <button type="button" className="isdi-quiz-button isdi-quiz-button--ghost" onClick={startOver}>Start Over</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
