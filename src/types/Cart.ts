export type CartItem = {
  product: string;
  quantity: number;
  size: string;
  material: string;
  insert: string;
  firstPrice: number;
  discount: number;
  priceWithDiscount: number;
};

export type CartResponse = {
  items: CartItem[];
  preTotal: number;
  finalTotal: number;
  firstAmount: number;
  totalDiscount: number;
  amountWithDiscount: number;
  finalAmount: number;
};

export type RemoveCartPayload = {
  guest?: boolean;
  productId: string;
  size: string;
  material: string;
  insert: string;
}