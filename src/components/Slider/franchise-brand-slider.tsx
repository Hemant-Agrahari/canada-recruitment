import Image from "next/image";
import React from "react";
import Slider from "react-slick";
const FranchiseBrandSlider = () => {
  const countrysliderSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const imageNames = [
    { name: "punjab.png", city: "Mohali", title: "Punjab" },
    { name: "dubai.png", city: "Silicon Oasis", title: "Dubai" },
    { name: "hyderabad.webp", city: "Telangana", title: "Hyderabad" },
    { name: "gujarat.png", city: "Ahmedabad, Vadodara", title: "Gujarat" },
    { name: "mauritius.png", city: "City of Phoenix", title: "Mauritius" },
    { name: "australia.webp", city: "Sydney, Melbourne", title: "Australia" },
    { name: "delhi.png", city: "Delhi/NCR", title: "Delhi" },
    { name: "haridwar.webp", city: "Jamuna Lane Haridwar", title: "Haridwar" },
    { name: "chennai.png", city: "Tamil Nadu", title: "Chennai" },
    { name: "maharashtra.webp", city: "Kalyan, Thane", title: "Maharashtra" },
    { name: "poland.webp", city: "Opole", title: "Poland" },
    { name: "uttar-pradesh.webp", city: "Agra, Noida", title: "Uttar Pradesh" },
    { name: "pune.webp", city: "Chikhali, Wakad", title: "Pune" },
    { name: "kolkata.png", city: "Howrah, Webel IT park", title: "Kolkata" },
    { name: "chandigarh.webp", city: "Chandigarh", title: "Chandigarh" },
    { name: "odisha.png", city: "Rourkela", title: "Odisha" },
    { name: "houston.png", city: "Texas, USA", title: "Houston" },
    { name: "africa.png", city: "Angola", title: "Africa" },
  ];

  return (
    <>
      <section className="franchise-brand-slider py-60">
        <div className="container-fluid px-0">
          <Slider {...countrysliderSettings}>
            {imageNames.map((data, index) => {
              return (
                <div className="slider-item">
                  <div className="image-box">
                    <Image
                      src={`/assets/img/${data.name}`}
                      width={376}
                      height={181}
                      alt=""
                      className="img-fluid"  
                    />
                    <div className="des-box">
                      <div className="small-title">{data.title}</div>
                      <div className="small-sub-title">{data.city}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default FranchiseBrandSlider;
