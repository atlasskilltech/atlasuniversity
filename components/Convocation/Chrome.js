/* eslint-disable @next/next/no-img-element -- the reference's own small PNG marks, shown at fixed
   CSS sizes; reproduced as authored. */
/*
 * /convocation page chrome — the reference's preloader, skip link, fixed header, mobile/tablet
 * menu, page footer (#contact) and the two native <dialog>s (index.html:80-151, 586-667;
 * css/styles.css "Preloader", "Header", "Hamburger", "Dialogs").
 *
 * State the reference keeps in classes is kept in data attributes set by lib/convocation/motion.js:
 *   header[data-scrolled] (.is-scrolled)   header[data-hidden] (.is-hidden)
 * The preloader is hidden when scripting is off (the reference fades it with a 4s CSS failsafe; with
 * no script the curtain would serve no purpose) — motion.js runs that same 4s failsafe as a Web
 * Animation when scripts do run.
 */
import { Fragment } from 'react';
import {
  ArrowOut,
  BTN,
  BTN_GOLD,
  BTN_LINE,
  BTN_SM,
  DISPLAY,
  DISPLAY_SM,
  ICON_BTN,
  MEDIA_RADIUS,
  SANS,
  TEXT_SM,
  WRAP,
} from './ui';

export function Preloader({ preloader }) {
  return (
    <div
      id="preloader"
      aria-hidden="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-[#0e0e33] text-[#f5f6fc] [@media(scripting:none)]:hidden"
    >
      <div data-preloader-inner className="grid justify-items-center gap-5 text-center">
        <img
          data-preloader-mark
          src={preloader.mark.src}
          alt=""
          width={preloader.mark.width}
          height={preloader.mark.height}
          className="block h-auto w-[44px]"
        />
        <p className={`${DISPLAY} [font-size:clamp(2rem,6vw,3.5rem)] font-medium leading-none tracking-[-0.01em]`}>{preloader.word}</p>
        <span className="relative h-px w-[min(220px,50vw)] overflow-hidden bg-[rgb(245_246_252/0.15)]">
          <span data-preloader-line className="absolute inset-0 origin-left scale-x-0 bg-[#d6ae55]" />
        </span>
        <p className={`${SANS} text-[0.8125rem] tracking-[0.02em] text-[rgb(245_246_252/0.6)]`}>{preloader.caption}</p>
      </div>
    </div>
  );
}

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[#d6ae55] focus:px-5 focus:py-3 focus:text-[#0e0e33]"
    >
      Skip to content
    </a>
  );
}

const NAV_LINK =
  "relative py-2 text-[rgb(245_246_252/0.72)] [transition:color_.3s_ease] after:absolute after:inset-x-0 after:bottom-[0.1rem] after:h-px after:origin-right after:scale-x-0 after:bg-[#d6ae55] after:content-[''] after:[transition:transform_.5s_cubic-bezier(0.16,1,0.3,1)] hover:text-[#f5f6fc] hover:after:origin-left hover:after:scale-x-100 aria-[current=true]:text-[#f5f6fc] aria-[current=true]:after:origin-left aria-[current=true]:after:scale-x-100";

const MENU_LINK = `block py-3 ${DISPLAY} [font-size:clamp(2rem,7.5vw,3.25rem)] leading-tight`;

export function Header({ logo, nav, menu, photosUrl, playlistUrl }) {
  return (
    <>
      <header
        data-header
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent text-[#f5f6fc] [transition:transform_.6s_cubic-bezier(0.16,1,0.3,1),background-color_.4s_ease,border-color_.4s_ease] data-[hidden]:-translate-y-full data-[scrolled]:border-b-[rgb(245_246_252/0.08)] data-[scrolled]:bg-[rgb(14_14_51/0.82)] data-[scrolled]:backdrop-blur-[14px] data-[scrolled]:backdrop-saturate-[1.4]"
      >
        <div className={`${WRAP} flex h-[4.5rem] items-center justify-between gap-6`}>
          <a href="#top" className="shrink-0" aria-label="ATLAS SkillTech University, back to top">
            <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="block h-9 w-auto n640:h-10" />
          </a>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-7 text-[0.9375rem]">
              {nav.map((l) => (
                <li key={l.href}>
                  <a className={NAV_LINK} data-nav-link href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a className={`hidden n640:inline-flex ${BTN_SM} ${BTN_LINE}`} href={photosUrl} target="_blank" rel="noopener">
              Photos{' '}
              <ArrowOut />{' '}
              <span className="sr-only">(opens Google Photos in a new tab)</span>
            </a>
            <a className={`hidden n640:inline-flex ${BTN_SM} ${BTN_GOLD}`} href={playlistUrl} target="_blank" rel="noopener">
              Videos{' '}
              <ArrowOut />{' '}
              <span className="sr-only">(opens YouTube in a new tab)</span>
            </a>
            <button
              type="button"
              data-menu-toggle
              aria-expanded="false"
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className={`group/mt grid ${ICON_BTN} xl:hidden`}
            >
              <span aria-hidden="true" className="relative h-[12px] w-[22px]">
                <span className="absolute left-0 top-0 h-[1.5px] w-full bg-current [transition:transform_.5s_cubic-bezier(0.16,1,0.3,1),top_.5s_cubic-bezier(0.16,1,0.3,1)] group-aria-expanded/mt:top-[5px] group-aria-expanded/mt:rotate-45" />
                <span className="absolute left-0 top-[10px] h-[1.5px] w-full bg-current [transition:transform_.5s_cubic-bezier(0.16,1,0.3,1),top_.5s_cubic-bezier(0.16,1,0.3,1)] group-aria-expanded/mt:top-[5px] group-aria-expanded/mt:-rotate-45" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <div id="mobile-menu" data-menu hidden className="fixed inset-0 z-40 bg-[#0e0e33] text-[#f5f6fc] xl:hidden">
        <div className={`${WRAP} flex h-full flex-col overflow-y-auto pb-8 pt-28`}>
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {menu.map((l, i) => (
                <li key={l.href} className={i === menu.length - 1 ? 'overflow-hidden' : 'overflow-hidden border-b border-[#f5f6fc]/10'}>
                  <a data-menu-link className={MENU_LINK} href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div data-menu-foot className="mt-auto flex flex-wrap gap-3 pt-10">
            <a className={`inline-flex ${BTN} ${BTN_LINE}`} href={photosUrl} target="_blank" rel="noopener">
              Photo album
              <ArrowOut />
            </a>
            <a className={`inline-flex ${BTN} ${BTN_GOLD}`} href={playlistUrl} target="_blank" rel="noopener">
              All videos
              <ArrowOut />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

const LINK = 'transition-colors hover:text-[#efd592]';

export function Footer({ footer, logo }) {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="border-t border-[#f5f6fc]/10 bg-[#0e0e33] text-[#f5f6fc]">
      <div className={`${WRAP} grid gap-12 py-20 n640:grid-cols-2 n1024:grid-cols-12 n1024:gap-10 n1024:py-24`}>
        <div className="n640:col-span-2 n1024:col-span-4">
          <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} loading="lazy" className="block h-14 w-auto" />
          <h2 id="contact-title" className={`mt-8 ${DISPLAY_SM}`}>{footer.title}</h2>
          <ul className="mt-6 flex gap-2">
            <li>
              <a className={`grid ${ICON_BTN}`} href={footer.social[0].href} target="_blank" rel="noopener" aria-label={footer.social[0].label}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21z" />
                </svg>
              </a>
            </li>
            <li>
              <a className={`grid ${ICON_BTN}`} href={footer.social[1].href} target="_blank" rel="noopener" aria-label={footer.social[1].label}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="n1024:col-span-3">
          <h3 className={`${TEXT_SM} text-[#f5f6fc]/60`}>{footer.visitLabel}</h3>
          <address className="mt-4 not-italic leading-[1.625]">
            {footer.address.map((line, i) => (
              <Fragment key={line}>
                {line}
                {i < footer.address.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </address>
        </div>

        <div className="n1024:col-span-3">
          <h3 className={`${TEXT_SM} text-[#f5f6fc]/60`}>{footer.callLabel}</h3>
          <ul className="mt-4 space-y-3">
            {footer.contact.map((l) => (
              <li key={l.href}>
                <a className={LINK} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="n1024:col-span-2" aria-label="Footer">
          <h3 className={`${TEXT_SM} text-[#f5f6fc]/60`}>{footer.pageLabel}</h3>
          <ul className="mt-4 space-y-3">
            {footer.pageLinks.map((l) => (
              <li key={l.href}>
                <a className={LINK} href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={`${WRAP} flex flex-col gap-4 border-t border-[#f5f6fc]/10 py-8 ${TEXT_SM} text-[#f5f6fc]/60 n640:flex-row n640:items-center n640:justify-between`}>
        <p>{footer.copyright}</p>
        <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-[#f5f6fc]">
          {footer.backToTop}
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

const MODAL =
  'm-0 h-full max-h-full w-full max-w-full border-0 bg-transparent p-0 text-[#f5f6fc] backdrop:bg-[rgb(14_14_51/0.94)] backdrop:backdrop-blur-[6px]';

const CLOSE_ICON = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
  </svg>
);

export function Dialogs() {
  return (
    <>
      <dialog id="lightbox" data-modal data-lightbox aria-label="Photo viewer" className={MODAL}>
        <div className="flex h-full flex-col">
          <div className={`${WRAP} flex items-center justify-between py-4`}>
            <p data-lightbox-count className={`${TEXT_SM} tabular-nums text-[#f5f6fc]/70`} />
            <button type="button" data-dialog-close aria-label="Close photo viewer" className={`grid ${ICON_BTN}`}>
              {CLOSE_ICON}
            </button>
          </div>
          <figure className={`${WRAP} flex min-h-0 flex-1 flex-col items-center justify-center gap-4`}>
            <img data-lightbox-img alt="" className={`block max-h-[74svh] w-auto max-w-full ${MEDIA_RADIUS} object-contain`} />
            <figcaption data-lightbox-caption className="text-center text-[#f5f6fc]/80" />
          </figure>
          <div className={`${WRAP} flex items-center justify-center gap-3 py-6`}>
            <button type="button" data-lightbox-prev aria-label="Previous photo" className={`grid ${ICON_BTN}`}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M10 3 5 8l5 5" />
              </svg>
            </button>
            <button type="button" data-lightbox-next aria-label="Next photo" className={`grid ${ICON_BTN}`}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="video-dialog" data-modal data-video-dialog aria-labelledby="video-title" className={MODAL}>
        <div className={`${WRAP} flex h-full flex-col justify-center gap-5 py-6`}>
          <div className="flex items-center justify-between gap-4">
            <h2 id="video-title" data-video-title className={DISPLAY_SM}>
              Film
            </h2>
            <button type="button" data-dialog-close aria-label="Close video" className={`grid shrink-0 ${ICON_BTN}`}>
              {CLOSE_ICON}
            </button>
          </div>
          <div className={`mx-auto aspect-video w-full max-w-[min(100%,calc((100svh_-_10rem)*16/9))] overflow-hidden ${MEDIA_RADIUS} bg-black`}>
            <iframe
              data-video-frame
              className="block h-full w-full"
              title="Convocation film"
              src="about:blank"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
