import { NavLink } from "react-router-dom";
import styles from "./index.module.scss"

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    error?: string;
    touched?: boolean;
    forgotLink?: string;
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

    return (
        <label htmlFor={id} className={styles.labelPassword}>
            {label}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={`primary-input input ${isError ? "error-state" : ""}`}
                {...rest}
            />
            {isError && <span className="input-error">{error}</span>}
            {forgotLink && (
                <NavLink to={forgotLink} className={styles.forgotPassword}>
                    Forgot Password?
                </NavLink>
            )}
        </label>
    );
}
