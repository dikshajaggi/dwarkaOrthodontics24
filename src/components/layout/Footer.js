import Link from 'next/link';
import { CONTACT, categories } from '@/lib/mockData';

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=Hi%2C%20I%27m%20interested%20in%20your%20orthodontic%20products.`;

  return (
    <footer className="bg-slate-950 text-slate-400">

      {/* CTA Strip */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                Need a bulk quote or custom order?
              </h3>
              <p className="text-slate-400 text-sm">
                We supply to clinics, hospitals, and dental colleges across India
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap"
              >
                <WhatsAppIcon />
                WhatsApp Us
              </a>
              <a
                href={CONTACT.phoneRaw}
                className="flex items-center gap-2 border border-slate-700 hover:border-slate-500 hover:text-white text-slate-400 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-slate-950 font-bold text-xs tracking-widest">DO</span>
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-teal-500 rounded-full border-2 border-slate-950" />
              </div>
              <span className="text-white font-semibold text-sm">Dwarka Orthodontics</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              India&apos;s trusted B2B supplier of premium orthodontic instruments, brackets, wires, and consumables. Serving clinics and dental colleges for over 20 years.
            </p>
            <div className="space-y-2.5 text-xs">
              <p className="flex items-start gap-2.5">
                <span className="text-teal-500 shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="text-slate-500">{CONTACT.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-teal-500 shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <a href={`mailto:${CONTACT.email}`} className="text-slate-500 hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-teal-500 shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <a href={CONTACT.phoneRaw} className="text-slate-500 hover:text-white transition-colors">
                  {CONTACT.phone}
                </a>
              </p>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-tight">Product Categories</h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-tight">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="text-slate-500 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#categories" className="text-slate-500 hover:text-white transition-colors">All Categories</Link></li>
              <li><Link href="#featured" className="text-slate-500 hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="#brands" className="text-slate-500 hover:text-white transition-colors">Brands We Stock</Link></li>
              <li><Link href="#trust" className="text-slate-500 hover:text-white transition-colors">Why Choose Us</Link></li>
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                  Request a Quote
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-slate-500 hover:text-white transition-colors">
                  Bulk / B2B Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Trust */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-tight">Get in Touch</h4>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all mb-5"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
            <div className="space-y-2.5 text-xs">
              {[
                'GST Registered Supplier',
                'GST Invoice on Every Order',
                'Pan India Delivery',
                '100% Authentic Products',
              ].map((item) => (
                <p key={item} className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-teal-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-500">{item}</span>
                </p>
              ))}
            </div>
            <div className="mt-5 p-3 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">GST Number</p>
              <p className="text-xs text-slate-400 font-mono">{CONTACT.gst}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-900 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600">
          <p>© 2025 Dwarka Orthodontics. All rights reserved. · New Delhi, India</p>
          {/* <p>B2B Orthodontic Supplies · GST Compliant</p> */}
        </div>
      </div>
    </footer>
  );
}
