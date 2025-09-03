import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearLocalStorage } from "@/utils/localStorage.ts";
import { useEffect } from "react";
import { checkAuth } from "@/store/thunks/userThunk.ts";
import { logout } from "@/store/slices/userSlice.ts";
import type {AppDispatch, RootState} from "@/store";

import "./index.scss"

export default function Profile() {
    const user = useSelector((state: RootState) => state.user)
    console.log(user)
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    const logoutHandler = () => {
        dispatch(logout());
        clearLocalStorage('token');
        navigate('/');
    }

    return (
        <>
            <div className="wrapper">
                <h1>Profile Page</h1>
                <p className="profile_text">Profile description</p>
                <NavLink to="/" className="primary-btn button-text" onClick={logoutHandler} >
                    Logout
                </NavLink>
            </div>
        </>
    );
}