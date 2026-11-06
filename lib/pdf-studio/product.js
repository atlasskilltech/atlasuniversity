/* =====================================================================
   This application's own identity.

   Deliberately separate from lib/brand.js. That file holds ATLAS
   SkillTech University's brand - the marks, colours and lockups that
   belong on the DOCUMENTS - and it is governed by the university's brand
   guidelines. What follows is the branding of the tool that makes them,
   and it belongs only to the application's own chrome.

   Keeping the two apart is what stops the product logo ever appearing on
   a fee structure, or a school lockup ever standing in for the product.
   ===================================================================== */

export const PRODUCT = {
  name: 'ATLAS Tech PDF Studio',

  /**
   * The mark in the studio's header band: the official ATLAS SkillTech
   * University logo, the very files the site header shows
   * (components/Header/LogoBar) - a white wordmark beside the colour cube,
   * drawn for a dark ground, so it sits straight on the indigo band. The
   * 2x file is the same artwork for high-density screens, as in the site
   * header. Both are `/assets/` paths, so the asset pipeline serves them.
   *
   * Intrinsic size is declared so the header reserves the right space
   * before the image arrives and nothing shifts as it loads.
   */
  logo: {
    src: '/assets/logos/atlas-logo-102x45.svg',
    srcSet: '/assets/logos/atlas-logo-102x45.svg 1x, /assets/logos/atlas-logo-204x91.svg 2x',
    width: 102,
    height: 45,
    alt: 'ATLAS SkillTech University',
  },
};
