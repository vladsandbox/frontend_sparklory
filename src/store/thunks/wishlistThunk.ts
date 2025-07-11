import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

import { instance } from "@/api/axios.api";
import { getLocalStorage } from "@/utils/localStorage";
import type { RootState } from "..";

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
  string,
  string,
  { rejectValue: string }
>(
  "wishlist/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await instance.delete(`${WISHLIST_BASE_URL}/${productId}`);
      toast.success("Product removed from favorites");
      return productId;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to remove product");
      return rejectWithValue(error.response?.data?.message || "Failed to remove product");
    }
  }
);

export const fetchWishlist = createAsyncThunk<string[], void, { rejectValue: string }>(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`${WISHLIST_BASE_URL}`);

      const ids = data.map((product: { _id: string }) => product._id);

      return ids;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const mergeLocalWishlist = createAsyncThunk<void, void, { state: RootState }>(
  "wishlist/mergeLocalWishlist",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const localIds = getLocalStorage<string[]>("wishlist", []);
      const { ids: backendIds } = getState().wishlist;

      const idsToAdd = localIds.filter((id) => !backendIds.includes(id));

      await Promise.all(
        idsToAdd.map((id) => instance.post(`${WISHLIST_BASE_URL}/${id}`))
      );

      await dispatch(fetchWishlist());
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.warn("Unauthorized during mergeLocalWishlist — skipping merge.");
        return;
      }
      return rejectWithValue(error.message || "Error merging wishlist");
    }
  }
);
