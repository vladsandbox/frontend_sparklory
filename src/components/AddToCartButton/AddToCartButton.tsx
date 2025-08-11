import { useDispatch } from "react-redux";
import { addToCart } from "@/store/thunks/cartThunk";
import { useAuth } from "@/utils/hooks/useAuth";
import CartIcon from "@/components/Icons/CartIcon";
import type { ProductVariant } from "@/types/Products";
import type { AppDispatch } from "@/store";

type Props = {
  productId: string;
  variant: ProductVariant | null;
  className?: string;
  withIcon?: boolean;
  iconClassName?: string;
};

export default function AddToCartButton({
  productId,
  variant,
  className,
  withIcon = false,
  iconClassName = "",
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useAuth();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!variant) return;

    dispatch(
      addToCart({
        productId,
        quantity: 1,
        material: variant.material,
        size: variant.size,
        insert: variant.insert,
        guest: !isAuth,
      })
    );
  };

  const disabled = !variant || variant.inStock === 0;

  return (
    <button
      className={className ?? "primary-btn button-text"}
      onClick={handleClick}
      disabled={disabled}
    >
      {withIcon && (
        <CartIcon
          className={`${iconClassName} ${disabled ? "stroke-disabled" : "stroke-white"}`}
        />
      )}
      {disabled ? "Unavailable" : "Add to cart"}
    </button>
  );
}
