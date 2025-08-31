import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import Button from "@/components/Button";

import styles from "./index.module.scss"
import { orderConfirm } from "@/assets";


export default function OrderConfirmation() {
    const navigate = useNavigate()
    const orderId = sessionStorage.getItem("order_id");
    const customerName = sessionStorage.getItem("customer_name");


    useEffect(() => {
        if (!orderId) {
            navigate("/checkout");
        }
    }, [orderId, navigate]);


    return (
        <div className="wrapper">
            <div className={styles.container}>
                <div className={styles.confirmation}>
                    <h1 className="h1">Order Confirmation</h1>
                    <div className={styles.confirmationText}>
                        {orderId ? (
                            <>
                                <p className="title-m">
                                    Thank you for your purchase,{" "}
                                    {customerName || "Customer"}!
                                </p>
                                <p className="title-m">
                                    Your order number is <br />
                                    <span className={styles.textSpan}>
                                        №{orderId}
                                    </span>
                                </p>
                            </>
                        ) : (
                            <p className="title-m">We couldn’t find your order number.</p>
                        )}
                        <p className="title-m">You’ll receive a confirmation email shortly</p>
                    </div>
                    <Button size="big" style={{ width: "100%" }} onClick={() => navigate("/catalog")}>
                        Continue Shopping
                    </Button>
                </div>
                <div>
                    <img src={orderConfirm} alt="orderConfirm" className={styles.mainImg} />
                </div>
            </div>
        </div>
    );
}
