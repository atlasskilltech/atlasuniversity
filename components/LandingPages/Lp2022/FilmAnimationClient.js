'use client';

import { Children, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '@/lib/cx';
import { LP2022_POPPINS_VARS } from '@/lib/landing/lp2022/fonts';

/**
 * Client pieces of /lp2022/film-animation_26 (see FilmAnimation.js): the collapsing navbar, the
 * `[data-scroll]` smooth jump (app.js: jQuery `animate({scrollTop}, 500)`, swing easing), Bootstrap
 * 4.4 tabs with `.fade` (0.15s opacity), and the `#Mysmallmodal` brochure modal.
 */

const swing = (p) => 0.5 - Math.cos(p * Math.PI) / 2;
function animateTo(y, ms = 500) {
  const from = window.scrollY;
  const t0 = performance.now();
  const step = (t) => {
    const p = Math.min(1, (t - t0) / ms);
    window.scrollTo(0, from + (y - from) * swing(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** `<a data-scroll href="#id">`: jQuery's 500ms swing scroll to the section's top */
export function ScrollLink({ href, className, children }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        const el = document.getElementById(href.slice(1));
        if (!el) return;
        e.preventDefault();
        animateTo(el.getBoundingClientRect().top + window.scrollY);
      }}
    >
      {children}
    </a>
  );
}

/* Material Icons "menu" (the toggler glyph), drawn inline */
function MenuIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}

/**
 * `.navbar-expand-lg`: the link row from 992px; below it the Material "menu" toggler opens the
 * `.collapse` panel (Bootstrap's 0.35s height transition) — white rows with black links. Clicking
 * a link does not close it, as upstream.
 */
export function Navbar({ brand, links, toggleClass, collapseClass, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {brand}
      <button
        type="button"
        aria-controls="navbarSupportedContent"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((o) => !o)}
        className={toggleClass}
      >
        <MenuIcon className="block h-[1em] w-[1em]" />
      </button>
      <div
        id="navbarSupportedContent"
        className={cx(
          collapseClass,
          'max-lg:grid max-lg:transition-[grid-template-rows] max-lg:duration-[350ms] max-lg:ease-[ease]',
          open ? 'max-lg:grid-rows-[1fr] max-lg:border-t max-lg:border-solid max-lg:border-t-[#e32131]' : 'max-lg:grid-rows-[0fr]',
        )}
      >
        <div className={cx('min-h-0 max-lg:overflow-hidden', !open && 'max-lg:invisible')}>{links}</div>
      </div>
      {children}
    </>
  );
}

/**
 * Bootstrap 4.4 `.nav-tabs` driven by `$(a).tab('show')`: the old pane loses `.show` (opacity 0
 * over 0.15s), then the new one is displayed and fades in. `items`: [{ id, tab }], where `tab` is
 * the link's content; `panes` is the matching array of pane elements. `liClass` is a string or one
 * string per tab; the link gets `linkClass` plus `activeClass` / `idleClass`.
 */
export function Tabs({ items, ulClass, liClass, linkClass, activeClass, idleClass, panes, contentClass, paneClass }) {
  const [cur, setCur] = useState(0);
  const [shown, setShown] = useState(0);
  const [visible, setVisible] = useState(true);
  const pick = useCallback(
    (i) => {
      if (i === cur) return;
      setCur(i);
      setVisible(false);
      setTimeout(() => {
        setShown(i);
        requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      }, 150);
    },
    [cur],
  );
  const pn = Children.toArray(panes);
  return (
    <>
      <ul className={ulClass} role="tablist">
        {items.map((it, i) => (
          <li key={it.id} className={Array.isArray(liClass) ? liClass[i] : liClass}>
            <a
              href={`#${it.id}`}
              role="tab"
              aria-selected={cur === i}
              aria-controls={it.id}
              className={cx(linkClass, cur === i ? activeClass : idleClass)}
              onClick={(e) => {
                e.preventDefault();
                pick(i);
              }}
            >
              {it.tab}
            </a>
          </li>
        ))}
      </ul>
      <div className={contentClass}>
        {pn.map((p, i) => (
          <div
            key={items[i].id}
            id={items[i].id}
            role="tabpanel"
            className={cx(
              paneClass,
              shown === i ? 'block' : 'hidden',
              'transition-opacity duration-150 ease-linear',
              shown === i && visible ? 'opacity-100' : 'opacity-0',
            )}
          >
            {p}
          </div>
        ))}
      </div>
    </>
  );
}

/** a button-ish anchor that opens the brochure modal (`data-toggle="modal"`) */
export function BrochureTrigger({ className, children }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <a
        href="#"
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open && <Modal onClose={close} />}
    </>
  );
}

const MLABEL = 'mb-[calc(var(--r)*0.5)] inline-block text-[0.7em] font-medium';
const MINPUT =
  'block h-[1.5em] w-full border-0 border-b border-solid border-b-[#ccc] bg-transparent py-[calc(var(--r)*0.375)] pl-0 pr-[calc(var(--r)*0.75)] text-[0.7em] leading-[1.5] text-[#495057] shadow-none outline-none placeholder:text-[#666]';

/**
 * Bootstrap 4.4 `.modal.fade` + `.modal-sm` (300px from 576, .5rem margins below), sliding down
 * 50px while fading in over 0.3s, with a 50% black backdrop. Escape, the backdrop and × close it.
 * Its form posted to `submit.php` upstream — not ported: inert, submit disabled.
 */
function Modal({ onClose }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    const key = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener('keydown', key);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  const field = 'mb-[var(--r)]';
  return createPortal(
    <div className={cx(LP2022_POPPINS_VARS, "[--r:14px] [@media(min-width:768px)_and_(max-width:1024px)]:[--r:15px] [@media(min-width:1025px)_and_(max-width:1679px)]:[--r:21px] [@media(min-width:1680px)_and_(max-width:1919px)]:[--r:22px] [@media(min-width:1920px)]:[--r:25px]")}>
      <div className={cx('fixed inset-0 z-[1040] bg-black transition-opacity duration-150', shown ? 'opacity-50' : 'opacity-0')} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="film-modal-title"
        className="fixed inset-0 z-[1050] overflow-y-auto overflow-x-hidden font-[family-name:var(--font-lp2022-poppins),var(--font-lp2022-poppins-ext),sans-serif] text-[length:var(--r)] leading-[1.4] text-[#141414]"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className={cx(
            'relative m-[calc(var(--r)*0.5)] w-auto transition-[transform,opacity] duration-300 ease-out n576:mx-auto n576:my-[calc(var(--r)*1.75)] n576:max-w-[300px]',
            shown ? 'translate-y-0 opacity-100' : '-translate-y-[50px] opacity-0',
          )}
        >
          <div className="relative flex w-full flex-col rounded-[calc(var(--r)*0.3)] border border-solid border-[rgba(0,0,0,.2)] bg-white bg-clip-padding outline-none">
            <div className="flex items-start justify-between rounded-t-[calc(var(--r)*0.3-1px)] border-b border-solid border-b-[#dee2e6] bg-[#9500ff] p-[var(--r)] text-white">
              <h4 id="film-modal-title" className="m-0 text-[1em] font-medium leading-[1.5]">
                Download Brochure
              </h4>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="-m-[var(--r)] ml-auto cursor-pointer border-0 bg-transparent p-[var(--r)] text-[1em] font-bold leading-none text-white opacity-50 [text-shadow:0_1px_0_#fff] hover:opacity-75"
              >
                ×
              </button>
            </div>
            <div className="relative flex-auto p-[var(--r)]">
              <form id="enquire_form_modal" name="enquire_form_modal" onSubmit={(e) => e.preventDefault()}>
                <div className={field}>
                  <label htmlFor="enquirer_name" className={MLABEL}>
                    Name
                  </label>
                  <input type="text" id="enquirer_name" name="enquirer_name" placeholder="Type your name" className={MINPUT} />
                </div>
                <div className={field}>
                  <label htmlFor="enquirer_course" className={MLABEL}>
                    Course
                  </label>
                  <select
                    id="enquirer_course"
                    name="enquirer_course"
                    className="block h-[3em] w-full border-0 border-b border-solid border-b-[#ccc] bg-transparent pl-0 text-[0.7em] shadow-none outline-none"
                  >
                    <option value="BAHons">B.A Hons</option>
                    <option value="BVoc">B.Voc</option>
                  </select>
                </div>
                <div className={field}>
                  <label htmlFor="enquirer_email" className={MLABEL}>
                    Email Id
                  </label>
                  <input type="email" id="enquirer_email" name="enquirer_email" placeholder="Type your email id" className={MINPUT} />
                </div>
                <div className={field}>
                  <label htmlFor="enquirer_mobile" className={MLABEL}>
                    Mobile Number
                  </label>
                  <input type="text" id="enquirer_mobile" name="enquirer_mobile" placeholder="Type your mobile number" className={MINPUT} />
                </div>
                <div className={field}>
                  <label htmlFor="enquirer_city" className={MLABEL}>
                    City
                  </label>
                  <input id="enquirer_city" name="enquirer_city" maxLength={20} placeholder="Type your City" className={MINPUT} />
                </div>
                <button
                  type="submit"
                  disabled
                  className="mt-[15%] block w-full rounded-none border-2 border-solid border-[#9400ff] bg-[#9500ff] px-0 py-[0.4em] text-center text-[0.7em] font-bold text-white"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
