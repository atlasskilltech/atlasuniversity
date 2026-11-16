'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import KeyDatesGrid from '@/components/KeyDates/Grid';
import { BTN_DANGER, BTN_PRIMARY, BTN_SECONDARY, CARD, INPUT, LABEL, MUTED, cx, formatDateTime } from '@/components/News/Admin/ui';
import { newTable } from '@/lib/keydates/table';
import TableEditor from './TableEditor';

const BADGE = {
  original: ['As built', 'bg-[#f1f2f4] text-[#4a4f5c]'],
  edited: ['Edited', 'bg-[#eef2ff] text-[#3b4fc4]'],
  hidden: ['Hidden', 'bg-[#fdecea] text-[#b42318]'],
  added: ['Added', 'bg-[#e7f6ec] text-[#11733b]'],
};

async function post(pageId, body) {
  try {
    const res = await fetch(`/admin/keydates/api/${pageId}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    let data = {};
    try {
      data = await res.json();
    } catch {
      data = { error: `Unexpected response (${res.status}).` };
    }
    if (res.status === 401) data.error = 'Your session has ended. Sign in again in another tab, then retry.';
    return { ok: res.ok, data };
  } catch {
    return { ok: false, data: { error: 'Could not reach the server. Check your connection and try again.' } };
  }
}

/** One page's key-dates tables: each with its status, a preview and its actions; plus "Add a table". */
export default function KeyDatesManager({ detail }) {
  const router = useRouter();
  const { page, tables, tabs, addTargets } = detail;
  const [editing, setEditing] = useState(null); // slot id, or 'new'
  const [addTab, setAddTab] = useState(addTargets[0]?.tab ?? null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const run = async (body, done) => {
    setBusy(true);
    setMessage(null);
    const r = await post(page.id, body);
    setBusy(false);
    if (!r.ok) return setMessage({ error: true, text: r.data.error || 'The change could not be saved.' });
    setMessage({ error: false, text: done });
    setEditing(null);
    router.refresh();
    return undefined;
  };

  const confirmRun = (text, body, done) => {
    if (window.confirm(text)) run(body, done);
  };

  return (
    <div className="space-y-5">
      {message ? (
        <p role="status" className={cx('rounded-xl px-4 py-3 text-[14px]', message.error ? 'bg-[#fdecea] text-[#b42318]' : 'bg-[#e7f6ec] text-[#11733b]')}>
          {message.text}
        </p>
      ) : null}

      {tables.map((t) => {
        const [badge, tone] = BADGE[t.status];
        const isEditing = editing === t.slot;
        return (
          <section key={t.slot} className={CARD}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2">
                  <span className="text-[16px] font-semibold">{t.label}</span>
                  <span className={cx('rounded-full px-2.5 py-0.5 text-[12px] font-semibold', tone)}>{badge}</span>
                </p>
                {t.calendar ? (
                  <p className="mt-1 text-[13px]">
                    <span className="rounded-full bg-[#fff4d6] px-2.5 py-0.5 font-semibold text-[#7a5600]">Shared with {t.calendar.pages - 1} other page{t.calendar.pages > 2 ? 's' : ''}</span>{' '}
                    <a href={`/admin/keydates/calendar/${t.calendar.id}`} className="font-medium underline">
                      Edit on all {t.calendar.pages} pages
                    </a>
                    <span className="text-[#5b6170]"> — or Edit below to change this page only.</span>
                  </p>
                ) : null}
                <p className={`${MUTED} mt-1`}>
                  {tabs && t.tab != null ? `Tab: ${tabs[t.tab]} · ` : ''}
                  {t.status === 'hidden' ? 'Not shown on the page' : `${t.dates} key dates`}
                  {t.updatedAt ? ` · changed ${formatDateTime(t.updatedAt)}` : ''}
                </p>
              </div>
              {!isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {t.status !== 'hidden' ? (
                    <button type="button" className={BTN_PRIMARY} disabled={busy || Boolean(editing)} onClick={() => setEditing(t.slot)}>
                      Edit
                    </button>
                  ) : null}
                  {t.status === 'added' ? (
                    <button type="button" className={BTN_DANGER} disabled={busy} onClick={() => confirmRun('Delete this added table from the page?', { action: 'reset', slot: t.slot }, 'Table deleted.')}>
                      Delete
                    </button>
                  ) : t.status === 'hidden' ? (
                    <button type="button" className={BTN_SECONDARY} disabled={busy} onClick={() => run({ action: 'show', slot: t.slot }, 'The table is shown again.')}>
                      Show again
                    </button>
                  ) : (
                    <button type="button" className={BTN_SECONDARY} disabled={busy} onClick={() => confirmRun('Hide this table on the website? You can show it again later.', { action: 'hide', slot: t.slot }, 'Table hidden.')}>
                      Hide
                    </button>
                  )}
                  {t.status === 'edited' || t.status === 'hidden' ? (
                    <button type="button" className={BTN_SECONDARY} disabled={busy} onClick={() => confirmRun('Put this table back exactly as the website was built? Your changes to it are removed.', { action: 'reset', slot: t.slot }, 'Table reset to how the website was built.')}>
                      Reset to original
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="mt-4">
              {isEditing ? (
                <TableEditor
                  initial={t.table}
                  original={t.original}
                  allowButton={Boolean(t.table.button || t.original?.button)}
                  saving={busy}
                  onCancel={() => setEditing(null)}
                  onSave={(table) => run({ action: 'save', slot: t.slot, table }, 'Saved. The website shows the change within a minute.')}
                />
              ) : t.status !== 'hidden' ? (
                <div className="overflow-hidden rounded-xl border border-[#eef0f3] p-3 text-[16px]">
                  <KeyDatesGrid table={t.table} />
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      {addTargets.length ? (
        <section className={CARD}>
          <h2 className="text-[16px] font-semibold">Add a new key-dates table</h2>
          {editing === 'new' ? (
            <div className="mt-4">
              <TableEditor
                initial={newTable()}
                original={null}
                allowButton
                saving={busy}
                onCancel={() => setEditing(null)}
                onSave={(table) => run({ action: 'add', tab: addTab, table }, 'Table added. The website shows it within a minute.')}
              />
            </div>
          ) : (
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
              {addTargets.length > 1 ? (
                <label className="sm:w-[360px]">
                  <span className={LABEL}>Add it to the tab</span>
                  <select className={INPUT} value={addTab ?? ''} onChange={(e) => setAddTab(Number(e.target.value))}>
                    {addTargets.map((a) => (
                      <option key={a.tab} value={a.tab}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <p className={MUTED}>It is shown after this page’s existing key dates.</p>
              )}
              <button type="button" className={BTN_PRIMARY} disabled={busy || Boolean(editing)} onClick={() => setEditing('new')}>
                Add table
              </button>
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}
