import { useEffect, useState } from "react";

import { useProductNavigation } from "@/utils/hooks/useProductNavigation";
import { fetchProductById } from "@/utils/api";
import type { CartItem as CartItemType } from "@/types/Cart";
import type { Product } from "@/types/Products";

import styles from "./index.module.scss";

import { closeBtn, noImg } from "@/assets";

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
    <>
      <div className={styles.item}>
        <div className={styles.itemInner}>
          <button className={styles.remove} onClick={() => onRemove(product)}>
            <img src={closeBtn} alt="delete" width={18} height={18} />
          </button>

          <img
            className={`${styles.image} ${productData.image?.length ? "" : styles.noBorder}`}
            src={productData.image?.length ? productData.image[0] : noImg}
            alt={productData.name}
          />
          <div className={`text-filters ${styles.name}`} onClick={() => goToProduct(productData._id)}>
            {productData.name}
          </div>
        </div>


        <div className={styles.itemInner}>

          <div style={{ display: "flex" }}>
            <div className={`body ${styles.total}`}>{product.priceWithDiscount} ₴</div>

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
              {(product.priceWithDiscount * product.quantity)} ₴
            </div>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>
    </>
  );
}

