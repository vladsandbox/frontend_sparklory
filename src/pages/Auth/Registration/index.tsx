import * as Yup from "yup";

import type { AppDispatch } from "@/store";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registration, loginUser } from "@/store/thunks/userThunk.ts";
import { setLocalStorage } from "@/utils/localStorage.ts";
import { useOAuthPopupAuth } from "@/utils/hooks/useOAuthPopupAuth.ts";
import { openOAuthPopup } from "@/utils/oauth.ts";

import Facebook from "@/assets/icons/logo-facebook.svg?react"
import Google from "@/assets/icons/logo-google.svg?react"
import Button from "@/components/Button.tsx";
import Input from "@/components/Input";
import "./index.scss"

export default function Registration() {

    interface FormValues {
        name: string
        email: string
        password: string
        confirmPassword: string
        agreeTerms: boolean
    }

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    };

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const handleOAuthLogin = openOAuthPopup;
    const handleSubmit = async (values: FormValues) => {

        const { name, email, password } = values;
        const result = await dispatch(registration({ name, email, password }));

        if (registration.fulfilled.match(result)) {
            const loginResult = await dispatch(loginUser({ email, password }));

            if (loginUser.fulfilled.match(loginResult)) {
                setLocalStorage("token", loginResult.payload.accessToken);
                toast.success("Registration & login successful!");
                navigate("/profile");
            } else {
                toast.error(loginResult.payload || "Login after registration failed");
                navigate("/login");
            }
        } else {
            toast.error(result.payload || "Registration error");
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(6, "Name must be at leas 6 characters").required("Required"),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Please confirm your password')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
        agreeTerms: Yup.boolean()
            .oneOf([true], 'You must accept the terms')
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
                    Sign Up
                </h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-row auth-menu">
                                <NavLink className="auth-link" to="/login">Login</NavLink>
                                <NavLink className="auth-link" to="/registration">Sign Up</NavLink>
                            </div>

                            <div className="form-row">
                                <Input
                                    id="name"
                                    name="name"
                                    label="Full Name:"
                                    placeholder="Enter your Full Name"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!(touched.name && errors.name)}
                                    errorMessage={touched.name ? errors.name : undefined}
                                />
                            </div>

                            <div className="form-row">
                                <Input
                                    id="email"
                                    name="email"
                                    label="Email:"
                                    placeholder="Enter your E-mail"
                                    type="text"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!(touched.email && errors.email)}
                                    errorMessage={touched.email ? errors.email : undefined}
                                />
                            </div>

                            <div className="form-row">
                                <Input
                                    id="password"
                                    name="password"
                                    label="Password:"
                                    placeholder="Enter your Password"
                                    type="password"
                                    wrapperClassName="password-wrapper"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!(touched.password && errors.password)}
                                    errorMessage={touched.password ? errors.password : undefined}
                                />
                            </div>

                            <div className="form-row">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password:"
                                    placeholder="Confirm your Password"
                                    type="password"
                                    wrapperClassName="password-wrapper"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!(touched.confirmPassword && errors.confirmPassword)}
                                    errorMessage={touched.confirmPassword ? errors.confirmPassword : undefined}
                                />
                            </div>

                            <div className="agree-terms">
                                <Field
                                    type='checkbox'
                                    name='agreeTerms'
                                    className='agree'
                                    checked={values.agreeTerms}
                                />
                                <span className="agree-terms-text">Agree to Terms</span>
                                <ErrorMessage name='agreeTerms' className='error-auth' component='span' />
                            </div>

                            <div className="terms-description">
                                <p>
                                    The following text of the User Agreement (hereinafter referred to as the “Agreement”)
                                    address
                                </p>
                            </div>

                            <div className="auth-buttons">
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
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
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    );
}