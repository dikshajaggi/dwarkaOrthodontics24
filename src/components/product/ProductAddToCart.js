import AddToCartButton from '@/components/ui/AddToCartButton';

export default function ProductAddToCart({ product }) {
  return <AddToCartButton product={product} variant="detail" />;
}
