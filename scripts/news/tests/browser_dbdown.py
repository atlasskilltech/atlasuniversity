"""ATLAS News - the outage page with the database down (run by scripts/news/tests/dbdown.mjs).

Usage: python scripts/news/tests/browser_dbdown.py <base-url>
At 390 and 1440 px, with JavaScript DISABLED and enabled: /news and an article show the server-rendered
"temporarily unavailable" page with its two links, no horizontal overflow, and nothing about the cause.
"""
import sys
from playwright.sync_api import sync_playwright

BASE = sys.argv[1].rstrip('/')
ok = True
with sync_playwright() as p:
    b = p.chromium.launch()
    for js in (False, True):
        for w, h in ((390, 844), (1440, 900)):
            ctx = b.new_context(viewport={'width': w, 'height': h}, java_script_enabled=js)
            pg = ctx.new_page()
            for path in ('/news', '/news/a-graduating-class-steps-into-a-world-still-being-written'):
                res = pg.goto(BASE + path, wait_until='load')
                text = pg.inner_text('body')
                good = (res.status == 503 and 'ATLAS News will be back in a moment.' in text and 'Try again' in text
                        and 'ATLAS SkillTech University' in text
                        and pg.evaluate('() => document.documentElement.scrollWidth - document.documentElement.clientWidth') <= 0
                        and not any(s in text for s in ('ECONNREFUSED', '127.0.0.1', 'NewsDbError', 'mysql')))
                ok &= good
                print(('PASS' if good else 'FAIL') + f" browser {w}px js={'on' if js else 'off'} {path}: 503 outage page shown (status {res.status})")
            ctx.close()
    b.close()
sys.exit(0 if ok else 1)
