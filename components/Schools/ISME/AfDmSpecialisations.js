'use client';

/* eslint-disable @next/next/no-img-element -- the reference's own photographs and icons at their natural size */

import { useState } from 'react';
import { cx } from '@/lib/cx';

/*
 * "Specialisations To Accelerate Your Growth" — reference/schools/isme/af-dm.php: two specialisation cards
 * whose round icon buttons switch between the Applied Finance and the Digital Marketing panels (the page's
 * own script). Applied Finance is open on load.
 *
 *   active card    `.zoom-active` — scale 1.1 with a 7px #07f6a0 border (0.3s transform)
 *   active button  `.spin-hover .spin-ring` — the gradient ring spins, 1.2s linear
 *   button cursor  the page's own `--f-cursor-pointer` SVG cursor (`.cursor-pointer`)
 *   carousels      Swiper `.mySwiperafdm`: 1.2 slides / 2 from 640 / 4 from 1024, 20px apart, no loop,
 *                  arrows or bullets — a drag-only strip; reproduced as a scroll-snapped track with the
 *                  same slide arithmetic ((width - gap * (n - 1)) / n), measured 273px at 1440 and
 *                  281.7px at 390 on production
 *
 * Deviation: production scrolls sideways by up to 9px between ~560 and ~720px because the scaled card runs
 * past the viewport; the section clips horizontally instead (the card's height and position are unchanged).
 *
 * Markup converted mechanically from production (Play-CDN breakpoints and type scale mapped; Bootstrap's
 * `!important` spacing utilities, which win there, reproduced by `.lp-bs` on the page <main>).
 */
const ZOOM = 'scale-110 border-[7px] border-solid border-[#07f6a0] transition-transform duration-300';
const RING = 'absolute inset-0 rounded-full p-[6px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400';
const SPIN = 'animate-spin [animation-duration:1.2s]';
const CURSOR = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'28\' height=\'29\' fill=\'none\' viewBox=\'0 0 28 29\'%3E%3Cpath fill=\'%23fff\' d=\'M6.84 21.83c-.47-.6-1.05-1.82-2.07-3.34-.58-.83-2.01-2.41-2.45-3.23a2.1 2.1 0 0 1-.25-1.67 2.2 2.2 0 0 1 2.39-1.67c.85.18 1.63.6 2.25 1.2.43.41.82.85 1.18 1.32.27.34.33.47.63.85.3.39.5.77.35.2-.11-.83-.31-2.23-.6-3.48-.21-.95-.26-1.1-.46-1.82s-.32-1.32-.54-2.13c-.2-.8-.35-1.62-.46-2.44a4.7 4.7 0 0 1 .43-3.08c.58-.55 1.44-.7 2.17-.37a4.4 4.4 0 0 1 1.57 2.17c.43 1.07.72 2.19.86 3.33.27 1.67.79 4.1.8 4.6 0-.61-.11-1.91 0-2.5.12-.6.54-1.1 1.12-1.33.5-.15 1.02-.19 1.53-.1.52.1.98.4 1.29.83.38.98.6 2 .63 3.05.04-.91.2-1.82.47-2.7.28-.39.68-.67 1.15-.8.55-.1 1.11-.1 1.66 0 .46.15.85.44 1.14.82.35.88.56 1.82.63 2.77 0 .23.12-.65.48-1.24a1.67 1.67 0 1 1 3.17 1.07v3.77c-.06.97-.2 1.94-.4 2.9-.29.85-.7 1.65-1.2 2.38-.8.9-1.48 1.92-1.98 3.02a6.67 6.67 0 0 0 .03 3.2c-.68.07-1.37.07-2.05 0-.65-.1-1.45-1.4-1.67-1.8a.63.63 0 0 0-1.13 0c-.37.64-1.18 1.79-1.75 1.85-1.12.14-3.42 0-5.23 0 0 0 .3-1.66-.39-2.27-.68-.6-1.38-1.3-1.9-1.76l-1.4-1.6Z\'/%3E%3Cpath stroke=\'%23000\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2.25\' d=\'M6.84 21.83c-.47-.6-1.05-1.82-2.07-3.34-.58-.83-2.01-2.41-2.45-3.23a2.1 2.1 0 0 1-.25-1.67 2.2 2.2 0 0 1 2.39-1.67c.85.18 1.63.6 2.25 1.2.43.41.82.85 1.18 1.32.27.34.33.47.63.85.3.39.5.77.35.2-.11-.83-.31-2.23-.6-3.48-.21-.95-.26-1.1-.46-1.82s-.32-1.32-.54-2.13c-.2-.8-.35-1.62-.46-2.44a4.7 4.7 0 0 1 .43-3.08c.58-.55 1.44-.7 2.17-.37a4.4 4.4 0 0 1 1.57 2.17c.43 1.07.72 2.19.86 3.33.27 1.67.79 4.1.8 4.6 0-.61-.11-1.91 0-2.5.12-.6.54-1.1 1.12-1.33.5-.15 1.02-.19 1.53-.1.52.1.98.4 1.29.83.38.98.6 2 .63 3.05.04-.91.2-1.82.47-2.7.28-.39.68-.67 1.15-.8.55-.1 1.11-.1 1.66 0 .46.15.85.44 1.14.82.35.88.56 1.82.63 2.77 0 .23.12-.65.48-1.24a1.67 1.67 0 1 1 3.17 1.07v3.77c-.06.97-.2 1.94-.4 2.9-.29.85-.7 1.65-1.2 2.38-.8.9-1.48 1.92-1.98 3.02a6.67 6.67 0 0 0 .03 3.2c-.68.07-1.37.07-2.05 0-.65-.1-1.45-1.4-1.67-1.8a.63.63 0 0 0-1.13 0c-.37.64-1.18 1.79-1.75 1.85-1.12.14-3.42 0-5.23 0 0 0 .3-1.66-.39-2.27-.68-.6-1.38-1.3-1.9-1.76l-1.4-1.6Z\' clip-rule=\'evenodd\'/%3E%3Cpath fill=\'%23000\' d=\'M20.65 22.3v-6.24c0-.38-.31-.68-.7-.68-.37 0-.68.3-.68.68v6.23c0 .38.3.68.69.68.38 0 .69-.3.69-.68ZM17.2 22.3l-.04-6.25a.67.67 0 1 0-1.34.01l.04 6.24a.67.67 0 1 0 1.34 0ZM12.37 16.07l.04 6.22c0 .38.3.68.67.68.37 0 .67-.3.67-.68l-.04-6.23c0-.38-.3-.68-.67-.68-.37 0-.67.31-.67.69Z\'/%3E%3C/svg%3E"),auto';
const TRACK = 'snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';
const SLIDE = 'w-[calc((100%-4px)/1.2)] flex-none snap-start n640:w-[calc((100%-20px)/2)] n1024:w-[calc((100%-60px)/4)]';

export default function AfDmSpecialisations() {
  const [active, setActive] = useState('af');
  return (
    <section className="overflow-x-clip bg-[#f3f3f3] py-14 px-6">
       <div className="max-w-6xl mx-auto">
         <h2 className="text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] font-semibold text-indigo-900 mb-12">Specialisations To Accelerate Your Growth</h2>
         <div className="grid md:grid-cols-2 gap-10">
           <div className={cx('relative rounded-3xl bg-[#3e348b] p-8 pt-16 text-center text-white', active === 'af' && ZOOM)}>
             <button type="button" aria-pressed={active === 'af'} aria-label="Applied Finance" onClick={() => setActive('af')} style={{ cursor: CURSOR }} className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 border-0 bg-transparent p-0">
               <div className={cx(RING, active === 'af' && SPIN)}>
                 <div className="bg-white w-full h-full rounded-full"></div>
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <img alt="" className="w-12 h-12 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/icon/af.svg" />
               </div>
             </button>
             <h3 className="text-[20px] leading-[28px] font-semibold mb-2">Applied Finance</h3>
             <div className="w-16 h-[2px] bg-white mx-auto mb-4"></div>
             <p className="text-[14px] leading-relaxed opacity-90">Gain the skills to analyse markets, make smart financial decisions and lead in fast-paced business environments. This specialisation equips you with practical knowledge and hands-on experience to thrive in finance roles.</p>
           </div>
            <div className={cx('relative rounded-3xl bg-[#2f9ea2] p-8 pt-16 text-center text-white', active === 'dm' && ZOOM)}>
              <button type="button" aria-pressed={active === 'dm'} aria-label="Digital Marketing" onClick={() => setActive('dm')} style={{ cursor: CURSOR }} className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 border-0 bg-transparent p-0">
                <div className={cx(RING, active === 'dm' && SPIN)}>
                 <div className="bg-white w-full h-full rounded-full"></div>
               </div>
                <div className="absolute inset-0 flex items-center justify-center">
                 <img alt="" className="w-12 h-12 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/icon/dm.svg" />
               </div>
             </button>
             <h3 className="text-[20px] leading-[28px] font-semibold mb-2">Digital Marketing</h3>
             <div className="w-16 h-[2px] bg-white mx-auto mb-4"></div>
             <p className="text-[14px] leading-relaxed opacity-90">Learn to create impactful campaigns, understand consumer behaviour and drive business growth through digital channels. This specialisation prepares you to turn creativity into measurable marketing results.</p>
           </div>
         </div>
         <div className={cx(active === 'af' ? 'block' : 'hidden', 'mt-4')}>
           <div className="bg-[#f3f3f3] pb-4">
             <div className="max-w-6xl mx-auto">
                <h2 className="border-l-4 border-cyan-500 pl-3 text-[18px] leading-[28px] n1024:text-[24px] n1024:leading-[32px] font-semibold text-indigo-900 mb-5">Deloitte Finance At A Glance</h2>
                <img alt="" className="w-[25%] object-contain mb-3" src="/assets/images/schools/isme/pages/site/af-dm/logo/deloitte.png" />
                <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed max-w-3xl">Deloitte is a global leader in professional services, helping organisations tackle financial challenges, optimise operations and drive lasting business impact across industries worldwide.</p>
             </div>
           </div>
           <div className="bg-[#f3f3f3] pb-4">
             <div className="max-w-6xl mx-auto grid n1024:grid-cols-2">
                <div className="p-6 border-b border-gray-300 n1024:border-r">
                 <div className="bg-[#2ea0a7] text-white text-center py-3 rounded-lg font-semibold">$70.5 Billion+ Global Revenue</div>
                 <p className="mt-4 text-[14px] text-gray-700 leading-relaxed">Largest professional services network, delivering finance, audit, tax and advisory globally.</p>
               </div>
                <div className="p-6 border-b border-gray-300">
                 <div className="bg-[#2ea0a7] text-white text-center py-3 rounded-lg font-semibold">150+ Countries</div>
                 <p className="mt-4 text-[14px] text-gray-700 leading-relaxed">470,000 professionals across the Americas, Europe, Asia-Pacific and emerging markets.</p>
               </div>
                <div className="p-6 border-b n1024:border-b-0 border-gray-300 n1024:border-r">
                 <div className="bg-[#403c8f] text-white text-center py-3 rounded-lg font-semibold">Fortune Global 500 Trusted</div>
                 <p className="mt-4 text-[14px] text-gray-700 leading-relaxed">Serving most Fortune 500 companies with finance, audit, tax and advisory solutions.</p>
               </div>
                <div className="p-6">
                 <div className="bg-[#403c8f] text-white text-center py-3 rounded-lg font-semibold">Notable Global Clients</div>
                 <p className="mt-4 text-[14px] text-gray-700 leading-relaxed">MetLife · Morgan Stanley · Berkshire Hathaway · Microsoft · Procter & Gamble · Boeing · Starbucks · HSBC · JP Morgan · Goldman Sachs · Citibank</p>
               </div>
             </div>
           </div>
           <div className="bg-[#f3f3f3] pb-4">
             <div className="max-w-6xl mx-auto">
                <h3 className="text-indigo-900 font-semibold text-[18px] leading-[28px] mb-6">What Defines Deloitte Finance</h3>
                <div className="grid n1024:grid-cols-2 rounded-3xl overflow-hidden text-white">
                  <div className="bg-[#403c8f] p-6 border-b n1024:border-b border-white/20">
                   <h4 className="font-semibold mb-2">Finance Transformation & Strategy</h4>
                   <p className="text-[14px] leading-[20px] opacity-90">Optimising, planning, forecasting and finance operations for better outcomes.</p>
                 </div>
                  <div className="bg-[#2ea0a7] p-6 border-b n1024:border-b border-white/20">
                   <h4 className="font-semibold mb-2">Finance Operations Services</h4>
                   <p className="text-[14px] leading-[20px] opacity-90">Running finance operations efficiently using expertise and technology.</p>
                 </div>
                  <div className="bg-[#2ea0a7] p-6 n1024:border-r border-white/20">
                   <h4 className="font-semibold mb-2">Tax & Transactions Expertise</h4>
                   <p className="text-[14px] leading-[20px] opacity-90">Global tax planning, compliance and M&A support to manage risk and opportunity.</p>
                 </div>
                  <div className="bg-[#403c8f] p-6">
                   <h4 className="font-semibold mb-2">Data-Led Financial Impact</h4>
                   <p className="text-[14px] leading-[20px] opacity-90">Driving results through improved performance, controls and insights.</p>
                 </div>
               </div>
             </div>
           </div>
           <div className="bg-[#f3f3f3] pb-4">
             <div className="max-w-6xl mx-auto">
               <h2 className="text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] font-semibold text-indigo-900 mb-8 border-l-4 border-cyan-500 pl-3">Applied Finance – Honours Curriculum</h2>
               <div className="flex items-center">
                  <div className="bg-[#2AA6B4] text-white px-5 py-2 rounded-lg font-medium">Semester 07</div>
                  <div className=""></div>
                  <div className="hidden n1024:block flex-1 h-[2px] bg-[#2AA6B4]"></div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/1.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Advanced Corporate Finance & Budgeting</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Learn how companies plan, allocate and optimise capital through advanced budgeting techniques, financial decision-making frameworks and performance evaluation.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/2.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Valuation Analysis – Corporate Valuation</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Develop hands-on expertise in valuing companies using core valuation methodologies, assumptions building and real-world financial data.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/3.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Mergers & Acquisitions</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Understand the end-to-end M&A process, from deal rationale and valuation to structuring, due diligence and post-merger integration analysis.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/4.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Alternative Investment Funds & ESG</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Explore private equity, venture capital and alternative assets while integrating ESG principles into modern investment and risk frameworks.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/5.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Risk Management – Global Perspective</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Learn to identify, measure and manage financial risks across markets using global risk frameworks, instruments and regulatory perspectives.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/6.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Artificial Intelligence and Machine Learning in Fintech</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Learn how AI and machine learning reshape financial services through algorithmic trading, fraud detection, credit scoring and data-driven decision-making.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/7.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Capstone Project - 1</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Develop a comprehensive M&A solution by evaluating valuation, deal strategy and integration for a real-world business scenario.</p>
                 </div>
               </div>
               <div className="flex items-center pt-4">
                  <div className="bg-[#2AA6B4] text-white px-5 py-2 rounded-lg font-medium">Semester 08</div>
                  <div className=""></div>
                  <div className="hidden n1024:block flex-1 h-[2px] bg-[#2AA6B4]"></div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/8.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Venture Capital & Private Equity</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Explore investment strategies, deal structuring, portfolio management and valuation techniques in startups and established businesses.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/9.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Virtual Project</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Gain hands-on, real-world experience through a virtual project provided by Deloitte, working on practical business challenges and industry-relevant solutions.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/10.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Capstone Project 2 - Applied Finance</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Apply financial concepts to real-world business scenarios through hands-on projects, case analysis and practical problem-solving.</p>
                 </div>
               </div>
             </div>
           </div>
           <div className="bg-[#f3f3f3] pb-4">
             <div className="max-w-6xl mx-auto">
               <h2 className="text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] font-semibold text-indigo-900 mb-8 border-l-4 border-cyan-500 pl-3">Learn From Industry Leaders In Finance</h2>
               <div className={TRACK}>
                 <div className="flex w-full gap-5">
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-finance/1.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Jenul Sanghani</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Partner at Deloitte India | ICA</b><br />{' '}Expert in Accounting, Assurance, IFRS, Ind AS and US GAAP</p>
                       </div>
                     </div>
                   </div>
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-finance/2.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Ranjan Jain</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Director at Deloitte India | CA</b><br />{' '}Expert in Financial Reporting (IFRS/Ind AS/US GAAP), Finance Controllership and Process Optimisation</p>
                       </div>
                     </div>
                   </div>
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-finance/3.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Dharmesh Chauhan</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Associate Director, Data & Analytics at CRISIL Limited | MFA, MBA, B.Com</b><br />{' '}Expert in Financial Analysis, Data Analytics and Investment Research</p>
                       </div>
                     </div>
                   </div>
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-finance/4.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Priyanka Haria</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Associate Director at Deloitte India | ACCA (Diploma in IFRS), CA</b><br />{' '}Expert in Financial Reporting, Process and Control Design and Ind AS/IFRS Conversions</p>
                       </div>
                     </div>
                   </div>
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-finance/5.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Vivek Jaiswal</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Assistant Vice President (AVP) at Barclays Investment Bank | CA, CS, CFA (All Levels Cleared)</b><br />{' '}Expert in Financial Modelling, MIS Reporting, Statutory Audit and Financial Management Services</p>
                       </div>
                     </div>
                   </div>
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-finance/6.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Akshay Merchant</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Founder & Managing Parter at AM Analytics CPA | US CPA, US CMA, CSCA, EA, FIII, ACCA, B.Com, BMS, FPC</b><br />{' '}Expert in US Taxation, Accounting, Financial Advisory and professional training for global financial certifications</p>
                       </div>
                     </div>
                   </div>
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-finance/7.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Neel Randeria</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Founding Partner at HJNR & Associates | CA, CS, CFA Level 2, BAF</b><br />{' '}Expert in Start-up Consulting, Internal Audits, Personal Financial Planning and CFA Coaching</p>
                       </div>
                     </div>
                   </div>
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-finance/8.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Ankita Bindal</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Professor | CFA, FRM, MBA</b><br />{' '}Expert in Private Company Valuation, Corporate Training and Financial Risk Management</p>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div className={cx(active === 'dm' ? 'block' : 'hidden', 'mt-4')}>
           <div className="bg-[#f3f3f3] pb-4">
             <div className="max-w-6xl mx-auto">
                <h2 className="border-l-4 border-cyan-500 pl-3 text-[18px] leading-[28px] n1024:text-[24px] n1024:leading-[32px] font-semibold text-indigo-900 mb-5">Deloitte Digital At A Glance</h2>
                <img alt="" className="w-[25%] object-contain mb-3" src="/assets/images/schools/isme/pages/site/af-dm/logo/deloitte.png" />
                <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed max-w-3xl">Deloitte Digital partners with global category leaders across industries including consumer, retail, technology, aviation, financial services and e-commerce. Teams spanning marketing strategy, performance media, analytics, UX, CRM, MarTech and digital commerce.</p>
             </div>
           </div>
           <div className="bg-[#f3f3f3] pb-4">
             <div className="max-w-6xl mx-auto grid n1024:grid-cols-2">
                <div className="p-6 border-b border-gray-300 n1024:border-r">
                 <div className="bg-[#2ea0a7] text-white text-center py-3 rounded-lg font-semibold">$60 Billion+ Global Revenue</div>
                 <p className="mt-4 text-[14px] text-gray-700 leading-relaxed">Part of Deloitte’s global annual revenue,making it one of the world’s largest professional services and digital transformation networks</p>
               </div>
                <div className="p-6 border-b border-gray-300">
                 <div className="bg-[#2ea0a7] text-white text-center py-3 rounded-lg font-semibold">40+ Countries</div>
                 <p className="mt-4 text-[14px] text-gray-700 leading-relaxed">A truly global digital marketing and customer experience practice operating across North America, Europe, Asia-Pacific and emerging markets.</p>
               </div>
                 <div className="p-6 n1024:col-span-2">
                 <div className="bg-[#403c8f] text-white text-center py-3 rounded-lg font-semibold">Notable Global Clients</div>
                 <p className="mt-4 text-[14px] text-gray-700 leading-relaxed">Adobe · Coca-Cola · Google · Microsoft · The Ritz-Carlton · Salesforce · Johnson & Johnson · Walmart · Verizon · Nike · Starbucks · Mercedes-Benz · American Airlines</p>
               </div>
             </div>
           </div>
           <div className="bg-[#f3f3f3] pb-4">
             <div className="max-w-6xl mx-auto">
                <h3 className="text-indigo-900 font-semibold text-[18px] leading-[28px] mb-6">What Defines Deloitte Digital</h3>
                <div className="grid n1024:grid-cols-3 rounded-3xl overflow-hidden text-white">
                  <div className="bg-[#403c8f] p-6 border-b n1024:border-b border-white/20">
                   <h4 className="font-semibold mb-2">End-to-End Marketing Transformation</h4>
                   <p className="text-[14px] leading-[20px] opacity-90">From strategy and creative to performance marketing, analytics and marketing technology implementation.</p>
                 </div>
                  <div className="bg-[#2ea0a7] p-6 border-b n1024:border-b border-white/20">
                   <h4 className="font-semibold mb-2">Data-Led, ROI-Focused Marketing</h4>
                   <p className="text-[14px] leading-[20px] opacity-90">Marketing success measured through conversion, growth, customer lifetime value and business outcomes.</p>
                 </div>
                  <div className="bg-[#403c8f] p-6">
                   <h4 className="font-semibold mb-2">Customer Experience At Scale</h4>
                   <p className="text-[14px] leading-[20px] opacity-90">Designing and optimising digital journeys across web, mobile, social, commerce and CRM ecosystems.</p>
                 </div>
               </div>
             </div>
           </div>
           <div className="bg-[#f3f3f3] pb-4">
             <div className="max-w-6xl mx-auto">
               <h2 className="text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] font-semibold text-indigo-900 mb-8 border-l-4 border-cyan-500 pl-3">Digital Marketing – Honours Curriculum</h2>
               <div className="flex items-center">
                  <div className="bg-[#2AA6B4] text-white px-5 py-2 rounded-lg font-medium">Semester 07</div>
                  <div className=""></div>
                  <div className="hidden n1024:block flex-1 h-[2px] bg-[#2AA6B4]"></div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/1.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Digital Analytics & Growth Engineering</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Learn how to track, analyse and optimise user journeys using GA4, attribution models, funnels and growth frameworks to drive measurable business outcomes</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/2.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Affiliate Performance Systems & Partner-Led Acquisition</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Understand how affiliate and influencer ecosystems work - from payout models and tracking systems to performance analytics and scalable partner acquisition strategies.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/3.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Programmatic Media Trading & Omni-Channel Display Systems</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Master programmatic advertising fundamentals including RTB, DSPs, audience targeting, media planning and performance optimisation across display and video channels.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/4.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Paid Social Advertising & Creative Optimisation</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Build and optimise high-performing paid social campaigns by learning audience targeting, creative frameworks, retargeting funnels, budget scaling and performance diagnostics.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/5.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">CRO Engineering & High-Performance Landing Architecture</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Develop conversion-focused landing pages using UX principles, heatmaps, A/B testing, copy frameworks and funnel diagnostics to maximise lead and sales performance.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/6.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Organic Social Intelligence & Multi-Platform Content Systems</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Learn how platform algorithms work and how to design scalable content systems using SEO, content repurposing, engagement analysis and community-building strategies.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/7.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Capstone Project</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Work on a real-world business challenge under expert guidance, applying your learning to develop solutions, showcase your skills and build a strong portfolio for future opportunities.</p>
                 </div>
               </div>
               <div className="flex items-center pt-4">
                  <div className="bg-[#2AA6B4] text-white px-5 py-2 rounded-lg font-medium">Semester 08</div>
                  <div className=""></div>
                  <div className="hidden n1024:block flex-1 h-[2px] bg-[#2AA6B4]"></div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/8.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Full Funnel Performance Lab & Integrated Campaign Simulation (Capstone)</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">An immersive, hands-on capstone where students run and optimise full-funnel digital campaigns using real performance data, strategy and execution.</p>
                 </div>
               </div>
               <div className="flex gap-4 n1024:gap-6 items-start pt-4">
                  <div className="w-12 h-12 n1024:w-14 n1024:h-14 shrink-0 bg-[#2ea0a7] rounded-full flex items-center justify-center">
                   <img alt="" className="w-6 h-6 n1024:w-7 n1024:h-7 object-contain" src="/assets/images/schools/isme/pages/site/af-dm/curriculum-icon/9.svg" />
                 </div>
                  <div>
                   <h4 className="font-semibold text-indigo-900 text-[16px] leading-[24px] n1024:text-[18px] n1024:leading-[28px] mb-1">Virtual Project</h4>
                   <p className="text-[14px] n1024:text-[16px] n1024:leading-[24px] text-gray-700 leading-relaxed">Gain practical industry exposure by working on live digital marketing projects or virtual simulations, building professional skills and a portfolio of real-world campaigns.</p>
                 </div>
               </div>
             </div>
           </div>
           <div className="bg-[#f3f3f3] pb-4">
             <div className="max-w-6xl mx-auto">
               <h2 className="text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] font-semibold text-indigo-900 mb-8 border-l-4 border-cyan-500 pl-3">Learn From Industry Leaders In Marketing</h2>
               <div className={TRACK}>
                 <div className="flex w-full gap-5">
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-marketing/1.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Chandrashekar Mantha</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Partner and the Chief Growth Officer at Deloitte India | CA, B.Com, Executive MBA, PG Diploma in Digital Business, DISA, Audit, Diploma in Film Making, Qualified CIA and CISA, MICA alumnus</b><br />{' '}Expert in Risk Assurance, Marketing Advisory, Digital Solutions and Strategic Growth for global organisations</p>
                       </div>
                     </div>
                   </div>
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-marketing/2.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Kashyap Pathak</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Executive Director at Deloitte India | CPA, MBA (Marketing)</b><br />{' '}Expert in Media & Entertainment, Advertising & Marketing Advisory and Media Risk Frameworks</p>
                       </div>
                     </div>
                   </div>
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-marketing/3.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Reena Pandya</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Manager at Deloitte India | Bachelor’s Degree in Commerce with academic grounding in Accounting and Finance, Postgraduate Diploma in Digital Marketing</b><br />{' '}Expert in Strategic Customer Success, AdTech & MarTech Ecosystems and Digital Marketing</p>
                       </div>
                     </div>
                   </div>
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-marketing/4.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Satyen Kishan</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Associate Vice President at Jagran New Media | B.Com, MBA (Marketing & Finance)</b><br />{' '}Expert in Sales and Brand Solutions, Business Growth, Relationship Management and Strategy Planning & Execution</p>
                       </div>
                     </div>
                   </div>
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-marketing/5.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Ruksana Shaikh</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Account Controller at Madison World | BMS, Master’s in Marketing, Diploma in Business Systems and Information Management</b><br />{' '}Expert in Paid Advertising, Media Planning and Digital Marketing</p>
                       </div>
                     </div>
                   </div>
                   <div className={SLIDE}>
                     <div className="bg-[#F7F8F8] rounded-xl overflow-hidden">
                       <img alt="" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/leaders-in-marketing/6.png" />
                       <div className="p-3 h-[220px]">
                         <h3 className="font-semibold text-[18px] leading-[28px]">Anurag Purohit</h3>
                         <p className="text-[14px] leading-[20px] text-gray-600"><b>Head of Digital Marketing at LTIMindtree | M.Com (ABST)</b><br />{' '}Expert in SEO/SEM, Digital Branding Strategies, Social Media and Creative Digital Media Solutions</p>
                       </div>
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
