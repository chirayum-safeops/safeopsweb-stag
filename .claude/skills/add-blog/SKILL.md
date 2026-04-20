---
name: add-blog
description: Add a new blog post to the SafeOps website, update the sitemap, and produce a production build in dist/ ready for manual S3 upload and CloudFront invalidation. Use when the user provides blog content from the marketing team (title, body, cover image) and wants a ready-to-deploy build.
---

# Add a new blog post to safeops.io

This skill encodes the exact steps to publish a new blog post. The user's workflow is:

1. Marketing team hands them a blog draft + cover image
2. You run this skill to make the code changes + build
3. User manually uploads `dist/` contents to S3 + invalidates CloudFront (`/*`)

## Inputs you need from the user

Before editing, confirm these with the user (ask only what's missing):

- **Blog body** (markdown or prose) — paste of the article
- **Title** — headline
- **Excerpt** — 1-2 sentence summary for the blog index (≤160 chars)
- **Tags** — 2-4 short tags (e.g. `DevSecOps`, `Cloud Security`, `AI Security`)
- **Author** — default: `SafeOps Team`
- **Publish date** — ISO format `YYYY-MM-DD` (default: today)
- **Read time** — estimate like `6 min read` (roughly 1 min per 250 words)
- **Cover image** — user must save a JPG to `src/assets/blog/<slug>.jpg` before you can build. Check the file exists before proceeding; do not guess or fabricate an image.
- **Slug** — propose a kebab-case slug from the title; get user confirmation

## Files to edit

### 1. `src/data/blog-posts.ts` (primary)

- Add `import <camelCaseName> from "@/assets/blog/<slug>.jpg";` at the top with the other imports
- Prepend a new `BlogPost` object to the `blogPosts` array (newest first — first item in the array displays at the top of /blog)
- Fields required: `slug`, `title`, `excerpt`, `date`, `author`, `readTime`, `tags` (string[]), `coverImage` (the imported var), `content` (template literal with markdown)

**CRITICAL template literal rules:**
- The `content` field is a JS template literal delimited by plain backticks `` ` ``
- Do NOT escape the closing backtick — it must be a plain `` ` ``, not `` \` ``. Escaping breaks the build with `Expected "}" but found ...`.
- Inside `content`, escape any literal backticks used for code blocks as `` \` `` (see the existing posts for examples)
- Keep markdown formatting: `##` for sections, `###` for subsections (auto-generates the table of contents when there are more than 2 headings), `**bold**`, `-` lists, `>` for blockquotes
- Convert LinkedIn/external article artifacts (e.g. "Article content" inline image placeholders, author bio lines) — ask the user whether to drop, replace, or keep each artifact

**Inline images inside the blog body:**
- Add a separate `import inlineName from "@/assets/blog/<filename>.jpg";` at the top
- Inside the template literal, use markdown image syntax with template-literal interpolation: `![descriptive alt text](${inlineName})`
- Template literal `${...}` interpolation resolves the Vite-bundled asset URL
- Inline images get styled via the `.blog-prose img` rule in `src/index.css` (rounded, full-width, border, margin). If that rule is missing, add it.
- Cover image vs inline image: `coverImage` field is the hero (top of post + blog index thumbnail); inline images live inside `content`

### 2. `public/sitemap.xml` (primary — this is the one served in prod)

- Add a new `<url>` block for the post
- Update the `<lastmod>` on the `https://safeops.io/` and `https://safeops.io/blog` entries to the post date
- Use `changefreq: monthly`, `priority: 0.6` for post entries

**Do NOT edit the root `sitemap.xml`** — it's a stale duplicate that doesn't get bundled. Optionally mention to user it can be deleted.

### 3. No routing changes needed

React Router already handles `/blog/:slug` via [src/App.tsx:20](src/App.tsx#L20) and [src/pages/BlogPost.tsx](src/pages/BlogPost.tsx). The BlogPost component reads from `getBlogPost(slug)` in [src/data/blog-posts.ts](src/data/blog-posts.ts).

## Build

Run the build from the project root:

```bash
npm run build
```

Note: `bun` isn't on PATH in the default shell despite `bun.lock` existing — use `npm`. Both work because `package.json` defines standard npm scripts.

Expected output:
- `dist/` populated with `index.html`, `favicon.*`, `robots.txt`, `sitemap.xml` (copied from `public/`), and `assets/` containing hashed JS/CSS/image bundles
- Build completes with warnings about `duration-[Xms]` tailwind classes and `500 kB` chunk size — both are pre-existing and safe to ignore
- The new cover image will appear in the build log as `assets/<slug>-<hash>.jpg`

If the build fails with a template literal error on `blog-posts.ts`, the most likely cause is an escaped closing backtick `` \` `` — fix to a plain `` ` ``.

## After the build

Report to the user:
1. Build succeeded, `dist/` is ready
2. The new post URL path: `https://safeops.io/blog/<slug>`
3. Reminder of the deploy steps: upload `dist/*` to S3 bucket, then CloudFront invalidation `/*`

Do NOT attempt the S3 upload or CloudFront invalidation yourself — the user does this manually.

## Slug conventions

- Kebab-case, all lowercase
- Strip stop words where it helps readability
- Aim for 40-70 chars
- Examples from existing posts:
  - `why-continuous-penetration-testing-matters`
  - `cloud-security-misconfigurations`
  - `devsecops-2026-shift-left-to-autonomous-security`

## Quick checklist

- [ ] User confirmed slug
- [ ] Cover image saved at `src/assets/blog/<slug>.jpg` (verify with Bash/ls)
- [ ] Import added to `src/data/blog-posts.ts`
- [ ] New `BlogPost` object prepended to `blogPosts` array
- [ ] Closing ` ` ` on `content` field is plain (not escaped)
- [ ] `public/sitemap.xml` updated (new `<url>` + bumped `<lastmod>` on `/` and `/blog`)
- [ ] `npm run build` succeeds
- [ ] `dist/sitemap.xml` contains the new entry (verify with head)
- [ ] Reported dist-ready state + deploy reminder to user
