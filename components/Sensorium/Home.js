/* eslint-disable @next/next/no-img-element -- static WebP exports with their own srcSet; next/image is not used for this standalone port */
/* /sensorium homepage - production's 22 Elementor top-level sections (page 203, "Main Home"), in order.
 *
 * Elementor rules reproduced: widgets are 20px apart (.elementor-widget:not(:last-child)); column gap
 * "default" pads a column 10px, "narrow" 5px, "no" 0; columns stack below 768; per-element paddings and
 * widths are post-203.css's. Eona's content grid (GRID) is 1300 / 1100 / 960 / 768 / 86% / 82%.
 *
 * Sections not rendered because production never shows them:
 *   #7  6d25686 - a second "Influencer_1" portfolio list, elementor-hidden on desktop, tablet AND mobile;
 *   #21 e1da88f - "MEDIA HUB": its title and blog list are hidden on every device, so only the empty
 *       #fafafa band (110 + 50 column padding, 67 section padding) renders - reproduced as that band.
 * Section #1 (the Qi image slider) is the phone hero and #0 (Revolution Slider) the tablet/desktop hero,
 * as on production. */
import { home } from '@/lib/sensorium/home';
import { GRID } from '@/lib/sensorium/ui';
import Hero from './Hero';
import MobileSlider from './MobileSlider';
import PortfolioList from './PortfolioList';
import TeamList from './TeamList';
import YouTube from './YouTube';
import { Appear, SectionTitle } from './Appear';
import NumberedText from './NumberedText';

const W = '[&>*:not(:last-child)]:mb-5'; /* Elementor widget spacing */

const custom = (b, a, c, d, e, f, g) => [[Infinity, b], [1440, a], [1366, c], [1024, d], [768, e], [680, f], [480, g]];
const C2 = custom(2, 2, 2, 2, 2, 1, 1);
const C4 = custom(4, 4, 4, 2, 2, 1, 1);
const C1 = custom(1, 1, 1, 1, 1, 1, 1);
const PRE4 = [[Infinity, 4], [1024, 3], [768, 2], [680, 1]];
const S_HALF2 = '(max-width: 680px) 100vw, 25vw';
const S_FULL4 = '(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 25vw';
const S_COL = '(max-width: 767px) 100vw, 25vw';

const Spacer = () => <div className="h-[75px]" aria-hidden />;

/* one Elementor column of a full-width "narrow" section holding a single list */
function ListCol({ cls = '', children }) {
  return <div className={`w-full p-[5px] ${cls}`}>{children}</div>;
}

export default function Home() {
  const h = home;
  const L = h.lists;
  return (
    <>
      {/* 0 - Revolution Slider (>=768) */}
      <section className="relative max-md:hidden">
        <Hero slides={h.rev} text={h.revText} />
      </section>

      {/* 1 - Qi image slider (<768) */}
      <section className="relative md:hidden">
        <MobileSlider slides={h.mobileSlider} />
      </section>

      {/* 2 - ATLAS x ISDI School of Fashion */}
      <section className="relative bg-[#fafafa] max-md:pb-[100px]">
        <div className={`${GRID} flex flex-wrap`}>
          <Appear from="left" className={`flex w-full items-center pt-[10px] [@media(min-width:1025px)]:w-1/2 [@media(max-width:1024px)]:justify-end`}>
            <div className={`w-full text-center [@media(min-width:768px)_and_(max-width:1024px)]:pt-[42px] [@media(min-width:768px)_and_(max-width:1024px)]:text-left max-md:pt-[42px] max-md:text-left`}>
              <img src={h.aboutLogo.src} srcSet={h.aboutLogo.srcSet} sizes="(max-width: 1024px) 86vw, 50vw" width={h.aboutLogo.w} height={h.aboutLogo.h} alt="" className="inline-block h-auto max-w-full align-middle" />
            </div>
          </Appear>
          <div className="flex w-full items-center [@media(min-width:1025px)]:w-1/2">
            <div className="w-full [@media(min-width:1025px)]:-mt-[10px] [@media(min-width:1025px)]:pl-[6%] [@media(min-width:1025px)]:pr-[9%] [@media(min-width:768px)_and_(max-width:1024px)]:pb-[100px] [@media(min-width:768px)_and_(max-width:1024px)]:pt-[50px] max-md:pr-[5%]">
              <p className="my-[10px] text-[18px] leading-[27px] text-[#898989]">{h.aboutText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 - SENSORIUM */}
      <section className={`relative pb-[95px] pt-[85px] [@media(max-width:1024px)]:pb-[100px] [@media(max-width:1024px)]:pt-[93px]`}>
        <div className={`${GRID} flex flex-wrap`}>
          <div className={`flex w-full items-center md:w-[63.385%] [@media(min-width:768px)_and_(max-width:1024px)]:w-full [@media(min-width:768px)_and_(max-width:1024px)]:pb-[50px] [@media(min-width:768px)_and_(max-width:1024px)]:pr-[50px]`}>
            <div className={`w-full ${W}`}>
              <div className={`[@media(min-width:1025px)]:mr-[10%]`}>
                <SectionTitle title={h.sensoriumTitle} align="left" />
              </div>
              <p className="my-[10px] text-[18px] leading-[27px]">{h.sensoriumText}</p>
            </div>
          </div>
          <Appear from="right" className={`flex w-full items-center justify-center md:w-[36.196%] [@media(min-width:768px)_and_(max-width:1024px)]:w-full max-md:hidden`}>
            <img src={h.sensoriumImg.src} width={h.sensoriumImg.w} height={h.sensoriumImg.h} alt="" loading="lazy" className="inline-block h-auto max-w-full align-middle" />
          </Appear>
        </div>
      </section>

      {/* 4 - video */}
      <section className="relative">
        <div className="p-[10px]">
          <YouTube id={h.videos[0]} title="SENSORIUM - ATLAS ISDI School of Fashion" />
        </div>
      </section>

      {/* 5 - Starlight title (boxed 1140) */}
      <section id="starlight" className="relative">
        <div className="mx-auto max-w-[1140px]">
          <div className={`[@media(min-width:1025px)]:mr-5 [@media(min-width:768px)_and_(max-width:1024px)]:px-[90px] [@media(min-width:768px)_and_(max-width:1024px)]:pb-[70px] max-md:mr-6 max-md:pb-[95px] ${W}`}>
            <Spacer />
            <div className={`[@media(min-width:768px)_and_(max-width:1024px)]:mr-[15%]`}>
              <SectionTitle title={h.titles['3c8ce3f']} />
            </div>
          </div>
        </div>
      </section>

      {/* 6 - Starlight: Influencer | Celebrity */}
      <section className="relative">
        <div className="flex flex-wrap">
          <ListCol cls="md:w-1/2">
            <PortfolioList items={L.Influencer} cols={C2} sizes={S_HALF2} />
          </ListCol>
          <ListCol cls="md:w-1/2">
            <PortfolioList items={L.Celebrity} cols={C2} sizes={S_HALF2} />
          </ListCol>
        </div>
      </section>

      {/* 8 - figures */}
      <section className="relative bg-[#fafafa] pb-[79px] pt-[123px]">
        <div className={`${GRID} flex flex-wrap`}>
          {h.numbers.map((nb, i) => (
            <div
              key={nb.t}
              className={`w-full [@media(min-width:1025px)]:w-1/4 [@media(min-width:768px)_and_(max-width:1024px)]:w-1/2 ${i < 2 ? '[@media(max-width:1024px)]:mb-[10px]' : ''}`}
            >
              <div className={`pr-3 [@media(min-width:768px)_and_(max-width:1024px)]:pr-[5%] ${i === 2 ? 'max-md:pb-[10px] max-md:pr-0' : 'max-md:pr-[5%]'}`}>
                <NumberedText number={nb.n} title={nb.t} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9 - The Collection title + student list */}
      <section id="collection" className="relative">
        <div className={`p-[10px] ${W}`}>
          <Spacer />
          <div className={`[@media(min-width:768px)_and_(max-width:1024px)]:mr-[15%]`}>
            <SectionTitle title={h.titles.cf5bdc7} />
          </div>
          <PortfolioList items={L.student} cols={C4} sizes={S_FULL4} />
        </div>
      </section>

      {/* 10-14 - collection rows */}
      {[
        ['left1', 'm1', 'r1'],
        ['m4-1'],
        ['left2', 'm2', 'r2'],
        ['m4-2'],
        ['left3', 'm3', 'r3'],
      ].map((row) => (
        <section key={row.join()} className="relative">
          <div className="flex flex-wrap">
            {row.length === 1 ? (
              <ListCol>
                <PortfolioList items={L[row[0]]} cols={C4} sizes={S_FULL4} />
              </ListCol>
            ) : (
              <>
                <ListCol cls="md:w-1/4">
                  <PortfolioList items={L[row[0]]} cols={C1} sizes={S_COL} />
                </ListCol>
                <ListCol cls="md:w-1/2">
                  <PortfolioList items={L[row[1]]} cols={C2} sizes={S_COL} />
                </ListCol>
                <ListCol cls="md:w-1/4">
                  <PortfolioList items={L[row[2]]} cols={C1} sizes={S_COL} />
                </ListCol>
              </>
            )}
          </div>
        </section>
      ))}

      {/* 15-17 - team lists */}
      {[
        ['couturiers', 'a656648', '32be322', 'max-md:px-[5%]'],
        [undefined, 'd3d8547', '05f3dcc', 'max-md:px-[5%]'],
        ['mentors', 'c2c78a4', '240f3e4', 'pb-[30px]'],
      ].map(([id, t, list, tcls]) => (
        <section key={t} id={id} className="relative">
          <div className={`p-[10px] ${W}`}>
            <Spacer />
            <div className={tcls}>
              <SectionTitle title={h.titles[t]} />
            </div>
            <TeamList members={h.teams[list]} />
          </div>
        </section>
      ))}

      {/* 18 - BTS */}
      <section id="BTS" className="relative">
        <div className={`p-[10px] ${W}`}>
          <Spacer />
          <div className="pb-[30px]">
            <SectionTitle title={h.titles['3654f04']} />
          </div>
          <YouTube id={h.videos[1]} title="BTS - BEHIND THE SCENES" />
        </div>
      </section>

      {/* 19 - spacer */}
      <section className="relative">
        <div className="p-[10px]">
          <Spacer />
        </div>
      </section>

      {/* 20 - photo gallery */}
      <section className="relative">
        <div className={`p-[10px] ${W}`}>
          <div className="pb-[30px]">
            <SectionTitle title={h.titles['43a1b3d']} />
          </div>
          <PortfolioList items={L.FEATURED} cols={PRE4} fixed variant="below" sizes="(max-width: 680px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
          <div className="text-center">
            <a
              href={h.button.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-[3px] bg-[#54595f] px-6 py-3 text-[15px] leading-none text-white transition-all duration-300 hover:opacity-90"
            >
              {h.button.text}
            </a>
          </div>
        </div>
      </section>

      {/* 21 - MEDIA HUB band (its content is hidden on every device upstream) */}
      <section className="relative bg-[#fafafa] pb-[67px]">
        <div className={GRID}>
          <div className="pb-[50px] pt-[110px]" />
        </div>
      </section>
    </>
  );
}
