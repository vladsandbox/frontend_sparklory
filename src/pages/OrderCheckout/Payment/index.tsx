import { useFormik } from "formik";
import * as Yup from "yup";

import styles from './index.module.scss'
import { cardPos } from '@/assets'

const validationSchema = Yup.object({
    cardName: Yup.string().required("Card Name is required"),
    expiryDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date (MM/YY)")
        .required("Expiry date is required"),
    cvv: Yup.string()
        .matches(/^\d{3}$/, "CVV must be 3 digits")
        .required("CVV is required"),
    nameOnCard: Yup.string().required("Name on Card is required"),
});

export default function Payment() {
    const formik = useFormik({
        initialValues: {
            cardName: "",
            expiryDate: "",
            cvv: "",
            nameOnCard: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("Payment data:", values);
        },
    });

    return (
        <>
            <p className="h1" style={{ marginBottom: 60 }}>Payment</p>
            <p className={`${styles.cardLabel} title-m`}>
                <img src={cardPos} alt="cardPos" />
                Credit Card
            </p>
            <p className={`${styles.formNote} text-filters`}>All fields are required unless marked otherwise</p>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
                noValidate
                className={styles.form}
            >
                <label className={styles.label}>Card Name
                    <input
                        name="cardName"
                        type="text"
                        className="input primary-input"
                        value={formik.values.cardName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Card Name"
                    />
                    {formik.touched.cardName && formik.errors.cardName && (
                        <span className={`${styles.error} text-s`}>{formik.errors.cardName}</span>
                    )}
                </label>

                <div style={{ display: "flex", justifyContent: "space-between", gap: "22px" }}>
                    <div style={{ flex: 1 }}>
                        <label className={styles.label}>Expiry date
                            <input
                                name="expiryDate"
                                type="text"
                                className="input primary-input"
                                placeholder="MM/YY"
                                value={formik.values.expiryDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.expiryDate && formik.errors.expiryDate && (
                                <span className={`${styles.error} text-s`}>{formik.errors.expiryDate}</span>
                            )}
                        </label>

                    </div>

                    <div style={{ flex: 1 }}>
                        <label className={styles.label}>CVV
                            <input
                                name="cvv"
                                type="text"
                                className="input primary-input"
                                placeholder="3 digits"
                                value={formik.values.cvv}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                maxLength={3}
                            />
                            {formik.touched.cvv && formik.errors.cvv && (
                                <span className={`${styles.error} text-s`}>{formik.errors.cvv}</span>
                            )}
                        </label>

                    </div>
                </div>

                <label className={styles.label}>Name on Card
                    <input
                        name="nameOnCard"
                        type="text"
                        className="input primary-input"
                        placeholder="Name on Card"
                        value={formik.values.nameOnCard}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.nameOnCard && formik.errors.nameOnCard && (
                        <span className={`${styles.error} text-s`}>{formik.errors.nameOnCard}</span>
                    )}
                </label>


                <p className={styles.checkoutDisclaimer}>
                    By continuing to checkout I agree to the general Terms and Conditions.
                    Read more about SPARKLORY'S use of personal data in our Privacy Policy
                </p>

                <button
                    type="submit"
                    className="primary-btn big button-text"
                >
                    Confirm
                </button>
            </form>
        </>
    );
}
