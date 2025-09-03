import React from "react";

export type Button = {
    children?: React.ReactNode;
    variant?: "primary" | "secondary" | "secondary-white";
    size?: "normal" | "big";
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: (() => void) | React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    style?: React.CSSProperties;
}