import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import type { LoyaltyHistoryResponse } from "@/types/Loyalty";
import type { Product } from "@/types/Products";
import { fetchProductById } from "@/utils/api";
import { useProductNavigation } from "@/utils/hooks/useProductNavigation";

import styles from "./index.module.scss";
import stylesText from "../OrderItem/index.module.scss";
import { noImg } from "@/assets";
import Button from "@/components/Button";

interface OutletContextType {
    historyOrders: LoyaltyHistoryResponse;
}

export default function OrderDetails() {
    const { id } = useParams<{ id: string }>();
    const { historyOrders } = useOutletContext<OutletContextType>();
    const order = historyOrders.find((o) => o.orderId === id);

    const [productsData, setProductsData] = useState<Record<string, Product | null>>({});

    useEffect(() => {
        if (!order) return;

        order.items.forEach((item) => {
            if (!productsData[item.product]) {
                fetchProductById(item.product)
                    .then((data) =>
                        setProductsData((prev) => ({ ...prev, [item.product]: data }))
                    )
                    .catch(() =>
                        setProductsData((prev) => ({ ...prev, [item.product]: null }))
                    );
            }
        });
    }, [order]);

    if (!order) {
        return <p>Order not found</p>;
    }
    const { goToProduct } = useProductNavigation();
    const navigate = useNavigate();

    return (
        <div>
            <h2 className={styles.orderTitle}>Order №{order.orderId.slice(-4)}</h2>
            <div className={styles.orderSummary}>
                <div className={styles.orderInfo}>
                    <div>
                        <p className={stylesText.title}>Order number</p>
                        <p className={stylesText.value}>{order.orderId.slice(-4)}</p>
                    </div>
                    <div>
                        <p className={stylesText.title}>Date placed</p>
                        <p className={stylesText.value}>
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <div>
                        <p className={stylesText.title}>Status</p>
                        <p className={stylesText.value}>Paid</p>
                    </div>
                </div>
                <div className={styles.orderAmount}>
                    <p className={stylesText.title}>Total amount</p>
                    <p className={`${stylesText.value} ${stylesText.amount}`}>
                        {order.amount} ₴
                    </p>
                </div>
            </div>

            <ul>
                {order.items.map((item) => {
                    const product = productsData[item.product];
                    return (
                        <li key={item._id} className={styles.item}>
                            <div className={styles.itemInner}>
                                <img
                                    src={product?.image?.[0] || noImg}
                                    alt={product?.name || "No image"}
                                    className={`${styles.image} ${!product?.image?.length ? styles.noBorder : ""}`}
                                />
                                <div>
                                    <p className={styles.productName} onClick={() => goToProduct(product?._id || "")}>
                                        {product?.name || "Product name"}
                                    </p>
                                    <p className={styles.productDetails}>
                                        {item.material}
                                        {item.size && (
                                            <>
                                                <span className={styles.dot}>•</span>
                                                <span>Size</span>
                                                {item.size}
                                            </>
                                        )}
                                    </p>
                                    <p className={styles.productPrice}>
                                        {item.discount > 0 ? (
                                            <>
                                                <span className={styles.discountedPrice}>
                                                    {item.firstPrice} ₴
                                                </span>
                                                {item.priceWithDiscount} ₴
                                            </>
                                        ) : (
                                            `${item.firstPrice} ₴`
                                        )}
                                    </p>
                                </div>
                                <div className={styles.btnContainer}>
                                    <Button
                                        onClick={() => goToProduct(product?._id || "")}
                                    >
                                        Buy Again
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate(`/catalog/${product?.category}`)}
                                    >
                                        Shop similar
                                    </Button>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
