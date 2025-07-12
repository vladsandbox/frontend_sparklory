import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLocalStorage } from "@/utils/localStorage.ts";
import { logout } from "@/store/slices/userSlice.ts";

import "./index.scss"
import type { RootState } from "@/store";

export default function Profile() {

    const isAuth = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    const logoutHandler = () => {
        clearLocalStorage('token');
        dispatch(logout());
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