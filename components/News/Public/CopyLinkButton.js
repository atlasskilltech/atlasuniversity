'use client';

import { useState } from 'react';
import { LinkIcon } from './Icons';
import { cx, FOCUS } from './ui';

/** Copies the article's canonical URL. The only client code on an article page besides the header. */
export default function CopyLinkButton({ url, className }) {
  const [status, setStatus] = useState('');

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Link copied');
    } catch {
      setStatus('Copy failed');
    }
    window.setTimeout(() => setStatus(''), 2200);
  }

  return (
    <button type="button" onClick={copy} aria-label="Copy link to this article" title="Copy link" className={cx(className, FOCUS)}>
      <LinkIcon className="h-[18px] w-[18px]" />
      <span role="status" aria-live="polite" className="sr-only">
        {status}
      </span>
      {status ? (
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-news-ink px-2 py-1 font-sans text-[11px] font-semibold text-news-paper">
          {status}
        </span>
      ) : null}
    </button>
  );
}
