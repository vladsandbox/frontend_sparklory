import { useMemo, useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import { reviews1, reviews2, reviews3, reviews4, reviews5 } from "../../../assets";
import ReviewCard from "../../../components/ReviewCard";
import type { Product } from "../../../types/Products";
import SliderNavButtons from "@/components/SliderNavButtons/SliderNavButtons";

import "./index.scss";

type Props = {
    products: Product[];
    loading: boolean;
};

export default function Reviews({ products, loading }: Props) {
    const allReviews = useMemo(() => {
        if (!Array.isArray(products)) return [];
        return products.flatMap((product) => product.reviews || []);
    }, [products]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        mode: "snap",
        slides: {
            perView: 1,
            spacing: 0,
        },
        slideChanged(slider) {
            setCurrentIndex(slider.track.details.rel);
        },
    });

    useEffect(() => {
        if (instanceRef.current) {
            instanceRef.current.update();
        }
    }, [allReviews, instanceRef]);

    const handlePrev = () => {
        if (instanceRef.current) {
            instanceRef.current.prev();
        }
    };

    const handleNext = () => {
        if (instanceRef.current) {
            instanceRef.current.next();
        }
    };

    return (
        <div className="reviews-wrapper">
            <div
                className="wrapper"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "40px 60px",
                }}
            >
                <div style={{ paddingBottom: 98, width: 534 }}>
                    <h1 className="h1 title">Customer Experience</h1>
                    <p className="body description">
                        Seamless interactions that delight at every touchpoint.
                    </p>
                    <div className="avatar-container">
                        <div className="review-avatars">
                            {[reviews1, reviews2, reviews3, reviews4, reviews5].map(
                                (img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt={`review-${i}`}
                                        className="review-avatar"
                                        style={{ left: `${i * 40}px` }}
                                    />
                                )
                            )}
                        </div>
                        <p style={{ width: 127 }} className="text-filters">
                            2500+ Reviews
                        </p>
                    </div>
                </div>

                <div className="reviews-container">
                    {loading ? (
                        <p className="loading">Loading...</p>
                    ) : (
                        <>
                            {allReviews.length > 0 && (
                                <div ref={sliderRef} className="keen-slider">
                                    {allReviews.map((review, index) => (
                                        <div className="keen-slider__slide" key={index}>
                                            <ReviewCard review={review} />
                                        </div>
                                    ))}
                                </div>
                            )}
                            <SliderNavButtons
                                index={currentIndex}
                                maxIndex={allReviews.length - 1}
                                onPrev={handlePrev}
                                onNext={handleNext}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
