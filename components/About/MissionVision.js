import { missionVision } from '@/lib/homeContent';

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
export default function MissionVision() {
  const { panels } = missionVision;

  return (
    /* ref section#our-mission.section */
    <section
      id="our-mission"
      className="block overflow-hidden py-[60px] max-md:py-10"
    >
      {/* ref .w-layout-blockcontainer.container.w-container */}
      <div className="relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]">
        {/* ref .our-content-atlas */}
        <div className="flex justify-start overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:flex-wrap">
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
              <div className="pb-0 text-2xl font-medium text-white max-md:text-lg">
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
