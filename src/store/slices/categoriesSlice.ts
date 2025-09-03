import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "@/types/Categories";
import { fetchCategories, fetchCategory } from "../thunks/categoriesThunk";

type CategoryState = {
    categories: Category[];
    loading: boolean;
    error: string;
    singleCategory: Category | null;
};

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: "",
    singleCategory: null
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // All categories, including their nested subcategories.
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.loading = false;
                state.categories = action.payload;
                state.error = "";
            })
            .addCase(fetchCategories.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch categories";
            })

            // A single category that contains its own subcategories.
            .addCase(fetchCategory.pending, (state) => {
                state.loading = true;
                state.singleCategory = null;
                state.error = "";
            })
            .addCase(fetchCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.loading = false;
                state.singleCategory = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch category";
            })
    },
});

export default categoriesSlice.reducer;