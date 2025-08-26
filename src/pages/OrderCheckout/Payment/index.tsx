import { useSelector } from "react-redux";
import { usePaymentForm } from "./usePaymentForm";

import type { RootState } from "@/store";
import type { PaymentContactInfo } from "@/types/Payment";
import LiqPayCheckout from "./LiqPayCheckout";
import { formatCardNumber, formatExpiryDate } from "./formatters";

import styles from "./index.module.scss";
import { cardPos } from "@/assets";

type Props = {
    isGuestCheckout?: boolean;
    amount: number;
    contactInfo?: PaymentContactInfo;
};

export default function Payment({ isGuestCheckout, amount, contactInfo }: Props) {
    const { loading, error } = useSelector((state: RootState) => state.payment);
    const { formik, liqpayData, liqpaySignature } = usePaymentForm({ isGuestCheckout, amount, contactInfo });

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("expiryDate", formatExpiryDate(e.target.value));
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("cardNumber", formatCardNumber(e.target.value));
    };

    return (
        <>
            <p className="h1" style={{ marginBottom: 60 }}>Payment</p>
            <p className={`${styles.cardLabel} title-m`}>
                <img src={cardPos} alt="cardPos" />
                Credit Card
            </p>

            <p className={`${styles.formNote} text-filters`}>
                All fields are required unless marked otherwise
            </p>
            {liqpayData && liqpaySignature ? (
                <LiqPayCheckout data={liqpayData} signature={liqpaySignature} />
            ) : (
                <form onSubmit={formik.handleSubmit} noValidate className={styles.form}>
                    <label className={styles.label}>
                        Card Number
                        <input
                            {...formik.getFieldProps("cardNumber")}
                            className="input primary-input"
                            placeholder="Card Number"
                            onChange={handleCardNumberChange}
                        />
                        {formik.touched.cardNumber && formik.errors.cardNumber && (
                            <span className="input-error">{formik.errors.cardNumber}</span>
                        )}
                    </label>

                    <div className={styles.expiryContainer}>
                        <label className={styles.label}>
                            Expiry date
                            <input
                                {...formik.getFieldProps("expiryDate")}
                                className="input primary-input"
                                placeholder="MM/YY"
                                onChange={handleExpiryChange}
                            />
                            {formik.touched.expiryDate && formik.errors.expiryDate && (
                                <span className="input-error">{formik.errors.expiryDate}</span>
                            )}
                        </label>

                        <label className={styles.label}>
                            CVV
                            <input
                                {...formik.getFieldProps("cvv")}
                                className="input primary-input"
                                placeholder="3 digits"
                                maxLength={3}
                            />
                            {formik.touched.cvv && formik.errors.cvv && (
                                <span className="input-error">{formik.errors.cvv}</span>
                            )}
                        </label>
                    </div>

                    <label className={styles.label}>
                        Name on Card
                        <input
                            {...formik.getFieldProps("nameOnCard")}
                            className="input primary-input"
                            placeholder="Name on Card"
                        />
                        {formik.touched.nameOnCard && formik.errors.nameOnCard && (
                            <span className="input-error">{formik.errors.nameOnCard}</span>
                        )}
                    </label>

                    <p className={styles.checkoutDisclaimer}>
                        By continuing to checkout I agree to the general Terms and Conditions.
                        Read more about SPARKLORY'S use of personal data in our Privacy Policy
                    </p>

                    <button
                        type="submit"
                        className="primary-btn big button-text"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Confirm"}
                    </button>

                    {error && <span className={`${styles.error} text-s`}>{error}</span>}
                </form>
            )}

        </>
    );
}