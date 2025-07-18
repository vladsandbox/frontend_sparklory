import { useEffect, useState } from "react";

import { useProductNavigation } from "@/utils/hooks/useProductNavigation";
import { fetchProductById } from "@/utils/api";
import type { CartItem as CartItemType } from "@/types/Cart";
import type { Product } from "@/types/Products";

import styles from "./index.module.scss";

type Props = {
  product: CartItemType;
  onRemove: (item: CartItemType) => void;
  onQuantityChange: (id: string, quantity: number, size: string, material: string, insert: string | null) => void;
};

export default function CartItem({ product, onRemove, onQuantityChange }: Props) {
  const { goToProduct } = useProductNavigation();
  const [productData, setProductData] = useState<Product | null>(null);

  const insertValue = product.insert ?? "";

  useEffect(() => {
    fetchProductById(product.product)
      .then(setProductData)
      .catch(() => setProductData(null));
  }, [product.product]);

  if (!productData) {
    return (
      <div className={styles.item}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className={styles.item}>
      <button className={styles.remove} onClick={() => onRemove(product)}>✕</button>

      <div className={styles.itemInner}>
        <img
          className={styles.image}
          src={productData.image?.[0] || "/placeholder.jpg"}
          alt={productData.name}
        />

        <div className={`body ${styles.name}`} onClick={() => goToProduct(productData._id)}>
          {productData.name}
        </div>

        <div style={{ display: "flex", gap: 85 }}>
          <div className={`body ${styles.price}`}>{product.price}₴</div>

          <div className={styles.quantityWrapper}>
            <button
              className={styles.quantityBtn}
              onClick={() => product.quantity > 1 && onQuantityChange(product.product, -1, product.size, product.material, insertValue)}
              disabled={product.quantity <= 1}
            >
              −
            </button>
            <span className={`${styles.quantityText} text-s`}>{product.quantity}</span>
            <button
              className={styles.quantityBtn}
              onClick={() => onQuantityChange(product.product, 1, product.size, product.material, insertValue)}
            >
              +
            </button>
          </div>

          <div className={`body ${styles.total}`}>
            {(product.price * product.quantity).toFixed(2)}₴
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>
    </div>
  );
}

