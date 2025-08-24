import type { Button as ButtonProps } from "@/types/BasicComponents.ts";
import clsx from "clsx";

export default function Button({
    children,
    variant = "primary",
    size,
    iconLeft,
    iconRight,
    isLoading = false,
    disabled = false,
    type = "button",
    onClick,
    className,
    style,
}: ButtonProps) {
    const isDisabled = disabled || isLoading;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            aria-busy={isLoading || undefined}
            aria-disabled={isDisabled || undefined}
            className={clsx(
                "btn",
                variant + "-btn",
                "btn--" + size,
                "button-text",
                className
            )}
            style={style}
        >
            {iconLeft && <span className="btn__icon btn__icon--left">{iconLeft}</span>}
            {children && <span className="btn__label">{children}</span>}
            {iconRight && <span className="btn__icon btn__icon--right">{iconRight}</span>}
        </button>
    );
}