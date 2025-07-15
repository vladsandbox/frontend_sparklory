export type Review = {
  name: string;
  avatar: string;
  text: string;
  rating: number;
  createdAt: string;
  image?: string[];
  _id?: string;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  engraving: boolean;
  image: string[];
  action: string[] | null;
  reviews: Review[];
  prod_collection?: string;
  discount: number;
  discountEnd?: string;
  discountStart?: string;
  variants: ProductVariant[];
  gender: string;
  subcategory: string[];
  details: string[];
};

export type ProductVariant = {
  material: string;
  price: number;
  inStock: number;
  size: string;
  insert: string;
}
