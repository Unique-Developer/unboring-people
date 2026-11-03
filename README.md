# UNBORING PEOPLE: unboringpeople.com

Astro 7 static site, plain CSS with custom properties, no UI framework. Deploys to Netlify.
Homepage ships about 4 KB of gzipped JavaScript.

## Run it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/, including /og/*.png share images
npm run preview   # serve dist/ locally, the way Netlify will
```

Requires Node 22.23+.

Handy URLs while testing:
- `/?intro=1` forces the Boring Site intro (it normally shows once per browser session).
- `/?utm_source=x` (or `fbclid`, `gclid`) skips it, which is what ad traffic sees.
- `/test?q1=0` starts the test at question 2, as if question 1 was answered on the homepage.

## Edit content without touching components

| What | Where |
|---|---|
| Email, WhatsApp, address, Instagram, seats taken, analytics IDs | `src/site.config.ts` |
| Lab ideas, one file each (`featured: true` = homepage) | `src/content/lab/*.md` |
| Services | `src/content/services.json` |
| Boring Test questions and verdicts | `src/content/test-questions.json`, `src/content/test-verdicts.json` |
| "Things we'll never say" | `src/content/never-say.json` |
| Founding FAQ | `src/content/founding-faq.json` |
| Case studies (route switched off) | `src/content/work/*.md` |
| Colours, type scale, borders | `src/styles/tokens.css` |
| Logo files used by the site | `public/brand/` (copied from `Brand Design Reference/Logo`) |
| What boring mode looks like | `src/styles/boring-mode.css` |
| Share-image titles | `ogPages` in `src/pages/og/[slug].png.ts` |

- **New Lab idea:** copy any file in `src/content/lab/`, rename it, change the front matter and the paragraph.
- **A founding seat is taken:** add `{ industry: 'café', city: 'Surat' }` to `founding.taken` in `site.config.ts`. Add `name: '...'` only if the client agreed to be named.
- **Turn on analytics:** paste the GA4 ID (`G-...`) and Meta Pixel ID into `site.config.ts`. The cookie notice and the "Cookie settings" footer link appear automatically; nothing loads until a visitor taps "Fine".
- **Turn on /work:** see the instructions at the top of `src/pages/_work.astro`. Real, client-approved numbers only.

Logo files, every variation, colours and usage rules: see [Brand Design Reference](Brand%20Design%20Reference/README.md).

Anything in `[SQUARE BRACKETS]` is a placeholder. Lines marked `COPY: check` are copy to confirm.

## Deploy to unboringpeople.com (Netlify)

### 1. Put the code on GitHub

```bash
git init
git add .
git commit -m "UNBORING PEOPLE website"
```

Create an empty private repo on GitHub, then:

```bash
git remote add origin https://github.com/<you>/unboring-people.git
git push -u origin main
```

### 2. Create the Netlify site

1. Netlify → **Add new site → Import an existing project → GitHub** → pick the repo.
2. Build settings come from `netlify.toml` (`npm run build`, publish `dist`, Node 24). Click **Deploy**.
3. Check the `*.netlify.app` URL it gives you: homepage intro, the test, the share card, the Talk form.

### 3. Switch on the form

1. **Site configuration → Forms** → enable form detection, then trigger a redeploy (Deploys → Trigger deploy) so Netlify registers the `talk` form.
2. **Forms → Form notifications → Add notification → Email** → `bored@unboringpeople.com`.
3. Send a test message from `/talk` and confirm it arrives. Netlify's spam filter plus the hidden trap field handle most bots.

### 4. Connect the domain

1. **Domain management → Add a domain** → `unboringpeople.com`. Netlify adds `www` as well.
2. At your domain registrar, either:
   - **Easiest:** switch the nameservers to the four Netlify DNS nameservers Netlify shows you, or
   - **Keep your DNS:** add the A record (apex) and CNAME (`www` → `<your-site>.netlify.app`) exactly as Netlify's domain panel lists them.
3. Wait for DNS (minutes to a few hours). Netlify issues the HTTPS certificate automatically. Then set `unboringpeople.com` as the primary domain.

### 5. After launch

- Switch the Instagram bio link to `unboringpeople.com/start`.
- Submit `https://unboringpeople.com/sitemap-index.xml` in Google Search Console.
- Create or claim the Google Business Profile for the Surat address and link the site.
- Share a page on WhatsApp to confirm the preview image shows.
- Delete `UNBORING PEOPLE Links.html` once `/start` is live.

## QA results (3 November 2026, production build, Lighthouse 13.6 mobile)

| Page | Perf | A11y | Best practices | SEO | LCP |
|---|---|---|---|---|---|
| `/` | 100 | 96* | 100 | 100 | 0.9 s |
| `/services` | 100 | 100 | 100 | 100 | 0.8 s |
| `/lab` | 100 | 100 | 100 | 100 | 0.9 s |
| `/test` | 100 | 100 | 100 | 100 | 0.9 s |
| `/founding` | 100 | 100 | 100 | 100 | 0.8 s |
| `/manifesto` | 100 | 100 | 100 | 100 | 0.8 s |
| `/talk` | 100 | 100 | 100 | 100 | 0.8 s |
| `/privacy` | 100 | 100 | 100 | 100 | n/a |
| `/start` | 100 | 100 | 100 | 69** | 0.9 s |

\* Lighthouse catches the Boring Site intro mid-demolition and flags a half-faded parody button. Visitors only see that frame for a fraction of a second, and the overlay is hidden from screen readers.
\** `/start` is deliberately `noindex` (it duplicates the homepage's offers), which is the only SEO point lost.

Also checked:
- **Keyboard:** skip link, then 45 tab stops through the homepage, all with a visible focus style, in reading order. The menu closes on Escape; the test, filters, FAQ and form all work by keyboard.
- **Reduced motion** (headless Chrome with it forced on): the intro cross-fades and clears, the cliché band stops and shows every cliché crossed out, no sticker spin, no cursor, no letter knock, the shuffle lands instantly.
- **JavaScript off:** every page ships its full text in the HTML; the intro never shows; the test lists its questions with a WhatsApp link; the menu still opens.
- **Widths:** no sideways scroll at 360, 375 and 1440px on any page.
