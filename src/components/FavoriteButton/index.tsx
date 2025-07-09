import { useState, useEffect } from "react";
import styles from "./index.module.scss";

type Props = {
  productId: string;
  initialFavorite?: boolean;
  onToggle?: (productId: string, isFavorite: boolean) => void;
};

export default function FavoriteButton({ productId, initialFavorite = false, onToggle }: Props) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newValue = !isFavorite;
    setIsFavorite(newValue);
    onToggle?.(productId, newValue);
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
