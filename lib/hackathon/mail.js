import 'server-only';

/**
 * ATLAS Hackathon 2026 — the confirmation email, sent through SendGrid's v3 Mail Send API.
 *
 * One email to the whole team (1-3 students): the team lead on To, members 2 and 3 on Cc, from
 * HACKATHON_MAIL_FROM with replies to HACKATHON_MAIL_REPLY_TO. The body is the event emailer
 * (lib/hackathon/emailTemplate.js) with this team's details in place of its early "Register" button.
 *
 * Server-only environment (never NEXT_PUBLIC_):
 *   SENDGRID_API_KEY          secret; without it nothing is sent and the result says why
 *   HACKATHON_MAIL_FROM       default btech@atlasuniversity.edu.in (must be a verified SendGrid sender)
 *   HACKATHON_MAIL_FROM_NAME  default "ATLAS Hackathon 2026"
 *   HACKATHON_MAIL_REPLY_TO   default = HACKATHON_MAIL_FROM
 *   HACKATHON_SITE_URL        default https://atlasuniversity.atlasskilltech.app (links in the email)
 *
 * Images load from the S3 asset host (NEXT_PUBLIC_ASSET_BASE_URL, else the atlas-web-cdn bucket):
 * an email client needs absolute URLs, and the files are uploaded there by `assets:sync`.
 *
 * sendConfirmation never throws: the registration is already saved, so a mail problem only costs the
 * email. It returns { ok, error } and logs the reason (never the API key).
 */
import EMAIL_TEMPLATE from './emailTemplate.js';
import { rowMembers } from './validate.js';

const SENDGRID_URL = 'https://api.sendgrid.com/v3/mail/send';
const DEFAULT_FROM = 'btech@atlasuniversity.edu.in';
const DEFAULT_SITE = 'https://atlasuniversity.atlasskilltech.app';
const DEFAULT_ASSET_HOST = 'https://atlas-web-cdn.s3.ap-south-1.amazonaws.com';

export function mailConfig(env = process.env) {
  const from = (env.HACKATHON_MAIL_FROM || DEFAULT_FROM).trim();
  return {
    apiKey: (env.SENDGRID_API_KEY || '').trim(),
    from,
    fromName: (env.HACKATHON_MAIL_FROM_NAME || 'ATLAS Hackathon 2026').trim(),
    replyTo: (env.HACKATHON_MAIL_REPLY_TO || from).trim(),
    site: (env.HACKATHON_SITE_URL || DEFAULT_SITE).trim().replace(/\/+$/, ''),
    img: `${(env.NEXT_PUBLIC_ASSET_BASE_URL || DEFAULT_ASSET_HOST).trim().replace(/\/+$/, '')}/assets/atlas-hackathon-2026`,
  };
}

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** "16 Nov 2026, 3:05 PM IST" for a Date / ISO string. */
export function formatIst(d) {
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return '';
  const s = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).format(date);
  return `${s.replace(/\b(am|pm)\b/i, (m) => m.toUpperCase())} IST`;
}

const F = "font-family:Arial,Helvetica,sans-serif;";
const LBL = `margin:0; mso-line-height-rule:exactly; ${F} font-size:11px; line-height:16px; letter-spacing:2px; text-transform:uppercase; font-weight:bold;`;
const VAL = `margin:4px 0 0 0; mso-line-height-rule:exactly; ${F} font-size:15px; line-height:22px; color:#ffffff; font-weight:bold;`;
const SUB = `margin:2px 0 0 0; mso-line-height-rule:exactly; ${F} font-size:13px; line-height:20px; color:#c7cee6;`;

const TONES = ['#facc15', '#f472b6', '#22d3ee'];

/** One member's card: label, name, school + location, grade + stream, email + mobile. */
function member(m, colour) {
  return `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:12px 0 0 0;">
          <tr>
            <td bgcolor="#0c0f25" style="background-color:#0c0f25; border:1px solid #1d2450; border-left:4px solid ${colour}; border-radius:10px; padding:16px 18px;">
              <p style="${LBL} color:${colour};">${esc(m.label)}</p>
              <p style="${VAL}">${esc(m.name)}</p>
              <p style="${SUB}">${esc(m.school)}${m.location ? `, ${esc(m.location)}` : ''}</p>
              <p style="${SUB}">Grade ${esc(m.grade)} &middot; ${esc(m.stream)}</p>
              <p style="${SUB}">${esc(m.email)} &middot; ${esc(m.mobile)}</p>
            </td>
          </tr>
        </table>`;
}

/** The {{CONFIRMATION}} row: "You're in" + team, each member with their own school, registration time. */
export function confirmationBlock(r) {
  const size = r.members.length;
  return `    <tr>
      <td bgcolor="#070816" class="pad" style="background-color:#070816; padding:26px 40px 30px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td bgcolor="#0c2a1f" style="background-color:#0c2a1f; border:1px solid #1f6f52; border-radius:12px; padding:20px 22px;">
              <p style="${LBL} color:#6ee7b7;">&#10003;&nbsp; Registration successful</p>
              <p style="margin:8px 0 0 0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:26px; line-height:30px; color:#ffffff; font-weight:900; text-transform:uppercase;">You&rsquo;re in, ${esc(r.team)}!</p>
              <p style="margin:10px 0 0 0; mso-line-height-rule:exactly; ${F} font-size:15px; line-height:24px; color:#c7cee6;">
                Your team is registered for <span style="color:#ffffff; font-weight:bold;">ATLAS Hackathon 2026 &mdash; Prompt to Product</span>.
                Round&nbsp;1 joining instructions will be sent to ${size > 1 ? 'every team member at these email addresses' : 'this email address'}.
              </p>
            </td>
          </tr>
        </table>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:14px 0 0 0;">
          <tr>
            <td bgcolor="#0c0f25" style="background-color:#0c0f25; border:1px solid #1d2450; border-radius:10px; padding:16px 18px;">
              <p style="${LBL} color:#22d3ee;">Team</p>
              <p style="${VAL}">${esc(r.team)}</p>
              <p style="${SUB}">${size} ${size === 1 ? 'student' : 'students'}</p>
            </td>
          </tr>
        </table>
${r.members.map((m, i) => member(m, TONES[i])).join('')}

        <p style="margin:14px 0 0 0; mso-line-height-rule:exactly; ${F} font-size:13px; line-height:20px; color:#7c88b5;">
          Registered on <span style="color:#ffffff;">${esc(r.time)}</span>
        </p>
      </td>
    </tr>`;
}

/** Registration row (DB columns) -> the values the email shows. */
export function emailData(row) {
  return { team: row.team_name, time: formatIst(row.created_at || new Date()), members: rowMembers(row) };
}

export function buildEmail(row, cfg = mailConfig()) {
  const d = emailData(row);
  const html = EMAIL_TEMPLATE
    .replaceAll('{{PREHEADER}}', `You&rsquo;re registered! Team ${esc(d.team)} is in for ATLAS Hackathon 2026 &mdash; Round 1 details follow by email.`)
    .replace('{{CONFIRMATION}}', confirmationBlock(d))
    .replaceAll('{{SITE_URL}}', cfg.site)
    .replaceAll('{{IMG}}', cfg.img);
  const text = [
    `You're in, ${d.team}!`,
    '',
    'Your team is registered for ATLAS Hackathon 2026 — Prompt to Product.',
    `Round 1 joining instructions will be sent to ${d.members.length > 1 ? 'every team member' : 'this email address'}.`,
    '',
    `Team: ${d.team} (${d.members.length} ${d.members.length === 1 ? 'student' : 'students'})`,
    ...d.members.map((m) => `${m.label}: ${m.name} — ${m.school}, ${m.location} (Grade ${m.grade}, ${m.stream}) — ${m.email}, ${m.mobile}`),
    `Registered on: ${d.time}`,
    '',
    `Key dates: Round 1 (online) 19 Dec 2026 · Top 15 announced 23 Dec 2026 · Grand Finale at ATLAS Mumbai 16 Jan 2027.`,
    `Details: ${cfg.site}/atlas-hackathon-2026`,
    'Questions? Call 8976870842 or write to btech@atlasuniversity.edu.in',
  ].join('\n');
  const [lead, ...others] = d.members;
  return {
    subject: `You're registered — ATLAS Hackathon 2026 (Team ${d.team})`,
    html,
    text,
    to: { email: lead?.email, name: lead?.name },
    cc: others.filter((m) => m.email && m.email !== lead?.email).map((m) => ({ email: m.email, name: m.name })),
  };
}

/** Send the confirmation for one registration row. Never throws. */
export async function sendConfirmation(row, { fetchImpl = fetch, env = process.env } = {}) {
  const cfg = mailConfig(env);
  if (!cfg.apiKey) {
    console.error('[hackathon] confirmation not sent: SENDGRID_API_KEY is not set');
    return { ok: false, error: 'SENDGRID_API_KEY is not set on the server' };
  }
  const mail = buildEmail(row, cfg);
  const personalization = { to: [mail.to] };
  if (mail.cc.length) personalization.cc = mail.cc;
  const body = {
    personalizations: [personalization],
    from: { email: cfg.from, name: cfg.fromName },
    reply_to: { email: cfg.replyTo },
    subject: mail.subject,
    content: [
      { type: 'text/plain', value: mail.text },
      { type: 'text/html', value: mail.html },
    ],
    categories: ['atlas-hackathon-2026'],
    tracking_settings: { click_tracking: { enable: false, enable_text: false } },
  };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetchImpl(SENDGRID_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cfg.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal,
      cache: 'no-store',
    });
    if (res.status === 202 || res.ok) return { ok: true };
    let detail = '';
    try {
      const j = await res.json();
      detail = (j?.errors || []).map((e) => e.message).filter(Boolean).join('; ');
    } catch {
      /* no JSON body */
    }
    const error = `SendGrid ${res.status}${detail ? `: ${detail}` : ''}`;
    console.error(`[hackathon] confirmation not sent for registration ${row.id}: ${error}`);
    return { ok: false, error };
  } catch (e) {
    const error = e?.name === 'AbortError' ? 'SendGrid did not answer within 15s' : `SendGrid unreachable (${e?.code || e?.name || 'error'})`;
    console.error(`[hackathon] confirmation not sent for registration ${row.id}: ${error}`);
    return { ok: false, error };
  } finally {
    clearTimeout(timer);
  }
}
