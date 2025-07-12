import { useMemo, useState } from "react";
import { useKeenSlider } from "keen-slider/react";

import MaterialSelector from "@/components/MaterialSelector/MaterialSelector";
import FavoriteButton from "@/components/FavoriteButton";
import type { Product } from "@/types/Products.ts";
import { silver, gold, whiteGold } from "@/assets";
import { useProductNavigation } from "@/utils/hooks/useProductNavigation.ts";
import { useFavorites } from "@/utils/hooks/useFavorite";

import "./index.scss";

const materials = [
  { id: "silver", label: "Silver", img: silver },
  { id: "white-gold", label: "White Gold", img: whiteGold },
  { id: "gold", label: "Gold", img: gold },
];

type Props = {
  products: Product[];
  loading: boolean;
};

export default function SpringSale({ products, loading }: Props) {
  const springSaleProducts = useMemo(() => {
    return products.filter((product) => product.action?.includes("Spring sale"));
  }, [products]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMaterials, setSelectedMaterials] = useState<Record<string, string>>({});
  const { favoriteIds, toggleFavorite } = useFavorites();

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

  const { goToProduct } = useProductNavigation();

  const handlePrev = () => {
    if (currentIndex > 0) slider.current?.prev();
  };

  const handleNext = () => {
    if (currentIndex < springSaleProducts.length - 4) slider.current?.next();
  };

  const handleMaterialChange = (productId: string, materialId: string) => {
    setSelectedMaterials((prev) => ({
      ...prev,
      [productId]: materialId,
    }));
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
              {springSaleProducts.map((product) => {
                const selected = selectedMaterials[product._id] || "silver";
                const isFavorite = favoriteIds.has(product._id);
                return (
                  <div className="keen-slider__slide product-slide" key={product._id}>
                    <div
                      className="product-card"
                      onClick={() => goToProduct(product._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="buttons-container">
                        <FavoriteButton
                          productId={product._id}
                          initialFavorite={isFavorite}
                          onToggle={(productId) => toggleFavorite(productId, !isFavorite)}
                        />
                      </div>
                      <img src={product.image?.[0]} alt={product.name} className="product-image" />

                      <div style={{ padding: "13px 24px 24px 24px" }}>
                        <MaterialSelector
                          productId={product._id}
                          selectedMaterial={selected}
                          onChange={(id) => handleMaterialChange(product._id, id)}
                          materials={materials}
                        />

                        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 27 }}>
                          <h3 className="product-name title-m">{product.name}</h3>

                          <ul className="product-description text-s">
                            {product.description.split(";").map((item, index) => (
                              <li key={index}>{item.trim()}</li>
                            ))}
                          </ul>

                          <p className="product-price h3">{product.price}₴</p>

                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button
                              className="primary-btn button-text"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log({
                                  productId: product._id,
                                  name: product.name,
                                  material: selected,
                                });
                              }}
                            >
                              Add to cart
                            </button>

                            <button
                              className="secondary-btn button-text"
                              onClick={(e) => {
                                e.stopPropagation();
                                goToProduct(product._id);
                              }}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="nav-buttons">
              <button onClick={handlePrev} className="arrow left" disabled={currentIndex === 0} />
              <button
                onClick={handleNext}
                className="arrow right"
                disabled={currentIndex >= springSaleProducts.length - 4}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
