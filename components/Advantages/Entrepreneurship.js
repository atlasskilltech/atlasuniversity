import { advantagesContent } from '@/lib/advantagesContent';
import VideoSection from '@/components/Advantages/VideoSection';

/**
 * "Entrepreneurship at ATLAS" — port of `atlas-advantages.php:950-974`
 * (`section.section > .container > (.head-wrap.top, .sub-heading.mrgbtm,
 *   .center-image-full-wrap-atlas)`).
 *
 * Heading, button and video on the shared `VideoSection`. This section's
 * wrapper is `.center-image-full-wrap-atlas`, which carries the 32px corners
 * and clips — hence `rounded`.
 */
export default function Entrepreneurship() {
  const { entrepreneurship } = advantagesContent;

  return (
    <VideoSection
      heading={entrepreneurship.heading}
      subheading={entrepreneurship.subheading}
      button={entrepreneurship.button}
      embed={entrepreneurship.embed}
      rounded
    />
  );
}
