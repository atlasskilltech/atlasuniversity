'use client';

/* .meeta-event-schedule: the "Week-long Program" banner (510px, 313 at <=600) beside the day
   tabs. main.js toggles `.active` on the clicked <li data-tab-target> and its pane; the day name
   inside each tab is also an <a href="#section2">, so clicking it additionally jumps the page to
   the empty #section2 marker after the tab list - kept, as authored.

   Deviation: `.meeta-event-accordion-toggle::before` draws a dark "+" absolutely positioned
   against the whole SECTION (its nearest positioned ancestor) - a stray glyph near the section's
   top-right corner, #1a0a1e on #311a79 - and no accordion body exists to toggle. Not drawn. */
import { useState } from 'react';
import { BSD, BTN_SOLID, colClass, COL_BASE, CONTAINER, Glyph, OPEN, Rich, ROW, SECTION_PAD } from './ui';

export default function Schedule({ data, year, assets }) {
  const [tab, setTab] = useState(0);
  const timeW = year === 2023 ? 'w-[165px]' : 'w-[205px]';
  return (
    <div
      className={`relative z-[1] bg-[#311a79] ${SECTION_PAD[year]} before:absolute before:left-0 before:top-0 before:-z-[1] before:h-full before:w-full before:bg-[image:var(--aar-s6)] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-60 before:content-['']`}
      style={{ '--aar-s6': `url(${assets.shape6})` }}
    >
      <div className={CONTAINER}>
        <div className={`${ROW.gy5} justify-between`}>
          <div className={`${COL_BASE.gy5} ${colClass(data.cols[0])}`}>
            <div
              className="relative z-[1] h-[510px] bg-cover bg-center bg-no-repeat px-10 py-[70px] before:absolute before:left-0 before:top-0 before:-z-[1] before:h-full before:w-full before:bg-[#1a0a1e] before:opacity-60 before:content-[''] [@media(max-width:600px)]:h-[313px]"
              style={{ backgroundImage: `url(${data.bg})` }}
            >
              <div className="mb-[55px]">
                <h4 className={`${BSD} mb-[5px] text-[18px] font-bold leading-[1.5] text-[#fc097c]`}>{data.sub}</h4>
                <h2 className={`${BSD} text-[60px] font-bold leading-[1.1] text-white max-md:text-[40px] max-lp:text-[28px]`}>{data.title}</h2>
              </div>
              <a
                href={data.btn.href}
                target="_blank"
                rel="noopener"
                className={`${BSD} ${BTN_SOLID} bg-[#fc097c] px-[35px] text-[20px] text-white hover:text-white`}
              >
                {data.btn.label} <Glyph name="download" />
              </a>
            </div>
          </div>
          <div className={`${COL_BASE.gy5} ${colClass(data.cols[1])}`}>
            <div className="flex gap-[30px] max-lp:flex-col">
              <ul className="shrink-0 max-lp:flex max-lp:flex-wrap max-lp:justify-center max-lp:gap-[10px]">
                {data.days.map((d, i) => (
                  <li key={i} className={i ? 'mt-[10px] max-lp:mt-0' : ''} onClick={() => setTab(i)}>
                    <div
                      className={`${timeW} cursor-pointer rounded-[8px] border border-dashed py-5 text-center transition-all duration-500 ease-[cubic-bezier(.645,.045,.355,1)] max-md:w-[120px] max-md:py-[10px] ${
                        tab === i ? 'border-[#fc097c] bg-[#fc097c]' : 'border-white'
                      }`}
                    >
                      <h4 className={`${BSD} mb-[3px] text-[30px] font-bold leading-[1.5] text-white max-md:text-[24px]`}>
                        <a href="#section2" className="text-white hover:text-white">
                          {d.day}
                        </a>
                      </h4>
                      <p className="text-white">{d.date}</p>
                    </div>
                  </li>
                ))}
                <li className="mt-[10px] max-lp:mt-0">
                  <div id="section2" />
                </li>
              </ul>
              <div className="grow">
                {data.panes.map((pane, pi) => (
                  <div key={pi} className={tab === pi ? 'block' : 'hidden'}>
                    <ul>
                      {pane.map((it, ii) => (
                        <li key={ii} className={`rounded-[8px] bg-white px-[30px] pb-[25px] pt-5 ${ii ? 'mt-[10px]' : ''}`}>
                          <h3 className="cursor-pointer leading-[1.5]">
                            <span className={`${OPEN} block text-[14px] font-normal text-[#666]`}>{it.time}</span>
                            <span className={`${BSD} block text-[22px] font-bold text-[#1a0a1e]`}>
                              <Rich nodes={it.title} />
                            </span>
                          </h3>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
