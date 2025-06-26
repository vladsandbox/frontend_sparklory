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
  material: string;
  engraving: boolean;
  price: number;
  image: string[];
  inStock: boolean;
  action: string[] | null;
  reviews: Review[];
};
