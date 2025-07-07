import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IResponseUser } from "../../types/Auth";

interface UserState {
    user: IResponseUser | null;
    isAuth: boolean
}

const initialState: UserState = {
    user: null,
    isAuth: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action : PayloadAction<IResponseUser>) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;