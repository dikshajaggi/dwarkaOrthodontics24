'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { CONTACT } from '@/lib/mockData';

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'name-az', label: 'Name A–Z' },
  // { value: 'brand-az', label: 'Brand A–Z' },
  // { value: 'stock', label: 'In Stock First' },
];

function FilterIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function CategoryPageClient({ category, products }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sort, setSort] = useState('default');
  const [activeSearch, setActiveSearch] = useState('');
  const [filters, setFilters] = useState({
    brands: [],
    inStockOnly: false,
    slotSizes: [],
    materials: [],
  });

  // const brandOptions = useMemo(() => {
  //   const set = new Set(products.map((p) => p.brand));
  //   return Array.from(set).sort();
  // }, [products]);

  const slotSizeOptions = useMemo(() => {
    const set = new Set(
      products.filter((p) => p.specs?.slotSize).map((p) => p.specs.slotSize)
    );
    return Array.from(set).sort();
  }, [products]);

  const materialOptions = useMemo(() => {
    const set = new Set(
      products.filter((p) => p.specs?.material).map((p) => p.specs.material)
    );
    return Array.from(set).sort();
  }, [products]);

  const activeFilterCount =
    filters.brands.length +
    filters.slotSizes.length +
    filters.materials.length +
    (filters.inStockOnly ? 1 : 0);

  const displayProducts = useMemo(() => {
    let result = products;

    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.shortSpecs || '').toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    // if (filters.brands.length > 0) result = result.filter((p) => filters.brands.includes(p.brand));
    // if (filters.inStockOnly) result = result.filter((p) => p.stockStatus === 'in-stock');
    // if (filters.slotSizes.length > 0) result = result.filter((p) => filters.slotSizes.includes(p.specs?.slotSize));
    // if (filters.materials.length > 0) result = result.filter((p) => filters.materials.includes(p.specs?.material));

    if (sort === 'name-az') result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    // else if (sort === 'brand-az') result = [...result].sort((a, b) => a.brand.localeCompare(b.brand));
    else if (sort === 'stock') result = [...result].sort((a) => (a.stockStatus === 'in-stock' ? -1 : 1));

    return result;
  }, [products, activeSearch, filters, sort]);

  // function toggleBrand(brand) {
  //   setFilters((f) => ({
  //     ...f,
  //     brands: f.brands.includes(brand) ? f.brands.filter((b) => b !== brand) : [...f.brands, brand],
  //   }));
  // }
  // function toggleSlotSize(size) {
  //   setFilters((f) => ({
  //     ...f,
  //     slotSizes: f.slotSizes.includes(size) ? f.slotSizes.filter((s) => s !== size) : [...f.slotSizes, size],
  //   }));
  // }
  // function toggleMaterial(mat) {
  //   setFilters((f) => ({
  //     ...f,
  //     materials: f.materials.includes(mat) ? f.materials.filter((m) => m !== mat) : [...f.materials, mat],
  //   }));
  // }
  // function clearFilters() {
  //   setFilters({ brands: [], inStockOnly: false, slotSizes: [], materials: [] });
  // }

  // const FilterPanel = ({ onClose }) => (
  //   <div className="flex flex-col gap-6">
  //     {/* In Stock toggle */}
  //     <div>
  //       <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Stock Status</h4>
  //       <label className="flex items-center gap-3 cursor-pointer">
  //         <div
  //           onClick={() => setFilters((f) => ({ ...f, inStockOnly: !f.inStockOnly }))}
  //           className={`w-10 h-5 rounded-full transition-colors relative shrink-0 cursor-pointer ${filters.inStockOnly ? 'bg-teal-600' : 'bg-slate-200'}`}
  //         >
  //           <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${filters.inStockOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
  //         </div>
  //         <span className="text-sm text-slate-700">In Stock Only</span>
  //       </label>
  //     </div>

  //     {/* Brands */}
  //     {brandOptions.length > 0 && (
  //       <div>
  //         <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Brand</h4>
  //         <div className="space-y-2">
  //           {brandOptions.map((brand) => (
  //             <label key={brand} className="flex items-center gap-3 cursor-pointer group">
  //               <div
  //                 onClick={() => toggleBrand(brand)}
  //                 className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
  //                   filters.brands.includes(brand)
  //                     ? 'bg-teal-600 border-teal-600 text-white'
  //                     : 'border-slate-200 group-hover:border-teal-300'
  //                 }`}
  //               >
  //                 {filters.brands.includes(brand) && <CheckIcon />}
  //               </div>
  //               <span className="text-sm text-slate-700">{brand}</span>
  //             </label>
  //           ))}
  //         </div>
  //       </div>
  //     )}

  //     {/* Slot Size */}
  //     {slotSizeOptions.length > 0 && (
  //       <div>
  //         <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Slot Size</h4>
  //         <div className="flex flex-wrap gap-2">
  //           {slotSizeOptions.map((size) => (
  //             <button
  //               key={size}
  //               onClick={() => toggleSlotSize(size)}
  //               className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
  //                 filters.slotSizes.includes(size)
  //                   ? 'bg-teal-600 text-white border-teal-600'
  //                   : 'border-slate-200 text-slate-600 hover:border-teal-300'
  //               }`}
  //             >
  //               {size}
  //             </button>
  //           ))}
  //         </div>
  //       </div>
  //     )}

  //     {/* Material */}
  //     {materialOptions.length > 0 && (
  //       <div>
  //         <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Material</h4>
  //         <div className="space-y-2">
  //           {materialOptions.map((mat) => (
  //             <label key={mat} className="flex items-center gap-3 cursor-pointer group">
  //               <div
  //                 onClick={() => toggleMaterial(mat)}
  //                 className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
  //                   filters.materials.includes(mat)
  //                     ? 'bg-teal-600 border-teal-600 text-white'
  //                     : 'border-slate-200 group-hover:border-teal-300'
  //                 }`}
  //               >
  //                 {filters.materials.includes(mat) && <CheckIcon />}
  //               </div>
  //               <span className="text-sm text-slate-700 leading-tight">{mat}</span>
  //             </label>
  //           ))}
  //         </div>
  //       </div>
  //     )}

  //     {onClose && (
  //       <div className="flex gap-3 pt-2">
  //         <button
  //           onClick={clearFilters}
  //           className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
  //         >
  //           Clear all
  //         </button>
  //         <button
  //           onClick={onClose}
  //           className="flex-1 py-3 bg-teal-700 text-white rounded-xl text-sm font-semibold hover:bg-teal-600 transition-colors"
  //         >
  //           Apply ({displayProducts.length})
  //         </button>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
        <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
        <span className="text-slate-200">/</span>
        <Link href="#categories" className="hover:text-teal-600 transition-colors">Categories</Link>
        <span className="text-slate-200">/</span>
        <span className="text-slate-700 font-medium">{category.name}</span>
      </nav>

      {/* Category header */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8 mb-8">
        {/* <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-slate-400 tracking-widest">{category.abbr}</span>
          </div> */}
          <div>
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">Category</p>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{category.name}</h1>
            <p className="text-sm text-slate-500 mt-1">{category.description}</p>
            {/* <p className="text-xs font-medium text-teal-600 mt-1">{category.productCount} products available</p> */}
          </div>
        {/* </div> */}
      </div>

      <div className="flex gap-7">
        {/* Desktop sidebar */}
        {/* <aside className="hidden lg:block w-56 shrink-0">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-900 text-sm">Filters</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-teal-600 hover:underline">
                  Clear all
                </button>
              )}
            </div>
            <FilterPanel />
          </div>
        </aside> */}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Search + sort bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder={`Search in ${category.name}...`}
                value={activeSearch}
                onChange={(e) => setActiveSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 shrink-0"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* <button
              onClick={() => setSheetOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 shrink-0 hover:border-slate-300 transition-colors"
            >
              <FilterIcon />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-teal-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button> */}
          </div>

          {/* Active filter chips */}
          {/* {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.inStockOnly && (
                <button
                  onClick={() => setFilters((f) => ({ ...f, inStockOnly: false }))}
                  className="flex items-center gap-1 bg-teal-50 text-teal-700 border border-teal-200 text-xs font-medium px-3 py-1 rounded-full hover:bg-teal-100 transition-colors"
                >
                  In Stock Only <span className="ml-1">✕</span>
                </button>
              )}
              {filters.brands.map((b) => (
                <button
                  key={b}
                  onClick={() => toggleBrand(b)}
                  className="flex items-center gap-1 bg-teal-50 text-teal-700 border border-teal-200 text-xs font-medium px-3 py-1 rounded-full hover:bg-teal-100 transition-colors"
                >
                  {b} <span className="ml-1">✕</span>
                </button>
              ))}
              {filters.slotSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSlotSize(s)}
                  className="flex items-center gap-1 bg-teal-50 text-teal-700 border border-teal-200 text-xs font-medium px-3 py-1 rounded-full hover:bg-teal-100 transition-colors"
                >
                  Slot {s} <span className="ml-1">✕</span>
                </button>
              ))}
              {filters.materials.map((m) => (
                <button
                  key={m}
                  onClick={() => toggleMaterial(m)}
                  className="flex items-center gap-1 bg-teal-50 text-teal-700 border border-teal-200 text-xs font-medium px-3 py-1 rounded-full hover:bg-teal-100 transition-colors"
                >
                  {m} <span className="ml-1">✕</span>
                </button>
              ))}
            </div>
          )} */}

          {/* Results count */}
          <p className="text-xs text-slate-400 mb-5">
            {displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''}
            {activeSearch && ` matching "${activeSearch}"`}
          </p>

          {/* Product grid */}
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <p className="text-slate-800 font-semibold mb-1">Can't find this product?</p>
              <p className="text-slate-400 text-sm mb-5">Ask us on WhatsApp for availability or details.</p>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi, I searched for '${activeSearch}'. Please share details/availability.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Ask on WhatsApp
              </a>
              {activeSearch && (
                <div className="mt-4">
                  <button
                    onClick={() => setActiveSearch('')}
                    className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    or clear search
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      {/* {sheetOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSheetOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto lg:hidden shadow-2xl">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-200 rounded-full" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Filter Products</h3>
              <button
                onClick={() => setSheetOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterPanel onClose={() => setSheetOpen(false)} />
          </div>
        </>
      )} */}
    </div>
  );
}
