import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
export const SlickSlider2 = () => {
    const settings = {
        dots: false,
        slidesToShow:7,
        slidesToScroll: 21,
        autoplay:true,
        autoplaySpeed: 1000,
        speed:32000,
        pauseOnHover: true,
        cssEase: "linear",
        arrows : false,
        infinite: true,
        // variableWidth:true,
        responsive: [
            {
                breakpoint: 1599,
                settings: {
                  slidesToShow: 7,
                }
              },
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 6,
                }
              },
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: 5,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 4,
                }
              },
              {
                breakpoint: 575,
                settings: {
                  slidesToShow: 3,
                }
              },
              {
                breakpoint: 350,
                settings: {
                  slidesToShow: 2,
                }
              }
        ]
    };

    return (
        <section className="client-slider">
            <div className="container-fluid">
                <Slider className='company-slider' {...settings}>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/havmor.png"  width={209} height={90}   alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/our-client-zee-media.png"   width={209} height={90}   alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/vodafone.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/white-hat-jr.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/gulab-oils.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/our-client-tata-consultancy-services.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/hindustan-unilever.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/our-client-byjus-the-learning-app.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/our-client-cadila-pharmaceuticals-limited.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/dhl.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/dell.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/nestle.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/emaar.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/ltts.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/our-client-deloitte.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/benetton.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                            <Image src="/assets/images/client-slider/fujitsu.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/kotak.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/chanel.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/sapcon-steels.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/our-client-hyatt.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/shree-maruti.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/parle-agro.png" width={209} height={90} alt="" />
                    </div>

                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/bj-mehra.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/indic-wisdom.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                            <Image src="/assets/images/client-slider/pay-n-earn.png" width={209} height={90} alt="" />
                    </div>
                    <div className="slider-item"  >
                        <Image src="/assets/images/client-slider/vekaria.png" width={209} height={90} alt="" />
                    </div>
                </Slider>

            </div>
        </section>
    );
};
