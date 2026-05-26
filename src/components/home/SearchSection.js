'use client';

import { useState } from 'react';
import Link from 'next/link';

const suggestions = [
  'MBT Brackets 0.022"',
  'Copper NiTi Wire',
  'Weingart Plier',
  'Power Chain Clear',
  'Transbond XT',
  'Elastomeric Ligatures',
  'Buccal Tubes MBT',
  'Self-Ligating Brackets',
];

const quickCategories = [
  { label: 'Brackets', href: '/categories/brackets' },
  { label: 'Wires', href: '/categories/wires-springs' },
  { label: 'Pliers', href: '/categories/pliers' },
  { label: 'Elastics', href: '/categories/elastics' },
  { label: 'Adhesives', href: '/categories/adhesives' },
  { label: 'Bands & Tubes', href: '/categories/bands-tubes' },
];

export default function SearchSection() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const filtered = query.length > 0
    ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : suggestions;

  return (
    <section className="bg-white py-10 sm:py-14 px-4 border-b border-slate-100">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          {/* <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1.5">Search</p> */}
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
              placeholder="Search by product, or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
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
            <button className="mr-2 bg-slate-950 hover:bg-teal-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shrink-0">
              Search
            </button>
          </div>

          {/* Dropdown suggestions */}
          {focused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-100 z-30 overflow-hidden">
              <div className="p-2">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 py-2">
                  {query ? 'Matching products' : 'Popular searches'}
                </p>
                {filtered.slice(0, 6).map((suggestion) => (
                  <button
                    key={suggestion}
                    onMouseDown={() => setQuery(suggestion)}
                    className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <svg className="w-3.5 h-3.5 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm text-slate-700">{suggestion}</span>
                    <svg className="w-3 h-3 text-slate-200 ml-auto group-hover:text-slate-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                ))}
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
