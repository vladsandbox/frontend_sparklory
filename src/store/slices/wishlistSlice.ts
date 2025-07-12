import { createSlice } from "@reduxjs/toolkit";

import {
    toggleWishlist,
    fetchWishlist,
    deleteWishlistProduct,
    mergeLocalWishlist,
} from "../thunks/wishlistThunk";
import { setLocalStorage } from "@/utils/localStorage";

interface WishlistState {
    ids: string[];
    loading: boolean;
    merging: boolean;
    error: string;
}

const initialState: WishlistState = {
    ids: [],
    loading: false,
    merging: false,
    error: "",
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(toggleWishlist.fulfilled, (state, action) => {
                const { productId, isFavorite } = action.payload;

                if (isFavorite) {
                    if (!state.ids.includes(productId)) {
                        state.ids.push(productId);
                    }
                } else {
                    state.ids = state.ids.filter((id) => id !== productId);
                }

                setLocalStorage("wishlist", state.ids);
            })
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                const uniqueIds = Array.from(new Set(action.payload));
                state.ids = uniqueIds;
                setLocalStorage("wishlist", uniqueIds);
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load wishlist";
            })
            .addCase(deleteWishlistProduct.fulfilled, (state, action) => {
                const productId = action.payload;
                state.ids = state.ids.filter((id) => id !== productId);
                setLocalStorage("wishlist", state.ids);
            })
            .addCase(mergeLocalWishlist.pending, (state) => {
                state.merging = true;
            })
            .addCase(mergeLocalWishlist.fulfilled, (state) => {
                state.merging = false;
            })
            .addCase(mergeLocalWishlist.rejected, (state) => {
                state.merging = false;
            });
    },
});

export default wishlistSlice.reducer;
