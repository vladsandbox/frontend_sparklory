export type CartItem = {
  product: string;
  quantity: number;
  size: string;
  material: string;
  insert: string;
  price: number;
};

export type CartResponse = {
  items: CartItem[];
  preTotal: number;
  finalTotal: number;
  appliedCoupon: string;
  appliedBonus: number;
};

export type RemoveCartPayload = {
  guest?: boolean;
  productId: string;
  size: string;
  material: string;
  insert: string;
}