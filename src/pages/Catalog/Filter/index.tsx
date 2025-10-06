import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useSearchParams } from "react-router-dom";

import { capitalizeFirstLetter } from "@/utils/wordsFormatting.ts";
import CheckboxFilterSection from "@/pages/Catalog/Filter/CheckboxFilterSection.tsx";
import PriceRangeFilterSection from "@/pages/Catalog/Filter/PriceRangeFilterSection.tsx";
import Button from "@/components/Button.tsx";

import SearchFilterSection from "@/pages/Catalog/Filter/SearchFilterSection.tsx";
import { productsCountsToSections } from "@/pages/Catalog/Filter/utils.ts";
import { fetchProductsCounts } from "@/store/thunks/productsThunk.ts";

import CloseCircleIcon from "@/assets/icons/close-circle.svg?react";
import CloseIcon from "@/assets/icons/close-btn.svg?react";
import "./index.scss";

type SelectedFilters = Record<string, string[]>;
type PriceRange = { min: string; max: string };

interface FilterProps {
    isOpen: boolean;
    onClose: () => void;
    category?: string;
}

export default function Filter({ isOpen, onClose, category }: FilterProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
    const [priceRange, setPriceRange] = useState<PriceRange>({ min: "", max: "" });
    const [searchTerm, setSearchTerm] = useState('');

    const filterCounts = useSelector((state: RootState) => state.products.filterCounts);
    const fixedPriceRange = useMemo(() => [filterCounts.price.min, filterCounts.price.max], [filterCounts]);
    const filterSections = useMemo(() => productsCountsToSections(filterCounts || {}), [filterCounts]);

    useEffect(() => {
        if (isOpen) {
            const currentFilters: SelectedFilters = {};
            filterSections.forEach(section => {
                const values = searchParams.getAll(section.key);
                if (values.length > 0) {
                    currentFilters[section.key] = values;
                }
            });
            setSelectedFilters(currentFilters);

            const minPrice = searchParams.get('minPrice') || '';
            const maxPrice = searchParams.get('maxPrice') || '';
            setPriceRange({ min: minPrice, max: maxPrice });

            const currentSearch = searchParams.get('search') || '';
            setSearchTerm(currentSearch);
        }
    }, [isOpen, searchParams, filterSections]);

    const SINGLE_SELECT_KEYS = ['engraving'];
    const updateSingleSelect = (currentValues: string[], value: string): string[] => {
        const isAlreadySelected = currentValues[0] === value;
        return isAlreadySelected ? [] : [value];
    };

    const updateMultiSelect = (currentValues: string[], value: string, isChecked: boolean): string[] => {
        const valueExists = currentValues.includes(value);
        if (isChecked && !valueExists) {
            return [...currentValues, value];
        }
        if (!isChecked && valueExists) {
            return currentValues.filter(v => v !== value);
        }
        return currentValues;
    };

    const handleFilterChange = (key: string, value: string, isChecked: boolean) => {
        const isSingleSelect = SINGLE_SELECT_KEYS.includes(key);

        setSelectedFilters(prev => {
            const newFilters = { ...prev };
            const currentValues = prev[key] || [];

            const newKeyValues = isSingleSelect
                ? updateSingleSelect(currentValues, value)
                : updateMultiSelect(currentValues, value, isChecked);

            if (newKeyValues.length > 0) {
                newFilters[key] = newKeyValues;
            } else {
                delete newFilters[key];
            }

            return newFilters;
        });
    };

    const handlePriceChange = (values: [string, string]) => {
        setPriceRange({
            min: values[0],
            max: values[1],
        });
    };

    const usedFilters = useMemo(() => {
        const tags = Object.entries(selectedFilters).flatMap(([key, values]) =>
            values.map(value => {
                const section = filterSections.find(s => s.key === key);
                const option = section?.options.find(o => o.value === value);
                return {
                    key,
                    value: value ?? "Other",
                    label: option?.label || capitalizeFirstLetter(value),
                };
            })
        );

        if (priceRange.min && fixedPriceRange[0] !== Number(priceRange.min)) {
            tags.push({ key: 'minPrice', value: priceRange.min, label: `From ${priceRange.min}₴` });
        }

        if (priceRange.max && fixedPriceRange[1] !== Number(priceRange.max)) {
            tags.push({ key: 'maxPrice', value: priceRange.max, label: `To ${priceRange.max}₴` });
        }

        if (searchTerm) {
            tags.push({ key: 'search', value: searchTerm, label: `Search: "${searchTerm}"` });
        }

        return tags;
    }, [selectedFilters, priceRange, fixedPriceRange, filterSections, searchTerm]);

    const handleRemoveTag = (key: string, value: string) => {
        switch (key) {
            case 'minPrice':
                setPriceRange(prev => ({ ...prev, min: '' }));
                break;
            case 'maxPrice':
                setPriceRange(prev => ({ ...prev, max: '' }));
                break;
            case 'search':
                setSearchTerm('');
                break;
            default:
                handleFilterChange(key, value, false);
        }
    };

    const handleApplyFilters = () => {
        const newSearchParams = new URLSearchParams(searchParams);

        filterSections.forEach(section => newSearchParams.delete(section.key));

        Object.entries(selectedFilters).forEach(([key, values]) => {
            values.forEach(value => newSearchParams.append(key, value));
        });

        newSearchParams.delete('minPrice');
        newSearchParams.delete('maxPrice');

        if (priceRange.min && fixedPriceRange[0] !== Number(priceRange.min)) {
            newSearchParams.set('minPrice', priceRange.min);
        }

        if (priceRange.max && fixedPriceRange[1] !== Number(priceRange.max)) {
            newSearchParams.set('maxPrice', priceRange.max);
        }

        if (searchTerm) {
            newSearchParams.set('search', searchTerm);
        } else {
            newSearchParams.delete('search');
        }

        newSearchParams.set('page', '1');

        setSearchParams(newSearchParams);
        onClose();
    };

    const handleClearFilters = () => {
        setSelectedFilters({});
        setPriceRange({ min: "", max: "" });
        setSearchTerm('');
    };

    useEffect(() => {
        dispatch(category ? fetchProductsCounts({ category }) : fetchProductsCounts());
    }, [category, dispatch]);

    return (
        <div className={`catalog-filter-panel ${isOpen ? "open" : ""}`}>
            <div className="filter-header">
                <h2 className="filter-title h2">Filters</h2>
                <CloseCircleIcon onClick={onClose} className="close-btn"/>
            </div>
            <hr className="divider" />
            <div className="filter-content">
                <div className="used-filters-section">
                    <p className="section-subtitle text-xs">Used filters</p>
                    <div className="used-filters-tags">
                        {usedFilters.length
                            ? usedFilters.map(filter => (
                                <div key={`${filter.key}-${filter.value}`} className="tag text-filters">
                                    {filter.label}
                                    <CloseIcon
                                        className="remove-tag-icon"
                                        onClick={() => handleRemoveTag(filter.key, filter.value)}
                                    />
                                </div>
                            ))
                            : <p className="text-filters no-filters">No filters selected</p>}
                    </div>
                </div>

                <SearchFilterSection
                    searchTerm={searchTerm}
                    onChange={setSearchTerm}
                    onEnter={handleApplyFilters}
                />

                <PriceRangeFilterSection
                    minPrice={priceRange.min}
                    maxPrice={priceRange.max}
                    fixedPriceRange={[fixedPriceRange[0], fixedPriceRange[1]]}
                    onChange={handlePriceChange}
                />

                {filterSections.map((section, index) =>
                    <CheckboxFilterSection
                        section={section}
                        isLast={index === filterSections.length - 1}
                        key={section.key}
                        selectedOptions={selectedFilters[section.key] || []}
                        onChange={handleFilterChange}
                    />
                )}
            </div>
            <div className="filter-footer">
                <Button variant="secondary" className="footer-btn" onClick={handleClearFilters}>Delete all</Button>
                <Button variant="primary" className="footer-btn" onClick={handleApplyFilters}>View</Button>
            </div>
        </div>
    );
}