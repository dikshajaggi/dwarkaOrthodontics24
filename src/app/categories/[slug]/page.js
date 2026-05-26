import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug, getProductsByCategory } from '@/lib/mockData';
import CategoryPageClient from '@/components/category/CategoryPageClient';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: 'Category Not Found' };
  return {
    title: `${category.name} — Orthodontic Supplies`,
    description: `Shop ${category.name.toLowerCase()} from top orthodontic brands. ${category.description}. GST invoices, pan India delivery.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const products = getProductsByCategory(slug);

  if (!category) notFound();

  return <CategoryPageClient category={category} products={products} />;
}
