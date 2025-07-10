import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { checkAuth, loginUser, registration } from "../thunks/userThunk.ts";
import type { IResponseUser, IResponseUserData } from "../../types/Auth";

interface UserState {
    user: IResponseUser | null;
    isAuth: boolean,
    loading: boolean
    error: string
}

const initialState: UserState = {
    user: null,
    isAuth: false,
    loading: false,
    error: ''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(checkAuth.fulfilled, (state, action: PayloadAction<IResponseUser | null>) => {
                state.user = action.payload;
                state.isAuth = true;
                state.loading = false;
                state.error = '';
            })
            .addCase(checkAuth.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload as string || "Unknown error";
                state.user = null;
                state.isAuth = false;
            })

            // ✅ registration
            .addCase(registration.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(registration.fulfilled, (state, action: PayloadAction<IResponseUser>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(registration.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            })

            // ✅ loginUser
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<IResponseUserData>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuth = true;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            });
    }
})

export const {logout} = userSlice.actions;
export default userSlice.reducer;