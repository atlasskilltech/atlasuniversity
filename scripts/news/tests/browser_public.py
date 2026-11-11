"""ATLAS News - public pages from MySQL in a real browser (run by `NEWS_E2E_BROWSER=1 npm run news:e2e`,
after the Stage 2 sample content has been seeded into the e2e TEST database).

Usage: python scripts/news/tests/browser_public.py <base-url> <admin-password>

At 390 and 1440 px, in the light and the dark system theme:
  /news                        three-column hero at >= 992 (lead in the centre, two stories each side),
                               Latest, category sections, Featured ("The big read"), Editor's Picks
  /news/<slug>                 article heading, body, related stories
  /news/category/student-life  and its page 2
  the explicit theme toggle (stored choice) flips the palette
Every page: no horizontal overflow, the expected palette, no console errors other than next/image
refusing the LOCAL S3 stand-in (a private address; production uses the public S3 host).
Screenshots go to the system temp directory.
"""
import os
import sys
import tempfile
from playwright.sync_api import sync_playwright

BASE = sys.argv[1].rstrip('/')
OUT = os.path.join(tempfile.gettempdir(), 'atlasnews-browser')
os.makedirs(OUT, exist_ok=True)
LEAD = 'A graduating class steps into a world that is still being written'
ARTICLE = '/news/a-graduating-class-steps-into-a-world-still-being-written'
PAPER = {'light': 'rgb(249, 247, 242)', 'dark': 'rgb(13, 14, 18)'}

results = []


def check(name, ok, detail=''):
    results.append(ok)
    print(('PASS ' if ok else 'FAIL ') + name + (f'  [{detail}]' if detail and not ok else ''))


with sync_playwright() as p:
    b = p.chromium.launch()
    for scheme in ('light', 'dark'):
        for w, h in ((1440, 900), (390, 844)):
            tag = f'{w}px {scheme}'
            ctx = b.new_context(viewport={'width': w, 'height': h}, color_scheme=scheme)
            pg = ctx.new_page()
            errs, bad = [], []
            pg.on('console', lambda m: m.type == 'error' and errs.append(m.text[:160]))
            pg.on('pageerror', lambda e: errs.append('pageerror ' + str(e)[:160]))
            pg.on('response', lambda r: r.status >= 400 and bad.append(f'{r.status} {r.url[len(BASE):][:120]}'))

            def common(name):
                ovf = pg.evaluate('() => document.documentElement.scrollWidth - document.documentElement.clientWidth')
                check(f'{tag} {name}: no horizontal overflow', ovf <= 0, ovf)
                bg = pg.evaluate("() => getComputedStyle(document.querySelector('[data-news-root]')).backgroundColor")
                check(f'{tag} {name}: {scheme} palette', bg == PAPER[scheme], bg)
                robots = pg.evaluate("() => document.querySelector('meta[name=robots]')?.content")
                check(f'{tag} {name}: noindex', robots == 'noindex, nofollow', robots)

            # ---- homepage
            pg.goto(BASE + '/news', wait_until='networkidle')
            hero = pg.locator('section[aria-labelledby="top-stories"]')
            check(f'{tag} home: lead story', hero.locator('h2, h3', has_text=LEAD).count() >= 1 or hero.get_by_text(LEAD).count() >= 1)
            cols = hero.locator('ul')
            side = sum(cols.nth(i).locator('li').count() for i in range(cols.count()))
            check(f'{tag} home: four side stories', side == 4, side)
            if w >= 992:
                boxes = pg.evaluate("""() => { const s = document.querySelector('section[aria-labelledby="top-stories"]');
                    const lead = s.querySelector(':scope > div > div'); const uls = s.querySelectorAll('ul');
                    const r = (e) => e.getBoundingClientRect(); return { lead: r(lead).x, left: r(uls[0]).x, right: r(uls[1]).x }; }""")
                check(f'{tag} home: three columns, lead in the centre', boxes['left'] < boxes['lead'] < boxes['right'], boxes)
            for label in ('Latest', 'The big read', 'Editor’s Picks'):
                check(f'{tag} home: "{label}" shown', pg.get_by_text(label, exact=True).count() >= 1)
            check(f'{tag} home: category sections', pg.locator('section[aria-labelledby^="section-"]').count() >= 1)
            check(f'{tag} home: no "Most read" claim', pg.get_by_text('Most read').count() == 0)
            picks = pg.locator('section[aria-labelledby="editors-picks"] li').count()
            check(f'{tag} home: Editor’s Picks has the curated four', picks == 4, picks)
            common('home')
            pg.screenshot(path=os.path.join(OUT, f'public-home-{w}-{scheme}.png'), full_page=True)

            # ---- navigation dropdowns (a menu category with menu sub-categories)
            if w >= 992:
                toggle = pg.locator('nav[aria-label="Sections"] button[aria-label$=": show sections"]:visible').first
                check(f'{tag} nav: a dropdown toggle exists', toggle.count() == 1)
                if toggle.count():
                    panel = pg.locator('[id="%s"]' % toggle.get_attribute('aria-controls'))
                    item = toggle.locator('xpath=ancestor::li[1]')
                    item.hover()
                    pg.wait_for_timeout(150)
                    check(f'{tag} nav: hover opens the dropdown', panel.is_visible() and toggle.get_attribute('aria-expanded') == 'true')
                    links = panel.locator('a')
                    check(f'{tag} nav: the dropdown lists its sub-categories', links.count() >= 2, links.count())
                    ovf = pg.evaluate('() => document.documentElement.scrollWidth - document.documentElement.clientWidth')
                    check(f'{tag} nav: an open dropdown causes no horizontal overflow', ovf <= 0, ovf)
                    pg.mouse.move(5, 5)
                    pg.wait_for_timeout(150)
                    check(f'{tag} nav: moving away closes it', not panel.is_visible())
                    toggle.focus()
                    pg.keyboard.press('Enter')
                    check(f'{tag} nav: Enter on the toggle opens it (keyboard)', panel.is_visible())
                    pg.keyboard.press('Escape')
                    check(f'{tag} nav: Escape closes it and returns focus to the toggle', (not panel.is_visible()) and pg.evaluate('() => document.activeElement?.getAttribute("aria-label") || ""').endswith(': show sections'))
            else:
                pg.click('button[aria-controls="news-mobile-menu"]')
                sub = pg.locator('#news-mobile-menu button[aria-label$=": show sections"]').first
                check(f'{tag} mobile nav: a section with sub-sections can expand', sub.count() == 1)
                if sub.count():
                    target = pg.locator('[id="%s"]' % sub.get_attribute('aria-controls'))
                    check(f'{tag} mobile nav: collapsed at first', not target.is_visible())
                    sub.click()
                    check(f'{tag} mobile nav: expands to show its sub-sections', target.is_visible() and target.locator('a').count() >= 1)
                    ovf = pg.evaluate('() => document.documentElement.scrollWidth - document.documentElement.clientWidth')
                    check(f'{tag} mobile nav: no horizontal overflow when expanded', ovf <= 0, ovf)
                pg.keyboard.press('Escape')

            # ---- article
            pg.goto(BASE + ARTICLE, wait_until='networkidle')
            check(f'{tag} article: heading', pg.locator('h1', has_text=LEAD).count() == 1)
            check(f'{tag} article: body', pg.get_by_text('The hall went quiet').count() >= 1)
            check(f'{tag} article: related stories', pg.locator('aside[aria-labelledby="related"] li').count() == 3)
            common('article')
            pg.screenshot(path=os.path.join(OUT, f'public-article-{w}-{scheme}.png'))

            # ---- category + page 2
            pg.goto(BASE + '/news/category/student-life', wait_until='networkidle')
            check(f'{tag} category: heading', pg.locator('h1', has_text='Student Life').count() == 1)
            common('category')
            pg.screenshot(path=os.path.join(OUT, f'public-category-{w}-{scheme}.png'))
            pg.goto(BASE + '/news/category/student-life/page/2', wait_until='networkidle')
            check(f'{tag} category page 2', pg.locator('h1', has_text='Student Life').count() == 1)

            # ---- explicit theme choice overrides the system
            other = 'light' if scheme == 'dark' else 'dark'
            pg.evaluate(f"() => localStorage.setItem('atlas-news-theme', '{other}')")
            pg.goto(BASE + '/news', wait_until='networkidle')
            bg = pg.evaluate("() => getComputedStyle(document.querySelector('[data-news-root]')).backgroundColor")
            check(f'{tag} stored theme choice ({other}) applies', bg == PAPER[other], bg)

            unexplained = [x for x in bad if not x.startswith('400 /_next/image?url=http%3A%2F%2F127.0.0.1')]
            check(f'{tag} no failed requests except the local S3 stand-in images', not unexplained, unexplained)
            other_errs = [e for e in errs if not e.startswith('Failed to load resource')]
            check(f'{tag} no console errors', not other_errs, other_errs)
            ctx.close()
    b.close()

sys.exit(0 if all(results) else 1)
