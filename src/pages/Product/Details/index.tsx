import { useState, useMemo } from "react";
import { useKeenSlider } from "keen-slider/react";

import MaterialSelector from "@/components/MaterialSelector/MaterialSelector";
import SizeSelector from "@/components/SizeSelector";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import { useFavorites } from "@/utils/hooks/useFavorite";
import { MATERIALS } from "@/components/MaterialSelector/materials.ts";
import { noImg } from "@/assets";

import type { Product, ProductVariant } from "@/types/Products";

import ProductTabs from "./ProductTabs";
import styles from "./index.module.scss";

type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {
  const [selectedMaterial, setSelectedMaterial] = useState(product.variants[0]?.material ?? "");
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size ?? "");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { favoriteIds, toggleFavorite } = useFavorites();
  const isFavorite = favoriteIds.has(product._id);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentImageIndex(slider.track.details.rel);
    },
  });

  // ✅ Подготовка материалов и размеров
  const materials = useMemo(() => {
    const uniqueMaterials = [...new Set(product.variants.map(v => v.material))];
    return uniqueMaterials.map((id) => {
      const found = MATERIALS.find((m) => m.id === id);
      return found ?? { id, label: id.charAt(0).toUpperCase() + id.slice(1), img: noImg };
    });
  }, [product.variants]);

  const sizes = useMemo(() => {
    return [...new Set(product.variants.filter(v => v.material === selectedMaterial).map(v => v.size))];
  }, [product.variants, selectedMaterial]);

  // ✅ Поиск текущего варианта
  const currentVariant: ProductVariant | null = useMemo(() => {
    return product.variants.find(
      (v) =>
        v.material === selectedMaterial &&
        v.size === selectedSize
    ) || null;
  }, [product.variants, selectedMaterial, selectedSize]);

  const images = product.image.length >= 3
    ? product.image
    : [...product.image, ...Array(3 - product.image.length).fill(product.image[0])];

  return (
    <div className="wrapper">
      <div className={styles["product-container"]}>
        <div className={styles.imageSection}>
          <div className={`keen-slider ${styles.slider}`} ref={sliderRef}>
            {images.map((src, i) => (
              <div className={`keen-slider__slide ${styles.slide}`} key={i}>
                <img src={src} alt={`${product.name} ${i}`} className={styles.mainImage} />
              </div>
            ))}
          </div>

          <div className={`nav-buttons ${styles.containerButtons}`}>
            <button onClick={() => instanceRef.current?.prev()} className="arrow left" disabled={currentImageIndex === 0} />
            <button onClick={() => instanceRef.current?.next()} className="arrow right" disabled={currentImageIndex === images.length - 1} />
          </div>

          <div className={styles.thumbnails}>
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Thumbnail ${idx}`}
                className={`${styles.thumbnail} ${currentImageIndex === idx ? styles.active : ""}`}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
              />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 536 }}>
          <div>
            <h2 className="h2">{product.name}</h2>
            <p className="text-xxl" style={{ marginBottom: 52, marginTop: 32 }}>
              {currentVariant?.price ?? product.variants[0]?.price ?? 0}₴
            </p>
            <p className={`body ${styles.description}`}>{product.description}</p>
          </div>

          <div className={styles["product-option"]}>
            <div>
              <p className="h3">Color</p>
              <MaterialSelector
                productId={product._id}
                selectedMaterial={selectedMaterial}
                onChange={setSelectedMaterial}
                materials={materials}
              />
            </div>

            {product.category === "rings" && sizes.length > 0 && (
              <SizeSelector sizes={sizes} selected={selectedSize} onSelect={setSelectedSize} />
            )}

            <div>
              <p className="h3">Quantity</p>
              <div className={styles.quantityWrapper}>
                <button className={styles.quantityBtn} onClick={() => setQuantity((q) => Math.max(q - 1, 1))}>-</button>
                <p className={`${styles.quantityText} text-s`}>{quantity}</p>
                <button className={styles.quantityBtn} onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
            </div>
          </div>

          <div className={styles["button-container"]}>
            <AddToCartButton productId={product._id} variant={currentVariant} />
            <button className="secondary-btn big button-text" onClick={() => toggleFavorite(product._id, !isFavorite)}>
              {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      <ProductTabs
        details={product.description}
        shipping={`Standard Shipping: 3–5 business days (Free over $100)
Express Shipping: 1–2 business days (calculated at checkout)
Returns: Free 14-day return policy on unworn items
Packaging: Shipped in eco-friendly gift box`}
      />
    </div>
  );
}
