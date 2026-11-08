/**
 * ATLAS News — the "temporarily unavailable" response the proxy serves (HTTP 503) when the News database
 * cannot be reached AND the requested page has no last-known-good copy.
 *
 * A complete, self-contained HTML document: inline styles (the News palette, light and dark), the
 * self-hosted News serif, no JavaScript at all — it reads the same with scripts disabled. It names no
 * cause: no host, port, user, database, error code or stack ever appears in it.
 */
export const OUTAGE_RETRY_AFTER_SECONDS = 120;

export const OUTAGE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>ATLAS News is temporarily unavailable</title>
<style>
@font-face{font-family:'Newsreader';src:url('/assets/fonts/newsreader-latin.woff2') format('woff2');font-weight:200 800;font-display:swap}
:root{--paper:#f9f7f2;--ink:#14151a;--muted:#585b66;--line:#e2ddd3;--accent:#0d707c;color-scheme:light dark}
@media (prefers-color-scheme:dark){:root{--paper:#0d0e12;--ink:#eceae4;--muted:#a3a6b0;--line:#31343d;--accent:#63cdd9}}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;flex-direction:column;background:var(--paper);color:var(--ink);font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased}
header{border-bottom:1px solid var(--line);padding:18px 20px;text-align:center}
.mark{font-family:Newsreader,Georgia,serif;font-size:26px;font-style:italic;text-decoration:none;color:var(--ink)}
.mark b{font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;font-style:normal;font-weight:800;font-size:15px;letter-spacing:.14em;margin-right:10px}
main{flex:1;display:flex;align-items:center;justify-content:center;padding:72px 20px;text-align:center}
.kicker{margin:0;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
h1{margin:20px auto 0;max-width:760px;font-family:Newsreader,Georgia,serif;font-weight:500;font-size:clamp(34px,6vw,56px);line-height:1.08;letter-spacing:-.015em}
p.lede{margin:20px auto 0;max-width:520px;font-family:Newsreader,Georgia,serif;font-size:19px;line-height:1.55;color:var(--muted)}
.actions{margin-top:36px;display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.btn{display:inline-flex;align-items:center;height:48px;padding:0 28px;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none}
.btn.primary{background:var(--ink);color:var(--paper)}
.btn.ghost{border:1px solid var(--line);color:var(--ink)}
.btn:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
footer{border-top:1px solid var(--line);padding:20px;text-align:center;font-size:13px;color:var(--muted)}
</style>
</head>
<body>
<header><a class="mark" href="/news"><b>ATLAS</b>News</a></header>
<main>
<div>
<p class="kicker">Temporarily unavailable</p>
<h1>ATLAS News will be back in a moment.</h1>
<p class="lede">We could not load this page just now. Please try again in a couple of minutes.</p>
<div class="actions"><a class="btn primary" href="">Try again</a><a class="btn ghost" href="/">ATLAS SkillTech University</a></div>
</div>
</main>
<footer>© ATLAS SkillTech University, Mumbai</footer>
</body>
</html>
`;

export function outageResponseInit() {
  return {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Retry-After': String(OUTAGE_RETRY_AFTER_SECONDS),
      'Cache-Control': 'no-store, max-age=0',
      'X-Robots-Tag': 'noindex, nofollow',
      'X-Content-Type-Options': 'nosniff',
    },
  };
}
