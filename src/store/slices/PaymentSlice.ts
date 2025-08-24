import { createSlice } from "@reduxjs/toolkit";

import { createPayment } from "../thunks/paymentThunk";
import { type PaymentState } from "@/types/Payment";

const initialState: PaymentState = {
    loading: false,
    error: null,
    paymentData: null,
}

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        resetPayment(state) {
            state.paymentData = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPayment.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.paymentData = payload;
            })
            .addCase(createPayment.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload || "Error creating payment";
            });
    },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;