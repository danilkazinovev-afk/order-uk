@AGENTS.md
## Supabase Integration
Tables:
- orders: id, created_at, client_name, total_boxes, total_packs, total_pallets, total_weight_kg, total_value_eur
- order_items: id, order_id (FK → orders), article, sku, barcode, quantity_boxes, packs, pallets, weight_kg, value_eur

API route: app/api/submit-order/route.ts
Env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

## Stack
Next.js App Router, TypeScript, Tailwind, deployed on Vercel