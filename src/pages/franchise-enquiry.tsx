"use client";
import FranchiseForm from "@/components/FranchiseForm/franchiseForm";
import FranchiseWhatsappCta from "@/components/FranchiseWhatsappCta/franchise-whatsapp-cta";
import CustomHead from "@/components/Head";
import FranchiseBrandSlider from "@/components/Slider/franchise-brand-slider";
import React from "react";
import meta from "@/meta/meta.json";
const Page = () => {


  return (
    <div className="inner-section">
      <CustomHead {...meta["franchise-enquiry"]} />
      <section className="banner-wrapper py-60">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="fw-bold">Franchise with Us: Own Your Businessssss</h1>
              <p className="com-para">
                Take the first step towards franchise ownership and ignite your
                entrepreneurial spirit to discover the potential for growth and
                success in our thriving franchise network with Alliance.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="/assets/images/common-img/franchise-with-us-own-your-business.webp"
                width={516}
                height={374}
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="franchise-form-wrapper py-60">
        <div className="container">
          <h2 className="com-title text-center">Register Your Interest</h2>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <FranchiseForm />
            </div>
          </div>
        </div>
      </section>
      <FranchiseWhatsappCta />
      <section className="global-presence py-60 ">
        <div className="container">
          <h2 className="com-title text-center pb-4 mt-0">

            Our Global Presence
          </h2>
          <div className="row g-4">
            <div className="col-md-4 col-12">
              <div className="comprehensive-support-card text-center">
                <img
                  alt="years of experience"
                  height="80"
                  width="80"
                  className="img-fluid"
                  src="/assets/img/years-of-experience.svg"
                />

                <div className="small-title mt-3 pt-3">

                  16 Years of Experience
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="comprehensive-support-card text-center">
                <img
                  alt="global offices"
                  height="80"
                  width="80"
                  className="img-fluid"
                  src="/assets/img/global-offices.svg"
                />

                <div className="small-title mt-3 pt-3"> 6 Global Offices </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="comprehensive-support-card text-center">
                <img
                  alt="countries served"
                  height="80"
                  width="80"
                  className="img-fluid"
                  src="/assets/img/countries-served.svg"
                />
                <div className="small-title mt-3 pt-3">

                  &nbsp;25 Countries Served
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FranchiseBrandSlider />
    </div>
  );
};

export default Page;
