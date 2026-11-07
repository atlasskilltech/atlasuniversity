/* eslint-disable @next/next/no-img-element -- plain <img> as the reference renders it (project convention) */
import { cx } from '@/lib/cx';
import { LP2X_FONT_VARS } from '@/lib/landing/lp2x/fonts';
import { LP2022_RC_VARS } from '@/lib/landing/lp2022/fonts';
import { CARDS, DESIGN_YOUR_FUTURE, FEATURES, LOGOS, PROGRAM_OPTIONS, TESTIMONIALS } from '@/lib/landing/lp2022/ugprograms';
import BsCarousel from '../shared/BsCarousel';
import CurrentYear from '../shared/CurrentYear';
import { FloatingScrollButton, ScrollToButton } from '../shared/ScrollButtons';
import { COL, COL_BOX, CONTAINER, CONTAINER_BOX, FONT_RC, FONT_ROBOTO, PhoneIcon, ROW } from './ui';

const IMG = '/assets/lp2022/ugprograms';

/**
 * /lp2022/ugprograms — "Get the best of the future in the present with our Bachelor of Design
 * programs" (ISDI UG design campaign). Reference `lp2022/ugprograms/index.php`, Bootstrap 4.6 +
 * main.css / responsive.css, Roboto + Roboto Condensed. Its own header and footer. Measured on
 * production at 1920 / 1440 / 768 / 390.
 *
 * Sections: hero (logos, phone, heading, lead form) | PROGRAM FEATURES | FUTURISTIC BACHELOR IN DESIGN
 * PROGRAMS (2x3 cards; the 7th card sits in the next band >= 768) | DESIGN YOUR FUTURE | PLACEMENT
 * PARTNERS | HEAR FROM OUR STUDENTS (Bootstrap carousel: 3 slides of 3 >= 768, 9 single slides < 768) |
 * footer (address + second form) | copyright. "Know More" and the fixed "Enquire Now" jump to the form.
 *
 * Forms: both post to `submit.php` (PHPMailer) upstream — not ported, no CRM on this page; rendered
 * inert (see ui.js). Reference defects not reproduced: windows-1252 bytes under a UTF-8 charset
 * (’ “ – paint as U+FFFD upstream); `bootstrap.js` / jQuery-validate console noise.
 */
export default function UgPrograms() {
  return (
    <div className={cx(LP2X_FONT_VARS, LP2022_RC_VARS, FONT_ROBOTO, 'overflow-x-hidden bg-white text-[16px] leading-[1.5] text-[#212529] subpixel-antialiased')}>
      <Hero />
      <Features />
      <Programs />
      <DesignYourFuture />
      <Placement />
      <Testimonials />
      <FloatingScrollButton
        target="enquire-form"
        className="fixed bottom-[250px] right-[-96px] z-[99] h-[41px] w-[232px] -rotate-90 cursor-pointer border-none bg-[#01ff13] p-[7px] text-[14px] font-bold text-black outline-none hover:bg-[#9500FF] hover:text-white max-md:bottom-0 max-md:right-0 max-md:w-full max-md:rotate-0 max-md:p-[10px]"
      >
        Enquire Now
      </FloatingScrollButton>
      <Footer />
    </div>
  );
}

/* `.form-control` here: transparent, a grey bottom rule only, pulled up 3% */
const INPUT =
  'block h-[35px] w-full -mt-[3%] border-0 border-b border-solid border-b-[gray] bg-transparent p-0 text-[14px] font-normal leading-[1.5] text-[#495057] placeholder:text-[#6c757d] focus:outline-none';
const SELECT_ARROW = {
  dark: 'bg-[linear-gradient(45deg,transparent_50%,black_50%),linear-gradient(135deg,black_50%,transparent_50%)]',
  light: 'bg-[linear-gradient(45deg,transparent_50%,white_50%),linear-gradient(135deg,white_50%,transparent_50%)]',
};
const SELECT =
  'appearance-none bg-[position:calc(100%-20px)_calc(1em+2px),calc(100%-15px)_calc(1em+2px)] bg-[length:5px_5px,5px_5px] bg-no-repeat';

function Field({ id, label, type = 'text', placeholder, labelClass }) {
  return (
    <div className="mb-[16px] h-[60px] w-full">
      <label htmlFor={id} className={cx('mb-[8px] inline-block text-[14px] font-bold', labelClass)}>
        {label}
      </label>
      <input type={type} id={id} name={id.split('-').pop()} placeholder={placeholder} required className={INPUT} />
    </div>
  );
}

function ProgramSelect({ id, labelClass, arrow }) {
  return (
    <div className="mb-[16px] h-[60px] w-full">
      <label htmlFor={id} className={cx('mb-[8px] inline-block text-[14px] font-bold', labelClass)}>
        Program
      </label>
      <select id={id} name="program" required defaultValue="" className={cx(INPUT, SELECT, SELECT_ARROW[arrow])}>
        <option value="" disabled>
          Select Program
        </option>
        {PROGRAM_OPTIONS.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}

const PHONE = 'tel:+917718865341';

function Hero() {
  /* `.banner-section`: the photograph is swapped below 768 (responsive.css) */
  return (
    <section className="h-[740px] bg-[url(/assets/lp2022/ugprograms/Atlas-UG_01.webp)] bg-cover max-md:h-[650px] max-md:bg-[url(/assets/lp2022/ugprograms/Program_Specific_LP_op3_MM_02.webp)]">
      <HeroInner />
    </section>
  );
}

function HeroInner() {
  return (
    <div className={CONTAINER}>
      {/* ref .row.logo-section — 3% top padding; a purple bar below 768 */}
      <div className={cx(ROW, 'pt-[3%] max-md:bg-[#9500FF] max-md:p-0')}>
        <div className={cx(COL_BOX, 'max-w-[75%] flex-[0_0_75%] px-[15px] max-md:pb-[4px] max-md:pt-0 md:max-w-[50%] md:flex-[0_0_50%]')}>
          <div className="inline-flex max-md:hidden">
            <img
              src={`${IMG}/PNG.png`}
              alt=""
              className="ml-[10px] mt-[3px] h-fit border border-solid border-[#cacaca] bg-white p-[5px] align-middle"
            />
            <img src={`${IMG}/logo.png`} alt="" className="ml-[10px] w-[200px] align-middle" />
          </div>
          <div className="mt-[2px] flex md:hidden">
            <img src={`${IMG}/PNG.png`} alt="" className="relative mx-auto mb-0 mt-[6px] h-[33px] w-[85px] bg-white p-0" />
            <img src={`${IMG}/atlas_new_logo.webp`} alt="" className="relative mx-auto mt-[3px] h-[40px] w-[134px]" />
          </div>
        </div>
        <div className={cx(COL, 'max-w-[25%] flex-[0_0_25%] max-md:bg-black md:max-w-[50%] md:flex-[0_0_50%]')}>
          <div className="text-right">
            <a
              href={PHONE}
              className="bg-[#1b1e1b] p-[2%] text-[15px] font-medium text-[#01ff13] hover:text-[#01ff13] hover:underline max-md:hidden"
            >
              <PhoneIcon className="inline-block h-[15px] w-[12px] align-[-2px] text-[#01ff13]" />
              {'   +91 7718865341'}
            </a>
            <br className="max-md:hidden" />
            <h6 className="mb-[8px] mr-[44px] mt-[12px] text-[16px] font-medium leading-[1.2] max-md:hidden">Call Now</h6>
            <a
              href={PHONE}
              aria-label="Call +91 7718865341"
              className="-mt-[9px] inline-block bg-none pl-[16px] pt-0 text-center md:hidden"
            >
              <PhoneIcon className="relative -mt-[3px] mr-[14px] inline-block h-[25px] w-[20px] text-[#01ff13]" />
            </a>
          </div>
        </div>
      </div>
      {/* ref .row.sec1-content — 15% down (9% below 768) */}
      <div className={cx(ROW, 'mt-[15%] max-md:mt-[9%]')}>
        <div className={cx(COL, 'md:max-w-[75%] md:flex-[0_0_75%]')}>
          <h1
            className={cx(
              FONT_RC,
              'mb-[8px] inline-block text-[40px] font-bold uppercase leading-[1.2] text-white max-md:mt-[25px] max-md:block max-md:px-[17px] max-md:text-[30px] md:mt-[37px] md:max-lg:text-[25px] [@media(min-width:992px)_and_(max-width:1279px)]:text-[31px]',
            )}
          >
            <span className="hidden md:inline">
              <span className="bg-[#9500FF] px-[17px] text-[40px] md:max-lg:text-[24px] [@media(min-width:992px)_and_(max-width:1279px)]:text-[31px]">
                GET THE BEST OF THE FUTURE IN THE PRESENT
              </span>
              <br />
              <span className="bg-[#1b1e1b] px-[17px]">WITH OUR BACHELOR OF DESIGN PROGRAMS</span>
            </span>
            <span className="md:hidden">
              {['GET THE BEST', 'OF THE FUTURE', 'IN THE PRESENT'].map((l) => (
                <span key={l}>
                  <span className="bg-[#9500FF] px-[17px] text-[32px]">{l}</span>
                  <br />
                </span>
              ))}
              {['WITH OUR', 'BACHELOR OF', 'DESIGN'].map((l) => (
                <span key={l}>
                  <span className="bg-[#1b1e1b] px-[17px] text-[32px]">{l}</span>
                  <br />
                </span>
              ))}
              <span className="bg-[#1b1e1b] px-[17px] text-[32px]">PROGRAMS</span>
            </span>
          </h1>
        </div>
        <div className={cx(COL, 'md:max-w-[25%] md:flex-[0_0_25%]')}>
          <HeroForm />
        </div>
      </div>
    </div>
  );
}

function HeroForm() {
  return (
    <form
      id="enquire-form"
      className="max-md:ml-[13px] max-md:mt-[5%] max-md:w-[90%] max-md:bg-[#ebebeb] max-md:p-[6%]"
    >
      <h2 className="mb-[8px] text-[20.16px] font-bold leading-[1.2] text-[#9500FF] md:hidden">Enquire Now</h2>
      <Field id="name" label="Name" placeholder="Type your Name" />
      <Field id="email" label="Email" type="email" placeholder="Type your email id" />
      <Field id="phone" label="Phone" placeholder="Type your phone" />
      <ProgramSelect id="program" arrow="dark" />
      <button
        type="submit"
        disabled
        className="mt-[12%] block w-full rounded-none border border-solid border-transparent bg-[#9500FF] px-[12px] py-[6px] text-center text-[14px] font-bold leading-[1.5] text-white hover:bg-[#1b1e1b]"
      >
        Submit
      </button>
    </form>
  );
}

function Features() {
  const head = cx(FONT_RC, 'mb-[8px] font-bold uppercase leading-[1.2] text-white');
  return (
    <section className="bg-[#1b1e1b] px-[3%] py-[50px] max-md:px-[15px] max-md:pb-[35px] max-md:pt-[220px]">
      <div className={CONTAINER}>
        <div className={ROW}>
          <div className={cx(COL, 'md:max-w-[25%] md:flex-[0_0_25%]')}>
            <img src={`${IMG}/fold_2_triangle.png`} alt="" className="absolute right-[21px] top-[4px] md:hidden" />
            <h3 className={cx(head, 'text-[24px] md:hidden')}>
              PROGRAM<span className="text-[#01ff13]"> FEATURES</span>
            </h3>
            <h3 className={cx(head, 'text-[40px] max-md:hidden')}>
              PROGRAM
              <br /> <span className="text-[#01ff13]">FEATURES</span>
            </h3>
          </div>
          <div className={cx(COL_BOX, 'pl-[15px] pr-[15px] md:max-w-[75%] md:flex-[0_0_75%] md:pl-[107px]')}>
            <img
              src={`${IMG}/fold_2_triangle.png`}
              alt=""
              className="absolute right-[-28px] top-[-32px] max-md:hidden md:max-lg:right-0 [@media(min-width:992px)_and_(max-width:1298px)]:right-0"
            />
            <div className={cx(ROW, 'max-md:mt-[15px]')}>
              {FEATURES.map((f) => (
                <div key={f.icon} className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
                  <span className="text-white max-md:mt-[2%] max-md:flex">
                    <img src={f.icon} alt="" className="align-middle max-md:relative max-md:my-auto max-md:mr-[15px] max-md:h-fit" />
                    <p className="mb-[16px] mt-[11px] text-[13.46px] font-medium uppercase max-md:text-[14px]">
                      {f.label.map((l, i) => (
                        <span key={l}>
                          {i > 0 && <br />}
                          {l}
                        </span>
                      ))}
                    </p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* `last`: the mobile 7th card's text row also holds a hidden image, so its `.card-text` is not
   `:last-child` and keeps Bootstrap's 1rem bottom margin */
function ProgramCard({ card, sideBullet = true, last = true }) {
  return (
    <div className="relative flex min-w-0 flex-col break-words rounded-[4px] bg-white">
      <div className="relative">
        <img src={card.image} alt="" className="block w-full rounded-t-[3px] max-md:relative" />
        <div className="absolute bottom-0 bg-[#9500FF] p-[7px] font-semibold uppercase text-white md:max-lg:text-[13px]">
          {card.title}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative inline-flex align-middle">
          <ScrollToButton
            target="enquire-form"
            title="Go to top"
            className="relative mt-[7px] w-[140px] cursor-pointer rounded-none border-0 bg-[#01ff13] p-[7px] text-[14px] leading-[1.5] text-black outline-none"
          >
            Know More
          </ScrollToButton>
        </div>
      </div>
      <div className="flex-auto py-[20px] pl-0 pr-[20px]">
        <div className="-mr-[15px] ml-0 flex flex-wrap">
          <img src={`${IMG}/MBA_Arrow_Bottom.png`} alt="" className="mb-[10px] ml-auto h-max max-md:relative" />
        </div>
        <div className="-mr-[15px] ml-0 flex flex-wrap">
          <p
            className={cx(
              last ? 'mb-0' : 'mb-[16px]',
              'w-[97%] pr-[11px] text-[14px] text-black max-md:h-auto max-md:pr-[9px] max-md:text-[13px] md:max-lg:pr-[9px] md:max-lg:text-[13px]',
              'h-[45px] md:max-lg:h-[58px]',
            )}
          >
            {card.text}
          </p>
        </div>
        <h5 className="mb-[8px] h-[25px] text-black max-md:h-auto" />
        {card.bullet && sideBullet && (
          <img src={`${IMG}/bullets.png`} alt="" className="float-right my-auto h-max max-md:hidden" />
        )}
        <div className="-mr-[15px] ml-0 flex flex-wrap">
          <ul className="mb-[16px] list-disc pl-[15px] text-[14px] text-[#01ff13]">
            {card.items.map((it) => (
              <li key={it}>
                <span className="text-black">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* `.row.row-cols-1.row-cols-sm-2.row-cols-md-3.row-top` — BS4 row-cols (sm = 576), 50px apart with a hairline */
const CARD_ROW =
  '-mx-[15px] flex flex-wrap border-b border-solid border-b-[rgba(0,0,0,.1)] md:mt-[50px] max-md:border-b-0 [&>*]:flex-[0_0_100%] [&>*]:max-w-full n576:[&>*]:max-w-[50%] n576:[&>*]:flex-[0_0_50%] md:[&>*]:max-w-[33.333333%] md:[&>*]:flex-[0_0_33.333333%]';

function Programs() {
  const rows = [CARDS.slice(0, 3), CARDS.slice(3, 6)];
  return (
    <section className="relative px-[3%] pt-[75px] max-md:-mt-[30%] max-md:overflow-x-hidden max-md:px-0 max-md:pt-[100px] md:max-lg:pt-[46px] [@media(min-width:992px)_and_(max-width:1298px)]:pb-[5px] [@media(min-width:992px)_and_(max-width:1298px)]:pt-[5px]">
      <div className={cx(CONTAINER_BOX, 'px-[15px] max-md:px-[30px]')}>
        <div className={ROW}>
          <div className={cx(COL, 'max-md:-mb-[35px] md:max-w-full md:flex-[0_0_100%]')}>
            <h2
              className={cx(
                FONT_RC,
                'mb-[8px] text-[40px] font-bold italic leading-[1.2] text-white max-md:mb-[31%] max-md:mt-[20%] max-md:text-[29.55px] md:max-lg:text-[39px] [@media(min-width:992px)_and_(max-width:1298px)]:mt-[55px]',
              )}
            >
              <span className="max-md:hidden">
                <span className="bg-[#9500FF] px-[17px] text-[41.21px]">FUTURISTIC</span>
                <br />
                <span className="bg-[#1b1e1b] px-[17px] text-[45px] [@media(min-width:992px)_and_(max-width:1298px)]:text-[42px]">
                  BACHELOR IN DESIGN PROGRAMS
                </span>
              </span>
              <span className="md:hidden">
                <span className="bg-[#9500FF] pl-[15px] pr-[21px] text-[31px]">FUTURISTIC</span>
                <br />
                {[' BACHELOR ', ' IN DESIGN', ' PROGRAMS'].map((l) => (
                  <span key={l} className="-mt-px block w-fit bg-[#1b1e1b] px-[17px] text-[31px]">
                    {l}
                  </span>
                ))}
              </span>
            </h2>
            <img src={`${IMG}/MBA_Arrow_Bottom.png`} alt="" className="absolute top-[340px] max-md:hidden" />
          </div>
        </div>
        {rows.map((row, r) => (
          <div key={r} className={CARD_ROW}>
            {row.map((c) => (
              <div key={c.title} className={cx(COL_BOX, 'px-[15px]')}>
                <ProgramCard card={c} />
              </div>
            ))}
          </div>
        ))}
        {/* the 7th card below 768 (`.col.mobile-visible.last-mobile-card`, no gutters) */}
        <div className="relative w-full px-0 md:hidden">
          <ProgramCard card={CARDS[6]} sideBullet={false} last={false} />
        </div>
      </div>
    </section>
  );
}

function DesignYourFuture() {
  return (
    <section className="relative pb-[13px] pt-[3%] max-md:-mx-[15px] max-md:pb-0 max-md:pt-[10px]">
      <div className={CONTAINER}>
        <div className={ROW}>
          <div className={cx(COL, 'max-md:hidden md:max-w-[33.333333%] md:flex-[0_0_33.333333%]')}>
            {/* this copy of the 7th card carries the floated `bullets.png` the mobile copy hides */}
            <ProgramCard card={{ ...CARDS[6], bullet: true }} />
          </div>
          <div
            className={cx(
              COL_BOX,
              'h-fit bg-[#1b1e1b] pb-[65px] pl-[52px] pr-[15px] pt-[75px] text-white md:ml-[12%] md:max-w-[50%] md:flex-[0_0_50%]',
              'max-md:px-[28px] max-md:pb-[35px] max-md:pt-[45px] md:max-lg:pl-[26px]',
            )}
          >
            <p className="mb-[16px] w-[401px] text-[20px] italic max-md:w-[80%] max-md:text-[22.32px] md:max-lg:w-auto">
              {DESIGN_YOUR_FUTURE[0]}
            </p>
            {DESIGN_YOUR_FUTURE.slice(1).map((t) => (
              <p key={t} className="mb-[16px] w-[401px] max-lg:w-auto">
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BandHeading({ first, second, coro = false }) {
  return (
    <h2
      className={cx(
        FONT_RC,
        'mb-[8px] text-[40px] font-bold italic leading-[1.2] text-white max-md:mb-[60px] max-md:text-[29.55px] md:max-lg:text-[39px]',
        coro ? 'max-md:mt-[3%]' : 'max-md:mt-[16%]',
      )}
    >
      <span className="bg-[#9500FF] px-[17px] text-[40.21px] max-md:text-[31px]">{first}</span>
      <br className="md:hidden" />
      <span className="bg-[#1b1e1b] px-[17px] text-[40px] max-md:-mt-px max-md:w-fit max-md:pl-[17px] max-md:pr-[10px] max-md:text-[31px]">
        {second}
      </span>
      <br />
    </h2>
  );
}

function Placement() {
  return (
    <section>
      <div className={CONTAINER}>
        <div className="relative w-full px-[15px] max-md:-mb-[35px]">
          <BandHeading first="PLACEMENT" second="PARTNERS " />
        </div>
      </div>
      <div
        className={cx(
          CONTAINER_BOX,
          'mt-[20px] block w-full bg-white px-0 pb-[75px] pt-[20px] max-md:pb-[35px] max-md:pt-[13px] [@media(min-width:992px)_and_(max-width:1298px)]:pb-[50px]',
        )}
      >
        <div className="m-auto grid w-[993px] max-w-[96%] grid-cols-6 gap-x-[10px] gap-y-[25px] max-md:grid-cols-3">
          {LOGOS.map((l) => (
            <img
              key={l}
              src={l}
              alt=""
              className="m-auto block w-[150px] max-md:relative max-md:w-[80px] md:max-lg:w-[100px] [@media(min-width:992px)_and_(max-width:1298px)]:w-[130px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial({ t }) {
  return (
    <div
      className={cx(
        'mx-[10px] my-[80px] px-[50px] pb-[50px] shadow-[0_0_4px_#cacaca]',
        t.dark ? 'bg-black text-white' : 'bg-white',
      )}
    >
      <div className="h-[48px] text-center">
        <img src={t.photo} alt="shazia" className="m-auto w-[150px] max-w-full -translate-y-1/2 align-middle" />
      </div>
      <span className="text-[48px]">“</span>
      <p className="mb-[16px]" />
      <p className="-mt-[22px] mb-[16px] h-[170px] whitespace-normal text-[14px] leading-[1.4em] md:max-lg:h-[300px]">{t.quote}</p>
      <p className="mb-[16px]" />
      <h3 className="mb-[8px] whitespace-normal text-[16px] font-medium leading-[1.4em]">{t.name}</h3>
    </div>
  );
}

function Testimonials() {
  const groups = [TESTIMONIALS.slice(0, 3), TESTIMONIALS.slice(3, 6), TESTIMONIALS.slice(6, 9)];
  return (
    <>
      <section className="max-md:hidden">
        <div className={CONTAINER}>
          <div className="relative w-full px-[15px]">
            <BandHeading first="HEAR FROM" second="OUR STUDENTS " />
          </div>
          <BsCarousel label="Hear from our students">
            {groups.map((g, i) => (
              <div key={i} className={cx(CARD_ROW, 'mt-[50px]')}>
                {g.map((t) => (
                  <div key={t.name} className="relative w-[360px] shrink-0">
                    <Testimonial t={t} />
                  </div>
                ))}
              </div>
            ))}
          </BsCarousel>
        </div>
      </section>
      <section className="md:hidden">
        <div className={cx(CONTAINER_BOX, 'px-0')}>
          <div className="relative -mb-[35px] w-full px-[15px]">
            <BandHeading first="HEAR FROM" second="OUR STUDENTS " coro />
          </div>
          <BsCarousel label="Hear from our students">
            {TESTIMONIALS.map((t) => (
              <Testimonial key={t.name} t={t} />
            ))}
          </BsCarousel>
        </div>
      </section>
    </>
  );
}

function Footer() {
  const label = 'text-[#e7e7e7]';
  return (
    <footer>
      <section className="bg-[#1b1e1b] px-[3%] py-[100px] max-md:-mt-[20px] max-md:px-[5%] max-md:py-[15%] md:max-lg:mt-[43px] [@media(min-width:992px)_and_(max-width:1298px)]:-mt-[15px]">
        <div className={cx(CONTAINER, 'relative')}>
          <div className={ROW}>
            <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
              <h3 className="mb-[8px] text-[24px] font-bold uppercase leading-[1.2] text-white">
                Talk to <br />
                us
              </h3>
              <p className="mb-[16px] mt-[9%] text-[14px] text-[#e7e7e7] max-md:hidden">
                ATLAS SKILLTECH UNIVERSITY, <br />
                Tower 1 - Equinox Business Park,
                <br />
                Off Bandra-Kurla Complex (BKC),
                <br />
                Mumbai – 400 070.
              </p>
              <a href={PHONE} className="text-[13.46px] font-medium text-[#01ff13] hover:text-white hover:no-underline max-md:hidden">
                <PhoneIcon className="mr-[4px] inline-block h-[13px] w-[11px] align-[-1px] text-[#01ff1375]" /> +91 7718865341
              </a>
            </div>
            <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
              <form id="footer_enquire-form" className="max-md:ml-0 max-md:mt-[5%] max-md:w-[90%] max-md:bg-transparent max-md:p-0">
                <div className={ROW}>
                  <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
                    <Field id="footer-name" label="Name" placeholder="Type your Name" labelClass={label} />
                  </div>
                  <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
                    <Field id="footer-email" label="Email" type="email" placeholder="Type your email id" labelClass={label} />
                  </div>
                  <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
                    <Field id="footer-phone" label="Phone" placeholder="Type your phone" labelClass={label} />
                  </div>
                  <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
                    <ProgramSelect id="footer-program" labelClass={label} arrow="light" />
                  </div>
                  <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
                    <button
                      type="submit"
                      disabled
                      className="mt-[20px] block w-full rounded-none border border-solid border-transparent bg-[#01ff13] px-[12px] py-[6px] text-center text-[14px] font-bold leading-[1.5] text-black hover:bg-[#9500FF] hover:text-white max-md:bg-[#9500FF] max-md:text-white"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <div className="relative w-full px-[15px] md:hidden">
                <p className="mb-[16px] mt-[9%] text-[14px] text-[#e7e7e7]">
                  ATLAS SKILLTECH UNIVERSITY
                  <br /> Tower 1 - Equinox Business Park, Off Bandra-Kurla Complex (BKC), Mumbai – 400 070.
                </p>
                <a href={PHONE} className="text-[14px] font-medium text-[#01ff13] hover:text-white hover:no-underline">
                  <PhoneIcon className="mr-[4px] inline-block h-[13px] w-[11px] align-[-1px] text-[#01ff1375]" /> +91 7718865341
                </a>
              </div>
            </div>
          </div>
          <img
            src={`${IMG}/footer-line.png`}
            alt=""
            className="absolute bottom-[-99px] left-[363px] max-md:bottom-[-55px] max-md:left-[27px] md:max-lg:bottom-[-54px] md:max-lg:left-[194px] [@media(min-width:992px)_and_(max-width:1298px)]:bottom-[-97px] [@media(min-width:1450px)]:bottom-[-100px]"
          />
        </div>
      </section>
      <section className="bg-[#0e0f0e] p-[2%] max-lg:text-center [@media(min-width:992px)_and_(max-width:1298px)]:text-center">
        <div className={cx(CONTAINER, 'text-white')}>
          <p className="mb-[16px] mt-[1%] text-[10.58px] max-md:mt-[3%] max-md:text-[14px]">
            ©<CurrentYear />. Atlas SkillTech University, All Rights Reserved.
          </p>
        </div>
      </section>
    </footer>
  );
}
