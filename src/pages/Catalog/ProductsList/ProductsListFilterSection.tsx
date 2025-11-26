import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import Button from "@/components/Button.tsx";

import FilterIcon from "@/assets/icons/filter.svg?react";
import SortIcon from "@/assets/icons/sort-arrows.svg?react";
import SortIconUp from "@/assets/icons/full-arrow-up.svg?react";
import SortIconDown from "@/assets/icons/full-arrow-down.svg?react";

type Props = {
    total: number;
    loading: boolean;
    onFilterOpen: () => void;
};

export default function ProductsListFilterSection({ total, onFilterOpen }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState(searchParams.get("sort"));

    useEffect(() => {
        setSort(searchParams.get("sort"));
    }, [searchParams]);

    const getSortIcon = () => {
        if (sort === "price_desc") return <SortIconDown />;
        if (sort === "price_asc") return <SortIconUp />;
        return <SortIcon />;
    };

    const handleSortChange = useCallback(() => {
        const nextSort = sort === "price_desc" ? "price_asc" : "price_desc";
        setSearchParams(prev => {
            prev.set('sort', nextSort);
            return prev;
        }, { replace: true });
    }, [sort, setSearchParams]);

    const totalText = `${total} ${total === 1 ? "item has" : "items have"} been found`;

    return (
        <div className="catalog-filter-section">
            <span className="catalog-products-count">
                {totalText}
            </span>
            <div className="catalog-filter-section-buttons">
                <span className="catalog-filter-interactive">
                    <Button
                        variant="secondary"
                        iconRight={<FilterIcon />}
                        onClick={onFilterOpen}
                    >
                        Filters
                    </Button>
                </span>
                <span className="catalog-filter-interactive">
                    <Button
                        variant="empty"
                        iconRight={getSortIcon()}
                        onClick={handleSortChange}
                    >
                        Price
                    </Button>
                </span>
            </div>
        </div>
    );
}
