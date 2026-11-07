 
/*
 * https://atlasuniversity.edu.in/lp/bdes/
 * GENERATED from the production page by scratchpad/np/work/lp (compile.js -> gen.py -> emit.py):
 * every element carries the reference cascade resolved per breakpoint as Tailwind arbitrary
 * properties. `lpm-*` classes are inert markers for :hover-of-ancestor variants and behaviours;
 * `lps-*` are runtime state markers toggled by the page behaviours.
 * Reference defects: production's openNavigation() sets `.src` on the burger <img>, which is commented out on this page, so it throws after toggling the menu — here the toggle works without the error. The bottom enquiry form is the CRM iframe embed, the hero one the CRM script embed (same widget).
 * Images the reference references that production serves as soft-404s (absent from lp.zip too) are omitted (a <picture> falls back to its first live <source>): bdes/assets/images/section-seven/default/desktop.svg, bdes/assets/images/section-three/slider/1.jpg, bdes/assets/images/section-three/slider/2.jpg, bdes/assets/images/section-three/slider/3.jpg, bdes/assets/images/section-three/slider/4.jpg, bdes/assets/images/section-three/slider/5.jpg, bdes/assets/images/section-three/slider/6.jpg, bdes/assets/images/section-three/slider/7.jpg
 */
import CrmWidget from '@/components/ui/CrmWidget';
import LpBehaviors from '../runtime/LpBehaviors';

export default function Bdes() {
  return (
    <div data-lp="bdes" className="[--bs-black:#000] [--bs-black-rgb:0,_0,_0] [--bs-blue:#0d6efd] [--bs-body-bg:#fff] [--bs-body-bg-rgb:255,_255,_255] [--bs-body-color:#212529] [--bs-body-color-rgb:33,_37,_41] [--bs-body-font-family:var(--bs-font-sans-serif)] [--bs-body-font-size:1rem] [--bs-body-font-weight:400] [--bs-body-line-height:1.5] [--bs-border-color:#dee2e6] [--bs-border-color-translucent:rgba(0,_0,_0,_0.175)] [--bs-border-radius:0.375rem] [--bs-border-radius-2xl:var(--bs-border-radius-xxl)] [--bs-border-radius-lg:0.5rem] [--bs-border-radius-pill:50rem] [--bs-border-radius-sm:0.25rem] [--bs-border-radius-xl:1rem] [--bs-border-radius-xxl:2rem] [--bs-border-style:solid] [--bs-border-width:1px] [--bs-box-shadow:0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] [--bs-box-shadow-inset:inset_0_1px_2px_rgba(0,_0,_0,_0.075)] [--bs-box-shadow-lg:0_1rem_3rem_rgba(0,_0,_0,_0.175)] [--bs-box-shadow-sm:0_0.125rem_0.25rem_rgba(0,_0,_0,_0.075)] [--bs-breakpoint-lg:992px] [--bs-breakpoint-md:768px] [--bs-breakpoint-sm:576px] [--bs-breakpoint-xl:1200px] [--bs-breakpoint-xs:0] [--bs-breakpoint-xxl:1400px] [--bs-carousel-caption-color:#fff] [--bs-carousel-indicator-active-bg:#fff] [--bs-code-color:#d63384] [--bs-cyan:#0dcaf0] [--bs-danger:#dc3545] [--bs-danger-bg-subtle:#f8d7da] [--bs-danger-border-subtle:#f1aeb5] [--bs-danger-rgb:220,_53,_69] [--bs-danger-text-emphasis:#58151c] [--bs-dark:#212529] [--bs-dark-bg-subtle:#ced4da] [--bs-dark-border-subtle:#adb5bd] [--bs-dark-rgb:33,_37,_41] [--bs-dark-text-emphasis:#495057] [--bs-emphasis-color:#000] [--bs-emphasis-color-rgb:0,_0,_0] [--bs-focus-ring-color:rgba(13,_110,_253,_0.25)] [--bs-focus-ring-opacity:0.25] [--bs-focus-ring-width:0.25rem] [--bs-font-monospace:SFMono-Regular,_Menlo,_Monaco,_Consolas,_'Liberation_Mono',_'Courier_New',_monospace] [--bs-font-sans-serif:system-ui,_-apple-system,_'Segoe_UI',_Roboto,_'Helvetica_Neue',_'Noto_Sans',_'Liberation_Sans',_Arial,_sans-serif,_'Apple_Color_Emoji',_'Segoe_UI_Emoji',_'Segoe_UI_Symbol',_'Noto_Color_Emoji'] [--bs-form-invalid-border-color:#dc3545] [--bs-form-invalid-color:#dc3545] [--bs-form-valid-border-color:#198754] [--bs-form-valid-color:#198754] [--bs-gradient:linear-gradient(_180deg,_rgba(255,_255,_255,_0.15),_rgba(255,_255,_255,_0)_)] [--bs-gray:#6c757d] [--bs-gray-100:#f8f9fa] [--bs-gray-200:#e9ecef] [--bs-gray-300:#dee2e6] [--bs-gray-400:#ced4da] [--bs-gray-500:#adb5bd] [--bs-gray-600:#6c757d] [--bs-gray-700:#495057] [--bs-gray-800:#343a40] [--bs-gray-900:#212529] [--bs-gray-dark:#343a40] [--bs-green:#198754] [--bs-heading-color:inherit] [--bs-highlight-bg:#fff3cd] [--bs-highlight-color:#212529] [--bs-indigo:#6610f2] [--bs-info:#0dcaf0] [--bs-info-bg-subtle:#cff4fc] [--bs-info-border-subtle:#9eeaf9] [--bs-info-rgb:13,_202,_240] [--bs-info-text-emphasis:#055160] [--bs-light:#f8f9fa] [--bs-light-bg-subtle:#fcfcfd] [--bs-light-border-subtle:#e9ecef] [--bs-light-rgb:248,_249,_250] [--bs-light-text-emphasis:#495057] [--bs-link-color:#0d6efd] [--bs-link-color-rgb:13,_110,_253] [--bs-link-decoration:underline] [--bs-link-hover-color:#0a58ca] [--bs-link-hover-color-rgb:10,_88,_202] [--bs-orange:#fd7e14] [--bs-pink:#d63384] [--bs-primary:#0d6efd] [--bs-primary-bg-subtle:#cfe2ff] [--bs-primary-border-subtle:#9ec5fe] [--bs-primary-rgb:13,_110,_253] [--bs-primary-text-emphasis:#052c65] [--bs-purple:#6f42c1] [--bs-red:#dc3545] [--bs-secondary:#6c757d] [--bs-secondary-bg:#e9ecef] [--bs-secondary-bg-rgb:233,_236,_239] [--bs-secondary-bg-subtle:#e2e3e5] [--bs-secondary-border-subtle:#c4c8cb] [--bs-secondary-color:rgba(33,_37,_41,_0.75)] [--bs-secondary-color-rgb:33,_37,_41] [--bs-secondary-rgb:108,_117,_125] [--bs-secondary-text-emphasis:#2b2f32] [--bs-success:#198754] [--bs-success-bg-subtle:#d1e7dd] [--bs-success-border-subtle:#a3cfbb] [--bs-success-rgb:25,_135,_84] [--bs-success-text-emphasis:#0a3622] [--bs-teal:#20c997] [--bs-tertiary-bg:#f8f9fa] [--bs-tertiary-bg-rgb:248,_249,_250] [--bs-tertiary-color:rgba(33,_37,_41,_0.5)] [--bs-tertiary-color-rgb:33,_37,_41] [--bs-warning:#ffc107] [--bs-warning-bg-subtle:#fff3cd] [--bs-warning-border-subtle:#ffe69c] [--bs-warning-rgb:255,_193,_7] [--bs-warning-text-emphasis:#664d03] [--bs-white:#fff] [--bs-white-rgb:255,_255,_255] [--bs-yellow:#ffc107] [--swiper-navigation-size:70px] [@media_(max-width:992px)]:[--swiper-navigation-size:40px] [--swiper-theme-color:#007aff] [-webkit-font-smoothing:auto] [-webkit-tap-highlight-color:transparent] [background-color:var(--bs-body-bg)] [color:var(--bs-body-color)] [font-family:'LP27_Poppins',sans-serif] [font-size:var(--bs-body-font-size)] [font-weight:var(--bs-body-font-weight)] [line-height:var(--bs-body-line-height)] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [padding-top:56px] [@media_(min-width:993px)_and_(max-width:1200px)]:[padding-top:64px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-top:68px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-top:64px] [@media_(min-width:1501px)]:[padding-top:86px] [text-align:var(--bs-body-text-align)] [text-size-adjust:100%]">
      {" "}
      {" "}
      {" "}
      {" "}
      {" "}
      {" "}
      {" "}
      {" "}
      <header className="[--bs-bg-opacity:1] ![align-items:center] ![background-color:rgba(var(--bs-light-rgb),_var(--bs-bg-opacity))] [box-shadow:rgba(0,_0,_0,_0.19)_1px_0px_4px_0px] ![display:flex] [height:56px] [@media_(min-width:993px)_and_(max-width:1200px)]:[height:64px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[height:68px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[height:64px] [@media_(min-width:1501px)]:[height:86px] ![justify-content:space-between] [left:0px] ![padding-bottom:1rem] max-lg:![padding-bottom:0.25rem] ![padding-left:1rem] max-lg:![padding-left:0.25rem] ![padding-right:1rem] max-lg:![padding-right:0.25rem] ![padding-top:1rem] max-lg:![padding-top:0.25rem] [position:fixed] [top:0px] [width:100%] [z-index:2]">
        <div>
          {" "}
          <svg className="[display:revert] [height:auto] [max-width:100%] [width:242px] [@media_(max-width:992px)]:[width:170px]" width="496" height="108" viewBox="0 0 496 108" fill="none" xmlns="http://www.w3.org/2000/svg">
            {" "}
            <path d="M73.9806 85.9885L37.0196 64.6671L0.0585938 85.9885L37.0196 107.427L73.9806 85.9885Z" fill="#AEAACB" />
            {" "}
            <path d="M0.0585938 21.3214V64.0228L37.0196 85.3442L73.9806 64.0228V21.3214L37.0196 0L0.0585938 21.3214Z" fill="#342B7C" />
            {" "}
            <path d="M73.9806 21.3214V64.0228L37.0196 85.3442V42.76L0 21.3214L37.0196 0L73.9806 21.3214Z" fill="#3CA7B6" />
            {" "}
            <path d="M55.5293 32.0406L37.0195 85.4028L73.9806 64.0813L55.5293 32.0406ZM57.1694 49.7304L63.847 61.3283L50.4333 69.0602L57.1694 49.7304Z" fill="#342B7C" />
            {" "}
            <path d="M335.871 69.4703V14.6438H341.26V69.4703H335.871Z" fill="#E12A7B" />
            {" "}
            <path d="M242.678 20.1499L220.771 64.0228H264.585L242.678 20.1499ZM242.678 40.5927L249.824 54.8265H235.59L242.678 40.5927Z" fill="#342B7C" />
            {" "}
            <path d="M117.853 20.1499L95.8877 64.0228H139.761L117.853 20.1499ZM117.853 40.5927L125 54.8265H110.766L117.853 40.5927Z" fill="#342B7C" />
            {" "}
            <path d="M160.614 29.9906V64.0228H151.242V29.9906H138.238V21.3214H173.617V29.9906H160.614Z" fill="#342B7C" />
            {" "}
            <path d="M183.458 64.0228V21.3214H192.83V55.4708H214.093V64.0228H183.458Z" fill="#342B7C" />
            {" "}
            <path d="M287.312 64.6086C280.869 64.6086 274.308 62.3242 269.212 57.7553L274.777 51.1363C278.643 54.2993 282.626 56.2909 287.546 56.2909C291.412 56.2909 293.697 54.7679 293.697 52.2492V52.132C293.697 49.7305 292.232 48.559 285.086 46.6845C276.476 44.5173 270.969 42.1157 270.969 33.6223V33.5051C270.969 25.7732 277.178 20.6185 285.906 20.6185C292.115 20.6185 297.445 22.5515 301.78 26.066L296.918 33.1536C293.111 30.5178 289.421 28.9362 285.848 28.9362C282.274 28.9362 280.341 30.5763 280.341 32.6265V32.7436C280.341 35.5552 282.157 36.4339 289.538 38.3669C298.207 40.6513 303.069 43.7558 303.069 51.1948V51.312C303.01 59.8054 296.508 64.6086 287.312 64.6086Z" fill="#342B7C" />
            {" "}
            <path d="M382.38 19.2712H374.355V64.9014H382.38V19.2712Z" fill="#E12A7B" />
            {" "}
            <path d="M383.258 65.78H373.476V18.3926H383.258V65.78ZM375.234 64.0227H381.501V20.1498H375.234V64.0227Z" fill="#E12A7B" />
            {" "}
            <path d="M494.961 19.2712H486.937V64.9014H494.961V19.2712Z" fill="#E12A7B" />
            {" "}
            <path d="M495.84 65.78H486.058V18.3926H495.84V65.78ZM487.815 64.0227H494.083V20.1498H487.815V64.0227Z" fill="#E12A7B" />
            {" "}
            <path d="M455.482 19.2712H440.604L429.943 48.6175H438.495V64.9014H455.54C469.891 64.9014 479.79 54.9436 479.79 42.057V41.9399C479.732 29.1119 469.833 19.2712 455.482 19.2712ZM471.297 42.1742C471.297 51.1362 465.03 57.5795 455.482 57.5795H446.461V48.5589H438.436L446.461 26.5346H455.423C465.029 26.5346 471.238 33.095 471.238 42.057V42.1742H471.297Z" fill="#E12A7B" />
            {" "}
            <path d="M455.482 65.78H437.558V49.4375H428.654L439.959 18.334H455.423C470.008 18.334 480.552 28.2332 480.552 41.8813V41.9984C480.61 55.8222 470.008 65.78 455.482 65.78ZM439.315 64.0227H455.482C469.012 64.0227 478.853 54.7678 478.853 42.057V41.9398C478.853 29.2876 469.012 20.1498 455.482 20.1498H441.248L431.231 47.7388H437.909L445.934 25.7145H455.54C465.381 25.7145 472.234 32.4506 472.234 42.1156V42.2327C472.234 51.8391 465.381 58.5166 455.54 58.5166H445.582V49.4375H439.315V64.0227ZM447.34 56.7008H455.482C464.444 56.7008 470.418 50.8433 470.418 42.1741V42.057C470.418 33.4464 464.268 27.4132 455.482 27.4132H447.105L439.725 47.6802H447.34V56.7008Z" fill="#E12A7B" />
            {" "}
            <path d="M394.036 51.8392C394.387 52.132 395.5 53.0692 395.793 53.3621C399.835 56.6423 403.994 58.4582 409.207 58.4582C414.186 58.4582 417.29 56.1737 417.29 52.7178V52.6006C417.29 49.3204 415.475 47.5632 406.981 45.6302C397.258 43.2872 391.81 40.417 391.81 31.9821V31.865C391.81 24.0159 398.312 18.627 407.391 18.627C414.069 18.627 418.989 20.6771 423.148 23.723L420.512 31.0449C420.336 30.9278 419.341 30.1663 419.165 30.0491C415.24 27.2375 411.316 25.7146 407.274 25.7146C402.588 25.7146 399.835 28.1162 399.835 31.1035V31.2206C399.835 34.7352 401.944 36.3167 410.671 38.3668C420.336 40.7098 425.315 44.1658 425.315 51.722V51.8392C425.315 60.3911 418.579 65.4872 409.031 65.4872C405.165 65.4872 401.358 64.7257 397.843 63.2028C395.559 62.207 393.333 60.9183 391.283 59.2782L394.036 51.8392Z" fill="#E12A7B" />
            {" "}
            <path d="M409.031 66.4244C404.99 66.4244 401.124 65.6629 397.492 64.0813C395.091 63.027 392.806 61.6798 390.756 60.0396L390.287 59.6296L393.685 50.3161L394.622 51.1362C394.973 51.4291 396.028 52.3663 396.379 52.6006C400.597 55.9979 404.58 57.5209 409.266 57.5209C413.659 57.5209 416.471 55.5879 416.471 52.6592V52.542C416.471 50.2576 415.768 48.5003 406.864 46.3916C396.789 43.9314 390.99 40.8269 390.99 31.9235V31.8063C390.99 23.4887 397.785 17.6897 407.45 17.6897C413.659 17.6897 418.931 19.3884 423.734 22.9615L424.261 23.3715L420.981 32.3921L420.044 31.6892C419.985 31.6306 419.751 31.4549 419.458 31.2792C419.165 31.0449 418.814 30.8106 418.696 30.6934C414.83 27.8818 411.082 26.5346 407.333 26.5346C403.408 26.5346 400.772 28.3504 400.772 31.0449V31.162C400.772 33.7979 401.768 35.3209 410.906 37.4882C418.872 39.4211 426.253 42.4671 426.253 51.722V51.8391C426.194 60.7426 419.458 66.4244 409.031 66.4244ZM392.337 59.0439C394.153 60.4497 396.145 61.5626 398.195 62.4998C401.592 63.9642 405.224 64.6671 409.031 64.6671C418.404 64.6671 424.437 59.6882 424.437 51.8977V51.7805C424.437 45.2201 420.512 41.7056 410.437 39.2454C402.354 37.3124 398.957 35.7895 398.957 31.2206V31.1034C398.957 27.4132 402.354 24.8359 407.274 24.8359C411.374 24.8359 415.475 26.3003 419.634 29.3462C419.692 29.4048 419.868 29.5219 420.044 29.6391L422.094 24.0744C417.759 20.9699 413.073 19.5055 407.391 19.5055C398.722 19.5055 392.689 24.6016 392.689 31.8649V31.9821C392.689 39.8312 397.609 42.4085 407.216 44.7515C415.533 46.6845 418.169 48.5589 418.169 52.6006V52.7177C418.169 56.7594 414.655 59.3367 409.207 59.3367C404.111 59.3367 399.777 57.6966 395.208 54.0064C395.032 53.8892 394.739 53.5964 394.388 53.3035L392.337 59.0439Z" fill="#E12A7B" />
            {" "}
          </svg>
        </div>
        <nav className="[@media_(max-width:992px)]:[background-color:rgb(255,_255,_255)] [@media_(max-width:992px)]:[height:35%] [@media_(max-width:992px)]:[left:-100%] [@media_(max-width:992px)]:[position:fixed] [@media_(max-width:992px)]:[top:70px] [@media_(max-width:992px)]:[transition-delay:0s] [@media_(max-width:992px)]:[transition-duration:0.3s] [@media_(max-width:992px)]:[transition-property:left] [@media_(max-width:992px)]:[transition-timing-function:ease-in-out] [&.lps-nav]:[left:revert] [@media_(max-width:992px)]:[&.lps-nav]:[left:0%]" data-lpt="nav">
          <ul className="[align-items:center] [@media_(max-width:992px)]:[box-shadow:rgba(0,_0,_0,_0.19)_1px_0px_4px_0px] [display:flex] [@media_(max-width:992px)]:[flex-direction:column] [@media_(max-width:992px)]:[height:100%] [@media_(max-width:992px)]:[justify-content:space-evenly] [@media_(max-width:992px)]:[padding-left:12px] [@media_(max-width:992px)]:[padding-right:12px]">
            <li className="![border-bottom-color:currentcolor] ![border-bottom-style:none] ![border-bottom-width:0px] ![border-image-outset:initial] ![border-image-repeat:initial] ![border-image-slice:initial] ![border-image-source:initial] ![border-image-width:initial] ![border-left-color:currentcolor] ![border-left-style:none] ![border-left-width:0px] ![border-right-color:currentcolor] ![border-right-style:none] ![border-right-width:0px] ![border-top-color:currentcolor] ![border-top-style:none] ![border-top-width:0px] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(225,_42,_123)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#specialisations">
                {"Specialisations"}
              </a>
            </li>
            <li className="[@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-left-color:rgb(225,_42,_123)] [@media_(max-width:992px)]:[border-left-color:currentcolor] [@media_(max-width:992px)]:[border-left-style:none] [border-left-width:3px] [@media_(max-width:992px)]:[border-left-width:medium] [@media_(max-width:992px)]:[border-right-color:currentcolor] [@media_(max-width:992px)]:[border-right-style:none] [@media_(max-width:992px)]:[border-right-width:medium] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [@media_(max-width:992px)]:[border-top-width:medium] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(225,_42,_123)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#success-stories">
                {"Success Stories"}
              </a>
            </li>
            <li className="[@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-left-color:rgb(225,_42,_123)] [@media_(max-width:992px)]:[border-left-color:currentcolor] [@media_(max-width:992px)]:[border-left-style:none] [border-left-width:3px] [@media_(max-width:992px)]:[border-left-width:medium] [@media_(max-width:992px)]:[border-right-color:currentcolor] [@media_(max-width:992px)]:[border-right-style:none] [@media_(max-width:992px)]:[border-right-width:medium] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [@media_(max-width:992px)]:[border-top-width:medium] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(225,_42,_123)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#why-isdi">
                {"Why ISDI?"}
              </a>
            </li>
            <li className="[@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-left-color:rgb(225,_42,_123)] [@media_(max-width:992px)]:[border-left-color:currentcolor] [@media_(max-width:992px)]:[border-left-style:none] [border-left-width:3px] [@media_(max-width:992px)]:[border-left-width:medium] [@media_(max-width:992px)]:[border-right-color:currentcolor] [@media_(max-width:992px)]:[border-right-style:none] [@media_(max-width:992px)]:[border-right-width:medium] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [@media_(max-width:992px)]:[border-top-width:medium] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(225,_42,_123)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#placements">
                {"Placements"}
              </a>
            </li>
            <li className="[@media_(max-width:992px)]:[border-bottom-color:currentcolor] [@media_(max-width:992px)]:[border-bottom-style:none] [@media_(max-width:992px)]:[border-bottom-width:medium] [border-left-color:rgb(225,_42,_123)] [@media_(max-width:992px)]:[border-left-color:currentcolor] [@media_(max-width:992px)]:[border-left-style:none] [border-left-width:3px] [@media_(max-width:992px)]:[border-left-width:medium] [@media_(max-width:992px)]:[border-right-color:currentcolor] [@media_(max-width:992px)]:[border-right-style:none] [@media_(max-width:992px)]:[border-right-width:medium] [@media_(max-width:992px)]:[border-top-color:currentcolor] [@media_(max-width:992px)]:[border-top-style:none] [@media_(max-width:992px)]:[border-top-width:medium] [@media_(max-width:992px)]:[margin-bottom:0px] [@media_(max-width:992px)]:[margin-left:0px] [@media_(max-width:992px)]:[margin-right:0px] [@media_(max-width:992px)]:[margin-top:0px] [padding-bottom:0px] [padding-left:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-left:20px] [@media_(min-width:1501px)]:[padding-left:32px] [padding-right:6px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[padding-right:20px] [@media_(min-width:1501px)]:[padding-right:32px] [padding-top:0px]">
              <a className="[color:rgb(225,_42,_123)] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [font-size:14px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:16px] [@media_(min-width:1501px)]:[font-size:18px] [font-weight:500] [text-decoration-color:initial] [text-decoration-line:none] [text-decoration-style:initial] [text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="#about-isdi">
                {"About ISDI"}
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
          {" "}
          <svg className="[@media_(max-width:992px)]:[cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:revert] [@media_(max-width:992px)]:[height:auto] [@media_(max-width:992px)]:[max-width:100%] [@media_(max-width:992px)]:[width:40px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {" "}
            <rect width="24" height="24" fill="#2D257D" />
            {" "}
            <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {" "}
            <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {" "}
            <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {" "}
          </svg>
        </div>
      </header>
      <main>
        <section>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![position:relative] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [display:flex] [flex-wrap:wrap] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <div className="[aspect-ratio:16_/_6] [@media_(max-width:992px)]:[aspect-ratio:9_/_9] [width:100%]">
                  <picture>
                    <source media="(max-width: 992px)" srcSet="/assets/lp/bdes/assets/images/hero-banner/hero-mobile.webp" />
                    {" "}
                    <source media="(min-width: 993px)" srcSet="/assets/lp/bdes/assets/images/hero-banner/hero-desktop.webp" />
                    {" "}
                    <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/hero-banner/defualt/hero-desktop.webp" alt="b.des Banner" width="1920" height="800" fetchPriority="high" />
                  </picture>
                </div>
              </div>
            </div>
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [height:100%] [@media_(max-width:992px)]:[height:unset] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] [padding-bottom:0px] [padding-left:0px] [@media_(min-width:993px)_and_(max-width:1200px)]:[padding-left:60px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-left:70px] [@media_(min-width:1367px)]:[padding-left:120px] [padding-right:0px] [padding-top:0px] [position:absolute] [top:0px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] max-lg:![padding-bottom:0.5rem] ![padding-left:0px] max-lg:![padding-left:calc(var(--bs-gutter-x)_*_0.5)] ![padding-right:0px] max-lg:![padding-right:calc(var(--bs-gutter-x)_*_0.5)] ![padding-top:0px] max-lg:![padding-top:0.5rem] [width:50%] max-lg:[width:100%]">
                {" "}
                <h1 className="[-webkit-text-stroke-color:rgb(0,_0,_0)] [-webkit-text-stroke-width:1.2px] [color:rgb(225,_42,_123)] [font-family:'LP27_Montserrat',sans-serif] [font-size:44px] [@media_(min-width:993px)_and_(max-width:1200px)]:[font-size:42px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[font-size:50px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[font-size:60px] [@media_(min-width:1501px)]:[font-size:76px] [font-weight:bold] [line-height:38px] [@media_(min-width:993px)_and_(max-width:1200px)]:[line-height:36px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[line-height:44px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[line-height:52px] [@media_(min-width:1501px)]:[line-height:68px] [margin-bottom:10px] [@media_(min-width:993px)_and_(max-width:1200px)]:[margin-bottom:16px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[margin-bottom:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[margin-bottom:30px] [@media_(min-width:1501px)]:[margin-bottom:50px] [@media_(max-width:992px)]:[margin-top:26px] [text-transform:uppercase]">
                  {"India's "}
                  <br />
                  {"Global "}
                  <br />
                  {" Design"}
                  <br />
                  {" School"}
                </h1>
                <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Montserrat',sans-serif] [font-size:22px] [@media_(min-width:993px)_and_(max-width:1200px)]:[font-size:26px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[font-size:36px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[font-size:34px] [@media_(min-width:1501px)]:[font-size:46px] [font-weight:bold] [line-height:24px] [@media_(min-width:993px)_and_(max-width:1200px)]:[line-height:28px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[line-height:38px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[line-height:34px] [@media_(min-width:1501px)]:[line-height:52px] [@media_(min-width:993px)_and_(max-width:1200px)]:[margin-bottom:16px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[margin-bottom:18px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[margin-bottom:30px] [@media_(min-width:1501px)]:[margin-bottom:50px] [text-transform:uppercase]">
                  {"bachelors "}
                  <br />
                  {"of Design"}
                  <br />
                  {" "}
                  <span className="[color:rgb(225,_42,_123)]">
                    {"(B.Des)"}
                  </span>
                </p>
                <p className="[color:rgb(52,_43,_124)] ![display:block] max-lg:![display:none] [font-size:30px] [@media_(min-width:1201px)_and_(max-width:1500px)]:[font-size:36px] [@media_(min-width:1501px)]:[font-size:44px] [font-weight:bold] [line-height:32px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[line-height:42px] [@media_(min-width:1367px)_and_(max-width:1500px)]:[line-height:38px] [@media_(min-width:1501px)]:[line-height:44px] [text-transform:uppercase]">
                  <span className="[color:rgb(225,_42,_123)]">
                    {" admissions open"}
                  </span>
                  {" "}
                  <br className="![display:block] max-lg:![display:none]" />
                  {"for 2026"}
                </p>
              </div>
            </div>
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [display:flex] [flex-wrap:wrap] [height:100%] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] [padding-bottom:0px] [padding-left:0px] [padding-right:0px] [@media_(min-width:993px)_and_(max-width:1200px)]:[padding-right:60px] [@media_(min-width:1201px)_and_(max-width:1366px)]:[padding-right:70px] [@media_(min-width:1367px)]:[padding-right:120px] [padding-top:0px] [position:absolute] [@media_(max-width:992px)]:[position:unset] [top:0px] ![width:100%]">
              <p className="[background-color:rgb(225,_42,_123)] [@media_(max-width:992px)]:[color:rgb(255,_255,_255)] ![display:none] max-lg:![display:block] [flex-shrink:0] [@media_(max-width:992px)]:[font-size:32px] [@media_(max-width:992px)]:[font-weight:bold] [margin-bottom:1rem] [margin-left:revert] [margin-right:revert] [margin-top:var(--bs-gutter-y)] [max-width:100%] [padding-left:calc(var(--bs-gutter-x)_*_0.5)] [padding-right:calc(var(--bs-gutter-x)_*_0.5)] [@media_(max-width:992px)]:[text-align:center] [@media_(max-width:992px)]:[text-transform:uppercase] [width:100%]">
                {"admissions "}
                <br className="![display:block] max-lg:![display:none]" />
                <span>
                  {" open"}
                </span>
                {" "}
                <br className="![display:block] max-lg:![display:none]" />
                {"for 2026"}
              </p>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-left:66.6667%] max-lg:[margin-left:revert] [margin-top:var(--bs-gutter-y)] [max-width:100%] [padding-left:calc(var(--bs-gutter-x)_*_0.5)] [padding-right:calc(var(--bs-gutter-x)_*_0.5)] [width:33.3333%] max-lg:[width:100%]" id="get-info">
                <div className="[min-height:500px] [&_.atlas-embed-wrap_iframe]:[border-bottom-color:currentcolor] [&_.atlas-embed-wrap_iframe]:[border-bottom-style:none] [&_.atlas-embed-wrap_iframe]:[border-left-color:currentcolor] [&_.atlas-embed-wrap_iframe]:[border-left-style:none] [&_.atlas-embed-wrap_iframe]:[border-right-color:currentcolor] [&_.atlas-embed-wrap_iframe]:[border-right-style:none] [&_.atlas-embed-wrap_iframe]:[border-top-color:currentcolor] [&_.atlas-embed-wrap_iframe]:[border-top-style:none] [&_.atlas-embed-wrap_iframe]:[display:revert] [&_.atlas-embed-wrap_iframe]:[vertical-align:revert]">
                  {" "}
                  <CrmWidget mode="script" src="https://crm.atlasskilltech.app/widgets/6a3e58f0b9dfccd3a4454dcd/embed.js" hostClassName="contents" scriptAttrs={{"data-atlas-width": "100%", "data-atlas-height": "650"}} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(52,_43,_124)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Montserrat',sans-serif] [font-size:45px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2] [text-transform:uppercase]">
                  {" 7 Bachelor of Design "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:28px] [text-transform:uppercase]">
                    {"(B.Des) Programs"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:center] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/pink-square.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/pink-square.webp" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/pink-square.webp" alt="Red square decorative shape" width="124" height="106" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:1rem] ![padding-right:1rem] [width:100%]">
                <div className="[column-gap:10px] [display:grid] [grid-template-columns:repeat(7,_1fr)] [@media_(max-width:992px)]:[grid-template-columns:repeat(2,_1fr)] [grid-template-rows:repeat(1,_auto)] [@media_(max-width:992px)]:[grid-template-rows:repeat(3,_auto)] [row-gap:10px]">
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Montserrat',sans-serif] [font-size:18px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Animation & VFX"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Montserrat',sans-serif] [font-size:18px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Interior Design"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Montserrat',sans-serif] [font-size:18px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Communication Design"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Montserrat',sans-serif] [font-size:18px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Product Design"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Montserrat',sans-serif] [font-size:18px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Fashion Communication & Styling"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Montserrat',sans-serif] [font-size:18px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Strategic Design & Management"}
                    </p>
                  </div>
                  <div className="[align-content:center] [border-bottom-color:rgb(0,_0,_0)] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] [border-top-width:1px] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [@media_(max-width:992px)]:[grid-column-end:3] [@media_(max-width:992px)]:[grid-column-start:1] [padding-bottom:10px] [padding-left:10px] [padding-right:10px] [padding-top:10px]">
                    <p className="[color:rgb(52,_43,_124)] [font-family:'LP27_Montserrat',sans-serif] [font-size:18px] [@media_(max-width:992px)]:[font-size:14px] [font-weight:bold]">
                      {"Fashion Design"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="specialisations">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(52,_43,_124)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Montserrat',sans-serif] [font-size:45px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2] [text-transform:uppercase]">
                  {" DISCOVER YOUR OWN PATH "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:28px] [text-transform:uppercase]">
                    {"MULTIDISCIPLINARY SPECIALISATIONS"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:left] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/pink-square.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/pink-square.webp" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/pink-square.webp" alt="Red square decorative shape" width="124" height="106" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
                <p className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                  {"Explore diverse electives in the foundation year and then choose your specialisation"}
                </p>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-image:url(/assets/lp/btech/assets/images/section-four/bg.webp)] [background-repeat:no-repeat] [background-size:cover] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-left:0px] max-lg:![padding-left:1rem] ![padding-right:0px] max-lg:![padding-right:1rem] ![width:100%]">
              <div className="lpm-mySwiperv2 lpm-swiper [display:block] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [list-style-image:initial] [list-style-position:initial] [list-style-type:none] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] [max-width:100%] [overflow-x:hidden] [overflow-y:hidden] ![padding-bottom:0px] max-lg:![padding-bottom:3rem] ![padding-left:0px] ![padding-right:0px] [padding-top:0px] [position:relative] [touch-action:pan-y] [width:100%] [z-index:1]">
                <div className="lpm-swiper-wrapper [box-sizing:content-box] [display:flex] [height:100%] [position:relative] [transform:translate3d(0px,_0px,_0px)] [transition-property:transform] [transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial)] [width:100%] [z-index:1]">
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <div className="[--bs-bg-opacity:1] [--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:center] ![background-color:rgba(var(--bs-white-rgb),_var(--bs-bg-opacity))] [display:flex] [flex-wrap:wrap] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] ![width:100%]">
                      <div className="[background-color:rgb(255,_255,_255)] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [@media_(max-width:992px)]:[height:350px] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:1] max-lg:![order:2] [padding-bottom:0px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:70px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:14px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px] [@media_(max-width:992px)]:[padding-top:10px] [width:58.3333%] max-lg:[width:100%]">
                        <h3 className="[color:rgb(225,_42,_123)] [font-size:60px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          {"Animation & VFX"}
                        </h3>
                        <p className="[color:rgb(52,_43,_124)] [font-weight:600] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial]">
                          {"4 Year | Full Time"}
                        </p>
                        <picture className="[display:flex] [justify-content:end] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [margin-left:0px] [margin-right:0px] [margin-top:0px]">
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/pink-squarev2.webp" type="image/webp" />
                          {" "}
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" type="image/png" />
                          {" "}
                          {" "}
                          <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" alt="Red square decorative shape" width="75" height="64" loading="lazy" decoding="async" fetchPriority="low" />
                        </picture>
                        <h4 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          <span className="[-webkit-text-stroke-color:rgb(0,_0,_0)] [-webkit-text-stroke-width:1.2px] [color:transparent]">
                            {"CAREER"}
                          </span>
                          {" "}
                          <span>
                            {"Pathways"}
                          </span>
                        </h4>
                        <ul className="[column-count:2] [@media_(max-width:992px)]:[column-count:1]">
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"3D Designer and Modelling"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"2D Designer and Modelling"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Interactive Design"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Games Design"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Animation"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Special FX Creation"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Character Design"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Lighting Artist"}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:41.6667%] max-lg:[width:100%]">
                        <div className="[aspect-ratio:3_/_2] [width:100%]">
                          <picture>
                            {" "}
                            <source srcSet="/assets/lp/bdes/assets/images/section-three/slider/1.webp" type="image/webp" />
                            {" "}
                            {" "}
                            {" "}
                            {" "}
                            <img className="[display:revert] [@media_(max-width:992px)]:[display:block] [@media_(max-width:992px)]:[height:100%] [@media_(max-width:992px)]:[object-fit:cover] ![width:100%]" src="/assets/lp/bdes/assets/images/section-three/slider/1.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <div className="[--bs-bg-opacity:1] [--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:center] ![background-color:rgba(var(--bs-white-rgb),_var(--bs-bg-opacity))] [display:flex] [flex-wrap:wrap] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] ![width:100%]">
                      <div className="[background-color:rgb(255,_255,_255)] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [@media_(max-width:992px)]:[height:350px] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:1] max-lg:![order:2] [padding-bottom:0px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:70px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:14px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px] [@media_(max-width:992px)]:[padding-top:10px] [width:58.3333%] max-lg:[width:100%]">
                        <h3 className="[color:rgb(225,_42,_123)] [font-size:60px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          {"Interior Design"}
                        </h3>
                        <p className="[color:rgb(52,_43,_124)] [font-weight:600] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial]">
                          {"4 Year | Full Time"}
                        </p>
                        <picture className="[display:flex] [justify-content:end] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [margin-left:0px] [margin-right:0px] [margin-top:0px]">
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/pink-squarev2.webp" type="image/webp" />
                          {" "}
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" type="image/png" />
                          {" "}
                          {" "}
                          <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" alt="Red square decorative shape" width="75" height="64" loading="lazy" decoding="async" fetchPriority="low" />
                        </picture>
                        <h4 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          <span className="[-webkit-text-stroke-color:rgb(0,_0,_0)] [-webkit-text-stroke-width:1.2px] [color:transparent]">
                            {"CAREER"}
                          </span>
                          {" "}
                          <span>
                            {"Pathways"}
                          </span>
                        </h4>
                        <ul className="[column-count:2] [@media_(max-width:992px)]:[column-count:1]">
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Interior Design"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Sustainable Design"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Set Design"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Exhibition Design"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Consulting"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Urban Planning"}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:41.6667%] max-lg:[width:100%]">
                        <div className="[aspect-ratio:3_/_2] [width:100%]">
                          <picture>
                            {" "}
                            <source srcSet="/assets/lp/bdes/assets/images/section-three/slider/2.webp" type="image/webp" />
                            {" "}
                            {" "}
                            {" "}
                            {" "}
                            <img className="[display:revert] [@media_(max-width:992px)]:[display:block] [@media_(max-width:992px)]:[height:100%] [@media_(max-width:992px)]:[object-fit:cover] ![width:100%]" src="/assets/lp/bdes/assets/images/section-three/slider/2.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <div className="[--bs-bg-opacity:1] [--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:center] ![background-color:rgba(var(--bs-white-rgb),_var(--bs-bg-opacity))] [display:flex] [flex-wrap:wrap] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] ![width:100%]">
                      <div className="[background-color:rgb(255,_255,_255)] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [@media_(max-width:992px)]:[height:350px] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:1] max-lg:![order:2] [padding-bottom:0px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:70px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:14px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px] [@media_(max-width:992px)]:[padding-top:10px] [width:58.3333%] max-lg:[width:100%]">
                        <h3 className="[color:rgb(225,_42,_123)] [font-size:60px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          {"Communication Design"}
                        </h3>
                        <p className="[color:rgb(52,_43,_124)] [font-weight:600] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial]">
                          {"4 Year | Full Time"}
                        </p>
                        <picture className="[display:flex] [justify-content:end] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [margin-left:0px] [margin-right:0px] [margin-top:0px]">
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/pink-squarev2.webp" type="image/webp" />
                          {" "}
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" type="image/png" />
                          {" "}
                          {" "}
                          <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" alt="Red square decorative shape" loading="lazy" width="75" height="64" decoding="async" fetchPriority="low" />
                        </picture>
                        <h4 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          <span className="[-webkit-text-stroke-color:rgb(0,_0,_0)] [-webkit-text-stroke-width:1.2px] [color:transparent]">
                            {"CAREER"}
                          </span>
                          {" "}
                          <span>
                            {"Pathways"}
                          </span>
                        </h4>
                        <ul className="[column-count:2] [@media_(max-width:992px)]:[column-count:1]">
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Graphic Design"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Branding"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Advertising"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Publishing"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Motion Design"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Interaction Design"}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:41.6667%] max-lg:[width:100%]">
                        <div className="[aspect-ratio:3_/_2] [width:100%]">
                          <picture>
                            {" "}
                            <source srcSet="/assets/lp/bdes/assets/images/section-three/slider/3.webp" type="image/webp" />
                            {" "}
                            {" "}
                            {" "}
                            {" "}
                            <img className="[display:revert] [@media_(max-width:992px)]:[display:block] [@media_(max-width:992px)]:[height:100%] [@media_(max-width:992px)]:[object-fit:cover] ![width:100%]" src="/assets/lp/bdes/assets/images/section-three/slider/3.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <div className="[--bs-bg-opacity:1] [--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:center] ![background-color:rgba(var(--bs-white-rgb),_var(--bs-bg-opacity))] [display:flex] [flex-wrap:wrap] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] ![width:100%]">
                      <div className="[background-color:rgb(255,_255,_255)] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [@media_(max-width:992px)]:[height:350px] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:1] max-lg:![order:2] [padding-bottom:0px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:70px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:14px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px] [@media_(max-width:992px)]:[padding-top:10px] [width:58.3333%] max-lg:[width:100%]">
                        <h3 className="[color:rgb(225,_42,_123)] [font-size:60px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          {"Product Design"}
                        </h3>
                        <p className="[color:rgb(52,_43,_124)] [font-weight:600] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial]">
                          {"4 Year | Full Time"}
                        </p>
                        <picture className="[display:flex] [justify-content:end] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [margin-left:0px] [margin-right:0px] [margin-top:0px]">
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/pink-squarev2.webp" type="image/webp" />
                          {" "}
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" type="image/png" />
                          {" "}
                          {" "}
                          <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" alt="Red square decorative shape" loading="lazy" width="75" height="64" decoding="async" fetchPriority="low" />
                        </picture>
                        <h4 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          <span className="[-webkit-text-stroke-color:rgb(0,_0,_0)] [-webkit-text-stroke-width:1.2px] [color:transparent]">
                            {"CAREER"}
                          </span>
                          {" "}
                          <span>
                            {"Pathways"}
                          </span>
                        </h4>
                        <ul className="[column-count:2] [@media_(max-width:992px)]:[column-count:1]">
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"UI UX Designer"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Interaction Designer"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Urban Designer"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Industrial Designer"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Automobile Designer"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Humanitarian and Service Design"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Health Design"}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:41.6667%] max-lg:[width:100%]">
                        <div className="[aspect-ratio:3_/_2] [width:100%]">
                          <picture>
                            {" "}
                            <source srcSet="/assets/lp/bdes/assets/images/section-three/slider/4.webp" type="image/webp" />
                            {" "}
                            {" "}
                            {" "}
                            {" "}
                            <img className="[display:revert] [@media_(max-width:992px)]:[display:block] [@media_(max-width:992px)]:[height:100%] [@media_(max-width:992px)]:[object-fit:cover] ![width:100%]" src="/assets/lp/bdes/assets/images/section-three/slider/4.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <div className="[--bs-bg-opacity:1] [--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:center] ![background-color:rgba(var(--bs-white-rgb),_var(--bs-bg-opacity))] [display:flex] [flex-wrap:wrap] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] ![width:100%]">
                      <div className="[background-color:rgb(255,_255,_255)] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [@media_(max-width:992px)]:[height:350px] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:1] max-lg:![order:2] [padding-bottom:0px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:70px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:14px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px] [@media_(max-width:992px)]:[padding-top:10px] [width:58.3333%] max-lg:[width:100%]">
                        <h3 className="[color:rgb(225,_42,_123)] [font-size:60px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          {"Fashion Communication & Styling"}
                        </h3>
                        <p className="[color:rgb(52,_43,_124)] [font-weight:600] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial]">
                          {"4 Year | Full Time"}
                        </p>
                        <picture className="[display:flex] [justify-content:end] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [margin-left:0px] [margin-right:0px] [margin-top:0px]">
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/pink-squarev2.webp" type="image/webp" />
                          {" "}
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" type="image/png" />
                          {" "}
                          {" "}
                          <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" alt="Red square decorative shape" width="75" height="64" loading="lazy" decoding="async" fetchPriority="low" />
                        </picture>
                        <h4 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          <span className="[-webkit-text-stroke-color:rgb(0,_0,_0)] [-webkit-text-stroke-width:1.2px] [color:transparent]">
                            {"CAREER"}
                          </span>
                          {" "}
                          <span>
                            {"Pathways"}
                          </span>
                        </h4>
                        <ul className="[column-count:2] [@media_(max-width:992px)]:[column-count:1]">
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Fashion Communications"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Journalism"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Fashion PR"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Fashion Events"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Fashion Blogging"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Fashion Events Curations"}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:41.6667%] max-lg:[width:100%]">
                        <div className="[aspect-ratio:3_/_2] [width:100%]">
                          <picture>
                            {" "}
                            <source srcSet="/assets/lp/bdes/assets/images/section-three/slider/5.webp" type="image/webp" />
                            {" "}
                            {" "}
                            {" "}
                            {" "}
                            <img className="[display:revert] [@media_(max-width:992px)]:[display:block] [@media_(max-width:992px)]:[height:100%] [@media_(max-width:992px)]:[object-fit:cover] ![width:100%]" src="/assets/lp/bdes/assets/images/section-three/slider/5.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <div className="[--bs-bg-opacity:1] [--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:center] ![background-color:rgba(var(--bs-white-rgb),_var(--bs-bg-opacity))] [display:flex] [flex-wrap:wrap] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] ![width:100%]">
                      <div className="[background-color:rgb(255,_255,_255)] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [@media_(max-width:992px)]:[height:350px] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:1] max-lg:![order:2] [padding-bottom:0px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:70px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:14px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px] [@media_(max-width:992px)]:[padding-top:10px] [width:58.3333%] max-lg:[width:100%]">
                        <h3 className="[color:rgb(225,_42,_123)] [font-size:60px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          {"Strategic Design & Management"}
                        </h3>
                        <p className="[color:rgb(52,_43,_124)] [font-weight:600] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial]">
                          {"4 Year | Full Time"}
                        </p>
                        <picture className="[display:flex] [justify-content:end] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [margin-left:0px] [margin-right:0px] [margin-top:0px]">
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/pink-squarev2.webp" type="image/webp" />
                          {" "}
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" type="image/png" />
                          {" "}
                          {" "}
                          <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" alt="Red square decorative shape" width="75" height="64" loading="lazy" decoding="async" fetchPriority="low" />
                        </picture>
                        <h4 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          <span className="[-webkit-text-stroke-color:rgb(0,_0,_0)] [-webkit-text-stroke-width:1.2px] [color:transparent]">
                            {"CAREER"}
                          </span>
                          {" "}
                          <span>
                            {"Pathways"}
                          </span>
                        </h4>
                        <ul className="[column-count:2] [@media_(max-width:992px)]:[column-count:1]">
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Management"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Innovation"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Entrepreneurship"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Branding and Marketing"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Project Management "}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"System Architecture"}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:41.6667%] max-lg:[width:100%]">
                        <div className="[aspect-ratio:3_/_2] [width:100%]">
                          <picture>
                            {" "}
                            <source srcSet="/assets/lp/bdes/assets/images/section-three/slider/6.webp" type="image/webp" />
                            {" "}
                            {" "}
                            {" "}
                            {" "}
                            <img className="[display:revert] [@media_(max-width:992px)]:[display:block] [@media_(max-width:992px)]:[height:100%] [@media_(max-width:992px)]:[object-fit:cover] ![width:100%]" src="/assets/lp/bdes/assets/images/section-three/slider/6.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <div className="[--bs-bg-opacity:1] [--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![align-items:center] ![background-color:rgba(var(--bs-white-rgb),_var(--bs-bg-opacity))] [display:flex] [flex-wrap:wrap] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px] ![width:100%]">
                      <div className="[background-color:rgb(255,_255,_255)] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [@media_(max-width:992px)]:[height:350px] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:1] max-lg:![order:2] [padding-bottom:0px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:70px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:14px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:0px] [@media_(max-width:992px)]:[padding-top:10px] [width:58.3333%] max-lg:[width:100%]">
                        <h3 className="[color:rgb(225,_42,_123)] [font-size:60px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          {"Fashion Design"}
                        </h3>
                        <p className="[color:rgb(52,_43,_124)] [font-weight:600] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [text-decoration-color:initial] [text-decoration-line:underline] [text-decoration-style:initial] [text-decoration-thickness:initial]">
                          {"4 Year | Full Time"}
                        </p>
                        <picture className="[display:flex] [justify-content:end] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px] [margin-left:0px] [margin-right:0px] [margin-top:0px]">
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/pink-squarev2.webp" type="image/webp" />
                          {" "}
                          {" "}
                          <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" type="image/png" />
                          {" "}
                          {" "}
                          <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/pink-squarev2.webp" alt="Red square decorative shape" width="75" height="64" loading="lazy" decoding="async" fetchPriority="low" />
                        </picture>
                        <h4 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:28px] [font-weight:bold] [line-height:1.2] [margin-bottom:12px] [@media_(max-width:992px)]:[margin-bottom:0px]">
                          <span className="[-webkit-text-stroke-color:rgb(0,_0,_0)] [-webkit-text-stroke-width:1.2px] [color:transparent]">
                            {"CAREER"}
                          </span>
                          {" "}
                          <span>
                            {"Pathways"}
                          </span>
                        </h4>
                        <ul className="[column-count:2] [@media_(max-width:992px)]:[column-count:1]">
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Fashion Designing"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Styling"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Merchandising"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Marketing-communications"}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Public Relations "}
                            </p>
                          </li>
                          <li>
                            <p className="[@media_(max-width:992px)]:[font-size:14px] [font-weight:bold] [@media_(max-width:992px)]:[font-weight:600]">
                              {"Fashion Curation"}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:41.6667%] max-lg:[width:100%]">
                        <div className="[aspect-ratio:3_/_2] [width:100%]">
                          <picture>
                            {" "}
                            <source srcSet="/assets/lp/bdes/assets/images/section-three/slider/7.webp" type="image/webp" />
                            {" "}
                            {" "}
                            {" "}
                            {" "}
                            <img className="[display:revert] [@media_(max-width:992px)]:[display:block] [@media_(max-width:992px)]:[height:100%] [@media_(max-width:992px)]:[object-fit:cover] ![width:100%]" src="/assets/lp/bdes/assets/images/section-three/slider/7.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                          </picture>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lpm-swiper-button-next [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:auto] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:var(--swiper-navigation-sides-offset,10px)] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  {" "}
                  <svg className="[display:revert] [height:100%] [max-width:100%] [object-fit:contain] [transform-origin:center_center] ![width:100%]" width="600" height="400" viewBox="0 0 91 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {" "}
                    <rect x="59" width="32" height="70" fill="url(#pattern0_63_47)" />
                    {" "}
                    <rect y="10" width="60" height="51" fill="url(#pattern1_63_47)" />
                    {" "}
                    <defs>
                      {" "}
                      <pattern id="pattern0_63_47" patternContentUnits="objectBoundingBox" width="1" height="1">
                        {" "}
                        <use xlinkHref="#image0_63_47" transform="matrix(0.0454545 0 0 0.0207792 0 -0.0194805)" />
                        {" "}
                      </pattern>
                      {" "}
                      <pattern id="pattern1_63_47" patternContentUnits="objectBoundingBox" width="1" height="1">
                        {" "}
                        <use xlinkHref="#image1_63_47" transform="matrix(0.0133333 0 0 0.0156863 0 -0.00196078)" />
                        {" "}
                      </pattern>
                      {" "}
                      <image id="image0_63_47" width="22" height="50" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAyCAYAAABYiSsbAAAB5UlEQVR4AayWi03EMAxALSZhBEaADRgBJkFsAhMwAjfKjYJf1FyTnJ3aKVWdj5M8niOh3oPMn2dd/tFIvx4Y4K/SiFft3zRS7wh+0tPACOA6Le9HaRONBW6BFfWog5T1CP5SwFXDelPWIxjgJ40RKWsL/C/WFhjZ09Ye+LS1Bz5tPQOfsp6BT1kfgZetj8DL1hHwknUEvGQdBaeto+C0dQacss6AU9ZZcNg6Cw5br4BD1ivgkPUq+NB6FYz1hcaI8m1cBfNTgDC4wlf+sgLGaPZTgO/ldQUMFLgYD3dPSBZM+YTBFK4AW+HJgLHElnNWAAVe1jJgoMDLwaGhfOKWjoIpn7gdbAZYYtukJHTHWGLbHWwmQIE3qRgYKPDu4DahfGKb7t3RVVA+sZ/YR1hiu2ea0QyMJbbN9m4IFHiXrJMZGCjwurftKZ9oc93YA1M+0W3eJlhiu03tzgJjia19QgQocG+95C0wUOBlw9BQPjGk76cjmPKJ+50iWGIrkacFY4mtdw4ocG+9y7dgoMC7DduE8oltetxVMOUT1gkssbXW3BxgLLH1NgEF7q2b+QcRASzOQ/mEs+ynMeZr+6JbvjXaF0ts21x4DJjNQLjjd50w1i72j8BGKyq4rlE29vwBxjWf7v8AAAD//x+NoGIAAAAGSURBVAMAOvxa5QUeWjYAAAAASUVORK5CYII=" />
                      {" "}
                      <image id="image1_63_47" width="75" height="64" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                      {" "}
                    </defs>
                    {" "}
                  </svg>
                </div>
                <div className="lpm-swiper-button-prev [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:var(--swiper-navigation-sides-offset,10px)] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:auto] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  {" "}
                  <svg className="[display:revert] [height:100%] [max-width:100%] [object-fit:contain] [transform-origin:center_center] ![width:100%]" width="600" height="400" viewBox="0 0 92 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {" "}
                    <rect width="32" height="70" fill="url(#pattern0_63_44)" />
                    {" "}
                    <rect x="32" y="10" width="60" height="51" fill="url(#pattern1_63_44)" />
                    {" "}
                    <defs>
                      {" "}
                      <pattern id="pattern0_63_44" patternContentUnits="objectBoundingBox" width="1" height="1">
                        {" "}
                        <use xlinkHref="#image0_63_44" transform="matrix(0.04375 0 0 0.02 -0.003125 0)" />
                        {" "}
                      </pattern>
                      {" "}
                      <pattern id="pattern1_63_44" patternContentUnits="objectBoundingBox" width="1" height="1">
                        {" "}
                        <use xlinkHref="#image1_63_44" transform="matrix(0.0133333 0 0 0.0156863 0 -0.00196078)" />
                        {" "}
                      </pattern>
                      {" "}
                      <image id="image0_63_44" width="23" height="50" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAyCAYAAAC3S0AlAAACkklEQVR4AaTWAdnUMAwG4HtQ8EtAAjhAAigAFAAKAAWAAkABOAAJOOCXgATy3r/utly7drt7mjXpkq/p17S3R6fjv2e90KPgrwL4V8jXkMch1XYU/P2EZpK/oVcnOQIOMGdrzCQrqvaC30WWJetQV+0+rN8hc9sL/iYic9YxdG4fz8/FYw84UMtfhM+qrL/N1qTsAUeHCabQVfd6ZU3GKDjQVtYyXnE9YZ9GwWVdYnJ/xXVxGAHvZY3vgrfqR8A/rSLWRjNrbj1wh+I5x4p8ibFm1vGuy7ljzS8L0M95MNtbmasOfOcY9vd4mCC6dtsCb1UI0A9tyMubFvhW1pubeIE+VTlHxVbWDs0So6nXMn8Z3iaI7qoNZy0ygwN960VF/sTYcNbhe0ULOtzZ3mV5lwd69jJzWdvIWoyMq5dTzbmMLcFlXcZzv4vrElzAe1mr7RIz3Bfw1jEHdChrgcBdTC4odhY8H8oaEHDB/xgVMSmpvOoPAVe/W0tHWas8N2cAzsH1iQJ6FpttgjzetQs4xxfxQFF0V82+tE7ulXMZWILjvfqJMDk7B1Yxmf1uCc4bNf6+6Fnw/iMPbtkZnK/l22R6licxsPWHHa8vrQbuLf7RRM9i8qHybIHb2JvLswUuW+X5k1IRG9vlfwscpuqxCnoW1KAoj892DxzvJpgDkqI8bXIafjB74LxGylOZ8l3JCLgAy2+VJ/6tgN9KRsEF9crTFcFvlj3gNrZXnlZxCFyQ8vSdSM+C99XtuSfzAoZ/qyj2sl+VJ/DlyxG9V57unnN5HgGXgPLc+khyeu+OgpsA/yah1+QmcIBOL5roRfwfPA3j/pbMI/5kY01wip9JUGXD6VcfouGzu7k5gcoWVTPAfwAAAP//Tpaz5AAAAAZJREFUAwAQjlz11gkesAAAAABJRU5ErkJggg==" />
                      {" "}
                      <image id="image1_63_44" width="75" height="64" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                      {" "}
                    </defs>
                    {" "}
                  </svg>
                </div>
                <div className="lpm-swiper-pagination [bottom:var(--swiper-pagination-bottom,8px)] [left:0px] [position:absolute] [text-align:center] [top:var(--swiper-pagination-top,auto)] [transform:translate3d(0px,_0px,_0px)] [transition-delay:0s] [transition-duration:0.3s] [transition-property:opacity] [transition-timing-function:ease] [width:100%] [z-index:10]" data-lp-bullet="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(255,_255,_255)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] [border-bottom-color:rgb(0,_0,_0)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" data-lp-bullet-active="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(225,_42,_123)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] ![border-bottom-color:rgb(225,_42,_123)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] ![border-left-color:rgb(225,_42,_123)] [border-left-width:1px] ![border-right-color:rgb(225,_42,_123)] [border-right-width:1px] ![border-top-color:rgb(225,_42,_123)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] [box-shadow:rgb(68,_78,_155)_3px_3px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(237,_26,_59)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%] max-lg:[width:100%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Montserrat',sans-serif] [font-size:45px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2] [text-transform:uppercase]">
                  {" In Curricular "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:28px] [text-transform:unset]">
                    {"Collaboration with"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:right] [width:33.3333%] max-lg:[width:100%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/parsons-logo/1.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/parsons-logo/default/1.png" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/icon/parsons-logo/default/1.png" alt="Red square decorative shape" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:1rem] ![padding-right:1rem] [width:100%]">
                <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [display:flex] [flex-wrap:wrap] ![margin-bottom:1.5rem] ![margin-left:0px] ![margin-right:0px] [margin-top:calc(-1_*_var(--bs-gutter-y))] ![width:100%]">
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0px] ![padding-right:0.5rem] max-lg:![padding-right:0px] [width:33.3333%] max-lg:[width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-four/1.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-four/default/2.jpg" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] max-lg:![margin-bottom:0px] ![width:100%]" src="/assets/lp/bdes/assets/images/section-four/default/2.jpg" alt="STATE-OF-THE-ART COMPUTER LABS" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0.5rem] max-lg:![padding-left:0px] ![padding-right:0px] [width:66.6667%] max-lg:[width:100%]">
                    <div className="[align-items:center] [background-color:rgb(225,_42,_123)] [color:rgb(255,_255,_255)] [display:flex] ![margin-bottom:1.5rem] max-lg:![margin-bottom:0px] [padding-bottom:20px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:20px] [@media_(max-width:992px)]:[padding-top:10px]">
                      <div>
                        <p className="[font-size:20px] [@media_(max-width:992px)]:[font-size:16px] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                          {"At ISDI you get the opportunity to immerse yourself in a truly world-class design school experience. With our curricular collaboration with Parsons School of Design, ranked among the top 3 Art & Design institutions globally, we bring to you the best in global standards of design techniques, practices, and innovation."}
                        </p>
                      </div>
                    </div>
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-four/2.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-four/default/2.jpg" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-four/default/2.jpg" alt="STATE-OF-THE-ART COMPUTER LABS" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="success-stories">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(225,_42,_123)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Montserrat',sans-serif] [font-size:45px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2] [text-transform:uppercase]">
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:28px] [text-transform:uppercase]">
                    {"Placements & Internships"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:right] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/blue-squarev2.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/blue-squarev2.webp" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/blue-squarev2.webp" alt="Red square decorative shape" width="101" height="86" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%] max-lg:[width:100%]">
                <p className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                  {"Our students get internships and placements at leading multinational companies and fashion and design houses including Apple, Google, Gucci, Samsung, Zara, McKinsey, Marc Jacobs, Manish Malhotra, Sabyasachi & more."}
                </p>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![width:100%]">
              <div className="lpm-mySwiperv3 lpm-swiper [display:block] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [list-style-image:initial] [list-style-position:initial] [list-style-type:none] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] [max-width:100%] [overflow-x:hidden] [overflow-y:hidden] [padding-bottom:0px] ![padding-left:3rem] max-lg:![padding-left:1rem] ![padding-right:3rem] max-lg:![padding-right:1rem] [padding-top:0px] [position:relative] [touch-action:pan-y] [width:100%] [z-index:1]">
                <div className="lpm-swiper-wrapper [box-sizing:content-box] [display:flex] [height:100%] [position:relative] [transform:translate3d(0px,_0px,_0px)] [transition-property:transform] [transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial)] [width:100%] [z-index:1]">
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/1.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/1.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/1.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/2.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/2.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/2.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/3.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/3.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/3.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/4.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/4.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/4.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/5.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/5.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/5.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/6.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/6.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/6.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/7.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/7.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/7.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/8.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/8.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/8.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/9.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/9.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/9.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/10.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/10.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/10.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/11.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/11.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/11.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/12.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/12.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/12.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/13.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/13.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/13.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/14.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-five/default/14.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-five/default/14.webp" alt="" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                </div>
                <div className="lpm-swiper-button-next [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:auto] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:var(--swiper-navigation-sides-offset,10px)] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  {" "}
                  <svg className="[display:revert] [height:100%] [max-width:100%] [object-fit:contain] [transform-origin:center_center] ![width:100%]" width="600" height="400" viewBox="0 0 91 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {" "}
                    <rect x="59" width="32" height="70" fill="url(#pattern0_63_47)" />
                    {" "}
                    <rect y="10" width="60" height="51" fill="url(#pattern1_63_47)" />
                    {" "}
                    <defs>
                      {" "}
                      <pattern id="pattern0_63_47" patternContentUnits="objectBoundingBox" width="1" height="1">
                        {" "}
                        <use xlinkHref="#image0_63_47" transform="matrix(0.0454545 0 0 0.0207792 0 -0.0194805)" />
                        {" "}
                      </pattern>
                      {" "}
                      <pattern id="pattern1_63_47" patternContentUnits="objectBoundingBox" width="1" height="1">
                        {" "}
                        <use xlinkHref="#image1_63_47" transform="matrix(0.0133333 0 0 0.0156863 0 -0.00196078)" />
                        {" "}
                      </pattern>
                      {" "}
                      <image id="image0_63_47" width="22" height="50" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAyCAYAAABYiSsbAAAB5UlEQVR4AayWi03EMAxALSZhBEaADRgBJkFsAhMwAjfKjYJf1FyTnJ3aKVWdj5M8niOh3oPMn2dd/tFIvx4Y4K/SiFft3zRS7wh+0tPACOA6Le9HaRONBW6BFfWog5T1CP5SwFXDelPWIxjgJ40RKWsL/C/WFhjZ09Ye+LS1Bz5tPQOfsp6BT1kfgZetj8DL1hHwknUEvGQdBaeto+C0dQacss6AU9ZZcNg6Cw5br4BD1ivgkPUq+NB6FYz1hcaI8m1cBfNTgDC4wlf+sgLGaPZTgO/ldQUMFLgYD3dPSBZM+YTBFK4AW+HJgLHElnNWAAVe1jJgoMDLwaGhfOKWjoIpn7gdbAZYYtukJHTHWGLbHWwmQIE3qRgYKPDu4DahfGKb7t3RVVA+sZ/YR1hiu2ea0QyMJbbN9m4IFHiXrJMZGCjwurftKZ9oc93YA1M+0W3eJlhiu03tzgJjia19QgQocG+95C0wUOBlw9BQPjGk76cjmPKJ+50iWGIrkacFY4mtdw4ocG+9y7dgoMC7DduE8oltetxVMOUT1gkssbXW3BxgLLH1NgEF7q2b+QcRASzOQ/mEs+ynMeZr+6JbvjXaF0ts21x4DJjNQLjjd50w1i72j8BGKyq4rlE29vwBxjWf7v8AAAD//x+NoGIAAAAGSURBVAMAOvxa5QUeWjYAAAAASUVORK5CYII=" />
                      {" "}
                      <image id="image1_63_47" width="75" height="64" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                      {" "}
                    </defs>
                    {" "}
                  </svg>
                </div>
                <div className="lpm-swiper-button-prev [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:var(--swiper-navigation-sides-offset,10px)] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:auto] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  {" "}
                  <svg className="[display:revert] [height:100%] [max-width:100%] [object-fit:contain] [transform-origin:center_center] ![width:100%]" width="600" height="400" viewBox="0 0 92 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {" "}
                    <rect width="32" height="70" fill="url(#pattern0_63_44)" />
                    {" "}
                    <rect x="32" y="10" width="60" height="51" fill="url(#pattern1_63_44)" />
                    {" "}
                    <defs>
                      {" "}
                      <pattern id="pattern0_63_44" patternContentUnits="objectBoundingBox" width="1" height="1">
                        {" "}
                        <use xlinkHref="#image0_63_44" transform="matrix(0.04375 0 0 0.02 -0.003125 0)" />
                        {" "}
                      </pattern>
                      {" "}
                      <pattern id="pattern1_63_44" patternContentUnits="objectBoundingBox" width="1" height="1">
                        {" "}
                        <use xlinkHref="#image1_63_44" transform="matrix(0.0133333 0 0 0.0156863 0 -0.00196078)" />
                        {" "}
                      </pattern>
                      {" "}
                      <image id="image0_63_44" width="23" height="50" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAyCAYAAAC3S0AlAAACkklEQVR4AaTWAdnUMAwG4HtQ8EtAAjhAAigAFAAKAAWAAkABOAAJOOCXgATy3r/utly7drt7mjXpkq/p17S3R6fjv2e90KPgrwL4V8jXkMch1XYU/P2EZpK/oVcnOQIOMGdrzCQrqvaC30WWJetQV+0+rN8hc9sL/iYic9YxdG4fz8/FYw84UMtfhM+qrL/N1qTsAUeHCabQVfd6ZU3GKDjQVtYyXnE9YZ9GwWVdYnJ/xXVxGAHvZY3vgrfqR8A/rSLWRjNrbj1wh+I5x4p8ibFm1vGuy7ljzS8L0M95MNtbmasOfOcY9vd4mCC6dtsCb1UI0A9tyMubFvhW1pubeIE+VTlHxVbWDs0So6nXMn8Z3iaI7qoNZy0ygwN960VF/sTYcNbhe0ULOtzZ3mV5lwd69jJzWdvIWoyMq5dTzbmMLcFlXcZzv4vrElzAe1mr7RIz3Bfw1jEHdChrgcBdTC4odhY8H8oaEHDB/xgVMSmpvOoPAVe/W0tHWas8N2cAzsH1iQJ6FpttgjzetQs4xxfxQFF0V82+tE7ulXMZWILjvfqJMDk7B1Yxmf1uCc4bNf6+6Fnw/iMPbtkZnK/l22R6licxsPWHHa8vrQbuLf7RRM9i8qHybIHb2JvLswUuW+X5k1IRG9vlfwscpuqxCnoW1KAoj892DxzvJpgDkqI8bXIafjB74LxGylOZ8l3JCLgAy2+VJ/6tgN9KRsEF9crTFcFvlj3gNrZXnlZxCFyQ8vSdSM+C99XtuSfzAoZ/qyj2sl+VJ/DlyxG9V57unnN5HgGXgPLc+khyeu+OgpsA/yah1+QmcIBOL5roRfwfPA3j/pbMI/5kY01wip9JUGXD6VcfouGzu7k5gcoWVTPAfwAAAP//Tpaz5AAAAAZJREFUAwAQjlz11gkesAAAAABJRU5ErkJggg==" />
                      {" "}
                      <image id="image1_63_44" width="75" height="64" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                      {" "}
                    </defs>
                    {" "}
                  </svg>
                </div>
                <div className="lpm-swiper-pagination [bottom:var(--swiper-pagination-bottom,8px)] ![display:block] max-lg:![display:none] [left:0px] [position:absolute] [text-align:center] [top:var(--swiper-pagination-top,auto)] [transform:translate3d(0px,_0px,_0px)] [transition-delay:0s] [transition-duration:0.3s] [transition-property:opacity] [transition-timing-function:ease] [width:100%] [z-index:10]" data-lp-bullet="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(255,_255,_255)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] [border-bottom-color:rgb(0,_0,_0)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" data-lp-bullet-active="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(225,_42,_123)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] ![border-bottom-color:rgb(225,_42,_123)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] ![border-left-color:rgb(225,_42,_123)] [border-left-width:1px] ![border-right-color:rgb(225,_42,_123)] [border-right-width:1px] ![border-top-color:rgb(225,_42,_123)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] [box-shadow:rgb(68,_78,_155)_3px_3px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" />
              </div>
            </div>
          </div>
        </section>
        <section id="why-isdi">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(237,_26,_59)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Montserrat',sans-serif] [font-size:45px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2] [text-transform:uppercase]">
                  {" ISDI "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:28px] [text-transform:unset]">
                    {"Advantage"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:right] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/blue-squarev3.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/blue-squarev3.png" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/blue-squarev3.png" alt="Red square decorative shape" width="174" height="189" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-image:url(/assets/lp/bdes/assets/images/icon/strip1.svg)] [background-position-x:0px] [background-position-y:75%] [@media_(max-width:992px)]:[background-position-y:70%] [background-repeat:no-repeat] [background-size:contain] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:1rem] ![padding-right:1rem] [width:100%]">
                <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [display:flex] [flex-wrap:wrap] ![margin-bottom:1.5rem] ![margin-left:0px] ![margin-right:0px] [margin-top:calc(-1_*_var(--bs-gutter-y))] ![width:100%]">
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:1] max-lg:![order:2] ![padding-left:0px] ![padding-right:0.5rem] max-lg:![padding-right:0px] [width:50%] max-lg:[width:100%]">
                    <div className="[align-items:center] [background-color:rgb(225,_42,_123)] [color:rgb(255,_255,_255)] [display:flex] ![height:100%] [padding-bottom:20px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:20px] [@media_(max-width:992px)]:[padding-top:10px]">
                      <div>
                        <h3 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:30px] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                          {"WORLD-CLASS CAMPUS IN THE HEART OF MUMBAI"}
                        </h3>
                        <p className="[font-size:20px] [@media_(max-width:992px)]:[font-size:16px] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                          {"Experience India’s finest urban state-of-the-art tech-enabled Campus and elevate your creativity within the vibrant multicultural dynamic setting of Mumbai."}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-left:0.5rem] max-lg:![padding-left:0px] ![padding-right:0px] [width:50%] max-lg:[width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-one/1.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-one/1.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-six/row-one/1.webp" alt="STATE-OF-THE-ART COMPUTER LABS" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                </div>
                <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [display:flex] [flex-wrap:wrap] ![margin-bottom:1.5rem] ![margin-left:0px] ![margin-right:0px] [margin-top:calc(-1_*_var(--bs-gutter-y))] ![width:100%]">
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0px] ![padding-right:0.5rem] max-lg:![padding-right:0px] [width:33.3333%] max-lg:[width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-one/2.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-one/2.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] max-lg:![margin-bottom:0px] ![width:100%]" src="/assets/lp/bdes/assets/images/section-six/row-one/2.webp" alt="STATE-OF-THE-ART COMPUTER LABS" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                    <div className="[align-items:center] [background-color:rgb(225,_42,_123)] [color:rgb(255,_255,_255)] [display:flex] [height:400px] [@media_(max-width:992px)]:[height:unset] ![margin-bottom:0px] max-lg:![margin-bottom:1.5rem] [padding-bottom:20px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:20px] [@media_(max-width:992px)]:[padding-top:10px]">
                      <div>
                        <h3 className="[color:var(--bs-heading-color)] [font-size:48px] [@media_(max-width:992px)]:[font-size:30px] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                          {"UNRIVALLED STUDENT LIFE"}
                        </h3>
                        <p className="[font-size:20px] [@media_(max-width:992px)]:[font-size:16px] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                          {"Team up with a community of young leaders to participate in student-run councils, clubs, festivals, inter and intra collegiate activities."}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:0.5rem] max-lg:![padding-left:0px] ![padding-right:0px] [width:66.6667%] max-lg:[width:100%]">
                    <div className="[align-items:center] [background-color:rgb(225,_42,_123)] [color:rgb(255,_255,_255)] [display:flex] ![margin-bottom:1.5rem] max-lg:![margin-bottom:0px] [padding-bottom:20px] [@media_(max-width:992px)]:[padding-bottom:10px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:10px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:10px] [padding-top:20px] [@media_(max-width:992px)]:[padding-top:10px]">
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
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-one/3.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-one/3.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-six/row-one/3.webp" alt="STATE-OF-THE-ART COMPUTER LABS" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                  </div>
                </div>
              </div>
              <div className="lpm-mySwiperv3 lpm-swiper [display:block] [flex-basis:auto] [flex-grow:0] [flex-shrink:0] [list-style-image:initial] [list-style-position:initial] [list-style-type:none] [margin-left:auto] [margin-right:auto] [margin-top:var(--bs-gutter-y)] [max-width:100%] [overflow-x:hidden] [overflow-y:hidden] ![padding-bottom:3rem] ![padding-left:3rem] max-lg:![padding-left:1rem] ![padding-right:3rem] max-lg:![padding-right:1rem] [padding-top:0px] [position:relative] [touch-action:pan-y] [width:100%] [z-index:1]">
                <div className="lpm-swiper-wrapper [box-sizing:content-box] [display:flex] [height:100%] [position:relative] [transform:translate3d(0px,_0px,_0px)] [transition-property:transform] [transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial)] [width:100%] [z-index:1]">
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-two/1.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-two/1.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/bdes/assets/images/section-six/row-two/1.webp" alt="" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                    <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"MULTIDISCIPLINARY CURRICULUM"}
                    </h3>
                    <p className="![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"Customize your learning across fields to gain cross-functional expertise and prepare for a connected future"}
                    </p>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-two/2.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-two/default/2.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/bdes/assets/images/section-six/row-two/default/2.webp" alt="" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                    <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"LEARN BEYOND B.DES"}
                    </h3>
                    <p className="![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"From Artificial Intelligence to Psychology, access a broad range of ATLAS Electives across ATLAS SkillTech University"}
                    </p>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-two/3.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-two/default/3.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/bdes/assets/images/section-six/row-two/default/3.webp" alt="" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                    <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"LEARN BEYOND THE CLASSROOM"}
                    </h3>
                    <p className="![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"Work on real-life projects with design studios and firms through Observership, Apprenticeship, Internship & Capstone."}
                    </p>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-two/4.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-two/4.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/bdes/assets/images/section-six/row-two/4.webp" alt="" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                    <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"LEARN FROM THE BEST"}
                    </h3>
                    <p className="![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"Industry practitioners bring real-life experiences to the classrooms so you’re both academically and professionally ready."}
                    </p>
                  </div>
                  <div className="lpm-swiper-slide [backface-visibility:hidden] [display:block] [flex-shrink:0] [height:100%] [position:relative] [transform:translateZ(0px)] [transition-property:transform] [width:100%]">
                    <picture>
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-two/5.webp" type="image/webp" />
                      {" "}
                      {" "}
                      <source srcSet="/assets/lp/bdes/assets/images/section-six/row-two/default/5.webp" type="image/jpg" />
                      {" "}
                      {" "}
                      <img className="[display:revert] ![margin-bottom:1.5rem] ![width:100%]" src="/assets/lp/bdes/assets/images/section-six/row-two/default/5.webp" alt="" loading="lazy" decoding="async" fetchPriority="low" />
                    </picture>
                    <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:700] [line-height:1.2] ![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"Global Exposure At ATLAS"}
                    </h3>
                    <p className="![margin-bottom:0px] [margin-left:revert] [margin-right:revert] ![text-align:center]">
                      {"Through our collaborations with top-ranked international universities, experience Global Immersion Initiatives, Summer Schools and Study-Abroad Programs."}
                    </p>
                  </div>
                </div>
                <div className="lpm-swiper-button-next [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:auto] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:var(--swiper-navigation-sides-offset,10px)] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  {" "}
                  <svg className="[display:revert] [height:100%] [max-width:100%] [object-fit:contain] [transform-origin:center_center] ![width:100%]" width="600" height="400" viewBox="0 0 91 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {" "}
                    <rect x="59" width="32" height="70" fill="url(#pattern0_63_47)" />
                    {" "}
                    <rect y="10" width="60" height="51" fill="url(#pattern1_63_47)" />
                    {" "}
                    <defs>
                      {" "}
                      <pattern id="pattern0_63_47" patternContentUnits="objectBoundingBox" width="1" height="1">
                        {" "}
                        <use xlinkHref="#image0_63_47" transform="matrix(0.0454545 0 0 0.0207792 0 -0.0194805)" />
                        {" "}
                      </pattern>
                      {" "}
                      <pattern id="pattern1_63_47" patternContentUnits="objectBoundingBox" width="1" height="1">
                        {" "}
                        <use xlinkHref="#image1_63_47" transform="matrix(0.0133333 0 0 0.0156863 0 -0.00196078)" />
                        {" "}
                      </pattern>
                      {" "}
                      <image id="image0_63_47" width="22" height="50" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAyCAYAAABYiSsbAAAB5UlEQVR4AayWi03EMAxALSZhBEaADRgBJkFsAhMwAjfKjYJf1FyTnJ3aKVWdj5M8niOh3oPMn2dd/tFIvx4Y4K/SiFft3zRS7wh+0tPACOA6Le9HaRONBW6BFfWog5T1CP5SwFXDelPWIxjgJ40RKWsL/C/WFhjZ09Ye+LS1Bz5tPQOfsp6BT1kfgZetj8DL1hHwknUEvGQdBaeto+C0dQacss6AU9ZZcNg6Cw5br4BD1ivgkPUq+NB6FYz1hcaI8m1cBfNTgDC4wlf+sgLGaPZTgO/ldQUMFLgYD3dPSBZM+YTBFK4AW+HJgLHElnNWAAVe1jJgoMDLwaGhfOKWjoIpn7gdbAZYYtukJHTHWGLbHWwmQIE3qRgYKPDu4DahfGKb7t3RVVA+sZ/YR1hiu2ea0QyMJbbN9m4IFHiXrJMZGCjwurftKZ9oc93YA1M+0W3eJlhiu03tzgJjia19QgQocG+95C0wUOBlw9BQPjGk76cjmPKJ+50iWGIrkacFY4mtdw4ocG+9y7dgoMC7DduE8oltetxVMOUT1gkssbXW3BxgLLH1NgEF7q2b+QcRASzOQ/mEs+ynMeZr+6JbvjXaF0ts21x4DJjNQLjjd50w1i72j8BGKyq4rlE29vwBxjWf7v8AAAD//x+NoGIAAAAGSURBVAMAOvxa5QUeWjYAAAAASUVORK5CYII=" />
                      {" "}
                      <image id="image1_63_47" width="75" height="64" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                      {" "}
                    </defs>
                    {" "}
                  </svg>
                </div>
                <div className="lpm-swiper-button-prev [&::after]:[content:unset] [&::after]:[font-family:'LP27_swiper-icons'] [&::after]:[font-size:var(--swiper-navigation-size)] [&::after]:[font-variant-alternates:initial] [&::after]:[font-variant-caps:initial] [&::after]:[font-variant-east-asian:initial] [&::after]:[font-variant-emoji:initial] [&::after]:[font-variant-ligatures:initial] [&::after]:[font-variant-numeric:initial] [&::after]:[font-variant-position:initial] [&::after]:[letter-spacing:0px] [&::after]:[line-height:1] [&::after]:![text-transform:none] [align-items:center] [color:var(--swiper-navigation-color,var(--swiper-theme-color))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:flex] [height:var(--swiper-navigation-size)] [justify-content:center] [left:var(--swiper-navigation-sides-offset,10px)] [margin-top:calc(0px_-_(var(--swiper-navigation-size)/_2))] [position:absolute] [right:auto] [top:var(--swiper-navigation-top-offset,50%)] [width:calc(var(--swiper-navigation-size)/_44_*_27)] [z-index:10]">
                  {" "}
                  <svg className="[display:revert] [height:100%] [max-width:100%] [object-fit:contain] [transform-origin:center_center] ![width:100%]" width="600" height="400" viewBox="0 0 92 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {" "}
                    <rect width="32" height="70" fill="url(#pattern0_63_44)" />
                    {" "}
                    <rect x="32" y="10" width="60" height="51" fill="url(#pattern1_63_44)" />
                    {" "}
                    <defs>
                      {" "}
                      <pattern id="pattern0_63_44" patternContentUnits="objectBoundingBox" width="1" height="1">
                        {" "}
                        <use xlinkHref="#image0_63_44" transform="matrix(0.04375 0 0 0.02 -0.003125 0)" />
                        {" "}
                      </pattern>
                      {" "}
                      <pattern id="pattern1_63_44" patternContentUnits="objectBoundingBox" width="1" height="1">
                        {" "}
                        <use xlinkHref="#image1_63_44" transform="matrix(0.0133333 0 0 0.0156863 0 -0.00196078)" />
                        {" "}
                      </pattern>
                      {" "}
                      <image id="image0_63_44" width="23" height="50" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAyCAYAAAC3S0AlAAACkklEQVR4AaTWAdnUMAwG4HtQ8EtAAjhAAigAFAAKAAWAAkABOAAJOOCXgATy3r/utly7drt7mjXpkq/p17S3R6fjv2e90KPgrwL4V8jXkMch1XYU/P2EZpK/oVcnOQIOMGdrzCQrqvaC30WWJetQV+0+rN8hc9sL/iYic9YxdG4fz8/FYw84UMtfhM+qrL/N1qTsAUeHCabQVfd6ZU3GKDjQVtYyXnE9YZ9GwWVdYnJ/xXVxGAHvZY3vgrfqR8A/rSLWRjNrbj1wh+I5x4p8ibFm1vGuy7ljzS8L0M95MNtbmasOfOcY9vd4mCC6dtsCb1UI0A9tyMubFvhW1pubeIE+VTlHxVbWDs0So6nXMn8Z3iaI7qoNZy0ygwN960VF/sTYcNbhe0ULOtzZ3mV5lwd69jJzWdvIWoyMq5dTzbmMLcFlXcZzv4vrElzAe1mr7RIz3Bfw1jEHdChrgcBdTC4odhY8H8oaEHDB/xgVMSmpvOoPAVe/W0tHWas8N2cAzsH1iQJ6FpttgjzetQs4xxfxQFF0V82+tE7ulXMZWILjvfqJMDk7B1Yxmf1uCc4bNf6+6Fnw/iMPbtkZnK/l22R6licxsPWHHa8vrQbuLf7RRM9i8qHybIHb2JvLswUuW+X5k1IRG9vlfwscpuqxCnoW1KAoj892DxzvJpgDkqI8bXIafjB74LxGylOZ8l3JCLgAy2+VJ/6tgN9KRsEF9crTFcFvlj3gNrZXnlZxCFyQ8vSdSM+C99XtuSfzAoZ/qyj2sl+VJ/DlyxG9V57unnN5HgGXgPLc+khyeu+OgpsA/yah1+QmcIBOL5roRfwfPA3j/pbMI/5kY01wip9JUGXD6VcfouGzu7k5gcoWVTPAfwAAAP//Tpaz5AAAAAZJREFUAwAQjlz11gkesAAAAABJRU5ErkJggg==" />
                      {" "}
                      <image id="image1_63_44" width="75" height="64" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABACAYAAABSiYopAAAGCklEQVR4AeRaz2tcVRQ+575EbLPJQkFoTTKKOgkWqy26KwE3dadUXEr/A6Mrm1QyRW1F0NalbuxCzVZRQcFFQVEQAlXaZqxoJq1EGymERqfGydzjOZO84WXmvXn3/ZiZg/O4Z+599+e5H/d9+e69MZDTc33q5NHK5NxHmmxlavaT5YmZ0ZymCLmAtfpg6S4L9FReTuXWD+F93sjIfF795QLW5lDtWSK4Oy+ncukHoQAID7NfM8vFk9N59JkZrF8n58aR4EgezuTVByINI8ABvz8PKZfVlRksD+El3yktMZJ5iH0ZYWsEQphenjzxdOMlw08msCrFuWOk7PPjVTVCSM1V5WNj0JzNSvapwRJSR4SjvjNaYgTzGIQ/E7B370x4kVtuarA2hdQBmkvdbbgu12JSJ6D9UaMYwBeWiy9PRJXH5Zu4CmHlK8VXDqkjdaBakNTD/Oa8Uc94qck+FVhg7PM8sKpgEYrsUOxKJ4DjaaVEYrC0kroBfJzBcgpppYRx6n2nklZSJ8CxHRedIpES16ZmjztVDlRKBJZWUmeuOhiYk1OSAU4sJZzB0kXq23igG6lvV27/HU0qJZzB0kjqvDqeYAxiSZ3rhAaTUEqY0F5aMrWSOoti2da0eJvoddRD733XFrFgCanz7v2Ya4e9qserKpfNu5C9q5SIBUtIvVcAOI/DSp1JPbdDPVcp0RGsa5NzR9QpdaQRBqpto+wMdEjFxuqaPBG7b+wIFnei8fO7l+ebmtS5bWjgU4n5uFOJSLDUkjrAo6GzzZ4ZKyVCwdJK6gB4CLr4GMD5TqcSJmxsraTOvu5j62roJCXawBoUUo9CnHl6OkpKtIHFlQeG1KMAM4ZCheousAaQ1KPwmuALjjYp0QRLMak/GTWjbuaHSYkmWGlJvZsOAyt17j93TcV9uoTR1tvsBliDTupRyBHBzPIDs82zsgZYKkmdULY0/VpVTfy8ITzrvxi1pL79Cfp+9i3mhdSUEoavhqp1wA+2yH7paswlnwPSV0DwrasZi1+DpctOBsb58qEXKIqUkH2j+bv+zzdDhDeGYeiSq6E1ZbTeDwjmO1cjxO8RvS+cDOyHoOkhgELl3Lop/vTmhgfehirfrLdARFe1+IREp8QXIz9/3ILfJNZkSPCWBn/47Oz8WPn0efGlAdbh1VK1VrNrkqHHvEUgWuy3P3Vbb6wq8aMBliTu/+WRVVuv1yWtxgjF0b5RhAU8VSi/UfHxaIKF8Fx9z547Vv0CHbERfxb64gtBpXDltVJw7CZYknnPj6U1/mu1KWktZi0usC89X10+qfPYzbALLMmt2uqKxFrMAG7wzfN7vfQnSOrBcU3wRdJapUTOZC9TjbQgqQcrtYElhfsMNEkNtDwEPVldraQenH4oWHil9C9hXcg1WLfPaW+RtdeFrjoRQurB8ULBkgrjSwfXtEkJPjJ5m33rGtlbsC9y/5EhEqxBkxJC6oWlMx9HIsUFkWBxGYiU8JTtG7elBP0u/uVnuB5F6sExTPAlLP0XVXN2LGwU9zzDUsJYeNe9RXxNC/BOUKlHtTBRBX6+RilhwfssNykRQ+o+DhLHgiWVREpoI3s+dMxFSsSRuszfNyewRErgENzwG+mIPTmR+DSLLy6kHuzfCSxpoFFKMNlnkBJupC5z980ZLJESwx5d9xtqiA2TPfshG22OkgXLp58upB7s1QRf4tL7y2duev8HKSGkvvT6ubj5tpab1oy4d41SAizsOneCmMdu0TMxVUKLE4MlUsJC7WZob2kyc2nDZO94BN0g9Z9PX0wzbGKwZJAJc6fCI2iHUwn+/FyUuswxzFKBpVVK8Ea7I9m7KvUwoCQvFVjSUKSEtiNoIhShGn4qwauqkILUZa6+pQZLpET9tq77RtNBSqQldR8oiY38pLVCpbTuKZMSYA2vrt2nEllIPYiNCb6kSWuTEo05BKUEf35ZSL3R385PZrBESmi+zZYrraRKfQebtigzWNKj2ttsXlX+/ymIn1ktF7CE7Ass9MbLry7G2diB8sXLW+uXktift7yl27R5NZnVLlTJHs4KULD9fwAAAP//iJm/AgAAAAZJREFUAwDPHEiX27sMwAAAAABJRU5ErkJggg==" />
                      {" "}
                    </defs>
                    {" "}
                  </svg>
                </div>
                <div className="lpm-swiper-pagination [bottom:var(--swiper-pagination-bottom,8px)] [left:0px] [position:absolute] [text-align:center] [top:var(--swiper-pagination-top,auto)] [transform:translate3d(0px,_0px,_0px)] [transition-delay:0s] [transition-duration:0.3s] [transition-property:opacity] [transition-timing-function:ease] [width:100%] [z-index:10]" data-lp-bullet="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(255,_255,_255)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] [border-bottom-color:rgb(0,_0,_0)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] [border-left-color:rgb(0,_0,_0)] [border-left-width:1px] [border-right-color:rgb(0,_0,_0)] [border-right-width:1px] [border-top-color:rgb(0,_0,_0)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" data-lp-bullet-active="![background-attachment:initial] ![background-clip:initial] ![background-color:rgb(225,_42,_123)] ![background-image:initial] ![background-origin:initial] ![background-position-x:initial] ![background-position-y:initial] ![background-repeat:initial] ![background-size:initial] ![border-bottom-color:rgb(225,_42,_123)] ![border-bottom-left-radius:0px] ![border-bottom-right-radius:0px] [border-bottom-width:1px] ![border-left-color:rgb(225,_42,_123)] [border-left-width:1px] ![border-right-color:rgb(225,_42,_123)] [border-right-width:1px] ![border-top-color:rgb(225,_42,_123)] ![border-top-left-radius:0px] ![border-top-right-radius:0px] [border-top-width:1px] [box-shadow:rgb(68,_78,_155)_3px_3px] ![cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:inline-block] [height:13px] ![margin-bottom:0px] ![margin-left:10px] ![margin-right:10px] ![margin-top:0px] [min-width:13px] [opacity:1] [width:13px]" />
              </div>
            </div>
          </div>
        </section>
        <section id="placements">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(225,_42,_123)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Montserrat',sans-serif] [font-size:45px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2] [text-transform:uppercase]">
                  {" ISDI Placement "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:28px] [text-transform:uppercase]">
                    {"Partners"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:left] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/btech/assets/images/icon/shape/blue-square.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/blue-square.webp" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/blue-square.webp" alt="Red square decorative shape" width="150" height="129" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%] max-lg:[width:100%]">
                <p className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] ![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                  {"ISDI is one of the top Design Schools in Mumbai that have been offering students placements at leading organisations across industries. Experience transformative opportunities to work in environments that inspire innovation and help you realise your global leadership potential."}
                </p>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:1rem] ![padding-right:1rem] [width:100%]">
                <picture>
                  <source media="(max-width: 992px)" srcSet="/assets/lp/bdes/assets/images/section-seven/mobile.svg" />
                  {" "}
                  <source media="(min-width: 993px)" srcSet="/assets/lp/bdes/assets/images/section-seven/desktop.svg" />
                  {" "}
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-seven/mobile.svg" alt="b.des brand" width="1920" height="800" fetchPriority="high" />
                </picture>
              </div>
            </div>
          </div>
        </section>
        <section id="about-isdi">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(225,_42,_123)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:3rem] max-lg:![padding-bottom:0.5rem] ![padding-left:1rem] max-lg:![padding-left:0.5rem] ![padding-right:1rem] max-lg:![padding-right:0.5rem] ![padding-top:3rem] max-lg:![padding-top:0.5rem] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:66.6667%]">
                <h2 className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [font-family:'LP27_Montserrat',sans-serif] [font-size:45px] [@media_(max-width:992px)]:[font-size:26px] [font-weight:bolder] [line-height:1.2] [text-transform:uppercase]">
                  {" A TOP DESIGN SCHOOL IN INDIA "}
                  <span className="[display:block] [font-family:'LP27_Poppins',sans-serif] [font-size:64px] [@media_(max-width:992px)]:[font-size:28px] [text-transform:uppercase]">
                    {" EMPOWERING FUTURE LEADERS"}
                  </span>
                </h2>
              </div>
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] ![text-align:center] [width:33.3333%]">
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/blue-squarev2.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/icon/shape/default/blue-squarev2.webp" type="image/png" />
                  {" "}
                  {" "}
                  <img className="[display:revert] [height:revert] [@media_(max-width:992px)]:[height:auto] [max-width:revert] [@media_(max-width:992px)]:[width:50px]" src="/assets/lp/bdes/assets/images/icon/shape/default/blue-squarev2.webp" alt="Red square decorative shape" width="101" height="86" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
          </div>
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-image:url(/assets/lp/bdes/assets/images/icon/strip2.svg)] [background-position-x:0px] [background-position-y:75%] [@media_(max-width:992px)]:[background-position-y:95%] [background-repeat:no-repeat] [background-size:contain] ![margin-bottom:3rem] max-lg:![margin-bottom:1rem] [margin-left:auto] [margin-right:auto] ![margin-top:3rem] max-lg:![margin-top:1rem] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
            <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [align-items:center] [@media_(max-width:992px)]:[align-items:start] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![width:100%]">
              <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-left:1rem] ![padding-right:1rem] [width:100%]">
                <p className="![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                  <strong>
                    {" Ranked as one of India’s Most Admired Universities "}
                  </strong>
                  {"ATLAS SkillTech University, home to ISDI School of Design, empowers today’s youth with future-ready skills, transforming them into global leaders, creators, design thinkers, innovators, entrepreneurs, and change-makers. Everything we do is crafted to equip students with knowledge, skills, and experiences that transcend the conventional, enabling them to excel in life, industry, and society. "}
                </p>
                <p className="![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                  {" Our vibrant community of ISDI Alumni, particularly from our Bachelors in Design program, secure leadership positions in top organizations and pursue higher education at prestigious universities worldwide. With an interdisciplinary approach, industry-integrated experiential learning, global exposure, and an emphasis on 21st Century Skills, our students from ISDI, one of the best design colleges in India, are future-ready to drive impact in today’s VUCA world. "}
                </p>
                <p className="![margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert]">
                  <strong>
                    {" ISDI Mumbai, "}
                  </strong>
                  {" recognized as a top design school in Mumbai, offers a Bachelor’s Degree in Design that prepares students to navigate and shape the design industry. As a leading design school in Mumbai, we continue to foster innovation, creativity, and leadership, ensuring that our graduates thrive in a global landscape. "}
                </p>
                <picture>
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/section-eight/1.webp" type="image/webp" />
                  {" "}
                  {" "}
                  <source srcSet="/assets/lp/bdes/assets/images/section-eight/1.webp" type="image/jpeg" />
                  {" "}
                  {" "}
                  <img className="[display:revert] ![width:100%]" src="/assets/lp/bdes/assets/images/section-eight/1.webp" alt="Red square decorative shape" width="600" height="400" loading="lazy" decoding="async" fetchPriority="low" />
                </picture>
              </div>
            </div>
          </div>
        </section>
      </main>
      {" "}
      {" "}
      <button className="focus:[outline-color:initial] focus:[outline-style:initial] focus:[outline-width:0px] [background-color:rgb(225,_42,_123)] [background-image:revert] [border-bottom-color:currentcolor] [border-bottom-left-radius:0px] [border-bottom-right-radius:0px] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-left-radius:0px] [border-top-right-radius:0px] [border-top-style:none] [border-top-width:medium] [color:white] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] [display:none] [font-feature-settings:revert] [font-size:18px] [@media_(max-width:992px)]:[font-size:16px] [font-variation-settings:revert] [font-weight:revert] [letter-spacing:revert] [padding-bottom:10px] [@media_(max-width:992px)]:[padding-bottom:8px] [padding-left:20px] [@media_(max-width:992px)]:[padding-left:18px] [padding-right:20px] [@media_(max-width:992px)]:[padding-right:18px] [padding-top:10px] [@media_(max-width:992px)]:[padding-top:8px] [position:fixed] [right:-48px] [@media_(max-width:992px)]:[right:-42px] [top:50%] [transform:rotate(-90deg)] [transition-delay:0s] [transition-duration:0.3s] [transition-property:opacity] [transition-timing-function:ease] [z-index:1000]" id="goTopBtn">
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
                {"Class 12 with a score of at least 50% or equivalent (CBSE, ISC, State Boards, IBDP, IGCSE, A-levels, etc.) from any stream—Science, Commerce, or Art."}
              </p>
              <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:600] [line-height:1.2] [margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-transform:uppercase]">
                {" TALK TO US"}
              </h3>
              <p className="[margin-bottom:1rem] [margin-left:revert] [margin-right:revert]">
                <a className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] ![text-decoration-color:initial] ![text-decoration-line:none] ![text-decoration-style:initial] ![text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="https://maps.app.goo.gl/28ZpnPsYLuWCDZWj9" target="_blank">
                  {"ATLAS SKILLTECH UNIVERSITY"}
                  <br />
                  {" ATLAS BUILDING 2 Sunteck BKC 51, Off - Bandra Kurla Complex, LBS Marg, Kurla West, MUMBAI – 400 070."}
                </a>
              </p>
              <h3 className="[color:var(--bs-heading-color)] [font-size:calc(1.3rem_+_0.6vw)] [@media_(min-width:1200px)]:[font-size:1.75rem] ![font-weight:600] [line-height:1.2] [margin-bottom:0.5rem] [margin-left:revert] [margin-right:revert] ![text-transform:uppercase]">
                {" Contact Us"}
              </h3>
              <p className="![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                <a className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] ![text-decoration-color:initial] ![text-decoration-line:none] ![text-decoration-style:initial] ![text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="tel:+917718865341">
                  {" +91 77188 65341"}
                </a>
              </p>
              {" "}
            </div>
            <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-left:33.3333%] max-lg:[margin-left:revert] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![order:2] max-lg:![order:1] ![padding-bottom:0px] ![padding-left:0.5rem] max-lg:![padding-left:0px] ![padding-right:0.5rem] max-lg:![padding-right:0px] ![padding-top:0px] [width:33.3333%] max-lg:[width:100%]">
              {" "}
              <CrmWidget mode="iframe" src="https://crm.atlasskilltech.app/widgets/6a3e58f0b9dfccd3a4454dcd/embed" className="[border-bottom-color:currentcolor] [border-bottom-style:none] [border-bottom-width:medium] [border-left-color:currentcolor] [border-left-style:none] [border-left-width:medium] [border-right-color:currentcolor] [border-right-style:none] [border-right-width:medium] [border-top-color:currentcolor] [border-top-style:none] [border-top-width:medium] [display:revert] [max-width:100%] [vertical-align:revert]" width="100%" height="650" frameBorder="0" />
            </div>
          </div>
        </div>
        <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [background-color:rgb(225,_42,_123)] [margin-left:auto] [margin-right:auto] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
          <div className="[--bs-gutter-x:1.5rem] [--bs-gutter-y:0] [--bs-text-opacity:1] ![align-items:flex-start] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [display:flex] [flex-wrap:wrap] [margin-bottom:0px] [margin-left:auto] [margin-right:auto] [margin-top:0px] [max-width:1200px] [@media_(min-width:1501px)]:[max-width:1366px] ![padding-bottom:0.5rem] ![padding-left:0.5rem] ![padding-right:0.5rem] ![padding-top:0.5rem] ![width:100%]">
            <div className="[flex-basis:auto] [flex-grow:0] [flex-shrink:0] [margin-top:var(--bs-gutter-y)] [max-width:100%] ![padding-bottom:0px] ![padding-left:0px] ![padding-right:0px] ![padding-top:0px] [width:100%]">
              <p className="![margin-bottom:0px] ![margin-left:0px] ![margin-right:0px] ![margin-top:0px]">
                {"©2025. "}
                <a className="[--bs-text-opacity:1] ![color:rgba(var(--bs-light-rgb),_var(--bs-text-opacity))] [cursor:url(/assets/images/library/cursor-hand.svg)_14_14,_auto] ![text-decoration-color:initial] ![text-decoration-line:none] ![text-decoration-style:initial] ![text-decoration-thickness:initial] hover:[--bs-link-color-rgb:var(--bs-link-hover-color-rgb)] hover:[text-decoration-line:underline]" href="https://atlasuniversity.edu.in/">
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
      <LpBehaviors kind="php-bdes" />
    </div>
  );
}
