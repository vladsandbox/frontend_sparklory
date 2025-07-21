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
    containerClassName?: string;
    buttonClassNamePrev?: string;
    buttonClassNameNext?: string;
};

const SliderNavButtons: React.FC<Props> = ({
    index,
    maxIndex,
    onPrev,
    onNext,
    direction = "horizontal",
    containerClassName = "",
    buttonClassNamePrev = "",
    buttonClassNameNext = "",
}) => {
    return (
        <div className={clsx(direction, containerClassName)}>
            <button
                onClick={onPrev}
                disabled={index === 0}
                className={clsx(buttonClassNamePrev)}
            >
                <PrevArrow />
            </button>
            <button
                onClick={onNext}
                disabled={index >= maxIndex}
                className={clsx(buttonClassNameNext)}
            >
                <NextArrow />
            </button>
        </div>
    );
};


export default SliderNavButtons;
