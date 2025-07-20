import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "@/store/thunks/categoriesThunk";
import type { AppDispatch, RootState } from "@/store";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import CatalogSubcategoryCard from "@/pages/Catalog/SubcategoryCard";
import NextArrow from "@/assets/icons/arrow-right.svg?react";
import PrevArrow from "@/assets/icons/arrow-left.svg?react";

import "./index.scss";

type Props = { category: string };

export default function CatalogSubcategoriesSlider({ category }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const { singleCategory, loading, error } = useSelector(
        (s: RootState) => s.categories
    );
    const [currentSlide, setCurrentSlide] = useState(0);

    const perView = 5.5;

    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
        {
            loop: false,
            mode: "snap",
            slides: { perView, spacing: 24 },
            breakpoints: {
                "(max-width: 1024px)": { slides: { perView: 3.5, spacing: 16 } },
                "(max-width: 768px)":  { slides: { perView: 2.5, spacing: 12 } },
                "(max-width: 480px)":  { slides: { perView: 1.5, spacing: 8 } },
            },
            slideChanged(s) {
                setCurrentSlide(s.track.details.rel);
            },
        },
        []
    );

    useEffect(() => {
        dispatch(fetchCategory(category));
    }, [dispatch, category]);

    if (loading) return <div className="loading">Loading subcategories…</div>;
    if (error)   return <div className="error">{error}</div>;
    if (!singleCategory?.subcategories?.length) return null;

    const subs = singleCategory.subcategories;

    return (
        <div className="subcategories-slider-wrapper wrapper">
            <div ref={sliderRef} className="subcategories-slider keen-slider">
                {subs.map((sub) => (
                    <div key={sub._id} className="keen-slider__slide subcategories-slider__slide">
                        <CatalogSubcategoryCard subcategory={sub} />
                    </div>
                ))}
            </div>

            <button
                className="subcategories-slider__arrow subcategories-slider__arrow--left"
                onClick={() => slider.current?.prev()}
                disabled={currentSlide === 0}
            >
                <PrevArrow />
            </button>
            <button
                className="subcategories-slider__arrow subcategories-slider__arrow--right"
                onClick={() => slider.current?.next()}
                disabled={currentSlide >= subs.length - perView}
            >
                <NextArrow />
            </button>
        </div>
    );
}