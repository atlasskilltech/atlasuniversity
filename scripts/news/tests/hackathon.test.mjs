/* ATLAS Hackathon 2026 — the registration rules, the CSV reader/writer and the confirmation email.
   Pure tests (no database, no network): `npm run news:test` runs them with the rest. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normaliseMobile, validateRegistration, cleanText, rowToForm, rowMembers, FIELDS } from '../../../lib/hackathon/validate.js';
import { parseCsv, toCsv } from '../../../lib/hackathon/csv.js';
import { buildEmail, formatIst, sendConfirmation } from '@/lib/hackathon/mail';
import { istToUtc } from '@/lib/hackathon/store';

const GOOD = {
  team_name: '  Neural   Ninjas ',
  lead_name: 'Asha Rao', lead_school: 'Delhi Public School', lead_location: 'Andheri West, Mumbai', lead_stream: 'Science (PCM)', lead_grade: '11', lead_mobile: '+91 98765 43210', lead_email: 'Asha@School.edu.in',
  member2_name: 'Ravi K', member2_school: 'Kendriya Vidyalaya', member2_location: 'Pune', member2_stream: 'Commerce', member2_grade: '12', member2_mobile: '098765-43211', member2_email: 'ravi@school.edu.in',
};
const M3 = { member3_name: 'Meera S', member3_school: 'NMIMS', member3_location: 'Vile Parle, Mumbai', member3_stream: 'Arts', member3_grade: '12', member3_mobile: '9123456780', member3_email: 'meera@x.in' };

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
  assert.deepEqual(data.members, ['lead', 'member2']);
  assert.equal(data.member2_school, 'Kendriya Vidyalaya');
  assert.equal(data.member3_name, '');
});

test('a team is 1 to 3 students', () => {
  const solo = Object.fromEntries(Object.entries(GOOD).filter(([k]) => !k.startsWith('member2')));
  assert.deepEqual(validateRegistration(solo).errors, {});
  assert.deepEqual(validateRegistration(solo).data.members, ['lead']);
  const three = validateRegistration({ ...GOOD, ...M3 });
  assert.deepEqual(three.errors, {});
  assert.deepEqual(three.data.members, ['lead', 'member2', 'member3']);
  /* member 3 needs member 2 */
  const skip = validateRegistration({ ...solo, ...M3 });
  assert.equal(skip.errors.member2_name, 'Fill in Team member 2 before Team member 3.');
  /* a member who is started must be finished */
  const half = validateRegistration({ ...solo, member2_name: 'Ravi' });
  assert.equal(half.errors.member2_school, 'Please enter the school or college name.');
  assert.equal(half.errors.member2_email, 'Email address is required.');
  /* every member a different person, across all three */
  const dup = validateRegistration({ ...GOOD, ...M3, member3_email: 'RAVI@school.edu.in', member3_mobile: '9876543210' });
  assert.equal(dup.errors.member3_email, 'Each team member needs a different email address.');
  assert.equal(dup.errors.member3_mobile, 'Each team member needs a different mobile number.');
});

test('every rule and message of register.php', () => {
  const { errors } = validateRegistration({});
  assert.equal(errors.team_name, 'Please enter your team name.');
  assert.equal(errors.lead_name, 'Team lead name is required.');
  assert.equal(errors.lead_school, 'Please enter the school or college name.');
  assert.equal(errors.lead_grade, 'Please select a grade.');
  assert.equal(errors.member2_name, undefined);
  assert.equal(Object.keys(errors).length, 8);
  assert.equal(FIELDS.length, 22);
  const bad = validateRegistration({ ...GOOD, team_name: 'X', lead_grade: '10', lead_email: 'not-an-email', member2_email: 'asha@school.edu.in' });
  assert.equal(bad.errors.team_name, 'Team name must be between 2 and 60 characters.');
  assert.equal(bad.errors.lead_grade, 'The hackathon is open to Grade 11 and Grade 12 students only.');
  assert.match(bad.errors.lead_email, /valid email/);
  const same = validateRegistration({ ...GOOD, member2_email: 'ASHA@school.edu.in', member2_mobile: '9876543210' });
  assert.equal(same.errors.member2_email, 'Each team member needs a different email address.');
  assert.equal(same.errors.member2_mobile, 'Each team member needs a different mobile number.');
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
  team_lead_name: 'Asha', team_lead_school: 'DPS', team_lead_location: 'Mumbai', team_lead_stream: 'Science', team_lead_grade: '11', team_lead_mobile: '9876543210', team_lead_email: 'asha@x.in',
  member2_name: 'Ravi', member2_school: 'KV Pune', member2_location: 'Pune', member2_stream: 'Commerce', member2_grade: '12', member2_mobile: '9876543211', member2_email: 'ravi@x.in',
  member3_name: 'Meera', member3_school: 'NMIMS', member3_location: 'Mumbai', member3_stream: 'Arts', member3_grade: '12', member3_mobile: '9123456780', member3_email: 'meera@x.in',
  created_at: new Date('2026-11-16T09:30:00Z'),
};
/* a row from before 2026-11-16 / the old site: one team-level school, two members, no per-member school */
const OLD_ROW = { ...ROW, team_lead_school: null, team_lead_location: null, member2_school: null, member2_location: null, member3_name: null, member3_school: null, member3_location: null, member3_stream: null, member3_grade: null, member3_mobile: null, member3_email: null };
const ENV = { SENDGRID_API_KEY: 'SG.test', HACKATHON_MAIL_FROM: 'btech@atlasuniversity.edu.in', HACKATHON_MAIL_FROM_NAME: 'ATLAS Hackathon 2026' };

test('the confirmation email: the emailer with this team in it, every token filled, values escaped', () => {
  const mail = buildEmail(ROW, { site: 'https://example.test', img: 'https://cdn.test/assets/atlas-hackathon-2026' });
  assert.deepEqual(mail.to, { email: 'asha@x.in', name: 'Asha' });
  assert.deepEqual(mail.cc.map((c) => c.email), ['ravi@x.in', 'meera@x.in']);
  assert.match(mail.html, /KV Pune, Pune/);
  assert.match(mail.html, /Team member 3/);
  assert.match(mail.html, /1 to 3 Students per team/);
  assert.doesNotMatch(mail.html, /2 Students per team|Teams of 2\./);
  assert.doesNotMatch(mail.html, /\{\{[A-Z_]+\}\}/);
  assert.doesNotMatch(mail.html, /\[[A-Z_]{4,}\]/);
  assert.doesNotMatch(mail.html, /\.\/images\//);
  assert.match(mail.html, /Neural &lt;Ninjas&gt;/);
  assert.doesNotMatch(mail.html, /Neural <Ninjas>/);
  assert.match(mail.html, /src="https:\/\/cdn\.test\/assets\/atlas-hackathon-2026\/atlas-ugdx-logo\.png"/);
  assert.match(mail.html, /16 Nov 2026, 3:00 PM IST/);
  assert.match(mail.html, /href="https:\/\/example\.test\/atlas-hackathon-2026#challenge"/);
  assert.doesNotMatch(mail.html, /Unsubscribe|Register Your Team Now/);
  assert.match(mail.text, /Team lead: Asha — DPS, Mumbai/);
  const solo = buildEmail({ ...ROW, member2_name: null, member3_name: null }, { site: 'https://example.test', img: 'x' });
  assert.equal(solo.cc.length, 0);
  assert.match(solo.html, /1 student</);
});

test('SendGrid: lead on To, member 2 on Cc, from btech@, never throws', async () => {
  let sent;
  const ok = await sendConfirmation(ROW, { env: ENV, fetchImpl: async (url, init) => { sent = { url, init }; return new Response(null, { status: 202 }); } });
  assert.deepEqual(ok, { ok: true });
  assert.equal(sent.url, 'https://api.sendgrid.com/v3/mail/send');
  assert.equal(sent.init.headers.Authorization, 'Bearer SG.test');
  const body = JSON.parse(sent.init.body);
  assert.deepEqual(body.personalizations[0].to, [{ email: 'asha@x.in', name: 'Asha' }]);
  assert.deepEqual(body.personalizations[0].cc, [{ email: 'ravi@x.in', name: 'Ravi' }, { email: 'meera@x.in', name: 'Meera' }]);
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

test('rowToForm / rowMembers: per-member schools, and older rows fall back to the team school', () => {
  assert.equal(rowToForm(ROW).lead_email, 'asha@x.in');
  assert.equal(rowToForm(ROW).member2_school, 'KV Pune');
  assert.equal(rowToForm(OLD_ROW).member2_school, 'DPS');
  assert.equal(rowToForm(OLD_ROW).member3_school, '');
  assert.deepEqual(rowMembers(OLD_ROW).map((m) => [m.prefix, m.school]), [['lead', 'DPS'], ['member2', 'DPS']]);
  assert.equal(rowMembers(ROW).length, 3);
});
