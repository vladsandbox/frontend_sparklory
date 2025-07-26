import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { ListenerMiddlewareInstance } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
    addToCart,
    updateCartQuantity,
    removeCartItem,
    applyCoupon
} from "@/store/thunks/cartThunk";

interface ErrorPayload {
    message: string;
}

export const cartToasts = (middleware: ListenerMiddlewareInstance) => {
    middleware.startListening({
        actionCreator: addToCart.fulfilled,
        effect: () => void toast.success("Product added to cart"),
    });

    middleware.startListening({
        actionCreator: updateCartQuantity.fulfilled,
        effect: () => void toast.success("Cart updated"),
    });

    middleware.startListening({
        actionCreator: removeCartItem.fulfilled,
        effect: () => void toast.success("Product removed from cart"),
    });

    middleware.startListening({
        actionCreator: applyCoupon.fulfilled,
        effect: () => void toast.success("Coupon applied"),
    });

    middleware.startListening({
        predicate: (action) =>
            isRejectedWithValue(action) && action.type.startsWith("cart/"),
        effect: (action) =>
            void toast.error(
                typeof action.payload === "string"
                    ? action.payload
                    : (action.payload as ErrorPayload)?.message ?? "Cart error"
            )
    });

};
