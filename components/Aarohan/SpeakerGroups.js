/* .meeta-speakers-4 (inline padding 60px 0 0, or 60px 0 40px on 2023's "Workshop" group): the
   section title, then a full-bleed .row.g-0 of .single-speaker-4 cards - square photo that zooms
   1.1 on hover, then 20px of copy. The speaker name is Archivo 24px in 2023 and 18px uppercase
   from 2024 (each year's sheet). 2023's cards set the designation's size inline (1.1rem, padding
   8px, some also line-height 1.4); transcribed per card as `roleStyle`. */
import { A, ARCHIVO, BSD, colClass, COL_BASE, LINK, Rich, ROW } from './ui';

export function SectionTitle({ sub, title, className = '' }) {
  return (
    <div className={`mb-[55px] ${className}`}>
      {sub && <h4 className={`${BSD} mb-[5px] text-[18px] font-bold leading-[1.5] text-[#fc097c]`}>{sub}</h4>}
      {title && (
        <h2 className={`${BSD} text-[60px] font-bold leading-[1.1] text-[#1a0a1e] max-md:text-[40px] max-lp:text-[28px]`}>{title}</h2>
      )}
    </div>
  );
}

const ROLE = {
  big: 'pt-2 text-[1.1rem] leading-[25px]',
  lh: 'pt-2 text-[1.1rem] leading-[1.4]',
};

export default function SpeakerGroups({ groups, year }) {
  const nameCls = year === 2023 ? 'text-[24px]' : 'text-[18px] uppercase';
  return groups.map((g, gi) => (
    <div key={gi} className={`relative z-[1] pt-[60px] ${g.pb ? 'pb-10' : 'pb-0'}`}>
      <div>
        {(g.sub || g.title) && <SectionTitle sub={g.sub} title={g.title} className="text-center" />}
        <div className="pb-0">
          <div className={`${ROW.g0} ${g.center ? 'justify-center' : ''}`}>
            {g.cards.map((c, i) => (
              <div key={i} className={`${COL_BASE.g0} ${colClass(c.cols)}`}>
                {c.name && (
                  <div className="group bg-white text-center">
                    <div className="overflow-hidden">
                      <A href={c.href} className="block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.img}
                          alt={c.alt}
                          className="w-full transition-all duration-500 ease-[cubic-bezier(.645,.045,.355,1)] group-hover:scale-110"
                        />
                      </A>
                    </div>
                    <div className="p-5">
                      <h4 className={`${ARCHIVO} font-bold leading-[25px] text-[#1a0a1e] ${nameCls}`}>
                        <A href={c.href} className={LINK}>
                          {c.name}
                        </A>
                      </h4>
                      <p className={`text-[#1a0a1e] ${c.roleStyle ? ROLE[c.roleStyle] : 'text-[14px] leading-[25px]'}`}>
                        <Rich nodes={c.role} />
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ));
}
