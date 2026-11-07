/* Shared primitives for the three Aarohan conference sites (the "Meeta" event template over
   Bootstrap 5.1.3 + the template's style.css). Values are the template's own, measured on
   https://atlasuniversity.edu.in/aarohan23|2024|2025/.

   Breakpoints: the template writes max-width 1399 / 1199 / 991 / 767 / 575 and Bootstrap's grid
   turns at 576 / 768 / 992 / 1200. Mapped as: 767 -> max-md, 991 -> max-lg, 575 -> max-lp (576:
   one pixel wider than the template's 575, but it is the only max screen emitted after max-md),
   576/768/992 -> n576/md/lg, and 1199/1200/1399 as explicit, non-overlapping arbitrary ranges. */
import { Fragment } from 'react';
import Link from 'next/link';
import { GLYPHS } from './glyphs';

export const BSD = 'font-[AaBSD,cursive]';
export const OPEN = 'font-[AaOpen,sans-serif]';
export const ARCHIVO = 'font-[AaArchivo,sans-serif]';

export const PINK = '#fc097c';
export const INK = '#1a0a1e';

/* Bootstrap .container under style.css (1170px from 1200 up). */
export const CONTAINER =
  'mx-auto w-full px-3 n576:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] [@media(min-width:1200px)]:max-w-[1170px]';

/* .section-padding: 2023's sheet says 150px, 2024/2025's 75px; 110 / 80 / 60 below. */
export const SECTION_PAD = {
  2023: 'py-[150px] [@media(min-width:992px)_and_(max-width:1199px)]:py-[110px] max-lg:py-[80px] max-md:py-[60px]',
  2024: 'py-[75px] [@media(min-width:992px)_and_(max-width:1199px)]:py-[110px] max-lg:py-[80px] max-md:py-[60px]',
  2025: 'py-[75px] [@media(min-width:992px)_and_(max-width:1199px)]:py-[110px] max-lg:py-[80px] max-md:py-[60px]',
};

/* a { transition: all .5s cubic-bezier(.645,.045,.355,1) } a:hover { color: #fc097c } */
export const LINK = 'transition-all duration-500 ease-[cubic-bezier(.645,.045,.355,1)] hover:text-[#fc097c]';

/* ---------------------------------------------------------------- .btn */
/* .btn: 50px (45 below 576), no border, and a 10% black circle that grows from the bottom-left
   corner on hover. [class*=btn-outline-] adds a 2px border (line-height 48/43) and starts the
   circle at 0. Font size is left to the caller: .btn is 16px (14 below 576) but every Aarohan
   button carries an inline `font-size: 20px` except the 2025 guideline pages' two. */
const BTN_CORE =
  'relative z-[1] inline-block overflow-hidden whitespace-nowrap rounded-none text-center align-middle font-bold transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:-z-[1] before:-translate-x-1/2 before:translate-y-1/2 before:rounded-full before:bg-black before:opacity-10 before:transition-all before:duration-500 before:ease-[cubic-bezier(.645,.045,.355,1)] before:content-[""] hover:before:h-[420px] hover:before:w-[420px]';
export const BTN_SOLID = `${BTN_CORE} h-[50px] border-0 leading-[50px] max-lp:h-[45px] max-lp:leading-[45px] before:h-[75px] before:w-[75px]`;
export const BTN_OUTLINE = `${BTN_CORE} h-[50px] border-2 border-solid leading-[48px] max-lp:h-[45px] max-lp:leading-[43px] before:h-0 before:w-0`;

/* ---------------------------------------------------------------- Bootstrap grid */
const COL = {
  col: 'flex-[1_0_0%]',
  'col-12': 'flex-[0_0_auto]', // width 100% comes from COL_BASE
  'col-sm-3': 'n576:flex-[0_0_auto] n576:w-1/4',
  'col-sm-4': 'n576:flex-[0_0_auto] n576:w-1/3',
  'col-sm-6': 'n576:flex-[0_0_auto] n576:w-1/2',
  'col-sm-12': 'n576:flex-[0_0_auto] n576:w-full',
  'col-md-6': 'md:flex-[0_0_auto] md:w-1/2',
  'col-lg-1': 'lg:flex-[0_0_auto] lg:w-[8.333333%]',
  'col-lg-2': 'lg:flex-[0_0_auto] lg:w-[16.666667%]',
  'col-lg-3': 'lg:flex-[0_0_auto] lg:w-1/4',
  'col-lg-4': 'lg:flex-[0_0_auto] lg:w-1/3',
  'col-lg-5': 'lg:flex-[0_0_auto] lg:w-[41.666667%]',
  'col-lg-6': 'lg:flex-[0_0_auto] lg:w-1/2',
  'col-lg-7': 'lg:flex-[0_0_auto] lg:w-[58.333333%]',
  'col-lg-8': 'lg:flex-[0_0_auto] lg:w-2/3',
  'col-lg-9': 'lg:flex-[0_0_auto] lg:w-3/4',
  'col-lg-12': 'lg:flex-[0_0_auto] lg:w-full',
  'col-xl-5': '[@media(min-width:1200px)]:flex-[0_0_auto] [@media(min-width:1200px)]:w-[41.666667%]',
  'col-xl-7':'[@media(min-width:1200px)]:flex-[0_0_auto] [@media(min-width:1200px)]:w-[58.333333%]',
  'not-showing-in-mobile': 'max-lp:hidden',
};
export function colClass(cols = []) {
  return cols.map((c) => COL[c] || '').join(' ');
}

/* .row (+ g-0 / gy-5). Children are the columns; `gut` picks the gutter. */
export const ROW = {
  default: '-mx-3 flex flex-wrap',
  g0: 'flex flex-wrap',
  gy5: '-mx-3 -mt-12 flex flex-wrap',
};
export const COL_BASE = {
  default: 'w-full max-w-full shrink-0 px-3',
  g0: 'w-full max-w-full shrink-0',
  gy5: 'mt-12 w-full max-w-full shrink-0 px-3',
};

/* ---------------------------------------------------------------- links */
export function A({ href, className = '', children, target, ...rest }) {
  if (href == null) return <a className={className} {...rest}>{children}</a>;
  const internal = href.startsWith('/') && !href.startsWith('/assets/') && !href.startsWith('//');
  if (internal) return <Link href={href} className={className} {...rest}>{children}</Link>;
  return (
    <a href={href} className={className} target={target} rel={target === '_blank' ? 'noopener' : undefined} {...rest}>
      {children}
    </a>
  );
}

/* ---------------------------------------------------------------- icon glyphs */
export function Glyph({ name, className = '', style }) {
  const g = GLYPHS[name];
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${g.w} 512`}
      className={`inline-block h-[1em] fill-current align-[-0.125em] ${className}`}
      style={{ width: `${g.w / 512}em`, ...style }}
    >
      <path transform="translate(0 448) scale(1 -1)" d={g.d} />
    </svg>
  );
}

/* ---------------------------------------------------------------- rich text */
/* Nodes come from the extractor: a string, or { t, c, href, target, style, cls }.
   Elements render bare - the template's base rules (p/ul margins 0, list-style none) equal
   Preflight's - and each section styles its own descendants. */
export function Rich({ nodes, linkClass = LINK }) {
  if (!nodes) return null;
  return nodes.map((n, i) => <Node key={i} n={n} linkClass={linkClass} />);
}

function styleObj(s) {
  if (!s) return undefined;
  const o = {};
  s.split(';').forEach((d) => {
    const [k, ...v] = d.split(':');
    if (!k || !v.length) return;
    o[k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = v.join(':').trim();
  });
  return o;
}

function Node({ n, linkClass }) {
  if (typeof n === 'string') return n;
  const kids = n.c ? <Rich nodes={n.c} linkClass={linkClass} /> : null;
  const style = styleObj(n.style);
  switch (n.t) {
    case 'br':
      return <br />;
    case 'img':
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={n.src} alt={n.alt} width={n.w || undefined} height={n.h || undefined} className="inline" />;
    case 'a':
      return (
        <A href={n.href} target={n.target} className={`${linkClass} ${n.cls === 'martinrollwebsite' ? 'text-[#7CB4EB]' : ''}`}>
          {kids}
        </A>
      );
    case 'b':
    case 'strong':
      return <strong className="font-bold" style={style}>{kids}</strong>;
    case 'i':
      if ((n.cls || '').includes('flaticon-phone-call')) return <Glyph name="phone" />;
      return <em style={style}>{kids}</em>;
    case 'em':
      return <em style={style}>{kids}</em>;
    case 'sup':
      return <sup>{kids}</sup>;
    case 'sub':
      return <sub>{kids}</sub>;
    case 'u':
      return <u>{kids}</u>;
    case 'span':
      return <span style={style}>{kids}</span>;
    case 'p':
      return <p style={style}>{kids}</p>;
    case 'ul':
      return <ul>{kids}</ul>;
    case 'ol':
      return <ol>{kids}</ol>;
    case 'li':
      return <li>{kids}</li>;
    case 'h3':
      return <h3>{kids}</h3>;
    case 'h4':
      return <h4>{kids}</h4>;
    case 'div':
      return <div style={style}>{kids}</div>;
    default:
      return <Fragment>{kids}</Fragment>;
  }
}
