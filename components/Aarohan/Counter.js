'use client';

/* .meeta-counter-section: counter-bg under an 80% black wash, four decorative shapes (shape-4
   swings with round-01), and three figures that count up with jquery.counterup
   ({ delay: 10, time: 1500 } = 150 integer steps) once they scroll into view. The figure is
   followed by a Font Awesome "plus" (inline: #fff, 2rem). */
import { useEffect, useRef, useState } from 'react';
import Float from './Float';
import { ARCHIVO, CONTAINER, Glyph, ROW, SECTION_PAD } from './ui';

const NUM = ['text-[#f9d464]', 'text-[#00acee]', 'text-[#fc097c]'];

function Count({ n }) {
  const ref = useRef(null);
  const [v, setV] = useState(n);
  useEffect(() => {
    const el = ref.current;
    let timer;
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      let i = 0;
      setV(0);
      timer = setInterval(() => {
        i += 1;
        setV(Math.floor((n / 150) * i));
        if (i >= 150) {
          setV(n);
          clearInterval(timer);
        }
      }, 10);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [n]);
  return <span ref={ref}>{v}</span>;
}

export default function Counter({ data, year }) {
  const [s1, s2, s3, s4] = data.shapes;
  return (
    <div
      className={`relative z-[1] overflow-hidden bg-cover bg-center bg-no-repeat ${SECTION_PAD[year]} before:absolute before:left-0 before:top-0 before:-z-[1] before:h-full before:w-full before:bg-black/80 before:content-['']`}
      style={{ backgroundImage: `url(${data.bg})` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="absolute left-0 top-[-25px] -z-[1]"><img src={s1} alt="Shape" /></div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="absolute left-[-75px] top-[135px] -z-[1]"><img src={s2} alt="Shape" /></div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="absolute right-[220px] top-[90px] z-0 [@media(max-width:1199px)]:right-[70px] [@media(max-width:1199px)]:top-[75px]"><img src={s3} alt="Shape" /></div>
      <Float kind="round" className="absolute right-20 top-[90px] -z-[1] [@media(max-width:1199px)]:right-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s4} alt="Shape" />
      </Float>
      <div className={CONTAINER}>
        <div className="-mt-10">
          <div className={ROW.default}>
            {data.items.map((it, i) => (
              <div key={i} className="w-full max-w-full shrink-0 px-3 n576:w-1/2 n576:flex-[0_0_auto] lg:w-1/3">
                <div
                  className={`relative mt-[30px] text-center before:absolute before:right-0 before:top-1/2 before:h-[410px] before:w-px before:-translate-y-1/2 before:bg-[#383838] before:content-[''] max-lg:before:hidden ${
                    i === 0 ? "after:absolute after:left-0 after:top-1/2 after:h-[410px] after:w-px after:-translate-y-1/2 after:bg-[#383838] after:content-[''] max-lg:after:hidden" : ''
                  }`}
                >
                  <div>
                    <span className={`${ARCHIVO} text-[60px] font-bold leading-[70px] max-md:text-[45px] max-md:leading-[58px] ${NUM[i]}`}>
                      <Count n={it.n} />
                    </span>
                    <Glyph name="plus" className="text-[2rem] leading-none text-white" />
                    <p className="text-[16px] leading-[30px] text-white">{it.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
