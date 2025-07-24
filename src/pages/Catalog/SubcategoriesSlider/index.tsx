import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "@/store/thunks/categoriesThunk";
import type { AppDispatch, RootState } from "@/store";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import CatalogSubcategoryCard from "@/pages/Catalog/SubcategoryCard";
import SliderNavButtons from "@/components/SliderNavButtons/SliderNavButtons.tsx";

import "./index.scss";

type Props = { category: string };

export default function CatalogSubcategoriesSlider({ category }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const { singleCategory, loading, error } = useSelector((state: RootState) => state.categories);

    const [arrowDisabledPrev, setArrowDisabledPrev] = useState(true);
    const [arrowDisabledNext, setArrowDisabledNext] = useState(false);

    const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
        loop: false,
        mode: "snap",
        slides: { perView: 5.5, spacing: 24 },
        breakpoints: {
            "(max-width: 1260px)": { slides: { perView: 4.5, spacing: 16 } },
            "(max-width: 1030px)":  { slides: { perView: 3.5, spacing: 12 } },
            "(max-width: 860px)":  { slides: { perView: 2.5, spacing: 8 } },
            "(max-width: 650px)":  { slides: { perView: 1.5, spacing: 4 } },
            "(max-width: 470px)":  { slides: { perView: 1 } },
        },

        created(s) {
            const maxIdx = s.track.details.maxIdx;
            setArrowDisabledNext(maxIdx === 0);
        },

        slideChanged(s) {
            const slide = s.track.details.rel;
            const maxIdx = s.track.details.maxIdx;
            setArrowDisabledPrev(slide === 0);
            setArrowDisabledNext(slide === maxIdx);
        },

        updated(s) {
            const slide = s.track.details.rel;
            const maxIdx = s.track.details.maxIdx;
            setArrowDisabledPrev(slide === 0);
            setArrowDisabledNext(slide === maxIdx);
        }
    });

    useEffect(() => {
        dispatch(fetchCategory(category));
    }, [dispatch, category]);

    if (loading) return <div className="loading">Loading subcategories…</div>;
    if (error)   return <div className="error">{error}</div>;
    if (!singleCategory?.subcategories?.length) return null;

    const subcategories = singleCategory.subcategories;

    return (
        <div className="subcategories-slider-wrapper wrapper">
            <div ref={sliderRef} className="subcategories-slider keen-slider">
                {subcategories.map((subcategory) => (
                    <div key={subcategory._id} className="keen-slider__slide subcategories-slider__slide">
                        <CatalogSubcategoryCard subcategory={subcategory} />
                    </div>
                ))}
            </div>

            <SliderNavButtons
                isDisabledPrev={arrowDisabledPrev}
                isDisabledNext={arrowDisabledNext}
                onPrev={() => sliderInstance.current?.prev()}
                onNext={() => sliderInstance.current?.next()}
                direction="vertical"
                className="subcategories-slider-wrapper__arrows"
            />
        </div>
    );
}