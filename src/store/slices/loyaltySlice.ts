import { createSlice } from "@reduxjs/toolkit";
import { loyaltyBonus, loyaltyHistory } from "@/store/thunks/loyaltyThunk.ts";

type LoyaltyState = {
    historyOrders: any[];
    bonus: number;
    loading: boolean;
    error: string | null;
};
const initialState: LoyaltyState = {
    historyOrders: [],
    bonus: 0,
    loading: false,
    error: null,
};
const loyaltySlice = createSlice({
    name: "loyalty",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loyaltyHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loyaltyHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.historyOrders = action.payload;
                state.error = null;
            })
            .addCase(loyaltyHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch loyalty history";
            })
            .addCase(loyaltyBonus.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(loyaltyBonus.fulfilled, (state, action) => {
                state.loading = false;
                state.bonus = action.payload.bonusBalance;
                state.error = null;
            })
            .addCase(loyaltyBonus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch loyalty history";
            });
    },
});

export const loyaltyReducer = loyaltySlice.reducer;