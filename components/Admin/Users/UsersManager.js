'use client';

import { useEffect, useState } from 'react';
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

const normFolder = (v) => {
  const t = String(v || '').trim().replace(/\\/g, '/').replace(/^\/+/, '').replace(/\/{2,}/g, '/');
  return t && !t.endsWith('/') ? `${t}/` : t;
};

/**
 * The one S3 folder a normal user with S3 Drive may manage. Browse the bucket and choose a folder, or
 * type a new folder's name — it is created in S3 when the user is saved.
 */
function FolderPicker({ idPrefix, value, setValue }) {
  const [at, setAt] = useState(() => {
    const v = normFolder(value);
    return v ? v.split('/').slice(0, -2).map((x) => `${x}/`).join('') : '';
  });
  const [list, setList] = useState({ loading: true, folders: [], error: '' });
  const [newName, setNewName] = useState('');

  useEffect(() => {
    let live = true;
    fetch(`/admin/s3drive/api?prefix=${encodeURIComponent(at)}`, { credentials: 'same-origin', headers: { Accept: 'application/json' } })
      .then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!live) return;
        if (!r.ok) setList({ loading: false, folders: [], error: d.error || 'Could not list S3 folders.' });
        else setList({ loading: false, folders: d.folders || [], error: '' });
      })
      .catch(() => live && setList({ loading: false, folders: [], error: 'Could not reach S3.' }));
    return () => { live = false; };
  }, [at]);

  const go = (p) => { setList((l) => ({ ...l, loading: true })); setAt(p); };
  const up = at.split('/').slice(0, -2).map((x) => `${x}/`).join('');
  const base = (p) => p.slice(0, -1).split('/').pop();
  const chosen = normFolder(value);
  const addNew = () => {
    const n = newName.trim().replace(/\//g, '');
    if (!n) return;
    setValue(`${at}${n}/`);
    setNewName('');
  };

  return (
    <div className="mt-3 rounded-xl border border-[#e3e5ea] bg-[#fafbfc] p-3 sm:max-w-[640px]">
      <label className="block">
        <span className={LABEL}>S3 folder this user can manage</span>
        <span className="flex items-center rounded-md border border-[#d6d9e0] bg-white pl-2 text-[14px] focus-within:border-[#14161a]">
          <span className="text-[#8a8f9b]">/</span>
          <input
            id={`${idPrefix}-s3folder`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="choose below, or type a path e.g. events/2026/"
            className="h-9 min-w-0 flex-1 bg-transparent px-1 outline-none"
            spellCheck={false}
          />
        </span>
      </label>
      <p className={`${MUTED} mt-1 text-[12.5px]`}>
        They will see only this folder in S3 Drive, and can upload, create folders and delete inside it — nothing outside it.
      </p>

      <div className="mt-3 rounded-lg border border-[#e3e5ea] bg-white">
        <div className="flex items-center justify-between gap-2 border-b border-[#eef0f3] px-3 py-2 text-[13px]">
          <span className="min-w-0 truncate font-medium">Browsing: /{at}</span>
          <span className="flex flex-none gap-2">
            {at ? <button type="button" className="text-[#3b4fc4] hover:underline" onClick={() => go(up)}>↑ Up</button> : null}
            {at ? (
              <button type="button" className={cx(BTN_SECONDARY, 'h-7 px-2 text-[12.5px]')} onClick={() => setValue(at)}>
                Use this folder
              </button>
            ) : null}
          </span>
        </div>
        <ul className="max-h-[200px] overflow-auto text-[13.5px]">
          {list.loading ? <li className={`${MUTED} px-3 py-2`}>Loading…</li> : null}
          {list.error ? <li className="px-3 py-2 text-[#b42318]">{list.error}</li> : null}
          {!list.loading && !list.error && !list.folders.length ? <li className={`${MUTED} px-3 py-2`}>No folders here.</li> : null}
          {!list.loading && list.folders.map((f) => (
            <li key={f} className={cx('flex items-center justify-between gap-2 border-b border-[#f4f5f7] px-3 py-1.5 last:border-0', chosen === f && 'bg-[#eef2ff]')}>
              <button type="button" className="flex min-w-0 items-center gap-2 text-left hover:underline" onClick={() => go(f)}>
                <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none text-[#e8a317]" fill="currentColor" aria-hidden="true"><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                <span className="truncate">{base(f)}</span>
              </button>
              <button type="button" className="flex-none text-[12.5px] font-medium text-[#3b4fc4] hover:underline" onClick={() => setValue(f)}>
                {chosen === f ? 'Selected ✓' : 'Select'}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-2 border-t border-[#eef0f3] px-3 py-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addNew(); } }}
            placeholder={`New folder in /${at}`}
            aria-label="New folder name"
            className={cx(INPUT, 'h-8 max-w-[260px] py-1 text-[13px]')}
          />
          <button type="button" className={cx(BTN_SECONDARY, 'h-8 px-3 text-[13px]')} onClick={addNew} disabled={!newName.trim()}>
            Create &amp; select
          </button>
          <span className={`${MUTED} text-[12px]`}>Created in S3 when you save.</span>
        </div>
      </div>
    </div>
  );
}

/** Role radio + tab checkboxes (+ the S3 folder when S3 Drive is ticked), shared by "Add a user" and "Edit". */
function AccessFields({ idPrefix, role, setRole, tabs, setTabs, allTabs, s3Folder, setS3Folder }) {
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
          {tabs.includes('s3drive') ? <FolderPicker idPrefix={idPrefix} value={s3Folder} setValue={setS3Folder} /> : null}
        </fieldset>
      ) : null}
    </div>
  );
}

function UserRow({ u, me, allTabs, busy, onRun, editing, setEditing }) {
  const [role, setRole] = useState(u.role);
  const [tabs, setTabs] = useState(u.tabs);
  const [s3Folder, setS3Folder] = useState(u.s3Folder || '');
  const isEditing = editing === u.id;
  const access = u.role === 'admin'
    ? 'All tabs + Users'
    : u.tabs.length
      ? allTabs.filter((t) => u.tabs.includes(t.key)).map((t) => (t.key === 's3drive' ? `S3 Drive (/${u.s3Folder || '?'})` : t.label)).join(', ')
      : 'No tabs yet';
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
            {access} · {u.lastLoginAt ? `last signed in ${formatDateTime(u.lastLoginAt)}` : 'has not signed in yet'} ·{' '}
            <a href={`/admin/activity?user=${encodeURIComponent(u.email)}`} className="font-medium text-[#14161a] underline">
              View activity
            </a>
          </p>
        </div>
        {!isEditing ? (
          <div className="flex shrink-0 flex-wrap gap-2">
            <button type="button" className={BTN_SECONDARY} disabled={busy || Boolean(editing) || u.owner} onClick={() => { setRole(u.role); setTabs(u.tabs); setS3Folder(u.s3Folder || ''); setEditing(u.id); }}>
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
          <AccessFields idPrefix={`u${u.id}`} role={role} setRole={setRole} tabs={tabs} setTabs={setTabs} allTabs={allTabs} s3Folder={s3Folder} setS3Folder={setS3Folder} />
          <div className="mt-4 flex gap-2">
            <button type="button" className={BTN_PRIMARY} disabled={busy} onClick={() => onRun({ action: 'update', id: u.id, role, tabs, s3Folder }, 'Access updated. It applies on their next click.')}>
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
  const [s3Folder, setS3Folder] = useState('');

  const run = async (body, done, after) => {
    setBusy(true);
    setMessage(null);
    const r = await post(body);
    setBusy(false);
    if (!r.ok) return setMessage({ error: true, text: r.data.error || 'The change could not be saved.' });
    setMessage({ error: false, text: r.data.note ? `${done} ${r.data.note}` : done });
    setEditing(null);
    after?.();
    router.refresh();
    return undefined;
  };

  const add = (e) => {
    e.preventDefault();
    run({ action: 'add', email, role, tabs, s3Folder }, `${email.trim().toLowerCase()} added. They can now sign in with Google.`, () => {
      setEmail('');
      setRole('user');
      setTabs([]);
      setS3Folder('');
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
          <AccessFields idPrefix="new" role={role} setRole={setRole} tabs={tabs} setTabs={setTabs} allTabs={allTabs} s3Folder={s3Folder} setS3Folder={setS3Folder} />
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
