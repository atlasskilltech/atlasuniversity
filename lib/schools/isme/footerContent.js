/**
 * ISME footer copy — transcribed 1:1 from
 * reference/schools/isme/assets/include/footer.php (identical on production).
 * Lines carry `\n` where the reference hard-codes a <br>.
 */
export const ismeFooter = {
  question: 'Still have Questions? \nWe’re here to help!',

  /*
   * ref `.contact-links` — the e-mail is authored `href="#"` (no `mailto:`), the three phone
   * lines are real `tel:` links. Transcribed as authored.
   */
  contacts: [
    { label: 'isme@atlasuniversity.edu.in', href: '#' },
    { label: 'BBA | B.Sc : +91 84339 10206', href: 'tel:+918433910206' },
    { label: 'MBA : +91 73044 64621', href: 'tel:+917304464621' },
    { label: 'Summer School: +91 89767 67157', href: 'tel:+918976767157' },
  ],

  meetUs: 'Meet us',
  schoolName: 'ISME School of Management & Entrepreneurship',
  address:
    'ATLAS SkillTech University, Equinox Business Park - Tower 1,Off Bandra-Kurla Complex (BKC) Kurla West, Mumbai - 400070 Maharashtra',
  copyright: '© 2026. ISME School of Management\n& Entrepreneurship. All Rights Reserved.',

  logo: {
    src: '/assets/images/schools/isme/footer/atlas-logo.png',
    width: 178,
    height: 40,
    alt: 'Atlas Signature Logo',
  },

  // ref `.social-icons > a.w-inline-block > img` — real links here (ISDI's are bare images).
  // The four glyphs are byte-identical to the ATLAS footer's and are reused.
  social: [
    { href: 'https://x.com/atlasskilltech', src: '/assets/icons/social-x.svg', name: 'tw' },
    { href: 'https://www.instagram.com/atlasskilltechuniversity/', src: '/assets/icons/social-instagram.svg', name: 'ins' },
    { href: 'https://www.youtube.com/@atlasskilltechuniversity', src: '/assets/icons/social-youtube.svg', name: 'yt' },
    { href: 'https://www.linkedin.com/school/atlasuniversity/', src: '/assets/icons/social-linkedin.svg', name: 'ln' },
  ],
};
