import * as Yup from "yup";

import type { AppDispatch } from "@/store";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/thunks/userThunk.ts";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { setLocalStorage } from "@/utils/localStorage.ts";
import { useOAuthPopupAuth } from "@/utils/hooks/useOAuthPopupAuth.ts";
import { openOAuthPopup } from "@/utils/oauth.ts";
import Input from "@/components/Input";

import Facebook from "@/assets/icons/logo-facebook.svg?react"
import Google from "@/assets/icons/logo-google.svg?react"
import Button from "@/components/Button.tsx";
import "./index.scss"

export default function Login() {

    interface FormValues {
        email: string
        password: string
    }

    const initialValues = {
        email: '',
        password: '',
    };

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const handleOAuthLogin = openOAuthPopup;
    const handleSubmit = async (
        values: FormValues
    ) => {
        const result = await dispatch(loginUser(values));

        if (loginUser.fulfilled.match(result)) {
            setLocalStorage("token", result.payload.accessToken);
            toast.success("Logged in successfully!");
            navigate("/profile");
        } else {
            toast.error(result.payload || "Login failed");
        }
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Please enter valid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
    })

    useOAuthPopupAuth({
        onAuthSuccess: ({ accessToken, refreshToken }) => {
            setLocalStorage("token", accessToken);
            setLocalStorage("refreshToken", refreshToken);
            navigate('/profile')
        },
    });

    return (
        <div className="wrapper">
            <div className="auth-container">
                <h1 className="h1" style={{ marginBottom: 60, textAlign: "center" }}>
                    Log In
                </h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
                        <Form className="login-form" style={{ display: "flex", flexDirection: "column" }}>

                            <div className="form-row auth-menu">
                                <NavLink className="auth-link" to="/login">Login</NavLink>
                                <NavLink className="auth-link" to="/registration">Sign Up</NavLink>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
                                <Input
                                    id="email"
                                    name="email"
                                    label="Email"
                                    placeholder="Enter your E-mail"
                                    type="text"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!(touched.email && errors.email)}
                                    errorMessage={touched.email ? errors.email : undefined}
                                    className="primary-input input"
                                />

                                <Input
                                    id="password"
                                    name="password"
                                    label="Password"
                                    placeholder="Enter your Password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    wrapperClassName="password-wrapper"
                                    onBlur={handleBlur}
                                    error={!!(touched.password && errors.password)}
                                />
                            </div>
                            {touched.password && errors.password && (
                                <div className="password-error">
                                    <span className="text-s" style={{ color: "#DD1010" }}>
                                        {errors.password}
                                    </span>
                                    <NavLink
                                        to="/forgot-password"
                                        className="text-s"
                                        style={{ color: "#DD1010", fontWeight: 500 }}
                                    >
                                        Forgot your password?
                                    </NavLink>
                                </div>
                            )}



                            <div className="auth-buttons" style={{ marginTop: 24 }}>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Log In'}
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleOAuthLogin('facebook')}
                                    iconLeft={<Facebook />}
                                    className="auth-button"
                                >
                                    Log in with Facebook
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleOAuthLogin('google')}
                                    iconLeft={<Google />}
                                    className="auth-button"
                                >
                                    Log in with Google
                                </Button>
                            </div>
                            <div className="auth-description">
                                <p>
                                    Sparklory processes the data collected to manage your membership in
                                    the Sparklory rewards program and allow you to benefit from all your associated
                                    services and benefits.
                                </p>
                                <p>
                                    To find out more about the management of your personal data and to exercise your
                                    rights, read our privacy policy
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}