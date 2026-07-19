# Header Section — Verifyo Landing Page

Scope: **Header/Navbar only**, per instructions. No other section is included.

## Folder location

```
verifyo-header/
├── app/
│   ├── layout.js        # Root layout: fonts, SEO metadata, skip link, mounts <Header/>
│   ├── page.js           # Placeholder anchors only, to preview scroll-spy — not a deliverable
│   └── globals.css       # Tailwind directives + reduced-motion safety net
├── components/
│   └── layout/
│       ├── Header.jsx     # Main header component
│       └── MobileMenu.jsx # Mobile nav panel (focus-trapped)
├── hooks/
│   ├── useScrollSpy.js       # IntersectionObserver-based active-link tracking
│   └── useReducedMotion.js   # matchMedia-based prefers-reduced-motion tracking
├── lib/
│   └── gsap.js            # SSR-safe GSAP + ScrollTrigger registration
├── public/
│   └── logo.png
├── tailwind.config.js     # Palette taken verbatim from the spec PDF
├── postcss.config.js
├── next.config.mjs
├── jsconfig.json          # Enables the "@/" import alias
└── package.json
```

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The page renders six full-height placeholder
sections (`#home`, `#solution`, `#process`, `#industries`, `#platform`,
`#contact`) purely so you can scroll and see the Header's sticky
positioning, scroll-triggered shadow, and scroll-spy active-state working
end to end. Delete `app/page.js`'s placeholder content once real sections
exist with matching ids.

## Why this isn't pixel-perfect yet

I do not have access to Figma Dev Mode — the file's `robots.txt` blocks
automated/tool access, so I could not inspect exact px values for padding,
gaps, border-radius, or breakpoints. Everything spacing-related in
`Header.jsx` is a **visual approximation** derived from the provided
`reference_video.mp4` walkthrough, clearly marked with an assumption log
comment at the top of the component. Please treat these as provisional and
correct them against Dev Mode (or send me the values directly) before
calling this pixel-final.

## Assumptions made (see also the in-file comment block)

1. **Pill sizing/spacing** (height, padding, gap, radius) — approximated from video, not measured.
2. **Desktop link gaps** (32px / 40px at `lg`) — approximated.
3. **Scroll shadow threshold** (80px) — reasonable default, not a measured trigger point.
4. **Mobile breakpoint** — using Tailwind's default `md` (768px); no mobile Figma frame was provided to confirm the real breakpoint.
5. **Brand name** — the reference design uses literal "Lorem" placeholder copy everywhere (headline, footer domain, etc.). Used here only for the logo's `alt` text and page `<title>`/metadata. Swap once you confirm the real name.
6. **"Sign In" vs "Book a Demo"** — confirmed from the video these are two distinct CTAs: navbar always shows "Sign In"; "Book a Demo" belongs to the Hero section (not built here).

## Accessibility implemented

- Semantic `<header>` + `<nav aria-label="Primary">` landmarks
- Skip-to-content link (in `layout.js`, first focusable element on the page)
- Active nav link marked with `aria-current="page"` (not color alone)
- Mobile toggle: `aria-expanded`, `aria-controls`, dynamic `aria-label`
- Mobile menu: `role="dialog"`, `aria-modal`, focus moves in on open, Tab/Shift+Tab trapped, Escape closes, focus-visible rings on every interactive element
- Body scroll locked while the mobile menu is open
- Decorative icons (`ArrowIcon`, `MenuIcon`) are `aria-hidden`
- All animation branches check `prefers-reduced-motion` (GSAP duration drops to 0; Motion transition duration drops to 0 for the backdrop) — plus a global CSS fallback in `globals.css`

## SEO considerations implemented

- `<html lang="en">`
- Descriptive `<title>` and `<meta name="description">` via Next.js `metadata` export in `layout.js`
- Basic Open Graph tags (title/description/type) for link-preview quality
- Logo uses `next/image` with real `width`/`height` to avoid layout shift and get automatic format/size optimization
- Navigation implemented as real crawlable `<a href="#...">` links, not JS-only click handlers, so section anchors are indexable
- `font-display: swap` on both Google Fonts (via `next/font`) to avoid invisible-text-on-load penalties

## Open items I need from you

- Real Figma Dev Mode values for pill height/padding/radius, link gaps, and the mobile breakpoint
- Confirmation of the real brand name (currently using the source's literal "Lorem" placeholder)
- Confirmation of where each nav link should scroll/link to once real sections exist (currently `#home`, `#solution`, etc. — matches the 6 links seen in the video, but exact anchor names are my inference)
