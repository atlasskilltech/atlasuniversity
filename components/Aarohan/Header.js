'use client';

/* The Aarohan header: assets/include/header.php of each year over the template's style.css.

   .meeta-header-section is absolute over the hero; .header-sticky gains `.sticky` (fixed,
   #342b7c, the `sticky` 1s slide-down keyframe) once window.scrollY > 100 (main.js). Desktop
   menu items open on hover; the 2025 "Guidelines" item carries a two-level sub-menu that opens
   to the LEFT (that year's sheet changes `.sub-menu { left:0 }` to `right:0`).

   Mobile: `.header-toggle` (below 768) opens the Bootstrap 5 offcanvas from the left (320px,
   280px below 576) with a backdrop; main.js prepends a +/- `.mobile-menu-expand` to every item
   with children and slides its <ul> open. The desktop menu itself only disappears below 576.

   main.js also tags the second-level "Paper Submission" item `menu-item-has-children`, so it
   carries the same chevron - white on the white panel (invisible) until hovered, then pink.

   Deviation: the "Guidelines" parent links `speaker-single.php`, which production answers with the ATLAS
   homepage, so it links `/` (the extractor maps it). */
import { useEffect, useRef, useState } from 'react';
import { A, BSD, BTN_SOLID, Glyph } from './ui';

const ROW = '-mx-3 flex flex-wrap items-center';
const COLX = 'max-w-full shrink-0 px-3';

export default function Header({ site, year }) {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef(null);
  useEffect(() => {
    const on = () => setSticky(window.scrollY > 100);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    if (sticky && bar.current?.animate) {
      bar.current.animate([{ transform: 'translateY(-100%)' }, { transform: 'translateY(0)' }], { duration: 1000 });
    }
  }, [sticky]);
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', esc);
    };
  }, [open]);

  const y25 = year === 2025;
  return (
    <>
      <div className="absolute left-0 top-0 z-[91] w-full">
        <div
          ref={bar}
          className={`border-b border-solid max-lg:py-5 ${
            sticky ? 'fixed left-0 top-0 z-[91] w-full border-b-[#311a79] bg-[#342b7c]' : 'border-b-white/40'
          }`}
        >
          <div className="mx-auto w-full px-3 [@media(min-width:1600px)]:max-w-[1920px] [@media(min-width:1600px)]:px-[70px]">
            <div className={ROW}>
              <div className={`${COLX} w-1/3 flex-[0_0_auto] lg:w-1/4`}>
                <A href={site.logoHref}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={site.logo} alt="Logo" className="max-lp:max-w-[185%]" />
                </A>
              </div>
              <div className={`${COLX} hidden lg:block lg:flex-[0_0_auto] ${y25 ? 'lg:w-[41.666667%]' : 'lg:w-1/2'}`} />
              <div className={`${COLX} w-2/3 flex-[0_0_auto] ${y25 ? 'lg:w-1/3' : 'lg:w-1/4'}`}>
                <div
                  className={`flex items-center gap-[50px] [@media(min-width:768px)_and_(max-width:1399px)]:gap-[25px] max-md:gap-[30px] ${
                    y25 ? 'justify-start max-md:justify-end' : 'justify-end'
                  }`}
                >
                  <nav className="max-lp:hidden">
                    <ul className="flex justify-end">
                      {site.nav.map((item) => (
                        <TopItem key={item.label} item={item} />
                      ))}
                    </ul>
                  </nav>
                  {site.register && (
                    <div className="hidden md:block">
                      <a
                        href={site.register.href}
                        target="_blank"
                        rel="noopener"
                        className={`${BSD} ${BTN_SOLID} bg-[#fc097c] px-[35px] text-[20px] text-white hover:text-white [@media(max-width:1399px)]:px-5`}
                      >
                        {site.register.label}
                      </a>
                    </div>
                  )}
                  <div className="md:hidden">
                    <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="block border-0 bg-transparent p-0">
                      <span className="my-[5px] block h-[2px] w-[25px] bg-[#fc097c]" />
                      <span className="my-[5px] block h-[2px] w-[25px] bg-[#fc097c]" />
                      <span className="mb-0 mt-[5px] block h-[2px] w-[25px] bg-[#fc097c]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas site={site} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

const MENU_A = `${BSD} block whitespace-nowrap px-[25px] py-9 font-bold tracking-[1px] text-white transition-all duration-500 ease-[cubic-bezier(.645,.045,.355,1)] group-hover/top:font-extrabold group-hover/top:text-[#fc097c]`;
const SUB =
  'invisible absolute z-[99] w-[270px] rounded-[5px] border-b-[3px] border-solid border-b-[#fc097c] bg-white py-5 opacity-0 shadow-[0_2px_29px_rgba(0,0,0,.05)] transition-all duration-500 ease-[cubic-bezier(.645,.045,.355,1)]';
const SUB_A = `${BSD} relative block py-[5px] pl-[30px] pr-[30px] text-[16px] font-bold leading-[1.75] tracking-[1px] text-[#1a0a1e] transition-all duration-500 ease-[cubic-bezier(.645,.045,.355,1)] before:invisible before:absolute before:left-5 before:top-1/2 before:h-[6px] before:w-[6px] before:-translate-y-1/2 before:rounded-full before:bg-[#fc097c] before:opacity-0 before:transition-all before:duration-500 before:content-[""]`;

function TopItem({ item }) {
  const size = item.big ? 'text-[22px] leading-[38.5px]' : 'text-[20px] leading-[35px]';
  return (
    <li className="group/top relative whitespace-nowrap">
      <A href={item.href} className={`${MENU_A} ${size}`}>
        {item.label}
        {item.children && (
          <Glyph name="chevronDown" className="ml-[5px] text-[12px] font-medium text-white transition-all duration-500 group-hover/top:text-[#fc097c]" />
        )}
      </A>
      {item.children && (
        <ul className={`${SUB} right-0 top-[110%] group-hover/top:visible group-hover/top:top-full group-hover/top:opacity-100`}>
          {item.children.map((c) => (
            <li key={c.label} className="group/sub relative p-0">
              <A href={c.href ?? undefined} className={`${SUB_A} group-hover/sub:pl-[37px] group-hover/sub:text-[#fc097c] group-hover/sub:before:visible group-hover/sub:before:opacity-100`}>
                {c.label}
                {c.children && (
                  <Glyph name="chevronDown" className="ml-[5px] text-[12px] font-medium text-white transition-all duration-500 group-hover/sub:text-[#fc097c]" />
                )}
              </A>
              {c.children && (
                <ul className={`${SUB} right-full top-0 group-hover/sub:visible group-hover/sub:-top-5 group-hover/sub:opacity-100`}>
                  {c.children.map((d) => (
                    <li key={d.label} className="group/leaf relative p-0">
                      <A href={d.href} className={`${SUB_A} group-hover/leaf:pl-[37px] group-hover/leaf:text-[#fc097c] group-hover/leaf:before:visible group-hover/leaf:before:opacity-100`}>
                        {d.label}
                      </A>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Offcanvas({ site, open, onClose }) {
  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[1040] bg-black transition-opacity duration-150 ${open ? 'opacity-50' : 'pointer-events-none opacity-0'}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed bottom-0 left-0 top-0 z-[1045] flex w-[320px] max-w-full flex-col bg-[#311a79] transition-transform duration-300 ease-in-out max-lp:w-[280px] ${
          open ? 'visible translate-x-0' : 'invisible -translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <A href={site.offcanvasLogoHref} onClick={onClose}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.offcanvasLogo} alt="Logo" style={{ width: 185 }} />
          </A>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="border-0 bg-transparent text-[18px] leading-[1.75] text-white transition-all duration-500 ease-[cubic-bezier(.645,.045,.355,1)] hover:rotate-90 hover:text-[#fc097c]"
          >
            <Glyph name="close" />
          </button>
        </div>
        <div className="grow overflow-y-auto p-4">
          <ul className="py-[30px]">
            {site.mobileNav.map((item) => (
              <MobileItem key={item.label} item={item} onNavigate={onClose} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const MOB_A = `${BSD} relative block py-[5px] text-[16px] font-semibold leading-[1.75] text-white transition-all duration-500 ease-[cubic-bezier(.645,.045,.355,1)] hover:text-[#fc097c]`;

function MobileItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false);
  const has = !!item.children;
  return (
    <li className="relative">
      {has && (
        <button
          type="button"
          aria-label={open ? `Collapse ${item.label}` : `Expand ${item.label}`}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`absolute right-5 top-[5px] h-[30px] w-[30px] cursor-pointer rounded-[3px] border-0 bg-white/10 p-0 before:absolute before:left-1/2 before:top-1/2 before:h-[2px] before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:content-[""] after:absolute after:left-1/2 after:top-1/2 after:w-[2px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white after:transition-all after:duration-500 after:content-[""] ${
            open ? 'after:h-0' : 'after:h-4'
          }`}
        />
      )}
      <A
        href={item.href === '#' ? undefined : item.href}
        className={`${MOB_A} ${has ? 'cursor-pointer' : ''}`}
        onClick={has ? (e) => { e.preventDefault(); setOpen((v) => !v); } : onNavigate}
        role={has ? 'button' : undefined}
      >
        {item.label}
      </A>
      {has && (
        <div className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <ul className="overflow-hidden pl-[6%]">
            {item.children.map((c) => (
              <MobileItem key={c.label} item={c} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
