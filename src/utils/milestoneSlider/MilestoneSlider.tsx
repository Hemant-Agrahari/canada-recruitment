import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const MilestoneSlider: React.FC = () => {
  const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
  });

  const singleSliderOptions = {
    loop: false,
    margin: 0,
    items: 1,
    // autoplay: true,
    // autoplayTimeout: 5000,
    // autoplaySpeed: 1500,
    nav: true,
    navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"], // Customize navigation text/icons
    dots: false,
  };
  return (
    <>
      <section className="Our-milestone py-50">
        <div className="container">

          <h2 className="com-title">Our Milestone</h2>
          <OwlCarousel className=" owl-theme" {...singleSliderOptions}>
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

          </OwlCarousel>
        </div>
      </section>
    </>
  );
};

export default MilestoneSlider;
