'use client';

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BTN_DANGER, BTN_PRIMARY, BTN_SECONDARY, CARD, ERR, INPUT, INPUT_ERR, LABEL, MUTED, cx } from '@/components/News/Admin/ui';
import { FIELDS, GRADES, rowToForm } from '@/lib/hackathon/validate';

/**
 * /admin/hackathon — the registrations table and everything done to it: open / close the public form,
 * search and filter, view and edit a team, add one, delete one, re-send its confirmation email,
 * download everything as CSV, and import the old PHP site's export (registrations.csv).
 */
async function post(body) {
  try {
    const res = await fetch('/admin/hackathon/api', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({ error: `Unexpected response (${res.status}).` }));
    if (res.status === 401) data.error = 'Your session has ended. Sign in again, then retry.';
    return { ok: res.ok, data };
  } catch {
    return { ok: false, data: { error: 'Could not reach the server. Check your connection and try again.' } };
  }
}

const IST = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
const ist = (iso) => (iso ? IST.format(new Date(iso)).replace(/\b(am|pm)\b/i, (m) => m.toUpperCase()) : '—');
const istDay = (iso) => (iso ? new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date(iso)) : '');

const MAIL = {
  sent: ['Email sent', 'bg-[#e7f6ec] text-[#11733b]'],
  failed: ['Email failed', 'bg-[#fdecea] text-[#b42318]'],
  pending: ['Email pending', 'bg-[#fff8e6] text-[#6b4e00]'],
  not_sent: ['Imported', 'bg-[#f1f2f4] text-[#4a4f5c]'],
};
const SOURCE = { form: 'Website form', import: 'Old site', admin: 'Added in admin' };

const LABELS = {
  team_name: 'Team name',
  school_name: 'School / college name',
  school_location: 'School / college location',
  lead_name: 'Team lead name',
  lead_stream: 'Team lead stream',
  lead_grade: 'Team lead grade',
  lead_mobile: 'Team lead mobile',
  lead_email: 'Team lead email',
  member2_name: 'Member 2 name',
  member2_stream: 'Member 2 stream',
  member2_grade: 'Member 2 grade',
  member2_mobile: 'Member 2 mobile',
  member2_email: 'Member 2 email',
};
const WIDE = new Set(['team_name', 'school_name', 'lead_name', 'member2_name']);

function Badge({ status, error }) {
  const [label, tone] = MAIL[status] || [status, 'bg-[#f1f2f4] text-[#4a4f5c]'];
  return (
    <span title={error || undefined} className={cx('inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[12px] font-semibold', tone)}>
      {label}
    </span>
  );
}

/** View / edit (or add) one registration. */
function EditDialog({ row, onClose, onSaved }) {
  const isNew = !row;
  const [values, setValues] = useState(() => (row ? rowToForm(row) : Object.fromEntries(FIELDS.map((k) => [k, '']))));
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    const { ok, data } = await post(isNew ? { action: 'add', values } : { action: 'update', id: row.id, values });
    setBusy(false);
    if (!ok) {
      setErrors(data.errors || {});
      setMessage(data.error || 'Not saved.');
      return;
    }
    onSaved(data.row, isNew);
  }

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="hk-edit-title" className="fixed inset-0 z-[2000] flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:p-8" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form onSubmit={save} className={cx(CARD, 'w-full max-w-[760px]')}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="hk-edit-title" className="text-[18px] font-semibold">{isNew ? 'Add a team' : row.team_name}</h2>
            {!isNew ? (
              <p className={MUTED}>
                #{row.id} · registered {ist(row.created_at)} IST · {SOURCE[row.source] || row.source}
                {row.legacy_id ? ` (old site #${row.legacy_id})` : ''}
              </p>
            ) : (
              <p className={MUTED}>The same rules as the website form apply. No email is sent until you click “Send email”.</p>
            )}
          </div>
          <button type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-[20px] leading-none text-[#5b6170] hover:bg-[#f4f5f7]" aria-label="Close">
            ×
          </button>
        </div>

        {message ? <p className="mt-4 rounded-lg bg-[#fdecea] px-3 py-2 text-[14px] text-[#b42318]">{message}</p> : null}

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {FIELDS.map((k) => {
            const id = `hk-${k}`;
            const isGrade = k.endsWith('_grade');
            return (
              <div key={k} className={WIDE.has(k) ? 'sm:col-span-2' : undefined}>
                <label htmlFor={id} className={LABEL}>
                  {LABELS[k]}
                </label>
                {isGrade ? (
                  <select id={id} value={values[k]} onChange={(e) => set(k, e.target.value)} className={cx(INPUT, errors[k] && INPUT_ERR)}>
                    <option value="">Select grade</option>
                    {Object.entries(GRADES).map(([v, l]) => (
                      <option key={v} value={v}>
                        {l}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input id={id} value={values[k]} onChange={(e) => set(k, e.target.value)} className={cx(INPUT, errors[k] && INPUT_ERR)} />
                )}
                {errors[k] ? <p className={ERR}>{errors[k]}</p> : null}
              </div>
            );
          })}
        </div>

        {!isNew && row.mail_error && row.mail_status === 'failed' ? <p className={cx(MUTED, 'mt-4')}>Last email problem: {row.mail_error}</p> : null}

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button type="button" className={BTN_SECONDARY} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={BTN_PRIMARY} disabled={busy}>
            {busy ? 'Saving…' : isNew ? 'Add team' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function HackathonManager({ rows: initialRows, open: initialOpen, mailReady, disabled }) {
  const router = useRouter();
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(initialOpen);
  const [q, setQ] = useState('');
  const [grade, setGrade] = useState('all');
  const [source, setSource] = useState('all');
  const [editing, setEditing] = useState(null); // row, 'new' or null
  const [busy, setBusy] = useState(null);
  const [notice, setNotice] = useState(null); // { tone: 'ok'|'err', text }
  const fileRef = useRef(null);

  const say = (tone, text) => setNotice({ tone, text });
  const replace = (row) => setRows((rs) => rs.map((r) => (r.id === Number(row.id) ? { ...r, ...normalise(row) } : r)));

  const stats = useMemo(() => {
    const today = istDay(new Date().toISOString());
    const g = { 11: 0, 12: 0 };
    for (const r of rows) for (const k of ['team_lead_grade', 'member2_grade']) if (g[r[k]] != null) g[r[k]] += 1;
    return [
      ['Teams registered', rows.length],
      ['Students', rows.length * 2],
      ['Grade 11 / Grade 12 students', `${g[11]} / ${g[12]}`],
      ['Registered today', rows.filter((r) => istDay(r.created_at) === today).length],
    ];
  }, [rows]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (source !== 'all' && r.source !== source) return false;
      if (grade !== 'all' && r.team_lead_grade !== grade && r.member2_grade !== grade) return false;
      if (!needle) return true;
      return [r.team_name, r.school_college_name, r.school_college_location, r.team_lead_name, r.team_lead_email, r.team_lead_mobile, r.member2_name, r.member2_email, r.member2_mobile]
        .some((v) => String(v || '').toLowerCase().includes(needle));
    });
  }, [rows, q, grade, source]);

  async function toggleOpen() {
    const next = !open;
    if (!window.confirm(next ? 'Open the registration form? Teams will be able to register again.' : 'Close the registration form? The website will say registrations are closed.')) return;
    setBusy('open');
    const { ok, data } = await post({ action: 'open', open: next });
    setBusy(null);
    if (!ok) return say('err', data.error || 'Not changed.');
    setOpen(data.open);
    say('ok', data.open ? 'The registration form is open.' : 'The registration form is closed.');
  }

  async function remove(r) {
    if (!window.confirm(`Delete team “${r.team_name}”? This cannot be undone.`)) return;
    setBusy(`del-${r.id}`);
    const { ok, data } = await post({ action: 'delete', id: r.id });
    setBusy(null);
    if (!ok) return say('err', data.error || 'Not deleted.');
    setRows((rs) => rs.filter((x) => x.id !== r.id));
    say('ok', `Team “${r.team_name}” deleted.`);
  }

  async function resend(r) {
    if (!window.confirm(`Send the confirmation email to ${r.team_lead_email} (Cc ${r.member2_email})?`)) return;
    setBusy(`mail-${r.id}`);
    const { ok, data } = await post({ action: 'resend', id: r.id });
    setBusy(null);
    if (data.row) replace(data.row);
    if (!ok) return say('err', data.error || 'The email was not sent.');
    say('ok', `Confirmation email sent to team “${r.team_name}”.`);
  }

  async function importFile(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 1_500_000) return say('err', 'That file is too large for a registrations export.');
    setBusy('import');
    const csv = await file.text();
    const { ok, data } = await post({ action: 'import', csv });
    setBusy(null);
    if (!ok) return say('err', data.error || 'Not imported.');
    const { inserted, skipped, errors } = data.result;
    const parts = [`${inserted} team${inserted === 1 ? '' : 's'} imported`];
    if (skipped.length) parts.push(`${skipped.length} already in the list`);
    if (errors.length) parts.push(`${errors.length} not imported: ${errors.join('; ')}`);
    say(errors.length && !inserted ? 'err' : 'ok', `${parts.join(' · ')}.`);
    router.refresh();
  }

  // rows from the server (router.refresh) replace the local copy
  const [seen, setSeen] = useState(initialRows);
  if (seen !== initialRows) {
    setSeen(initialRows);
    setRows(initialRows);
  }

  return (
    <div className="space-y-6">
      {notice ? (
        <div role="status" className={cx('flex items-start justify-between gap-3 rounded-xl px-4 py-3 text-[14px]', notice.tone === 'ok' ? 'bg-[#e7f6ec] text-[#11733b]' : 'bg-[#fdecea] text-[#b42318]')}>
          <span>{notice.text}</span>
          <button type="button" className="text-[18px] leading-none" aria-label="Dismiss" onClick={() => setNotice(null)}>
            ×
          </button>
        </div>
      ) : null}

      {!mailReady ? (
        <div role="status" className="rounded-xl border border-[#f5d48a] bg-[#fff8e6] px-4 py-3 text-[14px] text-[#6b4e00]">
          SENDGRID_API_KEY is not set on this server, so confirmation emails cannot be sent. Registrations are still saved.
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map(([label, n]) => (
          <div key={label} className={CARD}>
            <p className={MUTED}>{label}</p>
            <p className="mt-1 text-[28px] font-semibold leading-none">{n}</p>
          </div>
        ))}
        <div className={cx(CARD, 'col-span-2 lg:col-span-1')}>
          <p className={MUTED}>Registration form</p>
          <p className={cx('mt-1 text-[20px] font-semibold leading-tight', open ? 'text-[#11733b]' : 'text-[#b42318]')}>{open ? 'Open' : 'Closed'}</p>
          <button type="button" onClick={toggleOpen} disabled={disabled || busy === 'open'} className={cx(open ? BTN_DANGER : BTN_PRIMARY, 'mt-3 w-full')}>
            {open ? 'Close the form' : 'Open the form'}
          </button>
        </div>
      </div>

      <section className={CARD}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search team, school, name, email or mobile"
              aria-label="Search registrations"
              className={cx(INPUT, 'sm:max-w-[360px]')}
            />
            <select value={grade} onChange={(e) => setGrade(e.target.value)} aria-label="Filter by grade" className={cx(INPUT, 'sm:w-[160px]')}>
              <option value="all">All grades</option>
              <option value="11">Has Grade 11</option>
              <option value="12">Has Grade 12</option>
            </select>
            <select value={source} onChange={(e) => setSource(e.target.value)} aria-label="Filter by source" className={cx(INPUT, 'sm:w-[180px]')}>
              <option value="all">All sources</option>
              <option value="form">Website form</option>
              <option value="import">Old site</option>
              <option value="admin">Added in admin</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={BTN_PRIMARY} disabled={disabled} onClick={() => setEditing('new')}>
              + Add team
            </button>
            <a href="/admin/hackathon/api/export" className={cx(BTN_SECONDARY, disabled && 'pointer-events-none opacity-55')}>
              Download CSV
            </a>
            <button type="button" className={BTN_SECONDARY} disabled={disabled || busy === 'import'} onClick={() => fileRef.current?.click()}>
              {busy === 'import' ? 'Importing…' : 'Import from old site'}
            </button>
            <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={importFile} />
          </div>
        </div>

        <p className={cx(MUTED, 'mt-3')}>
          Showing {shown.length} of {rows.length} team{rows.length === 1 ? '' : 's'}. Times are IST. “Import from old site” takes the old PHP site&rsquo;s
          registrations.csv; it can be run again safely — teams already in the list are skipped.
        </p>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-[14px]">
            <thead className="text-[12.5px] uppercase tracking-wide text-[#6b7180]">
              <tr className="border-b border-[#e3e5ea]">
                <th className="py-2 pr-3 font-semibold">Registered</th>
                <th className="py-2 pr-3 font-semibold">Team</th>
                <th className="py-2 pr-3 font-semibold">Team lead</th>
                <th className="py-2 pr-3 font-semibold">Member 2</th>
                <th className="py-2 pr-3 font-semibold">Email</th>
                <th className="py-2 font-semibold" />
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.id} className="border-b border-[#f0f1f3] align-top last:border-0">
                  <td className="whitespace-nowrap py-3 pr-3 text-[#5b6170]">
                    {ist(r.created_at)}
                    <span className="block text-[12px]">{SOURCE[r.source] || r.source}</span>
                  </td>
                  <td className="py-3 pr-3">
                    <button type="button" className="text-left font-semibold hover:underline" onClick={() => setEditing(r)}>
                      {r.team_name}
                    </button>
                    <span className="block text-[13px] text-[#5b6170]">{r.school_college_name}</span>
                    <span className="block text-[12.5px] text-[#6b7180]">{r.school_college_location}</span>
                  </td>
                  <td className="py-3 pr-3">
                    <span className="font-medium">{r.team_lead_name}</span>
                    <span className="block text-[12.5px] text-[#5b6170]">
                      Grade {r.team_lead_grade} · {r.team_lead_stream}
                    </span>
                    <a href={`mailto:${r.team_lead_email}`} className="block break-all text-[12.5px] text-[#3b5bdb] hover:underline">
                      {r.team_lead_email}
                    </a>
                    <a href={`tel:${r.team_lead_mobile}`} className="block text-[12.5px] text-[#5b6170] hover:underline">
                      {r.team_lead_mobile}
                    </a>
                  </td>
                  <td className="py-3 pr-3">
                    <span className="font-medium">{r.member2_name}</span>
                    <span className="block text-[12.5px] text-[#5b6170]">
                      Grade {r.member2_grade} · {r.member2_stream}
                    </span>
                    <a href={`mailto:${r.member2_email}`} className="block break-all text-[12.5px] text-[#3b5bdb] hover:underline">
                      {r.member2_email}
                    </a>
                    <a href={`tel:${r.member2_mobile}`} className="block text-[12.5px] text-[#5b6170] hover:underline">
                      {r.member2_mobile}
                    </a>
                  </td>
                  <td className="py-3 pr-3">
                    <Badge status={r.mail_status} error={r.mail_error} />
                    {r.mailed_at ? <span className="mt-1 block text-[12px] text-[#6b7180]">{ist(r.mailed_at)}</span> : null}
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap justify-end gap-1.5">
                      <button type="button" className={BTN_SECONDARY} onClick={() => setEditing(r)}>
                        View / Edit
                      </button>
                      <button type="button" className={BTN_SECONDARY} disabled={!mailReady || busy === `mail-${r.id}`} onClick={() => resend(r)}>
                        {busy === `mail-${r.id}` ? 'Sending…' : r.mail_status === 'sent' ? 'Re-send email' : 'Send email'}
                      </button>
                      <button type="button" className={BTN_DANGER} disabled={busy === `del-${r.id}`} onClick={() => remove(r)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!shown.length ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[#5b6170]">
                    {rows.length ? 'No team matches the search.' : 'No registrations yet.'}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      {editing ? (
        <EditDialog
          row={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={(row, isNew) => {
            setEditing(null);
            if (isNew) {
              setRows((rs) => [normalise(row), ...rs]);
              say('ok', `Team “${row.team_name}” added.`);
            } else {
              replace(row);
              say('ok', `Team “${row.team_name}” saved.`);
            }
          }}
        />
      ) : null}
    </div>
  );
}

/** A row from the API (JSON dates are already ISO strings; ids may arrive as strings). */
function normalise(row) {
  return { ...row, id: Number(row.id) };
}
