import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  fetchCartProducts,
  addToCart,
  removeCartItem,
  updateCartQuantity,
  applyCoupon
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
  appliedCoupon: string | null
};

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  firstAmount: 0,
  finalAmount: 0,
  totalDiscount: 0,
  appliedCoupon: null
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
        state.appliedCoupon = action.payload.appliedCoupon || null;
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
        state.appliedCoupon = action.payload.appliedCoupon || null;
      })
      .addCase(removeCartItem.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.items = action.payload.items;
        state.firstAmount = action.payload.firstAmount;
        state.finalAmount = action.payload.finalAmount;
        state.totalDiscount = action.payload.totalDiscount;
        state.appliedCoupon = action.payload.appliedCoupon || null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.items = action.payload.items;
        state.firstAmount = action.payload.firstAmount;
        state.finalAmount = action.payload.finalAmount;
        state.totalDiscount = action.payload.totalDiscount;
        state.appliedCoupon = action.payload.appliedCoupon || null;
      })
      .addCase(applyCoupon.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.items = action.payload.items;
        state.firstAmount = action.payload.firstAmount;
        state.finalAmount = action.payload.finalAmount;
        state.totalDiscount = action.payload.totalDiscount;
        state.appliedCoupon = action.payload.appliedCoupon || null;
      })
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;
export const selectCartCount = (state: RootState) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0);

export default cartSlice.reducer;
