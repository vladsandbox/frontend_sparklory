import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductNavigation } from "../../utils/hooks/useProductNavigation";
import { getLocalStorage } from "../../utils/localStorage";
import { fetchProductById } from "../../utils/api";
import CatalogSearchBar from "../../components/CatalogSearchBar";
import type { Product } from "../../types/Products";

import styles from "./index.module.scss";


export default function WishList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { goToProduct } = useProductNavigation();

    useEffect(() => {
        const stored = getLocalStorage<string[]>("favoriteProducts", []);

        Promise.all(stored.map(fetchProductById))
            .then(setProducts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    function removeProduct(id: string) {
        const updated = products.filter(p => p._id !== id);
        setProducts(updated);
        const stored = getLocalStorage<string[]>("favoriteProducts", []);
        const newStored = stored.filter(pid => pid !== id);
        localStorage.setItem("favoriteProducts", JSON.stringify(newStored));
    }

    function goToCatalog() {
        navigate("/catalog");
    }

    return (
        <>
            <CatalogSearchBar />
            <div className="wrapper" style={{ paddingBottom: 120 }}>
                <h1 className="h1" style={{ marginBottom: 60 }}>Wishlist</h1>

                {loading ? (
                    <p className="loading">Loading...</p>
                ) : products.length === 0 ? (
                    <div>
                        <p className="body" style={{ color: "rgba(104, 104, 104, 1)", marginBottom: 38 }}>
                            Unfortunately, there’s nothing in your wishlist. Go back to shop to add some product you’d like to buy.
                        </p>
                        <button
                            className="primary-btn big button-text"
                            style={{ width: 424 }}
                            onClick={goToCatalog}
                        >
                            Go to Shop
                        </button>
                    </div>
                ) : (
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <span className="title-m">Product</span>
                            <div style={{ display: "flex", gap: 85 }}>
                                <span className="title-m">Unit Price</span>
                                <span className="title-m">Stock Status</span>
                            </div>
                        </div>

                        {products.map(product => (
                            <div key={product._id}>
                                <div className={styles.item}>
                                    <button className={styles.remove} onClick={() => removeProduct(product._id)}>✕</button>

                                    <div className={styles.itemInner}>
                                        <img className={styles.image} src={product.image?.[0]} alt={product.name} />

                                        <div className={`body ${styles.name}`} onClick={() => goToProduct(product._id)}>{product.name}</div>
                                        <div className={`body ${styles.price}`}>{product.price}₴</div>
                                        <div
                                            className={`body ${styles.stock} ${!product.inStock ? styles.disabled : ""}`}
                                        >
                                            {product.inStock ? "In Stock" : "Out of Stock"}
                                        </div>

                                    </div>

                                    <button
                                        className={`${product.inStock ? "primary-btn" : "secondary-btn"} big button-text ${styles.button}`}
                                        onClick={(e) => e.stopPropagation()}
                                        disabled={!product.inStock}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`${styles.icon} ${!product.inStock ? styles.disabledIcon : ""}`}
                                        >
                                            <path
                                                d="M11.2 8.66675H20.8C25.3334 8.66675 25.7867 10.7867 26.0934 13.3734L27.2934 23.3734C27.68 26.6534 26.6667 29.3334 22 29.3334H10.0134C5.33337 29.3334 4.32003 26.6534 4.72003 23.3734L5.92004 13.3734C6.21338 10.7867 6.6667 8.66675 11.2 8.66675Z"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10.667 10.6667V6.00008C10.667 4.00008 12.0003 2.66675 14.0003 2.66675H18.0003C20.0003 2.66675 21.3337 4.00008 21.3337 6.00008V10.6667"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M27.2137 22.7065H10.667"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Add to cart
                                    </button>

                                </div>

                                <div className={styles.divider}></div>
                            </div>
                        ))}
                    </div>
                )}
            </div></>
    );
}
