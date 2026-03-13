import Link from "next/link";
import React, { FC } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";

interface LifeAtAllianceDetailsTemplateProps {
  data: any;
}

const LifeAtAllianceDetailsTemplate: FC<LifeAtAllianceDetailsTemplateProps> = ({
  data,
}) => { 
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <div className="inner-wrapper">
      <section className="breadcrumb p07">
        <div>
          <ul className="br-crumb">
            <li>
              <Link href="/">
                <span>Home</span>
              </Link>
              <meta content="1" />
            </li>
          </ul>
          <span className="delimiter">›</span>
          {data?.content[0].contentTitle || ""}
        </div>
      </section>

      <section className="gallery-wrapper">
        <div className="container">
          <LightGallery
            plugins={[lgThumbnail, lgZoom]}
            elementClassNames="resp-img"
            speed={1000}
            download={false}
          >
            {data?.content ? (
              data?.content[0]?.relatedImage?.map((item: any) => (
                <a data-src={`${BE_URL}${item.image}` || ""}>
                  <Image
                    loading="lazy"
                    src={`${BE_URL}${item.image}` || ""}
                    alt={item.imageAlt || ""}
                    width="1920"
                    title={item.imageTitle || ""}
                    className="img-fluid"
                    height="2560"
                    data-pagespeed-url-hash="2270681873"
                  />
                </a>
              ))
            ) : (
              <></>
            )}
          </LightGallery>
        </div>
        <div className="event-list-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="alliance-nav event-nav">
                  <span className="next">
                    <Link href={`/${data?.slug ? data?.slug : "/"}`}>
                      Back To Event List
                    </Link>
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LifeAtAllianceDetailsTemplate;
