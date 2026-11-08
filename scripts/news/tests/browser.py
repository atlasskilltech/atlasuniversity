"""ATLAS News — admin browser smoke test (optional; run by `NEWS_E2E_BROWSER=1 npm run news:e2e`).

Needs Python 3 and Playwright for Python (`pip install playwright && playwright install chromium`).
Usage: python scripts/news/tests/browser.py <base-url> <admin-password>

At 390 px and 1440 px: the admin redirects to sign-in, the ATLAS site chrome is hidden, a wrong
password shows an error, the right one opens the dashboard with no horizontal overflow, the session
cookie is invisible to page scripts, the S3 write check succeeds, and signing out returns to the login.
Screenshots go to the system temp directory. The only console entry allowed is the deliberate 401 of
the wrong-password attempt.
"""
import os
import sys
import tempfile
from playwright.sync_api import sync_playwright

BASE, PW = sys.argv[1].rstrip('/'), sys.argv[2]
OUT = os.path.join(tempfile.gettempdir(), 'atlasnews-browser')
os.makedirs(OUT, exist_ok=True)
ok = True
with sync_playwright() as p:
    b = p.chromium.launch()
    for w, h in ((390, 844), (1440, 900)):
        ctx = b.new_context(viewport={'width': w, 'height': h})
        pg = ctx.new_page()
        errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text[:160]))
        pg.on('pageerror', lambda e: errs.append(str(e)[:160]))
        pg.goto(BASE + '/news/admin', wait_until='networkidle')
        on_login = pg.url.endswith('/news/admin/login')
        no_chrome = pg.evaluate("() => !document.getElementById('mainbar')")
        pg.screenshot(path=os.path.join(OUT, f'login-{w}.png'))
        pg.fill('#news-admin-password', 'definitely-the-wrong-password')
        pg.click('button[type=submit]')
        pg.wait_for_selector('#news-admin-login-error')
        wrong_msg = pg.inner_text('#news-admin-login-error')
        pg.wait_for_function("() => !document.querySelector('#news-admin-password').readOnly")
        pg.fill('#news-admin-password', PW)
        pg.click('button[type=submit]')
        pg.wait_for_url('**/news/admin', timeout=30000)
        pg.wait_for_load_state('networkidle')
        dash = pg.inner_text('h1')
        ovf = pg.evaluate('() => document.documentElement.scrollWidth - document.documentElement.clientWidth')
        cookie_js = pg.evaluate('() => document.cookie')
        pg.click('text=Check S3 write access')
        pg.wait_for_selector('pre', timeout=60000)
        check_ok = '"ok": true' in pg.inner_text('pre')
        pg.screenshot(path=os.path.join(OUT, f'dashboard-{w}.png'), full_page=True)
        pg.click('text=Sign out')
        pg.wait_for_url('**/news/admin/login', timeout=30000)
        pg.goto(BASE + '/news/admin', wait_until='networkidle')
        signed_out = pg.url.endswith('/news/admin/login')
        good = (on_login and no_chrome and 'Incorrect' in wrong_msg and dash == 'Foundation status' and ovf <= 0
                and not cookie_js and check_ok and signed_out and len(errs) <= 1 and all('401' in e for e in errs))
        ok &= good
        print('PASS' if good else 'FAIL', f'browser {w}px', dict(login_redirect=on_login, chrome_hidden=no_chrome, error_shown=wrong_msg,
              dashboard=dash, overflow=ovf, cookie_visible_to_js=bool(cookie_js), s3_check=check_ok, signed_out=signed_out, console=errs))
        ctx.close()
    b.close()
sys.exit(0 if ok else 1)
