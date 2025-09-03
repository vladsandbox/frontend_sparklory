import axios from "axios";
import { getLocalStorage } from "../utils/localStorage";

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL ?? "";

export const instance = axios.create({
  baseURL: apiBaseUrl,
});

instance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("token", "");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);