"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// var $ = require("jquery");
// if (typeof window !== "undefined") {
//    window.$ = window.jQuery = $;
// }

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const CertificateSlider: React.FC = () => {
    const options = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };
    return (
        <>
            <Slider className="our-certifications" {...options}>
                <div className="item">
                    <Image
                        width={1000} height={1000}
                        src="/assets/images/homepage/ISO-9001.webp"
                        alt="ISO 9001 Certified"
                        title="ISO 9001 Certified"
                        className="img-fluid"
                        loading="eager"
                    />
                </div>
                <div className="item">
                    <Image
                        width={1000} height={1000}
                        src="/assets/images/homepage/anniversary-logo-16-years.webp"
                        alt="Proudly Serving Clients Globally 16th Years"
                        title="Proudly Serving Clients Globally 16th Years"
                        className="img-fluid"
                        loading="eager"
                    />
                </div>
                <div className="item">
                    <Image
                        width={1000} height={1000}
                        src="/assets/images/homepage/good-firms-award.webp"
                        alt="Top Staffing Firm Award by Good Firms"
                        title="Top Staffing Firm Award by Good Firms"
                        className="img-fluid"
                        loading="eager"
                    />
                </div>
                <div className="item">
                    <Image
                        width={1000} height={1000}
                        src="/assets/images/homepage/hall-of-fame-2020-award.webp"
                        alt="Hall Of Fame 2020 Award"
                        title="Hall Of Fame 2020 Award"
                        className="img-fluid"
                        loading="eager"
                    />
                </div>
                <div className="item">
                    <Image
                        width={1000} height={1000}
                        src="/assets/images/homepage/recruiters-awards-2023.webp"
                        alt="Recrutiers Awards 2023"
                        title="Recrutiers Awards 2023"
                        className="img-fluid"
                        loading="eager"
                    />
                </div>
                <div className="item">
                    <Image
                        width={1000} height={1000}
                        src="/assets/images/homepage/most-reliable-hr-solution.webp"
                        alt="The 10 Most Reliable HR Solution Award"
                        title="The 10 Most Reliable HR Solution Award"
                        className="img-fluid"
                        loading="eager"
                    />
                </div>
                <div className="item">
                    <Image
                        width={1000} height={1000}
                        src="/assets/images/homepage/hrm-asia-readers-choice-2022.webp"
                        alt="Readers Choice 2022 Award by HRM Asia"
                        title="Readers Choice 2022 Award by HRM Asia"
                        className="img-fluid"
                        loading="eager"
                    />
                </div>
                <div className="item">
                    <Image
                        width={1000} height={1000}
                        src="/assets/images/homepage/it-rate-top-it-recruiting-companies.webp"
                        alt="The 10 Most Reliable HR Solution Award"
                        title="The 10 Most Reliable HR Solution Award"
                        className="img-fluid"
                        loading="eager"
                    />
                </div>
                <div className="item">
                    <Image
                        width={1000} height={1000}
                        src="/assets/images/homepage/expertise-award.webp"
                        alt="Best Employment Agencies in San Francisco by Expertise"
                        title="Best Employment Agencies in San Francisco by Expertise"
                        className="img-fluid"
                        loading="eager"
                    />

                </div>
                <div className="item">
                    <Image
                        width={1000} height={1000}
                        src="/assets/images/homepage/iso.webp"
                        alt="Best Employment Agencies in San Francisco by Expertise"
                        title="Best Employment Agencies in San Francisco by Expertise"
                        className="img-fluid"
                        loading="eager"
                    />

                </div>
                <div className="item">
                    <Image
                        width={1000} height={1000}
                        src="/assets/images/homepage/iaf.webp"
                        alt="Best Employment Agencies in San Francisco by Expertise"
                        title="Best Employment Agencies in San Francisco by Expertise"
                        className="img-fluid"
                        loading="eager"
                    />

                </div>

            </Slider>
        </>
    )
};