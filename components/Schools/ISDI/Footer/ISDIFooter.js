import { Fragment } from 'react';
import { isdiFooter as f } from '@/lib/schools/isdi/footerContent';
import VideoModal from '@/components/Footer/VideoModal';

/**
 * ISDI school footer — port of
 * reference/schools/isdi/assets/include/footer.php over the ISDI page sheet.
 * Mounted once by app/schools/isdi/layout.js.
 *
 *   >= 768px  pink contact column (40%) | blue panel (60%): logo top-right,
 *             social icons bottom-right, over the ring pattern
 *   <= 767px  the two stack; the blue panel becomes a centred row
 *   <= 479px  that row wraps (logo, then icons) and gains 40px left padding
 *
 * Every value below was measured on https://atlasuniversity.edu.in/schools/isdi/
 * at 1920-360px. A server component: nothing here is interactive.
 *
 * `VideoModal` is the existing shared one. footer.php carries the same
 * `data-video` modal as the ATLAS footer (same markup, same inline CSS apart
 * from `overflow: clip` vs `hidden`, which paint identically), and the ATLAS
 * footer is not rendered under /schools/*, so it is mounted here instead. The
 * one behavioural difference: ISDI's script embeds from youtube.com, the shared
 * helper from youtube-nocookie.com — the same player.
 */

function Lines({ text }) {
  return text.split('\n').map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

// ref .ft-head — 24px / 1.5, weight 400 (renders as the Medium face, see
// the 'Poppins ISDI' note in globals.css), 12px below
const FT_HEAD = 'mb-3 text-2xl font-normal';

export default function ISDIFooter() {
  return (
    <>
      {/* ref section.footer — 56px above it, 40px from 767 down */}
      <section
        data-isdi-footer
        className="mt-14 flex font-poppins-isdi text-base text-[#333] max-md:mt-10 max-md:flex-col"
      >
        {/* ref .content-left — #df287b, 40%, 32px padding */}
        <div className="w-2/5 flex-none bg-[#df287b] p-8 text-white max-md:w-full">
          <div data-part="head" className={FT_HEAD}>
            <Lines text={f.question} />
          </div>

          {/* ref a.ft-links — an inline anchor, so it sits on its own 24px line box */}
          <a data-part="email" href={f.email.href} className="flex-1 text-white no-underline">
            {f.email.label}
          </a>

          {/* ref .ft-head.mrgtp — `padding-top: 0`, i.e. no extra space */}
          <div data-part="head" className={FT_HEAD}>
            {f.findUs}
          </div>

          {/* ref .school-name — ends in a <br> that adds no line */}
          <div data-part="school" className="font-semibold">
            {f.schoolName}
            <br />
          </div>

          {/* ref .address */}
          <div data-part="address">
            <Lines text={f.address} />
          </div>

          {/* ref .copy.mrgtp */}
          <div data-part="copy" className="mt-[54px]">
            {f.copyright}
          </div>
        </div>

        {/*
          ref .content-right — #1f4aa0 under footer-vector.png (cover, anchored
          right), a column pushing the logo to the top and the icons to the
          bottom, both flush right. No left padding above 479px.
        */}
        <div
          className={
            'flex w-3/5 flex-none flex-col items-end justify-between py-10 pr-10 ' +
            "bg-[#1f4aa0] bg-[url('/assets/images/schools/isdi/footer/footer-vector.png')] " +
            'bg-cover bg-[position:100%_50%] bg-no-repeat ' +
            'max-md:w-full max-md:flex-row max-md:items-center max-md:justify-around max-md:gap-10 ' +
            'max-sm:flex-wrap max-sm:pl-10'
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- a 3.5KB PNG shown at its natural 211x54 */}
          <img
            src={f.logo.src}
            alt={f.logo.alt}
            width={f.logo.width}
            height={f.logo.height}
            loading="lazy"
            className="block"
          />

          {/* ref .social-icons — 16px apart */}
          <div className="flex items-center gap-4">
            {f.socialIcons.map((icon) => (
              // eslint-disable-next-line @next/next/no-img-element -- 24x25 SVG icons
              <img key={icon.name} src={icon.src} alt="" width={24} height={25} loading="lazy" className="block" />
            ))}
          </div>
        </div>
      </section>

      <VideoModal />
    </>
  );
}
