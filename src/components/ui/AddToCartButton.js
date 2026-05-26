'use client';

import { useCartStore } from '@/lib/cartStore';

function CheckIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/**
 * variant="card"   — compact, fits inside ProductCard footer (flex-1)
 * variant="detail" — full-size, used on product detail page
 */
export default function AddToCartButton({ product, variant = 'card' }) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);

  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.qty ?? 0;
  const inCart = qty > 0;

  const inc = () => updateQty(product.id, qty + 1);
  const dec = () => (qty <= 1 ? removeItem(product.id) : updateQty(product.id, qty - 1));

  // ── Card variant ────────────────────────────────────────────────────────
  if (variant === 'card') {
    if (!inCart) {
      return (
        <button
          onClick={() => addItem(product, 1)}
          className="cursor-pointer flex-1 text-center bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-all duration-200"
        >
          Add to Cart
        </button>
      );
    }
    return (
      <div className="flex-1 flex flex-col gap-1">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-teal-600">
          <CheckIcon className="w-3 h-3" />
          Added to Cart
        </span>
        <div className="flex items-center bg-slate-100 rounded-xl px-1 py-0.5">
          <button
            onClick={dec}
            className="w-6 h-6 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 active:scale-95 transition-all text-sm font-medium leading-none"
          >
            −
          </button>
          <span className="flex-1 text-center text-xs font-bold text-slate-800 tabular-nums">{qty}</span>
          <button
            onClick={inc}
            className="w-6 h-6 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 active:scale-95 transition-all text-sm font-medium leading-none"
          >
            +
          </button>
        </div>
      </div>
    );
  }

  // ── Detail variant ──────────────────────────────────────────────────────
  if (!inCart) {
    return (
      <button
        onClick={() => addItem(product, 1)}
        className="cursor-pointer w-48 bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold px-7 py-2.5 rounded-xl active:scale-[0.98] transition-all duration-150"
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-teal-600">
        <CheckIcon className="w-4 h-4" />
        Added to Cart
      </span>
      <div className="flex items-center gap-1 bg-slate-100 rounded-xl px-1 py-1 w-fit">
        <button
          onClick={dec}
          className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm active:scale-95 transition-all font-medium text-base leading-none"
        >
          −
        </button>
        <span className="w-8 text-center text-xs font-bold text-slate-800 tabular-nums">{qty}</span>
        <button
          onClick={inc}
          className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm active:scale-95 transition-all font-medium text-base leading-none"
        >
          +
        </button>
      </div>
    </div>
  );
}
