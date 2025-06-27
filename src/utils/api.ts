import axios from "axios";
import type { Product } from "../types/Products";

const apiProductsUrl = import.meta.env.VITE_PRODUCTS_GET_URL ?? "";

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await axios.get(`${apiProductsUrl}/${id}`);
  return res.data;
};
