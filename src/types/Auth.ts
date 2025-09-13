export interface ILoginUserData {
    email: string
    password: string
}

export interface IResponseUser {
    _id: string
    email: string
    name: string
    role: string
    image?: string
    isLoggedIn: boolean
    isVerifyEmail: boolean
    verifyDeviceCode?: string
    wishlist: string[]
    loyaltyLevel: ILoyaltyLevel;
    bonusBalance: number;
    resetPasswordCode: string | null;
    facebookId: string | null;
    googleId: string | null;
}

export interface ILoyaltyLevel {
    id: string;
    name: string;
    bonusPercent: number;
}

export interface IResponseUserData {
    accessToken: string
    refreshToken: string
    user: IResponseUser
}

export interface IRegistrationUserData {
    name: string
    email: string
    password: string
}