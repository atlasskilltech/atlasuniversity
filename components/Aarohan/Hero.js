/* .meeta-hero-section: slider-1 under a 60% wash (#0541da in 2023/2024, #1fe0df in 2025), the
   two floating shapes (bounce-animate / round-01 keyframes, run with the Web Animations API in
   <Float>), and the slanted pink panel - an inline SVG polygon with five CSS triangles around it.
   Heights: 1070 / 820 (<=767) / 480 (2023) or 700 (2024, 2025) at <=575. */
import Reveal from './Reveal';
import Float from './Float';
import { BSD, Rich } from './ui';

export default function Hero({ hero, year, assets }) {
  const wash = year === 2025 ? 'before:bg-[#1fe0df]' : 'before:bg-[#0541da]';
  const h575 = year === 2023 ? 'max-lp:h-[480px]' : 'max-lp:h-[700px]';
  const dateSize = year === 2023 ? 'text-[24px] max-md:text-[20px]' : 'text-[20px]';
  return (
    <div
      className={`relative z-[1] flex h-[1070px] items-center overflow-hidden bg-[#0541da] bg-cover bg-center bg-no-repeat max-md:h-[820px] ${h575} before:absolute before:left-0 before:top-0 before:-z-[1] before:h-full before:w-full before:opacity-60 before:content-[""] ${wash}`}
      style={{ backgroundImage: `url(${assets.slider})` }}
    >
      <Float as="img" kind="bounce" src={assets.shape1} alt="shpae" className="absolute left-[30px] top-[35%] w-[108px] opacity-60 max-lp:w-[70px]" />
      <Float as="img" kind="round" src={assets.shape2} alt="shpae" className="absolute right-[30px] top-[20%] opacity-60 max-lp:w-[110px]" />
      <div className="mx-auto w-full px-3 n576:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] [@media(min-width:1200px)]:max-w-[1170px]">
        <div className="relative z-[1] max-w-[710px] p-[50px] text-center max-lp:mt-[120px]">
          <div className="absolute left-0 top-1/2 -z-[1] h-auto w-full max-w-[710px] -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1904.000000 1521.000000" preserveAspectRatio="xMidYMid meet" className="block">
              <defs>
                <linearGradient id={`aarohan-grad-${year}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="10%" style={{ stopColor: '#c40378' }} />
                  <stop offset="90%" style={{ stopColor: '#ff3866' }} />
                </linearGradient>
              </defs>
              <g transform="translate(0.000000,1521.000000) scale(0.100000,-0.100000)" fill={`url(#aarohan-grad-${year})`}>
                <path d="M9505 14211 l-9500 -997 3 -34 c8 -94 1739 -13170 1744 -13175 4 -4 15636 1194 15645 1199 1 1 369 3140 818 6976 448 3836 818 6987 821 7003 5 22 2 27 -13 26 -10 -1 -4293 -450 -9518 -998z" />
              </g>
            </svg>
          </div>
          <div className="absolute bottom-[-20px] left-[66px] -z-[2] h-[95px] w-[70%] skew-x-[10deg] bg-[#8c0050] max-lg:bottom-[-15px] max-lg:left-[59px] max-lp:bottom-[21px] max-lp:left-[22px]" />
          <Reveal anim="fade-right" delay={700} className="absolute bottom-[19%] left-0 h-0 w-0 border-b-[20px] border-l-[130px] border-t-[30px] border-solid border-b-transparent border-l-[#1fe0df] border-t-transparent max-lp:bottom-[9%] max-lp:border-b-[15px] max-lp:border-l-[90px] max-lp:border-t-[15px]" />
          <Reveal anim="fade-right" delay={800} keepTransform className="absolute left-[30px] top-[-25px] h-0 w-0 -rotate-[8deg] border-b-0 border-l-[190px] border-t-[45px] border-solid border-b-transparent border-l-[#f9d464] border-t-transparent max-lp:left-[10px] max-lp:top-[10px] max-lp:border-l-[120px] max-lp:border-t-[25px]" />
          <Reveal anim="fade-left" delay={900} className="absolute right-[48%] top-[-55px] h-0 w-0 border-b-[15px] border-r-[130px] border-t-[25px] border-solid border-b-transparent border-r-[#00acee] border-t-transparent max-lp:right-[20%] max-lp:top-[-10px] max-lp:border-r-[100px] max-lp:border-t-[15px]" />
          <Reveal anim="fade-left" delay={1000} keepTransform className="absolute bottom-[24%] right-[-40px] h-0 w-0 rotate-[8deg] border-b-0 border-r-[180px] border-t-[50px] border-solid border-b-transparent border-r-[#f9d464] border-t-transparent max-lg:right-[-30px] max-md:right-[-20px] max-md:border-r-[120px] max-md:border-t-[40px] max-lp:bottom-[30%] max-lp:right-[-5px] max-lp:border-r-[90px] max-lp:border-t-[25px]" />
          <Reveal as="h1" anim="fade-up" delay={700} className={`${BSD} text-[79px] font-bold leading-[1.1] text-white max-md:text-[54px] max-lp:text-[30px]`}>
            {hero.title}
          </Reveal>
          <Reveal as="span" anim="fade-right" delay={800} className={`${BSD} block text-[120px] font-bold leading-[1.1] text-[#f9d464] max-md:text-[100px] max-lp:text-[60px]`}>
            {hero.year}
          </Reveal>
          {hero.dates.map((d, i) => [
            ' ',
            <Reveal key={i} as="p" anim="fade-up" delay={900} className={`${BSD} mt-5 inline-block bg-black px-10 font-bold leading-[1.75] text-white max-lp:px-[14px] ${dateSize}`}>
              <Rich nodes={d} />
            </Reveal>,
          ])}
        </div>
      </div>
    </div>
  );
}
