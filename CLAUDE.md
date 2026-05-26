@AGENTS.md


Good — I've fully reviewed the codebase. Now I have everything I need to design the architecture properly. Here is
   the complete design.

  ---
  Backend Architecture — Dwarka Orthodontics

  ---
  1. Database Schema

  categories

  CREATE TABLE categories (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text NOT NULL,
    slug        text UNIQUE NOT NULL,
    description text,
    image_url   text,
    abbr        text,           -- "BR", "WR", etc.
    gradient    text,           -- Tailwind class, editable from admin
    icon_color  text,
    sort_order  int DEFAULT 0,
    is_active   boolean DEFAULT true,
    created_at  timestamptz DEFAULT now(),
    updated_at  timestamptz DEFAULT now()
  );

  brands

  CREATE TABLE brands (
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name       text NOT NULL,
    slug       text UNIQUE NOT NULL,
    country    text,
    logo_url   text,
    is_active  boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
  );

  products

  CREATE TABLE products (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name            text NOT NULL,
    slug            text UNIQUE NOT NULL,
    sku             text UNIQUE NOT NULL,
    category_id     uuid REFERENCES categories(id),
    brand_id        uuid REFERENCES brands(id),

    -- Pricing (numeric, not string like "₹2,000/-")
    price           numeric(10,2) NOT NULL,

    -- Content
    description     text,
    clinical_notes  text,
    packaging       text,
    shipping_info   text,
    compatibility   text,
    short_specs     text,
    specs           jsonb,        -- { "slotSize": "0.022\"", "prescription": "MBT" }
    tags            text[],

    -- Feature flags
    is_featured     boolean DEFAULT false,
    is_trending     boolean DEFAULT false,
    is_new_arrival  boolean DEFAULT false,
    is_best_seller  boolean DEFAULT false,
    is_active       boolean DEFAULT true,

    -- UI metadata
    gradient        text,
    icon_color      text,
    sort_order      int DEFAULT 0,

    created_at      timestamptz DEFAULT now(),
    updated_at      timestamptz DEFAULT now()
  );

  product_images

  CREATE TABLE product_images (
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid REFERENCES products(id) ON DELETE CASCADE,
    url        text NOT NULL,
    alt_text   text,
    sort_order int DEFAULT 0,
    is_primary boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
  );

  inventory

  One row per product. Source of truth for current stock.
  CREATE TABLE inventory (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id          uuid UNIQUE REFERENCES products(id) ON DELETE CASCADE,
    quantity            int NOT NULL DEFAULT 0,
    reserved_qty        int DEFAULT 0,   -- locked by pending orders
    low_stock_threshold int DEFAULT 10,
    stock_status        text CHECK (stock_status IN ('in-stock','low-stock','out-of-stock'))
                        DEFAULT 'in-stock',
    updated_at          timestamptz DEFAULT now()
  );

  inventory_logs

  Immutable audit trail for every stock movement.
  CREATE TABLE inventory_logs (
    id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id       uuid REFERENCES products(id),
    change_type      text CHECK (change_type IN ('sale','restock','adjustment','return','damage'))
                     NOT NULL,
    quantity_change  int NOT NULL,     -- positive = incoming, negative = outgoing
    quantity_before  int NOT NULL,
    quantity_after   int NOT NULL,
    reference_id     uuid,             -- order_id or admin action id
    notes            text,
    created_by       uuid,             -- admin_users.id (null = system/customer action)
    created_at       timestamptz DEFAULT now()
  );

  customers

  Phone number is the primary identifier — no account required.
  CREATE TABLE customers (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name                text NOT NULL,
    phone               text NOT NULL,
    phone_normalized    text UNIQUE NOT NULL,  -- "+91XXXXXXXXXX" — used for dedup
    clinic_name         text,
    email               text,
    address_line        text,
    city                text,
    state               text,
    pincode             text,
    gst_number          text,
    customer_tier       text DEFAULT 'standard',  -- standard, bulk, college
    total_orders        int DEFAULT 0,
    total_spent         numeric(12,2) DEFAULT 0,
    created_at          timestamptz DEFAULT now(),
    updated_at          timestamptz DEFAULT now()
  );

  orders

  Denormalized snapshot of customer info for historical accuracy.
  CREATE TABLE orders (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number        text UNIQUE NOT NULL,  -- "DO-2026-001234"
    customer_id         uuid REFERENCES customers(id),

    -- Customer snapshot at order time (never changes even if customer updates profile)
    customer_name       text NOT NULL,
    customer_phone      text NOT NULL,
    clinic_name         text,
    delivery_address    text NOT NULL,
    delivery_city       text NOT NULL,
    delivery_state      text NOT NULL,
    delivery_pincode    text NOT NULL,
    customer_notes      text,

    -- Financials
    subtotal            numeric(10,2) NOT NULL,
    discount_amount     numeric(10,2) DEFAULT 0,
    coupon_code         text,
    shipping_amount     numeric(10,2) DEFAULT 0,
    total_amount        numeric(10,2) NOT NULL,

    -- Payment (simple for MVP)
    payment_status      text CHECK (payment_status IN ('pending','partial','paid','refunded'))
                        DEFAULT 'pending',
    paid_amount         numeric(10,2) DEFAULT 0,
    pending_amount      numeric(10,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
    payment_method      text,   -- 'upi', 'cash', 'bank_transfer'
    payment_notes       text,

    -- Order lifecycle
    order_status        text CHECK (order_status IN
                        ('new','confirmed','processing','shipped','delivered','cancelled'))
                        DEFAULT 'new',

    -- WhatsApp
    whatsapp_sent       boolean DEFAULT false,
    whatsapp_sent_at    timestamptz,

    admin_notes         text,
    created_at          timestamptz DEFAULT now(),
    updated_at          timestamptz DEFAULT now()
  );

  order_items

  CREATE TABLE order_items (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id      uuid REFERENCES orders(id) ON DELETE CASCADE,
    product_id    uuid REFERENCES products(id),

    -- Snapshot at order time (product name/sku can change, order record should not)
    product_name  text NOT NULL,
    product_sku   text NOT NULL,

    quantity      int NOT NULL,
    unit_price    numeric(10,2) NOT NULL,
    total_price   numeric(10,2) NOT NULL,   -- quantity * unit_price

    created_at    timestamptz DEFAULT now()
  );

  offers

  Replaces the hardcoded coupons.js file.
  CREATE TABLE offers (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code                text UNIQUE NOT NULL,
    type                text CHECK (type IN ('percent','fixed')) NOT NULL,
    value               numeric(10,2) NOT NULL,
    min_order_amount    numeric(10,2) DEFAULT 0,
    max_discount_amount numeric(10,2),   -- cap for percentage discounts
    label               text,
    is_active           boolean DEFAULT true,
    usage_limit         int,             -- null = unlimited
    usage_count         int DEFAULT 0,
    valid_from          timestamptz DEFAULT now(),
    valid_until         timestamptz,
    created_at          timestamptz DEFAULT now(),
    updated_at          timestamptz DEFAULT now()
  );

  admin_users

  Extends Supabase auth.users — created via trigger when admin is invited.
  CREATE TABLE admin_users (
    id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name          text NOT NULL,
    email         text NOT NULL,
    role          text CHECK (role IN ('super_admin','admin','staff')) DEFAULT 'staff',
    is_active     boolean DEFAULT true,
    last_login_at timestamptz,
    created_at    timestamptz DEFAULT now()
  );

  ---
  2. Table Relationships

  categories ──< products >── brands
                │
                ├──< product_images
                │
                └──< inventory ──< inventory_logs
                          │
  orders >── order_items >── products
     │
  customers

  Key rules:
  - products → categories and brands — optional FK (a product might have no brand in mock data yet)
  - order_items.product_id — nullable FK. The snapshot fields (product_name, product_sku) survive even if a product
  is deleted
  - inventory — 1:1 with products. Created atomically when a product is created (via DB trigger or server action)
  - customers — upserted by phone_normalized. Same doctor re-ordering is recognized automatically

  ---
  3. Backend Folder Structure

  src/
  ├── app/
  │   ├── (storefront)/           # Route group — public site
  │   │   ├── page.js
  │   │   ├── categories/[slug]/page.js
  │   │   ├── products/[slug]/page.js
  │   │   └── cart/
  │   │       ├── page.js
  │   │       └── actions.js      ← Server Action: createOrder()
  │   │
  │   ├── admin/                  # Admin dashboard
  │   │   ├── layout.js           ← Auth guard (redirects if not admin)
  │   │   ├── page.js             ← Dashboard / analytics
  │   │   ├── products/
  │   │   │   ├── page.js
  │   │   │   ├── new/page.js
  │   │   │   └── [id]/page.js
  │   │   ├── orders/
  │   │   │   ├── page.js
  │   │   │   └── [id]/page.js
  │   │   ├── inventory/page.js
  │   │   ├── offers/page.js
  │   │   └── login/page.js
  │   │
  │   └── api/
  │       └── admin/
  │           └── analytics/route.js   ← Route Handler (streaming/complex queries)
  │
  ├── lib/
  │   ├── supabase/
  │   │   ├── client.js           ← createBrowserClient (storefront)
  │   │   ├── server.js           ← createServerClient (Server Components, cookies)
  │   │   └── admin.js            ← createClient with SERVICE_ROLE_KEY (server-only)
  │   │
  │   ├── services/               ← Pure query functions, no HTTP
  │   │   ├── products.js
  │   │   ├── categories.js
  │   │   ├── brands.js
  │   │   ├── orders.js
  │   │   ├── inventory.js
  │   │   ├── offers.js
  │   │   ├── customers.js
  │   │   └── analytics.js
  │   │
  │   ├── utils/
  │   │   ├── whatsapp.js         ← buildOrderMessage(order, items)
  │   │   ├── orderNumber.js      ← generateOrderNumber() → "DO-2026-001234"
  │   │   └── formatPrice.js      ← formatINR(paise) → "₹2,000"
  │   │
  │   ├── cartStore.js            (existing)
  │   └── mockData.js             (existing — phase out after DB migration)
  │
  └── components/ (existing)

  ---
  4. API Architecture

  Server Actions vs Route Handlers

  ┌──────────────────────────┬────────────────────────────────┬────────────────────────────────────────────────┐
  │        Operation         │              Use               │                     Reason                     │
  ├──────────────────────────┼────────────────────────────────┼────────────────────────────────────────────────┤
  │ createOrder()            │ Server Action                  │ Form submit, needs auth context + DB write in  │
  │                          │                                │ one call                                       │
  ├──────────────────────────┼────────────────────────────────┼────────────────────────────────────────────────┤
  │ Admin product CRUD       │ Server Actions                 │ Co-located with admin pages, no extra HTTP     │
  │                          │                                │ layer                                          │
  ├──────────────────────────┼────────────────────────────────┼────────────────────────────────────────────────┤
  │ Admin order updates      │ Server Actions                 │ Simple form submissions                        │
  ├──────────────────────────┼────────────────────────────────┼────────────────────────────────────────────────┤
  │ validateCoupon()         │ Server Action                  │ Prevents client-side coupon bypass             │
  ├──────────────────────────┼────────────────────────────────┼────────────────────────────────────────────────┤
  │ Public product/category  │ Server Components direct       │ No fetch wrapper needed — RSC already runs     │
  │ data                     │ Supabase call                  │ server-side                                    │
  ├──────────────────────────┼────────────────────────────────┼────────────────────────────────────────────────┤
  │ Analytics dashboard data │ Route Handler                  │ Easier to stream, paginate, or call from       │
  │                          │                                │ client components                              │
  └──────────────────────────┴────────────────────────────────┴────────────────────────────────────────────────┘

  Service Layer Pattern

  Services are plain async functions — not classes, not API clients. They receive a Supabase client as a parameter
  so the same function works in both server-component and admin contexts.

  // lib/services/products.js
  export async function getProductBySlug(supabase, slug) {
    const { data, error } = await supabase
      .from('products')
      .select(`*, category:categories(*), brand:brands(*), images:product_images(*), inventory(stock_status)`)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();
    if (error) throw error;
    return data;
  }

  export async function listProducts(supabase, { categorySlug, limit = 20, offset = 0 } = {}) {
    let query = supabase
      .from('products')
      .select(`*, category:categories(slug,name), inventory(stock_status)`)
      .eq('is_active', true)
      .order('sort_order');
    if (categorySlug) {
      query = query.eq('categories.slug', categorySlug);
    }
    const { data, error } = await query.range(offset, offset + limit - 1);
    if (error) throw error;
    return data;
  }

  Caching Strategy

  Next.js 16 does not auto-cache Supabase queries (they go through the Supabase SDK, not fetch). Use unstable_cache:

  import { unstable_cache } from 'next/cache';
  import { createServerSupabase } from '@/lib/supabase/server';

  export const getCachedCategories = unstable_cache(
    async () => {
      const supabase = await createServerSupabase();
      return getCategories(supabase);
    },
    ['categories'],
    { revalidate: 3600, tags: ['categories'] }   // 1 hour
  );

  // On admin update → revalidateTag('categories')

  ┌────────────────────────┬────────────────┬─────────────────────────────────────────┐
  │          Data          │ Cache Duration │              Invalidation               │
  ├────────────────────────┼────────────────┼─────────────────────────────────────────┤
  │ Categories, brands     │ 3600s          │ revalidateTag on admin edit             │
  ├────────────────────────┼────────────────┼─────────────────────────────────────────┤
  │ Product listings       │ 300s           │ revalidateTag on product edit           │
  ├────────────────────────┼────────────────┼─────────────────────────────────────────┤
  │ Single product page    │ 300s           │ revalidateTag('product-{slug}') on edit │
  ├────────────────────────┼────────────────┼─────────────────────────────────────────┤
  │ Inventory stock status │ 60s            │ revalidateTag on any stock change       │
  ├────────────────────────┼────────────────┼─────────────────────────────────────────┤
  │ Orders, admin data     │ no-store       │ Never cached                            │
  └────────────────────────┴────────────────┴─────────────────────────────────────────┘

  ---
  5. Auth + RLS Strategy

  Authentication Flow

  Storefront:     No auth required. Public browsing.
                  Orders submitted via Server Action (service role bypasses RLS).

  Admin:          Supabase Auth (email + password).
                  /admin/login → Supabase signIn → sets httpOnly cookie.
                  /admin/layout.js checks auth → redirect to /admin/login if not authenticated.
                  Middleware validates admin_users table role on every /admin route.

  Middleware

  // middleware.js
  export async function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
      // validate Supabase session cookie
      // check admin_users.is_active
      // if fail → redirect to /admin/login
    }
  }

  RLS Policies

  -- PRODUCTS: public read, admin write
  ALTER TABLE products ENABLE ROW LEVEL SECURITY;

  CREATE POLICY "Public reads active products"
    ON products FOR SELECT
    USING (is_active = true);

  CREATE POLICY "Admins manage products"
    ON products FOR ALL
    USING (
      EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
    );

  -- CATEGORIES, BRANDS: same pattern as products

  -- ORDERS: no public read at all
  ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

  CREATE POLICY "Admins manage orders"
    ON orders FOR ALL
    USING (
      EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
    );
  -- Order creation from Server Action uses service role client → bypasses RLS entirely

  -- INVENTORY: public reads stock_status only
  CREATE POLICY "Public reads stock status"
    ON inventory FOR SELECT
    USING (true);   -- quantity visible too, fine for transparency

  CREATE POLICY "Admins manage inventory"
    ON inventory FOR ALL
    USING (
      EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
    );

  -- OFFERS: public read (needed for coupon validation)
  CREATE POLICY "Public reads active offers"
    ON offers FOR SELECT
    USING (is_active = true);

  -- CUSTOMERS, ADMIN_USERS: admin only

  Three Supabase Clients

  // lib/supabase/client.js
  // For browser-side code only (cart hydration, client components)
  import { createBrowserClient } from '@supabase/ssr';
  export function createBrowserSupabase() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  // lib/supabase/server.js
  // For Server Components, Server Actions, Route Handlers — reads auth cookie
  import { createServerClient } from '@supabase/ssr';
  import { cookies } from 'next/headers';
  export async function createServerSupabase() {
    const cookieStore = await cookies();
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { cookies: { getAll: () => cookieStore.getAll(), setAll: (...) => ... } }
    );
  }

  // lib/supabase/admin.js
  // Service role — bypasses ALL RLS. ONLY in server-side files. Never import in 'use client'.
  import { createClient } from '@supabase/supabase-js';
  export const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY  // never NEXT_PUBLIC_
  );

  ---
  6. Order Workflow

  User fills cart + checkout form
            │
            ▼
  Client: window.open(whatsappUrl)  ←── WhatsApp opens immediately (don't block on DB)
            │
            ▼
  Server Action: createOrder(formData, cartItems)
    1. normalizePhone(form.phone) → "+91XXXXXXXXXX"
    2. upsertCustomer() — INSERT or UPDATE on phone_normalized conflict
    3. generateOrderNumber() → "DO-2026-001234"
    4. validateCoupon() — re-validate server-side (not trusting client)
    5. calculateTotals() — recalculate subtotal/discount/shipping
    6. INSERT orders row (status: 'new', whatsapp_sent: true)
    7. INSERT order_items rows (with product name/sku snapshots)
    8. For each item:
         UPDATE inventory SET quantity = quantity - ordered_qty
         Recalculate stock_status (trigger or inline)
         INSERT inventory_logs (change_type: 'sale', reference_id: order_id)
    9. UPDATE offers SET usage_count = usage_count + 1 (if coupon used)
    10. Return { success: true, orderNumber }
            │
            ▼
  Client: clearCart(), show OrderSuccess with order number

  WhatsApp message builder (lib/utils/whatsapp.js):
  export function buildOwnerMessage({ order, items }) {
    // Same format as current CartPageClient but now includes order_number
    return `🛒 *NEW ORDER — Dwarka Orthodontics*\n*Order #:* ${order.order_number}\n...`;
  }

  ---
  7. Inventory Workflow

  Stock Deduction (automatic on order)

  // Inside createOrder() service — runs inside a Supabase transaction via RPC
  const { data: inv } = await adminSupabase
    .from('inventory')
    .select('quantity, low_stock_threshold')
    .eq('product_id', productId)
    .single();

  const newQty = inv.quantity - orderedQty;
  const newStatus =
    newQty <= 0 ? 'out-of-stock' :
    newQty <= inv.low_stock_threshold ? 'low-stock' :
    'in-stock';

  await adminSupabase.from('inventory').update({
    quantity: newQty,
    stock_status: newStatus,
    updated_at: new Date().toISOString(),
  }).eq('product_id', productId);

  await adminSupabase.from('inventory_logs').insert({
    product_id: productId,
    change_type: 'sale',
    quantity_change: -orderedQty,
    quantity_before: inv.quantity,
    quantity_after: newQty,
    reference_id: orderId,
  });

  Admin Restock

  // Server Action from /admin/inventory
  async function restockProduct(productId, qty, notes) {
    // fetch current qty → add qty → update status → insert log
  }

  Low Stock Alerts (MVP)

  - Admin dashboard shows a "Low Stock" count badge in the sidebar nav
  - Filter: SELECT * FROM inventory WHERE stock_status = 'low-stock' OR stock_status = 'out-of-stock'
  - Future: Supabase DB webhook → WhatsApp notification to owner

  ---
  8. Analytics-Ready Design

  The schema is analytics-ready without any extra work:

  -- Daily revenue
  SELECT DATE(created_at) as day, COUNT(*) as orders, SUM(total_amount) as revenue
  FROM orders WHERE order_status != 'cancelled'
  GROUP BY day ORDER BY day DESC;

  -- Top-selling products
  SELECT oi.product_name, oi.product_sku,
         SUM(oi.quantity) as units_sold,
         SUM(oi.total_price) as revenue
  FROM order_items oi
  JOIN orders o ON oi.order_id = o.id
  WHERE o.order_status != 'cancelled'
  GROUP BY oi.product_name, oi.product_sku
  ORDER BY revenue DESC LIMIT 10;

  -- Outstanding payments
  SELECT COUNT(*), SUM(pending_amount) FROM orders
  WHERE payment_status IN ('pending', 'partial');

  -- Customer repeat rate
  SELECT customer_id, COUNT(*) as order_count, SUM(total_amount) as ltv
  FROM orders GROUP BY customer_id ORDER BY ltv DESC;

  ---
  Summary: Key Design Decisions

  ┌─────────────────────────┬──────────────────────────────┬───────────────────────────────────────────────────┐
  │        Decision         │            Choice            │                        Why                        │
  ├─────────────────────────┼──────────────────────────────┼───────────────────────────────────────────────────┤
  │ Price storage           │ numeric(10,2) in rupees      │ The current "₹2,000/-" string is bad for math.    │
  │                         │                              │ Format at display layer.                          │
  ├─────────────────────────┼──────────────────────────────┼───────────────────────────────────────────────────┤
  │ Customer identity       │ phone_normalized             │ No registration needed              │
  │                         │                              │ WhatsApp-first UX                                 │
  ├─────────────────────────┼──────────────────────────────┼───────────────────────────────────────────────────┤
  │ Order creation          │ Service role client in       │ Bypasses RLS cleanly; no JWT needed for guests    │
  │                         │ Server Action                │                                                   │
  ├─────────────────────────┼──────────────────────────────┼───────────────────────────────────────────────────┤
  │ Product snapshots in    │ Yes                          │ product names change; historical orders must be   │
  │ order_items             │                              │ accurate                                          │
  ├─────────────────────────┼──────────────────────────────┼───────────────────────────────────────────────────┤
  │ WhatsApp + DB write     │ Parallel, not sequential     │ Don't block WhatsApp on DB write; fail silently   │
  │                         │                              │ on DB error for now                               │
  ├─────────────────────────┼──────────────────────────────┼───────────────────────────────────────────────────┤
  │ Coupons                 │ Move from coupons.js →       │ Admin can create/disable coupons without deploys  │
  │                         │ offers table                 │                                                   │
  ├─────────────────────────┼──────────────────────────────┼───────────────────────────────────────────────────┤
  │ Image storage           │ Supabase Storage bucket      │ One source of truth; admin dashboard can upload   │
  │                         │                              │ directly                                          │
  ├─────────────────────────┼──────────────────────────────┼───────────────────────────────────────────────────┤
  │ Admin auth              │ Supabase Auth + admin_users  │ Email/password, no custom auth system             │
  │                         │ table                        │                                                   │
  └─────────────────────────┴──────────────────────────────┴───────────────────────────────────────────────────┘

  ---
  Ready to implement? I'd suggest starting in this order:
  1. Supabase project setup + run the SQL schemas
  2. Three Supabase clients (client.js, server.js, admin.js)
  3. Seed products/categories/brands from mock data
  4. Wire createOrder() Server Action to the existing cart checkout
  5. Admin login + /admin layout guard
  6. Admin orders list page
  7. Admin product management

  Say the word and I'll start on any of these.