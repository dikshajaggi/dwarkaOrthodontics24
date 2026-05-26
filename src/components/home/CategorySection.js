import Link from 'next/link';
import { categories } from '@/lib/mockData';

export default function CategorySection() {
  return (
    <section id="categories" className="py-16 sm:py-24 px-4 bg-teal-600">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 sm:mb-12">
          <div>
            <p className="text-xl font-semibold text-slate-950 uppercase tracking-widest mb-2">Categories</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
              Everything your clinic needs
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative flex flex-col bg-white border border-slate-100 rounded-2xl shadow-lg overflow-hidden hover:border-slate-950 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Background image — top half, fades into white */}
              <div
                className="absolute inset-x-0 top-0 h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${category.image})`,
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  opacity: 0.32,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full p-5">
                <div className="h-9 mb-4" />
                <h3 className="font-bold text-slate-900 text-base leading-tight mb-1.5">
                  {category.name}
                </h3>
                {/* <div className="flex items-center justify-between mt-auto">
                  <p className="text-[12px] text-slate-800">{category.productCount} products</p>
                  <svg
                    className="w-3.5 h-3.5 text-slate-200 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div> */}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="#"
            className="text-sm font-medium text-slate-600 border border-slate-200 bg-white px-5 py-2.5 rounded-xl inline-block hover:border-slate-300 transition-colors"
          >
            View all categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
