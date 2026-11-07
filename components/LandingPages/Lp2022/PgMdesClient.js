'use client';

import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '@/lib/cx';

/**
 * The client pieces of /lp2022/pg/mdes (see PgMdes.js): the reference's `topFunction()` jump, the
 * Bootstrap 3 `#Mysmallmodal` "Download Brochure" modal, the scroll-toggled side buttons and the
 * slick 1.8 testimonial slider.
 */

/**
 * `topFunction()`: `enquire-form.scrollIntoView()` then `enquire-form2.scrollIntoView()`. Only one
 * of the two forms is displayed at any width (the other is `display: none`, where scrollIntoView
 * does nothing), so the visible one wins.
 */
export function FormJumpButton({ className, children, ...rest }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const two = document.getElementById('enquire-form2');
        const one = document.getElementById('enquire-form');
        (two && two.offsetParent ? two : one)?.scrollIntoView();
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

/** `#myBtn` / `#myBtn-dw`: `display: none` until the window has scrolled more than 500px */
export function useScrolledPast(after = 500) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const on = () => setShown(window.scrollY > after);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [after]);
  return shown;
}

const FIELD = 'mb-[15px] h-[60px]';
const LABEL = 'mb-[5px] inline-block max-w-full text-[14px] font-bold leading-[20px] text-[#333]';
const INPUT =
  'block h-[34px] w-full rounded-[4px] border-0 border-b border-solid border-b-[#ccc] bg-transparent py-[6px] pl-0 pr-[12px] text-[14px] leading-[20px] text-[#555] shadow-none outline-none placeholder:text-[#999]';

/**
 * Bootstrap 3.4 `.modal.fade` + `.modal-sm`: 300px wide from 768 (10px margins below), a 0.3s
 * slide-down/fade, a 50% black backdrop. Escape, the backdrop and the × close it; the page behind
 * stops scrolling while it is open (`.modal-open`). Its form posted to `submit.php` upstream — not
 * ported: inert, submit disabled.
 */
export function BrochureModal({ open, onClose }) {
  return open ? <ModalBody onClose={onClose} /> : null;
}

function ModalBody({ onClose }) {
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
    <>
      <div className={cx('fixed inset-0 z-[1040] bg-black transition-opacity duration-150', shown ? 'opacity-50' : 'opacity-0')} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mdes-modal-title"
        className="fixed inset-0 z-[1050] overflow-y-auto overflow-x-hidden font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[14px] leading-[20px] text-[#333]"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className={cx(
            'relative m-[10px] w-auto transition-[transform,opacity] duration-300 ease-out md:mx-auto md:my-[30px] md:w-[300px]',
            shown ? 'translate-y-0 opacity-100' : '-translate-y-1/4 opacity-0',
          )}
        >
          <div className="relative flex flex-col rounded-[6px] border border-solid border-[rgba(0,0,0,.2)] bg-white bg-clip-padding shadow-[0_5px_15px_rgba(0,0,0,.5)] outline-none">
            <div className="flex items-start justify-between rounded-t-[2px] border-b border-solid border-b-[#e5e5e5] bg-[#e12a7b] p-[15px] text-white">
              <h4 id="mdes-modal-title" className="m-0 text-[18px] font-medium leading-[1.42857143]">
                Download Brochure
              </h4>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="-mb-[10px] -mr-[10px] -mt-[8px] ml-auto cursor-pointer border-0 bg-transparent p-[10px] text-[21px] font-bold leading-none text-white opacity-20 [text-shadow:0_1px_0_#fff] hover:opacity-50"
              >
                ×
              </button>
            </div>
            <div className="relative p-[15px]">
              <form id="enquire-form-modal" className="bg-white" onSubmit={(e) => e.preventDefault()}>
                <div className={FIELD}>
                  <label htmlFor="modal-name" className={LABEL}>
                    Name
                  </label>
                  <input type="text" id="modal-name" name="name" placeholder="Type your name" required className={INPUT} />
                </div>
                <div className={FIELD}>
                  <label htmlFor="modal-email" className={LABEL}>
                    Email Id
                  </label>
                  <input type="email" id="modal-email" name="email" placeholder="Type your email id" required className={INPUT} />
                </div>
                <div className={FIELD}>
                  <label htmlFor="modal-phone" className={LABEL}>
                    Mobile Number
                  </label>
                  <input type="text" id="modal-phone" name="phone" placeholder="Type your mobile number" required className={INPUT} />
                </div>
                <button
                  type="submit"
                  disabled
                  className="mt-[14%] block w-full rounded-none border border-solid border-transparent bg-[#e12a7b] px-[12px] py-[6px] text-center text-[14px] leading-[20px] text-white hover:bg-[#1b1e1b] max-md:mt-[18%]"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}

/**
 * The four fixed side buttons. ≥ 768: `#myBtn-dw` / `#myBtn` rotated -90° on the right edge, shown
 * after 500px of scroll. < 768: `#myBtn-dw-m` / `#myBtn-m`, always shown, a two-up bar on the
 * bottom edge. "Download Brochure" opens the modal, "Enquire Now" jumps to the form.
 */
export function SideButtons() {
  const [open, setOpen] = useState(false);
  const shown = useScrolledPast(500);
  const close = useCallback(() => setOpen(false), []);
  const base =
    "fixed z-[99] cursor-pointer border-0 font-[family-name:var(--font-lp2x-roboto),var(--font-lp2x-roboto-ext),sans-serif] text-[14px] font-bold leading-[20px] text-white outline-none";
  const desk = 'h-[41px] -rotate-90 p-[7px] max-md:hidden';
  const mob = 'bottom-0 w-1/2 p-[10px] md:hidden';
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cx(base, desk, shown ? 'block' : 'hidden', 'bottom-[355px] right-[-64px] w-[170px] bg-[#342b7c] hover:bg-[#e12a7b]')}
      >
        Download Brochure
      </button>
      <FormJumpButton className={cx(base, desk, shown ? 'block' : 'hidden', 'bottom-[174px] right-[-65px] w-[171px] bg-[#e12a7b] hover:bg-[#342b7c]')}>
        Enquire Now
      </FormJumpButton>
      <button type="button" onClick={() => setOpen(true)} className={cx(base, mob, 'left-0 bg-[#342b7c]')}>
        Download Brochure
      </button>
      <FormJumpButton className={cx(base, mob, 'right-0 bg-[#e12a7b]')}>Enquire Now</FormJumpButton>
      <BrochureModal open={open} onClose={close} />
    </>
  );
}

/**
 * slick 1.8 as `.single-item` configures it: `infinite`, `slidesToShow` / `slidesToScroll` 2 (1 at
 * ≤ 480 — slick's `breakpoint: 480`), `dots`, `arrows` (slick-theme's arrows: 20px buttons whose
 * glyph is white on white here, so they are invisible but clickable), 500ms `ease`, swipe. The
 * per-width count lives in `--pv` so the server render is already correct; the track is moved by
 * whole slides. `slidesToShow` slides are cloned at each end; paging past either end lands on the
 * clone and snaps back, and the dot count is `ceil(n / slidesToScroll)` as slick's.
 */
export function SlickSlider({ children, className, listClassName, dotsClassName, label }) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const CL = 2;
  const [pv, setPv] = useState(2);
  const [pos, setPos] = useState(CL);
  const [anim, setAnim] = useState(true);
  const busy = useRef(false);
  const drag = useRef(null);
  const posRef = useRef(CL);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)');
    const on = () => {
      setPv(mq.matches ? 1 : 2);
      posRef.current = CL;
      setAnim(false);
      setPos(CL);
    };
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    if (anim) return undefined;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    return () => cancelAnimationFrame(id);
  }, [anim]);

  const settle = useCallback(() => {
    busy.current = false;
    const p = posRef.current;
    let q = p;
    if (p >= CL + n) q = p - n;
    else if (p < CL) q = CL + (Math.ceil(n / pv) - 1) * pv;
    if (q !== p) {
      posRef.current = q;
      setAnim(false);
      setPos(q);
    }
  }, [n, pv]);

  const goTo = useCallback(
    (target) => {
      if (busy.current || target === posRef.current) return;
      busy.current = true;
      posRef.current = target;
      setAnim(true);
      setPos(target);
      setTimeout(() => {
        if (busy.current) settle();
      }, 580);
    },
    [settle],
  );

  const index = pos - CL;
  const page = Math.min(Math.ceil(n / pv) - 1, Math.max(0, Math.floor((((index % n) + n) % n) / pv)));
  const next = () => goTo(index + pv >= n ? CL + n : pos + pv);
  const prev = () => goTo(index === 0 ? CL - pv : pos - pv);

  const render = (s, key, clone) => (
    <div key={key} aria-hidden={clone || undefined} className="min-w-0 shrink-0 grow-0 basis-[calc(100%/var(--pv))]">
      {s}
    </div>
  );
  const before = [];
  const after = [];
  for (let i = 0; i < CL; i += 1) {
    before.push(render(slides[(n - CL + i) % n], `b${i}`, true));
    after.push(render(slides[i % n], `a${i}`, true));
  }
  const arrow =
    'absolute top-1/2 block h-[20px] w-[20px] -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 text-[0px] leading-[0] text-transparent outline-none';
  return (
    <div
      className={cx('relative [--pv:2] [@media(max-width:480px)]:[--pv:1]', className)}
      aria-roledescription="carousel"
      aria-label={label}
    >
      <button type="button" aria-label="Previous" onClick={prev} className={cx(arrow, '-left-[25px]')}>
        Previous
      </button>
      <div
        className={cx('relative overflow-hidden', listClassName)}
        onPointerDown={(e) => {
          drag.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (drag.current == null) return;
          const dx = e.clientX - drag.current;
          drag.current = null;
          if (Math.abs(dx) > 10) (dx < 0 ? next : prev)();
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div
          className="flex w-full items-start"
          style={{
            transform: `translate3d(calc(-100% * ${pos} / var(--pv)), 0, 0)`,
            transition: anim ? 'transform 500ms ease' : 'none',
          }}
          onTransitionEnd={(e) => {
            if (e.target === e.currentTarget) settle();
          }}
        >
          {before}
          {slides.map((s, i) => render(s, `s${i}`, false))}
          {after}
        </div>
      </div>
      <button type="button" aria-label="Next" onClick={next} className={cx(arrow, '-right-[25px]')}>
        Next
      </button>
      <ul className={cx('absolute m-0 block w-full list-none p-0 text-center', dotsClassName)}>
        {Array.from({ length: Math.ceil(n / pv) }, (_, i) => (
          <li key={i} className="relative mx-[5px] my-0 inline-block h-[20px] w-[20px] cursor-pointer p-0">
            <button
              type="button"
              aria-label={`Slide ${i + 1}`}
              aria-current={page === i || undefined}
              onClick={() => goTo(CL + i * pv)}
              className="block h-[20px] w-[20px] cursor-pointer border-0 bg-transparent p-[5px] text-[0px] leading-[0] text-transparent outline-none"
            >
              <span
                className={cx(
                  'absolute left-0 top-0 mt-[20px] block h-[10px] w-[10px] rounded-[20px] border border-solid border-[#e12a7b]',
                  page === i ? 'bg-transparent' : 'bg-[#e12a7b]',
                )}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
