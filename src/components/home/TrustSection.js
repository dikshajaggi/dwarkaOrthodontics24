"use client";

import { useEffect, useRef, useState } from "react";

// ── Counter Hook ──────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf;
    const startTime = performance.now();
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(easeOutExpo(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

// ── Animated Stat ─────────────────────────────────────────────────────────────
function AnimatedStat({ value, label, started }) {
  const cleaned = value.replace(/,/g, "");
  const match = cleaned.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
  const prefix = match?.[1] ?? "";
  const numeric = parseInt(match?.[2] ?? "0", 10);
  const suffix = match?.[3] ?? "";

  const count = useCountUp(numeric, 1800, started);

  return (
    <div className="px-4">
      <p className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-1.5 tabular-nums">
        {prefix}{count.toLocaleString("en-US")}{suffix}
      </p>
      <p className="text-[11px] text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const trustPoints = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '100% Authentic Products',
    desc: 'We source directly from authorized distributors. No counterfeits, no grey-market products.',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
      </svg>
    ),
    title: 'GST Invoice on Every Order',
    desc: 'Registered GST supplier. Proper tax invoices for all purchases — fully compliant for clinic accounting.',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'Pan India Shipping',
    desc: 'Fast delivery to all major cities and towns. Same-day dispatch for orders placed before 2 PM.',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '20+ Years in Business',
    desc: 'Established orthodontic supplier with deep product knowledge and relationships with top global brands.',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: '5,000+ Clinics Served',
    desc: 'Trusted by orthodontists, dental colleges, and multi-chain clinics across 200+ cities in India.',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Expert Support',
    desc: 'Dedicated support team available on WhatsApp and phone for product queries, bulk pricing, and order tracking.',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
];

const bigStats = [
  { value: '20+', label: 'Years in business' },
  { value: '5,000+', label: 'Clinics served' },
  { value: '50+', label: 'Premium brands' },
  { value: '200+', label: 'Cities covered' },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function TrustSection() {
  const statsRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="trust" className="py-16 sm:py-24 px-4 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto">

        {/* Large stats strip */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center mb-16 p-10 sm:mb-20 bg-slate-950"
        >
          {bigStats.map((s) => (
            <AnimatedStat key={s.label} {...s} started={started} />
          ))}
        </div>

        {/* Divider */}
        <div className="fade-divider mb-12 sm:mb-16" />

        {/* Section heading */}
        <div className="text-center mb-10">
          <p className="text-xl font-semibold text-teal-600 uppercase tracking-widest mb-2">Why Choose Us</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Built for dental professionals
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
            We understand what your clinic needs — authentic products, reliable supply, and seamless ordering.
          </p>
        </div>

        {/* Trust cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all bg-white"
            >
              <div className={`w-10 h-10 rounded-xl ${point.iconBg} flex items-center justify-center shrink-0 ${point.iconColor}`}>
                {point.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-sm">{point.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}