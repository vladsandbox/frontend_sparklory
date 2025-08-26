import { formatPrice } from "@/utils/formatPrice";
import { deliveryMethods } from "./deliveryMethods";

import styles from "./index.module.scss";

type Props = {
    selected: string;
    error?: string;
    onSelect: (id: string) => void;
    onContinue: () => void;
};

export default function DeliveryMethodSelector({ selected, error, onSelect, onContinue }: Props) {
    return (
        <div className={styles.deliveryMethods}>
            {deliveryMethods.map((method) => (
                <div key={method.id} className={styles.methodInner}>
                    <div className={styles.methodInnerHeader}>
                        <label className={styles.inputContainer}>
                            <input
                                type="radio"
                                name="deliveryMethod"
                                value={method.id}
                                checked={selected === method.id}
                                onChange={() => onSelect(method.id)}
                            />
                            <h4 className="title-m">{method.title}</h4>
                        </label>
                        <p className="h3">
                            {formatPrice(method.price)}
                        </p>
                    </div>
                    <p className="text-filters" style={{ lineHeight: "33px" }}>{method.desc}</p>
                </div>
            ))}
            {error && <span className={`input-error ${styles.errorMethod}`}>{error}</span>}
            <button
                className={`${styles.btnContinue} primary-btn big button-text`}
                onClick={onContinue}
            >
                Continue
            </button>
        </div>
    );
}