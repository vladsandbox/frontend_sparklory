import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { instance } from "@/api/axios.api";

const WISHLIST_BASE_URL = import.meta.env.VITE_APP_WISHLIST_BASE_URL;

export const toggleWishlist = createAsyncThunk<
  { productId: string; isFavorite: boolean },
  { productId: string; isFavorite: boolean },
  { rejectValue: string }
>(
  "wishlist/toggleWishlist",
  async ({ productId, isFavorite }, { rejectWithValue }) => {
    try {
      if (isFavorite) {
        await instance.post(`${WISHLIST_BASE_URL}/${productId}`);
      } else {
        await instance.delete(`${WISHLIST_BASE_URL}/${productId}`);
      }
      return { productId, isFavorite };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteWishlistProduct = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>(
  "wishlist/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await instance.delete(`${WISHLIST_BASE_URL}/${productId}`);
      toast.success("Product removed from favorites");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to remove product");
      return rejectWithValue(error.response?.data?.message || "Failed to remove product");
    }
  }
);

export const fetchWishlist = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
  try {
    const { data } = await instance.get(`${WISHLIST_BASE_URL}`);
    return data.wishlist as string[];
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});