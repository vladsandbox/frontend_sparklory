import React from "react";
import PrevArrow from "@/assets/icons/arrow-left.svg?react";
import NextArrow from "@/assets/icons/arrow-right.svg?react";
import clsx from "clsx";

import "./SliderNavButtons.scss";

type Props = {
    isDisabledPrev: boolean;
    isDisabledNext: boolean;
    onPrev: () => void;
    onNext: () => void;
    direction?: "horizontal" | "vertical";
    className?: string;
    whiteArrow?: boolean;
};

const SliderNavButtons: React.FC<Props> = ({
    isDisabledPrev,
    isDisabledNext,
    onPrev,
    onNext,
    direction = "horizontal",
    className = "",
    whiteArrow = false,
}) => {
    return (
        <div className={clsx("slider-nav", direction, className)}>
            <button
                onClick={onPrev}
                disabled={isDisabledPrev}
                className={clsx("arrow left", { whiteArrow })}
            >
                <PrevArrow />
            </button>
            <button
                onClick={onNext}
                disabled={isDisabledNext}
                className={clsx("arrow right", { whiteArrow })}
            >
                <NextArrow />
            </button>
        </div>
    );
};


export default SliderNavButtons;
