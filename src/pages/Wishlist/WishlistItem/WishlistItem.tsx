import { useProductNavigation } from "@/utils/hooks/useProductNavigation";
import type { Product } from "@/types/Products";

import styles from "./index.module.scss";

type Props = {
  product: Product;
  onRemove: (id: string) => void;
};

export default function WishlistItem({ product, onRemove }: Props) {
  const { goToProduct } = useProductNavigation();

  const handleRemove = () => {
    onRemove(product._id);
  };

  return (
    <>
      <div className={styles.item}>
        <button className={styles.remove} onClick={handleRemove}>✕</button>

        <div className={styles.itemInner}>
          <img className={styles.image} src={product.image?.[0]} alt={product.name} />
          <div className={`body ${styles.name}`} onClick={() => goToProduct(product._id)}>{product.name}</div>
          <div className={`body ${styles.price}`}>{product.price}₴</div>
          <div className={`body ${styles.stock} ${!product.inStock ? styles.disabled : ""}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        <button
          className={`${product.inStock ? "primary-btn" : "secondary-btn"} big button-text ${styles.button}`}
          onClick={(e) => e.stopPropagation()}
          disabled={!product.inStock}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.icon} ${!product.inStock ? styles.disabledIcon : ""}`}
          >
            <path
              d="M11.2 8.66675H20.8C25.3334 8.66675 25.7867 10.7867 26.0934 13.3734L27.2934 23.3734C27.68 26.6534 26.6667 29.3334 22 29.3334H10.0134C5.33337 29.3334 4.32003 26.6534 4.72003 23.3734L5.92004 13.3734C6.21338 10.7867 6.6667 8.66675 11.2 8.66675Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.667 10.6667V6.00008C10.667 4.00008 12.0003 2.66675 14.0003 2.66675H18.0003C20.0003 2.66675 21.3337 4.00008 21.3337 6.00008V10.6667"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M27.2137 22.7065H10.667"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Add to cart
        </button>
      </div>

      <div className={styles.divider}></div>
    </>
  );
}
