'use client';

/**
 * Password-only admin sign-in. The password goes to POST /news/admin/api/login over the same origin and
 * is never stored in the browser; the session cookie the server sets is HttpOnly, so no script here can
 * read it.
 */
import { useState } from 'react';

const MESSAGES = {
  invalid_password: 'Incorrect password.',
  rate_limited: 'Too many failed attempts. Please wait and try again.',
  not_configured: 'The admin password has not been set up yet.',
  https_required: 'Please open the admin panel over HTTPS.',
  database_unavailable: 'The News database is unavailable. Please try again shortly.',
};

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError('');
    let message = 'Network error. Please try again.';
    try {
      const res = await fetch('/news/admin/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'same-origin',
      });
      if (res.ok) {
        /* keep the form locked while the dashboard loads */
        window.location.replace('/news/admin');
        return;
      }
      const body = await res.json().catch(() => ({}));
      const wait = res.headers.get('Retry-After');
      message = (MESSAGES[body.code] || 'Sign in failed.') + (res.status === 429 && wait ? ` (about ${Math.ceil(Number(wait) / 60)} min)` : '');
    } catch {
      /* network failure: keep the default message */
    }
    /* one update: clear the field, unlock it and show why — nothing typed afterwards can be wiped */
    setPassword('');
    setBusy(false);
    setError(message);
  }

  return (
    <form onSubmit={onSubmit} className="mt-6" noValidate>
      <label htmlFor="news-admin-password" className="block text-[14px] font-medium">
        Password
      </label>
      <input
        id="news-admin-password"
        type="password"
        name="password"
        autoComplete="current-password"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        required
        readOnly={busy}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 block h-12 w-full rounded-xl border border-[#d6d9e0] bg-white px-4 text-[16px] outline-none transition focus:border-[#1f4aa0] focus:ring-2 focus:ring-[#1f4aa0]/20"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'news-admin-login-error' : undefined}
      />
      {error ? (
        <p id="news-admin-login-error" role="alert" className="mt-3 text-[14px] leading-[1.4] text-[#b42318]">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={busy || !password}
        className="mt-5 h-12 w-full rounded-xl bg-[#1f4aa0] text-[16px] font-semibold text-white transition hover:bg-[#183c85] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
