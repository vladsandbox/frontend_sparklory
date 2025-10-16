import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { forgotPassword } from "@/store/thunks/userThunk";
import type { AppDispatch } from "@/store";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { forgotPass1, forgotPass2 } from "@/assets";
import styles from "./index.module.scss";

export default function ForgotPassword() {
    const dispatch = useDispatch<AppDispatch>();
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
                    <form className={styles.form} onSubmit={formik.handleSubmit}>
                        <h1 className="h1">Reset Password</h1>
                        <p className="body">
                            Please enter your registered email address to receive a link to reset your password
                        </p>
                        <Input
                            label="Email"
                            labelClassName="text-s"
                            placeholder="Enter your E-mail"
                            type="email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={!!(formik.touched.email && formik.errors.email)}
                            errorMessage={formik.errors.email}
                        />
                        <Button
                            type="submit"
                            disabled={!formik.isValid}
                            style={{ width: "100%", marginTop: "20px" }}
                        >
                            Send
                        </Button>
                    </form>
                ) : (
                    <div className={styles.form}>
                        <h1 className="h1">Password Resend</h1>
                        <p className="body">
                            We’ve sent you an email with a link to reset your password. It may take a few minutes to arrive.
                            Don’t forget to check your spam folder.
                        </p>
                        <Button onClick={() => formik.handleSubmit()} style={{ width: "100%" }}>
                            Resend
                        </Button>
                    </div>
                )}
            </div>

            <div className={styles.imageWrapper}>
                <img src={step === 1 ? forgotPass1 : forgotPass2} alt={`Step ${step}`} />
            </div>
        </div>
    );
}
