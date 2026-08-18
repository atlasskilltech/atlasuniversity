import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

/**
 * Next.js 16 removed the `next lint` subcommand; ESLint is run directly and
 * `eslint-config-next` now ships a native flat config, so no compat shim is
 * needed.
 */
const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'reference/**', 'public/**'] },

  ...nextCoreWebVitals,

  {
    /*
     * These files render only inline SVG icons (arrows, hamburger, close,
     * social glyphs) and the wordmark. `next/image` cannot optimise SVG unless
     * `images.dangerouslyAllowSVG` is enabled, which lets arbitrary SVG through
     * the optimiser — not worth it for assets that are already 300-1500 bytes.
     *
     * The only other exemption is a single `eslint-disable-next-line` in
     * components/Programs/ProgramCard.js, where the reference already ships
     * hand-authored 300/600/1000 WebP renditions and its own `srcset`.
     */
    files: [
      'components/Header/TopBar.js',
      'components/Header/LogoBar.js',
      'components/Header/NavItem.js',
      'components/Header/DrawerHeader.js',
      'components/Footer/Footer.js',
    ],
    rules: { '@next/next/no-img-element': 'off' },
  },
];

export default eslintConfig;
