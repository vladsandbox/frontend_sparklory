export const formatPrice = (price: number | string | undefined): string => {
  if (typeof price === "number") {
    const rounded = Number(price.toFixed(2));
    return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(2)} ₴`;
  }

  if (typeof price === "string") {
    const num = Number(price);
    if (!isNaN(num)) {
      const rounded = Number(num.toFixed(2));
      return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(2)} ₴`;
    }
    return price;
  }

  return "0 ₴";
};