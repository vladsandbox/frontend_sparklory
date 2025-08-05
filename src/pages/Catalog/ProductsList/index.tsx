import type { PaginatedProductsResponse } from "@/types/Pagination.ts";

import CatalogProductCard from "../ProductCard";
import CatalogPagination from "../Pagination";

import "./index.scss";

type Props = {
    data: PaginatedProductsResponse;
    loading: boolean;
    changePage: (page: number) => void;
    currentPage: number;
};

export default function CatalogProductsList({ data, loading, changePage, currentPage }: Props) {
    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (!data) {
        return <p className="error">Failed to load products</p>;
    }

    const { products, pages } = data;

    if (products.length === 0) {
        return <p className="error">No products found</p>;
    }

    return (
        <>
            <div className="catalog-products-wrapper">
                {products.map((product) => (
                    <CatalogProductCard product={product} key={product._id} />
                ))}
            </div>
            {
                pages > 1 &&
                <CatalogPagination
                    currentPage={currentPage}
                    totalPages={pages}
                    onPageChange={changePage}
                />
            }
        </>
    );
}