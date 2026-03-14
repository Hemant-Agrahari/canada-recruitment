import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SuccessStory } from "@/utils/interfaces"; 

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface MarketingSuccessStoriesProps {
  successStory: SuccessStory[];
  NEXT_PUBLIC_BACKEND_URL: string | undefined;
}

const MarketingSuccessStories = ({
  successStory,
  NEXT_PUBLIC_BACKEND_URL,
}: MarketingSuccessStoriesProps) => {
  if (!successStory || !Array.isArray(successStory) || successStory.length === 0) {
    return null;
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <section className="our-success-story">
      <div className="container">
        <h2 className="com-title mb-0">Client Success Stories</h2>
        <Slider {...settings}>
          {successStory.map((story, index) => (
            <div className="item" key={index}>
              <div className="our-success-story-content">
                <div className="row flex-row-reverse">
                  <div className="col-lg-6 align-self-center">
                    <picture>
                      <source
                        srcSet={`${NEXT_PUBLIC_BACKEND_URL}${story.image}`}
                        type="image/webp"
                      />
                      <source
                        srcSet={`${NEXT_PUBLIC_BACKEND_URL}${story.image}`}
                        type="image/png"
                      />
                      <Image
                        src={`${NEXT_PUBLIC_BACKEND_URL}${story.image}`}
                        alt={story?.imageName || "Success Story Image"}
                        title={story?.imageName || "Success Story Image"}
                        width="626"
                        height="437"
                        className="img-fluid"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                  <div className="col-lg-6">
                    <div className="our-success-story-content-left">
                      <h3>{story?.title}</h3>
                      <p
                        className="service-section-3"
                        dangerouslySetInnerHTML={{
                          __html: story.content.replace(/<\/?p[^>]*>/gi, ""),
                        }}
                      />
                      <ul className="description-info">
                        <li>
                          <span>Category</span> {story.category}
                        </li>
                        <li>
                          <span>Industry</span> {story.industry}
                        </li>
                      </ul>
                      <div className="bottom-link">
                        <Link
                          href={story.buttonLink || "#"}
                          className="bottom-link text-end"
                        >
                          {story.buttonTitle || "Know More"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default MarketingSuccessStories;
