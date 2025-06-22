import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Products";
import { fetchProducts, getProductById } from "../thunks/productsThunk";

type ProductState = {
    products: Product[];
    loading: boolean;
    error: string;
    singleProduct: Product | null;
};

const initialState: ProductState = {
    products: [],
    loading: false,
    error: "",
    singleProduct: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
                state.error = "";
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch products";
            })

            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.singleProduct = null;
                state.error = "";
            })
            .addCase(getProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.singleProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch product";
            });
    },
});

export default productsSlice.reducer;