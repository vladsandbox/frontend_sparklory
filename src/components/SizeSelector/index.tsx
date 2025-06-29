import styles from "./index.module.scss";

type Props = {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
};

export default function SizeSelector({ sizes, selected, onSelect }: Props) {
  return (
    <div>
      <p className="h3">Size</p>
      <div className={styles.sizeWrapper}>
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            className={`text-s ${styles.sizeBtn} ${selected === size ? styles.active : ""}`}
            onClick={() => onSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
