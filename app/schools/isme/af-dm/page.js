/* eslint-disable @next/next/no-img-element -- the reference's own photographs and icons at their natural size */
import AfDmSpecialisations from '@/components/Schools/ISME/AfDmSpecialisations';

/*
 * /schools/isme/af-dm — reference/schools/isme/af-dm.php, the 4th-year BBA (Hons.) specialisations page
 * (Applied Finance / Digital Marketing with Deloitte India). A hand-written Tailwind (Play CDN) page inside
 * the ISME chrome, so its markup is converted mechanically from production
 * (scratchpad tool tw2jsx.py) rather than through the Webflow page extractor:
 *  - Play's `sm` / `lg` are 640 / 1024 (this project's `n640` / `n1024`); its named type sizes bundle a
 *    line-height, written out at the same breakpoint unless the element sets its own there;
 *  - ISME's header loads Bootstrap after the Tailwind CDN, so Bootstrap's `!important` utilities win on
 *    production: the spacing scale (`.lp-bs`) and `.w-25` (the Deloitte mark is 25% of its column);
 *  - the page inherits ISME's Manrope (its sections set no font family).
 * The specialisations toggle and its two leaders carousels are components/Schools/ISME/AfDmSpecialisations.
 * The hero's "Start Your Application Now" is authored `href="#"` - transcribed.
 */

const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/isme/af-dm' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function AfDmPage() {
  return (
    <main id="isme-af-dm" className="lp-bs">
      <section className="relative w-full h-screen overflow-hidden">
          <img alt="Campus Hero" className="w-full h-full object-cover" loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" src="/assets/images/campus/hero/atlas-campus-hero-image.png" srcSet="/assets/images/campus/hero/atlas-campus-hero-image-p-500.png 500w, /assets/images/campus/hero/atlas-campus-hero-image-p-800.png 800w, /assets/images/campus/hero/atlas-campus-hero-image-p-1080.png 1080w, /assets/images/campus/hero/atlas-campus-hero-image.png 1366w" />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex flex-col justify-end text-white px-6 pb-10 md:px-12 md:pb-16 n1024:pl-[100px] n1024:pb-[100px] items-start">
           <h1 className="text-[30px] leading-[36px] n640:text-[36px] n640:leading-[40px] md:text-[48px] md:leading-none n1024:text-[60px] font-extrabold mb-4">4<sup>th</sup>{' '}Year BBA (Hons.)</h1>
           <p className="text-[18px] leading-[28px] n640:text-[20px] n640:leading-[28px] md:text-[24px] md:leading-[32px] n1024:text-[30px] mb-4 bg-blue-600 px-2 font-semibold px-6 py-2">India’s First Industry-Integrated Programme</p>
           <p className="text-[14px] leading-[20px] n1024:text-[22px] mb-2">Specialised Tracks in</p>
           <h2 className="text-[20px] leading-[28px] n1024:text-[26px] font-extrabold mb-4">Applied Finance / Digital Marketing</h2>
           <a className="inline-block bg-[#09f6a0] text-black font-semibold px-8 py-3 rounded-full text-[18px] leading-[28px] transition duration-300" href="#">Start Your Application Now</a>
         </div>
       </section>
      <section className="bg-[#f3f3f3] py-12 px-6">
         <div className="max-w-6xl mx-auto">
            <div className="border-l-4 border-cyan-500 pl-4">
             <h2 className="text-[24px] leading-[32px] md:text-[30px] md:leading-[36px] font-semibold text-indigo-900">Step Into High-Impact Careers{' '}<br className="hidden n640:block" />{' '}With BBA (Hons.) At ATLAS</h2>
           </div>
           <p className="text-gray-600 mt-2 text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] mb-6">A programme designed to prepare you for leadership and success in the modern business world.</p>
            <div className="border-2 border-cyan-500 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
             <div className="flex-1">
               <p className="font-medium text-indigo-900">Strong Business{' '}<br />{' '}Foundation</p>
             </div>
             <div className="bg-[#3A3282] text-white w-10 h-10 flex items-center justify-center rounded-full text-[20px] leading-[28px] font-bold">+</div>
             <div className="flex-1">
               <p className="font-medium text-indigo-900">Industry-Focused{' '}<br />{' '}Specialisation</p>
             </div>
             <div className="bg-[#3A3282] text-white w-10 h-10 flex items-center justify-center rounded-full text-[20px] leading-[28px] font-bold">=</div>
             <div className="flex-1">
               <p className="font-medium text-indigo-900">Real Career{' '}<br />{' '}Momentum</p>
             </div>
           </div>
         </div>
       </section>
      <AfDmSpecialisations />
      <section className="bg-[#f3f3f3] py-14 px-6">
         <div className="max-w-6xl mx-auto">
            <h2 className="text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] font-semibold text-indigo-900 mb-8 border-l-4 border-cyan-500 pl-3">Power-Packed Learning With Deloitte India</h2>
            <div className="rounded-2xl overflow-hidden mb-6">
             <img alt="Deloitte Building" className="w-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/power-packed/1.png" />
           </div>
            <p className="text-[14px] md:text-[16px] md:leading-[24px] text-gray-700 max-w-4xl leading-relaxed">A part of the “Big Four”, it stands alongside PwC, EY and KPMG as one of the world’s largest professional services networks, trusted globally for delivering innovative solutions and expert advisory across industries.</p>
           <div className="bg-[#f3f3f3] py-10">
             <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden grid md:grid-cols-3 text-white">
                <div className="bg-[#403c8f] p-8 text-center">
                 <h3 className="text-[36px] leading-[40px] md:text-[48px] md:leading-none font-bold mb-3">175+</h3>
                 <p className="text-[14px] opacity-90 leading-relaxed">175+ Years of Legacy built in Audit, Consulting, Tax & Legal Services and More.</p>
               </div>
                <div className="bg-[#2ea0a7] p-8 text-center">
                 <h3 className="text-[36px] leading-[40px] md:text-[48px] md:leading-none font-bold mb-3">90%</h3>
                 <p className="text-[14px] opacity-90 leading-relaxed">Serving Over 90% of Fortune Global 500 Companies.</p>
               </div>
                <div className="bg-[#403c8f] p-8 text-center">
                 <h3 className="text-[36px] leading-[40px] md:text-[48px] md:leading-none font-bold mb-3">$70+ Bn</h3>
                 <p className="text-[14px] opacity-90 leading-relaxed">$70+ Billion in Global Annual Revenue for FY24–25.</p>
               </div>
             </div>
             <div className="bg-[#f3f3f3] py-10">
               <div className="max-w-6xl mx-auto">
                  <h2 className="text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] font-semibold text-indigo-900 mb-8">Learning Advantage With Deloitte India</h2>
                  <div className="rounded-3xl overflow-hidden grid n640:grid-cols-2 n1024:grid-cols-4 text-white">
                    <div className="bg-[#2ea0a7] p-6 flex flex-col justify-between min-h-[200px]">
                     <p className="text-[14px] leading-relaxed">Learning Influenced by Real-World Business Challenges.</p>
                     <div className="flex justify-end mt-6">
                       <img alt="Icon" className="w-16 h-16 object-contain opacity-80" src="/assets/images/schools/isme/pages/site/af-dm/learning-advantage/1.png" />
                     </div>
                   </div>
                    <div className="bg-[#403c8f] p-6 flex flex-col justify-between min-h-[200px]">
                     <p className="text-[14px] leading-relaxed">Curriculum Aligned with Latest Industry Requirements.</p>
                     <div className="flex justify-end mt-6">
                       <img alt="Icon" className="w-16 h-16 object-contain opacity-80" src="/assets/images/schools/isme/pages/site/af-dm/learning-advantage/2.png" />
                     </div>
                   </div>
                    <div className="bg-[#2ea0a7] p-6 flex flex-col justify-between min-h-[200px]">
                     <p className="text-[14px] leading-relaxed">Certificate Co-branded by ATLAS SkillTech University, Zell and Deloitte India.</p>
                     <div className="flex justify-end mt-6">
                       <img alt="Icon" className="w-16 h-16 object-contain opacity-80" src="/assets/images/schools/isme/pages/site/af-dm/learning-advantage/3.png" />
                     </div>
                   </div>
                    <div className="bg-[#403c8f] p-6 flex flex-col justify-between min-h-[200px]">
                     <p className="text-[14px] leading-relaxed">Learn from Experienced Deloitte Professionals Through Live, Application-Driven Sessions.</p>
                     <div className="flex justify-end mt-6">
                       <img alt="Icon" className="w-16 h-16 object-contain opacity-80" src="/assets/images/schools/isme/pages/site/af-dm/learning-advantage/4.png" />
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
      <section className="bg-[#f3f3f3] py-14 px-6">
         <div className="max-w-6xl mx-auto">
            <h2 className="text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] font-semibold text-indigo-900 mb-10 border-l-4 border-cyan-500 pl-3">Aligning Education With Industry Demands</h2>
            <div className="grid gap-6 grid-cols-1 n1024:grid-cols-2">
              <img alt="" className="w-full h-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/aligning-education/3.png" />
              <div className="bg-[#403c8f] text-white p-8 flex flex-col justify-between">
               <h3 className="text-[40px] font-bold mb-4 leading-none n1024:text-[110px]">55%</h3>
               <p className="text-[14px] opacity-90 leading-normal n1024:text-[26px]">Only 55% of Indian graduates are employable, leaving nearly half lacking the skills employers seek.</p>
             </div>
              <div className="bg-[#2ea0a7] text-white p-8 flex flex-col justify-between">
               <h3 className="text-[40px] font-bold mb-4 leading-none n1024:text-[110px]">46%</h3>
               <p className="text-[14px] opacity-90 leading-normal n1024:text-[26px]">Only 46% of graduates meet job-ready standards, highlighting the urgency to address the matching skills gap.</p>
             </div>
              <img alt="" className="w-full h-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/aligning-education/2.png" />
              <img alt="" className="w-full h-full object-cover" src="/assets/images/schools/isme/pages/site/af-dm/aligning-education/1.png" />
              <div className="bg-[#403c8f] text-white p-8 flex flex-col justify-between">
               <h3 className="text-[40px] font-bold mb-4 leading-none n1024:text-[50px]">BBA (Hons.) at ATLAS</h3>
               <p className="text-[14px] opacity-90 leading-normal n1024:text-[26px]">Bridges this gap by equipping students with practical skills and industry-ready knowledge that make them fully employable.</p>
             </div>
           </div>
         </div>
       </section>
    </main>
  );
}
