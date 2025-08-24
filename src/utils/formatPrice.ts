export const formatPrice = (price: number | undefined) => {
  if (price === undefined) return "0 ₴";
  if (price === 0) return "Free";

  return Number.isInteger(price)
    ? `${price} ₴`
    : `${price.toFixed(2)} ₴`;
};

export const normalizePrice = (price: number): number => {
  return Math.round((price + Number.EPSILON) * 100) / 100;
};