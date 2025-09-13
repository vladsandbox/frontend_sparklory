export interface LoyaltyItem {
  _id: string;
  product: string;
  quantity: number;
  size: string;
  material: string;
  insert: string;
  firstPrice: number;
  discount: number;
  priceWithDiscount: number;
  img?: string;
}

export interface LoyaltyOrder {
  _id: string;
  userId: string;
  amount: number;
  date: string;
  description: string;
  orderId: string;
  items: LoyaltyItem[];
  earnedBonus: number;
  appliedBonusPercent: number;
  createdAt: string;
  updatedAt: string;
}

export type LoyaltyHistoryResponse = LoyaltyOrder[];

export interface LoyaltyBonusResponse {
  bonusBalance: number;
}
