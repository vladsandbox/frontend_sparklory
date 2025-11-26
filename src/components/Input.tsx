import { useState } from "react";
import clsx from "clsx";

import type { Input as InputProps } from "@/types/BasicComponents.ts";

import { eye, eyeSlash } from "@/assets";

export default function Input({
    children,
    iconLeft,
    iconRight,
    disabled = false,
    isLoading = false,
    error = false,
    type = "text",
    onClick,
    onChange,
    onBlur,
    value,
    placeholder,
    style,
    className,
    name,
    id,
    errorMessage,
    label,
    labelClassName,
    maxLength,
    autoComplete,
    wrapperClassName,
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const isDisabled = disabled || isLoading;

    const inputType = isPassword && showPassword ? "text" : type;
    const defaultWrapperClass = isPassword ? "passwordInputWrapper" : undefined;

    const rightIcon = isPassword ? (
        <img
            src={showPassword ? eye : eyeSlash}
            alt="toggle password"
            className="input__icon input__icon--right"
            onClick={() => setShowPassword(!showPassword)}
        />
    ) : (
        iconRight && <span className="input__icon input__icon--right">{iconRight}</span>
    );

    return (
        <label className={clsx("text-xs", "label", labelClassName)}>
            {label}
            {iconLeft && <span className="input__icon input__icon--left">{iconLeft}</span>}
            <div className={clsx(defaultWrapperClass, wrapperClassName)}>
                <input
                    id={id}
                    name={name}
                    type={inputType}
                    value={value}
                    placeholder={placeholder}
                    onClick={onClick}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={isDisabled}
                    aria-invalid={error || undefined}
                    aria-busy={isLoading || undefined}
                    maxLength={maxLength}
                    autoComplete={autoComplete}
                    className={clsx(
                        "primary-input",
                        "input",
                        error && "error-state",
                        className
                    )}
                    style={style}
                />
                {rightIcon}
                {children && <span className="input__extra">{children}</span>}
                {errorMessage && <span className="input-error">{errorMessage}</span>}
            </div>
        </label>
    );
}
