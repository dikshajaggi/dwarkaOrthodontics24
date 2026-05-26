'use client';

import { useState } from 'react';

function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-semibold text-slate-900 text-sm">{title}</span>
        <svg
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-4 text-sm text-slate-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductAccordion({ product }) {
  const specEntries = Object.entries(product.specs || {});

  return (
    <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50 px-5">
      {product.description && (
        <AccordionItem title="Description" defaultOpen>
          <p className="text-slate-600 leading-relaxed">{product.description}</p>
        </AccordionItem>
      )}

      {product.clinicalNotes && (
        <AccordionItem title="Clinical Notes & Usage">
          <p className="text-slate-600 leading-relaxed">{product.clinicalNotes}</p>
        </AccordionItem>
      )}

      {product.use && (
        <AccordionItem title="Use">
          <p className="text-slate-600 leading-relaxed">{product.use}</p>
        </AccordionItem>
      )}

      <AccordionItem title="Shipping & Dispatch">
        <div className="space-y-2">
          {product.shippingInfo && <p className="text-slate-600">{product.shippingInfo}</p>}
          <ul className="mt-2 space-y-1">
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <svg className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Pan India delivery — all major cities and towns
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <svg className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              GST invoice provided with every shipment
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <svg className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              100% authentic — sourced from authorized distributors
            </li>
          </ul>
        </div>
      </AccordionItem>
    </div>
  );
}
