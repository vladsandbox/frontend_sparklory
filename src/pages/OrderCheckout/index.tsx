import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import type { RootState, AppDispatch } from "@/store";
import { fetchCartProducts } from "@/store/thunks/cartThunk";
import { useAuth } from "@/utils/hooks/useAuth";
import CartTotals from "../ShoppingCart/CartTotals/CartTotals";
import CheckoutInputField from "./CheckoutInputField";
import DeliveryMethodSelector from "./DeliveryMethodSelector";
import { deliveryMethods, type DeliveryMethod } from "./deliveryMethods";
import Payment from "./Payment";
import { normalizePrice } from "@/utils/formatPrice";
import Button from "@/components/Button";
import CatalogSearchBar from "@/components/CatalogSearchBar";

import styles from "./index.module.scss";
import { deliveryCar } from "@/assets";

export default function OrderCheckout() {
    const { finalAmount, firstAmount, totalDiscount, appliedCoupon } = useSelector((state: RootState) => state.cart);
    const isAuth = useAuth();
    const dispatch = useDispatch<AppDispatch>();

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [deliveryMethod, setDeliveryMethod] = useState<string>("");
    const selectedMethod: DeliveryMethod | undefined = deliveryMethods.find((m) => m.id === deliveryMethod);
    const [deliveryError, setDeliveryError] = useState<string | undefined>();

    useEffect(() => {
        dispatch(fetchCartProducts({ guest: !isAuth }));
    }, [dispatch, isAuth]);

    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
            phone: "",
            email: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Name must be at least 2 characters")
                .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'’\- ]+$/, "Name contains invalid characters")
                .required("Full Name is required"),
            address: Yup.string()
                .min(4, "Address must be at least 10 characters")
                .required("Delivery Address is required"),
            phone: Yup.string()
                .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
                .required("Phone Number is required"),
            email: isAuth
                ? Yup.string().notRequired()
                : Yup.string().email("Invalid email address").required("Email is required"),
        }),
        onSubmit: () => { },
    });

    const handleContinue = async () => {
        if (step === 1) {
            const errors = await formik.validateForm();
            formik.setTouched({
                name: true,
                address: true,
                phone: true,
                email: true,
            });

            if (Object.keys(errors).length > 0) return;
            sessionStorage.setItem("customer_name", formik.values.name);

            setStep(2);
        } else if (step === 2) {
            if (!deliveryMethod) {
                setDeliveryError("Please select a delivery method");
                return;
            }
            setDeliveryError(undefined);
            setStep(3);
        }
    };

    return (
        <>
        <CatalogSearchBar />
        <div className="wrapper">
            <div className={styles.container}>
                <div className={styles.contactInfoCointainer}>
                    <p className="h1">Delivery Details</p>

                    {step === 1 && (
                        <div className={styles.formBlock}>
                            <CheckoutInputField
                                label="Full Name"
                                value={formik.values.name}
                                error={formik.touched.name ? formik.errors.name : undefined}
                                onChange={(val) => formik.setFieldValue("name", val)}
                            />
                            <CheckoutInputField
                                label="Delivery Address"
                                value={formik.values.address}
                                error={formik.touched.address ? formik.errors.address : undefined}
                                onChange={(val) => formik.setFieldValue("address", val)}
                            />
                            <CheckoutInputField
                                label="Phone Number"
                                type="tel"
                                value={formik.values.phone}
                                error={formik.touched.phone ? formik.errors.phone : undefined}
                                onChange={(val) => {
                                    let sanitized = val.replace(/[^0-9+]/g, "");

                                    if (sanitized.includes("+")) {
                                        sanitized =
                                            "+" + sanitized.replace(/\+/g, "").replace(/^0+/, "");
                                    }

                                    sanitized = sanitized.slice(0, 15);

                                    formik.setFieldValue("phone", sanitized);
                                }}
                            />
                            {!isAuth && (
                                <CheckoutInputField
                                    label="Email Address"
                                    type="email"
                                    value={formik.values.email}
                                    error={formik.touched.email ? formik.errors.email : undefined}
                                    onChange={(val) => formik.setFieldValue("email", val)}
                                />
                            )}
                            <Button
                                size="big"
                                className={`${styles.btnContinue} ${styles.btnContinueFirstStep}`}
                                onClick={handleContinue}
                            >
                                Continue
                            </Button>
                        </div>
                    )}

                    {(step === 2 || step === 3) && (
                        <div className={styles.detailsView}>
                            <p className="title-m">{formik.values.name}</p>
                            <p className="title-m">{formik.values.address}</p>
                            <p className="title-m">{formik.values.phone}</p>
                            <p className="title-m">{formik.values.email}</p>
                        </div>
                    )}

                    {step === 2 && (
                        <>
                            <p className="h1">Delivery Method</p>
                            <DeliveryMethodSelector
                                selected={deliveryMethod}
                                error={deliveryError}
                                onSelect={(id) => {
                                    setDeliveryMethod(id);
                                    if (deliveryError) setDeliveryError(undefined);
                                }}
                                onContinue={handleContinue}
                            />
                        </>
                    )}

                    {step === 3 && selectedMethod && (
                        <div>
                            <p className="h1" style={{ marginBottom: 60 }}>Delivery Method</p>
                            <div className={styles.finalStep}>
                                <img src={deliveryCar} alt="deliveryCar" />
                                <p className="title-m">{selectedMethod.title}</p>
                            </div>
                            <p className="text-filters" style={{ lineHeight: "25px" }}>{selectedMethod.desc}</p>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <Payment
                                isGuestCheckout={!isAuth}
                                amount={normalizePrice(
                                    finalAmount + Number(selectedMethod?.price || 0)
                                )}
                                contactInfo={
                                    !isAuth
                                        ? {
                                            name: formik.values.name,
                                            email: formik.values.email,
                                            phone: formik.values.phone,
                                            address: formik.values.address,
                                        }
                                        : undefined
                                }
                            />
                        </div>
                    )}
                </div>

                <div>
                    <CartTotals
                        finalAmount={finalAmount}
                        firstAmount={firstAmount}
                        discount={totalDiscount}
                        appliedCoupon={appliedCoupon}
                        showHeader={false}
                        deliveryPrice={selectedMethod?.price}
                    />
                </div>
            </div>
        </div>
        </>
    );
}