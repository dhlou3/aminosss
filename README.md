# Portfolio — Static Site

A zero-build, dependency-free portfolio site: two pages, one shared design
system, deploy-ready for Vercel or Netlify with no configuration.

## Structure

```
portfolio/
├── index.html            Homepage — hero, profile, core competencies, stats
├── projects.html         Production Projects Matrix — 3 project deep-dives
├── assets/
│   ├── css/style.css     Full design system (variables, type, components, motion)
│   ├── js/main.js        Nav state, mobile menu, scroll reveals, magnetic
│   │                     hovers, card tilt, count-up stats
│   └── img/              Drop your profile photo and any real screenshots here
├── vercel.json           Vercel config (static, cache headers)
├── netlify.toml          Netlify config (static, cache headers)
├── package.json          Optional local dev server (`npm run dev`)
└── README.md
```

No framework, no bundler, no `node_modules` required to run. Fonts (Space
Grotesk / Inter / JetBrains Mono) load from Google Fonts via CDN.

## Design system

- **Palette** — deep charcoal (`#0b0a0c`) base, warm off-white ink, a single
  muted bronze accent (`#c9a468`). No neon blue/purple, no default AI-template
  gradients.
- **Type** — Space Grotesk for display headlines, Inter for body/UI,
  JetBrains Mono for eyebrows/labels/index numbers.
- **Texture** — fixed film-grain overlay, faint background grid, radial glow
  behind the hero.
- **Motion** — staggered line-by-line hero reveal, `IntersectionObserver`
  scroll reveals, magnetic buttons, cursor-tilt on project architecture
  panels, count-up stats. All motion respects `prefers-reduced-motion`.

## Before you deploy — personalization checklist

This is fully built, real, working code — but it can't know your personal
details. Search each file for these and replace them:

- [ ] **Name / contact** — `your@email.com`, `github.com/yourhandle`,
      `linkedin.com/in/yourhandle` appear in the nav CTA, footer, and
      projects CTA on both pages.
- [ ] **Profile photo** — `index.html` has a styled placeholder frame under
      `#profile`. Replace the `.frame-placeholder` block with:
      `<img src="assets/img/profile.jpg" alt="Your Name" />` after dropping
      your photo (4:5 ratio, ≥1200px wide) into `assets/img/`.
  photo import instructions:
  1. Add your image to `assets/img/profile.jpg`
  2. In `index.html`, replace the entire `<div class="frame-placeholder">…</div>`
     block with `<img src="assets/img/profile.jpg" alt="Your name" style="width:100%;height:100%;object-fit:cover;" />`
- [ ] **Project specifics** — `projects.html` ships with three representative
      production projects (Flutter mobile app, Android/Chaquopy app, Windows
      Tkinter tool) matching your stated stack. Swap in your real project
      names, descriptions, line counts, and metrics.
- [ ] **Page `<title>` / meta description** — update in both `<head>` blocks
      once you finalize your name and positioning.
- [ ] **Favicon** — add a `favicon.ico` or `favicon.svg` to the project root
      and link it in both `<head>` blocks if desired.

## Local preview

No build step is required — you can open `index.html` directly in a browser.
For a local server with correct relative paths:

```bash
npm run dev
```

This runs `serve .` on `http://localhost:5173`.

## Deployment

### Vercel
1. Push this folder to a GitHub repository.
2. Import the repo in Vercel → Framework Preset: **Other** (static).
3. Vercel reads `vercel.json` automatically. No build command needed —
   leave Build Command and Output Directory blank (root).
4. Deploy.

**Or via CLI:**
```bash
npx vercel --prod
```

### Netlify
1. Push this folder to a GitHub repository.
2. New site from Git → Netlify reads `netlify.toml` automatically
   (publish directory `.`, no build command).
3. Deploy.

**Or via CLI:**
```bash
npx netlify deploy --prod
```

### Any static host
This is a plain static site — the `portfolio/` folder can be uploaded as-is
to GitHub Pages, Cloudflare Pages, S3 + CloudFront, or any static file host.

## Adding pages

To add a new page, copy `projects.html`, keep the shared `<nav>`,
`<div class="mobile-menu">`, and `<footer>` blocks so navigation and styling
stay consistent, then swap the `<main>` content.
