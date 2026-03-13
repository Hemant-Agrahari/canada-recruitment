import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import CustomHead from "@/components/Head";
import meta from "@/meta/meta.json";
import Head from "next/head";
const LatestUpdates = dynamic(() => import("../components/LatestUpdates"));

const OurExpertise = dynamic(() => import("@/components/ourExpertise"));

const SuccessStories = dynamic(() => import("@/components/successStories"));
const MilestoneSlider = dynamic(
  () => import("@/utils/milestoneSlider/MilestoneSlider")
);

const WelcomeModal = dynamic(() => import("@/components/forms/Indent"), {
  ssr: false,
});

import { CertificateSlider } from "@/utils/certificateSlider/CertificateSlider";
import { useState, useEffect } from "react";

// Homepage Schema Markup
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EmploymentAgency",
      "@id": "https://www.alliancerecruitmentagency.ca/#employmentagency",
      "name": "Alliance Recruitment Agency Canada",
      "url": "https://www.alliancerecruitmentagency.ca",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.alliancerecruitmentagency.ca/#logo",
        "url": "https://www.alliancerecruitmentagency.ca/assets/images/header/alliance-new-logo.png",
        "caption": "Alliance Recruitment Agency Canada"
      },
      "telephone": "+17809004752",
      "email": "sales@alliancerecruitmentagency.com",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+17809004752",
          "contactType": "customer service",
          "email": "sales@alliancerecruitmentagency.com",
          "areaServed": "CA",
          "availableLanguage": ["en"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+918980018741",
          "contactType": "customer service",
          "email": "sales@alliancerecruitmentagency.com",
          "areaServed": "IN",
          "availableLanguage": ["en"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+19179009072",
          "contactType": "customer service",
          "email": "sales@alliancerecruitmentagency.com",
          "areaServed": "US",
          "availableLanguage": ["en"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+442038380743",
          "contactType": "customer service",
          "email": "sales@alliancerecruitmentagency.com",
          "areaServed": "GB",
          "availableLanguage": ["en"]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2920 Highway 7, unit 2101",
        "addressLocality": "Vaughan",
        "addressRegion": "Ontario",
        "postalCode": "L4KOP4",
        "addressCountry": "CA"
      },

      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "09:00",
          "closes": "20:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/Alliancerecruitmentagency/",
        "https://youtube.com/channel/UCTWg4i7ZXx1NTJ59SP8Nxrw",
        "https://www.linkedin.com/company/alliance-recruitment-agency/",
        "https://twitter.com/career_alliance"
      ],
      "foundingDate": "2010",
      "description": "Top Canadian employment agency helping businesses hire skilled staff fast. Trusted staffing agency in Canada for IT, healthcare, engineering & more."

    },
    {
      "@type": "WebSite",
      "@id": "https://www.alliancerecruitmentagency.ca/#website",
      "url": "https://www.alliancerecruitmentagency.ca",
      "name": "Alliance Recruitment Agency Canada",
      "publisher": {
        "@id": "https://www.alliancerecruitmentagency.ca/#employmentagency"
      },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.alliancerecruitmentagency.ca/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.alliancerecruitmentagency.ca/#webpage",
      "url": "https://www.alliancerecruitmentagency.ca",
      "name": "Staffing Agency in Canada | Best Canadian employment agency",
      "isPartOf": {
        "@id": "https://www.alliancerecruitmentagency.ca/#website"
      },
      "primaryImageOfPage": {
        "@id": "https://www.alliancerecruitmentagency.ca/assets/images/header/alliance-new-logo.png"
      },
      "inLanguage": "en-US",
      "datePublished": "2023-03-06T00:00:00+00:00",
      "dateModified": "2024-03-06T00:00:00+00:00",
      "author": {
        "@id": "https://www.alliancerecruitmentagency.ca/author/anish-malek/#author"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.alliancerecruitmentagency.ca/author/anish-malek/#author",
      "name": "Anish Malek",
      "url": "https://www.alliancerecruitmentagency.ca/author/anish-malek",
      "worksFor": {
        "@id": "https://www.alliancerecruitmentagency.ca/#employmentagency"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.alliancerecruitmentagency.ca"
        }
      ]
    }
  ]
}


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://www.alliancerecruitmentagency.ca/"
  }]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.alliancerecruitmentagency.ca/#service",
  "serviceType": "Employment and Recruitment Services",
  "provider": {
    "@type": "Organization",
    "name": "Alliance Recruitment Agency Canada"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Canada"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Recruitment Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "IT Recruitment & Outsourcing",
          "description": "Connect with the best IT Remote Professionals. Best Outsourcing Partner for the Efficiency and Success of IT projects."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Executive Search & Headhunting",
          "description": "Find the Top-Level Talent from across the world. Hire top leaders for great results!"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Job Placement Services",
          "description": "Register and let your dream job find you! Share your CV, career goals; Begin with us for your perfect job!"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Recruitment Process Outsourcing (RPO)",
          "description": "Cut HR costs by 40-60% and reduce time-to-hire by 40-65% with our RPO solutions."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Staff Augmentation",
          "description": "97% of interviews lead to hires. Fill roles quickly and save 40-60% on costs with 99% employee retention."
        }
      }
    ]
  }
};

export default function Home() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("welcome_modal_shown");
    if (!hasShown) {
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    sessionStorage.setItem("welcome_modal_shown", "true");
  };

  return (
    <div>
      <CustomHead {...meta["homepage"]} />
      <WelcomeModal show={showWelcomeModal} handleClose={handleCloseWelcomeModal} />

      {/* Homepage Structured Data Schemas */}
      <Head>
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* <script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        /> */}
      </Head>
      <>
        <section className="HomePage-banner homepage-banner">
          <div className="container position-relative">
            <div className="banner-img">
              <Image
                // width={1000}
                // height={1000}
                src="/assets/images/homepage/banner-main.webp"
                alt="homepage banner"
                title="homepage banner"
                fill
                fetchPriority="high"
                // className="w-100 h-100"
                priority
                sizes="(max-width: 768px) 100vw, 1000px"
              />
            </div>
            <div className="home-inner">
              <div className="row g-md-5">
                <div className="col-lg-6">
                  <div className="left-side">
                    <h1>
                      <span className="first-para">Top Canadian</span>
                      Employment Agency
                    </h1>
                    <p className="second-text d-none-mo color-gray">
                      Canadian Talent, Global Reach
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-side">
                    <div className="box-wrapper bg-blue">
                      <h2 className="box-head">
                        Connect with the best IT Remote Professionals
                      </h2>
                      <p className="box-desc">
                        Best Outsourcing Partner for the Efficiency and Success of IT projects.
                      </p>
                      <Link prefetch={false} href="/contact-us" className="box-btn">
                        IT Outsource{" "}
                      </Link>
                    </div>
                    <div className="box-wrapper bg-prp" style={{ background: "#898989" }}>
                      <h2 className="box-head">
                        Find the Top-Level Talent from across the world
                      </h2>
                      <p className="box-desc">
                        Hire top leaders for great results!


                      </p>
                      <Link prefetch={false} href="/contact-us/" className="box-btn">
                        Hire Top Talent
                      </Link>
                    </div>
                    <div className="box-wrapper bg-gray" style={{ background: "#393185" }}>
                      <h2 className="box-head">
                        Register and let your dream job
                        <br />
                        find you!
                      </h2>
                      <p className="box-desc">
                        Share your CV, career goals; Begin with us for your perfect job!
                      </p>
                      <Link prefetch={false}
                        href="https://www.alliancerecruitmentagency.ca/job-seekers"
                        className="box-btn"
                      >
                        Job Seekers
                      </Link>
                    </div>
                  </div>

                  <p className="second-text d-none-block my-3 text-center">
                    Find the right talent for your UAE business.
                  </p>
                </div>
              </div>
            </div>
            <div className="mobile-image d-none-block">
              <Image
                width={322}
                height={104}
                src="/assets/images/homepage/mobile-image.svg"
                alt="homepage banner"
                title="homepage banner"
                className="img-fluid "
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section className="trust-section">
          <div className="container">
            <div className="trust-wrapper">
              <div className="left-side">
                <div className="title-trust">
                  Trusted By Leading <br />
                  Brands And Startups
                </div>
              </div>
              <div className="right-side">
                <ul>
                  <li>
                    <Image
                      src="/assets/images/homepage/Wipro.svg"
                      width={173}
                      height={74}
                      alt="Wipro"
                      className="img-fluid"
                      priority={false}
                      loading="lazy"
                    />
                  </li>
                  <li>
                    <Image
                      src="/assets/images/homepage/fujin.svg"
                      width={249}
                      height={106}
                      alt="Fujin"
                      className="img-fluid"
                      priority={false}
                      loading="lazy"
                    />
                  </li>
                  <li>
                    <Image
                      src="/assets/images/homepage/benetton.svg"
                      width={248}
                      height={106}
                      alt="Benetton"
                      className="img-fluid"
                      priority={false}
                      loading="lazy"
                    />
                  </li>
                  <li>
                    <Image
                      src="/assets/images/homepage/chanel.svg"
                      width={216}
                      height={92}
                      alt="Chanel"
                      className="img-fluid"
                      priority={false}
                      loading="lazy"
                    />
                  </li>
                  <li>
                    <Image
                      src="/assets/images/homepage/parle.svg"
                      width={205}
                      height={84}
                      alt="Parle"
                      className="img-fluid"
                      priority={false}
                      loading="lazy"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="hiraing-made">
          <div className="container">
            <h2 className="com-title heading-index">
              <strong>Linking You to the Best in the Business- Streamlined Staffing</strong>
            </h2>

            <div className="hire-arrow-img">
              <Image
                src="/assets/images/homepage/arrow-bg.svg"
                width={1722}
                height={90}
                alt="Arrow"
                className="w-100 h-100"
                priority={false}
              />
            </div>

            <div className="row g-md-5 gy-4">
              <div className="col-md-4">
                <div className="hire-card">
                  <h3 className="hire-title">
                    {" "}
                    <span className="hire-count-mobile"> 1</span> Talk to Our Recruitment Pro

                  </h3>
                  <p className="hire-desc com-pera">
                    Talk to our expert who understands your industry and helps match your needs with the right talent.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="hire-card">
                  <h3 className="hire-title">
                    {" "}
                    <span className="hire-count-mobile"> 2</span> Custom-Curated Talent Picked for You

                  </h3>
                  <p className="hire-desc com-pera">
                    We carefully screen and select candidates who perfectly match your job role and fit your business culture.


                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="hire-card">
                  <h3 className="hire-title">
                    {" "}
                    <span className="hire-count-mobile"> 3</span>  Your Ideal Hire, Assured

                  </h3>
                  <p className="hire-desc com-pera">
                    Receive a shortlist of top candidates quickly—each one carefully chosen to meet your specific hiring needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <OurExpertise />

        <SuccessStories />

        <section className="container how-start py-50 desktop-section">
          <h2 className="com-title text-align-center">How to get started?</h2>
          <div className="">
            <p className="com-pera text-center" style={{ marginBottom: "0px" }}>
              Ready to simplify hiring? Partner with us to effortlessly access thoroughly assessed, best-fit talent!



            </p>
            <div className="d-flex justify-content-center">
              <div className="our-succestab mx-auto">
                <div
                  className="nav nav-pills"
                  id="started-v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="started-v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#started-v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="started-v-pills-home"
                    aria-selected="true"
                  >
                    Recruitment
                  </button>
                  <button
                    className="nav-link"
                    id="started-v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#started-v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="started-v-pills-profile"
                    aria-selected="false"
                  >
                    Franchise
                  </button>
                  <button
                    className="nav-link"
                    id="started-v-pills-messages-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#started-v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="started-v-pills-messages"
                    aria-selected="false"
                  >
                    RPO
                  </button>
                  <button
                    className="nav-link"
                    id="started-v-pills-settings-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#started-v-pills-settings"
                    type="button"
                    role="tab"
                    aria-controls="started-v-pills-settings"
                    aria-selected="false"
                  >
                    Staff Augmentation
                  </button>
                </div>
              </div>
            </div>
            <div className="tab-content-wrapper">
              <div className="tab-content" id="started-v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="started-v-pills-home"
                  role="tabpanel"
                  aria-labelledby="started-v-pills-home-tab"
                >
                  <div className="row g-md-5">
                    <div className="col-lg-6">
                      <div className="left-ac">
                        <div
                          className="accordion accordion-flush"
                          id="Recruitment"
                        >
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="flush-headingOne"
                            >
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="flush-collapseOne"
                              >
                                <span className="blue-count"> 1 </span>
                                <span className="tab-16">
                                  {" "}
                                  Share Job Descriptions
                                </span>
                              </button>
                            </div>
                            <div
                              id="flush-collapseOne"
                              className="accordion-collapse collapse show"
                              aria-labelledby="flush-headingOne"
                              data-bs-parent="#Recruitment"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0 mb-0">
                                  {" "}
                                  Mention required hard/soft skills, ideal traits for the role, qualities that ensure a good cultural fit, key responsibilities, and overall hiring objectives.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="flush-headingTwo"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseTwo"
                                aria-expanded="false"
                                aria-controls="flush-collapseTwo"
                              >
                                <span className="blue-count"> 2 </span>
                                <span className="tab-16">
                                  Review And Shortlist
                                </span>
                              </button>
                            </div>
                            <div
                              id="flush-collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-headingTwo"
                              data-bs-parent="#Recruitment"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Identify candidates who excel in all job-related assessments, screening stages, and demonstrate top-tier performance throughout.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="flush-headingThree"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseThree"
                                aria-expanded="false"
                                aria-controls="flush-collapseThree"
                              >
                                <span className="blue-count"> 3 </span>
                                <span className="tab-16">
                                  {" "}
                                  Interview And Hire
                                </span>
                              </button>
                            </div>
                            <div
                              id="flush-collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-headingThree"
                              data-bs-parent="#Recruitment"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  We help set up interviews and send job offers to the candidates you choose for the position.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="flush-heading4"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapse4"
                                aria-expanded="false"
                                aria-controls="flush-collapse4"
                              >
                                <span className="blue-count border-none">
                                  {" "}
                                  4{" "}
                                </span>
                                <span className="tab-16">
                                  {" "}
                                  Onboard and Manage
                                </span>
                              </button>
                            </div>
                            <div
                              id="flush-collapse4"
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-heading4"
                              data-bs-parent="#Recruitment"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Receive the best help with smoothly bringing new employees into your team!
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-content">
                        <ul>
                          <li>
                            <Image
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              width={100}
                              height={100}
                              priority={false}
                              loading="lazy"
                            />
                            <span>Top 3.5% Talent Access</span>
                          </li>
                          <li>
                            <Image
                              src="/assets/images/homepage/check-icon.svg"
                              width={100}
                              height={100}
                              alt="Check Icon"
                              priority={false}
                              loading="lazy"
                            />
                            <span>350+ Most In-Demand Skills</span>
                          </li>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                              loading="lazy"
                            />
                            <span>70% Interview-To-Offer Rate</span>
                          </li>
                          <li>
                            <Image
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              width={100}
                              height={100}
                              priority={false}
                              loading="lazy"
                            />
                            <span>98% Offer Acceptance Rate</span>
                          </li>
                          <li>
                            <Image
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              width={100}
                              height={100}
                              priority={false}
                              loading="lazy"
                            />
                            <span>2X Employee Retention Rate</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link prefetch={false} href=" /contact-us/" className="blue-btn">
                      Hire Talent
                    </Link>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="started-v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="started-v-pills-profile-tab"
                >
                  <div className="row g-md-5">
                    <div className="col-lg-6">
                      <div className="left-ac">
                        <div
                          className="accordion accordion-flush"
                          id="Franchise"
                        >
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="Franchise-flush-headingOne"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#Franchise-flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="Franchise-flush-collapseOne"
                              >
                                <span className="blue-count"> 1 </span>
                                <span className="tab-16">
                                  {" "}
                                  Connect and Discover
                                </span>
                              </button>
                            </div>
                            <div
                              id="Franchise-flush-collapseOne"
                              className="accordion-collapse collapse"
                              aria-labelledby="Franchise-flush-headingOne"
                              data-bs-parent="#Recruitment"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Get in touch to learn how to start your own recruitment franchise today!

                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="Franchise-flush-headingTwo"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#Franchise-flush-collapseTwo"
                                aria-expanded="false"
                                aria-controls="Franchise-flush-collapseTwo"
                              >
                                <span className="blue-count"> 2 </span>
                                <span className="tab-16"> Fast Assessment</span>
                              </button>
                            </div>
                            <div
                              id="Franchise-flush-collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="Franchise-flush-headingTwo"
                              data-bs-parent="#Recruitment"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Follow these steps for a clear, organized review of your skills and strengths.

                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="Franchise-flush-headingThree"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#Franchise-flush-collapseThree"
                                aria-expanded="false"
                                aria-controls="Franchise-flush-collapseThree"
                              >
                                <span className="blue-count"> 3 </span>
                                <span className="tab-16"> Proposal Review</span>
                              </button>
                            </div>
                            <div
                              id="Franchise-flush-collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="Franchise-flush-headingThree"
                              data-bs-parent="#Recruitment"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Send your proposal and documents, and we will get back to you shortly.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="Franchise-flush-heading4"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#Franchise-flush-collapse4"
                                aria-expanded="false"
                                aria-controls="Franchise-flush-collapse4"
                              >
                                <span className="blue-count border-none">
                                  {" "}
                                  4{" "}
                                </span>
                                <span className="tab-16">
                                  {" "}
                                  Join and Launch Business
                                </span>
                              </button>
                            </div>
                            <div
                              id="Franchise-flush-collapse4"
                              className="accordion-collapse collapse"
                              aria-labelledby="Franchise-flush-heading4"
                              data-bs-parent="#Recruitment"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Once approved, get full help to run your business and earn good profits.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-content">
                        <ul>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                            />
                            <span>Comprehensive Training</span>
                          </li>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                            />
                            <span>Promotion and Sales Assistance</span>
                          </li>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                            />
                            <span>Outstanding return on investment</span>
                          </li>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                            />
                            <span>Rapid Expansion</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Link prefetch={false} href=" /franchise-enquiry/" className="blue-btn">
                      Start Franchise
                    </Link>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="started-v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="started-v-pills-messages-tab"
                >
                  <div className="row g-md-5">
                    <div className="col-lg-6">
                      <div className="left-ac">
                        <div className="accordion accordion-flush" id="rpo">
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="rpo-flush-headingOne"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#rpo-flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="rpo-flush-collapseOne"
                              >
                                <span className="blue-count"> 1 </span>
                                <span className="tab-16"> Consult</span>
                              </button>
                            </div>
                            <div
                              id="rpo-flush-collapseOne"
                              className="accordion-collapse collapse"
                              aria-labelledby="rpo-flush-headingOne"
                              data-bs-parent="#rpo"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Get big benefits for your business with our flexible services.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="rpo-flush-headingTwo"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#rpo-flush-collapseTwo"
                                aria-expanded="false"
                                aria-controls="rpo-flush-collapseTwo"
                              >
                                <span className="blue-count"> 2 </span>
                                <span className="tab-16"> Assess</span>
                              </button>
                            </div>
                            <div
                              id="rpo-flush-collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="rpo-flush-headingTwo"
                              data-bs-parent="#rpo"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Get the complete picture—learn about cost savings, how our solutions work, and key details.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="rpo-flush-headingThree"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#rpo-flush-collapseThree"
                                aria-expanded="false"
                                aria-controls="rpo-flush-collapseThree"
                              >
                                <span className="blue-count"> 3 </span>
                                <span className="tab-16"> Implement</span>
                              </button>
                            </div>
                            <div
                              id="rpo-flush-collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="rpo-flush-headingThree"
                              data-bs-parent="#rpo"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Select your ideal recruiters and successfully launch the RPO model for efficient hiring.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="rpo-flush-heading4"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#rpo-flush-collapse4"
                                aria-expanded="false"
                                aria-controls="rpo-flush-collapse4"
                              >
                                <span className="blue-count border-none">
                                  {" "}
                                  4{" "}
                                </span>
                                <span className="tab-16"> Measure</span>
                              </button>
                            </div>
                            <div
                              id="rpo-flush-collapse4"
                              className="accordion-collapse collapse"
                              aria-labelledby="rpo-flush-heading4"
                              data-bs-parent="#rpo"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Measure your ROI and benefits through real-time metrics and insights.

                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-content">
                        <ul>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                            />
                            <span>Cut HR costs by 40-60%</span>
                          </li>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                            />
                            <span>Reduce time-to-hire by 40-65%.</span>
                          </li>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                            />
                            <span>Stay 100% compliant with all regulations.</span>
                          </li>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                            />
                            <span>Reduce time-to-hire by 40-65%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Link prefetch={false} href=" /contact-us/" className="blue-btn">
                      Contact Us
                    </Link>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="started-v-pills-settings"
                  role="tabpanel"
                  aria-labelledby="started-v-pills-settings-tab"
                >
                  <div className="row g-md-5">
                    <div className="col-lg-6">
                      <div className="left-ac">
                        <div
                          className="accordion accordion-flush"
                          id="staff-augmentation"
                        >
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="staff-augmentation-flush-headingOne"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#staff-augmentation-flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="staff-augmentation-flush-collapseOne"
                              >
                                <span className="blue-count"> 1 </span>
                                <span className="tab-16">
                                  {" "}
                                  Share Talent Needs
                                </span>
                              </button>
                            </div>
                            <div
                              id="staff-augmentation-flush-collapseOne"
                              className="accordion-collapse collapse"
                              aria-labelledby="staff-augmentation-flush-headingOne"
                              data-bs-parent="#staff-augmentation"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Provide talent requirements—role details, number of positions, project timeline, and stages of the hiring process.

                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="staff-augmentation-flush-headingTwo"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#staff-augmentation-flush-collapseTwo"
                                aria-expanded="false"
                                aria-controls="staff-augmentation-flush-collapseTwo"
                              >
                                <span className="blue-count"> 2 </span>
                                <span className="tab-16">
                                  {" "}
                                  Find A Shortlist
                                </span>{" "}
                              </button>
                            </div>
                            <div
                              id="staff-augmentation-flush-collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="staff-augmentation-flush-headingTwo"
                              data-bs-parent="#staff-augmentation"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  Get a list of the best candidates to fill your staffing needs.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="staff-augmentation-flush-headingThree"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#staff-augmentation-flush-collapseThree"
                                aria-expanded="false"
                                aria-controls="staff-augmentation-flush-collapseThree"
                              >
                                <span className="blue-count"> 3 </span>
                                <span className="tab-16">
                                  {" "}
                                  Screen and Finalize
                                </span>
                              </button>
                            </div>
                            <div
                              id="staff-augmentation-flush-collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="staff-augmentation-flush-headingThree"
                              data-bs-parent="#staff-augmentation"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Follow a clear step-by-step process to screen, interview, and hire the right people.

                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="accordion-item">
                            <div
                              className="accordion-header"
                              id="staff-augmentation-flush-heading4"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#staff-augmentation-flush-collapse4"
                                aria-expanded="false"
                                aria-controls="staff-augmentation-flush-collapse4"
                              >
                                <span className="blue-count border-none">
                                  {" "}
                                  4{" "}
                                </span>
                                <span className="tab-16">
                                  Agree and Implement
                                </span>{" "}
                              </button>
                            </div>
                            <div
                              id="staff-augmentation-flush-collapse4"
                              className="accordion-collapse collapse"
                              aria-labelledby="staff-augmentation-flush-heading4"
                              data-bs-parent="#staff-augmentation"
                            >
                              <div className="accordion-body">
                                <p className="com-pera mb-0">
                                  {" "}
                                  Once selected, check and sign the contracts—your team is ready to start working.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-content">
                        <ul>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                              loading="lazy"
                            />
                            <span>97% of interviews lead to hires.</span>{" "}
                          </li>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                              loading="lazy"
                            />
                            <span>Fill roles quickly.</span>
                          </li>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                              loading="lazy"
                            />
                            <span>Save 40-60% on costs.</span>
                          </li>
                          <li>
                            <Image
                              width={100}
                              height={100}
                              src="/assets/images/homepage/check-icon.svg"
                              alt="Check Icon"
                              priority={false}
                              loading="lazy"
                            />
                            <span>Achieve 99% employee retention.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Link prefetch={false} href=" /contact-us/" className="blue-btn">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MilestoneSlider />
        {/* <!-- Our Milestone End --> */}


        <section>
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
                <Link prefetch={false}
                  href="https://calendly.com/allianceinternationalservices/global"
                  target="_blank"
                  className="cta-btn"
                >
                  Book Your Free Discovery Call
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- ur Milestone and Achievements start --> */}

        <section className="certifications bg-gray py-50">
          <div className="container ">
            <h2 className="com-title heading-index">
              Certifications And Achievements
            </h2>
            <p className="com-pera text-center">
              Our global company has won several awards and recognitions in
              different countries.
              <strong>
                <Link prefetch={false} href="/contact-us/"> Reach out to us </Link>
              </strong>
              for more information!
            </p>

            <CertificateSlider />
          </div>
        </section>

        <LatestUpdates />
      </>
    </div>
  );
}
