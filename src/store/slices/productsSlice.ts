import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product, Review } from "@/types/Products";
import type { PaginatedProductsResponse } from "@/types/Pagination";
import {
    fetchProducts,
    getProductById,
    fetchProductReviews,
    fetchAllProductReviews,
    fetchProductActions,
    fetchSearchResults
} from "../thunks/productsThunk";

type ProductState = {
    data: PaginatedProductsResponse;
    loading: boolean;
    error: string;

    singleProduct: Product | null;
    singleProductLoading: boolean;
    singleProductError: string;

    reviews: Review[];
    allReviews: Review[];
    reviewsTotal: number;
    reviewsLoading: boolean;
    reviewsError: string;

    actionProducts: Record<string, Product[]>;
    actionLoading: Record<string, boolean>;
    actionError: Record<string, string>;

    searchResults: Product[];
    searchLoading: boolean;
    searchError: string;
};

const initialState: ProductState = {
    data: {
        total: 0,
        page: 1,
        limit: 16,
        pages: 1,
        products: [],
    },
    loading: false,
    error: "",

    singleProduct: null,
    singleProductLoading: false,
    singleProductError: "",

    reviews: [],
    allReviews: [],
    reviewsTotal: 0,
    reviewsLoading: false,
    reviewsError: "",

    actionProducts: {},
    actionLoading: {},
    actionError: {},

    searchResults: [],
    searchLoading: false,
    searchError: '',
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearSearchResults(state) {
            state.searchResults = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<PaginatedProductsResponse>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch products";
            })
            .addCase(getProductById.pending, (state) => {
                state.singleProductLoading = true;
                state.singleProduct = null;
                state.singleProductError = "";
            })
            .addCase(getProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.singleProductLoading = false;
                state.singleProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.singleProductLoading = false;
                state.singleProductError = action.payload ?? "Failed to fetch product";
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
            .addCase(fetchProductActions.pending, (state, action) => {
                const actionName = action.meta.arg.action;
                state.actionLoading[actionName] = true;
                state.actionError[actionName] = "";
            })
            .addCase(fetchProductActions.fulfilled, (state, action) => {
                const actionName = action.meta.arg.action;
                state.actionLoading[actionName] = false;
                state.actionProducts[actionName] = action.payload;
            })
            .addCase(fetchProductActions.rejected, (state, action) => {
                const actionName = action.meta.arg.action;
                state.actionLoading[actionName] = false;
                state.actionError[actionName] = action.payload ?? "Failed to fetch action products";
            })
            .addCase(fetchSearchResults.pending, (state) => {
                state.searchLoading = true;
                state.searchError = "";
            })
            .addCase(fetchSearchResults.fulfilled, (state, action: PayloadAction<PaginatedProductsResponse>) => {
                state.searchLoading = false;
                state.searchResults = action.payload.products;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError = action.payload ?? "Failed to fetch search results";
            });
    },
});

export const { clearSearchResults } = productsSlice.actions;
export default productsSlice.reducer;