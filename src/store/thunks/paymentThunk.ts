import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "@/api/axios.api";
import { getGuestId } from "@/utils/guestId";
import { type PaymentContactInfo } from "@/types/Payment";

const PAYMENT_CREATE_URL = import.meta.env.VITE_PAYMENT_POST_URL;
const PAYMENT_CREATE_GUEST_URL = import.meta.env.VITE_PAYMENT_POST_GUEST_URL;

type CreatePaymentArgs = {
    amount: number;
    guest?: boolean;
    contactInfo?: PaymentContactInfo;
};

export const createPayment = createAsyncThunk<
    any,
    CreatePaymentArgs,
    { rejectValue: string }
>(
    "payment/createPayment",
    async ({ amount, guest = false, contactInfo }, { rejectWithValue }) => {
        try {
            let res;
            if (guest) {
                res = await instance.post(PAYMENT_CREATE_GUEST_URL, {
                    amount,
                    guestId: getGuestId(),
                    contactInfo,
                });
            } else {
                res = await instance.post(PAYMENT_CREATE_URL, { amount });
            }
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to create payment");
        }
    }
);