/* .meeta-register-countdown: a white card pulled 143px up over the hero (70px 100px padding,
   40px below 768, 20px below 576 where it drops 50px BELOW the hero instead), the shape-3 wash
   at 45%, the outlined "Book Your Seat" pill (inline font-size 20px) and the countdown; the
   dotted shape-5 sits behind it, 50px below. */
import Countdown from './Countdown';
import { BSD, BTN_OUTLINE, COL_BASE, CONTAINER, ROW } from './ui';

export default function Register({ data, assets }) {
  return (
    <div>
      <div className={`${CONTAINER} relative`}>
        <div
          className="relative z-[1] -mt-[143px] rounded-[5px] bg-white px-[100px] py-[70px] shadow-[0_10px_180px_0_rgba(0,0,0,.1)] before:absolute before:left-0 before:top-0 before:-z-[1] before:h-full before:w-full before:bg-[image:var(--aar-s3)] before:bg-contain before:bg-center before:bg-no-repeat before:opacity-[.45] before:content-[''] max-md:p-10 max-lp:mt-[50px] max-lp:p-5"
          style={{ '--aar-s3': `url(${assets.shape3})` }}
        >
          <div className={`${ROW.gy5} items-center`}>
            <div className={`${COL_BASE.gy5} lg:w-1/3 lg:flex-[0_0_auto]`}>
              <div>
                <h2 className={`${BSD} -mt-[10px] text-[40px] font-bold leading-[1.5] text-[#1a0a1e] max-lp:text-[28px]`}>{data.title}</h2>
                <a
                  target="_blank"
                  rel="noopener"
                  href={data.href}
                  className={`${BSD} ${BTN_OUTLINE} mt-[15px] border-[#fc097c] px-[60px] text-[20px] text-[#1a0a1e] hover:bg-[#fc097c] hover:text-white`}
                >
                  {data.label}
                </a>
              </div>
            </div>
            <div className={`${COL_BASE.gy5} lg:w-2/3 lg:flex-[0_0_auto]`}>
              <Countdown date={data.date} />
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assets.shape5} alt="Shape" className="absolute bottom-[-50px] left-0 right-0 -z-[2] mx-auto" />
      </div>
    </div>
  );
}
