# BIOHACKING. EVOLVED.

Production repository for **BiohackingEvolved.com**.

This package converts the approved V20 prototype into a maintainable Cloudflare Workers Static Assets project while preserving the current site and hash-based routes.

## Current status

- V20 is the visual/editorial baseline.
- The project is intentionally **staging-safe**: `noindex,nofollow` remains in the HTML and `robots.txt` blocks crawlers.
- Do **not** remove those protections until the custom domain is connected and final launch QA is complete.

## Local setup

```bash
npm install
npm run check
npm run dev
```

Wrangler will print a local preview URL.

## Deploy to Cloudflare

```bash
npx wrangler login
npm run deploy
```

Cloudflare will create/update the `biohacking-evolved` Worker and return a temporary `*.workers.dev` URL. Test that URL before connecting **BiohackingEvolved.com**.

## Repository structure

- `dist/index.html` — site shell and content markup
- `dist/assets/styles.css` — all V20 styles, preserved in original order
- `dist/assets/app.js` — all V20 JavaScript, preserved in original order
- `dist/robots.txt` — staging crawler block
- `wrangler.jsonc` — Cloudflare Workers Static Assets configuration
- `scripts/check.js` — lightweight pre-deploy validation

## Before public launch

1. Complete final route/content/mobile QA on the `workers.dev` staging URL.
2. Connect `BiohackingEvolved.com` in Cloudflare.
3. Add the production canonical URL and social sharing image.
4. Change `<meta name="robots">` from `noindex,nofollow` to `index,follow`.
5. Replace `dist/robots.txt` with an allow policy and add a sitemap.
6. Re-run `npm run check` and deploy.

## Editorial safety

Health-related material remains educational and must clearly distinguish human clinical evidence, preclinical/mechanistic evidence, regulatory status, and community signal. Do not add dosing or sourcing recommendations to publication content.
