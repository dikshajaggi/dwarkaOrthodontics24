'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore, selectSubtotal } from '@/lib/cartStore';
import { applyCoupon, COUPONS } from '@/lib/coupons';
import { CONTACT } from '@/lib/mockData';

const FREE_SHIPPING_THRESHOLD = 2000;
const SHIPPING_FEE = 150;

function fmt(n) {
  return n.toLocaleString('en-IN');
}

// ─── Empty state ────────────────────────────────────────────────────────────
function EmptyCart() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-6">
        <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
      <p className="text-sm text-slate-500 mb-8 max-w-xs">
        Browse our catalogue and add products to get started.
      </p>
      <Link
        href="/#categories"
        className="bg-slate-900 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all"
      >
        Browse Products
      </Link>
    </div>
  );
}

// ─── Success state ───────────────────────────────────────────────────────────
function OrderSuccess({ name, phone, total }) {
  const dentistMsg = encodeURIComponent(
    `Hi Dr. ${name}!\n\nYour order at Dwarka Orthodontics has been confirmed.\n\n` +
    `Order total: ₹${fmt(total)}\n\n` +
    `Our team will call you at ${phone} shortly to confirm your delivery details.\n\n` +
    `Thank you for choosing Dwarka Orthodontics!`
  );
  const cleanPhone = phone.replace(/\D/g, '').replace(/^0/, '');
  const fullPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  const dentistWaUrl = `https://wa.me/${fullPhone}?text=${dentistMsg}`;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="w-16 h-16 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center mb-6">
        <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Order placed!</h2>
      <p className="text-sm text-slate-500 mb-1">
        Your order has been sent to our team on WhatsApp.
      </p>
      <p className="text-sm text-slate-500 mb-8 max-w-sm">
        We will call you at <span className="font-semibold text-slate-700">{phone}</span> to confirm your order and delivery.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <a
          href={dentistWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl text-sm transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Send confirmation to my WhatsApp
        </a>
        <Link
          href="/"
          className="flex-1 flex items-center justify-center border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-3 rounded-xl text-sm transition-all"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

// ─── Main cart page ──────────────────────────────────────────────────────────
export default function CartPageClient() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore(selectSubtotal);

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponHint, setCouponHint] = useState(false);

  const [form, setForm] = useState({
    name: '', phone: '', clinic: '', address: '', city: '', state: '', pincode: '', notes: '',
  });
  const [errors, setErrors] = useState({});
  const [ordered, setOrdered] = useState(false);
  const [successData, setSuccessData] = useState(null);

  // ── Price math ────────────────────────────────────────────────────────────
  const discount = appliedCoupon?.discount || 0;
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = afterDiscount + shipping;

  // ── Coupon ────────────────────────────────────────────────────────────────
  function handleApplyCoupon() {
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput, subtotal);
    if (result.valid) {
      setAppliedCoupon(result);
      setCouponError('');
    } else {
      setCouponError(result.error);
      setAppliedCoupon(null);
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  function handleField(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.phone.trim()) errs.phone = 'Required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit number';
    if (!form.address.trim()) errs.address = 'Required';
    if (!form.city.trim()) errs.city = 'Required';
    if (!form.state.trim()) errs.state = 'Required';
    if (!form.pincode.trim()) errs.pincode = 'Required';
    else if (!/^\d{6}$/.test(form.pincode)) errs.pincode = 'Enter a valid 6-digit pincode';
    return errs;
  }

  // ── Place order ───────────────────────────────────────────────────────────
  function handlePlaceOrder(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const itemLines = items
      .map((i) => `• ${i.name} (SKU: ${i.sku}) × ${i.qty} = ₹${fmt(i.priceNum * i.qty)}`)
      .join('\n');

    const lines = [
      '🛒 *NEW ORDER — Dwarka Orthodontics*',
      '',
      '*Customer Details:*',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.clinic ? `Clinic: ${form.clinic}` : '',
      `Address: ${form.address}`,
      `City / State: ${form.city}, ${form.state} — ${form.pincode}`,
      form.notes ? `Notes: ${form.notes}` : '',
      '',
      '*Order Items:*',
      itemLines,
      '',
      '*Price Summary:*',
      `Subtotal: ₹${fmt(subtotal)}`,
      discount > 0 ? `Discount (${appliedCoupon.code}): −₹${fmt(discount)}` : '',
      `Shipping: ${shipping === 0 ? 'FREE' : `₹${shipping}`}`,
      `*Total: ₹${fmt(total)}*`,
    ].filter(Boolean).join('\n');

    const ownerWaUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines)}`;
    window.open(ownerWaUrl, '_blank');

    clearCart();
    setSuccessData({ name: form.name, phone: form.phone, total });
    setOrdered(true);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  if (ordered && successData) {
    return <OrderSuccess {...successData} />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-24 lg:pb-12">

      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">Checkout</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Your Cart</h1>
        <p className="text-sm text-slate-500 mt-1">{items.reduce((s, i) => s + i.qty, 0)} item{items.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

        {/* ── LEFT: Cart items + coupon ──────────────────────────────────── */}
        <div className="space-y-4">

          {/* Cart items */}
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-start gap-4 p-4 sm:p-5 ${idx !== 0 ? 'border-t border-slate-50' : ''}`}
              >
                {/* Icon placeholder */}
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {item.name.slice(0, 2)}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-sm font-semibold text-slate-900 hover:text-teal-700 transition-colors line-clamp-2 leading-snug"
                  >
                    {item.name}
                  </Link>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.brand} · SKU: {item.sku}</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">{item.price}</p>
                </div>

                {/* Qty + remove */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-xl px-1 py-0.5">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 transition-all text-sm font-medium"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-xs font-semibold text-slate-800 tabular-nums">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 transition-all text-sm font-medium"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs font-bold text-slate-800 tabular-nums">
                    ₹{fmt(item.priceNum * item.qty)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[11px] text-slate-400 hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-slate-900">Coupon Code</p>
              <button
                onClick={() => setCouponHint((v) => !v)}
                className="text-[11px] text-teal-600 hover:text-teal-700 font-medium transition-colors"
              >
                {couponHint ? 'Hide codes' : 'View available codes'}
              </button>
            </div>

            {couponHint && (
              <div className="mb-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Available Coupons</p>
                <div className="space-y-1.5">
                  {COUPONS.map((c) => (
                    <div key={c.code} className="flex items-center gap-2">
                      <button
                        onClick={() => { setCouponInput(c.code); setCouponError(''); }}
                        className="font-mono text-xs font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-md hover:bg-teal-100 transition-colors"
                      >
                        {c.code}
                      </button>
                      <span className="text-xs text-slate-500">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-teal-50 border border-teal-100 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="text-xs font-bold text-teal-700 font-mono">{appliedCoupon.code}</span>
                    <span className="text-xs text-teal-600 ml-2">−₹{fmt(appliedCoupon.discount)} saved</span>
                  </div>
                </div>
                <button onClick={removeCoupon} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                  placeholder="Enter coupon code"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono uppercase"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shrink-0"
                >
                  Apply
                </button>
              </div>
            )}
            {couponError && (
              <p className="text-xs text-red-500 mt-2">{couponError}</p>
            )}
          </div>

          {/* Checkout form */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5">
            <p className="text-sm font-semibold text-slate-900 mb-1">Delivery Details</p>
            <p className="text-xs text-slate-500 mb-5">We'll use this to dispatch your order and contact you.</p>

            <form id="checkout-form" onSubmit={handlePlaceOrder} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <Field label="Full Name *" error={errors.name}>
                  <input name="name" value={form.name} onChange={handleField} placeholder="Dr. Rahul Sharma" className={inputCls(errors.name)} />
                </Field>

                <Field label="WhatsApp / Phone *" error={errors.phone}>
                  <input name="phone" value={form.phone} onChange={handleField} placeholder="98765 43210" maxLength={10} className={inputCls(errors.phone)} />
                </Field>

                <Field label="Clinic / Hospital Name" className="sm:col-span-2">
                  <input name="clinic" value={form.clinic} onChange={handleField} placeholder="Sharma Dental Clinic" className={inputCls()} />
                </Field>

                <Field label="Delivery Address *" error={errors.address} className="sm:col-span-2">
                  <input name="address" value={form.address} onChange={handleField} placeholder="Street, Area, Landmark" className={inputCls(errors.address)} />
                </Field>

                <Field label="City *" error={errors.city}>
                  <input name="city" value={form.city} onChange={handleField} placeholder="Delhi" className={inputCls(errors.city)} />
                </Field>

                <Field label="State *" error={errors.state}>
                  <input name="state" value={form.state} onChange={handleField} placeholder="Delhi" className={inputCls(errors.state)} />
                </Field>

                <Field label="Pincode *" error={errors.pincode}>
                  <input name="pincode" value={form.pincode} onChange={handleField} placeholder="110075" maxLength={6} className={inputCls(errors.pincode)} />
                </Field>

                <Field label="Order Notes" className="">
                  <input name="notes" value={form.notes} onChange={handleField} placeholder="Urgent, specific packing, etc." className={inputCls()} />
                </Field>

              </div>
            </form>
          </div>
        </div>

        {/* ── RIGHT: Order summary + CTA (sticky on desktop) ─────────────── */}
        <div className="lg:sticky lg:top-24 space-y-4">

          {/* Price summary */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <p className="text-sm font-semibold text-slate-900 mb-4">Order Summary</p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-800">₹{fmt(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-teal-600">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span className="font-medium">−₹{fmt(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="font-medium text-emerald-600">FREE</span>
                ) : (
                  <span className="font-medium text-slate-800">₹{shipping}</span>
                )}
              </div>
              {shipping > 0 && (
                <p className="text-[11px] text-slate-400">
                  Add ₹{fmt(FREE_SHIPPING_THRESHOLD - afterDiscount)} more for free shipping
                </p>
              )}
            </div>

            <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-bold text-lg text-slate-900">₹{fmt(total)}</span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-50 flex flex-wrap gap-x-4 gap-y-2">
              {['GST Invoice', 'Authentic Products', 'Fast Dispatch'].map((b) => (
                <span key={b} className="flex items-center gap-1 text-[11px] text-slate-500">
                  <svg className="w-3 h-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Place order button */}
          <button
            type="submit"
            form="checkout-form"
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-teal-700 text-white font-semibold py-4 rounded-2xl text-sm transition-all active:scale-[0.98]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Place Order via WhatsApp
          </button>

          <p className="text-center text-[11px] text-slate-400 px-2">
            Clicking "Place Order" will open WhatsApp with your full order details. Our team will confirm your order within a few hours.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function inputCls(hasError = false) {
  return `w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
    hasError
      ? 'border-red-300 focus:ring-red-400'
      : 'border-slate-200 focus:ring-teal-500'
  }`;
}

function Field({ label, error, className = '', children }) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}
