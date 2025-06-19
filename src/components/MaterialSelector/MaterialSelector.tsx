import styles from './index.module.scss'

type Material = {
    id: string;
    label: string;
    img: string;
};

type Props = {
    productId: string;
    selectedMaterial: string;
    onChange: (materialId: string) => void;
    materials: Material[];
};

export default function MaterialSelector({ productId, selectedMaterial, onChange, materials }: Props) {
    return (
        <div className={styles['material-selector']}>
            {materials.map(({ id, label, img }) => (
                <label key={id}
                    className={`${styles["material-option"]} ${selectedMaterial === id ? styles["selected"] : ""}`}
                >
                    <input
                        type="radio"
                        name={`material-${productId}`}
                        value={id}
                        checked={selectedMaterial === id}
                        onChange={() => onChange(id)}
                        style={{ display: "none" }}
                    />
                    <img
                        src={img}
                        alt={label}
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 24,
                            padding: 4,
                            border: selectedMaterial === id ? "1px solid rgba(0, 0, 0, 1)" : "none",
                            boxSizing: "border-box",
                            transition: "border-color 0.3s",
                        }}
                    />
                </label>
            ))}
        </div>
    );
}
