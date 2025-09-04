import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice"
import productsReducer from "./slices/productsSlice"
import userReducer from "./slices/userSlice"
import wishlistReducer from "./slices/wishlistSlice"
import cartReducer from "@/store/slices/cartSlice"
import paymentReducer from "@/store/slices/PaymentSlice"
import { loyaltyReducer } from "./slices/loyaltySlice.ts";
import { toastMiddleware } from "./middleware/toast";

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productsReducer,
        user: userReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
        payment: paymentReducer,
        loalty: loyaltyReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(toastMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;