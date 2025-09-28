import Button from "@/components/Button.tsx";
import FilterIcon from "@/assets/icons/filter.svg?react";

type Props = {
    dataCount: number;
    loading: boolean;
    onFilterOpen: () => void;
};

export default function ProductsListFilterSection({ dataCount, onFilterOpen }: Props) {
    const dataCountText = `${dataCount} ${dataCount === 1 ? "item has" : "items have"} been found`;

    return (
        <div className="catalog-filter-section">
            <span className="catalog-products-count">
                {dataCountText}
            </span>

            <span className="catalog-filter-interactive">
                <Button
                    variant="secondary"
                    iconRight={<FilterIcon />}
                    onClick={onFilterOpen}
                >
                    Filters
                </Button>
            </span>
        </div>
    );
}
