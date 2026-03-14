import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const MarketingReviews = () => {
  const options = {
    loop: false,
    margin: 100,
    autoplay: false,
    nav: true,
    navText: ["<i class='left-arrow'></i>", "<i class='right-arrow'></i>"],
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 2,
      },
    },
  };

  return (
    <section className="review">
      <div className="container">
        <div className="container-inner">
          <h2 className="com-titles">Reviews</h2>
          <p className="com-para">
            Alliance Recruitment Agency has achieved significant recognition in
            the sector owing to its successful track record in providing
            top-notch recruitment services. Our proficiency is clearly reflected
            in the feedbacks given by our clients.
          </p>
          <div className="review-slider">
            <OwlCarousel {...options}>
              <div className="review-box">
                <p className="review-text">
                  The whole process of working with Alliance was really
                  enjoyable and easy. They quickly found the right people for
                  our team. The hiring staff listened carefully to what we asked
                  for, went through all the applications very thoroughly, and
                  made it sure that the chosen ones were compatible with our
                  company’s values. The great employees who are just right for
                  the job and help our business grow are, in a sense, thanks to
                  Alliance. We are very happy to have them working with us and
                  will definitely recommend their services to any company looking
                  for good people.
                </p>
                <div className="rivew-footer">
                  <div className="left-img">
                    <Image
                      src="/assets/images/digital-marketing-services/images/Matthew-Lee.png"
                      alt="matthew lee"
                      height="64"
                      width="64"
                    />
                  </div>
                  <div className="right-content">
                    <h4 className="right-title m-0">Matthew Lee</h4>
                    <h5 className="text-deg">
                      MD, Optivectorshift innovations
                    </h5>
                  </div>
                </div>
              </div>

              <div className="review-box">
                <p className="review-text">
                  Eventually, the new personnel recruiting process went through
                  the whole easily and without any glitches, all because of the
                  Alliance. They were quite clear about what we needed and got
                  the right match who could easily merge with us. The team was
                  supporting us from interviews to integration and even
                  troubleshooting our queries. The new employees were competent
                  and diligent and won the team over in no time. Their
                  professional know-how and being present with us at all stages
                  have given us a very positive impression and that's why we
                  will definitely consider them when there are partnerships in
                  the future.
                </p>
                <div className="rivew-footer">
                  <div className="left-img">
                    <Image
                      src="/assets/images/digital-marketing-services/images/Olivia-Chen.png"
                      alt="olivia chen"
                      height="64"
                      width="64"
                    />
                  </div>
                  <div className="right-content">
                    <h4 className="right-title m-0">Olivia Chen</h4>
                    <h5 className="text-deg">CMO, inshiftpro tech</h5>
                  </div>
                </div>
              </div>

              <div className="review-box">
                <p className="review-text">
                  Choosing the right leader for our organization became a
                  difficult task, and it was suggested that the people from
                  Alliance should help us. They searched every corner of the
                  country, held detailed interviews, and finally suggested to us
                  the best candidates. The new hires matched our company’s
                  culture perfectly and had a very positive impact on the company
                  from the very beginning. The Alliance team is nice,
                  trustworthy, and talented. We are very happy with their service
                  and would recommend them to anyone.
                </p>
                <div className="rivew-footer">
                  <div className="left-img">
                    <Image
                      src="/assets/images/digital-marketing-services/images/Isabelle-Dubois.png"
                      alt="isabelle dubois"
                      height="64"
                      width="64"
                    />
                  </div>
                  <div className="right-content">
                    <h4 className="right-title m-0">Isabelle Dubois</h4>
                    <h5 className="text-deg">MD, Hexzenwave Pvt Ltd</h5>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingReviews;
