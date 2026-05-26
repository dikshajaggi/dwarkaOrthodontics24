'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/lib/mockProducts';
import { CONTACT } from '@/lib/mockData';
import { fuzzySearch } from '@/lib/search';
import { openWhatsApp } from '@/lib/whatsapp';

const quickCategories = [
  { label: 'Brackets', href: '/categories/brackets' },
  { label: 'Wires', href: '/categories/wires-springs' },
  { label: 'Pliers', href: '/categories/pliers' },
  { label: 'Elastics', href: '/categories/elastics' },
  { label: 'Adhesives', href: '/categories/adhesives' },
  { label: 'Bands & Tubes', href: '/categories/bands-tubes' },
];

const popularTerms = [
  '022 MBT Self Ligating Ceramic Kit Premium',
  'Australian Wire Spool (Special Plus)',
  'Distal End Cutter (long handle with safety hold)',
  'Face Masks',
  'Horizontal Aligner Plier',
  'Lingual Buttons',
];

export default function SearchSection() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setQuery('');
    setFocused(false);
  }, [pathname]);

  const results = useMemo(() => fuzzySearch(products, query, 6), [query]);

  function navigate() {
    if (!query.trim()) return;
    if (results.length > 0) {
      router.push(`/products/${results[0].slug}`);
      setQuery('');
      setFocused(false);
    }
  }

  function navigateForTerm(term) {
    const matches = fuzzySearch(products, term, 1);
    if (matches.length > 0) {
      router.push(`/products/${matches[0].slug}`);
      setQuery('');
      setFocused(false);
    } else {
      setQuery(term);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') navigate();
    if (e.key === 'Escape') { setFocused(false); setQuery(''); }
  }

  return (
    <section className="bg-white py-10 sm:py-14 px-4 border-b border-slate-100">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Find any product instantly
          </h2>
        </div>

        {/* Search input */}
        <div className="relative">
          <div className={`flex items-center bg-white border-2 rounded-2xl transition-all duration-200 ${focused ? 'border-teal-500 shadow-lg shadow-teal-50' : 'border-slate-200 hover:border-slate-300'}`}>
            <svg className="w-4 h-4 text-slate-300 ml-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search by product, SKU, or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent px-4 py-4 text-sm sm:text-base text-slate-900 placeholder-slate-300 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="mr-2 p-1.5 rounded-full hover:bg-slate-100 text-slate-300 hover:text-slate-500 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              onClick={navigate}
              className="mr-2 bg-slate-950 hover:bg-teal-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shrink-0"
            >
              Search
            </button>
          </div>

          {/* Dropdown */}
          {focused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-600 z-30 overflow-hidden">
              <div className="p-2">
                {query.trim() ? (
                  results.length > 0 ? (
                    <>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 py-2">
                        Matching products
                      </p>
                      {results.map((product) => (
                        <button
                          key={product.id}
                          onMouseDown={() => { setQuery(''); setFocused(false); router.push(`/products/${product.slug}`); }}
                          className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <svg className="w-3.5 h-3.5 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-slate-700 block truncate">{product.name}</span>
                            <span className="text-[10px] text-slate-400">{product.sku}</span>
                          </div>
                          <svg className="w-3 h-3 text-slate-200 ml-auto group-hover:text-slate-400 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="px-3 py-4 text-center">
                      <p className="text-sm font-medium text-slate-700 mb-0.5">Can't find this product?</p>
                      <p className="text-xs text-slate-400 mb-3">Ask us on WhatsApp for availability or details.</p>
                      <a
                        href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi, I searched for '${query}'. Please share details/availability.`)}`}
                        onClick={(e) => { e.preventDefault(); openWhatsApp(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi, I searched for '${query}'. Please share details/availability.`)}`); }}
                        className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Ask on WhatsApp
                      </a>
                    </div>
                  )
                ) : (
                  <>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 py-2">
                      Popular searches
                    </p>
                    {popularTerms.map((term) => (
                      <button
                        key={term}
                        onMouseDown={() => navigateForTerm(term)}
                        className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <svg className="w-3.5 h-3.5 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-sm text-slate-700">{term}</span>
                        <svg className="w-3 h-3 text-slate-200 ml-auto group-hover:text-slate-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick category pills */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          <span className="text-[11px] text-slate-300 self-center">Quick:</span>
          {quickCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-xs font-medium text-slate-600 hover:text-teal-700 bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 px-3 py-1.5 rounded-full transition-all"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
