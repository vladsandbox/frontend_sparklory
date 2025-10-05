import { useSelector } from "react-redux";
import { usePaymentForm } from "./usePaymentForm";

import type { RootState } from "@/store";
import type { PaymentContactInfo } from "@/types/Payment";
import LiqPayCheckout from "./LiqPayCheckout";
import { formatCardNumber, formatExpiryDate } from "./formatters";
import Button from "@/components/Button";
import Input from "@/components/Input";

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

                    <Input
                        {...formik.getFieldProps("cardNumber")}
                        label="Card Number"
                        placeholder="Card Number"
                        value={formik.values.cardNumber}
                        onChange={handleCardNumberChange}
                        error={!!(formik.touched.cardNumber && formik.errors.cardNumber)}
                        errorMessage={formik.touched.cardNumber ? formik.errors.cardNumber : undefined}
                    />

                    <div className={styles.expiryContainer}>
                        <Input
                            {...formik.getFieldProps("expiryDate")}
                            label="Expiry date"
                            placeholder="MM/YY"
                            value={formik.values.expiryDate}
                            onChange={handleExpiryChange}
                            error={!!(formik.touched.expiryDate && formik.errors.expiryDate)}
                            errorMessage={formik.touched.expiryDate ? formik.errors.expiryDate : undefined}
                        />

                        <Input
                            {...formik.getFieldProps("cvv")}
                            label="CVV"
                            placeholder="3 digits"
                            value={formik.values.cvv}
                            maxLength={3}
                            error={!!(formik.touched.cvv && formik.errors.cvv)}
                            errorMessage={formik.touched.cvv ? formik.errors.cvv : undefined}
                        />
                    </div>

                    <Input
                        {...formik.getFieldProps("nameOnCard")}
                        label="Name on Card"
                        placeholder="Name on Card"
                        value={formik.values.nameOnCard}
                        error={!!(formik.touched.nameOnCard && formik.errors.nameOnCard)}
                        errorMessage={formik.touched.nameOnCard ? formik.errors.nameOnCard : undefined}
                    />


                    <p className={styles.checkoutDisclaimer}>
                        By continuing to checkout I agree to the general Terms and Conditions.
                        Read more about SPARKLORY'S use of personal data in our Privacy Policy
                    </p>

                    <Button
                        type="submit"
                        size="big"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Confirm"}
                    </Button>

                    {error && <span className={`${styles.error} text-s`}>{error}</span>}
                </form>
            )}

        </>
    );
}