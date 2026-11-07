/* assets/include/footer.php of each year: .meeta-footer-section (#311a79 under footer-bg,
   75px / 80px below 992), the logo (300 wide, 160 below 576) and the .footer-copyright lines
   in #a3a3cb, then the template's fixed back-to-top ring. Lines are transcribed per year. */
import { Fragment } from 'react';
import { A, CONTAINER, LINK, Rich } from './ui';
import ScrollTop from './ScrollTop';

export default function Footer({ site }) {
  const f = site.footer;
  const last = f.lines.length - 1;
  return (
    <>
      <div
        className="bg-[#311a79] bg-cover bg-center bg-no-repeat py-[75px] max-lg:py-[80px]"
        style={{ backgroundImage: `url(${f.bg})` }}
      >
        <div className="text-center">
          <div className={CONTAINER}>
            <div>
              <A href={f.logoHref} className={LINK}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.logo} width={site.logoWidth} alt="Logo" className="max-lp:w-[160px]" />
              </A>
            </div>
            <div className="mt-[42px] [&_a]:inline-block">
              {f.lines.map((line, i) => (
                <Fragment key={i}>
                  {f.hasBreak && i === last && <br />}
                  <p className="text-[#a3a3cb]">
                    <Rich nodes={line} />
                  </p>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ScrollTop />
    </>
  );
}
