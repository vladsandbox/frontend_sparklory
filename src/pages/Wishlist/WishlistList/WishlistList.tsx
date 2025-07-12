import WishlistItem from "../WishlistItem/WishlistItem";
import type { Product } from "@/types/Products";

import styles from "./index.module.scss";

type Props = {
  products: Product[];
  onRemove: (id: string) => void;
};

export default function WishlistList({ products, onRemove }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className="title-m">Product</span>
        <div style={{ display: "flex", gap: 85 }}>
          <span className="title-m">Unit Price</span>
          <span className="title-m">Stock Status</span>
        </div>
      </div>

      {products.map((product) => (
        <WishlistItem key={product._id} product={product} onRemove={onRemove} />
      ))}
    </div>
  );
}
