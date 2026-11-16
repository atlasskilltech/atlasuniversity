import { fail, json, requireAdminApi } from '@/lib/news/auth/admin';
import { BodyError, readBodyLimited } from '@/lib/news/http/body';
import { diffFields, logActivity } from '@/lib/admin/activity';
import { newsClientIp } from '@/lib/news/http/clientIp';
import { COLUMN, FIELDS, MEMBERS, MEMBER_PARTS, validateRegistration } from '@/lib/hackathon/validate';
import { parseCsv } from '@/lib/hackathon/csv';
import {
  DuplicateTeamError, createRegistration, deleteRegistration, getRegistration, importLegacyRows, setMailStatus, setRegistrationOpen, updateRegistration,
} from '@/lib/hackathon/store';
import { sendConfirmation } from '@/lib/hackathon/mail';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/* every column the log compares on an edit, with the form's own labels */
const PART = { name: 'name', school: 'school / college', location: 'location', stream: 'stream', grade: 'grade', mobile: 'mobile', email: 'email' };
const LABEL = {
  team_name: 'Team name',
  ...Object.fromEntries(MEMBERS.flatMap((m) => MEMBER_PARTS.map((p) => [`${m.prefix}_${p}`, `${m.label} ${PART[p]}`]))),
};
const LOG_FIELDS = FIELDS.map((k) => [COLUMN[k], LABEL[k]]);

/**
 * POST, JSON body:
 *   { action: 'open', open: true|false }          open or close the public form
 *   { action: 'add', values }                     add a team (same rules as the form; no email is sent)
 *   { action: 'update', id, values }              edit a team (same rules as the form)
 *   { action: 'delete', id }
 *   { action: 'resend', id }                      send the confirmation email again
 *   { action: 'import', csv }                     import the old PHP site's registrations.csv
 * The tab comes from this URL (/admin/hackathon/…), so requireAdminApi allows admins and the users the
 * tab is ticked for; it also enforces the same-origin check for these writes.
 */
export async function POST(request) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;
  let body;
  try {
    body = JSON.parse((await readBodyLimited(request, 2_000_000)).toString('utf8') || '{}');
  } catch (e) {
    if (e instanceof BodyError) return fail(e.status, e.code, e.message);
    return fail(400, 'bad_request', 'Invalid request.');
  }
  const id = Number(body?.id);
  const needId = () => !Number.isInteger(id) || id <= 0;
  const log = (action, summary, target, details = null) =>
    logActivity({ user: auth.session.user, tab: 'hackathon', action, summary, target, targetUrl: '/admin/hackathon', details, ip: newsClientIp(request) });
  try {
    switch (body?.action) {
      case 'open':
        await setRegistrationOpen(body.open === true);
        await log(body.open === true ? 'form.open' : 'form.close', body.open === true ? 'Opened the registration form' : 'Closed the registration form', 'Registration form');
        return json({ ok: true, open: body.open === true });

      case 'add':
      case 'update': {
        if (body.action === 'update' && needId()) return fail(400, 'bad_request', 'Invalid registration.');
        const { errors, data } = validateRegistration(body.values || {});
        if (Object.keys(errors).length) return json({ error: 'Please correct the highlighted fields.', code: 'invalid', errors }, 400);
        if (body.action === 'add') {
          const { id: newId } = await createRegistration(data, { source: 'admin' });
          await setMailStatus(newId, false, 'Added in admin — use “Send email” to send the confirmation').catch(() => {});
          const row = await getRegistration(newId);
          await log('team.add', 'Added a team', row.team_name, { changes: diffFields({}, row, LOG_FIELDS) });
          return json({ ok: true, row });
        }
        const before = await getRegistration(id);
        if (!before || !(await updateRegistration(id, data))) return fail(404, 'not_found', 'This registration no longer exists.');
        const row = await getRegistration(id);
        const changes = diffFields(before, row, LOG_FIELDS);
        if (changes.length) await log('team.edit', 'Edited a team', row.team_name, { changes });
        return json({ ok: true, row });
      }

      case 'delete':
        if (needId()) return fail(400, 'bad_request', 'Invalid registration.');
        {
          const gone = await getRegistration(id);
          if (gone && (await deleteRegistration(id))) {
            await log('team.delete', 'Deleted a team', gone.team_name, { changes: diffFields(gone, {}, LOG_FIELDS) });
          }
        }
        return json({ ok: true });

      case 'resend': {
        if (needId()) return fail(400, 'bad_request', 'Invalid registration.');
        const row = await getRegistration(id);
        if (!row) return fail(404, 'not_found', 'This registration no longer exists.');
        const mail = await sendConfirmation(row);
        await setMailStatus(id, mail.ok, mail.error);
        await log(mail.ok ? 'email.send' : 'email.failed', mail.ok ? 'Sent the confirmation email' : 'Confirmation email failed', row.team_name, {
          note: mail.ok ? `To ${row.team_lead_email}, Cc ${row.member2_email}` : mail.error,
        });
        if (!mail.ok) return json({ error: `The email was not sent: ${mail.error}`, code: 'mail_failed', row: await getRegistration(id) }, 502);
        return json({ ok: true, row: await getRegistration(id) });
      }

      case 'import': {
        const rows = parseCsv(String(body.csv || ''));
        if (rows.length < 2) return fail(400, 'bad_request', 'The file has no registrations in it.');
        const result = await importLegacyRows(rows);
        await log('import', 'Imported registrations from the old site', 'registrations.csv', {
          note: `${result.inserted} imported, ${result.skipped.length} already in the list, ${result.errors.length} not imported`,
        });
        return json({ ok: true, result });
      }

      default:
        return fail(400, 'bad_request', 'Unknown action.');
    }
  } catch (e) {
    if (e instanceof DuplicateTeamError) return fail(409, 'duplicate', 'Another registration already has this team name and team-lead email.');
    return fail(503, 'database_unavailable', 'The admin database is unavailable.', { 'X-News-Error': String(e?.code || 'error') });
  }
}
