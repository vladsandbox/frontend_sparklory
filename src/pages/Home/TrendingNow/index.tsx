import { useState, useMemo } from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import MaterialSelector from '@/components/MaterialSelector/MaterialSelector';
import type { Product } from '@/types/Products';
import { MATERIALS } from "@/components/MaterialSelector/materials";
import { useProductNavigation } from "@/utils/hooks/useProductNavigation";
import AddToCartButton from '@/components/AddToCartButton/AddToCartButton';
import type { ProductVariant } from '../../../types/Products';
import SliderNavButtons from '@/components/SliderNavButtons/SliderNavButtons';

import "./index.scss";

import { noImg } from "@/assets";

const VISIBLE_SLIDES = 3;

type Props = {
  products: Product[];
  loading: boolean;
};

export default function TrendingNow({ products, loading }: Props) {

  const { goToProduct } = useProductNavigation();
  const trendingProducts = useMemo(() => {
    return Array.isArray(products)
      ? products.filter((product) => product.action?.includes("Trending now"))
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
                  const selectedMaterialId = selectedMaterials[product._id] || product.variants[0]?.material;
                  const currentVariant: ProductVariant | null =
                    product.variants.find((v) => v.material === selectedMaterialId) || null;

                  const materials = product.variants.map((variant) => {
                    const found = MATERIALS.find((m) => m.id === variant.material);
                    return found ?? {
                      id: variant.material,
                      label: variant.material.replace(/\b\w/g, (c) => c.toUpperCase()),
                      img: noImg,
                    };
                  });

                  return (
                    <div
                      className="keen-slider__slide slide-border"
                      key={product._id}
                      onClick={() => goToProduct(product._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="slide">
                        {product.image.length ? (
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            className="slide-image"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = noImg;
                              e.currentTarget.classList.add("is-fallback");
                            }}
                          />
                        ) : (
                          <img src={noImg} alt="No photo" className="slide-image is-fallback" />
                        )}

                        <p className="title-m" style={{ height: 55 }}>{product.name}</p>

                        <MaterialSelector
                          productId={product._id}
                          selectedMaterial={selectedMaterialId}
                          onChange={(id) => handleMaterialChange(product._id, id)}
                          materials={materials}
                        />

                        <div className="product-actions">
                          <AddToCartButton
                            productId={product._id}
                            variant={currentVariant && currentVariant.inStock > 0 ? currentVariant : null}
                            className="primary-btn button-text button-trending"
                          />
                          <p className="h3">{currentVariant?.price ?? product.variants[0]?.price}₴</p>
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

              <SliderNavButtons
                isDisabledPrev={index === 0}
                isDisabledNext={index >= maxIndex}
                onPrev={handlePrev}
                onNext={handleNext}
                className="slider-nav"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
