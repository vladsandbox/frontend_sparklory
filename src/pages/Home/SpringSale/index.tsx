import { useMemo, useState } from "react";
import { useKeenSlider } from "keen-slider/react";

import type { Product } from "@/types/Products.ts";
import SliderNavButtons from "@/components/SliderNavButtons/SliderNavButtons";

import "./index.scss";
import CatalogProductCard from "@/pages/Catalog/ProductCard";

type Props = {
  products: Product[];
  loading: boolean;
};

export default function SpringSale({ products, loading }: Props) {
  const springSaleProducts = useMemo(() => {
    return products.filter((product) => product.action?.includes("Spring sale"));
  }, [products]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    slides: {
      origin: "auto",
      perView: 4,
      spacing: 24,
    },
    slideChanged(s) {
      setCurrentIndex(s.track.details.rel);
    },
  });

  const handlePrev = () => {
    if (currentIndex > 0) slider.current?.prev();
  };

  const handleNext = () => {
    if (currentIndex < springSaleProducts.length - 4) slider.current?.next();
  };

  return (
    <div className="wrapper">
      <div className="spring-sale-wrapper">
        <h1 className="h1 title">Spring Sale</h1>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <div ref={sliderRef} className="keen-slider spring-slider">
              {springSaleProducts.map((product) => (
                <div className="keen-slider__slide product-slide" key={product._id}>
                  <CatalogProductCard product={product} noHoverExpand />
                </div>
              ))}
            </div>

            {springSaleProducts.length > 4 && (
              <SliderNavButtons
                isDisabledPrev={currentIndex === 0}
                isDisabledNext={currentIndex >= springSaleProducts.length - 4}
                onPrev={handlePrev}
                onNext={handleNext}
                className="slider-nav"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
