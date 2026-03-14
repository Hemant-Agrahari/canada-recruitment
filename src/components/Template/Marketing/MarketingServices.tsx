import React from "react";
import Image from "next/image";
import { Card } from "@/utils/interfaces";

interface MarketingServicesProps {
  cardSection: {
    title: string;
    content: string;
  };
  card: Card[];
  NEXT_PUBLIC_BACKEND_URL: string | undefined;
}

const MarketingServices = ({
  cardSection,
  card,
  NEXT_PUBLIC_BACKEND_URL,
}: MarketingServicesProps) => {
  if (!card || !Array.isArray(card) || card.length === 0) {
    return null;
  }

  return (
    <section className="service">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-12 col-md-12 me-auto ">
            <h2 className="com-titles">
              {cardSection?.title || "End-to-End Digital Marketing Services"}
            </h2>
            <p
              className="com-para service-section-3"
              dangerouslySetInnerHTML={{
                __html:
                  cardSection?.content?.replace(/<\/?p[^>]*>/gi, "") ||
                  " Grow your brand's digital presence and reach new heights with our tailored digital marketing services. Our expert team incorporates cutting-edge strategies to get innovative and stand out from competitors in this crowded marketplace. We understand the evolving online landscape and craft result-oriented approaches that drive traffic, boost conversions, and enhance Return on Investment (ROI). Whether you're a startup or an established enterprise, our proven expertise ensures your message resonates in the digital realm.",
              }}
            />
          </div>
          {card.map((cardItem) => (
            <div className="col-lg-4 col-md-6 " key={cardItem.title}>
              <div className="service-card">
                <div className="service-img">
                  <Image
                    width={64}
                    height={64}
                    src={`${NEXT_PUBLIC_BACKEND_URL}${cardItem.cardImage}`}
                    alt={cardItem?.cardImageName || "Card Image"}
                    title={cardItem?.cardImageName || "Card Image"}
                  />
                </div>
                <h3 className="service-title">{cardItem.title}</h3>
                <p
                  className="com-para service-section-3"
                  dangerouslySetInnerHTML={{
                    __html: cardItem.content.replace(/<\/?p[^>]*>/gi, ""),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketingServices;
