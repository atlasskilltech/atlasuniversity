/* eslint-disable @next/next/no-img-element */
/*
 * https://atlasuniversity.edu.in/lp/btech/
 * GENERATED from the production page by scratchpad/np/work/lp (compile.js -> gen.py -> emit.py):
 * every element carries the reference cascade resolved per breakpoint as Tailwind arbitrary
 * properties. `lpm-*` classes are inert markers for :hover-of-ancestor variants and behaviours;
 * `lps-*` are runtime state markers toggled by the page behaviours.
 * The lower 'Get Info' form is a live NoPaperForms widget (`.npf_wgts`, emwgts.js injected by LpBehaviors) exactly as production renders it; the hero form is the ATLAS CRM script embed.
 * Images the reference references that production serves as soft-404s (absent from lp.zip too) are omitted (a <picture> falls back to its first live <source>): btech/assets/images/hero-banner/defualt/hero-desktop.webp, btech/assets/images/section-four/slider/1.jpg, btech/assets/images/section-four/slider/2.jpg, btech/assets/images/section-four/slider/3.jpg, btech/assets/images/section-four/slider/4.jpg, btech/assets/images/section-four/slider/5.jpg, btech/assets/images/section-four/slider/6.jpg
 */
import CrmWidget from '@/components/ui/CrmWidget';
import LpBehaviors from '../runtime/LpBehaviors';

export default function Btech() {
  return (
    <div data-lp="btech" className="[--bs-black:#000] [--bs-black-rgb:0,_0,_0] [--bs-blue:#0d6efd] [--bs-body-bg:#fff] [--bs-body-bg-rgb:255,_255,_255] [--bs-body-color:#212529] [--bs-body-color-rgb:33,_37,_41] [--bs-body-font-family:var(--bs-font-sans-serif)] [--bs-body-font-size:1rem] [--bs-body-font-weight:400] [--bs-body-line-height:1.5] [--bs-border-color:#dee2e6] [--bs-border-color-translucent:rgba(0,_0,_0,_0.175)] [--bs-border-radius:0.375rem] [--bs-border-radius-2xl:var(--bs-border-radius-xxl)] [--bs-border-radius-lg:0.5rem] [--bs-border-radius-pill:50rem] [--bs-border-radius-sm:0.25rem] [--bs-border-radius-xl:1rem] [--bs-border-radius-xxl:2rem] [--bs-border-style:solid] [--bs-border-width:1px] [--bs-box-shadow:0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] [--bs-box-shadow-inset:inset_0_1px_2px_rgba(0,_0,_0,_0.075)] [--bs-box-shadow-lg:0_1rem_3rem_rgba(0,_0,_0,_0.175)] [--bs-box-shadow-sm:0_0.125rem_0.25rem_rgba(0,_0,_0,_0.075)] [--bs-breakpoint-lg:992px] [--bs-breakpoint-md:768px] [--bs-breakpoint-sm:576px] [--bs-breakpoint-xl:1200px] [--bs-breakpoint-xs:0] [--bs-breakpoint-xxl:1400px] [--bs-carousel-caption-color:#fff] [--bs-carousel-indicator-active-bg:#fff] [--bs-code-color:#d63384] [--bs-cyan:#0dcaf0] [--bs-danger:#dc3545] [--bs-danger-bg-subtle:#f8d7da] [--bs-danger-border-subtle:#f1aeb5] [--bs-danger-rgb:220,_53,_69] [--bs-danger-text-emphasis:#58151c] [--bs-dark:#212529] [--bs-dark-bg-subtle:#ced4da] [--bs-dark-border-subtle:#adb5bd] [--bs-dark-rgb:33,_37,_41] [--bs-dark-text-emphasis:#495057] [--bs-emphasis-color:#000] [--bs-emphasis-color-rgb:0,_0,_0] [--bs-focus-ring-color:rgba(13,_110,_253,_0.25)] [--bs-focus-ring-opacity:0.25] [--bs-focus-ring-width:0.25rem] [--bs-font-monospace:SFMono-Regular,_Menlo,_Monaco,_Consolas,_'Liberation_Mono',_'Courier_New',_monospace] [--bs-font-sans-serif:system-ui,_-apple-system,_'Segoe_UI',_Roboto,_'Helvetica_Neue',_'Noto_Sans',_'Liberation_Sans',_Arial,_sans-serif,_'Apple_Color_Emoji',_'Segoe_UI_Emoji',_'Segoe_UI_Symbol',_'Noto_Color_Emoji'] [--bs-form-invalid-border-color:#dc3545] [--bs-form-invalid-color:#dc3545] [--bs-form-valid-border-color:#198754] [--bs-form-valid-color:#198754] [--bs-gradient:linear-gradient(_180deg,_rgba(255,_255,_255,_0.15),_rgba(255,_255,_255,_0)_)] [--bs-gray:#6c757d] [--bs-gray-100:#f8f9fa] [--bs-gray-200:#e9ecef] [--bs-gray-300:#dee2e6] [--bs-gray-400:#ced4da] [--bs-gray-500:#adb5bd] [--bs-gray-600:#6c757d] [--bs-gray-700:#495057] [--bs-gray-800:#343a40] [--bs-gray-900:#212529] [--bs-gray-dark:#343a40] [--bs-green:#198754] [--bs-heading-color:inherit] [--bs-highlight-bg:#fff3cd] [--bs-highlight-color:#212529] [--bs-indigo:#6610f2] [--bs-info:#0dcaf0] [--bs-info-bg-subtle:#cff4fc] [--bs-info-border-subtle:#9eeaf9] [--bs-info-rgb:13,_202,_240] [--bs-info-text-emphasis:#055160] [--bs-light:#f8f9fa] [--bs-light-bg-subtle:#fcfcfd] [--bs-light-border-subtle:#e9ecef] [--bs-light-rgb:248,_249,_250] [--bs-light-text-emphasis:#495057] [--bs-link-color:#0d6efd] [--bs-link-color-rgb:13,_110,_253] [--bs-link-decoration:underline] [--bs-link-hover-color:#0a58ca] [--bs-link-hover-color-rgb:10,_88,_202] [--bs-orange:#fd7e14] [--bs-pink:#d63384] [--bs-primary:#0d6efd] [--bs-primary-bg-subtle:#cfe2ff] [--bs-primary-border-subtle:#9ec5fe] [--bs-primary-rgb:13,_110,_253] [--bs-primary-text-emphasis:#052c65] [--bs-purple:#6f42c1] [--bs-red:#dc3545] [--bs-secondary:#6c757d] [--bs-secondary-bg:#e9ecef] [--bs-secondary-bg-rgb:233,_236,_239] [--bs-secondary-bg-subtle:#e2e3e5] [--bs-secondary-border-subtle:#c4c8cb] [--bs-secondary-color:rgba(33,_37,_41,_0.75)] [--bs-secondary-color-rgb:33,_37,_41] [--bs-secondary-rgb:108,_117,_125] [--bs-secondary-text-emphasis:#2b2f32] [--bs-success:#198754] [--bs-success-bg-subtle:#d1e7dd] [--bs-success-border-subtle:#a3cfbb] [--bs-success-rgb:25,_135,_84] [--bs-success-text-emphasis:#0a3622] [--bs-teal:#20c997] [--bs-tertiary-bg:#f8f9fa] [--bs-tertiary-bg-rgb:248,_249,_250] [--bs-tertiary-color:rgba(33,_37,_41,_0.5)] [--bs-tertiary-color-rgb:33,_37,_41] [--bs-warning:#ffc107] [--bs-warning-bg-subtle:#fff3cd] [--bs-warning-border-subtle:#ffe69c] [--bs-warning-rgb:255,_193,_7] [--bs-warning-text-emphasis:#664d03] [--bs-white:#fff] [--bs-white-rgb:255,_255,_255] [--bs-yellow:#ffc107] [--swiper-navigation-size:70px] [@media_(max-width:992px)]:[--swiper-navigation-size:40px] [--swiper-theme-color:#007aff] [-webkit-font-smoothing:auto] [-webkit-tap-highlight-color:transparent] [background-color:var(--bs-body-bg)] [color:var(--bs-body-color)] [font-family:'LP27_Poppins',sans-serif] [font-size:var(--bs-body-font-size)] [font-weight:var(--bs-body-font-weight)] [line-height:var(--bs-body-line-height)] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:56px] [@media_(min-width:993px)_and_(max-width:1200px)]:[padding-top:64px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-top:68px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-top:64px] [@media_(min-width:1501px)]:[padding-top:86px] [text-align:var(--bs-body-text-align)] [text-size-adjust:100%]">
      {" "}
      {" "}
      {" "}
      {" "}
      {" "}
      <header className="[--bs-bg-opacity:1] ![align-items:center] ![background-color:rgba(var(--bs-light-rgb),_var(--bs-bg-opacity))] [box-shadow:rgba(0,_0,_0,_0.19)_1px_0px_4px_0px] ![display:flex] [height:56px] [@media_(min-width:993px)_and_(max-width:1200px)]:[height:64px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[height:68px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[height:64px] [@media_(min-width:1501px)]:[height:86px] ![justify-content:space-between] [left:0px] ![padding-bottom:1rem] max-lg:![padding-bottom:0.25rem] ![padding-left:1rem] max-lg:![padding-left:0.25rem] ![padding-right:1rem] max-lg:![padding-right:0.25rem] ![padding-top:1rem] max-lg:![padding-top:0.25rem] [position:fixed] [top:0px] [width:100%] [z-index:2]">
        <div>
          <img className="[display:revert] [width:200px] [@media_(max-width:992px)]:[width:170px] [@media_(min-width:1501px)]:[width:242px]" src="/assets/lp/btech/assets/images/icon/logo.svg" alt="btech landing Pagesss Logo" />
        </div>
        <nav className="[@media_(max-width:992px)]:[background-color:rgb(255,_255,_255)] [@media_(max-width:992px)]:[height:35%] [@media_(max-width:992px)]:[left:-100%] [@media_(max-width:992px)]:[position:fixed] [@media_(max-width:992px)]:[top:70px] [@media_(max-width:992px)]:[transition-delay:0s] [@media_(max-width:992px)]:[transition-duration:0.3s] [@media_(max-width:992px)]:[transition-property:left] [@media_(max-width:992px)]:[transition-timing-function:ease-in-out] [&.lps-nav]:[left:revert] [@media_(max-width:992px)]:[&.lps-nav]:[left:0%]" data-lpt="nav">
          <ul className="[align-items:center] [@media_(max-width:992px)]:[box-shadow:rgba(0,_0,_0,_0.19)_1px_0px_4px_0px] [display:flex] [@media_(max-width:992px)]:[flex-direction:column] [@media_(max-width:992px)]:[height:100%] [@media_(max-width:992px)]:[justify-content:space-evenly] [@media_(max-width:992px)]:[padding-left:12px] [@media_(max-width:992px)]:[padding-right:12px]">
            <li className="![border-bottom-color:currentcolor] ![border-bottom-style:none] ![border-bottom-width:0px] ![border-image-outset:initial] ![border-image-repeat:initial] ![border-image-slice:initial] ![border-image-source:initial] ![border-image-width:initial] ![border-left-color:currentcolor] ![border-left-style:none] ![border-left-width:0px] ![border-right-color:currentcolor] ![border-right-style:none] ![border-right-width:0px] ![border-top-color:currentcolor] ![border-top-style:none] ![border-top-width:0px] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(237,_26,_59)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#program-highlights">
                {"Program Highlights"}
              </a>
            </li>
            <li className="[@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-left-color:red] [@media_(max-width:992px)]:[border-left-color:currentcolor] [@media_(max-width:992px)]:[border-left-style:none] [border-left-width:3px] [@media_(max-width:992px)]:[border-left-width:medium] [@media_(max-width:992px)]:[border-right-color:currentcolor] [@media_(max-width:992px)]:[border-right-style:none] [@media_(max-width:992px)]:[border-right-width:medium] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [@media_(max-width:992px)]:[border-top-width:medium] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(237,_26,_59)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#career-pathways">
                {"Career Pathways"}
              </a>
            </li>
            <li className="[@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-left-color:red] [@media_(max-width:992px)]:[border-left-color:currentcolor] [@media_(max-width:992px)]:[border-left-style:none] [border-left-width:3px] [@media_(max-width:992px)]:[border-left-width:medium] [@media_(max-width:992px)]:[border-right-color:currentcolor] [@media_(max-width:992px)]:[border-right-style:none] [@media_(max-width:992px)]:[border-right-width:medium] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [@media_(max-width:992px)]:[border-top-width:medium] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(237,_26,_59)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#why-atlas-ugd">
                {"Why ATLAS uGDX"}
              </a>
            </li>
            <li className="[@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-left-color:red] [@media_(max-width:992px)]:[border-left-color:currentcolor] [@media_(max-width:992px)]:[border-left-style:none] [border-left-width:3px] [@media_(max-width:992px)]:[border-left-width:medium] [@media_(max-width:992px)]:[border-right-color:currentcolor] [@media_(max-width:992px)]:[border-right-style:none] [@media_(max-width:992px)]:[border-right-width:medium] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [@media_(max-width:992px)]:[border-top-width:medium] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(237,_26,_59)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#about-atlas-ugd">
                {"About ATLAS uGDX"}
              </a>
            </li>
            <li className="![border-bottom-color:currentcolor] ![border-bottom-style:none] ![border-bottom-width:0px] ![border-image-outset:initial] ![border-image-repeat:initial] ![border-image-slice:initial] ![border-image-source:initial] ![border-image-width:initial] ![border-left-color:currentcolor] ![border-left-style:none] ![border-left-width:0px] ![border-right-color:currentcolor] ![border-right-style:none] ![border-right-width:0px] ![border-top-color:currentcolor] ![border-top-style:none] ![border-top-width:0px] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [background-color:rgb(52,_43,_124)] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:revert] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-feature-settings:revert] [font-size:inherit] [font-variation-settings:revert] [font-weight:revert] [letter-spacing:revert] [padding-bottom:3px] [@media_(min-width:1201px)]:[padding-bottom:5px] [padding-left:20px] [@media_(min-width:1201px)]:[padding-left:30px] [padding-right:20px] [@media_(min-width:1201px)]:[padding-right:30px] [padding-top:3px] [@media_(min-width:1201px)]:[padding-top:5px]">
                {" "}
                <a className="[color:rgb(255,_255,_255)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)]" href="#get-info">
                  {"Get Info"}
                </a>
                {" "}
              </button>
            </li>
          </ul>
        </nav>
        <div className="lpm-humburger ![display:none] max-lg:![display:block]">
          <img className="[@media_(max-width:992px)]:[cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[max-width:100%] [@media_(max-width:992px)]:[width:40px]" src="/assets/lp/isme-ug/assets/images/icon/humburger.svg" alt="humburger icon" />
        </div>
      </header>
      <main>
        <section>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![position:relative] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [display:flex] [flex-wrap:wrap] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <div className="[aspect-ratio:16_/_6] [@media_(max-width:992px)]:[aspect-ratio:9_/_9] [width:100%]">
                  <picture>
                    <source media="(max-width: 992px)" srcSet="/assets/lp/btech/assets/images/hero-banner/hero-mobile.webp" />
                    {" "}
                    <source media="(min-width: 993px)" srcSet="/assets/lp/btech/assets/images/hero-banner/hero-desktop.webp" />
                    {" "}
                    <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/hero-banner/hero-mobile.webp" alt="b.tech Banner" width="1920" height="800" fetchPriority="high" />
                  </picture>
                </div>
              </div>
            </div>
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [height:100%] [@media_(max-width:992px)]:[height:unset] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] [padding-bottom:0px] [padding-left:0px] [@media_(min-width:993px)_and_(max-width:1200px)]:[padding-left:60px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:70px] [@media_(min-width:1367px)]:[padding-left:120px] [padding-right:0px] [padding-top:0px] [position:absolute] [top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] max-lg:![padding-bottom:0.5rem] ![padding-left:0px] max-lg:![padding-left:calc(var(--bs-gutter-x)_*_0.5)] ![padding-right:0px] max-lg:![padding-right:calc(var(--bs-gutter-x)_*_0.5)] ![padding-top:0px] max-lg:![padding-top:0.5rem] [width:50%] max-lg:[width:100%]">
                <h1 className="[color:rgb(237,_26,_59)] [font-size:44px] [@media_(min-width:993px)_and_(max-width:1200px)]:[font-size:42px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[font-size:50px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[font-size:60px] [@media_(min-width:1501px)]:[font-size:76px] [font-weight:bold] [line-height:38px] [@media_(min-width:993px)_and_(max-width:1200px)]:[line-height:36px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[line-height:44px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[line-height:52px] [@media_(min-width:1501px)]:[line-height:68px] [margin-bottom:10px] [@media_(min-width:993px)_and_(max-width:1200px)]:[margin-bottom:16px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[margin-bottom:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[margin-bottom:30px] [@media_(min-width:1501px)]:[margin-bottom:50px] [@media_(max-width:992px)]:[margin-top:26px] [text-transform:uppercase]">
                  {"Empowering "}
                  <br className="![display:block] max-lg:![display:none]" />
                  {"future tech"}
                  <br className="![display:block] max-lg:![display:none]" />
                  {" leaders"}
                </h1>
                <p className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(min-width:993px)_and_(max-width:1200px)]:[font-size:26px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[font-size:36px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[font-size:34px] [@media_(min-width:1501px)]:[font-size:46px] [font-weight:bold] [line-height:24px] [@media_(min-width:993px)_and_(max-width:1200px)]:[line-height:28px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[line-height:38px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[line-height:34px] [@media_(min-width:1501px)]:[line-height:52px] [@media_(min-width:993px)_and_(max-width:1200px)]:[margin-bottom:16px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[margin-bottom:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[margin-bottom:30px] [@media_(min-width:1501px)]:[margin-bottom:50px] [text-transform:uppercase]">
                  {"bachelors of "}
                  <br className="![display:block] max-lg:![display:none]" />
                  {"technology"}
                  <br className="![display:block] max-lg:![display:none]" />
                  {" (b.tech)"}
                </p>
                <p className="[color:rgb(52,_43,_124)] ![display:block] max-lg:![display:none] [font-family:'LP27_Bebas_Neue',sans-serif] [font-size:30px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:36px] [@media_(min-width:1501px)]:[font-size:38px] [font-weight:bold] [line-height:32px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[line-height:42px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[line-height:38px] [@media_(min-width:1501px)]:[line-height:36px] [text-transform:uppercase]">
                  {"admissions "}
                  <br className="![display:block] max-lg:![display:none]" />
                  <span className="[color:rgb(237,_26,_59)] [font-size:70px] [@media_(min-width:1201px)]:[font-size:85px] [font-weight:800] [line-height:54px] [@media_(min-width:1201px)]:[line-height:64px] [margin-bottom:8px] [margin-left:0px] [margin-right:0px] [margin-top:0px] [text-transform:uppercase]">
                    {" open"}
                  </span>
                  {" "}
                  <br className="![display:block] max-lg:![display:none]" />
                  {"for 2026"}
                </p>
              </div>
            </div>
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [display:flex] [flex-wrap:wrap] [height:100%] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [@media_(min-width:993px)_and_(max-width:1200px)]:[padding-right:60px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:70px] [@media_(min-width:1367px)]:[padding-right:120px] [padding-top:0px] [position:absolute] [@media_(max-width:992px)]:[position:unset] [top:0px] ![width:100%]">
              <p className="[@media_(max-width:992px)]:[background-color:red] [@media_(max-width:992px)]:[color:rgb(255,_255,_255)] ![display:none] max-lg:![display:block] [flex-shrink:0] [@media_(max-width:992px)]:[font-family:'LP27_Bebas_Neue',sans-serif] [@media_(max-width:992px)]:[font-size:32px] [@media_(max-width:992px)]:[font-weight:bold] [margin-bottom:1rem] [margin-left:revert] [margin-right:revert] [margin-top:var(--bs-gutter-y)] [max-width:100%] [padding-left:calc(var(--bs-gutter-x)_*_0.5)] [padding-right:calc(var(--bs-gutter-x)_*_0.5)] [@media_(max-width:992px)]:[text-align:center] [@media_(max-width:992px)]:[text-transform:uppercase] [width:100%]">
                {"admissions "}
                <br className="![display:block] max-lg:![display:none]" />
                <span className="[@media_(max-width:992px)]:[color:rgb(255,_255,_255)] [@media_(max-width:992px)]:[font-size:32px]">
                  {" open"}
                </span>
                {" "}
                <br className="![display:block] max-lg:![display:none]" />
                {"for 2026"}
              </p>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-left:66.6667%] max-lg:[margin-left:revert] [margin-top:var(--bs-gutter-y)] [max-width:100%] [padding-left:calc(var(--bs-gutter-x)_*_0.5)] [padding-right:calc(var(--bs-gutter-x)_*_0.5)] [width:33.3333%] max-lg:[width:100%]" id="get-info">
                {" "}
                <div className="[min-height:500px] [&_.atlas-embed-wrap_iframe]:[border-bottom-color:currentcolor] [&_.atlas-embed-wrap_iframe]:[border-bottom-style:none] [&_.atlas-embed-wrap_iframe]:[border-left-color:currentcolor] [&_.atlas-embed-wrap_iframe]:[border-left-style:none] [&_.atlas-embed-wrap_iframe]:[border-right-color:currentcolor] [&_.atlas-embed-wrap_iframe]:[border-right-style:none] [&_.atlas-embed-wrap_iframe]:[border-top-color:currentcolor] [&_.atlas-embed-wrap_iframe]:[border-top-style:none] [&_.atlas-embed-wrap_iframe]:[display:revert] [&_.atlas-embed-wrap_iframe]:[vertical-align:revert]">
                  <CrmWidget mode="script" src="https://crm.atlasskilltech.app/widgets/6a3e7c45a1fd0680c6c1a4e0/embed.js" hostClassName="contents" scriptAttrs={{"data-atlas-width": "100%", "data-atlas-height": "650"}} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(52,_43,_124)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2]">
                  {" 4 Bachelor of Technology "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:34px] [text-transform:uppercase]">
                    {"(B.Tech) Program"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:center] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/red-square.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/red-square.webp" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/btech/assets/images/icon/shape/red-square.webp" alt="Red square decorative shape" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:1rem] ![padding-right:1rem] [width:100%]">
                <div className="[column-gap:10px] [display:grid] [grid-template-columns:repeat(4,_1fr)] [@media_(max-width:992px)]:[grid-template-columns:repeat(2,_1fr)] [grid-template-rows:repeat(1,_auto)] [@media_(max-width:992px)]:[grid-template-rows:repeat(3,_auto)] [row-gap:10px]">
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"B.Tech in CS, AI & ML"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"B.Tech in CS, AI & Robotics"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"B.Tech in CS, AI & Data Science"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"B.Tech in IT, AI & Cybersecurity"}
                    </p>
                  </div>
                  {" "}
                  {" "}
                  {" "}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="program-highlights">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(0,_169,_184)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2]">
                  {" ATLAS uGDX B.Tech Program "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:34px] [text-transform:uppercase]">
                    {"HIGHLIGHTS"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:left] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/blue-square.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/blue-square.webp" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/btech/assets/images/icon/shape/blue-square.webp" alt="Red square decorative shape" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:1rem] ![padding-right:1rem] [width:100%]">
                <p className="![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                  <strong>
                    {" ATLAS uGDX, "}
                  </strong>
                  {"the front-runner of ATLAS SkillTech University, is one of the best colleges in Mumbai for B.Tech programs in Computer Science, Artificial Intelligence, DataScience, Cybersecurity, Machine Learning, and Robotics. ATLAS stands out for its multidisciplinary, new-age approach to engineering education, with a strong focus on innovation, technology, and entrepreneurship. "}
                </p>
                <div className="[column-gap:10px] [display:grid] [grid-template-columns:repeat(4,_1fr)] [@media_(max-width:992px)]:[grid-template-columns:repeat(2,_1fr)] [grid-template-rows:repeat(2,_auto)] [@media_(max-width:992px)]:[grid-template-rows:repeat(5,_auto)] [row-gap:10px]">
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Emphasis on Applied Engineering"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"High-Tech State of the Art Campus"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Learn from Industry Experts"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Curriculum co-created with Industry"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Master a Multidisciplinary Problem-Solving Approach"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Build And Train Deep Learning AI Models"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Located in the Heart of Mumbai"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Get Career Service Support"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [grid-column-end:5] [@media_(max-width:992px)]:[grid-column-end:3] [grid-column-start:1] [grid-row-end:4] [@media_(max-width:992px)]:[grid-row-end:6] [grid-row-start:3] [@media_(max-width:992px)]:[grid-row-start:5] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Programs Integrates NEP 2020 for Discovery-Based Learning"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(237,_26,_59)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2]">
                  {" Study B.Tech in the "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:34px] [text-transform:uppercase]">
                    {"Heart of Mumbai"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:center] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/blue-square.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/blue-square.webp" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/btech/assets/images/icon/shape/blue-square.webp" alt="Red square decorative shape" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-image:url(/assets/lp/btech/assets/images/section-four/bg.webp)] [background-repeat:no-repeat] [background-size:cover] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-left:0px] max-lg:![padding-left:1rem] ![padding-right:0px] max-lg:![padding-right:1rem] ![width:100%]">
              <div className="lpm-mySwiperv2 lpm-swiper [display:block] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [list-style-image:initial] [list-style-position:initial] [list-style-type:none] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] [max-width:100%] [overflow-x:hidden] [overflow-y:hidden] ![padding-bottom:3rem] max-lg:![padding-bottom:0px] ![padding-left:3rem] max-lg:![padding-left:0px] ![padding-right:3rem] max-lg:![padding-right:0px] [padding-top:0px] [position:relative] [touch-action:pan-y] [width:100%] [z-index:1]">
                <div className="lpm-swiper-wrapper [box-sizing:content-box] [display:flex] [height:100%] [position:relative] [transform:translate3d(0px,_0px,_0px)] [transition-property:transform] [transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial)] [width:100%] [z-index:1]">
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-four/slider/1.webp" type="image/webp" />
                      {" "}
                      {" "}
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/section-four/slider/1.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-four/slider/2.webp" type="image/webp" />
                      {" "}
                      {" "}
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/section-four/slider/2.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-four/slider/3.webp" type="image/webp" />
                      {" "}
                      {" "}
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/section-four/slider/3.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-four/slider/4.webp" type="image/webp" />
                      {" "}
                      {" "}
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/section-four/slider/4.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-four/slider/5.webp" type="image/webp" />
                      {" "}
                      {" "}
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/section-four/slider/5.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-four/slider/6.webp" type="image/webp" />
                      {" "}
                      {" "}
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/section-four/slider/6.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                </div>
                <div className="lpm-swiper-button-next [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:auto] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:var(--swiper-navigation-sides-offset,10px)] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/icon/swiper-right.svg" alt="" />
                </div>
                <div className="lpm-swiper-button-prev [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:var(--swiper-navigation-sides-offset,10px)] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:auto] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/icon/swiper-left.svg" alt="" />
                </div>
                <div className="lpm-swiper-pagination [bottom:var(--swiper-pagination-bottom,8px)] [left:0px] [position:absolute] [text-align:center] [top:var(--swiper-pagination-top,auto)] [transform:translate3d(0px,_0px,_0px)] [transition-delay:0s] [transition-duration:0.3s] [transition-property:opacity] [transition-timing-function:ease] [width:100%] [z-index:10]" data-lp-bullet="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(255,_255,_255)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] [border-bottom-color:rgb(0,_0,_0)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" data-lp-bullet-active="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(237,_26,_59)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] ![border-bottom-color:rgb(237,_26,_59)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] ![border-left-color:rgb(237,_26,_59)] [border-left-width:1px] ![border-right-color:rgb(237,_26,_59)] [border-right-width:1px] ![border-top-color:rgb(237,_26,_59)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] [box-shadow:rgb(68,_78,_155)_3px_3px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" />
              </div>
            </div>
          </div>
        </section>
        <section id="career-pathways">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(33,_103,_139)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2]">
                  {" Career "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:34px] [text-transform:uppercase]">
                    {"Pathways"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:left] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/red-square.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/red-square.webp" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/btech/assets/images/icon/shape/red-square.webp" alt="Red square decorative shape" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:3rem] max-lg:![padding-left:1.5rem] ![padding-right:3rem] max-lg:![padding-right:1.5rem] [width:100%]">
                <ul className="[column-count:2] [@media_(max-width:992px)]:[column-count:1] [column-gap:80px] [list-style-image:url(/assets/lp/btech/assets/images/icon/red-list-arrow.svg)] [list-style-position:revert] [list-style-type:revert] [row-gap:80px]">
                  <li>
                    <h2 className="[color:var(--bs-heading-color)] [font-size:26px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600] [line-height:1.2]">
                      {"Data Analyst"}
                    </h2>
                    <p className="[@media_(max-width:992px)]:[font-size:14px] [margin-bottom:14px] [@media_(max-width:992px)]:[margin-bottom:5px]">
                      {"As a data analyst, you will collect, organize and interpret complex data to identify trends and insights."}
                    </p>
                  </li>
                  <li>
                    <h2 className="[color:var(--bs-heading-color)] [font-size:26px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600] [line-height:1.2]">
                      {"Research Scientist"}
                    </h2>
                    <p className="[@media_(max-width:992px)]:[font-size:14px] [margin-bottom:14px] [@media_(max-width:992px)]:[margin-bottom:5px]">
                      {"Research Scientists conduct research and experiments to expand our understanding of the natural world and develop new technologies and processes."}
                    </p>
                  </li>
                  <li>
                    <h2 className="[color:var(--bs-heading-color)] [font-size:26px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600] [line-height:1.2]">
                      {"Machine Learning Engineer"}
                    </h2>
                    <p className="[@media_(max-width:992px)]:[font-size:14px] [margin-bottom:14px] [@media_(max-width:992px)]:[margin-bottom:5px]">
                      {"ML Engineers develop and deploy machine learning systems that can learn from data and improve over time, enabling businesses to automate tasks and gain insights."}
                    </p>
                  </li>
                  <li>
                    <h2 className="[color:var(--bs-heading-color)] [font-size:26px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600] [line-height:1.2]">
                      {"Artificial Intelligence Scientist"}
                    </h2>
                    <p className="[@media_(max-width:992px)]:[font-size:14px] [margin-bottom:14px] [@media_(max-width:992px)]:[margin-bottom:5px]">
                      {"AI Scientists develop algorithms and systems that enable machines to learn from data, interact with humans, and make intelligent decisions."}
                    </p>
                  </li>
                  <li>
                    <h2 className="[color:var(--bs-heading-color)] [font-size:26px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600] [line-height:1.2]">
                      {"Robotics Engineer"}
                    </h2>
                    <p className="[@media_(max-width:992px)]:[font-size:14px] [margin-bottom:14px] [@media_(max-width:992px)]:[margin-bottom:5px]">
                      {"Robotics Engineers design, build, and program robots and robotic systems that can perform tasks that are too dangerous, difficult, or repetitive for humans to do."}
                    </p>
                  </li>
                  <li>
                    <h2 className="[color:var(--bs-heading-color)] [font-size:26px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600] [line-height:1.2]">
                      {"Business Intelligence Researcher"}
                    </h2>
                    <p className="[@media_(max-width:992px)]:[font-size:14px] [margin-bottom:14px] [@media_(max-width:992px)]:[margin-bottom:5px]">
                      {"Business Intelligence Researchers use data analytics tools to analyze and visualize data in order to help businesses make informed decisions."}
                    </p>
                  </li>
                  <li>
                    <h2 className="[color:var(--bs-heading-color)] [font-size:26px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600] [line-height:1.2]">
                      {"Data Scientist"}
                    </h2>
                    <p className="[@media_(max-width:992px)]:[font-size:14px] [margin-bottom:14px] [@media_(max-width:992px)]:[margin-bottom:5px]">
                      {"As a data scientist, you will design and implement advanced analytical models and help drive data-driven decision-making."}
                    </p>
                  </li>
                  <li>
                    <h2 className="[color:var(--bs-heading-color)] [font-size:26px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600] [line-height:1.2]">
                      {"Security Architect"}
                    </h2>
                    <p className="[@media_(max-width:992px)]:[font-size:14px] [margin-bottom:14px] [@media_(max-width:992px)]:[margin-bottom:5px]">
                      {"Design and build secure IT infrastructure, including network and cloud security systems, from the ground up"}
                    </p>
                  </li>
                  <li>
                    <h2 className="[color:var(--bs-heading-color)] [font-size:26px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600] [line-height:1.2]">
                      {"AI Threat Analyst"}
                    </h2>
                    <p className="[@media_(max-width:992px)]:[font-size:14px] [margin-bottom:14px] [@media_(max-width:992px)]:[margin-bottom:5px]">
                      {"Cybersecurity Analyst: Monitor systems for security breaches, investigate cyberattacks, and implement measures to protect networks and data"}
                    </p>
                  </li>
                  <li>
                    <h2 className="[color:var(--bs-heading-color)] [font-size:26px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600] [line-height:1.2]">
                      {"Digital Forensics Expert"}
                    </h2>
                    <p className="[@media_(max-width:992px)]:[font-size:14px] [margin-bottom:14px] [@media_(max-width:992px)]:[margin-bottom:5px]">
                      {"Investigate cybercrimes by collecting and analyzing digital evidence to determine the cause of a security breach."}
                    </p>
                  </li>
                  <li>
                    <h2 className="[color:var(--bs-heading-color)] [font-size:26px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600] [line-height:1.2]">
                      {"Ethical Hacker"}
                    </h2>
                    <p className="[@media_(max-width:992px)]:[font-size:14px] [margin-bottom:14px] [@media_(max-width:992px)]:[margin-bottom:5px]">
                      {"Simulate cyberattacks on a company's systems to find vulnerabilities before malicious actors can exploit them."}
                    </p>
                  </li>
                  <li>
                    <h2 className="[color:var(--bs-heading-color)] [font-size:26px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600] [line-height:1.2]">
                      {"Automation Engineer"}
                    </h2>
                    <p className="[@media_(max-width:992px)]:[font-size:14px] [margin-bottom:14px] [@media_(max-width:992px)]:[margin-bottom:5px]">
                      {"Automation Engineers design and develop automated systems that can perform tasks in various industries, from manufacturing to transportation to healthcare."}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="why-atlas-ugd">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(0,_178,_186)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2]">
                  {" Why ATLAS "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:34px] [text-transform:unset]">
                    {"uGDX"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:right] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/blue-squarev3.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/blue-squarev3.webp" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/blue-squarev3.webp" alt="Red square decorative shape" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-image:url(/assets/lp/btech/assets/images/icon/strip1.svg)] [background-position-x:0px] [background-position-y:75%] [@media_(max-width:992px)]:[background-position-y:70%] [background-repeat:no-repeat] [background-size:contain] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:1rem] ![padding-right:1rem] [width:100%]">
                <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [display:flex] [flex-wrap:wrap] ![margin-bottom:1.5rem] ![margin-left:0px] ![margin-right:0px] [margin-top:calc(-1_*_var(--bs-gutter-y))] ![width:100%]">
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:1] max-lg:![order:2] ![padding-left:0px] ![padding-right:0.5rem] max-lg:![padding-right:0px] [width:50%] max-lg:[width:100%]">
                    <div className="[align-items:center] [background-color:rgb(237,_26,_59)] [color:rgb(255,_255,_255)] [display:flex] ![height:100%] [padding-bottom:20px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:20px] [@media_(max-width:992px)]:[padding-top:10px]">
                      <div>
                        <h3 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:30px] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                          {"STATE-OF-THE-ART COMPUTER LABS "}
                        </h3>
                        <p className="[font-size:20px] [@media_(max-width:992px)]:[font-size:16px] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                          {"At Mumbai’s first urban campus, you get access to advanced tech and tools so you can translate your vision into intelligent frameworks."}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-left:0.5rem] max-lg:![padding-left:0px] ![padding-right:0px] [width:50%] max-lg:[width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-one/1.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-one/1.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/section-six/row-one/1.webp" alt="STATE-OF-THE-ART COMPUTER LABS" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                </div>
                <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [display:flex] [flex-wrap:wrap] ![margin-bottom:1.5rem] ![margin-left:0px] ![margin-right:0px] [margin-top:calc(-1_*_var(--bs-gutter-y))] ![width:100%]">
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0px] ![padding-right:0.5rem] max-lg:![padding-right:0px] [width:33.3333%] max-lg:[width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-one/2.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-one/2.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] max-lg:![margin-bottom:0px] ![width:100%]" src="/assets/lp/btech/assets/images/section-six/row-one/2.webp" alt="STATE-OF-THE-ART COMPUTER LABS" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                    <div className="[align-items:center] [background-color:rgb(237,_26,_59)] [color:rgb(255,_255,_255)] [display:flex] [height:400px] [@media_(max-width:992px)]:[height:unset] ![margin-bottom:0px] max-lg:![margin-bottom:1.5rem] [padding-bottom:20px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:20px] [@media_(max-width:992px)]:[padding-top:10px]">
                      <div>
                        <h3 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:30px] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                          {"UNRIVALLED STUDENT LIFE "}
                        </h3>
                        <p className="[font-size:20px] [@media_(max-width:992px)]:[font-size:16px] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                          {"Team up with a community of young leaders to participate in student-run councils, clubs, festivals, inter and intra collegiate activities."}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0.5rem] max-lg:![padding-left:0px] ![padding-right:0px] [width:66.6667%] max-lg:[width:100%]">
                    <div className="[align-items:center] [background-color:rgb(237,_26,_59)] [color:rgb(255,_255,_255)] [display:flex] ![margin-bottom:1.5rem] max-lg:![margin-bottom:0px] [padding-bottom:20px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:20px] [@media_(max-width:992px)]:[padding-top:10px]">
                      <div>
                        <h3 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:30px] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                          {"EXCLUSIVE MASTERCLASSES "}
                        </h3>
                        <p className="[font-size:20px] [@media_(max-width:992px)]:[font-size:16px] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                          {"We collaborate closely with distinct technologists, leaders, and CXOs to create enviable learning opportunities which inspire industry-relevant innovation and impact."}
                        </p>
                      </div>
                    </div>
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-one/3.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-one/3.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/section-six/row-one/3.webp" alt="STATE-OF-THE-ART COMPUTER LABS" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                </div>
                <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [display:flex] [flex-wrap:wrap] ![margin-bottom:1.5rem] ![margin-left:0px] ![margin-right:0px] [margin-top:calc(-1_*_var(--bs-gutter-y))] ![width:100%]">
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] ![margin-bottom:0px] max-lg:![margin-bottom:1.5rem] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0px] ![padding-right:0.5rem] max-lg:![padding-right:0px] [width:50%] max-lg:[width:100%]">
                    <div className="[align-items:center] [background-color:rgb(237,_26,_59)] [color:rgb(255,_255,_255)] [display:flex] [height:400px] [@media_(max-width:992px)]:[height:unset] [padding-bottom:20px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:20px] [@media_(max-width:992px)]:[padding-top:10px]">
                      <div>
                        <h3 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:30px] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                          {"Full Placement Support "}
                        </h3>
                        <p className="[font-size:20px] [@media_(max-width:992px)]:[font-size:16px] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                          {"With full placement support, you'll have access to a team of experts who will guide you through the job search process and help you secure your dream job."}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0.5rem] max-lg:![padding-left:0px] ![padding-right:0px] [width:50%] max-lg:[width:100%]">
                    <div className="[align-items:center] [background-color:rgb(237,_26,_59)] [color:rgb(255,_255,_255)] [display:flex] [height:400px] [@media_(max-width:992px)]:[height:unset] [padding-bottom:20px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:20px] [@media_(max-width:992px)]:[padding-top:10px]">
                      <div>
                        <h3 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:30px] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                          {"Work On Live Internships & Projects "}
                        </h3>
                        <p className="[font-size:20px] [@media_(max-width:992px)]:[font-size:16px] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                          {"Experience the real-world application of your skills and knowledge by working on live projects and internships. Don't miss this opportunity to gain valuable experience and build your professional network."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [display:flex] [flex-wrap:wrap] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] ![width:100%]">
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-left:25%] max-lg:[margin-left:revert] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-left:0.5rem] max-lg:![padding-left:0px] ![padding-right:0px] [width:50%] max-lg:[width:100%]">
                    <div className="[align-items:center] [background-color:rgb(237,_26,_59)] [color:rgb(255,_255,_255)] [display:flex] [height:400px] [@media_(max-width:992px)]:[height:unset] [padding-bottom:20px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:20px] [@media_(max-width:992px)]:[padding-top:10px]">
                      <div>
                        <h3 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:30px] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                          {"Multidisciplinary Curriculum"}
                        </h3>
                        <p className="[font-size:20px] [@media_(max-width:992px)]:[font-size:16px] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                          {"Customize your learning across fields to gain cross-functional expertise and prepare for a connected future."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lpm-mySwiperv3 lpm-swiper [display:block] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [list-style-image:initial] [list-style-position:initial] [list-style-type:none] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] [max-width:100%] [overflow-x:hidden] [overflow-y:hidden] ![padding-bottom:3rem] ![padding-left:3rem] max-lg:![padding-left:1rem] ![padding-right:3rem] max-lg:![padding-right:1rem] [padding-top:0px] [position:relative] [touch-action:pan-y] [width:100%] [z-index:1]">
                <div className="lpm-swiper-wrapper [box-sizing:content-box] [display:flex] [height:100%] [position:relative] [transform:translate3d(0px,_0px,_0px)] [transition-property:transform] [transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial)] [width:100%] [z-index:1]">
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-two/1.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-two/1.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-six/row-two/1.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                    <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"LEARN BEYOND B.Tech"}
                    </h3>
                    <p className="![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"Explore diverse electives in design, entrepreneurship, psychology, fintech, arts, and systems thinking at ATLAS SkillTech University to build future-ready problem-solving skills."}
                    </p>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-two/2.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-two/2.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-six/row-two/2.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                    <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"LEARN BEYOND THE CLASSROOM"}
                    </h3>
                    <p className="![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"Work on real-life projects with Tech Houses and Corporates through Observerships, Apprenticeships, Internships, and Capstone Projects."}
                    </p>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-two/3.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-two/3.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-six/row-two/3.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                    <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"LEARN FROM THE BEST"}
                    </h3>
                    <p className="![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"Industry practitioners bring real-life experiences to the classrooms so you’re both academically and professionally ready"}
                    </p>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-two/4.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-six/row-two/4.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-six/row-two/4.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                    <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"LEARN AS A GLOBAL CITIZEN"}
                    </h3>
                    <p className="![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"Through our collaborations with top-ranked international universities, experience Global Immersion Initiatives, Summer Schools and Study-Abroad Programs."}
                    </p>
                  </div>
                </div>
                <div className="lpm-swiper-button-next [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:auto] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:var(--swiper-navigation-sides-offset,10px)] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/icon/swiper-right.svg" alt="" />
                </div>
                <div className="lpm-swiper-button-prev [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:var(--swiper-navigation-sides-offset,10px)] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:auto] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/icon/swiper-left.svg" alt="" />
                </div>
                <div className="lpm-swiper-pagination [bottom:var(--swiper-pagination-bottom,8px)] [left:0px] [position:absolute] [text-align:center] [top:var(--swiper-pagination-top,auto)] [transform:translate3d(0px,_0px,_0px)] [transition-delay:0s] [transition-duration:0.3s] [transition-property:opacity] [transition-timing-function:ease] [width:100%] [z-index:10]" data-lp-bullet="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(255,_255,_255)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] [border-bottom-color:rgb(0,_0,_0)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" data-lp-bullet-active="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(237,_26,_59)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] ![border-bottom-color:rgb(237,_26,_59)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] ![border-left-color:rgb(237,_26,_59)] [border-left-width:1px] ![border-right-color:rgb(237,_26,_59)] [border-right-width:1px] ![border-top-color:rgb(237,_26,_59)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] [box-shadow:rgb(68,_78,_155)_3px_3px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(52,_43,_124)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2]">
                  {" ATLAS Student Get Stellar "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:34px] [text-transform:uppercase]">
                    {"Placement & Internships"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:left] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/red-square.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/red-square.webp" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/btech/assets/images/icon/shape/red-square.webp" alt="Red square decorative shape" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <p className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                  {"Our graduates are securing placements at top-tier organizations and earning admissions to prestigious international universities, setting the stage for bright, impactful futures."}
                </p>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![width:100%]">
              <div className="lpm-mySwiperv3 lpm-swiper [display:block] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [list-style-image:initial] [list-style-position:initial] [list-style-type:none] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] [max-width:100%] [overflow-x:hidden] [overflow-y:hidden] ![padding-bottom:3rem] ![padding-left:3rem] max-lg:![padding-left:1rem] ![padding-right:3rem] max-lg:![padding-right:1rem] [padding-top:0px] [position:relative] [touch-action:pan-y] [width:100%] [z-index:1]">
                <div className="lpm-swiper-wrapper [box-sizing:content-box] [display:flex] [height:100%] [position:relative] [transform:translate3d(0px,_0px,_0px)] [transition-property:transform] [transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial)] [width:100%] [z-index:1]">
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/1.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/1.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-seven/1.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/2.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/2.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-seven/2.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/3.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/3.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-seven/3.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/4.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/4.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-seven/4.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/5.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/5.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-seven/5.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/6.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/6.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-seven/6.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/7.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/7.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-seven/7.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/8.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/8.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-seven/8.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/9.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/btech/assets/images/section-seven/9.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/btech/assets/images/section-seven/9.webp" alt="remote control car btech student" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                </div>
                <div className="lpm-swiper-button-next [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:auto] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:var(--swiper-navigation-sides-offset,10px)] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/icon/swiper-right.svg" alt="" />
                </div>
                <div className="lpm-swiper-button-prev [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:var(--swiper-navigation-sides-offset,10px)] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:auto] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/icon/swiper-left.svg" alt="" />
                </div>
                <div className="lpm-swiper-pagination [bottom:var(--swiper-pagination-bottom,8px)] [left:0px] [position:absolute] [text-align:center] [top:var(--swiper-pagination-top,auto)] [transform:translate3d(0px,_0px,_0px)] [transition-delay:0s] [transition-duration:0.3s] [transition-property:opacity] [transition-timing-function:ease] [width:100%] [z-index:10]" data-lp-bullet="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(255,_255,_255)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] [border-bottom-color:rgb(0,_0,_0)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" data-lp-bullet-active="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(237,_26,_59)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] ![border-bottom-color:rgb(237,_26,_59)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] ![border-left-color:rgb(237,_26,_59)] [border-left-width:1px] ![border-right-color:rgb(237,_26,_59)] [border-right-width:1px] ![border-top-color:rgb(237,_26,_59)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] [box-shadow:rgb(68,_78,_155)_3px_3px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" />
              </div>
            </div>
          </div>
        </section>
        <section id="about-atlas-ugd">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(0,_169,_184)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2]">
                  {" ATLAS uGDX Home Of Technologists And "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:34px] [text-transform:uppercase]">
                    {" LEADERS"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:center] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/red-square.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/red-square.webp" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/btech/assets/images/icon/shape/red-square.webp" alt="Red square decorative shape" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-image:url(/assets/lp/btech/assets/images/icon/strip2.svg)] [background-position-x:0px] [background-position-y:75%] [@media_(max-width:992px)]:[background-position-y:95%] [background-repeat:no-repeat] [background-size:contain] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:1rem] ![padding-right:1rem] [width:100%]">
                <p className="![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                  <strong>
                    {" Ranked among India’s Most Admired Universities, "}
                  </strong>
                  {"ATLAS SkillTech University Mumbai is shaping future-ready engineers through its cutting-edge B.Tech programs. With a strong focus on innovation, industry integration, and global exposure, ATLAS empowers students to lead in a tech-driven world. "}
                </p>
                <p className="![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                  {" At the "}
                  <strong>
                    {"ATLAS uGDX School of Technology,"}
                  </strong>
                  {" students can pursue a range of B.Tech programs designed to develop 21st-century skills through hands-on learning and interdisciplinary education: "}
                </p>
                <div className="[column-gap:10px] [display:grid] [grid-template-columns:repeat(4,_1fr)] [@media_(max-width:992px)]:[grid-template-columns:repeat(2,_1fr)] [grid-template-rows:repeat(1,_auto)] [@media_(max-width:992px)]:[grid-template-rows:repeat(3,_auto)] [row-gap:10px]">
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"B.Tech in CS, AI & Machine Learning"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"B.Tech in CS, AI & Robotics"}
                    </p>
                  </div>
                  {" "}
                  {" "}
                  {" "}
                  {" "}
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"B.Tech in IT, AI & Cybersecurity"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Space_Grotesk',sans-serif] [font-size:24px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"B.Tech in CS, AI & Data Science"}
                    </p>
                  </div>
                </div>
                <p className="![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![margin-top:0.5rem]">
                  {" Recognised among the best colleges in Mumbai for B.Tech, ATLAS graduates go on to lead at top companies and universities across the globe. As one of the top B.Tech colleges in Mumbai, our comprehensive B.Tech programs position our students to make a significant global impact in the VUCA world we live in. "}
                </p>
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/section-eight/1.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/section-eight/1.webp" type="image/jpeg" />
                  {" "}
                  {" "}
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/btech/assets/images/section-eight/1.webp" alt="Red square decorative shape" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
          </div>
        </section>
      </main>
      {" "}
      {" "}
      <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [background-color:rgb(237,_26,_59)] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:white] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:none] [font-feature-settings:revert] [font-size:18px] [@media_(max-width:992px)]:[font-size:16px] [font-variation-settings:revert] [font-weight:revert] [letter-spacing:revert] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:8px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:18px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:18px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:8px] [position:fixed] [right:-48px] [@media_(max-width:992px)]:[right:-42px] [top:50%] [transform:rotate(-90deg)] [transition-delay:0s] [transition-duration:0.3s] [transition-property:opacity] [transition-timing-function:ease] [z-index:1000]" id="goTopBtn">
        {"Apply Now"}
      </button>
      <footer>
        <div className="[--bs-bg-opacity:1] [--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![background-color:rgba(var(--bs-black-rgb),_var(--bs-bg-opacity))] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [--bs-text-opacity:1] ![align-items:flex-start] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
            <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:1] max-lg:![order:2] ![padding-bottom:0px] ![padding-left:0.5rem] max-lg:![padding-left:0px] ![padding-right:0.5rem] max-lg:![padding-right:0px] ![padding-top:0px] [width:33.3333%] max-lg:[width:100%]">
              <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:600] [line-height:1.2] [margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-transform:uppercase]">
                {"Eligibility Criteria"}
              </h3>
              <p className="[margin-bottom:1rem] [margin-left:revert] [margin-right:revert]">
                {"Class 12 with a major in Physics, Mathematics and Chemistry/Electronics/Computers etc with a score of at least 50% or equivalent (CBSE, ISC, State Boards, IBDP, IGCSE, A-levels, etc.)"}
              </p>
              <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:600] [line-height:1.2] [margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-transform:uppercase]">
                {" TALK TO US"}
              </h3>
              <p className="[margin-bottom:1rem] [margin-left:revert] [margin-right:revert]">
                <a className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] ![text-decoration-color:initial] ![text-decoration-line:none] ![text-decoration-style:initial] ![text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="https://maps.app.goo.gl/28ZpnPsYLuWCDZWj9" target="_blank">
                  {"ATLAS SKILLTECH UNIVERSITY Tower 1 - Equinox Business Park, Off Bandra-Kurla Complex (BKC), LBS Marg, Kurla West, Mumbai – 400 070."}
                </a>
              </p>
              <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:600] [line-height:1.2] [margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-transform:uppercase]">
                {" Contact Us"}
              </h3>
              <p className="![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                <a className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] ![text-decoration-color:initial] ![text-decoration-line:none] ![text-decoration-style:initial] ![text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="tel:+918976870842" target="_blank">
                  {" +91 8976870842"}
                </a>
              </p>
              <p className="![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                <a className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] ![text-decoration-color:initial] ![text-decoration-line:none] ![text-decoration-style:initial] ![text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="mailto:btech@atlasuniversity.edu.in" target="_blank">
                  <span>
                    {"btech@atlasuniversity.edu.in"}
                  </span>
                </a>
              </p>
            </div>
            <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-left:33.3333%] max-lg:[margin-left:revert] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-bottom:0px] ![padding-left:0.5rem] max-lg:![padding-left:0px] ![padding-right:0.5rem] max-lg:![padding-right:0px] ![padding-top:0px] [width:33.3333%] max-lg:[width:100%]">
              <div className="npf_wgts" data-height="500px" data-w="902c7c394b67403aedf3a592cfc3e820" />
            </div>
          </div>
        </div>
        <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(237,_26,_59)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [--bs-text-opacity:1] ![align-items:flex-start] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:0.5rem] ![padding-left:0.5rem] ![padding-right:0.5rem] ![padding-top:0.5rem] ![width:100%]">
            <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
              <p className="![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                {"©2025. "}
                <a className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] ![text-decoration-color:initial] ![text-decoration-line:none] ![text-decoration-style:initial] ![text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="">
                  {"ATLAS SkillTech University"}
                </a>
                {", All Rights Reserved."}
              </p>
            </div>
          </div>
        </div>
      </footer>
      {" "}
      {" "}
      {" "}
      {" "}
      {" "}
      <LpBehaviors kind="php-btech" />
    </div>
  );
}
