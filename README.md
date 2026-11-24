# Batwa House — Cloudflare

Independent guest-checkout ecommerce store with admin, D1 database and photo uploads (JPG/PNG/WebP, 1 MB per image). Customer authentication and automated messages are not configured. No Sites identity headers are trusted. Existing Sites data and photos are not automatically migrated.

## Cloudflare setup
1. Create a D1 database named `batwa-house` (Storage & databases > D1). Copy its database ID.
2. On the connected Worker build settings: build command `npm run build`, deploy command `npm run deploy`, root `/`. Use Node 22 or newer.
3. Add build variable `CLOUDFLARE_DATABASE_ID` with the D1 ID. The deployment script injects it and applies schema migrations before deploying. Cloudflare build credentials need D1 edit and Workers deployment permissions.
4. Add Worker runtime secret `ADMIN_KEY` using a strong private value. Without it, the admin rejects all access. Never commit the key.
5. Deploy. Visit the returned workers.dev address. Test checkout, admin access, photos, stock and cancellation before switching traffic.

For local QA: `npm ci`, `npm run build`, `npx wrangler d1 migrations apply DB --local`, `npm run preview`.

D1 storage has free-tier quotas. Database image storage suits a small catalogue; resize/compress images before uploading. No paid services are enabled by this repository.

## Verification completed
Standalone production build, TypeScript, and local D1 migrations passed. Local API smoke checks passed: guest order total, retry idempotency, stock deduction, cancellation restoration exactly once, admin authorization, private guest order history, and rejection of forged Sites identity headers. Live Cloudflare deployment and photo uploads still require verification in the target account.
