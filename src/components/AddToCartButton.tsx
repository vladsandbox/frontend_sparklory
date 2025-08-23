import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/thunks/cartThunk.ts";
import { useAuth } from "@/utils/hooks/useAuth.ts";
import CartIcon from "@/components/Icons/CartIcon.tsx";
import type { ProductVariant } from "@/types/Products.ts";
import type { AppDispatch } from "@/store";
import Button from "@/components/Button.tsx";

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

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
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
    <Button
      className={className ?? "primary-btn button-text"}
      onClick={handleClick}
      disabled={disabled}
      size="normal"
      iconLeft= {withIcon && (
          <CartIcon
              className={`${iconClassName} ${disabled ? "stroke-disabled" : "stroke-white"}`}
          />
      )}
    >
      {disabled ? "Unavailable" : "Add to cart"}
    </Button>
  );
}
