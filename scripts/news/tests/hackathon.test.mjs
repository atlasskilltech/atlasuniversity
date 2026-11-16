/* ATLAS Hackathon 2026 — the registration rules, the CSV reader/writer and the confirmation email.
   Pure tests (no database, no network): `npm run news:test` runs them with the rest. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normaliseMobile, validateRegistration, cleanText, rowToForm } from '../../../lib/hackathon/validate.js';
import { parseCsv, toCsv } from '../../../lib/hackathon/csv.js';
import { buildEmail, formatIst, sendConfirmation } from '@/lib/hackathon/mail';
import { istToUtc } from '@/lib/hackathon/store';

const GOOD = {
  team_name: '  Neural   Ninjas ', school_name: 'Delhi Public School', school_location: 'Andheri West, Mumbai',
  lead_name: 'Asha Rao', lead_stream: 'Science (PCM)', lead_grade: '11', lead_mobile: '+91 98765 43210', lead_email: 'Asha@School.edu.in',
  member2_name: 'Ravi K', member2_stream: 'Commerce', member2_grade: '12', member2_mobile: '098765-43211', member2_email: 'ravi@school.edu.in',
};

test('mobile numbers: the forms people type, as register.php accepted them', () => {
  assert.equal(normaliseMobile('+91 98765 43210'), '9876543210');
  assert.equal(normaliseMobile('098765-43210'), '9876543210');
  assert.equal(normaliseMobile('0919876543210'), '9876543210');
  assert.equal(normaliseMobile('9876543210'), '9876543210');
  assert.equal(normaliseMobile('5876543210'), '');
  assert.equal(normaliseMobile('98765'), '');
});

test('a valid team: cleaned, emails lower-cased, mobiles normalised', () => {
  const { errors, data } = validateRegistration(GOOD);
  assert.deepEqual(errors, {});
  assert.equal(data.team_name, 'Neural Ninjas');
  assert.equal(data.lead_email, 'asha@school.edu.in');
  assert.equal(data.lead_mobile, '9876543210');
  assert.equal(data.member2_mobile, '9876543211');
});

test('every rule and message of register.php', () => {
  const { errors } = validateRegistration({});
  assert.equal(errors.team_name, 'Please enter your team name.');
  assert.equal(errors.lead_name, 'Team lead name is required.');
  assert.equal(errors.member2_name, 'Team member 2 name is required.');
  assert.equal(errors.lead_grade, 'Please select a grade.');
  assert.equal(Object.keys(errors).length, 13);
  const bad = validateRegistration({ ...GOOD, team_name: 'X', lead_grade: '10', lead_email: 'not-an-email', member2_email: 'asha@school.edu.in' });
  assert.equal(bad.errors.team_name, 'Team name must be between 2 and 60 characters.');
  assert.equal(bad.errors.lead_grade, 'The hackathon is open to Grade 11 and Grade 12 students only.');
  assert.match(bad.errors.lead_email, /valid email/);
  const same = validateRegistration({ ...GOOD, member2_email: 'ASHA@school.edu.in', member2_mobile: '9876543210' });
  assert.equal(same.errors.member2_email, 'Both team members need different email addresses.');
  assert.equal(same.errors.member2_mobile, 'Both team members need different mobile numbers.');
  /* listed in form order */
  assert.deepEqual(Object.keys(bad.errors), ['team_name', 'lead_grade', 'lead_email']);
});

test('control characters become spaces', () => {
  assert.equal(cleanText('a\tb\n\nc\x00d'), 'a b c d');
});

test('CSV: the old site export, quotes, commas and a backslash', () => {
  const text = '﻿"id","team_name","school"\n"11","RAW\\DSTRKT","Hr college, Mumbai"\n"12","Say ""hi""","x"\n';
  const rows = parseCsv(text);
  assert.deepEqual(rows, [['id', 'team_name', 'school'], ['11', 'RAW\\DSTRKT', 'Hr college, Mumbai'], ['12', 'Say "hi"', 'x']]);
  assert.deepEqual(parseCsv(toCsv(rows)), rows);
  assert.equal(toCsv([['=1+1']]), '"\'=1+1"\r\n');
});

test('old site times are IST', () => {
  assert.equal(istToUtc('2026-10-26 12:33:30').toISOString(), '2026-10-26T07:03:30.000Z');
  assert.equal(istToUtc('nope'), null);
  assert.equal(formatIst('2026-10-26T07:03:30.000Z'), '26 Oct 2026, 12:33 PM IST');
});

const ROW = {
  id: 7, team_name: 'Neural <Ninjas>', school_college_name: 'DPS', school_college_location: 'Mumbai',
  team_lead_name: 'Asha', team_lead_stream: 'Science', team_lead_grade: '11', team_lead_mobile: '9876543210', team_lead_email: 'asha@x.in',
  member2_name: 'Ravi', member2_stream: 'Commerce', member2_grade: '12', member2_mobile: '9876543211', member2_email: 'ravi@x.in',
  created_at: new Date('2026-11-16T09:30:00Z'),
};
const ENV = { SENDGRID_API_KEY: 'SG.test', HACKATHON_MAIL_FROM: 'btech@atlasuniversity.edu.in', HACKATHON_MAIL_FROM_NAME: 'ATLAS Hackathon 2026' };

test('the confirmation email: the emailer with this team in it, every token filled, values escaped', () => {
  const mail = buildEmail(ROW, { site: 'https://example.test', img: 'https://cdn.test/assets/atlas-hackathon-2026' });
  assert.equal(mail.to, 'asha@x.in');
  assert.equal(mail.cc, 'ravi@x.in');
  assert.doesNotMatch(mail.html, /\{\{[A-Z_]+\}\}/);
  assert.doesNotMatch(mail.html, /\[[A-Z_]{4,}\]/);
  assert.doesNotMatch(mail.html, /\.\/images\//);
  assert.match(mail.html, /Neural &lt;Ninjas&gt;/);
  assert.doesNotMatch(mail.html, /Neural <Ninjas>/);
  assert.match(mail.html, /src="https:\/\/cdn\.test\/assets\/atlas-hackathon-2026\/atlas-ugdx-logo\.png"/);
  assert.match(mail.html, /16 Nov 2026, 3:00 PM IST/);
  assert.match(mail.html, /href="https:\/\/example\.test\/atlas-hackathon-2026#challenge"/);
  assert.doesNotMatch(mail.html, /Unsubscribe|Register Your Team Now/);
  assert.match(mail.text, /Team lead: Asha/);
});

test('SendGrid: lead on To, member 2 on Cc, from btech@, never throws', async () => {
  let sent;
  const ok = await sendConfirmation(ROW, { env: ENV, fetchImpl: async (url, init) => { sent = { url, init }; return new Response(null, { status: 202 }); } });
  assert.deepEqual(ok, { ok: true });
  assert.equal(sent.url, 'https://api.sendgrid.com/v3/mail/send');
  assert.equal(sent.init.headers.Authorization, 'Bearer SG.test');
  const body = JSON.parse(sent.init.body);
  assert.deepEqual(body.personalizations[0].to, [{ email: 'asha@x.in', name: 'Asha' }]);
  assert.deepEqual(body.personalizations[0].cc, [{ email: 'ravi@x.in', name: 'Ravi' }]);
  assert.deepEqual(body.from, { email: 'btech@atlasuniversity.edu.in', name: 'ATLAS Hackathon 2026' });
  assert.deepEqual(body.reply_to, { email: 'btech@atlasuniversity.edu.in' });

  const bad = await sendConfirmation(ROW, { env: ENV, fetchImpl: async () => Response.json({ errors: [{ message: 'The from address does not match a verified Sender Identity' }] }, { status: 403 }) });
  assert.equal(bad.ok, false);
  assert.match(bad.error, /403: The from address/);
  const down = await sendConfirmation(ROW, { env: ENV, fetchImpl: async () => { throw Object.assign(new Error('x'), { code: 'ECONNREFUSED' }); } });
  assert.match(down.error, /unreachable/);
  const nokey = await sendConfirmation(ROW, { env: {} });
  assert.match(nokey.error, /SENDGRID_API_KEY/);
});

test('rowToForm maps columns back to form fields', () => {
  assert.equal(rowToForm(ROW).lead_email, 'asha@x.in');
  assert.equal(rowToForm(ROW).school_name, 'DPS');
});
