import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";

import type { AppDispatch } from "@/store";
import { postProductSubscribe } from "@/store/thunks/productsThunk";
import Button from "../Button";
import { isValidEmail } from "@/utils/validation";

import styles from "./index.module.scss";

import CloseBtn from "@/assets/icons/closeBtnSubscribe.svg?react"

type Props = {
    productId: string;
    onClose: () => void;
};

export default function SubscribePopup({ productId, onClose }: Props) {
    const dispatch: AppDispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [touched, setTouched] = useState(false);

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
                <Button
                    onClick={onClose}
                    className={styles.popupClose}
                    variant="secondary"
                    size="normal"
                    iconLeft={<CloseBtn />}
                />

                <div>
                    <h3 className={`h3 ${styles.headingDark}`}>Join the Sparklory community</h3>
                    <p className={`text-s ${styles.textGray}`}>
                        Be the first to know about all the news and updates
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched(true)}
                            placeholder="E-mail"
                            required
                            className={`primary-input input ${isInvalid ? "error-state" : ""}`}
                            style={{ width: "100%" }}
                        />
                        {isInvalid && (
                            <p className={`input-error ${styles.inputError}`}>Please enter a valid email</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className={styles.submitBtn}
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
