import type { PaginatedProductsResponse } from "@/types/Pagination.ts";

import SkeletonProductCard from "@/pages/Catalog/ProductCard/SkeletonProductCard.tsx";
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
    const { products, pages } = data;

    if (loading) {
        return (
            <div className="catalog-products-wrapper">
                {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonProductCard key={i} />
                ))}
            </div>
        );
    }

    if (!data) {
        return <p className="error">Failed to load products</p>;
    }

    if (products.length === 0) {
        return <p className="error">No products found</p>
    }

    return (
        <>
            <div className="catalog-products-wrapper">
                {products.map((product) => (
                    <CatalogProductCard product={product} key={product._id} />
                ))}
            </div>
            { pages > 1 &&
                <CatalogPagination
                    currentPage={currentPage}
                    totalPages={pages}
                    onPageChange={changePage}
                /> }
        </>
    );
}