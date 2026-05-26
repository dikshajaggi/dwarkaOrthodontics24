import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { getFeaturedProducts, getProductsByCategory } from '@/lib/mockData';

function ProductRow({ label, title, subtitle, products, viewAllHref }) {
  if (!products.length) return null;

  return (
    <div className="mb-16 last:mb-0">
      <div className="flex items-end justify-between mb-6">
        <div>
          {label && (
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1.5">{label}</p>
          )}
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{title}</h3>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            View all
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Mobile: horizontal scroll | Desktop: grid */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="snap-start shrink-0 w-48 sm:w-auto">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const bestSellers = getFeaturedProducts('bestSeller');
  const brackets = getProductsByCategory('brackets');
  const wires = getProductsByCategory('wires-springs');
  const trending = getFeaturedProducts('trending');
  const newArrivals = getFeaturedProducts('newArrival');

  return (
    <section id="featured" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xl font-semibold text-teal-600 uppercase tracking-widest mb-2">Products</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Most ordered by orthodontists
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
            Premium products from trusted brands — in stock and ready to ship
          </p>
        </div>

        <ProductRow
          title="Best Selling Products"
          subtitle="Most ordered by clinics across India"
          products={bestSellers}
          viewAllHref="/categories/brackets"
        />

        <div className="fade-divider my-14" />

        <ProductRow
          title="Brackets"
          subtitle="Metal, ceramic & self-ligating options"
          products={brackets}
          viewAllHref="/categories/brackets"
        />

        <ProductRow
          title="Orthodontic Wires"
          subtitle="NiTi, SS & Beta-Ti archwires for every stage"
          products={wires}
          viewAllHref="/categories/wires-springs"
        />

        {trending.length > 0 && (
          <ProductRow
            title="This Week's Top Orders"
            subtitle="What other orthodontists are ordering right now"
            products={trending}
            viewAllHref="#"
          />
        )}

        {newArrivals.length > 0 && (
          <ProductRow
            title="Just Added"
            subtitle="Fresh additions to our catalogue"
            products={newArrivals}
            viewAllHref="#"
          />
        )}
      </div>
    </section>
  );
}
