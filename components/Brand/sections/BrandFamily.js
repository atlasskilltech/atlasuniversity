/* eslint-disable @next/next/no-img-element -- the school circle marks, SVG */
import { FAMILY } from '@/lib/brand/data';
import { H2, LEAD, PAGE, SECTION_Y } from '../ui/styles';

/*
 * ref section#family "One university, four schools": one card per brand, linking to its tab in the
 * Logos section (`#logos-<brand>` — LogoBrowser selects the tab and scrolls there).
 */
export default function BrandFamily() {
  return (
    <section id="family" className={`${PAGE} ${SECTION_Y} scroll-mt-20`}>
      <div className="max-w-2xl">
        <h2 className={H2}>One university, four schools</h2>
        <p className={LEAD}>Every school logo is ATLAS Indigo plus one school color. Pick a school to jump straight to its logo files.</p>
      </div>
      <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-4 p-0 min-[420px]:grid-cols-2 n1024:grid-cols-5">
        {FAMILY.map((f) => (
          <li key={f.id}>
            <a
              href={`#logos-${f.id}`}
              className="group flex h-full items-center gap-4 rounded-2xl bg-white p-4 text-brand-ink no-underline ring-1 ring-brand-line transition hover:ring-2 hover:ring-brand-indigo n1024:flex-col n1024:items-start n1024:p-5"
            >
              <img src={f.icon} alt="" className="h-14 w-14 shrink-0 n1024:h-20 n1024:w-20" width="80" height="80" loading="lazy" />
              <span className="min-w-0">
                <span className="block text-lg font-extrabold text-brand-indigo">{f.name}</span>
                <span className="mt-0.5 block text-sm leading-snug">{f.full}</span>
                <span className="mt-3 flex items-center gap-2 text-xs font-semibold text-brand-indigo">
                  <span className="h-3 w-3 rounded-full" style={{ background: f.hex }} />
                  {f.hex}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
