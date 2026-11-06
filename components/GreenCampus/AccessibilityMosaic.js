import { cx } from '@/lib/cx';

/**
 * `#differently-abled.bl-card-wrapper-isme.atlas > .belief-cards-1-camp` — four photographs of the
 * campus's accessibility features.
 *
 * It is the SECOND band of `components/ui/PhotoMosaic` on its own: that component always renders both
 * four-cell bands (eight cells), and this page authors only `.belief-cards-1-camp`. Rather than give a
 * shared component a single-band mode for one page, the band's measured grid is restated here:
 *
 *                              >=768px                      <=767px
 *   .bl-card-wrapper-isme      margin-top 56, radius 32 0,  margin-top 40
 *                              clipped
 *   .belief-cards-1-camp       grid 1fr/2fr x 252/312,      grid 1fr/1fr x 250/250
 *                              564 tall
 *   .bl-cards-camp.img-5       column 1, both rows,         row 1, column 1
 *                              align stretch
 *   .bl-cards-camp.img-6       column 2, row 1              row 1, column 2
 *   .cards-cols-camp           column 2, row 2: two cells   row 2, both columns
 *   .card-title.sp-1           32px/1.2 500, padding 0 24,  16px/1.2 600
 *                              margin-bottom 32
 *
 * The page's `<style>` paints each cell as `linear-gradient(rgba(0,0,0,.6) x2), url(photo)`, cover;
 * `img-7` is centred and the rest sit at 0 0. `img-7`'s caption is empty upstream and still a box.
 */
export default function AccessibilityMosaic({ id, cells }) {
  const [ramp, entrance, backRamp, washroom] = cells;

  return (
    /* ref #differently-abled.bl-card-wrapper-isme.atlas */
    <div id={id} className="mt-14 overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:mt-10">
      {/* ref .belief-cards-1-camp */}
      <div
        className="grid h-[564px] grid-cols-[1fr_2fr] grid-rows-[252px_312px] justify-center text-white
                   max-md:h-auto max-md:grid-cols-[1fr_1fr] max-md:grid-rows-[250px_250px]"
      >
        <Cell cell={ramp} className="col-start-1 row-span-2 row-start-1 items-stretch max-md:row-span-1" />
        <Cell cell={entrance} className="col-start-2 row-start-1" />
        {/* ref .cards-cols-camp > .inside-cards-camp */}
        <div className="col-start-2 row-start-2 flex flex-col items-start justify-center max-md:col-span-2 max-md:col-start-1 max-md:block">
          <div className="grid h-full w-full grid-cols-2 grid-rows-1 justify-center max-md:grid-rows-[250px]">
            <Cell cell={backRamp} />
            <Cell cell={washroom} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ref .bl-cards-camp.img-N / .cards-inner-camp.img-N */
function Cell({ cell, className }) {
  return (
    <div
      className={cx(
        'flex flex-col items-start justify-end bg-cover bg-no-repeat text-white max-md:h-[250px] max-md:w-full',
        cell.position === 'center' ? 'bg-center' : 'bg-[position:0_0]',
        className,
      )}
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${cell.image})` }}
    >
      {/* ref .card-title.sp-1 */}
      <div className="mb-8 px-6 text-[32px] font-medium leading-[1.2] max-md:text-[16px] max-md:font-semibold">
        {cell.label}
      </div>
    </div>
  );
}
