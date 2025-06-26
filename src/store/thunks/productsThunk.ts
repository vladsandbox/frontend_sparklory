import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product, Review } from "../../types/Products";

type FetchReviewsResponse = {
    reviews: Review[];
    total: number;
};

const apiProductsUrl = process.env.REACT_APP_PRODUCTS_GET_URL ?? "";

export const fetchProducts = createAsyncThunk<
    Product[],
    void,
    { rejectValue: string }
>(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiProductsUrl);
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            return rejectWithValue(message);
        }
    }
);

export const getProductById = createAsyncThunk<
    Product,
    string,
    { rejectValue: string }
>(
    "products/getProductById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTS_GET_URL}/${id}`);
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            return rejectWithValue(message);
        }
    }
);

export const fetchAllProductReviews = createAsyncThunk<Review[], string>(
    "products/fetchAllProductReviews",
    async (productId: string) => {
        const res = await fetch(`${apiProductsUrl}/${productId}/reviews`);
        const data = await res.json();
        return data.reviews;
    }
);

export const fetchProductReviews = createAsyncThunk<
    FetchReviewsResponse,
    { productId: string; page: number; limit?: number },
    { rejectValue: string }
>(
    "products/fetchProductReviews",
    async ({ productId, page, limit = 3 }, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${apiProductsUrl}/${productId}/reviews?limit=${limit}&page=${page}`
            );
            return res.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            return rejectWithValue(message);
        }
    }
);

export const postProductReview = createAsyncThunk<
    Review,
    { productId: string; review: Omit<Review, "_id"> },
    { rejectValue: string }
>(
    "products/postProductReview",
    async ({ productId, review }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${apiProductsUrl}/${productId}/reviews`, review);
            return res.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            return rejectWithValue(message);
        }
    }
);