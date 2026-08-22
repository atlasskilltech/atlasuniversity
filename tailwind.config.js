/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],

  /*
   * Classes toggled at runtime by React state. They are safelisted so the JIT
   * compiler always emits them even when they never appear as a literal in a
   * `className` string.
   */
  safelist: [
    // --- sticky header scroll states (desktop only) ---
    'lg:-translate-y-full',
    'lg:-translate-y-[105%]',
    'lg:translate-y-0',
    'lg:pointer-events-none',
    'lg:top-0',
    'lg:top-12',
    // --- mega menu (desktop) ---
    'lg:flex', 'lg:opacity-100', 'lg:visible', 'lg:block',
    'lg:opacity-0', 'lg:invisible', 'lg:hidden',
    'lg:-rotate-180',
    // --- mobile drawer ---
    'max-lg:translate-x-0', 'max-lg:opacity-100',
    'max-lg:pointer-events-auto', 'max-lg:z-[100]', 'max-lg:block',
    'max-lg:left-0', 'max-lg:z-10',
    'max-lg:-translate-x-[101%]', 'max-lg:opacity-0',
    'max-lg:pointer-events-none', 'max-lg:-left-full', 'max-lg:-z-[1]',
    // --- hamburger / close toggle (max-lg only: `hidden` is the desktop base) ---
    'max-lg:hidden',
    // --- body scroll lock ---
    'overflow-hidden',
    // --- route-transition loader fade (components/ui/PageLoader) ---
    'opacity-0', 'opacity-100',
  ],

  theme: {
    /*
     * Breakpoints mirror the Webflow reference exactly.
     *  min-width : 1280 / 1440 / 1920   (Webflow desktop-up tiers)
     *  max-width :  991 /  767 /  479   (Webflow down-stack tiers)
     * `lg` (992px) is the single desktop <-> mobile threshold.
     */
    screens: {
      sm: '480px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
      /* min-width twin of `max-mcm`: header.php scales the `.zoom-slider`
         cards from `@media (min-width: 568px)` up */
      mcm: '568px',
      /* ug-admissions.php's own <style> block: `.btn-ca` drops to 40px and
         `.buttons-wrapper` turns column at `@media (max-width: 576px)` */
      'max-576': { max: '576px' },
      /* keydates-static/law.php's own breakpoint: the admissions calendar
         table turns into a 900px-wide horizontal scroller and its `<br class="br">`
         line-breaks appear at `@media (max-width: 1100px)` */
      'max-tbl': { max: '1100px' },
      'max-lg': { max: '991px' },
      'max-md': { max: '767px' },
      'max-mcm': { max: '568px' },  // header.php inline: .mobile-swiper-cm slide = 100%
      'max-vsm': { max: '540px' },  // video-modal close-button reposition
      'max-sm': { max: '479px' },
    },

    /*
     * The reference sets `line-height: 1.5` on <body> and almost never
     * overrides it, so every text size inherits 1.5. Tailwind's stock scale
     * bundles a tighter line-height with each size (text-xs -> 1rem), which
     * shortened the utility bar, the CTA buttons and every footer link by
     * 1-2px each. Pinning 1.5 across the scale reproduces the reference metrics
     * exactly. The few places the reference sets its own line-height
     * (`.btm-links` 68px) use an explicit `leading-*` utility.
     */
    fontSize: {
      '2xs': ['10px', '1.5'],
      xs: ['12px', '1.5'],
      sm: ['14px', '1.5'],
      base: ['16px', '1.5'],
      lg: ['18px', '1.5'],
      xl: ['20px', '1.5'],
      '2xl': ['24px', '1.5'],
      '3xl': ['28px', '1.5'],
      '4xl': ['32px', '1.5'],
      '5xl': ['36px', '1.5'],
      '6xl': ['44px', '1.2'],
    },

    extend: {
      colors: {
        atlas: {
          blue: '#009fe0',      // top utility bar (default variant)
          teal: '#02b3c3',      // mega-menu hover + underline
          mint: '#07f6a0',      // mobile "Apply Now" bar
          deep: '#193e90',      // mobile "Schedule a visit" bar
          footer: '#41418e',    // footer background
          cta: '#d20158',       // secondary button default
          cyan: '#5cbdca',      // secondary button "atlas" variant
          ink: '#2b2b2b',       // menu link text
          panel: '#f5f5f5',     // level-2 / nav image panel
        },
      },

      fontFamily: {
        // Manrope carries the whole page…
        sans: ['Manrope', 'Arial', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
        // …except `.h2-tag.isdi`, which the reference sets to Poppins. On the
        // homepage that is only the "Thought Leadership" heading.
        poppins: ['Poppins', 'sans-serif'],
      },

      spacing: {
        13: '3.25rem',   // 52px
        18: '4.5rem',    // 72px
        156: '156px',    // second-header-wrapper height
        204: '204px',    // topbar (48) + mainbar (156) sticky offset
      },

      height: {
        topbar: '48px',
        mainbar: '156px',
        logobar: '80px',
        btmbar: '68px',
      },

      boxShadow: {
        'level-1': '0 -25px 20px 2px #0003',
        'nav-image': 'inset 0 -25px 20px 2px #0000001a',
      },

      transitionTimingFunction: {
        wf: 'ease',
      },

      /*
       * Awards marquee. The reference drives it with Swiper — `speed: 8000` +
       * `autoplay {delay: 0}` + a linear timing function — which advances one
       * slide every 8s. The track below duplicates the 12 cards once, so one
       * full set is exactly 50% of it and the cycle is 12 x 8s = 96s. The pitch
       * changes across breakpoints, the timing does not, so a single duration
       * reproduces the reference speed at every width.
       */
      keyframes: {
        'awards-marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },

        /*
         * The three logo/photo marquees inside the ATLAS-impact stack cards.
         * Same mechanism as the awards band, different slide counts — see the
         * `impact-marquee-*` durations below.
         */
        'impact-marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },

        /*
         * The four vertical photo columns behind the /life-at-atlas hero.
         * `new Swiper('.vertical-swiper', {direction:'vertical', loop:true,
         * autoplay:{delay:0}, speed:4000})` over a `transition-timing-function:
         * linear` wrapper — the same constant-velocity marquee as the bands
         * above, running downward-to-up instead of right-to-left. Each column
         * holds its four photographs twice and travels -50%, so one authored
         * set takes 4 x 4s = 16s and the seam is invisible.
         */
        'marquee-y': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-50%)' },
        },

        /*
         * `.slide-wrap` — the startup logo strip on /success-stories-atlas.
         * Not a Swiper: a Webflow IX2 action list (`a-22`, "marquee-swiper",
         * fired on PAGE_START for this page) with two groups —
         * `TRANSFORM_MOVE x: -2184px, duration 30000, easing ""` then
         * `x: 0, duration 0` — i.e. a 30s linear travel of exactly 2184px that
         * snaps back and repeats. The distance is the designer's own number,
         * not the track width, so the loop is deliberately not seamless; it is
         * transcribed rather than recomputed.
         */
        'slide-wrap': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-2184px)' },
        },
      },

      animation: {
        'awards-marquee': 'awards-marquee 96s linear infinite',

        /*
         * ref `new Swiper('.marquee-swiper', {speed: 4000, autoplay: {delay: 0},
         * loop: true})` + `.marquee-swiper .swiper-wrapper {transition-timing-
         * function: linear}` (footer.php:294-305, header.php:542-544): delay 0
         * plus a 4000ms linear transition is a constant-velocity marquee that
         * advances exactly one slide every 4s. Each track below holds its
         * authored slides twice and travels -50%, i.e. one whole set, so the
         * duration is slideCount x 4s and the seam is invisible.
         */
        'impact-marquee-48': 'impact-marquee 48s linear infinite', // 12 slides
        'impact-marquee-56': 'impact-marquee 56s linear infinite', // 14 slides
        'impact-marquee-40': 'impact-marquee 40s linear infinite', // 10 slides

        'marquee-y-16': 'marquee-y 16s linear infinite', // 4 slides x 4s

        'slide-wrap': 'slide-wrap 30s linear infinite', // ref IX2 a-22
      },

      zIndex: {
        9: '9',
        11: '11',
        100: '100',
        900: '900',
        1000: '1000',
        1090: '1090',
        1100: '1100',
        /* above the reference's fixed header bars (1090 / 1100), for overlays
           that must cover the whole viewport */
        2000: '2000',
      },
    },
  },

  plugins: [],
};
