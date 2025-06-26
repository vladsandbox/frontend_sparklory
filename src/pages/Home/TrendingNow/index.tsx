import { useState, useMemo } from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import MaterialSelector from '../../../components/MaterialSelector/MaterialSelector';
import { Product } from '../../../types/Products';
import { gold, whiteGold, silver } from "../../../assets";
import { useProductNavigation } from "../../../utils/hooks/useProductNavigation";

import "./index.scss";

const materials = [
  { id: "silver", label: "Silver", img: silver },
  { id: "white-gold", label: "White Gold", img: whiteGold },
  { id: "gold", label: "Gold", img: gold },
];

const VISIBLE_SLIDES = 3;

type Props = {
  products: Product[];
  loading: boolean;
};

export default function TrendingNow({ products, loading }: Props) {
  const { goToProduct } = useProductNavigation();
  const trendingProducts = useMemo(() => {
    return Array.isArray(products)
      ? products.filter((product) => product.action?.includes("trendingNow"))
      : [];
  }, [products]);

  const TOTAL_SLIDES = Math.max(trendingProducts.length - VISIBLE_SLIDES + 1, 1);

  const [index, setIndex] = useState(0);
  const [selectedMaterials, setSelectedMaterials] = useState<Record<string, string>>({});

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: VISIBLE_SLIDES,
      spacing: 44,
    },
    slideChanged(slider) {
      setIndex(slider.track.details.rel);
    },
  });

  const handleMaterialChange = (productId: string, materialId: string) => {
    setSelectedMaterials((prev) => ({
      ...prev,
      [productId]: materialId,
    }));
  };

  const handleNext = () => instanceRef.current?.next();
  const handlePrev = () => instanceRef.current?.prev();

  const maxIndex = TOTAL_SLIDES - 1;
  const currentSlide = Math.min(index + 1, TOTAL_SLIDES);

  return (
    <div className="wrapper">
      <div className="trending-now">
        <h1 className="h1" style={{ marginBottom: 60, textAlign: "center" }}>
          Trending Now
        </h1>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="multi-slider-container">
            <div className="slider-window">
              <div ref={sliderRef} className="keen-slider">
                {trendingProducts.map((product) => {
                  const selected = selectedMaterials[product._id] || "silver";
                  return (
                    <div
                      className="keen-slider__slide slide-border"
                      key={product._id}
                      onClick={() => goToProduct(product._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="slide">
                        <img src={product.image?.[0]} alt={product.name} className="slide-image" />
                        <p className="title-m" style={{ height: 55 }}>{product.name}</p>

                        <MaterialSelector
                          productId={product._id}
                          selectedMaterial={selected}
                          onChange={(id) => handleMaterialChange(product._id, id)}
                          materials={materials}
                        />

                        <div className="product-actions">
                          <button
                            className="primary-btn button-text"
                            style={{ height: 40, width: 312, marginTop: 27 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log({
                                productId: product._id,
                                name: product.name,
                                material: selected,
                              });
                            }}
                          >
                            Add to Cart
                          </button>
                          <p className="h3">{product.price}₴</p>
                        </div>
                      </div>
                    </div>

                  );
                })}
              </div>
            </div>

            <div>
              <div className="progress-track">
                <div
                  className="progress-indicator"
                  style={{
                    width: `${100 / TOTAL_SLIDES}%`,
                    left: `${(index / maxIndex) * (100 - (100 / TOTAL_SLIDES))}%`,
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30, marginBottom: 40 }}>
                <span className="button-text">{String(currentSlide).padStart(2, '0')}</span>
                <span className="button-text">{String(TOTAL_SLIDES).padStart(2, '0')}</span>
              </div>

              <div className="nav-buttons" style={{ justifyContent: "center" }}>
                <button onClick={handlePrev} disabled={index === 0} className="arrow left" />
                <button onClick={handleNext} disabled={index === maxIndex} className="arrow right" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
