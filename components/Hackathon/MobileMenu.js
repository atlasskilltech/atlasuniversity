'use client';

/**
 * The reference's no-JS `<details>` disclosure for the mobile menu. Its one inline handler — close
 * the menu when a link inside it is clicked — becomes this onClick.
 */
export default function MobileMenu({ children }) {
  return (
    <details className="group relative n1024:hidden">
      <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-lg border border-white/15 text-white transition hover:border-cyan-300/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 [&::-webkit-details-marker]:hidden">
        <span className="sr-only">Toggle menu</span>
        <svg className="size-6 group-open:hidden" aria-hidden="true">
          <use href="#i-menu" />
        </svg>
        <svg className="hidden size-6 group-open:block" aria-hidden="true">
          <use href="#i-x" />
        </svg>
      </summary>
      <nav
        aria-label="Mobile"
        className="absolute right-0 top-14 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-hk-panel/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl"
        onClick={(e) => {
          if (e.target.closest('a')) e.currentTarget.closest('details').open = false;
        }}
      >
        {children}
      </nav>
    </details>
  );
}
