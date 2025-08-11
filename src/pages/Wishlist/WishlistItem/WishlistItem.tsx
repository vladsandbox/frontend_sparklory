import { useProductNavigation } from "@/utils/hooks/useProductNavigation";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";

import type { Product, ProductVariant } from "@/types/Products";

import styles from "./index.module.scss";

import { closeBtn, noImg } from "@/assets";

type Props = {
  product: Product;
  onRemove: (id: string) => void;
};

export default function WishlistItem({ product, onRemove }: Props) {
  const { goToProduct } = useProductNavigation();
  const firstVariant: ProductVariant | undefined = product.variants[0];

  const handleRemove = () => {
    onRemove(product._id);
  };

  const price = firstVariant?.price ?? 0;
  const inStock = firstVariant?.inStock ?? 0;

  return (
    <>
      <div className={styles.item}>
        <button className={styles.remove} onClick={handleRemove}>
          <img src={closeBtn} alt="delete" width={18} height={18} />
        </button>


        <div className={styles.itemInner}>
          <img
            className={`${styles.image} ${product.image?.length ? "" : styles.noBorder}`}
            src={product.image?.length ? product.image[0] : noImg}
            alt={product.name}
          />
          <div className={`text-filters ${styles.name}`} onClick={() => goToProduct(product._id)}>{product.name}</div>
          <div className={`body ${styles.price}`}>{price} ₴</div>
          <div className={`body ${styles.stock} ${!inStock ? styles.disabled : ""}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        <AddToCartButton
          productId={product._id}
          variant={firstVariant ?? null}
          withIcon
          className={`big button-text ${inStock ? "primary-btn" : "secondary-btn"} ${styles.button}`}
          iconClassName={`${styles.icon} ${!inStock ? styles.disabledIcon : ""}`}
        />
      </div>

      <div className={styles.divider}></div>
    </>
  );
}
