# Build the UNBORING PEOPLE website: unboringpeople.com

You are the creative technologist, art director and senior front-end engineer for **UNBORING PEOPLE**, a creative growth agency. Build its website from scratch.

This is not a normal agency site. Most agency websites look the same: a stock-photo hero, "results-driven digital solutions", a row of service icons, fake client logos. **This site's job is to be the opposite, and to prove we can make brands impossible to ignore by doing it to ourselves first.** If a visitor could mistake any section for another agency's, that section has failed.

At the same time it is a business tool. Every crazy idea on the page must earn its place by moving a visitor toward one action: **starting a conversation with us on WhatsApp or by email.**

---

## 0. How to work

1. Read this whole brief before writing any code.
2. Before building, reply with: (a) the sitemap, (b) a short design direction, with one sentence on what makes each page unboring, (c) the tech stack you'll use, and (d) every question you need answered. Wait for my answers.
3. Build in milestones (section 11). After each one, run the site locally, check it at 375px and 1440px wide, and tell me what's done and what's next.
4. Where you need a fact I haven't given you (prices, an email address, legal text), put a visible placeholder like `[YOUR EMAIL]` and list every placeholder at the end. **Never invent one.**
5. Push back if something in this brief is a bad idea. I'd rather hear it than get a site that's worse because you followed orders.

---

## 1. The brand

- **Name:** UNBORING PEOPLE (always uppercase in headings and the logo)
- **What we are:** a creative growth agency. Part creative advertising agency, part brand strategy studio, part performance marketing partner.
- **Main tagline:** Make boring brands unforgettable.
- **Positioning line:** We make brands impossible to ignore.
- **Core belief:** "Great brands don't need to shout louder. They need to give people something worth talking about."
- **Supporting lines to use across the site:** Ordinary is not our thing. / Less boring. More business. / Don't just exist. Make an impact. / Attention is just the beginning. / Different thinking. Real growth.
- **Locations:** Surat, India ⇄ New Jersey, USA. Show this as a two-way bridge, not "HQ + branch".
- **Who we work with:** businesses with good products and boring marketing. Premium local businesses, real estate developers, restaurants and cafés, hospitality, interior design and architecture firms, healthcare and wellness, fashion and jewellery, D2C and lifestyle brands, startups.
- **Stage:** brand new. No clients yet, no portfolio, no case studies. We're taking **3 founding clients** at founder pricing in exchange for a case study. Be honest and confident about this. It's a strength, not something to hide.

### Voice
Confident, bold, witty, intelligent, direct. A smart creative person who also understands margins. Short sentences. Verbs over adjectives.

Never write: "results-driven", "360° solutions", "synergy", "leverage", "cutting-edge", "one-stop shop", "take your business to the next level", "we are passionate about", "guaranteed viral", or any promise of specific results.

### Honesty rules (non-negotiable)
- No fake testimonials, client logos, case studies, stats ("200+ brands served"), awards, team photos or team members.
- No "trusted by" strip. No counters that count up to made-up numbers.
- Example campaign ideas must be clearly presented as **ideas**, not past work.
- Any number shown must be real, or a placeholder for me to fill in.

---

## 2. Visual identity

Direction: **brutalist, editorial, unconventional, premium.** Think of a printed art-school magazine crossed with a protest poster, built by someone who cares about kerning.

| Token | Value | Use |
|---|---|---|
| Ink Black | `#111111` | Main ground and text |
| Acid Lime | `#B8F279` | The one accent: highlights, CTAs, hover states. Never use it for body text on Warm White (fails contrast) |
| Warm White | `#F5F3EB` | Paper ground |
| Concrete Grey | `#777777` | Secondary text on dark only, and only when it passes contrast |

**Type:** Archivo Black for display (huge, tight, uppercase). Space Grotesk for labels, numbers and UI. DM Sans for body text. Inter is a fallback only. Self-host the fonts and subset them.

**Principles:** oversized type that breaks the grid on purpose. Hard edges, thick 3px black borders, solid offset shadows (no blur). Lots of negative space, then sudden density. Asymmetry. Strong hierarchy. Editorial photography only, and where there's none yet, typographic compositions, not stock photos.

**Banned:** purple or blue gradients, glassmorphism, stock imagery, 3D blobs, generic illustrated people, emoji used as icons, rounded-card SaaS layouts, centered-everything layouts, AI-art visuals.

---

## 3. Signature ideas (the "crazy" part)

These make the site worth talking about. Build all of them unless you push back with a better idea. Each one must work on mobile, on keyboard, and with `prefers-reduced-motion` (give a calm alternative, never just turn it off).

### 3.1 The Boring Site (homepage opening)
On the first visit, the homepage loads as a **deliberately boring generic agency site**: a stock-style hero, "We are a results-driven digital marketing agency delivering 360° solutions", three service icons, a blue "Contact Us" button. It must look real enough that people half-believe it for a moment.

After about 1.5 seconds, or when the visitor clicks a lime button saying **"Ugh. Make it unboring."**, the boring site gets destroyed: it cracks, gets crossed out in lime marker, or collapses like a demolished building. The real site appears underneath.
- Show it only once per session (use `sessionStorage`), with a visible "Skip" button.
- The real content must be in the HTML from the start, so crawlers and screen readers get the real site. The boring layer is a decorative overlay with `aria-hidden`.
- With reduced motion on: a quick cross-fade.

### 3.2 The Boring Test (`/test`, plus a teaser on the homepage)
Six questions with three answers each. Each answer scores 0, 1 or 2. The total is scaled to a **Boring Score out of 10**.

1. Your Instagram bio currently says… *"Best quality. Best service."* (2) / what we sell and where (1) / a line people remember (0)
2. Cover your logo on your last 5 posts. Would people still know they're yours? No (2) / maybe one or two (1) / instantly (0)
3. Put your ads next to your 3 biggest competitors'. They look… the same (2) / a bit different (1) / nothing like theirs (0)
4. When did a customer last talk about your marketing, not your product? Never (2) / once or twice (1) / often (0)
5. Your go-to marketing move is… discounts and festival greeting posts (2) / posting regularly and hoping (1) / campaigns built around one strong idea (0)
6. Your Google reviews are… few, old or unanswered (2) / decent but rarely replied to (1) / steady, and we reply to all (0)

**Results:**
- 0–3 "Suspiciously unboring."
- 4–6 "Boring-ish."
- 7–10 "Certified boring."

Each result gets a two-line verdict in the brand voice.

**After the result:**
- An optional field for the business name or Instagram handle.
- A **WhatsApp** button that opens `https://wa.me/917777949735` with the message already typed: "Hi UNBORING PEOPLE! My Boring Score is X/10 (handle). I'd like my free Unboring Audit."
- An email button, for US visitors.
- A **shareable result card**: generate a 1080×1350 PNG in the browser on a canvas (black, lime, giant score) that the visitor can download and post. It's a free ad every time someone shares it.
- The note: "A playful score, not a scientific one."

### 3.3 The Unboring Lab (`/lab`): the idea vault
A library of crazy-but-doable campaign ideas, one per card, filterable by industry (café, real estate, jewellery, wellness, D2C, hospitality, interiors).

Each idea has: a hook line, the idea in 2–3 sentences, the business objective (footfall, leads, reviews, sales), a rough budget band, and a "steal this idea" CTA that goes to WhatsApp.

Add a **"Shuffle me an idea"** button that spins through ideas like a slot machine and lands on one.

Seed it with 8 ideas, marked clearly as ideas, written in a JSON or Markdown content file so I can add more without touching code. Write the seed ideas yourself in the brand voice, doable on an Indian local-business budget.

### 3.4 "Things we'll never say"
A full-width band where clichés ("Results-driven", "360° solutions", "Go viral guaranteed", "Synergy", "10k followers in a week") scroll past. Each one gets struck through by a lime marker as it reaches the center. This is our honesty statement, made visual.

### 3.5 Two clocks, one agency
A small live element showing local time in **Surat (IST)** and **New Jersey (ET)**, with a line that changes by hour. For example: "4:20 pm in Surat. 5:50 am in New Jersey. Someone here is always awake thinking about your brand." Handle daylight saving correctly with `Intl.DateTimeFormat` and the time zones `Asia/Kolkata` and `America/New_York`.

### 3.6 The founding seats
On `/founding`, show three big chairs (typographic or simple SVG). Taken seats appear filled, with a name only if I give one. The number of seats taken comes from a single config value. **No fake scarcity**: the number is whatever I set.

### 3.7 The Boring Button
In the footer, a big grey button labelled "Boring button" that does nothing, except count clicks: "You pressed the boring button 7 times. Nothing happened. That's the point. Now press this one." The second button is the lime CTA.

### 3.8 Cursor and micro-interactions (desktop only)
A small lime cursor follower that grows over links and shows a one-word verb ("talk", "steal", "test"). Hovering a big headline knocks individual letters out of alignment. Keep it fast. Turn it off on touch devices and with reduced motion.

### 3.9 The 404 page
"This page was so boring it left." Plus a button to the Boring Test.

If you have a better idea than any of these, pitch it in your plan with one line on the business reason.

---

## 4. Sitemap and content

| Route | Purpose | Key content |
|---|---|---|
| `/` | Convert a curious visitor into a test-taker or a chat | Boring Site intro → hero ("We make brands impossible to ignore.") → manifesto strip → the 5 services as 5 bold rows → Lab teaser with 3 ideas → Boring Test teaser → "Things we'll never say" band → founding seats teaser → two clocks → final CTA |
| `/services` | Explain what we do without jargon | 5 sections: **Unboring Identity** (positioning, storytelling, strategy, voice, visual direction, differentiation), **Unboring Ideas** (campaigns, guerrilla, activations, influencer collabs), **Unboring Content** (social strategy, Instagram, reels, carousels, calendars), **Unboring Performance** (Meta Ads, Google Ads, lead gen, retargeting, creatives, CRO, analytics), **Unboring Presence** (Google Business Profile, local SEO, reviews, website improvement, reputation). Each section covers what you get, who it's for, and one example idea. Add a note: "Ad budgets, production and third-party costs are separate from our fee, and always shown upfront." |
| `/lab` | Show how we think | Idea vault (3.3) |
| `/test` | Lead magnet | Boring Test (3.2) |
| `/founding` | The offer | What founding clients get, what we ask for (a case study and honest feedback), seats (3.6), how it works in 4 steps, FAQ |
| `/manifesto` | Why we exist | The core belief, what we believe, what we refuse to do, Surat ⇄ New Jersey |
| `/talk` | Contact | WhatsApp (+91 77779 49735), email `[YOUR EMAIL]`, a short form (name, business, website or Instagram, "what's boring about your marketing?") that sends to `[FORM ENDPOINT, ask me]` or falls back to opening WhatsApp with the answers filled in |
| `/start` | Link-in-bio page for Instagram | Compact mobile page: logo, one line, Boring Test, free audit (WhatsApp), founding seats, The Lab, Instagram |
| `/privacy` | Required | Plain-language placeholder privacy policy, clearly marked for me to review |
| `/404` | Error page | See 3.9 |

**No `/work` page yet.** Build the component and content type, but keep the route off until there's real work to show.

**Primary CTA everywhere:** "Take the Boring Test". **Secondary CTA:** "Talk to us on WhatsApp".

Instagram handle: `@unboringpeople`. No LinkedIn for now.

---

## 5. Tech stack (suggested; challenge it if you have a better reason)

- **Astro** with TypeScript, so most of the site ships as static HTML. Use islands only for the interactive parts (test, lab shuffle, clocks, cursor, Boring Site overlay).
- Tailwind CSS with the brand tokens set up as theme variables, or plain CSS with custom properties. Pick one and keep to it.
- GSAP or Motion One for the big animations. Nothing heavier.
- All content (services, lab ideas, test questions, verdicts, founding seat count, contact details) in `/src/content` or one `site.config.ts`, so I can edit copy without touching components.
- Deploy target: Vercel or Netlify, connected to the `unboringpeople.com` domain. Write a short README covering local setup, how to edit content, and how to deploy.

---

## 6. SEO and sharing

- A unique title and meta description for every page, in the brand voice, including relevant search phrases like "creative marketing agency Surat" and "branding agency New Jersey".
- Open Graph and Twitter images for each main page, generated in the brand style at 1200×630.
- `sitemap.xml`, `robots.txt`, canonical URLs, and `Organization` + `LocalBusiness` JSON-LD for Surat. Leave the address as `[ADDRESS]`.
- Semantic HTML, one `h1` per page, real text (never text baked into images).

---

## 7. Performance and accessibility (acceptance criteria)

- Lighthouse on mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- LCP < 2.5s on a mid-range phone. The Boring Site overlay must not delay the real LCP element.
- Total JS on the homepage under about 120 KB gzipped.
- WCAG 2.2 AA: contrast passes (lime is for backgrounds and accents on black, not text on white), visible focus states, full keyboard use, `prefers-reduced-motion` respected everywhere, alt text on images, and labels on form fields.
- Works from 360px up to 1920px wide. No sideways scrolling on mobile.
- Every page's content is readable with JavaScript turned off.

---

## 8. Analytics and tracking

Leave hooks for, but don't hard-code accounts:
- A privacy-friendly analytics script slot (Plausible or GA4, placeholder ID).
- A Meta Pixel slot, placeholder ID.
- Track these custom events: `test_started`, `test_completed` (with score), `whatsapp_click` (with source page), `result_card_downloaded`, `lab_idea_shuffled`, `email_click`.

---

## 9. Copy

Write all copy yourself in the brand voice, following sections 1 and 3. Keep it short. Every heading should be something a business owner would screenshot. Mark any line you're unsure of with `<!-- COPY: check -->` so I can review it.

---

## 10. Things I need to supply later (keep these as placeholders)

Business email, form endpoint, address, analytics and pixel IDs, founding seat count, real photos, real case studies, a privacy policy review.

---

## 11. Milestones

1. **Plan:** sitemap, design direction, stack, questions. Then stop and wait for me.
2. **Foundation:** project setup, design tokens, fonts, layout, nav, footer (with the Boring Button), content files.
3. **Homepage**, including the Boring Site intro and the "Things we'll never say" band.
4. **Boring Test** with the result card, and **`/start`**.
5. **The Lab, Services, Founding, Manifesto, Talk, 404, Privacy.**
6. **Polish:** micro-interactions, cursor, two clocks, OG images, SEO, analytics hooks.
7. **QA:** Lighthouse runs, keyboard pass, reduced-motion pass, checks at 375px and 1440px, README, and the list of placeholders.

At the end, give me: the deploy steps for `unboringpeople.com`, every placeholder still open, and your top 3 suggestions for making the site even less boring in version 2.
