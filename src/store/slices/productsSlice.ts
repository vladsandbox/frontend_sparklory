import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, Review } from "../../types/Products";
import { fetchProducts, getProductById, fetchProductReviews, fetchAllProductReviews } from "../thunks/productsThunk";

type ProductState = {
    products: Product[];
    loading: boolean;
    error: string;
    singleProduct: Product | null;

    reviews: Review[];
    allReviews: Review[];
    reviewsTotal: number;
    reviewsLoading: boolean;
    reviewsError: string;
};

const initialState: ProductState = {
    products: [],
    loading: false,
    error: "",
    singleProduct: null,

    reviews: [],
    allReviews: [],
    reviewsTotal: 0,
    reviewsLoading: false,
    reviewsError: "",
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
            })
            .addCase(fetchProductReviews.pending, (state) => {
                state.reviewsLoading = true;
                state.reviewsError = "";
            })
            .addCase(fetchProductReviews.fulfilled, (state, action: PayloadAction<{ reviews: Review[]; total: number }>) => {
                state.reviewsLoading = false;
                state.reviews = action.payload.reviews;
                state.reviewsTotal = action.payload.total;
            })
            .addCase(fetchProductReviews.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.reviewsLoading = false;
                state.reviewsError = action.payload || "Failed to fetch reviews";
            })
            .addCase(fetchAllProductReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
                state.allReviews = action.payload;
            })
            .addCase(fetchAllProductReviews.rejected, (state) => {
                state.allReviews = [];
            })
},
});

export default productsSlice.reducer;