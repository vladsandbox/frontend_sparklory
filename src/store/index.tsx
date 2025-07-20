import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice"
import productsReducer from "./slices/productsSlice"
import userReducer from "./slices/userSlice"
import wishlistReducer from "./slices/wishlistSlice"

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productsReducer,
        user: userReducer,
        wishlist: wishlistReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;