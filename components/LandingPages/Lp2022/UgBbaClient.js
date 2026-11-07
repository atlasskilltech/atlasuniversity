'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '@/lib/cx';
import { LP2022_ROBOTO_VARS } from '@/lib/landing/lp2022/fonts';

/**
 * Client pieces of /lp2022/ug/bba (see UgBba.js): the collapsing navbar (animated three-bar
 * toggler), the nav's jQuery `animate({scrollTop: top - 70})` (400ms swing), AOS 2 reveals, the
 * side tabs with their two Bootstrap 4 modals, and the captcha sums `captchaValidate.js` writes.
 */

const swing = (p) => 0.5 - Math.cos(p * Math.PI) / 2;
function animateTo(y, ms = 400) {
  const from = window.scrollY;
  const t0 = performance.now();
  const step = (t) => {
    const p = Math.min(1, (t - t0) / ms);
    window.scrollTo(0, from + (y - from) * swing(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** the header: logo, toggler (< 992) and the section links */
export function Navbar({ brands, links, linkClass, collapseClass }) {
  const [open, setOpen] = useState(false);
  const bar = 'mx-auto mb-[4px] block h-[3px] w-[25px] cursor-pointer bg-white transition-all duration-[400ms] ease-linear';
  return (
    <>
      {brands}
      <button
        type="button"
        aria-controls="navbarSupportedContent"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((o) => !o)}
        className="mb-[10px] mt-[20px] cursor-pointer rounded-none border-0 bg-transparent p-0 lg:hidden"
      >
        <span className={cx(bar, open && 'relative top-[7.5px] -rotate-45')} />
        <span className={cx(bar, open ? 'opacity-0' : 'opacity-100')} />
        <span className={cx(bar, open && 'relative bottom-[6px] rotate-45')} />
      </button>
      <div id="navbarSupportedContent" className={cx(collapseClass, open ? 'max-lg:block' : 'max-lg:hidden')}>
        <ul className="flex flex-col pl-0 lg:flex-row">
          {links.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={linkClass}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(id);
                  if (el) animateTo(el.getBoundingClientRect().top + window.scrollY - 70);
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const MOBILE_UA =
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
const EASING = { 'ease-in-back': 'cubic-bezier(.6,-.28,.735,.045)' };
const FROM = { 'fade-up': 'translate3d(0,100px,0)', 'fade-down': 'translate3d(0,-100px,0)', 'fade-right': 'translate3d(-100px,0,0)' };

/**
 * AOS 2 (`AOS.init({ disable: 'mobile' })`): an element starts hidden (aos.css) and fades in once
 * its top passes `offset` px above the bottom of the viewport, and hides again when scrolled back
 * above that point (`once: false`). Phones (AOS's own user-agent test) get it shown statically,
 * as AOS strips the attributes there. Renders `as` (default div) with `data-aos` so the hidden
 * state can be overridden for measuring.
 */
export function Aos({ as: Tag = 'div', anim, duration = 400, delay = 0, offset = 120, easing = 'ease', className, children, ...rest }) {
  const ref = useRef(null);
  const [state, setState] = useState('init'); // init (hidden) | on | off | static
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (MOBILE_UA.test(navigator.userAgent)) {
      const id = requestAnimationFrame(() => setState('static'));
      return () => cancelAnimationFrame(id);
    }
    const check = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      setState(window.scrollY + window.innerHeight - offset >= top ? 'on' : 'off');
    };
    const id = requestAnimationFrame(check);
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [offset]);
  const shown = state === 'on' || state === 'static';
  return (
    <Tag
      ref={ref}
      data-aos={anim}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : FROM[anim],
        transitionProperty: state === 'static' ? 'none' : 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: EASING[easing] || easing,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** `captchaValidate.js`: writes "a + b" (two random digits) into the label on load */
export function CaptchaText({ className }) {
  const [text, setText] = useState('');
  useEffect(() => {
    const id = requestAnimationFrame(() => setText(`${Math.floor(Math.random() * 10)} + ${Math.floor(Math.random() * 10)}`));
    return () => cancelAnimationFrame(id);
  }, []);
  return <label className={className}>{text}</label>;
}

/**
 * Bootstrap 4 `.modal.fade` + `.modal-dialog-centered` (500px from 576, .5rem margins below; slides
 * 50px down while fading in over 0.3s; 50% backdrop). Escape, the backdrop and × close it.
 */
function Modal({ title, onClose, children }) {
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
  return createPortal(
    <div className={cx(LP2022_ROBOTO_VARS, 'font-[family-name:var(--font-lp2022-roboto),var(--font-lp2022-roboto-ext),sans-serif] text-[16px] leading-[1.5] text-[#707070]')}>
      <div className={cx('fixed inset-0 z-[999998] bg-black transition-opacity duration-150', shown ? 'opacity-50' : 'opacity-0')} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="fixed inset-0 z-[999999] overflow-y-auto overflow-x-hidden"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className={cx(
            'relative m-[.5rem] flex min-h-[calc(100%-1rem)] w-auto items-center transition-[transform,opacity] duration-300 ease-out n576:mx-auto n576:my-[1.75rem] n576:min-h-[calc(100%-3.5rem)] n576:max-w-[500px]',
            shown ? 'translate-y-0 opacity-100' : '-translate-y-[50px] opacity-0',
          )}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="relative flex w-full flex-col rounded-[.3rem] border border-solid border-[rgba(0,0,0,.2)] bg-white bg-clip-padding outline-none">
            <div className="flex items-start justify-between rounded-t-[calc(.3rem-1px)] border-b border-solid border-b-[#dee2e6] p-[1rem]">
              <h4 className="mb-0 text-[24px] font-bold leading-[1.5] text-[#212322]">{title}</h4>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="m-0 cursor-pointer border-0 bg-transparent p-0 text-[1.5rem] font-bold leading-none text-black opacity-50 [text-shadow:0_1px_0_#fff] hover:opacity-75"
              >
                ×
              </button>
            </div>
            <div className="relative flex-auto px-[1rem] pb-[1rem] pt-0">{children}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * The fixed side tabs. `tabs`: [{ key, wrapClass, tabClass, label, modal? , href? }] — a tab with
 * `modal` opens that modal (`{ title, body }`), one with `href` is a plain link.
 */
export function SideTabs({ tabs }) {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const cur = tabs.find((t) => t.key === open);
  return (
    <>
      {tabs.map((t) => (
        <div key={t.key} className={t.wrapClass}>
          {t.href ? (
            <div className={t.tabClass}>
              <a href={t.href} className="m-0 p-0 text-white hover:text-[#b2ff00] hover:underline">
                {t.label}
              </a>
            </div>
          ) : t.anchor ? (
            <div className={t.tabClass}>
              <a
                href="#"
                className="text-white no-underline hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(t.key);
                }}
              >
                {t.label}
              </a>
            </div>
          ) : (
            <div role="button" tabIndex={0} className={t.tabClass} onClick={() => setOpen(t.key)} onKeyDown={(e) => e.key === 'Enter' && setOpen(t.key)}>
              {t.label}
            </div>
          )}
        </div>
      ))}
      {cur && (
        <Modal title={cur.modal.title} onClose={close}>
          {cur.modal.body}
        </Modal>
      )}
    </>
  );
}

