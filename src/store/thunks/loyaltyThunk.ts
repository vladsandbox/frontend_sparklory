import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "@/api/axios.api";

export const loyaltyHistory = createAsyncThunk<any, void, { rejectValue: string }>(
    "loyalty/loayaltyHistory",
    async (_, { rejectWithValue }) => {
        try {
            const res = await instance.get("/loyalty/history");
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch loyalty history");
        }
    }
);

export const loyaltyBonus = createAsyncThunk<any, void, { rejectValue: string }>(
    "loyalty/loyaltyBonus",
    async (_, { rejectWithValue }) => {
        try {
            const res = await instance.get("/loyalty/bonus");
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch loyalty history");
        }
    }
);