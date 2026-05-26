import HeroSection from '@/components/home/HeroSection';
import SearchSection from '@/components/home/SearchSection';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TrustSection from '@/components/home/TrustSection';
// import BrandSection from '@/components/home/BrandSection';

export const metadata = {
  title: 'Dwarka Orthodontics — Premium Orthodontic Supplies',
  description:
    'India\'s trusted supplier of premium orthodontic brackets, wires, pliers, instruments, and consumables. GST invoices, pan India delivery, 5000+ clinics served.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <CategorySection />
      <FeaturedProducts />
      <TrustSection />
      {/* <BrandSection /> */}
    </>
  );
}
