import axios from "axios";
import { getLocalStorage } from "../utils/localStorage";

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL ?? "";
export const instance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        Authorization: `Bearer ` + getLocalStorage('token', ''),
    }
})