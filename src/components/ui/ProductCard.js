import Link from 'next/link';
import { CONTACT } from '@/lib/mockData';
import AddToCartButton from '@/components/ui/AddToCartButton';
import Image from 'next/image';

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ProductCard({ product }) {
  const waMessage = encodeURIComponent(
    `Hi, I am interested in: ${product.name} (SKU: ${product.sku}). Please share availability and pricing.`
  );
  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`;

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-slate-200 hover:-translate-y-0.5 transition-all duration-300 flex flex-col">

      {/* Image / visual area */}
      <Link href={`/products/${product.slug}`} className="block relative overflow-hidden">
        <div className={`w-full aspect-square bg-gradient-to-br ${product.gradient} flex items-center justify-center relative`}>
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
            <span className={`text-6xl font-black ${product.iconColor} opacity-[0.10] select-none`}>
              {product.sku.split('-')[0]}
            </span>
          )}
          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/[0.04] transition-all duration-300" />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.bestSeller && (
            <span className="bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase">
              Best Seller
            </span>
          )}
          {product.newArrival && (
            <span className="bg-teal-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase">
              New
            </span>
          )}
          {product.trending && !product.bestSeller && !product.newArrival && (
            <span className="bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase">
              Trending
            </span>
          )}
        </div>
      </Link>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-2 hover:text-teal-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-semibold text-slate-700 mb-1">{product.price}</p>
        <p className="text-[11px] text-slate-400 mb-3 line-clamp-1">{product.shortSpecs}</p>

        {/* CTAs */}
        <div className="flex gap-2 mt-auto items-end">
          <AddToCartButton product={product} variant="card" />
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 px-3 rounded-xl transition-all shrink-0"
            aria-label="WhatsApp enquiry"
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
