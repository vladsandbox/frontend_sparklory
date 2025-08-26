import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";

import type { AppDispatch } from "@/store";
import { postProductSubscribe } from "@/store/thunks/productsThunk";
import Button from "../Button";

import styles from "./index.module.scss";
import { closeBtn } from "@/assets";

type Props = {
    productId: string;
    onClose: () => void;
};

export default function SubscribePopup({ productId, onClose }: Props) {
    const dispatch: AppDispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [touched, setTouched] = useState(false);

    const isValidEmail = (val: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidEmail(email)) return;

        dispatch(postProductSubscribe({ productId, email }));
        onClose();
    };

    const isInvalid = touched && !isValidEmail(email);

    return createPortal(
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <button onClick={onClose} className={styles.popupClose}>
                    <img src={closeBtn} alt="Close" />
                </button>

                <div>
                    <h3 className="h3">Join the Sparklory community</h3>
                    <p className="text-s">
                        Be the first to know about all the news and updates
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched(true)}
                        placeholder="Enter your email"
                        required
                        className={`primary-input input ${isInvalid ? styles.error : ""}`}
                    />

                    {isInvalid && (
                        <p className={`${styles.errorText} text-s`}>Please enter a valid email</p>
                    )}

                    <input type="text" placeholder="Name" className="primary-input input" />

                    <Button
                        type="submit"
                        variant="primary"
                        style={{ width: "100%", marginTop: 12 }}
                        disabled={!isValidEmail(email)}
                    >
                        Subscribe
                    </Button>
                </form>
            </div>
        </div>,
        document.body
    );
}
