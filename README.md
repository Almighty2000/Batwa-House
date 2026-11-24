# Batwa House

Reviewed ecommerce storefront and admin source.

Cloudflare migration is not configured yet. Before deploying: configure an independent Worker build, bind D1 as DB and R2 as BUCKET, apply drizzle migrations, set ADMIN_KEY as a secret, and replace Sites-owned ChatGPT authentication. Never trust Sites identity headers on an independent host. Guest checkout remains required. Existing store data and media require separate migration. Email and WhatsApp sending are not configured. No credentials or customer data are included.
