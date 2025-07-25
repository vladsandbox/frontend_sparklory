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
import { eyeSlash, logoFacebook, logoGoogle } from "@/assets";

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
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
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

    const handleGoogleLogin = () => {
        window.open(
            'https://sparklory-back.onrender.com/api/v1/auth/google',
            '_blank',
            'width=500,height=600'
        );
    };

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
                    {({ values, isSubmitting }) => (
                        <Form>
                            <div className="form-row auth-menu">
                                <NavLink className="auth-link" to="/login">Login</NavLink>
                                <NavLink className="auth-link" to="/registration">Sign Up</NavLink>
                            </div>
                            <div className="form-row">
                                <label htmlFor="name">Full Name:</label>
                                <Field type='text' name='name' className="primary-input input"
                                    placeholder='Enter your Full Name' />
                                <ErrorMessage name='name' className='error-auth' component="span" />
                            </div>
                            <div className="form-row">
                                <label htmlFor="email">Email:</label>
                                <Field type='text' name='email' className="primary-input input"
                                    placeholder='Enter your E-mail' />
                                <ErrorMessage name='email' className='error-auth' component='span' />
                            </div>
                            <div className="form-row password-row">
                                <label htmlFor="password">Password:</label>
                                <Field type='password' name='password' className="primary-input input"
                                    placeholder='Enter your Password' />
                                <img className='eye-slash' src={eyeSlash} alt='eyeSlash' />
                                <ErrorMessage name='password' className='error-auth' component='span' />
                            </div>
                            <div className="form-row password-row">
                                <label htmlFor="confirmPassword">Confirm password:</label>
                                <Field type='password' name='confirmPassword' className="primary-input input"
                                    placeholder='Confirm your Password' />
                                <img className='eye-slash' src={eyeSlash} alt='eyeSlash' />
                                <ErrorMessage name='confirmPassword' className='error-auth' component='span' />
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
                                    The following text of the User Agreement (hereinafter referred to as the “Agreement”
                                    and/or “Agreement”) address
                                </p>
                            </div>
                            <div className="auth-buttons">
                                <button
                                    type='submit'
                                    className="primary-btn button-text"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                                </button>
                                <button type='button' className="secondary-btn button-text">
                                    <img className="fb-img" src={logoFacebook} alt="Facebook" />
                                    <span className="btn-title">Log in with Facebook</span>
                                </button>
                                <button
                                    type='button'
                                    className="secondary-btn button-text"
                                    onClick={handleGoogleLogin}
                                >
                                    <img className="g-img" src={logoGoogle} alt="Google" />
                                    <span className="btn-title">Log in with Google</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}