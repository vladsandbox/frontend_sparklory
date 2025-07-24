import { instance } from "@/api/axios.api.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "@/types/Categories";

const apiCategoriesUrl = import.meta.env.VITE_CATEGORIES_URL ?? "";

/**
 * Fetches all categories (Category[]) along with their nested subcategories (Subcategory[]),
 * or rejects with an error message (string)
 */
export const fetchCategories = createAsyncThunk<
    Category[],
    void,
    { rejectValue: string }
>(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await instance.get(apiCategoriesUrl);
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            return rejectWithValue(message);
        }
    }
);

/**
 * Takes a category identifier (string), fetches that category (Category[]) and its nested subcategories (Subcategory[]),
 * or rejects with an error message (string)
 */
export const fetchCategory = createAsyncThunk<
    Category,
    string,
    { rejectValue: string }
>(
    "categories/fetchCategory",
    async (category, { rejectWithValue }) => {
        try {
            const response = await instance.get(`${apiCategoriesUrl}/${category}`);
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            return rejectWithValue(message);
        }
    }
);