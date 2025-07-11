import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import type { Product } from "../../../types/Products";
import { useProductNavigation } from "../../../utils/hooks/useProductNavigation";
import styles from "./index.module.scss";
import CatalogProductCard from "@/pages/Catalog/ProductCard";

type Props = {
  products: Product[];
  loading: boolean;
};

export default function RecommendedProducts({ products, loading }: Props) {
  const [index, setIndex] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 3.5, spacing: 24 },
    slideChanged(slider) {
      setIndex(slider.track.details.rel);
    },
  });

  const { goToProduct } = useProductNavigation();

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
            {products.map((product) => {
              return (
                <div
                  key={product._id}
                  className={`keen-slider__slide `}
                  onClick={() => goToProduct(product._id)}
                  style={{ cursor: "pointer" }}
                >
                  <CatalogProductCard product={product} />
                </div>
              );
            })}
          </div>

          <div className="nav-buttons" style={{ flexDirection: "column", gap: 24, marginLeft: 20 }}>
            <button onClick={() => instanceRef.current?.prev()} disabled={index === 0} className="arrow left" />
            <button
              onClick={() => instanceRef.current?.next()}
              disabled={index >= products.length - 3.5}
              className="arrow right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
