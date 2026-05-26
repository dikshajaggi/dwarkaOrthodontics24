import Link from 'next/link';
import { CONTACT } from '@/lib/mockData';

const stats = [
  { value: '20+', label: 'Years in Business' },
  { value: '5,000+', label: 'Clinics Served' },
  { value: '50+', label: 'Premium Brands' },
  { value: 'Same Day', label: 'Dispatch Available' },
];

const trustBadges = [
  'GST Invoice on Every Order',
  '100% Authentic Products',
  'Pan India Delivery',
  'Dedicated B2B Support',
];

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function HeroSection() {
  const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=Hi%2C%20I%27m%20a%20dentist%20looking%20to%20order%20orthodontic%20supplies.`;

  return (
    <section className="relative bg-slate-950 overflow-hidden">
      {/* Dot grid background */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-teal-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">

        {/* Live badge */}
        <div className="inline-flex items-center gap-2.5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
          </span>
          <span className="text-xs font-medium text-teal-400 tracking-wide">
            Trusted by orthodontists across India
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
          India&apos;s Premier<br />
          <span className="text-teal-400">Orthodontic</span>{' '}
          Supplier
        </h1>

        {/* Subheading */}
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {/* Premium brackets, wires, instruments, and consumables — delivered to your clinic with GST invoices and expert B2B support. */}
          Premium brackets, wires, pliers and other intruments — delivered to your clinic with GST invoices and expert B2B support.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Link
            href="#categories"
            className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-900 font-semibold px-7 py-3.5 rounded-xl text-sm transition-all"
          >
            Browse Catalogue
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all"
          >
            <WhatsAppIcon />
            WhatsApp Order
          </a>
          <a
            href={CONTACT.phoneRaw}
            className="w-full sm:w-auto text-slate-500 hover:text-slate-300 text-sm font-medium py-3.5 px-5 rounded-xl border border-slate-800 hover:border-slate-600 transition-all"
          >
            {CONTACT.phone}
          </a>
        </div>

        {/* Stats */}
        <div className="border-t border-slate-800/60 pt-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
            >
              <svg className="w-3 h-3 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[11px] text-slate-400">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
