import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { checkAuth, loginUser, registration, resetPassword, forgotPassword, resetForgottenPassword } from "../thunks/userThunk.ts";
import type { IResponseUser, IResponseUserData } from "../../types/Auth";

interface UserState {
    user: IResponseUser | null;
    isAuth: boolean,
    loading: boolean
    error: string
    resetPasswordLoading: boolean;
    resetPasswordError: string;
}

const initialState: UserState = {
    user: null,
    isAuth: false,
    loading: false,
    error: '',
    resetPasswordLoading: false,
    resetPasswordError: ''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
        },
        clearResetPasswordError: (state) => {
            state.resetPasswordError = '';
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
                state.isAuth = action.payload !== null;
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
            })
            .addCase(resetPassword.pending, (state) => {
                state.resetPasswordLoading = true;
                state.resetPasswordError = '';
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.resetPasswordLoading = false;
                state.resetPasswordError = '';
            })
            .addCase(resetPassword.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.resetPasswordLoading = false;
                state.resetPasswordError = action.payload || "Failed to reset password";
            })

            // forgot password
            .addCase(forgotPassword.pending, (state) => {
                state.resetPasswordLoading = true;
                state.resetPasswordError = "";
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.resetPasswordLoading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.resetPasswordLoading = false;
                state.resetPasswordError = action.payload || "Failed to send reset email";
            })

            // reset forgotten password
            .addCase(resetForgottenPassword.pending, (state) => {
                state.resetPasswordLoading = true;
                state.resetPasswordError = "";
            })
            .addCase(resetForgottenPassword.fulfilled, (state) => {
                state.resetPasswordLoading = false;
            })
            .addCase(resetForgottenPassword.rejected, (state, action) => {
                state.resetPasswordLoading = false;
                state.resetPasswordError = action.payload || "Failed to reset password";
            });
    }
})

export const { logout, clearResetPasswordError } = userSlice.actions;
export default userSlice.reducer;