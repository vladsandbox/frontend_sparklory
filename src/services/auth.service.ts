import type {
    ILoginUserData,
    IRegistrationUserData, IResponseUser,
    IResponseUserData,
} from "../types/Auth";
import { instance } from "../api/axios.api";

const apiLoginUrl = import.meta.env.VITE_APP_LOGIN_URL ?? "";
const apiRegistrationUrl = import.meta.env.VITE_APP_REGISTRATION_URL ?? "";
const apiProfileUrl = import.meta.env.VITE_APP_PROFILE_URL ?? "";

export const AuthService = {
    async registration(userData: IRegistrationUserData) : Promise<IResponseUser> {
        const res = await instance.post(`${apiRegistrationUrl}`, userData);
        return res.data;
    },
    async login(userData: ILoginUserData) : Promise<IResponseUserData> {
        const res = await instance.post(`${apiLoginUrl}`, userData);
        return res.data;

    },
    async getProfile() : Promise<IResponseUser | undefined> {
        const res = await instance.get(`${apiProfileUrl}`);
        return res.data;
    }
}