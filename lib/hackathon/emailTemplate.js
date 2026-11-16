/**
 * ATLAS Hackathon 2026 — the confirmation email's HTML: the event emailer (emailer.php, "Emailer
 * Theme 1 - Dark Futuristic") with its early "Register" call to action replaced by this team's
 * confirmation ({{CONFIRMATION}}), the final button pointing at the hackathon page, its placeholders
 * filled, and the marketing footer line ("…expressed interest…", view in browser, unsubscribe) replaced,
 * because this is a transactional email sent once to the team that registered.
 *
 * Tokens filled by lib/hackathon/mail.js: {{PREHEADER}} {{CONFIRMATION}} {{SITE_URL}} {{IMG}}.
 * Everything else is the template byte for byte.
 */
const EMAIL_TEMPLATE = String.raw`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="dark" />
<meta name="supported-color-schemes" content="dark" />
<title>You&rsquo;re registered &mdash; ATLAS Hackathon 2026</title>

<!--[if mso]>
<xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
<![endif]-->

<style type="text/css">
  /* ---- Client resets ---- */
  html, body { margin:0 !important; padding:0 !important; height:100% !important; width:100% !important; }
  body { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; border:0; outline:none; text-decoration:none; display:block; }
  a { text-decoration:none; }
  #outlook a { padding:0; }
  .ExternalClass { width:100%; }
  .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
  /* Stop iOS/Android auto-linking dates & numbers in a brand colour we did not choose */
  u + #body a, a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }

  /* ---- Mobile ---- */
  @media screen and (max-width:620px) {
    .wrap       { width:100% !important; max-width:100% !important; }
    .pad        { padding-left:22px !important; padding-right:22px !important; }
    .pad-sm     { padding-left:16px !important; padding-right:16px !important; }
    /* box-sizing keeps a stacked cell's own padding INSIDE its 100% width,
       otherwise padding is added on top of it and the email scrolls sideways */
    .stack      { display:block !important; width:100% !important; max-width:100% !important; box-sizing:border-box !important; }
    .stack table{ box-sizing:border-box !important; }
    .stack-gap  { padding-left:0 !important; padding-right:0 !important; padding-bottom:14px !important; }
    .fluid      { width:100% !important; max-width:100% !important; height:auto !important; }
    .h1         { font-size:38px !important; line-height:40px !important; letter-spacing:-0.5px !important; }
    .h2         { font-size:25px !important; line-height:30px !important; }
    .kicker     { font-size:26px !important; line-height:30px !important; }
    /* min-width:0 + border-box stops the CTA's desktop min-width forcing
       the whole email wider than a phone screen */
    .btn a      { display:block !important; width:100% !important; min-width:0 !important; box-sizing:border-box !important; }
    .center-m   { text-align:center !important; }
    .hide-m     { display:none !important; max-height:0 !important; overflow:hidden !important; }
    .card       { margin-bottom:12px !important; }
    .logo       { width:230px !important; height:auto !important; }
  }
</style>
</head>

<body id="body" style="margin:0; padding:0; background-color:#04050e;">

<!-- Preheader : shown in the inbox preview line, never on screen -->
<div style="display:none; font-size:1px; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden; mso-hide:all; font-family:Arial,sans-serif; color:#04050e;">
  {{PREHEADER}}
  &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#04050e;">
<tr>
<td align="center" style="padding:0;">

  <!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600"><tr><td><![endif]-->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px; background-color:#070816;">

    <!-- =============================================================
         1. BRAND HEADER
         ============================================================= -->
    <tr>
      <td align="center" bgcolor="#0c0f25" class="pad" style="background-color:#0c0f25; padding:22px 32px 20px 32px; border-bottom:1px solid #1d2450;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td align="center" style="padding:0;">
              <img src="{{IMG}}/atlas-ugdx-logo.png" width="280" height="88" alt="ATLAS SkillTech University | uGDX School of Technology" class="logo" style="display:block; width:280px; height:auto; max-width:280px;" />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:16px 0 0 0;">
              <p style="margin:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:16px; letter-spacing:2.6px; text-transform:uppercase; color:#22d3ee; font-weight:bold;">A National Hackathon&nbsp;&middot;&nbsp;Grade 11 &amp; 12</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- =============================================================
         2. HERO IMAGE
         ============================================================= -->
    <tr>
      <td align="center" bgcolor="#070816" style="padding:0; font-size:0; line-height:0;">
        <img src="{{IMG}}/hero-hackathon.jpg" width="600" height="288" alt="ATLAS students building together at a laptop during a hackathon" class="fluid" style="display:block; width:100%; max-width:600px; height:auto; border:0;" />
      </td>
    </tr>
    <!-- cyan hairline under the hero -->
    <tr><td bgcolor="#22d3ee" height="3" style="background-color:#22d3ee; height:3px; line-height:3px; font-size:0;">&nbsp;</td></tr>

    <!-- =============================================================
         3. EVENT TITLE + TAGLINE
         ============================================================= -->
    <tr>
      <td bgcolor="#070816" class="pad" style="background-color:#070816; padding:36px 40px 0 40px;">

        <p style="margin:0 0 14px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:16px; letter-spacing:3px; text-transform:uppercase; color:#facc15; font-weight:bold;">ATLAS</p>

        <h1 class="h1" style="margin:0 0 18px 0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:50px; line-height:50px; letter-spacing:-1.2px; color:#ffffff; font-weight:900; text-transform:uppercase;">
          Hackathon <span style="color:#22d3ee;">2026</span>
        </h1>

        <!-- PROMPT TO PRODUCT : solid highlight bar (gradients are not safe in email) -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">
          <tr>
            <td bgcolor="#facc15" class="kicker" style="background-color:#facc15; padding:9px 18px 10px 18px; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:30px; line-height:32px; letter-spacing:-0.5px; color:#070816; font-weight:900; text-transform:uppercase;">
              Prompt to Product
            </td>
          </tr>
        </table>

        <p style="margin:0 0 18px 0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:23px; line-height:30px; font-weight:900; text-transform:uppercase; letter-spacing:0.4px;">
          <span style="color:#22d3ee;">Prompt.</span> <span style="color:#facc15;">Build.</span> <span style="color:#f472b6;">Launch.</span>
        </p>

        <p style="margin:0 0 6px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:17px; line-height:27px; color:#c7cee6;">
          Turn a prompt into a real-world solution.<br />
          <span style="color:#ffffff; font-weight:bold;">Compete. Create. Change the future.</span>
        </p>
      </td>
    </tr>

    <!-- =============================================================
         4. REGISTRATION CONFIRMATION (this team's details)
         ============================================================= -->
{{CONFIRMATION}}

    <!-- =============================================================
         5. KEY EVENT INFORMATION - 2x2 CARD GRID
         ============================================================= -->
    <tr>
      <td bgcolor="#070816" class="pad-sm" style="background-color:#070816; padding:0 28px 8px 28px;">
        <!-- The card styling sits on the TD itself, not a nested table: cells in the
             same table row are automatically equal height, so the grid stays flush. -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td class="stack card" width="48%" valign="top" bgcolor="#0c0f25" style="width:48%; background-color:#0c0f25; border:1px solid #1d2450; border-radius:10px; padding:18px;">
              <p style="margin:0 0 7px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:14px; letter-spacing:1.6px; text-transform:uppercase; color:#22d3ee; font-weight:bold;">Who can join</p>
              <p style="margin:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:17px; line-height:24px; color:#ffffff; font-weight:bold;">Grade 11 &amp; 12 Students</p>
            </td>
            <td class="hide-m" width="4%" style="width:4%; font-size:0; line-height:0;">&nbsp;</td>
            <td class="stack card" width="48%" valign="top" bgcolor="#0c0f25" style="width:48%; background-color:#0c0f25; border:1px solid #1d2450; border-radius:10px; padding:18px;">
              <p style="margin:0 0 7px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:14px; letter-spacing:1.6px; text-transform:uppercase; color:#facc15; font-weight:bold;">Team size</p>
              <p style="margin:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:17px; line-height:24px; color:#ffffff; font-weight:bold;">1 to 3 Students per team</p>
            </td>
          </tr>
          <tr><td class="hide-m" colspan="3" height="12" style="height:12px; line-height:12px; font-size:0;">&nbsp;</td></tr>
          <tr>
            <td class="stack card" width="48%" valign="top" bgcolor="#0c0f25" style="width:48%; background-color:#0c0f25; border:1px solid #1d2450; border-radius:10px; padding:18px;">
              <p style="margin:0 0 7px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:14px; letter-spacing:1.6px; text-transform:uppercase; color:#f472b6; font-weight:bold;">Round 1 &middot; Online</p>
              <p style="margin:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:17px; line-height:24px; color:#ffffff; font-weight:bold;">90-Minute Challenge</p>
            </td>
            <td class="hide-m" width="4%" style="width:4%; font-size:0; line-height:0;">&nbsp;</td>
            <td class="stack card" width="48%" valign="top" bgcolor="#0c0f25" style="width:48%; background-color:#0c0f25; border:1px solid #1d2450; border-radius:10px; padding:18px;">
              <p style="margin:0 0 7px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:14px; letter-spacing:1.6px; text-transform:uppercase; color:#34d399; font-weight:bold;">Grand Finale</p>
              <p style="margin:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:17px; line-height:24px; color:#ffffff; font-weight:bold;">ATLAS SkillTech University, Mumbai</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Top 15 highlight strip -->
    <tr>
      <td bgcolor="#070816" class="pad-sm" style="background-color:#070816; padding:8px 28px 34px 28px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#1a1505" style="background-color:#1a1505; border:1px solid #66560d; border-radius:10px;">
          <tr>
            <td class="pad-sm" style="padding:18px 20px;">
              <p style="margin:0 0 5px 0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:19px; line-height:24px; color:#facc15; font-weight:900; text-transform:uppercase;">Top 15 Teams</p>
              <p style="margin:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:23px; color:#e8e3c8;">Win a spot at ATLAS Mumbai for the Grand Finale &mdash; plus exciting prizes &amp; special recognitions.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- =============================================================
         6. KEY DATES
         ============================================================= -->
    <tr>
      <td bgcolor="#0a0d1f" class="pad" style="background-color:#0a0d1f; padding:34px 40px 10px 40px; border-top:1px solid #1d2450;">
        <p style="margin:0 0 6px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:15px; letter-spacing:2.6px; text-transform:uppercase; color:#22d3ee; font-weight:bold;">Mark your calendar</p>
        <h2 class="h2" style="margin:0 0 22px 0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:28px; line-height:32px; color:#ffffff; font-weight:900; text-transform:uppercase; letter-spacing:-0.4px;">Key Dates</h2>
      </td>
    </tr>
    <tr>
      <td bgcolor="#0a0d1f" class="pad" style="background-color:#0a0d1f; padding:0 40px 32px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="padding:0 0 10px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#0c0f25" style="background-color:#0c0f25; border-left:3px solid #22d3ee; border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:13px 16px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:21px; color:#c7cee6;">Registrations Open</td>
                  <td align="right" style="padding:13px 16px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:21px; color:#ffffff; font-weight:bold; white-space:nowrap;">1 Oct 2026</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 10px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#0c0f25" style="background-color:#0c0f25; border-left:3px solid #ff0031; border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:13px 16px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:21px; color:#c7cee6;">Registrations Close</td>
                  <td align="right" style="padding:13px 16px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:21px; color:#ffffff; font-weight:bold; white-space:nowrap;">25 Nov 2026</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 10px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#0c0f25" style="background-color:#0c0f25; border-left:3px solid #facc15; border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:13px 16px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:21px; color:#c7cee6;">Round 1 &ndash; Online Challenge</td>
                  <td align="right" style="padding:13px 16px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:21px; color:#ffffff; font-weight:bold; white-space:nowrap;">28 Nov 2026</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 10px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#0c0f25" style="background-color:#0c0f25; border-left:3px solid #f472b6; border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:13px 16px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:21px; color:#c7cee6;">Top 15 Announcement</td>
                  <td align="right" style="padding:13px 16px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:21px; color:#ffffff; font-weight:bold; white-space:nowrap;">30 Nov 2026</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#0c0f25" style="background-color:#0c0f25; border-left:3px solid #34d399; border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:13px 16px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:21px; color:#c7cee6;">Grand Finale &ndash; ATLAS Mumbai</td>
                  <td align="right" style="padding:13px 16px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:21px; color:#ffffff; font-weight:bold; white-space:nowrap;">15 Dec 2026</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- =============================================================
         7. THE CHALLENGE
         ============================================================= -->
    <tr>
      <td align="center" bgcolor="#070816" style="padding:0; font-size:0; line-height:0;">
        <img src="{{IMG}}/student-coding.jpg" width="600" height="212" alt="An ATLAS student coding late into the night on multiple screens" class="fluid" style="display:block; width:100%; max-width:600px; height:auto; border:0;" />
      </td>
    </tr>
    <tr>
      <td bgcolor="#070816" class="pad" style="background-color:#070816; padding:32px 40px 0 40px;">
        <p style="margin:0 0 6px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:15px; letter-spacing:2.6px; text-transform:uppercase; color:#22d3ee; font-weight:bold;">Round 1</p>
        <h2 class="h2" style="margin:0 0 14px 0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:28px; line-height:32px; color:#ffffff; font-weight:900; text-transform:uppercase; letter-spacing:-0.4px;">The Challenge</h2>
        <p style="margin:0 0 20px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:16px; line-height:26px; color:#c7cee6;">
          You will receive a real-world problem. Use AI, tech and creativity to build a working solution.
        </p>
      </td>
    </tr>
    <!-- Research > Ideate > Build > Test > Present -->
    <tr>
      <td bgcolor="#070816" class="pad" style="background-color:#070816; padding:0 40px 34px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td align="center" width="20%" style="width:20%; padding:0 2px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td align="center" bgcolor="#0c0f25" style="background-color:#0c0f25; border:1px solid #22d3ee; border-radius:7px; padding:11px 3px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:10px; line-height:13px; letter-spacing:0.6px; color:#22d3ee; font-weight:bold; text-transform:uppercase;">Research</td>
              </tr></table>
            </td>
            <td align="center" width="20%" style="width:20%; padding:0 2px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td align="center" bgcolor="#0c0f25" style="background-color:#0c0f25; border:1px solid #facc15; border-radius:7px; padding:11px 3px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:10px; line-height:13px; letter-spacing:0.6px; color:#facc15; font-weight:bold; text-transform:uppercase;">Ideate</td>
              </tr></table>
            </td>
            <td align="center" width="20%" style="width:20%; padding:0 2px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td align="center" bgcolor="#0c0f25" style="background-color:#0c0f25; border:1px solid #60a5fa; border-radius:7px; padding:11px 3px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:10px; line-height:13px; letter-spacing:0.6px; color:#60a5fa; font-weight:bold; text-transform:uppercase;">Build</td>
              </tr></table>
            </td>
            <td align="center" width="20%" style="width:20%; padding:0 2px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td align="center" bgcolor="#0c0f25" style="background-color:#0c0f25; border:1px solid #34d399; border-radius:7px; padding:11px 3px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:10px; line-height:13px; letter-spacing:0.6px; color:#34d399; font-weight:bold; text-transform:uppercase;">Test</td>
              </tr></table>
            </td>
            <td align="center" width="20%" style="width:20%; padding:0 2px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td align="center" bgcolor="#0c0f25" style="background-color:#0c0f25; border:1px solid #f472b6; border-radius:7px; padding:11px 3px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:10px; line-height:13px; letter-spacing:0.6px; color:#f472b6; font-weight:bold; text-transform:uppercase;">Present</td>
              </tr></table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- =============================================================
         8. WHAT CAN YOU BUILD?
         ============================================================= -->
    <tr>
      <td bgcolor="#0a0d1f" class="pad" style="background-color:#0a0d1f; padding:34px 40px 22px 40px; border-top:1px solid #1d2450;">
        <h2 class="h2" style="margin:0 0 6px 0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:28px; line-height:32px; color:#ffffff; font-weight:900; text-transform:uppercase; letter-spacing:-0.4px;">What can you build?</h2>
        <p style="margin:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:24px; color:#7c88b5;">Get creative. Build something future-ready.</p>
      </td>
    </tr>
    <tr>
      <td bgcolor="#0a0d1f" class="pad" style="background-color:#0a0d1f; padding:0 40px 10px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td class="stack stack-gap" width="50%" valign="top" style="width:50%; padding:0 10px 0 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr><td style="padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;"><span style="color:#22d3ee; font-weight:bold;">&#9656;</span>&nbsp;&nbsp;Web / Mobile Applications</td></tr>
                <tr><td style="padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;"><span style="color:#facc15; font-weight:bold;">&#9656;</span>&nbsp;&nbsp;AI-Powered Solutions</td></tr>
                <tr><td style="padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;"><span style="color:#f472b6; font-weight:bold;">&#9656;</span>&nbsp;&nbsp;Dashboards &amp; Tools</td></tr>
              </table>
            </td>
            <td class="stack stack-gap" width="50%" valign="top" style="width:50%; padding:0 0 0 10px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr><td style="padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;"><span style="color:#34d399; font-weight:bold;">&#9656;</span>&nbsp;&nbsp;AI Agents / Chatbots</td></tr>
                <tr><td style="padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;"><span style="color:#60a5fa; font-weight:bold;">&#9656;</span>&nbsp;&nbsp;Platforms &amp; Digital Products</td></tr>
                <tr><td style="padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;"><span style="color:#a78bfa; font-weight:bold;">&#9656;</span>&nbsp;&nbsp;And more</td></tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td bgcolor="#0a0d1f" class="pad-sm" style="background-color:#0a0d1f; padding:16px 28px 34px 28px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td class="stack stack-gap" width="50%" valign="top" style="width:50%; padding:0 6px 0 0; font-size:0; line-height:0;">
              <img src="{{IMG}}/prototype-robotics.jpg" width="266" height="220" alt="A student assembling a robotics prototype in an ATLAS lab" class="fluid" style="display:block; width:100%; max-width:266px; height:auto; border-radius:10px; border:0;" />
            </td>
            <td class="stack stack-gap" width="50%" valign="top" style="width:50%; padding:0 0 0 6px; font-size:0; line-height:0;">
              <img src="{{IMG}}/immersive-tech.jpg" width="266" height="187" alt="An ATLAS student testing an immersive VR build" class="fluid" style="display:block; width:100%; max-width:266px; height:auto; border-radius:10px; border:0;" />
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- =============================================================
         9. 90-MINUTE CHALLENGE FORMAT
         ============================================================= -->
    <tr>
      <td bgcolor="#070816" class="pad" style="background-color:#070816; padding:34px 40px 20px 40px; border-top:1px solid #1d2450;">
        <p style="margin:0 0 6px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:15px; letter-spacing:2.6px; text-transform:uppercase; color:#facc15; font-weight:bold;">The clock starts</p>
        <h2 class="h2" style="margin:0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:28px; line-height:32px; color:#ffffff; font-weight:900; text-transform:uppercase; letter-spacing:-0.4px;">90-Minute Challenge Format</h2>
      </td>
    </tr>
    <tr>
      <td bgcolor="#070816" class="pad" style="background-color:#070816; padding:0 40px 34px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" bgcolor="#0c0f25" style="background-color:#0c0f25; border:1px solid #1d2450; border-radius:10px; height:100%;">
          <tr>
            <td style="padding:16px 18px; border-bottom:1px solid #1d2450;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td width="78" valign="middle" style="width:78px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#facc15" style="background-color:#facc15; border-radius:5px; padding:5px 9px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:15px; color:#070816; font-weight:bold; white-space:nowrap;">10 MINS</td></tr></table></td>
                <td valign="middle" style="padding-left:14px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;">Challenge Briefing</td>
              </tr></table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 18px; border-bottom:1px solid #1d2450;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td width="78" valign="middle" style="width:78px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#facc15" style="background-color:#facc15; border-radius:5px; padding:5px 9px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:15px; color:#070816; font-weight:bold; white-space:nowrap;">15 MINS</td></tr></table></td>
                <td valign="middle" style="padding-left:14px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;">Research &amp; Understand</td>
              </tr></table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 18px; border-bottom:1px solid #1d2450;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td width="78" valign="middle" style="width:78px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#facc15" style="background-color:#facc15; border-radius:5px; padding:5px 9px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:15px; color:#070816; font-weight:bold; white-space:nowrap;">15 MINS</td></tr></table></td>
                <td valign="middle" style="padding-left:14px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;">Ideate Your Solution</td>
              </tr></table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 18px; border-bottom:1px solid #1d2450;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td width="78" valign="middle" style="width:78px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#22d3ee" style="background-color:#22d3ee; border-radius:5px; padding:5px 9px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:15px; color:#070816; font-weight:bold; white-space:nowrap;">40 MINS</td></tr></table></td>
                <td valign="middle" style="padding-left:14px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff; font-weight:bold;">Build Your Prototype</td>
              </tr></table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td width="78" valign="middle" style="width:78px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#facc15" style="background-color:#facc15; border-radius:5px; padding:5px 9px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:15px; color:#070816; font-weight:bold; white-space:nowrap;">10 MINS</td></tr></table></td>
                <td valign="middle" style="padding-left:14px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;">Test &amp; Prepare Submission</td>
              </tr></table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#1d2450" align="center" style="background-color:#1d2450; padding:13px 18px; border-radius:0 0 9px 9px; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:15px; line-height:20px; color:#22d3ee; font-weight:900; letter-spacing:1.4px; text-transform:uppercase;">Total: 90 Minutes</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- =============================================================
         10. SUBMISSION - ROUND 1
         ============================================================= -->
    <tr>
      <td bgcolor="#0a0d1f" class="pad" style="background-color:#0a0d1f; padding:34px 40px 18px 40px; border-top:1px solid #1d2450;">
        <h2 class="h2" style="margin:0 0 10px 0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:28px; line-height:32px; color:#ffffff; font-weight:900; text-transform:uppercase; letter-spacing:-0.4px;">Submission &ndash; Round 1</h2>
        <p style="margin:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:16px; line-height:25px; color:#c7cee6;">
          Submit <span style="color:#facc15; font-weight:bold;">ONE PDF</span> + a <span style="color:#facc15; font-weight:bold;">60&ndash;90 sec Pitch Video</span>.
        </p>
      </td>
    </tr>
    <tr>
      <td bgcolor="#0a0d1f" class="pad" style="background-color:#0a0d1f; padding:0 40px 34px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" bgcolor="#0c0f25" style="background-color:#0c0f25; border:1px solid #1d2450; border-radius:10px; height:100%;">
          <tr><td style="padding:20px 20px 8px 20px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr><td valign="top" width="26" style="width:26px; padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#34d399; font-weight:bold;">&#10003;</td><td style="padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;">Problem Understanding</td></tr>
              <tr><td valign="top" width="26" style="width:26px; padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#34d399; font-weight:bold;">&#10003;</td><td style="padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;">Your Solution</td></tr>
              <tr><td valign="top" width="26" style="width:26px; padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#34d399; font-weight:bold;">&#10003;</td><td style="padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;">Prototype Link <span style="color:#7c88b5;">(must be public)</span></td></tr>
              <tr><td valign="top" width="26" style="width:26px; padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#34d399; font-weight:bold;">&#10003;</td><td style="padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;">AI &amp; Development Log</td></tr>
              <tr><td valign="top" width="26" style="width:26px; padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#34d399; font-weight:bold;">&#10003;</td><td style="padding:0 0 12px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#ffffff;">60&ndash;90 sec Pitch Video</td></tr>
            </table>
          </td></tr>
        </table>
      </td>
    </tr>

    <!-- =============================================================
         11. JUDGING CRITERIA
         ============================================================= -->
    <tr>
      <td bgcolor="#070816" class="pad" style="background-color:#070816; padding:34px 40px 20px 40px; border-top:1px solid #1d2450;">
        <h2 class="h2" style="margin:0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:28px; line-height:32px; color:#ffffff; font-weight:900; text-transform:uppercase; letter-spacing:-0.4px;">Judging Criteria</h2>
      </td>
    </tr>
    <tr>
      <td bgcolor="#070816" class="pad" style="background-color:#070816; padding:0 40px 34px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">

          <tr>
            <td style="padding:0 0 8px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#c7cee6;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td style="mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#c7cee6;">Problem Understanding</td>
                <td align="right" width="46" style="width:46px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#22d3ee; font-weight:bold;">15%</td>
              </tr></table>
            </td>
          </tr>
          <tr><td style="padding:0 0 14px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#1d2450" style="background-color:#1d2450; border-radius:3px;"><tr>
              <td width="15%" bgcolor="#22d3ee" height="6" style="width:15%; background-color:#22d3ee; height:6px; line-height:6px; font-size:0; border-radius:3px;">&nbsp;</td><td height="6" style="height:6px; line-height:6px; font-size:0;">&nbsp;</td>
            </tr></table>
          </td></tr>

          <tr>
            <td style="padding:0 0 8px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td style="mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#c7cee6;">Innovation &amp; Originality</td>
                <td align="right" width="46" style="width:46px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#facc15; font-weight:bold;">20%</td>
              </tr></table>
            </td>
          </tr>
          <tr><td style="padding:0 0 14px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#1d2450" style="background-color:#1d2450; border-radius:3px;"><tr>
              <td width="20%" bgcolor="#facc15" height="6" style="width:20%; background-color:#facc15; height:6px; line-height:6px; font-size:0; border-radius:3px;">&nbsp;</td><td height="6" style="height:6px; line-height:6px; font-size:0;">&nbsp;</td>
            </tr></table>
          </td></tr>

          <tr>
            <td style="padding:0 0 8px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td style="mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#c7cee6;">Use of Technology / AI</td>
                <td align="right" width="46" style="width:46px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#f472b6; font-weight:bold;">20%</td>
              </tr></table>
            </td>
          </tr>
          <tr><td style="padding:0 0 14px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#1d2450" style="background-color:#1d2450; border-radius:3px;"><tr>
              <td width="20%" bgcolor="#f472b6" height="6" style="width:20%; background-color:#f472b6; height:6px; line-height:6px; font-size:0; border-radius:3px;">&nbsp;</td><td height="6" style="height:6px; line-height:6px; font-size:0;">&nbsp;</td>
            </tr></table>
          </td></tr>

          <tr>
            <td style="padding:0 0 8px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td style="mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#c7cee6;">Prototype Quality</td>
                <td align="right" width="46" style="width:46px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#34d399; font-weight:bold;">20%</td>
              </tr></table>
            </td>
          </tr>
          <tr><td style="padding:0 0 14px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#1d2450" style="background-color:#1d2450; border-radius:3px;"><tr>
              <td width="20%" bgcolor="#34d399" height="6" style="width:20%; background-color:#34d399; height:6px; line-height:6px; font-size:0; border-radius:3px;">&nbsp;</td><td height="6" style="height:6px; line-height:6px; font-size:0;">&nbsp;</td>
            </tr></table>
          </td></tr>

          <tr>
            <td style="padding:0 0 8px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td style="mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#c7cee6;">Design &amp; User Experience</td>
                <td align="right" width="46" style="width:46px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#60a5fa; font-weight:bold;">10%</td>
              </tr></table>
            </td>
          </tr>
          <tr><td style="padding:0 0 14px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#1d2450" style="background-color:#1d2450; border-radius:3px;"><tr>
              <td width="10%" bgcolor="#60a5fa" height="6" style="width:10%; background-color:#60a5fa; height:6px; line-height:6px; font-size:0; border-radius:3px;">&nbsp;</td><td height="6" style="height:6px; line-height:6px; font-size:0;">&nbsp;</td>
            </tr></table>
          </td></tr>

          <tr>
            <td style="padding:0 0 8px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td style="mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#c7cee6;">Research &amp; Evidence</td>
                <td align="right" width="46" style="width:46px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#a78bfa; font-weight:bold;">10%</td>
              </tr></table>
            </td>
          </tr>
          <tr><td style="padding:0 0 14px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#1d2450" style="background-color:#1d2450; border-radius:3px;"><tr>
              <td width="10%" bgcolor="#a78bfa" height="6" style="width:10%; background-color:#a78bfa; height:6px; line-height:6px; font-size:0; border-radius:3px;">&nbsp;</td><td height="6" style="height:6px; line-height:6px; font-size:0;">&nbsp;</td>
            </tr></table>
          </td></tr>

          <tr>
            <td style="padding:0 0 8px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td style="mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#c7cee6;">Pitch &amp; Communication</td>
                <td align="right" width="46" style="width:46px; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#fb923c; font-weight:bold;">5%</td>
              </tr></table>
            </td>
          </tr>
          <tr><td style="padding:0 0 18px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#1d2450" style="background-color:#1d2450; border-radius:3px;"><tr>
              <td width="5%" bgcolor="#fb923c" height="6" style="width:5%; background-color:#fb923c; height:6px; line-height:6px; font-size:0; border-radius:3px;">&nbsp;</td><td height="6" style="height:6px; line-height:6px; font-size:0;">&nbsp;</td>
            </tr></table>
          </td></tr>

          <tr>
            <td style="padding:14px 0 0 0; border-top:1px solid #1d2450;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                <td style="mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:15px; line-height:20px; color:#ffffff; font-weight:900; letter-spacing:1.2px; text-transform:uppercase;">Total</td>
                <td align="right" style="mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:15px; line-height:20px; color:#facc15; font-weight:900;">100%</td>
              </tr></table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- =============================================================
         12. RULES
         ============================================================= -->
    <tr>
      <td bgcolor="#0a0d1f" class="pad" style="background-color:#0a0d1f; padding:34px 40px 22px 40px; border-top:1px solid #1d2450;">
        <h2 class="h2" style="margin:0 0 16px 0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:28px; line-height:32px; color:#ffffff; font-weight:900; text-transform:uppercase; letter-spacing:-0.4px;">Rules</h2>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td valign="top" width="22" style="width:22px; padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px; color:#ff0031;">&bull;</td><td style="padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px; color:#c7cee6;">Original work only</td></tr>
          <tr><td valign="top" width="22" style="width:22px; padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px; color:#ff0031;">&bull;</td><td style="padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px; color:#c7cee6;">Use of AI tools allowed &mdash; maintain your AI / development log</td></tr>
          <tr><td valign="top" width="22" style="width:22px; padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px; color:#ff0031;">&bull;</td><td style="padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px; color:#c7cee6;">No plagiarism or pre-built projects</td></tr>
          <tr><td valign="top" width="22" style="width:22px; padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px; color:#ff0031;">&bull;</td><td style="padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px; color:#c7cee6;">Follow ethical use of data and content</td></tr>
          <tr><td valign="top" width="22" style="width:22px; padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px; color:#ff0031;">&bull;</td><td style="padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px; color:#c7cee6;">Respect the time limit and submission format</td></tr>
          <tr><td valign="top" width="22" style="width:22px; padding:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px; color:#ff0031;">&bull;</td><td style="padding:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px; color:#c7cee6;">Judges&rsquo; decision is final</td></tr>
        </table>
      </td>
    </tr>

    <!-- =============================================================
         13. GRAND FINALE - TOP 15 TEAMS
         ============================================================= -->
    <tr>
      <td bgcolor="#070816" class="pad-sm" style="background-color:#070816; padding:34px 28px 0 28px; border-top:1px solid #1d2450;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td class="stack stack-gap" width="50%" valign="top" style="width:50%; padding:0 6px 0 0; font-size:0; line-height:0;">
              <img src="{{IMG}}/atlas-mumbai-campus.jpg" width="266" height="220" alt="ATLAS SkillTech University campus in Mumbai" class="fluid" style="display:block; width:100%; max-width:266px; height:auto; border-radius:10px; border:0;" />
            </td>
            <td class="stack stack-gap" width="50%" valign="top" style="width:50%; padding:0 0 0 6px; font-size:0; line-height:0;">
              <img src="{{IMG}}/pitch-to-experts.jpg" width="266" height="220" alt="ATLAS students presenting their project to industry experts" class="fluid" style="display:block; width:100%; max-width:266px; height:auto; border-radius:10px; border:0;" />
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td bgcolor="#070816" class="pad" style="background-color:#070816; padding:26px 40px 34px 40px;">
        <p style="margin:0 0 6px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:15px; letter-spacing:2.6px; text-transform:uppercase; color:#34d399; font-weight:bold;">15 Dec 2026 &middot; Mumbai</p>
        <h2 class="h2" style="margin:0 0 16px 0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:28px; line-height:32px; color:#ffffff; font-weight:900; text-transform:uppercase; letter-spacing:-0.4px;">Grand Finale &mdash; Top 15 Teams</h2>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td valign="top" width="24" style="width:24px; padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:23px; color:#22d3ee;">&#9656;</td><td style="padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:23px; color:#c7cee6;">Come to ATLAS Mumbai Campus</td></tr>
          <tr><td valign="top" width="24" style="width:24px; padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:23px; color:#22d3ee;">&#9656;</td><td style="padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:23px; color:#c7cee6;">Pitch to industry experts &amp; faculty</td></tr>
          <tr><td valign="top" width="24" style="width:24px; padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:23px; color:#22d3ee;">&#9656;</td><td style="padding:0 0 11px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:23px; color:#c7cee6;">Amazing prizes and special awards</td></tr>
          <tr><td valign="top" width="24" style="width:24px; padding:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:23px; color:#22d3ee;">&#9656;</td><td style="padding:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:23px; color:#c7cee6;">Network, learn &amp; get inspired</td></tr>
        </table>
      </td>
    </tr>

    <!-- =============================================================
         14. FINAL CTA
         ============================================================= -->
    <tr>
      <td bgcolor="#322f8c" align="center" class="pad" style="background-color:#322f8c; padding:40px 40px 42px 40px;">
        <p class="h2" style="margin:0 0 8px 0; mso-line-height-rule:exactly; font-family:'Arial Black','Arial Bold',Arial,Helvetica,sans-serif; font-size:30px; line-height:34px; color:#ffffff; font-weight:900; text-transform:uppercase; letter-spacing:-0.5px;">Ready to build<br />what&rsquo;s next?</p>
        <p style="margin:0 0 26px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:24px; color:#c9c7ec;">Teams of 1 to 3. Grade 11 &amp; 12. 90 minutes to change the future.</p>

        <div class="btn" style="margin:0 0 14px 0;">
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{SITE_URL}}/atlas-hackathon-2026" style="height:56px;v-text-anchor:middle;width:320px;" arcsize="15%" strokecolor="#facc15" fillcolor="#facc15">
            <w:anchorlock/>
            <center style="color:#070816;font-family:Arial,sans-serif;font-size:18px;font-weight:bold;">VISIT THE HACKATHON PAGE</center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-- -->
          <a href="{{SITE_URL}}/atlas-hackathon-2026" style="display:inline-block; background-color:#facc15; color:#070816; font-family:Arial,Helvetica,sans-serif; font-size:18px; line-height:20px; font-weight:bold; text-transform:uppercase; letter-spacing:0.6px; text-align:center; text-decoration:none; padding:18px 32px; border-radius:8px; min-width:256px; mso-hide:all;">Visit the Hackathon Page</a>
          <!--<![endif]-->
        </div>

        <div class="btn">
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{SITE_URL}}/atlas-hackathon-2026#challenge" style="height:52px;v-text-anchor:middle;width:320px;" arcsize="15%" strokecolor="#8b88d6" fillcolor="#322f8c">
            <w:anchorlock/>
            <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">EXPLORE THE CHALLENGE</center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-- -->
          <a href="{{SITE_URL}}/atlas-hackathon-2026#challenge" style="display:inline-block; background-color:#322f8c; color:#ffffff; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:20px; font-weight:bold; text-transform:uppercase; letter-spacing:0.6px; text-align:center; text-decoration:none; padding:15px 30px; border-radius:8px; border:2px solid #8b88d6; min-width:240px; mso-hide:all;">Explore the Challenge</a>
          <!--<![endif]-->
        </div>
      </td>
    </tr>

    <!-- =============================================================
         15. FOOTER
         ============================================================= -->
    <tr>
      <td bgcolor="#04050e" align="center" class="pad" style="background-color:#04050e; padding:32px 40px 36px 40px;">
        <img src="{{IMG}}/atlas-ugdx-logo.png" width="200" height="63" alt="ATLAS SkillTech University | uGDX School of Technology" style="display:block; width:200px; height:auto; max-width:200px; margin:0 auto 18px auto;" />
        <p style="margin:0 0 14px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:21px; color:#6b7699;">
          ATLAS SkillTech University &middot; uGDX School of Technology<br />
          Mumbai, India
        </p>
        <p style="margin:0 0 18px 0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:21px; color:#6b7699;">
          Questions about the Hackathon? Call <a href="tel:8976870842" style="color:#22d3ee; text-decoration:none;">8976870842</a> or write to <a href="mailto:btech@atlasuniversity.edu.in" style="color:#22d3ee; text-decoration:none;">btech@atlasuniversity.edu.in</a>
        </p>
        <p style="margin:0; mso-line-height-rule:exactly; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:19px; color:#4c556e;">
          You are receiving this email because your team registered for ATLAS Hackathon 2026.
        </p>
      </td>
    </tr>

  </table>
  <!--[if mso]></td></tr></table><![endif]-->

</td>
</tr>
</table>

</body>
</html>
`;

export default EMAIL_TEMPLATE;
