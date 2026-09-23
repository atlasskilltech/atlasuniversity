/**
 * ISDI footer copy — transcribed 1:1 from
 * reference/schools/isdi/assets/include/footer.php (identical on production).
 *
 * Lines carry `\n` where the reference hard-codes a <br>.
 */

export const isdiFooter = {
  question: 'Still have Questions? \nWe’re here to help!',

  /*
   * ref `<a href="#" class="ft-links">` — the address is shown but the anchor
   * is authored with `href="#"`, not `mailto:`. Transcribed as authored rather
   * than inventing a target.
   */
  email: { label: 'isdi@atlasuniversity.edu.in', href: '#' },

  findUs: 'Find us',

  schoolName: 'ISDI School of Design and Innovation',

  address:
    'ISDI - ATLAS SkillTech University\n' +
    'Building 2, BKC 51\n' +
    'Next to Equinox Business Park\n' +
    'Bandra Kurla Complex Junction\n' +
    'Mumbai – 400051',

  copyright: '© 2026. ISDI School of Design. All Rights Reserved.',

  logo: {
    src: '/assets/images/schools/isdi/footer/isdi-parsons-logo.png',
    width: 211,
    height: 54,
    alt: 'Isdi Parsons logo',
  },

  /*
   * ref `.social-icons > img` x4 — plain images with no anchors around them,
   * so they link nowhere upstream and link nowhere here. All four files are
   * byte-identical to the ATLAS footer's icons, which are reused.
   */
  socialIcons: [
    { src: '/assets/icons/social-x.svg', name: 'tw' },
    { src: '/assets/icons/social-instagram.svg', name: 'ins' },
    { src: '/assets/icons/social-youtube.svg', name: 'yt' },
    { src: '/assets/icons/social-linkedin.svg', name: 'ln' },
  ],
};
