import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearLocalStorage } from "@/utils/localStorage.ts";
import { logout } from "@/store/slices/userSlice.ts";

import "./index.scss"
import type { RootState } from "@/store";

export default function Profile() {
    const user = useSelector((state: RootState) => state.user)
    console.log(user)
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
                <NavLink to="/" className="primary-btn button-text" onClick={logoutHandler} >
                    Logout
                </NavLink>
            </div>
        </>
    );
}