import {Outlet, NavLink } from 'react-router-dom';

import {heart, bag, logo, logoFooter, instagram, youtube, facebook, profile} from '../../assets';

import '../../styles/index.scss';
import styles from './index.module.scss';
import { useAuth } from "../../utils/hooks/useAuth";

const Layout = () => {
    const isAuth = useAuth();

    return (
        <>
            <header className={styles['header-container']}>
                <div className="wrapper">
                    <div className={styles.inner}>
                        <div className="logo">
                            <NavLink to="/" end>
                                <img src={logo} alt="Logo" />
                            </NavLink>
                        </div>

                        <nav className={styles['nav-links']}>
                            <NavLink className="h3" to="/best-sellers">Best sellers</NavLink>
                            <NavLink className="h3" to="/gifts">Gifts</NavLink>
                            <NavLink className="h3" to="/community">Community</NavLink>
                            <NavLink className="h3" to="/company">Company</NavLink>
                        </nav>

                        <div className={styles['actions']}>
                            <div className={styles['icons-container']}>
                                <NavLink to="/wishlist" className={styles['icon-link']}>
                                    <img src={heart} alt="Heart" />
                                </NavLink>
                                <a href="/" className={styles['icon-link']}>
                                    <img src={bag} alt="Shopping Bag" />
                                </a>
                            </div>
                            <div className={styles['btn-container']}>
                                {!isAuth ? (
                                <>
                                    <NavLink to="/login">
                                        <button className="primary-btn button-text">Log in</button>
                                    </NavLink>
                                    <NavLink to="/registration">
                                        <button className="secondary-btn button-text">Sign up</button>
                                    </NavLink>
                                </>
                                ) : (
                                    <NavLink to="/profile" className={styles['icon-link']}>
                                        <img src={profile} alt="profile" />
                                    </NavLink>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main style={{ paddingTop: 24 }}>
                <Outlet />
            </main>

            <footer className={styles['footer-container']}>
                <div className="wrapper">
                    <div className={styles.inner}>
                        <div className={styles['contact-info-container']}>
                            <div className="logo">
                                <NavLink to="/" end>
                                    <img src={logoFooter} alt="Logo" />
                                </NavLink>
                            </div>
                            <div className={styles['contact-info-inner']}>
                                <div>
                                    <p className="h3" style={{ marginBottom: 20 }}>Category</p>
                                    <ul>
                                        <li><a href="/">Bracelets</a></li>
                                        <li><a href="/">Rings</a></li>
                                        <li><a href="/">Necklaces</a></li>
                                        <li><a href="/">Earrings</a></li>
                                        <li><a href="/">Watches</a></li>
                                        <li><a href="/">Men`s</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="h3" style={{ marginBottom: 20 }}>Community</p>
                                    <ul>
                                        <li><a href="/">About Community</a></li>
                                        <li><a href="/">Featured Users</a></li>
                                        <li><a href="/">Loyalty Club</a></li>
                                        <li><a href="/">Events & Giveaways</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="h3" style={{ marginBottom: 20 }}>Company</p>
                                    <ul>
                                        <li><a href="/">About us</a></li>
                                        <li><a href="/">Ships & details</a></li>
                                        <li><a href="/">Reviews</a></li>
                                        <li><a href="/">Contact Us</a></li>
                                    </ul>
                                </div>
                                <div className={styles['newsletter']}>
                                    <p className="h3" style={{ marginBottom: 32 }}>Get our updates</p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                        <input type="text" className="primary-input input" placeholder="Write your E-mail" />
                                        <button className="primary-btn button-text">Subscribe</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingTop: 40, display: "flex", justifyContent: "space-between" }}>
                            <p>Copyright © 2024 | Privacy Policy</p>
                            <div style={{ display: "flex", gap: 24 }}>
                                <a href="/" className={styles['icon-link']}>
                                    <img src={instagram} alt="Instagram" />
                                </a>
                                <a href="/" className={styles['icon-link']}>
                                    <img src={youtube} alt="Youtube" />
                                </a>
                                <a href="/" className={styles['icon-link']}>
                                    <img src={facebook} alt="Facebook" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Layout;