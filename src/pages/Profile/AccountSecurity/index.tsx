import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "@/store";
import { resetPassword } from "@/store/thunks/userThunk";
import { clearResetPasswordError } from "@/store/slices/userSlice";
import Button from "@/components/Button";
import Input from "@/components/Input";

import styles from "./index.module.scss";

export default function AccountSecurity() {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { resetPasswordLoading, resetPasswordError } = useSelector((state: RootState) => state.user);

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string()
                .required("Enter your current password")
                .min(8, "Must be at least 8 characters"),
            newPassword: Yup.string()
                .required("Enter a new password")
                .min(8, "Must be at least 8 characters")
                .test(
                    "not-same-as-old",
                    "New password must be different from old password",
                    function (value) {
                        return value !== this.parent.oldPassword;
                    }
                ),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword")], "Passwords must match")
                .required("Confirm your new password"),
        }),
        onSubmit: async (values) => {
            try {
                const resultAction = await dispatch(resetPassword({
                    previousPassword: values.oldPassword,
                    newPassword: values.newPassword,
                }));

                if (resetPassword.fulfilled.match(resultAction)) {
                    setIsEditing(false);
                    toast.success("Password updated successfully!");
                }
            } catch (error) {
                console.error("Submit failed:", error);
            }
        },
    });


    return (
        <div className={styles.wrapper}>
            <h2 className="title-m" style={{ marginBottom: isEditing ? "40px" : "60px" }}>Account Security</h2>

            {!isEditing ? (
                <div className={styles.passwordContainer}>
                    <div>
                        <p>Previous Password:</p>
                        <span>******</span>
                    </div>
                    <div>
                        <p>New Password:</p>
                        <span>**********</span>
                    </div>
                    <Button onClick={() => setIsEditing(true)}>Change</Button>
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <div>
                        <Input
                            id="oldPassword"
                            label="Previous Password:"
                            labelClassName="text-s"
                            placeholder="Enter previous password"
                            type="password"
                            autoComplete="current-password"
                            wrapperClassName={styles.inputWrapper}
                            value={formik.values.oldPassword}
                            onChange={(e) => {
                                formik.handleChange(e);
                                if (resetPasswordError) dispatch(clearResetPasswordError());
                            }}
                            onBlur={formik.handleBlur}
                            error={!!(formik.touched.oldPassword && formik.errors.oldPassword)}
                            errorMessage={formik.touched.oldPassword ? formik.errors.oldPassword : undefined}
                        />
                        <NavLink to="/forgot-password" className={styles.forgotPassword}>
                            Forgot Password?
                        </NavLink>
                    </div>

                    <Input
                        id="newPassword"
                        label="New Password:"
                        labelClassName="text-s"
                        placeholder="Enter new password"
                        type="password"
                        autoComplete="new-password"
                        wrapperClassName={styles.inputWrapper}
                        value={formik.values.newPassword}
                        onChange={(e) => {
                            formik.handleChange(e);
                            if (resetPasswordError) dispatch(clearResetPasswordError());
                        }}
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.newPassword && formik.errors.newPassword)}
                        errorMessage={formik.touched.newPassword ? formik.errors.newPassword : undefined}
                    />

                    <Input
                        id="confirmPassword"
                        label="Confirm Password:"
                        labelClassName="text-s"
                        placeholder="Confirm password"
                        type="password"
                        autoComplete="new-password"
                        wrapperClassName={styles.inputWrapper}
                        value={formik.values.confirmPassword}
                        onChange={(e) => {
                            formik.handleChange(e);
                            if (resetPasswordError) dispatch(clearResetPasswordError());
                        }}
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                        errorMessage={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
                    />

                    <div style={{ position: "relative" }}>
                        {resetPasswordError && <span className="input-error">{resetPasswordError}</span>}

                        <Button type="submit" disabled={resetPasswordLoading}>
                            {resetPasswordLoading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            )}

        </div>
    );
}