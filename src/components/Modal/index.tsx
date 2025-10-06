import React from "react";

import CloseCircleIcon from "@/assets/icons/close-circle.svg?react";
import styles from "./index.module.scss";

type Props = {
    title?: string,
    children: React.ReactNode,
    isOpen: boolean,
    onClose: () => void,
}

export default function ModalCatalog ({ title, children, isOpen, onClose }: Props) {
    if (!isOpen) return null;
    return (
        <div className={styles.overlay}>
            <div className={styles.window}>
                <div className={styles.header}>
                    <h1 className="h2">{title}</h1>
                    <CloseCircleIcon onClick={onClose} className={styles.close}/>
                </div>
                {children}
            </div>
        </div>
    );
}
