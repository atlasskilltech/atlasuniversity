import IconSection from '../About/IconSection';
import { BLUE_DESC_TEXT, BLUE_DESC_WRAP, CONTAINER } from './ui';

/**
 * "Startups" (`success-snapshot/index.php`, block 11).
 *
 *   section#start-up-section.section > (.icon-heading,
 *     .blue-wrapper.isdi-blue-5 > .container > (.blue-desc-wrap > .blue-desc-text,
 *       .startup-bg-block.isdi > .startup-hd-text.isdi))
 *
 * This heading authors `.icon-main-title` as a DIRECT child of `.icon-heading`,
 * where every other one on the page wraps it in `.icon-title-hd` (`flex: 1`,
 * self-centred). The title is the flex child either way and its own `margin-left:
 * 48px` is what sets the gap, so the two measure the same.
 *
 *   .startup-bg-block.isdi   h602, mt56, r16, `polish-me-pretty.png` at 0 0 at its
 *                            own size; at <=767 h400, `cover` at -125px 0
 *   .startup-hd-text.isdi    absolute 46px up, flush left, white on #ec1376,
 *                            24px/32 500, p 16/26/18; 18px/1.5 at <=767
 */
export default function Startups({ data }) {
  return (
    <IconSection
      id="start-up-section"
      block="startups"
      icon={data.icon.image}
      title={data.icon.title}
    >
      <div className={CONTAINER}>
        <div className={BLUE_DESC_WRAP}>
          <div className={BLUE_DESC_TEXT}>{data.lead}</div>
        </div>

        {/* ref .startup-bg-block.isdi */}
        <div
          className="relative mt-14 h-[602px] rounded-2xl bg-[position:0_0] bg-[length:auto] max-md:h-[400px]
                     max-md:bg-[position:-125px_0] max-md:bg-cover"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          {/* ref .startup-hd-text.isdi */}
          <div className="absolute bottom-[46px] left-0 bg-[#ec1376] px-[26px] pb-[18px] pt-4 text-2xl font-medium leading-8 text-white max-md:text-[18px] max-md:leading-[1.5]">
            {data.caption}
          </div>
        </div>
      </div>
    </IconSection>
  );
}
