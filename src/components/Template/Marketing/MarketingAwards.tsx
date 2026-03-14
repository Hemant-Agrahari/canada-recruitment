import React from "react";
import Image from "next/image";

const MarketingAwards = () => {
  return (
    <section className="awards-section">
      <div className="container">
        <h2 className="com-title text-center mb-5">
          Award-Winning Excellence
        </h2>
        <div className="awards-logos d-flex flex-wrap justify-content-center align-items-center gap-4">
          <div className="award-logo">
            <Image
              src="/assets/awards/brand-logo-1.webp"
              alt="ISO 9001 Certified"
              width={120}
              height={120}
              className="img-fluid"
            />
          </div>
          <div className="award-logo">
            <Image
              src="/assets/awards/brand-logo-2.webp"
              alt="Canada's Most Reliable Solution Award"
              width={120}
              height={120}
              className="img-fluid"
            />
          </div>
          <div className="award-logo">
            <Image
              src="/assets/awards/brand-logo-3.webp"
              alt="Hall of Fame 2020"
              width={120}
              height={120}
              className="img-fluid"
            />
          </div>
          <div className="award-logo">
            <Image
              src="https://cmsapi.alliancerecruitmentagency.ca/anniversary-logo-16-years.webp"
              alt="16 Years"
              width={120}
              height={120}
              className="img-fluid"
            />
          </div>
          <div className="award-logo">
            <Image
              src="/assets/awards/brand-logo-5.webp"
              alt="GoodFirms Top Recruiting Firm"
              width={120}
              height={120}
              className="img-fluid"
            />
          </div>
          <div className="award-logo">
            <Image
              src="/assets/awards/brand-logo-6.webp"
              alt="HRMAsia Rising Choice 2023"
              width={120}
              height={120}
              className="img-fluid"
            />
          </div>
          <div className="award-logo">
            <Image
              src="/assets/awards/brand-logo-7.webp"
              alt="Recruiter Awards 2023 Highly Commended"
              width={120}
              height={120}
              className="img-fluid"
            />
          </div>
          <div className="award-logo">
            <Image
              src="/assets/awards/brand-logo-8.webp"
              alt="IAF International Accreditation Forum"
              width={120}
              height={120}
              className="img-fluid"
            />
          </div>
          <div className="award-logo">
            <Image
              src="/assets/awards/brand-logo-9.webp"
              alt="ISO 27001"
              width={120}
              height={120}
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingAwards;
