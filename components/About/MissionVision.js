import { missionVision } from '@/lib/homeContent';
import { CONTAINER } from '@/components/Home/SectionHead';

/**
 * "Our Mission" / "Our Vision" — port of reference/index.php:1980-1993
 * (`section#our-mission.section > .container > .our-content-atlas >
 *   (.our-lt-atlas, .our-rt-atlas)`).
 *
 * Two 50% panels butted together — no gap, no cards, no icons, no tabs and no
 * JavaScript — inside a `border-radius: 32px 0` wrapper with `overflow: hidden`
 * so only the wrapper's outer corners round. Each panel carries its own indigo
 * plus a decorative PNG pinned to its right edge at `background-size: contain`.
 * Below 768px `.our-content-atlas` gets `flex-flow: wrap` and both panels go
 * full width, so mission sits above vision.
 *
 * ── Measured off the reference ────────────────────────────────────────────
 *                      >=768px              <=767px
 *   section            60px padding         40px
 *   panel              50% wide, 50px pad   100% wide, 50px pad
 *   .or-title-atlas    24px/1.5, 500        18px/1.5
 *   .or-text-isme      32px/1.4, 300,       22px/1.4
 *                      margin-top 16
 *
 * `id="our-mission"` is kept — the reference uses it as an anchor target.
 */
/*
 * `data` / `skin` — the ISME About page's `.our-content > .our-lt-isme / .our-rt-isme` (measured at
 * 1440 / 768 / 390): identical boxes and type, but square corners and the title in #07f6a0. Both
 * props default to the homepage, so it is unchanged.
 */
export default function MissionVision({ data = missionVision, skin = 'atlas', block }) {
  const { panels } = data;
  const isme = skin === 'isme';

  return (
    /* ref section#our-mission.section */
    <section
      id="our-mission"
      data-block={block}
      className="block overflow-hidden py-[60px] max-md:py-10"
    >
      {/* ref .w-layout-blockcontainer.container.w-container */}
      <div className={CONTAINER}>
        {/* ref .our-content-atlas */}
        <div className={isme ? 'flex justify-start max-md:flex-wrap' : 'flex justify-start overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:flex-wrap'}>
          {panels.map((panel) => (
            /* ref .our-lt-atlas / .our-rt-atlas — identical but for the
               colour and the decorative image, so both come from data. */
            <div
              key={panel.id}
              className="w-1/2 bg-contain bg-[position:100%] bg-no-repeat p-[50px] text-white max-md:w-full"
              style={{
                backgroundColor: panel.background,
                backgroundImage: `url(${panel.image})`,
              }}
            >
              {/* ref .or-title-atlas */}
              <div className={isme ? 'pb-0 text-2xl font-medium text-atlas-mint max-md:text-lg' : 'pb-0 text-2xl font-medium text-white max-md:text-lg'}>
                {panel.title}
              </div>

              {/* ref .or-text-isme */}
              <div className="mt-4 text-[32px] font-light leading-[1.4] max-md:text-[22px]">
                {panel.lines.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
