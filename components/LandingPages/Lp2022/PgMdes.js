/* eslint-disable @next/next/no-img-element -- legacy landing page: images are the reference files, served as authored */
import { cx } from '@/lib/cx';
import { LP2X_FONT_VARS } from '@/lib/landing/lp2x/fonts';
import { LP2022_MAVEN_VARS } from '@/lib/landing/lp2022/fonts';
import { ABOUT, FEATURES, LOGOS, PROGRAM_OPTIONS, SPECIALIZATIONS, TESTIMONIALS, VIDEOS } from '@/lib/landing/lp2022/pgmdes';
import CurrentYear from '../shared/CurrentYear';
import OwlCarousel from '../shared/OwlCarousel';
import { FormJumpButton, SideButtons, SlickSlider } from './PgMdesClient';
import { CONTAINER, CONTAINER_BOX, FONT_ROBOTO } from './ui';

const IMG = '/assets/lp2022/pg/mdes/new_images';

/**
 * /lp2022/pg/mdes — "Prepare for Industry 5.0 and 6.0" (ISDI Master of Design campaign). Reference
 * `lp2022/pg/mdes/index.php`, live at https://atlasuniversity.edu.in/lp2022/pg/mdes/. Bootstrap 4
 * (local) with Bootstrap 3.4.1 loaded AFTER it, so BS3 wins equal-specificity ties: body is BS3's
 * 14px/20px "Helvetica Neue" (Arial on Windows) #333, headings BS3's 1.1 line height, `.col-*`
 * gutters 15px. Its own header and footer. Measured on production at 1920 / 1440 / 768 / 390.
 *
 * Fonts as production paints them (CDP getPlatformFontsForNode): Roboto (web, 700), Maven Pro (web,
 * 400/500/700). 'Roboto Condensed' is named by the hero heading but never loaded — the Google Fonts
 * URL asks `css2?site=Roboto+Condensed…&family=Roboto…`, so only Roboto is requested — and
 * 'Helvetica Neue' is not on Windows: both are reproduced as the same unresolved literal family
 * (Arial fallback), not self-hosted.
 *
 * Sections: header (two logos + phone; two logo boxes < 768) | hero (photo, heading, enquire form;
 * < 768 a background photo and the form moves to a black band below) | PROGRAM FEATURES (Owl, 4 up
 * ≥ 1000 / 1 up, autoplay, image arrows) | THE FUTURE IS NOW | nine specialisations (Owl, one per
 * slide, custom bar "dots": a vertical strip ≥ 768, a horizontal one below) | EXPERIENCE A TRULY
 * NEW-AGE CURRICULUM (infographic) | "Experience the extraordinary" | PLACEMENT PARTNERS | HEAR FROM
 * OUR STUDENTS (slick, 2 per page / 1 at ≤ 480) | three YouTube videos | footer (address + form) |
 * fixed "Download Brochure" (modal) / "Enquire Now" buttons.
 *
 * Forms: all four post to `submit.php` (PHPMailer) upstream — not ported, no CRM on this page;
 * rendered inert (no action, submit disabled). The reCAPTCHA box is not loaded; its `.form-group`
 * keeps its 60px slot so the form is the same height. gtag / Facebook pixel are not loaded.
 *
 * Reference defects not reproduced: windows-1252 bytes under a UTF-8 charset (’ – paint as U+FFFD
 * upstream; the intended characters are used); duplicate `id`s (name/email/… in four forms); the
 * 404ing `bootstrap/js/bootstrap.js` and the "Missing required parameters: sitekey" error; at < 768
 * the "Experience the extraordinary" band is 30px wider than the viewport (clipped here as the
 * page clips it). The 768–991px hero photo keeps its natural 1400px width as production does.
 */
const HELV = "font-['Helvetica_Neue',Helvetica,Arial,sans-serif]";
const RC = "font-['Roboto_Condensed',sans-serif]";
const MAVEN = 'font-[family-name:var(--font-lp2022-maven),var(--font-lp2022-maven-ext),sans-serif]';
const PHONE = 'tel:+917304464514';

/* Font Awesome 4.7 `fa-phone`, in its own 1408x1792 em box (width .9286em) */
function Phone({ className }) {
  return (
    <svg viewBox="0 0 1408 1792" aria-hidden="true" className={cx('inline-block h-[1em] w-[0.7857em] fill-current align-[-0.1em]', className)}>
      <path d="M1408 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-53-3.5t-57.5-12.5-47-14.5-55.5-20.5-49-18q-98-35-175-83-127-79-264-216t-216-264q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47-12.5-57.5-3.5-53q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z" />
    </svg>
  );
}

export default function PgMdes() {
  return (
    <div className={cx(LP2X_FONT_VARS, LP2022_MAVEN_VARS, HELV, 'overflow-x-hidden bg-white text-[14px] leading-[20px] text-[#333]')}>
      <Header />
      <Hero />
      <MobileForm />
      <Features />
      <FutureIsNow />
      <Specializations />
      <Curriculum />
      <Extraordinary />
      <Placement />
      <Testimonials />
      <Videos />
      <SideButtons />
      <Footer />
    </div>
  );
}

function Header() {
  const box = 'relative flex items-center';
  return (
    <header>
      <nav className="relative flow-root">
        {/* `.hidden-xs`: ≥ 768 */}
        <div className="bg-[linear-gradient(to_right,#342b7c_0%,#342b7c_50%,#e12a7b_50%,#e12a7b_100%)] px-[15px] max-md:hidden">
          <div className={CONTAINER}>
            <div className="-mx-[15px] flex flex-wrap">
              <div className={cx(box, 'w-full max-w-[16.666667%] flex-[0_0_16.666667%] bg-[#342b7c] px-[15px] py-[20px]')}>
                <img src={`${IMG}/atlas_logo.png`} alt="" loading="lazy" className="w-[160px] max-w-none" />
              </div>
              <div className={cx(box, 'w-full max-w-[16.666667%] flex-[0_0_16.666667%] bg-[#e12a7b] py-[15px] pl-[20px] pr-[15px]')}>
                <img src={`${IMG}/isdi_logo.png`} alt="" className="w-[120px] max-w-none" />
              </div>
              <div className="relative flex w-full flex-[0_0_66.666667%] flex-col items-end justify-end bg-[#e12a7b] pb-[10px] pl-[15px] pr-[10px]">
                <h2 className="mb-[10px] mt-[20px] text-center text-[30px] font-medium leading-[1.1]">
                  <a href={PHONE} className="text-white">
                    <Phone className="mr-[4px] align-[-2px]" /> +91 7304464514
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/* `.visible-xs`: < 768 */}
        <div className="bg-[linear-gradient(to_right,#342b7c_0%,#342b7c_50%,#e12a7b_50%,#e12a7b_100%)] md:hidden">
          <div className={CONTAINER}>
            <div className="-mx-[15px] flex flex-nowrap">
              <div className={cx(box, 'w-full bg-[#342b7c] px-[15px] py-[5px]')}>
                <img src={`${IMG}/atlas_logo.png`} alt="" loading="lazy" className="relative w-[150px] max-w-none" />
              </div>
              <div className={cx(box, 'w-full bg-[#e12a7b] py-[15px] pl-[23px] pr-[15px]')}>
                <img src={`${IMG}/isdi_logo.png`} alt="" className="relative w-[100px] max-w-none" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

const FIELD = 'mb-[15px] h-[60px]';
const LABEL = 'mb-[5px] inline-block max-w-full text-[14px] font-bold leading-[20px] max-md:text-[12px] max-md:leading-[17.142857px]';
const INPUT =
  'block h-[34px] w-full rounded-[4px] border-0 border-b border-solid border-b-[#ccc] bg-transparent py-[6px] pl-0 pr-[12px] text-[14px] leading-[20px] text-[#555] shadow-none outline-none placeholder:text-[#999] max-md:text-[12px]';
/* `select.minimal(2)` paints a CSS chevron, but `.form-control { background: none !important }` wins,
   so production shows the native select arrow; `margin-left: -5px` survives */
const SELECT = cx(INPUT, '-ml-[5px]');
const SUBMIT =
  'block w-full rounded-none border border-solid border-transparent bg-[#e12a7b] px-[12px] py-[6px] text-center text-[14px] leading-[20px] text-white hover:bg-[#1b1e1b]';

function Field({ id, name, label, type = 'text', placeholder, labelClass }) {
  return (
    <div className={FIELD}>
      <label htmlFor={id} className={cx(LABEL, labelClass)}>
        {label}
      </label>
      <input type={type} id={id} name={name} placeholder={placeholder} required className={INPUT} />
    </div>
  );
}

function ProgramSelect({ id, labelClass }) {
  return (
    <div className={FIELD}>
      <label htmlFor={id} className={cx(LABEL, labelClass)}>
        Program
      </label>
      <select id={id} name="program" required defaultValue="" className={SELECT}>
        <option value="" disabled>
          Select Program
        </option>
        {PROGRAM_OPTIONS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}

/* the four lead fields + city, as the hero / mobile forms author them */
function LeadFields({ prefix, cityPlaceholder }) {
  return (
    <>
      <Field id={`${prefix}-name`} name="name" label="Name" placeholder="Type your name" />
      <Field id={`${prefix}-email`} name="email" label="Email Id" type="email" placeholder="Type your email id" />
      <Field id={`${prefix}-phone`} name="phone" label="Mobile Number" placeholder="Type your mobile number" />
      <ProgramSelect id={`${prefix}-program`} />
      <div className={FIELD}>
        <label htmlFor={`${prefix}-city`} className={LABEL}>
          City
        </label>
        <input type="text" id={`${prefix}-city`} name="city" placeholder={cityPlaceholder} className={INPUT} />
      </div>
      {/* `.g-recaptcha` — not loaded; the group keeps its 60px slot */}
      <div className={FIELD} />
    </>
  );
}

const HEAD_SPAN = 'px-[17px] text-white';
const BIG = `${HEAD_SPAN} text-[50px] leading-[1.1] md:max-lg:text-[24px] [@media(min-width:992px)_and_(max-width:1279px)]:text-[31px]`;
const SMALL = `${HEAD_SPAN} text-[30px] font-normal leading-[0.9]`;

function HeroHeading({ mobile }) {
  const big = mobile ? 'pl-0 pr-[17px] text-[34px] leading-[1.1] text-white' : BIG;
  const small = mobile ? 'pl-0 pr-[17px] text-[18px] font-normal leading-[0.9] text-white' : SMALL;
  return (
    <h1
      className={cx(
        RC,
        'mb-[10px] inline-block font-bold leading-[1.1] text-white',
        mobile
          ? 'mt-[5%] px-[17px] text-[30px] md:hidden'
          : 'mt-0 text-[40px] max-md:hidden md:max-lg:text-[25px] [@media(min-width:992px)_and_(max-width:1298px)]:text-[31px]',
      )}
    >
      <span className={big}>Prepare </span>
      <br />
      <span className={big}>for Industry</span>
      <br />
      <span className={big}>5.0 and 6.0</span>
      <br />
      <div className={cx('leading-[0.9]', mobile && 'mt-[5px]')}>
        <span className={small}>
          with <strong>S</strong>cience <strong>T</strong>ech
        </span>
        <br />
        <span className={small}>
          <strong>E</strong>ngineering <strong>A</strong>rt
        </span>
        <br />
        <span className={small}>
          <strong>M</strong>athematics <strong>S</strong>ociology
        </span>
        <br />
      </div>
    </h1>
  );
}

function Hero() {
  const col8 = `${MAVEN} px-[17px] font-bold`;
  return (
    <section className="relative bg-white max-md:-mt-px max-md:h-[682px] max-md:bg-black max-md:bg-[url(/assets/lp2022/pg/mdes/new_images/mobile_banner.webp)] max-md:bg-cover max-md:bg-center max-md:bg-no-repeat md:max-lg:overflow-hidden">
      <div>
        <img src={`${IMG}/final_banner.webp`} alt="" className="w-full max-w-none max-md:hidden md:max-lg:w-auto" />
      </div>
      <div className="absolute top-0 w-full max-md:-mb-px">
        <div className={CONTAINER}>
          <div className="-mx-[15px] flex flex-wrap pt-[60px] max-md:mt-[9%] max-md:pt-[15px]">
            <div className="relative flex w-full flex-col justify-between pl-[7px] pr-[15px] md:max-w-[75%] md:flex-[0_0_75%]">
              <HeroHeading />
              <HeroHeading mobile />
              <p className="mb-[10px] mt-[42px] text-white [line-height:normal] md:hidden">
                {['Master', 'Of Design', '(M.Des)'].map((t) => (
                  <span key={t}>
                    <span className={cx(col8, 'text-[22px]')}>{t}</span>
                    <br />
                  </span>
                ))}
              </p>
              <p className="mb-[10px] ml-[17px] w-fit bg-[#e12a7b] md:hidden">
                <span className={cx(MAVEN, 'bg-[#e12a7b] px-[17px] text-[15px] font-bold leading-[1.42857143] text-white')}>2 YEARS</span>
                <br />
                <span className={cx(MAVEN, 'bg-[#e12a7b] px-[17px] text-[15px] font-bold leading-[1.42857143] text-white')}>FULL-TIME</span>
              </p>
            </div>
            <div className="relative w-full px-[15px] max-md:hidden md:max-w-[25%] md:flex-[0_0_25%]">
              <form
                id="enquire-form"
                className="rounded-[15px] bg-white px-[20px] py-[10px] md:max-lg:rounded-[10px] md:max-lg:pb-[5px] md:max-lg:pl-[10px] md:max-lg:pr-[5px] md:max-lg:pt-[5px]"
              >
                <LeadFields prefix="hero" cityPlaceholder="Type your City" />
                <button
                  type="submit"
                  disabled
                  className={cx(SUBMIT, 'mt-[14%] md:max-lg:mt-[25%] [@media(min-width:992px)_and_(max-width:1298px)]:mt-[17%]')}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={CONTAINER}>
        <p className={cx(MAVEN, 'absolute bottom-[60px] mb-[10px] text-[31.853333px] text-white [line-height:normal] max-md:hidden')}>
          <span className={cx(col8, 'text-[28px]')}>Master Of Design (M.Des) </span>
          <br />
          <span className="ml-[17px] bg-[#e12a7b] px-[17px] text-[25px] font-bold text-white">2 YEARS | FULL-TIME</span>
          <br />
        </p>
      </div>
    </section>
  );
}

/* `.section2`: the hero form, moved under the photo below 768 (the section is empty above) */
function MobileForm() {
  return (
    <section className="bg-black px-[15px] pb-[65px] pt-[30px] md:hidden">
      <div className="relative w-full px-[15px]">
        <h3 className="mb-[10px] mt-[20px] text-center text-[24px] font-bold leading-[1.1] text-white">
          <a href={PHONE} className="text-white">
            <Phone /> +91 7304464514
          </a>
        </h3>
        <h5 className="mx-auto mb-[20px] mt-0 w-[90%] bg-black py-[5px] text-center text-[20.16px] font-bold leading-[1.1] text-white">
          APPLY NOW
        </h5>
        <form id="enquire-form2" className="ml-[13px] mt-[5%] w-[90%] rounded-[15px] bg-white p-[6%]">
          <LeadFields prefix="mobile" cityPlaceholder="Type your city" />
          <button type="submit" disabled className={cx(SUBMIT, 'mt-[18%]')}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

/* `section.section3.program-section` */
const PROGRAM_BASE = 'relative -mt-[45px] pt-[20px] max-md:-mt-px max-md:pt-0 md:max-lg:pr-[3%]';
const PROGRAM_SECTION = `${PROGRAM_BASE} pb-[65px] max-md:pb-[30px]`;
const HEAD =
  'mb-[10px] w-max bg-[#342b7c] px-[10px] py-[5px] font-bold leading-[1.1] text-white ' + FONT_ROBOTO;

/**
 * A `.heading-row-section`: the indigo + pink `h1` pair and (optionally) the `heading_vector.png`
 * cell. `size`: 'big' (36px, 28 < 768) or 'new' (`.new_fonts`: 36 / 25 at 768–991 / 18 < 768).
 * `sec5`: the PLACEMENT PARTNERS pair is not inside `.section3`, so it keeps its top margin at
 * 992–1298.
 */
function HeadingPair({ first, second, size = 'big', vector, colClass, vectorPad, sec5 = false }) {
  const fs = size === 'new' ? 'text-[36px] md:max-lg:text-[25px] max-md:w-fit max-md:text-[18px]' : 'text-[36px] max-md:text-[28px]';
  return (
    <div className="-mx-[15px] flex flex-wrap max-md:flex-nowrap">
      <div className={cx('relative w-full max-w-fit px-[15px]', colClass)}>
        <h1 className={cx(HEAD, fs, 'mt-[20px]', !sec5 && '[@media(min-width:992px)_and_(max-width:1298px)]:mt-0')}>{first}</h1>
        <h1 className={cx(HEAD, fs, 'mt-[10px] bg-[#e12a7b]')}>{second}</h1>
      </div>
      {vector && (
        <div className={cx('relative flex w-full n576:max-w-[25%] n576:flex-[0_0_25%]', vectorPad)}>
          <img src={`${IMG}/heading_vector.png`} alt="" className="h-[50px] w-[60px] max-md:relative" />
        </div>
      )}
    </div>
  );
}
/* `.heading_vector_col2.heading-vector1` (28px; 43 at 768–991; 39/39/39/10 < 768) */
const VEC1 = 'p-[28px] md:max-lg:p-[43px] max-md:p-[39px] max-md:pl-[10px]';
/* `.heading_vector_col2` alone (44px 15px; 37px 15px, right-aligned at 768–991) */
const VEC2 = 'px-[15px] py-[44px] md:max-lg:justify-end md:max-lg:py-[37px]';

function Runs({ runs }) {
  return runs.map((r, i) => (typeof r === 'string' ? r : <strong key={i}>{r.b}</strong>));
}

function Features() {
  return (
    <section className={PROGRAM_SECTION}>
      <div className={cx(CONTAINER, 'pt-[95px] max-md:pt-[45px]')}>
        <HeadingPair first="PROGRAM" second="FEATURES" vector colClass="n576:flex-[0_0_25%]" vectorPad={VEC1} />
        <OwlCarousel
          pvClass="[--pv:1] [@media(min-width:1000px)]:[--pv:4]"
          autoplay={5000}
          label="Program features"
          itemClassName="pb-[30px] pt-[65px]"
          prev={{
            className: 'absolute right-[44px] top-0 block cursor-pointer bg-white p-0 max-md:right-[26px]',
            content: <img src={`${IMG}/owl_nav2.png`} alt="" className="block h-[44px] w-[98px] max-md:h-[26px] max-md:w-[60px]" />,
          }}
          next={{
            className: 'absolute right-0 top-0 block cursor-pointer bg-white p-0',
            content: <img src={`${IMG}/right_nav.png`} alt="" className="block h-[44px] w-[44px] max-md:h-[26px] max-md:w-[26px]" />,
          }}
        >
          {FEATURES.map((f) => (
            <div key={f.icon} className="relative mx-auto min-h-[240px] bg-[#913a82] text-center text-white">
              <div className="relative z-[1] -m-px flex h-[240px] min-w-0 flex-col break-words bg-[#913a82] p-[25px] text-center transition-transform duration-200 hover:z-[99] hover:scale-110 hover:bg-[#e12a7b] hover:[filter:drop-shadow(0_0_3px_#605c5f)]">
                <img src={f.icon} alt="" className="mx-auto block h-[100px] w-[100px]" />
                <div className="flex-auto py-[12.5px] pl-0 pr-[12.5px] text-[16px] md:max-lg:pl-[15px]">
                  <p className={cx(MAVEN, 'mb-[10px] text-[16px] leading-[1.42857143] text-white')}>
                    <Runs runs={f.runs} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
        <div>
          <h4 className="my-[10px] w-fit bg-[#e12a7b] px-[15px] py-[10px] text-[18px] font-bold leading-[1.1] text-white">
            ADMISSIONS OPEN FOR 2022 - 2024
          </h4>
        </div>
      </div>
    </section>
  );
}

function FutureIsNow() {
  return (
    <>
      <section className={PROGRAM_SECTION}>
        <div className={cx(CONTAINER, 'pt-[50px] max-md:pt-0')}>
          <HeadingPair first="THE FUTURE IS NOW" second="CHOOSE FROM OUR MASTER OF DESIGN PROGRAMMES" size="new" colClass="flex-[0_0_100%]" />
        </div>
      </section>
      <div className="relative">
        <img src={`${IMG}/bg_vector.png`} alt="" className="absolute right-0 top-[-63px] h-auto w-[9%] max-w-full" />
      </div>
    </>
  );
}

/* `.container-fluid.container-white` padding-left ladder (responsive.css) */
const WHITE_PL =
  'pl-[6%] max-md:pl-0 [@media(min-width:1300px)]:pl-[8%] [@media(min-width:1400px)]:pl-[12%] [@media(min-width:1536px)]:pl-[14%] [@media(min-width:1600px)]:pl-[16%] [@media(min-width:1750px)]:pl-[17%] [@media(min-width:1920px)]:pl-[20%] [@media(min-width:2250px)]:pl-[27%]';
/* `.owl-theme .owl-nav.disabled + .owl-dots`: a 630px row rotated 90° (top bar = slide 1) */
const DOTS_LEFT =
  'left-[-23%] md:max-lg:left-[-38%] [@media(min-width:1300px)]:left-[-21%] [@media(min-width:1400px)]:left-[-18%] [@media(min-width:1536px)]:left-[-12%] [@media(min-width:1600px)]:left-[-8%] [@media(min-width:1750px)]:left-[-5%] [@media(min-width:1920px)]:left-[-1%] [@media(min-width:2250px)]:left-[11%]';

function Spec({ s }) {
  return (
    <div className={cx('flow-root w-full pr-0', WHITE_PL)}>
      <h1 className="mb-[10px] mt-[20px] text-[36px] font-medium leading-[1.1]">
        {s.title.map((t, i) => (
          <span key={t}>
            {i > 0 && <br />}
            <span
              className={cx(
                FONT_ROBOTO,
                'text-[80px] font-bold leading-[0.99] md:max-lg:text-[63px] max-md:text-[38px] [@media(min-width:1536px)]:text-[90px]',
                i ? 'text-[#342b7c]' : 'text-[#e12a7b]',
              )}
            >
              {t}
            </span>
          </span>
        ))}
      </h1>
      {/* `.row.rowforposition` is `position: absolute` with no width, so it shrinks to its paragraph's
          single-line width (capped by the space left) and the col-md-4 takes a third of that */}
      <div className="relative">
        <div className="absolute -mx-[15px] flex w-max max-w-[calc(100%+30px)] flex-wrap max-md:relative max-md:w-auto max-md:max-w-none">
          <div className="relative w-full px-[15px] md:w-[33.333333%] md:max-w-[33.333333%] md:flex-[0_0_33.333333%]">
            <p className={cx(MAVEN, 'mb-[10px] pl-[5px] text-[16px] font-bold leading-[1.42857143]')}>{s.text}</p>
          </div>
        </div>
      </div>
      <article className="max-md:mt-[25px]">
        <div className="-mx-[15px] flex flex-wrap items-end">
          <div className="relative w-full px-[15px] md:max-w-[41.666667%] md:flex-[0_0_41.666667%]">
            <div className="flex-auto pb-0 pl-0 pr-[12.5px] pt-[12.5px] md:max-lg:pl-[15px] xl:pt-[16px] [@media(min-width:992px)_and_(max-width:1298px)]:pt-0 [@media(min-width:1200px)_and_(max-width:1279px)]:pt-[16px]">
              <div className="-mr-[15px] ml-0 flex flex-wrap">
                <h6 className="float-left mb-[10px] mt-0 bg-[#342b7c] py-[10px] pl-[15px] pr-[45px] text-[12px] font-medium leading-[1.1] text-white max-lg:bg-black md:max-lg:py-[5px]">
                  <span className="text-[18px] [line-height:normal]">CAREER</span>
                  <br className="max-md:hidden" /> <span className="text-[18px] [line-height:normal]">PATHWAYS</span>
                </h6>
              </div>
              <div className="-mr-[15px] ml-0 flex flex-wrap">
                <ul className="mb-[10px] mt-[10px] [list-style-image:url(/assets/lp2022/pg/mdes/new_images/bullets_small.png)] md:max-lg:mt-[6px] max-md:[list-style-image:url(/assets/lp2022/pg/mdes/bullets_small.png)]">
                  {s.careers.map((c) => (
                    <li key={c} className="list-inside text-[16.8px] leading-[30px] md:max-lg:text-[14px] md:max-lg:leading-[22px]">
                      <span className={cx(MAVEN, 'ml-[9px] align-middle font-medium')}>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between">
                <div className="relative inline-flex align-middle">
                  <FormJumpButton
                    title="Go to top"
                    className={cx(MAVEN, 'relative mt-[7px] block w-[140px] cursor-pointer rounded-none border-0 bg-[#e12a7b] p-[10px] text-center text-[12px] leading-[1.5] text-white outline-none')}
                  >
                    Know More
                  </FormJumpButton>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex w-full justify-end px-[15px] max-md:mt-[35px] md:max-w-[58.333333%] md:flex-[0_0_58.333333%]">
            <img
              src={s.image}
              alt=""
              className={cx(
                'float-left -mt-[31px] w-[642px] max-w-none max-md:hidden md:max-lg:mt-[115px] md:max-lg:w-[445px]',
                s.tall
                  ? '[@media(min-width:1536px)]:-mt-[50px] [@media(min-width:1536px)]:w-[674px]'
                  : '[@media(min-width:1536px)]:-mt-[93px] [@media(min-width:1536px)]:w-[730px]',
              )}
            />
            <img src={s.image} alt="" className="relative mr-[15px] w-full md:hidden" />
          </div>
        </div>
      </article>
    </div>
  );
}

function Specializations() {
  return (
    <section className="relative pl-[3%] pt-[50px] max-md:p-0 md:max-lg:px-[3%] md:max-lg:pt-[46px] [@media(min-width:992px)_and_(max-width:1298px)]:py-[5px]">
      <div className="w-full pl-[15px] pr-0">
        <OwlCarousel
          pvClass="[--pv:1]"
          margin={20}
          label="Master of Design programmes"
          dots={{
            className: cx(
              'absolute top-[324px] mt-[10px] block rotate-90 whitespace-nowrap text-center md:max-lg:top-[302px] [@media(min-width:1536px)]:top-[335px]',
              DOTS_LEFT,
              'max-md:relative max-md:left-[-7px] max-md:top-[13px] max-md:rotate-0',
            ),
            dotClassName: 'inline-block cursor-pointer border-0 bg-transparent p-0 align-baseline',
            activeClassName:
              'block h-[10px] w-[70px] border border-solid border-[#342b7c] bg-[#342b7c] md:max-lg:w-[66px] max-md:w-[37px] [@media(min-width:1536px)]:w-[73px]',
            spanClassName:
              'block h-[10px] w-[70px] border-2 border-solid border-[#c2bfd7] bg-[#c2bfd7] transition-opacity duration-200 hover:border hover:border-[#342b7c] hover:bg-[#342b7c] md:max-lg:w-[66px] max-md:w-[37px] [@media(min-width:1536px)]:w-[73px]',
          }}
        >
          {SPECIALIZATIONS.map((s) => (
            <Spec key={s.title.join(' ')} s={s} />
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
}

function Curriculum() {
  return (
    <>
      <section className={PROGRAM_BASE}>
        <div className={cx(CONTAINER, 'pt-[95px] max-md:pt-[45px]')}>
          <HeadingPair first="EXPERIENCE A TRULY NEW-AGE CURRICULUM" second="SECOND TO NONE" size="new" colClass="flex-[0_0_100%]" />
        </div>
      </section>
      <section className="relative -mt-[45px] pb-[65px] pt-[20px] max-md:-mt-px max-md:pb-[10px] max-md:pt-[40px] md:max-lg:pr-[3%]">
        <div className={cx(CONTAINER, 'pt-[95px] max-md:pt-0')}>
          <div className="-mx-[15px] flex flex-wrap max-md:flex-nowrap">
            <div className="relative w-full px-[15px] max-md:-mb-[35px] md:max-w-full md:flex-[0_0_100%]">
              <img src={`${IMG}/info.png`} alt="" className="inline max-w-full max-md:relative" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Extraordinary() {
  const text =
    'relative ml-[15px] px-[15px] py-[61px] text-white xl:py-[62px] md:max-lg:pb-[7px] md:max-lg:pt-[4px] max-md:py-0 [@media(min-width:992px)_and_(max-width:1199px)]:py-[16px]';
  return (
    <section className="relative pb-[40px] pt-[6%] max-md:-mx-[15px] max-md:mt-[165px] max-md:bg-[#e12a7b] max-md:bg-[url(/assets/lp2022/pg/mdes/new_images/design_future_back.png)] max-md:bg-contain max-md:bg-no-repeat max-md:pb-0 max-md:pt-[65px] [@media(min-width:992px)_and_(max-width:1298px)]:py-[40px] [@media(min-width:1450px)]:py-[50px]">
      <div className="mt-[100px] flex items-center justify-center bg-[#e12a7b] bg-[url(/assets/lp2022/pg/mdes/new_images/design_future_back.png)] bg-contain bg-no-repeat px-[15px] max-md:inline">
        {/* < 768 both containers are `display: initial` (inline); BS3's `:before/:after { display:
            table }` clearfix pseudos then open a 20px line above and below the content */}
        <div className="h-0 md:hidden" />
        <div className={cx(CONTAINER, 'flex items-center justify-center max-md:inline')}>
          <div className="relative w-full max-w-[50%] flex-[0_0_50%] px-[15px] max-md:hidden">
            <img
              src={`${IMG}/design_future_img.png`}
              alt=""
              className="-mt-[20%] inline w-[550px] max-w-none md:max-lg:w-[345px] [@media(min-width:992px)_and_(max-width:1199px)]:w-[454px]"
            />
          </div>
          <div className="relative w-full px-[15px] md:hidden">
            <img src={`${IMG}/design_future_img_mob.png`} alt="" className="relative -mt-[200px] inline w-full" />
          </div>
          <div className={cx(text, 'max-w-[8.333333%] flex-[0_0_8.333333%] max-md:hidden')} />
          <div className={cx(text, 'w-full md:max-w-[41.666667%] md:flex-[0_0_41.666667%]')}>
            <div className="max-w-[400px] max-md:max-w-[330px]">
              <h3
                className={cx(
                  FONT_ROBOTO,
                  'mb-[30px] mt-[20px] pl-[20px] text-[24px] font-bold leading-[1.1] text-white md:max-lg:mb-[10px] md:max-lg:text-[20px] md:max-lg:italic',
                )}
              >
                Experience the extraordinary.
                <br /> Experience ATLAS.
              </h3>
              {ABOUT.map((t) => (
                <p key={t} className={cx(MAVEN, 'mb-[15px] pl-[20px] pr-0 text-[17px] leading-[1.42857143] text-white md:max-lg:text-[14px] max-md:pr-[20px]')}>
                  {t}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="h-0 md:hidden" />
      </div>
    </section>
  );
}

function Placement() {
  return (
    <section className="max-md:pt-[45px]">
      <div className={CONTAINER}>
        <HeadingPair first="PLACEMENT" second="PARTNERS" vector colClass="n576:flex-[0_0_25%]" vectorPad={VEC2} sec5 />
      </div>
      <div
        className={cx(
          CONTAINER_BOX,
          'block w-full bg-white px-[15px] pb-[50px] pt-[20px] max-md:mt-[20px] max-md:pb-[35px] max-md:pt-[13px] [@media(min-width:1366px)]:mt-[20px] [@media(min-width:1366px)]:pb-[45px]',
        )}
      >
        <div className="m-auto grid grid-cols-6 gap-x-[10px] gap-y-[25px] max-md:grid-cols-3">
          {LOGOS.map((l) => (
            <img key={l} src={l} alt="" className="m-auto block w-[165px] md:max-lg:w-[100px] max-md:relative max-md:w-[80px]" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className={PROGRAM_SECTION}>
      <div className={cx(CONTAINER, 'pt-[65px] max-md:pt-0')}>
        <HeadingPair first="HEAR FROM" second="OUR STUDENTS" vector colClass="n576:flex-[0_0_33.333333%]" vectorPad={VEC1} />
        <SlickSlider label="Hear from our students" className="mb-[65px] mt-[65px] max-md:mt-[45px]" dotsClassName="bottom-[-45px] max-md:bottom-[-25px]">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="relative flex min-w-0 flex-col break-words rounded-[2.5px] bg-white">
              <div className="flex">
                <div className="w-fit flex-auto pb-[12.5px] pl-[25px] pr-[12.5px] pt-[5px] md:max-lg:pl-[15px] md:max-lg:pt-[12.5px] max-md:m-0 max-md:p-0">
                  <h4 className={cx(MAVEN, 'mb-[7.5px] mt-0 text-[18px] font-bold leading-[1.1] max-md:text-[20px]')}>{t.name}</h4>
                  <div className="relative mt-[10px] flex w-full max-w-full flex-1 basis-0 justify-start p-0">
                    <p className={cx(MAVEN, 'mb-[7.5px] mt-0 text-[14px] font-bold leading-[1.42857143] max-md:text-[20px]')}>{t.cls}</p>
                  </div>
                  <p
                    className={cx(
                      MAVEN,
                      'h-[45px] w-[97%] pr-[11px] text-[14px] leading-[1.42857143] text-black md:max-lg:h-[58px] md:max-lg:pr-[9px] md:max-lg:text-[13px] max-md:h-auto max-md:pr-[9px] max-md:text-[18px]',
                    )}
                  >
                    {t.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </SlickSlider>
      </div>
    </section>
  );
}

function Videos() {
  const col = 'relative min-h-px w-full text-center lg:float-left lg:w-1/3 md:max-lg:mx-auto md:max-lg:max-w-[33.333333%]';
  return (
    <div className={cx(CONTAINER, 'mb-[65px] -mt-[30px] flow-root text-center md:max-lg:mt-[50px] max-md:mb-[70px]')}>
      {VIDEOS.map((id, i) => (
        <div key={id} className={cx(col, i === 0 ? 'lg:pr-[15px]' : i === 2 ? 'lg:pl-[15px]' : '')}>
          <iframe
            className="inline h-[280px] w-full align-baseline md:max-lg:w-[300px]"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

function Footer() {
  const label = 'text-[#e7e7e7]';
  const col6 = 'relative w-full px-[15px] md:max-w-[50%] md:flex-[0_0_50%]';
  const addr = cx(MAVEN, 'mb-[10px] mt-[9%] text-[14px] font-bold leading-[20px] text-[#e7e7e7]');
  return (
    <footer>
      <section className="bg-black px-[3%] py-[100px] max-md:-mt-[20px] max-md:px-[5%] max-md:pb-[15%] max-md:pt-[45px] md:max-lg:mt-[43px] md:max-lg:pb-[70px] md:max-lg:pt-[65px] [@media(min-width:992px)_and_(max-width:1298px)]:-mt-[15px] [@media(min-width:992px)_and_(max-width:1298px)]:pb-[70px]">
        <div className={cx(CONTAINER, 'relative')}>
          <div className="-mx-[15px] flex flex-wrap">
            <div className={col6}>
              <h3 className={cx(MAVEN, 'mb-[10px] mt-[20px] text-[24px] font-bold uppercase leading-[1.1] text-white')}>
                Talk to <br />
                us
              </h3>
              <p className={cx(addr, 'max-md:hidden')}>
                EQUINOX, TOWER NO.1, <br />
                LBS MARG, KURLA WEST,
                <br />
                MUMBAI - 400070 MAHARASHTRA
              </p>
              <a href={PHONE} className={cx(MAVEN, 'text-[13.46px] font-bold text-white hover:text-white hover:no-underline max-md:hidden')}>
                <Phone className="mr-[4px] text-white" /> +91 7304464514
              </a>
              <div className="absolute bottom-0 text-white max-md:hidden">
                <p className={addr}>
                  ©<CurrentYear />. ATLAS SkillTech University, All Rights Reserved.
                </p>
              </div>
            </div>
            <div className={col6}>
              <form id="footer_enquire-form" className="max-md:mt-[5%] max-md:w-[90%]">
                <h5 className="my-[10px] text-[22px] font-medium leading-[1.1] text-white">APPLY NOW</h5>
                <div className="-mx-[15px] flex flex-wrap">
                  <div className={col6}>
                    <Field id="footer-name" name="name" label="Name" placeholder="Type your Name" labelClass={label} />
                  </div>
                  <div className={col6}>
                    <Field id="footer-email" name="email" label="Email Id" type="email" placeholder="Type your email id" labelClass={label} />
                  </div>
                  <div className={col6}>
                    <Field id="footer-phone" name="phone" label="Mobile Number" placeholder="Type your mobile number" labelClass={label} />
                  </div>
                  <div className={col6}>
                    <ProgramSelect id="footer-program" labelClass={label} />
                  </div>
                  <div className={col6}>
                    <div className={FIELD}>
                      <label htmlFor="footer-city" className={cx(LABEL, label)}>
                        City
                      </label>
                      <input type="text" id="footer-city" name="city" placeholder="Type your City" className={INPUT} />
                    </div>
                  </div>
                  <div className={col6}>
                    <button type="submit" disabled className={cx(SUBMIT, 'mt-[20px] hover:bg-[#e12a7b]')}>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <div className="relative w-full px-[15px] md:hidden">
                <p className={addr}>
                  EQUINOX, TOWER NO.1,
                  <br />
                  LBS MARG, KURLA WEST,
                  <br />
                  MUMBAI - 400070 MAHARASHTRA
                </p>
                <a href={PHONE} className={cx(MAVEN, 'text-[14px] font-bold text-white hover:text-white hover:no-underline')}>
                  <Phone className="mr-[4px] text-white" /> +91 7304464514
                </a>
                <p className={addr}>
                  ©<CurrentYear />. ATLAS SkillTech University, All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
