import React, { useState } from 'react';
import { slider_1, slider_2, slider_3, slider_4 } from '@/assets';
import SliderNavButtons from '@/components/SliderNavButtons/SliderNavButtons';

import './index.scss';

const slides = [
    {
        id: 1,
        title: 'Discover timeless elegance',
        text: 'Explore our exclusive collection of fine jewelry, thoughtfully designed and masterfully crafted to capture timeless beauty',
        image: slider_1,
    },
    {
        id: 2,
        title: 'Discover timeless elegance',
        text: 'Explore our exclusive collection of fine jewelry, thoughtfully designed and masterfully crafted to capture timeless beauty',
        image: slider_2,
    },
    {
        id: 3,
        title: 'Discover timeless elegance',
        text: 'Explore our exclusive collection of fine jewelry, thoughtfully designed and masterfully crafted to capture timeless beauty',
        image: slider_3,
    },
    {
        id: 4,
        title: 'Discover timeless elegance',
        text: 'Explore our exclusive collection of fine jewelry, thoughtfully designed and masterfully crafted to capture timeless beauty',
        image: slider_4,
    },
];

export const HomeSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleNext = () => {
        if (currentIndex < slides.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const currentSlide = slides[currentIndex];

    const trackHeight = 138;
    const indicatorHeight = trackHeight / slides.length;
    const indicatorTop = currentIndex * indicatorHeight;

    return (
        <div className="wrapper">
            <div
                className="slider-container"
                style={{ backgroundImage: `url(${currentSlide.image})`, marginBottom: 80 }}
            >
                <div className="text-container">
                    <div>
                        <p className="h1" style={{ marginBottom: 24 }}>{currentSlide.title}</p>
                        <p className="slider-text">{currentSlide.text}</p>
                    </div>
                    <div className="buttons">
                        <button className="primary-btn big button-text" style={{ width: 272 }}>View Collections</button>
                        <button className="secondary-btn big button-text" style={{ width: 272 }}>Create your own</button>
                    </div>
                </div>

                <div className="btn-container">
                    <div className="slide-info">
                        <span className="button-text">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </span>
                        <div className="progress-track-vertical">
                            <div
                                className="progress-indicator-vertical"
                                style={{ top: `${indicatorTop}px`, height: `${indicatorHeight}px` }}
                            ></div>
                        </div>
                        <span className="button-text">
                            {String(slides.length).padStart(2, '0')}
                        </span>
                    </div>

                    <SliderNavButtons
                        index={currentIndex}
                        maxIndex={slides.length - 1}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        containerClassName="slider-nav"
                        buttonClassNamePrev="arrow whiteArrow"
                        buttonClassNameNext="arrow whiteArrow"
                    />
                </div>

            </div>
        </div>
    );
};
