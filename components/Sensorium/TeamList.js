/* eslint-disable @next/next/no-img-element -- static WebP exports with their own srcSet; next/image is not used for this standalone port */
/* Eona team list (eona_core_team_list), layout "info-on-hover", gutter "tiny".
 * Columns: 4 above 1024, 2 from 1024 to 681, 1 at 680 and below (custom responsive classes).
 * Hover: a rgba(255,255,255,.93) plate 33px in from each side and 28px off the bottom wipes in from
 * the left (clip-path inset(0 100% 0 0) -> 0, .5s) and the name rises 10px into view (.3s after .3s).
 * Square 468px portraits; no links - production's members are not linkable. */
import { H4 } from '@/lib/sensorium/ui';

const COL = 'w-1/4 [@media(min-width:681px)_and_(max-width:1024px)]:w-1/2 [@media(max-width:680px)]:w-full';

export default function TeamList({ members }) {
  return (
    <div className="-mx-[5px] flex flex-wrap">
      {members.map((m, i) => (
        <div key={`${m.name}-${i}`} className={`${COL} px-[5px] pb-[10px]`}>
          <div className="group relative">
            <img src={m.img.src} srcSet={m.img.srcSet} width={m.img.w} height={m.img.h} alt="" loading="lazy" className="block h-auto w-full" />
            <div className="absolute bottom-[28px] left-[33px] flex w-[calc(100%-66px)] flex-col items-center justify-center bg-[rgba(255,255,255,0.93)] px-5 text-center transition-[clip-path] duration-500 ease-[cubic-bezier(.59,.02,.17,.95)] [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]">
              <h4 className={`${H4} mb-[21px] mt-4 invisible translate-y-[10px] opacity-0 transition-[opacity,visibility,transform] delay-300 duration-300 ease-in-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100`}>
                {m.name}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
