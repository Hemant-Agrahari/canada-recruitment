import Banner from "@/components/Banner";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface LifeAtAllianceTemplateProps {
  data: any;
}

const LifeAtAllianceTemplate: FC<LifeAtAllianceTemplateProps> = ({ data }) => {
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  return (
    <>
      <Banner
        backgroundImage={`${BE_URL}${data?.bannerImage}` || ""}
        title={data?.bannerTitle || ""}
        alt={data?.bannerTitle || ""}
      />
      <div className="container-fluid c-pad-x">
        <section className="mid-text-section">
          <div className="container">
            <div className="text-wrapper row">
              <div className="col-lg-12 pbs-5 align-self-center ">
                <h2 className="com-title   culture-heading">
                  {data?.section2Titel || ""}
                </h2>
                <p
                  className="com-text culture-sub-heading text-center"
                  style={{ fontSize: "18px" }}
                >
                  {data?.section2Description || ""}
                </p>
              </div>
              {data?.content ? (
                data?.content?.map((item: any) => {
                  return (
                    <div
                      key={item?.contentSlug}
                      className="right-side  col-md-6 col-lg-4 align-self-start mt-4"
                    >
                      <h3 className="com-title text-align-left life-s-title s-titl">
                        {item?.contentTitle}
                      </h3>
                      <div className="ais-event-img">
                        <Link href={`/${item?.contentSlug}`}>
                          <picture>
                            <Image
                              width={1000}
                              height={1000}
                              data-src={`${BE_URL}${item.contentImage}` || ""}
                              src={`${BE_URL}${item.contentImage}` || ""}
                              priority={false}
                              loading="lazy"
                              title={item?.imageTitle || ""}
                              alt={item?.imageAlt || ""}
                              className="img-fluid w-100 h-100"
                            />
                          </picture>
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </section>
      </div>

      <section className="  pb-50">
        <div className="new-section">
          <div className="container">
            <div className="main-content">
              <h2 className="mb-4">
                Interested in finding out how Alliance can support you?
              </h2>
              <ul className="mb-3">
                <li>Utilize the extensive network of the finest 3.5% talent</li>
                <li>
                  Achieve hiring speeds multiplied by 10 and enjoy cost benefits
                  of up to 40%
                </li>
                <li>
                  Achieving a remarkable 70% success rate from initial candidate
                  interview to final selection
                </li>
              </ul>

              <h3 className="mb-4">Let’s talk!</h3>
              <Link
                href="https://calendly.com/allianceinternationalservices/global"
                target="_blank"
                className="cta-btn"
                id=""
              >
                Book Your Free Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LifeAtAllianceTemplate;
