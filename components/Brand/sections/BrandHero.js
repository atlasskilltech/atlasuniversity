/* eslint-disable @next/next/no-img-element -- the ATLAS circle mark, an SVG */
import { BRAND_COLORS } from '@/lib/brand/data';
import { PAGE } from '../ui/styles';
import HeroStrip from './HeroStrip';

/*
 * ref section#top: the Indigo hero ("Brand kit", two calls to action, the circle mark from 1024px)
 * over the colour strip — every primary and school colour as a band; selecting one copies its HEX.
 * From 1024px the strip is one row and the hovered / focused band widens (flex 1 -> 1.6).
 */
export default function BrandHero() {
  const strip = BRAND_COLORS.filter((g) => g.id === 'core' || g.id === 'schools').flatMap((g) => g.colors);
  return (
    <section id="top" className="relative overflow-hidden bg-brand-indigo text-white">
      <div className={`${PAGE} grid grid-cols-1 gap-10 pb-12 pt-14 n640:pt-20 n1024:grid-cols-[1.25fr_1fr] n1024:items-end n1024:pb-16 n1024:pt-24`}>
        <div>
          <p className="mb-5 text-sm font-semibold text-brand-teal">ATLAS SkillTech University</p>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.02] tracking-tight n640:text-6xl n1024:text-7xl">Brand kit</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 n640:text-lg">
            Official logos and colors for the university, its four schools, ATLAS Edge and CDOE. Copy an exact color code or download a logo in the format you need.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#logos" className="inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-bold text-brand-indigo no-underline transition hover:bg-brand-teal hover:text-white">
              Download logos
            </a>
            <a href="#colors" className="inline-flex items-center rounded-lg px-5 py-3 text-sm font-bold text-white no-underline ring-1 ring-inset ring-white/40 transition hover:bg-white/10">
              Get color codes
            </a>
            <a href="#tools" className="inline-flex items-center rounded-lg px-5 py-3 text-sm font-bold text-white no-underline ring-1 ring-inset ring-white/40 transition hover:bg-white/10">
              Brand tools
            </a>
          </div>
        </div>
        <div className="hidden n1024:flex n1024:justify-end">
          <img src="/assets/brand/logos/atlas/atlas-skilltech-circle.svg" alt="" className="h-64 w-64" width="256" height="256" />
        </div>
      </div>

      <div className="border-0 border-t border-solid border-white/10">
        <h2 className="sr-only">Brand colors at a glance</h2>
        <HeroStrip colors={strip} />
      </div>
    </section>
  );
}
