import { useSearchParams } from "react-router-dom";
import type { Product } from "@/types/Products";

import CatalogProductCard from "../ProductCard";
import CatalogPagination from "../Pagination";

import "./index.scss";

type Props = {
    products: Product[];
    loading: boolean;
};

export default function CatalogProductsList({ products, loading }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();

    if (loading) return <p className="loading">Loading...</p>;

    const productsPerPage = 16;
    const totalPages = Math.ceil(products.length / productsPerPage);

    const changePage = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", String(page));
        setSearchParams(newParams);
    };

    const currentPage = Number(searchParams.get("page")) || 1;

    const safePage = Math.min(Math.max(currentPage, 1), totalPages);
    if (safePage !== currentPage) changePage(safePage);

    const startIndex = (safePage - 1) * productsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

    return (
        <>
            <div className="catalog-products-wrapper">
                {currentProducts.map((product) => (
                    <CatalogProductCard product={product} key={product._id} />
                ))}

            </div>

            <CatalogPagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={changePage}
            />
        </>
);
}