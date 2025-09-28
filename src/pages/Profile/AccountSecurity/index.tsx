import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "@/store";
import { resetPassword } from "@/store/thunks/userThunk";
import { clearResetPasswordError } from "@/store/slices/userSlice";
import Button from "@/components/Button";
import InputField from "./InputField";

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
                    <InputField
                        id="oldPassword"
                        label="Previous Password:"
                        placeholder="Enter previous password"
                        type="password"
                        autoComplete="current-password"
                        error={formik.errors.oldPassword}
                        touched={formik.touched.oldPassword}
                        {...formik.getFieldProps("oldPassword")}
                        forgotLink="/forgot-password"
                        onChange={(e) => {
                            formik.handleChange(e);
                            if (resetPasswordError) dispatch(clearResetPasswordError());
                        }}
                    />

                    <InputField
                        id="newPassword"
                        label="New Password:"
                        placeholder="Enter new password"
                        type="password"
                        autoComplete="new-password"
                        error={formik.errors.newPassword}
                        touched={formik.touched.newPassword}
                        {...formik.getFieldProps("newPassword")}
                        onChange={(e) => {
                            formik.handleChange(e);
                            if (resetPasswordError) dispatch(clearResetPasswordError());
                        }}
                    />

                    <InputField
                        id="confirmPassword"
                        label="Confirm Password:"
                        placeholder="Confirm password"
                        type="password"
                        autoComplete="new-password"
                        error={formik.errors.confirmPassword}
                        touched={formik.touched.confirmPassword}
                        {...formik.getFieldProps("confirmPassword")}
                        onChange={(e) => {
                            formik.handleChange(e);
                            if (resetPasswordError) dispatch(clearResetPasswordError());
                        }}
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