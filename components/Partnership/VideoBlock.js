import { SUB_INNER_MRGBTM, CONTAINER as WF_CONTAINER } from '@/components/Home/SectionHead';
import { TW_CONTAINER, WF_SECTION, H2_MRG16, HEAD_WRAP_TOP } from './ui';

/*
 * ref the partnership pages' closing video block — `section.section > .container >
 * (.head-wrap.top > h2.h2-tag.mrg16, .sub-heading.mrgbtm, .center-image-full-wrap-atlas >
 * .w-embed-youtubevideo)`:
 *   collaborative-projects.php  "Collaborative Projects at ATLAS"  zzX0vtHhOg8
 *   global-immersions.php       "Global Immersions at ATLAS"       RsQRHkCG9oI
 *   global-pathways.php         "Global Pathways at ATLAS"         zzX0vtHhOg8
 * Measured identical on all three at twelve widths. `.center-image-full-wrap-atlas` clips the embed
 * to 32px top-left / bottom-right corners; the frame is `padding-top: 56.1702%`. Every page authors
 * the iframe `autoplay=1&mute=1` with the title "MVP Showcase 2024" (copied between pages upstream),
 * so the accessible title here names the section instead. The `.head-wrap.top` "Explore
 * Entrepreneurship" button and the self-hosted `.rk-video` player are commented out on every page,
 * so neither is rendered.
 */
/* `container` — 'tw' (the Tailwind-CDN ladder) or 'webflow' (international-summerschool, which loads
   no Tailwind CDN and keeps Webflow's 1366px container) */
export default function VideoBlock({ heading, text, youtubeId, container = 'tw' }) {
  return (
    <section className={WF_SECTION}>
      <div className={container === 'webflow' ? WF_CONTAINER : TW_CONTAINER}>
        <div className={HEAD_WRAP_TOP}>
          <h2 className={H2_MRG16}>{heading}</h2>
        </div>
        <div className={SUB_INNER_MRGBTM}>{text}</div>
        <div className="relative w-full overflow-hidden rounded-br-[32px] rounded-tl-[32px]" style={{ paddingTop: '56.17021276595745%' }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&controls=1&autoplay=1&mute=1&start=0`}
            title={heading}
            loading="lazy"
            allow="autoplay; encrypted-media"
            allowFullScreen
            frameBorder="0"
          />
        </div>
      </div>
    </section>
  );
}
