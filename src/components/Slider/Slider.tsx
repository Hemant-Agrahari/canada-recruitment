// SlickSlider.js
import React, { useEffect } from 'react';
import Slider from 'react-slick';
 import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlickSlider = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '50px',
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          centerPadding: '40px',
        },
      },
    ],
  };
  return (
    <section className="scroll-text-section    "  >
      <div className="container">
        <div className="scroller text-center mx-auto">
          <Slider {...sliderSettings}>
            <div>
              <span className="main-text">
                <span className="black-text">520+</span>{' '}
                <span className="red-text">Engineers Talented Workforce</span>
              </span>
            </div>
            <div>
              <span className="main-text">
                <span className="black-text">30+</span>{' '}
                <span className="red-text">Products Golive Ready</span>
              </span>
            </div>
            <div>
              <span className="main-text">
                <span className="black-text">14+</span>{' '}
                <span className="red-text">Years Delivering Excellence</span>
              </span>
            </div>
            <div>
              <span className="main-text">
                <span className="black-text">2200+</span>{' '}
                <span className="red-text">Clients Across Various Industries</span>
              </span>
            </div>
            <div>
              <span className="main-text">
                <span className="black-text">520+</span>{' '}
                <span className="red-text">Engineers Talented Workforce</span>
              </span>
            </div>
            <div>
              <span className="main-text">
                <span className="black-text">30+</span>{' '}
                <span className="red-text">Products Golive Ready</span>
              </span>
            </div>
            <div>
              <span className="main-text">
                <span className="black-text">14+</span>{' '}
                <span className="red-text">Years Delivering Excellence</span>
              </span>
            </div>
            <div>
              <span className="main-text">
                <span className="black-text">2200+</span>{' '}
                <span className="red-text">Clients Across Various Industries</span>
              </span>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default SlickSlider;
