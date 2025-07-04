import {
    ILoginUserData,
    IRegistrationUserData, IResponseUser,
    IResponseUserData,
} from "../types/Auth";
import {instance} from "../api/axios.api";

const apiLoginUrl = process.env.REACT_APP_LOGIN_URL ?? "";
const apiRegistrationUrl = process.env.REACT_APP_REGISTRATION_URL ?? "";
const apiProfileUrl = process.env.REACT_APP_PROFILE_URL ?? "";

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