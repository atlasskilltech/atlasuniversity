'use client';

import { useState } from 'react';

export default function LogoutButton() {
  const [busy, setBusy] = useState(false);
  async function onClick() {
    setBusy(true);
    try {
      await fetch('/news/admin/api/logout', { method: 'POST', credentials: 'same-origin' });
    } finally {
      window.location.replace('/news/admin/login');
    }
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="h-9 shrink-0 rounded-lg border border-[#d6d9e0] px-3 text-[14px] font-medium transition hover:bg-[#f4f5f7] disabled:opacity-60"
    >
      {busy ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
