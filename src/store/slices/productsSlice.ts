import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Products";
import { fetchProducts } from "../thunks/productsThunk";

type ProductState = {
    products: Product[],
    loading: boolean;
    error: string;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: '',
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch Products";
            })
    },
});

export default productsSlice.reducer;