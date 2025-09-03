import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { ListenerMiddlewareInstance } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface ErrorPayload {
    message: string;
}

export const paymentToasts = (middleware: ListenerMiddlewareInstance) => {

    middleware.startListening({
        predicate: (action) =>
            isRejectedWithValue(action) && action.type.startsWith("payment/"),
        effect: (action) =>
            void toast.error(
                typeof action.payload === "string"
                    ? action.payload
                    : (action.payload as ErrorPayload)?.message ?? "Payment error"
            ),
    });
};
