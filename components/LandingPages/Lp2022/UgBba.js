/* eslint-disable @next/next/no-img-element -- legacy landing page: images are the reference files, served as authored */
import { cx } from '@/lib/cx';
import { LP2022_ROBOTO_VARS } from '@/lib/landing/lp2022/fonts';
import {
  ABOUT,
  CAREER_IMAGES,
  CAREERS,
  ELIGIBILITY,
  FUTURE,
  HIGHLIGHTS,
  NAV,
  PARTNERS,
  SELECTION,
  STEPS,
  STEPS_NOTE,
  TESTIMONIALS,
  VIDEO,
} from '@/lib/landing/lp2022/ugbba';
import OwlCarousel from '../shared/OwlCarousel';
import { Aos, CaptchaText, Navbar, SideTabs } from './UgBbaClient';

const IMG = '/assets/lp2022/ug/bba';
const BROCHURE = '/assets/lp2022/ug/bba/BBA-Brochure.pdf';

/**
 * /lp2022/ug/bba — "Bachelor of Business Administration (BBA) in Management & Entrepreneurship"
 * (ATLAS ISME). Reference `lp2022/ug/bba/index.php`, live at
 * https://atlasuniversity.edu.in/lp2022/ug/bba/. Bootstrap 4 + responsive.css + style.css, Owl,
 * AOS, Roboto (Google, 100–900 — `.section-highlights h2` asks for weight 1000 and gets 900). Its
 * own header and footer. Measured on production at 1920 / 1440 / 768 / 390.
 *
 * Sections: header (logo + section links, three-bar toggler < 992) | hero (photo, heading, enquiry
 * form; < 768 a portrait photo and the form below it) | Program highlights band | Explore ideas |
 * The future of learning (flow graphic) | campus YouTube | Career paths / Eligibility | How to apply
 * (4 steps) | Selection process (table) | Industry partners (28 logos) | Student testimonial (Owl,
 * one at a time, autoplay) | footer (contact + enquiry form) | fixed tabs: Apply Now (enquiry
 * modal), Download Brochure (brochure modal), Info Session (< 768, external link).
 *
 * Forms: all four post to `store_data.php` (mailer + DB) upstream — not ported, no CRM on this
 * page; rendered inert (no action, submit disabled — production also shows them disabled, at 0.65
 * opacity, until its captcha is solved). The captcha label shows two random digits as
 * captchaValidate.js writes them; nothing validates. The brochure modal's "Download Brochure"
 * button upstream submits the lead form and then serves `BBA-Brochure.pdf` via download.php; here
 * it links that PDF (copied byte-for-byte) directly. GTM / gtag are not loaded.
 *
 * Reference defects not reproduced: an `<img src="">` (empty, broken) inside each logo link; the
 * `#myModal1` "Important Dates" modal no element opens; duplicate `id`s across the four forms;
 * the mobile enquiry block's 15px horizontal overflow (clipped). The second Owl init in the markup
 * (`#customers-testimonials`, 3-up, center) never runs because the first `$('.owl-carousel')` init
 * already claimed the element — production shows one testimonial at a time, as here. Its `rewind`
 * (jump back to the first) is shown as a continuous loop by the shared carousel.
 */
const ROBOTO = 'font-[family-name:var(--font-lp2022-roboto),var(--font-lp2022-roboto-ext),sans-serif]';
/* Bootstrap 4 `.container` (540/720/960/1140) */
const CONTAINER_BOX =
  'mx-auto w-full [@media(min-width:576px)_and_(max-width:767px)]:max-w-[540px] [@media(min-width:768px)_and_(max-width:991px)]:max-w-[720px] [@media(min-width:992px)_and_(max-width:1199px)]:max-w-[960px] [@media(min-width:1200px)]:max-w-[1140px]';
const CONTAINER = `${CONTAINER_BOX} px-[15px]`;
const ROW = '-mx-[15px] flex flex-wrap';
const COL = 'relative w-full px-[15px]';
const H = 'font-bold leading-[1.2] text-[#212322]';

export default function UgBba() {
  return (
    <div className={cx(LP2022_ROBOTO_VARS, ROBOTO, 'overflow-x-hidden bg-white text-[16px] font-normal leading-[1.5] text-[#707070]')}>
      <Header />
      <Hero />
      <MobileHero />
      <Highlights />
      <About />
      <Future />
      <Campus />
      <Career />
      <HowToApply />
      <Selection />
      <Industry />
      <Testimonials />
      <Footer />
      <Tabs />
    </div>
  );
}

function Header() {
  const brand = 'mr-[1rem] inline-block whitespace-nowrap bg-[#342b7c] p-0 text-[1.25rem] leading-[inherit]';
  return (
    <header className="absolute left-0 top-0 z-[99] w-full bg-[#9300ff] transition-all duration-300 ease-linear">
      <div>
        <nav className="relative flex flex-wrap items-center justify-between border-0 bg-[#009fe0] p-0 lg:flex-nowrap lg:justify-start">
          <div className="flex w-full flex-wrap items-center justify-between pl-0 pr-[.5rem] md:px-0 lg:flex-nowrap">
            <Navbar
              brands={
                <>
                  <a href="/lp2022/ug/bba/" className={cx(brand, 'w-[28%] max-md:hidden md:pl-[3rem]')}>
                    <img src={`${IMG}/logo.webp`} alt="" className="h-auto max-w-full align-middle" />
                  </a>
                  <a href="/lp2022/ug/bba/" className={cx(brand, 'w-[75%] md:hidden')}>
                    <img src={`${IMG}/logo.webp`} alt="" className="h-auto max-w-full align-middle" />
                  </a>
                </>
              }
              links={NAV}
              linkClass="block px-[1rem] py-[.5rem] text-[1rem] font-medium text-white hover:text-[rgb(110,209,255)] max-lg:rounded-none max-lg:border-b max-lg:border-solid max-lg:border-b-[#ededed33] max-lg:leading-[40px] max-lg:text-[#222] max-lg:hover:text-[#222]"
              collapseClass="w-full basis-full items-center max-lg:max-h-[340px] max-lg:overflow-y-scroll max-sm:max-h-[250px] lg:flex lg:w-auto lg:flex-grow lg:basis-auto"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

const FORM_INPUT =
  'mb-[12px] block h-[34px] w-full rounded-none border border-solid border-[#d0cfcf] bg-transparent px-[10px] py-[7px] text-[.8rem] leading-[1.5] text-white outline-none placeholder:text-white';
const CAPTCHA = 'mb-[.5rem] block border border-solid border-[#5453af] bg-[#323189] px-[10px] py-[8px] text-center text-[15px] leading-[1.5]';
const BTN_SUB =
  'inline-block cursor-pointer rounded-none border border-solid border-[#00a1e4] bg-[#00a1e4] px-[30px] py-[9px] text-center align-middle text-[20px] font-bold uppercase leading-[18px] text-white disabled:cursor-default disabled:opacity-[.65]';

/* the hero / mobile enquiry form (`.banner-form`) */
function EnquiryForm({ id, collegeMax, captchaClass }) {
  const fields = [
    ['text', 'first_name', 'First Name', 30],
    ['text', 'last_name', 'Last Name', 30],
    ['number', 'mobile', 'Contact Number', 10],
    ['email', 'email', 'Email Id'],
    ['text', 'city', 'City', 50],
    ['number', 'passing_yr', ' Class 12 Passing Year', 4],
    ['text', 'college_name', 'Current School/College Name', collegeMax],
  ];
  return (
    <>
      <h4 className="mb-[15px] mt-[5px] pb-[6px] text-center text-[24px] font-medium leading-[1.2] text-white">ENQUIRY FORM</h4>
      <form id={id}>
        {fields.map(([type, name, ph, max]) => (
          <div key={name} className="mb-[10px]">
            <input type={type} name={name} placeholder={ph} maxLength={max} aria-label={ph.trim()} className={FORM_INPUT} />
          </div>
        ))}
        <div className={ROW}>
          <div className={cx(COL, 'max-w-[66.666667%] flex-[0_0_66.666667%]')}>
            <input type="text" placeholder="Enter CAPTCHA" aria-label="Enter CAPTCHA" className={FORM_INPUT} />
          </div>
          <div className={cx(COL, 'max-w-[33.333333%] flex-[0_0_33.333333%]')}>
            <CaptchaText className={cx(CAPTCHA, captchaClass)} />
          </div>
        </div>
        <div className="mb-[10px] mt-[.5rem] md:mt-[1.5rem]">
          <div className="text-center md:mt-[1.5rem]">
            <button type="submit" disabled className={BTN_SUB}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

const APPLY = 'inline-block rounded-none border border-solid border-[#323189] bg-[#323189] text-[20px] font-bold uppercase leading-[1.5] text-white hover:text-white';

function Hero() {
  return (
    <section className="mt-[66px] w-full max-md:hidden md:max-lg:mt-[71px]">
      <div className="w-full p-0">
        <div className="relative">
          <div className="relative w-full overflow-hidden">
            <div className="relative block w-full">
              <img src={`${IMG}/banner.webp`} alt="" className="block h-auto w-full max-w-full" />
            </div>
            <div className="absolute bottom-auto left-0 right-[7%] top-[10%] z-10 pb-[20px] pt-[8px] text-center text-white">
              <div className="w-full pr-[15px] md:pl-0">
                <div className={ROW}>
                  <div className={cx(COL, 'md:max-w-[66.666667%] md:flex-[0_0_66.666667%] md:pl-[3rem]')}>
                    <div className="mt-[135px] w-[80%] p-[15px] pl-[10%] text-left text-white">
                      <h2 className="mb-[.5rem] text-[32px] font-bold uppercase leading-[1.2] text-white">
                        Bachelor of Business Administration (BBA) in Management &amp; <br />
                        Entrepreneurship
                      </h2>
                      <p className="mb-[1rem]">
                        <span className={cx(APPLY, 'mr-[20px] mt-[5px] cursor-default px-[.75rem] py-[.375rem]')}>ADMISSIONS OPEN 2022</span>{' '}
                      </p>
                    </div>
                  </div>
                  <div className={cx(COL, 'md:max-w-[33.333333%] md:flex-[0_0_33.333333%]')}>
                    <div className="flow-root bg-[rgba(28,26,26,0.7)] p-[24px] md:ml-[3rem]">
                      <EnquiryForm id="desktop_enquiry" collegeMax={100} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* < 768: `.custom_banner_height.mobile_unique` + the form block below it */
function MobileHero() {
  return (
    <div className="md:hidden">
      <section className="h-auto w-auto pt-[68px]">
        <div className="w-full p-0">
          <img src={`${IMG}/mob-b1.webp`} alt="" className="block h-auto max-w-full" />
        </div>
        <div className="w-full max-w-full">
          {/* `.carousel-caption`: `top: 10%` of the initial containing block, as upstream */}
          <div className="absolute bottom-auto left-0 right-[7%] top-[10%] z-10 pb-[20px] pt-[8px] text-center text-white">
            <div className={CONTAINER}>
              <div className={ROW}>
                <div className={COL}>
                  <div className="mt-[185px] flow-root w-[80%] p-[15px] pl-0 text-left text-white">
                    <h2 className="mb-[1rem] mt-[1rem] text-[24px] font-bold uppercase leading-[1.2] text-white">
                      Bachelor of Business Administration (BBA) in Management &amp; <br />
                      Entrepreneurship
                    </h2>
                    <div className="flex text-white">
                      <div className="flex">
                        <a href="" target="_blank" rel="noreferrer" className={cx(APPLY, 'mt-[5px] px-[10px] py-[5px]')}>
                          {' '}
                          ADMISSIONS OPEN 2022{' '}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full px-0">
        <div className={ROW}>
          <div className="relative w-full px-0">
            <div className="flow-root bg-[rgba(28,26,26,0.9)] p-[24px]">
              <EnquiryForm id="mob_open_enquiry" collegeMax={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Highlights() {
  return (
    <div className="p-0">
      <div className={cx(CONTAINER_BOX, 'p-0')}>
        <div className="relative mb-[1rem] mt-[-30px] flow-root bg-[#342b7c] px-[.5rem] py-[1.5rem] text-center text-white max-md:mt-0 md:px-[3rem] lg:mb-[3rem] [@media(min-width:1901px)]:mt-[-120px]">
          <div className={ROW}>
            {HIGHLIGHTS.map((h, i) => (
              <div key={h.title} className={cx(COL, 'md:max-w-[25%] md:flex-[0_0_25%] lg:max-w-[33.333333%] lg:flex-[0_0_33.333333%]')}>
                <div className={cx('flow-root max-md:pb-[10px]', i < 2 && 'max-md:border-b max-md:border-solid max-md:border-b-white')}>
                  <h2 className="mb-[1rem] mt-[1rem] text-left text-[2.4rem] font-bold leading-[1.2] text-[#009fe0] max-md:text-center max-md:text-[1.8rem] md:mt-0">
                    {h.title}
                  </h2>
                  {h.text && <p className="m-0 text-left text-[#fff0ff]">{h.text}</p>}
                  {h.items.length > 0 && (
                    <ul className="mb-[1rem] list-disc pl-[1rem] text-left">
                      {h.items.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <Aos as="section" anim="fade-up" id="about" className="py-[3em] text-[#212322] max-md:py-[2em]">
      <div className={CONTAINER}>
        <div className={ROW}>
          <div className={cx(COL, 'mx-auto md:max-w-[75%] md:flex-[0_0_75%]')}>
            <h2 className="mb-[1.5rem] text-[30px] font-black uppercase leading-[1.2] text-[#323189] max-md:text-center">{ABOUT.title}</h2>
            <p className="mb-[1rem] text-center">{ABOUT.text}</p>
          </div>
        </div>
      </div>
    </Aos>
  );
}

function Future() {
  return (
    <section className="py-[4em] max-md:py-[2em]">
      <div className={CONTAINER}>
        <div className={ROW}>
          <div className={COL}>
            <h1 className={cx(H, 'mb-[.5rem] text-center text-[40px] uppercase md:mb-[1.5rem]')}>{FUTURE.title}</h1>
            <h6 className="mb-[1.5rem] text-center text-[19px] font-bold uppercase leading-[1.2] text-[#009fe0]">{FUTURE.sub}</h6>
          </div>
          <div className={COL}>
            <Aos anim="fade-down" className="flow-root text-center">
              <img src={`${IMG}/flow.png`} alt="Skilltech University" title="Skilltech University" className="mt-[1rem] inline h-auto max-w-full align-middle" />
            </Aos>
          </div>
        </div>
      </div>
    </section>
  );
}

function Campus() {
  return (
    <section id="campus" className="text-center">
      <div className="w-full px-[15px]">
        <div className={ROW}>
          <iframe
            width="100%"
            height="500"
            className="h-[500px] w-full"
            src={`https://www.youtube.com/embed/${VIDEO}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* `.career-box .btn-1`: borders draw in around the photo on hover */
function CareerBox({ src }) {
  return (
    <div className="flow-root">
      <button
        type="button"
        tabIndex={-1}
        className="group relative inline-block cursor-pointer border-0 bg-[rgba(0,0,0,0.09)] px-[6px] py-[1px] text-[18px] text-white before:absolute before:right-0 before:top-0 before:h-[4px] before:w-0 before:bg-[#323189] before:transition-all before:delay-200 before:duration-200 before:ease-linear before:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-0 after:bg-[#323189] after:transition-all after:delay-200 after:duration-200 after:ease-linear after:content-[''] hover:before:w-full hover:before:delay-0 hover:after:w-full hover:after:delay-0"
      >
        <span className="block p-[4px] before:absolute before:left-0 before:top-0 before:h-0 before:w-[2px] before:bg-[#323189] before:transition-all before:delay-0 before:duration-200 before:ease-linear before:content-[''] after:absolute after:bottom-0 after:right-0 after:h-0 after:w-[2px] after:bg-[#323189] after:transition-all after:delay-0 after:duration-200 after:ease-linear after:content-[''] group-hover:before:h-full group-hover:before:delay-200 group-hover:after:h-full group-hover:after:delay-200">
          <img src={src} alt="" className="h-auto max-w-full align-middle" />
        </span>
      </button>
    </div>
  );
}

const LIST = 'mb-[1rem] list-disc pl-[1rem] text-left';
const BLUE_H1 = 'text-left text-[40px] font-bold leading-[1.2] text-[#2d257d]';

function Career() {
  return (
    <Aos
      as="section"
      anim="fade-up"
      easing="ease-in-back"
      delay={300}
      offset={0}
      id="career"
      className="pb-[1.5rem] pt-[1.5rem] md:pb-[3rem] md:pt-[3rem]"
    >
      <div className={CONTAINER}>
        <div className={cx(ROW, 'mb-[.5rem] mt-[1rem] md:mb-[3rem] md:mt-[.5rem]')}>
          <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
            <CareerBox src={CAREER_IMAGES[0]} />
          </div>
          <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
            <div className="flow-root">
              <h1 className={cx(BLUE_H1, 'mb-[1rem] mt-[1rem] md:mb-[1.5rem] md:mt-0')}>
                <span>CAREER</span> PATHS
              </h1>
              <div className={ROW}>
                {CAREERS.map((col, i) => (
                  <div key={i} className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
                    <ul className={LIST}>
                      {col.map((li) => (
                        <li key={li} className="mb-[.25rem]">
                          {li}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={ROW}>
          <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
            <div className="flow-root">
              <h1 className={cx(BLUE_H1, 'mb-[1rem]')}>
                <span>ELIGIBILITY</span>
              </h1>
              <p className="mb-[.5rem] mt-0">{ELIGIBILITY.text}</p>
              <ul className={LIST}>
                {ELIGIBILITY.items.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
            <CareerBox src={CAREER_IMAGES[1]} />
          </div>
        </div>
      </div>
    </Aos>
  );
}

/* Font Awesome 4.7 `fa-long-arrow-right` (U+F178) */
function LongArrow({ className }) {
  return (
    <svg viewBox="0 0 1792 1792" aria-hidden="true" className={className} fill="currentColor">
      <path d="M1728 893q0 14-10 24l-384 354q-16 14-35 6-19-9-19-29V1024H32q-14 0-23-9t-9-23V800q0-14 9-23t23-9h1248V544q0-21 19-29t35 5l384 350q10 10 10 23z" />
    </svg>
  );
}

function HowToApply() {
  return (
    <section id="how" className="bg-[#273983] pb-[1.5rem] pt-[1rem] md:pb-[3rem] md:pt-[3rem]">
      <div className={CONTAINER}>
        <h1 className="mb-[1rem] text-center text-[40px] font-bold leading-[1.2] text-white md:mb-[1.5rem]">
          <span>HOW TO APPLY</span>
        </h1>
        <div className={cx(ROW, 'mt-[1rem] justify-center md:mt-[3rem]')}>
          {STEPS.map((s, i) => (
            <div key={s.title} className={cx(COL, 'md:max-w-[25%] md:flex-[0_0_25%]')}>
              <div
                className={cx(
                  'table h-[250px] w-full bg-[url(/assets/lp2022/ug/bba/steps-bg.png)] bg-center bg-no-repeat p-[12px] align-middle max-md:mx-auto',
                  i < 3 && 'mb-[1rem] md:mb-0',
                )}
              >
                <Aos anim="fade-right" duration={[100, 300, 500, 700][i]} className="relative table-cell pl-0 pr-[25px] text-center align-middle text-white">
                  <h3 className="mb-[1.5rem] text-[28px] font-bold leading-[1.2] text-white">{s.title}</h3>
                  <p className="mb-[1rem]">
                    {s.lines.map((l, j) => (
                      <span key={l}>
                        {j > 0 && <br />}
                        {l}
                      </span>
                    ))}
                  </p>
                  {i < 3 && (
                    <span
                      aria-hidden="true"
                      className="absolute right-[-41px] top-[34%] flex h-[40px] w-[40px] items-center justify-center rounded-[30px] border-t-[15px] border-solid border-t-transparent bg-[#b7b7d6] text-[#273983] max-md:hidden"
                    >
                      <LongArrow className="-mt-[15px] h-[26px] w-[26px]" />
                    </span>
                  )}
                </Aos>
              </div>
            </div>
          ))}
          <div className={cx(COL, 'mx-auto text-center text-white md:mt-[3rem] md:max-w-[75%] md:flex-[0_0_75%]')}>
            <p className="mb-[1rem]">{STEPS_NOTE}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Selection() {
  const cell = 'border border-solid border-[#dee2e6] p-[.75rem] align-top';
  return (
    <section id="selection" className="bg-[#f3f3f3] pb-[1.5rem] pt-[1rem] md:pb-[3rem] md:pt-[3rem]">
      <div className={CONTAINER}>
        <div className={ROW}>
          <div className={COL}>
            <h1 className={cx(H, 'mb-[.5rem] text-center text-[40px] lg:mb-[1rem]')}>
              <span>
                Selection <span>Process</span>
              </span>
            </h1>
            <h6 className="mb-[1rem] text-center text-[16px] font-bold leading-[1.2] text-[#2d257d] md:mb-[3rem]">{SELECTION.sub}</h6>
            <p className="mb-[1rem]">{SELECTION.text}</p>
          </div>
        </div>
        <div className={ROW}>
          <div className={cx(COL, 'mx-auto md:max-w-[83.333333%] md:flex-[0_0_83.333333%]')}>
            <table className="mb-[3rem] mt-[1.5rem] w-full border-collapse border border-solid border-[#dee2e6] text-[#212529]">
              <tbody>
                <tr className="bg-[rgb(0,178,186)] text-white">
                  {SELECTION.head.map((h) => (
                    <th key={h} className={cx(cell, 'text-left font-bold uppercase')}>
                      {h}
                    </th>
                  ))}
                </tr>
                <tr className="bg-white">
                  {SELECTION.cells.map((c) => (
                    <td key={c.title} className={cell}>
                      <b className="mb-[.5rem] block font-bold">{c.title}</b>
                      {c.lines.map((l) => (
                        <span key={l}>
                          {l} <br />
                        </span>
                      ))}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function Industry() {
  return (
    <section id="industry" className="py-[4em] max-md:py-[2em]">
      <div className={CONTAINER}>
        <h1 className={cx(H, 'mb-[1.5rem] text-center text-[40px]')}>INDUSTRY PARTNERS</h1>
        <div className={cx(ROW, 'mt-[1rem] justify-center md:mt-[3rem]')}>
          {PARTNERS.map((src, i) => (
            <div key={src} className={cx(COL, 'max-w-[33.333333%] flex-[0_0_33.333333%] md:max-w-[16.666667%] md:flex-[0_0_16.666667%]')}>
              <Aos anim="fade-up" duration={[100, 200, 300, 400, 500, 600][i % 6]} className="mb-[30px] flow-root text-center">
                <img src={src} alt="" className="inline h-auto max-w-full align-middle" />
              </Aos>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <Aos as="section" anim="fade-up" easing="ease-in-back" delay={300} offset={0} id="testimonial" className="bg-[#eeeeee] py-[4em] max-md:py-[2em]">
      <div className={CONTAINER}>
        <h1 className={cx(H, 'mb-[.5rem] text-center text-[40px] md:mb-[1.5rem]')}>
          STUDENT <span className="text-[rgb(0,159,224)]">TESTIMONIAL</span>
        </h1>
        <div className={cx(ROW, 'justify-center')}>
          <div className={cx(COL, 'md:max-w-[75%] md:flex-[0_0_75%]')}>
            <OwlCarousel
              pvClass="[--pv:1]"
              autoplay={5000}
              label="Student testimonials"
              dots={{
                className: 'mt-[20px] inline-block w-full max-md:mt-[40px] max-md:text-center',
                dotClassName: 'inline-block cursor-pointer border-0 bg-transparent p-0 align-baseline',
                activeClassName:
                  'mx-[2px] mb-[5px] inline-block h-[20px] w-[20px] origin-center -translate-y-1/2 scale-[.7] rounded-full bg-[#009fe0] transition-all duration-[250ms] ease-out',
                spanClassName:
                  'mx-[2px] mb-[5px] inline-block h-[20px] w-[20px] origin-center -translate-y-1/2 scale-[.3] rounded-full bg-[#7e7e7e] transition-all duration-[250ms] ease-out hover:scale-[.7] hover:bg-[#009fe0]',
              }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="flow-root rounded-[5px] shadow-[-2px_5.7px_20px_0_rgba(9,30,107,.05)]">
                  <div className="float-left min-h-[233px] w-[69%] bg-transparent pr-[10%] text-[14px] text-[#707070] max-md:float-none max-md:m-0 max-md:w-full max-md:text-center">
                    <p className="mb-[1rem]">{t.text}</p>
                    <span className="mb-[.5rem] block h-[2px] w-[24%] bg-[#009fe0] max-md:mx-auto" />
                    <h4 className="mb-[5px] text-[16px] font-bold uppercase leading-[1.2] text-[#2d257d] max-md:mb-[20px]">{t.name}</h4>
                  </div>
                  <div className="float-left ml-[19px] w-[25.3333%] overflow-hidden md:mb-[1rem] max-md:float-none max-md:mx-auto max-md:block max-md:w-[36.3333%] max-md:text-center">
                    <img src={t.photo} alt="" title="" className="block h-auto w-full max-w-full" />
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </Aos>
  );
}

const F_INPUT =
  'block h-[calc(1.5em+.75rem+2px)] w-full rounded-none border-0 border-b border-solid border-b-[#ced4da] bg-transparent px-0 py-[1.1rem] text-[.8rem] leading-[1.5] text-white outline-none placeholder:text-white';

function FooterField({ label, type = 'text', name, placeholder, maxLength, first }) {
  return (
    <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
      <div className={first ? 'mb-[1rem] md:mb-[1.5rem]' : 'mb-[1rem]'}>
        <label htmlFor={`footer-${name}`} className="mb-0 inline-block font-bold text-white">
          {label}
        </label>
        <input id={`footer-${name}`} type={type} name={name} placeholder={placeholder} maxLength={maxLength} className={F_INPUT} />
      </div>
    </div>
  );
}

/* Font Awesome 4.7 phone / envelope */
const FA_PHONE =
  'M1408 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-53-3.5t-57.5-12.5-47-14.5-55.5-20.5-49-18q-98-35-175-83-127-79-264-216t-216-264q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47-12.5-57.5-3.5-53q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z';
const FA_ENVELOPE =
  'M1792 710v794q0 66-47 113t-113 47H160q-66 0-113-47T0 1504V710q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38T639 1015q-91-64-262-182.5T172 690q-62-42-117-115.5T0 438q0-78 41.5-130T160 256h1472q65 0 112.5 47t47.5 113z';

function Fa({ d, w }) {
  return (
    <svg viewBox={`0 0 ${w} 1792`} aria-hidden="true" className="inline-block h-[1em] w-auto fill-current align-[-0.125em]">
      <path d={d} />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="bg-[#323189] pb-[3rem] pt-[1rem] md:pt-[3rem]">
      <div className={CONTAINER}>
        <div className={ROW}>
          <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
            <h3 className="mb-[1rem] mt-0 text-[2rem] font-bold leading-[1.2] text-[#fffffa] max-md:text-[1.4rem] md:mb-[1.5rem]">CONTACT US</h3>
            <div className="flow-root">
              <p className="mb-[1rem] text-[.96rem] text-[#fffffa]">
                Tower 1 - Equinox Business Park, Off Bandra-Kurla Complex (BKC), <br className="max-md:hidden" /> LBS Marg, Kurla West,Mumbai - 400 070
              </p>
            </div>
            <p className="mb-0 text-[.96rem] text-[#fffffa] md:mb-[3rem]">
              <a href="tel:+917304464621" className="mr-0 text-[.96rem] text-[#fffffa] hover:text-[#b2ff00] hover:underline max-md:block md:mr-[1rem]">
                <Fa d={FA_PHONE} w={1408} /> +91 8433 910 206{' '}
              </a>{' '}
              <a href="mailto:management.admissions@atlasuniversity.edu.in" className="text-[.96rem] text-[#fffffa] hover:text-[#b2ff00] hover:underline max-md:block">
                <Fa d={FA_ENVELOPE} w={1792} /> management.admissions@atlasuniversity.edu.in{' '}
              </a>{' '}
            </p>
            <p className="mb-[1rem] text-[.96rem] text-[#fffffa] md:mb-0">©2022 Atlas SkillTech University. All Rights Reserved.</p>
          </div>
          <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
            <div className="flow-root">
              <h3 className="mb-[1rem] mt-0 text-[2rem] font-bold uppercase leading-[1.2] text-[#fffffa] max-md:text-[1.4rem] md:mb-[1.5rem]">Enquire NOW</h3>
              <form id="apply_now" name="myForm">
                <div className={ROW}>
                  <FooterField first label="Name" name="first_name" placeholder="Your name" maxLength={50} />
                  <FooterField first label="Email Id" type="email" name="email" placeholder="Your Email" />
                  <FooterField label="Mobile Number" type="number" name="mobile" placeholder="Your Mobile Number" maxLength={10} />
                  <FooterField label="City" name="city" placeholder="City" maxLength={30} />
                  <FooterField label="Current School/College Name" name="college_name" placeholder="Current School/College Name" maxLength={80} />
                  <FooterField label="class 12 Passing Year" type="number" name="passing_yr" placeholder="class 12 Passing Year" maxLength={4} />
                  <div className="-mr-[15px] ml-[1px] flex w-full flex-wrap">
                    <div className={cx(COL, 'max-w-[66.666667%] flex-[0_0_66.666667%]')}>
                      <input type="text" placeholder="Enter CAPTCHA" aria-label="Enter CAPTCHA" maxLength={4} className={F_INPUT} />
                    </div>
                    <div className={cx(COL, 'max-w-[33.333333%] flex-[0_0_33.333333%]')}>
                      <CaptchaText className={cx(CAPTCHA, 'text-white')} />
                    </div>
                  </div>
                  <div className={COL}>
                    <div className="mt-[.25rem] text-left">
                      <div className="text-left">
                        <button
                          type="submit"
                          disabled
                          className="mt-[20px] inline-block rounded-none border border-solid border-[#009fe0] bg-[#009fe0] px-[40px] py-[10px] text-center align-middle text-[18px] leading-[18px] text-white disabled:opacity-[.65]"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const M_INPUT =
  'block h-[calc(1.5em+.75rem+2px)] w-full rounded-none border border-solid border-[#ced4da] bg-white bg-clip-padding px-[.75rem] py-[1.1rem] text-[.8rem] leading-[1.5] text-[#495057] outline-none';

function ModalForm({ id, fields, submit }) {
  return (
    <form id={id} autoComplete="off">
      {fields.map(([type, name, ph]) => (
        <div key={name} className="mb-[1rem]">
          <input type={type} name={name} placeholder={ph} aria-label={ph} className={M_INPUT} />
        </div>
      ))}
      <div className={ROW}>
        <div className={cx(COL, 'max-w-[66.666667%] flex-[0_0_66.666667%]')}>
          <input type="text" placeholder="Enter CAPTCHA" aria-label="Enter CAPTCHA" className={M_INPUT} />
        </div>
        <div className={cx(COL, 'max-w-[33.333333%] flex-[0_0_33.333333%]')}>
          <CaptchaText className={cx(CAPTCHA, 'text-white')} />
        </div>
      </div>
      <div className="mb-[1rem] mt-[.5rem] md:mt-[1.5rem]">
        <div className="text-right">{submit}</div>
      </div>
    </form>
  );
}

const TAB = 'mt-[100px] cursor-pointer rotate-[270deg] px-[20px] pb-[10px] pt-[6px] font-bold uppercase text-white';

function Tabs() {
  return (
    <SideTabs
      tabs={[
        {
          key: 'enquire',
          wrapClass: 'fixed right-0 top-[35%] z-[9999] -mb-[3px] -ml-[3px] block max-md:top-1/2',
          tabClass: cx(TAB, 'float-right -mr-[48px] border border-solid border-[#e3180f] bg-[#ec2118] text-[16px] max-md:-mr-[43.4px] max-md:text-[14px]'),
          label: 'Apply Now',
          modal: {
            title: 'Enquire Now',
            body: (
              <ModalForm
                id="mobile_enquiry"
                fields={[
                  ['text', 'first_name', 'First Name'],
                  ['text', 'last_name', 'Last Name'],
                  ['email', 'email', 'Your Email'],
                  ['number', 'mobile', 'Your Mobile Number'],
                  ['text', 'city', 'City'],
                  ['number', 'passing_yr', 'Class 12 Passing Year'],
                  ['text', 'college_name', 'Current School/College Name'],
                ]}
                submit={
                  <button type="submit" disabled className={BTN_SUB}>
                    Apply Now
                  </button>
                }
              />
            ),
          },
        },
        {
          key: 'info',
          wrapClass: 'fixed right-0 top-[18%] z-[9999] -mb-[3px] -ml-[3px] block md:hidden',
          tabClass: cx(TAB, 'float-right -mr-[47px] bg-[#342b7c] text-[14px]'),
          label: 'Info Session',
          href: 'https://embudo.in/2021/ATLAS/info-ssession/',
        },
        {
          key: 'brochure',
          wrapClass:
            'fixed left-0 top-[27%] z-[9999] -mb-[3px] -mr-[3px] block max-md:bottom-0 max-md:top-auto max-md:m-0 max-md:w-full max-md:text-center',
          tabClass: cx(
            TAB,
            'float-left -ml-[82px] border border-t-0 border-solid border-[#26266e] bg-[#323188] text-[15px] max-md:float-none max-md:m-0 max-md:rotate-0',
          ),
          label: 'Download Brochure',
          anchor: true,
          modal: {
            title: 'Download Brochure',
            body: (
              <ModalForm
                id="download_form15"
                fields={[
                  ['text', 'first_name', 'Full  Name'],
                  ['email', 'email', 'Your Email'],
                  ['number', 'mobile', 'Your Mobile Number'],
                  ['text', 'city', 'City'],
                  ['number', 'passing_yr', 'Class 12 Passing Year'],
                  ['text', 'college_name', 'Current School/College Name'],
                ]}
                submit={
                  <a href={BROCHURE} download className={cx(BTN_SUB, 'no-underline hover:text-white hover:no-underline')}>
                    Download Brochure
                  </a>
                }
              />
            ),
          },
        },
      ]}
    />
  );
}
