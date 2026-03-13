import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/Banner";
import PhoneInputComponent from "@/utils/phoneInput/phoneInput";
import HireTalent from "@/components/HireTalent";
import LatestUpdates from "@/components/LatestUpdates";
import CustomHead from "@/components/Head";
import { Properties } from "csstype";
import meta from "../meta/meta.json";
interface LocationsProps { }
const Locations: React.FC<LocationsProps> = () => {
  const hiddenStyle: Properties = {
    display: "none",
    visibility: "hidden",
  };

  const script1 = `
        {
            "@context": "https://schema.org",
            "@graph": [{
                    "@type": "Organization",
                    "@id": "https://www.alliancerecruitmentagency.ae/#organization",
                    "name": "Alliance Recruitment Agency",
                    "logo": {
                        "@type": "ImageObject",
                        "@id": "https://www.alliancerecruitmentagency.ae/#logo",
                        "url": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png",
                        "caption": "Alliance Recruitment Agency",
                        "inLanguage": "en-US"
                    }
                },
                {
                    "@type": "WebSite",
                    "@id": "https://www.alliancerecruitmentagency.ae/#website",
                    "url": "https://www.alliancerecruitmentagency.ae/",
                    "name": "Alliance Recruitment Agency",
                    "publisher": {
                        "@id": "https://www.alliancerecruitmentagency.ae/#organization"
                    },
                    "inLanguage": "en-US"
                },
                {
                    "@type": "ImageObject",
                    "@id": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png",
                    "url": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png",
                    "width": "225",
                    "height": "60",
                    "inLanguage": "en-US"
                }, {
                    "@type": "Person",
                    "@id": "https://www.alliancerecruitmentagency.ae/author/allianceadmin/",
                    "name": "Pallavi Chawla",
                    "image":

                    {
                        "@type": "ImageObject",
                        "@id": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2021/05/aut-avtar.jpg",
                        "url": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2021/05/aut-avtar.jpg",
                        "caption": "Pallavi Chawla",
                        "inLanguage": "en-US"
                    },
                    "sameAs": ["https://www.alliancerecruitmentagency.ae/"],
                    "worksFor": {
                        "@id": "https://www.alliancerecruitmentagency.ae/#organization"
                    }
                },
                {
                    "@type": "WebPage",
                    "@id": "https://www.alliancerecruitmentagency.ae/locations/#webpage",
                    "url": "https://www.alliancerecruitmentagency.ae/locations/",
                    "name": "Locations -",
                    "datePublished": "2017-04-01 10:59",
                    "dateModified": "2021-04-30 5:36",
                    "author": {
                        "@id": "https://www.alliancerecruitmentagency.ae/author/allianceadmin/"
                    },
                    "isPartOf":

                    {
                        "@id": "https://www.alliancerecruitmentagency.ae/#website"
                    },
                    "primaryImageOfPage":

                    {
                        "@id": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png"
                    },
                    "inLanguage": "en-US"
                }, {
                    "@type": "Article",
                    "headline": "Locations -",
                    "datePublished": "2017-04-01 10:59",
                    "dateModified": "2021-04-30 5:36",
                    "author":

                    {
                        "url": "https://www.alliancerecruitmentagency.ae/author/allianceadmin/",
                        "@type": "Person",
                        "name": "Pallavi Chawla"
                    },
                    "description": "",
                    "name": "Locations -",
                    "@id": "https://www.alliancerecruitmentagency.ae/locations/#schema-1859",
                    "isPartOf":

                    {
                        "@id": "https://www.alliancerecruitmentagency.ae/locations/#webpage"
                    },
                    "publisher":

                    {
                        "@id": "https://www.alliancerecruitmentagency.ae/#organization"
                    },
                    "image":

                    {
                        "@id": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png"
                    },
                    "inLanguage": "en-US",
                    "mainEntityOfPage": {
                        "@id": "https://www.alliancerecruitmentagency.ae/locations/#webpage"
                    }
                }
            ]
        }
        `;
  const script2 = `
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Alliance Recruitment Agency",
            "image": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png",
            "@id": "",
            "url": "https://www.alliancerecruitmentagency.ae/",
            "telephone": "+918980018741",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "B-707 MONDEAL SQUARE Sarkhej - Gandhinagar Hwy, Prahlad Nagar",
                "addressLocality": "Ahmedabad",
                "addressRegion": "Gujarat",
                "postalCode": "380015",
                "addressCountry": "India"
            },
            "sameAs": [
                "https://www.facebook.com/Alliancerecruitmentagency/",
                "https://www.youtube.com/channel/UCTWg4i7ZXx1NTJ59SP8Nxrw",
                "https://www.linkedin.com/company/alliance-recruitment-agency/",
                "https://twitter.com/career_alliance"
            ]
        }
        `;
  const script3 = `
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.alliancerecruitmentagency.ae/"
            }, {
                "@type": "ListItem",
                "position": 2,
                "name": "Locations",
                "item": "https://www.alliancerecruitmentagency.ae/locations/"
            }]
        }
        `;

  return (
    <div>
      <CustomHead {...meta["locations"]} />
      <>
        {/* <!-- main-banner start --> */}
        <Banner
          backgroundImage="/assets/images/location-banner.webp"
          title="Locations
                    "
          alt="Alliance Recruitment Agency Locations - Connecting Talent with Opportunities
                    "
        />
        {/* <!-- main-banner start --> */}

        {/* <!-- Recruitment section start--> */}
        <section className="location-pg accounting-section">
          <div className="container-fluid c-pad-x">
            <div className="inner-con">
              <div className="row gy-4">
                <div className="col-lg-6">
                  <h2 className="com-title text-align-left text-align-left">
                    Top Places We Serve
                  </h2>
                  <ul className="induster-ul">
                    <li className="com-text">
                      <Link href="https://www.allianceinternational.co.in/recruitment-consultants-mumbai/">
                        Recruitment Mumbai
                      </Link>
                    </li>
                    <li className="com-text">
                      <Link href="https://www.allianceinternational.co.in/manpower-consultancy-bangalore/">
                        Recruitment Bangalore
                      </Link>
                    </li>
                    <li className="com-text">
                      <Link href="https://www.allianceinternational.co.in/manpower-consultancy-pune/">
                        Recruitment Pune
                      </Link>
                    </li>
                    <li className="com-text">
                      <Link href="https://www.allianceinternational.co.in/manpower-consultancy-chennai/">
                        Recruitment Chennai
                      </Link>
                    </li>
                    <li className="com-text">
                      <Link href="https://www.allianceinternational.co.in/manpower-consultancy-hyderabad/">
                        Recruitment Hyderabad
                      </Link>
                    </li>
                    <li className="com-text">
                      <Link href="https://www.allianceinternational.co.in/manpower-consultancy-kolkata/">
                        Recruitment Kolkata
                      </Link>
                    </li>
                    <li className="com-text">
                      <Link href="https://www.allianceinternational.co.in/manpower-consultancy-delhi/">
                        Recruitment Delhi
                      </Link>
                    </li>
                    <li className="com-text">
                      <Link href="https://www.allianceinternational.co.in/recruitment-consultants-gurgaon/">
                        Recruitment Gurgaon
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6 ">
                  <h2 className="com-title text-align-left">
                    International Recruitment Agencies
                  </h2>
                  <ul className="induster-ul">
                    <li className="com-text">
                      <Link href="https://www.alliancerecruitmentagency.com/recruitment-agency-singapore/">
                        Recruitments in Singapore
                      </Link>
                    </li>
                    <li className="com-text">
                      <Link href="https://www.alliancerecruitmentagency.com/recruitment-consultant-usa/">
                        Recruitment in USA
                      </Link>
                    </li>
                    <li className="com-text">
                      <Link href="https://www.alliancerecruitmentagency.com/recruitment-agency-uk/">
                        Recruitment in UK
                      </Link>
                    </li>
                    <li className="com-text">
                      <Link href="https://www.alliancerecruitmentagency.com/recruitment-agency-south-africa/">
                        Recruitment in South Africa
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Recruitment section End--> */}
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

        {/* <noscript dangerouslySetInnerHTML={{ __html: tagmanager }} /> */}
        <script
          type="application/ld+json"
          className="rank-math-schema"
          dangerouslySetInnerHTML={{ __html: script1 }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: script2 }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: script3 }}
        />
      </>
    </div>
  );
};
export default Locations;
