'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import PrimaryButton from '@/components/ui/PrimaryButton';
import AiAnswer, { plainPreview } from '@/components/Search/AiAnswer';
import {
  TRIGGER_ATTR,
  WIDGET_ID,
  closeCrmPopup,
  isWidgetLoaded,
  loadCrmWidget,
  watchCrmPopup,
  widgetFormUrl,
} from '@/components/Search/crmWidget';
import {
  addToHistory,
  findInHistory,
  getGateDismissed,
  getHistory,
  getServerGateDismissed,
  getServerHistory,
  getServerUrlQuery,
  getUrlQuery,
  rememberGateDismissed,
  setHistory,
  subscribe,
  subscribeNever,
  timeLabel,
} from '@/components/Search/searchStore';
import { MAX_QUERY_LENGTH, MIN_QUERY_LENGTH, normaliseQuery } from '@/lib/search/limits';
import { search as copy } from '@/lib/searchContent';

/**
 * /search — the ATLAS AI Search page. Port of reference/search.php.
 *
 * ── Layout (measured on https://atlasuniversity.edu.in/search) ─────────────
 *   hero    .inner-header-wrapper.sm-ht        400px, the mandatory-disclosure
 *           photograph `object-fit: cover`
 *           .inner-header-cover.no-flex         absolute, top 70% / height 30%,
 *                                               pb 56, transparent -> #000e
 *           form.search                         flex, 1px white bottom rule,
 *                                               mb 15
 *           input.search-input-2                24px/1.42857, white on
 *                                               transparent, 38px, placeholder
 *                                               white/50
 *           input.search-btn-sr                 ~39x40, search-white.svg @ 24px
 *   main    .main-search-wrapper                pt 56
 *           .search-result                      mt 60, count line 24px/700
 *
 * search.php re-includes Bootstrap's stylesheet in <body>, after the Webflow
 * sheet, so on this page `.container` is Bootstrap's (540 / 720 / 960 / 1140 /
 * 1320 max-width, 12px gutters) rather than the site's 1366/62 — measured, and
 * reproduced as BS_CONTAINER.
 *
 * The page's second, "main" search bar (`.search-bar-container`) is
 * `display: none` in the page sheet, so the hero field is the only input — as
 * here. The reference also orders loader -> answer -> count line -> history,
 * which is kept.
 *
 * ── The Enquire popup: an intentionally bypassable SOFT gate ──────────────
 * The legacy page forced a lead form (name / mobile / email / course) posted to
 * MySQL before the first search. That form is gone. Instead the ATLAS CRM
 * "Enquire Now" popup (components/Search/crmWidget.js) opens on the first visit,
 * and the visitor can submit it, close it, or press "Continue to AI Search".
 * Search is available either way. Nothing here records, infers or claims that a
 * lead was submitted. The popup opens automatically at most once a day
 * (searchStore GATE_TTL_MS) and can always be reopened with "Enquire Now".
 * If the CRM script cannot load, the page never traps the visitor: the gate
 * panel's "Continue to AI Search" is always there.
 *
 * ── Deviations from the reference, each deliberate ────────────────────────
 *  - History and the repeat-question cache live in the browser (localStorage),
 *    not the PHP session — the server keeps no per-visitor state.
 *  - "Clear All" confirms inline instead of with `window.confirm()`.
 *  - The idle count line reads "Ask a question above to see an AI answer."
 *    rather than the reference's literal "Here are 0 results :".
 *  - A history item scrolls to the answer rather than to the very top.
 *  - Error messages never mention API keys, billing or config files.
 */

/*
 * Bootstrap 5 `.container`, as search.php's own <link> to bootstrap.min.css
 * makes it. Written as non-overlapping width RANGES: Tailwind emits arbitrary
 * media variants in its own order, not by min-width, so a plain
 * `[@media(min-width:576px)]:max-w-[540px]` landed after the 1400px rule and
 * clamped the page to 540px at every desktop width. Ranges cannot collide.
 */
const BS_CONTAINER =
  'mx-auto w-full px-3 ' +
  '[@media(min-width:576px)_and_(max-width:767.98px)]:max-w-[540px] ' +
  '[@media(min-width:768px)_and_(max-width:991.98px)]:max-w-[720px] ' +
  '[@media(min-width:992px)_and_(max-width:1199.98px)]:max-w-[960px] ' +
  '[@media(min-width:1200px)_and_(max-width:1399.98px)]:max-w-[1140px] ' +
  '[@media(min-width:1400px)]:max-w-[1320px]';

/* ── small pieces ────────────────────────────────────────────────────────── */

function EnquireButton({ variant = 'outline-medium', className }) {
  /*
   * The CRM widget opens on any click on `[data-atlas-enquire]` (its
   * `data-atlas-trigger`). The onClick only matters when the widget failed to
   * load: it then opens the CRM's own form page in a new tab instead.
   */
  const onClick = useCallback(() => {
    if (!isWidgetLoaded() && WIDGET_ID) {
      window.open(widgetFormUrl(), '_blank', 'noopener');
    }
  }, []);

  if (!WIDGET_ID) return null;
  return (
    <PrimaryButton
      variant={variant}
      onClick={onClick}
      className={className}
      {...{ [TRIGGER_ATTR]: '' }}
      aria-haspopup="dialog"
    >
      {copy.enquireLabel}
    </PrimaryButton>
  );
}

/*
 * "Continue to AI Search", rendered INTO the widget's own overlay while the
 * popup is open (a React portal into the CRM's <div>). crmWidget.js turns that
 * overlay into a column, so this bar sits under the form card.
 */
function ContinueBar({ overlay, onContinue }) {
  const ref = useRef(null);

  // move focus into the popup when it opens (the widget does not)
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, [overlay]);

  return createPortal(
    <div className="flex w-[400px] max-w-full flex-none flex-col items-center gap-2 text-center">
      <PrimaryButton
        ref={ref}
        variant="atlas"
        onClick={onContinue}
        className="w-full justify-center"
      >
        {copy.continueLabel}
      </PrimaryButton>
      <p className="m-0 text-xs leading-normal text-white/85">{copy.continueNote}</p>
    </div>,
    overlay,
  );
}

function GatePanel({ onContinue }) {
  return (
    <div className="rounded-tl-[32px] rounded-br-[32px] bg-[#f4f6fb] px-8 py-10 max-md:px-6 max-md:py-8">
      <h2 className="mb-3 text-2xl font-bold leading-[1.4] text-[#1a1a1a]">{copy.gateTitle}</h2>
      <p className="mb-6 max-w-[720px] text-base text-[#333]">{copy.gateText}</p>
      <div className="flex flex-wrap items-center gap-4">
        <PrimaryButton variant="atlas" onClick={onContinue}>
          {copy.continueLabel}
        </PrimaryButton>
        <EnquireButton />
      </div>
    </div>
  );
}

function Loader() {
  return (
    /* ref .loader-container > .ld-cont */
    <div role="status" className="py-10 text-center">
      <div className="flex items-center justify-start gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/search/ai-search-loader.gif"
          alt=""
          width={56}
          height={56}
          className="block h-14 w-14 flex-none"
        />
        <div className="inline-flex text-2xl font-semibold">{copy.loading}</div>
      </div>
    </div>
  );
}

/* ref .ai-response-wrapper (search.php:249-287) */
const CARD =
  'my-[30px] rounded-2xl border border-[#e0e7ff] bg-gradient-to-br from-white to-[#f8f9fa] p-[30px] ' +
  'shadow-[0_10px_40px_rgba(102,126,234,0.15)] max-md:p-5';

function Badges() {
  return (
    /* ref .ai-response-header */
    <div className="mb-[25px] flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-2 rounded-[25px] bg-gradient-to-br from-[#667eea] to-[#764ba2] px-5 py-2.5 text-[15px] font-semibold leading-normal text-white shadow-[0_4px_15px_rgba(102,126,234,0.3)]">
        {copy.aiBadge}
      </span>
      <span className="rounded-[20px] border-2 border-[#667eea] bg-white px-4 py-2 text-[13px] font-semibold leading-normal text-[#667eea]">
        {copy.atlasBadge}
      </span>
    </div>
  );
}

function History({ items, onSelect, onClear }) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return undefined;
    const id = setTimeout(() => setConfirming(false), 5000);
    return () => clearTimeout(id);
  }, [confirming]);

  if (!items.length) return null;

  return (
    /* ref .search-history-container (search.php:420-511) */
    <section
      aria-labelledby="search-history-title"
      className="my-[30px] rounded-xl bg-white p-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] max-md:p-5"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#f0f0f0] pb-[15px]">
        <h3 id="search-history-title" className="m-0 text-2xl font-bold text-[#333]">
          {copy.historyTitle}
          <span className="ml-2.5 rounded-xl bg-[#667eea] px-3 py-1 align-middle text-sm font-semibold text-white">
            {items.length}
          </span>
        </h3>
        <button
          type="button"
          onClick={() => {
            if (confirming) {
              setConfirming(false);
              onClear();
            } else {
              setConfirming(true);
            }
          }}
          className="cursor-pointer rounded-lg border-0 bg-[#dc3545] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#c82333]"
        >
          {confirming ? copy.clearConfirm : copy.clearLabel}
        </button>
      </div>

      <ul className="m-0 flex list-none flex-col gap-[15px] p-0">
        {items.map((item, index) => (
          <li key={`${item.query}-${index}`}>
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="block w-full cursor-pointer rounded-[10px] border-2 border-transparent bg-[#f8f9fa] p-5 text-left transition-all duration-300 hover:translate-x-[5px] hover:border-[#667eea] hover:bg-[#e9ecef] focus-visible:border-[#667eea]"
            >
              <span className="mb-2.5 block text-lg font-semibold text-[#333] [overflow-wrap:anywhere]">
                {item.query}
              </span>
              <span className="line-clamp-2 block text-sm leading-[1.5] text-[#666]">
                {plainPreview(item.response)}
              </span>
              <span className="mt-2 block text-xs text-[#999]">{item.timestamp}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── the page ────────────────────────────────────────────────────────────── */

export default function SearchPage() {
  const history = useSyncExternalStore(subscribe, getHistory, getServerHistory);
  // null during the server render and hydration, then true / false
  const dismissedRecently = useSyncExternalStore(subscribe, getGateDismissed, getServerGateDismissed);
  const urlQuery = useSyncExternalStore(subscribeNever, getUrlQuery, getServerUrlQuery);

  /*
   * gate: 'init'    server render / hydration — storage not read yet
   *       'pending' the popup is offered (loading or open)
   *       'passed'  search available
   * Derived, not stored: dismissing the popup (Continue, ×, Escape, backdrop,
   * or simply searching) records the dismissal in the gate store.
   */
  let gate = 'init';
  if (!WIDGET_ID) gate = 'passed';
  else if (dismissedRecently !== null) gate = dismissedRecently ? 'passed' : 'pending';

  const [overlay, setOverlay] = useState(null);
  const [typed, setTyped] = useState(null); // null until the visitor edits the field
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [result, setResult] = useState(null); // { query, response, fromHistory }
  const [error, setError] = useState(null); // { message, query }

  const query = typed ?? (urlQuery || '').slice(0, MAX_QUERY_LENGTH);

  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const requestRef = useRef(null);
  const urlQueryHandled = useRef(false);
  const widgetStarted = useRef(false);

  /* ── searching ─────────────────────────────────────────────────────────── */

  const runSearch = useCallback(async (raw) => {
    const q = normaliseQuery(raw).slice(0, MAX_QUERY_LENGTH);
    if (q.length < MIN_QUERY_LENGTH) return;

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('query', q);
      window.history.replaceState(window.history.state, '', url);
    } catch {
      /* cosmetic only */
    }

    requestRef.current?.abort();

    // ref chat/search.php: a case-insensitive repeat returns the saved answer
    const cached = findInHistory(q);
    if (cached) {
      setError(null);
      setResult({ query: cached.query, response: cached.response, fromHistory: false });
      setStatus('success');
      return;
    }

    const controller = new AbortController();
    requestRef.current = controller;
    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
        signal: controller.signal,
      });
      let data = null;
      try {
        data = await res.json();
      } catch {
        /* non-JSON error page */
      }
      if (controller.signal.aborted) return;

      if (!res.ok || !data || typeof data.answer !== 'string') {
        setError({ message: (data && data.error) || copy.genericError, query: q });
        setStatus('error');
        return;
      }

      addToHistory({ query: q, response: data.answer, timestamp: timeLabel() });
      setResult({ query: q, response: data.answer, fromHistory: false });
      setStatus('success');
    } catch (err) {
      if (err && err.name === 'AbortError') return;
      setError({ message: copy.networkError, query: q });
      setStatus('error');
    }
  }, []);

  /* ── the gate ──────────────────────────────────────────────────────────── */

  // Load the widget once storage has been read; on a first visit open it the
  // way a visitor would — a click on a trigger element (the gate panel's
  // Enquire Now button).
  useEffect(() => {
    if (!WIDGET_ID || gate === 'init' || widgetStarted.current) return undefined;
    widgetStarted.current = true;
    const autoOpen = gate === 'pending';
    let cancelled = false;
    loadCrmWidget()
      .then(() => {
        if (cancelled || !autoOpen) return;
        const trigger = document.querySelector(`[${TRIGGER_ATTR}]`);
        if (trigger) trigger.click();
      })
      .catch(() => {
        /* script blocked / offline: the gate panel's Continue button remains */
      });
    return () => {
      cancelled = true;
      widgetStarted.current = false;
    };
  }, [gate]);

  // follow the popup: show the Continue bar while open; any close continues
  useEffect(() => {
    if (!WIDGET_ID) return undefined;
    const dispose = watchCrmPopup((el) => {
      setOverlay(el);
      if (!el) rememberGateDismissed();
    });
    return () => {
      dispose();
      closeCrmPopup(); // never leave the popup over another page
    };
  }, []);

  // once search is open, run the question the page was opened with (?query=)
  useEffect(() => {
    if (gate !== 'passed' || urlQueryHandled.current) return;
    urlQueryHandled.current = true;
    /* Starting the request for a URL-supplied question is the external sync
     * this effect exists for; the state it sets is that request's own
     * loading/result state, once per page view. */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (urlQuery) runSearch(urlQuery);
  }, [gate, urlQuery, runSearch]);

  // focus the search field when the gate opens
  const prevGate = useRef(gate);
  useEffect(() => {
    if (prevGate.current === 'pending' && gate === 'passed') {
      inputRef.current?.focus({ preventScroll: true });
    }
    prevGate.current = gate;
  }, [gate]);

  const onContinue = useCallback(() => {
    closeCrmPopup();
    rememberGateDismissed();
  }, []);

  /* ── handlers ──────────────────────────────────────────────────────────── */

  const onSubmit = (event) => {
    event.preventDefault();
    const q = normaliseQuery(query);
    if (q.length < MIN_QUERY_LENGTH) {
      setError({ message: copy.tooShort, query: q });
      setStatus('error');
      return;
    }
    if (gate !== 'passed') {
      // a soft gate: searching is itself a way to continue
      closeCrmPopup();
      rememberGateDismissed();
    }
    runSearch(q);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onSelectHistory = (item) => {
    requestRef.current?.abort();
    setTyped(item.query);
    setError(null);
    setResult({ query: item.query, response: item.response, fromHistory: true });
    setStatus('success');
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onClearHistory = () => setHistory([]);

  /* ── render ────────────────────────────────────────────────────────────── */

  let countLine = copy.idle;
  if (status === 'loading') countLine = copy.searching;
  else if (status === 'success' && result) {
    countLine = `${result.fromHistory ? copy.previousPrefix : copy.resultPrefix} "${result.query}"`;
  } else if (status === 'error') countLine = copy.errorTitle;

  return (
    <>
      {/* ref .inner-header-wrapper.sm-ht */}
      <section className="relative block h-[400px] overflow-hidden">
        {/* ref .inner-header-cover.no-flex */}
        <div className="absolute inset-x-0 top-[70%] z-[1] h-[30%] bg-gradient-to-b from-transparent to-black/90 pb-14">
          <div className={BS_CONTAINER}>
            {/* ref form#headerSearchForm.search.w-form */}
            <form
              role="search"
              onSubmit={onSubmit}
              className="mb-[15px] flex items-center justify-center border-b border-solid border-white"
            >
              <label htmlFor="ai-search-input" className="sr-only">
                {copy.inputLabel}
              </label>
              {/* ref input.search-input-2.w-input */}
              <input
                ref={inputRef}
                id="ai-search-input"
                type="search"
                name="query"
                value={query}
                onChange={(e) => setTyped(e.target.value)}
                maxLength={MAX_QUERY_LENGTH}
                required
                autoComplete="off"
                placeholder={copy.placeholder}
                className="mb-2.5 block h-[38px] min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-[24px] leading-[1.42857] text-white placeholder:text-white/50"
              />
              {/* ref input.search-btn-sr.w-button */}
              <button
                type="submit"
                aria-label={copy.submitLabel}
                className="h-10 w-[39px] flex-none cursor-pointer border-0 bg-transparent bg-[url(/assets/icons/search-white.svg)] bg-[length:24px] bg-center bg-no-repeat"
              />
            </form>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={copy.hero.src}
          srcSet={copy.hero.srcSet}
          sizes={copy.hero.sizes}
          alt=""
          width={1366}
          height={400}
          fetchPriority="high"
          className="block h-[400px] w-full max-w-full object-cover"
        />
      </section>

      {/* ref .main-search-wrapper */}
      <div className="min-h-[360px] pb-[60px] pt-14">
        <div className={BS_CONTAINER} ref={resultsRef} style={{ scrollMarginTop: '140px' }}>
          {gate === 'pending' && <GatePanel onContinue={onContinue} />}

          {gate === 'passed' && (
            <>
              {status === 'loading' && <Loader />}

              {status === 'success' && result && (
                <div className={CARD}>
                  <Badges />
                  <AiAnswer markdown={result.response} />
                </div>
              )}

              {status === 'error' && error && (
                <div role="alert" className={CARD}>
                  <Badges />
                  <p className="m-0 text-base leading-[1.8] text-[#2d3748]">{error.message}</p>
                  {error.query.length >= MIN_QUERY_LENGTH && (
                    <button
                      type="button"
                      onClick={() => runSearch(error.query)}
                      className="mt-4 cursor-pointer rounded-lg border-2 border-[#667eea] bg-white px-4 py-2 text-sm font-semibold text-[#667eea] hover:bg-[#e0e7ff]"
                    >
                      {copy.retryLabel}
                    </button>
                  )}
                </div>
              )}

              {/* ref .search-result > .search-text > p#search-count */}
              <div className="mt-[60px]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p aria-live="polite" className="m-0 text-2xl font-bold text-black [overflow-wrap:anywhere]">
                    {countLine}
                  </p>
                  <EnquireButton />
                </div>
              </div>

              <History items={history} onSelect={onSelectHistory} onClear={onClearHistory} />
            </>
          )}
        </div>
      </div>

      {overlay && <ContinueBar overlay={overlay} onContinue={onContinue} />}
    </>
  );
}
