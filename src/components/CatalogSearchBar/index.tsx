import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

import { useProductNavigation } from "@/utils/hooks/useProductNavigation";
import { search } from "@/assets";
import Catalog from "@/assets/icons/catalog.svg?react"
import styles from "./index.module.scss";
import Button from "@/components/Button.tsx";

export default function CatalogSearchBar() {
    const { goToProduct } = useProductNavigation()
    const products = useSelector((state: RootState) => state.products.data.products);
    const loading = useSelector((state: RootState) => state.products.loading);
    const [query, setQuery] = useState("");

    const filteredProducts = useMemo(() => {
        if (!query.trim()) return [];
        return products.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, products]);

    const handleClick = (id: string) => {
        setQuery("");
        goToProduct(id)
    };

    return (
        <div className={`wrapper ${styles.bar}`}>
            <Button iconLeft={<Catalog />} className={`primary-btn btn--big ${styles.button}`}>
                Catalog
            </Button>

            <div className={styles.inputWrapper}>
                <img src={search} alt="search" className={styles.icon} />
                <input
                    type="text"
                    placeholder="Search ..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={`primary-input input ${styles.input}`}
                />

                {query && (
                    <ul className={styles.results}>
                        {loading ? (
                            <li className="input">Loading...</li>
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.slice(0, 5).map((product) => (
                                <li
                                    key={product._id}
                                    className="input"
                                    onClick={() => handleClick(product._id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {product.name}
                                </li>
                            ))
                        ) : (
                            <li className="input">Nothing found</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
