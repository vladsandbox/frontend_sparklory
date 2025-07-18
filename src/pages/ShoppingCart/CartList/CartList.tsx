import CartItem from "../CartItem/CartItem";
import type { CartItem as CartItemType } from "@/types/Cart";

import styles from "./index.module.scss";

type Props = {
  products: CartItemType[];
  onRemove: (item: CartItemType) => void;
  onQuantityChange: (
    productId: string,
    quantity: number,
    size: string,
    material: string,
    insert: string | null
  ) => void;
};

export default function CartList({ products, onRemove, onQuantityChange }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className="title-m">Product</span>
        <div style={{ display: "flex", gap: 85 }}>
          <span className="title-m">Price</span>
          <span className="title-m">Quantity</span>
          <span className="title-m">Subtotal</span>
        </div>
      </div>

      {products.map((product) => (
        <CartItem
          key={`${product.product}-${product.size}-${product.material}-${product.insert}`}
          product={product}
          onRemove={onRemove}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
}
