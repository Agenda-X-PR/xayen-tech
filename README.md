# Ekundayo Oyinkansola · Portfolio

A hand-built portfolio site for Ekundayo Oyinkansola: cybersecurity analyst, full-stack developer and SDK author. Static HTML, CSS and vanilla JavaScript: no framework, no build step, no dependencies. Two pages: `index.html` (the main chart) and `blog.html` (field notes).

## Design: chrome black

Near-black surfaces, silver "chrome" display type, monospace HUD details, and **yellow (`#ffd43a`) as the single accent color**:

- **Chrome black palette**: background `#0a0b0e`, graphite cards `#13161c`, near-white ink, pale gray display accents. A faint fixed blueprint grid and a warm glow sit behind the content.
- The headline reads **"I break software ★ to build it better"**: centers the work itself. The pale "break" carries a glitch-scramble hover, and the inline **four-point star spins slowly, twinkles, and pulses on click** before smooth-scrolling to the work.
- Typography pairs **self-hosted Poppins** (headings, body) with **self-hosted JetBrains Mono** (eyebrows, nav, chips, stats, links).

## Star map

The whole site reads as a nautical star chart:

- **Fixed home bar**: a slim fixed strip at the very top: the rotating star logo with the `xayen` wordmark only (the full name keeps its own byline in the hero), acting as a home button. A GMT+1 clock sits at the right edge. The page slides beneath it as you scroll.
- **Fixed starfield canvas**: ~130 drifting, twinkling stars in three **scroll-parallax depth layers**, a few amber "hot" stars marked with cross sparkles, and gentle pointer parallax. **Meteors** flash across the canvas every few seconds: warm-headed streaks with pale tails. Cards sit on top like printed plates of an atlas.
- **Click sparks**: every press anywhere on the page lays a small four-point star at the cursor that lifts, spins and fades out. Pure decoration, capped so it can never spam.
- **Section constellations**: each section kicker ("01 · Work", "02 · Record", "03 · Capabilities", "04 · Contact") carries its own linked star figure drawn in inline SVG, with one twinkling amber star.
- **Map rail constellation**: a fixed right-edge star chart (Work → Record → Matrix → Contact, desktop only). The stars sit in a gentle zigzag with connecting lines, **the line draws itself along the page as you scroll** and an amber comet tip rides the drawn edge; the star over the section you're reading ignites. Scroll-spied from JS, keyboard navigable.
- **Chart annotations**: star-chart accessories including sparkle accents scattered in the hero card, `field 01 · signals tracked · 24h roll` in the hero, and `end of map · signal held` closing the footer.
- **Star CTAs**: the hero calls-to-action are genuine four-point stars (filled amber, plus an outlined ghost), spinning slowly and glowing on hover, magnetic under the cursor, with the label sitting beneath the star like a catalogued entry.
- **Favicon** is the four-point star.

## Blog (`blog.html`)

A second page in the same star-map system: "Notes from the field" (write-ups, build logs and postmortems). Ships with an honest empty state (terminal well, `waiting on the write-up`) plus an **HTML comment template** at the top of the post list: copy the `<li class="post">` skeleton, fill in link/date/title/teaser, delete the ghost row. The rail here is its own three-star constellation (notes → orbit → map), and the page reuses the same `styles.css` / `main.js`, so there are no extra assets.

## Interactive layer

- **Node-network canvas** in the hero: drifting connective nodes that scatter around the cursor, with a yellow crosshair readout; hot nodes tint their links amber.
- **Terminal product strip**: window dots, `triage-engine --demo`, risk score 87/100 with scan-sweep, a live status line that cycles with a scramble effect, and a blinking block caret.
- **Tilt + torch cards**: work/contact cards lean in 3D toward the pointer and carry a soft light-follow highlight; HUD corner brackets ignite yellow on hover.
- **Live sparkline**: "risk-osc // synthetic 24h feed" canvas inside the lead card, streaming a new point every 1.5s with a pulsing leading dot.
- **Count-up stats + progress bars** in the overlapping About panel; the drawer auto-opens on first scroll and toggles via the Show/Hide pill.
- **Skills ticker**: a pausable marquee of capabilities; a yellow **scroll-progress** readout; a scramble-glitch hover on the word "break"; live **uptime chip** and GMT+1 clock.
- All motion respects `prefers-reduced-motion` (canvases render one static frame, marquee stops, counts settle instantly, meteors and click sparks switch off); keyboard support throughout: skip link, fixed home bar, map rail, yellow focus rings, `aria-expanded` on the panel, semantic landmarks.

## Self-hosted fonts

Poppins (five latin static instances) and JetBrains Mono (latin variable, 400 to 700) ship inside `assets/fonts/` and load via `@font-face` at the top of `styles.css`. No Google Fonts CDN request: the page is fully offline-capable and immune to third-party console errors.

## Files

```text
index.html                          Main page: content and structure
blog.html                           Blog: field notes (posts added by editing this file)
assets/styles.css                   All styling, tokens, @font-face, responsive layout (1200 / 1140 / 900 / 640 breakpoints)
assets/main.js                      Starfield + meteors, click sparks, hero network, sparkline, tilt/torch, magnets, status cycler, counts, panel, constellation rail, copy, clock
assets/favicon.svg                  Four-point star favicon on a chrome-black square
assets/fonts/                       Self-hosted Poppins + JetBrains Mono woff2 (latin)
assets/Ekundayo-Oyinkansola-Resume-2026.docx   Downloadable résumé
light-design/                       Archived previous light minimal version (self-contained: has its own assets/)
previous-design/                    Archived earlier dark editorial version
```

## Archival note

`light-design/` and `previous-design/` are standalone snapshots: each folder contains its own `index.html`, `styles.css` and `main.js`, so they render straight from their folder or an internal file open. To restore either one, copy the folder's `assets/*` into the root `assets/` and its `index.html` to the root.

## Preview locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 4173
```

then visit `http://localhost:4173`. `blog.html` lives beside it.

## Deployment

The site is fully static. Drag the repository folder into Netlify, import it into Vercel, or publish it with GitHub Pages; no build command or output directory configuration is needed. `xayen.tech` can be pointed at any of these once registered.

## Content guardrails

The risk monitor in the hero is explicitly labelled as an illustrative synthetic scenario. The Triage Engine backtest is described as in-sample, public-news-only, n=3: keep that caveat visible if the section is edited.
