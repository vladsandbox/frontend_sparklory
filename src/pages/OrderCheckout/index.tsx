import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState, AppDispatch } from "@/store";
import { fetchCartProducts } from "@/store/thunks/cartThunk";
import { useAuth } from "@/utils/hooks/useAuth";
import CartTotals from "../ShoppingCart/CartTotals/CartTotals";
import CheckoutInputField from "./CheckoutInputField";
import DeliveryMethodSelector from "./DeliveryMethodSelector";
import { deliveryMethods, type DeliveryMethod } from "./deliveryMethods";
import Payment from "./Payment";

import styles from "./index.module.scss";

import { deliveryCar } from "@/assets";

export default function OrderCheckout() {
    const { finalAmount, firstAmount, totalDiscount, appliedCoupon } = useSelector((state: RootState) => state.cart);
    const isAuth = useAuth();
    const dispatch = useDispatch<AppDispatch>();

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [deliveryDetails, setDeliveryDetails] = useState({ name: "", address: "", phone: "", email: "" });
    const [errors, setErrors] = useState<{ name?: string; address?: string; phone?: string; deliveryMethod?: string; email?: string }>({});
    const [deliveryMethod, setDeliveryMethod] = useState<string>("");

    const selectedMethod: DeliveryMethod | undefined =
        deliveryMethods.find((m) => m.id === deliveryMethod);

    useEffect(() => {
        dispatch(fetchCartProducts({ guest: !isAuth }));
    }, [dispatch, isAuth]);

    const handleContinue = () => {
        if (step === 1) {
            const newErrors: typeof errors = {};
            if (!deliveryDetails.name.trim()) newErrors.name = "Full Name is required";
            if (!deliveryDetails.address.trim()) newErrors.address = "Delivery Address is required";

            const phoneRegex = /^\+?[0-9]{10,15}$/;
            if (!deliveryDetails.phone.trim()) {
                newErrors.phone = "Phone Number is required";
            } else if (!phoneRegex.test(deliveryDetails.phone.trim())) {
                newErrors.phone = "Invalid phone number";
            }

            if (!isAuth) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!deliveryDetails.email.trim()) {
                    newErrors.email = "Email is required";
                } else if (!emailRegex.test(deliveryDetails.email.trim())) {
                    newErrors.email = "Invalid email address";
                }
            }

            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) return;

            setStep(2);
        } else if (step === 2) {
            if (!deliveryMethod) {
                setErrors({ deliveryMethod: "Please select a delivery method" });
                return;
            }
            setErrors({});
            setStep(3);
        }
    };

    return (
        <div className="wrapper">
            <div className={styles.container}>
                <div className={styles.contactInfoCointainer}>
                    <p className="h1">Delivery Details</p>

                    {step === 1 && (
                        <div className={styles.formBlock}>
                            <CheckoutInputField
                                label="Full Name"
                                value={deliveryDetails.name}
                                error={errors.name}
                                onChange={(val) => {
                                    setDeliveryDetails({ ...deliveryDetails, name: val });
                                    setErrors(prev => ({ ...prev, name: undefined }));
                                }}
                            />
                            <CheckoutInputField
                                label="Delivery Address"
                                value={deliveryDetails.address}
                                error={errors.address}
                                onChange={(val) => {
                                    setDeliveryDetails({ ...deliveryDetails, address: val });
                                    setErrors(prev => ({ ...prev, address: undefined }));
                                }}
                            />
                            <CheckoutInputField
                                label="Phone Number"
                                type="tel"
                                value={deliveryDetails.phone}
                                error={errors.phone}
                                onChange={(val) => {
                                    setDeliveryDetails({ ...deliveryDetails, phone: val });
                                    setErrors(prev => ({ ...prev, phone: undefined }));
                                }}
                            />
                            {!isAuth && (
                                <CheckoutInputField
                                    label="Email Address"
                                    type="email"
                                    value={deliveryDetails.email}
                                    error={errors.email}
                                    onChange={(val) => {
                                        setDeliveryDetails({ ...deliveryDetails, email: val });
                                        setErrors(prev => ({ ...prev, email: undefined }));
                                    }}
                                />
                            )}
                            <button style={{ marginTop: 16 }} className="primary-btn big button-text" onClick={handleContinue}>
                                Continue
                            </button>
                        </div>
                    )}

                    {(step === 2 || step === 3) && (
                        <div className={styles.detailsView}>
                            <p className="title-m">{deliveryDetails.name}</p>
                            <p className="title-m">{deliveryDetails.address}</p>
                            <p className="title-m">{deliveryDetails.phone}</p>
                            <p className="title-m">{deliveryDetails.email}</p>
                        </div>
                    )}

                    {step === 2 && (
                        <>
                            <p className="h1">Delivery Method</p>
                            <DeliveryMethodSelector
                                selected={deliveryMethod}
                                error={errors.deliveryMethod}
                                onSelect={(id) => {
                                    setDeliveryMethod(id);
                                    if (errors.deliveryMethod) setErrors(prev => ({ ...prev, deliveryMethod: undefined }));
                                }}
                            />
                            <button
                                className="primary-btn big button-text"
                                style={{ width: "100%", marginTop: 16 }}
                                onClick={handleContinue}
                            >
                                Continue
                            </button>
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
                            <Payment />
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
                    />
                </div>
            </div>
        </div>
    );
}
