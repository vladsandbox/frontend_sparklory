import { NavLink } from "react-router-dom";
import { useState } from "react";
import { eye, eyeSlash } from "@/assets";
import styles from "./index.module.scss";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    error?: string;
    touched?: boolean;
    forgotLink?: string;
    type?: string;
};

export default function InputField({
    id,
    label,
    type = "text",
    placeholder,
    autoComplete,
    error,
    touched,
    forgotLink,
    ...rest
}: InputFieldProps) {
    const isError = touched && error;
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <label htmlFor={id} className={styles.labelPassword}>
            {label}
            <div className={styles.inputWrapper}>
                <input
                    id={id}
                    type={isPassword && !showPassword ? "password" : "text"}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={`primary-input input ${isError ? "error-state" : ""}`}
                    {...rest}
                />

                {isPassword && (
                    <img
                        src={showPassword ? eye : eyeSlash}
                        alt="toggle password"
                        className={styles.eyeIcon}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                )}
            </div>

            {isError && <span className="input-error">{error}</span>}
            {forgotLink && (
                <NavLink to={forgotLink} className={styles.forgotPassword}>
                    Forgot Password?
                </NavLink>
            )}
        </label>
    );
}
