'use client';

/**
 * Client → admin API. Same-origin only (the browser sends the Origin header the server checks); the
 * session cookie rides along because its path is /news/admin. Never throws: returns
 * { ok, status, data } where data is the parsed JSON (or { error } for a network failure).
 */
export async function api(method, path, body) {
  const init = { method, credentials: 'same-origin', headers: { Accept: 'application/json' } };
  if (body instanceof FormData) init.body = body;
  else if (body !== undefined) {
    init.headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(body);
  }
  try {
    const res = await fetch(`/news/admin/api${path}`, init);
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = { error: `Unexpected response (${res.status}).` };
    }
    if (res.status === 401) data = { ...data, error: 'Your session has ended. Sign in again in another tab, then retry — nothing has been lost on this page.' };
    return { ok: res.ok, status: res.status, data: data || {} };
  } catch {
    return { ok: false, status: 0, data: { error: 'Could not reach the server. Check your connection and try again.' } };
  }
}
