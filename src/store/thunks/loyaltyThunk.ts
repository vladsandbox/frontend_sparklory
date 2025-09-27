import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "@/api/axios.api";
import type { LoyaltyHistoryResponse, LoyaltyBonusResponse } from "@/types/Loyalty";

export const loyaltyHistory = createAsyncThunk<LoyaltyHistoryResponse, void, { rejectValue: string }>(
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

export const loyaltyBonus = createAsyncThunk<LoyaltyBonusResponse, void, { rejectValue: string }>(
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