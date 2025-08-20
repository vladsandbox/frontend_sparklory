export const formatPrice = (price: number | string | undefined) => {
  if (typeof price === "number") return `${price} ₴`;
  if (typeof price === "string") return price;
  return "0 ₴";
};