import React from "react";
import SearchIcon from '@/assets/icons/search.svg?react';

type Props = {
    searchTerm: string;
    onChange: (value: string) => void;
    onEnter: () => void;
};

export default function SearchFilterSection({ searchTerm, onChange, onEnter }: Props) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onEnter();
        }
    };

    return (
        <div className="search-filter-section">
            <SearchIcon className="search-icon" />
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="search-input"
            />
        </div>
    );
}