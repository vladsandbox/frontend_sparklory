import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/utils/hooks/useAuth";
import type { RootState, AppDispatch } from "@/store";
import { toggleWishlist } from "@/store/thunks/wishlistThunk";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

import styles from "./index.module.scss";

type Props = {
  productId: string;
  initialFavorite?: boolean;
  onToggle?: (productId: string, isFavorite: boolean) => void;
};

export default function FavoriteButton({ productId, initialFavorite = false, onToggle }: Props) {
  const isAuth = useAuth();
  const dispatch: AppDispatch = useDispatch();

  const wishlist = useSelector((state: RootState) => state.wishlist.ids ?? []);
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  useEffect(() => {
    const source = isAuth
      ? wishlist ?? []
      : getLocalStorage<string[]>("wishlist", []);

    if (Array.isArray(source)) {
      const shouldBeFavorite = source.includes(productId);
      if (shouldBeFavorite !== isFavorite) {
        setIsFavorite(shouldBeFavorite);
      }
    }
  }, [wishlist, productId, isAuth]);


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newValue = !isFavorite;
    setIsFavorite(newValue);
    onToggle?.(productId, newValue);

    if (isAuth) {
      dispatch(toggleWishlist({ productId, isFavorite: newValue }));
    } else {
      const stored = getLocalStorage<string[]>("wishlist", []);
      const updated = newValue
        ? [...stored, productId]
        : stored.filter((id) => id !== productId);
      setLocalStorage("wishlist", updated);
    }
  };

  return (
    <button
      className={styles.favoriteButton}
      onClick={handleClick}
      aria-label="Toggle favorite"
      type="button"
    >
      <svg
        className={isFavorite ? styles.active : ""}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.827 27.7466C16.3737 27.9066 15.627 27.9066 15.1737 27.7466C11.307 26.4266 2.66699 20.92 2.66699 11.5866C2.66699 7.46663 5.98699 4.1333 10.0803 4.1333C12.507 4.1333 14.6537 5.30663 16.0003 7.11997C17.347 5.30663 19.507 4.1333 21.9203 4.1333C26.0137 4.1333 29.3337 7.46663 29.3337 11.5866C29.3337 20.92 20.6937 26.4266 16.827 27.7466Z"
          stroke={isFavorite ? "#513E3E" : "black"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={isFavorite ? "#5E4B4B" : "none"}
        />
      </svg>
    </button>
  );
}
