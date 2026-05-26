import { brands } from '@/lib/mockData';
import { CONTACT } from '@/lib/mockData';

export default function BrandSection() {
  const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=Hi%2C%20I%20am%20looking%20for%20a%20specific%20brand.`;

  return (
    <section id="brands" className="py-16 sm:py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-2">Authorized Distributor</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            50+ premium brands in stock
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            All authentic, all authorized, ready to ship across India
          </p>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl py-5 px-3 hover:border-teal-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-slate-100 group-hover:bg-teal-50 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300">
                <span className="text-xs font-bold text-slate-400 group-hover:text-teal-700 transition-colors tracking-widest">
                  {brand.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-700 text-center leading-tight">{brand.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 tracking-wide">{brand.country}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-10">
          <p className="text-sm text-slate-500">
            Don&apos;t see a brand you need?{' '}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 font-medium hover:underline transition-colors"
            >
              WhatsApp us
            </a>{' '}
            and we&apos;ll source it for you.
          </p>
        </div>
      </div>
    </section>
  );
}
