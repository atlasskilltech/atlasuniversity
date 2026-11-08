"""ATLAS News — Stage 3 CMS browser test (run by `NEWS_E2E_BROWSER=1 npm run news:e2e`).

Usage: python scripts/news/tests/browser_cms.py <base-url> <admin-password>

At 1440 px and 390 px, through the real UI:
  - create a category from the Categories page;
  - write an article in the TipTap editor: the slug follows the title, a pasted <h1> becomes <h2>, the
    text-style menu applies H5, bold works; publish it and land on its edit page as Live;
  - the stored body (read back via the API) holds h2/h5 and no h1;
  - an article containing a gallery opens in HTML mode, so nothing is lost;
  - the featured-image picker opens, lists the library and attaches an image;
  - the Homepage page refuses to put one article in two slots, with the message, then saves;
  - the preview renders the article; the Media library lists images.
Every page: no console errors, no horizontal overflow. Screenshots go to the system temp directory.
"""
import json
import os
import sys
import tempfile
import time
from playwright.sync_api import sync_playwright

BASE, PW = sys.argv[1].rstrip('/'), sys.argv[2]
OUT = os.path.join(tempfile.gettempdir(), 'atlasnews-browser')
os.makedirs(OUT, exist_ok=True)
STAMP = str(int(time.time()))[-6:]

results = []


def check(name, ok, detail=''):
    results.append(ok)
    print(('PASS ' if ok else 'FAIL ') + name + (f'  [{detail}]' if detail and not ok else ''))


def overflow(pg):
    return pg.evaluate('() => document.documentElement.scrollWidth - document.documentElement.clientWidth')


def api(pg, method, path, body=None):
    return pg.evaluate(
        """async ([m, p, b]) => { const r = await fetch('/news/admin/api' + p, { method: m, headers: b ? { 'Content-Type': 'application/json' } : {}, body: b ? JSON.stringify(b) : undefined });
           return { status: r.status, json: await r.json().catch(() => ({})) }; }""",
        [method, path, body],
    )


with sync_playwright() as p:
    b = p.chromium.launch()
    for w, h in ((1440, 900), (390, 844)):
        ctx = b.new_context(viewport={'width': w, 'height': h})
        pg = ctx.new_page()
        errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text[:200]))
        pg.on('pageerror', lambda e: errs.append(str(e)[:200]))
        pg.on('dialog', lambda d: d.accept())
        bad = []
        pg.on('response', lambda r: r.status >= 400 and bad.append(f'{r.status} {r.request.method} {r.url[len(BASE):][:140]}'))
        tag = f'{w}px'

        pg.goto(BASE + '/news/admin/login', wait_until='networkidle')
        pg.fill('#news-admin-password', PW)
        pg.click('button[type=submit]')
        pg.wait_for_url('**/news/admin', timeout=30000)

        # ---- category through the UI
        cat_name = f'Browser Cat {STAMP} {w}'
        pg.goto(BASE + '/news/admin/categories', wait_until='networkidle')
        pg.click('text=New category')
        pg.fill('#c-name', cat_name)
        pg.click('form button[type=submit]:has-text("Save")')
        pg.wait_for_selector(f'text={cat_name}', timeout=15000)
        check(f'{tag} category created from the UI', pg.is_visible(f'text={cat_name}'))
        check(f'{tag} categories page: no overflow', overflow(pg) <= 0, overflow(pg))

        # ---- article in the editor
        title = f'Browser story {STAMP} {w}'
        pg.goto(BASE + '/news/admin/articles/new', wait_until='networkidle')
        pg.wait_for_selector('.ProseMirror', timeout=20000)
        pg.fill('#title', title)
        slug = pg.input_value('#slug')
        check(f'{tag} slug follows the title', slug == f'browser-story-{STAMP}-{w}', slug)
        ed = pg.locator('.ProseMirror')
        ed.click()
        pg.keyboard.type('Opening paragraph.')
        pg.keyboard.press('Enter')  # paste onto an EMPTY line: an unconverted <h1> would become a plain paragraph
        pg.evaluate(
            """() => { const el = document.querySelector('.ProseMirror'); const dt = new DataTransfer();
                 dt.setData('text/html', '<h1 class="x" style="color:red">Pasted heading</h1><p>Pasted para</p>'); dt.setData('text/plain', 'Pasted heading');
                 el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true })); }"""
        )
        inner = ed.inner_html()
        check(f'{tag} pasted <h1> becomes <h2> in the editor', '<h2>Pasted heading</h2>' in inner and '<h1' not in inner, inner[:200])
        pg.keyboard.press('End')
        pg.keyboard.press('Enter')
        pg.keyboard.type('Small heading')
        pg.select_option('#body-block', '5')
        pg.keyboard.press('End')
        pg.keyboard.press('Enter')
        pg.keyboard.press('Control+b')
        pg.keyboard.type('Bold words')
        inner = ed.inner_html()
        check(f'{tag} H5 and bold applied from the toolbar/keyboard', '<h5>Small heading</h5>' in inner and '<strong>Bold words</strong>' in inner, inner[:300])

        # featured image picker (the e2e run has uploaded images already)
        pg.locator('aside button:has-text("Choose image")').first.click()
        pg.wait_for_selector('[role=dialog][aria-label="Featured image"] ul li button', timeout=20000)
        pg.locator('[role=dialog][aria-label="Featured image"] ul li button').first.click()
        check(f'{tag} featured image attached from the picker', pg.locator('#falt').count() == 1)

        pg.check(f'label:has-text("{cat_name}") input[type=checkbox]')
        pg.click('label:has-text("Published")')
        pg.screenshot(path=os.path.join(OUT, f'cms-editor-{w}.png'), full_page=True)
        ed.scroll_into_view_if_needed()
        pg.mouse.wheel(0, 260)
        pg.wait_for_timeout(300)
        pg.screenshot(path=os.path.join(OUT, f'cms-editor-scrolled-{w}.png'))
        check(f'{tag} editor page: no overflow', overflow(pg) <= 0, overflow(pg))
        pg.click('aside button[type=submit]')
        pg.wait_for_url('**/news/admin/articles/*?saved=1', timeout=30000)
        pg.wait_for_load_state('networkidle')
        art_id = int(pg.url.split('/articles/')[1].split('?')[0])
        check(f'{tag} published from the editor and shown as Live', pg.locator('text=Live').first.is_visible())
        got = api(pg, 'GET', f'/articles/{art_id}')
        body = got['json'].get('article', {}).get('contentHtml', '')
        check(f'{tag} stored body: h2 + h5 + strong, no h1, no style', '<h2>Pasted heading</h2>' in body and '<h5>Small heading</h5>' in body and '<strong>Bold words</strong>' in body and '<h1' not in body and 'style=' not in body, body[:300])

        # ---- an article the visual editor cannot hold opens in HTML mode
        cat_id = next(c['id'] for c in api(pg, 'GET', '/categories')['json']['items'] if c['name'] == cat_name)
        gal = api(pg, 'POST', '/articles', {'title': f'Gallery {STAMP} {w}', 'status': 'draft', 'categoryIds': [cat_id],
                                            'contentHtml': '<p>x</p><figure class="news-gallery"><img src="https://example.com/a.webp" alt="a"><figcaption>Cap</figcaption></figure>'})
        pg.goto(BASE + f"/news/admin/articles/{gal['json']['id']}", wait_until='networkidle')
        html_mode = pg.locator('textarea[aria-label="Article body (HTML)"]')
        check(f'{tag} gallery article opens in HTML mode (nothing silently dropped)', html_mode.count() == 1 and 'news-gallery' in html_mode.input_value() and pg.is_visible('text=HTML mode'))

        # ---- homepage: one article, one slot (start from an empty curation: earlier steps may have filled it)
        api(pg, 'PUT', '/homepage', {'zones': {}})
        pg.goto(BASE + '/news/admin/homepage', wait_until='networkidle')
        pg.fill('aside input[aria-label="Search articles"]', title)
        pg.click('aside button:has-text("Search")')
        row = pg.locator('aside li', has_text=title)
        row.wait_for(timeout=15000)
        pg.locator('section[aria-labelledby="zone-hero_centre"] button:has-text("Add here"), section[aria-labelledby="zone-hero_centre"] button:has-text("Adding here")').first.click()
        row.locator('button:has-text("Add")').click()
        pg.locator('section[aria-labelledby="zone-picks"] button:has-text("Add here")').click()
        disabled = row.locator('button:has-text("Add")').is_disabled()
        check(f'{tag} homepage: an already-placed article cannot be added again (button disabled, labelled)', disabled and row.locator('text=On the homepage').count() == 1)
        # force the server rule too: same id in two zones via the API
        dup = api(pg, 'PUT', '/homepage', {'zones': {'hero_centre': [art_id], 'picks': [art_id]}})
        check(f'{tag} homepage: server refuses the duplicate with a clear message', dup['status'] == 400 and 'already placed in Hero' in json.dumps(dup['json'], ensure_ascii=False), dup)
        pg.click('button:has-text("Save homepage")')
        pg.wait_for_selector('text=Homepage saved', timeout=15000)
        check(f'{tag} homepage saved from the UI', True)
        check(f'{tag} homepage page: no overflow', overflow(pg) <= 0, overflow(pg))
        pg.screenshot(path=os.path.join(OUT, f'cms-homepage-{w}.png'), full_page=True)

        # ---- preview, media library, list
        pg.goto(BASE + f'/news/admin/preview/{art_id}', wait_until='networkidle')
        check(f'{tag} preview renders the article', pg.locator('h1', has_text=title).count() == 1 and pg.locator('h2', has_text='Pasted heading').count() == 1)
        pg.goto(BASE + '/news/admin/media', wait_until='networkidle')
        check(f'{tag} media library lists images', pg.locator('main ul li img').count() > 0)
        pg.locator('main ul li button').first.click()
        pg.wait_for_selector('aside >> text=/Used in|Not used anywhere/', timeout=15000)
        check(f'{tag} media item shows where it is used', True)
        pg.goto(BASE + f'/news/admin/articles?q={STAMP}', wait_until='networkidle')
        check(f'{tag} article list search finds the story', pg.locator('main a', has_text=title).count() == 1)
        check(f'{tag} articles page: no overflow', overflow(pg) <= 0, overflow(pg))

        for name, path in (('dashboard', '/news/admin'), ('articles', '/news/admin/articles'), ('categories', '/news/admin/categories'), ('media', '/news/admin/media')):
            pg.goto(BASE + path, wait_until='networkidle')
            pg.screenshot(path=os.path.join(OUT, f'cms-{name}-{w}.png'))
            check(f'{tag} {name}: no overflow', overflow(pg) <= 0, overflow(pg))

        # tidy: off the homepage, to Trash (soft) — the run's own rows only
        api(pg, 'PUT', '/homepage', {'zones': {}})
        api(pg, 'DELETE', f'/articles/{art_id}')
        api(pg, 'DELETE', f"/articles/{gal['json']['id']}")

        # Known, explained failures — and ONLY these are tolerated:
        #  - the test's own deliberate duplicate-slot PUT (400);
        #  - next/image refusing the LOCAL S3 stand-in host (http://127.0.0.1:<random port> is not in the
        #    build's remotePatterns, which come from the real S3 configuration);
        #  - the seeded Stage 2 sample media rows have no files in the S3 stand-in (test data, 404);
        #  - Next prefetching the preview's category link: public pages still read the Stage 2 fixtures
        #    until Phase D, so a category created here is not public yet (404).
        known = lambda x: x == '400 PUT /news/admin/api/homepage' or (x.startswith('400 GET /_next/image?url=http%3A%2F%2F127.0.0.1')) or (x.startswith('404 GET /news/category/browser-cat-')) or ('/stub-bucket/assets/news/media/sample/' in x and x.startswith('404 GET'))
        unexplained = [x for x in bad if not known(x)]
        resource_errs = [e for e in errs if e.startswith('Failed to load resource')]
        other_errs = [e for e in errs if not e.startswith('Failed to load resource')]
        check(f'{tag} no unexplained failed requests', not unexplained, unexplained)
        check(f'{tag} no console errors beyond those requests', not other_errs and len(resource_errs) <= len(bad), errs)
        ctx.close()
    b.close()

sys.exit(0 if all(results) else 1)
