/* Line icons used across /brand — the reference's inline SVGs, as components. */
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'aria-hidden': true };

export const CopyIcon = ({ className = 'h-4 w-4' }) => (
  <svg {...base} strokeWidth="2" className={className}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);
export const CloseIcon = ({ className = 'h-5 w-5' }) => (
  <svg {...base} strokeWidth="2.2" className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const UploadIcon = ({ className = 'mx-auto h-8 w-8 text-brand-indigo' }) => (
  <svg {...base} strokeWidth="1.7" className={className}>
    <path d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
);
export const DownloadIcon = ({ className = 'h-4 w-4' }) => (
  <svg {...base} strokeWidth="2" className={className}>
    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
  </svg>
);
export const CheckIcon = ({ className = 'mx-auto h-10 w-10 text-brand-teal' }) => (
  <svg {...base} strokeWidth="1.8" className={className}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
export const SearchIcon = ({ className = 'h-5 w-5' }) => (
  <svg {...base} strokeWidth="2" className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);
export const CodeIcon = ({ className = 'h-4 w-4' }) => (
  <svg {...base} strokeWidth="2" className={className}>
    <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12" />
  </svg>
);
export const FileIcon = ({ className = 'h-7 w-7 shrink-0 text-brand-indigo' }) => (
  <svg {...base} strokeWidth="1.6" className={className}>
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M14 3v5h5" />
  </svg>
);
export const TrashIcon = ({ className = 'h-3.5 w-3.5' }) => (
  <svg {...base} strokeWidth="2" className={className}>
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
  </svg>
);
export const XSmall = ({ className = 'h-4 w-4' }) => (
  <svg {...base} strokeWidth="2" className={className}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
