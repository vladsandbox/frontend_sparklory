import { useNavigate } from "react-router-dom";

import type { LoyaltyOrder } from "@/types/Loyalty"
import Button from "@/components/Button";

import styles from "./index.module.scss"

import { sparkloryBonus } from "@/assets";

interface OrdersItemProps {
    order: LoyaltyOrder;
}

export default function OrdersItem({ order }: OrdersItemProps) {
    const navigate = useNavigate();

    const viewOrderHandler = () => {
        navigate(`/profile/orders/${order.orderId}`);
    }
    return (
        <>
            <div className={styles.orderItem}>
                <div>
                    <p className={styles.title}>Order number</p>
                    <p className={styles.value}>{order.orderId.slice(-4)}</p>
                </div>
                <div>
                    <p className={styles.title}>Date placed</p>
                    <p className={styles.value}>{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div>
                    <p className={styles.title}>Status</p>
                    <p className={styles.value}>Paid</p>
                </div>
                <div>
                    <p className={styles.title}>Total amount</p>
                    <p className={`${styles.value} ${styles.amount}`}>{order.amount} ₴</p>
                </div>
                <div>
                    <img className={styles.imgSparkles} src={sparkloryBonus} alt="sparkles" />
                    <p className="subtitle" style={{ flex: "none" }}>+ {order.earnedBonus} sparkles</p>
                </div>
                <Button
                    className={styles.btnViewOrder}
                    onClick={viewOrderHandler}
                >
                    View Order
                </Button>
            </div>
        </>
    )
}