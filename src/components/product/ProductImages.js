'use client';

import Image from 'next/image';
import { useState } from 'react';

// function getImageViews(product) {
//   const base = {
//     gradient: product.gradient,
//     iconColor: product.iconColor,
//     sku: product.sku.split('-')[0],
//     category: product.category,
//   };
//   return [
//     { id: 1, label: 'Front View', ...base },
//     { id: 2, label: 'Side View', ...base, opacity: 0.6 },
//     { id: 3, label: 'Packaging', ...base, opacity: 0.4 },
//     { id: 4, label: 'Detail', ...base, opacity: 0.5 },
//   ];
// }

export default function ProductImages({ product }) {
  // const views = getImageViews(product);
  // const [activeView, setActiveView] = useState(views[0]);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
      // className={`relative rounded-2xl overflow-hidden aspect-square bg-gradient-to-br ${activeView.gradient} cursor-zoom-in select-none border border-slate-100`}
        className={`relative rounded-2xl overflow-hidden aspect-square bg-gradient-to-br cursor-zoom-in select-none border border-slate-100`}
        onClick={() => setZoomed(true)}
      >
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`text-7xl font-black ${activeView.iconColor} select-none`}
            style={{ opacity: activeView.opacity || 0.18 }}
          >
            {activeView.sku}
          </span>
          <span
            className={`text-sm font-semibold uppercase tracking-widest ${activeView.iconColor} mt-2`}
            style={{ opacity: (activeView.opacity || 0.18) + 0.35 }}
          >
            {activeView.label}
          </span>
          <span
            className={`text-xs uppercase tracking-widest ${activeView.iconColor} mt-1`}
            style={{ opacity: (activeView.opacity || 0.18) + 0.2 }}
          >
            {activeView.category}
          </span>
        </div> */}

         {product.image ? (
          <Image
            src={`/uploads/${product.image}`}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-black opacity-10">{product.sku.split('-')[0]}</span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 bg-white/80 rounded-lg px-2 py-1 text-[10px] text-slate-500 font-medium">
          Tap to zoom
        </div>

        <div className="absolute top-3 left-3 bg-teal-50 border border-teal-200 text-teal-700 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Authentic
        </div>
      </div>

      {/* Thumbnails */}
      {/* <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view)}
            className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
              activeView.id === view.id
                ? 'border-teal-600'
                : 'border-slate-100 hover:border-slate-200'
            }`}
          >
            <div className={`w-full h-full bg-gradient-to-br ${view.gradient} flex items-center justify-center`}>
              <span className={`text-xs font-bold ${view.iconColor}`} style={{ opacity: (view.opacity || 0.3) + 0.4 }}>
                {view.label.slice(0, 2).toUpperCase()}
              </span>
            </div>
          </button>
        ))}
      </div> */}

      {/* Zoom lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
        >
          <div className="w-full max-w-lg aspect-square rounded-3xl overflow-hidden relative bg-white">
            {product.image ? (
              <Image
                src={`/uploads/${product.image}`}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-contain"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black opacity-20">{product.sku}</span>
                <span className="text-sm font-semibold uppercase tracking-widest mt-3 opacity-60">{product.name}</span>
              </div>
            )}
          </div>
          <button className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
