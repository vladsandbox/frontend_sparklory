import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import type { RootState, AppDispatch } from "@/store";
import { updateUser } from "@/store/thunks/userThunk";
import Button from "@/components/Button";
import Input from "@/components/Input";

import styles from "./index.module.scss";

export default function ContactInformation() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const [isEditing, setIsEditing] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: user?.name || "",
            email: user?.email || "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Enter your name")
                .min(2, "Must be at least 2 characters"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Enter your email"),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(updateUser(values));
                toast.success("Contact information updated!");
                setIsEditing(false);
            } catch (err) {
                console.error(err);
                toast.error("Failed to update information");
            }
        },
    });

    return (
        <div className={styles.wrapper}>
            <h2 className="title-m" style={{ marginBottom: isEditing ? "40px" : "60px" }}>
                Contact Information
            </h2>

            {!isEditing ? (
                <div className={styles.infoBlock}>
                    <div>
                        <p className="text-s">Full Name:</p>
                        <p className="h3">{user?.name}</p>
                    </div>
                    <div>
                        <p className="text-s">E-mail:</p>
                        <p className="h3">{user?.email}</p>
                    </div>
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.inputContainer}>
                        <Input
                            id="name"
                            label="Name:"
                            labelClassName="text-s"
                            placeholder="Enter your name"
                            wrapperClassName={styles.inputWrapper}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={!!(formik.touched.name && formik.errors.name)}
                            errorMessage={formik.touched.name ? formik.errors.name : undefined}
                        />

                        <Input
                            id="email"
                            label="Email:"
                            labelClassName="text-s"
                            placeholder="Enter your email"
                            wrapperClassName={styles.inputWrapper}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={!!(formik.touched.email && formik.errors.email)}
                            errorMessage={formik.touched.email ? formik.errors.email : undefined}
                            disabled={!!user?.googleId}
                        />
                        {user?.googleId && (
                            <p className="text-s" style={{ marginTop: "4px" }}>
                                You registered through Google, so you can’t change your email
                            </p>
                        )}
                    </div>
                </form>
            )}
            <div className={styles.buttonWrapper}>
                {isEditing ? (
                    <Button type="submit"
                        onClick={formik.submitForm}
                        disabled={!formik.dirty || !formik.isValid}
                        style={{ width: "100%" }}>
                        Save
                    </Button>
                ) : (
                    <Button onClick={() => setIsEditing(true)} style={{ width: "252px" }}>
                        Change
                    </Button>
                )}
            </div>
        </div>
    );
}