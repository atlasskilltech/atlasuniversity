'use client';
/* eslint-disable @next/next/no-img-element -- plain <img> as the reference renders it (project convention) */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '@/lib/cx';
import OwlCarousel from '../shared/OwlCarousel';

/* Font Awesome `fa-angle-left/right` under the page's `transform: scale(3,4)` — a 15x56 chevron
   (8x28 below 768), drawn as an inline SVG */
function Angle({ dir }) {
  return (
    <svg
      viewBox="0 0 10 28"
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 h-[56px] w-[15px] -translate-x-1/2 -translate-y-1/2 max-md:h-[28px] max-md:w-[8px]"
      fill="none"
      stroke="#000"
      strokeWidth="1.6"
    >
      <path d={dir === 'prev' ? 'M8 2 2 14l6 12' : 'M2 2l6 12-6 12'} />
    </svg>
  );
}

/* `.owl-prev / .owl-next` here: 30px boxes, vertically centred, flush left / right (+ Owl's 5px margin) */
const NAV = 'absolute top-1/2 m-[5px] block h-[30px] w-[30px] -translate-y-1/2 rounded-[50px] border-0 bg-transparent px-[7px] py-[4px]';

function Tools({ tools }) {
  return (
    <>
      <div className="my-[50px] max-md:hidden">
        <OwlCarousel
          label="Tools you'll master"
          pvClass="[--pv:5]"
          margin={20}
          prev={{ className: cx(NAV, 'left-0'), content: <Angle dir="prev" /> }}
          next={{ className: cx(NAV, 'right-0'), content: <Angle dir="next" /> }}
        >
          {tools.map((t) => (
            <img key={t} src={t} alt="Owl Image" className="block w-full" />
          ))}
        </OwlCarousel>
      </div>
      <div className="md:hidden">
        <OwlCarousel
          label="Tools you'll master"
          pvClass="[--pv:1]"
          margin={20}
          prev={{ className: cx(NAV, 'left-0'), content: <Angle dir="prev" /> }}
          next={{ className: cx(NAV, 'right-0'), content: <Angle dir="next" /> }}
        >
          {tools.map((t) => (
            <img key={t} src={t} alt="Owl Image" className="relative mx-auto block w-full max-w-fit" />
          ))}
        </OwlCarousel>
      </div>
    </>
  );
}

const DECK = 'mx-auto my-[50px] text-center n576:flex n576:flex-wrap';
const DECK_CARD = 'relative flex min-w-0 flex-col break-words bg-white max-lp:mb-[15px] n576:mx-[15px] n576:mb-0 n576:flex-[1_0_0%]';

function Pane({ tab, first }) {
  const H2 = first ? 'h2' : 'h3';
  const headSize = first ? 'text-[32px]' : 'text-[28px]';
  return (
    <div className="px-0 max-md:pt-[15px]">
      <div className="mb-[50px] mt-[30px] flex items-center justify-center max-md:m-0 max-md:block">
        <div className="relative w-full max-w-full flex-[1_0_0%] pl-0 pr-[15px] md:max-w-[58.333333%] md:flex-[0_0_58.333333%]">
          <p className="relative mb-[16px] w-full pl-0 pr-[15px] text-[22px] leading-[1.3] text-[#1B1E1B] md:max-w-[83.333333%] md:flex-[0_0_83.333333%]">
            {tab.text}
          </p>
        </div>
        <div className="relative w-full px-0 md:max-w-[41.666667%] md:flex-[0_0_41.666667%]">
          <img src={tab.image} alt="" className="block w-full max-md:relative" />
        </div>
      </div>
      <H2 className={cx('mb-[8px] mt-[40px] text-center font-bold leading-[1.2] text-black', headSize)}>{tab.heading2}</H2>
      {tab.tools.length > 0 && <Tools tools={tab.tools} />}
      {tab.projects.length > 0 && (
        <div className={DECK}>
          {tab.projects.map((p) => (
            <div key={p.text} className={DECK_CARD}>
              <img src={p.icon} alt="Card image cap" className="mx-auto h-[100px] w-fit max-md:relative" />
              <div className="relative mx-auto w-full max-w-[58.333333%] flex-none p-[20px]">
                <h6 className="mb-[8px] text-[16px] font-medium leading-[1.2] text-black">{p.text}</h6>
              </div>
            </div>
          ))}
        </div>
      )}
      <H2 className={cx('mb-[8px] text-center font-bold leading-[1.2] text-black max-md:mt-[30px]', headSize)}>CAREER PATHWAYS</H2>
      <div className={DECK}>
        {tab.careers.map((c) => (
          <div key={c.join(' ')} className={DECK_CARD}>
            <div className="flex-auto bg-[#9500FF] px-[12px] py-[20px] text-[17px] text-white md:max-lg:px-[5px] md:max-lg:text-[15px]">
              <p className="mb-0 font-bold">
                {c.map((l, i) => (
                  <span key={l}>
                    {i > 0 && <br className="max-md:hidden" />}
                    {i > 0 && ' '}
                    {l}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * `.section6` — Bootstrap 4 `.nav-tabs.nav-fill` over a `.tab-content` with fading panes. The links
 * are `text-left`, 18px top/bottom padding, no side padding; the current one is purple with a 5px
 * purple rule under its label (hover gives any link the same). Below 768 the links wrap and drop to
 * 16px on a white strip.
 */
export function DmaTabs({ tabs }) {
  const [cur, setCur] = useState(0);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setShown(cur), 20);
    return () => clearTimeout(id);
  }, [cur]);
  return (
    <div className="w-full max-md:min-w-full">
      <nav>
        <div
          role="tablist"
          className="flex flex-wrap rounded-none border-0 bg-[#272e38] pl-0 text-white max-md:border-b max-md:border-solid max-md:border-b-[#dee2e6] max-md:bg-white max-md:px-[15px]"
        >
          {tabs.map((t, i) => {
            const active = i === cur;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`${t.id}-tab`}
                aria-controls={t.id}
                aria-selected={active}
                onClick={() => setCur(i)}
                className={cx(
                  'group -mb-px block flex-[1_1_auto] rounded-none border-0 bg-white px-0 py-[18px] text-left text-[20px] font-bold leading-[1.5] transition-[background] duration-200 ease-linear hover:text-[#9500FF] max-md:text-[16px]',
                  active ? 'text-[#9500FF]' : 'text-[#1B1E1B]',
                )}
              >
                <span
                  className={cx(
                    'group-hover:border-b-[5px] group-hover:border-solid group-hover:border-b-[#9500FF] group-hover:pb-[16px]',
                    active && 'border-b-[5px] border-solid border-b-[#9500FF] pb-[16px]',
                  )}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
      <div className="border-t-2 border-solid border-t-[#9500FF] bg-white px-[16px] py-[16px] leading-[25px] n576:px-0">
        {tabs.map((t, i) => (
          <div
            key={t.id}
            id={t.id}
            role="tabpanel"
            aria-labelledby={`${t.id}-tab`}
            className={cx(i === cur ? 'block' : 'hidden', 'transition-opacity duration-150 ease-linear', shown === i ? 'opacity-100' : 'opacity-0')}
          >
            <Pane tab={t} first={i === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * `#myBtn` "Enquire Now" (jumps to the form) and `#myBtn-dw` "Download Brochure" (opens
 * `#Mysmallmodal`), both hidden until 500px of scroll; rotated tabs on the right edge from 768, a
 * half-width bar each at the bottom below. The brochure modal's form posted to `submit.php` upstream
 * and is rendered inert (no action, submit disabled); there is no brochure file on this page.
 */
export function DmaFloatingButtons() {
  const [shown, setShown] = useState(false);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const on = () => setShown(window.scrollY > 500);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    if (!modal) return undefined;
    const onKey = (e) => e.key === 'Escape' && setModal(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modal]);
  const btn = 'fixed z-[99] h-[41px] -rotate-90 cursor-pointer border-none p-[7px] text-[14px] font-bold outline-none max-md:bottom-0 max-md:w-1/2 max-md:rotate-0 max-md:p-[10px]';
  return (
    <>
      <button
        type="button"
        onClick={() => setModal(true)}
        className={cx(btn, shown ? 'block' : 'hidden', 'bottom-[355px] right-[-64px] w-[170px] bg-[#9500FF] text-white hover:bg-[#FFF501] hover:text-black max-md:left-0 max-md:right-auto')}
      >
        Download Brochure
      </button>
      <button
        type="button"
        onClick={() => document.getElementById('enquire-form')?.scrollIntoView()}
        className={cx(btn, shown ? 'block' : 'hidden', 'bottom-[174px] right-[-65px] w-[171px] bg-[#FFF501] text-black hover:bg-[#9500FF] hover:text-white max-md:right-0')}
      >
        Enquire Now
      </button>
      {modal &&
        createPortal(
          <div className="fixed inset-0 z-[2000] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="dma-modal-title">
            <button type="button" aria-label="Close" className="fixed inset-0 bg-black/50" onClick={() => setModal(false)} />
            <div className="relative mx-auto my-[28px] w-auto max-w-[300px] max-lp:mx-[8px] font-[family-name:var(--font-lp2x-roboto),var(--font-lp2x-roboto-ext),sans-serif]">
              <div className="relative flex w-full flex-col rounded-[4.8px] border-0 bg-white">
                <div className="flex items-start justify-between rounded-t-[4px] border-b border-solid border-b-[#dee2e6] bg-[#9500ff] p-[16px] text-white">
                  <h4 id="dma-modal-title" className="mb-0 text-[24px] font-medium leading-[1.5]">
                    Download Brochure
                  </h4>
                  <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="-m-[16px] ml-auto p-[16px] text-[24px] font-bold leading-none text-black opacity-50 hover:opacity-75"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
                <div className="relative flex-auto p-[16px]">
                  <form className="rounded-[15px] bg-white">
                    {[
                      ['name', 'Name', 'text', 'Type your name'],
                      ['email', 'Email Id', 'email', 'Type your email id'],
                      ['phone', 'Mobile Number', 'text', 'Type your mobile number'],
                    ].map(([n, l, t, p]) => (
                      <div key={n} className="mb-[16px] h-[60px]">
                        <label htmlFor={`modal-${n}`} className="mb-0 inline-block text-[14px] font-bold text-[#1B1E1B]">
                          {l}
                        </label>
                        <input
                          id={`modal-${n}`}
                          name={n}
                          type={t}
                          placeholder={p}
                          className="block h-[35px] w-full border-0 border-b border-solid border-b-[#ccc] bg-transparent py-[6px] pl-0 pr-[12px] text-[14px] text-[#495057] placeholder:text-[#6c757d] focus:outline-none"
                        />
                      </div>
                    ))}
                    <button
                      type="submit"
                      disabled
                      className="mt-[15%] block w-full rounded-none border border-solid border-transparent bg-[#9500FF] px-[12px] py-[6px] text-center text-[14px] font-bold text-white"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
