import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleWishlist } from "@/store/thunks/wishlistThunk";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useAuth } from "@/utils/hooks/useAuth";
import type { RootState, AppDispatch } from "@/store";

export function useFavorites() {
  const isAuth = useAuth();
  const dispatch: AppDispatch = useDispatch();
  const reduxFavoriteIds = useSelector((state: RootState) => state.wishlist.ids);

  const initialFavorites = (() => {
    if (isAuth) {
      return new Set(reduxFavoriteIds);
    } else {
      return new Set(getLocalStorage<string[]>("wishlist", []));
    }
  })();

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(initialFavorites);

  useEffect(() => {
    if (isAuth) {
      setFavoriteIds(new Set(reduxFavoriteIds));
    } else {
      setFavoriteIds(new Set(getLocalStorage<string[]>("wishlist", [])));
    }
  }, [isAuth, reduxFavoriteIds]);

  const toggleFavorite = (productId: string, isFavorite: boolean) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);
      if (isFavorite) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }

      if (isAuth) {
        dispatch(toggleWishlist({ productId, isFavorite }));
      } else {
        setLocalStorage("wishlist", Array.from(newSet));
      }

      return newSet;
    });
  };

  return { favoriteIds, toggleFavorite };
}
