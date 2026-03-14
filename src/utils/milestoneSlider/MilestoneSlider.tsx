import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
const MilestoneSlider: React.FC = () => {
  const singleSliderOptions = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
  };
  return (
    <>
      <section className="Our-milestone py-50">
        <div className="container">

          <h2 className="com-title">Our Milestone</h2>
          <Slider className="milestone-slider" {...singleSliderOptions}>
            <div className="item">
              <Image
                width={500} height={300}
                src="/assets/images/homepage/our-milestone-1.svg"
                alt="ISO 9001 Certified"
                title="ISO 9001 Certified"
                className="h-100 w-100"
                priority

              />

            </div>
            <div className="item">
              <Image
                width={500} height={300}
                src="/assets/images/homepage/our-milestone-2.svg"
                alt="Proudly Serving Clients Globally 13th Years"
                title="Proudly Serving Clients Globally 13th Years"
                className="h-100 w-100"
                priority
              />
            </div>

          </Slider>
        </div>
      </section>
    </>
  );
};

export default MilestoneSlider;
