import "./index.scss"
import {eyeSlash, logoFacebook, logoGoogle} from "../../../assets";
import {useState} from "react";
import {AuthService} from "../../../services/auth.service";
import {IResponseUser} from "../../../types/Auth";
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from "formik";
import * as Yup from "yup";
import {NavLink} from "react-router-dom";

export default function Registration() {
    const [message, setMessage] = useState('');

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
    const handleSubmit = async (
        values: FormValues,
        {setSubmitting}: FormikHelpers<FormValues>
    ) => {
        setMessage('');

        try {
            const data: IResponseUser = await AuthService.registration(values);
            if (data) {
                setMessage("Account has been created!");
            }
        } catch (error: any) {
            const message = error instanceof Error ? error.message : "Unknown error";
            console.log("Register Error message:", message);
            const errorMessage = error.response?.data.message;
            setMessage(errorMessage);
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

    return (
        <div className="wrapper">
            <div className="auth-container">
                <h1 className="h1" style={{marginBottom: 60, textAlign: "center"}}>
                    Sign Up
                </h1>
                <p className='message-wrapper'>{message}</p>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({values, isSubmitting}) => (
                        <Form>
                            <div className="form-row auth-menu">
                                <NavLink className="auth-link" to="/login">Login</NavLink>
                                <NavLink className="auth-link" to="/registration">Sign Up</NavLink>
                            </div>
                            <div className="form-row">
                                <label htmlFor="name">Full Name:</label>
                                <Field type='text' name='name' className="primary-input input"
                                       placeholder='Enter your Full Name'/>
                                <ErrorMessage name='name' className='error' component="span"/>
                            </div>
                            <div className="form-row">
                                <label htmlFor="email">Email:</label>
                                <Field type='text' name='email' className="primary-input input"
                                       placeholder='Enter your E-mail'/>
                                <ErrorMessage name='email' className='error' component='span'/>
                            </div>
                            <div className="form-row password-row">
                                <label htmlFor="password">Password:</label>
                                <Field type='password' name='password' className="primary-input input"
                                       placeholder='Enter your Password'/>
                                <img className='eye-slash' src={eyeSlash} alt='eyeSlash' />
                                <ErrorMessage name='password' className='error' component='span'/>
                            </div>
                            <div className="form-row password-row">
                                <label htmlFor="confirmPassword">Confirm password:</label>
                                <Field type='password' name='confirmPassword' className="primary-input input"
                                       placeholder='Confirm your Password'/>
                                <img className='eye-slash' src={eyeSlash} alt='eyeSlash' />
                                <ErrorMessage name='confirmPassword' className='error' component='span'/>
                            </div>
                            <div className="agree-terms">
                                <Field
                                    type='checkbox'
                                    name='agreeTerms'
                                    className='agree'
                                    checked={values.agreeTerms}
                                />
                                <span className="agree-terms-text">Agree to Terms</span>
                                <ErrorMessage name='agreeTerms' className='error' component='span'/>
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
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}