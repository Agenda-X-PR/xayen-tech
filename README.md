# Ekundayo Oyinkansola · Portfolio

The live site is a multi-page React portfolio for Ekundayo Oyinkansola (xayen): cybersecurity analyst, full-stack developer and SDK author. It lives in `site/`, builds with Vite, and deploys to GitHub Pages through `.github/workflows/deploy-site.yml`.

## The current build: retro Mac OS

A paper-world take on System 7: ink chrome instead of black chrome.

- **Desktop metaphor**: a menubar with a dithered logo button (opens a real Radix menu), mono navigation links, and a live **GMT+1 clock** that ticks in the menubar and the footer.
- **Pages**: `/` (hello + work + field notes), `/projects`, `/blog`, `/about`, `/contact`; unknown paths redirect home. Every route is its own lazy chunk, so the entry bundle only carries the shell.
- **Fonts**: self-hosted only. **Departure Mono** (vendored woff2, OFL license included) for chrome, labels and headings; **DM Sans Variable** via fontsource for body copy. No CDN requests.
- **Buttons**: no stars anymore. `PressButton` / `PressLink` are System 7 style chunks that physically press `4px` into the page on click (spring driven via Motion), plus `WindowTileLink` tiles for quick links.
- **Windows everywhere**: content sits in retro windows with title bars, window dots, filename chips and hard offset shadows (`--shadow-brutal` family).
- **Matrix rain**: the hero terminal (`triage-engine --demo`) runs a phosphor-green glyph rain on a CRT panel with scanlines. It pauses when the tab hides, and renders a single static frame under `prefers-reduced-motion`.
- **Text morph**: the hero sentence cycles **break → debug → harden → ship** letter by letter with a spring stagger (hand-built with `AnimatePresence`; screen readers get a static `sr-only` copy, and reduced motion drops the theatrics).
- **Motion**: routes swap behind a "swapping disk…" loading window; dialogs and menubars open with `mac-in` / `mac-out` keyframes.
- **shadcn-style primitives**: `menubar`, `dialog`, `tooltip` and `separator` are hand-authored components in `site/src/components/ui/` on Radix APIs, reskinned to the paper/ink tokens.

## Theme tokens

Defined as Tailwind v4 `@theme` variables in `site/src/index.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--color-paper` | `#f2f0ea` | page ground |
| `--color-paper-dim` | `#dcdad2` | bars, chrome |
| `--color-ink` | `#101010` | text and borders |
| `--color-matrix` | `#0e7a2f` | accent green |
| `--color-phosphor` | `#3ddc70` | CRT text |
| `--color-crt` | `#0a120c` | terminal ground |

Utilities: `titlebar`, `win-dot`, `titlebar-name`, `halftone`, `halftone-dense`, `crtpanel`, `scanlines`, `reverse-video`, `dither-strip`, `caret-blink`.

## Blog

Posts are data, not markup: add an object to `site/src/content/posts.ts` (slug, file, date, title, teaser, href) and the page renders it newest first, with ghost "reserved slot" windows walking down the pile automatically.

## Files

```text
site/                                The deployed app (Vite + React 19 + Tailwind v4)
site/src/pages/                      home, projects, blog, about, contact
site/src/components/                 desktop-bar, window, matrix-rain, morph-word, press-button, site-bits
site/src/components/ui/              hand-written menubar, dialog, tooltip, separator
site/src/content/posts.ts            Add blog posts here
site/src/fonts/departure/            Vendored Departure Mono (woff2 + OFL LICENSE)
site/scripts/make-404.mjs            Injects the GitHub Pages SPA fallback into dist/404.html
index.html                           Archived: the older chrome-black star-map static site
light-design/, previous-design/      Archived earlier designs
```

## Develop locally

```bash
cd site
pnpm install
pnpm dev        # dev server
pnpm build      # type-checks (tsc -b), builds to site/dist, stamps 404.html
pnpm preview    # serves the build
```

## Deployment

GitHub Pages runs the `Deploy site to GitHub Pages` workflow on every push that touches `site/**`. It installs with pnpm, builds, and deploys the `site/dist` artifact as the Pages artifact (`build_type: workflow` in the repo Pages configuration). A `CNAME` file rides inside `dist/`, so the `xayen.tech` binding survives every deploy. Deep links are served by the artifact's `404.html`, which bounces unknown paths back through a query-string redirect into the router.

After the `xayen.tech` domain is registered, point its DNS at the Pages endpoints (or the A/AAAA/CNAME records GitHub lists in repository settings), then enforce HTTPS in the Pages configuration.

## Content guardrails

The risk monitor in the hero terminal is explicitly labelled `LIVE · illustrative synthetic scenario`. The Triage Engine backtest is described as in-sample, public-news-only, n = 3: keep that caveat visible wherever the project is mentioned.
