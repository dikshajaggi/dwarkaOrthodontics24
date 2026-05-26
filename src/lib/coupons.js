export const COUPONS = [
  { code: 'FIRST10', type: 'percent', value: 10, minOrder: 500, label: '10% off your first order' },
  { code: 'BULK15', type: 'percent', value: 15, minOrder: 3000, label: '15% off orders above ₹3,000' },
  { code: 'FLAT500', type: 'fixed', value: 500, minOrder: 2500, label: '₹500 off orders above ₹2,500' },
  { code: 'DENTAL20', type: 'percent', value: 20, minOrder: 2000, label: '20% off orders above ₹2,000' },
];

export function applyCoupon(code, subtotal) {
  const coupon = COUPONS.find((c) => c.code === code.toUpperCase().trim());
  if (!coupon) return { valid: false, error: 'Invalid coupon code' };
  if (subtotal < coupon.minOrder) {
    return {
      valid: false,
      error: `Minimum order ₹${coupon.minOrder.toLocaleString('en-IN')} required for this coupon`,
    };
  }
  const discount =
    coupon.type === 'percent'
      ? Math.round((subtotal * coupon.value) / 100)
      : coupon.value;
  return { valid: true, discount, label: coupon.label, code: coupon.code };
}
