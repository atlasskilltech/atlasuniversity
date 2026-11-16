'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BTN_DANGER, BTN_PRIMARY, BTN_SECONDARY, CARD, INPUT, LABEL, MUTED, cx, formatDateTime } from '@/components/News/Admin/ui';

async function post(body) {
  try {
    const res = await fetch('/admin/users/api', {
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

/** Role radio + tab checkboxes, shared by "Add a user" and "Edit". */
function AccessFields({ idPrefix, role, setRole, tabs, setTabs, allTabs }) {
  const toggle = (k) => setTabs(tabs.includes(k) ? tabs.filter((x) => x !== k) : [...tabs, k]);
  return (
    <div className="space-y-3">
      <fieldset>
        <legend className={LABEL}>Role</legend>
        <div className="flex flex-wrap gap-4 text-[14px]">
          {[
            ['admin', 'Admin', 'every tab, and can manage users'],
            ['user', 'Normal user', 'only the tabs ticked below'],
          ].map(([value, label, hint]) => (
            <label key={value} className="flex items-start gap-2">
              <input type="radio" name={`${idPrefix}-role`} value={value} checked={role === value} onChange={() => setRole(value)} className="mt-1" />
              <span>
                <span className="font-medium">{label}</span> <span className="text-[#6b7180]">— {hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {role === 'user' ? (
        <fieldset>
          <legend className={LABEL}>Tabs this user can open</legend>
          <div className="flex flex-wrap gap-4 text-[14px]">
            {allTabs.map((t) => (
              <label key={t.key} className="flex items-center gap-2">
                <input type="checkbox" checked={tabs.includes(t.key)} onChange={() => toggle(t.key)} />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}
    </div>
  );
}

function UserRow({ u, me, allTabs, busy, onRun, editing, setEditing }) {
  const [role, setRole] = useState(u.role);
  const [tabs, setTabs] = useState(u.tabs);
  const isEditing = editing === u.id;
  const access = u.role === 'admin' ? 'All tabs + Users' : u.tabs.length ? allTabs.filter((t) => u.tabs.includes(t.key)).map((t) => t.label).join(', ') : 'No tabs yet';
  const locked = u.owner || u.id === me;
  return (
    <li className="border-b border-[#f0f1f3] py-4 last:border-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2">
            <span className="break-all text-[15px] font-semibold">{u.email}</span>
            <span className={cx('rounded-full px-2.5 py-0.5 text-[12px] font-semibold', u.role === 'admin' ? 'bg-[#eef2ff] text-[#3b4fc4]' : 'bg-[#f1f2f4] text-[#4a4f5c]')}>
              {u.role === 'admin' ? 'Admin' : 'Normal user'}
            </span>
            {u.owner ? <span className="rounded-full bg-[#fff4d6] px-2.5 py-0.5 text-[12px] font-semibold text-[#7a5600]">Main admin (server setting)</span> : null}
            {u.id === me ? <span className="text-[12.5px] text-[#6b7180]">(you)</span> : null}
          </p>
          <p className={`${MUTED} mt-1`}>
            {u.name ? `${u.name} · ` : ''}
            {access} · {u.lastLoginAt ? `last signed in ${formatDateTime(u.lastLoginAt)}` : 'has not signed in yet'}
          </p>
        </div>
        {!isEditing ? (
          <div className="flex shrink-0 flex-wrap gap-2">
            <button type="button" className={BTN_SECONDARY} disabled={busy || Boolean(editing) || u.owner} onClick={() => { setRole(u.role); setTabs(u.tabs); setEditing(u.id); }}>
              Change access
            </button>
            <button
              type="button"
              className={BTN_DANGER}
              disabled={busy || locked}
              title={u.owner ? 'The main admin cannot be deleted.' : u.id === me ? 'You cannot delete yourself.' : undefined}
              onClick={() => window.confirm(`Delete ${u.email}? They will be signed out and can no longer sign in.`) && onRun({ action: 'delete', id: u.id }, 'User deleted.')}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
      {isEditing ? (
        <div className="mt-4 rounded-xl border border-[#e3e5ea] p-4">
          <AccessFields idPrefix={`u${u.id}`} role={role} setRole={setRole} tabs={tabs} setTabs={setTabs} allTabs={allTabs} />
          <div className="mt-4 flex gap-2">
            <button type="button" className={BTN_PRIMARY} disabled={busy} onClick={() => onRun({ action: 'update', id: u.id, role, tabs }, 'Access updated. It applies on their next click.')}>
              Save
            </button>
            <button type="button" className={BTN_SECONDARY} disabled={busy} onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </li>
  );
}

/** /admin/users: the user list, "Add a user", change access, delete. */
export default function UsersManager({ users, tabs: allTabs, me, domain }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);
  const [editing, setEditing] = useState(null);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [tabs, setTabs] = useState([]);

  const run = async (body, done, after) => {
    setBusy(true);
    setMessage(null);
    const r = await post(body);
    setBusy(false);
    if (!r.ok) return setMessage({ error: true, text: r.data.error || 'The change could not be saved.' });
    setMessage({ error: false, text: done });
    setEditing(null);
    after?.();
    router.refresh();
    return undefined;
  };

  const add = (e) => {
    e.preventDefault();
    run({ action: 'add', email, role, tabs }, `${email.trim().toLowerCase()} added. They can now sign in with Google.`, () => {
      setEmail('');
      setRole('user');
      setTabs([]);
    });
  };

  const admins = users.filter((u) => u.role === 'admin').length;
  return (
    <div className="space-y-5">
      {message ? (
        <p role="status" className={cx('rounded-xl px-4 py-3 text-[14px]', message.error ? 'bg-[#fdecea] text-[#b42318]' : 'bg-[#e7f6ec] text-[#11733b]')}>
          {message.text}
        </p>
      ) : null}

      <section className={CARD}>
        <h2 className="text-[16px] font-semibold">Add a user</h2>
        <form onSubmit={add} className="mt-3 space-y-4" noValidate>
          <label className="block sm:max-w-[420px]">
            <span className={LABEL}>Google email</span>
            <input type="email" className={INPUT} placeholder={`name@${domain}`} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" required />
          </label>
          <AccessFields idPrefix="new" role={role} setRole={setRole} tabs={tabs} setTabs={setTabs} allTabs={allTabs} />
          <button type="submit" className={BTN_PRIMARY} disabled={busy || !email.trim()}>
            Add user
          </button>
        </form>
      </section>

      <section className={CARD}>
        <h2 className="text-[16px] font-semibold">
          Users <span className="font-normal text-[#5b6170]">· {users.length} total, {admins} admin{admins === 1 ? '' : 's'}</span>
        </h2>
        <ul className="mt-2">
          {users.map((u) => (
            <UserRow key={u.id} u={u} me={me} allTabs={allTabs} busy={busy} onRun={run} editing={editing} setEditing={setEditing} />
          ))}
        </ul>
      </section>
    </div>
  );
}
