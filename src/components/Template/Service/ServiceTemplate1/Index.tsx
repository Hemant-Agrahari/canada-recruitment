import React from "react";
import Image from "next/image";

// import ContactUsNow from "@/components/FormComponent/ContactUsNow-Form/ContactUsNow";
import Head from "next/head";
import ServiceForm from "@/components/ServiceForm/service-form";
import Link from "next/link";
// import ServiceForm from "@/components/forms/ServiceForm/service-form";
// import LookingFor from "@/components/forms/LookingForForm";
interface ServiceTemplate1 {
  data: any;
  blog: any;
}
const ServiceTemplate1: React.FC<ServiceTemplate1> = ({
  data,
  // params,
}: any) => {
  // console.log("data123", data);
  // const content = data.content;
  // const content2 = data.content2;
  // const section2 = data.section2;
  // const schema = data.schema;
  // const serviceSlider = data.serviceSlider;
  // const testimonials = data.testimonials;
  const faq = data.faq;
  // const inputDate = data.createdAt;
  const formatDate = (inputDate: any) => {
    const dateObject = new Date(inputDate);

    // Extract the date components
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hours = dateObject.getHours();
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");

    // Format the output
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  // const dataDate = {
  //   createdAt: formatDate(data.createdAt),
  //   updatedAt: formatDate(data.updatedAt),
  // };
 

  // console.log(" data.bannerContent", data.bannerContent);
  // const text = data.bannerContent;

  // const updatedText = text
  //   .replace(/<div>/g, "<p>") // Replace <div> with <p>
  //   .replace(/<\/div>/g, "</p>") // Replace </div> with </p>
  //   .replace(/<br>/g, "") // Remove all <br> tags
  //   .replace(/<p><\/p>/g, ""); // Remove empty <p></p> tags
  // const isWordpress = data.isWordpress;
  
  return (
    <>
    <div>
          <div className="inner-section">
            {/* Banner Section start */}

            <section
              style={{
                position: "relative",
                zIndex: 1,
                height: "clamp(350px, 40vw, 550px)",
                minHeight: "400px", /* Min height for mobile */
                backgroundColor: "#f0f0f0",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 0,
                }}
              />
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${data.bannerImage}`}
                alt={data?.imageAlt || "Banner Background"}
                title={data?.imageTitle || "Banner Background"}
                fill
                priority
                quality={75}
                className="object-cover object-top"
                sizes="100vw"
              />{" "}
            </section>

            <section>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <h1
                      style={{ padding: "20px 0px 20px 0px" }}
                      className="immediate-slab-leak"
                    >
                      {data?.bannerTitle}
                    </h1>
                    <div
                      className="slab-leak-detections"
                      dangerouslySetInnerHTML={{
                        __html: data && data?.bannerDescription1,
                      }}
                    ></div>
                    <ServiceForm />
                    <div
                      className="slab-leak-detections"
                      dangerouslySetInnerHTML={{
                        __html: data && data?.bannerDescription2,
                      }}
                    ></div>
                    {/* content section */}
                    {data?.content &&
                      data?.content?.map((contentItem: any, index: number) => (
                        <section key={index} className="content-section">
                          <h2>{contentItem.contentTitle}</h2>
                          <div
                            className="content-description"
                            dangerouslySetInnerHTML={{
                              __html: contentItem.contentDescription,
                            }}
                          />
                        </section>
                      ))}
                    {/* FAQ Section */}
                    {/* <section className="faq">
                      <h2>Frequently Asked Questions</h2>
                      {data.faq &&
                        data.faq.map((faqItem: any, index: any) => (
                          <div key={index} className="faq-item">
                            <h3>{faqItem.question}</h3>
                            <div
                              className="faq-answer"
                              dangerouslySetInnerHTML={{
                                __html: faqItem.answer,
                              }}
                            />
                          </div>
                        ))}
                    </section> */}
                    {data?.faq?.map &&
                      data?.faq?.length > 0 &&
                      faq[0]?.question && (
                        <section>
                          <div className="container">
                            <h2 className="com-title">FAQs</h2>

                            <div className="accordion" id="accordionFaq">
                              {faq &&
                                (typeof faq === "string"
                                  ? JSON.parse(faq)
                                  : faq
                                ).map((item: any, index: any) => (
                                  <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header">
                                      <button
                                        className={`accordion-button ${
                                          index === 0 ? "" : "collapsed"
                                        }`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${index}`}
                                        aria-expanded={
                                          index === 0 ? "true" : "false"
                                        }
                                        aria-controls={`collapse${index}`}
                                      >
                                        {item.question}
                                      </button>
                                    </h2>
                                    <div
                                      id={`collapse${index}`}
                                      className={`accordion-collapse collapse ${
                                        index === 0 ? "show" : ""
                                      }`}
                                      data-bs-parent="#accordionFaq"
                                    >
                                      <div
                                        className="accordion-body"
                                        dangerouslySetInnerHTML={{
                                          __html: item.answer,
                                        }}
                                      >
                                        {/* {item.answer} */}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </section>
                      )}
                       <section className="py-50">
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
              target="_blank"
              className="cta-btn"
              id=""
              href="https://calendly.com/allianceinternationalservices/global"
            >
              Book Your Free Discovery Call
            </Link>
          </div>
        </div>
      </div>
    </section>
                  </div>
                  {/* <div className="col-lg-3 col-md-3">
                  </div> */}
                </div>
              </div>
            </section>
          </div>
          {/* {faq && faq.length > 0 && faq[0].question && (
            <Script
              id="faqSchema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faq.map((item: any) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: item.answer,
                    },
                  })),
                }),
              }}
            />
          )} */}
         <Head>
            {/* OpenGraph Meta Tags for Service Pages */}
            <meta property="og:type" content="article"/>
            {data?.bannerImage && (
              <>
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.bannerImage}`}/>
                <meta property="og:image:width" content="627"/>
                <meta property="og:image:height" content="504"/>
                <meta property="og:image:type" content="image/webp"/>
              </>
            )}

            <script
              id="productSchema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Product",
                  "name": data?.bannerTitle,
                  "image": `${process.env.NEXT_PUBLIC_FRONTEND_URL}${data?.bannerImage}`,
                  "description": data?.seoDescription,
                  "brand": {
                    "@type": "Brand",
                    "name": "Alliance Recruitment Agency Canada"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": (Math.random() * (5 - 4.6) + 4.6).toFixed(1),
                    "bestRating": "5",
                    "worstRating": "1",
                    "ratingCount": Math.floor(Math.random() * (550 - 200 + 1)) + 200,
                
                }}),
              }} 
            />
            {/* Breadcrumb schema commented out - already generated in parent page to prevent duplicates */}
            {/* <script
              id="breadcrumbSchema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.alliancerecruitmentagency.ca/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": `${data?.bannerTitle}`,
                      "item": `https://www.alliancerecruitmentagency.ca/${data?.slug}/`
                    }
                  ]
                }),
              }} 
            /> */}
          </Head>
        </div>
    </>
  );
};

export default ServiceTemplate1;
