import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import type { Product } from "../../../types/Products";
import FavoriteButton from "../../../components/FavoriteButton";
import { useProductNavigation } from "../../../utils/hooks/useProductNavigation";
import styles from "./index.module.scss";

type Props = {
  products: Product[];
  loading: boolean;
  favoriteIds: Set<string>;
  onToggleFavorite: (productId: string, isFavorite: boolean) => void;
};

export default function RecommendedProducts({ products, loading, favoriteIds, onToggleFavorite }: Props) {
  const [index, setIndex] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3.5,
      spacing: 24,
    },
    slideChanged(slider) {
      setIndex(slider.track.details.rel);
    },
  });

  const { goToProduct } = useProductNavigation();
  const handlePrev = () => instanceRef.current?.prev();
  const handleNext = () => instanceRef.current?.next();

  if (loading) return <p className="wrapper">Loading recommendations...</p>;
  if (!products.length) return null;

  return (
    <div className="wrapper">
      <div className={styles.recommendedProductsWrapper}>
        <h2 className="h1" style={{ marginBottom: 60, textAlign: "center" }}>
          You may also like
        </h2>

        <div className={styles.recommendedContainer}>
          <div ref={sliderRef} className="keen-slider">
            {products.map((product) => (
              <div
                key={product._id}
                className={`keen-slider__slide ${styles.recommendedCard}`}
                onClick={() => goToProduct(product._id)}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={product.image?.[0]}
                    alt={product.name}
                    className={styles.productImage}
                  />
                </div>

                <div className={styles.cardContent}>
                  <FavoriteButton
                    productId={product._id}
                    initialFavorite={favoriteIds.has(product._id)}
                    onToggle={onToggleFavorite}
                  />
                  <p className="title-m">{product.name}</p>
                  <p className="body">{product.price}₴</p>
                </div>
              </div>
            ))}
          </div>

          <div className="nav-buttons" style={{ flexDirection: "column", gap: 24, marginLeft: 20 }}>
            <button
              onClick={handlePrev}
              disabled={index === 0}
              className="arrow left"
            />
            <button
              onClick={handleNext}
              disabled={index === Math.max(products.length - 3.5, 0)}
              className="arrow right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
