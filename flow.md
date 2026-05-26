  ---
  Dwarka Orthodontics — File Connection Flow

  ENTRY POINT
  ───────────
  src/app/layout.js  (Root layout — wraps every page)
    ├── imports globals.css           (Tailwind base styles)
    ├── renders CartHydrator          → src/components/layout/CartHydrator.js
    │     └── calls useCartStore.persist.rehydrate()  (loads cart from localStorage on mount)
    │           └── src/lib/cartStore.js  (Zustand store, persisted as "do_cart")
    ├── renders Header                → src/components/layout/Header.js
    │     ├── reads useCartStore (selectTotalItems) → shows cart badge count
    │     └── reads categories from src/lib/mockData.js → mobile menu category links
    ├── renders {children}            (the active page)
    └── renders Footer                → src/components/layout/Footer.js
          └── reads CONTACT from src/lib/mockData.js


  DATA LAYER (single source of truth right now)
  ─────────────────────────────────────────────
  src/lib/mockData.js  ← everything reads from here
    exports:
      CONTACT            → Header, CartPageClient, products/[slug]/page.js
      announcements      → AnnouncementBar (currently commented out)
      brands[]           → BrandSection (currently commented out)
      categories[]       → Header, CategorySection, FeaturedProducts, CategoryPage
      products[]         → CategoryPageClient, FeaturedProducts, ProductPage
      getCategoryBySlug()  → CategoryPage
      getProductsByCategory() → CategoryPage
      getProductBySlug()    → ProductPage
      getRelatedProducts()  → ProductPage
      getFeaturedProducts() → FeaturedProducts

  src/lib/cartStore.js  (Zustand, client-side only)
    exports: useCartStore, selectTotalItems, selectSubtotal
    consumed by: CartHydrator, Header, AddToCartButton,
                 ProductAddToCart, CartPageClient

  src/lib/coupons.js
    exports: COUPONS[], applyCoupon()
    consumed by: CartPageClient only


  PAGE ROUTES & THEIR COMPONENTS
  ───────────────────────────────

  / (Home)  →  src/app/page.js
    └── renders (all Server Components, no data fetching yet):
          HeroSection       → src/components/home/HeroSection.js
          SearchSection     → src/components/home/SearchSection.js
          CategorySection   → src/components/home/CategorySection.js
            └── reads categories[] from mockData
          FeaturedProducts  → src/components/home/FeaturedProducts.js
            └── reads getFeaturedProducts() from mockData
            └── renders ProductCard  → src/components/ui/ProductCard.js
                  └── Link to /products/[slug]
          TrustSection      → src/components/home/TrustSection.js
          BrandSection      → (commented out)

  /categories/[slug]  →  src/app/categories/[slug]/page.js
    ├── reads getCategoryBySlug(slug) + getProductsByCategory(slug) from mockData
    └── renders CategoryPageClient → src/components/category/CategoryPageClient.js
          ├── renders ProductCard for each product → src/components/ui/ProductCard.js
          └── AddToCartButton → src/components/ui/AddToCartButton.js
                └── calls useCartStore.addItem()

  /products/[slug]  →  src/app/products/[slug]/page.js
    ├── reads getProductBySlug(), getRelatedProducts(), getCategoryBySlug() from mockData
    ├── reads CONTACT from mockData
    └── renders:
          ProductImages    → src/components/product/ProductImages.js
          ProductAccordion → src/components/product/ProductAccordion.js
          ProductAddToCart → src/components/product/ProductAddToCart.js
            └── calls useCartStore.addItem()
          StickyMobileCTA  → src/components/product/StickyMobileCTA.js
            └── reads CONTACT, links to WhatsApp
          ProductCard (×4 related products)

  /cart  →  src/app/cart/page.js
    └── renders CartPageClient → src/components/cart/CartPageClient.js  ('use client')
          ├── reads useCartStore (items, removeItem, updateQty, clearCart, selectSubtotal)
          ├── reads applyCoupon(), COUPONS from src/lib/coupons.js
          ├── reads CONTACT from src/lib/mockData.js
          └── on "Place Order":
                builds WhatsApp message string
                → window.open(wa.me/owner) — opens WhatsApp to shop owner
                → clearCart()
                → shows OrderSuccess (with link to WhatsApp the customer themselves)

  ---
  Key Architectural Facts

  ┌───────────────────┬──────────────────────────────────────────────────────────────────────────────────────┐
  │      Concern      │                                    Current state                                     │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ Data source       │ All static — mockData.js. No DB yet.                                                 │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ Cart state        │ Zustand + localStorage ("do_cart" key). Hydrated once on mount by CartHydrator.      │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ Server vs Client  │ Pages are async Server Components. Cart/header/product-CTA are 'use client'.         │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ "Ordering"        │ No backend — just opens wa.me link with order text. No DB write happens.             │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ Auth              │ None yet. Admin panel not built.                                                     │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ categories/[slug] │ Data arrays are empty [] right now — page renders nothing.                           │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ products/[slug]   │ Same — product/related/category are all []. Page structure exists, data isn't wired. │
  └───────────────────┴──────────────────────────────────────────────────────────────────────────────────────┘

  The two dynamic pages (categories/[slug] and products/[slug]) have their UI shells built but their data fetching lines were left as empty arrays — they need
  to be connected back to mockData.js (or Supabase when the backend is wired up).
  │ Data source       │ All static — mockData.js. No DB yet.                                                 │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ Cart state        │ Zustand + localStorage ("do_cart" key). Hydrated once on mount by CartHydrator.      │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ Server vs Client  │ Pages are async Server Components. Cart/header/product-CTA are 'use client'.         │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ "Ordering"        │ No backend — just opens wa.me link with order text. No DB write happens.             │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ Auth              │ None yet. Admin panel not built.                                                     │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ categories/[slug] │ Data arrays are empty [] right now — page renders nothing.                           │
  ├───────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤
  │ products/[slug]   │ Same — product/related/category are all []. Page structure exists, data isn't wired. │
  └───────────────────┴──────────────────────────────────────────────────────────────────────────────────────┘

  The two dynamic pages (categories/[slug] and products/[slug]) have their UI shells built but their data fetching lines were left as empty arrays — they need
  to be connected back to mockData.js (or Supabase when the backend is wired up).