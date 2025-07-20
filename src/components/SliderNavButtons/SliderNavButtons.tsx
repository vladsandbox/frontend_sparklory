import React from "react";
import PrevArrow from "@/assets/icons/arrow-left.svg?react";
import NextArrow from "@/assets/icons/arrow-right.svg?react";
import clsx from "clsx";

import "./SliderNavButtons.scss";

type Props = {
    index: number;
    maxIndex: number;
    onPrev: () => void;
    onNext: () => void;
    direction?: "horizontal" | "vertical";
    className?: string;
    whiteArrow?: boolean;
};

const SliderNavButtons: React.FC<Props> = ({
    index,
    maxIndex,
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
                disabled={index === 0}
                className={clsx("arrow left", { whiteArrow })}
            >
                <PrevArrow />
            </button>
            <button
                onClick={onNext}
                disabled={index === maxIndex}
                className={clsx("arrow right", { whiteArrow })}
            >
                <NextArrow />
            </button>
        </div>
    );
};


export default SliderNavButtons;
