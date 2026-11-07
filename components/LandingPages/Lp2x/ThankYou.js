/* eslint-disable @next/next/no-img-element -- plain <img> as the reference renders it (project convention) */
import { cx } from '@/lib/cx';

/* Bootstrap 4 only on this page (no BS3), so `.container` has no clearfix and margins collapse
   through it — hence not the shared CONTAINER, which is `flow-root` */
const BS4_CONTAINER =
  'mx-auto w-full px-[15px] [@media(min-width:576px)_and_(max-width:767px)]:max-w-[540px] [@media(min-width:768px)_and_(max-width:991px)]:max-w-[720px] [@media(min-width:992px)_and_(max-width:1199px)]:max-w-[960px] [@media(min-width:1200px)]:max-w-[1140px]';
const ROW = '-mx-[15px] flex flex-wrap';
const COL = 'relative w-full px-[15px]';

const SOCIAL = [
  ['https://www.instagram.com/atlasskilltechuniversity/?hl=en', '/assets/lp2x/thank-you/ig.png', 'Instagram', false],
  ['https://www.facebook.com/atlasskilltechuniversity/', '/assets/lp2x/thank-you/facebook.png', 'Facebook', true],
  ['https://www.linkedin.com/school/atlasuniversity', '/assets/lp2x/thank-you/in.png', 'LinkedIn', true],
  ['https://www.youtube.com/channel/UC6aLNCyFuPEvb3UpZGltYnQ', '/assets/lp2x/thank-you/Youtube.png', 'YouTube', true],
];

/**
 * The lead-form "Thank You" page every lp23 / lp24 / lp25 / lp25-ismeug variant redirects to —
 * reference `<variant>/thankyou.php`, served by production at `/<variant>/thankyou` (the `.php` URL
 * 301s there). The four files are byte-identical apart from Cloudflare's per-request e-mail
 * obfuscation, so one component serves all four routes.
 *
 * Bootstrap 4.6 + the LP's main.css / responsive.css + the page's own <style>; body font is the same
 * unresolved 'Montserrat' (system sans-serif, Arial Black at 900). Measured at 1920 / 1440 / 768 / 390.
 *
 * Not ported: the Google Ads / Analytics (AW-298962844, G-LY09WDJYPB) and Facebook Pixel (560115521967276)
 * conversion tags in its <head> — this project carries no third-party tracking. Reference defect,
 * not reproduced: `.bot-right-img` points at `thank-you/bot-right-blue.png`, which is not in the
 * archive and is a soft-404 on production (a broken image); its 100px spacer is kept.
 */
export default function ThankYou() {
  return (
    <div
      className={cx(
        "font-['Montserrat',sans-serif] overflow-x-hidden bg-white text-[16px] leading-[1.5] text-[#212529] subpixel-antialiased",
      )}
    >
      <header>
        <div className={ROW}>
          <div className={cx(COL, 'md:max-w-[25%] md:flex-[0_0_25%]')}>
            <img
              src="/assets/lp2x/thank-you/3d-square-right.png"
              alt="corner-image"
              width={120}
              height={102}
              className="h-auto w-3/4 max-w-full max-md:w-1/5"
            />
          </div>
          <div className={cx(COL, 'md:max-w-[50%] md:flex-[0_0_50%]')}>
            <div className={BS4_CONTAINER}>
              <div className="mt-[64px] [@media(min-width:768px)_and_(max-width:1040px)]:mt-[25px] max-md:mt-0">
                <div className="mx-0 flex flex-wrap">
                  <div className={cx(COL, 'mx-auto max-w-[50%] flex-[0_0_50%]')}>
                    <img src="/assets/lp2x/thank-you/atlas-logo.png" alt="atlas-logo" width={545} height={245} className="h-auto max-w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx(COL, 'hidden md:block md:max-w-[25%] md:flex-[0_0_25%]')}>
            <img
              src="/assets/lp2x/thank-you/3d-square-right.png"
              alt="3d-square"
              width={120}
              height={102}
              className="mt-[88px] max-lg:mt-[45px] max-lg:w-[30%]"
            />
          </div>
        </div>
      </header>

      {/* ref .square-strip (< 768): the right square, floated right */}
      <div className="flow-root py-[20px] max-md:pb-0 max-md:pt-[10px] md:hidden">
        <div className={BS4_CONTAINER}>
          <img
            src="/assets/lp2x/thank-you/3d-square-right.png"
            alt="3d-square"
            width={120}
            height={102}
            className="float-right [@media(min-width:481px)_and_(max-width:767px)]:w-[12%] [@media(max-width:480px)]:w-[8%]"
          />
        </div>
      </div>

      <section>
        <div className={BS4_CONTAINER}>
          <div className="mt-[30px] text-center max-md:mt-0">
            <h1 className="mb-[8px] text-[100px] font-black uppercase leading-[1.2] text-[#2D257D] [@media(min-width:481px)_and_(max-width:767px)]:text-[60px] [@media(max-width:480px)]:text-[35px]">
              Thank you
            </h1>
            <h2 className="mb-[8px] text-[45px] font-black uppercase leading-[1.2] text-[#4EABE8] [@media(min-width:481px)_and_(max-width:767px)]:text-[36px] [@media(max-width:480px)]:text-[22px]">
              for your submission
            </h2>
            <p className="mb-[16px] text-[40px] font-semibold text-black [@media(min-width:481px)_and_(max-width:767px)]:text-[28px] [@media(max-width:480px)]:text-[18px]">
              We will get in touch with you soon!{' '}
            </p>
          </div>
          <div className="mt-[20px] text-center">
            <p className="mb-0 text-[40px] font-bold text-black [@media(max-width:480px)]:text-[28px]">Meanwhile </p>
            <a
              href="https://atlasuniversity.edu.in/"
              className="inline-block bg-[#342B7C] px-[30px] py-[6px] text-center text-[20px] font-bold uppercase text-white hover:text-white hover:no-underline [@media(min-width:481px)_and_(max-width:767px)]:text-[18px] [@media(max-width:480px)]:text-[16px]"
            >
              Go to Application Form
            </a>
          </div>
        </div>
      </section>

      <section className="relative mt-[50px] text-center max-md:mt-[30px]">
        <div className="absolute top-[40%] h-[224px] w-full bg-[#2D257D] [@media(max-width:480px)]:hidden" />
        <div className={BS4_CONTAINER}>
          <h2 className="mb-[10px] text-[40px] font-bold leading-[1.2] text-[#342B7C] max-lg:mb-[12px] md:max-lg:text-[45px] [@media(min-width:361px)_and_(max-width:767px)]:text-[35px] [@media(max-width:360px)]:text-[28px]">
            Why Choose ATLAS?
          </h2>
          <div className={ROW}>
            <div className={cx(COL, 'md:ml-[8.333333%] md:max-w-[83.333333%] md:flex-[0_0_83.333333%]')}>
              <iframe
                src="https://www.youtube.com/embed/XrOzXlg1i8Q"
                title="Why Choose ATLAS?"
                loading="lazy"
                className="relative h-[500px] w-full border-[10px] border-solid border-[#eee] align-middle [@media(min-width:361px)_and_(max-width:480px)]:h-[300px] [@media(max-width:360px)]:h-[200px]"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-[30px] max-lg:mt-0">
        <div className={BS4_CONTAINER}>
          <div className={ROW}>
            <div className={cx(COL, 'hidden md:block md:max-w-[25%] md:flex-[0_0_25%]')}>
              <img
                src="/assets/lp2x/thank-you/3d-square-left.png"
                alt="3d-square"
                className="pl-[30px] max-lg:w-[55%]"
              />
            </div>
            <div className={cx(COL, 'ml-[8.333333%] max-w-[83.333333%] flex-[0_0_83.333333%] md:ml-0 md:max-w-[50%] md:flex-[0_0_50%]')}>
              <a href="https://api.whatsapp.com/send?phone=918097520624" target="_blank" rel="noopener noreferrer">
                <img src="/assets/lp2x/thank-you/watsapp.png" alt="watsapp" width={538} height={74} className="h-auto max-w-full" />
              </a>
            </div>
            <div className={cx(COL, 'block md:hidden md:max-w-[25%] md:flex-[0_0_25%]')}>
              <img
                src="/assets/lp2x/thank-you/3d-square-left.png"
                alt="3d-square"
                width={120}
                height={102}
                className="mt-[20px] [@media(min-width:481px)_and_(max-width:767px)]:w-[12%] [@media(max-width:480px)]:mb-[20px] [@media(max-width:480px)]:w-[8%]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ref .bot-right: its image is a dead link upstream (see header); only the spacer remains */}
      <div className="relative mt-[100px] [@media(max-width:480px)]:hidden" />

      <footer className="bg-black py-[15px] max-md:text-center">
        <div className={BS4_CONTAINER}>
          <div className={ROW}>
            <div className={cx(COL, 'md:max-w-[66.666667%] md:flex-[0_0_66.666667%]')}>
              <ul className="mb-0 list-none">
                <li className="inline">
                  <a
                    href="https://atlasuniversity.edu.in/"
                    className="text-[28px] font-semibold text-white hover:text-white hover:no-underline [@media(max-width:480px)]:text-[22px]"
                  >
                    atlasuniversity.edu.in <span className="hidden [@media(min-width:1200px)]:inline-block">|</span>{' '}
                  </a>
                </li>{' '}
                <li className="inline">
                  <a
                    href="mailto:info@atlasuniversity.edu.in"
                    className="text-[28px] font-semibold text-white hover:text-white hover:no-underline [@media(max-width:480px)]:text-[22px]"
                  >
                    info@atlasuniversity.edu.in
                  </a>
                </li>
              </ul>
            </div>
            <div className={cx(COL, 'md:max-w-[33.333333%] md:flex-[0_0_33.333333%]')}>
              <ul className="float-right mb-0 list-none max-md:float-none max-md:mt-[20px]">
                {SOCIAL.map(([href, src, label, blank]) => (
                  <li key={href} className="inline">
                    {' '}
                    <a
                      href={href}
                      aria-label={label}
                      {...(blank ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="ml-[6px]"
                    >
                      <img src={src} alt="" width={40} height={40} className="inline h-[40px] w-[40px] align-middle [@media(max-width:480px)]:h-[30px] [@media(max-width:480px)]:w-[30px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
