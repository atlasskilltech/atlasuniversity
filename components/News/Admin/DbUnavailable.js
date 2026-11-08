import Link from 'next/link';
import { CARD, H1, MUTED } from './ui';

/** Shown in place of an admin page when the News database cannot be reached. Names only an error code. */
export default function DbUnavailable({ title, code }) {
  return (
    <div>
      <h1 className={H1}>{title}</h1>
      <div className={`${CARD} mt-5`}>
        <p className="text-[15px] font-semibold text-[#b42318]">The News database is unavailable.</p>
        <p className={`${MUTED} mt-1`}>
          Nothing has been changed. Try again in a moment; if it persists, check <Link href="/news/admin/system" className="underline">System</Link>
          {code ? ` (error ${String(code).slice(0, 40)})` : ''}.
        </p>
      </div>
    </div>
  );
}
