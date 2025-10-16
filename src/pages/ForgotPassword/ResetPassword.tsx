import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import type { AppDispatch } from "@/store";
import { resetForgottenPassword } from "@/store/thunks/userThunk";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { forgotPass3 } from "@/assets";
import styles from "./index.module.scss";

export default function ResetPassword() {
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email") || "";
    const code = searchParams.get("code") || "";

    const formik = useFormik({
        initialValues: { newPassword: "", confirmPassword: "" },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Enter new password"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword")], "Passwords must match")
                .required("Confirm your password"),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(
                    resetForgottenPassword({
                        email,
                        code,
                        newPassword: values.newPassword,
                    })
                ).unwrap();
                toast.success("Password successfully changed!");
            } catch (err: any) {
                toast.error(err || "Failed to reset password");
            }
        },
    });

    return (
        <div className={`${styles.wrapper} wrapper`}>
            <div className={styles.content}>
                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <h1 className="h1">Create New Password</h1>

                    <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        label="New Password"
                        placeholder="Enter your new password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.newPassword && formik.errors.newPassword)}
                        errorMessage={formik.errors.newPassword}
                    />

                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm new password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            !!(formik.touched.confirmPassword && formik.errors.confirmPassword)
                        }
                        errorMessage={formik.errors.confirmPassword}
                    />

                    <Button
                        type="submit"
                        disabled={!formik.isValid}
                        style={{ width: "100%", marginTop: "20px" }}
                    >
                        Save
                    </Button>
                </form>
            </div>

            <div className={styles.imageWrapper}>
                <img src={forgotPass3} alt="Step 3" />
            </div>
        </div>
    );
}
