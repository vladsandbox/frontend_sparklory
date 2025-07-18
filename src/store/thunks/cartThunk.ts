import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { instance } from "@/api/axios.api";
import { getGuestId } from "@/utils/guestId";
import type { CartItem, RemoveCartPayload } from "@/types/Cart";

const CART_GET_URL = import.meta.env.VITE_CART_GET_URL;
const CART_POST_URL = import.meta.env.VITE_CART_POST_URL;
const CART_REMOVE_URL = import.meta.env.VITE_CART_REMOVE_URL;

const CART_GET_GUEST_URL = import.meta.env.VITE_CART_GET_GUEST_URL;
const CART_POST_GUEST_URL = import.meta.env.VITE_CART_POST_GUEST_URL;
const CART_REMOVE_GUEST_URL = import.meta.env.VITE_CART_REMOVE_GUEST_URL;

export const fetchCartProducts = createAsyncThunk<CartItem[], { guest?: boolean }>(
  "cart/fetchCartProducts",
  async ({ guest = false } = {}, { rejectWithValue }) => {
    try {
      const url = guest ? CART_GET_GUEST_URL : CART_GET_URL;
      const config = guest ? { params: { guestId: getGuestId() } } : {};
      const res = await instance.get(url, config);
      return res.data.items;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
    }
  }
);

export const addToCart = createAsyncThunk<
  CartItem[],
  {
    guest?: boolean;
    productId: string;
    quantity: number;
    size: string;
    material: string;
    insert: string;
  },
  { rejectValue: string }
>(
  "cart/addToCart",
  async ({ guest = false, ...data }, { rejectWithValue }) => {
    try {
      const url = guest ? CART_POST_GUEST_URL : CART_POST_URL;
      const payload = guest ? { ...data, guestId: getGuestId() } : data;
      const res = await instance.post(url, payload);
      toast.success("Product added to cart");
      return res.data.items;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
      return rejectWithValue(err.response?.data?.message || "Failed to add to cart");
    }
  }
);

export const removeCartItem = createAsyncThunk<
  CartItem[],
  RemoveCartPayload,
  { rejectValue: string }
>(
  "cart/removeCartItem",
  async ({ guest = false, productId, size, material, insert }, { rejectWithValue }) => {
    try {
      const url = guest ? CART_REMOVE_GUEST_URL : CART_REMOVE_URL;
      const payload = guest
        ? { productId, size, material, insert, guestId: getGuestId() }
        : { productId, size, material, insert };
      const res = await instance.post(url, payload);
      toast.success("Product removed from cart");
      return res.data.items;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to remove from cart");
      return rejectWithValue(err.response?.data?.message || "Failed to remove from cart");
    }
  }
);

export const updateCartQuantity = createAsyncThunk<
  CartItem[],
  { guest?: boolean; productId: string; quantity: number; size: string; material: string; insert: string },
  { rejectValue: string }
>(
  "cart/updateCartQuantity",
  async ({ guest = false, productId, quantity, size, material, insert }, { rejectWithValue }) => {
    try {
      const url = guest ? CART_POST_GUEST_URL : CART_POST_URL;
      const payload = guest
        ? { productId, quantity, size, material, insert, guestId: getGuestId() }
        : { productId, quantity, size, material, insert };
      const res = await instance.post(url, payload);
      toast.success("Cart updated");
      return res.data.items;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update cart");
      return rejectWithValue(err.response?.data?.message || "Failed to update cart");
    }
  }
);