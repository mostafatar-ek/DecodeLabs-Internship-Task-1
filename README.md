# DecodeLabs — Internship Task 1: Responsive Frontend Interface

A fully responsive, accessible landing page built with **vanilla HTML5, CSS3, and JavaScript** — no frameworks. Submitted as Task 1 of the DecodeLabs Full Stack Development Internship Program (Batch 2026).

## Live Preview

Open `index.html` directly in any browser — no build step required.

## Features

- **Responsive layout** — mobile-first design using CSS Grid and Flexbox
- **Fluid typography** — `clamp()`-based type scale that scales with the viewport
- **Project card filter** — JS-powered category filtering with staggered reveal animation
- **Scroll spy** — active nav link updates as you scroll through sections
- **Scroll-reveal animations** — `IntersectionObserver`-based entrance animations (respects `prefers-reduced-motion`)
- **Accessible navigation** — hamburger menu with full keyboard support (Escape to close, `aria-expanded`, focus trap)
- **Smooth anchor scroll** — offset-aware smooth scrolling with focus management for accessibility
- **Sticky header** — dynamic shadow on scroll

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Markup     | HTML5 (semantic landmarks, ARIA)  |
| Styling    | CSS3 (Grid, Flexbox, custom props) |
| Logic      | Vanilla JavaScript (ES6+, IIFE)   |
| Fonts      | Google Fonts — Montserrat + Roboto |

## Project Structure

```
├── index.html       # Main HTML (semantic structure, ARIA labels)
├── css/
│   └── style.css    # Design tokens, layout, components, responsive breakpoints
└── js/
    └── main.js      # Interactivity — nav, filter, scroll spy, animations
```

## Design System

- **Palette:** 2025 warm palette — Mocha (`#A5856E`), Dusty Blue (`#A0D4E0`), Warm Grey (`#F2F0EA`)
- **Fonts:** Montserrat (headings) / Roboto (body)
- **Standards:** WCAG 2.1 accessibility compliance, semantic HTML for SEO and screen readers

## Sections

1. **Hero** — headline, CTA buttons, program stats, CSS device mockup
2. **Features** — HTML5, CSS3, JavaScript skill cards
3. **Roadmap** — 6-phase execution process (Discovery → Audit)
4. **Project Milestones** — filterable grid of 6 internship projects
5. **Vision** — mobile-first philosophy + project standards
6. **Footer** — contact info and navigation

---

*Built as part of the DecodeLabs Internship Program — no frameworks, just the fundamentals.*
