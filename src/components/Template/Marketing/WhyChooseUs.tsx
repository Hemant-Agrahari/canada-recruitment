import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Content } from "@/utils/interfaces";

interface WhyChooseUsProps {
  content: Content[];
  NEXT_PUBLIC_BACKEND_URL: string | undefined;
}

const WhyChooseUs = ({ content, NEXT_PUBLIC_BACKEND_URL }: WhyChooseUsProps) => {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null;
  }

  return (
    <>
      {content.map((contentItem, index) => (
        <React.Fragment key={index}>
          <section className="main-banner branding-agency">
            <div className="container">
              <div className="row g-4">
                {/* For even index (0,2,4...): Image left, Text right */}
                {/* For odd index (1,3,5...): Text left, Image right */}
                {index % 2 === 0 ? (
                  <>
                    {/* Image on Left */}
                    <div className="col-lg-6 text-center">
                      <picture>
                        <source
                          srcSet={
                            contentItem?.contentImage
                              ? `${NEXT_PUBLIC_BACKEND_URL}${contentItem?.contentImage}`
                              : "/assets/images/full-service-white-label.png"
                          }
                          type="image/webp"
                        />
                        <source
                          srcSet={
                            contentItem?.contentImage
                              ? `${NEXT_PUBLIC_BACKEND_URL}${contentItem?.contentImage}`
                              : "/assets/images/full-service-white-label.png"
                          }
                          type="image/png"
                        />
                        <Image
                          src={
                            contentItem?.contentImage
                              ? `${NEXT_PUBLIC_BACKEND_URL}${contentItem?.contentImage}`
                              : "/assets/images/full-service-white-label.png"
                          }
                          alt={contentItem?.contentImageName || "Content Image"}
                          title={contentItem?.contentImageName || "Content Image"}
                          width="606"
                          height="431"
                          className="img-fluid mx-auto"
                        />
                      </picture>
                    </div>
                    {/* Text on Right */}
                    <div className="col-lg-6 align-self-center branding-txt-box">
                      <h2 className="com-title">
                        {contentItem?.title || "Why Choose Us?"}
                      </h2>
                      {contentItem?.content ? (
                        <p
                          className="com-para service-section-3"
                          dangerouslySetInnerHTML={{
                            __html: contentItem.content.replace(
                              /<\/?p[^>]*>/gi,
                              ""
                            )
                          }}
                        />
                      ) : (
                        <>
                          <p className="com-para">
                            Our online marketing agency drives your business to new
                            heights through our award-winning advanced marketing
                            services. Living in a digital generation, we have
                            multi-device and multi-channel approaches ingrained in our
                            DNA. We believe in more traffic, more leads, more sales, and
                            more revenue. Hence, our custom strategies and a full-funnel
                            marketing approach help your business achieve desired
                            results with increased ROI.
                          </p>
                          <p className="com-para">
                            Our digital marketing company has the industry's best
                            experts to solve your company's bandwidth and capacity
                            issues with our White Lable services. We facilitate you with
                            different marketing services such as SEO, SME, SMM, on-page
                            SEO, Technical SEO, etc.
                          </p>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Text on Left */}
                    <div className="col-lg-6 align-self-center padding-right">
                      <h2 className="com-title">
                        {contentItem?.title || "Why Choose Us?"}
                      </h2>
                      {contentItem?.content ? (
                        <p
                          className="com-para service-section-3"
                          dangerouslySetInnerHTML={{
                            __html: contentItem.content.replace(
                              /<\/?p[^>]*>/gi,
                              ""
                            )
                          }}
                        />
                      ) : (
                        <>
                          <p className="com-para">
                            Our online marketing agency drives your business to new
                            heights through our award-winning advanced marketing
                            services. Living in a digital generation, we have
                            multi-device and multi-channel approaches ingrained in our
                            DNA. We believe in more traffic, more leads, more sales, and
                            more revenue. Hence, our custom strategies and a full-funnel
                            marketing approach help your business achieve desired
                            results with increased ROI.
                          </p>
                          <p className="com-para">
                            Our digital marketing company has the industry's best
                            experts to solve your company's bandwidth and capacity
                            issues with our White Lable services. We facilitate you with
                            different marketing services such as SEO, SME, SMM, on-page
                            SEO, Technical SEO, etc.
                          </p>
                        </>
                      )}
                    </div>
                    {/* Image on Right */}
                    <div className="col-lg-6 text-center">
                      <picture>
                        <source
                          srcSet={
                            contentItem?.contentImage
                              ? `${NEXT_PUBLIC_BACKEND_URL}${contentItem?.contentImage}`
                              : "/assets/images/full-service-white-label.png"
                          }
                          type="image/webp"
                        />
                        <source
                          srcSet={
                            contentItem?.contentImage
                              ? `${NEXT_PUBLIC_BACKEND_URL}${contentItem?.contentImage}`
                              : "/assets/images/full-service-white-label.png"
                          }
                          type="image/png"
                        />
                        <Image
                          src={
                            contentItem?.contentImage
                              ? `${NEXT_PUBLIC_BACKEND_URL}${contentItem?.contentImage}`
                              : "/assets/images/full-service-white-label.png"
                          }
                          alt={contentItem?.contentImageName || "Content Image"}
                          title={contentItem?.contentImageName || "Content Image"}
                          width="606"
                          height="431"
                          className="img-fluid mx-auto"
                        />
                      </picture>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </React.Fragment>
      ))}
    </>
  );
};

export default WhyChooseUs;
