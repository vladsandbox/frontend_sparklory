import { useEffect, useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/store/slices/userSlice.ts";
import { loyaltyHistory, loyaltyBonus } from "@/store/thunks/loyaltyThunk";
import type { AppDispatch, RootState } from "@/store";

import CatalogSearchBar from "@/components/CatalogSearchBar";
import { getLinkClass } from "@/utils/getLinkClass.ts";
import { clearLocalStorage } from "@/utils/localStorage.ts";

import styles from './index.module.scss';

import { sparkloryBonus } from "@/assets";

export default function Profile() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const { historyOrders, bonus } = useSelector((state: RootState) => state.loalty);

    const navLinks = ["contact", "security", "orders"];
    const [activeIndex, setActiveIndex] = useState(0);
    const indicatorHeight = 135 / navLinks.length;
    const indicatorTop = activeIndex * indicatorHeight;

    useEffect(() => {
        dispatch(loyaltyHistory());
        dispatch(loyaltyBonus());
    }, [dispatch]);

    const logoutHandler = () => {
        dispatch(logout());
        clearLocalStorage("token");
        navigate("/");
    };

    return (
        <>
            <CatalogSearchBar />
            <div className="wrapper">
                <div className={styles.profile}>
                    <div className={styles.sidebar}>
                        <div className={styles.userInfo}>
                            <h2 className="input">Welcome, {user?.name}</h2>
                            <div className={styles.bonus}>
                                <img src={sparkloryBonus} alt="Sparklory Bonus" />
                                <p className="text-s"><span className="input">{bonus}</span> Sparkles on balance</p>
                            </div>
                        </div>
                        <div className={styles.navlinksContainer}>
                            <div className={styles.navlinks}>
                                {navLinks.map((link, index) => (
                                    <NavLink
                                        key={link}
                                        to={link}
                                        className={getLinkClass}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {link === "contact" ? "Contact Information" : link === "security" ? "Account Security" : "Orders"}
                                    </NavLink>
                                ))}
                            </div>

                            <div className={styles.progressTrack}>
                                <div
                                    className={styles.progressIndicator}
                                    style={{ top: `${indicatorTop}px`, height: `${indicatorHeight}px` }}
                                />
                            </div>
                        </div>

                        <button className={`input ${styles.logoutBtn}`} onClick={logoutHandler}>Exit</button>
                    </div>

                    <div className={styles.content}>
                        <Outlet context={{ user, historyOrders, bonus }} />
                    </div>
                </div>
            </div>
        </>
    );
}