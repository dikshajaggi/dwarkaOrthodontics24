import { Geist } from 'next/font/google';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartHydrator from '@/components/layout/CartHydrator';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: 'Dwarka Orthodontics — Premium Orthodontic Supplies',
    template: '%s | Dwarka Orthodontics',
  },
  description:
    'India\'s trusted supplier of premium orthodontic brackets, wires, pliers, instruments, and consumables. GST invoices, pan India delivery, 5000+ clinics served.',
  keywords: ['orthodontic supplies', 'orthodontic brackets', 'dental instruments', 'orthodontic wires', 'dental supplier India', 'orthodontic pliers'],
  openGraph: {
    title: 'Dwarka Orthodontics — Premium Orthodontic Supplies',
    description: 'Orthodontic supplier trusted by 5000+ clinics across India. GST invoices, fast shipping, authentic products.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col antialiased bg-white text-slate-900">
        <CartHydrator />
        {/* <AnnouncementBar /> */}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
