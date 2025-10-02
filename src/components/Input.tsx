import type { Input as InputProps } from "@/types/BasicComponents.ts";
import clsx from "clsx";

export default function Input({
    children,
    iconLeft,
    iconRight,
    disabled = false,
    isLoading = false,
    error = false,
    type,
    onClick,
    onChange,
    onBlur,
    value,
    placeholder,
    style,
    className,
    name,
    id,
}: InputProps) {
    const isDisabled = disabled || isLoading;

    return (
        <div
            className={clsx(
                error && "error-state",
                className
            )}
            style={style}
        >
            {iconLeft && <span className="input__icon input__icon--left">{iconLeft}</span>}
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onClick={onClick}
                onChange={onChange}
                onBlur={onBlur}
                disabled={isDisabled}
                aria-invalid={error || undefined}
                aria-busy={isLoading || undefined}
                className={clsx(
                    "primary-input",
                    "input",
                    className
                )}
            />
            {iconRight && <span className="input__icon input__icon--right">{iconRight}</span>}
            {children && <span className="input__extra">{children}</span>}
        </div>
    );
}
