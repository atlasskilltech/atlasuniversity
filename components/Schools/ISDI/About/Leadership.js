import { cx } from '@/lib/cx';
import SmartLink from '@/components/SmartLink';
import InViewVideo from '../Home/InViewVideo';
import { CONTAINER } from '../Home/ui';
import IconSection from './IconSection';

/**
 * Leadership Team — port of about-us/index.php:211-274
 * (`section.section > (.icon-heading, .blue-wrapper > .container > .common-wrapper >
 *   3 x .people-details)`).
 *
 * The same `.people-details` shape as `components/About/ChancellorNote`, on ISDI's
 * sheet: a 16px portrait corner (not `32px 0`), a job title under the name, the
 * bio set in the wrapper's 300 weight, and an underlined text "Read More" instead
 * of a pill — so it is drawn here.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                            <=767px
 *   .common-wrapper   pt50
 *   .people-details   row, top-aligned, mb56 (last: 0)   column
 *   portrait          338 wide, r16, clipped, 1.4        full width x 400; the
 *                     line-height; the video box is      500px video box is cropped
 *                     500 tall, cover                    to it
 *   quote             bottom half, #0008 -> clear;       same over the 400 frame
 *                     p26, gap 5, 16px icon
 *   text column       flex 1, pl56                       pt20, pl0
 *   name (h4)         32px/1 400 #e5e1e1, my10           22px
 *   post              24px/1.2                           18px
 *   bio               18px/1.5, pt56 pb20                16px, pt40
 *   Read More         18px/1.5 400 white, underlined
 *
 * `#our-leadership` is the reference's wrapper around this section and the three
 * after it (both advisory boards and the management team); the page supplies it.
 */
export default function Leadership({ data }) {
  return (
    <IconSection block="leadership" icon={data.icon} title={data.title}>
      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className="pt-[50px]">
          {data.people.map((person, i) => (
            /* ref .people-details */
            <div
              key={person.name}
              id={person.id ?? undefined}
              className={cx('flex items-start justify-start max-md:flex-col', i < data.people.length - 1 && 'mb-14')}
            >
              {/* ref .pp-cont-lt.isdi */}
              <div className="relative w-[338px] flex-none overflow-hidden rounded-2xl leading-[1.4] max-md:h-[400px] max-md:w-full">
                {/* ref .pp-quote */}
                <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 flex-col items-start justify-end bg-[linear-gradient(0deg,#00000080,#0000)]">
                  {/* ref .qt-text */}
                  <div className="flex flex-none items-start justify-start gap-[5px] p-[26px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={data.quoteIcon}
                      width={16}
                      height={16}
                      alt=""
                      loading="lazy"
                      className="max-w-full align-middle"
                    />
                    <div>{person.quote}</div>
                  </div>
                </div>
                {/* ref .pp-image.w-background-video */}
                <div className="relative h-[500px] overflow-hidden">
                  <InViewVideo
                    sources={person.video.sources}
                    poster={person.video.poster}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>

              {/* ref .pp-cont-rt */}
              <div className="flex-[1_0_0px] pl-14 max-md:w-full max-md:pl-0 max-md:pt-5">
                {/* ref h4.h4-pp */}
                <h4 className="my-2.5 text-[32px] font-normal leading-none text-[#e5e1e1] max-md:text-[22px] max-md:leading-none">
                  {person.name}
                </h4>
                {/* ref .pp-post */}
                <div className="text-[24px] leading-[1.2] max-md:text-[18px] max-md:leading-[1.2]">{person.post}</div>
                {/* ref .pp-content */}
                <div className="pb-5 pt-14 text-[18px] leading-[1.5] max-md:pt-10 max-md:text-base max-md:leading-[1.5]">
                  {person.paragraphs.map((paragraph, p) => (
                    <span key={paragraph}>
                      {p > 0 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                      {paragraph}
                    </span>
                  ))}
                </div>
                {person.more && (
                  /* ref a.know-more-link.isdi */
                  <SmartLink
                    href={person.more.href}
                    className="text-[18px] font-normal leading-[1.5] text-white underline"
                  >
                    {person.more.label}
                  </SmartLink>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </IconSection>
  );
}
