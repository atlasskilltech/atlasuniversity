/* The remaining homepage blocks of the Meeta template, as each Aarohan year renders them:
   .meeta-event-sponsors-3 ("In association with", 2024 only), .meeta-about-section (image over
   the shape-4 wash + the overlapping white title panel, then 2024/2025's full-width summary,
   "Conference Topics" and "Summit Objectives" columns), .meeta-features-section ("Why attend
   the Summit" - also the books block on 2023's Martin Roll page) and the mobile sticky CTA. */
import { A, ARCHIVO, BSD, colClass, COL_BASE, CONTAINER, LINK, Rich, ROW, SECTION_PAD } from './ui';
import Reveal from './Reveal';

/* ---------------------------------------------------------------- sponsors (2024) */
export function Sponsors({ data, year }) {
  return (
    <div className={SECTION_PAD[year]}>
      <div className={CONTAINER}>
        <div className="mb-[55px] text-center">
          <h2 className={`${ARCHIVO} text-[40px] font-bold leading-[52px] text-[#1a0a1e] max-lp:text-[30px] max-lp:leading-[40px]`}>{data.title}</h2>
        </div>
        <div className="-mt-[30px]">
          <div className={ROW.default}>
            {data.cols.map((c, i) => (
              <div key={i} className={`${COL_BASE.default} ${colClass(c.cols)}`}>
                {c.logo && (
                  <div className="group mt-[30px] h-[130px] bg-[#fafafa] p-[30px] text-center leading-[65px] transition-all duration-500 ease-[cubic-bezier(.645,.045,.355,1)] hover:shadow-[0_0_30px_rgba(0,0,0,.1)]">
                    <a href={c.logo.href} className={LINK}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.logo.img} alt={c.logo.alt} className="transition-all duration-500 group-hover:opacity-75" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- about */
/* .meeta-about-title is a white panel pulled 260px left over the image from 992 up (0 below);
   on the home page it uses .meeta-section-title (Big Shoulders 60px), on the About page
   .meeta-section-title-2 (Archivo 54px). Paragraphs get margin-top 30px. */
const TITLE = {
  one: { wrap: 'mb-[55px]', sub: `${BSD} mb-[5px] text-[18px] font-bold leading-[1.5] text-[#fc097c]`, h: `${BSD} text-[60px] font-bold leading-[1.1] text-[#1a0a1e] max-md:text-[40px] max-lp:text-[28px]` },
  two: {
    wrap: 'mb-[55px]',
    sub: `${ARCHIVO} mb-[5px] text-[18px] font-semibold leading-[1.5] text-[#fc097c]`,
    h: `${ARCHIVO} text-[54px] font-bold leading-[60px] text-[#1a0a1e] [@media(min-width:992px)_and_(max-width:1199px)]:text-[48px] max-lg:text-[40px] max-lg:leading-[50px] max-lp:text-[30px] max-lp:leading-[40px]`,
  },
};

export function About({ data, year }) {
  const t = TITLE[data.titleStyle];
  return (
    <div className={`overflow-hidden ${SECTION_PAD[year]}`}>
      <div className={CONTAINER}>
        <div className={`${ROW.gy5} items-center`}>
          <div className={`${COL_BASE.gy5} lg:w-[58.333333%] lg:flex-[0_0_auto]`}>
            <div
              className="bg-cover bg-center bg-no-repeat px-[100px] py-[75px] [@media(min-width:577px)_and_(max-width:1199px)]:px-[70px] [@media(min-width:577px)_and_(max-width:1199px)]:py-[55px] max-lp:px-[30px] max-lp:py-[25px]"
              style={{ backgroundImage: `url(${data.shapeBg})` }}
            >
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.img} alt="About" />
              </div>
            </div>
          </div>
          <div className={`${COL_BASE.gy5} lg:w-[41.666667%] lg:flex-[0_0_auto]`}>
            <div className={`${t.wrap} -ml-[260px] bg-white px-[65px] py-[45px] max-lg:ml-0 max-lg:p-0`}>
              <h4 className={t.sub}>{data.sub}</h4>
              <h2 className={t.h}>
                <Rich nodes={data.title} />
              </h2>
            </div>
            <div className="px-[30px] max-lg:px-0 [&_p]:mt-[30px]">
              {data.paras.map((p, i) => (
                <p key={i}>
                  <Rich nodes={p} />
                </p>
              ))}
            </div>
          </div>
          {data.blocks.map((b, i) => (
            <div key={i} className={`${COL_BASE.gy5} lg:w-full lg:flex-[0_0_auto]`}>
              {b.plain ? (
                <Rich nodes={b.plain} />
              ) : (
                <>
                  <div className="m-0 bg-white px-[65px] py-[45px] max-lg:p-0">
                    {b.sub && <h4 className={TITLE.one.sub}>{b.sub}</h4>}
                    <h2 className={TITLE.one.h}>{b.title}</h2>
                  </div>
                  <div className="px-[30px] max-lg:px-0 [&_p]:mt-[30px]">
                    <Topics nodes={b.content} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 2025's "Conference Topics" list is `ul.arrow-columns`, styled by index.php's own <style>:
   auto-fill columns of min 280px (one column at <=600), 15px/25px gaps, a 6px #4a6bdf chevron
   drawn from two borders. */
function Topics({ nodes }) {
  return nodes.map((n, i) => {
    if (typeof n === 'object' && n.t === 'ul' && n.cls === 'arrow-columns') {
      return (
        <ul
          key={i}
          className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-x-[25px] gap-y-[15px] p-0 [@media(max-width:600px)]:grid-cols-[repeat(auto-fill,minmax(100%,1fr))] [@media(max-width:600px)]:gap-x-[15px]"
        >
          {n.c.map((li, j) => (
            <li
              key={j}
              className="relative list-none pl-5 leading-[1.4] before:absolute before:left-0 before:top-[0.5em] before:h-[6px] before:w-[6px] before:rotate-45 before:border-r-2 before:border-t-2 before:border-solid before:border-[#4a6bdf] before:content-['']"
            >
              <Rich nodes={li.c} />
            </li>
          ))}
        </ul>
      );
    }
    return <Rich key={i} nodes={[n]} />;
  });
}

/* ---------------------------------------------------------------- features */
export function Features({ data, year, assets }) {
  const items = Object.fromEntries(data.items.map((x) => [x.n, x]));
  const MT = { 1: 'mt-[115px] max-lg:mt-[50px]', 2: 'max-lg:mt-[30px]', 3: 'mt-[30px]', 4: 'mt-[80px] max-lg:mt-[30px]' };
  return (
    <div
      className={`relative z-[1] overflow-hidden bg-[#f9fafc] ${SECTION_PAD[year]} before:absolute before:left-0 before:top-0 before:-z-[1] before:h-full before:w-full before:bg-[image:var(--aar-fbg)] before:bg-center before:bg-no-repeat before:content-['']`}
      style={{ '--aar-fbg': `url(${assets.featuresBg})` }}
    >
      <Reveal anim="zoom-in" delay={700} className="absolute left-[-150px] top-[13%] -z-[1] h-[275px] w-[275px] rounded-full border-[30px] border-solid border-[#00acee]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={data.shape} alt="Shape" className="absolute right-[-60px] top-[8%] -z-[1]" />
      <div className={CONTAINER}>
        <div>
          <div className={ROW.default}>
            {data.cols.map((col, ci) => (
              <div key={ci} className={`${COL_BASE.default} lg:w-1/3 lg:flex-[0_0_auto]`}>
                {ci === 0 && data.title && (
                  <div className="mb-[55px] max-lg:text-center">
                    <h2 className={TITLE.two.h}>{data.title}</h2>
                  </div>
                )}
                {col.map((n) => {
                  const it = items[n];
                  return (
                    <div key={n} className={`group bg-white px-[45px] pb-[50px] pt-10 shadow-[0_0_84px_0_rgba(0,0,0,.05)] ${MT[n]}`}>
                      {it.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={it.img} alt="Feature" />
                      ) : (
                        <>
                          <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={it.icon} alt="Icon" className="transition-all duration-500 ease-[cubic-bezier(.645,.045,.355,1)] group-hover:[transform:scale(-1)_rotate(180deg)]" />
                          </div>
                          <div className="mt-10">
                            <h3 className={`${ARCHIVO} text-[22px] font-bold leading-[30px] text-[#1a0a1e]`}>
                              <A href={it.href} className={LINK}>
                                {it.title}
                              </A>
                            </h3>
                            <p className="mt-5 text-[16px] leading-[30px]">
                              <Rich nodes={it.text} />
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- sticky CTA */
/* .sticky_booknow: a full-width fixed pink bar at <=600. Above that the template leaves it an
   unstyled block holding a white link - an invisible 26px line between the features section
   and the footer, kept so the page keeps its height. */
export function StickyCta({ data }) {
  return (
    <div className="[@media(max-width:600px)]:fixed [@media(max-width:600px)]:bottom-0 [@media(max-width:600px)]:z-10 [@media(max-width:600px)]:w-full">
      <a
        href={data.href}
        className="inline-block text-white hover:text-white [@media(max-width:600px)]:m-0 [@media(max-width:600px)]:flex [@media(max-width:600px)]:h-full [@media(max-width:600px)]:max-h-[7.5vh] [@media(max-width:600px)]:min-h-[7.5vh] [@media(max-width:600px)]:items-center [@media(max-width:600px)]:justify-center [@media(max-width:600px)]:rounded-none [@media(max-width:600px)]:bg-[#fc097c] [@media(max-width:600px)]:p-0 [@media(max-width:600px)]:text-center [@media(max-width:600px)]:text-[1.8em]"
      >
        {data.label}
      </a>
    </div>
  );
}
