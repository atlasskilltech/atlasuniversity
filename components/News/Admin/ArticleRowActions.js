'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from './api';
import { BTN_DANGER, BTN_GHOST, BTN_SECONDARY } from './ui';

/** Per-row actions on the articles list. Trash is reversible (Restore), so it asks only once. */
export default function ArticleRowActions({ id, state }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function act(method, path, confirmText, then) {
    if (confirmText && !window.confirm(confirmText)) return;
    setBusy(true);
    setError('');
    const r = await api(method, path);
    setBusy(false);
    if (!r.ok) return setError(r.data.error || 'Failed.');
    if (then) then(r.data);
    router.refresh();
  }

  return (
    <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
      <div className="flex flex-wrap gap-1.5">
        {state === 'trash' ? (
          <button type="button" disabled={busy} className={BTN_SECONDARY} onClick={() => act('POST', `/articles/${id}/restore`)}>
            Restore as draft
          </button>
        ) : (
          <>
            <Link href={`/news/admin/articles/${id}`} className={BTN_SECONDARY}>
              Edit
            </Link>
            <a href={`/news/admin/preview/${id}`} target="_blank" rel="noopener noreferrer" className={BTN_GHOST}>
              Preview
            </a>
            <button type="button" disabled={busy} className={BTN_GHOST} onClick={() => act('POST', `/articles/${id}/duplicate`, null, (d) => router.push(`/news/admin/articles/${d.id}`))}>
              Duplicate
            </button>
            <button type="button" disabled={busy} className={BTN_DANGER} onClick={() => act('DELETE', `/articles/${id}`, 'Move this article to Trash? It will be taken off the site and the homepage. You can restore it later (as a draft).')}>
              Trash
            </button>
          </>
        )}
      </div>
      {error ? <p role="alert" className="text-[12.5px] font-medium text-[#b42318]">{error}</p> : null}
    </div>
  );
}
