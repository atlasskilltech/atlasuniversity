/* eslint-disable @next/next/no-img-element -- plain <img> as the reference renders it (project convention) */
import { cx } from '@/lib/cx';
import { LP2X_FONT_VARS } from '@/lib/landing/lp2x/fonts';
import {
  ABOUT,
  FEATURE_CARDS,
  FEATURE_CARDS_MOBILE,
  HIGHLIGHTS_DESKTOP,
  HIGHLIGHTS_MOBILE,
  LOGOS_DESKTOP,
  LOGOS_MOBILE,
  SCHOOLS,
  TESTIMONIALS,
} from '@/lib/landing/lp2x/content';
import OwlCarousel from '../shared/OwlCarousel';
import { DesktopHeader, MobileTop } from './Header';
import LeadForm from './LeadForm';
import Footer from './Footer';
import { COL, COL_BOX, CONTAINER, CONTAINER_NESTED, FONT_M, FONT_MXB, FONT_R, KICKER, LG, MD, OUTLINE, ROW } from './ui';

/**
 * The "Experience The Extraordinary" ATLAS SkillTech University landing page — reference
 * `lp23/index.php`, `lp24/index.php`, `lp25/index.php`, `lp25/ismeug/index.php` (all four are this one
 * page; only the school list and the form slot differ — lib/landing/lp2x/variants.js). Its own header
 * and footer; the site chrome is hidden for these routes by MainSiteOnly.
 *
 * Measured on production at 1920 / 1440 / 768 / 390. Sections, in the reference's order:
 *   header (fixed, >=768) | mobile top (<768) | hero + form | OUR SCHOOLS band | school rows |
 *   SUCCESS STORIES band | #testimonials (Owl: 3 per view from 1000, else 1; autoplay 5s) |
 *   UNIVERSITY HIGHLIGHTS band | highlights (one composed slide >=768 / Owl of 3 <768) | purple strip
 *   behind | four feature cards (row >=768 / Owl <768) | LIFE AS AN ATLAS STUDENT band | logo wall |
 *   ATLAS / HOME TO LEADERS & THINKERS band | about copy over the collage | footer.
 *
 * Reference defects, not reproduced:
 *   - production serves the page as windows-1252 bytes under a UTF-8 charset, so every ’ and – paints
 *     as U+FFFD; the intended characters are used.
 *   - `bootstrap/js/bootstrap.js` 404s (served as HTML) and the scroll-to-top script throws on every
 *     scroll (`#myBtn-dwM` is commented out) — console noise only.
 *   - `.prograFeatureCol*` images are `width: 100%` under a fixed 350px height upstream, which
 *     stretches them at >= 992; that IS what renders, so it is kept.
 */
export default function Lp2xPage({ variant }) {
  const schools = SCHOOLS[variant.key];
  return (
    <div
      data-lp2x=""
      className={cx(
        LP2X_FONT_VARS,
        FONT_M,
        'overflow-x-hidden bg-white text-[14px] leading-[1.42857] text-[#333] subpixel-antialiased',
      )}
    >
      <DesktopHeader />

      {/* ref section.banner-section.hidden-xs */}
      <section
        className="mt-[109px] h-[740px] bg-cover bg-no-repeat max-md:hidden"
        style={{ backgroundImage: 'url(/assets/lp2x/university/banner.webp)' }}
      >
        <div className={CONTAINER}>
          <div className={cx(ROW, 'items-end [@media(min-width:1500px)]:h-[670px]')}>
            <div className={cx(COL, MD[6])}>
              <h1 className="mb-[25px] text-[55px] font-extrabold uppercase leading-[0.9] tracking-[-2px] text-white [-webkit-text-stroke:1.2px_#00B2BA] max-lg:ml-[15px] md:max-lg:text-[30px]">
                Experience The Extraordinary
              </h1>
            </div>
            <div id="getInfo" className={cx(COL, MD[6])}>
              <div className="mt-[30px] w-full">
                <LeadForm form={variant.forms.desktop} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <MobileTop heading="Experience The Extraordinary" mobileBg="/assets/lp2x/university/banner-mobile.webp" />
      {/* ref div.form-div.visible-xs#getInfoM */}
      <div id="getInfoM" className="my-[15px] w-full md:hidden">
        <LeadForm form={variant.forms.mobile} />
      </div>

      {/* ref section.section2#schoolshref */}
      <section id="schoolshref" className="mt-[40px]">
        <div className="w-full bg-[#00B2BA] px-0 py-[30px]">
          <div className={CONTAINER}>
            <div className="-mx-[15px] flex flex-nowrap">
              <div className={cx(COL, MD[4])}>
                <h1 className={cx(OUTLINE, 'my-[15px] text-[60px] max-md:text-[32px] md:max-lg:text-[45px]')}>OUR SCHOOLS</h1>
              </div>
              <div className={cx(COL, MD[5])}>
                <img src="/assets/lp2x/university/sqaure-1.png" alt="" width={109} height={98} className="w-[12%] max-md:w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ref section.section3 — one `.row-school-section` per school, text and photo alternating */}
      <section className="my-[40px]">
        <div className={CONTAINER}>
          {schools.map((s) => (
            <School key={s.tone} school={s} />
          ))}
        </div>
      </section>

      {/* ref section.section4#successStorieshref */}
      <section id="successStorieshref">
        <div className="w-full bg-[#342B7C] px-0 py-[30px]">
          <div className={cx(CONTAINER, 'max-md:flex')}>
            <div className="-mx-[15px] flex flex-nowrap">
              <div className={cx(COL, MD[7])}>
                <h1 className={cx(OUTLINE, 'text-[60px] max-lg:text-[45px]')}>SUCCESS STORIES</h1>
              </div>
              <div className={cx(COL, MD[5])}>
                <img src="/assets/lp2x/university/sqaure-2.png" alt="" width={228} height={233} className="w-[12%] max-md:w-1/2" />
              </div>
            </div>
          </div>
          <div className={CONTAINER}>
            <div className={cx(COL_BOX, 'mt-[10px] p-0', MD[12])}>
              <p className={cx(FONT_R, 'mb-0 text-[16px] leading-[1.42857] text-white max-md:text-[14px]')}>
                Graduate ready for placements in leading organisations <br className="max-md:hidden" />
                and acceptances in top-ranked international universities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ref section.section5 > #testimonials */}
      <section className="my-[40px]">
        <div className="w-full px-[15px]">
          <OwlCarousel
            label="Success stories"
            pvClass="[--pv:1] [@media(min-width:1000px)]:[--pv:3]"
            autoplay={5000}
            prev={{ className: NAV_TESTI.prev, content: <NavImg dir="prev" /> }}
            next={{ className: NAV_TESTI.next, content: <NavImg dir="next" /> }}
          >
            {TESTIMONIALS.map((t) => (
              <Testimonial key={t.name} t={t} />
            ))}
          </OwlCarousel>
          {/* `.owl-theme .owl-nav { margin-top: 10px }` on the empty nav row */}
          <div className="h-[10px]" />
        </div>
      </section>

      {/* ref section.section6#whyAtlashref */}
      <section id="whyAtlashref">
        <div className="w-full bg-[#00B2BA] px-0 py-[30px]">
          <div className={cx(CONTAINER, 'max-md:flex')}>
            <div className="-mx-[15px] flex flex-nowrap">
              <div className={cx(COL, MD[5])}>
                <h2 className={KICKER}>UNIVERSITY</h2>
                <h1 className={cx(OUTLINE, 'text-[60px] max-md:text-[45px]')}>HIGHLIGHTS</h1>
              </div>
              <div className={cx(COL, MD[5])}>
                <img src="/assets/lp2x/university/square-3.png" alt="" width={177} height={176} className="w-[12%] max-md:w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ref div.sectionsthreediv: highlights + the purple strip + the four feature cards */}
      <div className="relative">
        <HighlightsDesktop />
        <HighlightsMobile />
        {/* ref section.section8A */}
        <section className="absolute top-[60%] h-[300px] w-full bg-[#342B7C] max-md:top-[28%] md:max-lg:top-[40%] md:max-lg:h-[240px]" />
        <FeatureCardsMobile />
        <FeatureCardsDesktop />
      </div>

      {/* ref section.section9#placementshref */}
      <section id="placementshref">
        <div className="w-full bg-[#21678B] px-0 py-[30px]">
          <div className={CONTAINER}>
            <div className={cx(COL, 'flex items-center', MD[12])}>
              <div>
                <h2 className={KICKER}>LIFE AS AN</h2>
                <h1 className={cx(OUTLINE, 'text-[60px] max-md:text-[45px]')}>ATLAS STUDENT</h1>
              </div>
              <img src="/assets/lp2x/university/square-5.png" alt="" width={216} height={210} className="w-1/5 md:hidden" />
              <img src="/assets/lp2x/university/square-5.png" alt="" width={216} height={210} className="ml-[25px] h-[6%] w-[6%] max-md:hidden" />
            </div>
          </div>
          <div className={CONTAINER}>
            <div className={cx(COL, MD[8])}>
              <p className={cx(FONT_R, 'mb-0 mt-[15px] text-[16px] leading-[1.42857] text-white')}>
                ATLAS Fellows have been offered placements at leading organisations across industries. Experience
                transformative opportunities to work in environments that inspire innovation and help you realise your
                global leadership potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ref section.section10 — two walls, one per breakpoint */}
      <section>
        <div className={cx(CONTAINER, 'block bg-white pb-[50px] pt-[20px] max-md:hidden')}>
          {LOGOS_DESKTOP.map((row, i) => (
            <div
              key={i}
              className={cx('m-auto grid gap-x-[10px] gap-y-[25px]', row.length === 7 ? 'grid-cols-7' : 'grid-cols-6')}
            >
              {row.map((l, j) => (
                <Logo key={j} logo={l} />
              ))}
            </div>
          ))}
        </div>
        <div className={cx(CONTAINER, 'block bg-white py-[50px] md:hidden')}>
          <div className="m-auto grid grid-cols-3 gap-x-[10px] gap-y-[25px]">
            {LOGOS_MOBILE.map((l, j) => (
              <Logo key={j} logo={l} />
            ))}
          </div>
        </div>
      </section>

      {/* ref section.section11#aboutIsmehref */}
      <section id="aboutIsmehref">
        <div className="w-full bg-[#342B7C] px-0 py-[30px]">
          <div className={CONTAINER}>
            <div className={cx(CONTAINER_NESTED, 'max-md:flex')}>
              <div className="-mx-[15px] flex flex-wrap max-md:w-full max-md:flex-nowrap">
                <div className={cx(COL, 'max-w-[66.666667%] flex-[0_0_66.666667%]', MD[7])}>
                  <h2 className={KICKER}>ATLAS</h2>
                </div>
                <div className={cx(COL, MD[5])}>
                  <img src="/assets/lp2x/university/square-5.png" alt="" width={216} height={210} className="w-[12%] max-md:w-1/2" />
                </div>
              </div>
            </div>
            <div className={CONTAINER_NESTED}>
              <div className={cx(COL_BOX, 'p-0', MD[12])}>
                <h1 className={cx(OUTLINE, 'text-[60px] max-md:text-[38px]')}>
                  HOME TO LEADERS &amp;
                  <br />
                  THINKERS
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ref section.section12 */}
      <section className="my-[40px]">
        <div className="w-full p-0">
          <div className={CONTAINER}>
            <div className={cx(COL_BOX, 'p-0', MD[12])}>
              {ABOUT.map((html, i) => (
                <p key={i} className={cx('text-[16px]', i === 0 ? 'mb-[20px]' : 'mb-[40px]')}>
                  <Strong html={html} />
                </p>
              ))}
            </div>
          </div>
          <div className="relative w-full p-0">
            <div className="absolute top-1/2 h-[280px] w-full bg-[#00B2BA] max-md:top-[45%] max-md:h-[100px]" />
            <div className={CONTAINER}>
              <div className={cx(COL_BOX, 'p-0', MD[12])}>
                <img src="/assets/lp2x/b-des/last_img1.webp" alt="" width={1241} height={942} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* `p` copy carrying only <strong> runs */
function Strong({ html }) {
  return html.split(/(<strong>.*?<\/strong>)/).map((part, i) => {
    const m = part.match(/^<strong>(.*)<\/strong>$/);
    return m ? (
      <strong key={i} className="font-bold">
        {m[1]}
      </strong>
    ) : (
      part
    );
  });
}

/* `.owl-theme .owl-nav [class*=owl-]`: padding 4px 7px, margin 5px, the 17x30 arrow image */
const NAV_BTN = 'absolute m-[5px] cursor-pointer bg-transparent px-[7px] py-[4px]';
const NAV_TESTI = {
  prev: cx(NAV_BTN, 'left-[3%] top-[45%]'),
  next: cx(NAV_BTN, 'right-[3%] top-[45%]'),
};
const NAV_SIDE = {
  prev: cx(NAV_BTN, '-left-[5%] top-[35%]'),
  next: cx(NAV_BTN, '-right-[5%] top-[35%]'),
};

function NavImg({ dir }) {
  return (
    <img
      src={dir === 'prev' ? '/assets/lp2x/navTextprev.png' : '/assets/lp2x/navTextnext.png'}
      alt=""
      width={17}
      height={30}
      className="block"
    />
  );
}

const SCHOOL_TONE = {
  'school-col1': 'bg-[#E12A7B]',
  'school-col2': 'bg-[#4EABE8]',
  'school-col3': 'bg-[#ED1A3B]',
};
/* `.school-cont-logo`: natural size except ISME at 48% (`.school-cont1` upstream is a typo, so the
   ISDI logo is never sized above 767); below 768 ISDI/uGDX 50%, ISME 60% */
const SCHOOL_LOGO = {
  'school-col1': 'max-w-full max-md:w-1/2',
  'school-col2': 'max-w-full w-[48%] max-md:w-[60%]',
  'school-col3': 'max-w-full max-md:w-1/2',
};
const SCHOOL_IMG = {
  'school-col1': '/assets/lp2x/university/school-1.webp',
  'school-col2': '/assets/lp2x/university/school-2.webp',
  'school-col3': '/assets/lp2x/university/school-3.webp',
};

/**
 * `.row-school-section`: the coloured `.school-cont` and a cover photograph side by side from 992
 * (`col-lg-5/7`, ISME `col-lg-4/8` with the photo first). Below 992 both columns are full width and
 * the photo column is empty — BS3's `min-height: 1px`, which is all the photo then gets (a 1px strip,
 * as upstream).
 */
function School({ school }) {
  const flip = school.tone === 'school-col2';
  const text = (
    <div className={cx(COL_BOX, 'px-[5px]', flip ? LG[8] : LG[5])}>
      <div className={cx('px-[30px] pb-[10px] pt-[30px] text-white', SCHOOL_TONE[school.tone])}>
        <img src={school.logo} alt="" className={cx('h-auto align-middle', SCHOOL_LOGO[school.tone])} />
        <h2 className="mb-[20px] mt-[30px] text-[24px] font-bold leading-[1.1] text-white underline">Programs</h2>
        <ul className="mb-[10px] list-disc ps-[14px]">
          {school.programs.map((p) => (
            <li key={p.title} className="mb-[20px]">
              <h4 className="my-[10px] text-[20px] font-medium leading-[1.1]">{p.title}</h4>
              <span>{p.tracks}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  const photo = (
    <div className={cx(COL_BOX, 'px-[5px]', flip ? LG[4] : LG[7])}>
      <div
        className="h-full w-full bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${SCHOOL_IMG[school.tone]})` }}
      />
    </div>
  );
  return (
    <div className={cx(ROW, 'mt-[10px]')}>
      {flip ? photo : text}
      {flip ? text : photo}
    </div>
  );
}

/* `.test-cardPlacedImg*` — the badge logo widths (all `!important` upstream) */
const BADGE_W = {
  'test-cardPlacedImg': 'w-[80%] md:max-lg:w-[40%] max-md:w-[55%]',
  'test-cardPlacedImgLarge': 'w-1/2 md:max-lg:w-1/5 max-md:w-[40%]',
  'test-cardPlacedImgLarge1': 'w-[40%] max-md:w-[30%]',
};

function Testimonial({ t }) {
  return (
    <div className="relative m-[10px] flex flex-col break-words bg-white">
      <img src={t.photo} alt="Card image cap" className="block w-full" />
      <div className={cx(FONT_R, 'h-[185px] bg-[#342B7C] pb-[30px] pt-[15px] max-md:h-auto')}>
        <div className="p-[12.5px]">
          <h3 className="mb-[7.5px] mt-0 text-center text-[24px] font-semibold leading-[1.1] text-white max-md:text-[18px]">
            {t.name}
          </h3>
        </div>
        <div className="flex justify-around">
          {t.badges.map((b) => (
            <div key={b.label + b.logo} className={cx(COL, MD[6])}>
              <p className="mb-[5px] text-center text-[14px] leading-[1.42857] text-[#4EABE8]">{b.label}</p>
              <img src={b.logo} alt="" className={cx('m-auto block bg-white', BADGE_W[b.size])} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PANEL = 'flex flex-col justify-center bg-[#00B2BA] px-[35px] md:max-lg:px-[10px]';
const PANEL_H2 = `${FONT_MXB} mb-[10px] mt-[20px] text-[30px] font-bold leading-[1.1] text-white md:max-lg:text-[24px]`;
const PANEL_P = 'mb-[10px] text-[18px] text-white';

/**
 * `.section7` (>= 768): Owl is initialised on it but it holds one slide, so it never moves and draws
 * no arrows — rendered static. Row 1: a 350px teal panel beside the campus photo (both col-md-5,
 * centred); row 2: the student-life photo over a 312px panel (col-md-4) beside the masterclasses
 * panel over the group photo (col-md-6). 768-991 tightens the panel padding and heights.
 */
function HighlightsDesktop() {
  const [campus, life, cxo] = HIGHLIGHTS_DESKTOP;
  return (
    <section className="max-md:hidden">
      {/* `.container-fluid` — BS3's clearfix keeps the carousel's 40px top margin inside it */}
      <div className="flow-root w-full px-[15px]">
        {/* the one-slide `.owl-carousel` — `position: relative; z-index: 1`, so it paints over the strip */}
        <div className="relative z-[1] mt-[40px]">
          <div className={CONTAINER}>
            <div className={cx(ROW, 'items-center justify-center')}>
              <div className={cx(COL_BOX, MD[5], PANEL, 'h-[350px]')}>
                <h2 className={PANEL_H2}>
                  <Lines lines={campus.title} />
                </h2>
                <p className={PANEL_P}>{campus.text}</p>
              </div>
              <div className={cx(COL_BOX, MD[5], 'h-[350px] pl-[15px] pr-0')}>
                <img
                  src="/assets/lp2x/feature1.webp"
                  alt=""
                  width={639}
                  height={503}
                  className="m-auto block h-[350px] w-full md:max-lg:object-cover"
                />
              </div>
            </div>
            <div className={cx(ROW, 'items-start justify-center')}>
              <div className={cx(COL_BOX, MD[4], 'pb-0 pl-0 pr-[15px] pt-[15px]')}>
                <div>
                  <img src="/assets/lp2x/feature2.webp" alt="" width={441} height={411} className="block w-full" />
                </div>
                <div className={cx(PANEL, 'mt-[15px] h-[312px] md:max-lg:h-[337px]')}>
                  <h2 className={PANEL_H2}>
                    <Lines lines={life.title} />
                  </h2>
                  <p className={PANEL_P}>{life.text}</p>
                </div>
              </div>
              <div className={cx(COL_BOX, MD[6], 'px-0 pb-0 pt-[15px]')}>
                <div className={PANEL}>
                  <h2 className={PANEL_H2}>
                    <Lines lines={cxo.title} />
                  </h2>
                  <p className={PANEL_P}>{cxo.text}</p>
                </div>
                <div className="h-[485px] pt-[15px] md:max-lg:h-[310px]">
                  <img src="/assets/lp2x/feature3.webp" alt="" width={699} height={578} className="block w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Lines({ lines }) {
  return lines.map((l, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {l}
    </span>
  ));
}

/** `.section77` (< 768): `#prohramFeaturesMobile`, one slide per view, autoplay, arrows 5% outside */
function HighlightsMobile() {
  return (
    <section className="mt-[40px] md:hidden">
      <div className="w-full px-[15px]">
        <OwlCarousel
          label="University highlights"
          pvClass="[--pv:1]"
          autoplay={5000}
          prev={{ className: NAV_SIDE.prev, content: <NavImg dir="prev" /> }}
          next={{ className: NAV_SIDE.next, content: <NavImg dir="next" /> }}
        >
          {HIGHLIGHTS_MOBILE.map((h) => (
            <div key={h.image} className={CONTAINER}>
              <div className={cx(ROW, 'items-center justify-center')}>
                <div className={cx(COL, 'h-auto')}>
                  <img src={h.image} alt="" className="m-auto block h-auto w-full" />
                </div>
                <div className={cx(COL_BOX, 'mx-[15px] flex h-auto flex-col justify-center bg-[#00B2BA] px-[25px]')}>
                  <h2 className="mb-[10px] mt-[20px] text-[24px] font-bold leading-[1.1] text-white">
                    <Lines lines={h.title} />
                  </h2>
                  <p className="mb-[10px] text-[16px] text-white">{h.text}</p>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
        <div className="h-[10px]" />
      </div>
    </section>
  );
}

function FeatureCard({ c, className }) {
  return (
    <div className={cx('relative flex flex-col break-words bg-white', className)}>
      <img src={c.image} alt="Card image cap" width={289} height={290} className="block w-full" />
      <div className="p-[12.5px]">
        <h4 className={cx(FONT_MXB, 'mb-[25px] mt-[10px] text-center text-[18px] font-bold leading-[1.1] text-black')}>
          <Lines lines={c.title} />
        </h4>
        <p className="mb-0 text-center">{c.text}</p>
      </div>
    </div>
  );
}

/** `.section8.mobile-visible` (< 768): `#programFeatureTwo`, one card per view, autoplay */
function FeatureCardsMobile() {
  return (
    <section className="relative mb-[40px] py-[20px] md:hidden">
      <div className={CONTAINER}>
        <OwlCarousel
          label="Why ATLAS"
          pvClass="[--pv:1]"
          autoplay={5000}
          prev={{ className: NAV_SIDE.prev, content: <NavImg dir="prev" /> }}
          next={{ className: NAV_SIDE.next, content: <NavImg dir="next" /> }}
        >
          {FEATURE_CARDS_MOBILE.map((c) => (
            <FeatureCard key={c.image} c={c} className="mx-[15px]" />
          ))}
        </OwlCarousel>
        <div className="h-[10px]" />
      </div>
    </section>
  );
}

/** `.section8.desktop-visible` (>= 768): four col-md-3 cards, 10px card margins, over the strip */
function FeatureCardsDesktop() {
  return (
    <section className="relative mb-[40px] mt-[50px] max-md:hidden">
      <div className={CONTAINER}>
        <div className={ROW}>
          {FEATURE_CARDS.map((c) => (
            <div key={c.image} className={cx(COL, MD[3])}>
              <FeatureCard c={c} className="mx-[10px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* `.client-logo` 80% / `.client-logo2` 70%, centred in the grid cell */
function Logo({ logo }) {
  return (
    <img src={logo.src} alt="" className={cx('m-auto block', logo.cls === 'client-logo2' ? 'w-[70%]' : 'w-[80%]')} />
  );
}
