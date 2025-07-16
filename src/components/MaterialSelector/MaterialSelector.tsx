import { noImg } from "@/assets";
import type { Material } from "./materials.ts";
import styles from "./index.module.scss";

import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';

type Props = {
    productId: string;
    selectedMaterial: string;
    onChange: (materialId: string) => void;
    materials: Material[];
};

export default function MaterialSelector({ productId, selectedMaterial, onChange, materials }: Props) {
    return (
        <div className={styles.selector} onClick={(e) => e.stopPropagation()}>
            {materials.map(({ id, label, img }) => {
                const src = img || noImg;

                return (
                    <Tippy key={id} content={label} placement="bottom" arrow={roundArrow}>
                        <label
                            key={id}
                            className={`
                              ${styles.materialOption}
                              ${selectedMaterial === id ? styles.selected : ""}
                            `}
                            tabIndex={0}
                            aria-label={label}
                        >
                            <input
                                type="radio"
                                name={`material-${productId}`}
                                value={id}
                                checked={selectedMaterial === id}
                                onChange={() => onChange(id)}
                                className={styles.materialInput}
                            />
                            <div className={styles.materialImgWrapper}>
                                <img src={src} alt={label} />
                            </div>
                        </label>
                    </Tippy>
                );
            })}
        </div>
    );
}