import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { forgotPassword } from "@/store/thunks/userThunk";
import type { AppDispatch, RootState } from "@/store";
import { forgotPass1, forgotPass2 } from "@/assets";

import StepEmailForm from "./StepEmailForm";
import StepEmailSent from "./StepEmailSent";

import styles from "./index.module.scss";


export default function ForgotPassword() {
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector((state: RootState) => state.user.resetPasswordLoading);
    const [step, setStep] = useState(1);

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Enter your email"),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(forgotPassword({ email: values.email })).unwrap();
                setStep(2);
                toast.success("Email sent! Please check your inbox");
            } catch (err: any) {
                toast.error(err || "Failed to send email");
            }
        },
    });

    return (
        <div className={`${styles.wrapper} wrapper`}>
            <div className={styles.content}>
                {step === 1 ? (
                    <StepEmailForm formik={formik} isLoading={isLoading} />
                ) : (
                    <StepEmailSent onResend={formik.handleSubmit} isLoading={isLoading} />
                )}
            </div>
            <div className={styles.imageWrapper}>
                <img src={step === 1 ? forgotPass1 : forgotPass2} alt={`Step ${step}`} />
            </div>
        </div>
    );
}