import { Fragment } from 'react';
import { ismeFooter as f } from '@/lib/schools/isme/footerContent';
import VideoModal from '@/components/Footer/VideoModal';

/**
 * ISME school footer — port of reference/schools/isme/assets/include/footer.php.
 * Mounted once by app/schools/isme/layout.js. Measured on
 * https://atlasuniversity.edu.in/schools/isme/ at 1440 / 991 / 767 / 479 / 390:
 *
 *   >= 768px  two #072058 columns: contact 40% (32px padding) | 60% panel over foot-bg.png
 *             (cover, 0% 50%), logo top-right and the four icons bottom-right
 *             (column, space-between, flex-end, padding 40 40 40 0)
 *   <= 767px  the columns stack; the panel is a centred row, padding 20 (logo left, icons right)
 *   <= 479px  the panel becomes a centred column with a 24px gap
 *
 * Same chassis as ISDIFooter, a different palette and a contact list, so it is its own small
 * server component rather than a variant of that one. The `#npf-popup-overlay-campus` popup in
 * footer.php binds to `[data-id="campus-visit"]`. Only Parents Corner's banner button carries that
 * attribute, so the popup is ported there, by the button itself (components/Schools/ISME/
 * CampusVisitButton); everywhere else it is an orphan and is not rendered.
 */

function Lines({ text }) {
  return text.split('\n').map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

// ref .ft-head — 24px/36, 12px below
const FT_HEAD = 'mb-3 text-[24px] leading-[36px] font-normal';

export default function ISMEFooter() {
  return (
    <>
      <section
        data-isme-footer
        className="mt-14 flex text-base text-[#333] max-md:mt-10 max-md:flex-col"
      >
        {/* ref .content-left-isme */}
        <div className="w-2/5 flex-none bg-[#072058] p-8 text-white max-md:w-full">
          <div className="mb-[54px]">
            <div className={FT_HEAD}>
              <Lines text={f.question} />
            </div>
            {/* ref .contact-links — column, gap 4 */}
            <div className="flex flex-col gap-1">
              {f.contacts.map((c) => (
                <a key={c.label} href={c.href} className="block text-white no-underline">
                  {c.label}
                </a>
              ))}
            </div>
          </div>

          {/* ref .footer-meetus — 54 above, 42 below (block margins collapse, as upstream) */}
          <div className="mt-[54px] mb-[42px]">
            <div className={FT_HEAD}>{f.meetUs}</div>
            <div className="font-semibold">
              {f.schoolName}
              <br />
            </div>
            <div>{f.address}</div>
          </div>

          {/* ref .copy.mrgtp */}
          <div className="mt-[54px]">
            <Lines text={f.copyright} />
          </div>
        </div>

        {/* ref .content-right-isme */}
        <div
          className={
            'flex flex-1 flex-col items-end justify-between bg-[#072058] ' +
            'bg-[url(/assets/images/schools/isme/footer/foot-bg.png)] bg-cover bg-[position:0%_50%] bg-no-repeat ' +
            'py-10 pl-0 pr-10 ' +
            'max-md:flex-row max-md:items-center max-md:p-5 ' +
            'max-sm:flex-col max-sm:gap-6'
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- a 2KB PNG shown at its natural 178x40 */}
          <img
            src={f.logo.src}
            width={f.logo.width}
            height={f.logo.height}
            alt={f.logo.alt}
            loading="lazy"
            className="block"
          />
          <div className="flex items-center gap-4">
            {f.social.map((s) => (
              <a key={s.name} href={s.href} className="block">
                {/* eslint-disable-next-line @next/next/no-img-element -- 24x25 SVG icons */}
                <img src={s.src} width={24} height={25} alt="" loading="lazy" className="block" />
              </a>
            ))}
          </div>
        </div>
      </section>
      <VideoModal />
    </>
  );
}
