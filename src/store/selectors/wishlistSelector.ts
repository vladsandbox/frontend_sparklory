import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";

export const selectWishlistIds = createSelector(
  (state: RootState) => state.wishlist.ids,
  (ids) => ids 
);
