import React from "react";
import Link from "next/link";
import CustomHead from "@/components/Head";
import meta from "../meta/meta.json";
import Banner from "@/components/Banner";
import Head from "next/head";

interface ServicesProps { }

// Services Page Schema
const servicesPageSchema = {
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
      "@type": "Service",
      "@id": "https://www.alliancerecruitmentagency.ca/recruitment-companies-cambridge/#service",
      "serviceType": "Recruitment Companies Cambridge",
      "name": "Recruitment Companies Cambridge",
      "provider": {
        "@id": "https://www.alliancerecruitmentagency.ca/#employmentagency"
      },
      "description": "Searching for top recruitment companies in Cambridge or employment agencies in Cambridge, Ontario? Alliance connects you with perfect candidates fast!"
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
      "@id": "https://www.alliancerecruitmentagency.ca/recruitment-companies-cambridge/#webpage",
      "url": "https://www.alliancerecruitmentagency.ca/recruitment-companies-cambridge/",
      "name": "Trusted Recruitment Companies Cambridge | Alliance recruitment",
      "isPartOf": {
        "@id": "https://www.alliancerecruitmentagency.ca/#website"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject", "url": "https://www.alliancerecruitmentagency.ca/_next/image?url=https%3A%2F%2Fcmsapi.alliancerecruitmentagency.ca%2F%2Fupload%2FRecruitment%20Companies%20Cambridge.webp&w=1920&q=75"
      },
      "inLanguage": "en-US",
      "datePublished": "2025-06-05T09:32:18.453Z",
      "dateModified": "2025-06-05T09:41:13.333Z",
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
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Recruitment Companies Cambridge",
          "item": "https://www.alliancerecruitmentagency.ca/recruitment-companies-cambridge"
        }
      ]
    }
  ]
}

const Services: React.FC<ServicesProps> = () => {
  return (
    <div>
      <CustomHead {...meta["services"]} />

      {/* Services Page Schema */}
      <Head>
        <script
          id="services-page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
        />
      </Head>

      <>
        {/* <!-- main-banner start --> */}
        <Banner
          backgroundImage="/assets/images/location-banner.webp"
          title="Services"
          alt="Professional Recruitment Services in the UAE - Alliance Recruitment Agency"
        />
        {/* <!-- main-banner End --> */}
        {/* <!-- Hire talent start --> */}
        <section className="hire-talent services-section">
          <div className="container">
            <div className="row g-4">
              <h2 className="com-title text-align-left">Services</h2>
              <div className="col-lg-6 col-md-6">
                <div className="hire-card">
                  <h3 className="hire-title mb-1">Manpower Recruitment</h3>
                  {/* <p className="com-text"> */}
                  <ul className="induster-ul">
                  </ul>
                  {/* </p> */}
                </div>
              </div>

              <div className="col-lg-6 col-md-6">
                <div className="hire-card">
                  <h3 className="hire-title mb-1">RPO Services</h3>
                  {/* <p className="com-text"> */}
                  <ul className="induster-ul">
                  </ul>
                  {/* </p> */}
                </div>
              </div>

              <div className="col-lg-6 col-md-6">
                <div className="hire-card">
                  <h3 className="hire-title mb-1">Staffing Services</h3>
                  {/* <p className="com-text"> */}
                  <ul className="induster-ul">
                  </ul>
                  {/* </p> */}
                </div>
              </div>

              <div className="col-lg-6 col-md-6">
                <div className="hire-card">
                  <h3 className="hire-title mb-1">
                    Immigration & Visa Services
                  </h3>
                  {/* <p className="com-text"> */}
                  <ul className="induster-ul">
                  </ul>
                  {/* </p> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Hire talent End --> */}
        {/* <!-- Accountant Hiring start --> */}
        <section className=" ">
          <div className="new-section">
            <div className="container">
              <div className="main-content">
                <h2 className="mb-4">
                  Interested in finding out how Alliance can support you?
                </h2>
                <ul className="mb-3">
                  <li className="mb-3 fontEpilogue">
                    Utilize the extensive network of the finest 3.5% talent
                  </li>
                  <li className="mb-3 fontEpilogue">
                    Achieve hiring speeds multiplied by 10 and enjoy cost
                    benefits of up to 40%
                  </li>
                  <li className="mb-3 fontEpilogue">
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
      </>
    </div>
  );
};
export default Services;
