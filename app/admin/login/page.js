import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/news/auth/admin';
import { ALLOWED_DOMAIN } from '@/lib/admin/access';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sign in — ATLAS Admin',
  robots: { index: false, follow: false },
};

const MESSAGES = {
  not_allowed: 'This Google account has not been given access to the ATLAS admin. Ask an admin to add you in the Users tab.',
  wrong_domain: `Please sign in with your @${ALLOWED_DOMAIN} Google account.`,
  cancelled: 'Sign-in was cancelled.',
  expired: 'The sign-in took too long or was interrupted. Please try again.',
  bad_token: 'Google sign-in could not be verified. Please try again.',
  google_unreachable: 'Google could not be reached. Please try again in a moment.',
  rate_limited: 'Too many failed sign-in attempts. Please wait 15 minutes and try again.',
  not_configured: 'Google sign-in has not been set up on the server yet.',
  https_required: 'Please open the admin over HTTPS.',
  database_unavailable: 'The admin database is unavailable. Please try again shortly.',
};

/** /admin/login — "Sign in with Google". Only accounts added in the Users tab get in. */
export default async function AdminLogin({ searchParams }) {
  if (await getAdminSession()) redirect('/admin');
  const { error } = (await searchParams) || {};
  const message = typeof error === 'string' ? MESSAGES[error] : null;
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.08)] sm:p-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5b6170]">ATLAS Admin</p>
        <h1 className="mt-1 text-[24px] font-semibold leading-[1.25]">Admin sign in</h1>
        <p className="mt-2 text-[14px] leading-[1.5] text-[#5b6170]">Sign in with your @{ALLOWED_DOMAIN} Google account.</p>
        {message ? (
          <p role="alert" className="mt-5 rounded-xl bg-[#fdecea] px-4 py-3 text-[14px] leading-[1.45] text-[#b42318]">
            {message}
          </p>
        ) : null}
        {/* a plain link: the server sends the browser on to Google */}
        <a
          href="/admin/api/auth/google"
          className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#d6d9e0] bg-white text-[16px] font-semibold text-[#14161a] transition hover:bg-[#f4f5f7]"
        >
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          Sign in with Google
        </a>
      </div>
    </main>
  );
}
