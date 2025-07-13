import * as Yup from "yup";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { loginUser } from "@/store/thunks/userThunk.ts";
import { setLocalStorage } from "@/utils/localStorage.ts";
import type {AppDispatch} from "@/store";

import { eyeSlash, logoFacebook, logoGoogle } from "../../../assets";
import "./index.scss"

export default function Login() {
    const navigate = useNavigate();

    interface FormValues {
        email: string
        password: string
    }

    const initialValues = {
        email: '',
        password: '',
    };

    const dispatch: AppDispatch = useDispatch();
    const handleSubmit = async (
        values: FormValues
    ) => {
        const result = await dispatch(loginUser(values));

        if (loginUser.fulfilled.match(result)) {
            setLocalStorage("token", result.payload.accessToken);
            toast.success("Logged in successfully!");
            navigate("/");
        } else {
            toast.error(result.payload || "Login failed");
        }
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
    })

    return (
        <div className="wrapper">
            <div className="auth-container">
                <h1 className="h1" style={{marginBottom: 60, textAlign: "center"}}>
                    Log In
                </h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting }) => (
                        <Form className="login-form" style={{display: "flex", flexDirection: "column"}}>
                            <div className="form-row auth-menu">
                                <NavLink className="auth-link" to="/login">Login</NavLink>
                                <NavLink className="auth-link" to="/registration">Sign Up</NavLink>
                            </div>
                            <div className="form-row">
                                <label>Email:</label>
                                <Field type='text' name='email' className="primary-input input"
                                       placeholder='Enter your E-mail'/>
                                <ErrorMessage name='email' className='error-auth' component='span'/>
                            </div>
                            <div className="form-row password-row">
                                <label>Password:</label>
                                <Field type='password' name='password' className="primary-input input"
                                       placeholder='Enter your Password'/>
                                <img className='eye-slash' src={eyeSlash} alt='eyeSlash'/>
                                <ErrorMessage name='password' className='error-auth' component='span'/>
                            </div>
                            <NavLink className="auth-link" to="/reset-password">Forgot your password?</NavLink>
                            <div className="auth-buttons">
                                <button type='submit' disabled={isSubmitting}
                                        className="primary-btn button-text">
                                    {isSubmitting ? 'Submitting...' : 'Log In'}
                                </button>
                                <button className="secondary-btn button-text">
                                    <img className="fb-img" src={logoFacebook} alt="Facebook"/>
                                    <span className="btn-title">Log in with Facebook</span>
                                </button>
                                <button className="secondary-btn button-text">
                                    <img className="g-img" src={logoGoogle} alt="Google"/>
                                    <span className="btn-title">Log in with Google</span>
                                </button>
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