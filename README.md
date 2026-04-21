# SafeOps Website

Marketing website for SafeOps (https://safeops.io) — built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui.

## Development

```sh
npm install
npm run dev
```

Dev server runs on port 8080.

## Production build

```sh
npm run build
```

Outputs static files to `dist/`. Deploy by uploading `dist/` to S3 and invalidating the CloudFront distribution.

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint
- `npm run preview` — preview the production build locally

## Tech stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- React Router
