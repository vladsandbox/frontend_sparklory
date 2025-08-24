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
    cardNumber: Yup.string()
        .required("Card Number is required")
        .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits"),
    expiryDate: Yup.string()
        .required("Expiry date is required")
        .test("valid-expiry", "Card has expired or date is invalid", (value) => {
            if (!value) return false;

            const [month, year] = value.split("/");
            const m = parseInt(month, 10);
            const y = parseInt(year, 10);

            if (isNaN(m) || isNaN(y)) return false;
            if (m < 1 || m > 12) return false;

            const fullYear = 2000 + y;

            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentYear = now.getFullYear();

            if (fullYear < currentYear) return false;
            if (fullYear === currentYear && m < currentMonth) return false;

            return true;
        }),
    cvv: Yup.string()
        .matches(/^\d{3}$/, "CVV must be 3 digits")
        .required("CVV is required"),
    nameOnCard: Yup.string()
        .trim()
        .required("Name on Card is required")
        .min(2, "Name on Card must be at least 2 characters")
        .max(26, "Name on Card must be at most 26 characters")
        .matches(/^[a-zA-Z\s'-]+$/, "Invalid input format")
});

export function usePaymentForm({ isGuestCheckout, amount, contactInfo }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const [liqpayData, setLiqpayData] = useState<string | null>(null);
    const [liqpaySignature, setLiqpaySignature] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            cardNumber: "",
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