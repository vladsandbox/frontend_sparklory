import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  fetchCartProducts,
  addToCart,
  removeCartItem,
  updateCartQuantity,
} from "../thunks/cartThunk";
import type { RootState } from "..";
import type { CartItem, CartResponse } from "@/types/Cart";

type CartState = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  firstAmount: number;
  finalAmount: number;
  totalDiscount: number;
};

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  firstAmount: 0,
  finalAmount: 0,
  totalDiscount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchCartProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.loading = false;
        state.items = action.payload.items;
        state.firstAmount = action.payload.firstAmount;
        state.finalAmount = action.payload.finalAmount;
        state.totalDiscount = action.payload.totalDiscount;
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.items = action.payload.items;
        state.firstAmount = action.payload.firstAmount;
        state.finalAmount = action.payload.finalAmount;
        state.totalDiscount = action.payload.totalDiscount;
      })
      .addCase(removeCartItem.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.items = action.payload.items;
        state.firstAmount = action.payload.firstAmount;
        state.finalAmount = action.payload.finalAmount;
        state.totalDiscount = action.payload.totalDiscount;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.items = action.payload.items;
        state.firstAmount = action.payload.firstAmount;
        state.finalAmount = action.payload.finalAmount;
        state.totalDiscount = action.payload.totalDiscount;
      });
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;
