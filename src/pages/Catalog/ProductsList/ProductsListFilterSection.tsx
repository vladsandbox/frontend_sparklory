import Button from "@/components/Button.tsx";
import FilterIcon from "@/assets/icons/filter.svg?react";

type Props = {
    total: number;
    loading: boolean;
    onFilterOpen: () => void;
};

export default function ProductsListFilterSection({ total, onFilterOpen }: Props) {
    const totalText = `${total} ${total === 1 ? "item has" : "items have"} been found`;

    return (
        <div className="catalog-filter-section">
            <span className="catalog-products-count">
                {totalText}
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
