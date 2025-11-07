import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchSearchResults } from "@/store/thunks/productsThunk";
import { clearSearchResults } from "@/store/slices/productsSlice";
import { useProductNavigation } from "@/utils/hooks/useProductNavigation";
import type { RootState, AppDispatch } from "@/store";

import Button from "@/components/Button.tsx";
import Modal from "@/components/Modal";
import ModalCatalog from "@/components/ModalCatalog";

import Catalog from "@/assets/icons/catalog.svg?react";
import { search } from "@/assets";
import styles from "./index.module.scss";

export default function CatalogSearchBar() {
    const { goToProduct } = useProductNavigation()
    const dispatch = useDispatch<AppDispatch>()
    const searchResults = useSelector((state: RootState) => state.products.searchResults);
    const searchLoading = useSelector((state: RootState) => state.products.searchLoading);

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            dispatch(clearSearchResults());
        } else {
            dispatch(fetchSearchResults({ query: debouncedQuery }));
        }
    }, [debouncedQuery, dispatch]);

    const handleClick = (id: string) => {
        setQuery("");
        goToProduct(id)
    };

    return (
        <div className={`wrapper ${styles.bar}`}>
            <Button
                iconLeft={<Catalog />}
                className={`primary-btn btn--big ${styles.button}`}
                onClick={() => setModalOpen(true)}
            >
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
                        {searchLoading ? (
                            <li className="input">Loading...</li>
                        ) : searchResults.length > 0 ? (
                            searchResults.slice(0, 5).map((product) => (
                                <li
                                    key={product._id}
                                    className="input"
                                    onClick={() => handleClick(product._id)}
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

            <Modal
                title="Catalog"
                children={<ModalCatalog handleClose={() => setModalOpen(false)}/>}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}
