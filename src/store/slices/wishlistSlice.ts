import { createSlice } from "@reduxjs/toolkit";
import { toggleWishlist, fetchWishlist } from "../thunks/wishlistThunk";

interface WishlistState {
    ids: string[];
    loading: boolean;
    error: string;
}

const initialState: WishlistState = {
    ids: [],
    loading: false,
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
                    if (!state.ids.includes(productId)) state.ids.push(productId);
                } else {
                    state.ids = state.ids.filter((id) => id !== productId);
                }
            })
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.ids = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load wishlist";
            })
    },
});

export default wishlistSlice.reducer;