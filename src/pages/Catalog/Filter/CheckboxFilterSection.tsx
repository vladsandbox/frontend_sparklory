import { useState } from "react";

import type { FilterSection } from "@/pages/Catalog/Filter/utils.ts";

import MinusIcon from "@/assets/icons/minus.svg?react";
import AddIcon from "@/assets/icons/add.svg?react";

type Props = {
    section: FilterSection;
    isLast: boolean;
    selectedOptions: string[];
    onChange: (key: string, value: string, checked: boolean) => void;
}

export default function CheckboxFilterSection({ section, isLast, selectedOptions, onChange }: Props) {
    const [isOpenFilterSection, setIsOpenFilterSection] = useState(true);

    const toggleFilterSection = () => {
        setIsOpenFilterSection(!isOpenFilterSection);
    };

    return (
        <div className="filter-section">
            <div className="section-header" onClick={toggleFilterSection}>
                <p className="text-filters">{section.title}</p>
                {isOpenFilterSection ? <MinusIcon /> : <AddIcon /> }
            </div>
            <div className={`section-options ${isOpenFilterSection ? "" : "hidden"}`}>
                {section.options.map((option) => (
                    <label key={option.value} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(option.value)}
                            onChange={(e) => onChange(section.key, option.value, e.target.checked)}
                        />
                        <span className="checkbox-custom"></span>
                        {option.label} ({option.count})
                    </label>
                ))}
                {!isLast && <hr className="divider" style={{margin: "27px 0"}}/>}
            </div>
        </div>
    );
}
