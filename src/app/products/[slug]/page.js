import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts, getCategoryBySlug, CONTACT } from '@/lib/mockData';
import ProductImages from '@/components/product/ProductImages';
import ProductAccordion from '@/components/product/ProductAccordion';
import StickyMobileCTA from '@/components/product/StickyMobileCTA';
import ProductCard from '@/components/ui/ProductCard';
import ProductAddToCart from '@/components/product/ProductAddToCart';
import { products } from '@/lib/mockProducts';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} — ${product.sku}`,
    description: `${product.name}${product.brand ? ` by ${product.brand}` : ''}. ${product.shortSpecs}. ${product.description.slice(0, 120)}`,
  };
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const category = getCategoryBySlug(product.category);

  const waMessage = encodeURIComponent(
    `Hi, I am interested in: ${product.name} (SKU: ${product.sku}). Please share availability and pricing.`
  );
  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`;
  const quoteMessage = encodeURIComponent(
    `Hi, I need a bulk quote for: ${product.name} (SKU: ${product.sku}). Please share pricing for bulk quantity.`
  );
  const quoteHref = `https://wa.me/${CONTACT.whatsapp}?text=${quoteMessage}`;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-28 lg:pb-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-8 flex-wrap">
          <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
          <span className="text-slate-200">/</span>
          {category && (
            <>
              <Link href={`/categories/${category.slug}`} className="hover:text-teal-600 transition-colors">
                {category.name}
              </Link>
              <span className="text-slate-200">/</span>
            </>
          )}
          <span className="text-slate-700 font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Images */}
          <div>
            <ProductImages product={product} />
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-5">

            {/* Brand + badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.bestSeller && (
                <span className="text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded-full tracking-wide uppercase text-[9px]">
                  Best Seller
                </span>
              )}
              {product.newArrival && (
                <span className="text-xs font-bold bg-teal-600 text-white px-2.5 py-1 rounded-full tracking-wide uppercase text-[9px]">
                  New Arrival
                </span>
              )}
            </div>

            {/* Product name */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
                {product.name}
              </h1>
              <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2 hover:text-teal-700 transition-colors line-clamp-2">
                {product.price}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{product.description}</p>
            </div>

            {/* SKU */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">SKU</span>
                <span className="text-sm font-mono font-semibold text-slate-800">{product.sku}</span>
              </div>
            </div>

            {/* Quick specs box */}
            {/* <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Quick Specs</p>
              <p className="text-sm font-medium text-slate-800">{product.description}</p>
            </div> */}

            {/* Spec pills */}
            {Object.entries(product.specs || {}).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-1.5 bg-white border border-slate-100 rounded-lg px-2.5 py-1.5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-xs font-semibold text-slate-700">{val}</span>
                  </div>
                ))}
              </div>
            )}

            <ProductAddToCart product={product} />

            {/* Desktop CTA block */}
            <div className="hidden lg:block bg-white border border-slate-100 rounded-2xl p-5 mt-2 shadow-sm">
              <p className="text-sm font-semibold text-slate-900 mb-1">Interested in this product?</p>
              <p className="text-xs text-slate-500 mb-5">Contact us for pricing, availability, and bulk orders</p>

              <div className="flex flex-col gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-xl text-sm transition-all"
                >
                  <WhatsAppIcon />
                  WhatsApp Us About This Product
                </a>
                <a
                  href={CONTACT.phoneRaw}
                  className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-teal-700 text-white font-semibold py-3.5 rounded-xl text-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now: {CONTACT.phone}
                </a>
                <a
                  href={quoteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-3 rounded-xl text-sm transition-all"
                >
                  Request Bulk Quote
                </a>
              </div>

              {/* Trust micro-badges */}
              <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-2">
                {['GST Invoice', 'Authentic', 'Fast Shipping'].map((b) => (
                  <span key={b} className="flex items-center gap-1 text-[11px] text-slate-500">
                    <svg className="w-3 h-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product details accordions */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-slate-900 mb-5 tracking-tight">Product Details</h2>
          <ProductAccordion product={product} />
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1.5">Related</p>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Similar Products</h2>
                <p className="text-sm text-slate-500 mt-0.5">Frequently ordered together</p>
              </div>
              {category && (
                <Link
                  href={`/categories/${product.category}`}
                  className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  View all {category.name}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <StickyMobileCTA product={product} />
    </>
  );
}
