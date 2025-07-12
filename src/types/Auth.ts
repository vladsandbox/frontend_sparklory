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