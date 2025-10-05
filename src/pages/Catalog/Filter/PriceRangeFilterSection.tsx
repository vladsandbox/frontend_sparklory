import { useEffect, useState } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import MinusIcon from "@/assets/icons/minus.svg?react";
import AddIcon from "@/assets/icons/add.svg?react";

type Props = {
    minPrice: string;
    maxPrice: string;
    fixedPriceRange: [number, number];
    onChange: (values: [string, string]) => void;
};

export default function PriceRangeFilterSection({ minPrice, maxPrice, fixedPriceRange, onChange }: Props) {
    const [isOpenFilterSection, setIsOpenFilterSection] = useState(true);

    const [localValues, setLocalValues] = useState({ min: minPrice, max: maxPrice });
    const [fixedMinPrice, fixedMaxPrice] = fixedPriceRange;

    useEffect(() => {
        setLocalValues({ min: minPrice, max: maxPrice });
    }, [minPrice, maxPrice]);

    const toggleFilterSection = () => {
        setIsOpenFilterSection(!isOpenFilterSection);
    };

    const handleSliderChange = (values: number | number[]) => {
        const [min, max] = values as number[];
        const newMin = min === fixedMinPrice ? '' : String(min);
        const newMax = max === fixedMaxPrice ? '' : String(max);
        onChange([newMin, newMax]);
    };

    const handleInputChange = (type: 'min' | 'max', value: string) => {
        if (/^\d*$/.test(value)) {
            setLocalValues(prev => ({ ...prev, [type]: value }));
        }
    };

    const handleInputBlur = () => {
        let minNum = localValues.min ? Number(localValues.min) : null;
        let maxNum = localValues.max ? Number(localValues.max) : null;

        // Output validation for fixed limits
        if (minNum !== null && minNum < fixedMinPrice) minNum = fixedMinPrice;
        if (maxNum !== null && maxNum > fixedMaxPrice) maxNum = fixedMaxPrice;
        if (minNum !== null && minNum > fixedMaxPrice) minNum = fixedMaxPrice;
        if (maxNum !== null && maxNum < fixedMinPrice) maxNum = fixedMinPrice;

        // Validation for value overlap
        if (minNum !== null && maxNum !== null && minNum > maxNum) {
            [minNum, maxNum] = [maxNum, minNum];
        }

        const finalMin = minNum === null ? '' : String(minNum);
        const finalMax = maxNum === null ? '' : String(maxNum);

        if (finalMin !== minPrice || finalMax !== maxPrice) {
            onChange([finalMin, finalMax]);
        } else if (localValues.min !== minPrice || localValues.max !== maxPrice) {
            setLocalValues({ min: minPrice, max: maxPrice });
        }
    };

    const sliderValue: [number, number] = [
        minPrice ? Number(minPrice) : fixedMinPrice,
        maxPrice ? Number(maxPrice) : fixedMaxPrice
    ];

    if (fixedPriceRange[0] === fixedPriceRange[1]) return null;

    return (
        <div className="filter-section">
            <div className="section-header" onClick={toggleFilterSection}>
                <p className="text-filters">Price range</p>
                {isOpenFilterSection ? <MinusIcon /> : <AddIcon />}
            </div>
            <div className={`section-options ${isOpenFilterSection ? "" : "hidden"}`}>

                <div className="price-slider-container">
                    <Slider
                        range
                        min={fixedMinPrice}
                        max={fixedMaxPrice}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        allowCross={false}
                        step={20}
                    />
                </div>

                <div className="price-range-inputs">
                    <div className="price-input-group">
                        <label htmlFor="min-price">From</label>
                        <div className="price-input-wrapper">
                            <input
                                id="min-price"
                                type="text"
                                pattern="\d*"
                                placeholder={String(fixedMinPrice)}
                                value={localValues.min}
                                onChange={(e) => handleInputChange('min', e.target.value)}
                                onBlur={handleInputBlur}
                                className="price-input"
                            />
                        </div>
                    </div>
                    <div className="price-input-group">
                        <label htmlFor="max-price">To</label>
                        <div className="price-input-wrapper">
                            <input
                                id="max-price"
                                type="text"
                                pattern="\d*"
                                placeholder={String(fixedMaxPrice)}
                                value={localValues.max}
                                onChange={(e) => handleInputChange('max', e.target.value)}
                                onBlur={handleInputBlur}
                                className="price-input"
                            />
                        </div>
                    </div>
                </div>

                <hr className="divider" style={{ margin: "27px 0" }} />
            </div>
        </div>
    );
}