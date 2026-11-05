/* eslint-disable @next/next/no-img-element -- logo artwork and 1600x400 form headers at their natural proportions */
import { AVATARS } from '@/lib/brand/data';
import DownloadPill from '../ui/DownloadPill';
import { H2, H3, LEAD, PAGE, SECTION_Y } from '../ui/styles';
import FormHeaders from './FormHeaders';

/*
 * ref section#in-use: Google Form headers (FormHeaders), the profile-picture circle icons with
 * PNG / SVG downloads, and the logo do's and don'ts. The don'ts are drawn by CSS on the real
 * transparent logo (squash, rotate, recolour, glow, crop, a 32px favicon enlarged), exactly as the
 * reference draws them, so no extra artwork is needed.
 */
const ATLAS_LIGHT = '/assets/brand/logos/atlas/atlas-skilltech-full-stack-light.svg';
const OK = 'font-bold text-brand-ok';
const NO = 'font-bold text-brand-ugdx';

const RULES = [
  { ok: true, stage: 'bg-white p-6', img: ATLAS_LIGHT, imgClass: 'max-h-full w-auto max-w-full', alt: 'Correct: ATLAS transparent logo on a white background', text: 'use the transparent version on white or light backgrounds.' },
  { ok: true, stage: 'bg-brand-indigo p-6', img: '/assets/brand/logos/atlas/atlas-skilltech-full-stack.svg', imgClass: 'max-h-full w-auto max-w-full', alt: 'Correct: ATLAS full logo on ATLAS Indigo', text: 'use the full-color version on ATLAS Indigo.' },
  { ok: false, stage: 'bg-white p-6', img: ATLAS_LIGHT, imgClass: 'max-h-full w-auto max-w-[60%] scale-x-150 scale-y-75', alt: 'Incorrect example: the logo squashed horizontally', text: 'stretch or squash the logo. Scale it proportionally.' },
  { ok: false, stage: 'bg-brand-ugdx p-6', img: ATLAS_LIGHT, imgClass: 'max-h-full w-auto max-w-full', alt: 'Incorrect example: the transparent logo on a busy red background', text: "place the Indigo logo on a school color. Use the school's own lockup." },
  { ok: true, stage: 'bg-white p-6', clearSpace: true, img: ATLAS_LIGHT, imgClass: 'block h-auto w-full', alt: 'Correct: ATLAS logo with empty space kept around it, shown by a dashed outline', text: 'leave clear space around the logo. Keep text and other graphics well away from it.' },
  { ok: true, stage: 'bg-white p-6', img: '/assets/brand/logos/isdi/isdi-full-stack-light.svg', imgClass: 'max-h-full w-auto max-w-full', alt: 'Correct: the ATLAS | ISDI school lockup on a white background', text: "use the school's own lockup, such as ATLAS | ISDI, for school materials." },
  { ok: false, stage: 'bg-white p-6', img: ATLAS_LIGHT, imgClass: 'max-h-full w-auto max-w-[80%] -rotate-12', alt: 'Incorrect example: the logo rotated at an angle', text: 'rotate or tilt the logo. Always keep it level.' },
  { ok: false, stage: 'bg-white p-6', img: ATLAS_LIGHT, imgClass: 'max-h-full w-auto max-w-full hue-rotate-[150deg]', alt: 'Incorrect example: the logo shown in the wrong colors', text: 'change the logo colors. Use only the colors in the supplied files.' },
  { ok: false, stage: 'bg-white p-6', img: ATLAS_LIGHT, imgClass: 'max-h-full w-auto max-w-full [filter:drop-shadow(0_0_5px_#3CA7B6)_drop-shadow(5px_6px_3px_rgb(0_0_0/0.45))]', alt: 'Incorrect example: the logo with a drop shadow and glow added', text: 'add shadows, glows, outlines or other effects.' },
  { ok: false, stage: 'justify-start overflow-hidden bg-white py-6 pl-6', img: ATLAS_LIGHT, imgClass: 'w-[165%] max-w-none shrink-0', alt: 'Incorrect example: the logo cropped so part of the name is cut off', text: 'crop the logo or let any part of it run off the edge.' },
  { ok: false, stage: 'bg-white p-6', img: '/assets/brand/icons/favicon-32.png', imgClass: 'h-28 w-28 [image-rendering:pixelated]', alt: 'Incorrect example: a tiny low-resolution icon enlarged until it looks pixelated', text: "enlarge small or blurry copies. Download the SVG or full-size PNG from this page." },
  { ok: false, stage: 'p-6', stripes: true, img: ATLAS_LIGHT, imgClass: 'max-h-full w-auto max-w-full', alt: "Incorrect example: the logo on a busy striped pattern where it is hard to read", text: "place the logo on busy patterns or photos where it's hard to read." },
];

export default function InUseSection() {
  return (
    <section id="in-use" className={`${PAGE} ${SECTION_Y} scroll-mt-20`}>
      <div className="max-w-2xl">
        <h2 className={H2}>In use</h2>
        <p className={LEAD}>Ready-made files for common placements, and a few rules that keep the logo looking right everywhere.</p>
      </div>

      <div className="mt-12">
        <h3 className={H3}>Google Form headers</h3>
        <p className="mt-1 text-sm">1600 × 400 px headers, sized for Google Forms. Select one to download.</p>
        <FormHeaders />
      </div>

      <div className="mt-16">
        <h3 className={H3}>Profile pictures</h3>
        <p className="mt-1 text-sm">Circle icons are built for round crops on social media, WhatsApp, Teams and Zoom.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-brand-line n640:p-6">
            <ul className="m-0 list-none divide-x-0 divide-y divide-solid divide-brand-line p-0">
              {AVATARS.map(([name, dir, id]) => {
                const base = `/assets/brand/logos/${dir}/${id}`;
                /* the three reused PNGs are served from their existing file, saved as `<id>.png` */
                const png = { isdi: '/assets/images/advantages/partnership/misc/ISDI_Circle.png', isme: '/assets/images/advantages/partnership/misc/ISME_Circle.png', ugdx: '/assets/images/advantages/partnership/misc/INSOFE.png' }[dir] || `${base}.png`;
                return (
                  <li key={id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <img src={`${base}.svg`} alt="" className="h-11 w-11 shrink-0" width="44" height="44" loading="lazy" />
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold text-brand-indigo">{name}</span>
                    <DownloadPill href={png} filename={`${id}.png`} label="PNG" dlLabel={`Download ${name} circle icon as PNG`} copyLabel={`Copy ${name} circle icon PNG URL`} />
                    <DownloadPill href={`${base}.svg`} filename={`${id}.svg`} label="SVG" dlLabel={`Download ${name} circle icon as SVG`} copyLabel={`Copy ${name} circle icon SVG URL`} />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 rounded-2xl bg-white p-6 ring-1 ring-brand-line n640:gap-8">
            {[
              [128, 'h-24 w-24 n640:h-32 n640:w-32'],
              [64, 'h-16 w-16'],
              [40, 'h-10 w-10'],
              [24, 'h-6 w-6'],
            ].map(([px, cls]) => (
              <figure key={px} className="m-0 text-center">
                <img src="/assets/brand/logos/atlas/atlas-skilltech-circle.svg" alt={`ATLAS circle icon at ${px} pixels`} className={cls} width={px} height={px} />
                <figcaption className="mt-2 text-xs">{px} px</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className={H3}>Logo do&apos;s and don&apos;ts</h3>
        <p className="mt-1 text-sm">Always use the supplied files. Never redraw, stretch or recolor the logo.</p>
        <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-4 p-0 n640:grid-cols-2 n1024:grid-cols-4">
          {RULES.map((r) => (
            <li key={r.alt} className="overflow-hidden rounded-2xl bg-white ring-1 ring-brand-line">
              <div
                className={`flex aspect-[4/3] items-center justify-center ${r.stage}`}
                style={r.stripes ? { background: 'repeating-linear-gradient(135deg, #342B7C 0 18px, #3CA7B6 18px 36px, #E12A7B 36px 54px, #009FE0 54px 72px)' } : undefined}
              >
                {r.clearSpace ? (
                  <span className="block w-[88%] rounded-md bg-brand-teal/5 p-[9%] outline-dashed outline-2 outline-brand-teal/70">
                    <img src={r.img} alt={r.alt} className={r.imgClass} />
                  </span>
                ) : (
                  <img src={r.img} alt={r.alt} className={r.imgClass} />
                )}
              </div>
              <p className="flex gap-2 border-0 border-t border-solid border-brand-line p-4 text-sm">
                <span className={r.ok ? OK : NO} aria-hidden="true">
                  {r.ok ? '✓' : '✕'}
                </span>
                <span>
                  <strong className="text-brand-indigo">{r.ok ? 'Do' : "Don't"}</strong> {r.text}
                </span>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs">These are practical usage guidelines for the supplied logo files, not measured specifications.</p>
      </div>
    </section>
  );
}
