import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice"
import userReducer from "./slices/userSlice"

export const store = configureStore({
    reducer: {
        products: productsReducer,
        user: userReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;