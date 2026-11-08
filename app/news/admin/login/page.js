import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/news/auth/admin';
import LoginForm from '@/components/News/Admin/LoginForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sign in — ATLAS News Admin',
  robots: { index: false, follow: false },
};

export default async function NewsAdminLogin() {
  if (await getAdminSession()) redirect('/news/admin');
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.08)] sm:p-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5b6170]">ATLAS News</p>
        <h1 className="mt-1 text-[24px] font-semibold leading-[1.25]">Admin sign in</h1>
        <p className="mt-2 text-[14px] leading-[1.5] text-[#5b6170]">Enter the admin password to continue.</p>
        <LoginForm />
      </div>
    </main>
  );
}
