import 'server-only';

/**
 * ATLAS Hackathon 2026 — the confirmation email, sent through SendGrid's v3 Mail Send API.
 *
 * One email to both members: the team lead on To, member 2 on Cc (as the old register.php did), from
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

function member(label, colour, m, pad) {
  return `
              <td class="stack stack-gap" width="50%" valign="top" style="padding:${pad};">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td bgcolor="#0c0f25" style="background-color:#0c0f25; border:1px solid #1d2450; border-top:3px solid ${colour}; border-radius:10px; padding:16px 18px;">
                      <p style="${LBL} color:${colour};">${label}</p>
                      <p style="${VAL}">${esc(m.name)}</p>
                      <p style="${SUB}">Grade ${esc(m.grade)} &middot; ${esc(m.stream)}</p>
                      <p style="${SUB}">${esc(m.email)}<br />${esc(m.mobile)}</p>
                    </td>
                  </tr>
                </table>
              </td>`;
}

/** The {{CONFIRMATION}} row: "You're in" + team, school, both members, registration time. */
export function confirmationBlock(r) {
  return `    <tr>
      <td bgcolor="#070816" class="pad" style="background-color:#070816; padding:26px 40px 30px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td bgcolor="#0c2a1f" style="background-color:#0c2a1f; border:1px solid #1f6f52; border-radius:12px; padding:20px 22px;">
              <p style="${LBL} color:#6ee7b7;">&#10003;&nbsp; Registration successful</p>
              <p style="margin:8px 0 0 0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:26px; line-height:30px; color:#ffffff; font-weight:900; text-transform:uppercase;">You&rsquo;re in, ${esc(r.team)}!</p>
              <p style="margin:10px 0 0 0; mso-line-height-rule:exactly; ${F} font-size:15px; line-height:24px; color:#c7cee6;">
                Your team is registered for <span style="color:#ffffff; font-weight:bold;">ATLAS Hackathon 2026 &mdash; Prompt to Product</span>.
                Round&nbsp;1 joining instructions will be sent to both team members at these email addresses.
              </p>
            </td>
          </tr>
        </table>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:14px 0 0 0;">
          <tr>
            <td bgcolor="#0c0f25" style="background-color:#0c0f25; border:1px solid #1d2450; border-radius:10px; padding:16px 18px;">
              <p style="${LBL} color:#22d3ee;">Team</p>
              <p style="${VAL}">${esc(r.team)}</p>
              <p style="${LBL} color:#22d3ee; padding-top:12px;">School / College</p>
              <p style="${VAL}">${esc(r.school)}</p>
              <p style="${SUB}">${esc(r.location)}</p>
            </td>
          </tr>
        </table>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:12px 0 0 0;">
          <tr>${member('Team lead', '#facc15', r.lead, '0 6px 0 0')}${member('Team member 2', '#f472b6', r.member2, '0 0 0 6px')}
          </tr>
        </table>

        <p style="margin:14px 0 0 0; mso-line-height-rule:exactly; ${F} font-size:13px; line-height:20px; color:#7c88b5;">
          Registered on <span style="color:#ffffff;">${esc(r.time)}</span>
        </p>
      </td>
    </tr>`;
}

/** Registration row (DB columns) -> the values the email shows. */
export function emailData(row) {
  return {
    team: row.team_name,
    school: row.school_college_name,
    location: row.school_college_location,
    time: formatIst(row.created_at || new Date()),
    lead: { name: row.team_lead_name, grade: row.team_lead_grade, stream: row.team_lead_stream, email: row.team_lead_email, mobile: row.team_lead_mobile },
    member2: { name: row.member2_name, grade: row.member2_grade, stream: row.member2_stream, email: row.member2_email, mobile: row.member2_mobile },
  };
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
    'Round 1 joining instructions will be sent to both team members.',
    '',
    `Team: ${d.team}`,
    `School / College: ${d.school}, ${d.location}`,
    `Team lead: ${d.lead.name} (Grade ${d.lead.grade}, ${d.lead.stream}) — ${d.lead.email}, ${d.lead.mobile}`,
    `Team member 2: ${d.member2.name} (Grade ${d.member2.grade}, ${d.member2.stream}) — ${d.member2.email}, ${d.member2.mobile}`,
    `Registered on: ${d.time}`,
    '',
    `Key dates: Round 1 (online) 28 Nov 2026 · Top 15 announced 30 Nov 2026 · Grand Finale at ATLAS Mumbai 15 Dec 2026.`,
    `Details: ${cfg.site}/atlas-hackathon-2026`,
    'Questions? Call 8976870842 or write to btech@atlasuniversity.edu.in',
  ].join('\n');
  return { subject: `You're registered — ATLAS Hackathon 2026 (Team ${d.team})`, html, text, to: d.lead.email, cc: d.member2.email };
}

/** Send the confirmation for one registration row. Never throws. */
export async function sendConfirmation(row, { fetchImpl = fetch, env = process.env } = {}) {
  const cfg = mailConfig(env);
  if (!cfg.apiKey) {
    console.error('[hackathon] confirmation not sent: SENDGRID_API_KEY is not set');
    return { ok: false, error: 'SENDGRID_API_KEY is not set on the server' };
  }
  const mail = buildEmail(row, cfg);
  const personalization = { to: [{ email: mail.to, name: row.team_lead_name }] };
  if (mail.cc && mail.cc !== mail.to) personalization.cc = [{ email: mail.cc, name: row.member2_name }];
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
