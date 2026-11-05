'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { copyText } from '@/lib/brand/utils';

/*
 * The brand kit's toast + screen-reader announcer (ref #toast / #live): one provider for the whole
 * /brand page and its tools, so every copy, download and tool status speaks through the same
 * polite live region and the same bubble at the bottom of the screen.
 *
 *   notify(message, { error, swatch })   show a message (error = uGDX red bubble, swatch = colour chip)
 *   copy(text, { label, swatch })        copy to the clipboard and announce it; resolves true/false
 */
const ToastContext = createContext({ notify: () => {}, copy: async () => false });

export function useBrandToast() {
  return useContext(ToastContext);
}

export default function BrandToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [live, setLive] = useState('');
  const timer = useRef(null);

  const notify = useCallback((message, opts = {}) => {
    setLive(message);
    setToast({ message, error: Boolean(opts.error), swatch: opts.swatch || null, key: Date.now() });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), opts.error ? 3200 : 1800);
  }, []);

  const copy = useCallback(
    async (text, opts = {}) => {
      const ok = await copyText(text);
      if (ok) notify(`Copied ${opts.label || text}`, { swatch: opts.swatch });
      else notify(`Couldn't copy${opts.label ? ` ${opts.label}` : ''}. Please copy it manually.`, { error: true });
      return ok;
    },
    [notify],
  );

  return (
    <ToastContext.Provider value={{ notify, copy }}>
      {children}
      <div className="sr-only" aria-live="polite">
        {live}
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 bottom-6 z-2000 flex justify-center px-4 transition duration-200 ${toast ? 'opacity-100' : 'opacity-0'}`}
      >
        {toast && (
          <p
            key={toast.key}
            className={`flex max-w-full items-center gap-3 rounded-full py-2.5 pl-3 pr-5 text-sm font-semibold text-white shadow-xl ${toast.error ? 'bg-brand-ugdx' : 'bg-brand-indigo'}`}
          >
            {toast.swatch && <span className="h-5 w-5 shrink-0 rounded-full ring-2 ring-white/70" style={{ background: toast.swatch }} />}
            <span className="min-w-0 break-words">{toast.message}</span>
          </p>
        )}
      </div>
    </ToastContext.Provider>
  );
}
