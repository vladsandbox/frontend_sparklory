import React from "react";

export type Button = {
    children?: React.ReactNode;
    variant?: "primary" | "secondary" | "secondary-white" | "empty" | "clear";
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

export type Input = {
    children?: React.ReactNode;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    type?: React.HTMLInputTypeAttribute;
    name?: string;
    id?: string;
    value?: string | number;
    placeholder?: string;
    onClick?: (() => void) | React.MouseEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    className?: string;
    style?: React.CSSProperties;
    maxLength?: number;
    checked?: boolean;
    multiple?: boolean;
    label?: string;
    labelClassName?: string;
    autoComplete?: string;
    wrapperClassName?: string;
};
