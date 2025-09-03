import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/store";
import { applyCoupon } from "@/store/thunks/cartThunk";
import { useAuth } from "@/utils/hooks/useAuth";
import { formatPrice } from "@/utils/formatPrice";

import styles from "./index.module.scss";
import Button from "@/components/Button.tsx";

type Props = {
    firstAmount: number;
    finalAmount: number;
    discount: number;
    appliedCoupon?: string | null;
    showHeader?: boolean;
    deliveryPrice?: number;
};

export default function CartTotals({ discount, finalAmount, firstAmount, appliedCoupon, showHeader = true, deliveryPrice }: Props) {
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useAuth();
    const totalWithDelivery = typeof deliveryPrice === "number" ? finalAmount + deliveryPrice : finalAmount;

    useEffect(() => {
        if (appliedCoupon) {
            setCoupon(appliedCoupon);
        }
    }, [appliedCoupon]);

    const handleApplyCoupon = async () => {
        try {
            setError("");
            await dispatch(applyCoupon({ code: coupon.trim(), guest: !isAuth })).unwrap();
        } catch (err: any) {
            setError(err?.message || "Invalid coupon");
        }
    };

    return (
        <div style={{ marginTop: showHeader ? 60 : 0 }}>
            {showHeader && <p className="h1">Cart Totals</p>}
            <div className={`${styles.totalContainer} ${!showHeader ? styles.compact : ""}`}>
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
                            -{discount} ₴
                        </p>
                    </div>
                    <div className={styles.row}>
                        <p className="body">Delivery</p>
                        <p className="body">{formatPrice(deliveryPrice)}</p>
                    </div>
                    <div className={`${styles.divider} ${styles.row}`} />
                    <div className={styles.row}>
                        <p className="title-m">Total</p>
                        <p className="title-m">{formatPrice(totalWithDelivery)}</p>
                    </div>
                </div>
                <div className={styles.loyaltyContainer}>
                    <input
                        className={`${styles.input} ${!showHeader ? styles.compact : ""} input primary-input`}
                        type="text"
                        placeholder="Coupon"
                        value={coupon}
                        onChange={(e) => {
                            setCoupon(e.target.value);
                            setError("");
                        }}
                        disabled={!!appliedCoupon}
                    />
                    <Button
                        variant="primary"
                        size="big"
                        disabled={!!appliedCoupon || !coupon.trim()}
                        onClick={handleApplyCoupon}
                        className={styles.applyBtn}
                    >
                        Apply
                    </Button>
                    {error && (
                        <span className="input-error">
                            {error}
                        </span>
                    )}
                </div>
                {showHeader && (
                    <Button
                        variant="primary"
                        size="big"
                        onClick={() => navigate("/order-checkout")}
                    >
                        Go to Checkout
                    </Button>
                )}
            </div>
        </div>
    );
}
