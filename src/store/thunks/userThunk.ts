import type {
    ILoginUserData,
    IRegistrationUserData, IResponseUser,
    IResponseUserData,
} from "../../types/Auth";

import { logout } from "../slices/userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/localStorage";
import axios from "axios";

import {instance} from "../../api/axios.api";

const apiLoginUrl = import.meta.env.VITE_APP_LOGIN_URL ?? "";
const apiRegistrationUrl = import.meta.env.VITE_APP_REGISTRATION_URL ?? "";
const apiProfileUrl = import.meta.env.VITE_APP_PROFILE_URL ?? "";
const apiVerifyEmailUrl = import.meta.env.VITE_APP_VERIFY_EMAIL_URL ?? "";

export const checkAuth = createAsyncThunk<
    IResponseUser | null,
    void,
    { rejectValue: string }
>(
    "auth/checkAuth",
    async (_, { dispatch, rejectWithValue }) => {
        const token = getLocalStorage("token", "");

        if (!token) {
            dispatch(logout());
            return null;
        }

        try {
            const res = await instance.get(`${apiProfileUrl}`);
            return res.data;
        } catch (error: unknown) {
            let errorMessage = "Unknown error";

            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            return rejectWithValue(errorMessage);
        }
    }
);

export const registration = createAsyncThunk<
    IResponseUser,
    IRegistrationUserData,
    { rejectValue: string }
>(
    'user/registration',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await instance.post(apiRegistrationUrl, userData);
            return res.data;
        } catch (error: unknown) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : error instanceof Error ? error.message : "Unknown error";

            return rejectWithValue(message);
        }
    }
);

export const loginUser = createAsyncThunk<
    IResponseUserData,
    ILoginUserData,
    { rejectValue: string }
>(
    'user/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await instance.post(apiLoginUrl, userData);
            return res.data;
        } catch (error: unknown) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : error instanceof Error ? error.message : "Unknown error";

            return rejectWithValue(message);
        }
    }
);

export const verifyEmail = createAsyncThunk<
  void,
  { email: string; code: string },
  { rejectValue: string }
>(
  "user/verifyEmail",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      await instance.post(apiVerifyEmailUrl, {
        email,
        code
      });
    } catch (error: unknown) {
        let errorMessage = "Unknown error";

        if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data.message || error.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        return rejectWithValue(errorMessage);
    }
  }
);

