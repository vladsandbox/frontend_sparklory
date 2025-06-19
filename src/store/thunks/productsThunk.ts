import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/Products";

const apiProductsUrl = process.env.REACT_APP_PRODUCTS_GET_URL ?? "";

export const fetchProducts = createAsyncThunk<
    Product[],         // что вернёт thunk
    void,              // аргументы (здесь ничего)
    { rejectValue: string } // тип ошибки
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
