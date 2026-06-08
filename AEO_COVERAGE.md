# AEO Coverage — Branch `AEO`

This branch covers the five Answer Engine Optimization (AEO) goals.
Last updated: 2026-06-08.

Live preview (staging): https://chirayum-safeops.github.io/safeopsweb-stag/

---

## Goal 1 — Homepage Positioning ✅

Make the category, what we do, and what we belong to immediately clear to
users and AI systems. Keywords reinforced sitewide:
continuous penetration testing, automated pentesting, offensive security
automation, autonomous security testing, red teaming automation.

| Item | Where |
|---|---|
| Hero category eyebrow | `src/components/HeroSection.tsx` |
| Hero subhead leads with "SafeOps is an automated continuous penetration testing platform" | `src/components/HeroSection.tsx` |
| Page `<title>`, meta description, keywords | `index.html` |
| OG / Twitter tags | `index.html` |
| "Why SafeOps" subhead | `src/components/WhySafeOpsSection.tsx` |
| Services heading + subhead | `src/components/ServicesSection.tsx` |
| Platform dropdown label | `src/components/Navbar.tsx` |

---

## Goal 2 — Prompt-Oriented Landing Pages ⚠️ 3 of 5

Pages built around questions/prompts people search for. Lives under `/learn`.

| Slug | Status | Path |
|---|---|---|
| `/learn` (index) | ✅ live | `src/pages/Learn.tsx` |
| `/learn/how-automated-pentesting-works` | ✅ live | `src/data/learn-pages.ts` |
| `/learn/alternatives-to-annual-penetration-tests` | ✅ live | `src/data/learn-pages.ts` |
| `/learn/pentesting-automation-for-startups` | ✅ live | `src/data/learn-pages.ts` |
| `/learn/continuous-penetration-testing-for-soc2` | ⏸ pending content | Awaiting marketing draft |
| `/learn/best-continuous-pentesting-platforms` | ⏸ pending content | Awaiting marketing draft |

Page template: `src/pages/LearnPage.tsx`. Each page has body content, FAQ block,
and Article + FAQPage + BreadcrumbList JSON-LD.

---

## Goal 3 — Structured FAQ Sections ✅

Per Laura: keep homepage FAQ concise and high-level, add FAQs to topic pages,
expand into future solution pages.

| Page | FAQ count | File |
|---|---|---|
| Homepage `/` | 9 (original product Qs, unchanged) | `src/components/FAQSection.tsx` |
| `/how-it-works` | 7 (Laura's 4 + 3 topic supports) | `src/pages/HowItWorks.tsx` |
| `/learn/how-automated-pentesting-works` | 6 | `src/data/learn-pages.ts` |
| `/learn/alternatives-to-annual-penetration-tests` | 5 | `src/data/learn-pages.ts` |
| `/learn/pentesting-automation-for-startups` | 5 | `src/data/learn-pages.ts` |

**Total: 32 structured FAQ entries**, all wrapped in FAQPage JSON-LD schema for
answer engine extraction.

Laura's 4 suggested Platform / How It Works FAQs (all live on `/how-it-works`):
- How does SafeOps work?
- How are vulnerabilities prioritized?
- How does SafeOps integrate into engineering workflows?
- What makes SafeOps different from vulnerability scanners?

Future solution pages (Continuous Pentesting, Automated Pentesting,
API/Cloud Security, SOC 2) will carry their own topical FAQs when built.

---

## Goal 4 — Technical Authority Signals ⚠️ Partial

| Item | Status | Where |
|---|---|---|
| Architecture / workflow explanation | ✅ live | `/how-it-works` (`src/pages/HowItWorks.tsx`) |
| Five-phase workflow with HowTo schema | ✅ live | `src/pages/HowItWorks.tsx` |
| Integrations grid (CI/CD, ticketing, cloud, SIEM, etc.) | ✅ live | `src/pages/HowItWorks.tsx` |
| Continuous vs trigger-based breakdown | ✅ live | `src/pages/HowItWorks.tsx` |
| Public docs `/docs` page | ❌ not built | Future |
| Public GitHub presence (org repos) | ❌ outside website | Leadership / product decision |
| Technical blog category | ⚠️ existing `/blog` is CISO/business-leaning | Future |
| `/research` page (anonymized findings) | ❌ not built | Future — needs real material |

---

## Goal 5 — Schema + Semantic Structure ✅

All schema types listed in the brief are implemented and verifiable in page
source.

| Schema type | Where it lives | File |
|---|---|---|
| Organization | Homepage `@graph` + `/about` standalone | `index.html`, `src/pages/About.tsx` |
| WebSite | Homepage `@graph` | `index.html` |
| SoftwareApplication (Product) | Homepage `@graph` | `index.html` |
| Service (with OfferCatalog) | Homepage `@graph` | `index.html` |
| Article | Every `/blog/*` and `/learn/*` page | `src/pages/BlogPost.tsx`, `src/pages/LearnPage.tsx` |
| FAQPage | `/how-it-works` + 3 `/learn/*` pages | `src/pages/HowItWorks.tsx`, `src/pages/LearnPage.tsx` |
| BreadcrumbList | All `/blog/*`, `/learn/*`, `/how-it-works`, `/about` | All page components |
| HowTo | `/how-it-works` | `src/pages/HowItWorks.tsx` |

**Semantic structure (also Goal 5):**

- ✅ One H1 per page (404 fallback H1s are mutually exclusive with article H1s)
- ✅ Proper H2 / H3 hierarchy across new pages
- ✅ Semantic tags: `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`
- ✅ Canonical URLs on every page including homepage and `/learn` index
- ✅ Per-page dynamic meta tags (title, description, OG, Twitter, canonical)
- ✅ `Sitemap: https://safeops.io/sitemap.xml` in `public/robots.txt`
- ✅ All new pages added to `public/sitemap.xml`

How to verify any schema: open the URL, view source, search for
`"@type": "..."`. Each block is page-specific.

---

## How to preview locally

```bash
npm install
npm run dev
# open http://localhost:8080
```

## How to deploy

The branch auto-deploys to GitHub Pages on push via
`.github/workflows/gh-pages.yml`. The staging URL above updates within ~2
minutes of every push to this branch.

For production (S3 / CloudFront), run:

```bash
npm run build
# upload dist/* to S3, invalidate CloudFront /*
```

The `vite.config.ts` reads `VITE_BASE_PATH` so production builds (without the
env var) serve from `/`, and GitHub Pages builds serve from `/safeopsweb-stag/`.
