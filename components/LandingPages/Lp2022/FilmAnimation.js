/* eslint-disable @next/next/no-img-element -- legacy landing page: images are the reference files, served as authored */
import { cx } from '@/lib/cx';
import { LP2022_POPPINS_VARS } from '@/lib/landing/lp2022/fonts';
import { ABOUT, ABOUT_VIDEO, ADDRESS, COURSES, NAV, PROGRAMS, TESTIMONIALS, WHY } from '@/lib/landing/lp2022/filmanimation';
import OwlCarousel from '../shared/OwlCarousel';
import { BrochureTrigger, Navbar, ScrollLink, Tabs } from './FilmAnimationClient';

const IMG = '/assets/lp2022/film-animation_26';

/**
 * /lp2022/film-animation_26 — "Have a story to tell?" (ATLAS School of Film and Animation: B.A (Hons)
 * Film Production / B.Voc 3D Animation & VFX). Reference `lp2022/film-animation_26/index.php`, live
 * at https://atlasuniversity.edu.in/lp2022/film-animation_26/. Bootstrap 4.4 + global.css, Owl 2.3.4,
 * Poppins. Its own header and footer. Measured on production at 1920 / 1440 / 768 / 390.
 *
 * global.css sizes almost everything in rem and moves the root font-size: 14px (≤ 767, line-height
 * 1), 15px (768–1024 — a `min/max-device-width: 768/1024px` block, so 1.2), 21px (1.4), 22px from
 * 1680 and 25px from 1920 (1.2). This page cannot touch <html>, so the root size is the `--r`
 * custom property on the wrapper and every rem value is `calc(var(--r) * n)`.
 *
 * Sections: fixed rotated side buttons (Apply Now / Download Brochure / Important Dates) | header
 * (logo + section links; Material "menu" collapse < 992) | hero (photo, heading, apply form) |
 * programme tabs (B.A (Hons) / B.Voc, each with five skewed sub-tabs) | About Us (YouTube) | Why
 * ATLAS? (five skewed tiles) | testimonials (Owl: 3 / 2 / 1 up) | Admission Process (infographic) |
 * Hiring Partners | footer.
 *
 * Forms: the hero form posted to `submit.php` (PHPMailer, includes/) and the brochure modal to
 * the same — not ported, no CRM on this page; both inert (no action, submit disabled). The
 * reCAPTCHA box is not loaded; its 78px slot is kept. GTM / gtag are not loaded. AOS: aos.css
 * 404s upstream (served as text/html), so nothing is hidden — content renders statically.
 *
 * Icons: Material Icons (menu, arrow_back_ios/forward_ios) and Font Awesome 4.7 (quote-left/right,
 * facebook/twitter/instagram) are inline SVGs. The footer address's "…and many more" is Big5
 * bytes upstream (0xA1 0x4B, painted as U+FFFD + "K"); the intended "…" is used. "Important
 * Dates", the social icons and the footer phone link to `#`, as authored.
 */
/* the root font size global.css sets on <html>, per range (see above), and the body line-height */
const VARS =
  '[--r:14px] [--lh:1] [@media(min-width:768px)_and_(max-width:1024px)]:[--r:15px] [@media(min-width:768px)_and_(max-width:1024px)]:[--lh:1.2] [@media(min-width:1025px)_and_(max-width:1679px)]:[--r:21px] [@media(min-width:1025px)_and_(max-width:1679px)]:[--lh:1.4] [@media(min-width:1680px)_and_(max-width:1919px)]:[--r:22px] [@media(min-width:1680px)]:[--lh:1.2] [@media(min-width:1920px)]:[--r:25px]';
const POPPINS = 'font-[family-name:var(--font-lp2022-poppins),var(--font-lp2022-poppins-ext),sans-serif]';
/* Bootstrap 4.4 `.container` (540/720/960/1140), 82% from 1680 where global.css widens it */
const BOX_RANGES =
  'mx-auto w-full [@media(min-width:576px)_and_(max-width:767px)]:max-w-[540px] [@media(min-width:768px)_and_(max-width:991px)]:max-w-[720px] [@media(min-width:992px)_and_(max-width:1199px)]:max-w-[960px] [@media(min-width:1200px)_and_(max-width:1679px)]:max-w-[1140px]';
const CONTAINER_BOX = `${BOX_RANGES} [@media(min-width:1680px)]:max-w-[1140px]`;
const CONTAINER = `${CONTAINER_BOX} px-[15px] max-md:max-w-[1160px]`;
/* `.page_header_overlay > .container, .testimonials > .container { max-width: 82% }` from 1680 */
const CONTAINER_82 = `${BOX_RANGES} [@media(min-width:1680px)]:max-w-[82%] px-[15px] max-md:max-w-[1160px]`;
const ROW = '-mx-[15px] flex flex-wrap';
const TEXT = 'text-[length:var(--r)] leading-[var(--lh)]';

export default function FilmAnimation() {
  return (
    <div className={cx(LP2022_POPPINS_VARS, VARS, POPPINS, TEXT, 'overflow-x-hidden bg-white font-normal text-[#141414]')}>
      <FloatingButtons />
      <Header />
      <Hero />
      <ProgramTabs />
      <About />
      <WhyAtlas />
      <Testimonials />
      <Admission />
      <Partners />
      <Footer />
    </div>
  );
}

/* `.page_floating_btn_wraper`: rotated -90° about its top-right corner, fixed (absolute < 768) */
function FloatingButtons() {
  const a =
    'mx-[calc(var(--r)*0.1)] max-w-max rounded-[calc(var(--r)*0.3)] bg-[#9400ff] p-[0.5em] text-center text-[calc(var(--r)*0.75)] font-semibold text-white no-underline hover:bg-[#b2ff00] hover:text-black hover:no-underline';
  return (
    <div className="fixed right-[44px] top-1/2 z-[999] block origin-top-right px-[20px] py-[10px] tracking-[1px] text-white [transform:rotate(-90deg)_translateX(50%)] max-md:absolute max-md:right-[30px] max-md:w-[110%]">
      <a href="#apply-now" className={a}>
        <span>Apply Now</span>
      </a>{' '}
      <BrochureTrigger className={a}>
        <span>Download Brochure</span>
      </BrochureTrigger>{' '}
      <a href="#" className={a}>
        <span>Important Dates</span>
      </a>
    </div>
  );
}

function Header() {
  return (
    <header className="absolute left-0 top-0 z-[999] flex w-full pt-[calc(var(--r)*0.5)]">
      <nav className="relative mx-auto flex w-auto flex-wrap items-center justify-between px-[var(--r)] py-[calc(var(--r)*0.5)] max-lg:w-full max-lg:pl-0 max-lg:pr-0 md:max-lg:px-[var(--r)] lg:flex-nowrap lg:justify-start [@media(min-width:992px)_and_(max-width:1024px)]:w-full">
        <Navbar
          brand={
            <a
              href="#"
              className="mr-[var(--r)] inline-block w-[calc(var(--r)*8.5)] whitespace-nowrap py-[calc(var(--r)*0.3125)] text-[calc(var(--r)*1.25)] leading-[inherit] [@media(min-width:1025px)]:ml-auto max-md:w-[calc(var(--r)*10.5)] max-md:pl-[var(--r)]"
            >
              <img src={`${IMG}/logo.png`} alt="Fyntune Logo" className="w-full align-middle" />
            </a>
          }
          toggleClass="cursor-pointer rounded-[calc(var(--r)*0.25)] border-0 bg-transparent py-[calc(var(--r)*0.25)] pl-[calc(var(--r)*0.75)] pr-[calc(var(--r)*0.75)] text-[calc(var(--r)*3)] leading-none text-white lg:hidden max-md:py-0 max-md:pl-0 max-md:pr-[var(--r)] max-md:text-[calc(var(--r)*3.5)]"
          collapseClass="w-full basis-full items-center max-lg:bg-white lg:flex lg:w-auto lg:basis-auto"
          links={
            <ul className="mr-auto flex flex-col pl-0 lg:flex-row">
              {NAV.map(([id, label]) => (
                <li key={id} className="max-lg:border-b max-lg:border-solid max-lg:border-b-[rgba(0,0,0,0.06)] max-lg:bg-white">
                  <ScrollLink
                    href={`#${id}`}
                    className="block px-[calc(var(--r)*0.5)] text-[calc(var(--r)*0.8)] text-white hover:text-white max-lg:px-[var(--r)] max-lg:py-[calc(var(--r)*1.2)] max-lg:text-[length:var(--r)] max-lg:text-black max-lg:hover:text-black [@media(min-width:1680px)]:text-[calc(var(--r)*0.95)]"
                  >
                    {label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          }
        />
      </nav>
    </header>
  );
}

const LABEL = 'm-0 inline-block text-[calc(var(--r)*0.8)] font-semibold max-md:mb-[calc(var(--r)*0.2)] max-md:text-[calc(var(--r)*1.2)]';
const INPUT =
  'block h-auto w-full rounded-none border-0 border-b border-solid border-[#000] bg-white bg-clip-padding px-0 py-0 text-[calc(var(--r)*0.75)] leading-[1.5] text-[#495057] outline-none placeholder:text-[calc(var(--r)*0.6)] placeholder:text-[#666] focus:placeholder:text-transparent max-md:mb-[calc(var(--r)*1.5)] max-md:py-[calc(var(--r)*0.5)] max-md:text-[calc(var(--r)*1.2)] max-md:placeholder:text-[calc(var(--r)*0.9)]';
/* `.btn` (global.css) */
const BTN =
  'inline-block cursor-pointer rounded-[calc(var(--r)*2)] border-2 border-solid border-[#9400ff] bg-transparent text-center align-middle font-medium leading-[1.5] text-[#9400ff] hover:bg-[#9400ff] hover:text-white';

function Field({ id, label, placeholder, maxLength }) {
  return (
    <div className="mb-[calc(var(--r)*0.5)]">
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <input id={id} name={id} placeholder={placeholder} maxLength={maxLength} className={INPUT} />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="relative w-full max-md:hidden after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url(/assets/lp2022/film-animation_26/banner_overlay.png)] after:bg-[length:100%_100%] after:bg-no-repeat after:content-['']">
        <img src={`${IMG}/banner1.webp`} alt="" className="block w-full" />
      </div>
      <div className="absolute left-0 top-0 flex h-full w-full items-center max-md:relative">
        <div className={CONTAINER_82}>
          <div className={cx(ROW, 'items-center justify-between')}>
            <div className="relative w-full flex-[0_0_100%] px-[15px] max-md:flex max-md:h-screen max-md:items-center max-md:bg-[url(/assets/lp2022/film-animation_26/mobile_banner.webp)] max-md:bg-[length:auto_100%] max-md:bg-no-repeat md:w-[64.5%] md:flex-[0_0_auto]">
              <div className="text-white">
                <h1 className="mb-[calc(var(--r)*0.5)] text-[calc(var(--r)*2.66)] font-bold leading-[1.2] max-md:text-[calc(var(--r)*3.6)] [@media(min-width:1680px)]:text-[calc(var(--r)*3.2)]">
                  Have a story to tell?
                </h1>
                <p className="relative mb-0 mt-[calc(var(--r)*0.6)] w-full max-w-full px-0 text-[calc(var(--r)*1.45)] leading-[var(--lh)] max-md:text-[calc(var(--r)*2.1)] max-md:leading-[1.4] md:max-w-[83.333333%] [@media(min-width:1680px)]:text-[calc(var(--r)*1.8)]">
                  <span className="bg-[#b2ff00] px-[calc(var(--r)*0.3)] font-semibold text-black">Visualise and Design</span> it with us.
                </p>
              </div>
            </div>
            <div className="relative w-full flex-[0_0_100%] px-[15px] max-md:flex max-md:items-center max-md:bg-[#333] max-md:px-0 max-md:py-[calc(var(--r)*5)] md:w-[35.5%] md:flex-[0_0_auto] md:pl-0">
              <div id="apply-now" className="mx-[calc(var(--r)*0.5)] overflow-hidden rounded-[calc(var(--r)*0.8)] bg-white max-md:pb-[var(--r)]">
                <form id="frmATLASApplyNow" name="frmATLASApplyNow" className="max-md:text-[24px]">
                  <div className="bg-[#b2ff00] py-[calc(var(--r)*0.4)] text-center text-[calc(var(--r)*1.5)] font-bold text-black max-md:py-[calc(var(--r)*1.5)] max-md:text-[calc(var(--r)*2.4)] max-md:font-semibold max-md:leading-[var(--lh)]">
                    Apply Now
                  </div>
                  <div className="px-[calc(var(--r)*2)] pb-0 pt-[var(--r)]">
                    <Field id="name" label="Name" placeholder="Type your name" maxLength={50} />
                    <div className="mb-[calc(var(--r)*0.5)]">
                      <label htmlFor="course" className={LABEL}>
                        Course{' '}
                      </label>
                      <select id="course" name="course" className={cx(INPUT, 'text-[0.7em] max-md:text-[0.7em]')}>
                        {COURSES.map(([v, l]) => (
                          <option key={v} value={v}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Field id="mobile" label="Mobile No" placeholder="Type your Mobile no" maxLength={12} />
                    <Field id="email" label="E-mail id" placeholder="Type your E-mail id" maxLength={50} />
                    <Field id="city" label="City" placeholder="Type your City" maxLength={20} />
                    {/* `.g-recaptcha-contact` — not loaded; its 304x78 slot is kept (< 768 it sizes the card) */}
                    <div className="h-[78px] w-[304px] max-w-full" />
                    <div className="mb-[calc(var(--r)*0.5)] mt-[var(--r)] text-center">
                      <button
                        type="submit"
                        disabled
                        className={cx(
                          BTN,
                          'mx-auto min-w-[calc(var(--r)*7)] px-[var(--r)] py-[calc(var(--r)*0.2)] text-[length:var(--r)] max-md:max-w-[calc(var(--r)*9)] max-md:text-[calc(var(--r)*1.2)]',
                        )}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[var(--r)] left-[35%] min-w-[30%] text-center text-white">
        <ScrollLink href="#banner_tabs" className="flex items-center justify-center text-white hover:text-white">
          Scroll Down <img src={`${IMG}/scroll_w.png`} alt="" className="w-[calc(var(--r)*3)]" />
        </ScrollLink>
      </div>
    </section>
  );
}

/* Material Icons arrow_back_ios / arrow_forward_ios */
function Chevron({ dir, className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      {dir === 'prev' ? (
        <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" transform="translate(5 0)" />
      ) : (
        <path d="M5.88 4.12 13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
      )}
    </svg>
  );
}

const SKEW_LI_MOBILE = ['max-md:w-[38%]', 'max-md:w-[24%]', 'max-md:w-[38%]', 'max-md:w-1/2 max-md:border-t-[5px] max-md:border-solid max-md:border-t-[#b2ff00]', 'max-md:w-1/2 max-md:border-t-[5px] max-md:border-solid max-md:border-t-[#b2ff00]'];

function InnerPane({ tab }) {
  const darkCol = 'relative w-full min-w-0 max-w-full flex-1 basis-0 bg-[#141414] px-[15px] text-white';
  const cnt = 'font-light md:ml-[calc(var(--r)*0.5)] md:mr-[calc(var(--r)*0.5)] md:pl-[calc(var(--r)*1.5)] md:pr-[calc(var(--r)*1.5)] max-md:pb-[calc(var(--r)*2)] max-md:leading-[1.4]';
  if (tab.kind === 'overview' || tab.kind === 'program') {
    return (
      <div className="w-full px-0">
        <div className={ROW}>
          <div className="relative w-full flex-[0_0_100%] pl-[15px] pr-0 md:w-[calc(100%/2.8)] md:flex-[0_0_auto]">
            <div>
              <img src={tab.image} alt="" className="block h-auto w-full max-w-full" />
            </div>
          </div>
          <div className={darkCol}>
            <div className="relative flex h-full w-full items-center px-[15px] md:max-w-[91.666667%] md:flex-[0_0_91.666667%]">
              <div className={cnt}>
                {tab.heading && (
                  <h2 className="mb-[calc(var(--r)*1.5)] mt-0 text-[calc(var(--r)*1.4)] font-medium leading-[1.2] text-[#b2ff00]">{tab.heading}</h2>
                )}
                {tab.paras.map((p) => (
                  <p key={p} className="mb-[var(--r)]">
                    {p}
                  </p>
                ))}
                {tab.items.length > 0 && (
                  <ul className="mb-[var(--r)] list-disc pl-[40px]">
                    {tab.items.map((li) => (
                      <li key={li} className="mb-[calc(var(--r)*0.5)]">
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (tab.kind === 'curriculam') {
    const half = [tab.sems.slice(0, 3), tab.sems.slice(3)];
    return (
      <div className="w-full px-0">
        <div className={ROW}>
          <div className={cx(darkCol, 'h-full py-[calc(var(--r)*3)]', tab.id === 'curriculam1' && 'pr-0')}>
            <div className="relative flex h-full w-full items-center px-[15px]">
              <div className={cx(cnt, 'text-center')}>
                <p className="mb-[var(--r)] text-[#b2ff00]">{tab.intro}</p>
              </div>
            </div>
            <div className="relative m-auto h-full w-full items-center px-[15px] md:flex md:max-w-[91.666667%]">
              {half.map((col, ci) => (
                <div key={ci} className="relative w-full px-[15px] md:max-w-[50%] md:flex-[0_0_50%]">
                  {col.map((s) => (
                    <div key={s.n} className="mt-[2.5em] flex items-center">
                      <div className="relative w-auto max-w-full flex-[0_0_auto] px-[15px]">
                        <div className="flex min-h-[4.6em] w-[4.6em] items-center justify-center rounded-full border border-solid text-center text-[#b2ff00]">
                          <h5 className="mb-0 text-[calc(var(--r)*1.25)] font-medium leading-[1.2]">
                            SEM
                            <br />
                            <span>{s.n}</span>{' '}
                          </h5>
                        </div>
                      </div>
                      <div className="relative w-full min-w-0 max-w-full flex-1 basis-0 px-[15px] md:max-w-[83.333333%] md:flex-[0_0_83.333333%]">
                        <p className="m-0 text-[calc(var(--r)*0.7)] leading-[1.5] max-md:text-[calc(var(--r)*0.9)]">{s.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (tab.kind === 'career') return <img src={tab.image} alt="" className="h-auto max-w-full" />;
  return (
    <div className={cx(darkCol, 'py-[6.5em]')}>
      <div className="relative m-auto flex h-full w-full flex-col items-center px-[15px] text-center md:max-w-[83.333333%]">
        <img src={tab.image} alt="" className="h-auto max-w-full" />
        <p className="mb-[var(--r)]">{tab.text}</p>
      </div>
    </div>
  );
}

function ProgramPane({ prog }) {
  return (
    <div className="w-full overflow-hidden">
      <Tabs
        ulClass="-ml-[calc(var(--r)*2)] flex w-[calc(100%+var(--r)*3)] flex-wrap border-b border-solid border-b-[#dee2e6] pl-0"
        liClass={SKEW_LI_MOBILE.map((m) => cx('w-1/5 max-md:text-[calc(var(--r)*0.8)] max-md:leading-[1.2]', m))}
        linkClass="relative flex h-full w-full -skew-x-[20deg] items-center justify-center border-l-[calc(var(--r)*0.5)] border-solid border-l-[#b2ff00] py-[calc(var(--r)*0.5)] text-center transition-all duration-300 ease-in-out hover:bg-[#b2ff00] hover:font-bold hover:text-black max-md:h-[calc(var(--r)*3.5)] max-md:border-l-[calc(var(--r)*0.3)] max-md:hover:text-[length:var(--r)] [@media(min-width:1680px)]:py-[var(--r)]"
        activeClass="bg-[#b2ff00] font-semibold text-black max-md:text-[length:var(--r)]"
        idleClass="bg-[#9400ff] text-white"
        items={prog.tabs.map((t) => ({
          id: t.id,
          tab: (
            <span className="skew-x-[20deg]">
              {t.label.map((l, i) => (
                <span key={l}>
                  {i > 0 && <br />}
                  {l}
                </span>
              ))}
            </span>
          ),
        }))}
        panes={prog.tabs.map((t) => (
          <InnerPane key={t.id} tab={t} />
        ))}
      />
    </div>
  );
}

function ProgramTabs() {
  return (
    <section id="banner_tabs">
      <Tabs
        ulClass="flex flex-wrap items-center border-b border-t-[calc(var(--r)*1.2)] border-solid border-b-[#dee2e6] border-t-[#b2ff00] pl-0"
        liClass={[
          'w-1/2 overflow-hidden border-r-[calc(var(--r)*0.4)] border-solid border-[#b2ff00]',
          'w-1/2 overflow-hidden border-l-[calc(var(--r)*0.4)] border-solid border-[#b2ff00]',
        ]}
        linkClass="group relative"
        activeClass="is-active"
        idleClass="" 
        items={PROGRAMS.map((p) => ({
          id: p.id,
          tab: (
            <>
              <img src={p.image} alt="" className="w-full align-middle" />
              <span
                className={cx(
                  'absolute left-0 top-0 z-[1] flex h-full w-full items-center justify-center font-semibold transition-all duration-300 ease-in-out group-hover:text-[calc(var(--r)*3.1)] group-hover:text-[#b2ff00] group-[.is-active]:text-[calc(var(--r)*3.1)] group-[.is-active]:text-[#b2ff00] max-md:group-[.is-active]:text-[calc(var(--r)*2.1)]',
                  'text-[calc(var(--r)*2)] text-white',
                )}
              >
                {p.name}
              </span>
            </>
          ),
        }))}
        panes={PROGRAMS.map((p) => (
          <ProgramPane key={p.id} prog={p} />
        ))}
      />
    </section>
  );
}

function About() {
  const inner = 'relative ml-auto w-full pl-0 pr-[calc(var(--r)*0.5)] md:max-w-[83.333333%] md:flex-[0_0_83.333333%]';
  return (
    <section id="about_us" className="max-md:py-[calc(var(--r)*3)]">
      <div className="w-full px-[15px]">
        <div className={ROW}>
          <div className="relative w-full px-[15px] md:max-w-[33.333333%] md:flex-[0_0_33.333333%]">
            <div className={cx(inner, 'flex items-center')}>
              <h2 className="absolute left-0 top-[calc(var(--r)*3)] mb-[calc(var(--r)*0.5)] inline-block bg-[#b2ff00] px-[calc(var(--r)*0.3)] py-[calc(var(--r)*0.1)] text-[calc(var(--r)*1.6)] font-extrabold leading-[1.2] max-md:relative max-md:top-auto max-md:mb-[calc(var(--r)*2)]">
                About Us
              </h2>
            </div>
            <div className={cx(inner, 'flex h-full items-center')}>
              <h4 className="mb-[calc(var(--r)*0.5)] text-[calc(var(--r)*2.25)] font-medium leading-[1.6] max-md:w-[calc(var(--r)*15)] [@media(min-width:768px)_and_(max-width:1024px)]:text-[calc(var(--r)*2)]">
                {' '}
                <span className="block bg-[#9400ff] px-[calc(var(--r)*0.5)] py-[calc(var(--r)*0.2)] font-semibold text-white">Reinventing</span> the Future of
                Film-making{' '}
              </h4>
            </div>
          </div>
          <div className="relative w-full px-[15px] pt-[calc(var(--r)*1.5)] md:max-w-[66.666667%] md:flex-[0_0_66.666667%]">
            <div className="pl-[var(--r)] max-md:mt-[calc(var(--r)*2)] max-md:pl-0">
              <div className="relative w-full px-0 max-md:text-center md:max-w-[91.666667%]">
                <iframe
                  className="inline h-[400px] w-full align-baseline max-md:h-[calc(var(--r)*16)]"
                  src={`https://www.youtube.com/embed/${ABOUT_VIDEO}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="py-[var(--r)] pr-[calc(var(--r)*1.5)] max-md:pr-0 max-md:text-center">
                {ABOUT.map((t) => (
                  <p
                    key={t}
                    className="mb-[var(--r)] text-[calc(var(--r)*0.75)] max-md:text-[calc(var(--r)*0.9)] max-md:leading-[1.3] [@media(min-width:1680px)]:text-[length:var(--r)] [@media(min-width:1680px)]:leading-[1.6]"
                  >
                    {t}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const WHY_CNT = [
  'md:border-l-[calc(var(--r)*3.6)] md:border-solid md:border-l-[#b2ff00] md:pl-[calc(var(--r)*2)] md:pr-[calc(var(--r)*3)]',
  'md:px-[calc(var(--r)*2.8)]',
  'md:border-r-[calc(var(--r)*3.3)] md:border-solid md:border-r-[#b2ff00] md:pl-[calc(var(--r)*3)] md:pr-[calc(var(--r)*2)]',
  'md:px-[calc(var(--r)*2.8)]',
  'md:px-[calc(var(--r)*2.8)]',
];

function WhyAtlas() {
  return (
    <section
      id="why_atlas"
      className="overflow-hidden bg-[#111111] bg-[url(/assets/lp2022/film-animation_26/why_atlas_bg.webp)] bg-[length:100%] bg-no-repeat pb-[calc(var(--r)*2.5)] pt-[var(--r)]"
    >
      <div className="w-full px-[15px]">
        <h2 className="mb-[var(--r)] text-center text-[calc(var(--r)*1.6)] font-medium leading-[1.2] text-white">
          Why <span className="bg-[#9400ff] px-[calc(var(--r)*0.3)] font-semibold">ATLAS?</span>
        </h2>
        <div className="-ml-[calc(var(--r)*4)] flex w-[calc(100%+var(--r)*8)] flex-wrap justify-center">
          {WHY.map((w, i) => (
            <div
              key={w.image}
              className={cx(
                'relative flex w-1/3 -skew-x-[10deg] items-center justify-center border-r-[calc(var(--r)*0.3)] border-solid border-r-[#b2ff00] after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[rgba(0,0,0,0.2)] after:content-[""] max-md:h-[calc(var(--r)*11)] max-md:w-full max-md:overflow-hidden',
                i < 3 && 'mb-[var(--r)]',
                i === 3 && 'border-l-[calc(var(--r)*0.3)] border-l-[#b2ff00]',
              )}
            >
              <img src={w.image} alt="" className="relative w-full" />
              <div
                className={cx(
                  'absolute z-[2] flex h-full w-full skew-x-[10deg] items-center justify-center px-[calc(var(--r)*2.8)] py-[var(--r)] max-md:m-auto max-md:w-[60%] max-md:p-0',
                  WHY_CNT[i],
                )}
              >
                <p className="m-0 flex min-h-[calc(var(--r)*7)] items-center justify-center rounded-[calc(var(--r)*0.6)] bg-[rgba(0,0,0,0.5)] px-[var(--r)] py-[calc(var(--r)*0.5)] text-center font-medium leading-[1.6] text-white">
                  {w.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Font Awesome 4.7 quote-left (U+F10D) / quote-right (U+F10E) */
function Quote({ right, className }) {
  return (
    <svg viewBox="0 0 1664 1792" aria-hidden="true" className={className} fill="currentColor">
      {right ? (
        <path d="M768 320v704q0 104-40.5 198.5T618 1386t-163.5 109.5T256 1536h-64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h64q106 0 181-75t75-181v-32q0-40-28-68t-68-28H224q-80 0-136-56T32 864V480q0-80 56-136t136-56h384q80 0 136 56t56 136zm896 0v704q0 104-40.5 198.5T1514 1386t-163.5 109.5T1152 1536h-64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h64q106 0 181-75t75-181v-32q0-40-28-68t-68-28h-224q-80 0-136-56t-56-136V480q0-80 56-136t136-56h384q80 0 136 56t56 136z" />
      ) : (
        <path d="M768 960v384q0 80-56 136t-136 56H192q-80 0-136-56T0 1344V640q0-104 40.5-198.5T150 278t163.5-109.5T512 128h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136zm896 0v384q0 80-56 136t-136 56h-384q-80 0-136-56t-56-136V640q0-104 40.5-198.5T1046 278t163.5-109.5T1408 128h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136z" />
      )}
    </svg>
  );
}

function Testimonials() {
  const q = 'absolute h-[calc(var(--r)*1.2*1.2)] w-[calc(var(--r)*1.2*1.2*0.93)] max-md:h-[calc(var(--r)*1.2*1.4)] max-md:w-[calc(var(--r)*1.2*1.4*0.93)]';
  return (
    <section id="testimonials" className="bg-[url(/assets/lp2022/film-animation_26/testimonials_bg.jpg)] bg-cover bg-no-repeat py-[calc(var(--r)*3)]">
      <div className={CONTAINER_82}>
        <div className={ROW}>
          <div className="relative w-full px-[calc(var(--r)*3)]">
            <OwlCarousel
              pvClass="[--pv:1] [@media(min-width:600px)_and_(max-width:999px)]:[--pv:2] [@media(min-width:1000px)]:[--pv:3]"
              margin={50}
              label="Testimonials"
              itemClassName="flex self-stretch pt-[calc(var(--r)*5)] [&>*]:w-full"
              prev={{
                className:
                  'absolute left-[-10%] top-[calc(50%-1px)] flex h-[calc(var(--r)*2)] w-[calc(var(--r)*2)] items-center justify-center rounded-full text-white [@media(min-width:600px)]:hidden',
                content: <Chevron dir="prev" className="h-[calc(var(--r)*2.2)] w-[calc(var(--r)*2.2)]" />,
              }}
              next={{
                className:
                  'absolute right-[-10%] top-[calc(50%-1px)] flex h-[calc(var(--r)*2)] w-[calc(var(--r)*2)] items-center justify-center rounded-full text-white [@media(min-width:600px)]:hidden',
                content: <Chevron dir="next" className="h-[calc(var(--r)*2.2)] w-[calc(var(--r)*2.2)]" />,
              }}
              dots={{
                className: 'relative mt-[var(--r)] w-full text-center [@media(min-width:1000px)]:hidden',
                dotClassName: 'inline-block cursor-pointer border-0 bg-transparent p-0',
                activeClassName: 'mx-[7px] my-[5px] block h-[10px] w-[10px] rounded-[30px] bg-[#9400ff] opacity-100',
                spanClassName: 'mx-[7px] my-[5px] block h-[10px] w-[10px] rounded-[30px] bg-[#666] opacity-30 hover:bg-[#9400ff] hover:opacity-100',
              }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="h-full">
                  <div className="relative flex h-full flex-col justify-between rounded-[calc(var(--r)*0.5)] bg-[#9400ff] px-[calc(var(--r)*0.7)] py-[var(--r)] text-center text-[calc(var(--r)*0.73)] text-white after:absolute after:bottom-0 after:left-0 after:h-[calc(var(--r)*0.8)] after:w-full after:rounded-[var(--r)] after:bg-[#b2ff00] after:content-[''] max-md:text-[length:var(--r)] max-md:font-light max-md:leading-[1.5]">
                    <div>
                      <figure className="mx-auto mb-0 -mt-[calc(var(--r)*4)] flex h-[calc(var(--r)*6)] w-[calc(var(--r)*6)] justify-center rounded-full border-[3px] border-solid border-[#b2ff00]">
                        <img src={t.photo} alt="" className="min-h-full min-w-full" />
                      </figure>
                      <div className="relative py-[calc(var(--r)*2)] [@media(min-width:1680px)]:text-[calc(var(--r)*0.8)] [@media(min-width:1680px)]:font-light [@media(min-width:1680px)]:leading-[1.6]">
                        <Quote className={cx(q, 'left-0 top-[calc(var(--r)*0.2)]')} /> {t.text}{' '}
                        <Quote right className={cx(q, 'bottom-[calc(var(--r)*0.2)] right-0')} />
                      </div>
                    </div>
                    <div className="py-[calc(var(--r)*0.5)]">
                      <div className="text-[length:var(--r)] font-semibold uppercase">{t.name}</div>
                      {t.lines.map(([small, line]) => (
                        <p key={line} className={cx('m-0', small && 'text-[80%] font-normal')}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}

function Admission() {
  return (
    <section id="admission_process" className="bg-[#9400ff] py-[calc(var(--r)*2)]">
      <div className={CONTAINER_BOX}>
        <div className={ROW}>
          <div className="relative w-full px-[15px]">
            <h2 className="mb-[calc(var(--r)*0.5)] text-center text-[calc(var(--r)*2.4)] font-bold leading-[1.2] text-white">
              <span className="inline-block bg-[#b2ff00] px-[calc(var(--r)*0.5)] text-black">Admission</span> Process
            </h2>
          </div>
        </div>
        <div className={ROW}>
          <div className="relative w-full px-[15px]">
            <a href="https://www.atlasuniversity.edu.in/applicationform/" target="_blank" rel="noreferrer">
              <img src={`${IMG}/admission_process_img.jpg`} alt="" className="hidden w-full lg:block" />
              <img src={`${IMG}/admission-process-mb.png`} alt="" className="w-full lg:hidden" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section id="partners" className="py-[calc(var(--r)*2)]">
      <div className={`${BOX_RANGES} [@media(min-width:1680px)]:max-w-[75%]`}>
        <div className={ROW}>
          <div className="relative w-full px-[15px]">
            <h2 className="mb-[calc(var(--r)*0.5)] text-center text-[calc(var(--r)*2.4)] font-bold leading-[1.2]">
              <span className="inline-block bg-[#9400ff] px-[calc(var(--r)*0.5)] pb-[calc(var(--r)*0.2)] text-white">Hiring</span> Partners
            </h2>
          </div>
        </div>
        <div className={ROW}>
          <div className="relative mx-auto w-full max-w-[83.333333%] flex-[0_0_83.333333%] px-[15px]">
            {/* `.partners_owl`: a single slide, so Owl disables its nav and dots */}
            <div className="relative z-[1] pt-[calc(var(--r)*5)]">
              <img src={`${IMG}/partner1.webp`} alt="" className="block w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Font Awesome 4.7 facebook / twitter / instagram */
const SOCIAL = [
  ['facebook', '0 0 1024 1792', 'M959 12v264H802q-86 0-116 36t-30 108v189h293l-39 296H656v759H350V905H95V609h255V391q0-186 104-288.5T731 0q147 0 228 12z'],
  [
    'twitter',
    '0 0 1600 1792',
    'M1584 381q-67 98-162 167 1 14 1 42 0 130-38 259.5T1269.5 1098 1084 1308.5t-259 146-324 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5T182 1006q33 5 61 5 43 0 85-11-112-23-185.5-111.5T69 683v-4q68 38 146 41-66-44-105-115T71 450q0-88 44-163 121 149 294.5 238.5T781 625q-8-38-8-74 0-134 94.5-228.5T1096 228q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z',
  ],
  [
    'instagram',
    '0 0 1536 1792',
    'M1024 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm138 0q0 164-115 279t-279 115-279-115-115-279 115-279 279-115 279 115 115 279zm108-410q0 38-27 65t-65 27-65-27-27-65 27-65 65-27 65 27 27 65zM768 266q-7 0-76.5-.5t-105.5 0-96.5 3-103 10T315 297q-50 20-88 58t-58 88q-11 29-18.5 71.5t-10 103-3 96.5 0 105.5.5 76.5-.5 76.5 0 105.5 3 96.5 10 103T169 1349q20 50 58 88t88 58q29 11 71.5 18.5t103 10 96.5 3 105.5 0 76.5-.5 76.5.5 105.5 0 96.5-3 103-10 71.5-18.5q50-20 88-58t58-88q11-29 18.5-71.5t10-103 3-96.5 0-105.5-.5-76.5.5-76.5 0-105.5-3-96.5-10-103T1367 443q-20-50-58-88t-88-58q-29-11-71.5-18.5t-103-10-96.5-3-105.5 0-76.5.5zm768 630q0 229-5 317-10 208-124 322t-322 124q-88 5-317 5t-317-5q-208-10-322-124T5 1213q-5-88-5-317t5-317q10-208 124-322T451 133q88-5 317-5t317 5q208 10 322 124t124 322q5 88 5 317z',
  ],
];

function Footer() {
  return (
    <footer className="bg-[url(/assets/lp2022/film-animation_26/contact_bg.webp)] bg-[length:100%] bg-[position:50%_90%] bg-no-repeat pt-[calc(var(--r)*1.5)] text-white md:pt-[calc(var(--r)*3)] max-md:bg-[length:auto_100%]">
      <div className={CONTAINER} id="contact_us">
        <div className={cx(ROW, 'justify-between')}>
          <div className="relative order-2 w-full min-w-0 max-w-full flex-1 basis-0 px-[15px] md:order-1 max-md:mt-[calc(var(--r)*2)]">
            <h1 className="mb-[calc(var(--r)*0.5)] text-[calc(var(--r)*1.6)] font-bold leading-[1.2] underline">Contact Us</h1>
            <ul className="mb-[var(--r)] list-none pl-0">
              <li>
                <a href="#" className="text-white hover:text-white">
                  +91 73044 64622
                </a>
              </li>
              <li>
                <a href="mailto:film.admissions@atlasuniversity.edu.in" target="_blank" rel="noreferrer" className="text-white hover:text-white">
                  film.admissions@atlasuniversity.edu.in
                </a>
              </li>
            </ul>
            <p className="mb-[var(--r)]">
              {ADDRESS.map((l, i) => (
                <span key={l}>
                  {i > 0 && <br />}
                  {l}
                </span>
              ))}
            </p>
          </div>
          <div className="relative order-1 w-full flex-[0_0_100%] px-[15px] text-right md:order-2 md:w-auto md:max-w-full md:flex-[0_0_auto]">
            <figure className="mb-[var(--r)] ml-auto max-md:w-[calc(var(--r)*10)]">
              <img src={`${IMG}/logo.png`} alt="Fyntune Logo" className="inline align-middle max-md:w-full" />
            </figure>
            <p className="mb-[var(--r)]">Connect With Us</p>
            <ul className="mb-[var(--r)] flex list-none items-center justify-end pl-0 text-[calc(var(--r)*1.4)]">
              {SOCIAL.map(([name, vb, d]) => (
                <li key={name} className="px-[calc(var(--r)*0.5)]">
                  <a href="#" target="_blank" rel="noreferrer" aria-label={name} className="text-white">
                    <svg viewBox={vb} aria-hidden="true" className="inline-block h-[1em] w-auto fill-current align-[-0.125em]">
                      <path d={d} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#f2f2f2] py-[calc(var(--r)*1.5)] text-[#333] max-md:text-[calc(var(--r)*0.9)]">
        <div className={CONTAINER}>
          <div className={ROW}>
            <div className="relative w-full px-[15px]">
              <p className="m-0 text-[#343a40]">© 2021 Atlas SkillTech University. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
