/* eslint-disable @next/next/no-img-element */
/*
 * https://atlasuniversity.edu.in/lp/isme-ug/
 * GENERATED from the production page by scratchpad/np/work/lp (compile.js -> gen.py -> emit.py):
 * every element carries the reference cascade resolved per breakpoint as Tailwind arbitrary
 * properties. `lpm-*` classes are inert markers for :hover-of-ancestor variants and behaviours;
 * `lps-*` are runtime state markers toggled by the page behaviours.
 * The lower form is a live NoPaperForms widget (`.npf_wgts`), the hero form the ATLAS CRM script embed. The accordion's initially-open item carries `lps-acc` (compiled from the reference's `.active.blue-text-bg`).
 * Images the reference references that production serves as soft-404s (absent from lp.zip too) are omitted (a <picture> falls back to its first live <source>): isme-ug/assets/images/section-seven/slider/1.jpg, isme-ug/assets/images/section-seven/slider/2.jpg, isme-ug/assets/images/section-seven/slider/3.jpg, isme-ug/assets/images/section-seven/slider/4.jpg, isme-ug/assets/images/section-seven/slider/5.jpg, isme-ug/assets/images/section-seven/slider/6.jpg
 */
import CrmWidget from '@/components/ui/CrmWidget';
import LpBehaviors from '../runtime/LpBehaviors';

export default function IsmeUg() {
  return (
    <div data-lp="isme-ug" className="[--bs-black:#000] [--bs-black-rgb:0,_0,_0] [--bs-blue:#0d6efd] [--bs-body-bg:#fff] [--bs-body-bg-rgb:255,_255,_255] [--bs-body-color:#212529] [--bs-body-color-rgb:33,_37,_41] [--bs-body-font-family:var(--bs-font-sans-serif)] [--bs-body-font-size:1rem] [--bs-body-font-weight:400] [--bs-body-line-height:1.5] [--bs-border-color:#dee2e6] [--bs-border-color-translucent:rgba(0,_0,_0,_0.175)] [--bs-border-radius:0.375rem] [--bs-border-radius-2xl:var(--bs-border-radius-xxl)] [--bs-border-radius-lg:0.5rem] [--bs-border-radius-pill:50rem] [--bs-border-radius-sm:0.25rem] [--bs-border-radius-xl:1rem] [--bs-border-radius-xxl:2rem] [--bs-border-style:solid] [--bs-border-width:1px] [--bs-box-shadow:0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] [--bs-box-shadow-inset:inset_0_1px_2px_rgba(0,_0,_0,_0.075)] [--bs-box-shadow-lg:0_1rem_3rem_rgba(0,_0,_0,_0.175)] [--bs-box-shadow-sm:0_0.125rem_0.25rem_rgba(0,_0,_0,_0.075)] [--bs-breakpoint-lg:992px] [--bs-breakpoint-md:768px] [--bs-breakpoint-sm:576px] [--bs-breakpoint-xl:1200px] [--bs-breakpoint-xs:0] [--bs-breakpoint-xxl:1400px] [--bs-carousel-caption-color:#fff] [--bs-carousel-indicator-active-bg:#fff] [--bs-code-color:#d63384] [--bs-cyan:#0dcaf0] [--bs-danger:#dc3545] [--bs-danger-bg-subtle:#f8d7da] [--bs-danger-border-subtle:#f1aeb5] [--bs-danger-rgb:220,_53,_69] [--bs-danger-text-emphasis:#58151c] [--bs-dark:#212529] [--bs-dark-bg-subtle:#ced4da] [--bs-dark-border-subtle:#adb5bd] [--bs-dark-rgb:33,_37,_41] [--bs-dark-text-emphasis:#495057] [--bs-emphasis-color:#000] [--bs-emphasis-color-rgb:0,_0,_0] [--bs-focus-ring-color:rgba(13,_110,_253,_0.25)] [--bs-focus-ring-opacity:0.25] [--bs-focus-ring-width:0.25rem] [--bs-font-monospace:SFMono-Regular,_Menlo,_Monaco,_Consolas,_'Liberation_Mono',_'Courier_New',_monospace] [--bs-font-sans-serif:system-ui,_-apple-system,_'Segoe_UI',_Roboto,_'Helvetica_Neue',_'Noto_Sans',_'Liberation_Sans',_Arial,_sans-serif,_'Apple_Color_Emoji',_'Segoe_UI_Emoji',_'Segoe_UI_Symbol',_'Noto_Color_Emoji'] [--bs-form-invalid-border-color:#dc3545] [--bs-form-invalid-color:#dc3545] [--bs-form-valid-border-color:#198754] [--bs-form-valid-color:#198754] [--bs-gradient:linear-gradient(_180deg,_rgba(255,_255,_255,_0.15),_rgba(255,_255,_255,_0)_)] [--bs-gray:#6c757d] [--bs-gray-100:#f8f9fa] [--bs-gray-200:#e9ecef] [--bs-gray-300:#dee2e6] [--bs-gray-400:#ced4da] [--bs-gray-500:#adb5bd] [--bs-gray-600:#6c757d] [--bs-gray-700:#495057] [--bs-gray-800:#343a40] [--bs-gray-900:#212529] [--bs-gray-dark:#343a40] [--bs-green:#198754] [--bs-heading-color:inherit] [--bs-highlight-bg:#fff3cd] [--bs-highlight-color:#212529] [--bs-indigo:#6610f2] [--bs-info:#0dcaf0] [--bs-info-bg-subtle:#cff4fc] [--bs-info-border-subtle:#9eeaf9] [--bs-info-rgb:13,_202,_240] [--bs-info-text-emphasis:#055160] [--bs-light:#f8f9fa] [--bs-light-bg-subtle:#fcfcfd] [--bs-light-border-subtle:#e9ecef] [--bs-light-rgb:248,_249,_250] [--bs-light-text-emphasis:#495057] [--bs-link-color:#0d6efd] [--bs-link-color-rgb:13,_110,_253] [--bs-link-decoration:underline] [--bs-link-hover-color:#0a58ca] [--bs-link-hover-color-rgb:10,_88,_202] [--bs-orange:#fd7e14] [--bs-pink:#d63384] [--bs-primary:#0d6efd] [--bs-primary-bg-subtle:#cfe2ff] [--bs-primary-border-subtle:#9ec5fe] [--bs-primary-rgb:13,_110,_253] [--bs-primary-text-emphasis:#052c65] [--bs-purple:#6f42c1] [--bs-red:#dc3545] [--bs-secondary:#6c757d] [--bs-secondary-bg:#e9ecef] [--bs-secondary-bg-rgb:233,_236,_239] [--bs-secondary-bg-subtle:#e2e3e5] [--bs-secondary-border-subtle:#c4c8cb] [--bs-secondary-color:rgba(33,_37,_41,_0.75)] [--bs-secondary-color-rgb:33,_37,_41] [--bs-secondary-rgb:108,_117,_125] [--bs-secondary-text-emphasis:#2b2f32] [--bs-success:#198754] [--bs-success-bg-subtle:#d1e7dd] [--bs-success-border-subtle:#a3cfbb] [--bs-success-rgb:25,_135,_84] [--bs-success-text-emphasis:#0a3622] [--bs-teal:#20c997] [--bs-tertiary-bg:#f8f9fa] [--bs-tertiary-bg-rgb:248,_249,_250] [--bs-tertiary-color:rgba(33,_37,_41,_0.5)] [--bs-tertiary-color-rgb:33,_37,_41] [--bs-warning:#ffc107] [--bs-warning-bg-subtle:#fff3cd] [--bs-warning-border-subtle:#ffe69c] [--bs-warning-rgb:255,_193,_7] [--bs-warning-text-emphasis:#664d03] [--bs-white:#fff] [--bs-white-rgb:255,_255,_255] [--bs-yellow:#ffc107] [--swiper-navigation-size:70px] [@media_(max-width:992px)]:[--swiper-navigation-size:40px] [--swiper-theme-color:#007aff] [-webkit-font-smoothing:auto] [-webkit-tap-highlight-color:transparent] [background-color:var(--bs-body-bg)] [color:var(--bs-body-color)] [font-family:'LP27_Poppins',sans-serif] [font-size:var(--bs-body-font-size)] [font-weight:var(--bs-body-font-weight)] [line-height:var(--bs-body-line-height)] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:56px] [@media_(min-width:993px)_and_(max-width:1200px)]:[padding-top:64px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-top:68px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-top:64px] [@media_(min-width:1501px)]:[padding-top:86px] [text-align:var(--bs-body-text-align)] [text-size-adjust:100%]">
      {" "}
      {" "}
      {" "}
      {" "}
      {" "}
      <header className="[--bs-bg-opacity:1] ![align-items:center] ![background-color:rgba(var(--bs-light-rgb),_var(--bs-bg-opacity))] [box-shadow:rgba(0,_0,_0,_0.19)_1px_0px_4px_0px] ![display:flex] [height:56px] [@media_(min-width:993px)_and_(max-width:1200px)]:[height:64px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[height:68px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[height:64px] [@media_(min-width:1501px)]:[height:86px] ![justify-content:space-between] [left:0px] ![padding-bottom:1rem] max-lg:![padding-bottom:0.25rem] ![padding-left:1rem] max-lg:![padding-left:0.25rem] ![padding-right:1rem] max-lg:![padding-right:0.25rem] ![padding-top:1rem] max-lg:![padding-top:0.25rem] [position:fixed] [top:0px] [width:100%] [z-index:2]">
        <div>
          <img className="[display:revert] [width:200px] [@media_(max-width:992px)]:[width:170px] [@media_(min-width:1501px)]:[width:242px]" src="/assets/lp/isme-ug/assets/images/icon/logo.svg" alt="isme ug landing Pagesss Logo" />
        </div>
        <nav className="[@media_(max-width:992px)]:[background-color:rgb(255,_255,_255)] [@media_(max-width:992px)]:[height:35%] [@media_(max-width:992px)]:[left:-100%] [@media_(max-width:992px)]:[position:fixed] [@media_(max-width:992px)]:[top:70px] [@media_(max-width:992px)]:[transition-delay:0s] [@media_(max-width:992px)]:[transition-duration:0.3s] [@media_(max-width:992px)]:[transition-property:left] [@media_(max-width:992px)]:[transition-timing-function:ease-in-out] [&.lps-nav]:[left:revert] [@media_(max-width:992px)]:[&.lps-nav]:[left:0%]" data-lpt="nav">
          <ul className="[align-items:center] [@media_(max-width:992px)]:[box-shadow:rgba(0,_0,_0,_0.19)_1px_0px_4px_0px] [display:flex] [@media_(max-width:992px)]:[flex-direction:column] [@media_(max-width:992px)]:[height:100%] [@media_(max-width:992px)]:[justify-content:space-evenly] [@media_(max-width:992px)]:[padding-left:12px] [@media_(max-width:992px)]:[padding-right:12px]">
            <li className="![border-bottom-color:currentcolor] ![border-bottom-style:none] ![border-bottom-width:0px] ![border-image-outset:initial] ![border-image-repeat:initial] ![border-image-slice:initial] ![border-image-source:initial] ![border-image-width:initial] ![border-left-color:currentcolor] ![border-left-style:none] ![border-left-width:0px] ![border-right-color:currentcolor] ![border-right-style:none] ![border-right-width:0px] ![border-top-color:currentcolor] ![border-top-style:none] ![border-top-width:0px] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#about">
                {"About "}
              </a>
            </li>
            <li className="[@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-left-color:rgb(52,_43,_124)] [@media_(max-width:992px)]:[border-left-color:currentcolor] [@media_(max-width:992px)]:[border-left-style:none] [border-left-width:3px] [@media_(max-width:992px)]:[border-left-width:medium] [@media_(max-width:992px)]:[border-right-color:currentcolor] [@media_(max-width:992px)]:[border-right-style:none] [@media_(max-width:992px)]:[border-right-width:medium] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [@media_(max-width:992px)]:[border-top-width:medium] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#career-prospects">
                {"Career Prospects"}
              </a>
            </li>
            <li className="[@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-left-color:rgb(52,_43,_124)] [@media_(max-width:992px)]:[border-left-color:currentcolor] [@media_(max-width:992px)]:[border-left-style:none] [border-left-width:3px] [@media_(max-width:992px)]:[border-left-width:medium] [@media_(max-width:992px)]:[border-right-color:currentcolor] [@media_(max-width:992px)]:[border-right-style:none] [@media_(max-width:992px)]:[border-right-width:medium] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [@media_(max-width:992px)]:[border-top-width:medium] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#advisory-board">
                {"Advisory Board"}
              </a>
            </li>
            <li className="[@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-left-color:rgb(52,_43,_124)] [@media_(max-width:992px)]:[border-left-color:currentcolor] [@media_(max-width:992px)]:[border-left-style:none] [border-left-width:3px] [@media_(max-width:992px)]:[border-left-width:medium] [@media_(max-width:992px)]:[border-right-color:currentcolor] [@media_(max-width:992px)]:[border-right-style:none] [@media_(max-width:992px)]:[border-right-width:medium] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [@media_(max-width:992px)]:[border-top-width:medium] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#life-at-atlas-isme">
                {"Life At ATLAS ISME"}
              </a>
            </li>
            <li className="![border-bottom-color:currentcolor] ![border-bottom-style:none] ![border-bottom-width:0px] ![border-image-outset:initial] ![border-image-repeat:initial] ![border-image-slice:initial] ![border-image-source:initial] ![border-image-width:initial] ![border-left-color:currentcolor] ![border-left-style:none] ![border-left-width:0px] ![border-right-color:currentcolor] ![border-right-style:none] ![border-right-width:0px] ![border-top-color:currentcolor] ![border-top-style:none] ![border-top-width:0px] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [background-color:rgb(253,_220,_15)] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:revert] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-feature-settings:revert] [font-size:inherit] [font-variation-settings:revert] [font-weight:revert] [letter-spacing:revert] [padding-bottom:3px] [@media_(min-width:1201px)]:[padding-bottom:5px] [padding-left:20px] [@media_(min-width:1201px)]:[padding-left:30px] [padding-right:20px] [@media_(min-width:1201px)]:[padding-right:30px] [padding-top:3px] [@media_(min-width:1201px)]:[padding-top:5px]">
                {" "}
                <a className="[color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)]" href="#admission-fees">
                  {" Admission & Fees"}
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
                <picture>
                  <source media="(max-width: 992px)" srcSet="/assets/lp/isme-ug/assets/images/hero-banner/hero-mobile.webp" />
                  {" "}
                  <source media="(min-width: 993px)" srcSet="/assets/lp/isme-ug/assets/images/hero-banner/hero-desktop.webp" />
                  {" "}
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/hero-banner/defualt/hero-desktop.webp" alt="isme ug Banner" width="1920" height="800" fetchPriority="high" />
                </picture>
              </div>
            </div>
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [height:100%] [@media_(max-width:992px)]:[height:unset] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] [padding-bottom:0px] [padding-left:0px] [@media_(min-width:993px)_and_(max-width:1200px)]:[padding-left:60px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:70px] [@media_(min-width:1367px)]:[padding-left:120px] [padding-right:0px] [padding-top:0px] [position:absolute] [top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] max-lg:![padding-bottom:0.5rem] ![padding-left:0px] max-lg:![padding-left:calc(var(--bs-gutter-x)_*_0.5)] ![padding-right:0px] max-lg:![padding-right:calc(var(--bs-gutter-x)_*_0.5)] ![padding-top:0px] max-lg:![padding-top:0.5rem] [width:50%] max-lg:[width:100%]">
                <h1 className="[background-attachment:initial] [background-clip:text] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [color:transparent] [font-size:26px] [@media_(min-width:993px)_and_(max-width:1200px)]:[font-size:42px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[font-size:50px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[font-size:60px] [@media_(min-width:1501px)]:[font-size:76px] [font-weight:bold] [line-height:26px] [@media_(min-width:993px)_and_(max-width:1200px)]:[line-height:36px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[line-height:44px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[line-height:52px] [@media_(min-width:1501px)]:[line-height:68px] [margin-bottom:10px] [@media_(min-width:993px)_and_(max-width:1200px)]:[margin-bottom:16px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[margin-bottom:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[margin-bottom:30px] [@media_(min-width:1501px)]:[margin-bottom:50px] [text-transform:uppercase]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                  {"india's industry "}
                  <br className="![display:block] max-lg:![display:none]" />
                  {"driven business"}
                  <br className="![display:block] max-lg:![display:none]" />
                  {" school"}
                </h1>
                <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Bebas_Neue',sans-serif] [font-size:22px] [@media_(min-width:993px)_and_(max-width:1200px)]:[font-size:26px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[font-size:36px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[font-size:34px] [@media_(min-width:1501px)]:[font-size:70px] [font-weight:500] [line-height:24px] [@media_(min-width:993px)_and_(max-width:1200px)]:[line-height:28px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[line-height:38px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[line-height:34px] [@media_(min-width:1501px)]:[line-height:70px] [@media_(min-width:993px)_and_(max-width:1200px)]:[margin-bottom:16px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[margin-bottom:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[margin-bottom:30px] [@media_(min-width:1501px)]:[margin-bottom:50px] [text-transform:uppercase]">
                  {"bba (hons.) "}
                  <br className="![display:block] max-lg:![display:none]" />
                  {"b.sc (hons.)"}
                </p>
                <p className="[color:rgb(52,_43,_124)] ![display:block] max-lg:![display:none] [font-size:30px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:36px] [@media_(min-width:1501px)]:[font-size:38px] [font-weight:bold] [line-height:32px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[line-height:42px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[line-height:38px] [@media_(min-width:1501px)]:[line-height:36px] [text-transform:uppercase]">
                  <span className="[background-attachment:initial] [background-clip:text] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/green.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [color:transparent]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"8s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    {" admissions"}
                  </span>
                  {" "}
                  <br className="![display:block] max-lg:![display:none]" />
                  <span className="[background-attachment:initial] [background-clip:text] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/green.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [color:transparent] [font-size:70px] [@media_(min-width:1201px)]:[font-size:90px] [font-weight:800] [line-height:54px] [@media_(min-width:1201px)]:[line-height:74px] [margin-bottom:8px] [margin-left:0px] [margin-right:0px] [margin-top:0px] [text-transform:uppercase]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"8s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    {" open"}
                  </span>
                  {" "}
                  <br className="![display:block] max-lg:![display:none]" />
                  {"for 2026"}
                </p>
              </div>
            </div>
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [display:flex] [flex-wrap:wrap] [height:100%] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [@media_(min-width:993px)_and_(max-width:1200px)]:[padding-right:60px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:70px] [@media_(min-width:1367px)]:[padding-right:120px] [padding-top:0px] [position:absolute] [@media_(max-width:992px)]:[position:unset] [top:0px] ![width:100%]">
              <p className="[@media_(max-width:992px)]:[background-color:rgb(0,_159,_224)] [@media_(max-width:992px)]:[color:rgb(52,_43,_124)] ![display:none] max-lg:![display:block] [flex-shrink:0] [@media_(max-width:992px)]:[font-size:32px] [@media_(max-width:992px)]:[font-weight:bold] [margin-bottom:1rem] [margin-left:revert] [margin-right:revert] [margin-top:var(--bs-gutter-y)] [max-width:100%] [padding-left:calc(var(--bs-gutter-x)_*_0.5)] [padding-right:calc(var(--bs-gutter-x)_*_0.5)] [@media_(max-width:992px)]:[text-align:center] [@media_(max-width:992px)]:[text-transform:uppercase] [width:100%]">
                {"admissions open for 2026"}
              </p>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-left:66.6667%] max-lg:[margin-left:revert] [margin-top:var(--bs-gutter-y)] [max-width:100%] [padding-left:calc(var(--bs-gutter-x)_*_0.5)] [padding-right:calc(var(--bs-gutter-x)_*_0.5)] [width:33.3333%] max-lg:[width:100%] [&_.atlas-embed-wrap_iframe]:[border-bottom-color:currentcolor] [&_.atlas-embed-wrap_iframe]:[border-bottom-style:none] [&_.atlas-embed-wrap_iframe]:[border-left-color:currentcolor] [&_.atlas-embed-wrap_iframe]:[border-left-style:none] [&_.atlas-embed-wrap_iframe]:[border-right-color:currentcolor] [&_.atlas-embed-wrap_iframe]:[border-right-style:none] [&_.atlas-embed-wrap_iframe]:[border-top-color:currentcolor] [&_.atlas-embed-wrap_iframe]:[border-top-style:none] [&_.atlas-embed-wrap_iframe]:[display:revert] [&_.atlas-embed-wrap_iframe]:[vertical-align:revert]" id="admission-fees">
                {" "}
                <CrmWidget mode="script" src="https://crm.atlasskilltech.app/widgets/6a3e798da1fd0680c6c17565/embed.js" hostClassName="contents" scriptAttrs={{"data-atlas-width": "100%", "data-atlas-height": "650"}} />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] ![margin-bottom:3rem] max-lg:![margin-bottom:0px] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1.5rem] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:0px] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <h2 className="[background-attachment:initial] [background-clip:text] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/green.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [color:transparent] [font-family:'LP27_Bebas_Neue',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:40px] [font-weight:500] [line-height:1.2]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"8s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                  {" OUR UNDERGRADUATE (HONS.) PROGRAMS "}
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <div className="[column-gap:10px] [display:grid] [grid-template-columns:repeat(4,_1fr)] [@media_(max-width:992px)]:[grid-template-columns:repeat(1,_1fr)] [grid-template-rows:repeat(3,_auto)] [@media_(max-width:992px)]:[grid-template-rows:repeat(5,_auto)] [row-gap:10px]">
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [grid-column-end:5] [@media_(max-width:992px)]:[grid-column-end:unset] [grid-column-start:1] [@media_(max-width:992px)]:[grid-column-start:unset] [grid-row-end:2] [@media_(max-width:992px)]:[grid-row-end:unset] [grid-row-start:1] [@media_(max-width:992px)]:[grid-row-start:unset] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:24px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:70px] [@media_(max-width:992px)]:[width:44px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      {" "}
                      <span>
                        {" "}
                        <strong>
                          {" BBA"}
                        </strong>
                        {" Majoring in Marketing / Finance / Business Analytics "}
                      </span>
                    </p>
                    <div className="[margin-bottom:0px] [margin-left:0px] [margin-right:0px] [margin-top:20px] [position:relative]">
                      <p className="[background-color:rgb(255,_255,_255)] [color:rgb(52,_43,_124)] [font-size:16px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:600] [left:2%] [@media_(max-width:992px)]:[left:3%] [@media_(min-width:1501px)]:[left:1%] [padding-bottom:0px] [padding-left:10px] [padding-right:10px] [padding-top:0px] [position:absolute] [top:-26%] [@media_(max-width:992px)]:[top:-7%] [@media_(min-width:1501px)]:[top:-28%]">
                        {"Choose from 7 Minors"}
                      </p>
                      <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-left-radius:14px] [@media_(max-width:992px)]:[border-bottom-left-radius:10px] [border-bottom-right-radius:14px] [@media_(max-width:992px)]:[border-bottom-right-radius:10px] [border-bottom-width:2px] [border-left-color:rgb(0,_159,_224)] [border-left-width:2px] [border-right-color:rgb(0,_159,_224)] [border-right-width:2px] [border-top-color:rgb(0,_159,_224)] [border-top-left-radius:14px] [@media_(max-width:992px)]:[border-top-left-radius:10px] [border-top-right-radius:14px] [@media_(max-width:992px)]:[border-top-right-radius:10px] [border-top-width:2px] [display:flex] [@media_(max-width:992px)]:[flex-direction:column] [justify-content:space-between] [padding-bottom:18px] [@media_(max-width:992px)]:[padding-bottom:16px] [padding-left:16px] [@media_(max-width:992px)]:[padding-left:8px] [padding-right:16px] [@media_(max-width:992px)]:[padding-right:8px] [padding-top:18px] [@media_(max-width:992px)]:[padding-top:16px]">
                        <span className="[color:rgb(52,_43,_124)] [font-size:12px] [@media_(min-width:1501px)]:[font-size:14px] [font-weight:bold]">
                          {" "}
                          <img className="[display:revert] [height:revert] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" width="20" height="auto" alt="3d box icon" />
                          {" Finance "}
                        </span>
                        {" "}
                        <span className="[color:rgb(52,_43,_124)] [font-size:12px] [@media_(min-width:1501px)]:[font-size:14px] [font-weight:bold]">
                          {" "}
                          <img className="[display:revert] [height:revert] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" width="20" height="auto" alt="3d box icon" />
                          {" Marketing "}
                        </span>
                        {" "}
                        <span className="[color:rgb(52,_43,_124)] [font-size:12px] [@media_(min-width:1501px)]:[font-size:14px] [font-weight:bold]">
                          {" "}
                          <img className="[display:revert] [height:revert] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" width="20" height="auto" alt="3d box icon" />
                          {" Entrepreneurship "}
                        </span>
                        {" "}
                        <span className="[color:rgb(52,_43,_124)] [font-size:12px] [@media_(min-width:1501px)]:[font-size:14px] [font-weight:bold]">
                          {" "}
                          <img className="[display:revert] [height:revert] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" width="20" height="auto" alt="3d box icon" />
                          {" Economics & Public Policy "}
                        </span>
                        {" "}
                        <span className="[color:rgb(52,_43,_124)] [font-size:12px] [@media_(min-width:1501px)]:[font-size:14px] [font-weight:bold]">
                          {" "}
                          <img className="[display:revert] [height:revert] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" width="20" height="auto" alt="3d box icon" />
                          {" Business Analytics "}
                        </span>
                        {" "}
                        <span className="[color:rgb(52,_43,_124)] [font-size:12px] [@media_(min-width:1501px)]:[font-size:14px] [font-weight:bold]">
                          {" "}
                          <img className="[display:revert] [height:revert] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" width="20" height="auto" alt="3d box icon" />
                          {" Supply Chain Management "}
                        </span>
                        {" "}
                        <span className="[color:rgb(52,_43,_124)] [font-size:12px] [@media_(min-width:1501px)]:[font-size:14px] [font-weight:bold]">
                          {" "}
                          <img className="[display:revert] [height:revert] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" width="20" height="auto" alt="3d box icon" />
                          {" Human Resource Management "}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [grid-column-end:3] [@media_(max-width:992px)]:[grid-column-end:unset] [grid-column-start:1] [@media_(max-width:992px)]:[grid-column-start:unset] [grid-row-end:3] [@media_(max-width:992px)]:[grid-row-end:unset] [grid-row-start:2] [@media_(max-width:992px)]:[grid-row-start:unset] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:24px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:70px] [@media_(max-width:992px)]:[width:44px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      {" "}
                      <span>
                        {" "}
                        <strong>
                          {"BBA"}
                        </strong>
                        {" in Digital Branding & Advertising"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [grid-column-end:5] [@media_(max-width:992px)]:[grid-column-end:unset] [grid-column-start:3] [@media_(max-width:992px)]:[grid-column-start:unset] [grid-row-end:3] [@media_(max-width:992px)]:[grid-row-end:unset] [grid-row-start:2] [@media_(max-width:992px)]:[grid-row-start:unset] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:24px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:70px] [@media_(max-width:992px)]:[width:44px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      {" "}
                      <span>
                        {" "}
                        <strong>
                          {" BBA"}
                        </strong>
                        {" in Business Psychology"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [grid-column-end:3] [@media_(max-width:992px)]:[grid-column-end:unset] [grid-column-start:1] [@media_(max-width:992px)]:[grid-column-start:unset] [grid-row-end:4] [@media_(max-width:992px)]:[grid-row-end:unset] [grid-row-start:3] [@media_(max-width:992px)]:[grid-row-start:unset] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:24px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:70px] [@media_(max-width:992px)]:[width:44px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      {" "}
                      <span>
                        {" "}
                        <strong>
                          {"BBA"}
                        </strong>
                        {" in AI & Emerging Technologies"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [grid-column-end:5] [@media_(max-width:992px)]:[grid-column-end:unset] [grid-column-start:3] [@media_(max-width:992px)]:[grid-column-start:unset] [grid-row-end:4] [@media_(max-width:992px)]:[grid-row-end:unset] [grid-row-start:3] [@media_(max-width:992px)]:[grid-row-start:unset] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:24px] [@media_(max-width:992px)]:[font-size:18px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:70px] [@media_(max-width:992px)]:[width:44px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      {" "}
                      <span>
                        {" "}
                        <strong>
                          {"B.Sc"}
                        </strong>
                        {" in Finance"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] ![margin-bottom:3rem] max-lg:![margin-bottom:0px] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1.5rem] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:0px] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <h2 className="[background-attachment:initial] [background-clip:text] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/green.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [color:transparent] [font-family:'LP27_Bebas_Neue',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:40px] [font-weight:500] [line-height:1.2]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"8s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                  {" Why Study at ATLAS ISME "}
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0px] ![padding-right:1rem] max-lg:![padding-right:0px] [width:50%] max-lg:[width:100%]">
                <p className="![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                  {" ATLAS SkillTech University’s ISME School of Management & Entrepreneurship stands out for its "}
                  <strong>
                    {"innovation-driven learning, strong industry integration, and experiential approach."}
                  </strong>
                  {" Located in Mumbai, India’s financial capital, ISME blends "}
                  <strong>
                    {"business fundamentals with emerging skills through live projects, internships, case studies, and expert-led masterclasses,"}
                  </strong>
                  {" preparing students to lead in a dynamic global business environment. "}
                </p>
                <p className="![margin-bottom:0px] max-lg:![margin-bottom:1.5rem] [margin-left:revert] [margin-right:revert]">
                  {" ATLAS ISME offers a diverse range of "}
                  <strong>
                    {"future-ready undergraduate programs, "}
                  </strong>
                  {"designed for the next generation of business leaders. Choose from a range of Programs — BBA (Majors & Minors), BBA in Digital Branding & Advertising, BBA in AI & Emerging Technologies,"}
                  <strong>
                    {" BBA in Business Psychology, and B.Sc in Finance (CFA-Aligned Curriculum) "}
                  </strong>
                  {"— to shape your career path. "}
                </p>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:1rem] max-lg:![padding-left:0px] ![padding-right:0px] [width:50%] max-lg:[width:100%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/isme-ug/assets/images/section-two/row-one/1.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/isme-ug/assets/images/section-two/row-one/default/1.jpg" type="image/jpg" />
                  {" "}
                  {" "}
                  <img className="[box-shadow:rgb(253,_220,_15)_10px_-10px_0px] [display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-two/row-one/default/1.jpg" alt="innovation-driven learning, strong industry integration, and experiential approach" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] ![margin-bottom:3rem] max-lg:![margin-bottom:0px] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1.5rem] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:0px] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:1rem] max-lg:![padding-bottom:0.5rem] ![padding-left:0px] ![padding-right:0.25rem] max-lg:![padding-right:0px] [width:33.3333%] max-lg:[width:100%]">
                <div className="[align-items:center] [background-color:rgb(52,_43,_124)] [color:rgb(255,_255,_255)] [display:flex] [flex-direction:column] [height:400px] [@media_(max-width:992px)]:[height:290px] [justify-content:center] [padding-bottom:0px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px]">
                  <img className="![display:block] [height:revert] ![margin-bottom:1.5rem] ![margin-left:auto] ![margin-right:auto] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/section-two/row-two/1.webp" width="60" alt="" />
                  <p className="[color:rgb(253,_220,_15)] [font-size:14px] ![font-weight:600] ![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                    {"Entrepreneurial Mindset"}
                  </p>
                  <p className="[font-size:14px] [margin-bottom:1rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                    {"Develop the skills to launch and manage your own business through startup incubation, venture-building programs, and guidance from successful entrepreneurs."}
                  </p>
                </div>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:1rem] max-lg:![padding-bottom:0.5rem] ![padding-left:0.25rem] max-lg:![padding-left:0px] ![padding-right:0.25rem] max-lg:![padding-right:0px] [width:33.3333%] max-lg:[width:100%]">
                <div className="[align-items:center] [background-color:rgb(52,_43,_124)] [color:rgb(255,_255,_255)] [display:flex] [flex-direction:column] [height:400px] [@media_(max-width:992px)]:[height:290px] [justify-content:center] [padding-bottom:0px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px]">
                  <img className="![display:block] [height:revert] ![margin-bottom:1.5rem] ![margin-left:auto] ![margin-right:auto] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/section-two/row-two/2.webp" width="60" alt="" />
                  <p className="[color:rgb(253,_220,_15)] [font-size:14px] ![font-weight:600] ![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                    {"CFA Based Curriculum"}
                  </p>
                  <p className="[font-size:14px] [margin-bottom:1rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                    {"Our CFA-based B.Sc. Finance curriculum equips students with in-demand industry skills, preparing them for careers in global finance."}
                  </p>
                </div>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:1rem] max-lg:![padding-bottom:0.5rem] ![padding-left:0.25rem] max-lg:![padding-left:0px] ![padding-right:0px] [width:33.3333%] max-lg:[width:100%]">
                <div className="[align-items:center] [background-color:rgb(52,_43,_124)] [color:rgb(255,_255,_255)] [display:flex] [flex-direction:column] [height:400px] [@media_(max-width:992px)]:[height:290px] [justify-content:center] [padding-bottom:0px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px]">
                  <img className="![display:block] [height:revert] ![margin-bottom:1.5rem] ![margin-left:auto] ![margin-right:auto] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/section-two/row-two/3.webp" width="60" alt="" />
                  <p className="[color:rgb(253,_220,_15)] [font-size:14px] ![font-weight:600] ![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                    {"Entrepreneurial Mindset"}
                  </p>
                  <p className="[font-size:14px] [margin-bottom:1rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                    {"Gain industry insights through our expert faculty, industry-led capstone projects, and mentorship from business leaders."}
                  </p>
                </div>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] max-lg:![padding-bottom:0.5rem] ![padding-left:0px] ![padding-right:0.25rem] max-lg:![padding-right:0px] [width:33.3333%] max-lg:[width:100%]">
                <div className="[align-items:center] [background-color:rgb(52,_43,_124)] [color:rgb(255,_255,_255)] [display:flex] [flex-direction:column] [height:400px] [@media_(max-width:992px)]:[height:290px] [justify-content:center] [padding-bottom:0px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px]">
                  <img className="![display:block] [height:revert] ![margin-bottom:1.5rem] ![margin-left:auto] ![margin-right:auto] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/section-two/row-two/4.webp" width="60" alt="" />
                  <p className="[color:rgb(253,_220,_15)] [font-size:14px] ![font-weight:600] ![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                    {"State-Of-The-Art Infrastructure"}
                  </p>
                  <p className="[font-size:14px] [margin-bottom:1rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                    {"Experience world-class infrastructure with modern classrooms, collaborative spaces, and cutting-edge business incubators."}
                  </p>
                </div>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] max-lg:![padding-bottom:0.5rem] ![padding-left:0.25rem] max-lg:![padding-left:0px] ![padding-right:0.25rem] max-lg:![padding-right:0px] [width:33.3333%] max-lg:[width:100%]">
                <div className="[align-items:center] [background-color:rgb(52,_43,_124)] [color:rgb(255,_255,_255)] [display:flex] [flex-direction:column] [height:400px] [@media_(max-width:992px)]:[height:290px] [justify-content:center] [padding-bottom:0px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px]">
                  <img className="![display:block] [height:revert] ![margin-bottom:1.5rem] ![margin-left:auto] ![margin-right:auto] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/section-two/row-two/5.webp" width="60" alt="" />
                  <p className="[color:rgb(253,_220,_15)] [font-size:14px] ![font-weight:600] ![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                    {"Robust Industry Connection"}
                  </p>
                  <p className="[font-size:14px] [margin-bottom:1rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                    {"Engage with leading organisations, startups, and business experts, offering hands-on learning and professional networking opportunities."}
                  </p>
                </div>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] max-lg:![padding-bottom:0.5rem] ![padding-left:0.25rem] max-lg:![padding-left:0px] ![padding-right:0px] [width:33.3333%] max-lg:[width:100%]">
                <div className="[align-items:center] [background-color:rgb(52,_43,_124)] [color:rgb(255,_255,_255)] [display:flex] [flex-direction:column] [height:400px] [@media_(max-width:992px)]:[height:290px] [justify-content:center] [padding-bottom:0px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px]">
                  <img className="![display:block] [height:revert] ![margin-bottom:1.5rem] ![margin-left:auto] ![margin-right:auto] [max-width:revert]" src="/assets/lp/isme-ug/assets/images/section-two/row-two/6.webp" width="60" alt="" />
                  <p className="[color:rgb(253,_220,_15)] [font-size:14px] ![font-weight:600] ![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                    {"Experiential Learning"}
                  </p>
                  <p className="[font-size:14px] [margin-bottom:1rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                    {"Gain hands-on experience through live business projects, simulations, and industry collaborations that bridge classroom learning with real-world application."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:flex-start] [display:flex] [flex-wrap:wrap] ![margin-bottom:3rem] max-lg:![margin-bottom:0px] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1.5rem] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:0px] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <h2 className="[background-attachment:initial] [background-clip:text] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/green.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [color:transparent] [font-family:'LP27_Bebas_Neue',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:40px] [font-weight:500] [line-height:1.2]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"8s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                  {" Lead the Future of Business "}
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0px] ![padding-right:1rem] max-lg:![padding-right:0px] [width:33.3333%] max-lg:[width:100%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/isme-ug/assets/images/section-three/1.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/isme-ug/assets/images/section-three/default/1.webp" type="image/jpg" />
                  {" "}
                  {" "}
                  <img className="[box-shadow:rgb(253,_220,_15)_-10px_10px_0px] [display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-three/default/1.webp" alt="innovation-driven learning, strong industry integration, and experiential approach" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:1rem] max-lg:![padding-left:0px] ![padding-right:0px] [width:66.6667%] max-lg:[width:100%]">
                <div className="![margin-top:0px] max-lg:![margin-top:1.5rem]">
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%] lps-acc" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {" Business Strategy & Consulting"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"Business strategy professionals drive organisational growth through market research, strategic planning, and competitive analysis. They work with leadership teams to optimise business operations and expand market reach."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {" Entrepreneurship & Venture Creation"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"Entrepreneurs innovate and create new business ventures by identifying market opportunities, securing funding, and developing sustainable business models. They focus on problem-solving, leadership, and strategic execution."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {" Marketing & Brand Management"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"Marketing professionals develop impactful campaigns, manage brand positioning, and analyse consumer behaviour to create compelling strategies that drive engagement and revenue growth."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {" Finance & Investment Analysis"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"Finance professionals analyse financial data, assess market trends, and guide investment decisions to optimise business performance and economic outcomes."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {" Investment Banking"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"Investment banking is a lucrative career path that involves tasks such as financial remodeling, market analysis, and improving business operations. This job role can also include trading, asset management, and equity research."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {" Corporate Finance"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"The corporate finance job role is securing business funds, making investment decisions, and capital restructuring. Also, optimizing company value, managing financial risks, and assisting in mergers and acquisitions."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {" Digital Transformation & Business Analytics"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"Business analysts leverage data analytics, AI, and digital tools to enhance business decision-making, optimise strategies, and streamline operations in dynamic industries."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {" Corporate Leadership & Management"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"Future business leaders develop critical thinking, leadership, and problem-solving skills to manage organisations, drive business success, and inspire teams towards excellence."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {" Financial Analysis"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"A financial analyst is a professional who studies financial data and provides guidance on investment strategies and financial outcomes for a company or its clients. They also make research on market trends and economic conditions to analyze possible outcomes for business decisions."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {" Actuary"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"Actuary professionals use mathematics, statistics, and financial theory to assess financial risks. They help businesses to predict future financial outcomes, specifically in insurance, pensions, and other risk-related sectors, guiding financial decision-making."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="career-prospects">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] ![margin-bottom:3rem] max-lg:![margin-bottom:0px] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1.5rem] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:0px] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <h2 className="[background-attachment:initial] [background-clip:text] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/green.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [color:transparent] [font-family:'LP27_Bebas_Neue',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:40px] [font-weight:500] [line-height:1.2]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"8s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                  {" Impressive Job Roles "}
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <div className="[column-gap:10px] [display:grid] [grid-template-columns:repeat(4,_1fr)] [@media_(max-width:992px)]:[grid-template-columns:repeat(2,_1fr)] [grid-template-rows:repeat(3,_auto)] [@media_(max-width:992px)]:[grid-template-rows:repeat(12,_auto)] [row-gap:10px]">
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Marketing Manager"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Brand Manager"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Sales Manager"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Investment Banking"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Digital Marketing Specialist"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Business Development Manager"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Startup Founder"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Product Manager"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Strategy Consultant"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Data Analyst"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Business Intelligence Analyst"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"IT Business Consultant"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Business Analyst"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Management Consultant"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Operations Manager"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Project Manager"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Credit Analyst"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Equity Research Analyst"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Financial Consultant"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Economic Research Analyst"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Financial Auditor"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Finance Entrepreneur"}
                      </span>
                    </p>
                  </div>
                  <div className="[align-content:center] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:0px] [padding-left:10px] [@media_(max-width:992px)]:[padding-left:0px] [padding-right:10px] [@media_(max-width:992px)]:[padding-right:0px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:0px]">
                    <p className="[align-items:center] [color:rgb(52,_43,_124)] [display:flex] [font-size:18px] [@media_(max-width:992px)]:[font-size:12px] [@media_(min-width:1501px)]:[font-size:20px] [font-weight:500]">
                      <img className="[display:revert] [max-width:revert] [width:50px] [@media_(max-width:992px)]:[width:32px]" src="/assets/lp/isme-ug/assets/images/icon/3d-box.svg" alt="3d box icon" />
                      <span>
                        {"Venture Capital Analyst"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:flex-start] [display:flex] [flex-wrap:wrap] ![margin-bottom:3rem] max-lg:![margin-bottom:0px] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1.5rem] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:0px] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <h2 className="[background-attachment:initial] [background-clip:text] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/green.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [color:transparent] [font-family:'LP27_Bebas_Neue',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:40px] [font-weight:500] [line-height:1.2]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"8s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                  {" Master’s Progression Opportunities "}
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0px] ![padding-right:0px] [width:100%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/isme-ug/assets/images/section-five/1.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/isme-ug/assets/images/section-five/default/1.jpg" type="image/jpg" />
                  {" "}
                  {" "}
                  <img className="[box-shadow:rgb(253,_220,_15)_-10px_10px_0px] [display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-five/default/1.jpg" alt="innovation-driven learning, strong industry integration, and experiential approach" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0px] ![padding-right:0px] [width:100%]">
                <div className="![margin-top:1.5rem]">
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%] lps-acc" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {" MBA (Master of Business Administration)"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"A globally recognized degree that enhances leadership, strategic thinking, and business management skills."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {"CFA (Chartered Financial Analyst)"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"A prestigious certification focusing on investment management and financial analysis."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {"M.Sc. in Management"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"A specialized program focusing on advanced business strategies, data analytics, and organizational studies."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {"M.Sc. in Finance"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"A focused program deepening expertise in financial theory, quantitative methods, and advanced financial decision-making."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {"PGDM (Post Graduate Diploma in Management)"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"A comprehensive program offering expertise in business administration and corporate leadership."}
                      </p>
                    </div>
                  </div>
                  <div className="lpm-accordion-itemv2 [position:relative] [&.lps-acc]:[background-attachment:initial] [&.lps-acc]:[background-clip:initial] [&.lps-acc]:[background-color:initial] [&.lps-acc]:[background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [&.lps-acc]:[background-origin:initial] [&.lps-acc]:[background-position-x:center] [&.lps-acc]:[background-position-y:center] [&.lps-acc]:[background-repeat:initial] [&.lps-acc]:[background-size:200%]" data-lpt="acc" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [&::after]:[background-image:url(/assets/mandatory-disclosures/plus-circle.svg)] [&::after]:[background-repeat:no-repeat] [&::after]:[background-size:cover] [&::after]:[content:''] [&::after]:[display:block] [&::after]:[height:28px] [@media_(max-width:992px)]:[&::after]:[height:24px] [&::after]:[transform:rotate(0deg)] [&::after]:[transition-delay:0s] [&::after]:[transition-duration:0.3s] [&::after]:[transition-property:transform] [&::after]:[transition-timing-function:ease] [&::after]:[width:28px] [@media_(max-width:992px)]:[&::after]:[width:24px] [align-items:center] [background-color:transparent] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:rgb(52,_43,_124)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [font-feature-settings:revert] [font-size:26px] [@media_(max-width:992px)]:[font-size:12px] [font-variation-settings:revert] [font-weight:500] [justify-content:space-between] [letter-spacing:revert] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px] [position:relative] [text-align:left] [width:100%] [&.lps-acc]:focus:[--bs-text-opacity:1] [&.lps-acc]:focus:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [&.lps-acc]:[&::after]:[background-image:url(/assets/lp/isme-ug/assets/images/icon/plus-circle-white.svg)] [&.lps-acc]:[&::after]:[transform:rotate(45deg)] [&.lps-acc]:[--bs-text-opacity:1] [&.lps-acc]:![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))]" data-lpt="acc">
                      {"CMA (Certified Management Accountant)"}
                    </button>
                    <div className="[align-items:center] [background-color:rgb(255,_255,_255)] [border-bottom-color:rgb(238,_238,_238)] [border-bottom-width:1px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [display:flex] [height:0px] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [transition-delay:0s] [transition-duration:0.5s] [transition-property:all] [transition-timing-function:ease] [.lps-acc_&]:[height:150px] [@media_(max-width:992px)]:[.lps-acc_&]:[height:200px] [.lps-acc_&]:[padding-bottom:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-bottom:5px] [.lps-acc_&]:[padding-left:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-left:5px] [.lps-acc_&]:[padding-right:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-right:5px] [.lps-acc_&]:[padding-top:10px] [@media_(max-width:992px)]:[.lps-acc_&]:[padding-top:5px]">
                      <p className="[font-size:18px] [@media_(max-width:992px)]:[font-size:14px]">
                        {"A prestigious certification that hones expertise in financial management, strategic planning, and decision-making."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="advisory-board">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:flex-start] [display:flex] [flex-wrap:wrap] ![margin-bottom:3rem] max-lg:![margin-bottom:0px] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1.5rem] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:0px] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <h2 className="[background-attachment:initial] [background-clip:text] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/green.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [color:transparent] [font-family:'LP27_Bebas_Neue',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:40px] [font-weight:500] [line-height:1.2]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"8s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                  {" Advisory Board "}
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0px] ![padding-right:0px] [width:100%]">
                <div className="[overflow-x:hidden] [overflow-y:hidden] [position:relative] [text-wrap-mode:nowrap] [white-space-collapse:collapse] [width:100%]">
                  <div className="[display:flex] [width:170%]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"17s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"marqueeScroll\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                    <div className="[column-gap:20px] [@media_(max-width:992px)]:[column-gap:10px] [display:flex] [flex-wrap:nowrap] [row-gap:20px] [@media_(max-width:992px)]:[row-gap:10px]">
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/1.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/1.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/1.webp" alt="Deepak Parekh" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Deepak Parekh"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Former Chairman"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/1.webp" alt="HDFC" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/2.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/2.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/2.webp" alt="Keshav Murugesh" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Keshav Murugesh"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Group CEO"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/2.webp" alt="WNS Global Services" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/3.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/3.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/3.webp" alt="Ram Raghavan" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Ram Raghavan"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"President, Enterprise Oral Care"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/3.webp" alt="Colgate-Palmolive" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/4.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/4.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/4.webp" alt="Jamil Khatri" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Jamil Khatri"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Co-Founder & CEO"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/4.webp" alt="Dentsu" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/5.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/5.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/5.webp" alt="Dr. Indu Shahani" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Dr. Indu Shahani"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Founding President and Chancellor"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/5.webp" alt="ATLAS Skilltech University" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/6.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/6.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/6.webp" alt="Siddharth Shahani" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Siddharth Shahani"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Co-Founder & Executive President"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/5.webp" alt="ATLAS Skilltech University" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/7.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/7.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/7.webp" alt="Karan Singh" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Karan Singh"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Managing Director"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/7.webp" alt="Bain & Company" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/8.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/8.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/8.webp" alt="Anant Goenka" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Anant Goenka"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Master’s Admit"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/8.png" alt="CEAT" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/9.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/9.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/9.webp" alt="Avani Davda" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Avani Davda"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Strategic Advisor"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/9.png" alt="Bain & Company" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/10.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/10.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/10.webp" alt="Aryaman Birla" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Aryaman Birla"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Director ABMCPL"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/10.webp" alt="Birla Group" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/11.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/11.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/11.webp" alt="Russ Winer" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Russ Winer"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Professor of Marketing"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/11.webp" alt="NYU" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/12.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/12.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/12.webp" alt="Tim Marshall" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Tim Marshall"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Deputy Vice-Chancellor"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/12.webp" alt="RMIT" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/13.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/13.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/13.webp" alt="Sanjay Gurbuxani" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Sanjay Gurbuxani"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"VP, IBS AMEA & Global Digital Innovation"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/13.webp" alt="Mondelez" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/14.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/14.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/14.webp" alt="Carol Kim" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Carol Kim"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Vice President, Global Recruitment"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/14.webp" alt="NYU" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/15.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/default/15.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/default/15.webp" alt="Vivek Pandit" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Vivek Pandit"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Senior Partner, McKinsey & Company"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/15.webp" alt="McKinsey & Company" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/16.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/16.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/16.webp" alt="Ronnie Screwvala" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Ronnie Screwvala"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Chairperson & Co-Founder"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/14.webp" alt="upGrad" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/17.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/17.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/17.webp" alt="Anita Dongre" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Anita Dongre"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Chief Creative Officer"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/15.webp" alt="House of Anita Dongre" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                      {" "}
                      {" "}
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [width:250px] [@media_(max-width:992px)]:[width:174px]">
                        <div className="[border-bottom-color:rgb(0,_159,_224)] [border-bottom-width:2px] [border-left-color:rgb(238,_238,_238)] [border-left-width:1px] [border-right-color:rgb(238,_238,_238)] [border-right-width:1px] [border-top-color:rgb(238,_238,_238)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [height:400px] [@media_(max-width:992px)]:[height:300px]">
                          <picture>
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/18.webp" type="image/webp" />
                            {" "}
                            <source srcSet="/assets/lp/isme-ug/assets/images/section-six/members/18.webp" type="image/jpg" />
                            {" "}
                            <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-six/members/18.webp" alt="Mayank Kumar" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                          <h3 className="[color:rgb(52,_43,_124)] [font-size:22px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:600] [line-height:1.2] [margin-left:10px] [margin-right:10px] [margin-top:14px]">
                            {"Mayank Kumar"}
                          </h3>
                          <p className="[color:rgb(0,_159,_224)] [font-size:14px] [@media_(max-width:992px)]:[font-size:10px] [margin-bottom:14px] [margin-left:10px] [margin-right:10px] [text-wrap-mode:wrap] [text-wrap-style:initial]">
                            {"Co-Founder & MD"}
                          </p>
                          {" "}
                          <img className="[display:revert] [max-width:revert] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:0px] [width:100px]" src="/assets/lp/isme-ug/assets/images/section-six/brands/default/14.webp" alt="upGrad" loading="lazy" decoding="async" fetchPriority="low" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:flex-start] [display:flex] [flex-wrap:wrap] ![margin-bottom:3rem] max-lg:![margin-bottom:0px] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1.5rem] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:0px] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <h2 className="[background-attachment:initial] [background-clip:text] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/green.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [color:transparent] [font-family:'LP27_Bebas_Neue',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:40px] [font-weight:500] [line-height:1.2]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"8s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                  {" Backed by Top Industry Leaders "}
                </h2>
              </div>
              <div className="lpm-mySwiperv2 lpm-swiper [display:block] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [list-style-image:initial] [list-style-position:initial] [list-style-type:none] [margin-left:auto] [margin-right:auto] [margin-top:var(--bs-gutter-y)] [max-width:100%] [overflow-x:hidden] [overflow-y:hidden] [padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] [padding-top:0px] [position:relative] [touch-action:pan-y] [width:100%] [z-index:1]">
                <div className="lpm-swiper-wrapper [box-sizing:content-box] [display:flex] [height:100%] [position:relative] [transform:translate3d(0px,_0px,_0px)] [transition-property:transform] [transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial)] [width:100%] [z-index:1]">
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <a className="[color:rgba(var(--bs-link-color-rgb),_var(--bs-link-opacity,_1))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)]" href="https://youtube.com/shorts/nko8PuMgnT8?si=Q6r9j6NbaEZZZsS2" target="_blank">
                      {" "}
                      <picture>
                        {" "}
                        <source srcSet="/assets/lp/isme-ug/assets/images/section-seven/slider/1.webp" type="image/webp" />
                        {" "}
                        {" "}
                        {" "}
                        {" "}
                        <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-seven/slider/1.webp" alt="YouTube short: Student Life at Atlas University" loading="lazy" decoding="async" fetchPriority="low" />
                      </picture>
                      {" "}
                    </a>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <a className="[color:rgba(var(--bs-link-color-rgb),_var(--bs-link-opacity,_1))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)]" href="https://youtu.be/q2dIoFyOin0?si=m6PXDqxiGp2Wj3St" target="_blank">
                      {" "}
                      <picture>
                        {" "}
                        <source srcSet="/assets/lp/isme-ug/assets/images/section-seven/slider/2.webp" type="image/webp" />
                        {" "}
                        {" "}
                        {" "}
                        {" "}
                        <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-seven/slider/2.webp" alt="YouTube short: Student Life at Atlas University" loading="lazy" decoding="async" fetchPriority="low" />
                      </picture>
                      {" "}
                    </a>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <a className="[color:rgba(var(--bs-link-color-rgb),_var(--bs-link-opacity,_1))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)]" href="https://youtube.com/shorts/RsejmYHtDoA?si=yhRNvK7HOw3oXJl8" target="_blank">
                      {" "}
                      <picture>
                        {" "}
                        <source srcSet="/assets/lp/isme-ug/assets/images/section-seven/slider/3.webp" type="image/webp" />
                        {" "}
                        {" "}
                        {" "}
                        {" "}
                        <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-seven/slider/3.webp" alt="YouTube short: Student Life at Atlas University" loading="lazy" decoding="async" fetchPriority="low" />
                      </picture>
                      {" "}
                    </a>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <a className="[color:rgba(var(--bs-link-color-rgb),_var(--bs-link-opacity,_1))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)]" href="https://youtu.be/vjIdf6KzC64?si=t5canuJadsoDjDay" target="_blank">
                      {" "}
                      <picture>
                        {" "}
                        <source srcSet="/assets/lp/isme-ug/assets/images/section-seven/slider/4.webp" type="image/webp" />
                        {" "}
                        {" "}
                        {" "}
                        {" "}
                        <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-seven/slider/4.webp" alt="YouTube short: Student Life at Atlas University" loading="lazy" decoding="async" fetchPriority="low" />
                      </picture>
                      {" "}
                    </a>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <a className="[color:rgba(var(--bs-link-color-rgb),_var(--bs-link-opacity,_1))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)]" href="https://youtu.be/r8TXc2EQudc?si=UExV71gSVlkGWSaE" target="_blank">
                      {" "}
                      <picture>
                        {" "}
                        <source srcSet="/assets/lp/isme-ug/assets/images/section-seven/slider/5.webp" type="image/webp" />
                        {" "}
                        {" "}
                        {" "}
                        {" "}
                        <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-seven/slider/5.webp" alt="YouTube short: Student Life at Atlas University" loading="lazy" decoding="async" fetchPriority="low" />
                      </picture>
                      {" "}
                    </a>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <a className="[color:rgba(var(--bs-link-color-rgb),_var(--bs-link-opacity,_1))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)]" href="https://youtu.be/hv0M3eoN3s8?si=S_7NlOEAUVxIVasR" target="_blank">
                      {" "}
                      <picture>
                        {" "}
                        <source srcSet="/assets/lp/isme-ug/assets/images/section-seven/slider/6.webp" type="image/webp" />
                        {" "}
                        {" "}
                        {" "}
                        {" "}
                        <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/section-seven/slider/6.webp" alt="YouTube short: Student Life at Atlas University" loading="lazy" decoding="async" fetchPriority="low" />
                      </picture>
                      {" "}
                    </a>
                  </div>
                </div>
                <div className="lpm-swiper-button-next [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:auto] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:var(--swiper-navigation-sides-offset,10px)] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/icon/swiper-right.svg" alt="" />
                </div>
                <div className="lpm-swiper-button-prev [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:var(--swiper-navigation-sides-offset,10px)] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:auto] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/isme-ug/assets/images/icon/swiper-left.svg" alt="" />
                </div>
                <div className="lpm-swiper-pagination [bottom:var(--swiper-pagination-bottom,8px)] [left:0px] [position:absolute] [text-align:center] [top:var(--swiper-pagination-top,auto)] [transform:translate3d(0px,_0px,_0px)] [transition-delay:0s] [transition-duration:0.3s] [transition-property:opacity] [transition-timing-function:ease] [width:100%] [z-index:10]" data-lp-bullet="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(255,_255,_255)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] [border-bottom-color:rgb(0,_0,_0)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" data-lp-bullet-active="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(0,_159,_224)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] ![border-bottom-color:rgb(0,_159,_224)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] ![border-left-color:rgb(0,_159,_224)] [border-left-width:1px] ![border-right-color:rgb(0,_159,_224)] [border-right-width:1px] ![border-top-color:rgb(0,_159,_224)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] [box-shadow:rgb(68,_78,_155)_3px_3px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:flex-start] [display:flex] [flex-wrap:wrap] ![margin-bottom:3rem] max-lg:![margin-bottom:0px] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1.5rem] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:0px] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <h2 className="[background-attachment:initial] [background-clip:text] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/green.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [color:transparent] [font-family:'LP27_Bebas_Neue',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:40px] [font-weight:500] [line-height:1.2]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"8s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                  {" Brands That Back Our Students "}
                </h2>
                <p className="![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                  {"With a strong focus on industry readiness and real-world application, the ATLAS Placement Cell has successfully connected students with top recruiters across sectors."}
                </p>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0px] ![padding-right:0px] [width:100%]">
                <div className="[background-color:rgb(255,_255,_255)] [overflow-x:hidden] [overflow-y:hidden] ![padding-bottom:1.5rem] max-lg:![padding-bottom:0.5rem] [position:relative] [text-wrap-mode:nowrap] [white-space-collapse:collapse] [width:100%]">
                  <div className="[column-gap:30px] [display:flex] [row-gap:30px] [width:max-content]" data-lpanim={"{\"duration\":\"20s\",\"fill-mode\":\"forwards\",\"iteration-count\":\"infinite\",\"name\":\"scroll-left\",\"play-state\":\"running\",\"timing-function\":\"linear\"}"}>
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/1.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/2.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/3.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/4.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/5.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/6.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/7.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/8.webp" alt="" />
                    {" "}
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/10.webp" alt="" />
                    {" "}
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/1.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/2.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/3.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/4.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/5.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/6.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/7.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/8.webp" alt="" />
                    {" "}
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-one/10.webp" alt="" />
                  </div>
                </div>
                <div className="[background-color:rgb(255,_255,_255)] [overflow-x:hidden] [overflow-y:hidden] [position:relative] [text-wrap-mode:nowrap] [white-space-collapse:collapse] [width:100%]">
                  <div className="[column-gap:30px] [display:flex] [row-gap:30px] [width:max-content]" data-lpanim={"{\"duration\":\"25s\",\"fill-mode\":\"forwards\",\"iteration-count\":\"infinite\",\"name\":\"scroll-right\",\"play-state\":\"running\",\"timing-function\":\"linear\"}"}>
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/1.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/2.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/3.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/4.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/5.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/6.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/7.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/8.webp" alt="" />
                    {" "}
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/10.webp" alt="" />
                    {" "}
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/1.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/2.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/3.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/4.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/5.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/6.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/7.webp" alt="" />
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/8.webp" alt="" />
                    {" "}
                    {" "}
                    <img className="[background-attachment:initial] [background-clip:initial] [background-color:white] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] [border-bottom-left-radius:8px] [border-bottom-right-radius:8px] [border-top-left-radius:8px] [border-top-right-radius:8px] [box-shadow:rgba(0,_0,_0,_0.1)_0px_2px_5px] [display:revert] [height:86px] [max-width:revert] [padding-bottom:20px] [padding-left:20px] [padding-right:20px] [padding-top:20px]" loading="lazy" src="/assets/lp/isme-ug/assets/images/section-eight/row-two/10.webp" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="life-at-atlas-isme">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:flex-start] [display:flex] [flex-wrap:wrap] ![margin-bottom:3rem] max-lg:![margin-bottom:0px] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1.5rem] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:0px] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <h2 className="[background-attachment:initial] [background-clip:text] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/green.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [color:transparent] [font-family:'LP27_Bebas_Neue',sans-serif] [font-size:62px] [@media_(max-width:992px)]:[font-size:40px] [font-weight:500] [line-height:1.2]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"8s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
                  {" Life At ATLAS ISME "}
                </h2>
                <p className="![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                  {"ATLAS ISME School of Management &; Entrepreneurship is located in the heart of Mumbai, one of the world’s top centers of commerce. The ATLAS ISME is a first-of-its-kind campus amidst 500+ corporates making it a perfect launchpad for tomorrow's business leaders. ATLAS ISME is a beacon of innovation and collaboration, featuring fintech labs, venture labs, and co-working spaces. These facilities foster creativity and teamwork, reflecting our commitment to excellence and inspiring students. The ATLAS ISME makes the perfect hub for hustlers with a swirl of multiple cultures, student clubs, a world-class campus, sports and fitness centers, cafes, fairs, events, and festivals."}
                </p>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0px] ![padding-right:0px] [width:100%]">
                <div className="[display:flex] [@media_(max-width:992px)]:[flex-direction:column] [justify-content:space-between]">
                  <a className="[border-bottom-color:rgb(137,_137,_137)] [@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [border-bottom-width:2px] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-top-color:rgb(137,_137,_137)] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [border-top-width:2px] [@media_(max-width:992px)]:[border-top-width:medium] [color:rgb(137,_137,_137)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:22px] [@media_(max-width:992px)]:[font-size:16px] [font-weight:bold] [padding-bottom:15px] [padding-left:15px] [padding-right:15px] [padding-top:15px] [text-align:center] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] [width:100%] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[color:rgb(0,_159,_224)]" href="https://youtu.be/AYguxnQWu_I?si=6pzFp6Vc7n5JUIgg" target="_blank">
                    {"Why Choose ATLAS ISME"}
                  </a>
                  {" "}
                  <a className="[border-bottom-color:rgb(137,_137,_137)] [@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [border-bottom-width:2px] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-top-color:rgb(137,_137,_137)] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [border-top-width:2px] [@media_(max-width:992px)]:[border-top-width:medium] [color:rgb(137,_137,_137)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:22px] [@media_(max-width:992px)]:[font-size:16px] [font-weight:bold] [padding-bottom:15px] [padding-left:15px] [padding-right:15px] [padding-top:15px] [text-align:center] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] [width:100%] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[color:rgb(0,_159,_224)]" href="https://youtu.be/I0E_JnJwo0g?si=w4yB-YZoTVjNtfNS" target="_blank">
                    {"ISME Student Testimonials"}
                  </a>
                  {" "}
                  <a className="[border-bottom-color:rgb(137,_137,_137)] [@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [border-bottom-width:2px] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-top-color:rgb(137,_137,_137)] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [border-top-width:2px] [@media_(max-width:992px)]:[border-top-width:medium] [color:rgb(137,_137,_137)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:22px] [@media_(max-width:992px)]:[font-size:16px] [font-weight:bold] [padding-bottom:15px] [padding-left:15px] [padding-right:15px] [padding-top:15px] [text-align:center] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] [width:100%] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[color:rgb(0,_159,_224)]" href="https://youtu.be/ZGQlNRiKE-Q?si=apC4l79spgDep1kM" target="_blank">
                    {"Graduation Day"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {" "}
      {" "}
      <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [background-color:rgb(0,_159,_224)] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:white] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:none] [font-feature-settings:revert] [font-size:18px] [@media_(max-width:992px)]:[font-size:16px] [font-variation-settings:revert] [font-weight:revert] [letter-spacing:revert] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:8px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:18px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:18px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:8px] [position:fixed] [right:-48px] [@media_(max-width:992px)]:[right:-42px] [top:50%] [transform:rotate(-90deg)] [transition-delay:0s] [transition-duration:0.3s] [transition-property:opacity] [transition-timing-function:ease] [z-index:1000]" id="goTopBtn">
        {"Apply Now"}
      </button>
      <footer>
        <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(52,_43,_124)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [--bs-text-opacity:1] ![align-items:flex-start] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
            <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:1] max-lg:![order:2] ![padding-bottom:0px] ![padding-left:0.5rem] max-lg:![padding-left:0px] ![padding-right:0.5rem] max-lg:![padding-right:0px] ![padding-top:0px] [width:33.3333%] max-lg:[width:100%]">
              <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:600] [line-height:1.2] [margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-transform:uppercase]">
                {"Eligibility Criteria"}
              </h3>
              <p className="[margin-bottom:1rem] [margin-left:revert] [margin-right:revert]">
                <strong>
                  {"BBA Programs"}
                </strong>
                <br />
                {" Minimum 50% in Class 12 (ISC/CBSE/ State Boards) IB Diploma/Certificate with 24 points (3 HL + 3 SL subjects) A Levels: Minimum grades A/B/C in 2 subjects "}
              </p>
              <p className="[margin-bottom:1rem] [margin-left:revert] [margin-right:revert]">
                <strong>
                  {"B.Sc Finance"}
                </strong>
                <br />
                {" Minimum 60% in Class 12 (ISC/CBSE/ State Boards) IB Diploma/Certificate with 24 points (3 HL + 3 SL subjects) Maths as a mandatory subject A Levels:A/B/C in 2 subjects, plus Grade A/ B in Mathematics "}
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
                <a className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] ![text-decoration-color:initial] ![text-decoration-line:none] ![text-decoration-style:initial] ![text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="tel:+918433910206">
                  {" +91 84339 10206"}
                </a>
              </p>
              <p className="![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                <a className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] ![text-decoration-color:initial] ![text-decoration-line:none] ![text-decoration-style:initial] ![text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="mailto:info@atlasuniversity.edu.in">
                  <span>
                    {"info@atlasuniversity.edu.in"}
                  </span>
                </a>
              </p>
              <p className="![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                <a className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] ![text-decoration-color:initial] ![text-decoration-line:none] ![text-decoration-style:initial] ![text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="mailto:isme@atlasuniversity.edu.in">
                  <span>
                    {"isme@atlasuniversity.edu.in"}
                  </span>
                </a>
              </p>
            </div>
            <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-left:33.3333%] max-lg:[margin-left:revert] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-bottom:0px] ![padding-left:0.5rem] max-lg:![padding-left:0px] ![padding-right:0.5rem] max-lg:![padding-right:0px] ![padding-top:0px] [width:33.3333%] max-lg:[width:100%]">
              <div className="npf_wgts" data-height="600px" data-w="370be7cef59b0556ff2f4c602236a5ae" />
            </div>
          </div>
        </div>
        <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-attachment:initial] [background-clip:initial] [background-color:initial] [background-image:url(/assets/lp/isme-ug/assets/images/text-bg/blue.jpg)] [background-origin:initial] [background-position-x:center] [background-position-y:center] [background-repeat:initial] [background-size:200%] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]" data-lpanim={"{\"delay\":\"0s\",\"direction\":\"normal\",\"duration\":\"5s\",\"fill-mode\":\"none\",\"iteration-count\":\"infinite\",\"name\":\"moveBg\",\"play-state\":\"running\",\"range-end\":\"normal\",\"range-start\":\"normal\",\"timeline\":\"auto\",\"timing-function\":\"linear\"}"}>
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
      <LpBehaviors kind="php-isme" keyframes={KEYFRAMES} />
    </div>
  );
}

/* the reference @keyframes, run through the Web Animations API by LpBehaviors */
const KEYFRAMES = {
 "moveBg": [
  {
   "offset": 0.0,
   "backgroundPosition": "0px 0px"
  },
  {
   "offset": 1.0,
   "backgroundPosition": "100% 0px"
  }
 ],
 "marqueeScroll": [
  {
   "offset": 0.0,
   "transform": "translateX(0%)"
  },
  {
   "offset": 1.0,
   "transform": "translateX(-780%)"
  }
 ],
 "scroll-left": [
  {
   "offset": 0.0,
   "transform": "translateX(0px)"
  },
  {
   "offset": 1.0,
   "transform": "translateX(-50%)"
  }
 ],
 "scroll-right": [
  {
   "offset": 0.0,
   "transform": "translateX(-50%)"
  },
  {
   "offset": 1.0,
   "transform": "translateX(0px)"
  }
 ]
};
