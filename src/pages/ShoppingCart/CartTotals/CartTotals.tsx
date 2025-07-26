import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/store";
import { applyCoupon } from "@/store/thunks/cartThunk";
import { useAuth } from "@/utils/hooks/useAuth";

import styles from "./index.module.scss";

type Props = {
    firstAmount: number;
    finalAmount: number;
    discount: number;
};

export default function CartTotals({ discount, finalAmount, firstAmount }: Props) {
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useAuth();

    const handleApplyCoupon = async () => {
        try {
            setError("");
            await dispatch(applyCoupon({ code: coupon.trim(), guest: !isAuth })).unwrap();
        } catch (err: any) {
            setError(err?.message || "Invalid coupon");
        }
    };

    return (
        <div style={{ marginTop: 60 }}>
            <p className="h1">Cart Totals </p>
            <div className={styles.totalContainer}>
                <div>
                    <p className="title-m">Order summary</p>
                </div>
                <div>
                    <div className={styles.row}>
                        <p className="body">Subtotal</p>
                        <p className="body">{firstAmount} ₴</p>
                    </div>
                    <div className={styles.row}>
                        <p className="body">Discount</p>
                        <p className="body" style={{ color: "rgba(123, 0, 0, 1)" }}>
                            -₴ {discount}
                        </p>
                    </div>
                    <div className={styles.row}>
                        <p className="body">Delivery</p>
                        <p className="body">0 ₴</p>
                    </div>
                    <div className={`${styles.divider} ${styles.row}`} />
                    <div className={styles.row}>
                        <p className="title-m">Total</p>
                        <p className="title-m">{finalAmount.toFixed(2)} ₴</p>
                    </div>
                </div>
                <div className={styles.loyaltyContainer}>
                    <input
                        className={`${styles.input} input primary-input`}
                        type="text"
                        placeholder="Coupon"
                        value={coupon}
                        onChange={(e) => {
                            setCoupon(e.target.value);
                            setError("");
                        }}
                    />
                    <button
                        className={`${styles.applyBtn} primary-btn button-text big`}
                        disabled={!coupon.trim()}
                        onClick={handleApplyCoupon}
                    >
                        Apply
                    </button>
                    {error && (
                        <span className={styles.errorCoupon}>
                            {error}
                        </span>
                    )}
                </div>
                <button
                    className="primary-btn big button-text"
                    onClick={() => navigate("/checkout")}
                >
                    Go to Checkout
                </button>
            </div>
        </div>
    );
}
