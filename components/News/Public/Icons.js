/**
 * ATLAS News — line icons drawn in `currentColor`, so they follow the theme. Decorative by default
 * (aria-hidden); the control that owns an icon carries the accessible name.
 */
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false' };
const Svg = ({ className = 'h-5 w-5', children }) => (
  <svg {...base} className={className}>
    {children}
  </svg>
);

export const SunIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </Svg>
);
export const MoonIcon = (p) => (
  <Svg {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </Svg>
);
export const SystemIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
    <path d="M8.5 20h7M12 16.5V20" />
  </Svg>
);
export const MenuIcon = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Svg>
);
export const CloseIcon = (p) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
);
export const ArrowRightIcon = (p) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
export const ArrowLeftIcon = (p) => (
  <Svg {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
);
export const ClockIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);
export const LinkIcon = (p) => (
  <Svg {...p}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </Svg>
);
export const MailIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m4 7 8 6 8-6" />
  </Svg>
);
export const WhatsAppIcon = (p) => (
  <Svg {...p}>
    <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" />
    <path d="M9.2 8.6c.2-.4.6-.5.9-.4l.6 1.4c.1.3 0 .6-.2.8l-.4.4c.5 1.1 1.5 2.1 2.6 2.6l.4-.4c.2-.2.5-.3.8-.2l1.4.6c.2.3 0 .7-.4.9-1.6.9-5.6-2.3-5.7-5.7Z" />
  </Svg>
);
export const LinkedInIcon = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
    <path d="M8 10.5V16M8 8v.01M11.5 16v-5.5M11.5 13c0-1.5 1-2.5 2.3-2.5S16 11.5 16 13v3" />
  </Svg>
);
export const XIcon = (p) => (
  <Svg {...p}>
    <path d="M4.5 4.5 19.5 19.5M19.5 4.5 4.5 19.5" />
  </Svg>
);
export const FacebookIcon = (p) => (
  <Svg {...p}>
    <path d="M14.5 8H16V4.5h-2a4 4 0 0 0-4 4V11H8v3.5h2v5h3.5v-5h2.2l.5-3.5h-2.7V9a1 1 0 0 1 1-1Z" />
  </Svg>
);
export const InstagramIcon = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <path d="M17 7v.01" />
  </Svg>
);
export const YouTubeIcon = (p) => (
  <Svg {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
    <path d="m10.5 9.5 4 2.5-4 2.5Z" />
  </Svg>
);
