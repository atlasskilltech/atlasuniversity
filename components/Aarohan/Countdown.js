'use client';

/* The template's countdown (main.js `i(date, $el, 'short')`, re-run on a 0ms interval), ported
   verbatim. Every Aarohan date is in the past, so - exactly as on production - the day count is
   negative and the "zero-pad" step prints e.g. "0-461" (which wraps inside the fixed 110px box,
   the second line white on white), while hours/minutes/seconds keep ticking from the fractional
   remainder. Reproduced as authored rather than clamped: it is what the live page shows. */
import { useEffect, useState } from 'react';

function calc(date) {
  const n = new Date();
  const a = new Date(date);
  const l = (a.getTime() - n.getTime()) / 864e5;
  let r = Math.floor(l);
  const c = 24 * (l - r);
  let d = Math.floor(c);
  const p = 60 * (c - d);
  let m = Math.floor(60 * (c - d));
  let u = Math.floor(60 * (p - m));
  const day = r > 1 ? 'Days' : 'day';
  const hr = d > 1 ? 'Hours' : 'Hr';
  const mn = m > 1 ? 'Mints' : 'min';
  const sc = u > 1 ? 'Secs' : 'sec';
  r = r < 10 ? `0${r}` : r;
  d = d < 10 ? `0${d}` : d;
  m = m < 10 ? `0${m}` : m;
  u = u < 10 ? `0${u}` : u;
  return [[r, day], [d, hr], [m, mn], [u, sc]];
}

const BG = ['bg-[#f9d464]', 'bg-[#00acee]', 'bg-[#fc097c]', 'bg-[#554bb9]'];
const COLON = ['before:text-[#f9d464]', 'before:text-[#00acee]', 'before:text-[#fc097c]', 'before:hidden'];

export default function Countdown({ date }) {
  const [v, setV] = useState(null);
  useEffect(() => {
    const tick = () => setV(calc(date));
    const t0 = setTimeout(tick, 0);
    const t = setInterval(tick, 250);
    return () => {
      clearTimeout(t0);
      clearInterval(t);
    };
  }, [date]);
  const cells = v || [['', ''], ['', ''], ['', ''], ['', '']];
  return (
    <div className="flex flex-nowrap justify-between">
      {cells.map(([count, label], i) => (
        <div
          key={i}
          className={`relative text-center before:absolute before:right-[-34.5%] before:top-[14px] before:font-[AaBSD,cursive] before:text-[58px] before:font-bold before:leading-none before:content-[':'] max-md:before:text-[40px] max-lp:before:right-[-24%] max-lp:before:top-[10px] max-lp:before:text-[24px] ${COLON[i]}`}
        >
          <span
            className={`block h-[110px] w-[110px] text-center font-[AaBSD,cursive] text-[58px] font-bold leading-[110px] text-white max-md:h-[80px] max-md:w-[80px] max-md:text-[40px] max-md:leading-[80px] max-lp:h-[50px] max-lp:w-[50px] max-lp:text-[24px] max-lp:leading-[50px] ${BG[i]}`}
          >
            {count}
          </span>
          <span className="mt-[10px] block text-[#9a9a9a]">{label}</span>
        </div>
      ))}
    </div>
  );
}
