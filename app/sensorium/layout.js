import { sensoriumFontClasses } from '@/lib/sensorium/fonts';
import BackToTop from '@/components/Sensorium/BackToTop';

/* /sensorium - the ATLAS ISDI School of Fashion "Sensorium" show site (a WordPress / Eona theme install
   upstream). Standalone: components/Schools/MainSiteOnly hides the ATLAS header and footer here, and
   production has no footer at all. The header is mounted per page because its sticky threshold and
   anchor behaviour differ between the homepage and the portfolio pages.
   Body base = Eona's: Lora 16px / 1.571em, #919191 on white. */
export default function SensoriumLayout({ children }) {
  return (
    <div className={sensoriumFontClasses}>
      <div className="min-h-screen overflow-x-clip bg-white font-[SensLora,serif] text-[16px] leading-[1.571] text-[#919191] antialiased">
        {children}
        <BackToTop />
      </div>
    </div>
  );
}
