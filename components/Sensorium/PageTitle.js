/* Eona page title "standard-with-breadcrumbs" (portfolio items and archives): a 170px #f2f2f2 band, its
 * content vertically centred on the content grid - h3 (27px/1.111 800 uppercase) over Playfair italic
 * 16px/1.412 #ababab breadcrumbs with "/" separators 5px either side. */
import { GRID, H3, PLAY } from '@/lib/sensorium/ui';

const CRUMB = `${PLAY} text-[16px] italic leading-[1.412] tracking-[0.01em] text-[#ababab]`;

export default function PageTitle({ title, crumbs }) {
  return (
    <div className="relative h-[170px] w-full bg-[#f2f2f2]">
      <div className={`${GRID} flex h-full flex-col justify-center`}>
        <h3 className={H3}>{title}</h3>
        <div className="mt-[6px]">
          {crumbs.map((c, i) => (
            <span key={`${c.name}-${i}`}>
              {i > 0 && <span className={`${CRUMB} mx-[5px]`}>/</span>}
              {c.href ? (
                <a href={c.href} className={`${CRUMB} transition-colors duration-200 ease-out hover:text-[#bababa]`}>
                  {c.name}
                </a>
              ) : (
                <span className={CRUMB}>{c.name}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
