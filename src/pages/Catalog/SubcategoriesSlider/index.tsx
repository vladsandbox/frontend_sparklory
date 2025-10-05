import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";

import { fetchCategory } from "@/store/thunks/categoriesThunk";
import type { AppDispatch, RootState } from "@/store";

import SliderNavButtons from "@/components/SliderNavButtons/SliderNavButtons.tsx";
import CatalogCard from "@/components/CatalogCard";
import type { Subcategory } from "@/types/Categories.ts";

import "keen-slider/keen-slider.min.css";
import "./index.scss";

type Props = { category: string };

export default function CatalogSubcategoriesSlider({ category }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const { singleCategory, loading, error } = useSelector((state: RootState) => state.categories);

    const [searchParams, setSearchParams] = useSearchParams();

    const [arrowDisabledPrev, setArrowDisabledPrev] = useState(true);
    const [arrowDisabledNext, setArrowDisabledNext] = useState(false);

    const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
        loop: false,
        mode: "snap",
        slides: { perView: 5.5 },
        breakpoints: {
            "(max-width: 1365px)": { slides: { perView: 5 } },
            "(max-width: 1260px)": { slides: { perView: 3.8 } },
            "(max-width: 1030px)":  { slides: { perView: 3.1 } },
            "(max-width: 860px)":  { slides: { perView: 2.1 } },
            "(max-width: 640px)":  { slides: { perView: 1.3 } },
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

    const handleClick = (subcategory: Subcategory) => {
        const newSearchParams = new URLSearchParams(searchParams);

        newSearchParams.delete('subcategory');
        newSearchParams.set('subcategory', subcategory.name);

        setSearchParams(newSearchParams);
    }

    useEffect(() => {
        dispatch(fetchCategory(category));
    }, [dispatch, category]);

    if (loading) return <div className="loading">Loading subcategories…</div>;
    if (error) return;
    if (!singleCategory?.subcategories?.length) return null;

    const subcategories = singleCategory.subcategories;

    return (
        <>
            <div className="subcategories-slider-wrapper wrapper">
                <div ref={sliderRef} className="subcategories-slider keen-slider">
                    {subcategories.map((subcategory) => (
                        <div key={subcategory._id} className="keen-slider__slide subcategories-slider__slide">
                            <CatalogCard cardData={subcategory} handleClick={() => handleClick(subcategory)} />
                        </div>
                    ))}
                </div>
                {
                    (!arrowDisabledPrev || !arrowDisabledNext) &&
                    <SliderNavButtons
                        isDisabledPrev={arrowDisabledPrev}
                        isDisabledNext={arrowDisabledNext}
                        onPrev={() => sliderInstance.current?.prev()}
                        onNext={() => sliderInstance.current?.next()}
                        direction="vertical"
                        className="subcategories-slider-wrapper__arrows"
                    />
                }
            </div>
            <hr className="divider" style={{ margin: "60px auto" }}/>
        </>
    );
}