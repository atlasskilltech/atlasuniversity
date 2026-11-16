'use server';

/**
 * The registration form's server action — the POST half of the old register.php:
 * validate on the server, refuse a duplicate team (team name + lead email), save the row, send the
 * confirmation email to every member, then send the browser to the success page. The row is saved
 * before the email is sent, so a mail problem only costs the email, never the registration.
 *
 * The success page finds the registration through a short-lived httpOnly cookie holding its id and a
 * random token (the old site used the PHP session), so the URL stays clean and refreshing the success
 * page can never register the team twice.
 */
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NewsDbConfigError } from '@/lib/news/db/pool';
import { newsClientIp } from '@/lib/news/http/clientIp';
import { FIELDS, validateRegistration } from '@/lib/hackathon/validate';
import { CONFIRM_COOKIE, DuplicateTeamError, createRegistration, getRegistration, isRegistrationOpen, setMailStatus } from '@/lib/hackathon/store';
import { sendConfirmation } from '@/lib/hackathon/mail';

/* at most 6 submissions per IP per 10 minutes (per server process) — enough for a school lab sharing
   one connection, not for a script */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return false;
}

export async function submitRegistration(prev, formData) {
  const seq = (prev?.seq || 0) + 1;
  const values = {};
  for (const k of FIELDS) {
    const v = formData.get(k);
    values[k] = typeof v === 'string' ? v.slice(0, 300) : '';
  }
  const state = (extra) => ({ seq, values, errors: {}, formError: '', ...extra });

  /* the hidden "website" field is invisible to people; only form-filling bots fill it */
  if (String(formData.get('website') || '').trim()) return state({ formError: 'Registration could not be saved right now. Please try again in a few minutes.' });

  if (!(await isRegistrationOpen())) return state({ closed: true, formError: 'Registrations for ATLAS Hackathon 2026 are closed.' });

  const { errors, data } = validateRegistration(values);
  const count = Object.keys(errors).length;
  if (count) return state({ errors, formError: `Please correct the ${count} highlighted ${count === 1 ? 'field' : 'fields'} and submit again.` });

  const h = await headers();
  if (limited(newsClientIp({ headers: h }) || 'unknown')) {
    return state({ formError: 'Too many registrations from this connection. Please wait a few minutes and try again.' });
  }

  let created;
  try {
    created = await createRegistration(data);
  } catch (e) {
    if (e instanceof DuplicateTeamError) return state({ formError: 'This team appears to be already registered.' });
    if (!(e instanceof NewsDbConfigError)) console.error(`[hackathon] registration not saved: ${e?.code || e?.name || 'error'}`);
    return state({ formError: 'Registration could not be saved right now. Please try again in a few minutes.' });
  }

  /* one confirmation to the whole team; failures are logged and recorded, never shown as a lost registration */
  try {
    const row = await getRegistration(created.id);
    const mail = row ? await sendConfirmation(row) : { ok: false, error: 'row not found' };
    await setMailStatus(created.id, mail.ok, mail.error);
  } catch (e) {
    console.error(`[hackathon] mail status not recorded for registration ${created.id}: ${e?.code || e?.name || 'error'}`);
  }

  (await cookies()).set(CONFIRM_COOKIE, `${created.id}.${created.token}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/atlas-hackathon-2026',
    maxAge: 2 * 60 * 60,
  });
  redirect('/atlas-hackathon-2026/register/success');
}
