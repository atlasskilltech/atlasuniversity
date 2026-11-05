/*
 * ref international-faculty.php:411-463 "The World Comes to ATLAS" — a Tailwind-CDN section:
 * `section.py-20.bg-gray-100 > .max-w-7xl.mx-auto.px-6 > (h2, .grid.grid-cols-1.md:grid-cols-3.gap-6)`
 * of `$facultyData` cards. Measured on production at 1440 / 900 / 390:
 *   card     relative, rounded-lg (8px), clipped; its height is the photograph's — 320px from 1024
 *            (`lg:h-[320px]` cover), the photo's own ratio below
 *   scrim    absolute lower half, `from-black/100 to-transparent`
 *   bar      absolute bottom row, name left / logo right, padding 24px — the authored `p-4` is
 *            Bootstrap's (the header loads it, !important), not Tailwind's 16px
 *   name     h3 600 white, 14px/1.25 → 16px from 1024
 *   logo     white plate, `p-[3px]`, height 32 → 48 from 1024, width auto
 * Written in px rather than 0-5 utilities so no Bootstrap-scale remap can touch it.
 */
export default function FacultyGrid({ heading, faculty }) {
  return (
    <section className="bg-gray-100 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="relative mb-[16px] mt-0 text-[44px] font-medium leading-[1.2] text-[#1a1a1a]">{heading}</h2>
        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-3">
          {faculty.map((f) => (
            <div key={f.name} className="relative overflow-hidden rounded-[8px] text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.image} alt={`${f.name}, ${f.university}`} loading="lazy" className="block w-full object-cover n1024:h-[320px]" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-[24px]">
                <div className="text-left">
                  <h3 className="text-[14px] font-semibold leading-[1.25] text-white n1024:text-[16px]">{f.name}</h3>
                </div>
                {f.logo && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={f.logo} alt="" loading="lazy" className="block h-[32px] w-auto bg-white object-contain p-[3px] n1024:h-[48px]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
