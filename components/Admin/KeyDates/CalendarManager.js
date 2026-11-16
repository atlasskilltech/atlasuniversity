'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import KeyDatesGrid from '@/components/KeyDates/Grid';
import { BTN_PRIMARY, BTN_SECONDARY, CARD, MUTED, cx, formatDateTime } from '@/components/News/Admin/ui';
import TableEditor from './TableEditor';

const BADGE = {
  original: ['As built', 'bg-[#f1f2f4] text-[#4a4f5c]'],
  edited: ['Edited', 'bg-[#eef2ff] text-[#3b4fc4]'],
  hidden: ['Hidden', 'bg-[#fdecea] text-[#b42318]'],
};

async function post(id, body) {
  try {
    const res = await fetch(`/admin/keydates/api/calendar/${id}`, {
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

/**
 * A calendar shown on several pages: edit it once (the change reaches every page; a page's own wording
 * that differs from the others is kept), see every copy side by side, and — when the copies' dates
 * disagree — pick the copy whose dates every page should use.
 */
export default function CalendarManager({ detail }) {
  const router = useRouter();
  const { calendar, copies, sync } = detail;
  const primary = copies[0];
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);
  const n = copies.length;

  const run = async (body, done, confirmText) => {
    if (confirmText && !window.confirm(confirmText)) return;
    setBusy(true);
    setMessage(null);
    const r = await post(calendar.id, body);
    setBusy(false);
    if (!r.ok) {
      setMessage({ error: true, text: r.data.error || 'The change could not be saved.' });
      return;
    }
    setMessage({ error: false, text: done });
    setEditing(false);
    router.refresh();
  };

  const allHidden = copies.every((c) => c.status === 'hidden');
  const anyChanged = copies.some((c) => c.status !== 'original');

  return (
    <div className="space-y-5">
      {message ? (
        <p role="status" className={cx('rounded-xl px-4 py-3 text-[14px]', message.error ? 'bg-[#fdecea] text-[#b42318]' : 'bg-[#e7f6ec] text-[#11733b]')}>
          {message.text}
        </p>
      ) : null}

      {sync === 'differ' ? (
        <div role="alert" className="rounded-xl border border-[#f1c0bc] bg-[#fdecea] px-4 py-3 text-[14px] text-[#7a1d14]">
          <b>The dates differ between pages.</b> Check which page has the correct dates, then press “Use these dates on all pages” under it.
          Until then, editing below starts from {primary.page.school} · {primary.page.title}.
        </div>
      ) : sync === 'in-sync' && n > 1 ? (
        <p className={MUTED}>The dates are the same on all {n} pages.</p>
      ) : null}

      <section className={CARD}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-[16px] font-semibold">Edit once for all {n} pages</h2>
            <p className={`${MUTED} mt-1`}>
              Opens with {primary.page.school} · {primary.page.title}. Saving updates every page below; where a page words a cell differently
              (for example “Cycle 1” and “Current Cycle”), that page keeps its own wording and gets the changed dates.
            </p>
          </div>
          {!editing ? (
            <div className="flex flex-wrap gap-2">
              <button type="button" className={BTN_PRIMARY} disabled={busy || allHidden} onClick={() => setEditing(true)}>
                Edit
              </button>
              {allHidden ? (
                <button type="button" className={BTN_SECONDARY} disabled={busy} onClick={() => run({ action: 'show' }, `Shown again on all ${n} pages.`)}>
                  Show on all pages
                </button>
              ) : (
                <button
                  type="button"
                  className={BTN_SECONDARY}
                  disabled={busy}
                  onClick={() => run({ action: 'hide' }, `Hidden on all ${n} pages.`, `Hide this calendar on all ${n} pages? You can show it again later.`)}
                >
                  Hide on all pages
                </button>
              )}
              {anyChanged ? (
                <button
                  type="button"
                  className={BTN_SECONDARY}
                  disabled={busy}
                  onClick={() =>
                    run({ action: 'reset' }, `All ${n} pages are back to how the website was built.`, `Put this calendar back exactly as the website was built, on all ${n} pages? Changes made in the admin are removed.`)
                  }
                >
                  Reset all to original
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
        {editing ? (
          <div className="mt-4">
            <TableEditor
              initial={primary.table}
              original={primary.original}
              allowButton={Boolean(primary.table.button || primary.original?.button)}
              saving={busy}
              onCancel={() => setEditing(false)}
              onSave={(table) => run({ action: 'save', table }, `Saved on all ${n} pages. The website shows the change within a minute.`)}
            />
          </div>
        ) : null}
      </section>

      <h2 className="pt-2 text-[17px] font-semibold">Where it is shown</h2>
      {copies.map((c) => {
        const [badge, tone] = BADGE[c.status];
        return (
          <section key={`${c.page.id}:${c.slot}`} className={CARD}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2">
                  <a href={c.page.route} target="_blank" rel="noopener noreferrer" className="text-[16px] font-semibold hover:underline">
                    {c.page.school} · {c.page.title} ↗
                  </a>
                  <span className={cx('rounded-full px-2.5 py-0.5 text-[12px] font-semibold', tone)}>{badge}</span>
                </p>
                <p className={`${MUTED} mt-1`}>
                  {c.page.route} · {c.dates} key dates{c.updatedAt ? ` · changed ${formatDateTime(c.updatedAt)}` : ''}
                </p>
              </div>
              {sync === 'differ' && c.status !== 'hidden' ? (
                <button
                  type="button"
                  className={BTN_SECONDARY}
                  disabled={busy}
                  onClick={() =>
                    run(
                      { action: 'adopt', page: c.page.id, slot: c.slot },
                      `Every page now shows the dates from ${c.page.school} · ${c.page.title}.`,
                      `Use the dates from ${c.page.school} · ${c.page.title} on all ${n} pages?`
                    )
                  }
                >
                  Use these dates on all pages
                </button>
              ) : null}
            </div>
            {c.status !== 'hidden' ? (
              <div className="mt-4 overflow-hidden rounded-xl border border-[#eef0f3] p-3 text-[16px]">
                <KeyDatesGrid table={c.table} />
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
