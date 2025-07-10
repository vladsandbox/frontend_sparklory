
import { NavLink, useNavigate } from "react-router-dom";
import { clearLocalStorage } from "@/utils/localStorage.ts";
import { useAuth } from "@/utils/hooks/useAuth.ts";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/userSlice.ts";

import "./index.scss"

export default function Profile() {

    const isAuth = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                <NavLink className="primary-btn button-text" onClick={logoutHandler} >
                    Logout
                </NavLink>
            </div>
        </>
    );
}