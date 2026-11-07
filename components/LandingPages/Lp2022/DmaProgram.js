/* eslint-disable @next/next/no-img-element -- plain <img> as the reference renders it (project convention) */
import { cx } from '@/lib/cx';
import { LP2X_FONT_VARS } from '@/lib/landing/lp2x/fonts';
import { LP2022_RC_VARS } from '@/lib/landing/lp2022/fonts';
import {
  DIFFERENT,
  EDGE,
  ELIGIBILITY,
  EMAIL,
  FUTURE,
  HIGHLIGHTS,
  LOGOS_DESKTOP,
  LOGOS_MOBILE,
  PHONE,
  SKILLS,
  SLIDES,
  TABS,
  TESTS,
} from '@/lib/landing/lp2022/dmaprogram1';
import OwlCarousel from '../shared/OwlCarousel';
import CurrentYear from '../shared/CurrentYear';
import { DmaFloatingButtons, DmaTabs } from './DmaProgramClient';
import { COL, CONTAINER, CONTAINER_BOX, FONT_RC, FONT_ROBOTO, PhoneIcon, ROW } from './ui';

/**
 * /lp2022/DMAprogram1 — "MBA in Digital Marketing & Advertising" campaign page. Reference
 * `lp2022/DMAprogram1/index.php` (Bootstrap 4.6, main.css / responsive.css, Owl Carousel, Roboto +
 * Roboto Condensed). Its own header and footer. Measured on production at 1920 / 1440 / 768 / 390.
 *
 * Sections: logo bar + floating "APPLY NOW" form (>= 768, over the slider) | three-slide hero (Owl,
 * dots) | the same form below the hero (< 768) + ADMISSIONS OPEN 2022 | why it's different (6 cards) |
 * HIGHLIGHTS | OUR FUTURE-READY MBA | three specialisation tabs (tools slider, projects, career
 * pathways) | skills / eligibility / entrance test | ATLAS EDGE | INDUSTRY PARTNERS | footer. Fixed
 * "Enquire Now" and "Download Brochure" buttons appear after 500px of scroll.
 *
 * Forms (hero, mobile, footer, brochure modal) post to `submit.php` upstream — not ported, no CRM on
 * this page: rendered inert (see ui.js). Not loaded: Google reCAPTCHA (its box is kept as an empty
 * 60px form group; production itself shows reCAPTCHA's "invalid site key" error there), Google Ads /
 * Analytics and the Facebook Pixel. Reference defects not reproduced: windows-1252 bytes under a
 * UTF-8 charset; two `<img>` with no src in the logo grid (kept as empty cells).
 */
export default function DmaProgram() {
  return (
    <div className={cx(LP2X_FONT_VARS, LP2022_RC_VARS, FONT_ROBOTO, 'overflow-x-hidden bg-white text-[16px] leading-[1.5] text-[#212529] subpixel-antialiased')}>
      <section className="relative">
        <LogoBar />
        <Hero />
      </section>
      <section>
        <div className="relative -mt-[10px] w-full bg-[#1b1e1b] px-[15px] py-[40px] md:hidden">
          <PhoneLine />
          <h5 className={FORM_HEAD}>APPLY NOW</h5>
          <EnquiryForm id="enquire-form2" />
        </div>
        <div
          className={cx(
            CONTAINER,
            'relative z-[8] -mt-[33px] border-b-[5px] border-solid border-b-[#FFF501] bg-[#1B1E1B] max-md:-mt-px max-md:pb-[40px]',
          )}
        >
          <h1 className="mb-[8px] pt-[15px] text-center text-[40px] font-medium leading-[1.2] text-[#FFF501]">ADMISSIONS OPEN 2022</h1>
          <p className="mb-[16px] text-center text-white">
            3 Specializations <span className="mx-[10px]">|</span> 500+ Corporate Connects{' '}
            <span className="mx-[10px]">|</span> 20+ Futuristic Skills
          </p>
        </div>
      </section>
      <Different />
      <Highlights />
      <Future />
      <section>
        <div className={cx(CONTAINER, 'border-b border-solid border-b-[#9500ff]')}>
          <div className={ROW}>
            <DmaTabs tabs={TABS} />
          </div>
        </div>
      </section>
      <Skills />
      <Edge />
      <Partners />
      <DmaFloatingButtons />
      <Footer />
    </div>
  );
}

const FORM_HEAD =
  'mb-[5px] bg-[#FFF501] py-[5px] text-center text-[25.16px] font-bold leading-[1.2] text-black max-md:mx-auto max-md:mt-[5%] max-md:w-[90%] max-md:text-[20.16px] md:mt-[50px] md:max-lg:text-[19.16px]';

function PhoneLine() {
  return (
    <h4 className="mb-[8px] text-center text-[24px] [font-weight:bolder] leading-[1.2] md:max-lg:text-[16px]">
      {' '}
      <a href={PHONE.href} className="text-white hover:text-white hover:underline">
        <PhoneIcon className="inline-block h-[24px] w-[19px] align-[-3px]" /> {PHONE.label}
      </a>
    </h4>
  );
}

const INPUT =
  'block h-[35px] w-full border-0 border-b border-solid border-b-[#ccc] bg-transparent py-[6px] pl-0 pr-[12px] text-[14px] font-normal leading-[1.5] text-[#495057] placeholder:text-[#6c757d] focus:outline-none';

function Field({ id, name, label, type = 'text', placeholder, labelClass = 'text-[#1B1E1B]' }) {
  return (
    <div className="mb-[16px] h-[60px]">
      <label htmlFor={id} className={cx('mb-0 inline-block text-[14px] font-bold', labelClass)}>
        {label}
      </label>
      <input type={type} id={id} name={name} placeholder={placeholder} className={INPUT} />
    </div>
  );
}

/* the hero / mobile form (`#enquire-form`, `#enquire-form2`): white, 15px radius */
export function EnquiryForm({ id, captcha = true }) {
  return (
    <form
      id={id}
      className="rounded-[15px] bg-white pb-[20px] pl-[20px] pr-[20px] pt-[21px] max-md:mx-auto max-md:mt-[5%] max-md:w-[90%] max-md:p-[6%]"
    >
      <Field id={`${id}-name`} name="name" label="Name" placeholder="Type your name" />
      <Field id={`${id}-email`} name="email" label="Email Id" type="email" placeholder="Type your email id" />
      <Field id={`${id}-phone`} name="phone" label="Mobile Number" placeholder="Type your mobile number" />
      {captcha && <Field id={`${id}-city`} name="city" label="City" placeholder="Type your city" />}
      {/* reCAPTCHA's group — the widget itself is not loaded (see header) */}
      {captcha && <div className="mb-[16px] h-[60px]" />}
      <button
        type="submit"
        disabled
        className="mt-[15%] block w-full rounded-none border border-solid border-transparent bg-[#9500FF] px-[12px] py-[6px] text-center text-[14px] font-bold leading-[1.5] text-white hover:bg-[#1b1e1b] max-md:mt-[17%] md:max-lg:mt-[32%]"
      >
        Submit
      </button>
    </form>
  );
}

/* `.logo-row-section` — absolute over the slider; the >= 768 form hangs from it (`.form-class`) */
function LogoBar() {
  return (
    <div className="absolute z-[5] w-full max-md:pt-[2%]">
      <div className={cx(CONTAINER, 'mt-[1%]')}>
        <div className={cx(ROW, 'pt-[3%] max-md:mx-auto')}>
          <div className={cx(COL, 'max-w-[75%] flex-[0_0_75%] md:max-w-[50%] md:flex-[0_0_50%]')}>
            <div className="inline-flex">
              <img
                src="/assets/lp2022/DMAprogram1/atlas_new_logo.png"
                alt=""
                className="w-[260px] max-md:relative max-md:mx-auto max-md:mt-[3px] max-md:w-[200px]"
              />
            </div>
          </div>
          <div
            className={cx(
              'absolute z-[1] w-[339px] max-w-[25%] px-[15px] max-md:hidden',
              'right-[6%] [@media(min-width:1450px)_and_(max-width:1535px)]:right-[11%] [@media(min-width:1536px)_and_(max-width:1749px)]:right-[15%] [@media(min-width:1750px)]:right-[20%]',
            )}
          >
            <PhoneLine />
            <h5 className={FORM_HEAD}>APPLY NOW</h5>
            <EnquiryForm id="enquire-form" />
          </div>
        </div>
      </div>
    </div>
  );
}

const PHOTO = {
  'solo-img22': { w: 599, h: 783 },
  'solo-img11': { w: 566, h: 752 },
  'solo-img33': { w: 568, h: 788 },
};

function Lines({ lines, className, gapAfter }) {
  return lines.map((l, i) => (
    <span key={l}>
      <span className={className}>{l}</span>
      <br />
      {/* `<br class="br-height">` (display: block, 10px top margin) — 40px more than a line break */}
      {gapAfter === i && <span className="mt-[10px] block h-[30px]" />}
    </span>
  ));
}

function Slide({ s }) {
  const head = 'px-[17px] text-[45px] max-md:px-[7px] max-md:text-[40px] md:max-lg:text-[35px] [@media(min-width:992px)_and_(max-width:1279px)]:text-[40px]';
  const sub2 = "px-[17px] font-['Roboto'] text-[19px] max-md:text-[17px]";
  const copy = (mobile) => (
    <>
      <h1
        className={cx(
          FONT_RC,
          'mb-[8px] mt-[20%] inline-block text-[40px] font-bold leading-none text-white md:uppercase',
          'max-md:mt-[45%] max-md:px-[7px] md:max-lg:mt-[40%] [@media(min-width:540px)_and_(max-width:720px)]:mt-[24%]',
        )}
      >
        <Lines lines={mobile ? s.mobileHeading : s.heading} className={head} gapAfter={s.gapAfter} />
      </h1>
      <p
        className={cx(
          FONT_RC,
          'mb-[16px] mt-[2%] leading-[normal] text-white max-md:mt-[4%]',
          mobile && s.mobilePara3 && 'max-md:mt-[5%]',
        )}
      >
        <span className="px-[17px] text-[30px] text-[#FFF501] max-md:font-['Roboto'] max-md:text-[25px] max-md:[font-weight:bolder]">MBA</span>
        <br />
        <span className={sub2}>in Digital Marketing &amp; Advertising</span>
        <br />
      </p>
      <p className={cx(FONT_RC, '-mt-[1%] mb-[16px] leading-[normal] text-white max-md:-mt-[4%]')}>
        <span className="ml-[17px] bg-white px-[17px] text-[25px] leading-[2] text-[#9500ff] max-md:pb-px max-md:text-[22px]">
          {s.lines2[0]}
        </span>
        <br />
        <span className={cx(sub2, 'font-bold')}>{s.lines2[1]}</span>
        <br />
        <span className={cx(sub2, 'font-bold')}>{s.lines2[2]}</span>
        <br />
      </p>
    </>
  );
  return (
    <div className="h-[740px] bg-[#9500FF] max-md:h-[575px]">
      <div className={CONTAINER}>
        <div className={cx(ROW, 'max-md:mt-0')}>
          <img
            src={s.photo}
            alt=""
            width={PHOTO[s.photoClass].w}
            height={PHOTO[s.photoClass].h}
            className="mx-auto block w-min max-w-none max-md:hidden"
          />
          {/* `.banner11-col` / `.banner33-col` — `position: absolute` over the photograph */}
          <div className={cx('absolute w-full max-w-[75%] px-[15px] max-md:hidden', s.colClass === 'banner33-col' && 'z-[1]')}>
            {copy(false)}
          </div>
          <div className="absolute w-full px-[15px] md:hidden">{copy(true)}</div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <OwlCarousel
      label="MBA in Digital Marketing & Advertising"
      pvClass="[--pv:1]"
      margin={20}
      dots={{
        className: 'absolute ml-[48%] -mt-[65px] text-center leading-none max-md:ml-[40%] max-md:-mt-[25px]',
        dotClassName: 'inline-block cursor-pointer p-0 align-top',
        spanClassName: 'mx-[7px] my-[5px] block h-[10px] w-[10px] rounded-[30px] bg-white',
        activeClassName: 'mx-[7px] my-[5px] block h-[10px] w-[10px] rounded-[30px] border border-solid border-white bg-transparent',
      }}
    >
      {SLIDES.map((s) => (
        <Slide key={s.photo} s={s} />
      ))}
    </OwlCarousel>
  );
}

/* BS4 `.card-deck` with main.css's auto side margins: a centred row of equal cards from 576 */
const DECK = 'mx-auto my-[50px] text-center n576:flex n576:flex-wrap';
const DECK_CARD_BOX = 'relative flex min-w-0 flex-col break-words bg-white n576:mx-[15px] n576:mb-0 n576:flex-[1_0_0%]';
const DECK_CARD = `${DECK_CARD_BOX} max-lp:mb-[15px]`;

function Different() {
  return (
    <section className="pt-[50px]">
      <div className={cx(CONTAINER, 'border-b border-solid border-b-[#9500ff]')}>
        <h1 className="mb-[8px] text-center text-[40px] font-bold leading-[1.2]">
          <span className="text-[#9500FF]">MBA DMA</span> AT ATLAS SKILLTECH{' '}
        </h1>
        <h1 className="mb-[8px] text-center text-[40px] font-bold leading-[1.2]">UNIVERSITY IS DIFFERENT</h1>
        <h4 className="my-[20px] text-center text-[24px] font-bold leading-[1.2] text-[#9500FF]">HERE’S HOW</h4>
        <h4 className="mb-[8px] text-center text-[24px] font-bold leading-[1.2] max-md:text-[20px]">Truly interdisciplinary with a strong</h4>
        <h4 className="mb-[8px] text-center text-[24px] font-bold leading-[1.2] max-md:text-[20px]">focus on skills of tomorrow</h4>
        {[DIFFERENT.slice(0, 3), DIFFERENT.slice(3)].map((deck, i) => (
          <div key={i} className={DECK}>
            {deck.map((c) => (
              <div key={c.title} className={DECK_CARD}>
                <img src={c.icon} alt="Card image cap" className="mx-auto h-[100px] w-fit max-md:relative" />
                <div className="flex-auto px-[20px] pb-0 pt-[20px]">
                  <h5 className="mb-[12px] text-[20px] font-bold leading-[1.2]">{c.title}</h5>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function IconCard({ icon, children }) {
  return (
    <div className={DECK_CARD}>
      <img src={icon} alt="Card image cap" className="mx-auto h-[100px] w-fit max-md:relative" />
      <div className="relative mx-auto w-full max-w-[58.333333%] flex-none p-[20px]">{children}</div>
    </div>
  );
}

function Highlights() {
  return (
    <section className="pt-[50px]">
      <div className={CONTAINER}>
        <h2 className="mb-[8px] text-center text-[32px] font-bold leading-[1.2]">HIGHLIGHTS</h2>
        <div className={DECK}>
          {HIGHLIGHTS.map((h) => (
            <IconCard key={h.icon} icon={h.icon}>
              <p className="mb-[16px]">{h.text}</p>
            </IconCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Future() {
  return (
    <section className="pb-[50px]">
      <h2 className="mb-[8px] text-center text-[32px] font-bold leading-[1.2]">OUR FUTURE-READY</h2>
      <h2 className="mb-[8px] text-center text-[32px] font-bold leading-[1.2]">
        <span className="text-[#9500FF]">MBA</span> IN DIGITAL MARKETING &amp; ADVERTISING
      </h2>
      <div
        className={cx(
          CONTAINER_BOX,
          'mt-[30px] flex items-center justify-center bg-[#1B1E1B] pl-[15px] pr-0 text-white max-md:inline-block max-md:px-0 max-md:pt-[40px]',
        )}
      >
        <div className="relative w-full max-w-full flex-[1_0_0%] px-[15px] max-md:pb-[35px] md:max-w-[58.333333%] md:flex-[0_0_58.333333%]">
          {FUTURE.map((t) => (
            <p
              key={t}
              className="relative mb-[16px] w-full px-[15px] text-[21px] font-bold md:max-lg:text-[15px]"
            >
              {t}
            </p>
          ))}
        </div>
        <div className="relative w-full pl-[15px] pr-0 max-md:px-0 md:max-w-[41.666667%] md:flex-[0_0_41.666667%]">
          <img src="/assets/lp2022/DMAprogram1/sec5-img.webp" alt="" className="block w-full max-md:relative" />
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const li = 'list-none bg-[#9500FF] pl-[20px] pr-[5px] text-[18px] text-white max-md:mx-0 max-md:mb-0 max-md:py-[10px]';
  return (
    <section className="pt-[50px]">
      <div className={CONTAINER}>
        <div className={ROW}>
          <div className={cx(COL, 'md:max-w-[33.333333%] md:flex-[0_0_33.333333%]')}>
            <h1 className="mb-[8px] text-[40px] font-bold leading-[1.2]">
              <span>SKILLS TO</span>
              <br />
              <span>POWER YOUR</span>
              <br />
              <span className="text-[#9500FF]">FUTURE</span>
            </h1>
          </div>
          {SKILLS.map((list, k) => (
            <div key={k} className={cx(COL, 'md:max-w-[33.333333%] md:flex-[0_0_33.333333%]')}>
              <ul className="mb-[16px]">
                {list.map((s, i) => (
                  <li key={s} className={cx(li, 'm-[15px]', k === 1 && i === 0 ? 'max-md:mt-0' : 'max-md:mt-[15px]')}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="relative mt-[50px] w-full px-[15px]">
          <h2 className="mb-[8px] text-center text-[32px] font-bold leading-[1.2]">ELIGIBILITY</h2>
          <p className="my-[16px] text-center text-[20px]">
            <span>{ELIGIBILITY[0]}</span>
            <br />
            <span> {ELIGIBILITY[1]}</span>
          </p>
        </div>
        <div className="relative mt-[50px] w-full px-[15px]">
          <h2 className="mb-[8px] text-center text-[32px] font-bold leading-[1.2]">ENTRANCE TEST</h2>
          <p className="my-[16px] text-center">The following entrance tests are accepted:</p>
          <ul className="mb-[16px] text-center">
            {TESTS.map((t, i) => (
              <span key={t}>
                <li className="inline text-center text-[20px]">{t}</li>
                {i < TESTS.length - 1 && (
                  <>
                    {' '}
                    <span className="mx-[10px] inline-block h-[5px] w-[5px] rounded-[45px] bg-black align-middle" />{' '}
                  </>
                )}
              </span>
            ))}
          </ul>
          <h5 className="mx-auto my-[16px] w-fit rounded-[50px] bg-[#FFF501] p-[15px] text-center text-[20px] font-medium leading-[1.2]">OR</h5>
          <p className="my-[16px] text-center text-[20px]">Entrance test conducted by ATLAS SkillTech University</p>
          <p className="my-[16px] text-center text-[20px] font-bold">and</p>
          <p className="my-[16px] text-center text-[20px]">Group Discussion &amp; Personal Interview conducted by ATLAS SkillTech University</p>
        </div>
      </div>
    </section>
  );
}

function Edge() {
  return (
    <section className="mt-[50px]">
      <div className={CONTAINER}>
        <h2 className="mb-[8px] text-center text-[32px] font-bold leading-[1.2]">ATLAS EDGE</h2>
        <div className={DECK}>
          {EDGE.map((e) => (
            <div
              key={e.title}
              className={cx(
                e.cls === 'edge-card2' ? DECK_CARD_BOX : DECK_CARD,
                'rounded-none bg-[#9500FF] pt-[20px]',
                /* `.edge-card2`: 20px side margins; below 768 `margin: 40px 0 !important` (0 at 540-720) */
                e.cls === 'edge-card2' &&
                  'n576:mx-[20px] max-md:mx-0 max-md:my-[40px] [@media(min-width:540px)_and_(max-width:720px)]:my-0',
              )}
            >
              <img src={e.icon} alt="Card image cap" className="mx-auto h-[100px] w-fit max-md:relative" />
              <div className="flex-auto p-[20px] text-center">
                <h5 className="mb-[12px] bg-white py-[8px] text-[16px] font-bold leading-[1.2] text-black">{e.title}</h5>
                <p className="mb-[16px] text-white">{e.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="my-[50px]">
      <div className={cx(CONTAINER_BOX, 'mx-auto mt-[20px] block w-full bg-white px-[15px] max-md:hidden md:max-lg:px-0 md:max-lg:pb-[50px] md:max-lg:pt-[20px]')}>
        <h2 className="mb-[8px] text-center text-[32px] font-bold leading-[1.2]">INDUSTRY PARTNERS</h2>
        <div className="m-auto mt-[50px] grid max-w-full grid-cols-[repeat(6,1fr)] gap-x-[40px] gap-y-[25px]">
          {LOGOS_DESKTOP.map((l, i) =>
            l ? (
              <img key={i} src={l} alt="" className="m-auto block w-[115px] max-w-none md:max-lg:w-[100px]" />
            ) : (
              <span key={i} className="m-auto block w-[115px] md:max-lg:w-[100px]" />
            ),
          )}
        </div>
      </div>
      <div className={cx(CONTAINER_BOX, 'mx-auto mt-[20px] block w-full bg-white px-0 pb-[35px] pt-[13px] md:hidden')}>
        <h2 className="mb-[8px] text-center text-[32px] font-bold leading-[1.2]">INDUSTRY PARTNERS</h2>
        <div className="m-auto mt-[40px] grid w-[993px] max-w-[96%] grid-cols-[repeat(3,1fr)] gap-x-[10px] gap-y-[25px]">
          {LOGOS_MOBILE.map((l) => (
            <img key={l} src={l} alt="" className="relative m-auto block w-[80px]" />
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterAddress({ mobile }) {
  const a = 'font-medium text-[15.46px] text-white hover:text-white hover:no-underline max-md:text-[14px]';
  return (
    <>
      <a href={PHONE.href} className={a}>
        <PhoneIcon className="mr-[4px] inline-block h-[15px] w-[12px] align-[-2px] text-white" /> {PHONE.label}
        {mobile ? '' : '  '}
      </a>
      {mobile ? <br /> : ' '}
      <a href={`mailto:${EMAIL}`} className={a}>
        <EnvelopeIcon /> {EMAIL}
      </a>
    </>
  );
}

/* Font Awesome 4.7 `fa-envelope` (U+F0E0) */
function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 1792 1792" aria-hidden="true" fill="currentColor" className="mr-[4px] inline-block h-[15px] w-[15px] align-[-2px] text-white">
      <path d="M1792 710v794q0 66-47 113t-113 47H160q-66 0-113-47T0 1504V710q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38T639 1015q-91-64-262-182.5T172 690q-62-42-117-115.5T0 438q0-78 41.5-130T160 256h1472q65 0 112.5 47t47.5 113z" />
    </svg>
  );
}

function Footer() {
  const label = 'text-[#e7e7e7]';
  return (
    <footer>
      <section className="bg-black px-[3%] py-[85px] max-md:-mt-[20px] max-md:px-[5%] max-md:py-[15%]">
        <div className={cx(CONTAINER, 'relative')}>
          <div className={ROW}>
            <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
              <h3 className="mb-[8px] text-[26px] font-bold uppercase leading-[1.2] text-white">
                Talk to <br />
                us
              </h3>
              <p className="mb-[16px] mt-[9%] text-[#e7e7e7] max-md:hidden">
                <span className="font-bold">ATLAS</span> SKILLTECH UNIVERSITY, Equinox Business Park,
                <br />
                Tower No.1, Ambedkar Nagar, Kurla West, Mumbai – 400 070.
                <br />
              </p>
              <div className="max-md:hidden">
                <FooterAddress />
              </div>
              <div className="relative w-full pl-0 pr-[15px] text-white max-md:hidden">
                <p className="mb-[16px] mt-[9%] text-[#e7e7e7]">
                  ©<CurrentYear />. Atlas SkillTech University, All Rights Reserved.
                </p>
              </div>
            </div>
            <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
              <form className="max-md:mt-[5%] max-md:w-[90%] max-md:p-0">
                <h5 className="mb-[8px] text-[22px] font-medium leading-[1.2] text-white">APPLY NOW</h5>
                <div className={ROW}>
                  {[
                    ['name', 'Name', 'text', 'Type your name'],
                    ['email', 'Email Id', 'email', 'Type your email id'],
                    ['phone', 'Mobile Number', 'text', 'Type your mobile number'],
                    ['city', 'City', 'text', 'Type your city'],
                  ].map(([n, l, t, p]) => (
                    <div key={n} className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
                      <Field id={`footer-${n}`} name={n} label={l} type={t} placeholder={p} labelClass={label} />
                    </div>
                  ))}
                  <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
                    <button
                      type="submit"
                      disabled
                      className="mt-[25px] block w-full rounded-none border border-solid border-transparent bg-[#9500FF] px-[12px] py-[6px] text-center text-[14px] font-bold leading-[1.5] text-white"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <div className="relative w-full px-[15px] md:hidden">
                <p className="mb-[16px] mt-[9%] text-[14px] text-[#e7e7e7]">
                  ATLAS SKILLTECH UNIVERSITY
                  <br /> Equinox Business Park, Tower No.1, Ambedkar Nagar, Kurla West, Mumbai – 400 070.
                </p>
                <FooterAddress mobile />
                <div className="relative w-full pl-0 pr-[15px] text-white">
                  <p className="mb-[16px] mt-[9%] text-[14px] text-[#e7e7e7]">
                    ©<CurrentYear />. Atlas SkillTech University, All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
