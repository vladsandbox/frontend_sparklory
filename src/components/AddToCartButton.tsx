import React, { useState } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";

import { addToCart } from "@/store/thunks/cartThunk.ts";
import { postProductSubscribe } from "@/store/thunks/productsThunk";
import { useAuth } from "@/utils/hooks/useAuth.ts";
import type { Button as ButtonProps } from "@/types/BasicComponents.ts";
import type { ProductVariant } from "@/types/Products.ts";
import type { AppDispatch } from "@/store";
import CartIcon from "@/components/Icons/CartIcon.tsx";
import Button from "@/components/Button.tsx";
import SubscribePopup from "@/components/SubscribePopup";
import { getNotified } from "@/assets";

type Props = {
    productId: string;
    variant: ProductVariant | null;
    buttonSize?: ButtonProps["size"];
    buttonVariant?: ButtonProps["variant"];
    className?: string;
    withIcon?: boolean;
    iconClassName?: string;
};

export default function AddToCartButton({
    productId,
    className,
    variant,
    buttonSize = "normal",
    buttonVariant = "primary",
    withIcon = false,
    iconClassName = "",
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const isOutOfStock = !variant || variant.inStock === 0;

  const handleAddToCart = async () => {
    if (!variant) return;
    setLoading(true);
    try {
      await dispatch(
        addToCart({
          productId,
          quantity: 1,
          material: variant.material,
          size: variant.size,
          insert: variant.insert,
          guest: !isAuth,
        })
      ).unwrap();
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribeAuth = async () => {
    setLoading(true);
    try {
      await dispatch(postProductSubscribe({ productId })).unwrap();
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribeGuest = () => {
    setShowPopup(true);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (isOutOfStock) {
      if (isAuth) handleSubscribeAuth();
      else handleSubscribeGuest();
      return;
    }

    handleAddToCart();
  };

  const iconLeft = withIcon
    ? isOutOfStock
      ? <img src={getNotified} alt="Get Notified" className={clsx(iconClassName, "btn__icon-style")} />
      : <CartIcon className={iconClassName} />
    : undefined;

  return (
    <>
      <Button
        className={clsx(className, isOutOfStock && "disabled")}
        variant={buttonVariant}
        onClick={handleClick}
        size={buttonSize}
        iconLeft={iconLeft}
        disabled={loading}
      >
        {loading ? "Processing..." : isOutOfStock ? "Get Notified" : "Add to cart"}
      </Button>

      {!isAuth && showPopup && (
        <SubscribePopup
          productId={productId}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}
