# ATLAS Chatbot → Next.js Integration Audit & Migration Plan

**Status:** READ-ONLY AUDIT. No files in either project were modified to produce this report (this `.md` is the only new file).
**Date:** 2026-10-23
**Author tooling:** static source inspection + safe local HTTP checks (no live leads / OTPs / messages were sent).

---

## 0. Projects located

| Role | Path | Identified how | Confidence |
|---|---|---|---|
| **PHP chatbot (source)** | `C:\xampp\htdocs\atlas\2026\10-october\22\atlas-chatbot\` | Given in task; inspected in full. | Verified |
| **Next.js site (target)** | `C:\xampp\htdocs\atlas\2026\08-august\5\atlas-website\` | `package.json` name `atlas-university`, Next 16.2.12, App Router, newest `atlas-website`, has `app/api`, `CLAUDE.md`. | Verified it is a Next.js app; **assumed** it is the *current* one |
| Older Next.js site (alt) | `C:\xampp\htdocs\atlas\2026\05-may\05\atlas-website\` | `package.json` name `atlas-skilltech-university`, Next 16, App Router. Likely an earlier snapshot. | Alternative — **please confirm** (Q1) |
| Unrelated | `…08-august\5\atlas-forge\` (portal app), `…upgrad-front` (CRA, not Next) | Different apps. | Verified not the target |

> If the target is actually the May snapshot, the plan is identical — only the paths change. See Q1.

---

## 1. End-to-end architecture (verified)

```
  VISITOR BROWSER
        │  GET page
        ▼
  ┌───────────────────────────┐        (today, PHP site)
  │ Root index.php            │  HTML fragment: image preloads +
  │ atlas-chatbot/index.php   │  <div class="my_chatbot" data-key> +
  └───────────────────────────┘  inline loader <script> (3s delay)
        │  after window load + 3s: inject <script src="chat-bot/chatbot.php?key=…">
        ▼
  ┌───────────────────────────┐
  │ chatbot.php (GATEKEEPER)  │  validates  key  +  host(domain allow-list)
  │ atlas-chatbot/chat-bot/   │  403 if either fails
  └───────────────────────────┘
        │  on pass: file_get_contents() server-side
        ▼
  ┌──────────────────────────────────────────────┐
  │ REMOTE widget source (not in repo)            │
  │ https://atlasskilltech.app/erp/assets/        │
  │        chatbot/chatbot.js   (~53 KB vanilla)  │
  └──────────────────────────────────────────────┘
        │  JS executes in browser, finds .my_chatbot, reads data-key (= "botKey")
        ▼
  ┌───────────────────────────┐
  │ Aliaa widget UI           │  builds #embedded-chatbot (circle + popup),
  │ (injected DOM, no React)  │  runs step state-machine, sets chat_session_id cookie
  └───────────────────────────┘
        │  fetch() JSON per step  (key + user data)
        ▼
  ┌──────────────────────────────────────────────┐        ┌──────────────┐
  │ ERP API  https://atlasskilltech.app/erp/api/* │ ─────▶ │ ERP/CRM      │
  │ 9 endpoints (createLead … message)            │        │ backend      │
  └──────────────────────────────────────────────┘ ◀───── │ (server-side,│
        ▲   JSON { status, message, reply, degrees }       │  not in repo)│
        │                                                   └──────────────┘
   bot replies / option buttons rendered back into the UI
```

**What the Next.js integration changes:** only the first box. Instead of PHP `index.php` emitting the mount div + loader, a Next.js **client component** emits the same `.my_chatbot` div and runs the same loader. Everything from `chatbot.php` onward stays **byte-for-byte the same remote system**.

---

## 2. User journey (step by step, verified from `chatbot.js` state machine)

State object: `state.step` starts at `'email'`; steps seen in code: `email → (verifyEmail) → phone/change_phone → (sendOtp) → otp/oldotp → (verifyOtp) → name → degree → chat`.

1. Visitor loads a page → sees nothing extra for ~3s (deliberate lazy load).
2. Loader injects `chatbot.php?key=…`; gatekeeper returns the widget JS.
3. Widget draws the chat **circle**; a `chat_session_id` cookie is set (client-generated).
4. Visitor clicks the circle → popup opens (`openChat()`), intro video + greeting.
5. Visitor enters **email** → `verifyEmail` → `createLead`.
6. Visitor enters **phone** → `sendOtp` (SMS OTP sent by backend).
7. Visitor enters **OTP** → `verifyOtp`.
8. Visitor enters **name**; picks **school / program / degree** → `getDegrees`, `getIntents`.
9. Visitor chats freely → each message → `message` endpoint → `data.reply` rendered.
10. As fields fill → `updateLead`; at qualification → `sendLeadToCRM`.

---

## 3. Data-flow inventory (every destination the code actually uses)

**Legend — Confidence:** `CODE` = verified in source · `TEST` = verified by a local HTTP test · `UNVERIFIED` = not runtime-checked (no live calls were made).

All API calls are issued **client-side** by `chatbot.js` with header `Content-Type: application/json`. `botKey` = the `data-key` attribute value.

| # | Data (fields) | Source | Destination | Method | Trigger | Purpose | Response → use | Evidence | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `key`, `email` | email input / `state.userData` | `https://atlasskilltech.app/erp/api/createLead` | POST | after email step | create lead | `status` | `chatbot.js` `createLead()` | CODE (not run) |
| 2 | `key`, `…userData` | collected state | `…/erp/api/updateLead` | POST | as fields fill | enrich lead | `status` | `updateLead()` | CODE |
| 3 | `key`, `…userData` | collected state | `…/erp/api/sendLeadToCRM` | POST | end of qualification | push to CRM | `status` | `sendLeadToCRM()` | CODE |
| 4 | `phone` | phone input | `…/erp/api/sendOtp` | POST | phone / change_phone | send SMS OTP | `status`,`message` | `handleMessage()` | CODE |
| 5 | `email` | email input | `…/erp/api/verifyEmail` | POST | email step | validate email | `status`,`message` | `handleMessage()` | CODE |
| 6 | `phone`, `otp` | OTP input | `…/erp/api/verifyOtp` | POST | otp / oldotp step | verify OTP | `status`,`message` | `handleMessage()` | CODE |
| 7 | `key`, `phone` (query) | state | `…/erp/api/getDegrees?key=&phone=` | GET | degree step | fetch degree list | `degrees[]` | `getDegrees()` | CODE |
| 8 | `key`, `message`(degree), `…userData` | degree choice | `…/erp/api/getIntents` | POST | after degree pick | resolve intent | `reply`/`message` | code | CODE |
| 9 | `key`, `message`, `chat_session_id`, `email`, `…userData` | chat input | `…/erp/api/message` | POST | chat step | main Q&A | `reply` | `handleMessage()` | CODE |
| 10 | — (widget source) | server fetch | `https://atlasskilltech.app/erp/assets/chatbot/chatbot.js` | GET (server) | loader | deliver widget | JS body | `chatbot.php:63` `file_get_contents` | TEST (returns 200 + valid JS) |
| 11 | avatar / course images | widget UI | `atlasskilltech.app/chat-bot/*` + YouTube embed | GET | render | images / intro video | media | `chatbot.js`, `chat-bot/index.php` | CODE |

**Browser state used:** a single cookie `chat_session_id` (client-generated via `setCookie`/`getCookie`; read back and sent on `message`). **No** `localStorage`/`sessionStorage` found. **No** analytics/tracking/logging destinations found in the chatbot code.

**Fields collected and where each goes** (`state.userData`): `email, phone, name, school, school_id, program, program_id, degree, degree_id, specialization, specialization_id, chat_session_id` → all flow to `createLead` / `updateLead` / `sendLeadToCRM` and ride along on `message`/`getIntents`. No field is stored locally beyond the session cookie.

**Chain summary (each hop separate):**
`browser input` → **(hop A, verified in code)** `fetch → atlasskilltech.app/erp/api/*` → **(hop B, NOT verifiable here)** ERP server-side logic → **(hop C, NOT verifiable here)** CRM + SMS/email providers. Hops B and C are server-side on ATLAS infrastructure and **cannot be confirmed from this repo** — do not assume a lead actually reaches the CRM just because `sendLeadToCRM` is called.

---

## 4. Authentication & secrets (names only — no values printed)

| Mechanism | Where | Exposed to browser? | Note |
|---|---|---|---|
| **Loader key** (query `?key=…`) | `index.php` inline + `chatbot.php` `$allowedKeys` | **Yes** — visible in page HTML | Gate #1. A 32-char hex key. Already client-visible today. |
| **Domain allow-list** | `chatbot.php` `$allowedDomains` | server-side only | Gate #2. Already includes `atlasuniversity.edu.in` + `www.` (TEST-confirmed in file). `localhost` added for dev. |
| **Widget `data-key`** (`botKey`) | `.my_chatbot[data-key]` | **Yes** — sent as `key` in every API call | Currently the placeholder `abc123xyz`. Real value unknown (Q2). |
| NPF widget id / csrf (legacy bot only) | `chat-botv2/index.html` | n/a to active flow | Belongs to the unused NoPaperForms bot. |

**No server-side secret is hidden by the current design** — both the loader key and the `data-key` already travel to the browser. Moving the frontend to Next.js therefore **exposes nothing new**. The only real protections are the domain allow-list (server-side in `chatbot.php`) and whatever the ERP enforces server-side.

---

## 5. PHP chatbot files: essential vs not (for this integration)

| File / folder | Classification | Needed for Next.js integration? |
|---|---|---|
| `index.php` | Active entry (PHP site) | **Reference only** — we reproduce its 2 lines (mount div + loader) in React. Not copied. |
| `chat-bot/chatbot.php` | **Essential** gatekeeper | **Must stay hosted & reachable** (see Q3 for its production URL). The Next.js loader points at it. |
| remote `…/erp/assets/chatbot/chatbot.js` | **Essential** (external) | The real widget. Stays remote. |
| `…/erp/api/*` | **Essential** (external) | The backend. Stays remote. |
| `chat-bot/chat-botv2/` (NPF "Niaa": `index.html`, `livepage.html`, `main.js`, `npfChatBot.js`) | **Unused / separate** implementation | Not part of this flow. Ignore. |
| `chat-bot/index.php` | **Unused** static "Aliaa" mock-up | Ignore. |
| `chat-bot/assets/…`, `*.jpg`, `*.svg`, `aliaa.png` | Mostly served from `atlasskilltech.app` at runtime | No local copy needed; widget loads them from the remote host. |
| `chat-bot/25-06-2025.zip`, `chat-bot/aliaa` (no ext) | Backup / unknown | Ignore (Q6). |
| `architecture.html` | Prior audit doc | Reference only. |

---

## 6. Recommended strategy

### Options compared (against the actual code)

| Option | What it means | Risk | Preserves UX/flow/CRM? |
|---|---|---|---|
| **1. Reuse hosted widget (RECOMMENDED)** | Next.js client component renders the `.my_chatbot` div + runs the same loader pointing at the hosted `chatbot.php`. | **Lowest** | **Fully** — identical remote widget & backend |
| 2. Self-host the frontend JS, keep backend | Copy `chatbot.js` into the repo, keep ERP calls. | Medium — `chatbot.js` isn't in the repo; you'd fork a file that the ATLAS team updates server-side; you drift. | Mostly, until remote changes |
| 3. Rewrite frontend in React | Re-implement the whole state machine (email/OTP/degree/chat/lead) in components. | **Highest** — must perfectly reproduce OTP, lead, CRM sequencing; easy to break deliverability; no benefit since backend stays remote. | Only if flawless |

### Recommendation: **Option 1.**
It changes exactly one box in the diagram, reproduces a pattern the project **already uses** (`BrochureModal.js` injects a third-party widget script with `useEffect` + `createElement('script')` + a once-guard), and leaves every security check and ERP/CRM integration untouched. Do **not** adopt Option 3 — it would move a working OTP/lead pipeline into client code with no upside and real regression risk.

### Can the current widget run on Next.js? — Yes, with these facts:
- **Needs a container:** `chatbot.js` does `querySelector('.my_chatbot')` and **exits silently if absent** → the component must render `<div className="my_chatbot" data-key="…">`.
- **Needs the `data-key`:** becomes the `key` on every API call (Q2 for the real value).
- **Script order / timing:** today it waits `window load` + 3s; in React an effect after mount is equivalent. Must inject **once** (guard on `document.querySelector('script[src=…]')`, exactly like `BrochureModal`).
- **PHP endpoint must stay hosted:** the loader fetches `chatbot.php`; that URL must be publicly reachable from the visitor's browser (Q3).
- **Domain allow-list:** `chatbot.php` already allows `atlasuniversity.edu.in` and `www.` → production is covered. **localhost dev** is covered too. A **Vercel preview domain** (`*.vercel.app`) is **not** in the list (Q4).
- **CORS:** the browser will call `atlasskilltech.app/erp/api/*` cross-origin from `atlasuniversity.edu.in`. The ERP must send `Access-Control-Allow-Origin` for that origin (Q5) — **this is the single most likely breakage** and cannot be verified from this repo.
- **Cookies:** `chat_session_id` is a first-party cookie on the site's own domain (set by injected JS), so no third-party-cookie problem.
- **CSP:** the project has **no** Content-Security-Policy today (none found in `next.config.mjs` or headers), so nothing to relax yet — but if a CSP is added later it must allow `script-src/connect-src/img-src/frame-src` for `atlasskilltech.app`, `*.npfs.co`/`chatcdn.npfs.co`, and `youtube.com`.
- **Hydration:** render the widget only in a `'use client'` component and inject the script in `useEffect` (never during render) to avoid hydration mismatch.
- **Duplicate loading:** mount the component **once** in `app/layout.js` (not per page) and keep the script once-guard, so route changes don't double-inject. (The PHP site's old duplicate `<script>` bug must not be reproduced.)

---

## 7. Proposed Next.js files (to CREATE — none yet created)

Following project conventions (JS only, Tailwind, `@/*` alias, `'use client'` + `useEffect` injection like `BrochureModal.js`):

| File | New/modify | Responsibility |
|---|---|---|
| `components/Chatbot/AtlasChatbot.js` | **new** | `'use client'`. Renders `<div className="my_chatbot" data-key={…} style={{display:'none'}} />`; in `useEffect`, once-guarded, injects `<script src={LOADER_URL}>`; optional ~3s / `requestIdleCallback` delay to match current lazy behavior. |
| `app/layout.js` | **modify (later, on approval)** | Mount `<AtlasChatbot />` once, after `{children}`, inside `<MainSiteOnly>` if schools should be excluded. One mount = no duplicates. |
| `.env.local` + `.env.example` | **new** | `NEXT_PUBLIC_CHATBOT_LOADER_URL`, `NEXT_PUBLIC_CHATBOT_DATA_KEY` (both are public by nature — see §4). |
| (optional) `app/api/chatbot-loader/route.js` | **new, only if** `chatbot.php` cannot be hosted reachably | A Next.js proxy that performs the same gatekeeping + `fetch` of `chatbot.js`. Only needed if Q3 answer is "no PHP host." Avoid if `chatbot.php` stays live. |

No TypeScript, no new styling framework, no new global stylesheet (respects `CLAUDE.md`).

---

## 8. Environment / domains / hosting / config

- **Env vars (names only; both are non-secret / client-visible by design):**
  - `NEXT_PUBLIC_CHATBOT_LOADER_URL` — absolute URL of the hosted `chatbot.php` (Q3).
  - `NEXT_PUBLIC_CHATBOT_DATA_KEY` — the real `data-key` value (Q2).
- **Domains that must be allow-listed in `chatbot.php`:** production `atlasuniversity.edu.in` ✅ already; add any **preview/staging** domains used (Q4).
- **Hosting:** `chatbot.php` must remain served by a PHP host reachable from the browser; the ERP + `chatbot.js` stay on `atlasskilltech.app`. Server needs internet + `allow_url_fopen` (true on the dev box).
- **CORS:** ERP must allow the site origin on `/erp/api/*` (Q5).

---

## 9. Security & privacy concerns

1. **PII in flight:** email, phone, name, OTP go to `atlasskilltech.app/erp/api/*` over HTTPS. Confirm TLS + that the ERP stores/forwards lawfully. (CODE-verified they're sent; destination handling UNVERIFIED.)
2. **Consent:** no cookie-consent/CMP component was found in the Next.js app. The bot sets a `chat_session_id` cookie and contacts a third party — confirm this fits the site's privacy policy before enabling site-wide (Q7).
3. **Client-visible key:** nothing new is exposed vs today, but understand the `data-key` and loader key are public; real access control is the domain allow-list + ERP server checks.
4. **Do not** reimplement OTP/lead/CRM in client code (Option 3) — it would risk leaking logic and breaking anti-abuse checks the ERP may rely on.
5. **No secret belongs in the Next.js repo** — only the public loader URL + data-key.

---

## 10. Migration checklist & regression-test plan

**Checklist (execute only after approval):**
- [ ] Confirm Q1–Q6.
- [ ] Add `NEXT_PUBLIC_CHATBOT_LOADER_URL` + `NEXT_PUBLIC_CHATBOT_DATA_KEY` to `.env.local` / `.env.example`.
- [ ] Create `components/Chatbot/AtlasChatbot.js` (mount div + once-guarded loader).
- [ ] Mount once in `app/layout.js`.
- [ ] Verify `chatbot.php` allow-list covers every domain the site runs on.
- [ ] Confirm ERP CORS allows the site origin.

**Regression tests (use test/staging data only — no live leads):**
1. Widget circle appears on home + a deep route; appears **once** (no duplicate `#embedded-chatbot`).
2. No console 403 for the loader; `chatbot.js` returns 200.
3. No hydration warning in dev.
4. Open → email → OTP → name → degree → chat happy path (against a **staging** ERP/key if available).
5. Network tab: each `/erp/api/*` call fires at the right step with expected fields; responses render.
6. Route changes (App Router client nav) don't re-inject the script or reset the chat.
7. Mobile + desktop layout; widget doesn't overlap the fixed header/footer or `PageLoader` (z-index).
8. Lighthouse: lazy injection keeps it off the critical path.

---

## 11. Questions to confirm with the ERP/CRM / chatbot owner

- **Q1.** Is `…\2026\08-august\5\atlas-website` the correct target (vs the May `atlas-skilltech-university`)?
- **Q2.** What is the **real `data-key`** for production? (Current repo shows placeholder `abc123xyz`.)
- **Q3.** What is the **public URL of `chatbot.php`** in production (e.g. `https://atlasskilltech.app/chat-bot/chatbot.php`)? Will it stay hosted?
- **Q4.** Which **preview/staging domains** (e.g. `*.vercel.app`, `staging.…`) must be added to `chatbot.php`'s `$allowedDomains`?
- **Q5.** Does `/erp/api/*` send **CORS** headers allowing the site origin for cross-origin browser calls?
- **Q6.** Is the loader key rotation/validity owned by the ERP team? Any rate-limit/abuse rules we must respect?
- **Q7.** Privacy/consent: is a consent gate required before loading the bot (cookie + PII to third party)?
- **Q8.** Should the bot appear on **all** routes, or exclude school sub-sites (`MainSiteOnly`) / specific pages?

---

## 12. Verified vs assumed vs unknown

**Verified by local test (TEST):** `chatbot.php` returns **200 + valid JS** for a valid key on an allowed host and **403** otherwise; the delivered `chatbot.js` (~53 KB) parses; the root page injects the loader exactly once; `chatbot.php` allow-list contains `atlasuniversity.edu.in`.

**Verified by source inspection (CODE):** the 9 ERP endpoints, their methods, payload field names, triggers, the response fields the widget reads (`status`/`message`/`reply`/`degrees`), the state machine, the `chat_session_id` cookie, the `.my_chatbot` + `data-key` contract, and the Next.js project's script-injection convention.

**Assumptions:** that the August `atlas-website` is the active target (Q1); that `chatbot.php` is hosted on `atlasskilltech.app` in production (Q3).

**Unknown / NOT verified (no live calls made):** real ERP/CRM responses; whether leads actually reach the CRM; OTP/SMS delivery; CORS behavior (Q5); the real `data-key` (Q2); production hosting of `chatbot.php` (Q3). These require ERP-team access or an approved staging test — not guessed here.

---

## Hinglish summary (as requested)

**1. Chatbot ka data exactly kahan ja raha hai?**
Browser se seedha `https://atlasskilltech.app/erp/api/*` par (9 endpoints) — email, phone, OTP, naam, degree selection aur chat messages, sab `key` (data-key) ke saath JSON POST/GET me. Wahi data lead ban kar `createLead/updateLead/sendLeadToCRM` ke through ERP → CRM tak jaata hai. Widget ki JS file bhi `atlasskilltech.app/erp/assets/chatbot/chatbot.js` se aati hai (PHP `chatbot.php` server-side fetch karke deta hai). Browser me sirf ek cookie banti hai: `chat_session_id`. **Lekin** ERP/CRM ke andar ka behaviour (lead sach me CRM tak pahunchta hai ya nahi, OTP SMS jaata hai ya nahi) hum is repo se confirm **nahi** kar sakte — woh server-side hai.

**2. Kya existing chatbot Next.js me same functionality ke saath chalega?**
Haan. Sirf ek `.my_chatbot` wala `<div data-key="…">` aur loader script chahiye — baaki widget + backend bilkul same rahega. Tumhare Next.js project me already yehi pattern hai (`BrochureModal.js` third-party script inject karta hai), to fit perfect hai.

**3. Sabse safe integration method kaunsa?**
**Option 1 — hosted widget reuse.** Ek chhota `'use client'` component banao jo mount div + loader daale (once-guard ke saath), aur `app/layout.js` me ek hi baar mount karo. Isme UX, flow, OTP, lead, CRM — kuch nahi badalta, isliye sabse kam risk. Frontend ko React me pura rewrite (Option 3) **mat** karo — fayda zero, risk zyada.

**4. Kaunse external systems/domains/keys/permissions chahiye?**
`chatbot.php` ka live hosted URL; asli `data-key`; ERP domain `atlasskilltech.app` reachable; site domain `atlasuniversity.edu.in` already allow-list me hai (preview/staging domains add karne padenge); aur ERP par **CORS** site origin ke liye allow hona chahiye (yahi sabse zyada chance hai breakage ka).

**5. Implementation se pehle kya confirm karwana hai?**
Upar wale **Q1–Q8** — khaaskar: sahi Next.js project (Q1), asli data-key (Q2), `chatbot.php` ka production URL (Q3), CORS (Q5), aur consent/privacy (Q7). In ke bina live integration start nahi karni chahiye.

---

*End of audit. No implementation changes made. Awaiting approval (and Q1–Q8 answers) before any code is written.*
