import { CONTAINER } from '../Home/ui';
import IconSection from './IconSection';
import { LEAD_MRGBTM32 } from './OurStory';

/**
 * In The Heart of Mumbai — port of about-us/index.php:754-769
 * (`section#our-location.section > (.icon-heading, .blue-wrapper > .container >
 *   .common-wrapper > (.h3-tag, .sub-heading.mrgbtm32, img.event-image.isdi))`).
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                          <=767px
 *   .h3-tag           32px/1.2 500 white, mb32         22px
 *   lead              as Our Story's `.sub-heading.mrgbtm32`
 *   photo             full width at its own 828:486 ratio (1242 x 729 at 1440),
 *                     cover, r16
 */
export default function Location({ data }) {
  return (
    <IconSection id="our-location" block="location" icon={data.icon} title={data.title}>
      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className="pt-[50px]">
          <div className="mb-8 mt-0 text-[32px] font-medium leading-[1.2] text-white max-md:text-[22px] max-md:leading-[1.2]">
            {data.h3}
          </div>
          <div className={LEAD_MRGBTM32}>{data.text}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image.src}
            width={data.image.width}
            height={data.image.height}
            alt={data.image.alt}
            loading="lazy"
            decoding="async"
            className="block h-full w-full max-w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </IconSection>
  );
}
