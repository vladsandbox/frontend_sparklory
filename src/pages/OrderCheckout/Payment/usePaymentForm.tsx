import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { createPayment } from "@/store/thunks/paymentThunk";
import type { AppDispatch } from "@/store";
import type { PaymentContactInfo } from "@/types/Payment";

type Props = {
    isGuestCheckout?: boolean;
    amount: number;
    contactInfo?: PaymentContactInfo;
};

const validationSchema = Yup.object({
    cardName: Yup.string().required("Card Name is required"),
    expiryDate: Yup.string()
        .required("Expiry date is required")
        .test("valid-expiry", "Invalid expiry date (MM/YY)", (value) => {
            if (!value) return false;
            const [month, year] = value.split("/");
            const m = parseInt(month, 10);
            const y = parseInt(year, 10);
            return m >= 1 && m <= 12 && y >= 0 && y <= 99;
        }),
    cvv: Yup.string()
        .matches(/^\d{3}$/, "CVV must be 3 digits")
        .required("CVV is required"),
    nameOnCard: Yup.string().required("Name on Card is required"),
});

export function usePaymentForm({ isGuestCheckout, amount, contactInfo }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const [liqpayData, setLiqpayData] = useState<string | null>(null);
    const [liqpaySignature, setLiqpaySignature] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            cardName: "",
            expiryDate: "",
            cvv: "",
            nameOnCard: "",
        },
        validationSchema,
        onSubmit: async () => {
            const payload = isGuestCheckout
                ? { amount, guest: true, contactInfo }
                : { amount };

            const result = await dispatch(createPayment(payload)).unwrap();

            if (result?.data && result?.signature) {
                setLiqpayData(result.data);
                setLiqpaySignature(result.signature);
            }
        },
    });

    return { formik, liqpayData, liqpaySignature };
}