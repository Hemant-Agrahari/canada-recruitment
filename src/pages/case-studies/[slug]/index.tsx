import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
import { formatDate } from "@/utils/dateFormat";
import ErrorLoading from "../../404";
import CustomHead from "@/components/Head";
import { generateDynamicMeta } from "@/meta/DynamicMeta";
import Head from "next/head";
import Image from "next/image";

const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const baseUrl = "https://www.alliancerecruitmentagency.ca";

// Function to generate comprehensive case study page schema
const generateCaseStudySchema = (
  blogData: any,
  metadata: any,
  slug: string
) => {
  const blogUrl = `${baseUrl}/${slug}`;
  const bannerImageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${blogData?.bannerImage}`;
  const optimizedImageUrl = `${baseUrl}/_next/image?url=${encodeURIComponent(
    bannerImageUrl
  )}&w=1080&q=75`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EmploymentAgency",
        "@id": `${baseUrl}/#employmentagency`,
        name: "Alliance Recruitment Agency Canada",
        url: `${baseUrl}/`,
        logo: {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#logo`,
          url: `${baseUrl}/assets/images/header/alliance-new-logo.png`,
          caption: "Alliance Recruitment Agency Canada",
        },
        telephone: "+17809004752",
        email: "sales@alliancerecruitmentagency.com",
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+17809004752",
            contactType: "customer service",
            email: "sales@alliancerecruitmentagency.com",
            areaServed: "CA",
            availableLanguage: ["en"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+918980018741",
            contactType: "customer service",
            email: "sales@alliancerecruitmentagency.com",
            areaServed: "IN",
            availableLanguage: ["en"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+19179009072",
            contactType: "customer service",
            email: "sales@alliancerecruitmentagency.com",
            areaServed: "US",
            availableLanguage: ["en"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+442038380743",
            contactType: "customer service",
            email: "sales@alliancerecruitmentagency.com",
            areaServed: "GB",
            availableLanguage: ["en"],
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "2920 Highway 7, unit 2101",
          addressLocality: "Vaughan",
          addressRegion: "Ontario",
          postalCode: "L4KOP4",
          addressCountry: "CA",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "09:00",
            closes: "20:00",
          },
        ],
        sameAs: [
          "https://www.facebook.com/Alliancerecruitmentagency/",
          "https://youtube.com/channel/UCTWg4i7ZXx1NTJ59SP8Nxrw",
          "https://www.linkedin.com/company/alliance-recruitment-agency/",
          "https://twitter.com/career_alliance",
        ],
        foundingDate: "2010",
        description:
          "Top Canadian employment agency helping businesses hire skilled staff fast. Trusted staffing agency in Canada for IT, healthcare, engineering & more.",
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: "Alliance Recruitment Agency Canada",
        publisher: {
          "@id": `${baseUrl}/#employmentagency`,
        },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${blogUrl}/#webpage`,
        url: blogUrl,
        name: metadata?.title || blogData?.seoTitle || "",
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        primaryImageOfPage: {
          "@id": `${baseUrl}/#primaryimage`,
        },
        inLanguage: "en-US",
        datePublished: blogData?.createdAt || new Date().toISOString(),
        dateModified: blogData?.updatedAt || new Date().toISOString(),
        author: {
          "@id": `${baseUrl}/author/anish-malek/#author`,
        },
      },
      {
        "@type": "Article",
        "@id": `${blogUrl}/#article`,
        headline: blogData?.bannerTitle || metadata?.title || "",
        description: metadata?.description || blogData?.seoDescription || "",
        image: {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#primaryimage`,
        },
        author: {
          "@id": `${baseUrl}/author/anish-malek/#author`,
        },
        publisher: {
          "@id": `${baseUrl}/#employmentagency`,
        },
        datePublished: blogData?.createdAt || new Date().toISOString(),
        dateModified: blogData?.updatedAt || new Date().toISOString(),
        url: blogUrl,
        mainEntityOfPage: {
          "@id": `${blogUrl}/#webpage`,
        },
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/author/anish-malek/#author`,
        name: "Anish Malek",
        url: `${baseUrl}/author/anish-malek`,
        worksFor: {
          "@id": `${baseUrl}/#employmentagency`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${baseUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Case Studies",
            item: `${baseUrl}/case-studies`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name:
              blogData?.breadcrumbTitle ||
              blogData?.bannerTitle ||
              metadata?.title ||
              "",
            item: blogUrl,
          },
        ],
      },
      {
        "@type": "ImageObject",
        "@id": `${baseUrl}/#primaryimage`,
        url: optimizedImageUrl,
        width: "1080",
        height: "608",
      },
    ],
  };
};

const HeadHunterExecutiveJobSearch: React.FC = ({ post }: any) => {
  if (post?.status === 404) {
    return <ErrorLoading />;
  }
  const { author, blogData } = post?.data;
  const formattedDate = formatDate(blogData?.date);
  const conclusion = JSON.parse(blogData?.conclusion);
  const faq = blogData?.faq;
  // const categories = blogData?.categories;
  if (blogData.bannerImagedetails) {
    var bannerImagedetails = JSON.parse(blogData.bannerImagedetails);
  }
  let slug = `case-studies/${blogData?.slug}`;
  let metadata = generateDynamicMeta({
    meta: {
      title: blogData?.seoTitle || "",
      description: blogData?.seoDescription || "",
      slug: slug || "",
      metaFaq: blogData?.faq,
      ogType: "article",
      ogLocale: "en_US",
      articlePublishedTime: blogData?.createdAt || "",
      articleModifiedTime: blogData?.updatedAt || "",
      twitterLable1: "Written by",
      twitterData1: "Alliance Recruitment Team",
      twitterLable2: "Est. reading time",
      twitterData2: "7 minutes",
      robotindex: `${blogData?.allowIndexing === false ? "noindex" : "index"}, ${blogData?.allowSearchEngines === false ? "nofollow" : "follow"}`,
      ogImage: {
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${blogData?.bannerImage}`,
        height: 1200,
        width: 644,
        type: "image/webp",
      },
    },
  });

  const blogPageSchema = generateCaseStudySchema(blogData, metadata, slug);

  return blogData ? (
    <>
      <CustomHead {...metadata} />
      <Head>
        <script
          id="case-study-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema) }}
        />
      </Head>
      <div className="inner-wrapper">
        <section className="breadcrumb p07">
          <div className="container">
            <ul className="br-crumb">
              <li>
                <Link href="/">
                  <span>Home</span>
                </Link>
                <meta content="1" />
              </li>
            </ul>
            <span className="delimiter">› </span>
            <Link href="/case-studies">
              <span>Case Studies</span>
            </Link>
            <span className="delimiter">›</span>
            {blogData?.breadcrumbTitle || ""}
          </div>
        </section>
        <section className="content blog-page color-blue fancy-borders-disabled">
          <div className="single blog-section">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-12 col-md-12">
                <article
                  className="
                  post"
                >
                  <h1
                    className="post-heading"
                    dangerouslySetInnerHTML={{
                      __html: blogData?.bannerTitle || "",
                    }}
                  ></h1>
                  <div className="tag-list">
                    <p className="post-meta">
                      {/* <span className="spvc_area">
                        <MdOutlineRemoveRedEye />
                        <span className="spvc_views">{blogData?.views}</span>
                      </span> */}
                      {/* <span>|</span> */}
                      {formattedDate}
                      <span>|</span>by {author?.bannerTitle || ""}
                    </p>
                  </div>
                  <div>
                    <img
                      className="layout-1-bnr rmv-lazy-load"
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${blogData?.bannerImage}`}
                      width="1200"
                      height="434"
                      alt={bannerImagedetails?.alt}
                      title={bannerImagedetails?.title}
                    />
                  </div>
                  {blogData?.bannerDesp && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: blogData?.bannerDesp || "",
                      }}
                    />
                  )}
                  {blogData?.content.map((item: any, index: any) => (
                    <div key={index}>
                      <h2 className="heading_style">{item?.contentTitle}</h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.contentDescription,
                        }}
                      ></p>
                      {item?.contentCtaButton.state === true && (
                        <div className="cst-cta">
                          <h4>
                            {item?.contentCtaButton.btnText}
                            <Link
                              href={item?.contentCtaButton.link}
                              dangerouslySetInnerHTML={{
                                __html: item?.contentCtaButton.boldtxt,
                              }}
                            ></Link>
                          </h4>
                        </div>
                      )}
                      {item?.subContent &&
                        item.subContent.map((subItem: any, subIndex: any) => (
                          <div key={subIndex}>
                            <h3 className="h3-blog-heading">
                              {subItem?.subContentTitle}
                            </h3>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: subItem?.subContentDescription,
                              }}
                            ></p>
                            {subItem?.subContentCtaButton.state === true && (
                              <div className="cst-cta">
                                <h4>
                                  {subItem?.subContentCtaButton.btnText}
                                  <Link
                                    href={subItem?.subContentCtaButton.link}
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        subItem?.subContentCtaButton.boldtxt,
                                    }}
                                  />
                                </h4>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  ))}
                  <div>
                    <h2
                      className="heading_style"
                      dangerouslySetInnerHTML={{ __html: conclusion?.title }}
                    ></h2>
                    <div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: conclusion?.description,
                        }}
                      ></p>
                    </div>
                  </div>
                  {faq && faq[0].question.length > 2 && (
                    <section className="faq-blog-wrapper">
                      <div className="container">
                        <div className="row justify-content-center">
                          <div className="col-lg-12 col-md-12 p-0 m-0">
                            <h2 className="heading_style my-4">FAQs</h2>
                            <div className="faq-contents">
                              <div className="accordion" id="accordionFaq">
                                {faq &&
                                  faq.map((item: any, index: any) => {
                                    return (
                                      <div
                                        className="accordion-item"
                                        key={index}
                                      >
                                        <h3 className="accordion-header">
                                          <button
                                            className={`accordion-button ${index === 0 ? "" : "collapsed"
                                              }`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${index}`}
                                            aria-expanded={
                                              index === 0 ? "true" : "false"
                                            }
                                            aria-controls={`collapse${index}`}
                                          >
                                            <b>
                                              Q {1 + index}.{` `}{" "}
                                              {item.question}
                                            </b>
                                          </button>
                                        </h3>
                                        <div
                                          id={`collapse${index}`}
                                          className={`accordion-collapse collapse ${index === 0 ? "show" : ""
                                            }`}
                                          data-bs-parent="#accordionFaq"
                                        >
                                          <div className="accordion-body">
                                            <b>Ans. </b>
                                            <span
                                              dangerouslySetInnerHTML={{
                                                __html: item.answer,
                                              }}
                                            ></span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </article>


                <section>
                  <div>
                    <h2 className="heading_style">{blogData.contactHeading || "Contact us with ease for any recruitment requirements:"}
                    </h2>
                    <p className="text-justify">
                      Email: <a href="mailto:sales@alliancerecruitmentagency.com">sales@alliancerecruitmentagency.com</a>

                    </p>
                    <p className="text-justify">Canada (phone): <a href="tel:+17809004752">+1 (780) 900 4752</a></p>
                    <div className="header-social-link">
                      <div className="job-seeker-wrapper">
                        <li>
                          <Link

                            href="https://wa.me/918980018741?text=Hi"
                            target="_blank"
                            title="Share on whatsapp"
                          >

                            <span className="mx-1">
                              <Image
                                width={25}
                                height={25}
                                src="/assets/header_images/whatsapp 2(24).svg"
                                loading="eager"
                                alt="Call Now"
                              />
                            </span>{" "}
                          </Link>
                          <Link

                            href="https://m.me/Alliancerecruitmentagency/"
                            target="_blank"
                            title="facebook"
                          >

                            <span className="mx-1">
                              <Image
                                width={25}
                                height={25}
                                src="/assets/header_images/facebook 1(24) (1).svg"
                                loading="eager"
                                alt="Call Now"
                              />
                            </span>{" "}
                          </Link>
                          <Link

                            href="https://www.linkedin.com/company/alliance-recruitment-agency/"
                            target="_blank"
                          >
                            <span className="mx-1">
                              <Image
                                width={25}
                                height={25}
                                src="/assets/header_images/linkedin 1 (24).svg"
                                loading="eager"
                                alt="Call Now"
                              />
                            </span>{" "}
                          </Link>
                          <Link

                            href="https://www.instagram.com/alliancerecruitment/"
                            target="_blank"
                          >
                            <span className="mx-1">
                              <Image
                                width={25}
                                height={25}
                                src="/assets/header_images/instagram 1.svg"
                                loading="eager"
                                alt="Call Now"
                              />
                            </span>{" "}
                          </Link>
                        </li>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-50">
          <div className="new-section">
            <div className="container">
              <div className="main-content">
                <h2 className="mb-4">
                  Interested in finding out how Alliance can support you?
                </h2>
                <ul className="mb-3">
                  <li>
                    Utilize the extensive network of the finest 3.5% talent
                  </li>
                  <li>
                    Achieve hiring speeds multiplied by 10 and enjoy cost
                    benefits of up to 40%
                  </li>
                  <li>
                    Achieving a remarkable 70% success rate from initial
                    candidate interview to final selection
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
      </div>
    </>
  ) : null;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.params || {};
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getService?slug=${slug}`
    );
    const post = await response.json();

    if (!post || post.status !== 200) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    return {
      props: {
        post: null,
      },
    };
  }
};
export default HeadHunterExecutiveJobSearch;
